# Fallback-Ready Immutable Identifier + Deploy-Proof Packet

Repository scope: `mgnlia/mistral-riskpilot-m`

## 1) Immutable kidrunner Vercel identifiers

Source (immutable):
- https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/271e39c0dd12e2f2b486d82a06c3cd85b6275874/.vercel/project.json

Identifiers (from immutable source):
- `orgId`: `team_Ay97TQ9ZiGtXdvkWdb8R9iAO`
- `projectId`: `prj_fKvDeUga0lB4C18d8pxYU7YuA6ew`
- `projectName`: `mistral-riskpilot-m`

Cross-check immutable repeats:
- https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/b5c72ba58eb7417bbd3c3869b4955b803b510a5f/.vercel/project.json
- https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/73d4ae7dc5c73de853f41b654a90f33fd6052b8b/.vercel/project.json

## 2) Live deployment proof bundle

Production URL:
- https://mistral-riskpilot-m.vercel.app

API URL:
- https://mistral-riskpilot-m.vercel.app/api/health

Observed health response:
```json
{"ok":true,"service":"riskpilot-m","timestamp":"2026-02-22T13:34:07.139Z","model":"mistral-small-latest","mistralConfigured":false}
```

Verification UTC (from API payload):
- `2026-02-22T13:34:07.139Z`

## 3) Deploy-matched SHA proof

Deploy marker rendered on production homepage:
- `deploy-marker: raw-githack-replacement-v1`

Matching immutable source:
- https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/271e39c0dd12e2f2b486d82a06c3cd85b6275874/app/page.tsx

Deploy-matched SHA:
- `271e39c0dd12e2f2b486d82a06c3cd85b6275874`

## 4) Env/config notes

Health route source:
- https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/271e39c0dd12e2f2b486d82a06c3cd85b6275874/app/api/health/route.ts

Behavior:
- `model = process.env.MISTRAL_MODEL || "mistral-small-latest"`
- `mistralConfigured = Boolean(process.env.MISTRAL_API_KEY)`

Runtime observed:
- `mistralConfigured=false`
