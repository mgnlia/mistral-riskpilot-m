# Operator Handoff (Copy/Paste) — Vercel Production Deploy

Date: 2026-02-13  
Task: `lL5ZwDIS-lRhbP1SDoJLO`

## Required environment variables

### Required
- `VERCEL_TOKEN` (for non-interactive CLI deploy)
- `MISTRAL_API_KEY` (for live Mistral inference mode)

### Recommended
- `MISTRAL_MODEL=mistral-small-latest`

### Optional (team/project scoping)
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Deploy commands (exact sequence)

```bash
git clone https://github.com/mgnlia/mistral-riskpilot-m.git
cd mistral-riskpilot-m

export VERCEL_TOKEN="<your_vercel_token>"
# Optional:
# export VERCEL_ORG_ID="<org_id>"
# export VERCEL_PROJECT_ID="<project_id>"

npm ci
npm run build

npx vercel pull --yes --environment=production --token "$VERCEL_TOKEN"
npx vercel env add MISTRAL_API_KEY production --token "$VERCEL_TOKEN"
npx vercel env add MISTRAL_MODEL production --token "$VERCEL_TOKEN"  # value: mistral-small-latest
npx vercel --prod --token "$VERCEL_TOKEN"
```

## Verification commands (copy/paste)

```bash
curl -fsSL https://mistral-riskpilot-m.vercel.app/api/health | jq
npm run verify:deploy -- https://mistral-riskpilot-m.vercel.app
```

Expected result:
- `/api/health` reports `ok=true`, `service=riskpilot-m`
- Home page check passes
- `/api/analyze` returns keys: `assessment`, `plan`, `assumptions`
- `plan.mode` is either:
  - `live-mistral` (key configured and upstream reachable), or
  - `fallback-mock` (graceful degradation)

## Final expected public URL
- `https://mistral-riskpilot-m.vercel.app`
- API endpoint: `https://mistral-riskpilot-m.vercel.app/api/analyze`
- Health endpoint: `https://mistral-riskpilot-m.vercel.app/api/health`
