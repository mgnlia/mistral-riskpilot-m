# Vercel Deploy Runbook (Exact Commands + Env)

Date: 2026-02-13  
Project: RiskPilot-M  
Repo: https://github.com/mgnlia/mistral-riskpilot-m

## Required Environment Variables
Set in Vercel project settings (Production):
- `MISTRAL_API_KEY` (required for live model mode)
- `MISTRAL_MODEL` (recommended: `mistral-small-latest`)

Optional CI/runtime variables (for CLI automation):
- `VERCEL_TOKEN` (required for non-interactive CLI)
- `VERCEL_ORG_ID` (optional if team scoping is needed)
- `VERCEL_PROJECT_ID` (optional if project already linked)

## CLI Path (Preferred)
Run from repo root (`mistral-riskpilot-m/`):

```bash
npm ci
npm run build

# pull/link project metadata
vercel pull --yes --environment=production --token "$VERCEL_TOKEN"

# set env vars (one-time)
vercel env add MISTRAL_API_KEY production --token "$VERCEL_TOKEN"
vercel env add MISTRAL_MODEL production --token "$VERCEL_TOKEN"

# deploy production
vercel --prod --token "$VERCEL_TOKEN"
```

## Operator Fallback Path (No CLI in this runtime)
1. Open Vercel dashboard -> **Add New Project**.
2. Import `mgnlia/mistral-riskpilot-m`.
3. Framework preset: **Next.js**.
4. Add production env vars:
   - `MISTRAL_API_KEY`
   - `MISTRAL_MODEL=mistral-small-latest`
5. Deploy and verify:
   - home page renders
   - `/api/analyze` returns JSON for sample payload

## Expected Production URL
Primary expectation after project naming/linking:
- `https://mistral-riskpilot-m.vercel.app`

If name conflict occurs, Vercel will issue a generated URL; alias should then be set to the canonical URL above.

## Verification Checks
- HTTP 200 on `/`
- POST `/api/analyze` returns `assessment`, `plan`, `assumptions`
- `plan.mode` is `fallback-mock` without key and `live-mistral` with valid key
