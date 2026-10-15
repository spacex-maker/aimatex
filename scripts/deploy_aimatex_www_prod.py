#!/usr/bin/env python3
"""Deploy aimatex.com SPA with geo split:

  境内 DNS → Chengdu nginx  (/home/ubuntu/web/aimatex)
  境外 DNS → Netlify        (aimatex.netlify.app / apex 75.2.60.5)

Usage:
  py -3 scripts/deploy_aimatex_www_prod.py
  DEPLOY_SKIP_BUILD=1 py -3 scripts/deploy_aimatex_www_prod.py
  DEPLOY_SKIP_DNS=1   py -3 scripts/deploy_aimatex_www_prod.py
  DEPLOY_SKIP_NETLIFY=1 / DEPLOY_SKIP_CHENGDU=1
  DEPLOY_FRONTEND_ONLY=1   # Chengdu: upload static only (no apt/certbot)

Netlify auth (optional but needed for CLI publish):
  NETLIFY_AUTH_TOKEN=...   # Personal Access Token
  NETLIFY_SITE_ID=aimatex  # site name or UUID (default: aimatex)
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

# Netlify external DNS (apex A + www CNAME)
NETLIFY_APEX_IP = "75.2.60.5"
NETLIFY_SITE_HOST = "aimatex.netlify.app"
NETLIFY_SITE_DEFAULT = "aimatex"

# DNSPod 智能解析：境内→成都，境外/默认境外兜底→Netlify
# 默认也指成都，国内未命中「境内」线路时仍走国内；境外线路明确走 Netlify。
DNS_DESIRED: list[tuple[str, str, str, str]] = [
    # (subdomain, type, line, value)
    ("@", "A", "境内", HOST),
    ("@", "A", "境外", NETLIFY_APEX_IP),
    ("@", "A", "默认", HOST),
    ("www", "A", "境内", HOST),
    ("www", "CNAME", "境外", NETLIFY_SITE_HOST),
    ("www", "A", "默认", HOST),
]

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


def env_flag(name: str) -> bool:
    return os.environ.get(name, "").strip().lower() in ("1", "true", "yes")


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


def _norm_dns_value(record_type: str, value: str) -> str:
    v = (value or "").strip().rstrip(".")
    if record_type.upper() == "CNAME":
        return v.lower()
    return v


def ensure_geo_dns(tc_sid: str, tc_skey: str) -> None:
    """Upsert DNSPod geo lines for apex + www. Does not delete unrelated records."""
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
        records = list(resp.RecordList or [])
    except Exception as e:
        print("DescribeRecordList failed, try Create anyway:", e)
        records = []

    # key: (Name, Type, Line) — same name can exist on multiple lines
    by_key: dict[tuple[str, str, str], object] = {}
    for r in records:
        name = getattr(r, "Name", "") or "@"
        rtype = getattr(r, "Type", "") or ""
        line = getattr(r, "Line", "") or "默认"
        by_key[(name, rtype, line)] = r

    for name, rtype, line, value in DNS_DESIRED:
        label = fqdn(name)
        want = _norm_dns_value(rtype, value)
        key = (name, rtype, line)
        existing = by_key.get(key)

        # www 境外用 CNAME：若同线路已有 A，先删掉以免冲突
        if name == "www" and rtype == "CNAME" and line == "境外":
            a_key = ("www", "A", "境外")
            a_rec = by_key.get(a_key)
            if a_rec is not None:
                dreq = models.DeleteRecordRequest()
                dreq.Domain = DNS_DOMAIN
                dreq.RecordId = a_rec.RecordId
                client.DeleteRecord(dreq)
                print(f"DNS DELETED www A {line} (replace with CNAME)")
                by_key.pop(a_key, None)

        if existing is not None:
            cur = _norm_dns_value(rtype, getattr(existing, "Value", "") or "")
            if cur == want and getattr(existing, "Type", None) == rtype:
                print(f"DNS OK {label} [{line}] {rtype} -> {want}")
                continue
            ureq = models.ModifyRecordRequest()
            ureq.Domain = DNS_DOMAIN
            ureq.RecordId = existing.RecordId
            ureq.RecordType = rtype
            ureq.RecordLine = line
            ureq.Value = want
            ureq.SubDomain = name
            ureq.TTL = 600
            client.ModifyRecord(ureq)
            print(f"DNS UPDATED {label} [{line}] {rtype} -> {want}")
        else:
            creq = models.CreateRecordRequest()
            creq.Domain = DNS_DOMAIN
            creq.SubDomain = name
            creq.RecordType = rtype
            creq.RecordLine = line
            creq.Value = want
            creq.TTL = 600
            client.CreateRecord(creq)
            print(f"DNS CREATED {label} [{line}] {rtype} -> {want}")


def local_build() -> None:
    if env_flag("DEPLOY_SKIP_BUILD") and WEB_DIST.exists() and (WEB_DIST / "index.html").exists():
        print(f"Skip build, reuse {WEB_DIST}")
        return

    env = os.environ.copy()
    env["CI"] = "false"
    yarn = shutil.which("yarn")
    npm = shutil.which("npm")
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


def deploy_netlify(data: dict[str, str]) -> None:
    if env_flag("DEPLOY_SKIP_NETLIFY"):
        print("Skip Netlify (DEPLOY_SKIP_NETLIFY=1)")
        return

    token = env_get(data, "NETLIFY_AUTH_TOKEN", "NETLIFY_TOKEN")
    site = env_get(data, "NETLIFY_SITE_ID", "NETLIFY_SITE", default=NETLIFY_SITE_DEFAULT)
    if not token:
        print(
            "WARN: 未配置 NETLIFY_AUTH_TOKEN，跳过 Netlify 发布。"
            "请把 token 写入 secrets/deploy.env 或环境变量后重跑；"
            f"境外仍解析到 {NETLIFY_SITE_HOST}（可能是旧包）。",
            file=sys.stderr,
        )
        return

    env = os.environ.copy()
    env["NETLIFY_AUTH_TOKEN"] = token
    env["CI"] = "true"
    npx = shutil.which("npx")
    if not npx:
        raise RuntimeError("npx not found; cannot deploy to Netlify")

    print(f"Deploying to Netlify site={site} ...")
    subprocess.check_call(
        [
            npx,
            "--yes",
            "netlify-cli",
            "deploy",
            "--prod",
            "--dir",
            str(WEB_DIST),
            "--site",
            site,
            "--message",
            "aimatex geo dual-deploy",
        ],
        cwd=str(ROOT),
        env=env,
        shell=False,
    )
    print(f"Netlify OK → https://{NETLIFY_SITE_HOST} / overseas https://{WEB_DOMAIN}")


def deploy_chengdu(data: dict[str, str]) -> None:
    if env_flag("DEPLOY_SKIP_CHENGDU"):
        print("Skip Chengdu (DEPLOY_SKIP_CHENGDU=1)")
        return

    user = env_get(data, "DEPLOY_SSH_USER", default="ubuntu")
    password = env_get(data, "DEPLOY_SSH_PASSWORD")
    if not password:
        raise RuntimeError("缺少 DEPLOY_SSH_PASSWORD（可用 ~/.aimatex-music-deploy.env）")

    frontend_only = env_flag("DEPLOY_FRONTEND_ONLY")

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

    if not frontend_only:
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

    if frontend_only:
        run(ssh, "sudo nginx -t && sudo systemctl reload nginx", check=False)
        run(ssh, f"curl -sfI https://{WEB_DOMAIN}/ | head -10", check=False)
        ssh.close()
        print("Chengdu frontend-only deploy finished.")
        return

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
    run(ssh, "sudo rm -f /etc/nginx/sites-enabled/default", check=False)
    run(ssh, "sudo nginx -t && sudo systemctl reload nginx")
    run(
        ssh,
        "sudo ufw allow OpenSSH || true; sudo ufw allow 80/tcp || true; sudo ufw allow 443/tcp || true",
        check=False,
    )

    # Geo-DNS 下 HTTP-01 可能从境外打到 Netlify；已有证书时不强制重签
    run(
        ssh,
        f"test -f /etc/letsencrypt/live/{WEB_DOMAIN}/fullchain.pem && echo CERT_OK || echo CERT_MISSING",
        check=False,
    )
    if env_flag("DEPLOY_FORCE_CERT"):
        print("DEPLOY_FORCE_CERT=1 — attempting certbot (may fail under geo DNS) ...")
        run(
            ssh,
            f"sudo certbot --nginx -d {WEB_DOMAIN} -d {WWW_DOMAIN} "
            f"--non-interactive --agree-tos --register-unsafely-without-email --redirect",
            check=False,
            timeout=180,
        )
        run(ssh, "sudo nginx -t && sudo systemctl reload nginx", check=False)

    run(ssh, f"curl -sfI https://{WEB_DOMAIN}/ | head -10", check=False)
    ssh.close()
    print("Chengdu deploy finished.")


def main() -> int:
    data = load_merged()

    tc_sid = env_get(data, "TENCENTCLOUD_SECRET_ID")
    tc_skey = env_get(data, "TENCENTCLOUD_SECRET_KEY")
    skip_dns = env_flag("DEPLOY_SKIP_DNS")

    if not skip_dns and (not tc_sid or not tc_skey):
        print("缺少 TENCENTCLOUD_SECRET_ID/KEY（用于 DNSPod 智能解析）", file=sys.stderr)
        return 1

    local_build()

    if not skip_dns:
        print("Ensuring geo DNS (境内→成都, 境外→Netlify) ...")
        ensure_geo_dns(tc_sid, tc_skey)

    deploy_chengdu(data)
    deploy_netlify(data)

    print("\nDeploy finished (geo split).")
    print(f"  境内: https://{WEB_DOMAIN}  → {HOST}")
    print(f"  境外: https://{WEB_DOMAIN}  → Netlify ({NETLIFY_APEX_IP} / {NETLIFY_SITE_HOST})")
    print("  Tip: 配置 NETLIFY_AUTH_TOKEN 后重跑可同步境外包；证书续期建议 DNS-01。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
