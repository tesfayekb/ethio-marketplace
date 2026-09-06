# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34055664954
- Commit: `47de6d76acad3ecd57f8d1059a987aa1123d0e87`
- Attempt: 1
- Written (UTC): 2026-09-06T20:07:06.351Z
- Passed: 410 · Skipped: 76 · Failed: 25
- Gating failures: 25 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 18
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-console.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-lifecycle.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-data.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name — Test timeout of 240000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · auth-callback.spec.ts › C-3: an already-confirmed user gets the honest already-confirmed surface — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · auth-reset.spec.ts › R-3: a recovery link sets a new password, and the old one stops working — Error: expect(locator).toContainText(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › C2 categories console › CT-15 reorder: Move up flips the order with no step-up, catch-all last — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-data.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one — Test timeout of 180000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-categories-console.spec.ts › C2 categories console › CT-11 roster controls: missing-assets filter and a device page size — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories-console.spec.ts › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories-console.spec.ts › C2 categories console › CT-5 exclusions: saving a country set writes the exclusion rows — Error: expect(locator).toBeVisible() failed

## shell.spec.ts › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/admin"
Timeout: 8000ms

Call log:
  - Expect "toHaveURL" with timeout 8000ms
    12 × unexpected value "http://127.0.0.1:4173/admin"

```

Context:

```text
          - listitem [ref=e110]:
            - generic [ref=e111]: About
          - listitem [ref=e112]:
            - generic [ref=e113]: How it works
      - navigation "Help" [ref=e114]:
        - heading "Help" [level=2] [ref=e115]
        - list [ref=e116]:
          - listitem [ref=e117]:
            - generic [ref=e118]: Safety
          - listitem [ref=e119]:
            - generic [ref=e120]: Contact
      - navigation "Legal" [ref=e121]:
        - heading "Legal" [level=2] [ref=e122]
        - list [ref=e123]:
          - listitem [ref=e124]:
            - generic [ref=e125]: Terms
          - listitem [ref=e126]:
            - generic [ref=e127]: Privacy
    - paragraph [ref=e129]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - option "e2e-cat-changed-3-lrfxux"
          - option "e2e-cat-4-4-q3o09f"
          - option "e2e-cat-changed-3-0902rk"
          - option "e2e-cat-1-1-sxwn4o"
          - option "e2e-cat-changed-5-4m1ehm"
          - option "e2e-cat-1-0-16psht"
          - option "e2e-cat-1-3-vg8l69"
          - option "e2e-cat-4-5-avkqm8"
          - option "e2e-cat-1-2-94wn9o" [selected]
          - option "e2e-cat-1-4-tndam6"
          - option "e2e-cat-changed-7-qc8887"
          - option "e2e-cat-4-7-7m66eq"
          - option "e2e-cat-changed-8-ggpnm9"
      - generic [ref=e10]:
        - button "Cancel" [ref=e11] [cursor=pointer]
        - button "Retire" [disabled]
    - button "Close" [ref=e12] [cursor=pointer]:
      - img [ref=e13]
      - generic [ref=e16]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e148]:
            - generic [ref=e149]: About
          - listitem [ref=e150]:
            - generic [ref=e151]: How it works
      - navigation "Help" [ref=e152]:
        - heading "Help" [level=2] [ref=e153]
        - list [ref=e154]:
          - listitem [ref=e155]:
            - generic [ref=e156]: Safety
          - listitem [ref=e157]:
            - generic [ref=e158]: Contact
      - navigation "Legal" [ref=e159]:
        - heading "Legal" [level=2] [ref=e160]
        - list [ref=e161]:
          - listitem [ref=e162]:
            - generic [ref=e163]: Terms
          - listitem [ref=e164]:
            - generic [ref=e165]: Privacy
    - paragraph [ref=e167]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e133]:
            - generic [ref=e134]: About
          - listitem [ref=e135]:
            - generic [ref=e136]: How it works
      - navigation "Help" [ref=e137]:
        - heading "Help" [level=2] [ref=e138]
        - list [ref=e139]:
          - listitem [ref=e140]:
            - generic [ref=e141]: Safety
          - listitem [ref=e142]:
            - generic [ref=e143]: Contact
      - navigation "Legal" [ref=e144]:
        - heading "Legal" [level=2] [ref=e145]
        - list [ref=e146]:
          - listitem [ref=e147]:
            - generic [ref=e148]: Terms
          - listitem [ref=e149]:
            - generic [ref=e150]: Privacy
    - paragraph [ref=e152]: © 2026 ethio.com — All rights reserved.
```
```

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
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e101]:
            - generic [ref=e102]: About
          - listitem [ref=e103]:
            - generic [ref=e104]: How it works
      - navigation "Help" [ref=e105]:
        - heading "Help" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Safety
          - listitem [ref=e110]:
            - generic [ref=e111]: Contact
      - navigation "Legal" [ref=e112]:
        - heading "Legal" [level=2] [ref=e113]
        - list [ref=e114]:
          - listitem [ref=e115]:
            - generic [ref=e116]: Terms
          - listitem [ref=e117]:
            - generic [ref=e118]: Privacy
    - paragraph [ref=e120]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
      - generic [ref=e37]:
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
      - generic [ref=e50]:
        - button "Cancel" [ref=e51] [cursor=pointer]
        - button "Save" [disabled]
    - button "Close" [ref=e52] [cursor=pointer]:
      - img [ref=e53]
      - generic [ref=e56]: Close
```
```

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-15 reorder: Move up flips the order with no step-up, catch-all last

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
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

## admin-users.spec.ts › U1 admin users › AU-9 edit: staff edits display name and alias, activity records it

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('edit-display-name')
Expected: "U1g Edited Name"
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 15000ms
  - waiting for getByTestId('edit-display-name')

```

Context:

```text
          - listitem [ref=e99]:
            - generic [ref=e100]: About
          - listitem [ref=e101]:
            - generic [ref=e102]: How it works
      - navigation "Help" [ref=e103]:
        - heading "Help" [level=2] [ref=e104]
        - list [ref=e105]:
          - listitem [ref=e106]:
            - generic [ref=e107]: Safety
          - listitem [ref=e108]:
            - generic [ref=e109]: Contact
      - navigation "Legal" [ref=e110]:
        - heading "Legal" [level=2] [ref=e111]
        - list [ref=e112]:
          - listitem [ref=e113]:
            - generic [ref=e114]: Terms
          - listitem [ref=e115]:
            - generic [ref=e116]: Privacy
    - paragraph [ref=e118]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e148]:
            - generic [ref=e149]: About
          - listitem [ref=e150]:
            - generic [ref=e151]: How it works
      - navigation "Help" [ref=e152]:
        - heading "Help" [level=2] [ref=e153]
        - list [ref=e154]:
          - listitem [ref=e155]:
            - generic [ref=e156]: Safety
          - listitem [ref=e157]:
            - generic [ref=e158]: Contact
      - navigation "Legal" [ref=e159]:
        - heading "Legal" [level=2] [ref=e160]
        - list [ref=e161]:
          - listitem [ref=e162]:
            - generic [ref=e163]: Terms
          - listitem [ref=e164]:
            - generic [ref=e165]: Privacy
    - paragraph [ref=e167]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Attributes — e2e-cat-4-1-j5rc0u" [active] [ref=e2]:
    - heading "Attributes — e2e-cat-4-1-j5rc0u" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Attributes — e2e-cat-4-1-j5rc0u
      - paragraph [ref=e6]: No attribute is shown on the listing card yet.
      - status [ref=e7]: Pick at least two attributes to show on listing cards.
      - paragraph [ref=e8]: No attribute is linked to this category yet.
      - generic [ref=e9]:
        - textbox "Search the library" [ref=e10]: e2e_attr_0ibuv5
        - combobox "Add attribute" [ref=e11]:
          - option "Choose an attribute" [selected]
          - option "e2e_attr_0ibuv5 (e2e_attr_0ibuv5)"
        - button "Add attribute" [disabled]
      - button "Close" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Attributes — e2e-cat-4-4-q3o09f" [ref=e2]:
    - heading "Attributes — e2e-cat-4-4-q3o09f" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Attributes — e2e-cat-4-4-q3o09f
      - paragraph [ref=e6]: No attribute is shown on the listing card yet.
      - status [ref=e7]: Pick at least two attributes to show on listing cards.
      - paragraph [ref=e8]: Loading…
      - generic [ref=e9]:
        - textbox "Search the library" [active] [ref=e10]
        - combobox "Add attribute" [ref=e11]:
          - option "Choose an attribute" [selected]
        - button "Add attribute" [disabled]
      - button "Close" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - option "— Tools & Site Machinery"
          - option "— Industrial Machinery"
          - option "— Other Commercial Equipment"
          - option "e2e-cat-changed-1-puks6e"
          - option "e2e-cat-changed-3-lrfxux"
          - option "e2e-cat-4-4-q3o09f"
          - option "e2e-cat-changed-3-0902rk"
          - option "e2e-cat-1-1-sxwn4o"
          - option "e2e-cat-changed-5-4m1ehm"
          - option "e2e-cat-1-0-16psht"
          - option "e2e-cat-1-3-vg8l69"
          - option "e2e-cat-changed-6-4tpr3l"
          - option "e2e-cat-4-5-avkqm8" [selected]
      - generic [ref=e10]:
        - button "Cancel" [ref=e11] [cursor=pointer]
        - button "Retire" [disabled]
    - button "Close" [ref=e12] [cursor=pointer]:
      - img [ref=e13]
      - generic [ref=e16]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - navigation:
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Edit category" [active] [ref=e2]:
    - heading "Edit category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Edit category
      - generic [ref=e6]:
        - paragraph [ref=e7]: Loading saved image…
        - button "Close" [ref=e9] [cursor=pointer]
    - button "Close" [ref=e10] [cursor=pointer]:
      - img [ref=e11]
      - generic [ref=e14]: Close
```
```

## admin-categories-images.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - paragraph [ref=e7]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
        - generic [ref=e8]:
          - figure "Card 512" [ref=e9]:
            - img "Card 512" [ref=e10]
            - generic [ref=e11]: Card 512
          - figure "Thumbnail 128" [ref=e12]:
            - img "Thumbnail 128" [ref=e13]
            - generic [ref=e14]: Thumbnail 128
          - figure "Social image 1200x630" [ref=e15]:
            - img "Social image 1200x630" [ref=e16]
            - generic [ref=e17]: Social image 1200x630
        - paragraph [ref=e18]: "stage: done · 155/183/338 ms"
        - button "Regenerate image" [ref=e19] [cursor=pointer]
      - generic [ref=e20]:
        - button "Accept this image" [disabled]
      - button "Close" [ref=e22] [cursor=pointer]
    - button "Close" [ref=e23] [cursor=pointer]:
      - img [ref=e24]
      - generic [ref=e27]: Close
```
```

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e189]:
            - generic [ref=e190]: About
          - listitem [ref=e191]:
            - generic [ref=e192]: How it works
      - navigation "Help" [ref=e193]:
        - heading "Help" [level=2] [ref=e194]
        - list [ref=e195]:
          - listitem [ref=e196]:
            - generic [ref=e197]: Safety
          - listitem [ref=e198]:
            - generic [ref=e199]: Contact
      - navigation "Legal" [ref=e200]:
        - heading "Legal" [level=2] [ref=e201]
        - list [ref=e202]:
          - listitem [ref=e203]:
            - generic [ref=e204]: Terms
          - listitem [ref=e205]:
            - generic [ref=e206]: Privacy
    - paragraph [ref=e208]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e189]:
            - generic [ref=e190]: About
          - listitem [ref=e191]:
            - generic [ref=e192]: How it works
      - navigation "Help" [ref=e193]:
        - heading "Help" [level=2] [ref=e194]
        - list [ref=e195]:
          - listitem [ref=e196]:
            - generic [ref=e197]: Safety
          - listitem [ref=e198]:
            - generic [ref=e199]: Contact
      - navigation "Legal" [ref=e200]:
        - heading "Legal" [level=2] [ref=e201]
        - list [ref=e202]:
          - listitem [ref=e203]:
            - generic [ref=e204]: Terms
          - listitem [ref=e205]:
            - generic [ref=e206]: Privacy
    - paragraph [ref=e208]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e697]:
            - generic [ref=e698]: About
          - listitem [ref=e699]:
            - generic [ref=e700]: How it works
      - navigation "Help" [ref=e701]:
        - heading "Help" [level=2] [ref=e702]
        - list [ref=e703]:
          - listitem [ref=e704]:
            - generic [ref=e705]: Safety
          - listitem [ref=e706]:
            - generic [ref=e707]: Contact
      - navigation "Legal" [ref=e708]:
        - heading "Legal" [level=2] [ref=e709]
        - list [ref=e710]:
          - listitem [ref=e711]:
            - generic [ref=e712]: Terms
          - listitem [ref=e713]:
            - generic [ref=e714]: Privacy
    - paragraph [ref=e716]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-users-U1-admin-users-AU-10-edit-a-duplicate-alias-is-refused-inline-and-nothing-changes-desktop-1280`

## admin-attributes.spec.ts › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - option "Title Status (title_status)"
          - option "Age Range (toy_age_range)"
          - option "Toy Type (toy_type)"
          - option "Transmission (transmission-cars)"
          - option "Transmission (transmission-vehicles)"
          - option "Utilities Available (utilities_available)"
          - option "Warranty (warranty)"
          - option "Water Type (water_type)"
          - option "Weight Capacity (weight_capacity)"
          - option "Clothing Type (womens_clothing_type)"
          - option "Size (womens_size)"
          - option "Year (year)"
          - option "Year Built (year_built)"
          - option "Zoning / Land Use (zoning)"
        - button "Add attribute" [disabled]
      - button "Close" [ref=e40] [cursor=pointer]
    - button "Close" [ref=e41] [cursor=pointer]:
      - img [ref=e42]
      - generic [ref=e45]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Attributes — e2e-cat-4-1-j5rc0u" [active] [ref=e2]:
    - heading "Attributes — e2e-cat-4-1-j5rc0u" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Attributes — e2e-cat-4-1-j5rc0u
      - paragraph [ref=e6]: No attribute is shown on the listing card yet.
      - status [ref=e7]: Pick at least two attributes to show on listing cards.
      - paragraph [ref=e8]: No attribute is linked to this category yet.
      - generic [ref=e9]:
        - textbox "Search the library" [ref=e10]: e2e_attr_0ibuv5
        - combobox "Add attribute" [ref=e11]:
          - option "Choose an attribute" [selected]
          - option "e2e_attr_0ibuv5 (e2e_attr_0ibuv5)"
        - button "Add attribute" [disabled]
      - button "Close" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag

- Source: `changed`
- Project: `desktop-1280`

```text
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

Context:

```text
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Attributes — e2e-cat-4-4-q3o09f" [ref=e2]:
    - heading "Attributes — e2e-cat-4-4-q3o09f" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Attributes — e2e-cat-4-4-q3o09f
      - paragraph [ref=e6]: No attribute is shown on the listing card yet.
      - status [ref=e7]: Pick at least two attributes to show on listing cards.
      - paragraph [ref=e8]: Loading…
      - generic [ref=e9]:
        - textbox "Search the library" [active] [ref=e10]
        - combobox "Add attribute" [ref=e11]:
          - option "Choose an attribute" [selected]
        - button "Add attribute" [disabled]
      - button "Close" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - option "e2e-cat-changed-3-lrfxux"
          - option "e2e-cat-4-4-q3o09f"
          - option "e2e-cat-changed-3-0902rk"
          - option "e2e-cat-1-1-sxwn4o"
          - option "e2e-cat-changed-5-4m1ehm"
          - option "e2e-cat-1-0-16psht"
          - option "e2e-cat-1-3-vg8l69"
          - option "e2e-cat-4-5-avkqm8"
          - option "e2e-cat-1-2-94wn9o" [selected]
          - option "e2e-cat-1-4-tndam6"
          - option "e2e-cat-changed-7-qc8887"
          - option "e2e-cat-4-7-7m66eq"
          - option "e2e-cat-changed-8-ggpnm9"
      - generic [ref=e10]:
        - button "Cancel" [ref=e11] [cursor=pointer]
        - button "Retire" [disabled]
    - button "Close" [ref=e12] [cursor=pointer]:
      - img [ref=e13]
      - generic [ref=e16]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e101]:
            - generic [ref=e102]: About
          - listitem [ref=e103]:
            - generic [ref=e104]: How it works
      - navigation "Help" [ref=e105]:
        - heading "Help" [level=2] [ref=e106]
        - list [ref=e107]:
          - listitem [ref=e108]:
            - generic [ref=e109]: Safety
          - listitem [ref=e110]:
            - generic [ref=e111]: Contact
      - navigation "Legal" [ref=e112]:
        - heading "Legal" [level=2] [ref=e113]
        - list [ref=e114]:
          - listitem [ref=e115]:
            - generic [ref=e116]: Terms
          - listitem [ref=e117]:
            - generic [ref=e118]: Privacy
    - paragraph [ref=e120]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e245]:
            - generic [ref=e246]: About
          - listitem [ref=e247]:
            - generic [ref=e248]: How it works
      - navigation "Help" [ref=e249]:
        - heading "Help" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Safety
          - listitem [ref=e254]:
            - generic [ref=e255]: Contact
      - navigation "Legal" [ref=e256]:
        - heading "Legal" [level=2] [ref=e257]
        - list [ref=e258]:
          - listitem [ref=e259]:
            - generic [ref=e260]: Terms
          - listitem [ref=e261]:
            - generic [ref=e262]: Privacy
    - paragraph [ref=e264]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

```text
[WebServer] [ssr-error] /api/i18n canceling statement due to statement timeout ×3
```

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/categories/generate-image image_generate_failed stage=upload storage upload failed: The connection to the database timed out
```

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] HTTP 502 POST http://127.0.0.1:4173/api/admin/categories/generate-image ({"error":"server error"})
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-ClVsKtaS.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:15969:21) ×3
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

```text
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-ClVsKtaS.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:15969:21) ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 422 ()
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
