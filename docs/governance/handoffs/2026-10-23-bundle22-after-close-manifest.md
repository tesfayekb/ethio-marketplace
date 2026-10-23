# Records turn manifest — 2026-10-23 bundle 22 after the close (turns 12–30)

Written by the supervisor; committed by bundle 22's turn 31 (docs by carrier; one workflow step changed under DEC-240's own rule). Base: dev `4de3d08d` (bundle 22 turn 30). The carrier carries each change as REPLACE-LINES / INSERT-AFTER / APPEND / NEW / REPLACE sections on the base's files; after it, `sha256sum <path>` equals the sha256 column for every row. The records are the supervisor's text, imported word for word (G11, G41); block S76, INC-781…INC-846, the mechanisms register, the amendments record and the handover were written by the supervisor from its running record (the compile of 2026-10-23, audited by the supervisor).

| Path | Change | Bytes after | sha256 after |
| --- | --- | ---: | --- |
| `.github/workflows/local-backend-proof.yml` | REPLACE-LINES (the smoke lane's "Database security lints (DEC-240)" step: continue-on-error and a ::warning naming INC-846 — DEC-240's frozen rule applied) | 50701 | `8fd90acb3881f9858e7a97ccfbae5d6039ba73d704672a21ff0a752095d089d9` |
| `docs/_changelog.md` | APPEND (turns 30 and 31) | 414239 | `89a95f7d4ab63ae06d412affdb61f40128fd662e1dff73908be526a515eaf80f` |
| `docs/features/ci-guards.md` | APPEND (turn 30: the caller gates, the shell pipes, the lints on every commit; INC-846) | 78295 | `6a2caa43a8cddce2beac358771023fdeda2e752130f1a67d9fe6629521e224a4` |
| `docs/features/nightly-e2e.md` | APPEND (turn 30: the lint step before the heartbeat) | 7648 | `03e5d9a4865d853b26a8a34c5de3580520e59205a9c82d0b772e69a1cb0acd93` |
| `docs/features/security-scanning.md` | APPEND (turn 30: one gate for a deactivated caller; the password proof; the lints; INC-846) | 8994 | `a7bf244f0f1805301feb0a18e7256a10d1556a676d902e4ff0e0ba6180eefc5c` |
| `docs/features/settings-surface.md` | APPEND (turn 30: the password-removal proof) | 14000 | `287254c671e4b137ab89acbc2719bb378529b559370d0b6a8a01dc98d675d037` |
| `docs/governance/claude-supervisor-instructions-v1.14.md` | NEW (the full v1.14 document, as pasted into the Project on 2026-10-23) | 114289 | `7cc05b120992ff8a55ae76770b12c08af5ef43ed45ea27006a12182ab78bd7ae` |
| `docs/governance/handoffs/2026-10-23-bundle22-after-close-handover.md` | NEW | 11857 | `6259aebf13afbad3dcd25c6b19c2fb55fa9f039be942a312c0a5b894c2c1d3b4` |
| `docs/governance/handoffs/2026-10-23-bundle22-after-close-running-record.md` | NEW (the running record 2026-10-20 → 2026-10-23, verbatim) | 400762 | `f2a24153279e1152c7bba176e14825d839fa30b19ff789d29d671d912984f31e` |
| `docs/governance/instructions-amendments.md` | APPEND (v1.14; the text moved from the instructions — DEC-239; §Slips S331–S378) | 45795 | `fdc0fd6e395a38e07e758d0550cfa402bb65d203883e43d1e412d89f6244ad30` |
| `docs/governance/lovable-knowledge.md` | REPLACE (v3.11 mirror) | 10601 | `de7aa1efa5496596a3fe2f134760a5d9e6890cfcb3313516888459ffa738def6` |
| `docs/governance/mechanisms.md` | NEW (the register of concerns, G0.9 — 25 rows and the guard debt) | 12644 | `2c4775ae259cf5b01694bc383e9f91fbfe43652d8f65bc272c6f2e4b9477346b` |
| `docs/governance/system-state.md` | INSERT (the records-turn position; the bundle-22 close one marked superseded) | 100838 | `4ffa1c2e16172dfcd8e69c23b62e50f6f769d336b95e6f3b44aa8aa0b93ac85e` |
| `docs/spec/spec-ledger.md` | APPEND (block S76) | 1471884 | `426c587fb6b71331cf75d0129b7b2d2063e7d04ddbdd8abd77052aca2cded174` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE (from "Numbering: next free INC-781." → INC-781…INC-846, the later word of 2026-10-23, "Numbering: next free INC-847.", the watch list) | 934874 | `9bf444086b5020e130999d82e62449ddd457f593d7736432830951d3bab2955b` |
| `roadmap.md` | REPLACE-LINES (line 3; turn 29 ticked; turns 30, 31, 32 and the Foundations bundle added; bundle 23 after it; order-of-work item 2) | 166386 | `fc56f641a10f624509a0d96f62997fab21cca714ed55865bb5ce4044d1ef85a8` |

Numbering after this turn: next free DEC-243, D234, INC-847, S379, ACT-021. The usage maps do not change (no key change). No migration; the newest mark stays `20261023150000` (M20) on ethio-prod and ethio-staging.
