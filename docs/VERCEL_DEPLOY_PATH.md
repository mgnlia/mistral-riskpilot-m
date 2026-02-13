# Early Deploy Path Plan — Vercel

Date: 2026-02-13  
Project: RiskPilot-M  
Repo: https://github.com/mgnlia/mistral-riskpilot-m

## Target Outcome
Publish and verify a production URL for the `main` branch as early as possible, then iterate safely.

## Path A (Preferred): CLI Deploy
1. Ensure Vercel CLI is installed in runner environment.
2. Authenticate with token-backed flow.
3. Configure project and env vars.
4. Deploy production build.

### Commands
```bash
npm ci
npm run build
vercel pull --yes --environment=production
vercel env add MISTRAL_API_KEY production
vercel env add MISTRAL_MODEL production
vercel --prod
```

## Path B (Fallback): Vercel Git Integration (Operator-assisted)
1. Open Vercel dashboard and import `mgnlia/mistral-riskpilot-m`.
2. Set framework preset to **Next.js**.
3. Add production env vars:
   - `MISTRAL_API_KEY`
   - `MISTRAL_MODEL` (default: `mistral-small-latest`)
4. Deploy and capture live URL.
5. Confirm redeploy trigger on pushes to `main`.

## Explicit Blockers (current)
1. **`vercel` executable unavailable in current runtime**
   - Observed error: executable-not-found when attempting CLI deploy.
2. **No guaranteed access to required Vercel auth variables from this runtime**
   - `VERCEL_TOKEN` (and optionally `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) may be missing.
3. **No browser-interactive fallback from this agent runtime**
   - Git-integration setup requires a human/operator session.

## Blocker Mitigations
- Keep repository continuously deploy-ready (build-safe commits only).
- Provide exact command runbook (Path A) for operator handoff.
- If CLI remains blocked, execute Path B immediately via human operator to avoid schedule slip.

## Definition of Done for Deploy Step
- Production URL shared in task and README.
- URL health-checked (home page + `/api/analyze` tested with sample payload).
- Deploy record URL attached to task evidence.
