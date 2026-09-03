# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33716772949
- Commit: `b5029bcea89cc5184ee9f8e821d27430bde9e17b`
- Attempt: 2
- Written (UTC): 2026-09-03T05:12:21.320Z
- Passed: 418 · Skipped: 67 · Failed: 16
- Gating failures: 16 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-categories.spec.ts › C2 categories console › CT-8 tablet band: actions stay reachable through the primitive scroller

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeInViewport() failed

Locator:  getByRole('table').getByTestId('category-row-vehicles-actions-cell').getByTestId('category-edit-vehicles')
Expected: in viewport
Received: viewport ratio 0
Timeout:  10000ms

Call log:
  - Expect "toBeInViewport" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('category-row-vehicles-actions-cell').getByTestId('category-edit-vehicles')
    14 × locator resolved to <button title="Edit" type="button" aria-label="Edit" data-testid="category-edit-vehicles" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-a…>…</button>
       - unexpected value "viewport ratio 0"

```

Context:

```text
          - listitem [ref=e882]:
            - generic [ref=e883]: About
          - listitem [ref=e884]:
            - generic [ref=e885]: How it works
      - navigation "Help" [ref=e886]:
        - heading "Help" [level=2] [ref=e887]
        - list [ref=e888]:
          - listitem [ref=e889]:
            - generic [ref=e890]: Safety
          - listitem [ref=e891]:
            - generic [ref=e892]: Contact
      - navigation "Legal" [ref=e893]:
        - heading "Legal" [level=2] [ref=e894]
        - list [ref=e895]:
          - listitem [ref=e896]:
            - generic [ref=e897]: Terms
          - listitem [ref=e898]:
            - generic [ref=e899]: Privacy
    - paragraph [ref=e901]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-9 roster shape: a parent column and a 25-row page

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('data-table-col-parent')
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('data-table-col-parent')
    14 × locator resolved to <th scope="col" data-testid="data-table-col-parent" class="p-3 align-top text-start min-w-40 font-medium">Parent</th>
       - unexpected value "hidden"

```

Context:

```text
          - listitem [ref=e903]:
            - generic [ref=e904]: About
          - listitem [ref=e905]:
            - generic [ref=e906]: How it works
      - navigation "Help" [ref=e907]:
        - heading "Help" [level=2] [ref=e908]
        - list [ref=e909]:
          - listitem [ref=e910]:
            - generic [ref=e911]: Safety
          - listitem [ref=e912]:
            - generic [ref=e913]: Contact
      - navigation "Legal" [ref=e914]:
        - heading "Legal" [level=2] [ref=e915]
        - list [ref=e916]:
          - listitem [ref=e917]:
            - generic [ref=e918]: Terms
          - listitem [ref=e919]:
            - generic [ref=e920]: Privacy
    - paragraph [ref=e922]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: the CSV export was page-scoped: 797 rows for a 799-row catalog

expect(received).toBe(expected) // Object.is equality

Expected: 799
Received: 797
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

## primitives-law.spec.ts › display primitives law (test-once responsiveness) › L11 wide columns hide below xl and the first column stays pinned

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThan(expected)

Expected: < 2
Received:   40
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

## admin-categories.spec.ts › C2 categories console › CT-8 tablet band: actions stay reachable through the primitive scroller

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeInViewport() failed

Locator:  getByRole('table').getByTestId('category-row-vehicles-actions-cell').getByTestId('category-edit-vehicles')
Expected: in viewport
Received: viewport ratio 0
Timeout:  10000ms

Call log:
  - Expect "toBeInViewport" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('category-row-vehicles-actions-cell').getByTestId('category-edit-vehicles')
    14 × locator resolved to <button title="Edit" type="button" aria-label="Edit" data-testid="category-edit-vehicles" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-a…>…</button>
       - unexpected value "viewport ratio 0"

```

Context:

```text
          - listitem [ref=e882]:
            - generic [ref=e883]: About
          - listitem [ref=e884]:
            - generic [ref=e885]: How it works
      - navigation "Help" [ref=e886]:
        - heading "Help" [level=2] [ref=e887]
        - list [ref=e888]:
          - listitem [ref=e889]:
            - generic [ref=e890]: Safety
          - listitem [ref=e891]:
            - generic [ref=e892]: Contact
      - navigation "Legal" [ref=e893]:
        - heading "Legal" [level=2] [ref=e894]
        - list [ref=e895]:
          - listitem [ref=e896]:
            - generic [ref=e897]: Terms
          - listitem [ref=e898]:
            - generic [ref=e899]: Privacy
    - paragraph [ref=e901]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-29 the catalog exports as CSV and a translated CSV imports back

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: the CSV export was page-scoped: 797 rows for a 799-row catalog

expect(received).toBe(expected) // Object.is equality

Expected: 799
Received: 797
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

## primitives-law.spec.ts › display primitives law (test-once responsiveness) › L11 wide columns hide below xl and the first column stays pinned

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThan(expected)

Expected: < 2
Received:   40
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

## admin-categories.spec.ts › C2 categories console › CT-8 tablet band: actions stay reachable through the primitive scroller

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeInViewport() failed

Locator:  getByRole('table').getByTestId('category-row-vehicles-actions-cell').getByTestId('category-edit-vehicles')
Expected: in viewport
Received: viewport ratio 0
Timeout:  10000ms

Call log:
  - Expect "toBeInViewport" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('category-row-vehicles-actions-cell').getByTestId('category-edit-vehicles')
    14 × locator resolved to <button title="Edit" type="button" aria-label="Edit" data-testid="category-edit-vehicles" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-a…>…</button>
       - unexpected value "viewport ratio 0"

```

Context:

```text
          - listitem [ref=e882]:
            - generic [ref=e883]: About
          - listitem [ref=e884]:
            - generic [ref=e885]: How it works
      - navigation "Help" [ref=e886]:
        - heading "Help" [level=2] [ref=e887]
        - list [ref=e888]:
          - listitem [ref=e889]:
            - generic [ref=e890]: Safety
          - listitem [ref=e891]:
            - generic [ref=e892]: Contact
      - navigation "Legal" [ref=e893]:
        - heading "Legal" [level=2] [ref=e894]
        - list [ref=e895]:
          - listitem [ref=e896]:
            - generic [ref=e897]: Terms
          - listitem [ref=e898]:
            - generic [ref=e899]: Privacy
    - paragraph [ref=e901]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-9 roster shape: a parent column and a 25-row page

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator:  getByTestId('data-table-col-parent')
Expected: visible
Received: hidden
Timeout:  10000ms

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('data-table-col-parent')
    14 × locator resolved to <th scope="col" data-testid="data-table-col-parent" class="p-3 align-top text-start min-w-40 font-medium">Parent</th>
       - unexpected value "hidden"

```

Context:

```text
          - listitem [ref=e903]:
            - generic [ref=e904]: About
          - listitem [ref=e905]:
            - generic [ref=e906]: How it works
      - navigation "Help" [ref=e907]:
        - heading "Help" [level=2] [ref=e908]
        - list [ref=e909]:
          - listitem [ref=e910]:
            - generic [ref=e911]: Safety
          - listitem [ref=e912]:
            - generic [ref=e913]: Contact
      - navigation "Legal" [ref=e914]:
        - heading "Legal" [level=2] [ref=e915]
        - list [ref=e916]:
          - listitem [ref=e917]:
            - generic [ref=e918]: Terms
          - listitem [ref=e919]:
            - generic [ref=e920]: Privacy
    - paragraph [ref=e922]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-8 tablet band: actions stay reachable through the primitive scroller

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeInViewport() failed

Locator:  getByRole('table').getByTestId('category-row-vehicles-actions-cell').getByTestId('category-edit-vehicles')
Expected: in viewport
Received: viewport ratio 0
Timeout:  10000ms

Call log:
  - Expect "toBeInViewport" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('category-row-vehicles-actions-cell').getByTestId('category-edit-vehicles')
    14 × locator resolved to <button title="Edit" type="button" aria-label="Edit" data-testid="category-edit-vehicles" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-a…>…</button>
       - unexpected value "viewport ratio 0"

```

Context:

```text
          - listitem [ref=e882]:
            - generic [ref=e883]: About
          - listitem [ref=e884]:
            - generic [ref=e885]: How it works
      - navigation "Help" [ref=e886]:
        - heading "Help" [level=2] [ref=e887]
        - list [ref=e888]:
          - listitem [ref=e889]:
            - generic [ref=e890]: Safety
          - listitem [ref=e891]:
            - generic [ref=e892]: Contact
      - navigation "Legal" [ref=e893]:
        - heading "Legal" [level=2] [ref=e894]
        - list [ref=e895]:
          - listitem [ref=e896]:
            - generic [ref=e897]: Terms
          - listitem [ref=e898]:
            - generic [ref=e899]: Privacy
    - paragraph [ref=e901]: © 2026 ethio.com — All rights reserved.
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

## primitives-law.spec.ts › display primitives law (test-once responsiveness) › L11 wide columns hide below xl and the first column stays pinned

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThan(expected)

Expected: < 2
Received:   40
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

## primitives-law.spec.ts › display primitives law (test-once responsiveness) › L11 wide columns hide below xl and the first column stays pinned

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThan(expected)

Expected: < 2
Received:   40
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
