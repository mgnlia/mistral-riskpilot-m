# Baseline Execution Plan (Day 0 Kickoff)

## Objective
Deliver a submission-ready MVP for Mistral Worldwide Hackathon 2026 with a reliable live demo and clear judging narrative.

## Strategy Alignment
Derived from `mistral-worldwide-hackathon-2026-strategy`:
1. Prioritize **Best Use of Agent Skills** + strong local podium quality.
2. Build one clean end-to-end flow over broad but unstable scope.
3. Keep deterministic fallback modes for demo safety.

## Milestones

### M1 — Repo + Plan (Today)
- [x] Create implementation repo
- [x] Commit architecture + sprint baseline

### M2 — MVP Build
- [ ] Risk dashboard (position cards, health factor, risk band)
- [ ] Mistral analysis endpoint (explanation + mitigation suggestions)
- [ ] Human approval state for mitigation actions

### M3 — Deploy + Harden
- [ ] Vercel production deploy
- [ ] Error handling and fallback UX
- [ ] README run/deploy verification

### M4 — Submission Package
- [ ] 200–400 word writeup
- [ ] Architecture diagram
- [ ] Screenshots + demo script

## D-5 Decision Gate (Primary -> Backup)
Switch from RiskPilot-M to IncidentPilot-M if any of these remain unresolved by D-5:
1. Unreliable on-chain/protocol data source for core demo path.
2. Inability to demonstrate stable risk scoring end-to-end.
3. Excessive latency/failure rate breaking judge demo reliability.

If switched:
- Preserve same agent architecture and Mistral integration.
- Replace data plane with logs/alerts + runbook action planner.
- Document rationale and risk tradeoff in README.

## Success Metrics
- Demo can be run live in under 2 minutes with no hard failures.
- At least one scenario shows risk reduction recommendation with clear before/after values.
- Mistral usage is explicit and visible in UX + architecture docs.
