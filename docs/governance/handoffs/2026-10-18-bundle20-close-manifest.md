# Records turn manifest — 2026-10-18 bundle 20's close (bundle 19 turn 34; bundle 20 turns 1–3)

Written by the supervisor; committed by bundle 20's turn 3 (one test line and the records). Base: dev `114537ea` (bundle 20 turn 2b). The carrier carries each change as REPLACE-LINES / INSERT-AFTER / APPEND / NEW sections on the base's files; after it, `sha256sum <path>` equals the sha256 column for every row. The records are the supervisor's text, imported word for word (G11); block S73 and INC-730…INC-734 were written by the supervisor from its running record.

| Path | Change | Bytes after | sha256 after |
| --- | --- | ---: | --- |
| `docs/_changelog.md` | APPEND | 384673 | `d9977b10c3246f55a389db736d486cc5e50c4966c104fc8493a1d324679845a4` |
| `docs/governance/handoffs/2026-10-18-bundle20-close-handover.md` | NEW | 3779 | `867c25dbe3d01bff7f32b21ccb29f87cf84e4fc71d2b29d21fa3d90c88405427` |
| `docs/governance/handoffs/2026-10-18-bundle20-close-running-record.md` | NEW | 3192 | `aac3ff2ac333482fc847e67e37c45a5f7310ed3f35036cc88e32fe95b7280fad` |
| `e2e/posting-routes.spec.ts` | REPLACE-LINES (PR-57: `us_embassy` → `ke_embassy`, INC-734) | 66948 | `e5b0a85c1dcd5e7d18266d4661e9f9148b89fb8b041ab266b8fe534ccaa79319` |
| `docs/governance/system-state.md` | INSERT (the bundle-20 close position; the bundle-19 close one marked superseded) | 88867 | `436c1fbd5f542914ff96b821cb51a87523c9dc4b770876a12fc9dd67858ae8ef` |
| `docs/spec/spec-ledger.md` | APPEND (block S73) | 1292818 | `2969296f078556ce931400b5a40e92c23a22d9280d6381739518ae28e309f831` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE (from "Numbering: next free INC-730." → INC-730…INC-734, the later word of 2026-10-18 (bundle 20), "Numbering: next free INC-735.", the watch list) | 794599 | `0986c307a0d6eb8ccfcf9a2df20733ea62d33b8916ddcaa852994361197add13` |
| `roadmap.md` | REPLACE-LINES (line 3; bundle 19 turn 34 ticked; bundle 20 ticked closed with turn 3; bundle 21's line and D207–D210 after D190) | 123061 | `c3ab0d5d7ed9da3d00a5e69d281b76a2b7118d58426b9bdc0bd2201930a61295` |

Numbering after this turn: next free DEC-204, D215, INC-735, S295, ACT-021. The usage maps do not change (no key change). No migration; the newest mark stays `20261019080000` on ethio-prod and ethio-staging.
