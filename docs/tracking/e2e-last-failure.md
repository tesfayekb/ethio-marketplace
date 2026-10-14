# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38590378235 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38590378235
- Commit: `cf750bc6b4478ce8a4c6ca3c61771803481feff9`
- Attempt: 1
- Written (UTC): 2026-10-14T16:10:45.892Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

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
| `<html>` | 1 | shard 6 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>dn<n>gi: e<n>e_par_iu<n>qoc → e<n>e_chi_qiy<n>bd` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-xijcis: e<n>e_par_gg<n>d → e<n>e_chi_<n>uw<n>a` (quiet) | 1 | shard 4 |
| `undefined` | 1 | shard 6 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>dn<n>gi: e<n>e_par_iu<n>qoc → e<n>e_chi_qiy<n>bd ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-xijcis: e<n>e_par_gg<n>d → e<n>e_chi_<n>uw<n>a ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): breadcrumb segments navigate the category path ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PR-27 edit_listing counts against the revise dial ×1 · PR-29 renew_listing counts against the revise dial ×1 · PW-104 a unit settled by the type is held by the price page's unit ×1 · PW-17 the currency is preselected and searchable by name in one control ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### <html>

- Count: 1 · Sources: shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-42 the door reads a padded answer as the value it stores ×1 · PW-45 a declared swatch renders one ink, a two-tone and a pattern tile ×1

```text
[WebServer] [ssr-error] /api/i18n <html>
```

### undefined

- Count: 1 · Sources: shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-42 the door reads a padded answer as the value it stores ×1 · PW-45 a declared swatch renders one ink, a two-tone and a pattern tile ×1

```text
[WebServer] [ssr-error] /api/categories/tree undefined
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-14T15:35:22.694Z | 15.3 min |
| email | 2026-10-14T15:34:48.874Z | 0.2 min |
| shard 1 | 2026-10-14T15:34:57.870Z | 35.1 min |
| shard 2 | 2026-10-14T15:34:53.987Z | 35.4 min |
| shard 3 | 2026-10-14T15:34:48.216Z | 27.2 min |
| shard 4 | 2026-10-14T15:35:32.562Z | 34.5 min |
| shard 5 | 2026-10-14T15:34:49.669Z | 32.0 min |
| shard 6 | 2026-10-14T15:35:00.834Z | 30.8 min |
| changed | 2026-10-14T15:34:47.847Z | 24.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 112 | 40.9 min | shard 1, shard 4, changed |
| `admin-screening.spec.ts` | 88 | 27.9 min | shard 1, shard 4, changed |
| `photo-pipeline.spec.ts` | 62 | 25.7 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 80 | 25.2 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 21.5 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 19.6 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 16.7 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 15.8 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 13.1 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 12.1 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.9 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 52 | 10.4 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 10.2 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 28 | 9.9 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 9.4 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.4 min | smoke, shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 9.2 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 9.1 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.9 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 26 | 8.8 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.4 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 36 | 7.9 min | shard 1, shard 4, changed |
| `admin-locations.spec.ts` | 38 | 7.7 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.4 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.1 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.9 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 16 | 6.3 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.2 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 5.8 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 36 | 5.4 min | shard 2, shard 5, changed |
| `admin-audit.spec.ts` | 14 | 4.5 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.3 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 10 | 3.6 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.0 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.5 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.1 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 1.8 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 1.8 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.6 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.1 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 62.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 61.6 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 58.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 58.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 58.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 57.2 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 54.9 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 48.5 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | desktop-1280 | 47.0 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 46.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 46.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 46.4 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | mobile-360 | 44.6 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | desktop-1280 | 44.3 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 43.5 s |
