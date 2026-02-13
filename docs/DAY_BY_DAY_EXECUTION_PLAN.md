# Day-by-Day Execution Plan (Adapted to Available Assets)

Date: 2026-02-13  
Project: RiskPilot-M  
Repo: https://github.com/mgnlia/mistral-riskpilot-m

## Available Assets Considered
- Existing Next.js MVP scaffold already committed
- Deterministic risk engine + sample data path already present
- Mistral API route with fallback mode already present
- Prior office liquidation-agent patterns for UX and scoring logic

## Plan

### D-10 (today)
- Freeze MVP scope (must/should/cut) and architecture target
- Confirm repo + branch + deployment path
- Output: scope + architecture + deploy docs committed

### D-9
- Harden core flow end-to-end
  - input validation edge cases
  - API error semantics
  - fallback consistency
- Exit: stable local demo with no crash path in standard scenarios

### D-8
- Mistral prompt and output tightening
  - enforce concise, structured mitigation steps
  - improve confidence signal consistency
- Exit: deterministic demo narrative across 2-3 scenarios

### D-7
- Data path stabilization
  - keep static/simulated DeFi scenarios as baseline
  - evaluate optional live data adapter only if reliable
- Exit: no dependency that can break judge demo

### D-6
- Frontend polish pass
  - readability, state clarity, approval UX
  - clear before/after risk communication
- Exit: judge can understand value in <20 seconds

### D-5 (hard gate)
- Reliability review + go/no-go decision:
  - **If DeFi data/API risk persists -> switch to IncidentPilot-M**
  - Otherwise continue RiskPilot-M
- Exit: explicit written decision with rationale in docs

### D-4
- Submission package build
  - architecture diagram
  - screenshots
  - 200-400 word writeup
- Exit: draft submission bundle complete

### D-3
- Demo recording v1 + timing optimization
- Exit: 2-3 minute video cut complete

### D-2
- Judge simulation and failure drills
- Exit: two mock runs completed without blocker

### D-1
- Final freeze
  - verify repo cleanliness
  - verify live URL + fallback path
  - finalize submission metadata
- Exit: submission-ready package

### D0-D1 (event window)
- Submit final artifacts and monitor for submission issues
- Exit: successful submission confirmation captured

## Current Status
- D-10 outputs completed and committed.
- Active blocker for early deployment: Vercel CLI unavailable in this runtime.
