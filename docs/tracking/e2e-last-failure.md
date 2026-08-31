# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33365958196
- Commit: `8ab9fd61586e5bf271bde51556fdf6d8058a0487`
- Written (UTC): 2026-08-31T07:05:18.620Z
- Passed: 423 · Skipped: 100 · Failed: 10
- Sources without results: none

## admin-translations.spec.ts › U4b translations console › TR-3 the strings page lists keys with source and status

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-row-e2e-scratch-33365958196-1-1-mobile-360-0-tr3-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-row-e2e-scratch-33365958196-1-1-mobile-360-0-tr3-card')

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
          - listitem [ref=e253]:
            - generic [ref=e254]: About
          - listitem [ref=e255]:
            - generic [ref=e256]: How it works
      - navigation "Help" [ref=e257]:
        - heading "Help" [level=2] [ref=e258]
        - list [ref=e259]:
          - listitem [ref=e260]:
            - generic [ref=e261]: Safety
          - listitem [ref=e262]:
            - generic [ref=e263]: Contact
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - generic [ref=e268]: Terms
          - listitem [ref=e269]:
            - generic [ref=e270]: Privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-4 scope: a translator outside the language is refused by the SERVER

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-row-e2e-scratch-33365958196-3-3-desktop-1280-1-tr4')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-row-e2e-scratch-33365958196-3-3-desktop-1280-1-tr4')

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

## admin-translations.spec.ts › U4b translations console › TR-8 save then approve moves a string through the status machine

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-row-e2e-scratch-33365958196-3-3-desktop-1280-3-tr8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-row-e2e-scratch-33365958196-3-3-desktop-1280-3-tr8')

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

## admin-translations.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: bulk AI never landed for e2e.scratch.33365958196-3-3-desktop-1280-4-tr12-b1

expect(received).toBe(expected) // Object.is equality

Expected: "machine|true|true"
Received: "approved|true|true"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
```

Context:

```text
          - listitem [ref=e722]:
            - generic [ref=e723]: About
          - listitem [ref=e724]:
            - generic [ref=e725]: How it works
      - navigation "Help" [ref=e726]:
        - heading "Help" [level=2] [ref=e727]
        - list [ref=e728]:
          - listitem [ref=e729]:
            - generic [ref=e730]: Safety
          - listitem [ref=e731]:
            - generic [ref=e732]: Contact
      - navigation "Legal" [ref=e733]:
        - heading "Legal" [level=2] [ref=e734]
        - list [ref=e735]:
          - listitem [ref=e736]:
            - generic [ref=e737]: Terms
          - listitem [ref=e738]:
            - generic [ref=e739]: Privacy
    - paragraph [ref=e741]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-20 roster order is operator-editable and persists

- Source: `shard 3`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e377]:
            - generic [ref=e378]: About
          - listitem [ref=e379]:
            - generic [ref=e380]: How it works
      - navigation "Help" [ref=e381]:
        - heading "Help" [level=2] [ref=e382]
        - list [ref=e383]:
          - listitem [ref=e384]:
            - generic [ref=e385]: Safety
          - listitem [ref=e386]:
            - generic [ref=e387]: Contact
      - navigation "Legal" [ref=e388]:
        - heading "Legal" [level=2] [ref=e389]
        - list [ref=e390]:
          - listitem [ref=e391]:
            - generic [ref=e392]: Terms
          - listitem [ref=e393]:
            - generic [ref=e394]: Privacy
    - paragraph [ref=e396]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-13 the placeholder validator flags a machine write too

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-row-e2e-scratch-33365958196-changed-changed-mobile-360-0-tr13-break-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-row-e2e-scratch-33365958196-changed-changed-mobile-360-0-tr13-break-card')

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

## admin-translations.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-row-e2e-scratch-33365958196-changed-changed-desktop-1280-2-tr11')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-row-e2e-scratch-33365958196-changed-changed-desktop-1280-2-tr11')

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

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e253]:
            - generic [ref=e254]: About
          - listitem [ref=e255]:
            - generic [ref=e256]: How it works
      - navigation "Help" [ref=e257]:
        - heading "Help" [level=2] [ref=e258]
        - list [ref=e259]:
          - listitem [ref=e260]:
            - generic [ref=e261]: Safety
          - listitem [ref=e262]:
            - generic [ref=e263]: Contact
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - generic [ref=e268]: Terms
          - listitem [ref=e269]:
            - generic [ref=e270]: Privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-20 roster order is operator-editable and persists

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e377]:
            - generic [ref=e378]: About
          - listitem [ref=e379]:
            - generic [ref=e380]: How it works
      - navigation "Help" [ref=e381]:
        - heading "Help" [level=2] [ref=e382]
        - list [ref=e383]:
          - listitem [ref=e384]:
            - generic [ref=e385]: Safety
          - listitem [ref=e386]:
            - generic [ref=e387]: Contact
      - navigation "Legal" [ref=e388]:
        - heading "Legal" [level=2] [ref=e389]
        - list [ref=e390]:
          - listitem [ref=e391]:
            - generic [ref=e392]: Terms
          - listitem [ref=e393]:
            - generic [ref=e394]: Privacy
    - paragraph [ref=e396]: © 2026 ethio.com — All rights reserved.
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

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
