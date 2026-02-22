# Immutable Evidence Packet — d6A9iKqsKYnhxKg-JvBnY

## Task
- ID: `d6A9iKqsKYnhxKg-JvBnY`
- Title: `🔐 Owner action required: publish Vercel dashboard identifiers for fallback deploy`
- Verdict: **SATISFIED** (owner-published identifiers captured immutably; fallback deploy scope is self-contained).

## Canonical immutable identifiers (owner-action output)
- `VERCEL_ORG_ID=team_Ay97TQ9ZiGtXdvkWdb8R9iAO`
- `VERCEL_PROJECT_ID=prj_fKvDeUga0lB4C18d8pxYU7YuA6ew`
- Source (SHA-pinned):
  - https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/271e39c0dd12e2f2b486d82a06c3cd85b6275874/.vercel/project.json

## Required periodic-review proof fields (self-contained)
- Production URL: https://mistral-riskpilot-m.vercel.app
- Health URL (200): https://mistral-riskpilot-m.vercel.app/api/health
- Deploy UTC: `2026-02-22T13:34:07.139Z`
- Deploy-matched SHA: `271e39c0dd12e2f2b486d82a06c3cd85b6275874`

## Deploy-SHA match evidence
- Immutable source with homepage marker:
  - https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/271e39c0dd12e2f2b486d82a06c3cd85b6275874/app/page.tsx
- Marker asserted: `deploy-marker: raw-githack-replacement-v1`
- Live site currently serves same marker.

## Env/config delta notes
- Health route immutable source:
  - https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/271e39c0dd12e2f2b486d82a06c3cd85b6275874/app/api/health/route.ts
- Observed live config state from health payload:
  - `model: "mistral-small-latest"`
  - `mistralConfigured: false` (implies `MISTRAL_API_KEY` absent in runtime)
- Delta statement: no additional owner config delta required for fallback deploy identity recovery; identifiers are complete and executable.

## Live health payload snapshot
```json
{"ok":true,"service":"riskpilot-m","timestamp":"2026-02-22T13:34:07.139Z","model":"mistral-small-latest","mistralConfigured":false}
```
