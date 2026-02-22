# Deploy Proof Packet — d6A9 (Immutable)

Prepared by: Deploy Operator (Dev, AI Office)  
Prepared UTC: 2026-02-22T15:06:00Z

## Required fields

- **Verified production URL:** `https://mistral-riskpilot-m.vercel.app`
- **Deploy UTC (from deployed runtime evidence):** `2026-02-22T13:34:07.139Z`
- **Deploy-matched SHA:** `efddd05f4963d899925da9eca302e414da594432`
- **Env/config notes:**
  - `/api/health` reports `model: mistral-small-latest`
  - `/api/health` reports `mistralConfigured: false` (production `MISTRAL_API_KEY` not present at capture time)
  - Project scope identifiers from `.vercel/project.json`:
    - `projectId: prj_fKvDeUga0lB4C18d8pxYU7YuA6ew`
    - `orgId: team_Ay97TQ9ZiGtXdvkWdb8R9iAO`
    - `projectName: mistral-riskpilot-m`

## Verification evidence captured

1. Production page is reachable and renders deploy marker:
   - Marker text: `deploy-marker: raw-githack-replacement-v1`
   - URL: `https://mistral-riskpilot-m.vercel.app`
2. Health endpoint response:

```json
{"ok":true,"service":"riskpilot-m","timestamp":"2026-02-22T13:34:07.139Z","model":"mistral-small-latest","mistralConfigured":false}
```

3. Marker-introducing commit (deploy-match tie):
   - Commit: `efddd05f4963d899925da9eca302e414da594432`
   - Message: `chore: add deploy marker for raw.githack replacement proof`
   - API record: `https://api.github.com/repos/mgnlia/mistral-riskpilot-m/commits/efddd05f4963d899925da9eca302e414da594432`

## Deploy-match method

Deploy SHA is tied via a deterministic runtime marker rendered by production (`deploy-marker: raw-githack-replacement-v1`) that was introduced in commit `efddd05f4963d899925da9eca302e414da594432` and verified in `app/page.tsx` at that commit.

## Immutable links

- Packet blob (this file, SHA-pinned):
  - `https://github.com/mgnlia/mistral-riskpilot-m/blob/c35f5632b5f29dfeb74c02d4920db5c446329deb/docs/DEPLOY_PROOF_PACKET_D6A9_2026-02-22.md`
- Packet raw (this file, SHA-pinned):
  - `https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/c35f5632b5f29dfeb74c02d4920db5c446329deb/docs/DEPLOY_PROOF_PACKET_D6A9_2026-02-22.md`
- Production URL:
  - `https://mistral-riskpilot-m.vercel.app`
- Production health endpoint:
  - `https://mistral-riskpilot-m.vercel.app/api/health`
- Deploy marker commit:
  - `https://github.com/mgnlia/mistral-riskpilot-m/commit/efddd05f4963d899925da9eca302e414da594432`
