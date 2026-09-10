# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34438793853
- Commit: `0d6f5c883e3dcc5a67dde76dc6bb2d7bd1aa2e5c`
- Attempt: 1
- Written (UTC): 2026-09-10T05:00:16.961Z
- Passed: 550 · Skipped: 67 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-attributes.spec.ts › C3 attributes console › AT-42 toggling Required keeps the card rank and never loses the link

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-42 the toggle never reported Saved

expect(locator).toBeVisible() failed

Locator: getByTestId('category-attribute-required-saved-e2e_attr_h9o5z2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - AT-42 the toggle never reported Saved with timeout 20000ms
  - waiting for getByTestId('category-attribute-required-saved-e2e_attr_h9o5z2')

```

Context:

```text
              - checkbox "On card (1)" [checked] [ref=e19] [cursor=pointer]:
                - generic:
                  - img
              - text: On card (1)
          - generic [ref=e20]:
            - button "Move up" [disabled]
            - button "Move down" [disabled]
            - button "Unlink" [ref=e21] [cursor=pointer]
      - generic [ref=e22]:
        - textbox "Search the library" [ref=e23]: e2e_attr_h9o5z2
        - combobox "Add attribute" [ref=e24]:
          - option "Choose an attribute" [selected]
        - button "Add attribute" [disabled]
      - generic [ref=e25]:
        - paragraph [ref=e26]: Changes save as you go
        - button "Done" [ref=e27] [cursor=pointer]
    - button "Close" [ref=e28] [cursor=pointer]:
      - img [ref=e29]
      - generic [ref=e32]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-q51l18-card').getByText('Scheduled')
Expected: visible
Error: strict mode violation: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-q51l18-card').getByText('Scheduled') resolved to 2 elements:
    1) <div title="Scheduled: this category is not visible yet — it appears on its start date." aria-label="Scheduled: Scheduled: this category is not visible yet — it appears on its start date." class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Scheduled</div> aka getByTestId('category-row-e2e-cat-1-1-q51l18-card').getByLabel('Scheduled: Scheduled: this')
    2) <div title="Visibility is scheduled: the category appears only inside its date window." aria-label="Scheduled: Visibility is scheduled: the category appears only inside its date window." class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Scheduled</div> aka getByTestId('category-row-e2e-cat-1-1-q51l18-card').getByLabel('Scheduled: Visibility is')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-1-q51l18-card').getByText('Scheduled')

```

Context:

```text
          - listitem [ref=e146]:
            - generic [ref=e147]: About
          - listitem [ref=e148]:
            - generic [ref=e149]: How it works
      - navigation "Help" [ref=e150]:
        - heading "Help" [level=2] [ref=e151]
        - list [ref=e152]:
          - listitem [ref=e153]:
            - generic [ref=e154]: Safety
          - listitem [ref=e155]:
            - generic [ref=e156]: Contact
      - navigation "Legal" [ref=e157]:
        - heading "Legal" [level=2] [ref=e158]
        - list [ref=e159]:
          - listitem [ref=e160]:
            - generic [ref=e161]: Terms
          - listitem [ref=e162]:
            - generic [ref=e163]: Privacy
    - paragraph [ref=e165]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-42 toggling Required keeps the card rank and never loses the link

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-42 the toggle never reported Saved

expect(locator).toBeVisible() failed

Locator: getByTestId('category-attribute-required-saved-e2e_attr_6adp31')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - AT-42 the toggle never reported Saved with timeout 20000ms
  - waiting for getByTestId('category-attribute-required-saved-e2e_attr_6adp31')

```

Context:

```text
              - checkbox "On card (1)" [checked] [ref=e19] [cursor=pointer]:
                - generic:
                  - img
              - text: On card (1)
          - generic [ref=e20]:
            - button "Move up" [disabled]
            - button "Move down" [disabled]
            - button "Unlink" [ref=e21] [cursor=pointer]
      - generic [ref=e22]:
        - textbox "Search the library" [ref=e23]: e2e_attr_6adp31
        - combobox "Add attribute" [ref=e24]:
          - option "Choose an attribute" [selected]
        - button "Add attribute" [disabled]
      - generic [ref=e25]:
        - paragraph [ref=e26]: Changes save as you go
        - button "Done" [ref=e27] [cursor=pointer]
    - button "Close" [ref=e28] [cursor=pointer]:
      - img [ref=e29]
      - generic [ref=e32]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-4-2-hjb8w6').getByText('Scheduled')
Expected: visible
Error: strict mode violation: getByRole('table').getByTestId('category-row-e2e-cat-4-2-hjb8w6').getByText('Scheduled') resolved to 2 elements:
    1) <div title="Scheduled: this category is not visible yet — it appears on its start date." aria-label="Scheduled: Scheduled: this category is not visible yet — it appears on its start date." class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Scheduled</div> aka getByTestId('category-row-e2e-cat-4-2-hjb8w6').getByLabel('Scheduled: Scheduled: this')
    2) <div title="Visibility is scheduled: the category appears only inside its date window." aria-label="Scheduled: Visibility is scheduled: the category appears only inside its date window." class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">Scheduled</div> aka getByTestId('category-row-e2e-cat-4-2-hjb8w6').getByLabel('Scheduled: Visibility is')

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-4-2-hjb8w6').getByText('Scheduled')

```

Context:

```text
          - listitem [ref=e267]:
            - generic [ref=e268]: About
          - listitem [ref=e269]:
            - generic [ref=e270]: How it works
      - navigation "Help" [ref=e271]:
        - heading "Help" [level=2] [ref=e272]
        - list [ref=e273]:
          - listitem [ref=e274]:
            - generic [ref=e275]: Safety
          - listitem [ref=e276]:
            - generic [ref=e277]: Contact
      - navigation "Legal" [ref=e278]:
        - heading "Legal" [level=2] [ref=e279]
        - list [ref=e280]:
          - listitem [ref=e281]:
            - generic [ref=e282]: Terms
          - listitem [ref=e283]:
            - generic [ref=e284]: Privacy
    - paragraph [ref=e286]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
