#!/usr/bin/env python3
"""Fix aimatex.com / www HTTPS on Chengdu (geo-DNS safe via DNS-01).

Problem: apex HTTPS falls through to chat.aimatex.com cert (name mismatch).
HTTP-01 often fails because overseas DNS points at Netlify.

Strategy:
  1. Ensure nginx HTTP vhosts + ACME webroot exist.
  2. Try certbot webroot HTTP-01 first.
  3. On failure, issue via acme.sh + DNSPod DNS API (TENCENTCLOUD_* / DNSPOD_*).
  4. Install SSL nginx server blocks for aimatex.com + www.
"""
from __future__ import annotations

import base64
import os
import sys
import time
from pathlib import Path

import paramiko

HOST = "139.155.130.167"
WEB_DOMAIN = "aimatex.com"
WWW_DOMAIN = "www.aimatex.com"
REMOTE_WEB = "/home/ubuntu/web/aimatex"
SITE_FILE = "aimatex.com"

ROOT = Path(__file__).resolve().parents[1]
NAS_SECRETS = Path(r"F:\dev\proj2\aimatex-nas\secrets")
DEPLOY_ENV_CANDIDATES = (
    Path.home() / ".aimatex-music-deploy.env",
    Path.home() / ".aimatex-chat-deploy.env",
    ROOT / "secrets" / "deploy.env",
)

NGINX_HTTP_APEX = f"""server {{
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

NGINX_HTTP_WWW = f"""server {{
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

NGINX_SSL = f"""server {{
    listen 80;
    server_name {WEB_DOMAIN};

    location ^~ /.well-known/acme-challenge/ {{
        default_type "text/plain";
        root /var/www/certbot;
    }}

    location / {{
        return 301 https://$host$request_uri;
    }}
}}

server {{
    listen 443 ssl http2;
    server_name {WEB_DOMAIN};

    ssl_certificate /etc/nginx/ssl/{WEB_DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/{WEB_DOMAIN}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;

    root {REMOTE_WEB};
    index index.html;
    client_max_body_size 32m;

    location /static/ {{
        expires 30d;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }}

    location / {{
        try_files $uri $uri/ /index.html;
    }}
}}

server {{
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

server {{
    listen 443 ssl http2;
    server_name {WWW_DOMAIN};

    ssl_certificate /etc/nginx/ssl/{WEB_DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/{WEB_DOMAIN}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;

    return 301 https://{WEB_DOMAIN}$request_uri;
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
    print(f"\n>>> {cmd[:240]}")
    _, stdout, _ = ssh.exec_command(cmd, get_pty=True, timeout=timeout)
    out = stdout.read().decode("utf-8", errors="replace")
    code = stdout.channel.recv_exit_status()
    print(out[-5000:] if len(out) > 5000 else out)
    if check and code != 0:
        raise RuntimeError(f"cmd failed ({code}): {cmd}")
    return code, out


def tee_b64(ssh: paramiko.SSHClient, content: str, remote_path: str) -> None:
    b64 = base64.b64encode(content.encode()).decode()
    run(ssh, f"echo {b64} | base64 -d | sudo tee {remote_path} >/dev/null")


def ensure_http_vhosts(ssh: paramiko.SSHClient) -> None:
    run(ssh, f"mkdir -p {REMOTE_WEB}")
    run(ssh, "sudo mkdir -p /var/www/certbot/.well-known/acme-challenge && sudo chmod -R 755 /var/www/certbot")
    run(ssh, "sudo chmod 755 /home/ubuntu /home/ubuntu/web 2>/dev/null || true", check=False)
    tee_b64(ssh, NGINX_HTTP_APEX, f"/etc/nginx/sites-available/{SITE_FILE}")
    tee_b64(ssh, NGINX_HTTP_WWW, f"/etc/nginx/sites-available/{WWW_DOMAIN}")
    run(
        ssh,
        f"sudo ln -sfn /etc/nginx/sites-available/{SITE_FILE} /etc/nginx/sites-enabled/{SITE_FILE} && "
        f"sudo ln -sfn /etc/nginx/sites-available/{WWW_DOMAIN} /etc/nginx/sites-enabled/{WWW_DOMAIN}",
    )
    run(ssh, "sudo nginx -t && sudo systemctl reload nginx")


SSL_DIR = f"/etc/nginx/ssl/{WEB_DOMAIN}"


def cert_exists(ssh: paramiko.SSHClient) -> bool:
    _, out = run(
        ssh,
        f"test -f {SSL_DIR}/fullchain.pem && test -f {SSL_DIR}/privkey.pem && echo CERT_OK || echo CERT_MISSING",
        check=False,
    )
    return "CERT_OK" in out


def install_acme_to_nginx(ssh: paramiko.SSHClient) -> bool:
    """Copy acme.sh cert into nginx ssl dir and register renew hook."""
    run(ssh, f"sudo mkdir -p {SSL_DIR}")
    code, _ = run(
        ssh,
        f"if [ -f \"$HOME/.acme.sh/{WEB_DOMAIN}_ecc/fullchain.cer\" ]; then "
        f"  sudo cp -f \"$HOME/.acme.sh/{WEB_DOMAIN}_ecc/fullchain.cer\" {SSL_DIR}/fullchain.pem && "
        f"  sudo cp -f \"$HOME/.acme.sh/{WEB_DOMAIN}_ecc/{WEB_DOMAIN}.key\" {SSL_DIR}/privkey.pem; "
        f"elif [ -f \"$HOME/.acme.sh/{WEB_DOMAIN}/fullchain.cer\" ]; then "
        f"  sudo cp -f \"$HOME/.acme.sh/{WEB_DOMAIN}/fullchain.cer\" {SSL_DIR}/fullchain.pem && "
        f"  sudo cp -f \"$HOME/.acme.sh/{WEB_DOMAIN}/{WEB_DOMAIN}.key\" {SSL_DIR}/privkey.pem; "
        f"else exit 1; fi && "
        f"sudo chmod 644 {SSL_DIR}/fullchain.pem && sudo chmod 600 {SSL_DIR}/privkey.pem",
        check=False,
    )
    if code != 0:
        return False
    run(
        ssh,
        f'"$HOME/.acme.sh/acme.sh" --install-cert -d {WEB_DOMAIN} '
        f"--fullchain-file /tmp/aimatex-fullchain.pem "
        f"--key-file /tmp/aimatex-privkey.pem "
        f'--reloadcmd "sudo cp /tmp/aimatex-fullchain.pem {SSL_DIR}/fullchain.pem && '
        f"sudo cp /tmp/aimatex-privkey.pem {SSL_DIR}/privkey.pem && "
        f'sudo nginx -t && sudo systemctl reload nginx"',
        check=False,
    )
    return cert_exists(ssh)


def try_http01(ssh: paramiko.SSHClient) -> bool:
    print("Trying certbot HTTP-01 (webroot) ...")
    code, _ = run(
        ssh,
        f"sudo certbot certonly --webroot -w /var/www/certbot "
        f"-d {WEB_DOMAIN} -d {WWW_DOMAIN} "
        f"--non-interactive --agree-tos --register-unsafely-without-email "
        f"--cert-name {WEB_DOMAIN}",
        check=False,
        timeout=180,
    )
    if code != 0:
        return False
    # Normalize certbot live path into nginx ssl dir
    run(ssh, f"sudo mkdir -p {SSL_DIR}")
    run(
        ssh,
        f"sudo cp -fL /etc/letsencrypt/live/{WEB_DOMAIN}/fullchain.pem {SSL_DIR}/fullchain.pem && "
        f"sudo cp -fL /etc/letsencrypt/live/{WEB_DOMAIN}/privkey.pem {SSL_DIR}/privkey.pem",
        check=False,
    )
    return cert_exists(ssh)


def try_dns01_acme(ssh: paramiko.SSHClient, data: dict[str, str]) -> bool:
    """Use acme.sh + Tencent Cloud DNS API (DNS-01)."""
    tc_sid = env_get(data, "TENCENTCLOUD_SECRET_ID", "Tencent_SecretId")
    tc_skey = env_get(data, "TENCENTCLOUD_SECRET_KEY", "Tencent_SecretKey")
    if not tc_sid or not tc_skey:
        print("No TENCENTCLOUD_SECRET_ID/KEY; skip acme.sh dns_tencent.")
        return False

    print("Issuing via acme.sh DNS-01 (dns_tencent) ...")
    run(
        ssh,
        "test -x \"$HOME/.acme.sh/acme.sh\" || curl -fsSL https://get.acme.sh | sh -s email=admin@aimatex.com",
        timeout=180,
    )
    run(ssh, '"$HOME/.acme.sh/acme.sh" --set-default-ca --server letsencrypt', check=False)

    # Write creds to a temp file on the remote host (avoid printing secrets in process list logs).
    sftp = ssh.open_sftp()
    remote_env = "/tmp/.aimatex-acme-tencent.env"
    with sftp.file(remote_env, "w") as f:
        f.write(f"export Tencent_SecretId={sh_quote(tc_sid)}\n")
        f.write(f"export Tencent_SecretKey={sh_quote(tc_skey)}\n")
    sftp.chmod(remote_env, 0o600)
    sftp.close()

    issue = (
        f"set -a; . {remote_env}; set +a; rm -f {remote_env}; "
        f'"$HOME/.acme.sh/acme.sh" --issue -d {WEB_DOMAIN} -d {WWW_DOMAIN} '
        f"--dns dns_tencent --server letsencrypt --force"
    )
    code, _ = run(ssh, issue, check=False, timeout=420)
    run(ssh, f"rm -f {remote_env}", check=False)
    if code != 0:
        return False
    return install_acme_to_nginx(ssh)


def sh_quote(s: str) -> str:
    return "'" + s.replace("'", "'\"'\"'") + "'"


def flip_overseas_dns_to_chengdu(data: dict[str, str]) -> list[tuple]:
    """Point 境外/默认 apex+www A to Chengdu temporarily. Returns restore tuples."""
    from tencentcloud.common import credential
    from tencentcloud.common.profile.client_profile import ClientProfile
    from tencentcloud.common.profile.http_profile import HttpProfile
    from tencentcloud.dnspod.v20210323 import dnspod_client, models

    tc_sid = env_get(data, "TENCENTCLOUD_SECRET_ID")
    tc_skey = env_get(data, "TENCENTCLOUD_SECRET_KEY")
    if not tc_sid or not tc_skey:
        raise RuntimeError("缺少 TENCENTCLOUD_SECRET_ID/KEY")

    cred = credential.Credential(tc_sid, tc_skey)
    hp = HttpProfile(endpoint="dnspod.tencentcloudapi.com")
    client = dnspod_client.DnspodClient(cred, "", ClientProfile(httpProfile=hp))

    req = models.DescribeRecordListRequest()
    req.Domain = WEB_DOMAIN
    req.Limit = 3000
    resp = client.DescribeRecordList(req)
    records = list(resp.RecordList or [])

    restore: list[tuple] = []
    # Targets that LE validators / overseas may hit
    want_lines = {"境外", "默认"}
    for r in records:
        name = getattr(r, "Name", "") or "@"
        rtype = getattr(r, "Type", "") or ""
        line = getattr(r, "Line", "") or "默认"
        value = getattr(r, "Value", "") or ""
        if name not in ("@", "www"):
            continue
        if line not in want_lines:
            continue
        if rtype == "A" and value.strip() == HOST:
            print(f"DNS already Chengdu: {name} {rtype} [{line}]")
            continue
        restore.append((r.RecordId, name, rtype, line, value))
        if rtype == "CNAME":
            # Replace CNAME with A to Chengdu for HTTP-01
            dreq = models.DeleteRecordRequest()
            dreq.Domain = WEB_DOMAIN
            dreq.RecordId = r.RecordId
            client.DeleteRecord(dreq)
            creq = models.CreateRecordRequest()
            creq.Domain = WEB_DOMAIN
            creq.SubDomain = name
            creq.RecordType = "A"
            creq.RecordLine = line
            creq.Value = HOST
            creq.TTL = 60
            created = client.CreateRecord(creq)
            # Remember to delete this temp A and recreate CNAME
            print(f"DNS TEMP: deleted CNAME {name}[{line}]={value}, created A -> {HOST} id={created.RecordId}")
            restore[-1] = ("recreate_cname", name, "CNAME", line, value, created.RecordId)
        elif rtype == "A":
            ureq = models.ModifyRecordRequest()
            ureq.Domain = WEB_DOMAIN
            ureq.RecordId = r.RecordId
            ureq.RecordType = "A"
            ureq.RecordLine = line
            ureq.Value = HOST
            ureq.SubDomain = name
            ureq.TTL = 60
            client.ModifyRecord(ureq)
            print(f"DNS TEMP: {name} A [{line}] {value} -> {HOST}")
    return restore


def restore_dns(data: dict[str, str], restore: list[tuple]) -> None:
    if not restore:
        return
    from tencentcloud.common import credential
    from tencentcloud.common.profile.client_profile import ClientProfile
    from tencentcloud.common.profile.http_profile import HttpProfile
    from tencentcloud.dnspod.v20210323 import dnspod_client, models

    tc_sid = env_get(data, "TENCENTCLOUD_SECRET_ID")
    tc_skey = env_get(data, "TENCENTCLOUD_SECRET_KEY")
    cred = credential.Credential(tc_sid, tc_skey)
    hp = HttpProfile(endpoint="dnspod.tencentcloudapi.com")
    client = dnspod_client.DnspodClient(cred, "", ClientProfile(httpProfile=hp))

    for item in restore:
        if item[0] == "recreate_cname":
            _, name, rtype, line, value, temp_id = item
            dreq = models.DeleteRecordRequest()
            dreq.Domain = WEB_DOMAIN
            dreq.RecordId = temp_id
            try:
                client.DeleteRecord(dreq)
            except Exception as e:
                print(f"warn delete temp A: {e}")
            creq = models.CreateRecordRequest()
            creq.Domain = WEB_DOMAIN
            creq.SubDomain = name
            creq.RecordType = rtype
            creq.RecordLine = line
            creq.Value = value.rstrip(".")
            creq.TTL = 600
            client.CreateRecord(creq)
            print(f"DNS RESTORED CNAME {name}[{line}] -> {value}")
        else:
            rid, name, rtype, line, value = item
            ureq = models.ModifyRecordRequest()
            ureq.Domain = WEB_DOMAIN
            ureq.RecordId = rid
            ureq.RecordType = rtype
            ureq.RecordLine = line
            ureq.Value = value
            ureq.SubDomain = name
            ureq.TTL = 600
            client.ModifyRecord(ureq)
            print(f"DNS RESTORED {name} {rtype} [{line}] -> {value}")


def try_http01_after_dns_flip(ssh: paramiko.SSHClient, data: dict[str, str]) -> bool:
    restore: list[tuple] = []
    try:
        print("Temporarily pointing overseas/default DNS to Chengdu for HTTP-01 ...")
        restore = flip_overseas_dns_to_chengdu(data)
        print("Waiting 70s for DNS TTL/propagation ...")
        time.sleep(70)
        ok = try_http01(ssh)
        return ok
    finally:
        try:
            restore_dns(data, restore)
        except Exception as e:
            print(f"ERROR restoring DNS: {e}", file=sys.stderr)


def install_ssl_nginx(ssh: paramiko.SSHClient) -> None:
    # Single combined file for apex+www SSL
    tee_b64(ssh, NGINX_SSL, f"/etc/nginx/sites-available/{SITE_FILE}")
    # Remove separate www-only http file to avoid duplicate server_name
    run(ssh, f"sudo rm -f /etc/nginx/sites-enabled/{WWW_DOMAIN}", check=False)
    run(
        ssh,
        f"sudo ln -sfn /etc/nginx/sites-available/{SITE_FILE} /etc/nginx/sites-enabled/{SITE_FILE}",
    )
    run(ssh, "sudo nginx -t && sudo systemctl reload nginx")


def diagnose(ssh: paramiko.SSHClient) -> None:
    run(ssh, "ls -la /etc/nginx/sites-enabled/", check=False)
    run(ssh, "ls -la /etc/letsencrypt/live/ 2>/dev/null || echo NO_LE", check=False)
    run(
        ssh,
        f"echo | openssl s_client -connect 127.0.0.1:443 -servername {WEB_DOMAIN} 2>/dev/null | "
        "openssl x509 -noout -subject -dates -ext subjectAltName 2>/dev/null || true",
        check=False,
    )
    run(ssh, f"curl -sfI --resolve {WEB_DOMAIN}:443:127.0.0.1 https://{WEB_DOMAIN}/ | head -15", check=False)


def main() -> int:
    data = load_merged()
    password = env_get(data, "DEPLOY_SSH_PASSWORD")
    user = env_get(data, "DEPLOY_SSH_USER", default="ubuntu")
    if not password:
        print("缺少 DEPLOY_SSH_PASSWORD", file=sys.stderr)
        return 1

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print(f"Connecting {user}@{HOST} ...")
    ssh.connect(HOST, username=user, password=password, timeout=30, allow_agent=False, look_for_keys=False)

    print("=== before ===")
    diagnose(ssh)

    ensure_http_vhosts(ssh)

    ok = cert_exists(ssh)
    if not ok:
        ok = try_http01(ssh)
    if not ok:
        ok = try_dns01_acme(ssh, data)
    if not ok:
        ok = try_http01_after_dns_flip(ssh, data)
    if not ok:
        print("FAILED to obtain certificate for aimatex.com", file=sys.stderr)
        diagnose(ssh)
        ssh.close()
        return 1

    install_ssl_nginx(ssh)
    print("=== after ===")
    diagnose(ssh)
    ssh.close()
    print(f"\nDone. Verify: https://{WEB_DOMAIN}/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
