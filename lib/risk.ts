import type { MitigationPrimaryAction, MitigationTargets, PositionAssessment, PositionInput, RiskBand } from "./types";

const round2 = (value: number): number => Number(value.toFixed(2));

const clamp = (value: number, min: number, max: number): number => {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
};

const normalizeUsd = (value: number): number => {
  if (!Number.isFinite(value) || value < 0) return 0;
  return round2(value);
};

export function normalizeTargetHealthFactor(value: number): number {
  return round2(clamp(value, 1.05, 2.5));
}

export function normalizeMarketShockPct(value: number): number {
  return round2(clamp(value, 0, 60));
}

export function validatePositionInput(input: PositionInput): PositionInput {
  return {
    protocol: input.protocol?.trim() || "Unknown",
    collateralUsd: normalizeUsd(input.collateralUsd),
    debtUsd: normalizeUsd(input.debtUsd),
    liquidationThreshold:
      Number.isFinite(input.liquidationThreshold) && input.liquidationThreshold > 0 && input.liquidationThreshold <= 1
        ? round2(input.liquidationThreshold)
        : 0.8
  };
}

export function computeHealthFactor(position: PositionInput): number {
  const p = validatePositionInput(position);
  if (p.debtUsd <= 0) return 9.99;

  const raw = (p.collateralUsd * p.liquidationThreshold) / p.debtUsd;
  return Number.isFinite(raw) ? round2(raw) : 0;
}

export function computeRiskBand(healthFactor: number): RiskBand {
  if (healthFactor >= 1.8) return "LOW";
  if (healthFactor >= 1.35) return "MEDIUM";
  if (healthFactor >= 1.1) return "HIGH";
  return "CRITICAL";
}

export function computeRiskScore(healthFactor: number, bufferPercent: number): number {
  let score = 0;

  if (healthFactor < 1) score = 96;
  else if (healthFactor < 1.05) score = 88;
  else if (healthFactor < 1.15) score = 77;
  else if (healthFactor < 1.3) score = 64;
  else if (healthFactor < 1.5) score = 48;
  else if (healthFactor < 1.8) score = 32;
  else score = 12;

  if (bufferPercent < 0) score += 15;
  else if (bufferPercent < 2) score += 12;
  else if (bufferPercent < 5) score += 8;
  else if (bufferPercent < 10) score += 4;

  return Math.round(clamp(score, 0, 100));
}

export function assessPosition(position: PositionInput): PositionAssessment {
  const p = validatePositionInput(position);
  const healthFactor = computeHealthFactor(p);
  const liquidationLine = p.liquidationThreshold > 0 ? p.debtUsd / p.liquidationThreshold : p.debtUsd;
  const distanceToLiquidationUsd = round2(p.collateralUsd - liquidationLine);
  const bufferPercent = p.collateralUsd > 0 ? round2((distanceToLiquidationUsd / p.collateralUsd) * 100) : 0;

  return {
    ...p,
    healthFactor,
    distanceToLiquidationUsd,
    bufferPercent,
    riskScore: computeRiskScore(healthFactor, bufferPercent),
    riskBand: computeRiskBand(healthFactor)
  };
}

export function applyMarketShock(position: PositionInput, marketShockPct: number): PositionInput {
  const p = validatePositionInput(position);
  const shock = normalizeMarketShockPct(marketShockPct) / 100;

  return {
    ...p,
    collateralUsd: round2(p.collateralUsd * (1 - shock))
  };
}

export function estimateLiquidationPenaltyExposure(assessment: PositionAssessment): number {
  if (assessment.debtUsd <= 0) return 0;

  const basePenalty = assessment.debtUsd * 0.05; // conservative 5% penalty assumption
  const urgencyMultiplier =
    assessment.healthFactor < 1
      ? 1.55
      : assessment.healthFactor < 1.1
        ? 1.35
        : assessment.healthFactor < 1.25
          ? 1.15
          : 0.9;

  return round2(basePenalty * urgencyMultiplier);
}

function computeProjectedState(
  assessment: PositionAssessment,
  targetHealthFactor: number,
  action: MitigationPrimaryAction,
  topUpUsd: number,
  repayUsd: number
): { projectedHealthFactor: number; projectedRiskBand: RiskBand } {
  if (action === "monitor-only") {
    return {
      projectedHealthFactor: assessment.healthFactor,
      projectedRiskBand: assessment.riskBand
    };
  }

  const nextPosition: PositionInput = {
    protocol: assessment.protocol,
    liquidationThreshold: assessment.liquidationThreshold,
    collateralUsd: action === "add-collateral" ? assessment.collateralUsd + topUpUsd : assessment.collateralUsd,
    debtUsd: action === "repay-debt" ? Math.max(0, assessment.debtUsd - repayUsd) : assessment.debtUsd
  };

  const projectedHealthFactor = computeHealthFactor(nextPosition);
  const projectedRiskBand = computeRiskBand(projectedHealthFactor);

  return {
    projectedHealthFactor: projectedHealthFactor >= targetHealthFactor ? projectedHealthFactor : targetHealthFactor,
    projectedRiskBand
  };
}

export function deriveMitigationTargets(assessment: PositionAssessment, targetHealthFactorRaw: number): MitigationTargets {
  const targetHealthFactor = normalizeTargetHealthFactor(targetHealthFactorRaw);

  if (assessment.debtUsd <= 0 || assessment.riskBand === "LOW") {
    return {
      targetHealthFactor,
      suggestedCollateralTopUpUsd: 0,
      suggestedDebtRepayUsd: 0,
      projectedHealthFactor: assessment.healthFactor,
      projectedRiskBand: assessment.riskBand,
      estimatedPenaltyAvoidedUsd: 0,
      primaryAction: "monitor-only"
    };
  }

  const requiredCollateral = (assessment.debtUsd * targetHealthFactor) / assessment.liquidationThreshold;
  const suggestedCollateralTopUpUsd = round2(Math.max(0, requiredCollateral - assessment.collateralUsd));

  const targetDebt = (assessment.collateralUsd * assessment.liquidationThreshold) / targetHealthFactor;
  const suggestedDebtRepayUsd = round2(Math.max(0, assessment.debtUsd - targetDebt));

  let primaryAction: MitigationPrimaryAction = "monitor-only";

  if (suggestedCollateralTopUpUsd > 0 || suggestedDebtRepayUsd > 0) {
    if (suggestedDebtRepayUsd === 0) {
      primaryAction = "add-collateral";
    } else if (suggestedCollateralTopUpUsd === 0) {
      primaryAction = "repay-debt";
    } else {
      primaryAction = suggestedDebtRepayUsd <= suggestedCollateralTopUpUsd ? "repay-debt" : "add-collateral";
    }
  }

  const projected = computeProjectedState(
    assessment,
    targetHealthFactor,
    primaryAction,
    suggestedCollateralTopUpUsd,
    suggestedDebtRepayUsd
  );

  return {
    targetHealthFactor,
    suggestedCollateralTopUpUsd,
    suggestedDebtRepayUsd,
    projectedHealthFactor: projected.projectedHealthFactor,
    projectedRiskBand: projected.projectedRiskBand,
    estimatedPenaltyAvoidedUsd: estimateLiquidationPenaltyExposure(assessment),
    primaryAction
  };
}
