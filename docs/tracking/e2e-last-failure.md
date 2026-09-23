# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35831707201
- Commit: `889d838e281d733c942efac9eff74438aed23a9d`
- Attempt: 2
- Written (UTC): 2026-09-23T07:58:43.028Z
- Passed: 123 · Skipped: 31 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 3 user(s) owned by process 35831707201-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 3 user(s) owned by process 35831707201-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 3 user(s) owned by process 35831707201-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 3 user(s) owned by process 35831707201-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 3 user(s) owned by process 35831707201-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 3 user(s) owned by process 35831707201-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 5 user(s) owned by process 35831707201-changed
```

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

## shard 1: results file with zero tests

shard 1: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (2) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed
TypeError: Cannot read properties of undefined (reading 'DEV')
--- final 10 lines ---
11 |  * and every instrument compiles out exactly as it did under the DEV gate.
  12 |  */
> 13 | export const isE2E: boolean = import.meta.env.DEV || import.meta.env.VITE_E2E === "1";
     |                                               ^
  14 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/src/lib/env-flags.ts:13:47
[e2e:teardown] deleted 3 user(s) owned by process 35831707201-1
```

## shard 2: results file with zero tests

shard 2: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
TypeError: Cannot read properties of undefined (reading 'DEV')
--- final 10 lines ---
11 |  * and every instrument compiles out exactly as it did under the DEV gate.
  12 |  */
> 13 | export const isE2E: boolean = import.meta.env.DEV || import.meta.env.VITE_E2E === "1";
     |                                               ^
  14 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/src/lib/env-flags.ts:13:47
[e2e:teardown] deleted 3 user(s) owned by process 35831707201-2
```

## shard 3: results file with zero tests

shard 3: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
TypeError: Cannot read properties of undefined (reading 'DEV')
--- final 10 lines ---
11 |  * and every instrument compiles out exactly as it did under the DEV gate.
  12 |  */
> 13 | export const isE2E: boolean = import.meta.env.DEV || import.meta.env.VITE_E2E === "1";
     |                                               ^
  14 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/src/lib/env-flags.ts:13:47
[e2e:teardown] deleted 3 user(s) owned by process 35831707201-3
```

## shard 4: results file with zero tests

shard 4: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
TypeError: Cannot read properties of undefined (reading 'DEV')
--- final 10 lines ---
11 |  * and every instrument compiles out exactly as it did under the DEV gate.
  12 |  */
> 13 | export const isE2E: boolean = import.meta.env.DEV || import.meta.env.VITE_E2E === "1";
     |                                               ^
  14 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/src/lib/env-flags.ts:13:47
[e2e:teardown] deleted 3 user(s) owned by process 35831707201-4
```

## shard 5: results file with zero tests

shard 5: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
TypeError: Cannot read properties of undefined (reading 'DEV')
--- final 10 lines ---
11 |  * and every instrument compiles out exactly as it did under the DEV gate.
  12 |  */
> 13 | export const isE2E: boolean = import.meta.env.DEV || import.meta.env.VITE_E2E === "1";
     |                                               ^
  14 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/src/lib/env-flags.ts:13:47
[e2e:teardown] deleted 3 user(s) owned by process 35831707201-5
```

## shard 6: results file with zero tests

shard 6: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
TypeError: Cannot read properties of undefined (reading 'DEV')
--- final 10 lines ---
11 |  * and every instrument compiles out exactly as it did under the DEV gate.
  12 |  */
> 13 | export const isE2E: boolean = import.meta.env.DEV || import.meta.env.VITE_E2E === "1";
     |                                               ^
  14 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/src/lib/env-flags.ts:13:47
[e2e:teardown] deleted 3 user(s) owned by process 35831707201-6
```
