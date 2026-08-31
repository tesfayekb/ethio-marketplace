# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33381892963
- Commit: `3cb27dee355beeea5a24e0c9e6187132d6c1374f`
- Attempt: 2
- Written (UTC): 2026-08-31T10:28:33.597Z
- Passed: 331 · Skipped: 67 · Failed: 3
- Sources without results: none

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-20 roster order is operator-editable and persists

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: the fence's up control must be enabled before the move

expect(locator).toBeEnabled() failed

Locator: getByTestId('data-table-cards').getByTestId('lang-row-zxx-card').getByTestId('lang-up-zxx')
Expected: enabled
Timeout: 20000ms
Error: element(s) not found

Call log:
  - the fence's up control must be enabled before the move with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('lang-row-zxx-card').getByTestId('lang-up-zxx')

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

## admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('activity-user.status_change').first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('activity-user.status_change').first()

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

## admin-translations.spec.ts › U4b translations console › TR-8 save then approve moves a string through the status machine

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-33381892963-3-3-desktop-1280-1-tr8').getByTestId('string-saved-e2e-scratch-33381892963-3-3-desktop-1280-1-tr8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-33381892963-3-3-desktop-1280-1-tr8').getByTestId('string-saved-e2e-scratch-33381892963-3-3-desktop-1280-1-tr8')

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

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
