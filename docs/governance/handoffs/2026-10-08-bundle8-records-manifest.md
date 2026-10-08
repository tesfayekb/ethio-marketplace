# Records turn manifest — 2026-10-08 bundle 8 close

Written by the supervisor; committed by the same docs-only turn. Base: dev `40d99978`. Modes: REPLACE and NEW — the carrier section is the whole file; `sha256sum <path>` equals the sha256 column. APPEND — the carrier section is appended to the existing file, byte for byte; the sha256 column hashes the appended bytes and the RESULT row hashes the whole file after the append. TAIL-REPLACE (`docs/tracking/incidental-findings.md`) — everything from the line `Numbering: next free INC-488.` to the end of the file is replaced by the section; the RESULT row hashes the whole file after it. This manifest carries no hash of itself.

| Path | Mode | Bytes | sha256 |
| --- | --- | ---: | --- |
| `docs/spec/spec-ledger.md` | APPEND | 41296 | `ec9822e373cecfbf8c48f25ce0d32a44b0c7dee4cc5594d21f9283036be9cc38` |
| `docs/spec/spec-ledger.md` (whole file after the append) | RESULT | 921472 | `2c7f9afba200f5e815963ed69c484e9dd8bc5ce9209a9be08b6d3257e213eb1f` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE | 15727 | `bc421f6be34e77ec6ab6105540ec5bc166f068facffdfcb673e2196177e17134` |
| `docs/tracking/incidental-findings.md` (whole file after the tail-replace) | RESULT | 511813 | `80809b110fdef734d5e1f83338185e9aca923651f0abbb070b171fbe8e805175` |
| `docs/governance/system-state.md` | REPLACE | 48374 | `fdd211868b691bf18fc57ba8e768293c94caabe0f7d386d0917e06466ae6f2c3` |
| `docs/tracking/action-tracker.md` | APPEND | 1648 | `be3611c4a4a6659ec052f83704550c6e16090f3aa7d7d3b8f6338db7b93aeb5d` |
| `docs/tracking/action-tracker.md` (whole file after the append) | RESULT | 25927 | `d73801540ee1d2b335727f330ef0a31deacb3b2f20147528147fc60ce65db638` |
| `roadmap.md` | REPLACE | 15669 | `ea468c8bee669783f1d8598be43434bea0281e7a5aebac84a6be23ec42797259` |
| `docs/governance/launch-gate.md` | APPEND | 931 | `15ffe052317c50eca5ff1fd038e43a00ec1b7f40263dbc25870e836b872ca2ba` |
| `docs/governance/launch-gate.md` (whole file after the append) | RESULT | 22361 | `1eb0a9ee5c888a2c8a5f010da4315286e9c62ed28365b368479cb9f143391952` |
| `docs/governance/handoffs/2026-10-08-bundle8-running-record.md` | NEW | 107372 | `81c564a839d8ceba3f74d5278f0a5361874de0f48b00b00c65133fd4f5aa93e3` |
| `docs/governance/handoffs/2026-10-08-bundle8-close-handover.md` | NEW | 23720 | `9502afea6ba7c60e8d49216862dff12e1ec5769369727a87b54cc9f6028014bc` |
| `docs/_changelog.md` | APPEND | 483 | `2597de2e0eae3c1d34062dc2574d09e52c79d69022c3a3dd84260bc60bec8b92` |
| `docs/_changelog.md` (whole file after the append) | RESULT | 272165 | `419310c671b5165d505e3e70c73943dec8ec38e8c9290c115d3e71148b0d2309` |
