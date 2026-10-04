# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37188134063
- Commit: `c65952658146f98b037c51bde1c2a08d13597274`
- Attempt: 1
- Written (UTC): 2026-10-04T08:12:54.472Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: nightly, full

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

No `[ssr-error]` lines in any source (all 2 logs read).

## Accessibility (DEC-084, non-gating)

Logs read: nightly, full · unavailable: none

No `[a11y]` lines in any source (all 2 logs read).

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-10-04T08:12:51.924Z | 0.0 min |
| full | 2026-10-04T08:12:53.747Z | 0.0 min |

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
[e2e:teardown] deleted 0 user(s) owned by process 37188134063-nightly
Error: STAGING BEHIND: apply 20261004072852_d59800cd-96f3-4a6a-a010-597b97e29208.sql to ethio-staging before E2E can pass
   at ../../scripts/e2e-migration-preflight.ts:291
  289 |     console.error("[e2e:preflight] missing migration file(s):");
  290 |     for (const file of missing) console.error(`  - ${file}`);
> 291 |     throw new Error(`STAGING BEHIND: apply ${newestMissing} to ethio-staging before E2E can pass`);
      |           ^
  292 |   }
  293 |
  294 |   console.log(`[e2e:preflight] migration parity OK via ${mechanism} (newest: ${newest}).`);
    at migrationPreflight (/home/runner/work/ethio-marketplace/ethio-marketplace/scripts/e2e-migration-preflight.ts:291:11)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:390:3)
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 0 user(s) owned by process 37188134063-nightly
Error: STAGING BEHIND: apply 20261004072852_d59800cd-96f3-4a6a-a010-597b97e29208.sql to ethio-staging before E2E can pass
   at ../scripts/e2e-migration-preflight.ts:291
  289 |     console.error("[e2e:preflight] missing migration file(s):");
  290 |     for (const file of missing) console.error(`  - ${file}`);
> 291 |     throw new Error(`STAGING BEHIND: apply ${newestMissing} to ethio-staging before E2E can pass`);
      |           ^
  292 |   }
  293 |
  294 |   console.log(`[e2e:preflight] migration parity OK via ${mechanism} (newest: ${newest}).`);
    at migrationPreflight (/home/runner/work/ethio-marketplace/ethio-marketplace/scripts/e2e-migration-preflight.ts:291:11)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:390:3)
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
Error: STAGING BEHIND: apply 20261004072852_d59800cd-96f3-4a6a-a010-597b97e29208.sql to ethio-staging before E2E can pass
--- final 10 lines ---
292 |   }
  293 |
  294 |   console.log(`[e2e:preflight] migration parity OK via ${mechanism} (newest: ${newest}).`);
    at migrationPreflight (/home/runner/work/ethio-marketplace/ethio-marketplace/scripts/e2e-migration-preflight.ts:291:11)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:390:3)
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 0 user(s) owned by process 37188134063-nightly
```

## full: results file with zero tests

full: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

```text
--- error lines (1) ---
Error: STAGING BEHIND: apply 20261004072852_d59800cd-96f3-4a6a-a010-597b97e29208.sql to ethio-staging before E2E can pass
--- final 10 lines ---
292 |   }
  293 |
  294 |   console.log(`[e2e:preflight] migration parity OK via ${mechanism} (newest: ${newest}).`);
    at migrationPreflight (/home/runner/work/ethio-marketplace/ethio-marketplace/scripts/e2e-migration-preflight.ts:291:11)
    at globalSetup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:390:3)
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 0 user(s) owned by process 37188134063-nightly
```
