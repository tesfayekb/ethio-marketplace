# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36961043936
- Commit: `9f80e7e4e4c3a73c62e77019cf9c047be9a497b0`
- Attempt: 1
- Written (UTC): 2026-10-02T03:57:46.110Z
- Passed: 1215 · Skipped: 77 · Failed: 8
- Gating failures: 8 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

112 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 12 | shard 3, shard 5, shard 6, changed |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 4 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 5 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 5 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `links unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations badHeader` (quiet) | 2 | shard 2, shard 5 |
| `locations file too large` (quiet) | 2 | shard 2, shard 5 |
| `locations nulByte` (quiet) | 2 | shard 2, shard 5 |
| `locations unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 12 · Sources: shard 3, shard 5, shard 6, changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-02T03:39:45.517Z | 12.9 min |
| email | 2026-10-02T03:39:32.085Z | 0.2 min |
| shard 1 | 2026-10-02T03:39:26.023Z | 18.1 min |
| shard 2 | 2026-10-02T03:39:36.453Z | 16.3 min |
| shard 3 | 2026-10-02T03:39:23.565Z | 13.6 min |
| shard 4 | 2026-10-02T03:39:27.434Z | 16.2 min |
| shard 5 | 2026-10-02T03:39:40.630Z | 17.1 min |
| shard 6 | 2026-10-02T03:39:28.340Z | 12.0 min |
| changed | 2026-10-02T03:39:27.490Z | 15.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 120 | 25.7 min | shard 3, shard 6, changed |
| `shell.spec.ts` | 252 | 15.4 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 64 | 13.4 min | shard 3, shard 5, changed |
| `post-wizard-where.spec.ts` | 56 | 12.8 min | shard 3, shard 6, changed |
| `admin-categories-console.spec.ts` | 32 | 10.7 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 40 | 9.9 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 34 | 9.1 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 76 | 8.5 min | shard 3, shard 6, changed |
| `auth-signout.spec.ts` | 44 | 8.2 min | smoke, shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 40 | 7.4 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 7.3 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 7.2 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 38 | 6.9 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 22 | 6.2 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 22 | 6.1 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 36 | 5.8 min | shard 1, shard 5 |
| `post-wizard-resets.spec.ts` | 18 | 5.5 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 32 | 5.1 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 4.9 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 34 | 4.6 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.2 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 16 | 3.2 min | shard 2, shard 5, changed |
| `admin-translations-data.spec.ts` | 8 | 3.1 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 10 | 2.7 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.1 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 0.9 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 4 | 0.9 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.4 min | shard 3 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-console.spec.ts` › CT-2 roster: the ratified tree renders, search narrows it, nothing overflows | mobile-360 | 56.6 s |
| `admin-categories-console.spec.ts` › CT-2 roster: the ratified tree renders, search narrows it, nothing overflows | desktop-1280 | 54.6 s |
| `admin-categories-console.spec.ts` › CT-9a roster shape: the parent column and a 25-row page (table twin) | desktop-1280 | 52.9 s |
| `admin-categories-console.spec.ts` › CT-9b roster shape: the parent line and pagination inside cards | mobile-360 | 52.1 s |
| `admin-categories-console.spec.ts` › CT-11 roster controls: missing-assets filter and a device page size | mobile-360 | 51.2 s |
| `admin-categories-console.spec.ts` › CT-11 roster controls: missing-assets filter and a device page size | desktop-1280 | 48.8 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 46.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-14 catch-all law: never a parent, refused server-side, no move verbs | desktop-1280 | 46.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-14 catch-all law: never a parent, refused server-side, no move verbs | mobile-360 | 44.9 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.0 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 35.7 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 35.7 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 35.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] deleted 3 user(s) owned by process 36961043936-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] deleted 4 user(s) owned by process 36961043936-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] deleted 8 user(s) owned by process 36961043936-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 34 (pool 3, fresh 31)
[e2e:teardown] deleted 47 user(s) owned by process 36961043936-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 3, fresh 3)
[e2e:teardown] deleted 4 user(s) owned by process 36961043936-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] deleted 7 user(s) owned by process 36961043936-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] deleted 41 user(s) owned by process 36961043936-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] deleted 4 user(s) owned by process 36961043936-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] deleted 3 user(s) owned by process 36961043936-changed
```

## admin-categories-console.spec.ts › C2 categories console › CT-2 roster: the ratified tree renders, search narrows it, nothing overflows

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-vehicles-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-vehicles-card')

```

Context:

```text
          - listitem [ref=e807]:
            - generic [ref=e808]: About
          - listitem [ref=e809]:
            - generic [ref=e810]: How it works
      - navigation "Help" [ref=e811]:
        - heading "Help" [level=2] [ref=e812]
        - list [ref=e813]:
          - listitem [ref=e814]:
            - generic [ref=e815]: Safety
          - listitem [ref=e816]:
            - generic [ref=e817]: Contact
      - navigation "Legal" [ref=e818]:
        - heading "Legal" [level=2] [ref=e819]
        - list [ref=e820]:
          - listitem [ref=e821]:
            - generic [ref=e822]: Terms
          - listitem [ref=e823]:
            - generic [ref=e824]: Privacy
    - paragraph [ref=e826]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-9b roster shape: the parent line and pagination inside cards

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-vehicles-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-vehicles-card')

```

Context:

```text
          - listitem [ref=e817]:
            - generic [ref=e818]: About
          - listitem [ref=e819]:
            - generic [ref=e820]: How it works
      - navigation "Help" [ref=e821]:
        - heading "Help" [level=2] [ref=e822]
        - list [ref=e823]:
          - listitem [ref=e824]:
            - generic [ref=e825]: Safety
          - listitem [ref=e826]:
            - generic [ref=e827]: Contact
      - navigation "Legal" [ref=e828]:
        - heading "Legal" [level=2] [ref=e829]
        - list [ref=e830]:
          - listitem [ref=e831]:
            - generic [ref=e832]: Terms
          - listitem [ref=e833]:
            - generic [ref=e834]: Privacy
    - paragraph [ref=e836]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-11 roster controls: missing-assets filter and a device page size

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-vehicles-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-vehicles-card')

```

Context:

```text
          - listitem [ref=e817]:
            - generic [ref=e818]: About
          - listitem [ref=e819]:
            - generic [ref=e820]: How it works
      - navigation "Help" [ref=e821]:
        - heading "Help" [level=2] [ref=e822]
        - list [ref=e823]:
          - listitem [ref=e824]:
            - generic [ref=e825]: Safety
          - listitem [ref=e826]:
            - generic [ref=e827]: Contact
      - navigation "Legal" [ref=e828]:
        - heading "Legal" [level=2] [ref=e829]
        - list [ref=e830]:
          - listitem [ref=e831]:
            - generic [ref=e832]: Terms
          - listitem [ref=e833]:
            - generic [ref=e834]: Privacy
    - paragraph [ref=e836]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-14 catch-all law: never a parent, refused server-side, no move verbs

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-vehicles-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-vehicles-card')

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

## admin-categories-console.spec.ts › C2 categories console › CT-2 roster: the ratified tree renders, search narrows it, nothing overflows

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-vehicles')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-vehicles')

```

Context:

```text
          - listitem [ref=e1213]:
            - generic [ref=e1214]: About
          - listitem [ref=e1215]:
            - generic [ref=e1216]: How it works
      - navigation "Help" [ref=e1217]:
        - heading "Help" [level=2] [ref=e1218]
        - list [ref=e1219]:
          - listitem [ref=e1220]:
            - generic [ref=e1221]: Safety
          - listitem [ref=e1222]:
            - generic [ref=e1223]: Contact
      - navigation "Legal" [ref=e1224]:
        - heading "Legal" [level=2] [ref=e1225]
        - list [ref=e1226]:
          - listitem [ref=e1227]:
            - generic [ref=e1228]: Terms
          - listitem [ref=e1229]:
            - generic [ref=e1230]: Privacy
    - paragraph [ref=e1232]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-9a roster shape: the parent column and a 25-row page (table twin)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-vehicles')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-vehicles')

```

Context: context file not found for `admin-categories-console-C2-categories-console-CT-9a-roster-shape-the-parent-column-and-a-25-row-page-table-twin-desktop-1280`

## admin-categories-console.spec.ts › C2 categories console › CT-11 roster controls: missing-assets filter and a device page size

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-vehicles')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-vehicles')

```

Context:

```text
          - listitem [ref=e1209]:
            - generic [ref=e1210]: About
          - listitem [ref=e1211]:
            - generic [ref=e1212]: How it works
      - navigation "Help" [ref=e1213]:
        - heading "Help" [level=2] [ref=e1214]
        - list [ref=e1215]:
          - listitem [ref=e1216]:
            - generic [ref=e1217]: Safety
          - listitem [ref=e1218]:
            - generic [ref=e1219]: Contact
      - navigation "Legal" [ref=e1220]:
        - heading "Legal" [level=2] [ref=e1221]
        - list [ref=e1222]:
          - listitem [ref=e1223]:
            - generic [ref=e1224]: Terms
          - listitem [ref=e1225]:
            - generic [ref=e1226]: Privacy
    - paragraph [ref=e1228]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › C2 categories console › CT-14 catch-all law: never a parent, refused server-side, no move verbs

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-vehicles')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-vehicles')

```

Context:

```text
          - listitem [ref=e1223]:
            - generic [ref=e1224]: About
          - listitem [ref=e1225]:
            - generic [ref=e1226]: How it works
      - navigation "Help" [ref=e1227]:
        - heading "Help" [level=2] [ref=e1228]
        - list [ref=e1229]:
          - listitem [ref=e1230]:
            - generic [ref=e1231]: Safety
          - listitem [ref=e1232]:
            - generic [ref=e1233]: Contact
      - navigation "Legal" [ref=e1234]:
        - heading "Legal" [level=2] [ref=e1235]
        - list [ref=e1236]:
          - listitem [ref=e1237]:
            - generic [ref=e1238]: Terms
          - listitem [ref=e1239]:
            - generic [ref=e1240]: Privacy
    - paragraph [ref=e1242]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

```text
[client-error] console.error: [client-error] gate fetch threw ×3
console.error: [client-error] gate fetch threw ×3
```
