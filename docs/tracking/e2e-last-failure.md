# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34072982652
- Commit: `c203ce946ae4cb73e1444f4cf2a3707b4e30dac0`
- Attempt: 1
- Written (UTC): 2026-09-07T01:48:35.583Z
- Passed: 302 · Skipped: 65 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Sources without results: shard 1, shard 4

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · category-nav.spec.ts › category selection navigates › C-1: clicking a category changes the URL and survives reload — Error: expect(locator).toHaveText(expected) failed

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
