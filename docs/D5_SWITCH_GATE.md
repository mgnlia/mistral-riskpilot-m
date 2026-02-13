# D-5 Switch Gate — RiskPilot-M -> IncidentPilot-M

Date: 2026-02-13

## Decision Rule
At D-5 checkpoint, if any of the following remain unresolved, switch to IncidentPilot-M:

1. DeFi API/data dependencies are unstable enough to jeopardize live demo reliability.
2. Mistral live inference path cannot be demonstrated with consistent outputs under expected latency.
3. End-to-end judge run cannot be completed deterministically in under 3 minutes.

## Current Gate Status
- Live data dependency removed from MVP-critical path via deterministic sample scenarios.
- Mistral path includes fallback mode (`fallback-mock`) to preserve demo continuity.
- Remaining risk concentration is deployment accessibility, not DeFi API instability.

## Trigger to Switch (Explicit)
- **No switch yet**.
- **Switch will be executed at D-5 only if reliability criteria fail**.

## If Switch Triggered
- Reuse same Next.js shell and human-approval UX.
- Replace DeFi input with incident/log input.
- Keep agent loop: detect -> explain -> recommend -> approve.
- Preserve Vercel deployment path and submission packaging timeline.
