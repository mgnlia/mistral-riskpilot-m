"use client";

import { useMemo, useState } from "react";
import { assessPosition } from "@/lib/risk";
import { samplePositions } from "@/lib/sample-data";
import type { MitigationPlan, PositionAssessment } from "@/lib/types";

interface AnalysisState {
  assessment: PositionAssessment;
  plan: MitigationPlan;
}

const riskColor: Record<PositionAssessment["riskBand"], string> = {
  LOW: "#1f9d55",
  MEDIUM: "#d69e2e",
  HIGH: "#dd6b20",
  CRITICAL: "#e53e3e"
};

export default function Page() {
  const initial = useMemo(() => samplePositions.map((p) => assessPosition(p)), []);
  const [selected, setSelected] = useState<PositionAssessment>(initial[0]);
  const [analysis, setAnalysis] = useState<AnalysisState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [approved, setApproved] = useState(false);

  const runAnalysis = async () => {
    setLoading(true);
    setError(null);
    setApproved(false);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selected)
      });

      const payload = (await response.json()) as AnalysisState & { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Failed to analyze position");
      }

      setAnalysis({
        assessment: payload.assessment,
        plan: payload.plan
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <header className="header">
        <h1>RiskPilot-M</h1>
        <p>Mistral-powered liquidation risk copilot for DeFi lending positions.</p>
      </header>

      <section className="grid">
        <div className="card">
          <h2>1) Select Position</h2>
          <div className="position-list">
            {initial.map((position) => (
              <button
                type="button"
                key={`${position.protocol}-${position.debtUsd}`}
                className={`position-btn ${selected.protocol === position.protocol ? "active" : ""}`}
                onClick={() => setSelected(position)}
              >
                <div>
                  <strong>{position.protocol}</strong>
                  <p>HF: {position.healthFactor.toFixed(2)}</p>
                </div>
                <span style={{ color: riskColor[position.riskBand] }}>{position.riskBand}</span>
              </button>
            ))}
          </div>

          <div className="metrics">
            <Metric label="Collateral" value={`$${selected.collateralUsd.toLocaleString()}`} />
            <Metric label="Debt" value={`$${selected.debtUsd.toLocaleString()}`} />
            <Metric label="Health Factor" value={selected.healthFactor.toFixed(2)} />
            <Metric label="Distance to Liquidation" value={`$${selected.distanceToLiquidationUsd.toLocaleString()}`} />
          </div>

          <button type="button" className="primary" onClick={runAnalysis} disabled={loading}>
            {loading ? "Analyzing..." : "2) Run Mistral Analysis"}
          </button>

          {error && <p className="error">{error}</p>}
        </div>

        <div className="card">
          <h2>3) Mitigation Plan</h2>
          {!analysis ? (
            <p className="muted">Run analysis to generate risk explanation and recommended actions.</p>
          ) : (
            <>
              <p>
                <strong>Summary:</strong> {analysis.plan.summary}
              </p>
              <p>
                <strong>Inference Mode:</strong> {analysis.plan.mode}
              </p>
              <p>
                <strong>Confidence:</strong> {analysis.plan.confidence}
              </p>
              <ul>
                {analysis.plan.actions.map((action, idx) => (
                  <li key={idx}>{action}</li>
                ))}
              </ul>

              <div className="approval-row">
                <button type="button" className="secondary" onClick={() => setApproved(false)}>
                  Hold for Review
                </button>
                <button type="button" className="primary" onClick={() => setApproved(true)}>
                  Approve Actions
                </button>
              </div>

              {approved ? (
                <p className="approved">✅ Human approval recorded. Actions may proceed in controlled execution mode.</p>
              ) : (
                <p className="muted">No execution until a human operator approves.</p>
              )}
            </>
          )}
        </div>
      </section>

      <footer className="footer">
        Built for Mistral AI Worldwide Hackathon 2026 · Primary track: Agent Skills
      </footer>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
