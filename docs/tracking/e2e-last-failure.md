# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35838379675
- Commit: `14fdd98bf82836892bfa3be7a0fdcab02d815cca`
- PLATFORM-ORIGIN? the head commit's subject is `Work in progress` — a Lovable auto-push, so suspect platform-injected code before ours.
- Attempt: 1
- Written (UTC): 2026-09-23T08:50:23.820Z
- Passed: 219 · Skipped: 34 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-50 the specifications keep display order and hide only the trailing extras — Error: PW-50: the visible details were not in display order

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 3 user(s) owned by process 35838379675-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 3 user(s) owned by process 35838379675-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 3 user(s) owned by process 35838379675-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 3 user(s) owned by process 35838379675-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 3 user(s) owned by process 35838379675-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 3 user(s) owned by process 35838379675-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 105 user(s) owned by process 35838379675-changed
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
[e2e:teardown] deleted 3 user(s) owned by process 35838379675-1
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
[e2e:teardown] deleted 3 user(s) owned by process 35838379675-2
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
[e2e:teardown] deleted 3 user(s) owned by process 35838379675-3
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
[e2e:teardown] deleted 3 user(s) owned by process 35838379675-4
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
[e2e:teardown] deleted 3 user(s) owned by process 35838379675-5
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
[e2e:teardown] deleted 3 user(s) owned by process 35838379675-6
```
