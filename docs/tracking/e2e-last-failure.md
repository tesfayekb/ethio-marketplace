# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33543828406
- Commit: `6f6ddf5c9ee2d6f2684c0efa7a16199ca0b4e36b`
- Attempt: 2
- Written (UTC): 2026-09-01T19:15:01.282Z
- Passed: 369 · Skipped: 69 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-21 a key missing from the synced catalog is orphaned and excluded — Error: the sync never marked the absent key orphaned

## admin-translations.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('lang-data-coverage-zxx-mo-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('lang-data-coverage-zxx-mo-card')

```

Context:

```text
          - listitem [ref=e560]:
            - generic [ref=e561]: About
          - listitem [ref=e562]:
            - generic [ref=e563]: How it works
      - navigation "Help" [ref=e564]:
        - heading "Help" [level=2] [ref=e565]
        - list [ref=e566]:
          - listitem [ref=e567]:
            - generic [ref=e568]: Safety
          - listitem [ref=e569]:
            - generic [ref=e570]: Contact
      - navigation "Legal" [ref=e571]:
        - heading "Legal" [level=2] [ref=e572]
        - list [ref=e573]:
          - listitem [ref=e574]:
            - generic [ref=e575]: Terms
          - listitem [ref=e576]:
            - generic [ref=e577]: Privacy
    - paragraph [ref=e579]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('lang-data-coverage-zxx-mo-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('lang-data-coverage-zxx-mo-card')

```

Context:

```text
          - listitem [ref=e560]:
            - generic [ref=e561]: About
          - listitem [ref=e562]:
            - generic [ref=e563]: How it works
      - navigation "Help" [ref=e564]:
        - heading "Help" [level=2] [ref=e565]
        - list [ref=e566]:
          - listitem [ref=e567]:
            - generic [ref=e568]: Safety
          - listitem [ref=e569]:
            - generic [ref=e570]: Contact
      - navigation "Legal" [ref=e571]:
        - heading "Legal" [level=2] [ref=e572]
        - list [ref=e573]:
          - listitem [ref=e574]:
            - generic [ref=e575]: Terms
          - listitem [ref=e576]:
            - generic [ref=e577]: Privacy
    - paragraph [ref=e579]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
