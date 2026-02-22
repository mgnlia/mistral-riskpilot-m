# SETs Re-entry Packet (Immutable, Single Source)

Prepared UTC: 2026-02-22T14:30:00Z
Task: `SETsReXncQId2IoE8TYd_`

## 1) Explicit IN/OUT Scope Verdict

- **IN (aligned deploy target):** `mgnlia/mistral-riskpilot-m`
- **OUT (misaligned comparator):** `mgnlia/kidrunner-android-prototype`

**Canonical deploy SHA:** `271e39c0dd12e2f2b486d82a06c3cd85b6275874`

**Supersession note:** prior `efddd05f4963d899925da9eca302e414da594432` deploy-linked claim is **superseded/non-canonical for deployed-state attestation** in this cycle. Canonical chain is locked to `271e39c0dd12e2f2b486d82a06c3cd85b6275874`.

---

## 2) Compared IDs/URLs Table (SHA-pinned / immutable-only)

| Item | IN target (`mistral-riskpilot-m`) | OUT comparator (`kidrunner-android-prototype`) | Disposition |
|---|---|---|---|
| Repository | https://api.github.com/repos/mgnlia/mistral-riskpilot-m | https://api.github.com/repos/mgnlia/kidrunner-android-prototype | Different repos; only IN target is tied to Vercel web deploy evidence |
| Canonical commit | https://github.com/mgnlia/mistral-riskpilot-m/commit/271e39c0dd12e2f2b486d82a06c3cd85b6275874 | https://api.github.com/repos/mgnlia/kidrunner-android-prototype/commits/272457065e9b34b8e27377b2ef418653b46ee3be | Commit lineage differs; OUT commit is Android repo maintenance |
| Vercel project metadata file | https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/271e39c0dd12e2f2b486d82a06c3cd85b6275874/.vercel/project.json | https://api.github.com/repos/mgnlia/kidrunner-android-prototype/contents/.vercel/project.json?ref=272457065e9b34b8e27377b2ef418653b46ee3be | IN has Vercel tuple; OUT returns 404 |
| Deploy-marker source | https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/271e39c0dd12e2f2b486d82a06c3cd85b6275874/app/page.tsx | N/A (Android Kotlin app; no corresponding Next.js deploy marker path) | Marker attestation applies only to IN target |
| Immutable packet cross-check | https://raw.githubusercontent.com/mgnlia/mistral-riskpilot-m/2e08f053618533b76e255b276119e7073f566302/docs/IMMUTABLE_EVIDENCE_PACKET_GMRX.md | N/A | gmRX packet supports same IN target + SHA chain |

---

## 3) Contradiction Checks + Disposition

1. **Mutable-link contradiction (previous FAIL cause):**
   - Prior evidence referenced mutable `main` blob and unspecific repo root.
   - **Disposition:** replaced with SHA-pinned commit/raw/API URLs only in this packet.

2. **Target-mix contradiction (kidrunner vs mistral-riskpilot-m):**
   - Kidrunner previously cited without explicit scope matrix.
   - **Disposition:** explicit IN/OUT verdict above; kidrunner marked OUT for deploy-target alignment.

3. **SHA contradiction (`efddd...` vs `271e...`):**
   - d6A9 v4 text referenced `efddd...` as deploy-linked while JfGz/gmRX chain anchored on `271e...`.
   - **Disposition:** canonical SHA set to `271e39c0dd12e2f2b486d82a06c3cd85b6275874`; `efddd...` explicitly superseded for deployed-state attestation this cycle.

---

## 4) Final Verdict

- **Aligned deploy target:** `mgnlia/mistral-riskpilot-m`
- **Misaligned comparator:** `mgnlia/kidrunner-android-prototype`
- **Canonical SHA:** `271e39c0dd12e2f2b486d82a06c3cd85b6275874`
- **Packet policy:** single immutable packet, no partials.
