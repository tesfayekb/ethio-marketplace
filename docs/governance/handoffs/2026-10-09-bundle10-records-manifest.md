# Records turn manifest — 2026-10-09 bundle 10

Written by the supervisor; committed by the same docs-only turn. Base: dev `2ab35a33`. Modes: REPLACE and NEW — the carrier section is the whole file; `sha256sum <path>` equals the sha256 column. APPEND — the carrier section is appended to the existing file, byte for byte; the sha256 column hashes the appended bytes and the RESULT row hashes the whole file after the append. TAIL-REPLACE (`docs/tracking/incidental-findings.md`) — everything from the line `Numbering: next free INC-511.` to the end of the file is replaced by the section; the RESULT row hashes the whole file after it. This manifest carries no hash of itself.

| Path | Mode | Bytes | sha256 |
| --- | --- | ---: | --- |
| `docs/spec/spec-ledger.md` | APPEND | 29244 | `e1717e6c8c8a5295e682cd9a1881b86867d9447d24a1762ac8105879c3ea94dd` |
| `docs/spec/spec-ledger.md` (whole file after the append) | RESULT | 1000315 | `9cc9fca5c79eb867747f22f3a65f0967d598d7597f21cc09137e5176c5a6f29a` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE | 19405 | `1ceaa778585724f0a2b11c11c4eb4e27d2523443d4ace467911324eeb075b4eb` |
| `docs/tracking/incidental-findings.md` (whole file after the tail-replace) | RESULT | 548993 | `c3c9704ecf0404134cbf11842bdcd77a66b3103e7745f6e6ccdfeab98d1f83b4` |
| `docs/governance/system-state.md` | REPLACE | 58206 | `36363cc9678a630f1093d03cf4435ab7c6234ca25ff32f3cff1ca6b357db4a6b` |
| `docs/tracking/action-tracker.md` | APPEND | 2187 | `3ffb228134cfd1c48d0aa5ccd30eaff9215f9095fd552cfa9a549fb97912b3f1` |
| `docs/tracking/action-tracker.md` (whole file after the append) | RESULT | 30751 | `88518bbadc8752e61e16195037a34676fbe313fb54d8fe56c6de4a0b0e095030` |
| `roadmap.md` | REPLACE | 22705 | `360eb9228be52a5deedb861dfd81761ac292e52aee31969f1bd70c5624a5e4e6` |
| `docs/governance/handoffs/2026-10-09-bundle10-running-record.md` | NEW | 132875 | `10903dae9a73c085a3a74d2c755cd0971e2ff5cd71afbeeb895d1fc421e640cd` |
| `docs/governance/handoffs/2026-10-09-bundle10-close-handover.md` | NEW | 16808 | `baf15623172bafabcfc2a1bdc0eab1521908c19f9201975eb287e3944344f491` |
| `scripts/feed-bench.ts` | REPLACE | 18932 | `ff05fe11555eea3af24229bc30d6d596a168423c23bdffc553d80686b1786c94` |
| `docs/_changelog.md` | APPEND | 616 | `21a7d13a4358d9e46174b0954e6c96a631462cf4db1f4661901a0bdb0bf8ac9d` |
| `docs/_changelog.md` (whole file after the append) | RESULT | 282221 | `6ddad2c4b23f440eac07bf1f0a12d70a8bb3b4fb9ff2cc1f35e8d9cd8496a190` |
