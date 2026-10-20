# Records turn manifest — 2026-10-20 bundle 22's close (bundle 21 turn 18's run; bundle 22 turns 1–11)

Written by the supervisor; committed by bundle 22's turn 11 (docs only). Base: dev `522e0ed5` (bundle 22 turn 10). The carrier carries each change as REPLACE-LINES / INSERT-AFTER / APPEND / NEW sections on the base's files; after it, `sha256sum <path>` equals the sha256 column for every row. The records are the supervisor's text, imported word for word (G11); block S75 and INC-759…INC-780 were written by the supervisor from its running record.

| Path | Change | Bytes after | sha256 after |
| --- | --- | ---: | --- |
| `docs/_changelog.md` | APPEND | 397769 | `df749e909086ae225d01742595d149ebe0944d8758ca9385ab0fe68a42002a30` |
| `docs/governance/handoffs/2026-10-20-bundle22-close-handover.md` | NEW | 5060 | `04e530d4fe5f87a8541b2da9d8973e01fe77c6ce52782d841dc088476e747d7d` |
| `docs/governance/handoffs/2026-10-20-bundle22-close-running-record.md` | NEW | 4877 | `23c09101f972e9f608bb340aa86acfa31f3d10ec1e0cc79ca441f16d3e08c187` |
| `docs/governance/system-state.md` | INSERT (the bundle-22 close position; the bundle-21 close one marked superseded) | 96059 | `8f103f189af938476c435662436e8dd20aa9077e96bdd297ba13c62b78059647` |
| `docs/spec/spec-ledger.md` | APPEND (block S75) | 1355884 | `5880bfb9e363a9e6bf9d80612dba6c035d23db40f982eae17e19ae3f4ac6e4fa` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE (from "Numbering: next free INC-759." → INC-759…INC-780, the later word of 2026-10-20 (bundle 22), "Numbering: next free INC-781.", the watch list) | 847994 | `60e94b3ee6b96cc02598f9bcc60227a06112e7fe6300319c27181150186db1aa` |
| `roadmap.md` | REPLACE-LINES (line 3; bundle 22 ticked closed with its turn lines and turn 11; appends to bundle 23, reserved-names v5 and the lawyer's point; Terms and Privacy v2, the banned-items and safety pages, reserved-names v5.2 and the flake-and-cleanup turn after the lawyer's point) | 142641 | `4fa21ba85c7886b36190cbf680791ae9cf4fe0fc223e7d5d984e859fce69b224` |

Numbering after this turn: next free DEC-206, D226, INC-781, S331, ACT-021. The usage maps do not change (no key change). No migration; the newest mark stays `20261020120000` on ethio-prod and ethio-staging.
