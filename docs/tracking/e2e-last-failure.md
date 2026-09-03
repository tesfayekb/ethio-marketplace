# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33739836007
- Commit: `80a5353f8799e04ed4c7d80622e697a8974d55ee`
- Attempt: 1
- Written (UTC): 2026-09-03T09:49:10.856Z
- Passed: 451 · Skipped: 70 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-oxvdeo-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-oxvdeo-card')

```

Context:

```text
        - generic [ref=e32]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e33]:
          - /placeholder: No expiry
      - generic [ref=e34]:
        - checkbox "Accepts listings" [checked] [ref=e35] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e36]:
        - checkbox "Price field enabled" [checked] [ref=e37] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e38]:
        - button "Cancel" [ref=e39] [cursor=pointer]
        - button "Save" [ref=e40] [cursor=pointer]
    - button "Close" [ref=e41] [cursor=pointer]:
      - img [ref=e42]
      - generic [ref=e45]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-2-mc4swa')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-2-mc4swa')

```

Context:

```text
        - generic [ref=e32]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e33]:
          - /placeholder: No expiry
      - generic [ref=e34]:
        - checkbox "Accepts listings" [checked] [ref=e35] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e36]:
        - checkbox "Price field enabled" [checked] [ref=e37] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e38]:
        - button "Cancel" [ref=e39] [cursor=pointer]
        - button "Save" [ref=e40] [cursor=pointer]
    - button "Close" [ref=e41] [cursor=pointer]:
      - img [ref=e42]
      - generic [ref=e45]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-0-yut6ps-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-0-yut6ps-card')

```

Context:

```text
        - generic [ref=e32]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e33]:
          - /placeholder: No expiry
      - generic [ref=e34]:
        - checkbox "Accepts listings" [checked] [ref=e35] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e36]:
        - checkbox "Price field enabled" [checked] [ref=e37] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e38]:
        - button "Cancel" [ref=e39] [cursor=pointer]
        - button "Save" [ref=e40] [cursor=pointer]
    - button "Close" [ref=e41] [cursor=pointer]:
      - img [ref=e42]
      - generic [ref=e45]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-changed-2-fxr2jo')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-changed-2-fxr2jo')

```

Context:

```text
        - generic [ref=e32]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e33]:
          - /placeholder: No expiry
      - generic [ref=e34]:
        - checkbox "Accepts listings" [checked] [ref=e35] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e36]:
        - checkbox "Price field enabled" [checked] [ref=e37] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e38]:
        - button "Cancel" [ref=e39] [cursor=pointer]
        - button "Save" [ref=e40] [cursor=pointer]
    - button "Close" [ref=e41] [cursor=pointer]:
      - img [ref=e42]
      - generic [ref=e45]: Close
```
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
