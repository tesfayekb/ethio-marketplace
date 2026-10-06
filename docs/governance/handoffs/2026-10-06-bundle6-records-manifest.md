# Records turn manifest — 2026-10-06 bundle 6 close

Written by the supervisor; committed by the same docs-only turn. Base: dev `d6632174`. Modes: REPLACE and NEW — the carrier section is the whole file; `sha256sum <path>` equals the sha256 column. APPEND — the carrier section is appended to the existing file, byte for byte; the sha256 column hashes the appended bytes and the RESULT row hashes the whole file after the append. TAIL-REPLACE (`docs/tracking/incidental-findings.md`) — everything from the line `Numbering: next free INC-450.` to the end of the file is replaced by the section; the RESULT row hashes the whole file after it. This manifest carries no hash of itself.

| Path | Mode | Bytes | sha256 |
| --- | --- | ---: | --- |
| `docs/spec/spec-ledger.md` | APPEND | 35562 | `6bbb8118a674416d26d959e1d68cb800e6d6522e60d6319749d603fc271892c9` |
| `docs/spec/spec-ledger.md` (whole file after the append) | RESULT | 839248 | `c64300d1778d5164c0fc71893c37d8195914d111ce452aca186636a05c35eb4c` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE | 33578 | `e3123fd64e44f8adf638776496295c53d6e4bc08897101606eeb57b1e4e66cc1` |
| `docs/tracking/incidental-findings.md` (whole file after the tail-replace) | RESULT | 477699 | `d8deb760d8d8e20193b0e103384805481ab1e23888f6d3a80ddf6f0e3772e22f` |
| `docs/governance/system-state.md` | REPLACE | 32281 | `6a767e72c17fc5bdb9f188f88344712e70d9a7d83303f8cef103b0d287b16aab` |
| `AGENTS.md` | REPLACE | 4039 | `c53f62443d930e448c70a3a43b83a743ccd61252560007e8f3391ffadee3cb14` |
| `docs/tracking/action-tracker.md` | APPEND | 3103 | `2f7f0a483a20a0981f07e21b73d62a5c68fba0733df10446152c8c34589ed622` |
| `docs/tracking/action-tracker.md` (whole file after the append) | RESULT | 22727 | `815ecc69b60644f3cf23694cfddbc7a9f9c080c402a2416f3c9c28a53115faf7` |
| `roadmap.md` | REPLACE | 11021 | `e721d50357d9cbf6a21f298ffc36ec72b0fe2249df9f2f33c653a87b7087be53` |
| `docs/governance/roadmap.md` | APPEND | 2744 | `ed45c4e3f560f3f7fbd28b0da353bca6cea613b897d1f0cef33ba145a4adde72` |
| `docs/governance/roadmap.md` (whole file after the append) | RESULT | 25224 | `b5cf93a08b8076de888f9692e2dde3ef6d00679361fdc21a53dc1f769c096b78` |
| `docs/governance/handoffs/2026-10-06-order-of-work-and-cross-check.md` | NEW | 57712 | `ba4b25ec56b3068fd88d2ba1bb86a6ddb3f8181ddcabbb699cb5f7999410a107` |
| `docs/governance/handoffs/2026-10-06-bundle6-running-record.md` | NEW | 163291 | `66f6c7096ddcc0ed37089cd9c8e3dd0e4a26a8cec6ce89891aa97cee5125a2aa` |
| `docs/governance/handoffs/2026-10-06-bundle6-close-handover.md` | NEW | 14325 | `1f0379b4b8e851489da48e30afb9ad6cbaceeae1988fc1ce3e7684bdfe580873` |
| `docs/_changelog.md` | APPEND | 435 | `7139a30eb57552795f1ad62a0d2ab1644892f357acdc49924c360b0434529b54` |
| `docs/_changelog.md` (whole file after the append) | RESULT | 263941 | `bc44e35dc14bcfdad6f1de441a761b3ba1619bdd81c882cb7c36712fc4d6e231` |
