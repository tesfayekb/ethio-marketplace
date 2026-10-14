# Records turn manifest — 2026-10-14 bundle 14 closed

Written by the supervisor; committed by the same docs-only turn. Base: dev `6e12f379`. Modes: REPLACE and NEW — the carrier section is the whole file; `sha256sum <path>` equals the sha256 column. APPEND — the carrier section is appended to the existing file, byte for byte; the sha256 column hashes the appended bytes and the RESULT row hashes the whole file after the append. TAIL-REPLACE (`docs/tracking/incidental-findings.md`) — everything from the line `Numbering: next free INC-620.` to the end of the file is replaced by the section; the RESULT row hashes the whole file after it. This manifest carries no hash of itself.

| Path | Mode | Bytes | sha256 |
| --- | --- | ---: | --- |
| `docs/spec/spec-ledger.md` | APPEND | 12656 | `e6aff3c1b2ca9b10df92b22cd157b1cbc4c8386d87d17b82553f346089d409e0` |
| `docs/spec/spec-ledger.md` (whole file after the append) | RESULT | 1135541 | `32a5ee32f48668b247363dd76de1d973d20a966a62b47faf39a36e16ec180a84` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE | 9673 | `7d10d10bafa1cb295cc93764c9a80d7a9eafe7aabcf9e289c5e90ac2fd470da0` |
| `docs/tracking/incidental-findings.md` (whole file after the tail-replace) | RESULT | 639722 | `f62e9738d871203c14834e747266855844dd5dd988463883ddc9d653997a1a31` |
| `docs/governance/system-state.md` | REPLACE | 71047 | `287f68a6fc4298b7e3e55c520fbe267b46b9179fa401beea2a39587e09c97ebe` |
| `docs/tracking/action-tracker.md` | APPEND | 559 | `57ef0b82e5b9d499bcc8b5c1a3f28ca7e6495a1b9d866f55382a48fd310219e8` |
| `docs/tracking/action-tracker.md` (whole file after the append) | RESULT | 35526 | `d6cbc608338b986736574cc26c6cc185cde3251b96f4a590f9b2e95323c0e48d` |
| `roadmap.md` | REPLACE | 82014 | `d1a305c5865ee41d068284173dcb65d8eb21720f22b0c5762e1f65196d5fd1e5` |
| `docs/governance/handoffs/2026-10-14-bundle14-close-running-record.md` | NEW | 28283 | `05b64b2c1376464eaff7d7321167dc9cf9e9952b059dca8e222717ef939c0aac` |
| `docs/governance/handoffs/2026-10-14-bundle14-close-handover.md` | NEW | 14575 | `9d59b3c0e43b11f74e19cb38177086d32d46ce88fd57216f07d47d44f96c2646` |
| `docs/_changelog.md` | APPEND | 441 | `dc74f71970c5c331bae80af65f93049b0ea7afe2d7ac29fc1bdf3751052da279` |
| `docs/_changelog.md` (whole file after the append) | RESULT | 346416 | `a884438dea9cc1aa81eba67a850958bde243411b7502c689a3e56b2d180350c8` |
