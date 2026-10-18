# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39138994536 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39138994536
- Commit: `406f1aa5f585b9d419b0f9b051b704fd0447e3e0`
- Attempt: 1
- Written (UTC): 2026-10-18T16:29:44.769Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

116 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 16 | shard 3, shard 6, changed |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-p<n>uw<n>c: e<n>e_par_luseb<n> → e<n>e_chi_cnsvy<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-r<n>p<n>k<n>: e<n>e_par_drd<n>dh → e<n>e_chi_q<n>u<n>hg` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-p<n>uw<n>c: e<n>e_par_luseb<n> → e<n>e_chi_cnsvy<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-r<n>p<n>k<n>: e<n>e_par_drd<n>dh → e<n>e_chi_q<n>u<n>hg ×1

Off the allowlist:

### listing not found

- Count: 16 · Sources: shard 3, shard 6, changed
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×5 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-13 review: the preview shows what was answered, and Publish lands in review — ×2 · PW-21 a child detail shows only the chosen parent's options and clears on change ×2 · PW-33 a region alone never lists itself; its city does (W6 R2) ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-18T15:41:31.588Z | 17.6 min |
| email | 2026-10-18T15:41:30.408Z | 0.3 min |
| shard 1 | 2026-10-18T15:41:35.164Z | 45.4 min |
| shard 2 | 2026-10-18T15:41:33.812Z | 45.0 min |
| shard 3 | 2026-10-18T15:41:31.374Z | 38.8 min |
| shard 4 | 2026-10-18T15:41:38.685Z | 47.7 min |
| shard 5 | 2026-10-18T15:41:29.141Z | 39.4 min |
| shard 6 | 2026-10-18T15:41:24.162Z | 33.4 min |
| changed | 2026-10-18T15:41:37.658Z | 10.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `posting-routes.spec.ts` | 152 | 37.5 min | shard 3, shard 6, changed |
| `ad-page.spec.ts` | 66 | 29.3 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 66 | 25.6 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 24.7 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 19.9 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 18.3 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 18.1 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.7 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 16.1 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.4 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 13.8 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 13.7 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 13.5 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 12.8 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 12.0 min | smoke, shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 11.6 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 11.0 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 10.9 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 10.0 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 9.8 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.7 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 9.7 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 9.3 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.6 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 8.6 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.5 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.4 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.7 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 7.4 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.1 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 6.9 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.7 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.6 min | shard 3, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 6.1 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.2 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.3 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.9 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.7 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.3 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 2.3 min | shard 1, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 2.1 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.7 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 1.0 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.9 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.8 min | shard 1, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 76.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 74.0 s |
| `my-listings-page.spec.ts` › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) | mobile-360 | 73.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 53.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 52.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 48.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 48.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-37 undoing a category delete restores its attribute links or names the skipped ones | mobile-360 | 47.5 s |
| `ad-page.spec.ts` › AP-32 similar ads: up to six of the same leaf and place, the ad itself never among them; none on a sold ad | mobile-360 | 46.5 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 46.4 s |
| `ad-page.spec.ts` › AP-40 an address never reveals: only the visitor's own tap does (D201 §14) | desktop-1280 | 46.2 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 46.1 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 45.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 45.2 s |
| `photo-pipeline.spec.ts` › PP-6 another seller's listing is a 403 | mobile-360 | 45.1 s |
