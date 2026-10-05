# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37264070069
- Commit: `70e16ea5c557d243200e73b3005b2a3a8ba9bdf6`
- Attempt: 1
- Written (UTC): 2026-10-05T04:57:47.830Z
- Passed: 1187 · Skipped: 76 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

108 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 3, shard 5, shard 6 |
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

- Count: 8 · Sources: shard 3, shard 5, shard 6

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
| smoke | 2026-10-05T04:36:14.256Z | 14.0 min |
| email | 2026-10-05T04:36:25.973Z | 0.3 min |
| shard 1 | 2026-10-05T04:36:07.636Z | 21.4 min |
| shard 2 | 2026-10-05T04:36:12.021Z | 19.8 min |
| shard 3 | 2026-10-05T04:36:12.476Z | 20.2 min |
| shard 4 | 2026-10-05T04:36:04.650Z | 18.8 min |
| shard 5 | 2026-10-05T04:36:07.248Z | 19.1 min |
| shard 6 | 2026-10-05T04:36:05.482Z | 13.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 20.3 min | shard 3, shard 6 |
| `shell.spec.ts` | 252 | 16.4 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 60 | 14.4 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 44 | 11.3 min | shard 3, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 9.9 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 42 | 9.2 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 8.6 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 8.5 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 44 | 8.5 min | smoke, shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 28 | 8.1 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 30 | 8.1 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 42 | 7.8 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 32 | 7.6 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 7.5 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 20 | 6.7 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 24 | 6.7 min | shard 2, shard 5 |
| `import-security.spec.ts` | 34 | 6.4 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 36 | 6.4 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 20 | 6.0 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 34 | 5.5 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 38 | 5.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.9 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 16 | 3.0 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | shard 1, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 14 | 1.5 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.4 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.1 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 4 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `i18n-bundle.spec.ts` | 4 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.4 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 4, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.6 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.9 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 40.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 38.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 37.6 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 37.2 s |
| `post-wizard-pricing.spec.ts` › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) | mobile-360 | 36.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 35.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 35.4 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 34.2 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 34.2 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self, super-admin target, and a non-super caller | mobile-360 | 34.0 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 33.2 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 33.0 s |
| `admin-attributes-links.spec.ts` › AT-60 a links file reorders three links and the posting read follows | mobile-360 | 32.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37264070069-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37264070069-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 5, fresh 7)
[e2e:teardown] transport retries this run: 12 (by method: GET 12; by code: UND_ERR_HEADERS_OVERFLOW 12; ran out: 4)
[e2e:teardown] deleted 8 user(s) owned by process 37264070069-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 37264070069-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 5, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37264070069-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 5, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 37264070069-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 37264070069-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37264070069-6
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-19 a create and a rename commit through the doors and undo

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: []

expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
    "adds": 1,
-   "changes": 1,
+   "changes": 2,
    "refusals": 0,
  }
```

Context:

```text
          - listitem [ref=e780]:
            - generic [ref=e781]: About
          - listitem [ref=e782]:
            - generic [ref=e783]: How it works
      - navigation "Help" [ref=e784]:
        - heading "Help" [level=2] [ref=e785]
        - list [ref=e786]:
          - listitem [ref=e787]:
            - generic [ref=e788]: Safety
          - listitem [ref=e789]:
            - generic [ref=e790]: Contact
      - navigation "Legal" [ref=e791]:
        - heading "Legal" [level=2] [ref=e792]
        - list [ref=e793]:
          - listitem [ref=e794]:
            - generic [ref=e795]: Terms
          - listitem [ref=e796]:
            - generic [ref=e797]: Privacy
    - paragraph [ref=e799]: © 2026 ethio.com — All rights reserved.
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
