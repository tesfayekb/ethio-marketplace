# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34180078784
- Commit: `922e53efec862ee65e6c7f5a6bdac283907ea23b`
- Attempt: 1
- Written (UTC): 2026-09-08T02:36:08.376Z
- Passed: 522 · Skipped: 67 · Failed: 5
- Gating failures: 5 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes.spec.ts › C3 attributes console › AT-20 a real-export round trip is a no-op — Error: AT-20 Discard wrote a batch

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: CT-18 Discard wrote a batch

expect(received).toHaveLength(expected)

Expected length: 0
Received length: 1
Received array:  [{"id": "b8a2131b-d783-40ee-9de3-c66c9065b2d2"}]
```

Context:

```text
          - listitem [ref=e784]:
            - generic [ref=e785]: About
          - listitem [ref=e786]:
            - generic [ref=e787]: How it works
      - navigation "Help" [ref=e788]:
        - heading "Help" [level=2] [ref=e789]
        - list [ref=e790]:
          - listitem [ref=e791]:
            - generic [ref=e792]: Safety
          - listitem [ref=e793]:
            - generic [ref=e794]: Contact
      - navigation "Legal" [ref=e795]:
        - heading "Legal" [level=2] [ref=e796]
        - list [ref=e797]:
          - listitem [ref=e798]:
            - generic [ref=e799]: Terms
          - listitem [ref=e800]:
            - generic [ref=e801]: Privacy
    - paragraph [ref=e803]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-26 imported Amharic names land pending, and undo removes them

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [{"key":"e2e-cat-1-4-nf25re","row":3,"file":"categories","reason":"unknownParent","values":{"category_path":"","category_slug":"e2e-cat-1-4-nf25re","parent_slug":"e2e-cat-1-4-b0bti6","name_en":"e2e-cat-1-4-nf25re","name_am":"ልጅ","display_order":"","is_active":"","allow_listings":"","is_catchall":"","price_enabled":"","expiry_days":"","icon":"","visible_from":"","visible_until":"","excluded_country_codes":"","secondary_parents":"","listing_count":"","origin_scope":"","action":"upsert"}},{"key":"e2e-cat-1-4-s0ahhh","row":4,"file":"categories","reason":"unknownParent","values":{"category_path":"","category_slug":"e2e-cat-1-4-s0ahhh","parent_slug":"e2e-cat-1-4-nf25re","name_en":"e2e-cat-1-4-s0ahhh","name_am":"","display_order":"","is_active":"","allow_listings":"","is_catchall":"","price_enabled":"","expiry_days":"","icon":"","visible_from":"","visible_until":"","excluded_country_codes":"","secondary_parents":"","listing_count":"","origin_scope":"","action":"upsert"}}]

expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 2

  Object {
-   "adds": 3,
-   "refusals": 0,
+   "adds": 1,
+   "refusals": 2,
  }
```

Context:

```text
          - listitem [ref=e785]:
            - generic [ref=e786]: About
          - listitem [ref=e787]:
            - generic [ref=e788]: How it works
      - navigation "Help" [ref=e789]:
        - heading "Help" [level=2] [ref=e790]
        - list [ref=e791]:
          - listitem [ref=e792]:
            - generic [ref=e793]: Safety
          - listitem [ref=e794]:
            - generic [ref=e795]: Contact
      - navigation "Legal" [ref=e796]:
        - heading "Legal" [level=2] [ref=e797]
        - list [ref=e798]:
          - listitem [ref=e799]:
            - generic [ref=e800]: Terms
          - listitem [ref=e801]:
            - generic [ref=e802]: Privacy
    - paragraph [ref=e804]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-26 imported Amharic names land pending, and undo removes them

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [{"key":"e2e-cat-4-2-v0ddlu","row":3,"file":"categories","reason":"unknownParent","values":{"category_path":"","category_slug":"e2e-cat-4-2-v0ddlu","parent_slug":"e2e-cat-4-2-h4m8g4","name_en":"e2e-cat-4-2-v0ddlu","name_am":"ልጅ","display_order":"","is_active":"","allow_listings":"","is_catchall":"","price_enabled":"","expiry_days":"","icon":"","visible_from":"","visible_until":"","excluded_country_codes":"","secondary_parents":"","listing_count":"","origin_scope":"","action":"upsert"}},{"key":"e2e-cat-4-2-v1spt7","row":4,"file":"categories","reason":"unknownParent","values":{"category_path":"","category_slug":"e2e-cat-4-2-v1spt7","parent_slug":"e2e-cat-4-2-v0ddlu","name_en":"e2e-cat-4-2-v1spt7","name_am":"","display_order":"","is_active":"","allow_listings":"","is_catchall":"","price_enabled":"","expiry_days":"","icon":"","visible_from":"","visible_until":"","excluded_country_codes":"","secondary_parents":"","listing_count":"","origin_scope":"","action":"upsert"}}]

expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 2

  Object {
-   "adds": 3,
-   "refusals": 0,
+   "adds": 1,
+   "refusals": 2,
  }
```

Context:

```text
          - listitem [ref=e1185]:
            - generic [ref=e1186]: About
          - listitem [ref=e1187]:
            - generic [ref=e1188]: How it works
      - navigation "Help" [ref=e1189]:
        - heading "Help" [level=2] [ref=e1190]
        - list [ref=e1191]:
          - listitem [ref=e1192]:
            - generic [ref=e1193]: Safety
          - listitem [ref=e1194]:
            - generic [ref=e1195]: Contact
      - navigation "Legal" [ref=e1196]:
        - heading "Legal" [level=2] [ref=e1197]
        - list [ref=e1198]:
          - listitem [ref=e1199]:
            - generic [ref=e1200]: Terms
          - listitem [ref=e1201]:
            - generic [ref=e1202]: Privacy
    - paragraph [ref=e1204]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-26 imported Amharic names land pending, and undo removes them

- Source: `changed`
- Project: `mobile-360`

```text
Error: [{"key":"e2e-cat-changed-0-11mxtl","row":3,"file":"categories","reason":"unknownParent","values":{"category_path":"","category_slug":"e2e-cat-changed-0-11mxtl","parent_slug":"e2e-cat-changed-0-itwlgc","name_en":"e2e-cat-changed-0-11mxtl","name_am":"ልጅ","display_order":"","is_active":"","allow_listings":"","is_catchall":"","price_enabled":"","expiry_days":"","icon":"","visible_from":"","visible_until":"","excluded_country_codes":"","secondary_parents":"","listing_count":"","origin_scope":"","action":"upsert"}},{"key":"e2e-cat-changed-0-ui0xhi","row":4,"file":"categories","reason":"unknownParent","values":{"category_path":"","category_slug":"e2e-cat-changed-0-ui0xhi","parent_slug":"e2e-cat-changed-0-11mxtl","name_en":"e2e-cat-changed-0-ui0xhi","name_am":"","display_order":"","is_active":"","allow_listings":"","is_catchall":"","price_enabled":"","expiry_days":"","icon":"","visible_from":"","visible_until":"","excluded_country_codes":"","secondary_parents":"","listing_count":"","origin_scope":"","action":"upsert"}}]

expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 2

  Object {
-   "adds": 3,
-   "refusals": 0,
+   "adds": 1,
+   "refusals": 2,
  }
```

Context:

```text
          - listitem [ref=e785]:
            - generic [ref=e786]: About
          - listitem [ref=e787]:
            - generic [ref=e788]: How it works
      - navigation "Help" [ref=e789]:
        - heading "Help" [level=2] [ref=e790]
        - list [ref=e791]:
          - listitem [ref=e792]:
            - generic [ref=e793]: Safety
          - listitem [ref=e794]:
            - generic [ref=e795]: Contact
      - navigation "Legal" [ref=e796]:
        - heading "Legal" [level=2] [ref=e797]
        - list [ref=e798]:
          - listitem [ref=e799]:
            - generic [ref=e800]: Terms
          - listitem [ref=e801]:
            - generic [ref=e802]: Privacy
    - paragraph [ref=e804]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-26 imported Amharic names land pending, and undo removes them

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [{"key":"e2e-cat-changed-1-wtgfq5","row":3,"file":"categories","reason":"unknownParent","values":{"category_path":"","category_slug":"e2e-cat-changed-1-wtgfq5","parent_slug":"e2e-cat-changed-1-vf1ksp","name_en":"e2e-cat-changed-1-wtgfq5","name_am":"ልጅ","display_order":"","is_active":"","allow_listings":"","is_catchall":"","price_enabled":"","expiry_days":"","icon":"","visible_from":"","visible_until":"","excluded_country_codes":"","secondary_parents":"","listing_count":"","origin_scope":"","action":"upsert"}},{"key":"e2e-cat-changed-1-n01faa","row":4,"file":"categories","reason":"unknownParent","values":{"category_path":"","category_slug":"e2e-cat-changed-1-n01faa","parent_slug":"e2e-cat-changed-1-wtgfq5","name_en":"e2e-cat-changed-1-n01faa","name_am":"","display_order":"","is_active":"","allow_listings":"","is_catchall":"","price_enabled":"","expiry_days":"","icon":"","visible_from":"","visible_until":"","excluded_country_codes":"","secondary_parents":"","listing_count":"","origin_scope":"","action":"upsert"}}]

expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 2

  Object {
-   "adds": 3,
-   "refusals": 0,
+   "adds": 1,
+   "refusals": 2,
  }
```

Context:

```text
          - listitem [ref=e1185]:
            - generic [ref=e1186]: About
          - listitem [ref=e1187]:
            - generic [ref=e1188]: How it works
      - navigation "Help" [ref=e1189]:
        - heading "Help" [level=2] [ref=e1190]
        - list [ref=e1191]:
          - listitem [ref=e1192]:
            - generic [ref=e1193]: Safety
          - listitem [ref=e1194]:
            - generic [ref=e1195]: Contact
      - navigation "Legal" [ref=e1196]:
        - heading "Legal" [level=2] [ref=e1197]
        - list [ref=e1198]:
          - listitem [ref=e1199]:
            - generic [ref=e1200]: Terms
          - listitem [ref=e1201]:
            - generic [ref=e1202]: Privacy
    - paragraph [ref=e1204]: © 2026 ethio.com — All rights reserved.
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

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader ×2
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor ×2
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile ×2
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
