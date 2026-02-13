# Architecture Diagram (Submission Artifact)

Date: 2026-02-13  
Project: RiskPilot-M

## Diagram Source (Mermaid)

```mermaid
flowchart LR
    U[Judge / Operator] --> FE[Next.js Frontend\napp/page.tsx]
    FE --> API[/POST /api/analyze\napp/api/analyze/route.ts/]

    API --> RE[Risk Engine\nlib/risk.ts\nHF + Risk Band + Targets]
    API --> AI[Mistral Integration\nlib/mistral.ts]
    AI --> M[(Mistral API)]

    AI --> FB[Deterministic Fallback Plan\nwhen key/upstream unavailable]
    RE --> OUT[Assessment + Mitigation Targets]
    FB --> OUT
    M --> OUT

    OUT --> FE
    FE --> HITL[Human Approval Gate\nApprove Actions]
    HITL --> EXEC[Controlled Execution State\n(no auto on-chain execution in MVP)]
```

## Artifact Status
- Mermaid source: **✅ Complete**
- Markdown artifact: **✅ Complete**
- Exported PNG/SVG for submission upload: **🟡 Pending export**
- README embed of final PNG/SVG: **🟡 Pending after export**

## Notes for Submission
- Explicitly call out reliability design: deterministic risk engine + fallback mode.
- Explicitly call out safety design: human-in-the-loop gate prior to action execution.
