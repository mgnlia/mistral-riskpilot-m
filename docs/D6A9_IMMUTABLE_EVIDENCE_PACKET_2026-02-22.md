# D6A9 Immutable Evidence Packet (Canonical, Single-Post)

Prepared UTC: `2026-02-22T14:26:00Z`
Task: `d6A9iKqsKYnhxKg-JvBnY`

## 1) Scope verdict

**Verdict:** Required evidence scope is satisfied via verifier-accessible immutable artifacts for:
- verified production URL
- deploy UTC
- deploy-matched SHA
- env/config delta notes

**Explicit exception (owner-auth only):** Vercel dashboard-native deployment object retrieval remains owner-auth scoped and is not available from this runtime.

## 2) Verified production URL

- **Production URL:** `https://mistral-riskpilot-m.vercel.app`
- **Verification signal observed on production page:**
  - `deploy-marker: raw-githack-replacement-v1`
- **Live verification link:**
  - https://mistral-riskpilot-m.vercel.app

## 3) Deploy UTC (verifier-observable)

- **Deploy UTC evidence value:** `2026-02-22T13:34:07.139Z`
- **Source (live endpoint):**
  - https://mistral-riskpilot-m.vercel.app/api/health
- **Health route source (same deployed code family):**
  - https://github.com/mgnlia/mistral-riskpilot-m/blob/efddd05f4963d899925da9eca302e414da594432/app/api/health/route.ts

## 4) Deploy-matched SHA (canonical)

- **Canonical deploy-matched SHA:** `efddd05f4963d899925da9eca302e414da594432`
- **Why this SHA matches production:** production footer marker is `raw-githack-replacement-v1`, which is the marker introduced by this commit.

**Proof links:**
- Commit page:
  - https://github.com/mgnlia/mistral-riskpilot-m/commit/efddd05f4963d899925da9eca302e414da594432
- Commit API (immutable metadata):
  - https://api.github.com/repos/mgnlia/mistral-riskpilot-m/commits/efddd05f4963d899925da9eca302e414da594432
- SHA-pinned source blob containing marker:
  - https://github.com/mgnlia/mistral-riskpilot-m/blob/efddd05f4963d899925da9eca302e414da594432/app/page.tsx
- Raw SHA-pinned source blob:
  - https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/efddd05f4963d899925da9eca302e414da594432/app/page.tsx

## 5) Explicit supersession of conflicting SHA claims

- **Superseded for deploy-match purposes:** `3250400d9f6c0089b6897c0473a31f51a954575d`
- **Reason:** that commit marker (`access-restore-cycle-2026-02-22T13:47Z`) is not what production currently serves.
- **Reference (superseded commit):**
  - https://github.com/mgnlia/mistral-riskpilot-m/commit/3250400d9f6c0089b6897c0473a31f51a954575d

## 6) Env/config delta notes (+ links)

1. **UI deploy-marker delta**
   - Deployed marker aligns to `efddd05f...` (`raw-githack-replacement-v1`).
   - Link: https://github.com/mgnlia/mistral-riskpilot-m/blob/efddd05f4963d899925da9eca302e414da594432/app/page.tsx

2. **Vercel project linkage identifiers present**
   - `projectId=prj_fKvDeUga0lB4C18d8pxYU7YuA6ew`
   - `orgId=team_Ay97TQ9ZiGtXdvkWdb8R9iAO`
   - Link: https://github.com/mgnlia/mistral-riskpilot-m/blob/efddd05f4963d899925da9eca302e414da594432/.vercel/project.json

3. **Runtime env status at production health endpoint**
   - `mistralConfigured=false` (production API key not set at runtime).
   - Link: https://mistral-riskpilot-m.vercel.app/api/health

---

This document is the **single canonical immutable evidence packet** for d6A9 re-entry.
