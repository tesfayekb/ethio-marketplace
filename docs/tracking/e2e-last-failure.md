# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36398155321
- Commit: `8e0c2ecf3019e18a8841de36e947362ce724d192`
- Attempt: 1
- Written (UTC): 2026-09-28T08:37:57.511Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 36398155321-smoke: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-smoke-2848-1-q1ezhk@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:417
  415 |   });
  416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 36398155321-email: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-email-3080-1-2tfcul@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:417
  415 |   });
  416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 36398155321-1: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-1-3056-1-yciebw@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:417
  415 |   });
  416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 36398155321-2: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-2-2980-1-z82v0t@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:417
  415 |   });
  416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 36398155321-3: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-3-2971-1-sdvvvh@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:417
  415 |   });
  416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 36398155321-4: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-4-3083-1-hhfkw8@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:417
  415 |   });
  416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 36398155321-5: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-5-2867-1-vs8bk1@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:417
  415 |   });
  416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 36398155321-6: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-6-3019-1-xtyetr@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:417
  415 |   });
  416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] WARNING could not list users for process 36398155321-changed: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-changed-3076-1-bebubw@ethio-e2e.invalid: {} (status 522)
   at global-setup.ts:417
  415 |   });
  416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
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
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-smoke-2848-1-q1ezhk@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
[e2e:teardown] WARNING could not list users for process 36398155321-smoke: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## email: results file with zero tests

email: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-email-3080-1-2tfcul@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
[e2e:teardown] WARNING could not list users for process 36398155321-email: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## shard 1: results file with zero tests

shard 1: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-1-3056-1-yciebw@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
[e2e:teardown] WARNING could not list users for process 36398155321-1: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## shard 2: results file with zero tests

shard 2: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-2-2980-1-z82v0t@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
[e2e:teardown] WARNING could not list users for process 36398155321-2: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## shard 3: results file with zero tests

shard 3: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-3-2971-1-sdvvvh@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
[e2e:teardown] WARNING could not list users for process 36398155321-3: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## shard 4: results file with zero tests

shard 4: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-4-3083-1-hhfkw8@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
[e2e:teardown] WARNING could not list users for process 36398155321-4: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## shard 5: results file with zero tests

shard 5: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-5-2867-1-vs8bk1@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
[e2e:teardown] WARNING could not list users for process 36398155321-5: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## shard 6: results file with zero tests

shard 6: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-6-3019-1-xtyetr@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
[e2e:teardown] WARNING could not list users for process 36398155321-6: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

## changed: results file with zero tests

changed: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: [e2e:setup] admin.createUser failed for e2e+36398155321-changed-3076-1-bebubw@ethio-e2e.invalid: {} (status 522)
--- final 10 lines ---
416 |   if (error || !data?.user?.id) {
> 417 |     throw new Error(
      |           ^
  418 |       `[e2e:setup] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}` +
  419 |         (error?.status ? ` (status ${error.status})` : ""),
  420 |     );
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:417:11)
[e2e:teardown] WARNING could not list users for process 36398155321-changed: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```
