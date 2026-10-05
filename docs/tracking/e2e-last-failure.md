# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37256219728
- Commit: `a17b227c98d359a65e354b3f0df63e27aa6c1f1d`
- Attempt: 1
- Written (UTC): 2026-10-05T03:04:05.478Z
- Passed: 1291 · Skipped: 78 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 2
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-lifecycle.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope — Error: expect(received).toBe(expected) // Object.is equality

## Flaky bodies (DEC-078)

### admin-categories-lifecycle.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-0-k2w76v-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-1-0-k2w76v-card')

[dialog-dump findRow(e2e-cat-1-0-k2w76v)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-1-0-k2w76v) after create] open dialogs: none
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

### admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
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

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

128 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 16 | shard 1, shard 2, shard 4, shard 5, changed |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 3, shard 6 |
| `preview_failed permission denied` (quiet) | 8 | shard 1, shard 4, changed |
| `categories badHeader` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5, changed |
| `categories wrongFile` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5, changed |
| `definitions badHeader` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5, changed |
| `definitions wrongFile` (quiet) | 6 | shard 1, shard 2, shard 4, shard 5, changed |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 5 | shard 1, shard 2, shard 4, shard 5, changed |
| `commit_failed step-up required: no verified factor` (quiet) | 4 | shard 1, shard 4, changed |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
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

Quiet (allowlisted): digest mismatch ×16 · too many previews ×10 · preview_failed permission denied ×8 · categories badHeader ×6 · categories wrongFile ×6 · definitions badHeader ×6 · definitions wrongFile ×6 · category-images: no GEMINI_API_KEY — fake mode ×5 · commit_failed step-up required: no verified factor ×4 · export_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 6

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
| smoke | 2026-10-05T02:39:58.084Z | 14.8 min |
| email | 2026-10-05T02:40:05.120Z | 0.2 min |
| shard 1 | 2026-10-05T02:39:58.230Z | 21.5 min |
| shard 2 | 2026-10-05T02:40:14.481Z | 23.1 min |
| shard 3 | 2026-10-05T02:39:57.298Z | 19.9 min |
| shard 4 | 2026-10-05T02:40:09.437Z | 23.6 min |
| shard 5 | 2026-10-05T02:39:58.365Z | 20.3 min |
| shard 6 | 2026-10-05T02:40:06.739Z | 19.3 min |
| changed | 2026-10-05T02:40:10.751Z | 12.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 76 | 25.4 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 84 | 19.6 min | shard 1, shard 4, changed |
| `shell.spec.ts` | 252 | 17.0 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 16.7 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 72 | 14.6 min | shard 1, shard 4, changed |
| `admin-attributes-import.spec.ts` | 68 | 13.8 min | shard 1, shard 4, changed |
| `admin-attributes-library.spec.ts` | 40 | 11.8 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 28 | 10.7 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 42 | 10.6 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 44 | 10.4 min | shard 3, shard 5 |
| `posting-routes.spec.ts` | 50 | 9.9 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 30 | 9.8 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.7 min | smoke, shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 9.3 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 8.8 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 20 | 8.7 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 24 | 8.2 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 36 | 7.7 min | shard 2, shard 5 |
| `import-security.spec.ts` | 34 | 7.6 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 7.5 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.2 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.1 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.5 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.3 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 4 | 0.8 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.4 min | smoke, shard 4, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 59.8 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 54.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 53.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 50.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-12 lifecycle: a retired category is reactivated through step-up | mobile-360 | 46.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 44.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 43.7 s |
| `admin-locations.spec.ts` › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope | mobile-360 | 43.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.3 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 43.2 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | desktop-1280 | 40.4 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | desktop-1280 | 39.3 s |
| `post-wizard-resets.spec.ts` › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) | desktop-1280 | 38.9 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | desktop-1280 | 38.4 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | mobile-360 | 38.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37256219728-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37256219728-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] transport retries this run: 12 (by method: GET 12; by code: UND_ERR_HEADERS_OVERFLOW 12; ran out: 4)
[e2e:teardown] deleted 8 user(s) owned by process 37256219728-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 37256219728-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 5, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37256219728-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37256219728-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37256219728-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37256219728-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37256219728-changed
```

## admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
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
