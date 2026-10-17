# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39056469557
- Commit: `5a3109008c779a13fd7f9ac839c4977592227e32`
- Attempt: 1
- Written (UTC): 2026-10-17T18:05:14.588Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: nightly, full
- Errors outside any test (INC-589): nightly (1), full (1)

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### nightly: 1 in the results file; the log's summary says 0

```text
Error: STAGING BEHIND: apply 20261017153217_f9a99f75-96a4-4c76-b382-ac2238197369.sql to ethio-staging before E2E can pass
    at migrationPreflight (/home/runner/work/ethio-marketplace/ethio-marketplace/scripts/e2e-migration-preflight.ts:291:11)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:395:3)
```

### full: 1 in the results file; the log's summary says 0

```text
Error: STAGING BEHIND: apply 20261017153217_f9a99f75-96a4-4c76-b382-ac2238197369.sql to ethio-staging before E2E can pass
    at migrationPreflight (/home/runner/work/ethio-marketplace/ethio-marketplace/scripts/e2e-migration-preflight.ts:291:11)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:395:3)
```

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

No `[ssr-error]` lines in any source (all 2 logs read).

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

No `[a11y]` lines in any source (all 2 logs read).

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-10-17T18:05:09.232Z | 0.0 min |
| full | 2026-10-17T18:05:11.434Z | 0.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 0 user(s) owned by process 39056469557-nightly
Error: STAGING BEHIND: apply 20261017153217_f9a99f75-96a4-4c76-b382-ac2238197369.sql to ethio-staging before E2E can pass
   at ../../scripts/e2e-migration-preflight.ts:291
  289 |     console.error("[e2e:preflight] missing migration file(s):");
  290 |     for (const file of missing) console.error(`  - ${file}`);
> 291 |     throw new Error(`STAGING BEHIND: apply ${newestMissing} to ethio-staging before E2E can pass`);
      |           ^
  292 |   }
  293 |
  294 |   console.log(`[e2e:preflight] migration parity OK via ${mechanism} (newest: ${newest}).`);
    at migrationPreflight (/home/runner/work/ethio-marketplace/ethio-marketplace/scripts/e2e-migration-preflight.ts:291:11)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:395:3)
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 0 user(s) owned by process 39056469557-nightly
Error: STAGING BEHIND: apply 20261017153217_f9a99f75-96a4-4c76-b382-ac2238197369.sql to ethio-staging before E2E can pass
   at ../scripts/e2e-migration-preflight.ts:291
  289 |     console.error("[e2e:preflight] missing migration file(s):");
  290 |     for (const file of missing) console.error(`  - ${file}`);
> 291 |     throw new Error(`STAGING BEHIND: apply ${newestMissing} to ethio-staging before E2E can pass`);
      |           ^
  292 |   }
  293 |
  294 |   console.log(`[e2e:preflight] migration parity OK via ${mechanism} (newest: ${newest}).`);
    at migrationPreflight (/home/runner/work/ethio-marketplace/ethio-marketplace/scripts/e2e-migration-preflight.ts:291:11)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:395:3)
```

## Server errors: nightly

No `[ssr-error]` lines in the `nightly` log (or no log was uploaded).

## Client errors: nightly

No `[client-error]` lines in the `nightly` log (or no log was uploaded).

## Server errors: full

No `[ssr-error]` lines in the `full` log (or no log was uploaded).

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).

## nightly: results file with zero tests

nightly: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: STAGING BEHIND: apply 20261017153217_f9a99f75-96a4-4c76-b382-ac2238197369.sql to ethio-staging before E2E can pass
--- final 10 lines ---
292 |   }
  293 |
  294 |   console.log(`[e2e:preflight] migration parity OK via ${mechanism} (newest: ${newest}).`);
    at migrationPreflight (/home/runner/work/ethio-marketplace/ethio-marketplace/scripts/e2e-migration-preflight.ts:291:11)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:395:3)
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 0 user(s) owned by process 39056469557-nightly
```

## full: results file with zero tests

full: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: STAGING BEHIND: apply 20261017153217_f9a99f75-96a4-4c76-b382-ac2238197369.sql to ethio-staging before E2E can pass
--- final 10 lines ---
292 |   }
  293 |
  294 |   console.log(`[e2e:preflight] migration parity OK via ${mechanism} (newest: ${newest}).`);
    at migrationPreflight (/home/runner/work/ethio-marketplace/ethio-marketplace/scripts/e2e-migration-preflight.ts:291:11)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:395:3)
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 0 user(s) owned by process 39056469557-nightly
```
