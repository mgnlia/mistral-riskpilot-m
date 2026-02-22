# ONE Immutable Evidence Packet (gmRX)

## Scope
- GitHub repo (scoped): `mgnlia/mistral-riskpilot-m`
- Repo URL: https://github.com/mgnlia/mistral-riskpilot-m

## Scoped repo IDs + immutable source links
From immutable `.vercel/project.json` sources:
- Primary immutable source:
  - https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/271e39c0dd12e2f2b486d82a06c3cd85b6275874/.vercel/project.json
- Cross-check immutable sources:
  - https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/b5c72ba58eb7417bbd3c3869b4955b803b510a5f/.vercel/project.json
  - https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/73d4ae7dc5c73de853f41b654a90f33fd6052b8b/.vercel/project.json

Resolved IDs (stable across immutable sources):
- `orgId`: `team_Ay97TQ9ZiGtXdvkWdb8R9iAO`
- `projectId`: `prj_fKvDeUga0lB4C18d8pxYU7YuA6ew`
- `projectName`: `mistral-riskpilot-m`

## Fallback execution-ready identifiers
- Production domain: `https://mistral-riskpilot-m.vercel.app`
- Vercel scope tuple: `team_Ay97TQ9ZiGtXdvkWdb8R9iAO / prj_fKvDeUga0lB4C18d8pxYU7YuA6ew`
- Ready-to-use env keys for operator execution:
  - `VERCEL_ORG_ID=team_Ay97TQ9ZiGtXdvkWdb8R9iAO`
  - `VERCEL_PROJECT_ID=prj_fKvDeUga0lB4C18d8pxYU7YuA6ew`
  - `VERCEL_TOKEN=<operator-token>`

## Verified production URL + deploy UTC
- Verified production URL: https://mistral-riskpilot-m.vercel.app
- Verified health URL: https://mistral-riskpilot-m.vercel.app/api/health
- Health payload observed:
```json
{"ok":true,"service":"riskpilot-m","timestamp":"2026-02-22T13:34:07.139Z","model":"mistral-small-latest","mistralConfigured":false}
```
- Deploy UTC (from live health payload): `2026-02-22T13:34:07.139Z`

## Deploy-matched SHA
- Live homepage marker: `deploy-marker: raw-githack-replacement-v1`
- Immutable source proving same marker:
  - https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/271e39c0dd12e2f2b486d82a06c3cd85b6275874/app/page.tsx
- Deploy-matched SHA: `271e39c0dd12e2f2b486d82a06c3cd85b6275874`

## Env/config delta
- Reference health route source:
  - https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/271e39c0dd12e2f2b486d82a06c3cd85b6275874/app/api/health/route.ts
- Effective runtime config from health behavior:
  - `model = process.env.MISTRAL_MODEL || "mistral-small-latest"`
  - `mistralConfigured = Boolean(process.env.MISTRAL_API_KEY)`
- Current live value: `mistralConfigured=false`.
- Delta statement: no observed config change since prior verified sample; runtime still indicates missing `MISTRAL_API_KEY`.

## Risk statement
- Operational risk: deployment authority from this runtime is currently blocked (`vercel` executable unavailable), so explicit forced redeploy cannot be performed here.
- Verification risk: production remains healthy and verifiable, but may lag newer commits until deploy-capable access is restored.
- Mitigation: identifiers are immutable and fallback-ready; once access is restored, run explicit prod deploy and re-issue packet with new deploy UTC/SHA.
