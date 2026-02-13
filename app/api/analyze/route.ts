import { NextResponse } from "next/server";
import { assessPosition, validatePositionInput } from "@/lib/risk";
import { generateMitigationPlan } from "@/lib/mistral";
import type { PositionInput } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<PositionInput>;

    const input: PositionInput = validatePositionInput({
      protocol: body.protocol ?? "Unknown",
      collateralUsd: Number(body.collateralUsd ?? 0),
      debtUsd: Number(body.debtUsd ?? 0),
      liquidationThreshold: Number(body.liquidationThreshold ?? 0.8)
    });

    const assessment = assessPosition(input);
    const plan = await generateMitigationPlan(assessment);

    return NextResponse.json({
      assessment,
      plan
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json(
      {
        error: message
      },
      { status: 500 }
    );
  }
}
