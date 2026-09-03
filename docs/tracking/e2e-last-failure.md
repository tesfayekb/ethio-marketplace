# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33719280963
- Commit: `721ddaeed6fe84be4d38d8f5fcd1df11e6eeb945`
- Attempt: 2
- Written (UTC): 2026-09-03T05:45:07.165Z
- Passed: 425 · Skipped: 73 · Failed: 14
- Gating failures: 14 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories.spec.ts › C2 categories console › CT-2 roster: the ratified tree renders, search narrows it, nothing overflows — Error: expect(locator).toBeVisible() failed

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-ul7au6-actions').getByTestId('category-retire-e2e-cat-1-1-ul7au6')
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-ul7au6-actions').getByTestId('category-retire-e2e-cat-1-1-ul7au6')

```

Context:

```text
          - listitem [ref=e891]:
            - generic [ref=e892]: About
          - listitem [ref=e893]:
            - generic [ref=e894]: How it works
      - navigation "Help" [ref=e895]:
        - heading "Help" [level=2] [ref=e896]
        - list [ref=e897]:
          - listitem [ref=e898]:
            - generic [ref=e899]: Safety
          - listitem [ref=e900]:
            - generic [ref=e901]: Contact
      - navigation "Legal" [ref=e902]:
        - heading "Legal" [level=2] [ref=e903]
        - list [ref=e904]:
          - listitem [ref=e905]:
            - generic [ref=e906]: Terms
          - listitem [ref=e907]:
            - generic [ref=e908]: Privacy
    - paragraph [ref=e910]: © 2026 ethio.com — All rights reserved.
```
```

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
          - listitem [ref=e891]:
            - generic [ref=e892]: About
          - listitem [ref=e893]:
            - generic [ref=e894]: How it works
      - navigation "Help" [ref=e895]:
        - heading "Help" [level=2] [ref=e896]
        - list [ref=e897]:
          - listitem [ref=e898]:
            - generic [ref=e899]: Safety
          - listitem [ref=e900]:
            - generic [ref=e901]: Contact
      - navigation "Legal" [ref=e902]:
        - heading "Legal" [level=2] [ref=e903]
        - list [ref=e904]:
          - listitem [ref=e905]:
            - generic [ref=e906]: Terms
          - listitem [ref=e907]:
            - generic [ref=e908]: Privacy
    - paragraph [ref=e910]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e744]:
            - generic [ref=e745]: About
          - listitem [ref=e746]:
            - generic [ref=e747]: How it works
      - navigation "Help" [ref=e748]:
        - heading "Help" [level=2] [ref=e749]
        - list [ref=e750]:
          - listitem [ref=e751]:
            - generic [ref=e752]: Safety
          - listitem [ref=e753]:
            - generic [ref=e754]: Contact
      - navigation "Legal" [ref=e755]:
        - heading "Legal" [level=2] [ref=e756]
        - list [ref=e757]:
          - listitem [ref=e758]:
            - generic [ref=e759]: Terms
          - listitem [ref=e760]:
            - generic [ref=e761]: Privacy
    - paragraph [ref=e763]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-2-jzqnjx-actions-cell').getByTestId('category-retire-e2e-cat-4-2-jzqnjx')
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-2-jzqnjx-actions-cell').getByTestId('category-retire-e2e-cat-4-2-jzqnjx')

```

Context:

```text
          - listitem [ref=e1116]:
            - generic [ref=e1117]: About
          - listitem [ref=e1118]:
            - generic [ref=e1119]: How it works
      - navigation "Help" [ref=e1120]:
        - heading "Help" [level=2] [ref=e1121]
        - list [ref=e1122]:
          - listitem [ref=e1123]:
            - generic [ref=e1124]: Safety
          - listitem [ref=e1125]:
            - generic [ref=e1126]: Contact
      - navigation "Legal" [ref=e1127]:
        - heading "Legal" [level=2] [ref=e1128]
        - list [ref=e1129]:
          - listitem [ref=e1130]:
            - generic [ref=e1131]: Terms
          - listitem [ref=e1132]:
            - generic [ref=e1133]: Privacy
    - paragraph [ref=e1135]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-8 laptop band renders cards with no horizontal scroll anywhere

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeInViewport() failed

Locator:  getByTestId('data-table-cards').getByTestId('category-row-vehicles-actions').getByTestId('category-edit-vehicles')
Expected: in viewport
Received: viewport ratio 0
Timeout:  10000ms

Call log:
  - Expect "toBeInViewport" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-vehicles-actions').getByTestId('category-edit-vehicles')
    14 × locator resolved to <button title="Edit" type="button" aria-label="Edit" data-testid="category-edit-vehicles" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-a…>…</button>
       - unexpected value "viewport ratio 0"

```

Context:

```text
          - listitem [ref=e971]:
            - generic [ref=e972]: About
          - listitem [ref=e973]:
            - generic [ref=e974]: How it works
      - navigation "Help" [ref=e975]:
        - heading "Help" [level=2] [ref=e976]
        - list [ref=e977]:
          - listitem [ref=e978]:
            - generic [ref=e979]: Safety
          - listitem [ref=e980]:
            - generic [ref=e981]: Contact
      - navigation "Legal" [ref=e982]:
        - heading "Legal" [level=2] [ref=e983]
        - list [ref=e984]:
          - listitem [ref=e985]:
            - generic [ref=e986]: Terms
          - listitem [ref=e987]:
            - generic [ref=e988]: Privacy
    - paragraph [ref=e990]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e738]:
            - generic [ref=e739]: About
          - listitem [ref=e740]:
            - generic [ref=e741]: How it works
      - navigation "Help" [ref=e742]:
        - heading "Help" [level=2] [ref=e743]
        - list [ref=e744]:
          - listitem [ref=e745]:
            - generic [ref=e746]: Safety
          - listitem [ref=e747]:
            - generic [ref=e748]: Contact
      - navigation "Legal" [ref=e749]:
        - heading "Legal" [level=2] [ref=e750]
        - list [ref=e751]:
          - listitem [ref=e752]:
            - generic [ref=e753]: Terms
          - listitem [ref=e754]:
            - generic [ref=e755]: Privacy
    - paragraph [ref=e757]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-0-dyz9l5-actions').getByTestId('category-retire-e2e-cat-changed-0-dyz9l5')
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-0-dyz9l5-actions').getByTestId('category-retire-e2e-cat-changed-0-dyz9l5')

```

Context:

```text
          - listitem [ref=e891]:
            - generic [ref=e892]: About
          - listitem [ref=e893]:
            - generic [ref=e894]: How it works
      - navigation "Help" [ref=e895]:
        - heading "Help" [level=2] [ref=e896]
        - list [ref=e897]:
          - listitem [ref=e898]:
            - generic [ref=e899]: Safety
          - listitem [ref=e900]:
            - generic [ref=e901]: Contact
      - navigation "Legal" [ref=e902]:
        - heading "Legal" [level=2] [ref=e903]
        - list [ref=e904]:
          - listitem [ref=e905]:
            - generic [ref=e906]: Terms
          - listitem [ref=e907]:
            - generic [ref=e908]: Privacy
    - paragraph [ref=e910]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e891]:
            - generic [ref=e892]: About
          - listitem [ref=e893]:
            - generic [ref=e894]: How it works
      - navigation "Help" [ref=e895]:
        - heading "Help" [level=2] [ref=e896]
        - list [ref=e897]:
          - listitem [ref=e898]:
            - generic [ref=e899]: Safety
          - listitem [ref=e900]:
            - generic [ref=e901]: Contact
      - navigation "Legal" [ref=e902]:
        - heading "Legal" [level=2] [ref=e903]
        - list [ref=e904]:
          - listitem [ref=e905]:
            - generic [ref=e906]: Terms
          - listitem [ref=e907]:
            - generic [ref=e908]: Privacy
    - paragraph [ref=e910]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-changed-5-4yjs4g-actions-cell').getByTestId('category-retire-e2e-cat-changed-5-4yjs4g')
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-changed-5-4yjs4g-actions-cell').getByTestId('category-retire-e2e-cat-changed-5-4yjs4g')

```

Context:

```text
          - listitem [ref=e1116]:
            - generic [ref=e1117]: About
          - listitem [ref=e1118]:
            - generic [ref=e1119]: How it works
      - navigation "Help" [ref=e1120]:
        - heading "Help" [level=2] [ref=e1121]
        - list [ref=e1122]:
          - listitem [ref=e1123]:
            - generic [ref=e1124]: Safety
          - listitem [ref=e1125]:
            - generic [ref=e1126]: Contact
      - navigation "Legal" [ref=e1127]:
        - heading "Legal" [level=2] [ref=e1128]
        - list [ref=e1129]:
          - listitem [ref=e1130]:
            - generic [ref=e1131]: Terms
          - listitem [ref=e1132]:
            - generic [ref=e1133]: Privacy
    - paragraph [ref=e1135]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-8 laptop band renders cards with no horizontal scroll anywhere

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-vehicles-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-vehicles-card')

```

Context:

```text
          - listitem [ref=e971]:
            - generic [ref=e972]: About
          - listitem [ref=e973]:
            - generic [ref=e974]: How it works
      - navigation "Help" [ref=e975]:
        - heading "Help" [level=2] [ref=e976]
        - list [ref=e977]:
          - listitem [ref=e978]:
            - generic [ref=e979]: Safety
          - listitem [ref=e980]:
            - generic [ref=e981]: Contact
      - navigation "Legal" [ref=e982]:
        - heading "Legal" [level=2] [ref=e983]
        - list [ref=e984]:
          - listitem [ref=e985]:
            - generic [ref=e986]: Terms
          - listitem [ref=e987]:
            - generic [ref=e988]: Privacy
    - paragraph [ref=e990]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e744]:
            - generic [ref=e745]: About
          - listitem [ref=e746]:
            - generic [ref=e747]: How it works
      - navigation "Help" [ref=e748]:
        - heading "Help" [level=2] [ref=e749]
        - list [ref=e750]:
          - listitem [ref=e751]:
            - generic [ref=e752]: Safety
          - listitem [ref=e753]:
            - generic [ref=e754]: Contact
      - navigation "Legal" [ref=e755]:
        - heading "Legal" [level=2] [ref=e756]
        - list [ref=e757]:
          - listitem [ref=e758]:
            - generic [ref=e759]: Terms
          - listitem [ref=e760]:
            - generic [ref=e761]: Privacy
    - paragraph [ref=e763]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e738]:
            - generic [ref=e739]: About
          - listitem [ref=e740]:
            - generic [ref=e741]: How it works
      - navigation "Help" [ref=e742]:
        - heading "Help" [level=2] [ref=e743]
        - list [ref=e744]:
          - listitem [ref=e745]:
            - generic [ref=e746]: Safety
          - listitem [ref=e747]:
            - generic [ref=e748]: Contact
      - navigation "Legal" [ref=e749]:
        - heading "Legal" [level=2] [ref=e750]
        - list [ref=e751]:
          - listitem [ref=e752]:
            - generic [ref=e753]: Terms
          - listitem [ref=e754]:
            - generic [ref=e755]: Privacy
    - paragraph [ref=e757]: © 2026 ethio.com — All rights reserved.
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
