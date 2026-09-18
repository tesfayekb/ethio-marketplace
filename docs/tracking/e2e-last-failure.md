# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35361098072
- Commit: `2b91614ca13a9e2332f775c36f9f513643843707`
- Attempt: 1
- Written (UTC): 2026-09-18T15:26:45.225Z
- Passed: 792 · Skipped: 70 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): shard 1, shard 2, shard 4, shard 5
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live — Error: reachStep7: the region level never rendered

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 36 user(s) owned by process 35361098072-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 70 user(s) owned by process 35361098072-2
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 33 user(s) owned by process 35361098072-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 67 user(s) owned by process 35361098072-5
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-import-counts')
Expected: visible
Timeout: 120000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 120000ms
  - waiting for getByTestId('category-import-counts')

```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import categories" [ref=e2]:
    - heading "Import categories" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import categories
      - paragraph [ref=e6]: Choose the categories file you exported. Nothing is written until you preview it and confirm.
      - paragraph [ref=e7]: "Columns marked “(read-only)” are worked out for you: you can edit them in the file, but they are never applied."
      - generic [ref=e9]:
        - generic [ref=e10]: Categories file
        - button "Categories file" [ref=e11]
        - generic [ref=e12]:
          - button "Choose Categories file…" [ref=e13] [cursor=pointer]
          - generic [ref=e14]: categories.csv
      - button "Preview changes" [ref=e15] [cursor=pointer]
      - alert [ref=e16]: The column headings do not match the export.
      - button "Discard" [ref=e18] [cursor=pointer]
    - button "Close" [ref=e19] [cursor=pointer]:
      - img [ref=e20]
      - generic [ref=e23]: Close
```
```

## import-security.spec.ts › IMPORT-GATE categories › IG-2 categories: dangerous cells refuse their own row and name the reason

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: IG-2 (k) {"items":[],"counts":{"adds":0,"changes":0,"deletes":0,"retires":0,"refusals":1,"unchanged":0,"reactivations":0},"ignored":[],"refusals":[{"key":"e2e-cat-l3njh0","row":2,"file":"categories","detail":"30","reason":"badCapability","values":{"category_path":"","category_slug":"e2e-cat-l3njh0","parent_slug":"","name_en":"e2e-cat-l3njh0","name_am":"","display_order":"10","is_active":"true","allow_listings":"true","is_catchall":"","price_enabled":"true","capabilities":"30","default_price_period":"","price_period_locked":"","expiry_days":"","icon":"","visible_from":"","visible_until":"","excluded_country_codes":"","secondary_parents":"","listing_count":"","origin_scope":"","detail":"30"}}],"digest":"943254ecc92ff045a68e3c57ed8518c79aef98a94c81bd5a2dcf59ffdc8f040f"}

expect(received).toBeTruthy()

Received: undefined
```

Context:

```text
          - listitem [ref=e792]:
            - generic [ref=e793]: About
          - listitem [ref=e794]:
            - generic [ref=e795]: How it works
      - navigation "Help" [ref=e796]:
        - heading "Help" [level=2] [ref=e797]
        - list [ref=e798]:
          - listitem [ref=e799]:
            - generic [ref=e800]: Safety
          - listitem [ref=e801]:
            - generic [ref=e802]: Contact
      - navigation "Legal" [ref=e803]:
        - heading "Legal" [level=2] [ref=e804]
        - list [ref=e805]:
          - listitem [ref=e806]:
            - generic [ref=e807]: Terms
          - listitem [ref=e808]:
            - generic [ref=e809]: Privacy
    - paragraph [ref=e811]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-import-counts')
Expected: visible
Timeout: 120000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 120000ms
  - waiting for getByTestId('category-import-counts')

```

Context:

```text
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import categories" [ref=e2]:
    - heading "Import categories" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import categories
      - paragraph [ref=e6]: Choose the categories file you exported. Nothing is written until you preview it and confirm.
      - paragraph [ref=e7]: "Columns marked “(read-only)” are worked out for you: you can edit them in the file, but they are never applied."
      - generic [ref=e9]:
        - generic [ref=e10]: Categories file
        - button "Categories file" [ref=e11]
        - generic [ref=e12]:
          - button "Choose Categories file…" [ref=e13] [cursor=pointer]
          - generic [ref=e14]: categories.csv
      - button "Preview changes" [ref=e15] [cursor=pointer]
      - alert [ref=e16]: The column headings do not match the export.
      - button "Discard" [ref=e18] [cursor=pointer]
    - button "Close" [ref=e19] [cursor=pointer]:
      - img [ref=e20]
      - generic [ref=e23]: Close
```
```

## import-security.spec.ts › IMPORT-GATE categories › IG-2 categories: dangerous cells refuse their own row and name the reason

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: IG-2 (k) {"items":[],"counts":{"adds":0,"changes":0,"deletes":0,"retires":0,"refusals":1,"unchanged":0,"reactivations":0},"ignored":[],"refusals":[{"key":"e2e-cat-7ffoot","row":2,"file":"categories","detail":"30","reason":"badCapability","values":{"category_path":"","category_slug":"e2e-cat-7ffoot","parent_slug":"","name_en":"e2e-cat-7ffoot","name_am":"","display_order":"10","is_active":"true","allow_listings":"true","is_catchall":"","price_enabled":"true","capabilities":"30","default_price_period":"","price_period_locked":"","expiry_days":"","icon":"","visible_from":"","visible_until":"","excluded_country_codes":"","secondary_parents":"","listing_count":"","origin_scope":"","detail":"30"}}],"digest":"bcdc67751db518b8ca0ac5cc0a5731efbfb579ac2c49d337c2fb1536cfc7dc05"}

expect(received).toBeTruthy()

Received: undefined
```

Context:

```text
          - listitem [ref=e1187]:
            - generic [ref=e1188]: About
          - listitem [ref=e1189]:
            - generic [ref=e1190]: How it works
      - navigation "Help" [ref=e1191]:
        - heading "Help" [level=2] [ref=e1192]
        - list [ref=e1193]:
          - listitem [ref=e1194]:
            - generic [ref=e1195]: Safety
          - listitem [ref=e1196]:
            - generic [ref=e1197]: Contact
      - navigation "Legal" [ref=e1198]:
        - heading "Legal" [level=2] [ref=e1199]
        - list [ref=e1200]:
          - listitem [ref=e1201]:
            - generic [ref=e1202]: Terms
          - listitem [ref=e1203]:
            - generic [ref=e1204]: Privacy
    - paragraph [ref=e1206]: © 2026 ethio.com — All rights reserved.
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
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request) ×2
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 (Bad Request) ×2
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).
