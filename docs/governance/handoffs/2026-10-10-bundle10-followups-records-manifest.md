# Records turn manifest — 2026-10-10 bundle 10's follow-ups

Written by the supervisor; committed by the same docs-only turn. Base: dev `5b963ca7`. Modes: REPLACE and NEW — the carrier section is the whole file; `sha256sum <path>` equals the sha256 column. APPEND — the carrier section is appended to the existing file, byte for byte; the sha256 column hashes the appended bytes and the RESULT row hashes the whole file after the append. TAIL-REPLACE (`docs/tracking/incidental-findings.md`) — everything from the line `Numbering: next free INC-530.` to the end of the file is replaced by the section; the RESULT row hashes the whole file after it. This manifest carries no hash of itself.

| Path | Mode | Bytes | sha256 |
| --- | --- | ---: | --- |
| `docs/spec/spec-ledger.md` | APPEND | 17382 | `d24fa97d004709ff4ab9cd468872af430bde2e74f8d64718a636dab7dc1e9b3a` |
| `docs/spec/spec-ledger.md` (whole file after the append) | RESULT | 1017697 | `6b4c91323edd452ccd825d4738d1c8ec2db07e05e2bc4301c5da4b0eaaac3014` |
| `docs/tracking/incidental-findings.md` | TAIL-REPLACE | 10558 | `3e9c41831fe1285b6dfa2ba51fad939e476842b2d72c38e11cecce0e7cc1af12` |
| `docs/tracking/incidental-findings.md` (whole file after the tail-replace) | RESULT | 558530 | `04cd361982cdf253a0d63639523ab26146718db5c7f3f5d6b110c1060d1ccf6a` |
| `docs/governance/system-state.md` | REPLACE | 60617 | `8c2c829f74216ecc5e1a0ac718bd422e52bf8f6f495550ad0fdd76e15ba448a5` |
| `docs/tracking/action-tracker.md` | APPEND | 1808 | `a61082821d086e9823e76d35afcf8f651a4e91b3552469dc7a949edfea0d90c9` |
| `docs/tracking/action-tracker.md` (whole file after the append) | RESULT | 32559 | `16d5daa0b78faefb77e7ab961793233cfe169118d12816b355d293f1fd3ef578` |
| `roadmap.md` | REPLACE | 27247 | `ba2693366f32fbcf41c1c5a56faf4acec1bb919e00c88211b514d01d771fca20` |
| `docs/governance/handoffs/2026-10-10-bundle10-followups-running-record.md` | NEW | 80538 | `8770307bf13399674eb5c7c9bbb06b49835e06efc68c1230223c4697af7340b2` |
| `docs/governance/handoffs/2026-10-10-bundle10-followups-handover.md` | NEW | 12406 | `2078a107b69b5b2376ec9311d1a9abbe5ab6bece62bcbffff22e8ea16b7b5b3f` |
| `docs/_changelog.md` | APPEND | 491 | `d5a0234a89d41b60fc12493212778e3a0236bf95c48807124fa7e6d8be1c1265` |
| `docs/_changelog.md` (whole file after the append) | RESULT | 286157 | `fb30df44af74eb54ae794878bcd73577d84422763391df08e68ef249bf23ef87` |
