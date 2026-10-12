# Records turn manifest — 2026-10-12 bundle 11 so far

Written by the supervisor; committed by the same docs-only turn. Base: dev `6a9b0dda`. Modes: REPLACE and NEW — the carrier section is the whole file; `sha256sum <path>` equals the sha256 column. APPEND — the carrier section is appended to the existing file, byte for byte; the sha256 column hashes the appended bytes and the RESULT row hashes the whole file after the append. TAIL-REPLACE (`docs/tracking/incidental-findings.md`) — everything from the line `Numbering: next free INC-537.` to the end of the file is replaced by the section; the RESULT row hashes the whole file after it. This manifest carries no hash of itself.

| Path | Mode | Bytes | sha256 |
| --- | --- | ---: | --- |
| `docs/spec/spec-ledger.md` | APPEND | 36819 | `e7f20df2992d4ea18040d3e06205d4ec2186f77d61e23b18076d9ddff7b4895a` |
| `docs/spec/spec-ledger.md` (whole file after the append) | RESULT | 1054516 | `b6140834c8bdc37c994ff3d93410343fa2b61d05e40e5f8a9e573222f0e64038` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE | 24662 | `58c1bdfeb842e9ffa6e328d510f869e6502d042959e6c694deb9ecc79c8533ac` |
| `docs/tracking/incidental-findings.md` (whole file after the tail-replace) | RESULT | 582317 | `d123b48bac245ee7f655dd08b11eabe6048f5383cae3f3f3b31a267807086741` |
| `docs/governance/system-state.md` | REPLACE | 62852 | `67acb9e8c1754fca4fd375bf2601a750ff6efb7af11501e2e83b6932573451dc` |
| `docs/tracking/action-tracker.md` | APPEND | 1016 | `4045916384dc8f0d2941146c034d289c5bb5951c5073c95c9f4a981349b28f00` |
| `docs/tracking/action-tracker.md` (whole file after the append) | RESULT | 33575 | `f5b7a34e93b5d678aa6bfe81f0a51bb2ac44b677203ac4e1036a9d37a28b9193` |
| `roadmap.md` | REPLACE | 49256 | `7cb00e026cf71e15cb203cbad518dcd8f0ca191b06e0563edcf06387bb057a82` |
| `docs/governance/handoffs/2026-10-12-bundle11-running-record.md` | NEW | 248007 | `b2be22b230588b021fa16a7c32556225976eb97063689c1e71cbdf966d742b5e` |
| `docs/governance/handoffs/2026-10-12-bundle11-handover.md` | NEW | 32264 | `bee70cba5b573aa3cdd184194fd71b0766592de3d7679868124756dc4aabcaf5` |
| `docs/_changelog.md` | APPEND | 505 | `2da322df5c503af44e4ec135bef64ea1abd168f68223f31ce3556405e8938655` |
| `docs/_changelog.md` (whole file after the append) | RESULT | 314913 | `aed41911ea4a2f7a344c6c8c43ca5033a5ffbe8ae6ee6ce2566419f531c237c8` |
