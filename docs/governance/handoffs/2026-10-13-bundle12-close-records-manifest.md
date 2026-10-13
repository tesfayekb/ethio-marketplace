# Records turn manifest — 2026-10-13 bundle 12 closed

Written by the supervisor; committed by the same docs-only turn. Base: dev `7e4db15e`. Modes: REPLACE and NEW — the carrier section is the whole file; `sha256sum <path>` equals the sha256 column. APPEND — the carrier section is appended to the existing file, byte for byte; the sha256 column hashes the appended bytes and the RESULT row hashes the whole file after the append. TAIL-REPLACE (`docs/tracking/incidental-findings.md`) — everything from the line `Numbering: next free INC-581.` to the end of the file is replaced by the section; the RESULT row hashes the whole file after it. This manifest carries no hash of itself.

| Path | Mode | Bytes | sha256 |
| --- | --- | ---: | --- |
| `docs/spec/spec-ledger.md` | APPEND | 27539 | `e56e389437a4a270167b7b166d2ea9f8db0a3c3f12dcdad126a6618d50d199bf` |
| `docs/spec/spec-ledger.md` (whole file after the append) | RESULT | 1097084 | `28a6b08d068d67fdc54ab033b587717fcf68e99e95a8cda657479a7b37bea0bb` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE | 14153 | `e0f618e16259aed796a8fd1144352d00c1dd33f982007261c03542fa1742d02e` |
| `docs/tracking/incidental-findings.md` (whole file after the tail-replace) | RESULT | 614342 | `d99019618e9fc96e6db7b361f35044d71ff9e315b6accddd06419e535d75cc5a` |
| `docs/governance/system-state.md` | REPLACE | 66691 | `531db0e9c3c5ba1843d79de953cd9b161fa3108f2aa566aaa354ee41af3cc28b` |
| `docs/tracking/action-tracker.md` | APPEND | 418 | `7fa0d707e5ed3b998372c2f7e3a55dcea6609fc6fc05ddc75b7bc2a4241cbdb7` |
| `docs/tracking/action-tracker.md` (whole file after the append) | RESULT | 34582 | `cb60e7b2b3c6957bd31a36e0d54c46d24d172411b94e335f5ce88e29f63f24ae` |
| `roadmap.md` | REPLACE | 66884 | `3e7a96e8d7ebdfc6e719be34b9a3e1fbc9c20cf42f040a7d6755f8cc5b411370` |
| `docs/governance/handoffs/2026-10-13-bundle12-close-running-record.md` | NEW | 125396 | `a0581b357f575e5402724feef3364c007021857e97b5cf45c64f5b8c03351635` |
| `docs/governance/handoffs/2026-10-13-bundle12-close-handover.md` | NEW | 15042 | `f58e823701fdf2df119fbe299db4e3f0d8d2271ad808cef4c5e6bff4a48b415d` |
| `docs/_changelog.md` | APPEND | 493 | `4aec80cdb15ffadc69e36e03d6ececcc30cfd61a4a923ed3a4526a7306ae14d6` |
| `docs/_changelog.md` (whole file after the append) | RESULT | 330444 | `4df382bb78e7f800e8717221ab11ce492736d79f992dc0a8fc156f5e2f0f3f50` |
