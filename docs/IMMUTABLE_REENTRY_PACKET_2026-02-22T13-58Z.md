# IMMUTABLE RE-ENTRY PACKET — 2026-02-22T13:58Z

## A) Scoped repo + immutable Vercel identifier source
- Scoped repo: `mgnlia/mistral-riskpilot-m`
- Immutable source (pinned SHA):
  - https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/73d4ae7dc5c73de853f41b654a90f33fd6052b8b/.vercel/project.json
- Parsed identifiers (from source above):
  - `orgId = team_Ay97TQ9ZiGtXdvkWdb8R9iAO`
  - `projectId = prj_fKvDeUga0lB4C18d8pxYU7YuA6ew`
  - `projectName = mistral-riskpilot-m`

## B) Kidrunner fallback-identifier evidence (immutable)
- Repo: `mgnlia/kidrunner-android-prototype`
- Pinned commit used: `98cb31d`
- Immutable checkpoint-site config proof:
  - https://raw.githubusercontent.com/mgnlia/kidrunner-android-prototype/98cb31d/checkpoint-site/vercel.json
- Immutable missing-file probes for Vercel IDs (404 at pinned SHA):
  - https://raw.githubusercontent.com/mgnlia/kidrunner-android-prototype/98cb31d/checkpoint-site/.vercel/project.json
  - https://raw.githubusercontent.com/mgnlia/kidrunner-android-prototype/98cb31d/.vercel/project.json
- Fallback identifier verdict:
  - `kidrunner orgId/projectId = UNRESOLVED (no immutable .vercel/project.json found at pinned SHA)`

## C) Production deploy-proof bundle (current state)
- Target URL: https://mistral-riskpilot-m.vercel.app
- Health URL: https://mistral-riskpilot-m.vercel.app/api/health
- Probe UTC: `2026-02-22T13:56Z`
- Probe result:
  - URL -> `HTTP 404`
  - Health -> `HTTP 404`
- Deploy trigger commit (latest forced redeploy):
  - SHA: `73d4ae7dc5c73de853f41b654a90f33fd6052b8b`
  - Link: https://github.com/mgnlia/mistral-riskpilot-m/commit/73d4ae7dc5c73de853f41b654a90f33fd6052b8b
- Deploy-matched served SHA:
  - `UNVERIFIED` (prod remains 404)

## D) Env/config delta notes + risk statement
- Env/config delta this cycle: **none**
- Expected runtime env: `MISTRAL_API_KEY` required, `MISTRAL_MODEL` optional
- Risk statement: Without operator-side Vercel deploy/promote execution, production verification cannot be completed from this runtime (`vercel` binary unavailable locally).
