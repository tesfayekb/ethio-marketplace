# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 36316123942 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36316123942
- Commit: `1cab61d9c22525926f943c589efc3616d2ff7998`
- Attempt: 1
- Written (UTC): 2026-09-27T11:51:26.522Z
- Post-test warnings: 0
- Flaky (passed on retry, DEC-030, non-gating): 1

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-attributes.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-1-1z90t1')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-1-1z90t1')

[dialog-dump findRow(e2e-cat-4-1-1z90t1)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-4-1-1z90t1) after create] open dialogs: none
```

Context:

```text
          - listitem [ref=e229]:
            - generic [ref=e230]: About
          - listitem [ref=e231]:
            - generic [ref=e232]: How it works
      - navigation "Help" [ref=e233]:
        - heading "Help" [level=2] [ref=e234]
        - list [ref=e235]:
          - listitem [ref=e236]:
            - generic [ref=e237]: Safety
          - listitem [ref=e238]:
            - generic [ref=e239]: Contact
      - navigation "Legal" [ref=e240]:
        - heading "Legal" [level=2] [ref=e241]
        - list [ref=e242]:
          - listitem [ref=e243]:
            - generic [ref=e244]: Terms
          - listitem [ref=e245]:
            - generic [ref=e246]: Privacy
    - paragraph [ref=e248]: © 2026 ethio.com — All rights reserved.
```
```
