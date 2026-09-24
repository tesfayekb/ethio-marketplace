# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35980518512
- Commit: `28a4439e65fb0b3240de0077665ae9148af5fbbf`
- Attempt: 1
- Written (UTC): 2026-09-24T09:21:59.926Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 35980518512-smoke: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-smoke-3107-1-watqnb@ethio-e2e.invalid: {} (status 500)
   at global-setup.ts:409
  407 |   });
  408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 35980518512-email: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-email-3103-1-skqcoj@ethio-e2e.invalid: {} (status 500)
   at global-setup.ts:409
  407 |   });
  408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 35980518512-1: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-1-3055-1-rwovk4@ethio-e2e.invalid: {} (status 500)
   at global-setup.ts:409
  407 |   });
  408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 35980518512-2: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-2-3051-1-z7tgjo@ethio-e2e.invalid: {} (status 500)
   at global-setup.ts:409
  407 |   });
  408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 35980518512-3: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-3-3077-1-qqex6s@ethio-e2e.invalid: {} (status 500)
   at global-setup.ts:409
  407 |   });
  408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 35980518512-4: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-4-3118-1-e4iseo@ethio-e2e.invalid: {} (status 500)
   at global-setup.ts:409
  407 |   });
  408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 35980518512-5: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-5-2860-1-v4ejyz@ethio-e2e.invalid: {} (status 500)
   at global-setup.ts:409
  407 |   });
  408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 35980518512-6: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-6-3090-1-evjj2k@ethio-e2e.invalid: {} (status 500)
   at global-setup.ts:409
  407 |   });
  408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 35980518512-changed: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-changed-3103-1-6gqajp@ethio-e2e.invalid: {} (status 500)
   at global-setup.ts:409
  407 |   });
  408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
```

## Server errors: smoke

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: email

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## Client errors: email

No `[client-error]` lines in the `email` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).

## smoke: results file with zero tests

smoke: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-smoke-3107-1-watqnb@ethio-e2e.invalid: {} (status 500)
--- final 10 lines ---
408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
[e2e:teardown] WARNING could not list users for process 35980518512-smoke: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## email: results file with zero tests

email: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-email-3103-1-skqcoj@ethio-e2e.invalid: {} (status 500)
--- final 10 lines ---
408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
[e2e:teardown] WARNING could not list users for process 35980518512-email: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## shard 1: results file with zero tests

shard 1: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-1-3055-1-rwovk4@ethio-e2e.invalid: {} (status 500)
--- final 10 lines ---
408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
[e2e:teardown] WARNING could not list users for process 35980518512-1: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## shard 2: results file with zero tests

shard 2: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-2-3051-1-z7tgjo@ethio-e2e.invalid: {} (status 500)
--- final 10 lines ---
408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
[e2e:teardown] WARNING could not list users for process 35980518512-2: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## shard 3: results file with zero tests

shard 3: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-3-3077-1-qqex6s@ethio-e2e.invalid: {} (status 500)
--- final 10 lines ---
408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
[e2e:teardown] WARNING could not list users for process 35980518512-3: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## shard 4: results file with zero tests

shard 4: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-4-3118-1-e4iseo@ethio-e2e.invalid: {} (status 500)
--- final 10 lines ---
408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
[e2e:teardown] WARNING could not list users for process 35980518512-4: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## shard 5: results file with zero tests

shard 5: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-5-2860-1-v4ejyz@ethio-e2e.invalid: {} (status 500)
--- final 10 lines ---
408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
[e2e:teardown] WARNING could not list users for process 35980518512-5: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## shard 6: results file with zero tests

shard 6: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-6-3090-1-evjj2k@ethio-e2e.invalid: {} (status 500)
--- final 10 lines ---
408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
[e2e:teardown] WARNING could not list users for process 35980518512-6: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```

## changed: results file with zero tests

changed: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+35980518512-changed-3103-1-6gqajp@ethio-e2e.invalid: {} (status 500)
--- final 10 lines ---
408 |   if (error || !data?.user?.id) {
> 409 |     throw new Error(
      |           ^
  410 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  411 |         (error?.status ? ` (status ${error.status})` : ""),
  412 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:409:11)
[e2e:teardown] WARNING could not list users for process 35980518512-changed: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 503
```
