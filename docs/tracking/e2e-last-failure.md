# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33380639824
- Commit: `4820f937401d5a632e845be8dbb224e3cd1e6bac`
- Attempt: 1
- Written (UTC): 2026-08-31T10:11:28.274Z
- Passed: 334 · Skipped: 64 · Failed: 3
- Sources without results: none

## admin-translations.spec.ts › U4b translations console › TR-3 the strings page lists keys with source and status

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-row-e2e-scratch-33380639824-1-1-mobile-360-0-tr3-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-row-e2e-scratch-33380639824-1-1-mobile-360-0-tr3-card')

```

Context:

```text
          - listitem [ref=e116]:
            - generic [ref=e117]: About
          - listitem [ref=e118]:
            - generic [ref=e119]: How it works
      - navigation "Help" [ref=e120]:
        - heading "Help" [level=2] [ref=e121]
        - list [ref=e122]:
          - listitem [ref=e123]:
            - generic [ref=e124]: Safety
          - listitem [ref=e125]:
            - generic [ref=e126]: Contact
      - navigation "Legal" [ref=e127]:
        - heading "Legal" [level=2] [ref=e128]
        - list [ref=e129]:
          - listitem [ref=e130]:
            - generic [ref=e131]: Terms
          - listitem [ref=e132]:
            - generic [ref=e133]: Privacy
    - paragraph [ref=e135]: © 2026 ethio.com — All rights reserved.
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

## admin-translations.spec.ts › U4b translations console › TR-8 save then approve moves a string through the status machine

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-row-e2e-scratch-33380639824-3-3-desktop-1280-1-tr8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-row-e2e-scratch-33380639824-3-3-desktop-1280-1-tr8')

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
