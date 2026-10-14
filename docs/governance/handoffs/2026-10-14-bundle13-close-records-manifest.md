# Records turn manifest — 2026-10-14 bundle 13 closed

Written by the supervisor; committed by the same docs-only turn. Base: dev `117612fa`. Modes: REPLACE and NEW — the carrier section is the whole file; `sha256sum <path>` equals the sha256 column. APPEND — the carrier section is appended to the existing file, byte for byte; the sha256 column hashes the appended bytes and the RESULT row hashes the whole file after the append. TAIL-REPLACE (`docs/tracking/incidental-findings.md`) — everything from the line `Numbering: next free INC-603.` to the end of the file is replaced by the section; the RESULT row hashes the whole file after it. This manifest carries no hash of itself.

| Path | Mode | Bytes | sha256 |
| --- | --- | ---: | --- |
| `docs/spec/spec-ledger.md` | APPEND | 25801 | `de50725576808f862f8b18fa28e3a8f114381781634a261159c000a9f559d825` |
| `docs/spec/spec-ledger.md` (whole file after the append) | RESULT | 1122885 | `05a40d90f677a139b28fe61a3b380dbbc103227a8f10773439b9706c7be83a06` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE | 18211 | `5bacd124d1cc80eb2a3b7286cbb2441518da70d1d3eb8ad48dfe99de8b90b0de` |
| `docs/tracking/incidental-findings.md` (whole file after the tail-replace) | RESULT | 631427 | `02747c3e0975301733e876f8c17af514fb35f7cfe828ad1f0d51fa69c28f90a0` |
| `docs/governance/system-state.md` | REPLACE | 69338 | `4a7da5ba12caaf4aa524e7bb05ead00993e7af49fd3ae55ab16ed0dd47c9d024` |
| `docs/tracking/action-tracker.md` | APPEND | 385 | `2f54333070d7501e0da16633c39925a8266be0f7beaaff862af08cbd40ccbb71` |
| `docs/tracking/action-tracker.md` (whole file after the append) | RESULT | 34967 | `40c03c151a78dd5ea5e7273a8bfec4b71db67db77589daafa3df666193ad7dd1` |
| `roadmap.md` | REPLACE | 78422 | `d8140ddeae21e285de25d4b161be212496df0c0c800a45bf4385490fa4937513` |
| `docs/governance/handoffs/2026-10-14-bundle13-close-running-record.md` | NEW | 115208 | `8bbcd27dda2ccc6deabdf67b2ec92e09f026b959a5a3549ec9625de304de9ded` |
| `docs/governance/handoffs/2026-10-14-bundle13-close-handover.md` | NEW | 36263 | `c58d96fef4f27d96d99c414a43b0eebf9bb086c0efb4130979bb33071a4ad6ad` |
| `docs/_changelog.md` | APPEND | 432 | `bb90990950df6c6f2fa0796674f689b21eef2687e6027db94a298b207a17e826` |
| `docs/_changelog.md` (whole file after the append) | RESULT | 344220 | `f35bf478be86b65682ecd6bf04c60d735201dfb3f0574e4f28ad28e0cff46317` |
