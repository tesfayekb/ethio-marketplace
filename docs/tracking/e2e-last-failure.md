# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36128108694 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36128108694
- Commit: `073f4ffd848734af4ac9f1e3803fd5e61ca77c66`
- Attempt: 2
- Written (UTC): 2026-09-25T11:49:59.220Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back — Error: the CSV export was page-scoped: 1932 stable+own rows against a 1931-row expectation

## Flaky bodies (DEC-078)

### admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: the CSV export was page-scoped: 1932 stable+own rows against a 1931-row expectation

expect(received).toBe(expected) // Object.is equality

Expected: 1931
Received: 1932
```

Context:

```text
          - listitem [ref=e506]:
            - generic [ref=e507]: About
          - listitem [ref=e508]:
            - generic [ref=e509]: How it works
      - navigation "Help" [ref=e510]:
        - heading "Help" [level=2] [ref=e511]
        - list [ref=e512]:
          - listitem [ref=e513]:
            - generic [ref=e514]: Safety
          - listitem [ref=e515]:
            - generic [ref=e516]: Contact
      - navigation "Legal" [ref=e517]:
        - heading "Legal" [level=2] [ref=e518]
        - list [ref=e519]:
          - listitem [ref=e520]:
            - generic [ref=e521]: Terms
          - listitem [ref=e522]:
            - generic [ref=e523]: Privacy
    - paragraph [ref=e525]: © 2026 ethio.com — All rights reserved.
```
```
