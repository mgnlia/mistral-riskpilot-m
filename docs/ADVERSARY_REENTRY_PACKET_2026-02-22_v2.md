# Adversary Re-entry Packet v2 (Immutable)

Task: `d6A9iKqsKYnhxKg-JvBnY`  
Prepared UTC: `2026-02-22T14:05:00Z`

## Closure Fields (single packet)

- **Scope verdict (in/out):**
  - **IN scope:** publish verifiable evidence for production URL, deploy-matched SHA, and env/config deltas.
  - **OUT scope:** owner-secret publication and dashboard-authenticated deployment object inspection (runtime has no Vercel CLI binary and no dashboard token/session).
- **Scope rationale:** project identifiers can be published from repo metadata, but canonical dashboard deployment record retrieval needs owner-authenticated Vercel access.

- **Production Vercel URL:** `https://mistral-riskpilot-m.vercel.app`
- **Deploy UTC (evidence timestamp):** `2026-02-22T13:34:07.139Z`
  - Source response captured from deployed `/api/health`:
  ```json
  {"ok":true,"service":"riskpilot-m","timestamp":"2026-02-22T13:34:07.139Z","model":"mistral-small-latest","mistralConfigured":false}
  ```

- **Commit SHA tied to deployed build:** `efddd05f4963d899925da9eca302e414da594432`
  - Tie method: production homepage footer contains deploy marker `raw-githack-replacement-v1` introduced by this SHA.

- **Env/config delta notes (what changed, why, risk):**
  - **What changed:** added deterministic deploy marker in `app/page.tsx`; Vercel project mapping file present in repo.
  - **Why:** create unambiguous SHA-to-runtime deploy fingerprint for audit.
  - **Risk:** low (display text only). Functional note: `/api/health` shows `mistralConfigured=false`; live-Mistral mode remains disabled until owner sets `MISTRAL_API_KEY` in Production.

## Published Vercel dashboard identifiers (fallback deploy routing)

From `.vercel/project.json` (SHA-pinned):
- `projectId`: `prj_fKvDeUga0lB4C18d8pxYU7YuA6ew`
- `orgId`: `team_Ay97TQ9ZiGtXdvkWdb8R9iAO`
- `projectName`: `mistral-riskpilot-m`

## Immutable Evidence Links

1. Packet commit (immutable):  
   https://github.com/mgnlia/mistral-riskpilot-m/commit/COMMIT_SHA_PLACEHOLDER
2. Packet file, SHA-pinned blob:  
   https://github.com/mgnlia/mistral-riskpilot-m/blob/COMMIT_SHA_PLACEHOLDER/docs/ADVERSARY_REENTRY_PACKET_2026-02-22_v2.md
3. Packet file, SHA-pinned raw:  
   https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/COMMIT_SHA_PLACEHOLDER/docs/ADVERSARY_REENTRY_PACKET_2026-02-22_v2.md
4. Production URL:  
   https://mistral-riskpilot-m.vercel.app
5. Production health endpoint:  
   https://mistral-riskpilot-m.vercel.app/api/health
6. Deploy-marker commit (immutable):  
   https://github.com/mgnlia/mistral-riskpilot-m/commit/efddd05f4963d899925da9eca302e414da594432
7. SHA-pinned source proving marker:  
   https://github.com/mgnlia/mistral-riskpilot-m/blob/efddd05f4963d899925da9eca302e414da594432/app/page.tsx
8. SHA-pinned Vercel identifiers file:  
   https://github.com/mgnlia/mistral-riskpilot-m/blob/efddd05f4963d899925da9eca302e414da594432/.vercel/project.json
9. Commit API record for SHA metadata (immutable API):  
   https://api.github.com/repos/mgnlia/mistral-riskpilot-m/commits/efddd05f4963d899925da9eca302e414da594432

> After this file commit is created, replace `COMMIT_SHA_PLACEHOLDER` with the actual packet commit SHA in task `githubUrls`.
