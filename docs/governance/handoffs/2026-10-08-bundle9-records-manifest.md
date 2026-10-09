# Records turn manifest — 2026-10-08 bundle 9, first half

Written by the supervisor; committed by the same docs-only turn. Base: dev `2d5c4d85`. Modes: REPLACE and NEW — the carrier section is the whole file; `sha256sum <path>` equals the sha256 column. APPEND — the carrier section is appended to the existing file, byte for byte; the sha256 column hashes the appended bytes and the RESULT row hashes the whole file after the append. TAIL-REPLACE (`docs/tracking/incidental-findings.md`) — everything from the line `Numbering: next free INC-495.` to the end of the file is replaced by the section; the RESULT row hashes the whole file after it. This manifest carries no hash of itself.

| Path | Mode | Bytes | sha256 |
| --- | --- | ---: | --- |
| `docs/spec/spec-ledger.md` | APPEND | 38626 | `f0c16def487eddf2308b32dff957dff84f5afdbfcb577e292c7685e16b4691db` |
| `docs/spec/spec-ledger.md` (whole file after the append) | RESULT | 960098 | `f650d35d0ead1bcf23e6957f7daa340d06f639faec71fc7cde1072ed1c0abeae` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE | 16828 | `b13b7939ffd555a123a2c56e0705aa9f5f23ca3e29a1b6915978ab5f78c9313f` |
| `docs/tracking/incidental-findings.md` (whole file after the tail-replace) | RESULT | 527853 | `77a13043a4d52187b2b3500c6f158e8b3f1f5b10224d932e8fef52b99ffb4ea5` |
| `docs/governance/system-state.md` | REPLACE | 54664 | `ab0aba83762dceea499a1c1cf5c43764dd3ae6a2d77e200e83609ad34f235bce` |
| `docs/tracking/action-tracker.md` | APPEND | 1971 | `286ad13a76bbfc2be72a902af3a3e65c54ea50fa5cb013400cfc6a79d730630e` |
| `docs/tracking/action-tracker.md` (whole file after the append) | RESULT | 27898 | `b6bb8ba37b13da922b57c5a2eb671902a4b079f2ca8c98ccf07ce1b2c9676f11` |
| `roadmap.md` | REPLACE | 19156 | `4de667d0978ca532e53ad648613885e713e423319095cd4d787e661c1d24cd35` |
| `docs/governance/feed-engine-spec.md` | NEW | 10496 | `e9ea2470c5680167b69b36fea912d9579701011915eadd98bc01ade033d04299` |
| `docs/governance/handoffs/2026-10-08-bundle9-running-record.md` | NEW | 181905 | `c5d068435f6ddb0d8bb076568d5455b6019fc24de77e2cfa152f0fbcd11d5dcc` |
| `docs/governance/handoffs/2026-10-08-bundle9-part1-close-handover.md` | NEW | 20515 | `1e8bd9610a3f5f9716f3a6a504436e25439da865b9f5539e4b208447850dfa2b` |
| `docs/_changelog.md` | APPEND | 522 | `7ddbfa931ce1a1cb5866c3406c67eeb1ef30c6595e7cc231e705f3cf83553262` |
| `docs/_changelog.md` (whole file after the append) | RESULT | 276029 | `c2bd93850436f39ffb2c83df4a7f44eb452b366df9a972701e957704890abb61` |
