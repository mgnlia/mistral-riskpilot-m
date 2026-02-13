import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "riskpilot-m",
    timestamp: new Date().toISOString(),
    model: process.env.MISTRAL_MODEL || "mistral-small-latest",
    mistralConfigured: Boolean(process.env.MISTRAL_API_KEY)
  });
}
