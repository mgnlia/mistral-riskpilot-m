# Fallback Narrative (Judge-Facing)

Date: 2026-02-13

## Purpose
Fallback mode is a **reliability and continuity mechanism** for demos and degraded operations. It is **not** intended to replace Mistral-powered reasoning.

## Operational Modes
- `live-mistral` (primary): model-generated summary, rationale, and action sequencing.
- `fallback-mock` (degraded): deterministic plan generated from risk model when API key/upstream is unavailable.

## Judge-Safe Positioning
1. Mistral is the primary intelligence path and default judged path.
2. Fallback preserves uptime and safety under transient failures.
3. Fallback output is intentionally constrained and less expressive than live mode.
4. Human approval gate remains mandatory in both modes.

## UX/Telemetry Expectation
- UI must show `plan.mode` clearly.
- Warning text must be visible when fallback is active.
- Demo should include one short fallback mention, but focus on live mode value.

## Risk if mis-positioned
If the fallback path is over-emphasized, judges may conclude Mistral is optional and downgrade technical differentiation.

## Mitigation
- Demonstrate live mode first.
- Show fallback only as resilience proof.
- Explicitly articulate capability delta between modes.
