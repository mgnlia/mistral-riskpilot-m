export type RiskBand = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type PlanConfidence = "low" | "medium" | "high";

export type PlanMode = "live-mistral" | "fallback-mock";

export type MitigationPrimaryAction = "repay-debt" | "add-collateral" | "monitor-only";

export interface PositionInput {
  protocol: string;
  collateralUsd: number;
  debtUsd: number;
  liquidationThreshold: number; // 0..1
}

export interface PositionAssessment extends PositionInput {
  healthFactor: number;
  distanceToLiquidationUsd: number;
  bufferPercent: number;
  riskScore: number; // 0..100
  riskBand: RiskBand;
}

export interface MitigationTargets {
  targetHealthFactor: number;
  suggestedCollateralTopUpUsd: number;
  suggestedDebtRepayUsd: number;
  projectedHealthFactor: number;
  projectedRiskBand: RiskBand;
  estimatedPenaltyAvoidedUsd: number;
  primaryAction: MitigationPrimaryAction;
}

export interface MitigationPlan extends MitigationTargets {
  summary: string;
  actions: string[];
  confidence: PlanConfidence;
  mode: PlanMode;
  rationale: string;
  warning?: string;
}

export interface ParsedAnalyzeRequest {
  input: PositionInput;
  marketShockPct: number;
  targetHealthFactor: number;
}
