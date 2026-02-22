import { NextResponse } from "next/server";
import { BUILD_INFO } from "@/lib/build-info.generated";

export async function GET() {
  return NextResponse.json({
    service: "riskpilot-m",
    build: BUILD_INFO,
    runtime: {
      vercelDeploymentId: process.env.VERCEL_DEPLOYMENT_ID ?? null,
      vercelDeploymentUrl: process.env.VERCEL_URL ?? null,
      vercelRegion: process.env.VERCEL_REGION ?? null,
      vercelGitCommitSha: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
      vercelGitCommitRef: process.env.VERCEL_GIT_COMMIT_REF ?? null,
      vercelEnv: process.env.VERCEL_ENV ?? null,
      vercelProjectProductionUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL ?? null
    }
  });
}
