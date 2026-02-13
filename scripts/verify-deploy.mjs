#!/usr/bin/env node

/**
 * Deploy verification script for RiskPilot-M.
 * Usage:
 *   node scripts/verify-deploy.mjs https://mistral-riskpilot-m.vercel.app
 */

const baseUrl = (process.argv[2] || process.env.BASE_URL || "https://mistral-riskpilot-m.vercel.app").replace(/\/$/, "");

function fail(message, detail) {
  console.error(`❌ ${message}`);
  if (detail) console.error(detail);
  process.exit(1);
}

function pass(message) {
  console.log(`✅ ${message}`);
}

async function checkHome() {
  const response = await fetch(baseUrl, { method: "GET", redirect: "follow" });
  if (!response.ok) {
    const text = await response.text().catch(() => "<no body>");
    fail(`GET ${baseUrl} failed with status ${response.status}`, text.slice(0, 300));
  }

  pass(`Home page reachable (${response.status})`);
}

async function checkAnalyzeApi() {
  const payload = {
    input: {
      protocol: "MarginFi",
      collateralUsd: 8800,
      debtUsd: 6900,
      liquidationThreshold: 0.8
    },
    marketShockPct: 8,
    targetHealthFactor: 1.45
  };

  const response = await fetch(`${baseUrl}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const bodyText = await response.text();
  let data;

  try {
    data = JSON.parse(bodyText);
  } catch {
    fail(`POST ${baseUrl}/api/analyze returned non-JSON (${response.status})`, bodyText.slice(0, 400));
  }

  if (!response.ok) {
    fail(`POST ${baseUrl}/api/analyze failed with status ${response.status}`, JSON.stringify(data, null, 2));
  }

  const hasKeys = data && data.assessment && data.plan && data.assumptions;
  if (!hasKeys) {
    fail("/api/analyze response missing required keys", JSON.stringify(data, null, 2));
  }

  const mode = data.plan?.mode;
  const modeAllowed = mode === "live-mistral" || mode === "fallback-mock";
  if (!modeAllowed) {
    fail("plan.mode is invalid (expected live-mistral|fallback-mock)", JSON.stringify(data.plan, null, 2));
  }

  pass(`/api/analyze reachable (${response.status}) with required keys`);
  pass(`plan.mode=${mode}`);

  console.log("\nSummary:");
  console.log(JSON.stringify({
    baseUrl,
    riskBand: data.assessment?.riskBand,
    healthFactor: data.assessment?.healthFactor,
    projectedHealthFactor: data.plan?.projectedHealthFactor,
    projectedRiskBand: data.plan?.projectedRiskBand,
    mode
  }, null, 2));
}

(async () => {
  try {
    console.log(`Running deploy checks for: ${baseUrl}`);
    await checkHome();
    await checkAnalyzeApi();
    console.log("\n🎉 Deployment verification passed.");
  } catch (error) {
    fail("Unexpected verification error", error instanceof Error ? error.message : String(error));
  }
})();
