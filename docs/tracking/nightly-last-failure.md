# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34016601329
- Commit: `b0cadd12159dfc72dca9cb762dbfc164f8c2d951`
- Attempt: 1
- Written (UTC): 2026-09-06T07:28:28.654Z
- Passed: 331 · Skipped: 45 · Failed: 13
- Gating failures: 9 · Quarantined (@global-state, INC-117, non-gating): 4
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `full`
- Project: `mobile-360`

```text
Error: [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete

expect(locator).toContainText(expected) failed

Locator: getByTestId('attribute-delete-blast')
Expected substring: "1"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete with timeout 20000ms
  - waiting for getByTestId('attribute-delete-blast')

```

Context:

```text
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete attribute" [active] [ref=e2]:
    - heading "Delete attribute" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Delete attribute
      - paragraph [ref=e6]: The definition disappears from the library. Categories that use it must be unlinked first.
      - generic [ref=e7]:
        - generic [ref=e8]: Type e2e_attr_izbw4t to confirm
        - textbox "Type e2e_attr_izbw4t to confirm" [ref=e9]: e2e_attr_izbw4t
      - alert [ref=e10]: The change could not be saved.
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Delete" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-attributes.spec.ts › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked

- Source: `full`
- Project: `desktop-1280`

```text
Error: [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete

expect(locator).toContainText(expected) failed

Locator: getByTestId('attribute-delete-blast')
Expected substring: "1"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - [dialog-dump AT-5 refusal never restated the blast radius] open dialogs: attribute-delete-dialog opened-by=row-delete with timeout 20000ms
  - waiting for getByTestId('attribute-delete-blast')

```

Context:

```text
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Delete attribute" [active] [ref=e2]:
    - heading "Delete attribute" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Delete attribute
      - paragraph [ref=e6]: The definition disappears from the library. Categories that use it must be unlinked first.
      - generic [ref=e7]:
        - generic [ref=e8]: Type e2e_attr_wytwam to confirm
        - textbox "Type e2e_attr_wytwam to confirm" [ref=e9]: e2e_attr_wytwam
      - alert [ref=e10]: The change could not be saved.
      - generic [ref=e11]:
        - button "Cancel" [ref=e12] [cursor=pointer]
        - button "Delete" [ref=e13] [cursor=pointer]
    - button "Close" [ref=e14] [cursor=pointer]:
      - img [ref=e15]
      - generic [ref=e18]: Close
```
```

## admin-categories-images.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e190]:
            - generic [ref=e191]: About
          - listitem [ref=e192]:
            - generic [ref=e193]: How it works
      - navigation "Help" [ref=e194]:
        - heading "Help" [level=2] [ref=e195]
        - list [ref=e196]:
          - listitem [ref=e197]:
            - generic [ref=e198]: Safety
          - listitem [ref=e199]:
            - generic [ref=e200]: Contact
      - navigation "Legal" [ref=e201]:
        - heading "Legal" [level=2] [ref=e202]
        - list [ref=e203]:
          - listitem [ref=e204]:
            - generic [ref=e205]: Terms
          - listitem [ref=e206]:
            - generic [ref=e207]: Privacy
    - paragraph [ref=e209]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-15 reorder: Move up flips the order with no step-up, catch-all last

- Source: `full`
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

- Source: `full`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
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

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/b894e541-eace-4224-aad2-c8fff67fe28b"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/b894e541-eace-4224-aad2-c8fff67fe28b"

```

Context:

```text
          - listitem [ref=e392]:
            - generic [ref=e393]: About
          - listitem [ref=e394]:
            - generic [ref=e395]: How it works
      - navigation "Help" [ref=e396]:
        - heading "Help" [level=2] [ref=e397]
        - list [ref=e398]:
          - listitem [ref=e399]:
            - generic [ref=e400]: Safety
          - listitem [ref=e401]:
            - generic [ref=e402]: Contact
      - navigation "Legal" [ref=e403]:
        - heading "Legal" [level=2] [ref=e404]
        - list [ref=e405]:
          - listitem [ref=e406]:
            - generic [ref=e407]: Terms
          - listitem [ref=e408]:
            - generic [ref=e409]: Privacy
    - paragraph [ref=e411]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-3 matrix: grant then revoke a benign permission, persisted across reload

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

```

Context:

```text
          - listitem [ref=e1842]:
            - generic [ref=e1843]: About
          - listitem [ref=e1844]:
            - generic [ref=e1845]: How it works
      - navigation "Help" [ref=e1846]:
        - heading "Help" [level=2] [ref=e1847]
        - list [ref=e1848]:
          - listitem [ref=e1849]:
            - generic [ref=e1850]: Safety
          - listitem [ref=e1851]:
            - generic [ref=e1852]: Contact
      - navigation "Legal" [ref=e1853]:
        - heading "Legal" [level=2] [ref=e1854]
        - list [ref=e1855]:
          - listitem [ref=e1856]:
            - generic [ref=e1857]: Terms
          - listitem [ref=e1858]:
            - generic [ref=e1859]: Privacy
    - paragraph [ref=e1861]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-7 registration: DEC-016 permissions appear as grantable rows

- Source: `full`
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

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/b894e541-eace-4224-aad2-c8fff67fe28b"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/b894e541-eace-4224-aad2-c8fff67fe28b"

```

Context:

```text
          - listitem [ref=e473]:
            - generic [ref=e474]: About
          - listitem [ref=e475]:
            - generic [ref=e476]: How it works
      - navigation "Help" [ref=e477]:
        - heading "Help" [level=2] [ref=e478]
        - list [ref=e479]:
          - listitem [ref=e480]:
            - generic [ref=e481]: Safety
          - listitem [ref=e482]:
            - generic [ref=e483]: Contact
      - navigation "Legal" [ref=e484]:
        - heading "Legal" [level=2] [ref=e485]
        - list [ref=e486]:
          - listitem [ref=e487]:
            - generic [ref=e488]: Terms
          - listitem [ref=e489]:
            - generic [ref=e490]: Privacy
    - paragraph [ref=e492]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-1 admin fixture: gated section nav, section page + breadcrumb, deep link

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/admin$/
Received string:  "http://127.0.0.1:4173/admin/translations"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/translations"

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

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-19 approve-all approves reviewed rows and skips flagged ones @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `mobile-360`

```text
Error: the strings list never rendered all four seeded TR-19 rows

expect(received).toBe(expected) // Object.is equality

Expected: 4
Received: 0

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

[INC-112] phase: TR-19 seed check
[INC-112] url: http://127.0.0.1:4173/admin/translations/zxy-mo
[INC-112] testids: strings-coverage=0 strings-search=0 strings-unavailable=0 approve-all-bar=0 approve-all-start=0 approve-all-summary=0 approve-all-error=0
[INC-112] dialogs: step-up-modal=closed approve-all-confirm=closed role=dialog count=0
[INC-112] queries:
(no __ethioQueryClient — not an E2E build?)
```

Context:

```text
          - listitem [ref=e506]:
            - generic [ref=e507]: About
          - listitem [ref=e508]:
            - generic [ref=e509]: How it works
      - navigation "Help" [ref=e510]:
        - heading "Help" [level=2] [ref=e511]
        - list [ref=e512]:
          - listitem [ref=e513]:
            - generic [ref=e514]: Safety
          - listitem [ref=e515]:
            - generic [ref=e516]: Contact
      - navigation "Legal" [ref=e517]:
        - heading "Legal" [level=2] [ref=e518]
        - list [ref=e519]:
          - listitem [ref=e520]:
            - generic [ref=e521]: Terms
          - listitem [ref=e522]:
            - generic [ref=e523]: Privacy
    - paragraph [ref=e525]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-19 approve-all approves reviewed rows and skips flagged ones @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `desktop-1280`

```text
Error: the strings list never rendered all four seeded TR-19 rows

expect(received).toBe(expected) // Object.is equality

Expected: 4
Received: 0

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

[INC-112] phase: TR-19 seed check
[INC-112] url: http://127.0.0.1:4173/admin/translations/zxy-de
[INC-112] testids: strings-coverage=0 strings-search=0 strings-unavailable=0 approve-all-bar=0 approve-all-start=0 approve-all-summary=0 approve-all-error=0
[INC-112] dialogs: step-up-modal=closed approve-all-confirm=closed role=dialog count=0
[INC-112] queries:
(no __ethioQueryClient — not an E2E build?)
```

Context:

```text
          - listitem [ref=e730]:
            - generic [ref=e731]: About
          - listitem [ref=e732]:
            - generic [ref=e733]: How it works
      - navigation "Help" [ref=e734]:
        - heading "Help" [level=2] [ref=e735]
        - list [ref=e736]:
          - listitem [ref=e737]:
            - generic [ref=e738]: Safety
          - listitem [ref=e739]:
            - generic [ref=e740]: Contact
      - navigation "Legal" [ref=e741]:
        - heading "Legal" [level=2] [ref=e742]
        - list [ref=e743]:
          - listitem [ref=e744]:
            - generic [ref=e745]: Terms
          - listitem [ref=e746]:
            - generic [ref=e747]: Privacy
    - paragraph [ref=e749]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('lang-public-zxa')
Expected: visible
Error: strict mode violation: getByTestId('lang-public-zxa') resolved to 2 elements:
    1) <button disabled value="on" type="button" role="switch" data-disabled="" aria-checked="false" data-state="unchecked" data-testid="lang-public-zxa" aria-label="Published to visitors" class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 d…>…</button> aka getByTestId('lang-row-zxa-card').getByTestId('lang-public-zxa')
    2) <button disabled value="on" type="button" role="switch" data-disabled="" aria-checked="false" data-state="unchecked" data-testid="lang-public-zxa" aria-label="Published to visitors" class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 d…>…</button> aka getByTestId('lang-row-zxa').getByTestId('lang-public-zxa')

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('lang-public-zxa')

```

Context:

```text
          - listitem [ref=e788]:
            - generic [ref=e789]: About
          - listitem [ref=e790]:
            - generic [ref=e791]: How it works
      - navigation "Help" [ref=e792]:
        - heading "Help" [level=2] [ref=e793]
        - list [ref=e794]:
          - listitem [ref=e795]:
            - generic [ref=e796]: Safety
          - listitem [ref=e797]:
            - generic [ref=e798]: Contact
      - navigation "Legal" [ref=e799]:
        - heading "Legal" [level=2] [ref=e800]
        - list [ref=e801]:
          - listitem [ref=e802]:
            - generic [ref=e803]: Terms
          - listitem [ref=e804]:
            - generic [ref=e805]: Privacy
    - paragraph [ref=e807]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: full

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/i18n canceling statement due to statement timeout ×2
```

## Client errors: full

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_delete_attribute ({"code":"P0010","details":null,"hint":null,"message":"admin.attributes.error.deleteHasLinks:1"})
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/i18n/en ((body unavailable))
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_delete_attribute ({"code":"P0010","details":null,"hint":null,"message":"admin.attributes.error.deleteHasLinks:1"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
```
