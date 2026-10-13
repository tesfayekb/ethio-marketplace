# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38428509121
- Commit: `574e31d5ae4ffa24edf46ca347ffc6f3d730defc`
- Attempt: 1
- Written (UTC): 2026-10-13T16:56:32.335Z
- Passed: 1132 · Skipped: 114 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 6, changed
- Sources without results: shard 4, shard 5
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (7 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

105 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 5 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>yq<n>hs: e<n>e_par_<n>xhiy<n> → e<n>e_chi_ozy<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-mts<n>f: e<n>e_par_qiigq<n> → e<n>e_chi_<n>p<n>kzj` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>yq<n>hs: e<n>e_par_<n>xhiy<n> → e<n>e_chi_ozy<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-mts<n>f: e<n>e_par_qiigq<n> → e<n>e_chi_<n>p<n>kzj ×1

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · footer columns are centred as a group and each is centred ×1 · PW-17 the currency is preselected and searchable by name in one control ×1 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1 · PW-49 a prefill-only fact keeps its input while a settled one does not ×1 · PW-50 the specifications show every row open in display order (D41) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 6, changed · unavailable: shard 4, shard 5

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-13T16:26:25.114Z | 14.8 min |
| email | 2026-10-13T16:26:22.907Z | 0.2 min |
| shard 1 | 2026-10-13T16:26:24.174Z | 29.2 min |
| shard 2 | 2026-10-13T16:26:26.771Z | 29.6 min |
| shard 3 | 2026-10-13T16:26:21.218Z | 25.0 min |
| shard 6 | 2026-10-13T16:26:30.114Z | 25.7 min |
| changed | 2026-10-13T16:26:33.975Z | 7.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 21.4 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 54 | 20.9 min | shard 2, changed |
| `shell.spec.ts` | 336 | 19.3 min | smoke, shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 13.2 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 52 | 11.1 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 10.7 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 34 | 10.1 min | shard 2 |
| `admin-listings.spec.ts` | 27 | 8.3 min | shard 1 |
| `post-wizard-pricing.spec.ts` | 25 | 7.4 min | shard 3 |
| `auth-signout.spec.ts` | 33 | 6.4 min | smoke, shard 2 |
| `admin-categories-lifecycle.spec.ts` | 25 | 6.4 min | shard 1 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 3, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 6.2 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 24 | 5.5 min | shard 2 |
| `admin-attributes-library.spec.ts` | 21 | 5.0 min | shard 1 |
| `post-wizard-place.spec.ts` | 19 | 4.8 min | shard 2 |
| `feed-screens.spec.ts` | 14 | 4.6 min | shard 2 |
| `admin-users.spec.ts` | 13 | 4.2 min | shard 2 |
| `admin-attributes-links.spec.ts` | 16 | 4.1 min | shard 1 |
| `admin-attributes-editor.spec.ts` | 17 | 3.8 min | shard 1 |
| `admin-categories-console.spec.ts` | 17 | 3.7 min | shard 1 |
| `feed-index.spec.ts` | 14 | 3.7 min | shard 2 |
| `admin-locations.spec.ts` | 19 | 3.5 min | shard 1 |
| `admin-attributes-import.spec.ts` | 20 | 3.4 min | shard 1 |
| `import-security.spec.ts` | 18 | 3.2 min | shard 2 |
| `admin-screening.spec.ts` | 17 | 3.1 min | shard 1 |
| `admin-translations-console.spec.ts` | 21 | 2.7 min | shard 1 |
| `posting-routes-dials.spec.ts` | 14 | 2.6 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 13 | 2.6 min | shard 1 |
| `admin-attributes-safety.spec.ts` | 8 | 2.6 min | shard 1 |
| `feed-route.spec.ts` | 8 | 2.4 min | shard 2 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 7 | 1.6 min | shard 1 |
| `admin-countries.spec.ts` | 9 | 1.6 min | shard 1 |
| `admin-categories-home.spec.ts` | 5 | 1.5 min | shard 1 |
| `admin-translations-governance.spec.ts` | 4 | 1.4 min | shard 2 |
| `posting-routes-identity.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 1.1 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 9 | 1.0 min | shard 2 |
| `admin-coverage.spec.ts` | 8 | 1.0 min | shard 1 |
| `admin-translations-data.spec.ts` | 4 | 1.0 min | shard 1 |
| `post-wizard-details.spec.ts` | 4 | 0.9 min | shard 2 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 4 | 0.8 min | shard 2 |
| `category-image-routes.spec.ts` | 5 | 0.7 min | shard 2 |
| `admin-shell.spec.ts` | 5 | 0.7 min | shard 1 |
| `post-wizard-recent.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `locations-tree.spec.ts` | 4 | 0.5 min | shard 2 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `admin-categories-images.spec.ts` | 1 | 0.3 min | shard 1 |
| `i18n-bundle.spec.ts` | 3 | 0.3 min | shard 2 |
| `i18n-coverage.spec.ts` | 4 | 0.3 min | shard 2 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `category-nav.spec.ts` | 5 | 0.3 min | shard 2 |
| `phone-frame.spec.ts` | 9 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `house-style.spec.ts` | 6 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `layout.spec.ts` | 5 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 5 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-listings.spec.ts` › AL-2 All listings: the views, the filters and newest first | mobile-360 | 57.8 s |
| `photo-pipeline.spec.ts` › PP-15 a photo stored in an earlier visit can be made the cover, which moves it first, and removed | mobile-360 | 57.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it | mobile-360 | 50.1 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 47.5 s |
| `post-wizard-bundle2.spec.ts` › PW-122 an empty phone box opens on the country of the item's place | mobile-360 | 44.2 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 41.3 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 40.9 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | mobile-360 | 40.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 39.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 39.3 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | desktop-1280 | 38.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 38.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 38.2 s |
| `posting-routes.spec.ts` › PR-12 the draft door at step 1 takes 'negotiable' as an alias: fixed + flag (INC-309) | desktop-1280 | 38.1 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 38.0 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38428509121-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38428509121-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38428509121-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 38428509121-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 1 (by method: DELETE 1; by code: ECONNRESET 1; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38428509121-3
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38428509121-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38428509121-changed
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-8yq3hs: e2e_par_7xhiy9 → e2e_chi_ozy986
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
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
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38428509121-4-2861-2-ptmopq@ethio-e2e.invalid)
[e2e:l4c] get_my_translator_languages for pooled 060a0ce8-bb80-4cc7-b1c0-e95aa02c9911: []
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38428509121-4-2861-3-a58sjp@ethio-e2e.invalid)
  ✓  234 [desktop-1280] › e2e/admin-screening.spec.ts:408:3 › ADMIN SCREENING › SC-7 a reviewer reads the preview's facts: the ad's country, the methods shown and the public name, never a value (10.0s)
  ✓  235 [desktop-1280] › e2e/admin-translations-console.spec.ts:315:3 › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts (7.0s)
[e2e:l4c] get_my_translator_languages for pooled 60c2a972-4030-4bab-9807-f586066a642e: []
  ✓  237 [desktop-1280] › e2e/admin-translations-console.spec.ts:339:3 › U4b translations console › TR-7b sync after a step-up prompt still reports its counts @private-identity (10.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38428509121-4-2861-2-ptmopq@ethio-e2e.invalid)
  ✓  236 [desktop-1280] › e2e/admin-screening.spec.ts:440:3 › ADMIN SCREENING › SC-8 a person who is not a reviewer reads nothing and reveals nothing, and no row is written (12.5s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-8yq3hs: e2e_par_7xhiy9 → e2e_chi_ozy986
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined
--- final 10 lines ---
✓  243 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:574:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (17.8s)
  ✓  244 [desktop-1280] › e2e/post-wizard-place.spec.ts:1061:3 › POSTING WIZARD › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city (17.7s)
  ✓  245 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:608:3 › POSTING WIZARD › PW-65 the currency list opens home first and USD second, with symbols (D62-2) (9.8s)
  ✓  246 [desktop-1280] › e2e/post-wizard-place.spec.ts:1157:3 › POSTING WIZARD › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched (15.3s)
  ✓  247 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:638:3 › POSTING WIZARD › PW-169 with a currency chosen, the list opens with it first and marked, and keeps it first under a search that misses it (Bundle 7 B2) (9.9s)
  ✓  249 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:667:3 › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309) (9.2s)
  ✓  248 [desktop-1280] › e2e/post-wizard-place.spec.ts:1200:3 › POSTING WIZARD › PW-82 the add buttons follow the plan's own limits (14.0s)
  ✓  251 [desktop-1280] › e2e/post-wizard-place.spec.ts:1275:3 › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact (11.3s)
  ✓  250 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:700:3 › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312) (14.7s)
```

```text
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
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```
