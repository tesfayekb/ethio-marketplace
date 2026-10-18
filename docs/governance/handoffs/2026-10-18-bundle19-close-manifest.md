# Records turn manifest — 2026-10-18 bundle 19's close (turns 20–33)

Written by the supervisor; committed by bundle 19's turn 33 (the records turn; docs only). Base: dev `5e6f1c0e` (bundle 19 turn 32). The carrier carries each change as REPLACE-LINES / INSERT-AFTER / APPEND / NEW sections on the base's files; after it, `sha256sum <path>` equals the sha256 column for every row. The records are the supervisor's text, imported word for word (G11); block S72 and INC-713…INC-729 were written by the supervisor from its running record.

| Path | Change | Bytes after | sha256 after |
| --- | --- | ---: | --- |
| `docs/_changelog.md` | APPEND | 383270 | `ba86054652696b62b88ff9e29afd5c8ed8498f25fd63dcc786ce663aef250723` |
| `docs/governance/handoffs/2026-10-18-bundle19-close-handover.md` | NEW | 4936 | `024bf59b7260a5e4e4af73485313c59d76c99f7261ed71ce33f6ccf09810ac4a` |
| `docs/governance/handoffs/2026-10-18-bundle19-close-running-record.md` | NEW | 4606 | `45b0cfeb6649a875395531120e1fe60205bdbfb4015c390c0c3481c241478ded` |
| `docs/governance/system-state.md` | INSERT (the bundle-19 close position; the turn-20 one marked superseded) | 86456 | `017da69993e20175d19b608497784722bcdba9bd649e1d04557499967ae9ab02` |
| `docs/spec/spec-ledger.md` | APPEND (block S72) | 1278331 | `ccba566b45c6680b1bfcd7f90dbef83d1a013f540bad455dc06c169d2d53583c` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE (after the later word of 2026-10-17 → INC-713…INC-729, the later word of 2026-10-18, "Numbering: next free INC-730.", the watch list) | 787281 | `92dbfc7baa36ff86eac0da9e647ba5cb9d40df5a20856417b3227a453a6537a4` |
| `roadmap.md` | REPLACE-LINES (line 3; bundle 19 ticked closed with turn 33 and the close; DEC-203 in bundle 20; the reclaim joined to D203; three new lines after D203) | 118792 | `15535bba8078968ff20922d80f432da663b493780f16210a8e59b4cce3539e63` |

Numbering after this turn: next free DEC-204, D204, INC-730, S289, ACT-021. The usage maps do not change (no key change). No migration; the newest mark stays `20261018220000` on ethio-prod and ethio-staging.
