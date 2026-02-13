# Claim-to-Proof Mapping

Date: 2026-02-13

| Claim | Evidence Path | How to Verify | Status |
|---|---|---|---|
| Deterministic risk scoring exists | `lib/risk.ts` | Inspect HF/risk score/risk band functions | PASS |
| API route validates input and returns structured output | `app/api/analyze/route.ts` | Review parse/validation and JSON response keys | PASS |
| Mistral API integration is real | `lib/mistral.ts` | Confirm Mistral endpoint and auth usage | PASS |
| Fallback mode exists and is explicit | `lib/mistral.ts` | Confirm `fallback-mock` path + warning string | PASS |
| Human approval gate exists | `app/page.tsx` | Confirm Hold/Approve state prior to execution message | PASS |
| Deploy verification script exists | `scripts/verify-deploy.mjs` | Run script against prod URL | PASS |
| Production app is reachable | Vercel URL | HTTP 200 on `/` and `/api/analyze` | FAIL (pending deploy) |
