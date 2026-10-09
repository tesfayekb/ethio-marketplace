# Records turn manifest — 2026-10-09 bundle 9 fix turns

Written by the supervisor; committed by the same docs-only turn. Base: dev `992b8eb3`. Modes: REPLACE and NEW — the carrier section is the whole file; `sha256sum <path>` equals the sha256 column. APPEND — the carrier section is appended to the existing file, byte for byte; the sha256 column hashes the appended bytes and the RESULT row hashes the whole file after the append. TAIL-REPLACE (`docs/tracking/incidental-findings.md`) — everything from the line `Numbering: next free INC-510.` to the end of the file is replaced by the section; the RESULT row hashes the whole file after it. This manifest carries no hash of itself.

| Path | Mode | Bytes | sha256 |
| --- | --- | ---: | --- |
| `docs/spec/spec-ledger.md` | APPEND | 10973 | `9a02fb9b35fc6c48941a480500eee1ee6f002d2e148de70214b8fba1fc3c99df` |
| `docs/spec/spec-ledger.md` (whole file after the append) | RESULT | 971071 | `5c016dd3aa67f4e1260af6ae589f640cfbb2c84af5f003c599b6b75d79c3fd32` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE | 3424 | `60cbc91965c356cd6ffd3f8b280d3a948f1aa8327a3f10343d93c20ad288657d` |
| `docs/tracking/incidental-findings.md` (whole file after the tail-replace) | RESULT | 530418 | `8efdf4dff6b061338312393be1135a893d5bc72b8da723c6a4465d552085f2ec` |
| `docs/governance/system-state.md` | REPLACE | 56262 | `801a0d6296f2ad6804fafaa3b73fe98cd701a5be5c5e323900e30a6d364a58ff` |
| `docs/tracking/action-tracker.md` | APPEND | 666 | `3b5dfbf82570a18180e6f3f74195071059ae9168c24e9ed7cb4d688fee2b1bfe` |
| `docs/tracking/action-tracker.md` (whole file after the append) | RESULT | 28564 | `d46ed1401ba9b6ed26f5ec275f67cd8f4b917e50929af9084209ade050a2ff21` |
| `roadmap.md` | REPLACE | 19916 | `2e0b45427fddc3c3a2600142b9932941e5f506a783805f6f2f692a02b3f0d664` |
| `docs/governance/handoffs/2026-10-09-bundle9-fixes-running-record.md` | NEW | 40241 | `2dc53be9ef1ab072977c502687e44ab85b558ecdcacd9c90e86e2272f33cbf67` |
| `docs/_changelog.md` | APPEND | 363 | `bcd1097246ef1025f63fc25fabbca6fb83511b404e571c0a5fe82f5da3886e72` |
| `docs/_changelog.md` (whole file after the append) | RESULT | 277265 | `6527b0977d55521c69c969286bf6e6abf2366456043ada090b4ef0169989423e` |
