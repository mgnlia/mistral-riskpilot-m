# MVP Scope Freeze — RiskPilot-M

Date: 2026-02-13  
Repo: https://github.com/mgnlia/mistral-riskpilot-m  
Branch: `main`

## Must Ship (submission-critical)
1. **Position risk scoring core**
   - Deterministic health-factor calculation
   - Risk band classification (`LOW`/`MEDIUM`/`HIGH`/`CRITICAL`)
2. **Mistral analysis API path**
   - `/api/analyze` endpoint
   - Mistral-generated explanation + mitigation actions
   - Fallback response mode when `MISTRAL_API_KEY` is unavailable
3. **Human-in-the-loop control**
   - Explicit operator approval step before action execution state
4. **Judge-demo-ready UX**
   - Position selection, metrics, one-click analysis, visible recommendations
5. **Deployability + reliability floor**
   - Vercel-compatible build
   - Basic error handling and clear failure states

## Should Ship (if time remains)
1. Architecture diagram + concise technical narrative for submission page
2. Additional curated risk scenarios for demo storytelling
3. UX polish (loading/error state clarity, copy improvements)

## Cut From MVP (post-submission / non-critical)
1. Live wallet integration and on-chain transaction execution
2. Automated mitigation execution against real protocols
3. Authentication/roles/multi-tenant dashboards
4. Historical analytics, alerting pipelines, notification channels
5. Agent memory/planning beyond single-turn mitigation generation

## Scope Guardrails
- No new infrastructure dependencies before deploy URL is live.
- No protocol integrations that can introduce unreliable external failure paths for judge demo.
- Prioritize deterministic behavior over feature breadth.
