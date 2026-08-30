# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33289750564
- Commit: `fc8efefebd5be73050b4d0dee9b7a6fd3649c600`
- Written (UTC): 2026-08-30T03:22:53.094Z
- Passed: 302 · Skipped: 69 · Failed: 2
- Sources without results: none

## admin-translations.spec.ts › U4b translations console › TR-10 translator scope card is manage-gated on the user detail page

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('translator-lang-am')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('translator-lang-am')

```

Context:

```text
          - listitem [ref=e144]:
            - generic [ref=e145]: About
          - listitem [ref=e146]:
            - generic [ref=e147]: How it works
      - navigation "Help" [ref=e148]:
        - heading "Help" [level=2] [ref=e149]
        - list [ref=e150]:
          - listitem [ref=e151]:
            - generic [ref=e152]: Safety
          - listitem [ref=e153]:
            - generic [ref=e154]: Contact
      - navigation "Legal" [ref=e155]:
        - heading "Legal" [level=2] [ref=e156]
        - list [ref=e157]:
          - listitem [ref=e158]:
            - generic [ref=e159]: Terms
          - listitem [ref=e160]:
            - generic [ref=e161]: Privacy
    - paragraph [ref=e163]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-10 translator scope card is manage-gated on the user detail page

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('translator-lang-am')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('translator-lang-am')

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

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
