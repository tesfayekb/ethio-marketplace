# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/35965089401
- Commit: `da96944a8c79312bf822eb9488ac90b751b9e723`
- Attempt: 1
- Written (UTC): 2026-09-24T08:14:45.673Z
- Passed: 794 · Skipped: 48 · Failed: 2
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 1
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 4 user(s) owned by process 35965089401-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 399 user(s) owned by process 35965089401-nightly
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

## post-wizard.spec.ts › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar

- Source: `full`
- Project: `mobile-360`

```text
Error: LY-6: the sticky action bar covers the open currency list

expect(received).toBe(expected) // Object.is equality

Expected: "post-price-currency-option"
Received: ""
```

Context:

```text
          - listitem [ref=e176]:
            - generic [ref=e177]: About
          - listitem [ref=e178]:
            - generic [ref=e179]: How it works
      - navigation "Help" [ref=e180]:
        - heading "Help" [level=2] [ref=e181]
        - list [ref=e182]:
          - listitem [ref=e183]:
            - generic [ref=e184]: Safety
          - listitem [ref=e185]:
            - generic [ref=e186]: Contact
      - navigation "Legal" [ref=e187]:
        - heading "Legal" [level=2] [ref=e188]
        - list [ref=e189]:
          - listitem [ref=e190]:
            - generic [ref=e191]: Terms
          - listitem [ref=e192]:
            - generic [ref=e193]: Privacy
    - paragraph [ref=e195]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: full

```text
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
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).
