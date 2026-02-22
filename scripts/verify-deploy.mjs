#!/usr/bin/env node

/**
 * Deploy verification script for RiskPilot-M.
 * Usage:
 *   node scripts/verify-deploy.mjs https://mistral-riskpilot-m.vercel.app [expectedSha]
 */

const baseUrl = (process.argv[2] || process.env.BASE_URL || "https://mistral-riskpilot-m.vercel.app").replace(/\/$/, "");
const expectedSha = process.argv[3] || process.env.EXPECTED_SHA || null;

function fail(message, detail) {
  console.error(`❌ ${message}`);
  if (detail) console.error(detail);
  process.exit(1);
}

function pass(message) {
  console.log(`✅ ${message}`);
}

async function getJson(url) {
  const response = await fetch(url, { method: "GET", redirect: "follow" });
  const text = await response.text();
  let data = null;

  try {
    data = JSON.parse(text);
  } catch {
    // Non-JSON bodies are acceptable for non-API checks.
  }

  return { response, text, data };
}

async function checkHome() {
  const { response, text } = await getJson(baseUrl);
  if (!response.ok) {
    fail(`GET ${baseUrl} failed with status ${response.status}`, text.slice(0, 300));
  }

  pass(`Home page reachable (${response.status})`);
}

async function checkHealthApi() {
  const { response, text, data } = await getJson(`${baseUrl}/api/health`);

  if (!response.ok) {
    fail(`GET ${baseUrl}/api/health failed with status ${response.status}`, text.slice(0, 300));
  }

  if (!data || data.ok !== true || data.service !== "riskpilot-m") {
    fail("/api/health response invalid", JSON.stringify(data ?? text, null, 2));
  }

  pass(`/api/health reachable (${response.status})`);
  pass(`mistralConfigured=${Boolean(data.mistralConfigured)}`);

  return data;
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

  return {
    mode,
    riskBand: data.assessment?.riskBand,
    healthFactor: data.assessment?.healthFactor,
    projectedHealthFactor: data.plan?.projectedHealthFactor,
    projectedRiskBand: data.plan?.projectedRiskBand
  };
}

async function checkDeployEvidence() {
  const { response, text, data } = await getJson(`${baseUrl}/api/deploy-evidence`);

  if (!response.ok) {
    fail(`GET ${baseUrl}/api/deploy-evidence failed with status ${response.status}`, text.slice(0, 300));
  }

  const build = data?.build;
  if (!data || data.service !== "riskpilot-m" || !build?.buildUtc || !build?.gitCommitSha) {
    fail("/api/deploy-evidence response invalid", JSON.stringify(data ?? text, null, 2));
  }

  if (expectedSha && build.gitCommitSha !== expectedSha) {
    fail(
      `/api/deploy-evidence gitCommitSha mismatch (expected ${expectedSha}, got ${build.gitCommitSha})`,
      JSON.stringify(data, null, 2)
    );
  }

  pass(`/api/deploy-evidence reachable (${response.status})`);
  pass(`build.gitCommitSha=${build.gitCommitSha}`);
  pass(`build.buildUtc=${build.buildUtc}`);

  return data;
}

(async () => {
  try {
    console.log(`Running deploy checks for: ${baseUrl}`);
    await checkHome();
    const health = await checkHealthApi();
    const analysis = await checkAnalyzeApi();
    const deployEvidence = await checkDeployEvidence();

    console.log("\nSummary:");
    console.log(
      JSON.stringify(
        {
          baseUrl,
          model: health.model,
          mistralConfigured: health.mistralConfigured,
          expectedSha,
          deployEvidence,
          ...analysis
        },
        null,
        2
      )
    );

    console.log("\n🎉 Deployment verification passed.");
  } catch (error) {
    fail("Unexpected verification error", error instanceof Error ? error.message : String(error));
  }
})();
