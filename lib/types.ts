export type RiskBand = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface PositionInput {
  protocol: string;
  collateralUsd: number;
  debtUsd: number;
  liquidationThreshold: number; // 0..1
}

export interface PositionAssessment extends PositionInput {
  healthFactor: number;
  distanceToLiquidationUsd: number;
  riskBand: RiskBand;
}

export interface MitigationPlan {
  summary: string;
  actions: string[];
  confidence: "low" | "medium" | "high";
  mode: "live-mistral" | "fallback-mock";
}
