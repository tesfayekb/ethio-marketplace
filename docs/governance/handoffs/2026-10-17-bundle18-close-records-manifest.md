# Records turn manifest — 2026-10-17 bundle 18 closed, bundle 19 open

Written by the supervisor; committed by bundle 19's turn 2 (the records turn; docs only). Base: dev `732b933d` (bundle 19 turn 1). The carrier carries each change as REPLACE-LINES / INSERT-AFTER / APPEND / NEW sections on the base's files; after it, `sha256sum <path>` equals the sha256 column for every row. The records are the supervisor's text, imported word for word (G11); the executor changes nothing in them.

| Path | Change | Bytes after | sha256 after |
| --- | --- | ---: | --- |
| `docs/_changelog.md` | APPEND | 367006 | `9aa556e51ee6cd7b31c5d0a8d6740c6ea91903f739e1d776435138aafd0c5c89` |
| `docs/governance/handoffs/2026-10-17-bundle18-close-handover.md` | NEW | 8160 | `eeb18d52c3dd5c0fd684b7db32c719e87ec45102a118ea5c7d59d258887a6507` |
| `docs/governance/handoffs/2026-10-17-bundle18-close-running-record.md` | NEW | 4314 | `c403ae2ef2ac03e3f0e1eb6776819511de2a37c401440c7871096b5bd7c22d8f` |
| `docs/governance/plans/product-detail-page-study-2026-10-16.md` | NEW (the D201 study, the Project record of 2026-10-16, word for word) | 29387 | `c6180bffc679f366fe61f565993453b05094fe97b8a147596e563e90d47235a0` |
| `docs/governance/product-detail-page-spec.md` | NEW (the D201 spec v1, the Project record of 2026-10-17, word for word) | 29076 | `0b361fb74613e29df6acb59f23321baab2c4ff78b7473418d44d04454b673b00` |
| `docs/governance/system-state.md` | INSERT (the bundle-18-closed / bundle-19-open current position; the bundle-17 one marked superseded) | 80866 | `5253d8a851714ae0eae93ee1efc9d3cc18aa36a24d6d955e37b4a6141eb603cb` |
| `docs/spec/spec-ledger.md` | APPEND (block S70) | 1201399 | `3a993a458c052df6580e80a8f6ad6684cec61d932b949fe3c9de0b7738f569ae` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE (from the line "Numbering: next free INC-675." → INC-675…INC-677, the later word, "Numbering: next free INC-678.", the watch list) | 717462 | `1bc5d255cf89686ca582e472eff83140f99756cdcd92a571122410c4a0fcbd3c` |
| `roadmap.md` | REPLACE-LINES (line 3; bundle 18 closed with its turns 2–5; the flaky-tests line) | 101491 | `5f75cd2ba4e84465a378974c94042e9db6167e3069f78e08518a112949d71e5b` |

Numbering after this turn: next free DEC-188, D202, INC-678, S251, ACT-021. The usage maps do not change (no key change). No migration; the newest mark stays `20261018120000` on ethio-prod and ethio-staging.
