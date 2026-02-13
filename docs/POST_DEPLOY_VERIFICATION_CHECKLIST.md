# Post-Deploy Verification Checklist (Production)

Target: `https://mistral-riskpilot-m.vercel.app`

## 1) Basic availability
- [ ] `GET /` returns `200 OK`
- [ ] Page title shows `RiskPilot-M`
- [ ] No immediate runtime error in browser console

## 2) API health
- [ ] `POST /api/analyze` with valid payload returns `200`
- [ ] Response includes keys: `assessment`, `plan`, `assumptions`
- [ ] `plan.mode` is either `live-mistral` or `fallback-mock`
- [ ] `plan.projectedHealthFactor >= assumptions.targetHealthFactor` for repay/top-up scenarios

## 3) Mistral mode checks
- [ ] With `MISTRAL_API_KEY` configured: `plan.mode=live-mistral`
- [ ] If upstream/key failure: graceful fallback with `plan.mode=fallback-mock` + `warning`

## 4) UI approval gate checks
- [ ] Run analysis from the dashboard
- [ ] Verify default state blocks execution (`No execution until a human operator approves`)
- [ ] Click `Approve Actions`
- [ ] Verify approval state appears (`Human approval recorded`)

## 5) Hardening checks
- [ ] Submit large/invalid numeric values and confirm API responds with 400 or normalized safe outputs
- [ ] Verify risk values remain finite and bounded

## 6) Automated script check
```bash
node scripts/verify-deploy.mjs https://mistral-riskpilot-m.vercel.app
```
Expected: script exits 0 and prints `Deployment verification passed`.

## 7) Evidence to attach for submission
- [ ] Screenshot: dashboard with analyzed position
- [ ] Screenshot: mitigation plan with projected HF / risk band
- [ ] Screenshot: approval gate before and after approval
- [ ] Terminal output from verification script
