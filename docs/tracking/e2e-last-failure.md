# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34057133315
- Commit: `e8c3dce58f3509d1f73981e7840cc62297158862`
- Attempt: 1
- Written (UTC): 2026-09-06T20:30:55.631Z
- Passed: 424 · Skipped: 75 · Failed: 22
- Gating failures: 22 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 16
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › app shell › the feed body is centred with equal left and right gutters — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › panel-scoped chrome › location row is present on Marketplace and absent on Account — Error: expect(locator).toContainText(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves — Error: expect(received).toBeLessThan(expected)
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-roles.spec.ts › U2 roles console › RP-2 create: a super admin creates a custom role through step-up — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-roles.spec.ts › U2 roles console › RP-5 delete guards: members block deletion; typed confirm deletes — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-translations-console.spec.ts › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge — Test timeout of 120000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · category-image-routes.spec.ts › C5a — category AI foundation routes › CI-2 fake generate produces three assets and updates the row — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · mfa-stepup.spec.ts › U1f step-up authentication › MF-1 enroll: QR + secret shown, a generated code activates the factor — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · mfa-stepup.spec.ts › U1f step-up authentication › MF-5 unenroll requires a fresh verification — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-roles.spec.ts › U2 roles console › RP-2 create: a super admin creates a custom role through step-up — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-roles.spec.ts › U2 roles console › RP-3 matrix: grant then revoke a benign permission, persisted across reload — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · mfa-stepup.spec.ts › U1f-4 step-up freshness › MF-6 unenrolling the only factor drops the stepped-up state — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories-console.spec.ts › C2 categories console › CT-5 exclusions: saving a country set writes the exclusion rows — Error: expect(locator).toBeVisible() failed

## shell.spec.ts › app shell › the feed body is centred with equal left and right gutters

- Source: `smoke`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e88]:
            - generic [ref=e89]: About
          - listitem [ref=e90]:
            - generic [ref=e91]: How it works
      - navigation "Help" [ref=e92]:
        - heading "Help" [level=2] [ref=e93]
        - list [ref=e94]:
          - listitem [ref=e95]:
            - generic [ref=e96]: Safety
          - listitem [ref=e97]:
            - generic [ref=e98]: Contact
      - navigation "Legal" [ref=e99]:
        - heading "Legal" [level=2] [ref=e100]
        - list [ref=e101]:
          - listitem [ref=e102]:
            - generic [ref=e103]: Terms
          - listitem [ref=e104]:
            - generic [ref=e105]: Privacy
    - paragraph [ref=e107]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThan(expected)

Expected: < 5000
Received:   5919
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

## admin-categories-console.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
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

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-14 catch-all law: never a parent, refused server-side, no move verbs

- Source: `shard 1`
- Project: `mobile-360`

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
          - listitem [ref=e135]:
            - generic [ref=e136]: About
          - listitem [ref=e137]:
            - generic [ref=e138]: How it works
      - navigation "Help" [ref=e139]:
        - heading "Help" [level=2] [ref=e140]
        - list [ref=e141]:
          - listitem [ref=e142]:
            - generic [ref=e143]: Safety
          - listitem [ref=e144]:
            - generic [ref=e145]: Contact
      - navigation "Legal" [ref=e146]:
        - heading "Legal" [level=2] [ref=e147]
        - list [ref=e148]:
          - listitem [ref=e149]:
            - generic [ref=e150]: Terms
          - listitem [ref=e151]:
            - generic [ref=e152]: Privacy
    - paragraph [ref=e154]: © 2026 ethio.com — All rights reserved.
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

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image

- Source: `shard 1`
- Project: `mobile-360`

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
          - listitem [ref=e140]:
            - generic [ref=e141]: About
          - listitem [ref=e142]:
            - generic [ref=e143]: How it works
      - navigation "Help" [ref=e144]:
        - heading "Help" [level=2] [ref=e145]
        - list [ref=e146]:
          - listitem [ref=e147]:
            - generic [ref=e148]: Safety
          - listitem [ref=e149]:
            - generic [ref=e150]: Contact
      - navigation "Legal" [ref=e151]:
        - heading "Legal" [level=2] [ref=e152]
        - list [ref=e153]:
          - listitem [ref=e154]:
            - generic [ref=e155]: Terms
          - listitem [ref=e156]:
            - generic [ref=e157]: Privacy
    - paragraph [ref=e159]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-3 matrix: grant then revoke a benign permission, persisted across reload

- Source: `shard 1`
- Project: `mobile-360`

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
          - listitem [ref=e139]:
            - generic [ref=e140]: About
          - listitem [ref=e141]:
            - generic [ref=e142]: How it works
      - navigation "Help" [ref=e143]:
        - heading "Help" [level=2] [ref=e144]
        - list [ref=e145]:
          - listitem [ref=e146]:
            - generic [ref=e147]: Safety
          - listitem [ref=e148]:
            - generic [ref=e149]: Contact
      - navigation "Legal" [ref=e150]:
        - heading "Legal" [level=2] [ref=e151]
        - list [ref=e152]:
          - listitem [ref=e153]:
            - generic [ref=e154]: Terms
          - listitem [ref=e155]:
            - generic [ref=e156]: Privacy
    - paragraph [ref=e158]: © 2026 ethio.com — All rights reserved.
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

## shell.spec.ts › app shell › the feed body is centred with equal left and right gutters

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e88]:
            - generic [ref=e89]: About
          - listitem [ref=e90]:
            - generic [ref=e91]: How it works
      - navigation "Help" [ref=e92]:
        - heading "Help" [level=2] [ref=e93]
        - list [ref=e94]:
          - listitem [ref=e95]:
            - generic [ref=e96]: Safety
          - listitem [ref=e97]:
            - generic [ref=e98]: Contact
      - navigation "Legal" [ref=e99]:
        - heading "Legal" [level=2] [ref=e100]
        - list [ref=e101]:
          - listitem [ref=e102]:
            - generic [ref=e103]: Terms
          - listitem [ref=e104]:
            - generic [ref=e105]: Privacy
    - paragraph [ref=e107]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
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

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-15 reorder: Move up flips the order with no step-up, catch-all last

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
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

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-16 return path: closing a secondary dialog returns to the open editor

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

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image

- Source: `shard 4`
- Project: `desktop-1280`

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
  - dialog "Edit category" [active] [ref=e2]:
    - heading "Edit category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Edit category
      - generic [ref=e6]:
        - generic [ref=e7]:
          - paragraph [ref=e8]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e9]: No image yet for this category.
          - button "Generate image" [ref=e10] [cursor=pointer]
        - button "Close" [ref=e12] [cursor=pointer]
    - button "Close" [ref=e13] [cursor=pointer]:
      - img [ref=e14]
      - generic [ref=e17]: Close
```
```

## shell.spec.ts › app shell › the feed body is centred with equal left and right gutters

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e497]:
            - generic [ref=e498]: About
          - listitem [ref=e499]:
            - generic [ref=e500]: How it works
      - navigation "Help" [ref=e501]:
        - heading "Help" [level=2] [ref=e502]
        - list [ref=e503]:
          - listitem [ref=e504]:
            - generic [ref=e505]: Safety
          - listitem [ref=e506]:
            - generic [ref=e507]: Contact
      - navigation "Legal" [ref=e508]:
        - heading "Legal" [level=2] [ref=e509]
        - list [ref=e510]:
          - listitem [ref=e511]:
            - generic [ref=e512]: Terms
          - listitem [ref=e513]:
            - generic [ref=e514]: Privacy
    - paragraph [ref=e516]: © 2026 ethio.com — All rights reserved.
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
  - dialog "Attributes — e2e-cat-changed-2-xdbfk2" [ref=e2]:
    - heading "Attributes — e2e-cat-changed-2-xdbfk2" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Attributes — e2e-cat-changed-2-xdbfk2
      - paragraph [ref=e6]: No attribute is shown on the listing card yet.
      - status [ref=e7]: Pick at least two attributes to show on listing cards.
      - paragraph [ref=e8]: No attribute is linked to this category yet.
      - generic [ref=e9]:
        - textbox "Search the library" [ref=e10]: e2e_attr_naqr80
        - combobox "Add attribute" [ref=e11]:
          - option "Choose an attribute"
          - option "e2e_attr_naqr80 (e2e_attr_naqr80)" [selected]
        - button "Add attribute" [active] [ref=e12] [cursor=pointer]
      - button "Close" [ref=e14] [cursor=pointer]
    - button "Close" [ref=e15] [cursor=pointer]:
      - img [ref=e16]
      - generic [ref=e19]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag

- Source: `changed`
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

## admin-attributes.spec.ts › C3 attributes console › AT-6 merge: links move to the survivor and the sources disappear

- Source: `changed`
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
        - generic [ref=e7]:
          - paragraph [ref=e8]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e9]: No image yet for this category.
          - button "Generate image" [ref=e10] [cursor=pointer]
        - button "Close" [ref=e12] [cursor=pointer]
    - button "Close" [ref=e13] [cursor=pointer]:
      - img [ref=e14]
      - generic [ref=e17]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth

- Source: `changed`
- Project: `desktop-1280`

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

## admin-categories-console.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
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
        - generic [ref=e7]:
          - paragraph [ref=e8]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e9]: No image yet for this category.
          - button "Generate image" [ref=e10] [cursor=pointer]
        - alert [ref=e11]: Image generation failed
        - button "Close" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven

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
          - listitem [ref=e643]:
            - generic [ref=e644]: About
          - listitem [ref=e645]:
            - generic [ref=e646]: How it works
      - navigation "Help" [ref=e647]:
        - heading "Help" [level=2] [ref=e648]
        - list [ref=e649]:
          - listitem [ref=e650]:
            - generic [ref=e651]: Safety
          - listitem [ref=e652]:
            - generic [ref=e653]: Contact
      - navigation "Legal" [ref=e654]:
        - heading "Legal" [level=2] [ref=e655]
        - list [ref=e656]:
          - listitem [ref=e657]:
            - generic [ref=e658]: Terms
          - listitem [ref=e659]:
            - generic [ref=e660]: Privacy
    - paragraph [ref=e662]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - option "e2e-cat-changed-7-4gcs9u"
          - option "e2e-cat-changed-8-2lgqtq"
          - option "e2e-cat-changed-9-akw3zv"
          - option "e2e-cat-1-11-yn278h"
          - option "e2e-cat-1-11-yn278h › e2e-cat-1-11-jvwryp"
          - option "e2e-cat-1-11-yn278h › e2e-cat-1-11-ga9lea"
          - option "e2e-cat-1-11-yn278h › e2e-cat-1-11-tji4hh"
          - option "e2e-cat-4-9-z4f16o"
          - option "e2e-cat-4-9-z4f16o › e2e-cat-4-9-1qa199"
          - option "e2e-cat-4-9-z4f16o › e2e-cat-4-9-98ygmt"
          - option "e2e-cat-4-9-z4f16o › e2e-cat-4-9-cgpr49"
          - option "e2e-cat-changed-12-7at2ba"
          - option "e2e-cat-changed-11-gko5k0"
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Add path" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 422 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 422 () ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 GET https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/profiles?select=display_name&user_id=eq.90e18f98-2e89-41c4-aaf9-1b1650e5e4f1 ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 409 ()
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-ClVsKtaS.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:15969:21) ×3
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] console.error: Failed to load resource: the server responded with a status of 422 ()
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /__root gate fetch failed 500
```

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_create_role ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
```

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /__root gate fetch failed 500
```

## Client errors: changed

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 422 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 422 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_list_categories ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-ClVsKtaS.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-ClVsKtaS.js:15969:21) ×3
```
