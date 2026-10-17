# Records turn manifest — 2026-10-17 bundle 19's records (turns 1–19)

Written by the supervisor; committed by bundle 19's turn 20 (the records turn; docs only). Base: dev `130586d0` (bundle 19 turn 19). The carrier carries each change as REPLACE-LINES / INSERT-AFTER / APPEND / NEW sections on the base's files; after it, `sha256sum <path>` equals the sha256 column for every row. The records are the supervisor's text, imported word for word (G11); the drafts of block S71 and of INC-678…INC-711 were made from the supervisor's notes by read-only helpers and reviewed by the supervisor before import (G50).

| Path | Change | Bytes after | sha256 after |
| --- | --- | ---: | --- |
| `docs/_changelog.md` | APPEND | 379483 | `40f3c3db8b40325b20cfa0e1dc2b2c074c34f9626c2b508c26396cc9287a2e74` |
| `docs/governance/handoffs/2026-10-17-bundle19-records-handover.md` | NEW | 7402 | `aea9b16c15d834c249d1b11d4ada2a1718e19a76811813ef93481ed10a407f62` |
| `docs/governance/handoffs/2026-10-17-bundle19-records-running-record.md` | NEW | 4693 | `f55ea9ec012ca2d93fdd8abeffc0e8feaecf52f5e7cbedf758a69956b42a1a4e` |
| `docs/governance/system-state.md` | INSERT (the bundle-19 current position; the bundle-18 one marked superseded) | 83390 | `146184fd86261900124f9e830aadb4d2ec33c0141ca28a1cba1f25621143a147` |
| `docs/spec/spec-ledger.md` | APPEND (block S71) | 1257160 | `f34c364faf72480c06249b768ac3e7be8741e5c55e455812c905f1e4ec4612fe` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE (from the line "Numbering: next free INC-678." → INC-678…INC-712, the later word, "Numbering: next free INC-713.", the watch list) | 770007 | `48f5d31518a95834aaec00959b18f27e3e5d38840565506b5d1823f61d059ad8` |
| `roadmap.md` | REPLACE-LINES (line 3; the bundle-19 block's turn-20 line and the close's line) | 108852 | `daa11f184e43fdf3831e663f6053f1e2253a7de366859081dc59985a0e3f5a5f` |

Numbering after this turn: next free DEC-192, D202, INC-713, S281, ACT-021. The usage maps do not change (no key change). No migration; the newest mark stays `20261018220000` on ethio-prod and ethio-staging.
