# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38997065337 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38997065337
- Commit: `de5197e7ef1845d58a88112356ae6015e42c119e`
- Attempt: 1
- Written (UTC): 2026-10-17T03:40:53.549Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

111 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 11 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-lf<n>j<n>t: e<n>e_par_thmyt<n> → e<n>e_chi_fp<n>bf` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-m<n>ahju: e<n>e_par_<n>ief<n>d → e<n>e_chi_wy<n>cfr` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-lf<n>j<n>t: e<n>e_par_thmyt<n> → e<n>e_chi_fp<n>bf ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-m<n>ahju: e<n>e_par_<n>ief<n>d → e<n>e_chi_wy<n>cfr ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-21 a child detail shows only the chosen parent's options and clears on change ×2 · PW-45 a declared swatch renders one ink, a two-tone and a pattern tile ×2 · /settings shows the Account context, and returning shows categories ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1 · PW-161 a number's unit reads in English, and in Amharic under Amharic ×1

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
| smoke | 2026-10-17T03:01:15.631Z | 15.8 min |
| email | 2026-10-17T03:01:23.504Z | 0.4 min |
| shard 1 | 2026-10-17T03:01:22.000Z | 39.2 min |
| shard 2 | 2026-10-17T03:01:13.686Z | 31.1 min |
| shard 3 | 2026-10-17T03:01:22.585Z | 35.9 min |
| shard 4 | 2026-10-17T03:01:13.180Z | 32.4 min |
| shard 5 | 2026-10-17T03:01:14.274Z | 32.0 min |
| shard 6 | 2026-10-17T03:01:14.157Z | 31.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 82 | 25.6 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 22.0 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 60 | 20.4 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 18.6 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 17.3 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 15.7 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 15.5 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.3 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 52 | 13.2 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.9 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 12.5 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 64 | 12.0 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 11.8 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 56 | 10.4 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.3 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 10.1 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.0 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.3 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 8.3 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.1 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.8 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.1 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 6.9 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 6.8 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 6.7 min | shard 1, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.6 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.4 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 6.0 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 5.8 min | shard 3, shard 6 |
| `import-security.spec.ts` | 36 | 5.8 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 5.4 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 4.2 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 3.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.4 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.1 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.0 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 3, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 1.9 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.8 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.5 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.2 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 50.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 50.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 49.4 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 48.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 48.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 46.3 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 46.0 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 44.5 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 44.1 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 43.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 42.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 42.1 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 41.2 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | mobile-360 | 40.1 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 40.1 s |
