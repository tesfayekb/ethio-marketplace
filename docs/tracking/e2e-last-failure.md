# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33720766848
- Commit: `63df0b68096db7676e37ec6d629bb48c2e098901`
- Attempt: 2
- Written (UTC): 2026-09-03T06:07:47.718Z
- Passed: 424 · Skipped: 72 · Failed: 15
- Gating failures: 15 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · category-nav.spec.ts › category selection navigates › C-1: clicking a category changes the URL and survives reload — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories.spec.ts › C2 categories console › CT-9a roster shape: the parent column and a 25-row page (table twin) — Error: expect(locator).toBeVisible() failed

## admin-categories.spec.ts › C2 categories console › CT-9b roster shape: the parent line and pagination inside cards

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-vehicles-card')
Expected substring: "—"
Received string:    "· VehiclesvehiclesAutomotiveActivePriceMissing assets100"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-vehicles-card')
    14 × locator resolved to <div class="min-w-0 space-y-1" data-testid="category-row-vehicles-card">…</div>
       - unexpected value "· VehiclesvehiclesAutomotiveActivePriceMissing assets100"

```

Context:

```text
          - listitem [ref=e728]:
            - generic [ref=e729]: About
          - listitem [ref=e730]:
            - generic [ref=e731]: How it works
      - navigation "Help" [ref=e732]:
        - heading "Help" [level=2] [ref=e733]
        - list [ref=e734]:
          - listitem [ref=e735]:
            - generic [ref=e736]: Safety
          - listitem [ref=e737]:
            - generic [ref=e738]: Contact
      - navigation "Legal" [ref=e739]:
        - heading "Legal" [level=2] [ref=e740]
        - list [ref=e741]:
          - listitem [ref=e742]:
            - generic [ref=e743]: Terms
          - listitem [ref=e744]:
            - generic [ref=e745]: Privacy
    - paragraph [ref=e747]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
      - generic [ref=e28]:
        - generic [ref=e29]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e30]: "30"
      - generic [ref=e31]:
        - checkbox "Accepts listings" [checked] [ref=e32] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e33]:
        - checkbox "Price field enabled" [checked] [ref=e34] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e35]:
        - button "Cancel" [ref=e36] [cursor=pointer]
        - button "Save" [ref=e37] [cursor=pointer]
    - button "Close" [ref=e38] [cursor=pointer]:
      - img [ref=e39]
      - generic [ref=e42]: Close
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: the CSV export was page-scoped: 804 rows for a 806-row catalog

expect(received).toBe(expected) // Object.is equality

Expected: 806
Received: 804
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

## primitives-law.spec.ts › display primitives law (test-once responsiveness) › L10 the primitive scroller engages and reaches the last cell

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeInViewport() failed

Locator:  getByTestId('prim-row-row-1').locator('td').last()
Expected: in viewport
Received: viewport ratio 0
Timeout:  10000ms

Call log:
  - Expect "toBeInViewport" with timeout 10000ms
  - waiting for getByTestId('prim-row-row-1').locator('td').last()
    14 × locator resolved to <td class="p-3 text-end align-top" data-testid="prim-row-row-1-actions-cell">…</td>
       - unexpected value "viewport ratio 0"

```

Context:

```text
          - listitem [ref=e756]:
            - generic [ref=e757]: About
          - listitem [ref=e758]:
            - generic [ref=e759]: How it works
      - navigation "Help" [ref=e760]:
        - heading "Help" [level=2] [ref=e761]
        - list [ref=e762]:
          - listitem [ref=e763]:
            - generic [ref=e764]: Safety
          - listitem [ref=e765]:
            - generic [ref=e766]: Contact
      - navigation "Legal" [ref=e767]:
        - heading "Legal" [level=2] [ref=e768]
        - list [ref=e769]:
          - listitem [ref=e770]:
            - generic [ref=e771]: Terms
          - listitem [ref=e772]:
            - generic [ref=e773]: Privacy
    - paragraph [ref=e775]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1151
Received:    1196
```

Context:

```text
          - listitem [ref=e956]:
            - generic [ref=e957]: About
          - listitem [ref=e958]:
            - generic [ref=e959]: How it works
      - navigation "Help" [ref=e960]:
        - heading "Help" [level=2] [ref=e961]
        - list [ref=e962]:
          - listitem [ref=e963]:
            - generic [ref=e964]: Safety
          - listitem [ref=e965]:
            - generic [ref=e966]: Contact
      - navigation "Legal" [ref=e967]:
        - heading "Legal" [level=2] [ref=e968]
        - list [ref=e969]:
          - listitem [ref=e970]:
            - generic [ref=e971]: Terms
          - listitem [ref=e972]:
            - generic [ref=e973]: Privacy
    - paragraph [ref=e975]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-11 roster controls: missing-assets filter and a device page size

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-vehicles')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-vehicles')

```

Context:

```text
          - listitem [ref=e950]:
            - generic [ref=e951]: About
          - listitem [ref=e952]:
            - generic [ref=e953]: How it works
      - navigation "Help" [ref=e954]:
        - heading "Help" [level=2] [ref=e955]
        - list [ref=e956]:
          - listitem [ref=e957]:
            - generic [ref=e958]: Safety
          - listitem [ref=e959]:
            - generic [ref=e960]: Contact
      - navigation "Legal" [ref=e961]:
        - heading "Legal" [level=2] [ref=e962]
        - list [ref=e963]:
          - listitem [ref=e964]:
            - generic [ref=e965]: Terms
          - listitem [ref=e966]:
            - generic [ref=e967]: Privacy
    - paragraph [ref=e969]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
      - generic [ref=e28]:
        - generic [ref=e29]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e30]: "30"
      - generic [ref=e31]:
        - checkbox "Accepts listings" [checked] [ref=e32] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e33]:
        - checkbox "Price field enabled" [checked] [ref=e34] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e35]:
        - button "Cancel" [ref=e36] [cursor=pointer]
        - button "Save" [ref=e37] [cursor=pointer]
    - button "Close" [ref=e38] [cursor=pointer]:
      - img [ref=e39]
      - generic [ref=e42]: Close
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: the CSV export was page-scoped: 804 rows for a 806-row catalog

expect(received).toBe(expected) // Object.is equality

Expected: 806
Received: 804
```

Context:

```text
          - listitem [ref=e730]:
            - generic [ref=e731]: About
          - listitem [ref=e732]:
            - generic [ref=e733]: How it works
      - navigation "Help" [ref=e734]:
        - heading "Help" [level=2] [ref=e735]
        - list [ref=e736]:
          - listitem [ref=e737]:
            - generic [ref=e738]: Safety
          - listitem [ref=e739]:
            - generic [ref=e740]: Contact
      - navigation "Legal" [ref=e741]:
        - heading "Legal" [level=2] [ref=e742]
        - list [ref=e743]:
          - listitem [ref=e744]:
            - generic [ref=e745]: Terms
          - listitem [ref=e746]:
            - generic [ref=e747]: Privacy
    - paragraph [ref=e749]: © 2026 ethio.com — All rights reserved.
```
```

## primitives-law.spec.ts › display primitives law (test-once responsiveness) › L10 the primitive scroller engages and reaches the last cell

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeInViewport() failed

Locator:  getByTestId('prim-row-row-1').locator('td').last()
Expected: in viewport
Received: viewport ratio 0
Timeout:  10000ms

Call log:
  - Expect "toBeInViewport" with timeout 10000ms
  - waiting for getByTestId('prim-row-row-1').locator('td').last()
    14 × locator resolved to <td class="p-3 text-end align-top" data-testid="prim-row-row-1-actions-cell">…</td>
       - unexpected value "viewport ratio 0"

```

Context:

```text
          - listitem [ref=e780]:
            - generic [ref=e781]: About
          - listitem [ref=e782]:
            - generic [ref=e783]: How it works
      - navigation "Help" [ref=e784]:
        - heading "Help" [level=2] [ref=e785]
        - list [ref=e786]:
          - listitem [ref=e787]:
            - generic [ref=e788]: Safety
          - listitem [ref=e789]:
            - generic [ref=e790]: Contact
      - navigation "Legal" [ref=e791]:
        - heading "Legal" [level=2] [ref=e792]
        - list [ref=e793]:
          - listitem [ref=e794]:
            - generic [ref=e795]: Terms
          - listitem [ref=e796]:
            - generic [ref=e797]: Privacy
    - paragraph [ref=e799]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-9b roster shape: the parent line and pagination inside cards

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-vehicles-card')
Expected substring: "—"
Received string:    "· VehiclesvehiclesAutomotiveActivePriceMissing assets100"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-vehicles-card')
    14 × locator resolved to <div class="min-w-0 space-y-1" data-testid="category-row-vehicles-card">…</div>
       - unexpected value "· VehiclesvehiclesAutomotiveActivePriceMissing assets100"

```

Context:

```text
          - listitem [ref=e728]:
            - generic [ref=e729]: About
          - listitem [ref=e730]:
            - generic [ref=e731]: How it works
      - navigation "Help" [ref=e732]:
        - heading "Help" [level=2] [ref=e733]
        - list [ref=e734]:
          - listitem [ref=e735]:
            - generic [ref=e736]: Safety
          - listitem [ref=e737]:
            - generic [ref=e738]: Contact
      - navigation "Legal" [ref=e739]:
        - heading "Legal" [level=2] [ref=e740]
        - list [ref=e741]:
          - listitem [ref=e742]:
            - generic [ref=e743]: Terms
          - listitem [ref=e744]:
            - generic [ref=e745]: Privacy
    - paragraph [ref=e747]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
      - generic [ref=e28]:
        - generic [ref=e29]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e30]: "30"
      - generic [ref=e31]:
        - checkbox "Accepts listings" [checked] [ref=e32] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e33]:
        - checkbox "Price field enabled" [checked] [ref=e34] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e35]:
        - button "Cancel" [ref=e36] [cursor=pointer]
        - button "Save" [ref=e37] [cursor=pointer]
    - button "Close" [ref=e38] [cursor=pointer]:
      - img [ref=e39]
      - generic [ref=e42]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1151
Received:    1196
```

Context:

```text
          - listitem [ref=e956]:
            - generic [ref=e957]: About
          - listitem [ref=e958]:
            - generic [ref=e959]: How it works
      - navigation "Help" [ref=e960]:
        - heading "Help" [level=2] [ref=e961]
        - list [ref=e962]:
          - listitem [ref=e963]:
            - generic [ref=e964]: Safety
          - listitem [ref=e965]:
            - generic [ref=e966]: Contact
      - navigation "Legal" [ref=e967]:
        - heading "Legal" [level=2] [ref=e968]
        - list [ref=e969]:
          - listitem [ref=e970]:
            - generic [ref=e971]: Terms
          - listitem [ref=e972]:
            - generic [ref=e973]: Privacy
    - paragraph [ref=e975]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
      - generic [ref=e28]:
        - generic [ref=e29]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e30]: "30"
      - generic [ref=e31]:
        - checkbox "Accepts listings" [checked] [ref=e32] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e33]:
        - checkbox "Price field enabled" [checked] [ref=e34] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e35]:
        - button "Cancel" [ref=e36] [cursor=pointer]
        - button "Save" [ref=e37] [cursor=pointer]
    - button "Close" [ref=e38] [cursor=pointer]:
      - img [ref=e39]
      - generic [ref=e42]: Close
```
```

## primitives-law.spec.ts › display primitives law (test-once responsiveness) › L10 the primitive scroller engages and reaches the last cell

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeInViewport() failed

Locator:  getByTestId('prim-row-row-1').locator('td').last()
Expected: in viewport
Received: viewport ratio 0
Timeout:  10000ms

Call log:
  - Expect "toBeInViewport" with timeout 10000ms
  - waiting for getByTestId('prim-row-row-1').locator('td').last()
    14 × locator resolved to <td class="p-3 text-end align-top" data-testid="prim-row-row-1-actions-cell">…</td>
       - unexpected value "viewport ratio 0"

```

Context:

```text
          - listitem [ref=e756]:
            - generic [ref=e757]: About
          - listitem [ref=e758]:
            - generic [ref=e759]: How it works
      - navigation "Help" [ref=e760]:
        - heading "Help" [level=2] [ref=e761]
        - list [ref=e762]:
          - listitem [ref=e763]:
            - generic [ref=e764]: Safety
          - listitem [ref=e765]:
            - generic [ref=e766]: Contact
      - navigation "Legal" [ref=e767]:
        - heading "Legal" [level=2] [ref=e768]
        - list [ref=e769]:
          - listitem [ref=e770]:
            - generic [ref=e771]: Terms
          - listitem [ref=e772]:
            - generic [ref=e773]: Privacy
    - paragraph [ref=e775]: © 2026 ethio.com — All rights reserved.
```
```

## primitives-law.spec.ts › display primitives law (test-once responsiveness) › L10 the primitive scroller engages and reaches the last cell

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeInViewport() failed

Locator:  getByTestId('prim-row-row-1').locator('td').last()
Expected: in viewport
Received: viewport ratio 0
Timeout:  10000ms

Call log:
  - Expect "toBeInViewport" with timeout 10000ms
  - waiting for getByTestId('prim-row-row-1').locator('td').last()
    14 × locator resolved to <td class="p-3 text-end align-top" data-testid="prim-row-row-1-actions-cell">…</td>
       - unexpected value "viewport ratio 0"

```

Context:

```text
          - listitem [ref=e780]:
            - generic [ref=e781]: About
          - listitem [ref=e782]:
            - generic [ref=e783]: How it works
      - navigation "Help" [ref=e784]:
        - heading "Help" [level=2] [ref=e785]
        - list [ref=e786]:
          - listitem [ref=e787]:
            - generic [ref=e788]: Safety
          - listitem [ref=e789]:
            - generic [ref=e790]: Contact
      - navigation "Legal" [ref=e791]:
        - heading "Legal" [level=2] [ref=e792]
        - list [ref=e793]:
          - listitem [ref=e794]:
            - generic [ref=e795]: Terms
          - listitem [ref=e796]:
            - generic [ref=e797]: Privacy
    - paragraph [ref=e799]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
