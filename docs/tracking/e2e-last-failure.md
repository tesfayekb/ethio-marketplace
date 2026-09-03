# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33715095927
- Commit: `2ffbaa869bd64fa983145f297b548229bc3ea0d5`
- Attempt: 2
- Written (UTC): 2026-09-03T04:41:10.637Z
- Passed: 412 · Skipped: 67 · Failed: 10
- Gating failures: 10 · Quarantined (@global-state, INC-117, non-gating): 0
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
          - listitem [ref=e1083]:
            - generic [ref=e1084]: About
          - listitem [ref=e1085]:
            - generic [ref=e1086]: How it works
      - navigation "Help" [ref=e1087]:
        - heading "Help" [level=2] [ref=e1088]
        - list [ref=e1089]:
          - listitem [ref=e1090]:
            - generic [ref=e1091]: Safety
          - listitem [ref=e1092]:
            - generic [ref=e1093]: Contact
      - navigation "Legal" [ref=e1094]:
        - heading "Legal" [level=2] [ref=e1095]
        - list [ref=e1096]:
          - listitem [ref=e1097]:
            - generic [ref=e1098]: Terms
          - listitem [ref=e1099]:
            - generic [ref=e1100]: Privacy
    - paragraph [ref=e1102]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e876]:
            - generic [ref=e877]: About
          - listitem [ref=e878]:
            - generic [ref=e879]: How it works
      - navigation "Help" [ref=e880]:
        - heading "Help" [level=2] [ref=e881]
        - list [ref=e882]:
          - listitem [ref=e883]:
            - generic [ref=e884]: Safety
          - listitem [ref=e885]:
            - generic [ref=e886]: Contact
      - navigation "Legal" [ref=e887]:
        - heading "Legal" [level=2] [ref=e888]
        - list [ref=e889]:
          - listitem [ref=e890]:
            - generic [ref=e891]: Terms
          - listitem [ref=e892]:
            - generic [ref=e893]: Privacy
    - paragraph [ref=e895]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e794]:
            - generic [ref=e795]: About
          - listitem [ref=e796]:
            - generic [ref=e797]: How it works
      - navigation "Help" [ref=e798]:
        - heading "Help" [level=2] [ref=e799]
        - list [ref=e800]:
          - listitem [ref=e801]:
            - generic [ref=e802]: Safety
          - listitem [ref=e803]:
            - generic [ref=e804]: Contact
      - navigation "Legal" [ref=e805]:
        - heading "Legal" [level=2] [ref=e806]
        - list [ref=e807]:
          - listitem [ref=e808]:
            - generic [ref=e809]: Terms
          - listitem [ref=e810]:
            - generic [ref=e811]: Privacy
    - paragraph [ref=e813]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e1082]:
            - generic [ref=e1083]: About
          - listitem [ref=e1084]:
            - generic [ref=e1085]: How it works
      - navigation "Help" [ref=e1086]:
        - heading "Help" [level=2] [ref=e1087]
        - list [ref=e1088]:
          - listitem [ref=e1089]:
            - generic [ref=e1090]: Safety
          - listitem [ref=e1091]:
            - generic [ref=e1092]: Contact
      - navigation "Legal" [ref=e1093]:
        - heading "Legal" [level=2] [ref=e1094]
        - list [ref=e1095]:
          - listitem [ref=e1096]:
            - generic [ref=e1097]: Terms
          - listitem [ref=e1098]:
            - generic [ref=e1099]: Privacy
    - paragraph [ref=e1101]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e776]:
            - generic [ref=e777]: About
          - listitem [ref=e778]:
            - generic [ref=e779]: How it works
      - navigation "Help" [ref=e780]:
        - heading "Help" [level=2] [ref=e781]
        - list [ref=e782]:
          - listitem [ref=e783]:
            - generic [ref=e784]: Safety
          - listitem [ref=e785]:
            - generic [ref=e786]: Contact
      - navigation "Legal" [ref=e787]:
        - heading "Legal" [level=2] [ref=e788]
        - list [ref=e789]:
          - listitem [ref=e790]:
            - generic [ref=e791]: Terms
          - listitem [ref=e792]:
            - generic [ref=e793]: Privacy
    - paragraph [ref=e795]: © 2026 ethio.com — All rights reserved.
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
    13 × locator resolved to <button title="Edit" type="button" aria-label="Edit" data-testid="category-edit-vehicles" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-a…>…</button>
       - unexpected value "viewport ratio 0"

```

Context:

```text
          - listitem [ref=e1083]:
            - generic [ref=e1084]: About
          - listitem [ref=e1085]:
            - generic [ref=e1086]: How it works
      - navigation "Help" [ref=e1087]:
        - heading "Help" [level=2] [ref=e1088]
        - list [ref=e1089]:
          - listitem [ref=e1090]:
            - generic [ref=e1091]: Safety
          - listitem [ref=e1092]:
            - generic [ref=e1093]: Contact
      - navigation "Legal" [ref=e1094]:
        - heading "Legal" [level=2] [ref=e1095]
        - list [ref=e1096]:
          - listitem [ref=e1097]:
            - generic [ref=e1098]: Terms
          - listitem [ref=e1099]:
            - generic [ref=e1100]: Privacy
    - paragraph [ref=e1102]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e876]:
            - generic [ref=e877]: About
          - listitem [ref=e878]:
            - generic [ref=e879]: How it works
      - navigation "Help" [ref=e880]:
        - heading "Help" [level=2] [ref=e881]
        - list [ref=e882]:
          - listitem [ref=e883]:
            - generic [ref=e884]: Safety
          - listitem [ref=e885]:
            - generic [ref=e886]: Contact
      - navigation "Legal" [ref=e887]:
        - heading "Legal" [level=2] [ref=e888]
        - list [ref=e889]:
          - listitem [ref=e890]:
            - generic [ref=e891]: Terms
          - listitem [ref=e892]:
            - generic [ref=e893]: Privacy
    - paragraph [ref=e895]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e1082]:
            - generic [ref=e1083]: About
          - listitem [ref=e1084]:
            - generic [ref=e1085]: How it works
      - navigation "Help" [ref=e1086]:
        - heading "Help" [level=2] [ref=e1087]
        - list [ref=e1088]:
          - listitem [ref=e1089]:
            - generic [ref=e1090]: Safety
          - listitem [ref=e1091]:
            - generic [ref=e1092]: Contact
      - navigation "Legal" [ref=e1093]:
        - heading "Legal" [level=2] [ref=e1094]
        - list [ref=e1095]:
          - listitem [ref=e1096]:
            - generic [ref=e1097]: Terms
          - listitem [ref=e1098]:
            - generic [ref=e1099]: Privacy
    - paragraph [ref=e1101]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e794]:
            - generic [ref=e795]: About
          - listitem [ref=e796]:
            - generic [ref=e797]: How it works
      - navigation "Help" [ref=e798]:
        - heading "Help" [level=2] [ref=e799]
        - list [ref=e800]:
          - listitem [ref=e801]:
            - generic [ref=e802]: Safety
          - listitem [ref=e803]:
            - generic [ref=e804]: Contact
      - navigation "Legal" [ref=e805]:
        - heading "Legal" [level=2] [ref=e806]
        - list [ref=e807]:
          - listitem [ref=e808]:
            - generic [ref=e809]: Terms
          - listitem [ref=e810]:
            - generic [ref=e811]: Privacy
    - paragraph [ref=e813]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e776]:
            - generic [ref=e777]: About
          - listitem [ref=e778]:
            - generic [ref=e779]: How it works
      - navigation "Help" [ref=e780]:
        - heading "Help" [level=2] [ref=e781]
        - list [ref=e782]:
          - listitem [ref=e783]:
            - generic [ref=e784]: Safety
          - listitem [ref=e785]:
            - generic [ref=e786]: Contact
      - navigation "Legal" [ref=e787]:
        - heading "Legal" [level=2] [ref=e788]
        - list [ref=e789]:
          - listitem [ref=e790]:
            - generic [ref=e791]: Terms
          - listitem [ref=e792]:
            - generic [ref=e793]: Privacy
    - paragraph [ref=e795]: © 2026 ethio.com — All rights reserved.
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
