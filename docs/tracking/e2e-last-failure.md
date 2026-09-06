# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34013402586
- Commit: `c4918da2b3bd68e732dcffbbc69ea7ff1c85032c`
- Attempt: 1
- Written (UTC): 2026-09-06T05:39:45.076Z
- Passed: 395 · Skipped: 76 · Failed: 42
- Gating failures: 42 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 16
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · auth-signout.spec.ts › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface — Error: [e2e:users] admin.createUser failed for e2e+34013402586-smoke-2-3-fuq5jv@ethio-e2e.invalid: A user with this email address has already been registered
- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › panel follows the route › /settings shows the Account context, and returning shows categories — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves — Error: expect(received).toBeLessThan(expected)
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-console.spec.ts › C2 categories console › CT-5 exclusions: saving a country set writes the exclusion rows — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-lifecycle.spec.ts › C2 categories console › CT-14 catch-all law: never a parent, refused server-side, no move verbs — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · auth-reset.spec.ts › R-3: a recovery link sets a new password, and the old one stops working — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · mfa-stepup.spec.ts › U1f step-up authentication › MF-1 enroll: QR + secret shown, a generated code activates the factor — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-2 roster: the ratified tree renders, search narrows it, nothing overflows — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-translations-data.spec.ts › U4b translations console › TR-26 the Data scope approves every machine-filled content name — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · auth-signout.spec.ts › U0j sign-out hard reset › SO-3 live guard: a same-tab client sign-out evacuates /admin — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · mfa-stepup.spec.ts › U1f step-up authentication › MF-1 enroll: QR + secret shown, a generated code activates the factor — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · shell.spec.ts › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves — Error: expect(received).toBeLessThan(expected)
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-attributes.spec.ts › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `changed` · admin-categories-console.spec.ts › C2 categories console › CT-5 exclusions: saving a country set writes the exclusion rows — Error: expect(locator).toBeVisible() failed

## shell.spec.ts › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThan(expected)

Expected: < 5000
Received:   6455
```

Context:

```text
          - listitem [ref=e503]:
            - generic [ref=e504]: About
          - listitem [ref=e505]:
            - generic [ref=e506]: How it works
      - navigation "Help" [ref=e507]:
        - heading "Help" [level=2] [ref=e508]
        - list [ref=e509]:
          - listitem [ref=e510]:
            - generic [ref=e511]: Safety
          - listitem [ref=e512]:
            - generic [ref=e513]: Contact
      - navigation "Legal" [ref=e514]:
        - heading "Legal" [level=2] [ref=e515]
        - list [ref=e516]:
          - listitem [ref=e517]:
            - generic [ref=e518]: Terms
          - listitem [ref=e519]:
            - generic [ref=e520]: Privacy
    - paragraph [ref=e522]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth)

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-attributes-C3-attributes-console-AT-2-definitions-a-scratch-attribute-is-created-and-renamed-DB-truth-mobile-360`

## admin-attributes.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Attributes — e2e-cat-1-3-coqbf3" [ref=e2]:
    - heading "Attributes — e2e-cat-1-3-coqbf3" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Attributes — e2e-cat-1-3-coqbf3
      - paragraph [ref=e6]: No attribute is shown on the listing card yet.
      - status [ref=e7]: Pick at least two attributes to show on listing cards.
      - paragraph [ref=e8]: No attribute is linked to this category yet.
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

## admin-attributes.spec.ts › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag

- Source: `shard 1`
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

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete attribute" [ref=e2]:
    - heading "Delete attribute" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Delete attribute
      - paragraph [ref=e6]: The definition disappears from the library. Categories that use it must be unlinked first.
      - status [ref=e7]: 1 categories still use this attribute.
      - generic [ref=e8]:
        - generic [ref=e9]: Type e2e_attr_azfb49 to confirm
        - textbox "Type e2e_attr_azfb49 to confirm" [active] [ref=e10]: e2e_attr_azfb49
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Delete" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-6 merge: links move to the survivor and the sources disappear

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - generic [ref=e682]:
            - checkbox "Size (womens_size) · 1" [ref=e683] [cursor=pointer]
            - generic [ref=e684]: Size (womens_size) · 1
          - generic [ref=e685]:
            - checkbox "Year (year) · 1" [ref=e686] [cursor=pointer]
            - generic [ref=e687]: Year (year) · 1
          - generic [ref=e688]:
            - checkbox "Year Built (year_built) · 1" [ref=e689] [cursor=pointer]
            - generic [ref=e690]: Year Built (year_built) · 1
          - generic [ref=e691]:
            - checkbox "Zoning / Land Use (zoning) · 1" [ref=e692] [cursor=pointer]
            - generic [ref=e693]: Zoning / Land Use (zoning) · 1
      - status [ref=e694]: 1 links moved · 0 folded into an existing link · 1 definitions removed.
      - generic [ref=e695]:
        - button "Cancel" [ref=e696] [cursor=pointer]
        - button "Merge" [ref=e697] [cursor=pointer]
    - button "Close" [ref=e698] [cursor=pointer]:
      - img [ref=e699]
      - generic [ref=e702]: Close
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
        - generic [ref=e42]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e43]:
          - /placeholder: No expiry
      - generic [ref=e44]:
        - checkbox "Accepts listings" [checked] [ref=e45] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e46]:
        - checkbox "Price field enabled" [checked] [ref=e47] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e48]:
        - button "Cancel" [ref=e49] [cursor=pointer]
        - button "Save" [ref=e50] [cursor=pointer]
    - button "Close" [ref=e51] [cursor=pointer]:
      - img [ref=e52]
      - generic [ref=e55]: Close
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
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-18-fvy4ti-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-18-fvy4ti-card')

[dialog-dump findRow(e2e-cat-1-18-fvy4ti)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-1-18-fvy4ti) after create] open dialogs: none
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

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e84]:
            - generic [ref=e85]: About
          - listitem [ref=e86]:
            - generic [ref=e87]: How it works
      - navigation "Help" [ref=e88]:
        - heading "Help" [level=2] [ref=e89]
        - list [ref=e90]:
          - listitem [ref=e91]:
            - generic [ref=e92]: Safety
          - listitem [ref=e93]:
            - generic [ref=e94]: Contact
      - navigation "Legal" [ref=e95]:
        - heading "Legal" [level=2] [ref=e96]
        - list [ref=e97]:
          - listitem [ref=e98]:
            - generic [ref=e99]: Terms
          - listitem [ref=e100]:
            - generic [ref=e101]: Privacy
    - paragraph [ref=e103]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('account-deactivated-banner')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('account-deactivated-banner')

```

Context:

```text
          - listitem [ref=e80]:
            - generic [ref=e81]: About
          - listitem [ref=e82]:
            - generic [ref=e83]: How it works
      - navigation "Help" [ref=e84]:
        - heading "Help" [level=2] [ref=e85]
        - list [ref=e86]:
          - listitem [ref=e87]:
            - generic [ref=e88]: Safety
          - listitem [ref=e89]:
            - generic [ref=e90]: Contact
      - navigation "Legal" [ref=e91]:
        - heading "Legal" [level=2] [ref=e92]
        - list [ref=e93]:
          - listitem [ref=e94]:
            - generic [ref=e95]: Terms
          - listitem [ref=e96]:
            - generic [ref=e97]: Privacy
    - paragraph [ref=e99]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-5 seam: a deactivated account cannot write a listing

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('user-status-card').getByTestId('user-status')
Expected: "Deactivated"
Received: "Active"
Timeout:  15000ms

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('user-status-card').getByTestId('user-status')
    19 × locator resolved to <div data-testid="user-status" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">Active</div>
       - unexpected value "Active"

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

## admin-users.spec.ts › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
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

## auth-signout.spec.ts › U0k session policy › SP-3 absolute: continuous activity does not save the session

- Source: `shard 2`
- Project: `mobile-360`

```text
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
```

Context:

```text
          - listitem [ref=e75]:
            - generic [ref=e76]: About
          - listitem [ref=e77]:
            - generic [ref=e78]: How it works
      - navigation "Help" [ref=e79]:
        - heading "Help" [level=2] [ref=e80]
        - list [ref=e81]:
          - listitem [ref=e82]:
            - generic [ref=e83]: Safety
          - listitem [ref=e84]:
            - generic [ref=e85]: Contact
      - navigation "Legal" [ref=e86]:
        - heading "Legal" [level=2] [ref=e87]
        - list [ref=e88]:
          - listitem [ref=e89]:
            - generic [ref=e90]: Terms
          - listitem [ref=e91]:
            - generic [ref=e92]: Privacy
    - paragraph [ref=e94]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('step-up-error')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('step-up-error')

```

Context:

```text
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog [ref=e2]:
    - heading "Two-factor verification required" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Two-factor verification required
      - paragraph [ref=e6]: This action requires two-factor verification. Enter the current code from your authenticator app.
      - generic [ref=e7]: Six-digit code
      - textbox "Six-digit code" [ref=e8]:
        - /placeholder: "123456"
        - text: "000000"
      - button "Verify and continue" [disabled]
      - button "Cancel" [disabled]
    - button "Close" [ref=e9] [cursor=pointer]:
      - img [ref=e10]
      - generic [ref=e13]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-attributes-C3-attributes-console-AT-2-definitions-a-scratch-attribute-is-created-and-renamed-DB-truth-desktop-1280`

## admin-attributes.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked

- Source: `shard 4`
- Project: `desktop-1280`

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

## admin-attributes.spec.ts › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag

- Source: `shard 4`
- Project: `desktop-1280`

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

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

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
  - dialog "Delete attribute" [ref=e2]:
    - heading "Delete attribute" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Delete attribute
      - paragraph [ref=e6]: The definition disappears from the library. Categories that use it must be unlinked first.
      - status [ref=e7]: 1 categories still use this attribute.
      - generic [ref=e8]:
        - generic [ref=e9]: Type e2e_attr_3wlgs7 to confirm
        - textbox "Type e2e_attr_3wlgs7 to confirm" [ref=e10]: e2e_attr_3wlgs7
      - alert [ref=e11]: The change could not be saved.
      - generic [ref=e12]:
        - button "Cancel" [ref=e13] [cursor=pointer]
        - button "Delete" [ref=e14] [cursor=pointer]
    - button "Close" [ref=e15] [cursor=pointer]:
      - img [ref=e16]
      - generic [ref=e19]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-6 merge: links move to the survivor and the sources disappear

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

## admin-categories-console.spec.ts › C2 categories console › CT-5 exclusions: saving a country set writes the exclusion rows

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('mfa-qr')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('mfa-qr')

```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: How it works
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
          - listitem [ref=e237]:
            - generic [ref=e238]: Contact
      - navigation "Legal" [ref=e239]:
        - heading "Legal" [level=2] [ref=e240]
        - list [ref=e241]:
          - listitem [ref=e242]:
            - generic [ref=e243]: Terms
          - listitem [ref=e244]:
            - generic [ref=e245]: Privacy
    - paragraph [ref=e247]: © 2026 ethio.com — All rights reserved.
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

## admin-categories-console.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('mfa-qr')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('mfa-qr')

```

Context:

```text
          - listitem [ref=e227]:
            - generic [ref=e228]: About
          - listitem [ref=e229]:
            - generic [ref=e230]: How it works
      - navigation "Help" [ref=e231]:
        - heading "Help" [level=2] [ref=e232]
        - list [ref=e233]:
          - listitem [ref=e234]:
            - generic [ref=e235]: Safety
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Legal" [ref=e238]:
        - heading "Legal" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Terms
          - listitem [ref=e243]:
            - generic [ref=e244]: Privacy
    - paragraph [ref=e246]: © 2026 ethio.com — All rights reserved.
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
        - generic: Add another browse path
        - combobox
      - generic:
        - button: Cancel
        - button: Add path
    - button:
      - img
      - generic: Close
  - dialog [ref=e3]:
    - heading "Set up two-factor authentication first" [level=2] [ref=e4]
    - generic [ref=e5]:
      - paragraph [ref=e6]: Set up two-factor authentication first
      - paragraph [ref=e7]: This action requires two-factor verification, and this account has no authenticator app yet.
      - link "Go to settings" [ref=e8] [cursor=pointer]:
        - /url: /settings
      - button "Cancel" [active] [ref=e9] [cursor=pointer]
    - button "Close" [ref=e10] [cursor=pointer]:
      - img [ref=e11]
      - generic [ref=e14]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll

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
        - paragraph [ref=e18]: "stage: done · 95/156/251 ms"
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

## admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e229]:
            - generic [ref=e230]: About
          - listitem [ref=e231]:
            - generic [ref=e232]: How it works
      - navigation "Help" [ref=e233]:
        - heading "Help" [level=2] [ref=e234]
        - list [ref=e235]:
          - listitem [ref=e236]:
            - generic [ref=e237]: Safety
          - listitem [ref=e238]:
            - generic [ref=e239]: Contact
      - navigation "Legal" [ref=e240]:
        - heading "Legal" [level=2] [ref=e241]
        - list [ref=e242]:
          - listitem [ref=e243]:
            - generic [ref=e244]: Terms
          - listitem [ref=e245]:
            - generic [ref=e246]: Privacy
    - paragraph [ref=e248]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-5 seam: a deactivated account cannot write a listing

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('mfa-qr')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('mfa-qr')

```

Context:

```text
          - listitem [ref=e227]:
            - generic [ref=e228]: About
          - listitem [ref=e229]:
            - generic [ref=e230]: How it works
      - navigation "Help" [ref=e231]:
        - heading "Help" [level=2] [ref=e232]
        - list [ref=e233]:
          - listitem [ref=e234]:
            - generic [ref=e235]: Safety
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Legal" [ref=e238]:
        - heading "Legal" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Terms
          - listitem [ref=e243]:
            - generic [ref=e244]: Privacy
    - paragraph [ref=e246]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e120]:
            - generic [ref=e121]: About
          - listitem [ref=e122]:
            - generic [ref=e123]: How it works
      - navigation "Help" [ref=e124]:
        - heading "Help" [level=2] [ref=e125]
        - list [ref=e126]:
          - listitem [ref=e127]:
            - generic [ref=e128]: Safety
          - listitem [ref=e129]:
            - generic [ref=e130]: Contact
      - navigation "Legal" [ref=e131]:
        - heading "Legal" [level=2] [ref=e132]
        - list [ref=e133]:
          - listitem [ref=e134]:
            - generic [ref=e135]: Terms
          - listitem [ref=e136]:
            - generic [ref=e137]: Privacy
    - paragraph [ref=e139]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth)

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-attributes-C3-attributes-console-AT-2-definitions-a-scratch-attribute-is-created-and-renamed-DB-truth-mobile-360`

## admin-attributes.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Attributes — e2e-cat-1-3-coqbf3" [ref=e2]:
    - heading "Attributes — e2e-cat-1-3-coqbf3" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Attributes — e2e-cat-1-3-coqbf3
      - paragraph [ref=e6]: No attribute is shown on the listing card yet.
      - status [ref=e7]: Pick at least two attributes to show on listing cards.
      - paragraph [ref=e8]: No attribute is linked to this category yet.
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

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete attribute" [ref=e2]:
    - heading "Delete attribute" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Delete attribute
      - paragraph [ref=e6]: The definition disappears from the library. Categories that use it must be unlinked first.
      - status [ref=e7]: 1 categories still use this attribute.
      - generic [ref=e8]:
        - generic [ref=e9]: Type e2e_attr_azfb49 to confirm
        - textbox "Type e2e_attr_azfb49 to confirm" [active] [ref=e10]: e2e_attr_azfb49
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Delete" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-6 merge: links move to the survivor and the sources disappear

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - generic [ref=e682]:
            - checkbox "Size (womens_size) · 1" [ref=e683] [cursor=pointer]
            - generic [ref=e684]: Size (womens_size) · 1
          - generic [ref=e685]:
            - checkbox "Year (year) · 1" [ref=e686] [cursor=pointer]
            - generic [ref=e687]: Year (year) · 1
          - generic [ref=e688]:
            - checkbox "Year Built (year_built) · 1" [ref=e689] [cursor=pointer]
            - generic [ref=e690]: Year Built (year_built) · 1
          - generic [ref=e691]:
            - checkbox "Zoning / Land Use (zoning) · 1" [ref=e692] [cursor=pointer]
            - generic [ref=e693]: Zoning / Land Use (zoning) · 1
      - status [ref=e694]: 1 links moved · 0 folded into an existing link · 1 definitions removed.
      - generic [ref=e695]:
        - button "Cancel" [ref=e696] [cursor=pointer]
        - button "Merge" [ref=e697] [cursor=pointer]
    - button "Close" [ref=e698] [cursor=pointer]:
      - img [ref=e699]
      - generic [ref=e702]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth)

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-attributes-C3-attributes-console-AT-2-definitions-a-scratch-attribute-is-created-and-renamed-DB-truth-desktop-1280`

## admin-attributes.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked

- Source: `changed`
- Project: `desktop-1280`

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

## admin-categories-console.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - generic [ref=e42]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e43]:
          - /placeholder: No expiry
      - generic [ref=e44]:
        - checkbox "Accepts listings" [checked] [ref=e45] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e46]:
        - checkbox "Price field enabled" [checked] [ref=e47] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e48]:
        - button "Cancel" [ref=e49] [cursor=pointer]
        - button "Save" [ref=e50] [cursor=pointer]
    - button "Close" [ref=e51] [cursor=pointer]:
      - img [ref=e52]
      - generic [ref=e55]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `changed`
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

## admin-categories-console.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - generic:
            - img
        - text: Price field enabled
      - paragraph [ref=e29]: Leave a date empty to remove that bound. Times are UTC.
      - generic [ref=e30]:
        - generic [ref=e31]: Visible from
        - textbox "Visible from" [ref=e32]
      - generic [ref=e33]:
        - generic [ref=e34]: Visible until
        - textbox "Visible until" [ref=e35]
      - generic [ref=e36]:
        - generic [ref=e37]: Hide in countries
        - paragraph [ref=e38]: The category stays hidden in every country you tick; you can change this later.
      - generic [ref=e39]:
        - button "Cancel" [ref=e40] [cursor=pointer]
        - button "Save" [ref=e41] [cursor=pointer]
    - button "Close" [ref=e42] [cursor=pointer]:
      - img [ref=e43]
      - generic [ref=e46]: Close
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
          - listitem [ref=e231]:
            - generic [ref=e232]: About
          - listitem [ref=e233]:
            - generic [ref=e234]: How it works
      - navigation "Help" [ref=e235]:
        - heading "Help" [level=2] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - generic [ref=e239]: Safety
          - listitem [ref=e240]:
            - generic [ref=e241]: Contact
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Terms
          - listitem [ref=e247]:
            - generic [ref=e248]: Privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

```text
[WebServer] [ssr-error] /api/i18n canceling statement due to statement timeout
```

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/categories/generate-image image_generate_failed stage=persist permission denied
[WebServer] [ssr-error] /api/i18n canceling statement due to statement timeout
```

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×2
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 GET https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/categories?select=id%2Cname_en%2Cname_am%2Cslug%2Cicon%2Cdisplay_order&is_active=eq.true&order=display_order.asc ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
[client-error] console.error: Failed to load resource: the server responded with a status of 422 ()
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

```text
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-BPSZj6Ck.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-BPSZj6Ck.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-BPSZj6Ck.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-BPSZj6Ck.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-BPSZj6Ck.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-BPSZj6Ck.js:15969:21) ×3
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/factors ({"code":"unexpected_failure","message":"Unexpected failure, please check server logs for more information"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_delete_attribute ({"code":"P0010","details":null,"hint":null,"message":"admin.attributes.error.deleteHasLinks:1"})
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: the server responded with a status of 422 ()
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/i18n canceling statement due to statement timeout
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_delete_attribute ({"code":"P0010","details":null,"hint":null,"message":"admin.attributes.error.deleteHasLinks:1"})
```
