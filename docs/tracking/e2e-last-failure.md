# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39023408025
- Commit: `631840db030697f0c16c62b34125608f8e7a18c6`
- Attempt: 1
- Written (UTC): 2026-10-17T10:58:10.258Z
- Passed: 1844 · Skipped: 126 · Failed: 8
- Gating failures: 8 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

111 line(s), 38 message(s): 3 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>mjwtg: e<n>e_par_t<n>jsa → e<n>e_chi_s<n>jazo` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-xna<n>ef: e<n>e_par_nsdd<n> → e<n>e_chi_grw<n>` (quiet) | 1 | shard 1 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | smoke |
| `insert or update on table <q> violates foreign key constraint <q>` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>mjwtg: e<n>e_par_t<n>jsa → e<n>e_chi_s<n>jazo ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-xna<n>ef: e<n>e_par_nsdd<n> → e<n>e_chi_grw<n> ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · exactly one collapse toggle, and the wordmark moves into the bar when collapsed ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: smoke
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): LS-7 a region code alone selects the region ×1 · LS-8 a city name alone selects that city ×1

```text
[WebServer] [ssr-error] /api/feed Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

### insert or update on table <q> violates foreign key constraint <q>

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AP-14 the feed card links to the ad's page ×1 · AP-8 every ad has a well-formed id of its own ×1

```text
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-17T10:19:35.096Z | 17.1 min |
| email | 2026-10-17T10:19:26.841Z | 0.3 min |
| shard 1 | 2026-10-17T10:19:20.575Z | 34.3 min |
| shard 2 | 2026-10-17T10:19:29.373Z | 38.3 min |
| shard 3 | 2026-10-17T10:19:21.551Z | 30.0 min |
| shard 4 | 2026-10-17T10:19:19.650Z | 34.4 min |
| shard 5 | 2026-10-17T10:19:21.752Z | 32.6 min |
| shard 6 | 2026-10-17T10:19:23.138Z | 33.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 82 | 22.3 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 22.1 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 19.1 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 17.8 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 15.7 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 14.8 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 14.7 min | shard 2, shard 5 |
| `my-listings-ad.spec.ts` | 36 | 13.8 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 12.9 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 12.0 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 64 | 11.8 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 11.2 min | smoke, shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 10.8 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 10.8 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 10.8 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 10.5 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 8.9 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 8.7 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 8.5 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 8.5 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 8.4 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 7.5 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.3 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 7.1 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.1 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 6.9 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.4 min | shard 3, shard 6 |
| `feed-index.spec.ts` | 30 | 6.3 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.0 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 6.0 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 5.7 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `ad-page.spec.ts` | 20 | 5.5 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.0 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 3.7 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.6 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 14 | 3.3 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.2 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 2.9 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 2.3 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 1.8 min | shard 3, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 1.0 min | shard 1, shard 4 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.6 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 56.1 s |
| `post-wizard-place.spec.ts` › PW-30 review and buyer preview render option labels, units, multi-values and booleans | desktop-1280 | 54.3 s |
| `post-wizard-place.spec.ts` › PW-30 review and buyer preview render option labels, units, multi-values and booleans | mobile-360 | 51.9 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 51.4 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 51.2 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 48.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 48.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 47.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 46.9 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 44.6 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 44.5 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 43.6 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | mobile-360 | 43.2 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 42.7 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 42.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39023408025-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39023408025-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 39023408025-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39023408025-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39023408025-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 39023408025-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39023408025-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39023408025-6
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"

  991 |         "attribute_key,label_en,label_am,type,options,depends_on,unit,min,max,decimals,format,preset,max_length,help_text_en,help_text_am,is_per_variant (read-only),direct_link_count (read-only),unit_am",
  992 |       );
> 993 |       expect(links.slice(1).split("\r\n")[0]).toBe(
      |                                               ^
  994 |         "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order",
  995 |       );
  996 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:993:47
```

Context:

```text
          - listitem [ref=e1332]:
            - generic [ref=e1333]: About
          - listitem [ref=e1334]:
            - generic [ref=e1335]: How it works
      - navigation "Help" [ref=e1336]:
        - heading "Help" [level=2] [ref=e1337]
        - list [ref=e1338]:
          - listitem [ref=e1339]:
            - generic [ref=e1340]: Safety
          - listitem [ref=e1341]:
            - generic [ref=e1342]: Contact
      - navigation "Legal" [ref=e1343]:
        - heading "Legal" [level=2] [ref=e1344]
        - list [ref=e1345]:
          - listitem [ref=e1346]:
            - generic [ref=e1347]: Terms
          - listitem [ref=e1348]:
            - generic [ref=e1349]: Privacy
    - paragraph [ref=e1351]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"

  1224 |       const links = texts.get(`${fixture.parentSlug}-links.csv`)!;
  1225 |       const lines = links.slice(1).split("\r\n").filter(Boolean);
> 1226 |       expect(lines[0]).toBe(
       |                        ^
  1227 |         "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order",
  1228 |       );
  1229 |       // ONLY the subtree: every data row's category_slug is parent or child.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1226:24
```

Context:

```text
          - listitem [ref=e368]:
            - generic [ref=e369]: About
          - listitem [ref=e370]:
            - generic [ref=e371]: How it works
      - navigation "Help" [ref=e372]:
        - heading "Help" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - generic [ref=e376]: Safety
          - listitem [ref=e377]:
            - generic [ref=e378]: Contact
      - navigation "Legal" [ref=e379]:
        - heading "Legal" [level=2] [ref=e380]
        - list [ref=e381]:
          - listitem [ref=e382]:
            - generic [ref=e383]: Terms
          - listitem [ref=e384]:
            - generic [ref=e385]: Privacy
    - paragraph [ref=e387]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-links.spec.ts › C3 attributes console › AT-62 an exported link's condition and order re-import as unchanged

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-62 the export did not echo the order: e2e-cat-cond-iy0pl8,e2e-cat-cond-iy0pl8,e2e_attr_jpncns,false,false,,e2e-cat-cond-iy0pl8,,,e2e_attr_9u84gi=pickup,7,

expect(received).toMatch(expected)

Expected pattern: /,7$/
Received string:  "e2e-cat-cond-iy0pl8,e2e-cat-cond-iy0pl8,e2e_attr_jpncns,false,false,,e2e-cat-cond-iy0pl8,,,e2e_attr_9u84gi=pickup,7,"
--- further error 1 ---
Error: AT-62 the export did not echo the order: e2e-cat-cond-iy0pl8,e2e-cat-cond-iy0pl8,e2e_attr_jpncns,false,false,,e2e-cat-cond-iy0pl8,,,e2e_attr_9u84gi=pickup,7,

expect(received).toMatch(expected)

Expected pattern: /,7$/
Received string:  "e2e-cat-cond-iy0pl8,e2e-cat-cond-iy0pl8,e2e_attr_jpncns,false,false,,e2e-cat-cond-iy0pl8,,,e2e_attr_9u84gi=pickup,7,"

  1097 |         `${parentKey}=pickup`,
  1098 |       );
> 1099 |       expect(childRow, `AT-62 the export did not echo the order: ${childRow}`).toMatch(/,7$/);
       |                                                                                ^
  1100 |
  1101 |       // AND THE ROUND TRIP IS A NO-OP (IE-2b).
  1102 |       const preview = await importPost(page, token, { mode: "preview", links });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-links.spec.ts:1099:80
```

Context:

```text
          - listitem [ref=e1332]:
            - generic [ref=e1333]: About
          - listitem [ref=e1334]:
            - generic [ref=e1335]: How it works
      - navigation "Help" [ref=e1336]:
        - heading "Help" [level=2] [ref=e1337]
        - list [ref=e1338]:
          - listitem [ref=e1339]:
            - generic [ref=e1340]: Safety
          - listitem [ref=e1341]:
            - generic [ref=e1342]: Contact
      - navigation "Legal" [ref=e1343]:
        - heading "Legal" [level=2] [ref=e1344]
        - list [ref=e1345]:
          - listitem [ref=e1346]:
            - generic [ref=e1347]: Terms
          - listitem [ref=e1348]:
            - generic [ref=e1349]: Privacy
    - paragraph [ref=e1351]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 8735 ms | category and specifications seeded @ 9253 ms | step 3 reached @ 11332 ms | specifications answered @ 11746 ms | step 6 open @ 16994 ms | tree served @ 17446 ms | place chosen @ 17661 ms | review open @ 21848 ms | review labels read @ 21891 ms

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_4j9tdd_select"]')
Expected: "e2e_post_3_1_4j9tdd_a label"
Error: strict mode violation: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_4j9tdd_select"]') resolved to 2 elements:
    1) <li data-testid="listing-key-fact" data-key="e2e_post_3_1_4j9tdd_select" class="rounded-md border border-border px-2 py-1 text-xs">…</li> aka getByTestId('listing-key-facts').getByText('e2e_post_3_1_4j9tdd selecte2e_post_3_1_4j9tdd_a label')
    2) <dd class="text-end text-foreground" data-testid="listing-detail-spec" data-key="e2e_post_3_1_4j9tdd_select">e2e_post_3_1_4j9tdd_a label</dd> aka getByTestId('listing-detail-specs').getByText('e2e_post_3_1_4j9tdd_a label', { exact: true })

Call log:
  - PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 8735 ms | category and specifications seeded @ 9253 ms | step 3 reached @ 11332 ms | specifications answered @ 11746 ms | step 6 open @ 16994 ms | tree served @ 17446 ms | place chosen @ 17661 ms | review open @ 21848 ms | review labels read @ 21891 ms with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_4j9tdd_select"]')

--- further error 1 ---
Error: PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 8735 ms | category and specifications seeded @ 9253 ms | step 3 reached @ 11332 ms | specifications answered @ 11746 ms | step 6 open @ 16994 ms | tree served @ 17446 ms | place chosen @ 17661 ms | review open @ 21848 ms | review labels read @ 21891 ms

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_4j9tdd_select"]')
Expected: "e2e_post_3_1_4j9tdd_a label"
Error: strict mode violation: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_4j9tdd_select"]') resolved to 2 elements:
    1) <li data-testid="listing-key-fact" data-key="e2e_post_3_1_4j9tdd_select" class="rounded-md border border-border px-2 py-1 text-xs">…</li> aka getByTestId('listing-key-facts').getByText('e2e_post_3_1_4j9tdd selecte2e_post_3_1_4j9tdd_a label')
    2) <dd class="text-end text-foreground" data-testid="listing-detail-spec" data-key="e2e_post_3_1_4j9tdd_select">e2e_post_3_1_4j9tdd_a label</dd> aka getByTestId('listing-detail-specs').getByText('e2e_post_3_1_4j9tdd_a label', { exact: true })

Call log:
  - PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 8735 ms | category and specifications seeded @ 9253 ms | step 3 reached @ 11332 ms | specifications answered @ 11746 ms | step 6 open @ 16994 ms | tree served @ 17446 ms | place chosen @ 17661 ms | review open @ 21848 ms | review labels read @ 21891 ms with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-key="e2e_post_3_1_4j9tdd_select"]')


  825 |       buyer.locator(`[data-key="${spec.select.attrKey}"]`),
  826 |       why("PW-30: the buyer preview never rendered the select option's label"),
> 827 |     ).toHaveText(`${spec.optionValues[0]} label`, { timeout: 20_000 });
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-mobile-360` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-mobile-360`; this run carried 12 context file(s); of the same spec: none

## admin-attributes-library.spec.ts › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"

  991 |         "attribute_key,label_en,label_am,type,options,depends_on,unit,min,max,decimals,format,preset,max_length,help_text_en,help_text_am,is_per_variant (read-only),direct_link_count (read-only),unit_am",
  992 |       );
> 993 |       expect(links.slice(1).split("\r\n")[0]).toBe(
      |                                               ^
  994 |         "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order",
  995 |       );
  996 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:993:47
```

Context:

```text
          - listitem [ref=e1241]:
            - generic [ref=e1242]: About
          - listitem [ref=e1243]:
            - generic [ref=e1244]: How it works
      - navigation "Help" [ref=e1245]:
        - heading "Help" [level=2] [ref=e1246]
        - list [ref=e1247]:
          - listitem [ref=e1248]:
            - generic [ref=e1249]: Safety
          - listitem [ref=e1250]:
            - generic [ref=e1251]: Contact
      - navigation "Legal" [ref=e1252]:
        - heading "Legal" [level=2] [ref=e1253]
        - list [ref=e1254]:
          - listitem [ref=e1255]:
            - generic [ref=e1256]: Terms
          - listitem [ref=e1257]:
            - generic [ref=e1258]: Privacy
    - paragraph [ref=e1260]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order"
Received: "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order,fact_rank"

  1224 |       const links = texts.get(`${fixture.parentSlug}-links.csv`)!;
  1225 |       const lines = links.slice(1).split("\r\n").filter(Boolean);
> 1226 |       expect(lines[0]).toBe(
       |                        ^
  1227 |         "category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,origin (read-only),allowed_options,default_value,visible_when,display_order",
  1228 |       );
  1229 |       // ONLY the subtree: every data row's category_slug is parent or child.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1226:24
```

Context:

```text
          - listitem [ref=e393]:
            - generic [ref=e394]: About
          - listitem [ref=e395]:
            - generic [ref=e396]: How it works
      - navigation "Help" [ref=e397]:
        - heading "Help" [level=2] [ref=e398]
        - list [ref=e399]:
          - listitem [ref=e400]:
            - generic [ref=e401]: Safety
          - listitem [ref=e402]:
            - generic [ref=e403]: Contact
      - navigation "Legal" [ref=e404]:
        - heading "Legal" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: Terms
          - listitem [ref=e409]:
            - generic [ref=e410]: Privacy
    - paragraph [ref=e412]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-links.spec.ts › C3 attributes console › AT-62 an exported link's condition and order re-import as unchanged

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-62 the export did not echo the order: e2e-cat-cond-ln1udc,e2e-cat-cond-ln1udc,e2e_attr_927vfl,false,false,,e2e-cat-cond-ln1udc,,,e2e_attr_tjsvd7=pickup,7,

expect(received).toMatch(expected)

Expected pattern: /,7$/
Received string:  "e2e-cat-cond-ln1udc,e2e-cat-cond-ln1udc,e2e_attr_927vfl,false,false,,e2e-cat-cond-ln1udc,,,e2e_attr_tjsvd7=pickup,7,"
--- further error 1 ---
Error: AT-62 the export did not echo the order: e2e-cat-cond-ln1udc,e2e-cat-cond-ln1udc,e2e_attr_927vfl,false,false,,e2e-cat-cond-ln1udc,,,e2e_attr_tjsvd7=pickup,7,

expect(received).toMatch(expected)

Expected pattern: /,7$/
Received string:  "e2e-cat-cond-ln1udc,e2e-cat-cond-ln1udc,e2e_attr_927vfl,false,false,,e2e-cat-cond-ln1udc,,,e2e_attr_tjsvd7=pickup,7,"

  1097 |         `${parentKey}=pickup`,
  1098 |       );
> 1099 |       expect(childRow, `AT-62 the export did not echo the order: ${childRow}`).toMatch(/,7$/);
       |                                                                                ^
  1100 |
  1101 |       // AND THE ROUND TRIP IS A NO-OP (IE-2b).
  1102 |       const preview = await importPost(page, token, { mode: "preview", links });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-links.spec.ts:1099:80
```

Context:

```text
          - listitem [ref=e1241]:
            - generic [ref=e1242]: About
          - listitem [ref=e1243]:
            - generic [ref=e1244]: How it works
      - navigation "Help" [ref=e1245]:
        - heading "Help" [level=2] [ref=e1246]
        - list [ref=e1247]:
          - listitem [ref=e1248]:
            - generic [ref=e1249]: Safety
          - listitem [ref=e1250]:
            - generic [ref=e1251]: Contact
      - navigation "Legal" [ref=e1252]:
        - heading "Legal" [level=2] [ref=e1253]
        - list [ref=e1254]:
          - listitem [ref=e1255]:
            - generic [ref=e1256]: Terms
          - listitem [ref=e1257]:
            - generic [ref=e1258]: Privacy
    - paragraph [ref=e1260]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 7487 ms | category and specifications seeded @ 8575 ms | step 3 reached @ 11746 ms | specifications answered @ 12007 ms | step 6 open @ 17898 ms | tree served @ 18335 ms | place chosen @ 18606 ms | review open @ 23851 ms | review labels read @ 23883 ms

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_rcru8j_select"]')
Expected: "e2e_post_6_1_rcru8j_a label"
Error: strict mode violation: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_rcru8j_select"]') resolved to 2 elements:
    1) <li data-testid="listing-key-fact" data-key="e2e_post_6_1_rcru8j_select" class="rounded-md border border-border px-2 py-1 text-xs">…</li> aka getByTestId('listing-key-facts').getByText('e2e_post_6_1_rcru8j selecte2e_post_6_1_rcru8j_a label')
    2) <dd class="text-end text-foreground" data-testid="listing-detail-spec" data-key="e2e_post_6_1_rcru8j_select">e2e_post_6_1_rcru8j_a label</dd> aka getByTestId('listing-detail-specs').getByText('e2e_post_6_1_rcru8j_a label', { exact: true })

Call log:
  - PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 7487 ms | category and specifications seeded @ 8575 ms | step 3 reached @ 11746 ms | specifications answered @ 12007 ms | step 6 open @ 17898 ms | tree served @ 18335 ms | place chosen @ 18606 ms | review open @ 23851 ms | review labels read @ 23883 ms with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_rcru8j_select"]')

--- further error 1 ---
Error: PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 7487 ms | category and specifications seeded @ 8575 ms | step 3 reached @ 11746 ms | specifications answered @ 12007 ms | step 6 open @ 17898 ms | tree served @ 18335 ms | place chosen @ 18606 ms | review open @ 23851 ms | review labels read @ 23883 ms

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_rcru8j_select"]')
Expected: "e2e_post_6_1_rcru8j_a label"
Error: strict mode violation: getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_rcru8j_select"]') resolved to 2 elements:
    1) <li data-testid="listing-key-fact" data-key="e2e_post_6_1_rcru8j_select" class="rounded-md border border-border px-2 py-1 text-xs">…</li> aka getByTestId('listing-key-facts').getByText('e2e_post_6_1_rcru8j selecte2e_post_6_1_rcru8j_a label')
    2) <dd class="text-end text-foreground" data-testid="listing-detail-spec" data-key="e2e_post_6_1_rcru8j_select">e2e_post_6_1_rcru8j_a label</dd> aka getByTestId('listing-detail-specs').getByText('e2e_post_6_1_rcru8j_a label', { exact: true })

Call log:
  - PW-30: the buyer preview never rendered the select option's label
PW-30 step timings: signed in @ 7487 ms | category and specifications seeded @ 8575 ms | step 3 reached @ 11746 ms | specifications answered @ 12007 ms | step 6 open @ 17898 ms | tree served @ 18335 ms | place chosen @ 18606 ms | review open @ 23851 ms | review labels read @ 23883 ms with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-key="e2e_post_6_1_rcru8j_select"]')


  825 |       buyer.locator(`[data-key="${spec.select.attrKey}"]`),
  826 |       why("PW-30: the buyer preview never rendered the select option's label"),
> 827 |     ).toHaveText(`${spec.optionValues[0]} label`, { timeout: 20_000 });
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-desktop-1280` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-desktop-1280`; this run carried 12 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-3-xna4ef: e2e_par_nsdd72 → e2e_chi_grw660
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-3-8mjwtg: e2e_par_t99jsa → e2e_chi_s9jazo
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
