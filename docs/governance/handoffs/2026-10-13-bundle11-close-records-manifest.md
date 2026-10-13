# Records turn manifest — 2026-10-13 bundle 11 closed

Written by the supervisor; committed by the same docs-only turn. Base: dev `6c0c2be5`. Modes: REPLACE and NEW — the carrier section is the whole file; `sha256sum <path>` equals the sha256 column. APPEND — the carrier section is appended to the existing file, byte for byte; the sha256 column hashes the appended bytes and the RESULT row hashes the whole file after the append. TAIL-REPLACE (`docs/tracking/incidental-findings.md`) — everything from the line `Numbering: next free INC-571.` to the end of the file is replaced by the section; the RESULT row hashes the whole file after it. This manifest carries no hash of itself.

| Path | Mode | Bytes | sha256 |
| --- | --- | ---: | --- |
| `docs/spec/spec-ledger.md` | APPEND | 15029 | `eddade725e5bab1dd4a5bf2faec2b0e780495110ac6dd09d695f2c8fc38fe183` |
| `docs/spec/spec-ledger.md` (whole file after the append) | RESULT | 1069545 | `e7f67005451a2bdae45f2a9299bf9c22f8a637341fb600a3ae24e6c5e4439285` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE | 19739 | `e164d709d8d5fc46f75b8f4e491f9b7a2e0a130b369451630d4c1b48ee7353a3` |
| `docs/tracking/incidental-findings.md` (whole file after the tail-replace) | RESULT | 601114 | `c0d43eecb70b211df34a9b988365e32c10ea39e72aaf2078fb9f8478793c02aa` |
| `docs/governance/system-state.md` | REPLACE | 64734 | `47705063c649268927c0075ad2353e872e12ada80a37a3a12fb7521562d44788` |
| `docs/tracking/action-tracker.md` | APPEND | 589 | `a916d535b3fb4b9f45a8f9dd1fad16eca0a9d2408c527a496b8da767e7e6fedd` |
| `docs/tracking/action-tracker.md` (whole file after the append) | RESULT | 34164 | `7d672eedb5165e4e54dd8de65f807ae8fcf3a47d60eec57b7b3632bbb1bab035` |
| `roadmap.md` | REPLACE | 56003 | `c1ce75d210c9899f5419620951c6c7ff031de0812a7e02a938fbac73dbdffe32` |
| `docs/governance/handoffs/2026-10-13-bundle11-close-running-record.md` | NEW | 51868 | `09fe734e17786852d13785bc31ba4737f99cfcd11fbbe727f688390789f51bbc` |
| `docs/governance/handoffs/2026-10-13-bundle11-close-handover.md` | NEW | 11978 | `e939b9f60c60f5706c6bce05e1fd0a5565dc4e78ed6430ed4f43359853b64c2c` |
| `docs/_changelog.md` | APPEND | 467 | `b9859759e06438205296dbbf2d128ea89e3a19ba128acb7178c96bb52e1e7a3f` |
| `docs/_changelog.md` (whole file after the append) | RESULT | 322382 | `27ab55210b2860581ac7fa76c6e9fcd8bd621a88577ad74a415fb76fd3ea5efa` |
