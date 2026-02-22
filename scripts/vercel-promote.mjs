#!/usr/bin/env node
import fs from 'node:fs'

const token = process.env.VERCEL_TOKEN
if (!token) {
  console.error('Missing VERCEL_TOKEN')
  process.exit(1)
}

const projectMeta = JSON.parse(fs.readFileSync(new URL('../.vercel/project.json', import.meta.url), 'utf8'))
const teamId = process.env.VERCEL_TEAM_ID || process.env.VERCEL_ORG_ID || projectMeta.orgId
const projectId = projectMeta.projectId
const projectName = projectMeta.projectName || 'mistral-riskpilot-m'
const repo = 'mgnlia/mistral-riskpilot-m'
const ref = 'main'
const canonicalAlias = 'mistral-riskpilot-m.vercel.app'

const api = async (path, init = {}) => {
  const url = new URL(`https://api.vercel.com${path}`)
  if (teamId) url.searchParams.set('teamId', teamId)
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(init.headers || {})
    }
  })
  const text = await res.text()
  let data
  try { data = text ? JSON.parse(text) : {} } catch { data = { raw: text } }
  if (!res.ok) {
    throw new Error(`${init.method || 'GET'} ${path} failed (${res.status}): ${JSON.stringify(data)}`)
  }
  return data
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const createProductionDeployment = async () => {
  const body = {
    name: projectName,
    project: projectName,
    target: 'production',
    gitSource: {
      type: 'github',
      repo,
      ref
    },
    projectSettings: {
      framework: 'nextjs'
    }
  }

  console.log('Creating production deployment...')
  try {
    const created = await api('/v13/deployments', { method: 'POST', body: JSON.stringify(body) })
    return created
  } catch (err) {
    console.error('Primary create failed, retrying with projectId only...')
    const fallbackBody = {
      name: projectName,
      target: 'production',
      gitSource: {
        type: 'github',
        repo,
        ref
      },
      projectSettings: {
        framework: 'nextjs'
      },
      meta: {
        githubCommitRef: ref,
        githubRepo: repo
      }
    }
    return await api(`/v13/deployments?projectId=${encodeURIComponent(projectId)}`, {
      method: 'POST',
      body: JSON.stringify(fallbackBody)
    })
  }
}

const waitReady = async (id, maxAttempts = 60) => {
  for (let i = 1; i <= maxAttempts; i++) {
    const d = await api(`/v13/deployments/${id}`)
    const state = d.readyState || d.state
    console.log(`Attempt ${i}/${maxAttempts}: ${state}`)
    if (state === 'READY') return d
    if (state === 'ERROR' || state === 'CANCELED') {
      throw new Error(`Deployment failed with state=${state} url=${d.url || 'n/a'}`)
    }
    await sleep(5000)
  }
  throw new Error('Timed out waiting for deployment READY')
}

const listReady = async () => {
  const r = await api(`/v6/deployments?projectId=${encodeURIComponent(projectId)}&limit=20&state=READY`)
  return r.deployments || []
}

const aliasDeployment = async (deploymentId) => {
  try {
    const out = await api(`/v2/deployments/${deploymentId}/aliases`, {
      method: 'POST',
      body: JSON.stringify({ alias: canonicalAlias })
    })
    return { ok: true, out }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
}

const verifyUrl = async (url) => {
  const res = await fetch(url, { redirect: 'follow' })
  const text = await res.text()
  return {
    status: res.status,
    ok: res.ok,
    snippet: text.slice(0, 180).replace(/\s+/g, ' ')
  }
}

const run = async () => {
  const created = await createProductionDeployment()
  const deploymentId = created.id
  console.log('Created deployment:', deploymentId, created.url)

  const ready = await waitReady(deploymentId)
  const deployUrl = `https://${ready.url}`
  const aliasResult = await aliasDeployment(deploymentId)

  let aliasUrl = `https://${canonicalAlias}`
  let aliasVerification = await verifyUrl(aliasUrl)

  if (!aliasVerification.ok) {
    const readies = await listReady()
    for (const d of readies) {
      if (d.id === deploymentId) continue
      const attempt = await aliasDeployment(d.id)
      if (attempt.ok) {
        aliasVerification = await verifyUrl(aliasUrl)
        if (aliasVerification.ok) break
      }
    }
  }

  const deployVerification = await verifyUrl(deployUrl)

  const packet = {
    projectName,
    projectId,
    teamId,
    repo,
    ref,
    deploymentId,
    deploymentUrl: deployUrl,
    deploymentState: ready.readyState || ready.state,
    deploymentCreatedAt: ready.createdAt,
    deploymentReadyAt: ready.ready,
    deploymentInspectorUrl: ready.inspectorUrl || null,
    deploymentMeta: ready.meta || {},
    alias: canonicalAlias,
    aliasResult,
    aliasVerification,
    deploymentVerification: deployVerification
  }

  console.log('\n=== IMMUTABLE PACKET ===')
  console.log(JSON.stringify(packet, null, 2))
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
