# RiskPilot-M Submission Index

Date: 2026-02-13

This file is the single source of truth for final submission packaging.

## 1) Core Links
- Repo: https://github.com/mgnlia/mistral-riskpilot-m
- Expected production URL: https://mistral-riskpilot-m.vercel.app (**currently pending verification**)
- API endpoint: https://mistral-riskpilot-m.vercel.app/api/analyze

## 2) Required Artifacts
- Demo script: `docs/DEMO_SCRIPT.md`
- Submission writeup draft: `docs/SUBMISSION_WRITEUP_DRAFT.md`
- Architecture source: `docs/ARCHITECTURE_DIAGRAM.md`
- Architecture mermaid: `docs/architecture.mmd`
- Submission checklist matrix: `docs/SUBMISSION_CHECKLIST_MATRIX.md`
- Artifact status tracker: `docs/SUBMISSION_ARTIFACT_STATUS.md`
- Adversarial QA report: `docs/ADVERSARIAL_QA_REPORT.md`
- Final acceptance gate: `docs/ACCEPTANCE_GATE.md`

## 3) Provenance / Eligibility Statement

RiskPilot-M repository and submitted deliverables were created specifically for this hackathon cycle.  
Any prior experience informed design decisions at a conceptual level only; submission code and artifacts are maintained in this dedicated repository for this event.

If organizers require stricter interpretation, team should provide commit-window evidence and explicit disclosure for any reused snippet lineage.

## 4) Deployment Verification

Use:
```bash
node scripts/verify-deploy.mjs https://mistral-riskpilot-m.vercel.app
```

Submission gate requires proof of:
- Home page reachable (200)
- `/api/analyze` reachable with required keys
- `plan.mode` visible (`live-mistral` preferred)

## 5) Remaining blockers before final submit
- Publish and verify live production URL
- Add demo video link
- Commit architecture PNG/SVG export
- Add screenshot bundle (3–5)
