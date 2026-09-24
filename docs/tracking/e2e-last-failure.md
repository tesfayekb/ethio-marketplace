# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35981525989
- Commit: `f98455b40501e5123e813e0da8046c812c98b8cd`
- Attempt: 2
- Written (UTC): 2026-09-24T10:02:43.762Z
- Passed: 796 · Skipped: 78 · Failed: 174
- Gating failures: 174 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 50
- Post-test errors (DEC-059, non-gating): smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · auth-signout.spec.ts › U0k session policy › SP-1 idle: the warning appears, then the session is hard-reset — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › app shell › the feed body is centred with equal left and right gutters — Error: [e2e:shell] seeding the fence category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes.spec.ts › C3 attributes console › AT-30 an unlinked delete undoes and a linked delete names its categories — TypeError: Cannot read properties of null (reading 'id')
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes.spec.ts › C3 attributes console › AT-39 empty read-only cells are never reported as edits — TypeError: Cannot read properties of null (reading 'id')
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes.spec.ts › C3 attributes console › AT-62 an exported link's condition and order re-import as unchanged — Error: AT-62 seeding the category: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes.spec.ts › C3 attributes console › AT-61 the import dialog previews and confirms a links-only file — TypeError: Cannot read properties of null (reading 'id')
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-console.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-console.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-20 action=retire and action=reactivate walk the state machine — Error: [e2e:cat-ie] seeding e2e-cat-1-58-pwbtqi failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036) — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-9 the upload dial refuses once the seller's hourly ceiling is reached — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar — Error: LY-6: the sticky action bar covers the open currency list
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-31 the market select waits for the prefill chain and never preselects — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard.spec.ts › POSTING WIZARD › PW-33 a further place is added under a place already listed, and the plan refuses the second — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes.spec.ts › POSTING ROUTES › PR-2 an incomplete step is the door's own refusal, at status 200 — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes.spec.ts › C3 attributes console › AT-10 Used by names the category the attribute was assigned to (DB truth) — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes.spec.ts › C3 attributes console › AT-11 remove from category unlinks it and the chip disappears (DB truth) — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes.spec.ts › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone — Error: {"error":"server error","message":"duplicate key value violates unique constraint \"catalog_find_terms_pkey\"","detail":"Key (term_norm)=(scooter) already exists."}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes.spec.ts › C3 attributes console › AT-60 a links file reorders three links and the posting read follows — TypeError: Cannot read properties of null (reading 'id')
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes.spec.ts › C3 attributes console › AT-40 the import dialog reaches Applied and undoes — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes.spec.ts › C3 attributes console › AT-58 a rank swap within one category imports through the route — Error: AT-58 the swap undo failed: {"error":"server error","message":"duplicate key value violates unique constraint \"catalog_find_terms_pkey\"","detail":"Key (term_norm)=(bentley) already exists."}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-images.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them — Error: expect(locator).toBeHidden() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › C2 categories console › CT-16 return path: closing a secondary dialog returns to the open editor — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-21 unknown parents, cycles, catch-alls and formulas are refused — Error: [e2e:cat-ie] seeding e2e-cat-4-61-qitkyw failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-28 the import dialog reaches Applied and undoes — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-6 another seller's listing is a 403 — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-10 a refusal is final and never retried; a 5xx is retried once, then handed over — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard.spec.ts › POSTING WIZARD › PW-8 an unreachable save keeps the answers, says so, and retries — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard.spec.ts › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step — Error: [e2e:c1b] linking the spec set failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard.spec.ts › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray — Error: [e2e:d26] linking the colour set failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-27 the mobile strip walks back to a step already done, and no further — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray — Error: [e2e:d26] linking the colour set failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-40 removing the pin clears all four columns — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides — Error: [e2e:c1b] destroying the spec set failed: update or delete on table "attributes" violates foreign key constraint "category_attribute_links_attribute_id_fkey" on table "category_attribute_links"
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-50 the specifications keep display order and hide only the trailing extras — Error: [e2e:inc269] linking the phone set failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-8 an unreachable save keeps the answers, says so, and retries — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard.spec.ts › POSTING WIZARD › PW-49 a prefill-only fact keeps its input while a settled one does not — Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
- FLAKY (passed on retry) · `mobile-360` · source `changed` · posting-routes.spec.ts › POSTING ROUTES › PR-9 catalog finder is bounded, multilingual and rate-limited — Error: [e2e:a2c] rebuilding the finder index failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 43 user(s) owned by process 35981525989-smoke
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 41 user(s) owned by process 35981525989-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 106 user(s) owned by process 35981525989-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 97 user(s) owned by process 35981525989-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 36 user(s) owned by process 35981525989-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 159 user(s) owned by process 35981525989-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 23 user(s) owned by process 35981525989-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 159 user(s) owned by process 35981525989-changed
```

## shell.spec.ts › app shell › the feed body is centred with equal left and right gutters

- Source: `smoke`
- Project: `mobile-360`

```text
Error: [e2e:shell] seeding the fence category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `shell-app-shell-the-feed-body-is-centred-with-equal-left-and-right-gutters-mobile-360`

## admin-attributes.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [dialog-dump AT-3 link never landed] open dialogs: category-attributes-dialog opened-by=editor-attributes

expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
    - heading "Attributes — e2e-cat-1-0-p71yxd" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Attributes — e2e-cat-1-0-p71yxd
      - paragraph [ref=e6]: No attribute is shown on the listing card yet.
      - status [ref=e7]: Pick at least two attributes to show on listing cards.
      - paragraph [ref=e8]: No attribute is linked to this category yet.
      - generic [ref=e9]:
        - textbox "Search the library" [ref=e10]: e2e_attr_cgl0cc
        - combobox "Add attribute" [ref=e11]:
          - option "Choose an attribute"
          - option "e2e_attr_cgl0cc (e2e_attr_cgl0cc)" [selected]
        - button "Add attribute" [ref=e12] [cursor=pointer]
      - alert [ref=e13]: duplicate key value violates unique constraint "catalog_find_terms_pkey"
      - generic [ref=e14]:
        - paragraph [ref=e15]: Changes save as you go
        - button "Done" [ref=e16] [cursor=pointer]
    - button "Close" [ref=e17] [cursor=pointer]:
      - img [ref=e18]
      - generic [ref=e21]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-editor-image')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-editor-image')

```

Context:

```text
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - alert [ref=e50]: The change could not be saved.
      - generic [ref=e51]:
        - button "Cancel" [ref=e52] [cursor=pointer]
        - button "Save" [ref=e53] [cursor=pointer]
    - button "Close" [ref=e54] [cursor=pointer]:
      - img [ref=e55]
      - generic [ref=e58]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-editor-image')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-editor-image')

```

Context:

```text
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - alert [ref=e50]: The change could not be saved.
      - generic [ref=e51]:
        - button "Cancel" [ref=e52] [cursor=pointer]
        - button "Save" [ref=e53] [cursor=pointer]
    - button "Close" [ref=e54] [cursor=pointer]:
      - img [ref=e55]
      - generic [ref=e58]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-7 filter: a category narrows the library to its linked attributes (DB truth)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
```

Context: context file not found for `admin-attributes-C3-attributes-console-AT-7-filter-a-category-narrows-the-library-to-its-linked-attributes-DB-truth-mobile-360`

## admin-attributes.spec.ts › C3 attributes console › AT-8 assign from the library: the link lands and Used by updates

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-editor-image')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-editor-image')

```

Context:

```text
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "XA — E2E-Scratch-XA-3-13" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: XA — E2E-Scratch-XA-3-13
          - generic [ref=e46]:
            - checkbox "ET — Ethiopia" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: ET — Ethiopia
          - generic [ref=e49]:
            - checkbox "US — United States" [ref=e50] [cursor=pointer]
            - generic [ref=e51]: US — United States
        - paragraph [ref=e52]: The category stays hidden in every country you tick; you can change this later.
      - alert [ref=e53]: The change could not be saved.
      - generic [ref=e54]:
        - button "Cancel" [ref=e55] [cursor=pointer]
        - button "Save" [ref=e56] [cursor=pointer]
    - button "Close" [ref=e57] [cursor=pointer]:
      - img [ref=e58]
      - generic [ref=e61]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-11 remove from category unlinks it and the chip disappears (DB truth)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-editor-image')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-editor-image')

```

Context: context file not found for `admin-attributes-C3-attributes-console-AT-11-remove-from-category-unlinks-it-and-the-chip-disappears-DB-truth-mobile-360`

## admin-attributes.spec.ts › C3 attributes console › AT-12 an approved am attribute label renders in am and falls back to EN

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-12 label seed failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e98]:
            - generic [ref=e99]: About
          - listitem [ref=e100]:
            - generic [ref=e101]: How it works
      - navigation "Help" [ref=e102]:
        - heading "Help" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Safety
          - listitem [ref=e107]:
            - generic [ref=e108]: Contact
      - navigation "Legal" [ref=e109]:
        - heading "Legal" [level=2] [ref=e110]
        - list [ref=e111]:
          - listitem [ref=e112]:
            - generic [ref=e113]: Terms
          - listitem [ref=e114]:
            - generic [ref=e115]: Privacy
    - paragraph [ref=e117]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-17 an inherited row names its origin and clears the child's card flag

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: inheritance categories failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e98]:
            - generic [ref=e99]: About
          - listitem [ref=e100]:
            - generic [ref=e101]: How it works
      - navigation "Help" [ref=e102]:
        - heading "Help" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Safety
          - listitem [ref=e107]:
            - generic [ref=e108]: Contact
      - navigation "Legal" [ref=e109]:
        - heading "Legal" [level=2] [ref=e110]
        - list [ref=e111]:
          - listitem [ref=e112]:
            - generic [ref=e113]: Terms
          - listitem [ref=e114]:
            - generic [ref=e115]: Privacy
    - paragraph [ref=e117]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: inheritance links failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e98]:
            - generic [ref=e99]: About
          - listitem [ref=e100]:
            - generic [ref=e101]: How it works
      - navigation "Help" [ref=e102]:
        - heading "Help" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Safety
          - listitem [ref=e107]:
            - generic [ref=e108]: Contact
      - navigation "Legal" [ref=e109]:
        - heading "Legal" [level=2] [ref=e110]
        - list [ref=e111]:
          - listitem [ref=e112]:
            - generic [ref=e113]: Terms
          - listitem [ref=e114]:
            - generic [ref=e115]: Privacy
    - paragraph [ref=e117]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-36 a secondary parent confers nothing, a primary parent confers

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-36 links failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e98]:
            - generic [ref=e99]: About
          - listitem [ref=e100]:
            - generic [ref=e101]: How it works
      - navigation "Help" [ref=e102]:
        - heading "Help" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Safety
          - listitem [ref=e107]:
            - generic [ref=e108]: Contact
      - navigation "Legal" [ref=e109]:
        - heading "Legal" [level=2] [ref=e110]
        - list [ref=e111]:
          - listitem [ref=e112]:
            - generic [ref=e113]: Terms
          - listitem [ref=e114]:
            - generic [ref=e115]: Privacy
    - paragraph [ref=e117]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-21 a changed link commits and the batch undoes

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0
```

Context:

```text
          - listitem [ref=e584]:
            - generic [ref=e585]: About
          - listitem [ref=e586]:
            - generic [ref=e587]: How it works
      - navigation "Help" [ref=e588]:
        - heading "Help" [level=2] [ref=e589]
        - list [ref=e590]:
          - listitem [ref=e591]:
            - generic [ref=e592]: Safety
          - listitem [ref=e593]:
            - generic [ref=e594]: Contact
      - navigation "Legal" [ref=e595]:
        - heading "Legal" [level=2] [ref=e596]
        - list [ref=e597]:
          - listitem [ref=e598]:
            - generic [ref=e599]: Terms
          - listitem [ref=e600]:
            - generic [ref=e601]: Privacy
    - paragraph [ref=e603]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-46 a direct card rank equal to an inherited rank is refused by the import and by the door, naming both origins

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-46 categories failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e98]:
            - generic [ref=e99]: About
          - listitem [ref=e100]:
            - generic [ref=e101]: How it works
      - navigation "Help" [ref=e102]:
        - heading "Help" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Safety
          - listitem [ref=e107]:
            - generic [ref=e108]: Contact
      - navigation "Legal" [ref=e109]:
        - heading "Legal" [level=2] [ref=e110]
        - list [ref=e111]:
          - listitem [ref=e112]:
            - generic [ref=e113]: Terms
          - listitem [ref=e114]:
            - generic [ref=e115]: Privacy
    - paragraph [ref=e117]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-22 malformed files and dangerous cells are refused

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-22 category: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e584]:
            - generic [ref=e585]: About
          - listitem [ref=e586]:
            - generic [ref=e587]: How it works
      - navigation "Help" [ref=e588]:
        - heading "Help" [level=2] [ref=e589]
        - list [ref=e590]:
          - listitem [ref=e591]:
            - generic [ref=e592]: Safety
          - listitem [ref=e593]:
            - generic [ref=e594]: Contact
      - navigation "Legal" [ref=e595]:
        - heading "Legal" [level=2] [ref=e596]
        - list [ref=e597]:
          - listitem [ref=e598]:
            - generic [ref=e599]: Terms
          - listitem [ref=e600]:
            - generic [ref=e601]: Privacy
    - paragraph [ref=e603]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-21 a links file sets the allowed options and the default, and the export echoes both

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"error":"server error","message":"duplicate key value violates unique constraint \"catalog_find_terms_pkey\"","detail":"Key (term_norm)=(scooter) already exists."}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e584]:
            - generic [ref=e585]: About
          - listitem [ref=e586]:
            - generic [ref=e587]: How it works
      - navigation "Help" [ref=e588]:
        - heading "Help" [level=2] [ref=e589]
        - list [ref=e590]:
          - listitem [ref=e591]:
            - generic [ref=e592]: Safety
          - listitem [ref=e593]:
            - generic [ref=e594]: Contact
      - navigation "Legal" [ref=e595]:
        - heading "Legal" [level=2] [ref=e596]
        - list [ref=e597]:
          - listitem [ref=e598]:
            - generic [ref=e599]: Terms
          - listitem [ref=e600]:
            - generic [ref=e601]: Privacy
    - paragraph [ref=e603]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-27 an edited read-only cell is ignored while the row's real change applies

- Source: `shard 1`
- Project: `mobile-360`

```text
TypeError: Cannot read properties of null (reading 'id')
```

Context:

```text
          - listitem [ref=e98]:
            - generic [ref=e99]: About
          - listitem [ref=e100]:
            - generic [ref=e101]: How it works
      - navigation "Help" [ref=e102]:
        - heading "Help" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Safety
          - listitem [ref=e107]:
            - generic [ref=e108]: Contact
      - navigation "Legal" [ref=e109]:
        - heading "Legal" [level=2] [ref=e110]
        - list [ref=e111]:
          - listitem [ref=e112]:
            - generic [ref=e113]: Terms
          - listitem [ref=e114]:
            - generic [ref=e115]: Privacy
    - paragraph [ref=e117]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-29 the scratch category was not created

expect(received).toBeTruthy()

Received: null
```

Context:

```text
          - listitem [ref=e98]:
            - generic [ref=e99]: About
          - listitem [ref=e100]:
            - generic [ref=e101]: How it works
      - navigation "Help" [ref=e102]:
        - heading "Help" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Safety
          - listitem [ref=e107]:
            - generic [ref=e108]: Contact
      - navigation "Legal" [ref=e109]:
        - heading "Legal" [level=2] [ref=e110]
        - list [ref=e111]:
          - listitem [ref=e112]:
            - generic [ref=e113]: Terms
          - listitem [ref=e114]:
            - generic [ref=e115]: Privacy
    - paragraph [ref=e117]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-37 a delete after the file's own unlink is accepted and undone

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"error":"server error","message":"duplicate key value violates unique constraint \"catalog_find_terms_pkey\"","detail":"Key (term_norm)=(scooter) already exists."}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e584]:
            - generic [ref=e585]: About
          - listitem [ref=e586]:
            - generic [ref=e587]: How it works
      - navigation "Help" [ref=e588]:
        - heading "Help" [level=2] [ref=e589]
        - list [ref=e590]:
          - listitem [ref=e591]:
            - generic [ref=e592]: Safety
          - listitem [ref=e593]:
            - generic [ref=e594]: Contact
      - navigation "Legal" [ref=e595]:
        - heading "Legal" [level=2] [ref=e596]
        - list [ref=e597]:
          - listitem [ref=e598]:
            - generic [ref=e599]: Terms
          - listitem [ref=e600]:
            - generic [ref=e601]: Privacy
    - paragraph [ref=e603]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-38 an inherited echo does not collide with a direct row

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-38 categories failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e98]:
            - generic [ref=e99]: About
          - listitem [ref=e100]:
            - generic [ref=e101]: How it works
      - navigation "Help" [ref=e102]:
        - heading "Help" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Safety
          - listitem [ref=e107]:
            - generic [ref=e108]: Contact
      - navigation "Legal" [ref=e109]:
        - heading "Legal" [level=2] [ref=e110]
        - list [ref=e111]:
          - listitem [ref=e112]:
            - generic [ref=e113]: Terms
          - listitem [ref=e114]:
            - generic [ref=e115]: Privacy
    - paragraph [ref=e117]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-42 toggling Required keeps the card rank and never loses the link

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
    - heading "Attributes — e2e-cat-1-64-m5nkaj" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Attributes — e2e-cat-1-64-m5nkaj
      - paragraph [ref=e6]: No attribute is shown on the listing card yet.
      - status [ref=e7]: Pick at least two attributes to show on listing cards.
      - paragraph [ref=e8]: No attribute is linked to this category yet.
      - generic [ref=e9]:
        - textbox "Search the library" [ref=e10]: e2e_attr_sxr3uv
        - combobox "Add attribute" [ref=e11]:
          - option "Choose an attribute"
          - option "e2e_attr_sxr3uv (e2e_attr_sxr3uv)" [selected]
        - button "Add attribute" [ref=e12] [cursor=pointer]
      - alert [ref=e13]: duplicate key value violates unique constraint "catalog_find_terms_pkey"
      - generic [ref=e14]:
        - paragraph [ref=e15]: Changes save as you go
        - button "Done" [ref=e16] [cursor=pointer]
    - button "Close" [ref=e17] [cursor=pointer]:
      - img [ref=e18]
      - generic [ref=e21]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-60 a links file reorders three links and the posting read follows

- Source: `shard 1`
- Project: `mobile-360`

```text
TypeError: Cannot read properties of null (reading 'id')
```

Context:

```text
          - listitem [ref=e98]:
            - generic [ref=e99]: About
          - listitem [ref=e100]:
            - generic [ref=e101]: How it works
      - navigation "Help" [ref=e102]:
        - heading "Help" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Safety
          - listitem [ref=e107]:
            - generic [ref=e108]: Contact
      - navigation "Legal" [ref=e109]:
        - heading "Legal" [level=2] [ref=e110]
        - list [ref=e111]:
          - listitem [ref=e112]:
            - generic [ref=e113]: Terms
          - listitem [ref=e114]:
            - generic [ref=e115]: Privacy
    - paragraph [ref=e117]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-31 the roster filter groups children under their parent, marks retired rows, and scopes the roster to a subtree

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:ct-31] retiring failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `admin-categories-console-C2-categories-console-CT-31-the-roster-filter-groups-children-under-their-parent-marks-retired-rows-and-scopes-the-roster-to-a-subtree-mobile-360`

## admin-categories-console.spec.ts › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on CT-3: categories.name_en = "E2E renamed e2e-cat-1-5-x0p0sm"

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
```

Context:

```text
        - textbox "Listing expiry (days)" [ref=e41]:
          - /placeholder: No expiry
      - generic [ref=e42]:
        - checkbox "Accepts listings" [checked] [ref=e43] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e44]:
        - checkbox "Price field enabled" [checked] [ref=e45] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - alert [ref=e46]: The change could not be saved.
      - generic [ref=e47]:
        - button "Cancel" [ref=e48] [cursor=pointer]
        - button "Save" [ref=e49] [cursor=pointer]
    - button "Close" [ref=e50] [cursor=pointer]:
      - img [ref=e51]
      - generic [ref=e54]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-editor-image')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-editor-image')

```

Context:

```text
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "XK — E2E-Scratch-XK-3-13" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: XK — E2E-Scratch-XK-3-13
          - generic [ref=e46]:
            - checkbox "ET — Ethiopia" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: ET — Ethiopia
          - generic [ref=e49]:
            - checkbox "US — United States" [ref=e50] [cursor=pointer]
            - generic [ref=e51]: US — United States
        - paragraph [ref=e52]: The category stays hidden in every country you tick; you can change this later.
      - alert [ref=e53]: The change could not be saved.
      - generic [ref=e54]:
        - button "Cancel" [ref=e55] [cursor=pointer]
        - button "Save" [ref=e56] [cursor=pointer]
    - button "Close" [ref=e57] [cursor=pointer]:
      - img [ref=e58]
      - generic [ref=e61]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:ct-32] seeding e2e-cat-1-19-dswf2a-r failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `admin-categories-console-C2-categories-console-CT-32-a-reactivate-row-carries-its-cell-changes-through-commit-and-undo-and-an-empty-root-deletes-and-undoes-mobile-360`

## admin-categories-images.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Category image" [ref=e2]:
    - heading "Category image" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Category image
      - generic [ref=e6]:
        - paragraph [ref=e7]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
        - paragraph [ref=e8]: No image yet for this category.
        - alert [ref=e9]: "Image generation failed: server error"
        - button "Generate image" [ref=e10] [cursor=pointer]
      - button "Close" [ref=e12] [cursor=pointer]
    - button "Close" [ref=e13] [cursor=pointer]:
      - img [ref=e14]
      - generic [ref=e17]: Close
```
```

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: CT-12 a retired row offers Reactivate — [e2e:c2] lifecycle e2e-cat-1-27-fflbsu: dom={"dialogs":["category-edit-dialog","category-verb-bar","category-dialog-cancel"],"openDialogs":1} db={"id":"45d6c32f-07ac-41ab-bf4a-5641728efc50","slug":"e2e-cat-1-27-fflbsu","is_active":true} clientErrors=[]
```

Context:

```text
        - generic [ref=e40]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e41]:
          - /placeholder: No expiry
      - generic [ref=e42]:
        - checkbox "Accepts listings" [checked] [ref=e43] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e44]:
        - checkbox "Price field enabled" [checked] [ref=e45] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e46]:
        - button "Cancel" [ref=e47] [cursor=pointer]
        - button "Save" [ref=e48] [cursor=pointer]
    - button "Close" [ref=e49] [cursor=pointer]:
      - img [ref=e50]
      - generic [ref=e53]: Close
```
```

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-editor-image')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-editor-image')

```

Context:

```text
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - alert [ref=e50]: The change could not be saved.
      - generic [ref=e51]:
        - button "Cancel" [ref=e52] [cursor=pointer]
        - button "Save" [ref=e53] [cursor=pointer]
    - button "Close" [ref=e54] [cursor=pointer]:
      - img [ref=e55]
      - generic [ref=e58]: Close
```
```

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-15 reorder: Move up flips the order with no step-up, catch-all last

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:c2] seeding e2e-cat-1-35-4fq7kb failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `admin-categories-lifecycle-C2-categories-console-CT-15-reorder-Move-up-flips-the-order-with-no-step-up-catch-all-last-mobile-360`

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:c5l] seeding e2e-cat-1-39-qucp20 failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e98]:
            - generic [ref=e99]: About
          - listitem [ref=e100]:
            - generic [ref=e101]: How it works
      - navigation "Help" [ref=e102]:
        - heading "Help" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Safety
          - listitem [ref=e107]:
            - generic [ref=e108]: Contact
      - navigation "Legal" [ref=e109]:
        - heading "Legal" [level=2] [ref=e110]
        - list [ref=e111]:
          - listitem [ref=e112]:
            - generic [ref=e113]: Terms
          - listitem [ref=e114]:
            - generic [ref=e115]: Privacy
    - paragraph [ref=e117]: © 2026 ethio.com — All rights reserved.
```
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
      - alert [ref=e16]: The import could not be completed.
      - paragraph [ref=e17]: "Reason: canceling statement due to statement timeout"
      - button "Discard" [ref=e19] [cursor=pointer]
    - button "Close" [ref=e20] [cursor=pointer]:
      - img [ref=e21]
      - generic [ref=e24]: Close
```
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-19 a create and a rename commit through the doors and undo

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:cat-ie] seeding e2e-cat-1-56-mbxaw1 failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e98]:
            - generic [ref=e99]: About
          - listitem [ref=e100]:
            - generic [ref=e101]: How it works
      - navigation "Help" [ref=e102]:
        - heading "Help" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Safety
          - listitem [ref=e107]:
            - generic [ref=e108]: Contact
      - navigation "Legal" [ref=e109]:
        - heading "Legal" [level=2] [ref=e110]
        - list [ref=e111]:
          - listitem [ref=e112]:
            - generic [ref=e113]: Terms
          - listitem [ref=e114]:
            - generic [ref=e115]: Privacy
    - paragraph [ref=e117]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-24 a slug rename is refused by name, and a name edit is one change

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:cat-ie] seeding e2e-cat-1-59-ld0mj0-g failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
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

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-26 imported Amharic names land pending, and undo removes them

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"error":"server error","message":"duplicate key value violates unique constraint \"catalog_find_terms_pkey\"","detail":"Key (term_norm)=(scooter) already exists."}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
```

Context:

```text
          - listitem [ref=e783]:
            - generic [ref=e784]: About
          - listitem [ref=e785]:
            - generic [ref=e786]: How it works
      - navigation "Help" [ref=e787]:
        - heading "Help" [level=2] [ref=e788]
        - list [ref=e789]:
          - listitem [ref=e790]:
            - generic [ref=e791]: Safety
          - listitem [ref=e792]:
            - generic [ref=e793]: Contact
      - navigation "Legal" [ref=e794]:
        - heading "Legal" [level=2] [ref=e795]
        - list [ref=e796]:
          - listitem [ref=e797]:
            - generic [ref=e798]: Terms
          - listitem [ref=e799]:
            - generic [ref=e800]: Privacy
    - paragraph [ref=e802]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:cat-ie] seeding e2e-cat-1-69-gxt8na failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e98]:
            - generic [ref=e99]: About
          - listitem [ref=e100]:
            - generic [ref=e101]: How it works
      - navigation "Help" [ref=e102]:
        - heading "Help" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Safety
          - listitem [ref=e107]:
            - generic [ref=e108]: Contact
      - navigation "Legal" [ref=e109]:
        - heading "Legal" [level=2] [ref=e110]
        - list [ref=e111]:
          - listitem [ref=e112]:
            - generic [ref=e113]: Terms
          - listitem [ref=e114]:
            - generic [ref=e115]: Privacy
    - paragraph [ref=e117]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-data.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('entity-editor-location-50fa2995-fcbd-4a92-a742-b38362f587f4-name').getByTestId('entity-saved-location-50fa2995-fcbd-4a92-a742-b38362f587f4-name')
Expected: visible
Timeout: 30000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 30000ms
  - waiting for getByTestId('data-table-cards').getByTestId('entity-editor-location-50fa2995-fcbd-4a92-a742-b38362f587f4-name').getByTestId('entity-saved-location-50fa2995-fcbd-4a92-a742-b38362f587f4-name')

```

Context:

```text
          - listitem [ref=e151]:
            - generic [ref=e152]: About
          - listitem [ref=e153]:
            - generic [ref=e154]: How it works
      - navigation "Help" [ref=e155]:
        - heading "Help" [level=2] [ref=e156]
        - list [ref=e157]:
          - listitem [ref=e158]:
            - generic [ref=e159]: Safety
          - listitem [ref=e160]:
            - generic [ref=e161]: Contact
      - navigation "Legal" [ref=e162]:
        - heading "Legal" [level=2] [ref=e163]
        - list [ref=e164]:
          - listitem [ref=e165]:
            - generic [ref=e166]: Terms
          - listitem [ref=e167]:
            - generic [ref=e168]: Privacy
    - paragraph [ref=e170]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-data.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ai-bulk-summary')
Expected: visible
Timeout: 180000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 180000ms
  - waiting for getByTestId('ai-bulk-summary')

```

Context:

```text
          - listitem [ref=e523]:
            - generic [ref=e524]: About
          - listitem [ref=e525]:
            - generic [ref=e526]: How it works
      - navigation "Help" [ref=e527]:
        - heading "Help" [level=2] [ref=e528]
        - list [ref=e529]:
          - listitem [ref=e530]:
            - generic [ref=e531]: Safety
          - listitem [ref=e532]:
            - generic [ref=e533]: Contact
      - navigation "Legal" [ref=e534]:
        - heading "Legal" [level=2] [ref=e535]
        - list [ref=e536]:
          - listitem [ref=e537]:
            - generic [ref=e538]: Terms
          - listitem [ref=e539]:
            - generic [ref=e540]: Privacy
    - paragraph [ref=e542]: © 2026 ethio.com — All rights reserved.
```
```

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-2 fake generate produces three assets and updates the row

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:c5a] seeding category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-2-fake-generate-produces-three-assets-and-updates-the-row-mobile-360`

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-4b stored truth: generate, accept, and the reader returns assets + stamp

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-4b-stored-truth-generate-accept-and-the-reader-returns-assets-stamp-mobile-360`

## import-security.spec.ts › IMPORT-GATE attributes › IG-2 attributes: dangerous cells refuse their own row and name the reason

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: IG-2 categories failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e783]:
            - generic [ref=e784]: About
          - listitem [ref=e785]:
            - generic [ref=e786]: How it works
      - navigation "Help" [ref=e787]:
        - heading "Help" [level=2] [ref=e788]
        - list [ref=e789]:
          - listitem [ref=e790]:
            - generic [ref=e791]: Safety
          - listitem [ref=e792]:
            - generic [ref=e793]: Contact
      - navigation "Legal" [ref=e794]:
        - heading "Legal" [level=2] [ref=e795]
        - list [ref=e796]:
          - listitem [ref=e797]:
            - generic [ref=e798]: Terms
          - listitem [ref=e799]:
            - generic [ref=e800]: Privacy
    - paragraph [ref=e802]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:c1b] destroying the spec set failed: update or delete on table "attributes" violates foreign key constraint "category_attribute_links_attribute_id_fkey" on table "category_attribute_links"
```

Context:

```text
          - listitem [ref=e168]:
            - generic [ref=e169]: About
          - listitem [ref=e170]:
            - generic [ref=e171]: How it works
      - navigation "Help" [ref=e172]:
        - heading "Help" [level=2] [ref=e173]
        - list [ref=e174]:
          - listitem [ref=e175]:
            - generic [ref=e176]: Safety
          - listitem [ref=e177]:
            - generic [ref=e178]: Contact
      - navigation "Legal" [ref=e179]:
        - heading "Legal" [level=2] [ref=e180]
        - list [ref=e181]:
          - listitem [ref=e182]:
            - generic [ref=e183]: Terms
          - listitem [ref=e184]:
            - generic [ref=e185]: Privacy
    - paragraph [ref=e187]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:inc248] linking the definition failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-18 specifications survive a step Back

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:c1b] destroying the spec set failed: update or delete on table "attributes" violates foreign key constraint "category_attribute_links_attribute_id_fkey" on table "category_attribute_links"
```

Context:

```text
          - listitem [ref=e172]:
            - generic [ref=e173]: About
          - listitem [ref=e174]:
            - generic [ref=e175]: How it works
      - navigation "Help" [ref=e176]:
        - heading "Help" [level=2] [ref=e177]
        - list [ref=e178]:
          - listitem [ref=e179]:
            - generic [ref=e180]: Safety
          - listitem [ref=e181]:
            - generic [ref=e182]: Contact
      - navigation "Legal" [ref=e183]:
        - heading "Legal" [level=2] [ref=e184]
        - list [ref=e185]:
          - listitem [ref=e186]:
            - generic [ref=e187]: Terms
          - listitem [ref=e188]:
            - generic [ref=e189]: Privacy
    - paragraph [ref=e191]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:d26] linking the colour set failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-35 a model's allowed set narrows and locks a sibling picker

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-36 a category surfaced under a second root appears under it in the tree

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:c1a] seeding the folder failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-36-a-category-surfaced-under-a-second-root-appears-under-it-in-the-tree-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-46 a category created with a secondary parent reaches the tree inside the cache window

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:c1a] seeding the folder failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e1890]:
            - generic [ref=e1891]: About
          - listitem [ref=e1892]:
            - generic [ref=e1893]: How it works
      - navigation "Help" [ref=e1894]:
        - heading "Help" [level=2] [ref=e1895]
        - list [ref=e1896]:
          - listitem [ref=e1897]:
            - generic [ref=e1898]: Safety
          - listitem [ref=e1899]:
            - generic [ref=e1900]: Contact
      - navigation "Legal" [ref=e1901]:
        - heading "Legal" [level=2] [ref=e1902]
        - list [ref=e1903]:
          - listitem [ref=e1904]:
            - generic [ref=e1905]: Terms
          - listitem [ref=e1906]:
            - generic [ref=e1907]: Privacy
    - paragraph [ref=e1909]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-47 a level lists the host's own children first, guests next and other- last

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:d30] seeding e2e-post-3-43-vntbi3 failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-47-a-level-lists-the-host-s-own-children-first-guests-next-and-other-last-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-44 a dependent list on a surfaced leaf narrows by its parent

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:c1a] seeding the leaf failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-44-a-dependent-list-on-a-surfaced-leaf-narrows-by-its-parent-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:c1b] linking the spec set failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:inc257] linking the unhide set failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-49 a prefill-only fact keeps its input while a settled one does not

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-50 the specifications keep display order and hide only the trailing extras

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:c1b] destroying the spec set failed: update or delete on table "attributes" violates foreign key constraint "category_attribute_links_attribute_id_fkey" on table "category_attribute_links"
```

Context:

```text
          - listitem [ref=e218]:
            - generic [ref=e219]: About
          - listitem [ref=e220]:
            - generic [ref=e221]: How it works
      - navigation "Help" [ref=e222]:
        - heading "Help" [level=2] [ref=e223]
        - list [ref=e224]:
          - listitem [ref=e225]:
            - generic [ref=e226]: Safety
          - listitem [ref=e227]:
            - generic [ref=e228]: Contact
      - navigation "Legal" [ref=e229]:
        - heading "Legal" [level=2] [ref=e230]
        - list [ref=e231]:
          - listitem [ref=e232]:
            - generic [ref=e233]: Terms
          - listitem [ref=e234]:
            - generic [ref=e235]: Privacy
    - paragraph [ref=e237]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-51 a dependent detail never renders above the answer it hangs on

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:inc269] linking the conditional pair failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-7 the draft dial refuses by name once the ceiling is reached

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › app shell › the feed body is centred with equal left and right gutters

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:shell] seeding the fence category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `shell-app-shell-the-feed-body-is-centred-with-equal-left-and-right-gutters-mobile-360`

## shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('location-level-city')
Expected pattern: /Escratch Guess City yuqx/
Received string:  "Escratch Guess City fjvayqx"
Timeout: 10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('location-level-city')
    14 × locator resolved to <button type="button" id="radix-_r_4_" aria-label="City" data-state="closed" aria-haspopup="menu" aria-expanded="false" data-testid="location-level-city" class="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-md px-2 text-sm hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring font-medium text-foreground">…</button>
       - unexpected value "Escratch Guess City fjvayqx"

```

Context: context file not found for `shell-L4b-location-picker-LS-6-the-nearest-curated-metro-wins-by-geometry-mobile-360`

## admin-attributes.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [dialog-dump AT-3 link never landed] open dialogs: category-attributes-dialog opened-by=editor-attributes

expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
    - heading "Attributes — e2e-cat-4-1-1nannc" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Attributes — e2e-cat-4-1-1nannc
      - paragraph [ref=e6]: No attribute is shown on the listing card yet.
      - status [ref=e7]: Pick at least two attributes to show on listing cards.
      - paragraph [ref=e8]: No attribute is linked to this category yet.
      - generic [ref=e9]:
        - textbox "Search the library" [ref=e10]: e2e_attr_ou49nq
        - combobox "Add attribute" [ref=e11]:
          - option "Choose an attribute"
          - option "e2e_attr_ou49nq (e2e_attr_ou49nq)" [selected]
        - button "Add attribute" [ref=e12] [cursor=pointer]
      - alert [ref=e13]: duplicate key value violates unique constraint "catalog_find_terms_pkey"
      - generic [ref=e14]:
        - paragraph [ref=e15]: Changes save as you go
        - button "Done" [ref=e16] [cursor=pointer]
    - button "Close" [ref=e17] [cursor=pointer]:
      - img [ref=e18]
      - generic [ref=e21]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-8 assign from the library: the link lands and Used by updates

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-editor-image')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-editor-image')

```

Context:

```text
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - alert [ref=e50]: The change could not be saved.
      - generic [ref=e51]:
        - button "Cancel" [ref=e52] [cursor=pointer]
        - button "Save" [ref=e53] [cursor=pointer]
    - button "Close" [ref=e54] [cursor=pointer]:
      - img [ref=e55]
      - generic [ref=e58]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-12 an approved am attribute label renders in am and falls back to EN

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).not.toContainText(expected) failed

Locator: getByRole('table').getByTestId('attribute-row-e2e_attr_bqhgiv')
Expected substring: not "ኢ2ኢ 3y3pfz"
Received string: "ኢ2ኢ 3y3pfze2e_attr_bqhgivጽሑፍ——እስካሁን በየትኛውም ምድብ አልተጠቀመም።—"
Timeout: 10000ms

Call log:
  - Expect "not toContainText" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('attribute-row-e2e_attr_bqhgiv')
    14 × locator resolved to <tr data-testid="attribute-row-e2e_attr_bqhgiv" class="border-b border-border last:border-0">…</tr>
       - unexpected value "ኢ2ኢ 3y3pfze2e_attr_bqhgivጽሑፍ——እስካሁን በየትኛውም ምድብ አልተጠቀመም።—"

```

Context:

```text
          - listitem [ref=e265]:
            - generic [ref=e266]: About
          - listitem [ref=e267]:
            - generic [ref=e268]: How it works
      - navigation "Help" [ref=e269]:
        - heading "Help" [level=2] [ref=e270]
        - list [ref=e271]:
          - listitem [ref=e272]:
            - generic [ref=e273]: Safety
          - listitem [ref=e274]:
            - generic [ref=e275]: Contact
      - navigation "Legal" [ref=e276]:
        - heading "Legal" [level=2] [ref=e277]
        - list [ref=e278]:
          - listitem [ref=e279]:
            - generic [ref=e280]: Terms
          - listitem [ref=e281]:
            - generic [ref=e282]: Privacy
    - paragraph [ref=e284]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-15 link seed failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e2987]:
            - generic [ref=e2988]: About
          - listitem [ref=e2989]:
            - generic [ref=e2990]: How it works
      - navigation "Help" [ref=e2991]:
        - heading "Help" [level=2] [ref=e2992]
        - list [ref=e2993]:
          - listitem [ref=e2994]:
            - generic [ref=e2995]: Safety
          - listitem [ref=e2996]:
            - generic [ref=e2997]: Contact
      - navigation "Legal" [ref=e2998]:
        - heading "Legal" [level=2] [ref=e2999]
        - list [ref=e3000]:
          - listitem [ref=e3001]:
            - generic [ref=e3002]: Terms
          - listitem [ref=e3003]:
            - generic [ref=e3004]: Privacy
    - paragraph [ref=e3006]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-17 an inherited row names its origin and clears the child's card flag

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: inheritance categories failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3042]:
            - generic [ref=e3043]: About
          - listitem [ref=e3044]:
            - generic [ref=e3045]: How it works
      - navigation "Help" [ref=e3046]:
        - heading "Help" [level=2] [ref=e3047]
        - list [ref=e3048]:
          - listitem [ref=e3049]:
            - generic [ref=e3050]: Safety
          - listitem [ref=e3051]:
            - generic [ref=e3052]: Contact
      - navigation "Legal" [ref=e3053]:
        - heading "Legal" [level=2] [ref=e3054]
        - list [ref=e3055]:
          - listitem [ref=e3056]:
            - generic [ref=e3057]: Terms
          - listitem [ref=e3058]:
            - generic [ref=e3059]: Privacy
    - paragraph [ref=e3061]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-19 an inherited row has no write verb and the write RPCs refuse it

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: inheritance categories failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3066]:
            - generic [ref=e3067]: About
          - listitem [ref=e3068]:
            - generic [ref=e3069]: How it works
      - navigation "Help" [ref=e3070]:
        - heading "Help" [level=2] [ref=e3071]
        - list [ref=e3072]:
          - listitem [ref=e3073]:
            - generic [ref=e3074]: Safety
          - listitem [ref=e3075]:
            - generic [ref=e3076]: Contact
      - navigation "Legal" [ref=e3077]:
        - heading "Legal" [level=2] [ref=e3078]
        - list [ref=e3079]:
          - listitem [ref=e3080]:
            - generic [ref=e3081]: Terms
          - listitem [ref=e3082]:
            - generic [ref=e3083]: Privacy
    - paragraph [ref=e3085]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-36 a secondary parent confers nothing, a primary parent confers

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-36 categories failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3092]:
            - generic [ref=e3093]: About
          - listitem [ref=e3094]:
            - generic [ref=e3095]: How it works
      - navigation "Help" [ref=e3096]:
        - heading "Help" [level=2] [ref=e3097]
        - list [ref=e3098]:
          - listitem [ref=e3099]:
            - generic [ref=e3100]: Safety
          - listitem [ref=e3101]:
            - generic [ref=e3102]: Contact
      - navigation "Legal" [ref=e3103]:
        - heading "Legal" [level=2] [ref=e3104]
        - list [ref=e3105]:
          - listitem [ref=e3106]:
            - generic [ref=e3107]: Terms
          - listitem [ref=e3108]:
            - generic [ref=e3109]: Privacy
    - paragraph [ref=e3111]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-21 a changed link commits and the batch undoes

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0
```

Context:

```text
          - listitem [ref=e880]:
            - generic [ref=e881]: About
          - listitem [ref=e882]:
            - generic [ref=e883]: How it works
      - navigation "Help" [ref=e884]:
        - heading "Help" [level=2] [ref=e885]
        - list [ref=e886]:
          - listitem [ref=e887]:
            - generic [ref=e888]: Safety
          - listitem [ref=e889]:
            - generic [ref=e890]: Contact
      - navigation "Legal" [ref=e891]:
        - heading "Legal" [level=2] [ref=e892]
        - list [ref=e893]:
          - listitem [ref=e894]:
            - generic [ref=e895]: Terms
          - listitem [ref=e896]:
            - generic [ref=e897]: Privacy
    - paragraph [ref=e899]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-46 a direct card rank equal to an inherited rank is refused by the import and by the door, naming both origins

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-46 categories failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3132]:
            - generic [ref=e3133]: About
          - listitem [ref=e3134]:
            - generic [ref=e3135]: How it works
      - navigation "Help" [ref=e3136]:
        - heading "Help" [level=2] [ref=e3137]
        - list [ref=e3138]:
          - listitem [ref=e3139]:
            - generic [ref=e3140]: Safety
          - listitem [ref=e3141]:
            - generic [ref=e3142]: Contact
      - navigation "Legal" [ref=e3143]:
        - heading "Legal" [level=2] [ref=e3144]
        - list [ref=e3145]:
          - listitem [ref=e3146]:
            - generic [ref=e3147]: Terms
          - listitem [ref=e3148]:
            - generic [ref=e3149]: Privacy
    - paragraph [ref=e3151]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-22 malformed files and dangerous cells are refused

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-22 category: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e880]:
            - generic [ref=e881]: About
          - listitem [ref=e882]:
            - generic [ref=e883]: How it works
      - navigation "Help" [ref=e884]:
        - heading "Help" [level=2] [ref=e885]
        - list [ref=e886]:
          - listitem [ref=e887]:
            - generic [ref=e888]: Safety
          - listitem [ref=e889]:
            - generic [ref=e890]: Contact
      - navigation "Legal" [ref=e891]:
        - heading "Legal" [level=2] [ref=e892]
        - list [ref=e893]:
          - listitem [ref=e894]:
            - generic [ref=e895]: Terms
          - listitem [ref=e896]:
            - generic [ref=e897]: Privacy
    - paragraph [ref=e899]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-21 a links file sets the allowed options and the default, and the export echoes both

- Source: `shard 4`
- Project: `desktop-1280`

```text
TypeError: Cannot read properties of null (reading 'id')
```

Context:

```text
          - listitem [ref=e3206]:
            - generic [ref=e3207]: About
          - listitem [ref=e3208]:
            - generic [ref=e3209]: How it works
      - navigation "Help" [ref=e3210]:
        - heading "Help" [level=2] [ref=e3211]
        - list [ref=e3212]:
          - listitem [ref=e3213]:
            - generic [ref=e3214]: Safety
          - listitem [ref=e3215]:
            - generic [ref=e3216]: Contact
      - navigation "Legal" [ref=e3217]:
        - heading "Legal" [level=2] [ref=e3218]
        - list [ref=e3219]:
          - listitem [ref=e3220]:
            - generic [ref=e3221]: Terms
          - listitem [ref=e3222]:
            - generic [ref=e3223]: Privacy
    - paragraph [ref=e3225]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-27 an edited read-only cell is ignored while the row's real change applies

- Source: `shard 4`
- Project: `desktop-1280`

```text
TypeError: Cannot read properties of null (reading 'id')
```

Context:

```text
          - listitem [ref=e3218]:
            - generic [ref=e3219]: About
          - listitem [ref=e3220]:
            - generic [ref=e3221]: How it works
      - navigation "Help" [ref=e3222]:
        - heading "Help" [level=2] [ref=e3223]
        - list [ref=e3224]:
          - listitem [ref=e3225]:
            - generic [ref=e3226]: Safety
          - listitem [ref=e3227]:
            - generic [ref=e3228]: Contact
      - navigation "Legal" [ref=e3229]:
        - heading "Legal" [level=2] [ref=e3230]
        - list [ref=e3231]:
          - listitem [ref=e3232]:
            - generic [ref=e3233]: Terms
          - listitem [ref=e3234]:
            - generic [ref=e3235]: Privacy
    - paragraph [ref=e3237]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-30 an unlinked delete undoes and a linked delete names its categories

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-30 undo did not restore the am row

expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
```

Context:

```text
          - listitem [ref=e880]:
            - generic [ref=e881]: About
          - listitem [ref=e882]:
            - generic [ref=e883]: How it works
      - navigation "Help" [ref=e884]:
        - heading "Help" [level=2] [ref=e885]
        - list [ref=e886]:
          - listitem [ref=e887]:
            - generic [ref=e888]: Safety
          - listitem [ref=e889]:
            - generic [ref=e890]: Contact
      - navigation "Legal" [ref=e891]:
        - heading "Legal" [level=2] [ref=e892]
        - list [ref=e893]:
          - listitem [ref=e894]:
            - generic [ref=e895]: Terms
          - listitem [ref=e896]:
            - generic [ref=e897]: Privacy
    - paragraph [ref=e899]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-38 an inherited echo does not collide with a direct row

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-38 link failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3414]:
            - generic [ref=e3415]: About
          - listitem [ref=e3416]:
            - generic [ref=e3417]: How it works
      - navigation "Help" [ref=e3418]:
        - heading "Help" [level=2] [ref=e3419]
        - list [ref=e3420]:
          - listitem [ref=e3421]:
            - generic [ref=e3422]: Safety
          - listitem [ref=e3423]:
            - generic [ref=e3424]: Contact
      - navigation "Legal" [ref=e3425]:
        - heading "Legal" [level=2] [ref=e3426]
        - list [ref=e3427]:
          - listitem [ref=e3428]:
            - generic [ref=e3429]: Terms
          - listitem [ref=e3430]:
            - generic [ref=e3431]: Privacy
    - paragraph [ref=e3433]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-42 toggling Required keeps the card rank and never loses the link

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-editor-image')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-editor-image')

```

Context:

```text
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - alert [ref=e50]: The change could not be saved.
      - generic [ref=e51]:
        - button "Cancel" [ref=e52] [cursor=pointer]
        - button "Save" [ref=e53] [cursor=pointer]
    - button "Close" [ref=e54] [cursor=pointer]:
      - img [ref=e55]
      - generic [ref=e58]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-62 an exported link's condition and order re-import as unchanged

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-62 seeding the category: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3608]:
            - generic [ref=e3609]: About
          - listitem [ref=e3610]:
            - generic [ref=e3611]: How it works
      - navigation "Help" [ref=e3612]:
        - heading "Help" [level=2] [ref=e3613]
        - list [ref=e3614]:
          - listitem [ref=e3615]:
            - generic [ref=e3616]: Safety
          - listitem [ref=e3617]:
            - generic [ref=e3618]: Contact
      - navigation "Legal" [ref=e3619]:
        - heading "Legal" [level=2] [ref=e3620]
        - list [ref=e3621]:
          - listitem [ref=e3622]:
            - generic [ref=e3623]: Terms
          - listitem [ref=e3624]:
            - generic [ref=e3625]: Privacy
    - paragraph [ref=e3627]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-61 the import dialog previews and confirms a links-only file

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-61 seeding the link: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3608]:
            - generic [ref=e3609]: About
          - listitem [ref=e3610]:
            - generic [ref=e3611]: How it works
      - navigation "Help" [ref=e3612]:
        - heading "Help" [level=2] [ref=e3613]
        - list [ref=e3614]:
          - listitem [ref=e3615]:
            - generic [ref=e3616]: Safety
          - listitem [ref=e3617]:
            - generic [ref=e3618]: Contact
      - navigation "Legal" [ref=e3619]:
        - heading "Legal" [level=2] [ref=e3620]
        - list [ref=e3621]:
          - listitem [ref=e3622]:
            - generic [ref=e3623]: Terms
          - listitem [ref=e3624]:
            - generic [ref=e3625]: Privacy
    - paragraph [ref=e3627]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-31 the roster filter groups children under their parent, marks retired rows, and scopes the roster to a subtree

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:ct-31] seeding e2e-cat-4-2-gu9r4z-p failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `admin-categories-console-C2-categories-console-CT-31-the-roster-filter-groups-children-under-their-parent-marks-retired-rows-and-scopes-the-roster-to-a-subtree-desktop-1280`

## admin-categories-console.spec.ts › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on CT-3: categories.name_en = "E2E renamed e2e-cat-4-5-9bd6r6"

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
```

Context:

```text
        - textbox "Listing expiry (days)" [ref=e41]:
          - /placeholder: No expiry
      - generic [ref=e42]:
        - checkbox "Accepts listings" [checked] [ref=e43] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e44]:
        - checkbox "Price field enabled" [checked] [ref=e45] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - alert [ref=e46]: The change could not be saved.
      - generic [ref=e47]:
        - button "Cancel" [ref=e48] [cursor=pointer]
        - button "Save" [ref=e49] [cursor=pointer]
    - button "Close" [ref=e50] [cursor=pointer]:
      - img [ref=e51]
      - generic [ref=e54]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-editor-image')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-editor-image')

```

Context:

```text
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - alert [ref=e50]: The change could not be saved.
      - generic [ref=e51]:
        - button "Cancel" [ref=e52] [cursor=pointer]
        - button "Save" [ref=e53] [cursor=pointer]
    - button "Close" [ref=e54] [cursor=pointer]:
      - img [ref=e55]
      - generic [ref=e58]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-editor-image')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-editor-image')

```

Context:

```text
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - alert [ref=e50]: The change could not be saved.
      - generic [ref=e51]:
        - button "Cancel" [ref=e52] [cursor=pointer]
        - button "Save" [ref=e53] [cursor=pointer]
    - button "Close" [ref=e54] [cursor=pointer]:
      - img [ref=e55]
      - generic [ref=e58]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-editor-image')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-editor-image')

```

Context:

```text
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - alert [ref=e50]: The change could not be saved.
      - generic [ref=e51]:
        - button "Cancel" [ref=e52] [cursor=pointer]
        - button "Save" [ref=e53] [cursor=pointer]
    - button "Close" [ref=e54] [cursor=pointer]:
      - img [ref=e55]
      - generic [ref=e58]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('category-create-parent').locator('option').filter({ hasText: 'e2e-cat-4-18-hbnb0x' })
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('category-create-parent').locator('option').filter({ hasText: 'e2e-cat-4-18-hbnb0x' })
    14 × locator resolved to 1 element
       - unexpected value "1"

```

Context:

```text
      - generic [ref=e33]:
        - generic [ref=e34]: Visible until
        - textbox "Visible until" [ref=e35]
      - generic [ref=e36]:
        - generic [ref=e37]: Hide in countries
        - generic [ref=e38]:
          - generic [ref=e39]:
            - checkbox "ET — Ethiopia" [ref=e40] [cursor=pointer]
            - generic [ref=e41]: ET — Ethiopia
          - generic [ref=e42]:
            - checkbox "US — United States" [ref=e43] [cursor=pointer]
            - generic [ref=e44]: US — United States
        - paragraph [ref=e45]: The category stays hidden in every country you tick; you can change this later.
      - generic [ref=e46]:
        - button "Cancel" [ref=e47] [cursor=pointer]
        - button "Save" [ref=e48] [cursor=pointer]
    - button "Close" [ref=e49] [cursor=pointer]:
      - img [ref=e50]
      - generic [ref=e53]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:ct-32] seeding e2e-cat-4-22-0lkvuu-r failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `admin-categories-console-C2-categories-console-CT-32-a-reactivate-row-carries-its-cell-changes-through-commit-and-undo-and-an-empty-root-deletes-and-undoes-desktop-1280`

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-editor-image')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-editor-image')

```

Context:

```text
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - alert [ref=e50]: The change could not be saved.
      - generic [ref=e51]:
        - button "Cancel" [ref=e52] [cursor=pointer]
        - button "Save" [ref=e53] [cursor=pointer]
    - button "Close" [ref=e54] [cursor=pointer]:
      - img [ref=e55]
      - generic [ref=e58]: Close
```
```

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-15 reorder: Move up flips the order with no step-up, catch-all last

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:c2] seeding e2e-cat-4-35-6dxwkk failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `admin-categories-lifecycle-C2-categories-console-CT-15-reorder-Move-up-flips-the-order-with-no-step-up-catch-all-last-desktop-1280`

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:c5l] seeding e2e-cat-4-43-wkatu5 failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3200]:
            - generic [ref=e3201]: About
          - listitem [ref=e3202]:
            - generic [ref=e3203]: How it works
      - navigation "Help" [ref=e3204]:
        - heading "Help" [level=2] [ref=e3205]
        - list [ref=e3206]:
          - listitem [ref=e3207]:
            - generic [ref=e3208]: Safety
          - listitem [ref=e3209]:
            - generic [ref=e3210]: Contact
      - navigation "Legal" [ref=e3211]:
        - heading "Legal" [level=2] [ref=e3212]
        - list [ref=e3213]:
          - listitem [ref=e3214]:
            - generic [ref=e3215]: Terms
          - listitem [ref=e3216]:
            - generic [ref=e3217]: Privacy
    - paragraph [ref=e3219]: © 2026 ethio.com — All rights reserved.
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
      - alert [ref=e16]: The import could not be completed.
      - paragraph [ref=e17]: "Reason: canceling statement due to statement timeout"
      - button "Discard" [ref=e19] [cursor=pointer]
    - button "Close" [ref=e20] [cursor=pointer]:
      - img [ref=e21]
      - generic [ref=e24]: Close
```
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-19 a create and a rename commit through the doors and undo

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:cat-ie] seeding e2e-cat-4-56-ouls5g failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3480]:
            - generic [ref=e3481]: About
          - listitem [ref=e3482]:
            - generic [ref=e3483]: How it works
      - navigation "Help" [ref=e3484]:
        - heading "Help" [level=2] [ref=e3485]
        - list [ref=e3486]:
          - listitem [ref=e3487]:
            - generic [ref=e3488]: Safety
          - listitem [ref=e3489]:
            - generic [ref=e3490]: Contact
      - navigation "Legal" [ref=e3491]:
        - heading "Legal" [level=2] [ref=e3492]
        - list [ref=e3493]:
          - listitem [ref=e3494]:
            - generic [ref=e3495]: Terms
          - listitem [ref=e3496]:
            - generic [ref=e3497]: Privacy
    - paragraph [ref=e3499]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-20 action=retire and action=reactivate walk the state machine

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:cat-ie] seeding e2e-cat-4-59-d399t9 failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3504]:
            - generic [ref=e3505]: About
          - listitem [ref=e3506]:
            - generic [ref=e3507]: How it works
      - navigation "Help" [ref=e3508]:
        - heading "Help" [level=2] [ref=e3509]
        - list [ref=e3510]:
          - listitem [ref=e3511]:
            - generic [ref=e3512]: Safety
          - listitem [ref=e3513]:
            - generic [ref=e3514]: Contact
      - navigation "Legal" [ref=e3515]:
        - heading "Legal" [level=2] [ref=e3516]
        - list [ref=e3517]:
          - listitem [ref=e3518]:
            - generic [ref=e3519]: Terms
          - listitem [ref=e3520]:
            - generic [ref=e3521]: Privacy
    - paragraph [ref=e3523]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-24 a slug rename is refused by name, and a name edit is one change

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:cat-ie] seeding e2e-cat-4-63-ksd8m6 failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3559]:
            - generic [ref=e3560]: About
          - listitem [ref=e3561]:
            - generic [ref=e3562]: How it works
      - navigation "Help" [ref=e3563]:
        - heading "Help" [level=2] [ref=e3564]
        - list [ref=e3565]:
          - listitem [ref=e3566]:
            - generic [ref=e3567]: Safety
          - listitem [ref=e3568]:
            - generic [ref=e3569]: Contact
      - navigation "Legal" [ref=e3570]:
        - heading "Legal" [level=2] [ref=e3571]
        - list [ref=e3572]:
          - listitem [ref=e3573]:
            - generic [ref=e3574]: Terms
          - listitem [ref=e3575]:
            - generic [ref=e3576]: Privacy
    - paragraph [ref=e3578]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:cat-ie] seeding e2e-cat-4-66-gny40n failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3560]:
            - generic [ref=e3561]: About
          - listitem [ref=e3562]:
            - generic [ref=e3563]: How it works
      - navigation "Help" [ref=e3564]:
        - heading "Help" [level=2] [ref=e3565]
        - list [ref=e3566]:
          - listitem [ref=e3567]:
            - generic [ref=e3568]: Safety
          - listitem [ref=e3569]:
            - generic [ref=e3570]: Contact
      - navigation "Legal" [ref=e3571]:
        - heading "Legal" [level=2] [ref=e3572]
        - list [ref=e3573]:
          - listitem [ref=e3574]:
            - generic [ref=e3575]: Terms
          - listitem [ref=e3576]:
            - generic [ref=e3577]: Privacy
    - paragraph [ref=e3579]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-27 a leaf delete undoes with its Amharic name; a parent delete names its child

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:cat-ie] seeding e2e-cat-4-69-9597s6 failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3608]:
            - generic [ref=e3609]: About
          - listitem [ref=e3610]:
            - generic [ref=e3611]: How it works
      - navigation "Help" [ref=e3612]:
        - heading "Help" [level=2] [ref=e3613]
        - list [ref=e3614]:
          - listitem [ref=e3615]:
            - generic [ref=e3616]: Safety
          - listitem [ref=e3617]:
            - generic [ref=e3618]: Contact
      - navigation "Legal" [ref=e3619]:
        - heading "Legal" [level=2] [ref=e3620]
        - list [ref=e3621]:
          - listitem [ref=e3622]:
            - generic [ref=e3623]: Terms
          - listitem [ref=e3624]:
            - generic [ref=e3625]: Privacy
    - paragraph [ref=e3627]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "approved"
Received: "edited"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e284]:
            - generic [ref=e285]: About
          - listitem [ref=e286]:
            - generic [ref=e287]: How it works
      - navigation "Help" [ref=e288]:
        - heading "Help" [level=2] [ref=e289]
        - list [ref=e290]:
          - listitem [ref=e291]:
            - generic [ref=e292]: Safety
          - listitem [ref=e293]:
            - generic [ref=e294]: Contact
      - navigation "Legal" [ref=e295]:
        - heading "Legal" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Terms
          - listitem [ref=e300]:
            - generic [ref=e301]: Privacy
    - paragraph [ref=e303]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-data.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ai-bulk-summary')
Expected: visible
Timeout: 150000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 150000ms
  - waiting for getByTestId('ai-bulk-summary')

```

Context:

```text
          - listitem [ref=e775]:
            - generic [ref=e776]: About
          - listitem [ref=e777]:
            - generic [ref=e778]: How it works
      - navigation "Help" [ref=e779]:
        - heading "Help" [level=2] [ref=e780]
        - list [ref=e781]:
          - listitem [ref=e782]:
            - generic [ref=e783]: Safety
          - listitem [ref=e784]:
            - generic [ref=e785]: Contact
      - navigation "Legal" [ref=e786]:
        - heading "Legal" [level=2] [ref=e787]
        - list [ref=e788]:
          - listitem [ref=e789]:
            - generic [ref=e790]: Terms
          - listitem [ref=e791]:
            - generic [ref=e792]: Privacy
    - paragraph [ref=e794]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-data.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('ai-bulk-summary')
Expected: visible
Timeout: 180000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 180000ms
  - waiting for getByTestId('ai-bulk-summary')

```

Context:

```text
          - listitem [ref=e775]:
            - generic [ref=e776]: About
          - listitem [ref=e777]:
            - generic [ref=e778]: How it works
      - navigation "Help" [ref=e779]:
        - heading "Help" [level=2] [ref=e780]
        - list [ref=e781]:
          - listitem [ref=e782]:
            - generic [ref=e783]: Safety
          - listitem [ref=e784]:
            - generic [ref=e785]: Contact
      - navigation "Legal" [ref=e786]:
        - heading "Legal" [level=2] [ref=e787]
        - list [ref=e788]:
          - listitem [ref=e789]:
            - generic [ref=e790]: Terms
          - listitem [ref=e791]:
            - generic [ref=e792]: Privacy
    - paragraph [ref=e794]: © 2026 ethio.com — All rights reserved.
```
```

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-2 fake generate produces three assets and updates the row

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:c5a] seeding category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-2-fake-generate-produces-three-assets-and-updates-the-row-desktop-1280`

## category-image-routes.spec.ts › C5a — category AI foundation routes › CI-4b stored truth: generate, accept, and the reader returns assets + stamp

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502
```

Context: context file not found for `category-image-routes-C5a-category-AI-foundation-routes-CI-4b-stored-truth-generate-accept-and-the-reader-returns-assets-stamp-desktop-1280`

## import-security.spec.ts › IMPORT-GATE attributes › IG-2 attributes: dangerous cells refuse their own row and name the reason

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: IG-2 categories failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
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

## import-security.spec.ts › IMPORT-GATE categories › IG-2 categories: dangerous cells refuse their own row and name the reason

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: IG-2 categories seed failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
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

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3298]:
            - generic [ref=e3299]: About
          - listitem [ref=e3300]:
            - generic [ref=e3301]: How it works
      - navigation "Help" [ref=e3302]:
        - heading "Help" [level=2] [ref=e3303]
        - list [ref=e3304]:
          - listitem [ref=e3305]:
            - generic [ref=e3306]: Safety
          - listitem [ref=e3307]:
            - generic [ref=e3308]: Contact
      - navigation "Legal" [ref=e3309]:
        - heading "Legal" [level=2] [ref=e3310]
        - list [ref=e3311]:
          - listitem [ref=e3312]:
            - generic [ref=e3313]: Terms
          - listitem [ref=e3314]:
            - generic [ref=e3315]: Privacy
    - paragraph [ref=e3317]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3320]:
            - generic [ref=e3321]: About
          - listitem [ref=e3322]:
            - generic [ref=e3323]: How it works
      - navigation "Help" [ref=e3324]:
        - heading "Help" [level=2] [ref=e3325]
        - list [ref=e3326]:
          - listitem [ref=e3327]:
            - generic [ref=e3328]: Safety
          - listitem [ref=e3329]:
            - generic [ref=e3330]: Contact
      - navigation "Legal" [ref=e3331]:
        - heading "Legal" [level=2] [ref=e3332]
        - list [ref=e3333]:
          - listitem [ref=e3334]:
            - generic [ref=e3335]: Terms
          - listitem [ref=e3336]:
            - generic [ref=e3337]: Privacy
    - paragraph [ref=e3339]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3422]:
            - generic [ref=e3423]: About
          - listitem [ref=e3424]:
            - generic [ref=e3425]: How it works
      - navigation "Help" [ref=e3426]:
        - heading "Help" [level=2] [ref=e3427]
        - list [ref=e3428]:
          - listitem [ref=e3429]:
            - generic [ref=e3430]: Safety
          - listitem [ref=e3431]:
            - generic [ref=e3432]: Contact
      - navigation "Legal" [ref=e3433]:
        - heading "Legal" [level=2] [ref=e3434]
        - list [ref=e3435]:
          - listitem [ref=e3436]:
            - generic [ref=e3437]: Terms
          - listitem [ref=e3438]:
            - generic [ref=e3439]: Privacy
    - paragraph [ref=e3441]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-52 a category with an icon name shows its glyph; one without shows none (D38)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the leaf failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-52-a-category-with-an-icon-name-shows-its-glyph-one-without-shows-none-D38-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-3 a folder is browsable and never selectable; its leaf is (D11)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-3-a-folder-is-browsable-and-never-selectable-its-leaf-is-D11-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3344]:
            - generic [ref=e3345]: About
          - listitem [ref=e3346]:
            - generic [ref=e3347]: How it works
      - navigation "Help" [ref=e3348]:
        - heading "Help" [level=2] [ref=e3349]
        - list [ref=e3350]:
          - listitem [ref=e3351]:
            - generic [ref=e3352]: Safety
          - listitem [ref=e3353]:
            - generic [ref=e3354]: Contact
      - navigation "Legal" [ref=e3355]:
        - heading "Legal" [level=2] [ref=e3356]
        - list [ref=e3357]:
          - listitem [ref=e3358]:
            - generic [ref=e3359]: Terms
          - listitem [ref=e3360]:
            - generic [ref=e3361]: Privacy
    - paragraph [ref=e3363]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3410]:
            - generic [ref=e3411]: About
          - listitem [ref=e3412]:
            - generic [ref=e3413]: How it works
      - navigation "Help" [ref=e3414]:
        - heading "Help" [level=2] [ref=e3415]
        - list [ref=e3416]:
          - listitem [ref=e3417]:
            - generic [ref=e3418]: Safety
          - listitem [ref=e3419]:
            - generic [ref=e3420]: Contact
      - navigation "Legal" [ref=e3421]:
        - heading "Legal" [level=2] [ref=e3422]
        - list [ref=e3423]:
          - listitem [ref=e3424]:
            - generic [ref=e3425]: Terms
          - listitem [ref=e3426]:
            - generic [ref=e3427]: Privacy
    - paragraph [ref=e3429]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3464]:
            - generic [ref=e3465]: About
          - listitem [ref=e3466]:
            - generic [ref=e3467]: How it works
      - navigation "Help" [ref=e3468]:
        - heading "Help" [level=2] [ref=e3469]
        - list [ref=e3470]:
          - listitem [ref=e3471]:
            - generic [ref=e3472]: Safety
          - listitem [ref=e3473]:
            - generic [ref=e3474]: Contact
      - navigation "Legal" [ref=e3475]:
        - heading "Legal" [level=2] [ref=e3476]
        - list [ref=e3477]:
          - listitem [ref=e3478]:
            - generic [ref=e3479]: Terms
          - listitem [ref=e3480]:
            - generic [ref=e3481]: Privacy
    - paragraph [ref=e3483]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3512]:
            - generic [ref=e3513]: About
          - listitem [ref=e3514]:
            - generic [ref=e3515]: How it works
      - navigation "Help" [ref=e3516]:
        - heading "Help" [level=2] [ref=e3517]
        - list [ref=e3518]:
          - listitem [ref=e3519]:
            - generic [ref=e3520]: Safety
          - listitem [ref=e3521]:
            - generic [ref=e3522]: Contact
      - navigation "Legal" [ref=e3523]:
        - heading "Legal" [level=2] [ref=e3524]
        - list [ref=e3525]:
          - listitem [ref=e3526]:
            - generic [ref=e3527]: Terms
          - listitem [ref=e3528]:
            - generic [ref=e3529]: Privacy
    - paragraph [ref=e3531]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3530]:
            - generic [ref=e3531]: About
          - listitem [ref=e3532]:
            - generic [ref=e3533]: How it works
      - navigation "Help" [ref=e3534]:
        - heading "Help" [level=2] [ref=e3535]
        - list [ref=e3536]:
          - listitem [ref=e3537]:
            - generic [ref=e3538]: Safety
          - listitem [ref=e3539]:
            - generic [ref=e3540]: Contact
      - navigation "Legal" [ref=e3541]:
        - heading "Legal" [level=2] [ref=e3542]
        - list [ref=e3543]:
          - listitem [ref=e3544]:
            - generic [ref=e3545]: Terms
          - listitem [ref=e3546]:
            - generic [ref=e3547]: Privacy
    - paragraph [ref=e3549]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3580]:
            - generic [ref=e3581]: About
          - listitem [ref=e3582]:
            - generic [ref=e3583]: How it works
      - navigation "Help" [ref=e3584]:
        - heading "Help" [level=2] [ref=e3585]
        - list [ref=e3586]:
          - listitem [ref=e3587]:
            - generic [ref=e3588]: Safety
          - listitem [ref=e3589]:
            - generic [ref=e3590]: Contact
      - navigation "Legal" [ref=e3591]:
        - heading "Legal" [level=2] [ref=e3592]
        - list [ref=e3593]:
          - listitem [ref=e3594]:
            - generic [ref=e3595]: Terms
          - listitem [ref=e3596]:
            - generic [ref=e3597]: Privacy
    - paragraph [ref=e3599]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-31 the market select waits for the prefill chain and never preselects

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3604]:
            - generic [ref=e3605]: About
          - listitem [ref=e3606]:
            - generic [ref=e3607]: How it works
      - navigation "Help" [ref=e3608]:
        - heading "Help" [level=2] [ref=e3609]
        - list [ref=e3610]:
          - listitem [ref=e3611]:
            - generic [ref=e3612]: Safety
          - listitem [ref=e3613]:
            - generic [ref=e3614]: Contact
      - navigation "Legal" [ref=e3615]:
        - heading "Legal" [level=2] [ref=e3616]
        - list [ref=e3617]:
          - listitem [ref=e3618]:
            - generic [ref=e3619]: Terms
          - listitem [ref=e3620]:
            - generic [ref=e3621]: Privacy
    - paragraph [ref=e3623]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-47 a level lists the host's own children first, guests next and other- last

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:d30] seeding e2e-post-5-47-ls3ah6 failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-47-a-level-lists-the-host-s-own-children-first-guests-next-and-other-last-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-44 a dependent list on a surfaced leaf narrows by its parent

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the leaf failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-44-a-dependent-list-on-a-surfaced-leaf-narrows-by-its-parent-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-9 catalog finder is bounded, multilingual and rate-limited

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the finder leaf failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-9-catalog-finder-is-bounded-multilingual-and-rate-limited-desktop-1280`

## shell.spec.ts › app shell › the feed body is centred with equal left and right gutters

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:shell] seeding the fence category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `shell-app-shell-the-feed-body-is-centred-with-equal-left-and-right-gutters-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-52 a category with an icon name shows its glyph; one without shows none (D38)

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:c1a] seeding the folder failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-52-a-category-with-an-icon-name-shows-its-glyph-one-without-shows-none-D38-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-3 a folder is browsable and never selectable; its leaf is (D11)

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:c1a] seeding the folder failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-3-a-folder-is-browsable-and-never-selectable-its-leaf-is-D11-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:inc248] linking the definition failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-18 specifications survive a step Back

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:c1b] linking the spec set failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:r3b2] linking the conditional set failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:c1a] seeding the folder failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e172]:
            - generic [ref=e173]: About
          - listitem [ref=e174]:
            - generic [ref=e175]: How it works
      - navigation "Help" [ref=e176]:
        - heading "Help" [level=2] [ref=e177]
        - list [ref=e178]:
          - listitem [ref=e179]:
            - generic [ref=e180]: Safety
          - listitem [ref=e181]:
            - generic [ref=e182]: Contact
      - navigation "Legal" [ref=e183]:
        - heading "Legal" [level=2] [ref=e184]
        - list [ref=e185]:
          - listitem [ref=e186]:
            - generic [ref=e187]: Terms
          - listitem [ref=e188]:
            - generic [ref=e189]: Privacy
    - paragraph [ref=e191]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:c1b] destroying the spec set failed: update or delete on table "attributes" violates foreign key constraint "category_attribute_links_attribute_id_fkey" on table "category_attribute_links"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-35 a model's allowed set narrows and locks a sibling picker

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:r3b3d] linking the allowed set failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-47 a level lists the host's own children first, guests next and other- last

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:d30] seeding e2e-post-changed-76-a8zlue failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-47-a-level-lists-the-host-s-own-children-first-guests-next-and-other-last-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-44 a dependent list on a surfaced leaf narrows by its parent

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-44-a-dependent-list-on-a-surfaced-leaf-narrows-by-its-parent-mobile-360`

## post-wizard.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-49 a prefill-only fact keeps its input while a settled one does not

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:c1b] destroying the spec set failed: update or delete on table "attributes" violates foreign key constraint "category_attribute_links_attribute_id_fkey" on table "category_attribute_links"
```

Context:

```text
          - listitem [ref=e94]:
            - generic [ref=e95]: About
          - listitem [ref=e96]:
            - generic [ref=e97]: How it works
      - navigation "Help" [ref=e98]:
        - heading "Help" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Safety
          - listitem [ref=e103]:
            - generic [ref=e104]: Contact
      - navigation "Legal" [ref=e105]:
        - heading "Legal" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Terms
          - listitem [ref=e110]:
            - generic [ref=e111]: Privacy
    - paragraph [ref=e113]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-52 a category with an icon name shows its glyph; one without shows none (D38)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the leaf failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-52-a-category-with-an-icon-name-shows-its-glyph-one-without-shows-none-D38-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3410]:
            - generic [ref=e3411]: About
          - listitem [ref=e3412]:
            - generic [ref=e3413]: How it works
      - navigation "Help" [ref=e3414]:
        - heading "Help" [level=2] [ref=e3415]
        - list [ref=e3416]:
          - listitem [ref=e3417]:
            - generic [ref=e3418]: Safety
          - listitem [ref=e3419]:
            - generic [ref=e3420]: Contact
      - navigation "Legal" [ref=e3421]:
        - heading "Legal" [level=2] [ref=e3422]
        - list [ref=e3423]:
          - listitem [ref=e3424]:
            - generic [ref=e3425]: Terms
          - listitem [ref=e3426]:
            - generic [ref=e3427]: Privacy
    - paragraph [ref=e3429]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks, by name

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3464]:
            - generic [ref=e3465]: About
          - listitem [ref=e3466]:
            - generic [ref=e3467]: How it works
      - navigation "Help" [ref=e3468]:
        - heading "Help" [level=2] [ref=e3469]
        - list [ref=e3470]:
          - listitem [ref=e3471]:
            - generic [ref=e3472]: Safety
          - listitem [ref=e3473]:
            - generic [ref=e3474]: Contact
      - navigation "Legal" [ref=e3475]:
        - heading "Legal" [level=2] [ref=e3476]
        - list [ref=e3477]:
          - listitem [ref=e3478]:
            - generic [ref=e3479]: Terms
          - listitem [ref=e3480]:
            - generic [ref=e3481]: Privacy
    - paragraph [ref=e3483]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:c1b] linking the spec set failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3500]:
            - generic [ref=e3501]: About
          - listitem [ref=e3502]:
            - generic [ref=e3503]: How it works
      - navigation "Help" [ref=e3504]:
        - heading "Help" [level=2] [ref=e3505]
        - list [ref=e3506]:
          - listitem [ref=e3507]:
            - generic [ref=e3508]: Safety
          - listitem [ref=e3509]:
            - generic [ref=e3510]: Contact
      - navigation "Legal" [ref=e3511]:
        - heading "Legal" [level=2] [ref=e3512]
        - list [ref=e3513]:
          - listitem [ref=e3514]:
            - generic [ref=e3515]: Terms
          - listitem [ref=e3516]:
            - generic [ref=e3517]: Privacy
    - paragraph [ref=e3519]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3530]:
            - generic [ref=e3531]: About
          - listitem [ref=e3532]:
            - generic [ref=e3533]: How it works
      - navigation "Help" [ref=e3534]:
        - heading "Help" [level=2] [ref=e3535]
        - list [ref=e3536]:
          - listitem [ref=e3537]:
            - generic [ref=e3538]: Safety
          - listitem [ref=e3539]:
            - generic [ref=e3540]: Contact
      - navigation "Legal" [ref=e3541]:
        - heading "Legal" [level=2] [ref=e3542]
        - list [ref=e3543]:
          - listitem [ref=e3544]:
            - generic [ref=e3545]: Terms
          - listitem [ref=e3546]:
            - generic [ref=e3547]: Privacy
    - paragraph [ref=e3549]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-18 specifications survive a step Back

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:c1b] destroying the spec set failed: update or delete on table "attributes" violates foreign key constraint "category_attribute_links_attribute_id_fkey" on table "category_attribute_links"
```

Context:

```text
          - listitem [ref=e3161]:
            - generic [ref=e3162]: About
          - listitem [ref=e3163]:
            - generic [ref=e3164]: How it works
      - navigation "Help" [ref=e3165]:
        - heading "Help" [level=2] [ref=e3166]
        - list [ref=e3167]:
          - listitem [ref=e3168]:
            - generic [ref=e3169]: Safety
          - listitem [ref=e3170]:
            - generic [ref=e3171]: Contact
      - navigation "Legal" [ref=e3172]:
        - heading "Legal" [level=2] [ref=e3173]
        - list [ref=e3174]:
          - listitem [ref=e3175]:
            - generic [ref=e3176]: Terms
          - listitem [ref=e3177]:
            - generic [ref=e3178]: Privacy
    - paragraph [ref=e3180]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3082]:
            - generic [ref=e3083]: About
          - listitem [ref=e3084]:
            - generic [ref=e3085]: How it works
      - navigation "Help" [ref=e3086]:
        - heading "Help" [level=2] [ref=e3087]
        - list [ref=e3088]:
          - listitem [ref=e3089]:
            - generic [ref=e3090]: Safety
          - listitem [ref=e3091]:
            - generic [ref=e3092]: Contact
      - navigation "Legal" [ref=e3093]:
        - heading "Legal" [level=2] [ref=e3094]
        - list [ref=e3095]:
          - listitem [ref=e3096]:
            - generic [ref=e3097]: Terms
          - listitem [ref=e3098]:
            - generic [ref=e3099]: Privacy
    - paragraph [ref=e3101]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3074]:
            - generic [ref=e3075]: About
          - listitem [ref=e3076]:
            - generic [ref=e3077]: How it works
      - navigation "Help" [ref=e3078]:
        - heading "Help" [level=2] [ref=e3079]
        - list [ref=e3080]:
          - listitem [ref=e3081]:
            - generic [ref=e3082]: Safety
          - listitem [ref=e3083]:
            - generic [ref=e3084]: Contact
      - navigation "Legal" [ref=e3085]:
        - heading "Legal" [level=2] [ref=e3086]
        - list [ref=e3087]:
          - listitem [ref=e3088]:
            - generic [ref=e3089]: Terms
          - listitem [ref=e3090]:
            - generic [ref=e3091]: Privacy
    - paragraph [ref=e3093]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3116]:
            - generic [ref=e3117]: About
          - listitem [ref=e3118]:
            - generic [ref=e3119]: How it works
      - navigation "Help" [ref=e3120]:
        - heading "Help" [level=2] [ref=e3121]
        - list [ref=e3122]:
          - listitem [ref=e3123]:
            - generic [ref=e3124]: Safety
          - listitem [ref=e3125]:
            - generic [ref=e3126]: Contact
      - navigation "Legal" [ref=e3127]:
        - heading "Legal" [level=2] [ref=e3128]
        - list [ref=e3129]:
          - listitem [ref=e3130]:
            - generic [ref=e3131]: Terms
          - listitem [ref=e3132]:
            - generic [ref=e3133]: Privacy
    - paragraph [ref=e3135]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3128]:
            - generic [ref=e3129]: About
          - listitem [ref=e3130]:
            - generic [ref=e3131]: How it works
      - navigation "Help" [ref=e3132]:
        - heading "Help" [level=2] [ref=e3133]
        - list [ref=e3134]:
          - listitem [ref=e3135]:
            - generic [ref=e3136]: Safety
          - listitem [ref=e3137]:
            - generic [ref=e3138]: Contact
      - navigation "Legal" [ref=e3139]:
        - heading "Legal" [level=2] [ref=e3140]
        - list [ref=e3141]:
          - listitem [ref=e3142]:
            - generic [ref=e3143]: Terms
          - listitem [ref=e3144]:
            - generic [ref=e3145]: Privacy
    - paragraph [ref=e3147]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3158]:
            - generic [ref=e3159]: About
          - listitem [ref=e3160]:
            - generic [ref=e3161]: How it works
      - navigation "Help" [ref=e3162]:
        - heading "Help" [level=2] [ref=e3163]
        - list [ref=e3164]:
          - listitem [ref=e3165]:
            - generic [ref=e3166]: Safety
          - listitem [ref=e3167]:
            - generic [ref=e3168]: Contact
      - navigation "Legal" [ref=e3169]:
        - heading "Legal" [level=2] [ref=e3170]
        - list [ref=e3171]:
          - listitem [ref=e3172]:
            - generic [ref=e3173]: Terms
          - listitem [ref=e3174]:
            - generic [ref=e3175]: Privacy
    - paragraph [ref=e3177]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-25-an-inherited-year-picker-is-bounded-by-the-model-chosen-three-levels-down-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3208]:
            - generic [ref=e3209]: About
          - listitem [ref=e3210]:
            - generic [ref=e3211]: How it works
      - navigation "Help" [ref=e3212]:
        - heading "Help" [level=2] [ref=e3213]
        - list [ref=e3214]:
          - listitem [ref=e3215]:
            - generic [ref=e3216]: Safety
          - listitem [ref=e3217]:
            - generic [ref=e3218]: Contact
      - navigation "Legal" [ref=e3219]:
        - heading "Legal" [level=2] [ref=e3220]
        - list [ref=e3221]:
          - listitem [ref=e3222]:
            - generic [ref=e3223]: Terms
          - listitem [ref=e3224]:
            - generic [ref=e3225]: Privacy
    - paragraph [ref=e3227]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3633]:
            - generic [ref=e3634]: About
          - listitem [ref=e3635]:
            - generic [ref=e3636]: How it works
      - navigation "Help" [ref=e3637]:
        - heading "Help" [level=2] [ref=e3638]
        - list [ref=e3639]:
          - listitem [ref=e3640]:
            - generic [ref=e3641]: Safety
          - listitem [ref=e3642]:
            - generic [ref=e3643]: Contact
      - navigation "Legal" [ref=e3644]:
        - heading "Legal" [level=2] [ref=e3645]
        - list [ref=e3646]:
          - listitem [ref=e3647]:
            - generic [ref=e3648]: Terms
          - listitem [ref=e3649]:
            - generic [ref=e3650]: Privacy
    - paragraph [ref=e3652]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:c1b] destroying the spec set failed: update or delete on table "attributes" violates foreign key constraint "category_attribute_links_attribute_id_fkey" on table "category_attribute_links"
```

Context:

```text
          - listitem [ref=e3312]:
            - generic [ref=e3313]: About
          - listitem [ref=e3314]:
            - generic [ref=e3315]: How it works
      - navigation "Help" [ref=e3316]:
        - heading "Help" [level=2] [ref=e3317]
        - list [ref=e3318]:
          - listitem [ref=e3319]:
            - generic [ref=e3320]: Safety
          - listitem [ref=e3321]:
            - generic [ref=e3322]: Contact
      - navigation "Legal" [ref=e3323]:
        - heading "Legal" [level=2] [ref=e3324]
        - list [ref=e3325]:
          - listitem [ref=e3326]:
            - generic [ref=e3327]: Terms
          - listitem [ref=e3328]:
            - generic [ref=e3329]: Privacy
    - paragraph [ref=e3331]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-35 a model's allowed set narrows and locks a sibling picker

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3286]:
            - generic [ref=e3287]: About
          - listitem [ref=e3288]:
            - generic [ref=e3289]: How it works
      - navigation "Help" [ref=e3290]:
        - heading "Help" [level=2] [ref=e3291]
        - list [ref=e3292]:
          - listitem [ref=e3293]:
            - generic [ref=e3294]: Safety
          - listitem [ref=e3295]:
            - generic [ref=e3296]: Contact
      - navigation "Legal" [ref=e3297]:
        - heading "Legal" [level=2] [ref=e3298]
        - list [ref=e3299]:
          - listitem [ref=e3300]:
            - generic [ref=e3301]: Terms
          - listitem [ref=e3302]:
            - generic [ref=e3303]: Privacy
    - paragraph [ref=e3305]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-36 a category surfaced under a second root appears under it in the tree

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-36-a-category-surfaced-under-a-second-root-appears-under-it-in-the-tree-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-46 a category created with a secondary parent reaches the tree inside the cache window

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e5216]:
            - generic [ref=e5217]: About
          - listitem [ref=e5218]:
            - generic [ref=e5219]: How it works
      - navigation "Help" [ref=e5220]:
        - heading "Help" [level=2] [ref=e5221]
        - list [ref=e5222]:
          - listitem [ref=e5223]:
            - generic [ref=e5224]: Safety
          - listitem [ref=e5225]:
            - generic [ref=e5226]: Contact
      - navigation "Legal" [ref=e5227]:
        - heading "Legal" [level=2] [ref=e5228]
        - list [ref=e5229]:
          - listitem [ref=e5230]:
            - generic [ref=e5231]: Terms
          - listitem [ref=e5232]:
            - generic [ref=e5233]: Privacy
    - paragraph [ref=e5235]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-47 a level lists the host's own children first, guests next and other- last

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:d30] seeding e2e-post-changed-79-ah7518 failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-47-a-level-lists-the-host-s-own-children-first-guests-next-and-other-last-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-44 a dependent list on a surfaced leaf narrows by its parent

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context: context file not found for `post-wizard-POSTING-WIZARD-PW-44-a-dependent-list-on-a-surfaced-leaf-narrows-by-its-parent-desktop-1280`

## post-wizard.spec.ts › POSTING WIZARD › PW-33 a further place is added under a place already listed, and the plan refuses the second

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3488]:
            - generic [ref=e3489]: About
          - listitem [ref=e3490]:
            - generic [ref=e3491]: How it works
      - navigation "Help" [ref=e3492]:
        - heading "Help" [level=2] [ref=e3493]
        - list [ref=e3494]:
          - listitem [ref=e3495]:
            - generic [ref=e3496]: Safety
          - listitem [ref=e3497]:
            - generic [ref=e3498]: Contact
      - navigation "Legal" [ref=e3499]:
        - heading "Legal" [level=2] [ref=e3500]
        - list [ref=e3501]:
          - listitem [ref=e3502]:
            - generic [ref=e3503]: Terms
          - listitem [ref=e3504]:
            - generic [ref=e3505]: Privacy
    - paragraph [ref=e3507]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3586]:
            - generic [ref=e3587]: About
          - listitem [ref=e3588]:
            - generic [ref=e3589]: How it works
      - navigation "Help" [ref=e3590]:
        - heading "Help" [level=2] [ref=e3591]
        - list [ref=e3592]:
          - listitem [ref=e3593]:
            - generic [ref=e3594]: Safety
          - listitem [ref=e3595]:
            - generic [ref=e3596]: Contact
      - navigation "Legal" [ref=e3597]:
        - heading "Legal" [level=2] [ref=e3598]
        - list [ref=e3599]:
          - listitem [ref=e3600]:
            - generic [ref=e3601]: Terms
          - listitem [ref=e3602]:
            - generic [ref=e3603]: Privacy
    - paragraph [ref=e3605]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:inc257] linking the unhide set failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3604]:
            - generic [ref=e3605]: About
          - listitem [ref=e3606]:
            - generic [ref=e3607]: How it works
      - navigation "Help" [ref=e3608]:
        - heading "Help" [level=2] [ref=e3609]
        - list [ref=e3610]:
          - listitem [ref=e3611]:
            - generic [ref=e3612]: Safety
          - listitem [ref=e3613]:
            - generic [ref=e3614]: Contact
      - navigation "Legal" [ref=e3615]:
        - heading "Legal" [level=2] [ref=e3616]
        - list [ref=e3617]:
          - listitem [ref=e3618]:
            - generic [ref=e3619]: Terms
          - listitem [ref=e3620]:
            - generic [ref=e3621]: Privacy
    - paragraph [ref=e3623]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:d34] seeding the host failed: duplicate key value violates unique constraint "catalog_find_terms_pkey"
```

Context:

```text
          - listitem [ref=e3591]:
            - generic [ref=e3592]: About
          - listitem [ref=e3593]:
            - generic [ref=e3594]: How it works
      - navigation "Help" [ref=e3595]:
        - heading "Help" [level=2] [ref=e3596]
        - list [ref=e3597]:
          - listitem [ref=e3598]:
            - generic [ref=e3599]: Safety
          - listitem [ref=e3600]:
            - generic [ref=e3601]: Contact
      - navigation "Legal" [ref=e3602]:
        - heading "Legal" [level=2] [ref=e3603]
        - list [ref=e3604]:
          - listitem [ref=e3605]:
            - generic [ref=e3606]: Terms
          - listitem [ref=e3607]:
            - generic [ref=e3608]: Privacy
    - paragraph [ref=e3610]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard.spec.ts › POSTING WIZARD › PW-51 a dependent detail never renders above the answer it hangs on

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:c1b] destroying the spec set failed: update or delete on table "attributes" violates foreign key constraint "category_attribute_links_attribute_id_fkey" on table "category_attribute_links"
```

Context:

```text
          - listitem [ref=e3694]:
            - generic [ref=e3695]: About
          - listitem [ref=e3696]:
            - generic [ref=e3697]: How it works
      - navigation "Help" [ref=e3698]:
        - heading "Help" [level=2] [ref=e3699]
        - list [ref=e3700]:
          - listitem [ref=e3701]:
            - generic [ref=e3702]: Safety
          - listitem [ref=e3703]:
            - generic [ref=e3704]: Contact
      - navigation "Legal" [ref=e3705]:
        - heading "Legal" [level=2] [ref=e3706]
        - list [ref=e3707]:
          - listitem [ref=e3708]:
            - generic [ref=e3709]: Terms
          - listitem [ref=e3710]:
            - generic [ref=e3711]: Privacy
    - paragraph [ref=e3713]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/categories/generate-image image_generate_failed stage=persist duplicate key value violates unique constraint "catalog_find_terms_pkey"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import preview_failed canceling statement due to statement timeout
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader ×2
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "catalog_find_terms_pkey"
[WebServer] [ssr-error] /api/admin/categories/import preview_failed canceling statement due to statement timeout
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "catalog_find_terms_pkey"
[WebServer] [ssr-error] /api/admin/attributes/import undo_failed duplicate key value violates unique constraint "catalog_find_terms_pkey"
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import undo_failed duplicate key value violates unique constraint "catalog_find_terms_pkey" ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
```

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 409 () ×11
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_create_category ({"code":"55P03","details":null,"hint":null,"message":"canceling statement due to lock timeout"})
[client-error] console.error: Failed to load resource: the server responded with a status of 409 () ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] HTTP 502 POST http://127.0.0.1:4173/api/admin/categories/generate-image ({"error":"server error"})
[client-error] console.error: Failed to load resource: the server responded with a status of 409 () ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/admin/categories/import ({"error":"server error","message":"canceling statement due to statement timeout"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/admin/categories/import ({"error":"server error","message":"canceling statement due to statement timeout"})
[client-error] console.error: Failed to load resource: the server responded with a status of 409 () ×2
```

## Server errors: shard 2

```text
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
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 2

```text
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 3

```text
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader ×2
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import preview_failed canceling statement due to statement timeout
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "catalog_find_terms_pkey"
[WebServer] [ssr-error] /api/admin/categories/import preview_failed canceling statement due to statement timeout
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "catalog_find_terms_pkey"
[WebServer] [ssr-error] /api/admin/categories/import commit_failed duplicate key value violates unique constraint "catalog_find_terms_pkey"
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import commit_failed duplicate key value violates unique constraint "catalog_find_terms_pkey"
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "catalog_find_terms_pkey"
[WebServer] [ssr-error] /api/admin/attributes/import undo_failed duplicate key value violates unique constraint "catalog_find_terms_pkey"
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
```

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 409 () ×19
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/admin/categories/import ({"error":"server error","message":"canceling statement due to statement timeout"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/admin/categories/import ({"error":"server error","message":"canceling statement due to statement timeout"})
[client-error] console.error: Failed to load resource: the server responded with a status of 409 () ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/admin/categories/import ({"error":"server error","message":"duplicate key value violates unique constraint \"catalog_find_terms_pkey\"","detail":"Key (term_norm)=(bentley) already exists."})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 POST http://127.0.0.1:4173/api/admin/attributes/import ({"error":"server error","message":"duplicate key value violates unique constraint \"catalog_find_terms_pkey\"","detail":"Key (term_norm)=(bentley) already exists."})
```

## Server errors: shard 5

```text
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
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 409 () ×2
```

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
[WebServer] [ssr-error] /api/listings/draft null value in column "listing_id" of relation "listing_revisions" violates not-null constraint
[WebServer] [ssr-error] /api/listings/draft listing not found ×7
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
