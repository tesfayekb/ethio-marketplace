# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 40008732750 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40008732750
- Commit: `65dec9e689a913f149bef38192de204f586c75b5`
- Attempt: 1
- Written (UTC): 2026-10-23T19:33:34.518Z
- Post-test warnings: 54
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

106 line(s), 36 message(s): 2 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 15 | shard 1, shard 4, shard 9, shard 12 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 9, shard 10, shard 12 |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 9 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 2, shard 9, shard 10 |
| `listing not found` | 3 | shard 6, shard 7, shard 15 |
| `categories file too large` (quiet) | 2 | shard 4, shard 12 |
| `categories nulByte` (quiet) | 2 | shard 4, shard 12 |
| `categories unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 2, shard 10 |
| `countries badHeader` (quiet) | 2 | shard 4, shard 12 |
| `countries nulByte` (quiet) | 2 | shard 4, shard 12 |
| `countries tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `countries unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `countries wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `definitions nulByte` (quiet) | 2 | shard 4, shard 12 |
| `definitions tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `definitions unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `links unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations badHeader` (quiet) | 2 | shard 4, shard 12 |
| `locations file too large` (quiet) | 2 | shard 4, shard 12 |
| `locations nulByte` (quiet) | 2 | shard 4, shard 12 |
| `locations unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `new row for relation <q> violates check constraint <q>` | 2 | shard 6, shard 14 |
| `strings badHeader` (quiet) | 2 | shard 4, shard 12 |
| `strings emptyFile` (quiet) | 2 | shard 4, shard 12 |
| `strings nulByte` (quiet) | 2 | shard 4, shard 12 |
| `strings tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `strings unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `strings wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-fef<n>kc: e<n>e_par_to<n>ylp → e<n>e_chi_p<n>n<n>ka` (quiet) | 1 | shard 10 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-fos<n>b<n>: e<n>e_par_ari<n>od → e<n>e_chi_o<n>efjr` (quiet) | 1 | shard 1 |

Quiet (allowlisted): too many previews ×15 · digest mismatch ×12 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-fef<n>kc: e<n>e_par_to<n>ylp → e<n>e_chi_p<n>n<n>ka ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-fos<n>b<n>: e<n>e_par_ari<n>od → e<n>e_chi_o<n>efjr ×1

Off the allowlist:

### listing not found

- Count: 3 · Sources: shard 6, shard 7, shard 15
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### new row for relation <q> violates check constraint <q>

- Count: 2 · Sources: shard 6, shard 14
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-61 a category change resets details, title, description and price, and Undo w ×2 · PW-73 the door's currency fill is mirrored, so Undo restores a complete price (I ×2

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-23T19:09:14.420Z | 12.0 min |
| email | 2026-10-23T19:09:08.820Z | 0.4 min |
| shard 1 | 2026-10-23T19:11:08.586Z | 11.0 min |
| shard 2 | 2026-10-23T19:10:42.390Z | 11.9 min |
| shard 3 | 2026-10-23T19:20:14.873Z | 12.8 min |
| shard 4 | 2026-10-23T19:10:57.318Z | 6.9 min |
| shard 5 | 2026-10-23T19:09:00.377Z | 6.6 min |
| shard 6 | 2026-10-23T19:09:39.315Z | 8.5 min |
| shard 7 | 2026-10-23T19:09:11.281Z | 6.9 min |
| shard 8 | 2026-10-23T19:21:20.465Z | 7.3 min |
| shard 9 | 2026-10-23T19:10:13.233Z | 10.1 min |
| shard 10 | 2026-10-23T19:09:04.305Z | 11.2 min |
| shard 11 | 2026-10-23T19:09:11.847Z | 12.7 min |
| shard 12 | 2026-10-23T19:18:43.959Z | 5.9 min |
| shard 13 | 2026-10-23T19:08:58.438Z | 7.2 min |
| shard 14 | 2026-10-23T19:09:00.609Z | 10.5 min |
| shard 15 | 2026-10-23T19:09:05.762Z | 7.1 min |
| shard 16 | 2026-10-23T19:14:01.727Z | 6.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 18.2 min | smoke, shard 8, shard 16 |
| `admin-attributes-library.spec.ts` | 42 | 5.9 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.2 min | shard 6, shard 14 |
| `post-wizard-specs.spec.ts` | 82 | 5.2 min | shard 7, shard 15 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-translations-console.spec.ts` | 44 | 4.5 min | shard 3, shard 11 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 26 | 4.3 min | shard 3, shard 11 |
| `auth-signout.spec.ts` | 56 | 4.3 min | smoke, shard 3, shard 11 |
| `admin-screening.spec.ts` | 52 | 4.2 min | shard 3, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.2 min | shard 1, shard 9 |
| `post-wizard-place.spec.ts` | 38 | 4.1 min | shard 6, shard 14 |
| `admin-categories-console.spec.ts` | 34 | 4.0 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 4.0 min | shard 7, shard 15 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 3, shard 11 |
| `photo-pipeline.spec.ts` | 68 | 3.8 min | shard 5, shard 13 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 5, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 1, shard 9 |
| `admin-listings.spec.ts` | 62 | 3.3 min | shard 2, shard 10 |
| `ad-page.spec.ts` | 68 | 3.1 min | shard 1, shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.7 min | shard 7, shard 15 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 10 |
| `post-wizard-category.spec.ts` | 48 | 2.4 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 6, shard 14 |
| `admin-attributes-import.spec.ts` | 40 | 2.2 min | shard 1, shard 9 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `import-security.spec.ts` | 36 | 2.1 min | shard 4, shard 12 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.8 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 2, shard 10 |
| `mfa-stepup.spec.ts` | 18 | 1.6 min | shard 5, shard 13 |
| `legal-certify.spec.ts` | 42 | 1.5 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.3 min | shard 2, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 3, shard 11 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 7, shard 15 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 7, shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 8, shard 15 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 4, shard 11 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `settings.spec.ts` | 4 | 0.2 min | shard 8 |
| `legal-pages.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 30.9 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 30.8 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.3 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 27.5 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 26.1 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 25.8 s |
