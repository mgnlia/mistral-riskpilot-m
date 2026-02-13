import type { MitigationPlan, MitigationTargets, PlanConfidence, PositionAssessment } from "./types";

const API_URL = "https://api.mistral.ai/v1/chat/completions";

function formatUsd(value: number): string {
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

function defaultActions(targets: MitigationTargets): string[] {
  return [
    `Raise health factor toward ${targets.targetHealthFactor.toFixed(2)} in the next execution window.`,
    `Repay approximately ${formatUsd(targets.suggestedDebtRepayUsd)} debt or add ${formatUsd(targets.suggestedCollateralTopUpUsd)} collateral.`,
    "Escalate to high-frequency monitoring every 60 seconds until risk band improves."
  ];
}

function confidenceFromRiskBand(riskBand: PositionAssessment["riskBand"]): PlanConfidence {
  if (riskBand === "CRITICAL") return "high";
  if (riskBand === "HIGH") return "medium";
  return "medium";
}

function fallbackPlan(
  assessment: PositionAssessment,
  targets: MitigationTargets,
  warning?: string,
  summaryOverride?: string
): MitigationPlan {
  const summary =
    summaryOverride ??
    `${assessment.protocol}: ${assessment.riskBand} risk with HF ${assessment.healthFactor.toFixed(2)}. Prioritize ${targets.primaryAction.replace("-", " ")}.`;

  return {
    ...targets,
    summary,
    actions: defaultActions(targets),
    confidence: confidenceFromRiskBand(assessment.riskBand),
    mode: "fallback-mock",
    rationale:
      "Deterministic mitigation path generated from health-factor model and buffer distance while preserving human approval gate.",
    warning
  };
}

function buildPrompt(assessment: PositionAssessment, targets: MitigationTargets): string {
  return [
    "You are a DeFi liquidation risk copilot for a hackathon judge demo.",
    "Return concise, practical mitigation guidance grounded in the provided numbers.",
    "Do not invent protocol details.",
    `Protocol: ${assessment.protocol}`,
    `Collateral USD: ${assessment.collateralUsd}`,
    `Debt USD: ${assessment.debtUsd}`,
    `Liquidation threshold: ${assessment.liquidationThreshold}`,
    `Health factor: ${assessment.healthFactor}`,
    `Risk score (0..100): ${assessment.riskScore}`,
    `Buffer percent: ${assessment.bufferPercent}`,
    `Distance to liquidation USD: ${assessment.distanceToLiquidationUsd}`,
    `Risk band: ${assessment.riskBand}`,
    `Model target health factor: ${targets.targetHealthFactor}`,
    `Suggested debt repay USD: ${targets.suggestedDebtRepayUsd}`,
    `Suggested collateral top-up USD: ${targets.suggestedCollateralTopUpUsd}`,
    `Projected health factor after mitigation: ${targets.projectedHealthFactor}`,
    `Estimated penalty avoided USD: ${targets.estimatedPenaltyAvoidedUsd}`,
    "Output format exactly:",
    "SUMMARY: one sentence",
    "RATIONALE: one sentence referencing risk model values",
    "ACTIONS:",
    "- action 1",
    "- action 2",
    "- action 3",
    "CONFIDENCE: low|medium|high"
  ].join("\n");
}

function parsePlanFromText(
  text: string,
  assessment: PositionAssessment,
  targets: MitigationTargets
): Omit<MitigationPlan, keyof MitigationTargets | "mode" | "warning"> {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const summaryLine = lines.find((line) => line.toUpperCase().startsWith("SUMMARY:"));
  const rationaleLine = lines.find((line) => line.toUpperCase().startsWith("RATIONALE:"));
  const confidenceLine = lines.find((line) => line.toUpperCase().startsWith("CONFIDENCE:"));

  const actions = lines
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^-\s*/, ""))
    .slice(0, 5);

  const confidenceRaw = confidenceLine?.split(":").slice(1).join(":").trim().toLowerCase();
  const confidence: PlanConfidence =
    confidenceRaw === "high" || confidenceRaw === "medium" || confidenceRaw === "low"
      ? confidenceRaw
      : confidenceFromRiskBand(assessment.riskBand);

  return {
    summary:
      summaryLine?.split(":").slice(1).join(":").trim() ||
      `${assessment.protocol}: ${assessment.riskBand} risk. Move HF toward ${targets.targetHealthFactor.toFixed(2)}.`,
    rationale:
      rationaleLine?.split(":").slice(1).join(":").trim() ||
      `HF ${assessment.healthFactor.toFixed(2)}, risk score ${assessment.riskScore}, and buffer ${assessment.bufferPercent.toFixed(2)}% indicate intervention is required.`,
    actions: actions.length > 0 ? actions : defaultActions(targets),
    confidence
  };
}

function extractTextContent(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;

  const choices = (payload as { choices?: Array<{ message?: { content?: unknown } }> }).choices;
  const content = choices?.[0]?.message?.content;

  if (typeof content === "string") return content;

  if (Array.isArray(content)) {
    const aggregated = content
      .map((part) => {
        if (!part || typeof part !== "object") return "";
        const text = (part as { text?: unknown }).text;
        return typeof text === "string" ? text : "";
      })
      .join("\n")
      .trim();

    return aggregated || null;
  }

  return null;
}

export async function generateMitigationPlan(
  assessment: PositionAssessment,
  targets: MitigationTargets
): Promise<MitigationPlan> {
  const apiKey = process.env.MISTRAL_API_KEY;
  const model = process.env.MISTRAL_MODEL || "mistral-small-latest";

  if (!apiKey) {
    return fallbackPlan(
      assessment,
      targets,
      "MISTRAL_API_KEY is not configured; running deterministic fallback mode for demo reliability."
    );
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: "You are an expert DeFi risk analyst. Keep output terse, numeric, and execution-safe."
          },
          {
            role: "user",
            content: buildPrompt(assessment, targets)
          }
        ]
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      return fallbackPlan(
        assessment,
        targets,
        `Mistral API unavailable (${response.status}). Fallback plan returned. Detail: ${detail.slice(0, 220)}`
      );
    }

    const payload = (await response.json()) as unknown;
    const content = extractTextContent(payload);

    if (!content) {
      return fallbackPlan(assessment, targets, "Mistral response contained no usable content; fallback plan returned.");
    }

    const parsed = parsePlanFromText(content, assessment, targets);

    return {
      ...targets,
      ...parsed,
      mode: "live-mistral"
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown upstream error";
    return fallbackPlan(assessment, targets, `Live inference failed. Fallback plan returned. Error: ${message}`);
  }
}
