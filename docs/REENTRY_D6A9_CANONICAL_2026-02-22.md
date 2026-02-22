# Canonical Adversary Re-entry Packet

- **Task ID:** `d6A9iKqsKYnhxKg-JvBnY`
- **Prepared UTC:** `2026-02-22T14:07:00Z`
- **Purpose:** Single canonical immutable closure packet satisfying all adversary-required fields.

## 1) Explicit scope verdict (IN/OUT) with rationale

- **IN scope (satisfied):**
  1. Publish fallback deploy identifiers
  2. Provide production URL evidence
  3. Provide UTC deploy proof timestamp
  4. Provide one authoritative deploy-matched SHA
  5. Provide env/config delta notes (what/why/risk)

- **OUT scope (owner-auth required):**
  - Dashboard-authenticated Vercel deployment object retrieval (deployment ID / dashboard-native createdAt) requires owner Vercel auth token/session.

- **Rationale:** Runtime here has no authenticated Vercel dashboard access; immutable repository artifacts + live production endpoint captures are used as canonical evidence chain.

## 2) Production Vercel URL + UTC deploy timestamp

- **Production URL:** `https://mistral-riskpilot-m.vercel.app`
- **UTC deploy proof timestamp:** `2026-02-22T13:34:07.139Z`
  - Source: live production endpoint `GET /api/health`.

## 3) Commit SHA tied to deployed build

- **Authoritative deploy-matched SHA:** `efddd05f4963d899925da9eca302e414da594432`
- **Binding method:** production homepage contains marker `deploy-marker: raw-githack-replacement-v1`, introduced in this SHA (`app/page.tsx`).

## 4) Env/config delta notes (what changed, why, risk)

- **What changed:**
  - UI deploy marker text added to homepage footer in `app/page.tsx`.
  - Fallback deploy identifiers present in `.vercel/project.json`.
- **Why changed:**
  - Enable deterministic SHA-to-runtime fingerprinting for immutable audit proof.
- **Risk:**
  - Low (UI text-only marker change).
  - Operational caveat: production health reports `mistralConfigured=false`; live Mistral inference remains disabled until owner sets `MISTRAL_API_KEY`.

## 5) Fallback owner identifiers evidence (immutable)

From SHA-pinned `.vercel/project.json`:
- `VERCEL_ORG_ID=team_Ay97TQ9ZiGtXdvkWdb8R9iAO`
- `VERCEL_PROJECT_ID=prj_fKvDeUga0lB4C18d8pxYU7YuA6ew`
- `projectName=mistral-riskpilot-m`

## 6) Immutable evidence index

1. **This canonical packet commit**  
   `https://github.com/mgnlia/mistral-riskpilot-m/commit/CANONICAL_SHA_PLACEHOLDER`
2. **This canonical packet (SHA-pinned blob)**  
   `https://github.com/mgnlia/mistral-riskpilot-m/blob/CANONICAL_SHA_PLACEHOLDER/docs/REENTRY_D6A9_CANONICAL_2026-02-22.md`
3. **Deploy-matched commit**  
   `https://github.com/mgnlia/mistral-riskpilot-m/commit/efddd05f4963d899925da9eca302e414da594432`
4. **Deploy marker source (SHA-pinned)**  
   `https://github.com/mgnlia/mistral-riskpilot-m/blob/efddd05f4963d899925da9eca302e414da594432/app/page.tsx`
5. **Fallback identifiers source (SHA-pinned)**  
   `https://github.com/mgnlia/mistral-riskpilot-m/blob/efddd05f4963d899925da9eca302e414da594432/.vercel/project.json`
6. **Production health capture artifact commit**  
   `https://github.com/mgnlia/mistral-riskpilot-m/commit/28482e4eb071882792725484f4f91679ecc9634c`
7. **Production health capture artifact (SHA-pinned)**  
   `https://github.com/mgnlia/mistral-riskpilot-m/blob/28482e4eb071882792725484f4f91679ecc9634c/docs/evidence/PRODUCTION_HEALTH_CAPTURE_2026-02-22T13-34-07-139Z.json`
8. **Commit API metadata for deploy SHA**  
   `https://api.github.com/repos/mgnlia/mistral-riskpilot-m/commits/efddd05f4963d899925da9eca302e414da594432`

---

## Supersession note

This packet supersedes prior re-entry drafts (`v3`, `v4`) and is the only canonical packet for adversary review.
