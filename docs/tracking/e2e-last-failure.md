# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33764036172
- Commit: `02809f28155bb6050d93d86cafe1bc6f9d127692`
- Attempt: 1
- Written (UTC): 2026-09-03T14:14:57.563Z
- Passed: 407 · Skipped: 74 · Failed: 48
- Gating failures: 48 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-categories.spec.ts › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-5n4lhk-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-5n4lhk-card')

[dialog-dump findRow(e2e-cat-1-1-5n4lhk)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-1-1-5n4lhk) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-3-bxtvwo-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-3-bxtvwo-card')

[dialog-dump findRow(e2e-cat-1-3-bxtvwo)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-1-3-bxtvwo) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-5 exclusions: saving a country set writes the exclusion rows

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-5-e7xvhi-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-5-e7xvhi-card')

[dialog-dump findRow(e2e-cat-1-5-e7xvhi)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-1-5-e7xvhi) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-7-nsmkrn-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-7-nsmkrn-card')

[dialog-dump findRow(e2e-cat-1-7-nsmkrn)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-1-7-nsmkrn) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-9-w8oil1-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-9-w8oil1-card')

[dialog-dump findRow(e2e-cat-1-9-w8oil1)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-1-9-w8oil1) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-11-ucqs1g-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-11-ucqs1g-card')

[dialog-dump findRow(e2e-cat-1-11-ucqs1g)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-1-11-ucqs1g) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-13-rlgei0-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-13-rlgei0-card')

[dialog-dump findRow(e2e-cat-1-13-rlgei0)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-1-13-rlgei0) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-15-zbfzib-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-15-zbfzib-card')

[dialog-dump findRow(e2e-cat-1-15-zbfzib)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-1-15-zbfzib) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-17-n6ep0h-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-17-n6ep0h-card')

[dialog-dump findRow(e2e-cat-1-17-n6ep0h)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-1-17-n6ep0h) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-16 return path: closing a secondary dialog returns to the open editor

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-19-fusj6v-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-19-fusj6v-card')

[dialog-dump findRow(e2e-cat-1-19-fusj6v)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-1-19-fusj6v) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate overwrites

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-21-211vaf-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-21-211vaf-card')

[dialog-dump findRow(e2e-cat-1-21-211vaf)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-1-21-211vaf) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-2-tebnqb')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-2-tebnqb')

[dialog-dump findRow(e2e-cat-4-2-tebnqb)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-4-2-tebnqb) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-4-ylws0i')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-4-ylws0i')

[dialog-dump findRow(e2e-cat-4-4-ylws0i)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-4-4-ylws0i) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-5 exclusions: saving a country set writes the exclusion rows

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-6-py3cas')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-6-py3cas')

[dialog-dump findRow(e2e-cat-4-6-py3cas)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-4-6-py3cas) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-8-l4g55w')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-8-l4g55w')

[dialog-dump findRow(e2e-cat-4-8-l4g55w)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-4-8-l4g55w) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-10-fj0abp')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-10-fj0abp')

[dialog-dump findRow(e2e-cat-4-10-fj0abp)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-4-10-fj0abp) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-12-pxo7jf')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-12-pxo7jf')

[dialog-dump findRow(e2e-cat-4-12-pxo7jf)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-4-12-pxo7jf) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-14-kkb0yq')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-14-kkb0yq')

[dialog-dump findRow(e2e-cat-4-14-kkb0yq)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-4-14-kkb0yq) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-16-lsw99t')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-16-lsw99t')

[dialog-dump findRow(e2e-cat-4-16-lsw99t)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-4-16-lsw99t) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-18-6ommzc')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-18-6ommzc')

[dialog-dump findRow(e2e-cat-4-18-6ommzc)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-4-18-6ommzc) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-20-373nkt')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-20-373nkt')

[dialog-dump findRow(e2e-cat-4-20-373nkt)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-4-20-373nkt) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-16 return path: closing a secondary dialog returns to the open editor

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-22-dn4usp')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-22-dn4usp')

[dialog-dump findRow(e2e-cat-4-22-dn4usp)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-4-22-dn4usp) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate overwrites

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-24-p46ncj')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-24-p46ncj')

[dialog-dump findRow(e2e-cat-4-24-p46ncj)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-4-24-p46ncj) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-26-5mupv5')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-26-5mupv5')

[dialog-dump findRow(e2e-cat-4-26-5mupv5)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-4-26-5mupv5) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-0-8m9u1h-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-0-8m9u1h-card')

[dialog-dump findRow(e2e-cat-changed-0-8m9u1h)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-0-8m9u1h) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-5-f8tph3-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-5-f8tph3-card')

[dialog-dump findRow(e2e-cat-changed-5-f8tph3)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-5-f8tph3) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-5 exclusions: saving a country set writes the exclusion rows

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-9-yawlt1-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-9-yawlt1-card')

[dialog-dump findRow(e2e-cat-changed-9-yawlt1)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-9-yawlt1) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-13-i3sljz-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-13-i3sljz-card')

[dialog-dump findRow(e2e-cat-changed-13-i3sljz)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-13-i3sljz) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-17-z9c9y5-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-17-z9c9y5-card')

[dialog-dump findRow(e2e-cat-changed-17-z9c9y5)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-17-z9c9y5) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-21-hiaexx-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-21-hiaexx-card')

[dialog-dump findRow(e2e-cat-changed-21-hiaexx)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-21-hiaexx) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-25-7avu6d-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-25-7avu6d-card')

[dialog-dump findRow(e2e-cat-changed-25-7avu6d)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-25-7avu6d) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-29-uifpx2-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-29-uifpx2-card')

[dialog-dump findRow(e2e-cat-changed-29-uifpx2)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-29-uifpx2) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-33-7jc9as-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-33-7jc9as-card')

[dialog-dump findRow(e2e-cat-changed-33-7jc9as)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-33-7jc9as) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-16 return path: closing a secondary dialog returns to the open editor

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-37-t8uf2j-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-37-t8uf2j-card')

[dialog-dump findRow(e2e-cat-changed-37-t8uf2j)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-37-t8uf2j) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate overwrites

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-42-tbx5te-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-42-tbx5te-card')

[dialog-dump findRow(e2e-cat-changed-42-tbx5te)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-42-tbx5te) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-changed-2-tdnwu9')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-changed-2-tdnwu9')

[dialog-dump findRow(e2e-cat-changed-2-tdnwu9)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-2-tdnwu9) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-changed-6-5rcwzs')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-changed-6-5rcwzs')

[dialog-dump findRow(e2e-cat-changed-6-5rcwzs)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-6-5rcwzs) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-5 exclusions: saving a country set writes the exclusion rows

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-changed-10-qtlo85')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-changed-10-qtlo85')

[dialog-dump findRow(e2e-cat-changed-10-qtlo85)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-10-qtlo85) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-changed-14-dd1974')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-changed-14-dd1974')

[dialog-dump findRow(e2e-cat-changed-14-dd1974)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-14-dd1974) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-changed-18-fxzxbz')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-changed-18-fxzxbz')

[dialog-dump findRow(e2e-cat-changed-18-fxzxbz)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-18-fxzxbz) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-changed-22-wfu0ae')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-changed-22-wfu0ae')

[dialog-dump findRow(e2e-cat-changed-22-wfu0ae)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-22-wfu0ae) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-changed-26-ncteat')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-changed-26-ncteat')

[dialog-dump findRow(e2e-cat-changed-26-ncteat)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-26-ncteat) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-changed-30-b9oovg')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-changed-30-b9oovg')

[dialog-dump findRow(e2e-cat-changed-30-b9oovg)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-30-b9oovg) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-changed-34-sp8t1j')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-changed-34-sp8t1j')

[dialog-dump findRow(e2e-cat-changed-34-sp8t1j)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-34-sp8t1j) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-changed-38-dbwcnv')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-changed-38-dbwcnv')

[dialog-dump findRow(e2e-cat-changed-38-dbwcnv)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-38-dbwcnv) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CT-16 return path: closing a secondary dialog returns to the open editor

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-changed-41-ap450p')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-changed-41-ap450p')

[dialog-dump findRow(e2e-cat-changed-41-ap450p)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-41-ap450p) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate overwrites

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-changed-47-ky14in')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-changed-47-ky14in')

[dialog-dump findRow(e2e-cat-changed-47-ky14in)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-47-ky14in) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-changed-49-tv9p7e')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-changed-49-tv9p7e')

[dialog-dump findRow(e2e-cat-changed-49-tv9p7e)] open dialogs: category-create-dialog opened-by=create-button
[dialog-dump createViaUi(e2e-cat-changed-49-tv9p7e) after step-up] open dialogs: category-create-dialog opened-by=create-button
```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Create category" [active] [ref=e2]:
    - heading "Create category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Create category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generate image now?
        - generic [ref=e8]:
          - paragraph [ref=e9]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e10]: No image yet for this category.
          - generic [ref=e11]:
            - generic [ref=e12]: Custom prompt
            - textbox "Custom prompt" [ref=e13]
            - paragraph [ref=e14]: Optional. Leave empty to use the house prompt for this category.
          - button "Generate image" [ref=e15] [cursor=pointer]
        - button "Skip" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
