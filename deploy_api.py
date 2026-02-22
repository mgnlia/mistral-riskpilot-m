#!/usr/bin/env python3
import base64
import json
import os
import sys
import time
import subprocess
from pathlib import Path
from urllib import request, error

ROOT = Path(__file__).resolve().parent
PROJECT_JSON = ROOT / '.vercel' / 'project.json'
REPO_URL = 'https://github.com/mgnlia/mistral-riskpilot-m'

EXCLUDE_DIRS = {'.git', '.next', 'node_modules', '.turbo', '.cache', '__pycache__'}
EXCLUDE_FILES = {'deploy_api.py', 'deploy_proof_packet.json'}


def get_main_sha() -> str:
    try:
        out = subprocess.check_output(['git', 'ls-remote', REPO_URL, 'refs/heads/main'], text=True, timeout=30).strip()
        return out.split()[0] if out else 'unknown'
    except Exception:
        return 'unknown'


def load_project_meta():
    data = json.loads(PROJECT_JSON.read_text())
    return data['projectName'], data['projectId'], data['orgId']


def collect_files(root: Path):
    files = []
    for p in root.rglob('*'):
        rel = p.relative_to(root)
        if any(part in EXCLUDE_DIRS for part in rel.parts):
            continue
        if p.is_dir():
            continue
        if p.name in EXCLUDE_FILES:
            continue
        files.append({
            'file': str(rel).replace('\\', '/'),
            'data': base64.b64encode(p.read_bytes()).decode('ascii'),
            'encoding': 'base64',
        })
    return files


def api_json(method: str, url: str, token: str, payload=None):
    data = None if payload is None else json.dumps(payload).encode('utf-8')
    req = request.Request(url, data=data, headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json',
    }, method=method)
    try:
        with request.urlopen(req, timeout=120) as resp:
            txt = resp.read().decode('utf-8')
            return resp.status, (json.loads(txt) if txt else {})
    except error.HTTPError as e:
        raw = e.read().decode('utf-8', errors='ignore')
        try:
            return e.code, json.loads(raw)
        except Exception:
            return e.code, {'error_raw': raw}


def check_url(url: str):
    if not url:
        return None
    req = request.Request(url, method='GET', headers={'User-Agent': 'deploy-check'})
    try:
        with request.urlopen(req, timeout=60) as resp:
            return resp.status
    except error.HTTPError as e:
        return e.code
    except Exception:
        return None


def main():
    token = os.getenv('VERCEL_TOKEN')
    if not token:
        print('Missing VERCEL_TOKEN', file=sys.stderr)
        sys.exit(2)

    project_name, project_id, org_id = load_project_meta()
    commit_sha = get_main_sha()
    files = collect_files(ROOT)

    create_url = f'https://api.vercel.com/v13/deployments?teamId={org_id}'
    payload = {
        'name': project_name,
        'project': project_name,
        'files': files,
        'projectSettings': {'framework': 'nextjs'},
        'target': 'production',
        'meta': {
            'githubCommitSha': commit_sha,
            'githubCommitRef': 'main',
            'githubRepository': 'mgnlia/mistral-riskpilot-m'
        }
    }

    started_utc = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
    status, res = api_json('POST', create_url, token, payload)
    if status >= 300:
        print(json.dumps({'step': 'create_deployment', 'status': status, 'response': res}, indent=2))
        sys.exit(1)

    dep_id = res.get('id')
    dep_url = res.get('url')
    inspector = res.get('inspectorUrl')
    if not dep_id:
        print(json.dumps({'step': 'create_deployment', 'error': 'missing id', 'response': res}, indent=2))
        sys.exit(1)

    poll_url = f'https://api.vercel.com/v13/deployments/{dep_id}?teamId={org_id}'
    states = []
    final = res
    for _ in range(120):
        s, info = api_json('GET', poll_url, token)
        if s >= 300:
            states.append(f'POLL_HTTP_{s}')
            time.sleep(2)
            continue
        st = info.get('readyState') or info.get('state') or 'UNKNOWN'
        states.append(st)
        final = info
        if st in ('READY', 'ERROR', 'CANCELED'):
            break
        time.sleep(2)

    final_state = final.get('readyState') or final.get('state')
    canonical = f'https://{project_name}.vercel.app'
    dep_https = f'https://{dep_url}' if dep_url else None

    packet = {
        'project': project_name,
        'projectId': project_id,
        'orgId': org_id,
        'deploymentId': dep_id,
        'deploymentUrl': dep_https,
        'canonicalUrl': canonical,
        'inspectorUrl': inspector,
        'deployStartUtc': started_utc,
        'deployFinishUtc': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
        'finalState': final_state,
        'stateTrace': states,
        'deployMatchedCommitSha': commit_sha,
        'envConfigNotes': {
            'MISTRAL_API_KEY': 'Required for live Mistral inference in /api/analyze. Without it, deterministic fallback mode is used.',
            'MISTRAL_MODEL': 'Optional; defaults to mistral-small-latest.'
        },
        'verification': {
            'canonical': {
                '/': check_url(canonical),
                '/api/health': check_url(canonical + '/api/health')
            },
            'deploymentUrl': {
                '/': check_url(dep_https),
                '/api/health': check_url(dep_https + '/api/health' if dep_https else None)
            }
        }
    }

    (ROOT / 'deploy_proof_packet.json').write_text(json.dumps(packet, indent=2))
    print(json.dumps(packet, indent=2))

    if final_state != 'READY':
        sys.exit(1)


if __name__ == '__main__':
    main()
