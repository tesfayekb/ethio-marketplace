# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33383003503
- Commit: `2f66c67ebf472918c1ce96bb89a729045457a47f`
- Attempt: 1
- Written (UTC): 2026-08-31T10:40:28.832Z
- Passed: 331 · Skipped: 66 · Failed: 4
- Sources without results: none

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-20 roster order is operator-editable and persists

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:u4g] parking the fence failed: permission denied for function admin_set_language_order
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

## admin-translations.spec.ts › U4b translations console › TR-4 scope: a translator outside the language is refused by the SERVER

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-row-e2e-scratch-33383003503-3-3-desktop-1280-1-tr4')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-row-e2e-scratch-33383003503-3-3-desktop-1280-1-tr4')

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

## admin-translations.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-33383003503-3-3-desktop-1280-3-tr16').getByTestId('string-saved-e2e-scratch-33383003503-3-3-desktop-1280-3-tr16')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-33383003503-3-3-desktop-1280-3-tr16').getByTestId('string-saved-e2e-scratch-33383003503-3-3-desktop-1280-3-tr16')

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

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-20 roster order is operator-editable and persists

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: [e2e:u4g] parking the fence failed: permission denied for function admin_set_language_order
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

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).
