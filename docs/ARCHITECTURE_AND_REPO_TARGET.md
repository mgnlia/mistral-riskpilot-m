# Architecture + Repo Target (Checkpoint)

Date: 2026-02-13  
Task: `lL5ZwDIS-lRhbP1SDoJLO`

## Selected Build Target
- **Implementation repo:** https://github.com/mgnlia/mistral-riskpilot-m
- **Execution branch:** `main`
- **Frontend deploy target:** Vercel (production from `main`)

## Chosen MVP Architecture (RiskPilot-M)
1. **Frontend (Next.js App Router)**
   - Position selector + risk metrics dashboard
   - One-click analysis action
   - Human approval state for mitigation actions
2. **Deterministic Risk Engine (`lib/risk.ts`)**
   - Input validation
   - Health-factor computation
   - Risk band classification (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`)
3. **Mistral AI Integration (`/api/analyze`)**
   - Generates risk explanation + mitigation plan
   - Uses fallback mode when API key is unavailable
4. **Demo Reliability Controls**
   - Sample position set for deterministic run
   - Explicit error and loading states
   - No hard dependency on live on-chain writes in MVP

## Asset Reuse Strategy
- Reuse prior liquidation-monitoring design patterns from office projects.
- Reuse existing agent-flow concept: assess -> explain -> recommend -> human approve.
- Keep external dependency surface minimal before first live deploy URL.

## D-5 Switch Gate (Explicit)
If DeFi data/API risk is still unresolved by **D-5**, switch to **IncidentPilot-M** and keep same architecture skeleton:
- data plane swaps from DeFi positions to logs/alerts
- agent flow remains triage -> action plan -> human approval
- submission framing remains "Best Use of Agent Skills"
