# Re-entry Packet — wOe8qvSfRJV3S8p3viR8I

- Task: `wOe8qvSfRJV3S8p3viR8I`
- Scope: Backup operator contingency for Vercel deploy URL handoff
- Verdict: **READY**
- Packet UTC: `2026-02-22T14:05:00Z`

## 1) Designated backup operator + invocation path
- Operator: **Henry (CSO)** or delegated CLI-capable operator with valid `VERCEL_TOKEN`.
- Invocation path: local shell with `git`, `vercel`, `curl`.

## 2) Identifier tuple (immutable)
- `VERCEL_ORG_ID=team_Ay97TQ9ZiGtXdvkWdb8R9iAO`
- `VERCEL_PROJECT_ID=prj_fKvDeUga0lB4C18d8pxYU7YuA6ew`
- Immutable source:
  - https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/271e39c0dd12e2f2b486d82a06c3cd85b6275874/.vercel/project.json

## 3) Executable fallback runbook
```bash
set -euo pipefail
export REPO_URL="https://github.com/mgnlia/mistral-riskpilot-m.git"
export DEPLOY_SHA="271e39c0dd12e2f2b486d82a06c3cd85b6275874"
export VERCEL_ORG_ID="team_Ay97TQ9ZiGtXdvkWdb8R9iAO"
export VERCEL_PROJECT_ID="prj_fKvDeUga0lB4C18d8pxYU7YuA6ew"
export PROD_URL="https://mistral-riskpilot-m.vercel.app"
export HEALTH_URL="https://mistral-riskpilot-m.vercel.app/api/health"
export EXPECTED_MARKER="deploy-marker: raw-githack-replacement-v1"
: "${VERCEL_TOKEN:?missing VERCEL_TOKEN}"
command -v vercel >/dev/null || npm i -g vercel@latest
w="$(mktemp -d)" && cd "$w"
git clone "$REPO_URL" repo && cd repo
git checkout "$DEPLOY_SHA"
test "$(git rev-parse HEAD)" = "$DEPLOY_SHA"
grep -q "$EXPECTED_MARKER" app/page.tsx
vercel pull --yes --environment=production --token "$VERCEL_TOKEN"
vercel deploy --prod --yes --token "$VERCEL_TOKEN"
HOME_HTTP="$(curl -sS -o /tmp/home.html -w "%{http_code}" "$PROD_URL")"
HEALTH_HTTP="$(curl -sS -o /tmp/health.json -w "%{http_code}" "$HEALTH_URL")"
test "$HOME_HTTP" = "200"
test "$HEALTH_HTTP" = "200"
grep -q "$EXPECTED_MARKER" /tmp/home.html
grep -q '"ok":true' /tmp/health.json
```

## 4) Validated procedure evidence (immutable + live verification tuple)
- Production URL: https://mistral-riskpilot-m.vercel.app
- Health URL: https://mistral-riskpilot-m.vercel.app/api/health
- Deploy-matched SHA: `271e39c0dd12e2f2b486d82a06c3cd85b6275874`
- Verified UTC from live health payload: `2026-02-22T13:34:07.139Z`
- Immutable marker source:
  - https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/271e39c0dd12e2f2b486d82a06c3cd85b6275874/app/page.tsx

## 5) Scope linkage note
- Applicability: **in-scope** (production URL + UTC + SHA included above).
