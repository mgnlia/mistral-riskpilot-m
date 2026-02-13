# Operator Packet — RiskPilot-M Production Deploy + Verification

Date: 2026-02-13  
Task: `lL5ZwDIS-lRhbP1SDoJLO`

## 0) Required env vars (local shell)

```bash
export VERCEL_TOKEN="<vercel_token>"
export MISTRAL_API_KEY="<mistral_api_key>"
export MISTRAL_MODEL="mistral-small-latest"
# Optional project scoping:
# export VERCEL_ORG_ID="<org_id>"
# export VERCEL_PROJECT_ID="<project_id>"
```

## 1) Deploy (exact commands)

```bash
git clone https://github.com/mgnlia/mistral-riskpilot-m.git
cd mistral-riskpilot-m

npm ci
npm run build

# Link local repo to Vercel project (production context)
npx vercel pull --yes --environment=production --token "$VERCEL_TOKEN"

# Set/refresh required env vars in Vercel production
npx vercel env rm MISTRAL_API_KEY production --yes --token "$VERCEL_TOKEN" >/dev/null 2>&1 || true
printf "%s" "$MISTRAL_API_KEY" | npx vercel env add MISTRAL_API_KEY production --token "$VERCEL_TOKEN"

npx vercel env rm MISTRAL_MODEL production --yes --token "$VERCEL_TOKEN" >/dev/null 2>&1 || true
printf "%s" "$MISTRAL_MODEL" | npx vercel env add MISTRAL_MODEL production --token "$VERCEL_TOKEN"

# Deploy to production
npx vercel --prod --token "$VERCEL_TOKEN"
```

## 2) Verify (exact commands)

```bash
curl -fsSL https://mistral-riskpilot-m.vercel.app/api/health | jq
npm run verify:deploy -- https://mistral-riskpilot-m.vercel.app
```

## 3) Expected PASS output (minimum)

### `curl /api/health`
- HTTP 200
- JSON includes:
  - `"ok": true`
  - `"service": "riskpilot-m"`
  - `"mistralConfigured": true` (preferred; false is acceptable only if fallback mode is expected)

### `npm run verify:deploy`
Output should include all of:

```text
✅ Home page reachable (200)
✅ /api/health reachable (200)
✅ /api/analyze reachable (200) with required keys
✅ plan.mode=live-mistral   # or fallback-mock
🎉 Deployment verification passed.
```

## 4) Evidence checklist (post all items)

- [ ] Vercel production deploy URL output (from `npx vercel --prod`)
- [ ] Public site URL confirmed: `https://mistral-riskpilot-m.vercel.app`
- [ ] Raw `/api/health` JSON output pasted
- [ ] Full `npm run verify:deploy -- https://mistral-riskpilot-m.vercel.app` output pasted
- [ ] Confirmed `plan.mode` value (`live-mistral` preferred; `fallback-mock` acceptable)
- [ ] One screenshot of landing page
- [ ] One screenshot of terminal showing verification PASS

## 5) Final target URLs

- App: `https://mistral-riskpilot-m.vercel.app`
- Health: `https://mistral-riskpilot-m.vercel.app/api/health`
- Analyze: `https://mistral-riskpilot-m.vercel.app/api/analyze`
