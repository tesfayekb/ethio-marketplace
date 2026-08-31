# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33374884757
- Commit: `efa888a4ab178bec1dd99d91260b82ac0fd4f3c4`
- Attempt: 1
- Written (UTC): 2026-08-31T09:00:02.999Z
- Passed: 330 · Skipped: 67 · Failed: 4
- Sources without results: none

## auth-signout.spec.ts › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-panel-root')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-panel-root')

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

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-20 roster order is operator-editable and persists

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e278]:
            - generic [ref=e279]: About
          - listitem [ref=e280]:
            - generic [ref=e281]: How it works
      - navigation "Help" [ref=e282]:
        - heading "Help" [level=2] [ref=e283]
        - list [ref=e284]:
          - listitem [ref=e285]:
            - generic [ref=e286]: Safety
          - listitem [ref=e287]:
            - generic [ref=e288]: Contact
      - navigation "Legal" [ref=e289]:
        - heading "Legal" [level=2] [ref=e290]
        - list [ref=e291]:
          - listitem [ref=e292]:
            - generic [ref=e293]: Terms
          - listitem [ref=e294]:
            - generic [ref=e295]: Privacy
    - paragraph [ref=e297]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › rail scroll regions (U0f) › drawer: items scroll, header fixed, sign out pinned

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('dialog').getByTestId('rail-category-skeleton')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByRole('dialog').getByTestId('rail-category-skeleton')
    14 × locator resolved to 6 elements
       - unexpected value "6"

```

Context:

```text
              - generic [ref=e106]: Babies & Kids
          - listitem [ref=e107]:
            - link "Beauty & Personal Care" [ref=e108] [cursor=pointer]:
              - /url: /c/beauty-personal-care
              - img [ref=e109]
              - generic [ref=e112]: Beauty & Personal Care
          - listitem [ref=e113]:
            - link "Agriculture & Farming" [ref=e114] [cursor=pointer]:
              - /url: /c/agriculture-farming
              - img [ref=e115]
              - generic [ref=e118]: Agriculture & Farming
          - listitem [ref=e119]:
            - link "Commercial Equipment" [ref=e120] [cursor=pointer]:
              - /url: /c/commercial-equipment
              - img [ref=e121]
              - generic [ref=e124]: Commercial Equipment
      - button "Sign out" [ref=e126]:
        - img [ref=e127]
        - generic [ref=e130]: Sign out
```
```

## admin-translations.spec.ts › U4b translations console › TR-3 the strings page lists keys with source and status

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-row-e2e-scratch-33374884757-3-3-desktop-1280-1-tr3')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-row-e2e-scratch-33374884757-3-3-desktop-1280-1-tr3')

```

Context:

```text
          - listitem [ref=e205]:
            - generic [ref=e206]: About
          - listitem [ref=e207]:
            - generic [ref=e208]: How it works
      - navigation "Help" [ref=e209]:
        - heading "Help" [level=2] [ref=e210]
        - list [ref=e211]:
          - listitem [ref=e212]:
            - generic [ref=e213]: Safety
          - listitem [ref=e214]:
            - generic [ref=e215]: Contact
      - navigation "Legal" [ref=e216]:
        - heading "Legal" [level=2] [ref=e217]
        - list [ref=e218]:
          - listitem [ref=e219]:
            - generic [ref=e220]: Terms
          - listitem [ref=e221]:
            - generic [ref=e222]: Privacy
    - paragraph [ref=e224]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
