# Records turn manifest — 2026-10-19 bundle 21's close (bundle 20 turn 3's run; bundle 21 turns 1–18)

Written by the supervisor; committed by bundle 21's turn 18 (the rail's row heights and the records). Base: dev `d30646b0` (bundle 21 turn 17). The carrier carries each change as REPLACE-LINES / INSERT-AFTER / APPEND / NEW sections on the base's files; after it, `sha256sum <path>` equals the sha256 column for every row. The records are the supervisor's text, imported word for word (G11); block S74 and INC-735…INC-758 were written by the supervisor from its running record. The turn's code fix (src/components/shell/app-rail.tsx, e2e/shell.spec.ts) is the executor's own and is not in this table.

| Path | Change | Bytes after | sha256 after |
| --- | --- | ---: | --- |
| `docs/_changelog.md` | APPEND | 391272 | `34cccfc2211d5902740df9f6c800f3dc045b964db78ce13fb7bc3eaa0fcb7a03` |
| `docs/governance/handoffs/2026-10-19-bundle21-close-handover.md` | NEW | 4320 | `83ff3dc3135e3d126740e03ed6dbf81c6bec90f45618d0b66604fa19ede0df72` |
| `docs/governance/handoffs/2026-10-19-bundle21-close-running-record.md` | NEW | 5908 | `8c1b35827cdec7c3f86c9daadc02c731a91138aa3e75a2f0f6cf3f70be82c17e` |
| `docs/governance/system-state.md` | INSERT (the bundle-21 close position; the bundle-20 close one marked superseded) | 92284 | `db1fd4b419296e759c837a47625c404d7c3cabc5b3b30e57788c51eafa3172b0` |
| `docs/spec/spec-ledger.md` | APPEND (block S74) | 1321608 | `ec4da1175221fc37f87b6707a034a00971da17275e2103c48103031209b6bbed` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE (from "Numbering: next free INC-735." → INC-735…INC-758, the later word of 2026-10-19 (bundle 21), "Numbering: next free INC-759.", the watch list) | 822539 | `abee82d9a27d3981c4df18dc10d4bfd74adc0e4c3bf9964054f9e206fad7578c` |
| `roadmap.md` | REPLACE-LINES (line 3; bundle 21 ticked closed with its turn lines and turn 18; bundle 22, reserved-names v5, Terms v2 and the lawyer's point after D210) | 133040 | `047e85e61e12ee6e19734f100603d52d56d5d48eb777cefb860a23fa8c00a909` |

Numbering after this turn: next free DEC-204, D225, INC-759, S310, ACT-021. The usage maps do not change (no key change). No migration; the newest mark stays `20261019080000` on ethio-prod and ethio-staging.
