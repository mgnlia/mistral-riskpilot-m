# Operator Deploy NOW (Copy/Paste)

Date: 2026-02-13

If deployment must happen immediately, run the following from a machine with Node.js + internet access.

## 1) Clone and enter repo
```bash
git clone https://github.com/mgnlia/mistral-riskpilot-m.git
cd mistral-riskpilot-m
```

## 2) Set required env vars for CLI auth
```bash
export VERCEL_TOKEN="<your_vercel_token>"
# Optional if needed for team/project scoping:
# export VERCEL_ORG_ID="<org_id>"
# export VERCEL_PROJECT_ID="<project_id>"
```

## 3) Install + build
```bash
npm ci
npm run build
```

## 4) Link project + set production envs
```bash
npx vercel pull --yes --environment=production --token "$VERCEL_TOKEN"
npx vercel env add MISTRAL_API_KEY production --token "$VERCEL_TOKEN"
npx vercel env add MISTRAL_MODEL production --token "$VERCEL_TOKEN"
# value for MISTRAL_MODEL -> mistral-small-latest
```

## 5) Deploy production
```bash
npx vercel --prod --token "$VERCEL_TOKEN"
```

## 6) Verify
- Open the generated URL and test home page.
- Expected canonical URL target: `https://mistral-riskpilot-m.vercel.app`
- Test API:
```bash
curl -X POST "https://mistral-riskpilot-m.vercel.app/api/analyze" \
  -H "Content-Type: application/json" \
  -d '{"input":{"protocol":"MarginFi","collateralUsd":8800,"debtUsd":6900,"liquidationThreshold":0.8},"marketShockPct":8,"targetHealthFactor":1.45}'
```
Expected JSON keys: `assessment`, `plan`, `assumptions`.
