import type { MitigationPlan, PositionAssessment } from "./types";

const API_URL = "https://api.mistral.ai/v1/chat/completions";

function buildPrompt(position: PositionAssessment): string {
  return [
    "You are a DeFi liquidation risk copilot.",
    "Return concise, practical mitigation actions in bullet style.",
    `Protocol: ${position.protocol}`,
    `Collateral USD: ${position.collateralUsd}`,
    `Debt USD: ${position.debtUsd}`,
    `Liquidation threshold: ${position.liquidationThreshold}`,
    `Health factor: ${position.healthFactor}`,
    `Distance to liquidation (USD): ${position.distanceToLiquidationUsd}`,
    `Risk band: ${position.riskBand}`,
    "Output format:",
    "SUMMARY: one line",
    "ACTIONS:",
    "- action 1",
    "- action 2",
    "- action 3",
    "CONFIDENCE: low|medium|high"
  ].join("\n");
}

function parsePlanFromText(text: string): Omit<MitigationPlan, "mode"> {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const summaryLine = lines.find((line) => line.toUpperCase().startsWith("SUMMARY:"));
  const confidenceLine = lines.find((line) => line.toUpperCase().startsWith("CONFIDENCE:"));

  const actions = lines
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^-\s*/, ""))
    .slice(0, 5);

  const confidenceRaw = confidenceLine?.split(":")[1]?.trim().toLowerCase();
  const confidence: "low" | "medium" | "high" =
    confidenceRaw === "high" || confidenceRaw === "medium" || confidenceRaw === "low" ? confidenceRaw : "medium";

  return {
    summary: summaryLine?.split(":").slice(1).join(":").trim() || "Mitigation actions generated.",
    actions: actions.length ? actions : ["Add collateral", "Repay partial debt", "Enable tighter monitoring alerts"],
    confidence
  };
}

export async function generateMitigationPlan(position: PositionAssessment): Promise<MitigationPlan> {
  const apiKey = process.env.MISTRAL_API_KEY;
  const model = process.env.MISTRAL_MODEL || "mistral-small-latest";

  if (!apiKey) {
    return {
      summary: `${position.protocol}: ${position.riskBand} risk. Prefer immediate collateral top-up and partial debt reduction.`,
      actions: [
        "Top up collateral by 8–15% within 30 minutes",
        "Repay 5–12% of debt to recover health factor > 1.25",
        "Set high-priority alerts every 60s until risk band drops"
      ],
      confidence: "medium",
      mode: "fallback-mock"
    };
  }

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
          content: "You are an expert DeFi risk analyst. Provide safe, concise mitigation guidance."
        },
        {
          role: "user",
          content: buildPrompt(position)
        }
      ]
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Mistral API error (${response.status}): ${detail}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = payload.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Mistral API returned empty content.");
  }

  return {
    ...parsePlanFromText(content),
    mode: "live-mistral"
  };
}
