# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/33363319629
- Commit: `42d7f785d2d9af351002e086dfcadab2d0e78830`
- Written (UTC): 2026-08-31T06:24:58.077Z
- Passed: 419 · Skipped: 100 · Failed: 14
- Sources without results: none

## admin-translations.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-33363319629-1-1-mobile-360-0-tr11').getByTestId('string-saved-e2e-scratch-33363319629-1-1-mobile-360-0-tr11')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-33363319629-1-1-mobile-360-0-tr11').getByTestId('string-saved-e2e-scratch-33363319629-1-1-mobile-360-0-tr11')

```

Context:

```text
          - listitem [ref=e117]:
            - generic [ref=e118]: About
          - listitem [ref=e119]:
            - generic [ref=e120]: How it works
      - navigation "Help" [ref=e121]:
        - heading "Help" [level=2] [ref=e122]
        - list [ref=e123]:
          - listitem [ref=e124]:
            - generic [ref=e125]: Safety
          - listitem [ref=e126]:
            - generic [ref=e127]: Contact
      - navigation "Legal" [ref=e128]:
        - heading "Legal" [level=2] [ref=e129]
        - list [ref=e130]:
          - listitem [ref=e131]:
            - generic [ref=e132]: Terms
          - listitem [ref=e133]:
            - generic [ref=e134]: Privacy
    - paragraph [ref=e136]: © 2026 ethio.com — All rights reserved.
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

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-21 a key missing from the synced catalog is orphaned and excluded

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:u4g] stats read failed: permission denied for function admin_translation_stats
```

Context:

```text
          - listitem [ref=e497]:
            - generic [ref=e498]: About
          - listitem [ref=e499]:
            - generic [ref=e500]: How it works
      - navigation "Help" [ref=e501]:
        - heading "Help" [level=2] [ref=e502]
        - list [ref=e503]:
          - listitem [ref=e504]:
            - generic [ref=e505]: Safety
          - listitem [ref=e506]:
            - generic [ref=e507]: Contact
      - navigation "Legal" [ref=e508]:
        - heading "Legal" [level=2] [ref=e509]
        - list [ref=e510]:
          - listitem [ref=e511]:
            - generic [ref=e512]: Terms
          - listitem [ref=e513]:
            - generic [ref=e514]: Privacy
    - paragraph [ref=e516]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-4 scope: a translator outside the language is refused by the SERVER

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-row-e2e-scratch-33363319629-3-3-desktop-1280-1-tr4')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-row-e2e-scratch-33363319629-3-3-desktop-1280-1-tr4')

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
Error: bulk AI never landed for e2e.scratch.33363319629-3-3-desktop-1280-3-tr12-b1

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

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-21 a key missing from the synced catalog is orphaned and excluded

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: [e2e:u4g] stats read failed: permission denied for function admin_translation_stats
```

Context:

```text
          - listitem [ref=e721]:
            - generic [ref=e722]: About
          - listitem [ref=e723]:
            - generic [ref=e724]: How it works
      - navigation "Help" [ref=e725]:
        - heading "Help" [level=2] [ref=e726]
        - list [ref=e727]:
          - listitem [ref=e728]:
            - generic [ref=e729]: Safety
          - listitem [ref=e730]:
            - generic [ref=e731]: Contact
      - navigation "Legal" [ref=e732]:
        - heading "Legal" [level=2] [ref=e733]
        - list [ref=e734]:
          - listitem [ref=e735]:
            - generic [ref=e736]: Terms
          - listitem [ref=e737]:
            - generic [ref=e738]: Privacy
    - paragraph [ref=e740]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-33363319629-changed-changed-mobile-360-0-tr11').getByTestId('string-saved-e2e-scratch-33363319629-changed-changed-mobile-360-0-tr11')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('string-editor-e2e-scratch-33363319629-changed-changed-mobile-360-0-tr11').getByTestId('string-saved-e2e-scratch-33363319629-changed-changed-mobile-360-0-tr11')

```

Context:

```text
          - listitem [ref=e117]:
            - generic [ref=e118]: About
          - listitem [ref=e119]:
            - generic [ref=e120]: How it works
      - navigation "Help" [ref=e121]:
        - heading "Help" [level=2] [ref=e122]
        - list [ref=e123]:
          - listitem [ref=e124]:
            - generic [ref=e125]: Safety
          - listitem [ref=e126]:
            - generic [ref=e127]: Contact
      - navigation "Legal" [ref=e128]:
        - heading "Legal" [level=2] [ref=e129]
        - list [ref=e130]:
          - listitem [ref=e131]:
            - generic [ref=e132]: Terms
          - listitem [ref=e133]:
            - generic [ref=e134]: Privacy
    - paragraph [ref=e136]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations.spec.ts › U4b translations console › TR-3 the strings page lists keys with source and status

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-row-e2e-scratch-33363319629-changed-changed-desktop-1280-2-tr3')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-row-e2e-scratch-33363319629-changed-changed-desktop-1280-2-tr3')

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

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('string-row-e2e-scratch-33363319629-changed-changed-desktop-1280-3-tr8')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-row-e2e-scratch-33363319629-changed-changed-desktop-1280-3-tr8')

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

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-21 a key missing from the synced catalog is orphaned and excluded

- Source: `changed`
- Project: `mobile-360`

```text
Error: [e2e:u4g] stats read failed: permission denied for function admin_translation_stats
```

Context:

```text
          - listitem [ref=e497]:
            - generic [ref=e498]: About
          - listitem [ref=e499]:
            - generic [ref=e500]: How it works
      - navigation "Help" [ref=e501]:
        - heading "Help" [level=2] [ref=e502]
        - list [ref=e503]:
          - listitem [ref=e504]:
            - generic [ref=e505]: Safety
          - listitem [ref=e506]:
            - generic [ref=e507]: Contact
      - navigation "Legal" [ref=e508]:
        - heading "Legal" [level=2] [ref=e509]
        - list [ref=e510]:
          - listitem [ref=e511]:
            - generic [ref=e512]: Terms
          - listitem [ref=e513]:
            - generic [ref=e514]: Privacy
    - paragraph [ref=e516]: © 2026 ethio.com — All rights reserved.
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

## admin-translations.spec.ts › U4g bulk approval, order and orphans › TR-21 a key missing from the synced catalog is orphaned and excluded

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:u4g] stats read failed: permission denied for function admin_translation_stats
```

Context:

```text
          - listitem [ref=e721]:
            - generic [ref=e722]: About
          - listitem [ref=e723]:
            - generic [ref=e724]: How it works
      - navigation "Help" [ref=e725]:
        - heading "Help" [level=2] [ref=e726]
        - list [ref=e727]:
          - listitem [ref=e728]:
            - generic [ref=e729]: Safety
          - listitem [ref=e730]:
            - generic [ref=e731]: Contact
      - navigation "Legal" [ref=e732]:
        - heading "Legal" [level=2] [ref=e733]
        - list [ref=e734]:
          - listitem [ref=e735]:
            - generic [ref=e736]: Terms
          - listitem [ref=e737]:
            - generic [ref=e738]: Privacy
    - paragraph [ref=e740]: © 2026 ethio.com — All rights reserved.
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
