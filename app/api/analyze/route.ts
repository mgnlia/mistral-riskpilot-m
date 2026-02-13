import { NextResponse } from "next/server";
import {
  applyMarketShock,
  assessPosition,
  deriveMitigationTargets,
  normalizeMarketShockPct,
  normalizeTargetHealthFactor,
  validatePositionInput
} from "@/lib/risk";
import { generateMitigationPlan } from "@/lib/mistral";
import type { ParsedAnalyzeRequest, PositionInput } from "@/lib/types";

function parseAnalyzeRequest(body: unknown): ParsedAnalyzeRequest {
  const inputRaw = (body as { input?: Partial<PositionInput> } | null)?.input ?? (body as Partial<PositionInput>);

  const input = validatePositionInput({
    protocol: inputRaw?.protocol ?? "Unknown",
    collateralUsd: Number(inputRaw?.collateralUsd ?? 0),
    debtUsd: Number(inputRaw?.debtUsd ?? 0),
    liquidationThreshold: Number(inputRaw?.liquidationThreshold ?? 0.8)
  });

  if (input.debtUsd <= 0) {
    throw new Error("Debt must be greater than zero for liquidation analysis.");
  }

  if (input.collateralUsd <= 0) {
    throw new Error("Collateral must be greater than zero for liquidation analysis.");
  }

  const marketShockPct = normalizeMarketShockPct(Number((body as { marketShockPct?: unknown } | null)?.marketShockPct ?? 0));
  const targetHealthFactor = normalizeTargetHealthFactor(
    Number((body as { targetHealthFactor?: unknown } | null)?.targetHealthFactor ?? 1.35)
  );

  return {
    input,
    marketShockPct,
    targetHealthFactor
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as unknown;
    const { input, marketShockPct, targetHealthFactor } = parseAnalyzeRequest(body);

    const stressedInput = applyMarketShock(input, marketShockPct);
    const assessment = assessPosition(stressedInput);
    const targets = deriveMitigationTargets(assessment, targetHealthFactor);
    const plan = await generateMitigationPlan(assessment, targets);

    return NextResponse.json({
      assessment,
      plan,
      assumptions: {
        marketShockPct,
        targetHealthFactor,
        penaltyModel: "5% base penalty with urgency multiplier"
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json(
      {
        error: message
      },
      { status: 400 }
    );
  }
}
