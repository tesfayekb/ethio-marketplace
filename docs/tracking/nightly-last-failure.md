# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35064263598
- Commit: `2e65e3a2b22443512fee66867c86061e495717b9`
- Attempt: 2
- Written (UTC): 2026-09-16T18:25:34.758Z
- Passed: 561 · Skipped: 44 · Failed: 30
- Gating failures: 29 · Quarantined (@global-state, INC-117, non-gating): 1
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 4 user(s) owned by process 35064263598-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 256 user(s) owned by process 35064263598-nightly
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

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster and transfer toolbar render for an admin

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-2 roster: the seeded ET tree renders, an alias narrows the search, the level filter scopes, nothing overflows

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-3 create chain: region → city → sub-city are born retired with their ancestry filled, and activate top-down

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-5 delete guard: a parent is refused, then the chain deletes deepest-first with the typed address

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-7b the editor round-trips a row without dropping a stored field

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-8 verb reachability: every verb and the save button are inside the viewport (CT-8 mirror)

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

```

Context: context file not found for `admin-locations-L2a-locations-console-LT-8-verb-reachability-every-verb-and-the-save-button-are-inside-the-viewport-CT-8-mirror-mobile-360`

## admin-locations.spec.ts › L2a locations console › LT-9b roster shape, card twin: the edit icon sits inline beside the path line

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-10 tones: retired is destructive, active is secondary, a level badge is outline

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-11 one read per country: filtering costs no request, switching the market costs exactly one

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-12 transfer scope: exports and the import title follow the selected country

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('location-country-filter')
Expected: ""
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 10000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster and transfer toolbar render for an admin

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

```

Context:

```text
          - listitem [ref=e225]:
            - generic [ref=e226]: About
          - listitem [ref=e227]:
            - generic [ref=e228]: How it works
      - navigation "Help" [ref=e229]:
        - heading "Help" [level=2] [ref=e230]
        - list [ref=e231]:
          - listitem [ref=e232]:
            - generic [ref=e233]: Safety
          - listitem [ref=e234]:
            - generic [ref=e235]: Contact
      - navigation "Legal" [ref=e236]:
        - heading "Legal" [level=2] [ref=e237]
        - list [ref=e238]:
          - listitem [ref=e239]:
            - generic [ref=e240]: Terms
          - listitem [ref=e241]:
            - generic [ref=e242]: Privacy
    - paragraph [ref=e244]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-2 roster: the seeded ET tree renders, an alias narrows the search, the level filter scopes, nothing overflows

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-3 create chain: region → city → sub-city are born retired with their ancestry filled, and activate top-down

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-5 delete guard: a parent is refused, then the chain deletes deepest-first with the typed address

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-7b the editor round-trips a row without dropping a stored field

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-8 verb reachability: every verb and the save button are inside the viewport (CT-8 mirror)

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

```

Context: context file not found for `admin-locations-L2a-locations-console-LT-8-verb-reachability-every-verb-and-the-save-button-are-inside-the-viewport-CT-8-mirror-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-9a roster shape, table twin: the edit icon sits in the end column with pagination

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-10 tones: retired is destructive, active is secondary, a level badge is outline

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-11 one read per country: filtering costs no request, switching the market costs exactly one

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-12 transfer scope: exports and the import title follow the selected country

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope

- Source: `full`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator: getByTestId('location-country-filter')
Expected: ""
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 10000ms
  - waiting for getByTestId('location-country-filter')

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

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `full`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByRole('dialog').getByTestId('admin-group-locations')
Expected: "/admin/locations"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByRole('dialog').getByTestId('admin-group-locations')

```

Context:

```text
          - listitem [ref=e777]:
            - generic [ref=e778]: About
          - listitem [ref=e779]:
            - generic [ref=e780]: How it works
      - navigation "Help" [ref=e781]:
        - heading "Help" [level=2] [ref=e782]
        - list [ref=e783]:
          - listitem [ref=e784]:
            - generic [ref=e785]: Safety
          - listitem [ref=e786]:
            - generic [ref=e787]: Contact
      - navigation "Legal" [ref=e788]:
        - heading "Legal" [level=2] [ref=e789]
        - list [ref=e790]:
          - listitem [ref=e791]:
            - generic [ref=e792]: Terms
          - listitem [ref=e793]:
            - generic [ref=e794]: Privacy
    - paragraph [ref=e796]: © 2026 ethio.com — All rights reserved.
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
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:15969:21) ×6
```
