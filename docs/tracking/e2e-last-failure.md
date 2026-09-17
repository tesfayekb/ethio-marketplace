# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35176748289
- Commit: `bc5f73e01795918a856b0f160af3dd297908cc2a`
- Attempt: 1
- Written (UTC): 2026-09-17T03:14:49.953Z
- Passed: 728 · Skipped: 70 · Failed: 2
- Gating failures: 2 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 3
- Post-test errors (DEC-059, non-gating): shard 2, shard 5
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster and its transfer toolbar render for an admin — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster and its transfer toolbar render for an admin — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the marketplace shell renders no English fallback — Error: marketplace rail categories: category labels still in English

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 61 user(s) owned by process 35176748289-2
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 59 user(s) owned by process 35176748289-5
```

## admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope

- Source: `shard 2`
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

- Source: `shard 5`
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

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 5

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).
