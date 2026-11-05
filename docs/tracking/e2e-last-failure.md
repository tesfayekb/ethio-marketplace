# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42006437766
- Commit: `a0ad85da4300d2c9015d41321e6ddad124614e1b`
- Attempt: 1
- Written (UTC): 2026-11-05T10:01:54.889Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): none
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (0 of 18 results files read, 0 of 18 logs read).

## Backend start failure (INC-973)

The temporary backend never came up, so these sources have neither results nor a lane log: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16. The start log's error lines, redacted, from `smoke` (one lane's lines stand for every lane that failed the same way):

```text
migration: Applying migration 20261105080108_d9040574-ba15-4faf-af69-7ef8f94e7076.sql...
ERROR: P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change) (SQLSTATE P0001)
Server record (DEC-340, stream):
172.18.0.1 2026-11-05 09:59:21.214 UTC [274] postgres@postgres ERROR:  P-2 M-1c part 5 proof (b): edit_my_listing let a sold ad through (nothing to change)
172.18.0.1 2026-11-05 09:59:21.214 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 109 at RAISE
172.18.0.1 2026-11-05 09:59:21.214 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(149 statement lines dropped)
```

## Server errors — census (DEC-083, non-gating)

Logs read: none · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16

`smoke`, `email`, `shard 1`, `shard 2`, `shard 3`, `shard 4`, `shard 5`, `shard 6`, `shard 7`, `shard 8`, `shard 9`, `shard 10`, `shard 11`, `shard 12`, `shard 13`, `shard 14`, `shard 15`, `shard 16`: log unavailable.

## Accessibility (DEC-084, gating)

Logs read: none · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16

`smoke`, `email`, `shard 1`, `shard 2`, `shard 3`, `shard 4`, `shard 5`, `shard 6`, `shard 7`, `shard 8`, `shard 9`, `shard 10`, `shard 11`, `shard 12`, `shard 13`, `shard 14`, `shard 15`, `shard 16`: log unavailable.

## Timing (DEC-087, non-gating)

Results read: none · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16

No timing: no source carried a results.json.

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: email

No `[ssr-error]` lines in the `email` log (or no log was uploaded).

## Client errors: email

No `[client-error]` lines in the `email` log (or no log was uploaded).

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: shard 7

No `[ssr-error]` lines in the `shard 7` log (or no log was uploaded).

## Client errors: shard 7

No `[client-error]` lines in the `shard 7` log (or no log was uploaded).

## Server errors: shard 8

No `[ssr-error]` lines in the `shard 8` log (or no log was uploaded).

## Client errors: shard 8

No `[client-error]` lines in the `shard 8` log (or no log was uploaded).

## Server errors: shard 9

No `[ssr-error]` lines in the `shard 9` log (or no log was uploaded).

## Client errors: shard 9

No `[client-error]` lines in the `shard 9` log (or no log was uploaded).

## Server errors: shard 10

No `[ssr-error]` lines in the `shard 10` log (or no log was uploaded).

## Client errors: shard 10

No `[client-error]` lines in the `shard 10` log (or no log was uploaded).

## Server errors: shard 11

No `[ssr-error]` lines in the `shard 11` log (or no log was uploaded).

## Client errors: shard 11

No `[client-error]` lines in the `shard 11` log (or no log was uploaded).

## Server errors: shard 12

No `[ssr-error]` lines in the `shard 12` log (or no log was uploaded).

## Client errors: shard 12

No `[client-error]` lines in the `shard 12` log (or no log was uploaded).

## Server errors: shard 13

No `[ssr-error]` lines in the `shard 13` log (or no log was uploaded).

## Client errors: shard 13

No `[client-error]` lines in the `shard 13` log (or no log was uploaded).

## Server errors: shard 14

No `[ssr-error]` lines in the `shard 14` log (or no log was uploaded).

## Client errors: shard 14

No `[client-error]` lines in the `shard 14` log (or no log was uploaded).

## Server errors: shard 15

No `[ssr-error]` lines in the `shard 15` log (or no log was uploaded).

## Client errors: shard 15

No `[client-error]` lines in the `shard 15` log (or no log was uploaded).

## Server errors: shard 16

No `[ssr-error]` lines in the `shard 16` log (or no log was uploaded).

## Client errors: shard 16

No `[client-error]` lines in the `shard 16` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 7: no results file

shard 7: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 8: no results file

shard 8: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 9: no results file

shard 9: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 10: no results file

shard 10: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 11: no results file

shard 11: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 12: no results file

shard 12: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 13: no results file

shard 13: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 14: no results file

shard 14: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 15: no results file

shard 15: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 16: no results file

shard 16: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
