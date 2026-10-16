# Records turn manifest — 2026-10-16 bundle 17 closed

Written by the supervisor; committed by the same turn (turn 6), which also carries the two fixes INC-671 and INC-672. Base: dev `ae3ce4e0`. The carrier carries each change as REPLACE-LINES / INSERT-AFTER / APPEND / NEW sections on the base's files; after it, `sha256sum <path>` equals the sha256 column (the whole file after the change). The test file e2e/post-wizard-pricing.spec.ts (PW-162 part (d)) is the executor's own change and is not in this table.

| Path | Change | Bytes after | sha256 after |
| --- | --- | ---: | --- |
| `docs/spec/spec-ledger.md` | APPEND (block S69) | 1182393 | `201730add9dbb11a6839fbd569e994d39060fb3df4c4a5291cbef79cd894a7c6` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE (from the line "Numbering: next free INC-663." → the twelve entries INC-663…INC-674, the later word, the numbering and the watch list) | 708578 | `533232ceb5f307df9649c99104f774b4c05f35f22670e4b617a6279052062ed8` |
| `docs/governance/system-state.md` | INSERT (the bundle-17 current position; the bundle-16 one marked superseded) | 78002 | `b19c9eda1ed495253629e4ee206fbc799eb1ff2f4afc7df60424cc6eaa6900a7` |
| `roadmap.md` | REPLACE-LINES (line 3; turn 5's line; turn 6 and bundle 18 added; the flaky-test and open-with-operator lines) | 97524 | `6e395dcc335a012337248518251d7a861774d37c0efa105320db9c389a6c7769` |
| `docs/governance/handoffs/2026-10-16-bundle17-close-handover.md` | NEW | 6937 | `b89d1cae9f3b8f72fa074b614592756d6c31859581095117df957df0b8f3a034` |
| `docs/governance/handoffs/2026-10-16-bundle17-close-running-record.md` | NEW | 3447 | `498514d6f97c3e4518a0512422425afb672ca0d89b3551e7005ca33af0be7de5` |
| `docs/_changelog.md` | APPEND | 363948 | `45341a61ae1e07f96a5ed71b75331fe7262802474fc3f3ebba358949a3a39a68` |
| `docs/features/posting.md` | APPEND (the INC-671 later word) | 134910 | `265ee7e0584ba9e4e1515e186b4ba72b73de04e0cf626c75ae5c4abf2a4d0373` |
| `src/features/posting/wizard.tsx` | REPLACE-LINES (the closed Next's classes — INC-671) | 78467 | `61361461f2c6edc7b31a64493e86d86f9413185bd8a658fd330d1feceb02d6cb` |

Numbering after this turn: next free DEC-184, D201, INC-675, S245, ACT-021. The records are the supervisor's text, imported word for word (G11); the executor changes nothing in them.
