#!/usr/bin/env python3
"""Deploy aimatex.com SPA to Chengdu (139.155.130.167).

Replaces Netlify:
  aimatex.com / www.aimatex.com → static SPA (/home/ubuntu/web/aimatex)
  API remains https://api.ai2obj.com (frontend axios prod baseURL)

DNS: A records @ + www → 139.155.130.167
TLS: certbot --nginx + certbot.timer auto-renew

Usage:
  py -3 scripts/deploy_aimatex_www_prod.py
  DEPLOY_SKIP_BUILD=1 py -3 scripts/deploy_aimatex_www_prod.py   # reuse existing build/
  DEPLOY_SKIP_DNS=1  py -3 scripts/deploy_aimatex_www_prod.py
"""
from __future__ import annotations

import base64
import os
import shutil
import subprocess
import sys
from pathlib import Path

import paramiko

HOST = "139.155.130.167"
WEB_DOMAIN = "aimatex.com"
WWW_DOMAIN = "www.aimatex.com"
DNS_DOMAIN = "aimatex.com"
# DNSPod apex = "@"
DNS_RECORDS = ["@", "www"]
DNS_VALUE = HOST

ROOT = Path(__file__).resolve().parents[1]
WEB_DIST = ROOT / "build"
NAS_SECRETS = Path(r"F:\dev\proj2\aimatex-nas\secrets")
DEPLOY_ENV_CANDIDATES = (
    Path.home() / ".aimatex-music-deploy.env",
    Path.home() / ".aimatex-chat-deploy.env",
    ROOT / "secrets" / "deploy.env",
)

REMOTE_WEB = "/home/ubuntu/web/aimatex"
SITE_FILE = "aimatex.com"

# HTTP bootstrap (certbot will add 443 + redirect)
NGINX_APEX = f"""server {{
    listen 80;
    server_name {WEB_DOMAIN};

    root {REMOTE_WEB};
    index index.html;
    client_max_body_size 32m;

    location ^~ /.well-known/acme-challenge/ {{
        default_type "text/plain";
        root /var/www/certbot;
    }}

    # CRA hashed assets
    location /static/ {{
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }}

    location / {{
        try_files $uri $uri/ /index.html;
    }}
}}
"""

NGINX_WWW = f"""server {{
    listen 80;
    server_name {WWW_DOMAIN};

    location ^~ /.well-known/acme-challenge/ {{
        default_type "text/plain";
        root /var/www/certbot;
    }}

    location / {{
        return 301 https://{WEB_DOMAIN}$request_uri;
    }}
}}
"""


def load_env_file(path: Path) -> dict[str, str]:
    if not path.exists():
        return {}
    out: dict[str, str] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        out[k.strip()] = v.strip().strip("'").strip('"')
    return out


def load_merged() -> dict[str, str]:
    data: dict[str, str] = {}
    data.update(load_env_file(NAS_SECRETS / "aimatex-nas.env"))
    data.update(load_env_file(NAS_SECRETS / "ops.env"))
    for path in DEPLOY_ENV_CANDIDATES:
        data.update(load_env_file(path))
    for k, v in os.environ.items():
        if v:
            data[k] = v
    return data


def env_get(data: dict[str, str], *keys: str, default: str = "") -> str:
    for k in keys:
        v = (data.get(k) or "").strip()
        if v:
            return v
    return default


def run(ssh: paramiko.SSHClient, cmd: str, check: bool = True, timeout: int = 300) -> tuple[int, str]:
    print(f"\n>>> {cmd[:220]}")
    _, stdout, _ = ssh.exec_command(cmd, get_pty=True, timeout=timeout)
    out = stdout.read().decode("utf-8", errors="replace")
    code = stdout.channel.recv_exit_status()
    print(out[-4000:] if len(out) > 4000 else out)
    if check and code != 0:
        raise RuntimeError(f"cmd failed ({code}): {cmd}")
    return code, out


def sftp_put_dir(sftp: paramiko.SFTPClient, local: Path, remote: str) -> None:
    try:
        sftp.stat(remote)
    except FileNotFoundError:
        sftp.mkdir(remote)
    for path in local.rglob("*"):
        rel = path.relative_to(local).as_posix()
        rpath = f"{remote}/{rel}"
        if path.is_dir():
            try:
                sftp.stat(rpath)
            except FileNotFoundError:
                sftp.mkdir(rpath)
        else:
            print(f"put {rel}")
            sftp.put(str(path), rpath)


def fqdn(name: str) -> str:
    return DNS_DOMAIN if name in ("@", "") else f"{name}.{DNS_DOMAIN}"


def ensure_dns(tc_sid: str, tc_skey: str) -> None:
    from tencentcloud.common import credential
    from tencentcloud.common.profile.client_profile import ClientProfile
    from tencentcloud.common.profile.http_profile import HttpProfile
    from tencentcloud.dnspod.v20210323 import dnspod_client, models

    cred = credential.Credential(tc_sid, tc_skey)
    hp = HttpProfile(endpoint="dnspod.tencentcloudapi.com")
    client = dnspod_client.DnspodClient(cred, "", ClientProfile(httpProfile=hp))

    req = models.DescribeRecordListRequest()
    req.Domain = DNS_DOMAIN
    req.Limit = 3000
    try:
        resp = client.DescribeRecordList(req)
        existing = {r.Name: r for r in (resp.RecordList or [])}
    except Exception as e:
        print("DescribeRecordList failed, try Create anyway:", e)
        existing = {}

    for name in DNS_RECORDS:
        label = fqdn(name)
        if name in existing:
            rec = existing[name]
            if getattr(rec, "Value", None) == DNS_VALUE and getattr(rec, "Type", None) == "A":
                print(f"DNS OK {label} -> {DNS_VALUE}")
                continue
            ureq = models.ModifyRecordRequest()
            ureq.Domain = DNS_DOMAIN
            ureq.RecordId = rec.RecordId
            ureq.RecordType = "A"
            ureq.RecordLine = "默认"
            ureq.Value = DNS_VALUE
            ureq.SubDomain = name
            ureq.TTL = 600
            client.ModifyRecord(ureq)
            print(f"DNS UPDATED {label} -> {DNS_VALUE}")
        else:
            creq = models.CreateRecordRequest()
            creq.Domain = DNS_DOMAIN
            creq.SubDomain = name
            creq.RecordType = "A"
            creq.RecordLine = "默认"
            creq.Value = DNS_VALUE
            creq.TTL = 600
            client.CreateRecord(creq)
            print(f"DNS CREATED {label} -> {DNS_VALUE}")


def local_build() -> None:
    skip = os.environ.get("DEPLOY_SKIP_BUILD", "").strip().lower() in ("1", "true", "yes")
    if skip and WEB_DIST.exists() and (WEB_DIST / "index.html").exists():
        print(f"Skip build, reuse {WEB_DIST}")
        return

    env = os.environ.copy()
    # CRA treats CI=true as fail-on-warning; keep false for Windows-friendly builds
    env["CI"] = "false"
    yarn = shutil.which("yarn")
    npm = shutil.which("npm")
    # Prefer calling react-scripts directly — package.json used to prefix "CI=false"
    # which breaks under Windows cmd.
    if yarn:
        print("Building with yarn react-scripts ...")
        subprocess.check_call(
            [yarn, "run", "react-scripts", "build"],
            cwd=str(ROOT),
            env=env,
            shell=False,
        )
    elif npm:
        print("Building with npx react-scripts ...")
        subprocess.check_call(
            [npm, "exec", "--", "react-scripts", "build"],
            cwd=str(ROOT),
            env=env,
            shell=False,
        )
    else:
        raise RuntimeError("yarn/npm not found; cannot build SPA")

    if not (WEB_DIST / "index.html").exists():
        raise RuntimeError(f"build missing index.html: {WEB_DIST}")


def main() -> int:
    data = load_merged()
    user = env_get(data, "DEPLOY_SSH_USER", default="ubuntu")
    password = env_get(data, "DEPLOY_SSH_PASSWORD")
    if not password:
        print("缺少 DEPLOY_SSH_PASSWORD（可用 ~/.aimatex-music-deploy.env）", file=sys.stderr)
        return 1

    tc_sid = env_get(data, "TENCENTCLOUD_SECRET_ID")
    tc_skey = env_get(data, "TENCENTCLOUD_SECRET_KEY")
    if not tc_sid or not tc_skey:
        print("缺少 TENCENTCLOUD_SECRET_ID/KEY（用于 DNSPod）", file=sys.stderr)
        return 1

    skip_dns = os.environ.get("DEPLOY_SKIP_DNS", "").strip().lower() in ("1", "true", "yes")

    local_build()

    if not skip_dns:
        print("Ensuring DNS ...")
        ensure_dns(tc_sid, tc_skey)

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print(f"Connecting {user}@{HOST} ...")
    ssh.connect(
        HOST,
        username=user,
        password=password,
        timeout=30,
        allow_agent=False,
        look_for_keys=False,
    )

    run(
        ssh,
        "sudo apt-get update -qq && sudo DEBIAN_FRONTEND=noninteractive "
        "apt-get install -y -qq nginx certbot python3-certbot-nginx curl",
        timeout=600,
    )
    run(ssh, f"mkdir -p {REMOTE_WEB}")
    run(ssh, "sudo mkdir -p /var/www/certbot/.well-known/acme-challenge && sudo chmod -R 755 /var/www/certbot")
    run(ssh, "sudo chmod 755 /home/ubuntu")

    print(f"Uploading SPA -> {REMOTE_WEB}")
    run(ssh, f"rm -rf {REMOTE_WEB}/*")
    sftp = ssh.open_sftp()
    sftp_put_dir(sftp, WEB_DIST, REMOTE_WEB)
    sftp.close()
    run(ssh, f"chmod 755 /home/ubuntu /home/ubuntu/web {REMOTE_WEB}")

    apex_b64 = base64.b64encode(NGINX_APEX.encode()).decode()
    www_b64 = base64.b64encode(NGINX_WWW.encode()).decode()
    run(
        ssh,
        f"echo {apex_b64} | base64 -d | sudo tee /etc/nginx/sites-available/{SITE_FILE} >/dev/null",
    )
    run(
        ssh,
        f"echo {www_b64} | base64 -d | sudo tee /etc/nginx/sites-available/{WWW_DOMAIN} >/dev/null",
    )
    run(
        ssh,
        f"sudo ln -sfn /etc/nginx/sites-available/{SITE_FILE} /etc/nginx/sites-enabled/{SITE_FILE} && "
        f"sudo ln -sfn /etc/nginx/sites-available/{WWW_DOMAIN} /etc/nginx/sites-enabled/{WWW_DOMAIN}",
    )
    # drop leftover default site if it steals aimatex.com
    run(ssh, "sudo rm -f /etc/nginx/sites-enabled/default", check=False)
    run(ssh, "sudo nginx -t && sudo systemctl reload nginx")
    run(
        ssh,
        "sudo ufw allow OpenSSH || true; sudo ufw allow 80/tcp || true; sudo ufw allow 443/tcp || true",
        check=False,
    )

    run(ssh, f"curl -sfI http://127.0.0.1/ -H 'Host: {WEB_DOMAIN}' | head -8", check=False)

    # Wait briefly — LE validators may still see old Netlify A/AAAA after DNS cutover
    print("Waiting for DNS cutover (20s) ...")
    run(ssh, "sleep 20", check=False)

    print("Issuing / renewing TLS certificates ...")
    # Apex first (more reliable right after leaving Netlify), then expand www
    run(
        ssh,
        f"sudo certbot --nginx -d {WEB_DOMAIN} "
        f"--non-interactive --agree-tos --register-unsafely-without-email --redirect",
        check=False,
        timeout=180,
    )
    run(
        ssh,
        f"sudo certbot --nginx -d {WEB_DOMAIN} -d {WWW_DOMAIN} "
        f"--expand --non-interactive --agree-tos --register-unsafely-without-email --redirect",
        check=False,
        timeout=180,
    )
    # Re-assert www → https apex (certbot may rewrite server blocks)
    www_b64_final = base64.b64encode(NGINX_WWW.encode()).decode()
    run(
        ssh,
        f"echo {www_b64_final} | base64 -d | sudo tee /etc/nginx/sites-available/{WWW_DOMAIN} >/dev/null",
        check=False,
    )
    # If certbot added a 443 block for www, keep ACME + redirect to apex
    run(
        ssh,
        f"sudo certbot install --cert-name {WEB_DOMAIN} --nginx -d {WWW_DOMAIN} "
        f"--redirect --non-interactive 2>/dev/null || true",
        check=False,
    )
    run(ssh, "sudo nginx -t && sudo systemctl reload nginx", check=False)
    run(
        ssh,
        "sudo systemctl enable --now certbot.timer 2>/dev/null || "
        "sudo systemctl enable --now snap.certbot.renew.timer 2>/dev/null || true",
        check=False,
    )

    run(ssh, f"curl -sfI https://{WEB_DOMAIN}/ | head -10", check=False)
    run(ssh, f"curl -sfI https://{WWW_DOMAIN}/ | head -10", check=False)
    run(ssh, "systemctl list-timers 'certbot*' --no-pager 2>/dev/null | head -5 || true", check=False)

    ssh.close()
    print("\nDeploy finished.")
    print(f"  Web:  https://{WEB_DOMAIN}")
    print(f"  WWW:  https://{WWW_DOMAIN}  (should redirect to apex)")
    print(f"  Path: {REMOTE_WEB}")
    print("  TLS:  certbot.timer enabled for auto-renew")
    print("  Note: API still https://api.ai2obj.com — Netlify no longer required")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
