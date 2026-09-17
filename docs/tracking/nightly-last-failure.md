# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35190393232
- Commit: `fabc7c60f021e0379c972f6a59fb20d20973dea4`
- Attempt: 1
- Written (UTC): 2026-09-17T07:55:23.710Z
- Passed: 619 · Skipped: 43 · Failed: 13
- Gating failures: 12 · Quarantined (@global-state, INC-117, non-gating): 1
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 4 user(s) owned by process 35190393232-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 257 user(s) owned by process 35190393232-nightly
```

## admin-categories-images.spec.ts › C2 categories console › CI-5 bulk fill: the missing-assets run fills every seeded row @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `full`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
```

Context:

```text
          - listitem [ref=e230]:
            - generic [ref=e231]: About
          - listitem [ref=e232]:
            - generic [ref=e233]: How it works
      - navigation "Help" [ref=e234]:
        - heading "Help" [level=2] [ref=e235]
        - list [ref=e236]:
          - listitem [ref=e237]:
            - generic [ref=e238]: Safety
          - listitem [ref=e239]:
            - generic [ref=e240]: Contact
      - navigation "Legal" [ref=e241]:
        - heading "Legal" [level=2] [ref=e242]
        - list [ref=e243]:
          - listitem [ref=e244]:
            - generic [ref=e245]: Terms
          - listitem [ref=e246]:
            - generic [ref=e247]: Privacy
    - paragraph [ref=e249]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster and its transfer toolbar render for an admin

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('country-ET')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('country-ET')

```

Context:

```text
          - listitem [ref=e812]:
            - generic [ref=e813]: About
          - listitem [ref=e814]:
            - generic [ref=e815]: How it works
      - navigation "Help" [ref=e816]:
        - heading "Help" [level=2] [ref=e817]
        - list [ref=e818]:
          - listitem [ref=e819]:
            - generic [ref=e820]: Safety
          - listitem [ref=e821]:
            - generic [ref=e822]: Contact
      - navigation "Legal" [ref=e823]:
        - heading "Legal" [level=2] [ref=e824]
        - list [ref=e825]:
          - listitem [ref=e826]:
            - generic [ref=e827]: Terms
          - listitem [ref=e828]:
            - generic [ref=e829]: Privacy
    - paragraph [ref=e831]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-2 roster: every market renders, the two open ones carry the open tone, search and the status filter narrow

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('country-ET')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('country-ET')

```

Context:

```text
          - listitem [ref=e819]:
            - generic [ref=e820]: About
          - listitem [ref=e821]:
            - generic [ref=e822]: How it works
      - navigation "Help" [ref=e823]:
        - heading "Help" [level=2] [ref=e824]
        - list [ref=e825]:
          - listitem [ref=e826]:
            - generic [ref=e827]: Safety
          - listitem [ref=e828]:
            - generic [ref=e829]: Contact
      - navigation "Legal" [ref=e830]:
        - heading "Legal" [level=2] [ref=e831]
        - list [ref=e832]:
          - listitem [ref=e833]:
            - generic [ref=e834]: Terms
          - listitem [ref=e835]:
            - generic [ref=e836]: Privacy
    - paragraph [ref=e838]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-3 creation is absent from the header; the countries file is the only creation path

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('country-ET')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('country-ET')

```

Context:

```text
          - listitem [ref=e819]:
            - generic [ref=e820]: About
          - listitem [ref=e821]:
            - generic [ref=e822]: How it works
      - navigation "Help" [ref=e823]:
        - heading "Help" [level=2] [ref=e824]
        - list [ref=e825]:
          - listitem [ref=e826]:
            - generic [ref=e827]: Safety
          - listitem [ref=e828]:
            - generic [ref=e829]: Contact
      - navigation "Legal" [ref=e830]:
        - heading "Legal" [level=2] [ref=e831]
        - list [ref=e832]:
          - listitem [ref=e833]:
            - generic [ref=e834]: Terms
          - listitem [ref=e835]:
            - generic [ref=e836]: Privacy
    - paragraph [ref=e838]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('country-ET')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('country-ET')

```

Context:

```text
          - listitem [ref=e819]:
            - generic [ref=e820]: About
          - listitem [ref=e821]:
            - generic [ref=e822]: How it works
      - navigation "Help" [ref=e823]:
        - heading "Help" [level=2] [ref=e824]
        - list [ref=e825]:
          - listitem [ref=e826]:
            - generic [ref=e827]: Safety
          - listitem [ref=e828]:
            - generic [ref=e829]: Contact
      - navigation "Legal" [ref=e830]:
        - heading "Legal" [level=2] [ref=e831]
        - list [ref=e832]:
          - listitem [ref=e833]:
            - generic [ref=e834]: Terms
          - listitem [ref=e835]:
            - generic [ref=e836]: Privacy
    - paragraph [ref=e838]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-5 profile round trip: units, currency and order are saved and read back

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('country-ET')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('country-ET')

```

Context:

```text
          - listitem [ref=e819]:
            - generic [ref=e820]: About
          - listitem [ref=e821]:
            - generic [ref=e822]: How it works
      - navigation "Help" [ref=e823]:
        - heading "Help" [level=2] [ref=e824]
        - list [ref=e825]:
          - listitem [ref=e826]:
            - generic [ref=e827]: Safety
          - listitem [ref=e828]:
            - generic [ref=e829]: Contact
      - navigation "Legal" [ref=e830]:
        - heading "Legal" [level=2] [ref=e831]
        - list [ref=e832]:
          - listitem [ref=e833]:
            - generic [ref=e834]: Terms
          - listitem [ref=e835]:
            - generic [ref=e836]: Privacy
    - paragraph [ref=e838]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('country-ET')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('country-ET')

```

Context:

```text
          - listitem [ref=e819]:
            - generic [ref=e820]: About
          - listitem [ref=e821]:
            - generic [ref=e822]: How it works
      - navigation "Help" [ref=e823]:
        - heading "Help" [level=2] [ref=e824]
        - list [ref=e825]:
          - listitem [ref=e826]:
            - generic [ref=e827]: Safety
          - listitem [ref=e828]:
            - generic [ref=e829]: Contact
      - navigation "Legal" [ref=e830]:
        - heading "Legal" [level=2] [ref=e831]
        - list [ref=e832]:
          - listitem [ref=e833]:
            - generic [ref=e834]: Terms
          - listitem [ref=e835]:
            - generic [ref=e836]: Privacy
    - paragraph [ref=e838]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-7 transfer: the markets file round-trips through this toolbar and the undo puts it back

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('country-ET')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('country-ET')

```

Context:

```text
          - listitem [ref=e819]:
            - generic [ref=e820]: About
          - listitem [ref=e821]:
            - generic [ref=e822]: How it works
      - navigation "Help" [ref=e823]:
        - heading "Help" [level=2] [ref=e824]
        - list [ref=e825]:
          - listitem [ref=e826]:
            - generic [ref=e827]: Safety
          - listitem [ref=e828]:
            - generic [ref=e829]: Contact
      - navigation "Legal" [ref=e830]:
        - heading "Legal" [level=2] [ref=e831]
        - list [ref=e832]:
          - listitem [ref=e833]:
            - generic [ref=e834]: Terms
          - listitem [ref=e835]:
            - generic [ref=e836]: Privacy
    - paragraph [ref=e838]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-8 geometry: nothing overflows and every verb is reachable in both twins

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('country-ET')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('country-ET')

```

Context:

```text
          - listitem [ref=e819]:
            - generic [ref=e820]: About
          - listitem [ref=e821]:
            - generic [ref=e822]: How it works
      - navigation "Help" [ref=e823]:
        - heading "Help" [level=2] [ref=e824]
        - list [ref=e825]:
          - listitem [ref=e826]:
            - generic [ref=e827]: Safety
          - listitem [ref=e828]:
            - generic [ref=e829]: Contact
      - navigation "Legal" [ref=e830]:
        - heading "Legal" [level=2] [ref=e831]
        - list [ref=e832]:
          - listitem [ref=e833]:
            - generic [ref=e834]: Terms
          - listitem [ref=e835]:
            - generic [ref=e836]: Privacy
    - paragraph [ref=e838]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')

```

Context:

```text
          - listitem [ref=e470]:
            - generic [ref=e471]: About
          - listitem [ref=e472]:
            - generic [ref=e473]: How it works
      - navigation "Help" [ref=e474]:
        - heading "Help" [level=2] [ref=e475]
        - list [ref=e476]:
          - listitem [ref=e477]:
            - generic [ref=e478]: Safety
          - listitem [ref=e479]:
            - generic [ref=e480]: Contact
      - navigation "Legal" [ref=e481]:
        - heading "Legal" [level=2] [ref=e482]
        - list [ref=e483]:
          - listitem [ref=e484]:
            - generic [ref=e485]: Terms
          - listitem [ref=e486]:
            - generic [ref=e487]: Privacy
    - paragraph [ref=e489]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa')

```

Context:

```text
          - listitem [ref=e824]:
            - generic [ref=e825]: About
          - listitem [ref=e826]:
            - generic [ref=e827]: How it works
      - navigation "Help" [ref=e828]:
        - heading "Help" [level=2] [ref=e829]
        - list [ref=e830]:
          - listitem [ref=e831]:
            - generic [ref=e832]: Safety
          - listitem [ref=e833]:
            - generic [ref=e834]: Contact
      - navigation "Legal" [ref=e835]:
        - heading "Legal" [level=2] [ref=e836]
        - list [ref=e837]:
          - listitem [ref=e838]:
            - generic [ref=e839]: Terms
          - listitem [ref=e840]:
            - generic [ref=e841]: Privacy
    - paragraph [ref=e843]: © 2026 ethio.com — All rights reserved.
```
```

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the marketplace shell renders no English fallback

- Source: `full`
- Project: `desktop-1280`

```text
Error: marketplace rail categories: category labels still in English

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "Construction Material",
+   "Travel & Accommodation",
+ ]
```

Context:

```text
          - listitem [ref=e213]:
            - generic [ref=e214]: ስለ እኛ
          - listitem [ref=e215]:
            - generic [ref=e216]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e217]:
        - heading "እገዛ" [level=2] [ref=e218]
        - list [ref=e219]:
          - listitem [ref=e220]:
            - generic [ref=e221]: ደህንነት
          - listitem [ref=e222]:
            - generic [ref=e223]: ያግኙን
      - navigation "ሕጋዊ" [ref=e224]:
        - heading "ሕጋዊ" [level=2] [ref=e225]
        - list [ref=e226]:
          - listitem [ref=e227]:
            - generic [ref=e228]: ውሎች
          - listitem [ref=e229]:
            - generic [ref=e230]: ግላዊነት
    - paragraph [ref=e232]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node

- Source: `full`
- Project: `mobile-360`

```text
Test timeout of 180000ms exceeded.
```

Context:

```text
          - listitem [ref=e79]:
            - generic [ref=e80]: About
          - listitem [ref=e81]:
            - generic [ref=e82]: How it works
      - navigation "Help" [ref=e83]:
        - heading "Help" [level=2] [ref=e84]
        - list [ref=e85]:
          - listitem [ref=e86]:
            - generic [ref=e87]: Safety
          - listitem [ref=e88]:
            - generic [ref=e89]: Contact
      - navigation "Legal" [ref=e90]:
        - heading "Legal" [level=2] [ref=e91]
        - list [ref=e92]:
          - listitem [ref=e93]:
            - generic [ref=e94]: Terms
          - listitem [ref=e95]:
            - generic [ref=e96]: Privacy
    - paragraph [ref=e98]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: full

```text
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
```

## Client errors: full

```text
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-Dx_HLiPo.js:15969:21) ×3
```
