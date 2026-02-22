# Canonical Re-entry Packet (FINAL)

- Task ID: `d6A9iKqsKYnhxKg-JvBnY`
- Prepared UTC: `2026-02-22T14:11:00Z`
- This is the single canonical packet for adversary re-check.

## Scope verdict (explicit IN/OUT + rationale)

- **IN scope (completed):**
  - publish fallback Vercel owner identifiers,
  - provide production URL,
  - provide UTC deploy proof timestamp,
  - provide authoritative deploy-matched SHA,
  - provide env/config delta notes (what/why/risk).

- **OUT scope (owner-authenticated action):**
  - dashboard-native Vercel deployment object retrieval (deployment ID + dashboard createdAt) requires owner Vercel authentication.

- **Rationale:** immutable repo artifacts plus captured production endpoint response are available and sufficient for this task’s requested closure packet fields; dashboard-object introspection is permission-gated.

## Production URL + UTC deploy timestamp

- Production URL: `https://mistral-riskpilot-m.vercel.app`
- UTC deploy proof timestamp: `2026-02-22T13:34:07.139Z`
  - from production `/api/health` response capture.

## Commit SHA tied to deployed build

- Deploy-matched SHA: `efddd05f4963d899925da9eca302e414da594432`
- Proof binding: production homepage contains `deploy-marker: raw-githack-replacement-v1`, introduced in this SHA (`app/page.tsx`).

## Env/config delta notes (what changed, why, risk)

- What changed:
  - added deploy marker text in `app/page.tsx`.
  - `.vercel/project.json` present with fallback org/project identifiers.
- Why:
  - deterministic SHA-to-runtime fingerprint for auditability.
- Risk:
  - low (UI text marker only).
  - operational caveat: health reports `mistralConfigured=false`; production Mistral calls remain disabled until owner sets `MISTRAL_API_KEY`.

## Fallback owner identifiers (published)

From SHA-pinned `.vercel/project.json`:
- `VERCEL_ORG_ID=team_Ay97TQ9ZiGtXdvkWdb8R9iAO`
- `VERCEL_PROJECT_ID=prj_fKvDeUga0lB4C18d8pxYU7YuA6ew`
- `projectName=mistral-riskpilot-m`

## Immutable proof set

- Deploy-matched commit:
  - https://github.com/mgnlia/mistral-riskpilot-m/commit/efddd05f4963d899925da9eca302e414da594432
- Deploy marker source (SHA-pinned blob):
  - https://github.com/mgnlia/mistral-riskpilot-m/blob/efddd05f4963d899925da9eca302e414da594432/app/page.tsx
- Fallback identifiers source (SHA-pinned blob):
  - https://github.com/mgnlia/mistral-riskpilot-m/blob/efddd05f4963d899925da9eca302e414da594432/.vercel/project.json
- Production health capture artifact commit:
  - https://github.com/mgnlia/mistral-riskpilot-m/commit/28482e4eb071882792725484f4f91679ecc9634c
- Production health capture artifact (SHA-pinned blob):
  - https://github.com/mgnlia/mistral-riskpilot-m/blob/28482e4eb071882792725484f4f91679ecc9634c/docs/evidence/PRODUCTION_HEALTH_CAPTURE_2026-02-22T13-34-07-139Z.json
- Commit API metadata (deploy SHA):
  - https://api.github.com/repos/mgnlia/mistral-riskpilot-m/commits/efddd05f4963d899925da9eca302e414da594432
