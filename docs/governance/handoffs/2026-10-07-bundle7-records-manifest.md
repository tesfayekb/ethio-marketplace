# Records turn manifest — 2026-10-07 bundle 7 close

Written by the supervisor; committed by the same docs-only turn. Base: dev `d1a4f475`. Modes: REPLACE and NEW — the carrier section is the whole file; `sha256sum <path>` equals the sha256 column. APPEND — the carrier section is appended to the existing file, byte for byte; the sha256 column hashes the appended bytes and the RESULT row hashes the whole file after the append. TAIL-REPLACE (`docs/tracking/incidental-findings.md`) — everything from the line `Numbering: next free INC-473.` to the end of the file is replaced by the section; the RESULT row hashes the whole file after it. This manifest carries no hash of itself.

| Path | Mode | Bytes | sha256 |
| --- | --- | ---: | --- |
| `docs/spec/spec-ledger.md` | APPEND | 40928 | `cdabf19f984b2d29b71e00e82413556997ab71dadbbe066b15cc70e5e3874f22` |
| `docs/spec/spec-ledger.md` (whole file after the append) | RESULT | 880176 | `3f146d73a4bc205aa91174d16102bee1061cba7d992e2c9f94f45a92a03c94cf` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE | 20263 | `7e772ef3f3a078a49a74433b00da6705514dddc5588959a9e1b627a6d0977b5a` |
| `docs/tracking/incidental-findings.md` (whole file after the tail-replace) | RESULT | 497071 | `0787808e8c58644578ba0ae6ae5d4cec7d7522ec6993efb896806f238b7bcb6e` |
| `docs/governance/system-state.md` | REPLACE | 40243 | `420431900c179c08c91183a1e512122d457d9e48ca435650b97dacb821ad8996` |
| `AGENTS.md` | REPLACE | 4915 | `ea3960ff56e00ead00d8f4bef8cedb2d33f221acefef9fbf8acab6ac50561324` |
| `docs/tracking/action-tracker.md` | APPEND | 1552 | `85bc62bd07c8d53940e4baaa7a1a91e72fb4a8daa4062c088465c65714bb2ba9` |
| `docs/tracking/action-tracker.md` (whole file after the append) | RESULT | 24279 | `95c3e5b8cc92356aac0f9977977de5a029949e18c900145c3d6fe22be2e80dff` |
| `roadmap.md` | REPLACE | 13086 | `4b21ce41f1b9a030a9f5f15e6d5f35c4f9cd20547652b4d89d7cf176fde58f20` |
| `docs/governance/roadmap.md` | APPEND | 895 | `bddd06641ecb4cb2a4093b22355aff4a128f4ac8aa5c55562354f93c744aecb0` |
| `docs/governance/roadmap.md` (whole file after the append) | RESULT | 26119 | `b6084c626107094722b903947f64ccfe2180dc389219cc4fe3fbe1a8586c2b4b` |
| `docs/governance/launch-gate.md` | APPEND | 1148 | `54a850c1c023661833ecbb6bdf97ac2eefebd22da94b233893cea9ea25539075` |
| `docs/governance/launch-gate.md` (whole file after the append) | RESULT | 21430 | `fd276cd19d6d435228b0e265399879f11ce617983e670946f22f6262accdda9b` |
| `docs/governance/handoffs/2026-10-07-bundle7-running-record.md` | NEW | 164938 | `b4e4335bc555996babfc3d6a3d79319fc8f69fef84bd8804e2a12abdd7b7cf2a` |
| `docs/governance/handoffs/2026-10-07-order-of-work-additions.md` | NEW | 7300 | `677009286b5809fd5857379fb44ce3bb593ba73366fa0bf41bf595afda02eb95` |
| `docs/governance/handoffs/2026-10-07-bundle7-close-handover.md` | NEW | 21738 | `5d5f383e9a2bde83e85b7b28c933a210d9d9140c054b6ba8eb2899a10555a43d` |
| `docs/_changelog.md` | APPEND | 509 | `a53e9aaee3e1b9f75378206ac440155121c5778c55a8fbefa3533fe5d1bafc25` |
| `docs/_changelog.md` (whole file after the append) | RESULT | 269306 | `5579d74d780830896ea9c44e63247558a398de1475d418d776d009f2eb16e3f4` |
