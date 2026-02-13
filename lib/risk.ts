import type { PositionAssessment, PositionInput, RiskBand } from "./types";

const clampToNonNegative = (value: number): number => (Number.isFinite(value) && value > 0 ? value : 0);

export function validatePositionInput(input: PositionInput): PositionInput {
  return {
    protocol: input.protocol?.trim() || "Unknown",
    collateralUsd: clampToNonNegative(input.collateralUsd),
    debtUsd: clampToNonNegative(input.debtUsd),
    liquidationThreshold:
      Number.isFinite(input.liquidationThreshold) && input.liquidationThreshold > 0 && input.liquidationThreshold <= 1
        ? input.liquidationThreshold
        : 0.8
  };
}

export function computeHealthFactor(position: PositionInput): number {
  const p = validatePositionInput(position);
  if (p.debtUsd <= 0) return 9.99;

  const raw = (p.collateralUsd * p.liquidationThreshold) / p.debtUsd;
  return Number.isFinite(raw) ? Number(raw.toFixed(2)) : 0;
}

export function computeRiskBand(healthFactor: number): RiskBand {
  if (healthFactor >= 1.8) return "LOW";
  if (healthFactor >= 1.35) return "MEDIUM";
  if (healthFactor >= 1.05) return "HIGH";
  return "CRITICAL";
}

export function assessPosition(position: PositionInput): PositionAssessment {
  const p = validatePositionInput(position);
  const healthFactor = computeHealthFactor(p);
  const liquidationLine = p.debtUsd / p.liquidationThreshold;
  const distanceToLiquidationUsd = Number((p.collateralUsd - liquidationLine).toFixed(2));

  return {
    ...p,
    healthFactor,
    distanceToLiquidationUsd,
    riskBand: computeRiskBand(healthFactor)
  };
}
