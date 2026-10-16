# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38824565343 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38824565343
- Commit: `9a8980ba54e6642bf1f4bcd7013f4c90b68fb7ea`
- Attempt: 1
- Written (UTC): 2026-10-16T00:15:15.790Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

110 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 10 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>dy<n>e: e<n>e_par_dtt<n>ug → e<n>e_chi_dl<n>xi<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-c<n>ae<n>o: e<n>e_par_xhcmpr → e<n>e_chi_fzx<n>zy` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>dy<n>e: e<n>e_par_dtt<n>ug → e<n>e_chi_dl<n>xi<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-c<n>ae<n>o: e<n>e_par_xhcmpr → e<n>e_chi_fzx<n>zy ×1

Off the allowlist:

### listing not found

- Count: 10 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-21 a child detail shows only the chosen parent's options and clears on change ×2 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PR-39 recent categories are caller-only published leaves in count/date/id order ×1 · PW-104 a unit settled by the type is held by the price page's unit ×1 · PW-17 the currency is preselected and searchable by name in one control ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-15T23:37:34.490Z | 16.6 min |
| email | 2026-10-15T23:37:43.065Z | 0.3 min |
| shard 1 | 2026-10-15T23:37:36.926Z | 37.3 min |
| shard 2 | 2026-10-15T23:37:28.617Z | 32.8 min |
| shard 3 | 2026-10-15T23:37:33.954Z | 34.2 min |
| shard 4 | 2026-10-15T23:37:23.652Z | 31.6 min |
| shard 5 | 2026-10-15T23:37:26.429Z | 37.4 min |
| shard 6 | 2026-10-15T23:37:25.001Z | 26.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 23.2 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 80 | 22.8 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 19.5 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 18.7 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.3 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 16.0 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.8 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 13.2 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 50 | 12.2 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.0 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 11.9 min | shard 3, shard 5 |
| `my-listings-ad.spec.ts` | 30 | 11.9 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 62 | 11.6 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 10.3 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 10.3 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 48 | 9.8 min | smoke, shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 8.8 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 8.2 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.1 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 30 | 8.0 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 7.9 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 7.9 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.4 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.1 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 6.9 min | shard 1, shard 5 |
| `import-security.spec.ts` | 36 | 6.7 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 6.6 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.6 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 6.0 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 5.9 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.9 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 5.8 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 5.3 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.6 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.5 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 2.0 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.0 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 3, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.1 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 60.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 60.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 55.9 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | mobile-360 | 51.9 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 51.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 51.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 51.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 50.3 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 48.6 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 47.7 s |
| `posting-routes-identity.spec.ts` › PR-26 the imitation check is rate-gated before the model is asked | desktop-1280 | 47.5 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 46.3 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 46.1 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | mobile-360 | 44.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 43.0 s |
