# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/34814629664
- Commit: `fdbfa9d00104e5014c856cc69b63c5e6e969d287`
- Attempt: 1
- Written (UTC): 2026-09-14T07:33:38.143Z
- Passed: 511 · Skipped: 41 · Failed: 1
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 1
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): nightly, full
- Sources without results: none

## Post-test errors: nightly

nightly: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 4 user(s) owned by process 34814629664-nightly
```

## Post-test errors: full

full: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] deleted 235 user(s) owned by process 34814629664-nightly
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
          - listitem [ref=e211]:
            - generic [ref=e212]: About
          - listitem [ref=e213]:
            - generic [ref=e214]: How it works
      - navigation "Help" [ref=e215]:
        - heading "Help" [level=2] [ref=e216]
        - list [ref=e217]:
          - listitem [ref=e218]:
            - generic [ref=e219]: Safety
          - listitem [ref=e220]:
            - generic [ref=e221]: Contact
      - navigation "Legal" [ref=e222]:
        - heading "Legal" [level=2] [ref=e223]
        - list [ref=e224]:
          - listitem [ref=e225]:
            - generic [ref=e226]: Terms
          - listitem [ref=e227]:
            - generic [ref=e228]: Privacy
    - paragraph [ref=e230]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: full

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import too many previews
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
```

## Client errors: full

No `[client-error]` lines in the `full` log (or no log was uploaded).
