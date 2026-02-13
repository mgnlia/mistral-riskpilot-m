# RiskPilot-M Demo Script (2–3 min)

Date: 2026-02-13  
Target: Mistral AI Worldwide Hackathon judges  
Project: RiskPilot-M

## Goal
Show a complete judge-friendly flow: **problem -> agent analysis -> mitigation plan -> human approval -> measurable impact**.

## Timing + Narration

### 0:00 - 0:20 | Hook (Problem)
- Narration:  
  "Liquidation risk in DeFi lending can escalate in minutes. RiskPilot-M gives operators a fast, explainable mitigation plan with a human approval gate."
- Screen: Home dashboard with sample positions list.

### 0:20 - 0:50 | Select a high-risk position
- Action:
  1. Select **MarginFi** or **Solend** sample position.
  2. Point to health factor and risk score metrics.
- Narration:  
  "This position is already in a high/critical zone with low liquidation buffer."

### 0:50 - 1:25 | Run agent analysis
- Action:
  1. Set stress shock (e.g., 8–12%).
  2. Set target HF (e.g., 1.45).
  3. Click **Run Mistral Analysis**.
- Narration:  
  "RiskPilot-M combines deterministic risk calculations with Mistral-generated mitigation reasoning and action steps."

### 1:25 - 2:05 | Explain measurable outputs
- Action:
  1. Highlight summary + rationale text.
  2. Highlight projected HF, suggested debt repay/top-up, projected risk band, estimated penalty avoided.
- Narration:  
  "The agent proposes concrete mitigation targets and quantifies expected risk improvement."

### 2:05 - 2:30 | Human-in-the-loop safety
- Action:
  1. Show "Hold for Review" state.
  2. Click **Approve Actions**.
- Narration:  
  "No action is executed automatically. Human approval is mandatory before controlled execution mode."

### 2:30 - 2:50 | Reliability close
- Action:
  1. Point to inference mode (`live-mistral` or `fallback-mock`).
  2. Mention fallback warning behavior if key/upstream unavailable.
- Narration:  
  "For demo reliability, the app degrades gracefully with deterministic fallback instead of failing hard."

### 2:50 - 3:00 | Final value statement
- Narration:  
  "RiskPilot-M turns liquidation panic into a structured, explainable, and operator-approved response in under three minutes."

## Demo Operator Notes
- Preferred scenario: start from **HIGH/CRITICAL** sample to maximize before/after clarity.
- If live API latency spikes, continue with fallback mode and keep flow unchanged.
- Keep camera focus on metrics and approval gate; avoid deep implementation tangents unless asked.
