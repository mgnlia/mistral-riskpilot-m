# Adversarial QA Report — RiskPilot-M Submission

Date: 2026-02-13  
Task: `nu5taWjKoR5lRfAZ_oz9T`  
Reviewer: Sage (research)  
Scope: Fast red-team submission QA against hackathon-style criteria (Impact / Technical Implementation / Creativity / Pitch) plus minimum submission completeness gates.

## 1) Executive Result

**Current submission state: FAIL (not ready for final submit).**

- Core app quality: **strong**
- Submission package quality: **incomplete**
- Highest risk: **live deploy proof missing** + **eligibility narrative ambiguity ("no previous projects")**

## 2) Claim-to-Proof Matrix (Submission Claims vs Verifiable Evidence)

| # | Submission claim | Evidence in repo | Verification method | Status |
|---|---|---|---|---|
| C1 | RiskPilot-M performs deterministic liquidation risk assessment (HF, risk band, score) | `lib/risk.ts` | Inspect formulas and output fields from `/api/analyze` | PASS |
| C2 | App accepts stress shock + target HF and computes mitigation targets | `lib/risk.ts`, `app/page.tsx`, `app/api/analyze/route.ts` | Confirm controls + API payload + returned targets | PASS |
| C3 | Mistral is integrated for mitigation reasoning | `lib/mistral.ts` | Verify call to `https://api.mistral.ai/v1/chat/completions` with model/env | PASS |
| C4 | Human-in-the-loop approval required before execution state | `app/page.tsx` | Verify explicit Hold/Approve UI state and no auto execution | PASS |
| C5 | Graceful fallback works when API key/upstream unavailable | `lib/mistral.ts` | Confirm fallback mode, warning text, deterministic actions | PASS |
| C6 | Deployment is publicly accessible for judges | Expected: Vercel URL | Load app/API from published URL | **FAIL** (404 observed) |
| C7 | Repo includes clean submission artifact index | `SUBMISSION.md` | Confirm file exists and links resolve | PASS (created in this remediation) |
| C8 | Demo flow is ready for judge review | `docs/DEMO_SCRIPT.md` | Review 2–3 minute script coverage | PASS |
| C9 | Architecture artifact available | `docs/ARCHITECTURE_DIAGRAM.md`, `docs/architecture.mmd` | Confirm source exists; verify exported static image | PARTIAL (export pending) |
| C10 | Submission writeup available | `docs/SUBMISSION_WRITEUP_DRAFT.md` | Validate 200–400 words and clarity | PASS (draft) |

## 3) P0 / P1 / P2 Gap List

## P0 (must fix before submission)
1. **Live deployment proof missing**  
   - Evidence: `https://mistral-riskpilot-m.vercel.app` returned 404 during QA.  
   - Impact: hard fail on Technical + Pitch validation.
2. **Eligibility risk: "no previous projects" ambiguity is unresolved**  
   - Repo currently states: "reuses concepts from existing liquidation-monitoring and agent orchestration work."  
   - Risk: potential disqualification if judges interpret as prior project carryover.

## P1 (high-priority)
1. Static architecture export (PNG/SVG) not yet committed.
2. Demo/video/screenshot bundle not yet attached in submission index.
3. Final production verification log not committed (`scripts/verify-deploy.mjs` output).

## P2 (polish)
1. Add known limitations doc for judge Q&A hardening.
2. Add concise security/contributing notes.

## 4) Concrete Position — "No Previous Projects" Disqualification Risk

**Position: HIGH strategic risk until explicitly mitigated in writing.**

Why:
- Public rule language in related Mistral Devpost context includes: **"No previous projects allowed."**
- Current README note about reused concepts can be read safely, but must be tightened to avoid ambiguity between **reused ideas** vs **reused implementation**.

Required mitigation:
1. Add explicit provenance statement in `SUBMISSION.md`:
   - This repo was created specifically for this hackathon.
   - All submitted code/artifacts were produced during the hackathon build window.
   - Only general prior know-how/design intuition informed decisions; no prior deliverable submission reused.
2. Keep commit history clean and timestamped.
3. If any borrowed snippet exists, disclose exact file/lines and re-implement during event window.

## 5) Concrete Position — Fallback Narrative Weakness (Mistral optionality)

**Position: MEDIUM-HIGH judging risk if not framed carefully.**

Current behavior:
- If Mistral key is missing/upstream fails, app still returns deterministic plan (`fallback-mock`).

Risk:
- Judges may interpret the project as "Mistral not actually necessary".

Mitigation narrative (must be used in pitch/submission):
1. **Primary intelligence path is Mistral** (`mode=live-mistral`) for rationale quality and action sequencing.
2. **Fallback is reliability/safety design**, not feature parity.
3. During demo, show both:
   - live mode (default, judged path)
   - fallback mode (resilience path)
4. Highlight delta: live mode provides richer model reasoning; fallback is deterministic continuity only.

## 6) P0 Resolved in This Remediation

- **Resolved P0 (repo completeness): missing submission index file.**
- Action taken: created `SUBMISSION.md` and linked required submission artifacts/checks.
- Remaining P0 blockers: live deployment proof + eligibility clarification.

## 7) Immediate Next Actions

1. Deploy to Vercel production and capture final URL + verification output.
2. Add explicit provenance/eligibility language to submission materials.
3. Commit architecture export image and demo media links.
4. Re-run acceptance gate (`docs/ACCEPTANCE_GATE.md`) and require all PASS before final submit.
