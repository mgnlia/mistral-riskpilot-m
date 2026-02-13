# Build Plan Mapped to Submission Checklist

Date: 2026-02-13  
Primary track project: **RiskPilot-M**

## Repo + Branch Confirmation
- Selected repo: **https://github.com/mgnlia/mistral-riskpilot-m**
- Active submission branch: **`main`**
- Deployment target branch: **`main`**

## Checklist Mapping

| Submission Checklist Item | Build Plan Workstream | Acceptance Criteria / Evidence | Status |
|---|---|---|---|
| Implementation repo created | Repo initialization + baseline architecture | Public repo exists with runnable Next.js app and docs | ✅ Done |
| Baseline execution plan committed | Plan artifact in `docs/BASELINE_PLAN.md` | Plan file visible in default branch | ✅ Done |
| Deployable frontend shipped | Stabilize UI flow + API path + build verification | `npm run build` succeeds; app runs end-to-end with fallback mode | 🟡 In Progress |
| Production Vercel URL published | Run Vercel production deploy and verify endpoint | Share live URL + deployment record | 🔴 Blocked (runtime CLI/tooling) |
| Demo video + submission artifacts finalized | Capture script, screenshots, architecture summary, writeup | Submission package folder/docs complete with links | 🟡 In Progress |

## Execution Sequence (next checkpoint window)
1. **Code hardening (must):** tighten error handling and demo-path reliability.
2. **Artifact completion (must):** architecture draft, screenshots list, demo script scaffold.
3. **Deployment execution (must):** run operator-assisted Vercel deploy if CLI remains unavailable.
4. **Submission closeout (must):** finalize writeup + attach live URL and evidence links.

## Exit Criteria for Submission-Ready State
- Live Vercel URL responds reliably.
- One deterministic high-risk scenario demonstrates clear mitigation and approval gating.
- README + docs contain run instructions, architecture summary, and fallback-mode behavior.
