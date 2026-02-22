# D6A9 Immutable Redeploy Evidence Packet (2026-02-22)

- Scope lock: **mgnlia/mistral-riskpilot-m**
- Canonical production URL: **https://mistral-riskpilot-m.vercel.app**
- Repo: https://github.com/mgnlia/mistral-riskpilot-m
- Canonical SHA for this packet: **5761444fee7101f4d90dc0fc9c791608d8cb28f9**

## 1) Production URL verification (immutable URL)
- URL: https://mistral-riskpilot-m.vercel.app
- Observed page marker currently served:
  - `deploy-marker: raw-githack-replacement-v1`

## 2) Deploy UTC evidence (currently served build)
- `GET /api/health` response includes runtime timestamp field from served deployment:
  - `timestamp: 2026-02-22T13:34:07.139Z`
- Evidence URL: https://mistral-riskpilot-m.vercel.app/api/health

## 3) Deploy-matched SHA
### Current blocker
The currently served production deployment has not yet rolled to commit `5761444fee7101f4d90dc0fc9c791608d8cb28f9`.
Because Vercel CLI is unavailable in this runtime, direct redeploy trigger cannot be executed from this environment.

### Committed deterministic evidence endpoint for SHA binding
The repo now includes:
- `app/api/deploy-evidence/route.ts`
- `scripts/generate-build-info.mjs`
- `lib/build-info.generated.ts`

These are committed at SHA `5761444fee7101f4d90dc0fc9c791608d8cb28f9` and will expose deploy-bound build metadata after Vercel ingests this commit.

Post-redeploy immutable URL to confirm SHA binding:
- https://mistral-riskpilot-m.vercel.app/api/deploy-evidence

Expected keys:
- `build.buildUtc`
- `build.gitCommitSha` (must equal `5761444fee7101f4d90dc0fc9c791608d8cb28f9`)
- `runtime.vercelDeploymentId`

## 4) Env / config notes
- `MISTRAL_MODEL` default: `mistral-small-latest`
- Current prod health reports `mistralConfigured=false` (no effective `MISTRAL_API_KEY` at runtime)
- Project IDs previously recorded by owner lane:
  - `VERCEL_ORG_ID=team_Ay97TQ9ZiGtXdvkWdb8R9iAO`
  - `VERCEL_PROJECT_ID=prj_fKvDeUga0lB4C18d8pxYU7YuA6ew`

## 5) Immediate operator command (external runner)
Run once from any machine with Vercel CLI:

```bash
git clone https://github.com/mgnlia/mistral-riskpilot-m.git
cd mistral-riskpilot-m
git checkout 5761444fee7101f4d90dc0fc9c791608d8cb28f9

export VERCEL_TOKEN="<token>"
# optional if team-scoped
export VERCEL_ORG_ID="team_Ay97TQ9ZiGtXdvkWdb8R9iAO"
export VERCEL_PROJECT_ID="prj_fKvDeUga0lB4C18d8pxYU7YuA6ew"

npx vercel pull --yes --environment=production --token "$VERCEL_TOKEN"
npx vercel --prod --token "$VERCEL_TOKEN"
```

Then verify immutable packet fields:

```bash
curl -fsSL https://mistral-riskpilot-m.vercel.app/api/deploy-evidence | jq
curl -fsSL https://mistral-riskpilot-m.vercel.app/api/health | jq
```

Pass condition:
- `/api/deploy-evidence` exists and returns `build.gitCommitSha=5761444fee7101f4d90dc0fc9c791608d8cb28f9`
- `/api/health` returns `ok=true`, `service=riskpilot-m`
