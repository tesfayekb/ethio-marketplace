# Records turn manifest — 2026-10-16 bundle 16 closed

Written by the supervisor; committed by the same docs-only turn. Base: dev `9a8980ba`. The carrier carries each change as REPLACE-LINES / INSERT-AFTER / APPEND / NEW sections on the base's files; after it, `sha256sum <path>` equals the sha256 column (the whole file after the change).

| Path | Change | Bytes after | sha256 after |
| --- | --- | ---: | --- |
| `docs/spec/spec-ledger.md` | APPEND | 1163902 | `d69785455d7db578eda9a80eee3cb1ff0a87b68a64757871aa8d7de99b782ba9` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE (lines 4048–4050 → the 36+1 entries, the later word, the numbering and the watch list) | 689709 | `ba5f180af93a8a2c28fb340620ced01d0d42cb8b005553e7feee5a6506a7d0c9` |
| `docs/governance/system-state.md` | INSERT (the 2026-10-16 current position; the 2026-10-14 one marked superseded) | 75089 | `d94aba075062c1bd6882c7a521a78debfca2fee8ab4d83194f63bb4880c8ce1f` |
| `roadmap.md` | REPLACE-LINES (line 3; the bundle-16 line; the lines after turn 4b) | 94002 | `01d6be8cdc25a6f1a4c8aece54c5ed16c8084eb414184d3047e832ce90724e40` |
| `docs/governance/handoffs/2026-10-16-bundle16-close-handover.md` | NEW | 5633 | `6292e9c2e4a2ee90905d1f41b21ad42b09d272446c556cdd3d3961df70efe9e8` |
| `docs/governance/handoffs/2026-10-16-bundle16-close-running-record.md` | NEW | 3341 | `5ac84b89899b81de6dfdbdce98e8b2acb7ea06ae794b2021660a9e0db960a23e` |
| `docs/_changelog.md` | APPEND | 359332 | `236c35c19bef50d626f920b1ea5bf34c822f3874e12c3895c51c23cba995d7fb` |

Numbering after this turn: next free DEC-183, D195, INC-663, S236, ACT-021. The records are the supervisor's text, imported word for word (G11); the executor changes nothing in them.
