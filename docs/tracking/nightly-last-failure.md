# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33844774729
- Commit: `4e6b2f6eb100605f8b3db593b835911541a04f15`
- Attempt: 1
- Written (UTC): 2026-09-04T07:17:26.880Z
- Passed: 324 · Skipped: 44 · Failed: 9
- Gating failures: 7 · Quarantined (@global-state, INC-117, non-gating): 2
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-categories.spec.ts › C2 categories console › CT-8 every verb is reachable from the editor with no horizontal scroll

- Source: `full`
- Project: `desktop-1280`

```text
Error: window target at 768

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 43
Received:    42.69871520996094
```

Context:

```text
        - generic [ref=e38]: Listing expiry (days)
        - textbox "Listing expiry (days)" [ref=e39]:
          - /placeholder: No expiry
      - generic [ref=e40]:
        - checkbox "Accepts listings" [checked] [ref=e41] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e42]:
        - checkbox "Price field enabled" [checked] [ref=e43] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e44]:
        - button "Cancel" [ref=e45] [cursor=pointer]
        - button "Save" [ref=e46] [cursor=pointer]
    - button "Close" [ref=e47] [cursor=pointer]:
      - img [ref=e48]
      - generic [ref=e51]: Close
```
```

## admin-categories.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row

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

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-19 approve-all approves reviewed rows and skips flagged ones @global-state

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

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-19 approve-all approves reviewed rows and skips flagged ones @global-state

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
  (no matching queries)
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

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published

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

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('step-up-modal')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('step-up-modal')

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

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('step-up-modal')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('step-up-modal')

```

Context:

```text
          - listitem [ref=e232]:
            - generic [ref=e233]: About
          - listitem [ref=e234]:
            - generic [ref=e235]: How it works
      - navigation "Help" [ref=e236]:
        - heading "Help" [level=2] [ref=e237]
        - list [ref=e238]:
          - listitem [ref=e239]:
            - generic [ref=e240]: Safety
          - listitem [ref=e241]:
            - generic [ref=e242]: Contact
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - generic [ref=e247]: Terms
          - listitem [ref=e248]:
            - generic [ref=e249]: Privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: full

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
```

## Client errors: full

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
```
