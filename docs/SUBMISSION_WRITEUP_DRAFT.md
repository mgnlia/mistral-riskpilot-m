# Submission Writeup Draft (200–400 words)

RiskPilot-M is an agentic DeFi liquidation-prevention copilot built for the Mistral AI Worldwide Hackathon. The product addresses a practical operational problem: lending positions can move from healthy to liquidatable quickly under market stress, while operators still need explainable and reviewable mitigation decisions.

The MVP combines a deterministic risk engine with a Mistral-powered reasoning layer. Operators provide position context (protocol, collateral, debt, liquidation threshold), then run a stress simulation and target health factor analysis. The system computes measurable risk outputs (health factor, risk score, buffer distance, estimated liquidation penalty exposure) and produces a mitigation plan with explicit action targets (suggested debt repay and/or collateral top-up).

Mistral is used to generate concise, operator-friendly rationale and action sequencing from model-grounded numerical context. To improve demo reliability, the app supports graceful degradation: if `MISTRAL_API_KEY` is unavailable or upstream inference fails, RiskPilot-M returns a deterministic fallback plan instead of failing hard. This ensures judges can still evaluate end-to-end behavior.

Safety is enforced through a human-in-the-loop approval gate. The system does not auto-execute high-impact actions in MVP mode. Operators must explicitly approve recommendations before moving to controlled execution state.

In the demo scenario, a high-risk position is analyzed under an 8–12% market shock, and the recommended mitigation raises projected health factor toward a safer band while quantifying estimated penalty avoided. This turns liquidation response from panic handling into a structured, explainable, and operator-approved workflow.

Built with: Next.js (TypeScript), Mistral API (`mistral-small-latest`), deterministic risk modeling, and Vercel deployment target.
