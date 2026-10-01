# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/36929256538
- Commit: `44e8eb858f50cfe556d2ba055a29515a9df5a65f`
- Attempt: 1
- Written (UTC): 2026-10-01T21:47:27.509Z
- Passed: 1032 · Skipped: 75 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-console.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-categories-console.spec.ts › C2 categories console › CT-4 visibility window: a future window is stored as DB truth

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-0-rqwz4u-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-0-rqwz4u-card')

[dialog-dump findRow(e2e-cat-1-0-rqwz4u)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-1-0-rqwz4u) after create] open dialogs: none
```

Context:

```text
          - listitem [ref=e113]:
            - generic [ref=e114]: About
          - listitem [ref=e115]:
            - generic [ref=e116]: How it works
      - navigation "Help" [ref=e117]:
        - heading "Help" [level=2] [ref=e118]
        - list [ref=e119]:
          - listitem [ref=e120]:
            - generic [ref=e121]: Safety
          - listitem [ref=e122]:
            - generic [ref=e123]: Contact
      - navigation "Legal" [ref=e124]:
        - heading "Legal" [level=2] [ref=e125]
        - list [ref=e126]:
          - listitem [ref=e127]:
            - generic [ref=e128]: Terms
          - listitem [ref=e129]:
            - generic [ref=e130]: Privacy
    - paragraph [ref=e132]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

103 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 12 | shard 2, shard 5 |
| `digest mismatch` (quiet) | 10 | shard 1, shard 2, shard 4, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 3 | shard 3, shard 6 |
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

Quiet (allowlisted): too many previews ×12 · digest mismatch ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 3 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-01T21:32:54.299Z | 11.8 min |
| email | 2026-10-01T21:32:45.766Z | 0.2 min |
| shard 1 | 2026-10-01T21:32:50.041Z | 14.3 min |
| shard 2 | 2026-10-01T21:32:45.667Z | 11.7 min |
| shard 3 | 2026-10-01T21:37:09.804Z | 10.0 min |
| shard 4 | 2026-10-01T21:32:45.057Z | 13.2 min |
| shard 5 | 2026-10-01T21:32:58.361Z | 12.9 min |
| shard 6 | 2026-10-01T21:33:00.435Z | 11.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 252 | 14.7 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 52 | 9.1 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 40 | 7.8 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 34 | 7.1 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 6.8 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 40 | 6.3 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 38 | 6.2 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 5.6 min | smoke, shard 2, shard 5 |
| `import-security.spec.ts` | 34 | 5.2 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 5.2 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 36 | 5.0 min | shard 1, shard 5 |
| `post-wizard-pricing.spec.ts` | 26 | 4.9 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 24 | 4.9 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 34 | 4.6 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 18 | 4.3 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 24 | 4.1 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 22 | 3.9 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 22 | 3.8 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 32 | 3.4 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 3.4 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 36 | 3.2 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 16 | 2.5 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.4 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.1 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 10 | 2.1 min | shard 1, shard 4 |
| `shell-table-law.spec.ts` | 2 | 1.4 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 14 | 1.2 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 6 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 0.8 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 4 | 0.7 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-image-routes.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.3 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.3 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `settings.spec.ts` | 4 | 0.3 min | shard 3 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `shell-table-law.spec.ts` › admin tables never overflow horizontally | desktop-1280 | 44.2 s |
| `admin-categories-console.spec.ts` › CT-4 visibility window: a future window is stored as DB truth | mobile-360 | 43.8 s |
| `shell-table-law.spec.ts` › admin tables never overflow horizontally | mobile-360 | 38.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 34.1 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 33.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 33.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 31.9 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 31.6 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 30.3 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 30.1 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 29.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it | desktop-1280 | 28.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 28.4 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 27.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] deleted 3 user(s) owned by process 36929256538-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] deleted 4 user(s) owned by process 36929256538-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] deleted 8 user(s) owned by process 36929256538-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 3, fresh 27)
[e2e:teardown] deleted 43 user(s) owned by process 36929256538-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] deleted 3 user(s) owned by process 36929256538-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] deleted 7 user(s) owned by process 36929256538-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 27 (pool 4, fresh 23)
[e2e:teardown] deleted 37 user(s) owned by process 36929256538-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 3, fresh 3)
[e2e:teardown] deleted 3 user(s) owned by process 36929256538-6
```

## import-security.spec.ts › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: {"error":"tooManyRequests"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 429
```

Context:

```text
          - listitem [ref=e113]:
            - generic [ref=e114]: About
          - listitem [ref=e115]:
            - generic [ref=e116]: How it works
      - navigation "Help" [ref=e117]:
        - heading "Help" [level=2] [ref=e118]
        - list [ref=e119]:
          - listitem [ref=e120]:
            - generic [ref=e121]: Safety
          - listitem [ref=e122]:
            - generic [ref=e123]: Contact
      - navigation "Legal" [ref=e124]:
        - heading "Legal" [level=2] [ref=e125]
        - list [ref=e126]:
          - listitem [ref=e127]:
            - generic [ref=e128]: Terms
          - listitem [ref=e129]:
            - generic [ref=e130]: Privacy
    - paragraph [ref=e132]: © 2026 ethio.com — All rights reserved.
```
```

## shell-table-law.spec.ts › shell table law › admin tables never overflow horizontally

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('user-row-dc5f829d-1c3a-411e-8df4-56a9eabff2c9')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('user-row-dc5f829d-1c3a-411e-8df4-56a9eabff2c9')

```

Context:

```text
          - listitem [ref=e742]:
            - generic [ref=e743]: About
          - listitem [ref=e744]:
            - generic [ref=e745]: How it works
      - navigation "Help" [ref=e746]:
        - heading "Help" [level=2] [ref=e747]
        - list [ref=e748]:
          - listitem [ref=e749]:
            - generic [ref=e750]: Safety
          - listitem [ref=e751]:
            - generic [ref=e752]: Contact
      - navigation "Legal" [ref=e753]:
        - heading "Legal" [level=2] [ref=e754]
        - list [ref=e755]:
          - listitem [ref=e756]:
            - generic [ref=e757]: Terms
          - listitem [ref=e758]:
            - generic [ref=e759]: Privacy
    - paragraph [ref=e761]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: {"error":"tooManyRequests"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 429
```

Context:

```text
          - listitem [ref=e1196]:
            - generic [ref=e1197]: About
          - listitem [ref=e1198]:
            - generic [ref=e1199]: How it works
      - navigation "Help" [ref=e1200]:
        - heading "Help" [level=2] [ref=e1201]
        - list [ref=e1202]:
          - listitem [ref=e1203]:
            - generic [ref=e1204]: Safety
          - listitem [ref=e1205]:
            - generic [ref=e1206]: Contact
      - navigation "Legal" [ref=e1207]:
        - heading "Legal" [level=2] [ref=e1208]
        - list [ref=e1209]:
          - listitem [ref=e1210]:
            - generic [ref=e1211]: Terms
          - listitem [ref=e1212]:
            - generic [ref=e1213]: Privacy
    - paragraph [ref=e1215]: © 2026 ethio.com — All rights reserved.
```
```

## shell-table-law.spec.ts › shell table law › admin tables never overflow horizontally

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('user-row-4d2ca206-95e2-474e-b6ac-64780787e65d')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('user-row-4d2ca206-95e2-474e-b6ac-64780787e65d')

```

Context:

```text
          - listitem [ref=e744]:
            - generic [ref=e745]: About
          - listitem [ref=e746]:
            - generic [ref=e747]: How it works
      - navigation "Help" [ref=e748]:
        - heading "Help" [level=2] [ref=e749]
        - list [ref=e750]:
          - listitem [ref=e751]:
            - generic [ref=e752]: Safety
          - listitem [ref=e753]:
            - generic [ref=e754]: Contact
      - navigation "Legal" [ref=e755]:
        - heading "Legal" [level=2] [ref=e756]
        - list [ref=e757]:
          - listitem [ref=e758]:
            - generic [ref=e759]: Terms
          - listitem [ref=e760]:
            - generic [ref=e761]: Privacy
    - paragraph [ref=e763]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 2

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
[WebServer] [ssr-error] /api/admin/locations/import too many previews ×2
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 2

```text
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:13859:39 at getResponse (http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:13906:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:13859:15) at async client (http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:16055:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:15986:20) at async userNext (http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:15972:21) ×3
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:13859:39 at getResponse (http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:13906:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:13859:15) at async client (http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:16055:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:15986:20) at async userNext (http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:15972:21) ×3
console.error: [client-error] gate fetch threw
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 5

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
[WebServer] [ssr-error] /api/admin/locations/import too many previews ×2
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 5

```text
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:13859:39 at getResponse (http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:13906:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:13859:15) at async client (http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:16055:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:15986:20) at async userNext (http://127.0.0.1:4173/assets/index-xtGCV_Mp.js:15972:21) ×6
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
