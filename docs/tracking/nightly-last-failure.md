# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34092024740
- Commit: `cda6053a882e3eeeac21d3298150546a073d7d3e`
- Attempt: 1
- Written (UTC): 2026-09-07T07:22:57.026Z
- Passed: 363 · Skipped: 40 · Failed: 10
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 4
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

## admin-categories-images.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e204]:
            - generic [ref=e205]: About
          - listitem [ref=e206]:
            - generic [ref=e207]: How it works
      - navigation "Help" [ref=e208]:
        - heading "Help" [level=2] [ref=e209]
        - list [ref=e210]:
          - listitem [ref=e211]:
            - generic [ref=e212]: Safety
          - listitem [ref=e213]:
            - generic [ref=e214]: Contact
      - navigation "Legal" [ref=e215]:
        - heading "Legal" [level=2] [ref=e216]
        - list [ref=e217]:
          - listitem [ref=e218]:
            - generic [ref=e219]: Terms
          - listitem [ref=e220]:
            - generic [ref=e221]: Privacy
    - paragraph [ref=e223]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('role-permissions')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('role-permissions')
    14 × locator resolved to 1 element
       - unexpected value "1"

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
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('role-permissions')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('role-permissions')
    14 × locator resolved to 1 element
       - unexpected value "1"

```

Context:

```text
          - listitem [ref=e482]:
            - generic [ref=e483]: About
          - listitem [ref=e484]:
            - generic [ref=e485]: How it works
      - navigation "Help" [ref=e486]:
        - heading "Help" [level=2] [ref=e487]
        - list [ref=e488]:
          - listitem [ref=e489]:
            - generic [ref=e490]: Safety
          - listitem [ref=e491]:
            - generic [ref=e492]: Contact
      - navigation "Legal" [ref=e493]:
        - heading "Legal" [level=2] [ref=e494]
        - list [ref=e495]:
          - listitem [ref=e496]:
            - generic [ref=e497]: Terms
          - listitem [ref=e498]:
            - generic [ref=e499]: Privacy
    - paragraph [ref=e501]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-section-categories')

```

Context:

```text
          - listitem [ref=e781]:
            - generic [ref=e782]: About
          - listitem [ref=e783]:
            - generic [ref=e784]: How it works
      - navigation "Help" [ref=e785]:
        - heading "Help" [level=2] [ref=e786]
        - list [ref=e787]:
          - listitem [ref=e788]:
            - generic [ref=e789]: Safety
          - listitem [ref=e790]:
            - generic [ref=e791]: Contact
      - navigation "Legal" [ref=e792]:
        - heading "Legal" [level=2] [ref=e793]
        - list [ref=e794]:
          - listitem [ref=e795]:
            - generic [ref=e796]: Terms
          - listitem [ref=e797]:
            - generic [ref=e798]: Privacy
    - paragraph [ref=e800]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-section-categories')

```

Context:

```text
          - listitem [ref=e1159]:
            - generic [ref=e1160]: About
          - listitem [ref=e1161]:
            - generic [ref=e1162]: How it works
      - navigation "Help" [ref=e1163]:
        - heading "Help" [level=2] [ref=e1164]
        - list [ref=e1165]:
          - listitem [ref=e1166]:
            - generic [ref=e1167]: Safety
          - listitem [ref=e1168]:
            - generic [ref=e1169]: Contact
      - navigation "Legal" [ref=e1170]:
        - heading "Legal" [level=2] [ref=e1171]
        - list [ref=e1172]:
          - listitem [ref=e1173]:
            - generic [ref=e1174]: Terms
          - listitem [ref=e1175]:
            - generic [ref=e1176]: Privacy
    - paragraph [ref=e1178]: © 2026 ethio.com — All rights reserved.
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
[INC-112] testids: strings-coverage=0 strings-search=1 strings-unavailable=0 approve-all-bar=1 approve-all-start=1 approve-all-summary=0 approve-all-error=0
[INC-112] dialogs: step-up-modal=closed approve-all-confirm=closed role=dialog count=0
[INC-112] queries:
(no __ethioQueryClient — not an E2E build?)
```

Context:

```text
          - listitem [ref=e739]:
            - generic [ref=e740]: About
          - listitem [ref=e741]:
            - generic [ref=e742]: How it works
      - navigation "Help" [ref=e743]:
        - heading "Help" [level=2] [ref=e744]
        - list [ref=e745]:
          - listitem [ref=e746]:
            - generic [ref=e747]: Safety
          - listitem [ref=e748]:
            - generic [ref=e749]: Contact
      - navigation "Legal" [ref=e750]:
        - heading "Legal" [level=2] [ref=e751]
        - list [ref=e752]:
          - listitem [ref=e753]:
            - generic [ref=e754]: Terms
          - listitem [ref=e755]:
            - generic [ref=e756]: Privacy
    - paragraph [ref=e758]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e797]:
            - generic [ref=e798]: About
          - listitem [ref=e799]:
            - generic [ref=e800]: How it works
      - navigation "Help" [ref=e801]:
        - heading "Help" [level=2] [ref=e802]
        - list [ref=e803]:
          - listitem [ref=e804]:
            - generic [ref=e805]: Safety
          - listitem [ref=e806]:
            - generic [ref=e807]: Contact
      - navigation "Legal" [ref=e808]:
        - heading "Legal" [level=2] [ref=e809]
        - list [ref=e810]:
          - listitem [ref=e811]:
            - generic [ref=e812]: Terms
          - listitem [ref=e813]:
            - generic [ref=e814]: Privacy
    - paragraph [ref=e816]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e241]:
            - generic [ref=e242]: About
          - listitem [ref=e243]:
            - generic [ref=e244]: How it works
      - navigation "Help" [ref=e245]:
        - heading "Help" [level=2] [ref=e246]
        - list [ref=e247]:
          - listitem [ref=e248]:
            - generic [ref=e249]: Safety
          - listitem [ref=e250]:
            - generic [ref=e251]: Contact
      - navigation "Legal" [ref=e252]:
        - heading "Legal" [level=2] [ref=e253]
        - list [ref=e254]:
          - listitem [ref=e255]:
            - generic [ref=e256]: Terms
          - listitem [ref=e257]:
            - generic [ref=e258]: Privacy
    - paragraph [ref=e260]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: full

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: full

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
```
