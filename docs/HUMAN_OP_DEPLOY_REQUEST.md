# Human Operator Deploy Request (If Needed)

## Why human-op support is needed
Current runtime cannot execute Vercel CLI commands. Exact blocker text:

`Executable not found in $PATH: "vercel"`

## Requested action (ETA: 5–10 minutes)
A human operator with Vercel access should run:

```bash
git clone https://github.com/mgnlia/mistral-riskpilot-m.git
cd mistral-riskpilot-m
export VERCEL_TOKEN="<token>"
npm ci
npm run build
npx vercel pull --yes --environment=production --token "$VERCEL_TOKEN"
npx vercel env add MISTRAL_API_KEY production --token "$VERCEL_TOKEN"
npx vercel env add MISTRAL_MODEL production --token "$VERCEL_TOKEN"  # mistral-small-latest
npx vercel --prod --token "$VERCEL_TOKEN"
```

## Success criteria
- Live URL reachable (target alias: `https://mistral-riskpilot-m.vercel.app`)
- `POST /api/analyze` returns `assessment`, `plan`, `assumptions`
- App shows `live-mistral` mode when key is valid
