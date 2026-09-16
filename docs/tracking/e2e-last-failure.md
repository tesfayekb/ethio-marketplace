# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35047538978
- Commit: `4803271dd8403154d10fb68445c4175e4d9fcaba`
- Attempt: 1
- Written (UTC): 2026-09-16T02:33:07.498Z
- Passed: 661 · Skipped: 71 · Failed: 30
- Gating failures: 30 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): shard 2, shard 5, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the mobile drawer renders no English fallback — Error: mobile drawer categories: category labels still in English

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 66 user(s) owned by process 35047538978-2
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 62 user(s) owned by process 35047538978-5
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 19 user(s) owned by process 35047538978-changed
```

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster and transfer toolbar render for an admin

- Source: `shard 2`
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

- Source: `shard 2`
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

- Source: `shard 2`
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

- Source: `shard 2`
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

- Source: `shard 2`
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

- Source: `shard 2`
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

- Source: `shard 2`
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

- Source: `shard 2`
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

- Source: `shard 2`
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

- Source: `shard 2`
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

- Source: `shard 2`
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

- Source: `shard 2`
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

- Source: `shard 2`
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

- Source: `shard 2`
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

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 2`
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
          - listitem [ref=e778]:
            - generic [ref=e779]: About
          - listitem [ref=e780]:
            - generic [ref=e781]: How it works
      - navigation "Help" [ref=e782]:
        - heading "Help" [level=2] [ref=e783]
        - list [ref=e784]:
          - listitem [ref=e785]:
            - generic [ref=e786]: Safety
          - listitem [ref=e787]:
            - generic [ref=e788]: Contact
      - navigation "Legal" [ref=e789]:
        - heading "Legal" [level=2] [ref=e790]
        - list [ref=e791]:
          - listitem [ref=e792]:
            - generic [ref=e793]: Terms
          - listitem [ref=e794]:
            - generic [ref=e795]: Privacy
    - paragraph [ref=e797]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster and transfer toolbar render for an admin

- Source: `shard 5`
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

- Source: `shard 5`
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

- Source: `shard 5`
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

- Source: `shard 5`
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

- Source: `shard 5`
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

- Source: `shard 5`
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

- Source: `shard 5`
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

- Source: `shard 5`
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

- Source: `shard 5`
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

- Source: `shard 5`
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

- Source: `shard 5`
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

- Source: `shard 5`
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

- Source: `shard 5`
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

- Source: `shard 5`
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

- Source: `changed`
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
          - listitem [ref=e778]:
            - generic [ref=e779]: About
          - listitem [ref=e780]:
            - generic [ref=e781]: How it works
      - navigation "Help" [ref=e782]:
        - heading "Help" [level=2] [ref=e783]
        - list [ref=e784]:
          - listitem [ref=e785]:
            - generic [ref=e786]: Safety
          - listitem [ref=e787]:
            - generic [ref=e788]: Contact
      - navigation "Legal" [ref=e789]:
        - heading "Legal" [level=2] [ref=e790]
        - list [ref=e791]:
          - listitem [ref=e792]:
            - generic [ref=e793]: Terms
          - listitem [ref=e794]:
            - generic [ref=e795]: Privacy
    - paragraph [ref=e797]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

```text
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:15969:21) ×3
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 5

```text
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:13856:39 at getResponse (http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:13903:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:13856:15) at async client (http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:16052:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:15983:20) at async userNext (http://127.0.0.1:4173/assets/index-fs8a6Mgz.js:15969:21) ×6
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
