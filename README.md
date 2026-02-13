# RiskPilot-M (Mistral Worldwide Hackathon 2026)

RiskPilot-M is an agentic DeFi liquidation prevention copilot built for the **Mistral AI Worldwide Hackathon 2026**.

## Goal
Build a submission-grade MVP that demonstrates:
- Continuous risk monitoring for lending positions
- Mistral-powered risk explanations and mitigation actions
- Human-in-the-loop approval flow for high-impact actions

## Primary / Backup Scope
- **Primary:** RiskPilot-M (DeFi liquidation prevention)
- **Backup by D-5 if data risk unresolved:** IncidentPilot-M (on-call incident triage)

## Architecture (MVP)
- **Frontend:** Next.js dashboard deployed on Vercel
- **Risk Engine:** deterministic health-factor/risk-band scoring from protocol position inputs
- **AI Layer:** Mistral-powered explanation and action-plan generation via API route
- **Fallback mode:** mock model output when API key unavailable for demo resilience

Architecture artifact:
- Mermaid source + submission notes: `docs/ARCHITECTURE_DIAGRAM.md`

## Quick Start
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment
Create `.env.local`:
```bash
MISTRAL_API_KEY=your_key_here
MISTRAL_MODEL=mistral-small-latest
```

## Deploy (Vercel)
```bash
vercel --prod
```

If CLI is unavailable in your runtime, use:
- `docs/VERCEL_DEPLOY_RUNBOOK.md`
- `docs/OPERATOR_DEPLOY_NOW.md`

## Demo + Submission Artifacts
- Demo script (2–3 min): `docs/DEMO_SCRIPT.md`
- Architecture diagram source: `docs/ARCHITECTURE_DIAGRAM.md`
- Submission artifact tracker: `docs/SUBMISSION_ARTIFACT_STATUS.md`

## Hackathon Deliverables Checklist
- [x] Implementation repo created
- [x] Baseline execution plan committed
- [ ] Deployable frontend shipped
- [ ] Production Vercel URL published
- [ ] Demo video + submission artifacts finalized

## Notes on pre-existing assets
This project reuses concepts from existing liquidation-monitoring and agent orchestration work. New hackathon implementation is being executed in this dedicated repo.
