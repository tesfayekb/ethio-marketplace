# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33599691973
- Commit: `b99f0c1af076a050ab94a40ea817214b90124e5b`
- Attempt: 1
- Written (UTC): 2026-09-02T07:06:41.220Z
- Passed: 272 · Skipped: 36 · Failed: 7
- Gating failures: 5 · Quarantined (@global-state, INC-117, non-gating): 2
- Flaky (passed on retry, DEC-030, non-gating): 0
- Sources without results: none

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
          - listitem [ref=e379]:
            - generic [ref=e380]: About
          - listitem [ref=e381]:
            - generic [ref=e382]: How it works
      - navigation "Help" [ref=e383]:
        - heading "Help" [level=2] [ref=e384]
        - list [ref=e385]:
          - listitem [ref=e386]:
            - generic [ref=e387]: Safety
          - listitem [ref=e388]:
            - generic [ref=e389]: Contact
      - navigation "Legal" [ref=e390]:
        - heading "Legal" [level=2] [ref=e391]
        - list [ref=e392]:
          - listitem [ref=e393]:
            - generic [ref=e394]: Terms
          - listitem [ref=e395]:
            - generic [ref=e396]: Privacy
    - paragraph [ref=e398]: © 2026 ethio.com — All rights reserved.
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
          - listitem [ref=e460]:
            - generic [ref=e461]: About
          - listitem [ref=e462]:
            - generic [ref=e463]: How it works
      - navigation "Help" [ref=e464]:
        - heading "Help" [level=2] [ref=e465]
        - list [ref=e466]:
          - listitem [ref=e467]:
            - generic [ref=e468]: Safety
          - listitem [ref=e469]:
            - generic [ref=e470]: Contact
      - navigation "Legal" [ref=e471]:
        - heading "Legal" [level=2] [ref=e472]
        - list [ref=e473]:
          - listitem [ref=e474]:
            - generic [ref=e475]: Terms
          - listitem [ref=e476]:
            - generic [ref=e477]: Privacy
    - paragraph [ref=e479]: © 2026 ethio.com — All rights reserved.
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
[INC-112] testids: strings-coverage=0 strings-search=0 strings-unavailable=0 approve-all-bar=1 approve-all-start=1 approve-all-summary=0 approve-all-error=0
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
Error: pseudo text never landed for admin.translations.title

expect(received).toBe(expected) // Object.is equality

Expected: "machine|true|true|true"
Received: "missing"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
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

No `[ssr-error]` lines in the `full` log (or no log was uploaded).

## Client errors: full

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
```
