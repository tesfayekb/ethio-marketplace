# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33741673771
- Commit: `d25634332e58f08da3ad41ccf82fe3c1ba54071d`
- Attempt: 1
- Written (UTC): 2026-09-03T10:08:29.369Z
- Passed: 437 · Skipped: 74 · Failed: 13
- Gating failures: 13 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › app shell › the feed body is centred with equal left and right gutters — Test timeout of 60000ms exceeded.

## shell.spec.ts › app shell › feed renders its empty state

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('feed-empty')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('feed-empty')

```

Context:

```text
          - listitem [ref=e287]:
            - generic [ref=e288]: About
          - listitem [ref=e289]:
            - generic [ref=e290]: How it works
      - navigation "Help" [ref=e291]:
        - heading "Help" [level=2] [ref=e292]
        - list [ref=e293]:
          - listitem [ref=e294]:
            - generic [ref=e295]: Safety
          - listitem [ref=e296]:
            - generic [ref=e297]: Contact
      - navigation "Legal" [ref=e298]:
        - heading "Legal" [level=2] [ref=e299]
        - list [ref=e300]:
          - listitem [ref=e301]:
            - generic [ref=e302]: Terms
          - listitem [ref=e303]:
            - generic [ref=e304]: Privacy
    - paragraph [ref=e306]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-sbs7lg-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-sbs7lg-card')

[dialog-dump findRow(e2e-cat-1-1-sbs7lg)] open dialogs: category-edit-dialog opened-by=verb-retire
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

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-edit-dialog')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-edit-dialog')

```

Context:

```text
          - listitem [ref=e124]:
            - generic [ref=e125]: About
          - listitem [ref=e126]:
            - generic [ref=e127]: How it works
      - navigation "Help" [ref=e128]:
        - heading "Help" [level=2] [ref=e129]
        - list [ref=e130]:
          - listitem [ref=e131]:
            - generic [ref=e132]: Safety
          - listitem [ref=e133]:
            - generic [ref=e134]: Contact
      - navigation "Legal" [ref=e135]:
        - heading "Legal" [level=2] [ref=e136]
        - list [ref=e137]:
          - listitem [ref=e138]:
            - generic [ref=e139]: Terms
          - listitem [ref=e140]:
            - generic [ref=e141]: Privacy
    - paragraph [ref=e143]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-14 catch-all law: never a parent, refused server-side, no move verbs

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-edit-dialog')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-edit-dialog')

```

Context:

```text
          - listitem [ref=e125]:
            - generic [ref=e126]: About
          - listitem [ref=e127]:
            - generic [ref=e128]: How it works
      - navigation "Help" [ref=e129]:
        - heading "Help" [level=2] [ref=e130]
        - list [ref=e131]:
          - listitem [ref=e132]:
            - generic [ref=e133]: Safety
          - listitem [ref=e134]:
            - generic [ref=e135]: Contact
      - navigation "Legal" [ref=e136]:
        - heading "Legal" [level=2] [ref=e137]
        - list [ref=e138]:
          - listitem [ref=e139]:
            - generic [ref=e140]: Terms
          - listitem [ref=e141]:
            - generic [ref=e142]: Privacy
    - paragraph [ref=e144]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-2-745ad1')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-2-745ad1')

[dialog-dump findRow(e2e-cat-4-2-745ad1)] open dialogs: category-edit-dialog opened-by=verb-retire
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

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-edit-dialog')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-edit-dialog')

```

Context:

```text
          - listitem [ref=e236]:
            - generic [ref=e237]: About
          - listitem [ref=e238]:
            - generic [ref=e239]: How it works
      - navigation "Help" [ref=e240]:
        - heading "Help" [level=2] [ref=e241]
        - list [ref=e242]:
          - listitem [ref=e243]:
            - generic [ref=e244]: Safety
          - listitem [ref=e245]:
            - generic [ref=e246]: Contact
      - navigation "Legal" [ref=e247]:
        - heading "Legal" [level=2] [ref=e248]
        - list [ref=e249]:
          - listitem [ref=e250]:
            - generic [ref=e251]: Terms
          - listitem [ref=e252]:
            - generic [ref=e253]: Privacy
    - paragraph [ref=e255]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-14 catch-all law: never a parent, refused server-side, no move verbs

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-edit-dialog')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-edit-dialog')

```

Context:

```text
          - listitem [ref=e237]:
            - generic [ref=e238]: About
          - listitem [ref=e239]:
            - generic [ref=e240]: How it works
      - navigation "Help" [ref=e241]:
        - heading "Help" [level=2] [ref=e242]
        - list [ref=e243]:
          - listitem [ref=e244]:
            - generic [ref=e245]: Safety
          - listitem [ref=e246]:
            - generic [ref=e247]: Contact
      - navigation "Legal" [ref=e248]:
        - heading "Legal" [level=2] [ref=e249]
        - list [ref=e250]:
          - listitem [ref=e251]:
            - generic [ref=e252]: Terms
          - listitem [ref=e253]:
            - generic [ref=e254]: Privacy
    - paragraph [ref=e256]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-0-6ikthz-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-changed-0-6ikthz-card')

[dialog-dump findRow(e2e-cat-changed-0-6ikthz)] open dialogs: category-edit-dialog opened-by=verb-retire
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

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-edit-dialog')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-edit-dialog')

```

Context:

```text
          - listitem [ref=e124]:
            - generic [ref=e125]: About
          - listitem [ref=e126]:
            - generic [ref=e127]: How it works
      - navigation "Help" [ref=e128]:
        - heading "Help" [level=2] [ref=e129]
        - list [ref=e130]:
          - listitem [ref=e131]:
            - generic [ref=e132]: Safety
          - listitem [ref=e133]:
            - generic [ref=e134]: Contact
      - navigation "Legal" [ref=e135]:
        - heading "Legal" [level=2] [ref=e136]
        - list [ref=e137]:
          - listitem [ref=e138]:
            - generic [ref=e139]: Terms
          - listitem [ref=e140]:
            - generic [ref=e141]: Privacy
    - paragraph [ref=e143]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-14 catch-all law: never a parent, refused server-side, no move verbs

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-edit-dialog')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-edit-dialog')

```

Context:

```text
          - listitem [ref=e125]:
            - generic [ref=e126]: About
          - listitem [ref=e127]:
            - generic [ref=e128]: How it works
      - navigation "Help" [ref=e129]:
        - heading "Help" [level=2] [ref=e130]
        - list [ref=e131]:
          - listitem [ref=e132]:
            - generic [ref=e133]: Safety
          - listitem [ref=e134]:
            - generic [ref=e135]: Contact
      - navigation "Legal" [ref=e136]:
        - heading "Legal" [level=2] [ref=e137]
        - list [ref=e138]:
          - listitem [ref=e139]:
            - generic [ref=e140]: Terms
          - listitem [ref=e141]:
            - generic [ref=e142]: Privacy
    - paragraph [ref=e144]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-changed-2-cbi9mm')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-changed-2-cbi9mm')

[dialog-dump findRow(e2e-cat-changed-2-cbi9mm)] open dialogs: category-edit-dialog opened-by=verb-retire
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

## admin-categories.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-edit-dialog')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-edit-dialog')

```

Context:

```text
          - listitem [ref=e236]:
            - generic [ref=e237]: About
          - listitem [ref=e238]:
            - generic [ref=e239]: How it works
      - navigation "Help" [ref=e240]:
        - heading "Help" [level=2] [ref=e241]
        - list [ref=e242]:
          - listitem [ref=e243]:
            - generic [ref=e244]: Safety
          - listitem [ref=e245]:
            - generic [ref=e246]: Contact
      - navigation "Legal" [ref=e247]:
        - heading "Legal" [level=2] [ref=e248]
        - list [ref=e249]:
          - listitem [ref=e250]:
            - generic [ref=e251]: Terms
          - listitem [ref=e252]:
            - generic [ref=e253]: Privacy
    - paragraph [ref=e255]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories.spec.ts › C2 categories console › CT-14 catch-all law: never a parent, refused server-side, no move verbs

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-edit-dialog')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-edit-dialog')

```

Context:

```text
          - listitem [ref=e237]:
            - generic [ref=e238]: About
          - listitem [ref=e239]:
            - generic [ref=e240]: How it works
      - navigation "Help" [ref=e241]:
        - heading "Help" [level=2] [ref=e242]
        - list [ref=e243]:
          - listitem [ref=e244]:
            - generic [ref=e245]: Safety
          - listitem [ref=e246]:
            - generic [ref=e247]: Contact
      - navigation "Legal" [ref=e248]:
        - heading "Legal" [level=2] [ref=e249]
        - list [ref=e250]:
          - listitem [ref=e251]:
            - generic [ref=e252]: Terms
          - listitem [ref=e253]:
            - generic [ref=e254]: Privacy
    - paragraph [ref=e256]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

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
