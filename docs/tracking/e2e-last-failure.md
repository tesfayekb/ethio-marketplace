# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38528698170
- Commit: `d902d7356088b9aee706db000904a6d691b1eeec`
- Attempt: 1
- Written (UTC): 2026-10-14T07:36:01.598Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Errors outside any test (INC-589): smoke (1), email (1), shard 1 (1), shard 2 (1), shard 3 (1), shard 4 (1), shard 5 (1), shard 6 (1), changed (1)

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### smoke: 1 in the results file; the log's summary says 0

```text
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-smoke-2858-1-yfrkt6@ethio-e2e.invalid: {} (status 522)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

### email: 1 in the results file; the log's summary says 0

```text
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-email-2860-1-8oqi3k@ethio-e2e.invalid: {} (status 522)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

### shard 1: 1 in the results file; the log's summary says 0

```text
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-1-3055-1-ngh1uu@ethio-e2e.invalid: {} (status 522)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

### shard 2: 1 in the results file; the log's summary says 0

```text
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-2-2871-1-kc9s9n@ethio-e2e.invalid: {} (status 522)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

### shard 3: 1 in the results file; the log's summary says 0

```text
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-3-2999-1-spbitq@ethio-e2e.invalid: {} (status 522)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

### shard 4: 1 in the results file; the log's summary says 0

```text
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-4-3056-1-c43zlq@ethio-e2e.invalid: {} (status 522)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

### shard 5: 1 in the results file; the log's summary says 0

```text
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-5-3068-1-dwahfr@ethio-e2e.invalid: {} (status 522)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

### shard 6: 1 in the results file; the log's summary says 0

```text
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-6-2853-1-fy5w58@ethio-e2e.invalid: {} (status 522)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

### changed: 1 in the results file; the log's summary says 0

```text
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-changed-3088-1-ijrdjb@ethio-e2e.invalid: {} (status 522)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

9 line(s), 1 message(s): 1 off the allowlist, 0 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `gate fetch failed <n>` | 9 | smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed |

Quiet (allowlisted): none

Off the allowlist:

### gate fetch failed <n>

- Count: 9 · Sources: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): none read

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

No `[a11y]` lines in any source (all 9 logs read).

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-14T07:32:46.292Z | 2.6 min |
| email | 2026-10-14T07:32:52.003Z | 2.6 min |
| shard 1 | 2026-10-14T07:32:49.495Z | 2.6 min |
| shard 2 | 2026-10-14T07:33:05.013Z | 2.6 min |
| shard 3 | 2026-10-14T07:32:44.656Z | 2.6 min |
| shard 4 | 2026-10-14T07:32:41.931Z | 2.6 min |
| shard 5 | 2026-10-14T07:32:46.505Z | 2.6 min |
| shard 6 | 2026-10-14T07:32:45.809Z | 2.6 min |
| changed | 2026-10-14T07:32:49.327Z | 2.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-smoke: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-smoke-2858-1-yfrkt6@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:433
  431 |   });
  432 |   if (error || !data?.user?.id) {
> 433 |     throw new Error(
      |           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-email: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-email-2860-1-8oqi3k@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:433
  431 |   });
  432 |   if (error || !data?.user?.id) {
> 433 |     throw new Error(
      |           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-1: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-1-3055-1-ngh1uu@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:433
  431 |   });
  432 |   if (error || !data?.user?.id) {
> 433 |     throw new Error(
      |           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-2: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-2-2871-1-kc9s9n@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:433
  431 |   });
  432 |   if (error || !data?.user?.id) {
> 433 |     throw new Error(
      |           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-3: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-3-2999-1-spbitq@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:433
  431 |   });
  432 |   if (error || !data?.user?.id) {
> 433 |     throw new Error(
      |           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-4: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-4-3056-1-c43zlq@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:433
  431 |   });
  432 |   if (error || !data?.user?.id) {
> 433 |     throw new Error(
      |           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-5: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-5-3068-1-dwahfr@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:433
  431 |   });
  432 |   if (error || !data?.user?.id) {
> 433 |     throw new Error(
      |           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-6: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-6-2853-1-fy5w58@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:433
  431 |   });
  432 |   if (error || !data?.user?.id) {
> 433 |     throw new Error(
      |           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-changed: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-changed-3088-1-ijrdjb@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:433
  431 |   });
  432 |   if (error || !data?.user?.id) {
> 433 |     throw new Error(
      |           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
```

## Server errors: smoke

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: email

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## Client errors: email

No `[client-error]` lines in the `email` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).

## smoke: results file with zero tests

smoke: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-smoke-2858-1-yfrkt6@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
|           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-smoke: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## email: results file with zero tests

email: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-email-2860-1-8oqi3k@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
|           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-email: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## shard 1: results file with zero tests

shard 1: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-1-3055-1-ngh1uu@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
|           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-1: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## shard 2: results file with zero tests

shard 2: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-2-2871-1-kc9s9n@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
|           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-2: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## shard 3: results file with zero tests

shard 3: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-3-2999-1-spbitq@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
|           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-3: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## shard 4: results file with zero tests

shard 4: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-4-3056-1-c43zlq@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
|           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-4: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## shard 5: results file with zero tests

shard 5: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-5-3068-1-dwahfr@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
|           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-5: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## shard 6: results file with zero tests

shard 6: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-6-2853-1-fy5w58@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
|           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-6: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## changed: results file with zero tests

changed: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+38528698170-changed-3088-1-ijrdjb@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
|           ^
  434 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  435 |         (error?.status ? ` (status ${error.status})` : ""),
  436 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:433:11)
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38528698170-changed: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```
