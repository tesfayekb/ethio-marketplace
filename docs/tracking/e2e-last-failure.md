# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39131214447 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39131214447
- Commit: `afcd8cb29e89e54328c449c91c69d20e0eda4238`
- Attempt: 1
- Written (UTC): 2026-10-18T14:08:03.520Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

108 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>l<n>y<n>x: e<n>e_par_<n>ejfy<n> → e<n>e_chi_<n>c<n>h<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-nkomac: e<n>e_par_o<n>oye → e<n>e_chi_r<n>y<n>z` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>l<n>y<n>x: e<n>e_par_<n>ejfy<n> → e<n>e_chi_<n>c<n>h<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-nkomac: e<n>e_par_o<n>oye → e<n>e_chi_r<n>y<n>z ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-17 the currency is preselected and searchable by name in one control ×2 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1 · PW-161 a number's unit reads in English, and in Amharic under Amharic ×1 · PW-177 a question removed while the form is open never blocks the next edits ×1 · PW-20 where: the default place lists itself, is ticked, and a lone city box offe ×1

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
| smoke | 2026-10-18T13:23:08.229Z | 16.3 min |
| email | 2026-10-18T13:23:04.647Z | 0.2 min |
| shard 1 | 2026-10-18T13:23:13.019Z | 44.5 min |
| shard 2 | 2026-10-18T13:23:15.916Z | 40.4 min |
| shard 3 | 2026-10-18T13:23:10.073Z | 29.0 min |
| shard 4 | 2026-10-18T13:23:08.253Z | 41.9 min |
| shard 5 | 2026-10-18T13:23:05.686Z | 37.4 min |
| shard 6 | 2026-10-18T13:23:11.740Z | 37.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 66 | 25.2 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 66 | 23.5 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 23.0 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 18.9 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 17.9 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.2 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 16.0 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 13.9 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 13.1 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 12.8 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.2 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 66 | 12.2 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 12.2 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 11.4 min | shard 2, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 11.3 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 11.2 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 11.0 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 10.2 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 9.6 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.2 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.0 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 8.7 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 8.5 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.9 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 7.8 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 7.8 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.6 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.2 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 7.1 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 6.6 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 6.6 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.4 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.4 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.1 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.1 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.4 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.6 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 2.2 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.1 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.0 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.3 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.1 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
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
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 56.0 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 54.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 49.9 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 45.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 45.1 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 45.0 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 44.4 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 44.1 s |
| `post-wizard-place.spec.ts` › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan | desktop-1280 | 43.5 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 43.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 42.8 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | desktop-1280 | 42.6 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.5 s |
| `ad-page.spec.ts` › AP-32 similar ads: up to six of the same leaf and place, the ad itself never among them; none on a sold ad | mobile-360 | 40.2 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 40.0 s |
