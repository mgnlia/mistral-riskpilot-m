# Adversary Re-entry Evidence Packet (2026-02-22)

Task: `d6A9iKqsKYnhxKg-JvBnY`  
Prepared by: Dev  
Prepared UTC: 2026-02-22T13:55:00Z

## 1) Scope verdict (explicit)

**Verdict: PARTIAL — in-scope evidence is complete; owner-only deploy metadata is out-of-scope in current runtime.**

- **In scope (completed):** prove production URL is live, prove deployed frontend marker matches a SHA-pinned commit, and document env/config state observed from production health endpoint.
- **Out of scope (owner action required):** retrieve authoritative Vercel dashboard deployment record fields (exact deployment object timestamp/ID) because this runtime cannot execute `vercel` CLI and has no dashboard token access.

Rationale: owner-controlled Vercel credentials/dashboard identifiers are required for canonical deployment metadata extraction.

## 2) Production URL + deploy UTC

- **Production URL:** https://mistral-riskpilot-m.vercel.app
- **Deploy UTC (first verified live observation):** **2026-02-22T13:34:07.139Z**
  - Source: production `/api/health` response timestamp captured during verification.

## 3) Commit SHA tied to deployed build

- **Deployed marker in production HTML:** `deploy-marker: raw-githack-replacement-v1`
- **Matching commit SHA:** `efddd05f4963d899925da9eca302e414da594432`
- Why this ties build-to-SHA: that marker string was introduced in `app/page.tsx` in the commit above; current production homepage renders that exact marker.

## 4) Env/config delta notes

### Delta in this closure cycle
- **App code delta used for deployment proof:** footer deploy marker (`raw-githack-replacement-v1`) in `app/page.tsx`.
- **Vercel linkage metadata present:** `.vercel/project.json` maps repo to Vercel project `mistral-riskpilot-m`.
- **Runtime env observation from production:** `mistralConfigured=false` (no active `MISTRAL_API_KEY` detected in production response path at verification time).

### Why changed
- Marker was added to generate a deterministic, user-visible deploy fingerprint for SHA-to-runtime validation.

### Risk impact
- **Low risk** from marker-only UI text change.
- **Functional risk remains:** with `mistralConfigured=false`, production uses fallback behavior instead of live Mistral inference.

## 5) Immutable evidence links

1. SHA commit introducing deploy marker (proof artifact):  
   https://github.com/mgnlia/mistral-riskpilot-m/commit/efddd05f4963d899925da9eca302e414da594432

2. SHA-pinned file showing marker in source (`app/page.tsx`):  
   https://github.com/mgnlia/mistral-riskpilot-m/blob/efddd05f4963d899925da9eca302e414da594432/app/page.tsx

3. SHA-pinned Vercel project mapping (`.vercel/project.json`):  
   https://github.com/mgnlia/mistral-riskpilot-m/blob/efddd05f4963d899925da9eca302e414da594432/.vercel/project.json

4. Production app URL (live runtime target):  
   https://mistral-riskpilot-m.vercel.app

5. Production health endpoint (contains observed UTC + env state):  
   https://mistral-riskpilot-m.vercel.app/api/health

6. Commit API record with immutable author/commit UTC metadata for SHA above:  
   https://api.github.com/repos/mgnlia/mistral-riskpilot-m/commits/efddd05f4963d899925da9eca302e414da594432

## 6) Remaining owner action for full canonical closure

To convert from "first-verified live UTC" to canonical deployment metadata, owner must publish either:
- Vercel deployment URL/ID from dashboard for the production alias, or
- CLI-accessible identifiers/token path enabling `vercel list/inspect` in a trusted operator environment.

Until that owner-only metadata is published, exact dashboard-native deployment object timestamp cannot be independently extracted from this runtime.
