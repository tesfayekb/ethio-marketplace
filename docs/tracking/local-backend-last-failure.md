# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39477384439 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39477384439
- Commit: `99e4e619758701da59bb6caaccc7acaddaf95548`
- Attempt: 1
- Written (UTC): 2026-10-20T19:14:37.290Z
- Post-test warnings: 39
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (13 of 13 results files read, 13 of 13 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

115 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 16 | shard 1, shard 3, shard 7, shard 9 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `listing not found` | 6 | shard 5, shard 6, shard 11 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 5 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 3, shard 8, shard 9 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 3, shard 8, shard 9 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 7, shard 9 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 7, shard 9 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 7 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 7, shard 8 |
| `categories file too large` (quiet) | 2 | shard 3, shard 9 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 9 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 8 |
| `countries badHeader` (quiet) | 2 | shard 3, shard 9 |
| `countries nulByte` (quiet) | 2 | shard 3, shard 9 |
| `countries tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `countries unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `countries wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `definitions nulByte` (quiet) | 2 | shard 3, shard 9 |
| `definitions tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `definitions unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `links unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `locations badHeader` (quiet) | 2 | shard 3, shard 9 |
| `locations file too large` (quiet) | 2 | shard 3, shard 9 |
| `locations nulByte` (quiet) | 2 | shard 3, shard 9 |
| `locations unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `locations wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `new row for relation <q> violates check constraint <q>` | 2 | shard 5, shard 11 |
| `strings badHeader` (quiet) | 2 | shard 3, shard 9 |
| `strings emptyFile` (quiet) | 2 | shard 3, shard 9 |
| `strings nulByte` (quiet) | 2 | shard 3, shard 9 |
| `strings tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `strings unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `strings wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>kdbuj: e<n>e_par_xywzff → e<n>e_chi_cddjjf` (quiet) | 1 | shard 7 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>vrrdl: e<n>e_par_mix<n>gr → e<n>e_chi_lqpxc<n>` (quiet) | 1 | shard 1 |

Quiet (allowlisted): too many previews ×16 · digest mismatch ×12 · category-images: no GEMINI_API_KEY — fake mode ×5 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>kdbuj: e<n>e_par_xywzff → e<n>e_chi_cddjjf ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>vrrdl: e<n>e_par_mix<n>gr → e<n>e_chi_lqpxc<n> ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 5, shard 6, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-5 the specification form is generated, its options load on the first tap, and ×2 · PW-50 the specifications show every row open in display order (D41) ×2

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### new row for relation <q> violates check constraint <q>

- Count: 2 · Sources: shard 5, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-61 a category change resets details, title, description and price, and Undo w ×2 · PW-73 the door's currency fill is mirrored, so Undo restores a complete price (I ×2

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-20T18:47:46.252Z | 12.1 min |
| shard 1 | 2026-10-20T18:47:05.249Z | 27.0 min |
| shard 2 | 2026-10-20T18:47:43.215Z | 26.4 min |
| shard 3 | 2026-10-20T18:46:47.553Z | 13.0 min |
| shard 4 | 2026-10-20T18:47:26.843Z | 16.8 min |
| shard 5 | 2026-10-20T18:47:03.295Z | 11.2 min |
| shard 6 | 2026-10-20T18:47:19.418Z | 8.4 min |
| shard 7 | 2026-10-20T18:47:04.630Z | 24.8 min |
| shard 8 | 2026-10-20T18:47:09.697Z | 24.6 min |
| shard 9 | 2026-10-20T18:46:58.887Z | 14.2 min |
| shard 10 | 2026-10-20T18:47:07.348Z | 17.5 min |
| shard 11 | 2026-10-20T18:46:52.162Z | 10.9 min |
| shard 12 | 2026-10-20T18:47:41.456Z | 6.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 18.2 min | smoke, shard 6, shard 12 |
| `ad-page.spec.ts` | 68 | 16.8 min | shard 1, shard 7 |
| `admin-listings.spec.ts` | 62 | 15.3 min | shard 2, shard 8 |
| `admin-screening.spec.ts` | 52 | 13.9 min | shard 2, shard 8 |
| `feed-screens.spec.ts` | 36 | 12.8 min | shard 3, shard 9 |
| `my-listings-ad.spec.ts` | 36 | 10.9 min | shard 4, shard 10 |
| `ad-page-doors.spec.ts` | 30 | 7.6 min | shard 1, shard 7 |
| `my-listings-page.spec.ts` | 16 | 5.8 min | shard 4, shard 10 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.7 min | shard 4, shard 10 |
| `admin-attributes-library.spec.ts` | 42 | 5.7 min | shard 1, shard 7 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 2, shard 8 |
| `admin-translations-console.spec.ts` | 44 | 4.4 min | shard 2, shard 8 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 1, shard 7 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 5, shard 11 |
| `admin-roles.spec.ts` | 26 | 4.2 min | shard 2, shard 8 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 1, shard 7 |
| `post-wizard-place.spec.ts` | 38 | 4.1 min | shard 5, shard 11 |
| `auth-signout.spec.ts` | 56 | 4.1 min | smoke, shard 3, shard 9 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 6, shard 12 |
| `photo-pipeline.spec.ts` | 66 | 3.6 min | shard 4, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 5, shard 11 |
| `admin-users.spec.ts` | 28 | 3.5 min | shard 3, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 1, shard 8 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 1, shard 7 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 5, shard 11 |
| `post-wizard-category.spec.ts` | 48 | 2.7 min | shard 4, shard 10 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 1, shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 5, shard 11 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 6, shard 11 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 2.2 min | shard 1, shard 7 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 2, shard 9 |
| `import-security.spec.ts` | 36 | 1.8 min | shard 3, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 1, shard 8 |
| `admin-translations-data.spec.ts` | 8 | 1.6 min | shard 2, shard 9 |
| `mfa-stepup.spec.ts` | 18 | 1.5 min | shard 4, shard 10 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 1, shard 7 |
| `breadcrumbs.spec.ts` | 6 | 1.1 min | shard 3, shard 9 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 10 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 4, shard 10 |
| `legal-certify.spec.ts` | 26 | 1.0 min | shard 3, shard 9 |
| `legal-admin.spec.ts` | 28 | 0.9 min | shard 3, shard 9 |
| `admin-shell.spec.ts` | 12 | 0.8 min | shard 2, shard 8 |
| `legal-doors.spec.ts` | 32 | 0.7 min | shard 4, shard 10 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 5, shard 11 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 3, shard 9 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 5, shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 4, shard 10 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 5, shard 11 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 1, shard 8 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 5, shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 5, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 6, shard 12 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 8 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 6, shard 12 |
| `legal-accept.spec.ts` | 8 | 0.3 min | shard 3, shard 9 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 5, shard 11 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 3, shard 9 |
| `settings.spec.ts` | 4 | 0.2 min | shard 6 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 3, shard 9 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 10 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 7 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 5, shard 11 |
| `layout.spec.ts` | 10 | 0.2 min | shard 3, shard 9 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 9 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 9 |
| `legal-pages.spec.ts` | 6 | 0.2 min | shard 4, shard 10 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 6, shard 12 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 3, shard 9 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 5, shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6, shard 12 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 9 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 45.0 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 35.9 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 34.4 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | desktop-1280 | 34.1 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 33.4 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 33.0 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 32.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.5 s |
| `ad-page.spec.ts` › AP-32 similar ads: up to six of the same leaf and place, the ad itself never among them; none on a sold ad | desktop-1280 | 32.5 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 32.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `ad-page.spec.ts` › AP-32 similar ads: up to six of the same leaf and place, the ad itself never among them; none on a sold ad | mobile-360 | 32.2 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 32.1 s |
| `feed-screens.spec.ts` › FS-13 each wider place is headed in its own name: the region, then the country (D127) | mobile-360 | 31.7 s |
