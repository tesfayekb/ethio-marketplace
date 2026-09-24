# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35940383679
- Commit: `2d902f8f54de4aeac68746a0162da556ff0b03fc`
- PLATFORM-ORIGIN? the head commit's subject is `Work in progress` — a Lovable auto-push, so suspect platform-injected code before ours.
- Attempt: 1
- Written (UTC): 2026-09-24T01:11:15.780Z
- Passed: 998 · Skipped: 78 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): none
- Sources without results: email

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op — Error: expect(locator).toBeVisible() failed

## Server errors: email

No `[ssr-error]` lines in the `email` log (or no log was uploaded).

## Client errors: email

No `[client-error]` lines in the `email` log (or no log was uploaded).

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
