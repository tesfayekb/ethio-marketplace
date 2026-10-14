# Records turn manifest — 2026-10-14 bundle 15 closed

Written by the supervisor; committed by the same docs-only turn. Base: dev `87aec67c`. Modes: REPLACE and NEW — the carrier section is the whole file; `sha256sum <path>` equals the sha256 column. APPEND — the carrier section is appended to the existing file, byte for byte; the sha256 column hashes the appended bytes and the RESULT row hashes the whole file after the append. TAIL-REPLACE (`docs/tracking/incidental-findings.md`) — everything from the line `Numbering: next free INC-626.` to the end of the file is replaced by the section; the RESULT row hashes the whole file after it. This manifest carries no hash of itself.

| Path | Mode | Bytes | sha256 |
| --- | --- | ---: | --- |
| `docs/spec/spec-ledger.md` | APPEND | 9476 | `52db8b570caa91ad25f3f9a503bca6132ee5b7b9f95f346eb48a6c6fce36148b` |
| `docs/spec/spec-ledger.md` (whole file after the append) | RESULT | 1145656 | `2d230b9c80a2208416fab342d952e428916cfb301dac984f138d7212db1db2ca` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE | 2011 | `e3eed88c19d145648db4b8026f988bf458961d62839a8904df86cdb492edac32` |
| `docs/tracking/incidental-findings.md` (whole file after the tail-replace) | RESULT | 640725 | `012dc3080ef1deee4cf24b45c9d7bb80dc28a3c8d01cd19b8c260259599fe1c8` |
| `docs/governance/system-state.md` | REPLACE | 72557 | `64999e0ad4c445f720a8ea439ea0223677d60aad873452eba55aa5f88acb9e9a` |
| `roadmap.md` | REPLACE | 83891 | `a6f26635346b0495df3981b5d3d1e7a05e3def22187efab431fd7deef85824cf` |
| `docs/governance/handoffs/2026-10-14-bundle15-close-running-record.md` | NEW | 9937 | `858ba6fa4a9733175083c0a7c7d4816751dbdbf11394b3ec817d398f9b63b8bf` |
| `docs/governance/handoffs/2026-10-14-bundle15-close-handover.md` | NEW | 9461 | `178c64f6c1c543c50de28200e7d7c2bd77b4a2b066152aab2c1db72ac3a8358d` |
| `docs/_changelog.md` | APPEND | 379 | `8be894091422e21a1546343a70c0c0cc2a74e2460933fc09b6d52a0189af26f9` |
| `docs/_changelog.md` (whole file after the append) | RESULT | 347317 | `c103bfddcb736ff97e790528b02d05d09c8a220d2b9b6b8a70ce88e82d057ff0` |
