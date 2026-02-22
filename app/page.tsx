"use client";

import { useMemo, useState } from "react";
import { assessPosition, normalizeMarketShockPct, normalizeTargetHealthFactor } from "@/lib/risk";
import { samplePositions } from "@/lib/sample-data";
import type { MitigationPlan, PositionAssessment } from "@/lib/types";

interface AnalyzeResponse {
  assessment: PositionAssessment;
  plan: MitigationPlan;
  assumptions: {
    marketShockPct: number;
    targetHealthFactor: number;
    penaltyModel: string;
  };
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
  const [analysis, setAnalysis] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [approved, setApproved] = useState(false);
  const [marketShockPct, setMarketShockPct] = useState(8);
  const [targetHealthFactor, setTargetHealthFactor] = useState(1.45);

  const runAnalysis = async () => {
    setLoading(true);
    setError(null);
    setApproved(false);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: selected,
          marketShockPct,
          targetHealthFactor
        })
      });

      const payload = (await response.json()) as AnalyzeResponse & { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Failed to analyze position");
      }

      setAnalysis(payload);
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
                onClick={() => {
                  setSelected(position);
                  setAnalysis(null);
                  setApproved(false);
                }}
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
            <Metric label="Risk Score" value={`${selected.riskScore}/100`} />
          </div>

          <div className="control-grid">
            <label className="field">
              <span>Stress Shock (%)</span>
              <input
                type="number"
                min={0}
                max={60}
                step={1}
                value={marketShockPct}
                onChange={(e) => setMarketShockPct(normalizeMarketShockPct(Number(e.target.value)))}
              />
            </label>

            <label className="field">
              <span>Target HF</span>
              <input
                type="number"
                min={1.05}
                max={2.5}
                step={0.05}
                value={targetHealthFactor}
                onChange={(e) => setTargetHealthFactor(normalizeTargetHealthFactor(Number(e.target.value)))}
              />
            </label>
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
                <strong>Rationale:</strong> {analysis.plan.rationale}
              </p>
              <div className="metrics plan-metrics">
                <Metric label="Inference Mode" value={analysis.plan.mode} />
                <Metric label="Confidence" value={analysis.plan.confidence} />
                <Metric label="Primary Action" value={analysis.plan.primaryAction} />
                <Metric label="Projected HF" value={analysis.plan.projectedHealthFactor.toFixed(2)} />
                <Metric label="Debt Repay" value={`$${analysis.plan.suggestedDebtRepayUsd.toLocaleString()}`} />
                <Metric
                  label="Collateral Top-up"
                  value={`$${analysis.plan.suggestedCollateralTopUpUsd.toLocaleString()}`}
                />
                <Metric
                  label="Penalty Avoided (est.)"
                  value={`$${analysis.plan.estimatedPenaltyAvoidedUsd.toLocaleString()}`}
                />
                <Metric label="Projected Risk Band" value={analysis.plan.projectedRiskBand} />
              </div>

              <ul>
                {analysis.plan.actions.map((action, idx) => (
                  <li key={idx}>{action}</li>
                ))}
              </ul>

              {analysis.plan.warning ? <p className="warning">⚠️ {analysis.plan.warning}</p> : null}

              <p className="muted small">
                Assumptions → Shock: {analysis.assumptions.marketShockPct}% · Target HF: {analysis.assumptions.targetHealthFactor}
                · Penalty Model: {analysis.assumptions.penaltyModel}
              </p>

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
        Built for Mistral AI Worldwide Hackathon 2026 · Primary track: Agent Skills · deploy-marker: scout-force-prod-2026-02-22t1608z
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
