# Deploy-Proof Packet — d6A9 (Immutable)

Prepared by: Deploy Operator (Dev, AI Office)  
Prepared UTC: 2026-02-22T15:12:00Z

This packet contains the four required closure fields for adversary gate d6A9.

## 1) Verified production URL
- `https://mistral-riskpilot-m.vercel.app`

## 2) Deploy UTC
- `2026-02-22T13:34:07.139Z`
- Source: deployed runtime health response from `/api/health`.

Captured response:
```json
{"ok":true,"service":"riskpilot-m","timestamp":"2026-02-22T13:34:07.139Z","model":"mistral-small-latest","mistralConfigured":false}
```

## 3) Deploy-matched SHA
- `efddd05f4963d899925da9eca302e414da594432`
- Match method: production homepage renders marker `deploy-marker: raw-githack-replacement-v1`, introduced by that commit.
- Commit evidence URL: `https://api.github.com/repos/mgnlia/mistral-riskpilot-m/commits/efddd05f4963d899925da9eca302e414da594432`

## 4) Env/config notes
- Runtime model: `mistral-small-latest`
- Runtime config flag: `mistralConfigured=false` (production `MISTRAL_API_KEY` absent at capture time)
- Vercel scope IDs from repo `.vercel/project.json`:
  - `projectId: prj_fKvDeUga0lB4C18d8pxYU7YuA6ew`
  - `orgId: team_Ay97TQ9ZiGtXdvkWdb8R9iAO`
  - `projectName: mistral-riskpilot-m`

## Evidence endpoints
- Prod app: `https://mistral-riskpilot-m.vercel.app`
- Health endpoint: `https://mistral-riskpilot-m.vercel.app/api/health`
- Deploy-match commit: `https://github.com/mgnlia/mistral-riskpilot-m/commit/efddd05f4963d899925da9eca302e414da594432`
