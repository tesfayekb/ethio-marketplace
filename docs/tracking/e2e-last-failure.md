# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 41020162680 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41020162680
- Commit: `8aead74ba13126b1a2b58759ab8303b4f4e60243`
- Attempt: 1
- Written (UTC): 2026-10-30T07:45:01.365Z
- Post-test warnings: 57
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `categories file too large` (quiet) | 2 | shard 4, shard 12 |
| `categories nulByte` (quiet) | 2 | shard 4, shard 12 |
| `categories unknownColumn` (quiet) | 2 | shard 4, shard 12 |
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
| `strings badHeader` (quiet) | 2 | shard 4, shard 12 |
| `strings emptyFile` (quiet) | 2 | shard 4, shard 12 |
| `strings nulByte` (quiet) | 2 | shard 4, shard 12 |
| `strings tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `strings unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `strings wrongFile` (quiet) | 2 | shard 4, shard 12 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-30T07:29:41.002Z | 12.1 min |
| email | 2026-10-30T07:30:56.176Z | 0.4 min |
| shard 1 | 2026-10-30T07:29:49.126Z | 10.9 min |
| shard 2 | 2026-10-30T07:29:44.879Z | 14.0 min |
| shard 3 | 2026-10-30T07:29:57.103Z | 12.4 min |
| shard 4 | 2026-10-30T07:29:38.165Z | 8.3 min |
| shard 5 | 2026-10-30T07:29:54.100Z | 7.3 min |
| shard 6 | 2026-10-30T07:29:47.179Z | 12.8 min |
| shard 7 | 2026-10-30T07:30:15.434Z | 4.6 min |
| shard 8 | 2026-10-30T07:29:45.701Z | 7.7 min |
| shard 9 | 2026-10-30T07:30:21.904Z | 8.7 min |
| shard 10 | 2026-10-30T07:30:21.384Z | 13.8 min |
| shard 11 | 2026-10-30T07:29:40.949Z | 13.9 min |
| shard 12 | 2026-10-30T07:30:15.626Z | 7.6 min |
| shard 13 | 2026-10-30T07:29:57.807Z | 9.8 min |
| shard 14 | 2026-10-30T07:29:54.812Z | 10.6 min |
| shard 15 | 2026-10-30T07:31:53.942Z | 9.2 min |
| shard 16 | 2026-10-30T07:29:43.730Z | 2.8 min |
| repeat | 2026-10-30T07:29:52.953Z | 5.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 444 | 18.4 min | smoke, shard 8, shard 15 |
| `auth-signout.spec.ts` | 68 | 6.2 min | smoke, shard 3, shard 11 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 5.4 min | shard 4, shard 12 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 6, shard 13 |
| `post-wizard-specs.spec.ts` | 82 | 5.0 min | shard 6, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.7 min | shard 3, shard 11 |
| `admin-screening.spec.ts` | 52 | 4.6 min | shard 3, shard 11 |
| `feed-screens.spec.ts` | 36 | 4.5 min | shard 4, shard 12 |
| `admin-categories-console.spec.ts` | 34 | 4.5 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.4 min | shard 6, shard 14 |
| `admin-roles.spec.ts` | 26 | 4.3 min | shard 2, shard 11 |
| `admin-audit.spec.ts` | 42 | 4.1 min | shard 2, shard 10, repeat |
| `admin-users.spec.ts` | 28 | 4.0 min | shard 3, shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.0 min | shard 2, shard 10 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 1, shard 9 |
| `admin-listings.spec.ts` | 62 | 3.8 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 7, shard 15 |
| `photo-pipeline.spec.ts` | 68 | 3.6 min | shard 5, shard 13 |
| `post-wizard-pricing.spec.ts` | 52 | 3.4 min | shard 6, shard 14 |
| `my-listings-ad.spec.ts` | 36 | 3.3 min | shard 5, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 78 | 2.9 min | shard 1, shard 9 |
| `post-wizard-category.spec.ts` | 48 | 2.8 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.7 min | shard 7, shard 15 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 1, shard 10 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `legal-admin.spec.ts` | 42 | 1.6 min | shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 1, shard 9 |
| `mfa-stepup.spec.ts` | 18 | 1.4 min | shard 5, shard 13 |
| `legal-certify.spec.ts` | 42 | 1.4 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 90 | 1.3 min | shard 1, shard 9, repeat |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 3, shard 11 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 10 |
| `breadcrumbs.spec.ts` | 18 | 0.8 min | shard 3, shard 11, repeat |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 5, shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 4, shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 7, shard 15 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 7, shard 15 |
| `account-saved.spec.ts` | 12 | 0.5 min | shard 1, shard 9, repeat |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `submenu.spec.ts` | 30 | 0.5 min | shard 8, shard 16, repeat |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `auth-signup.spec.ts` | 6 | 0.4 min | email |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `submenu-touch.spec.ts` | 18 | 0.2 min | shard 9, shard 16, repeat |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 6, shard 14 |
| `ad-page-layout.spec.ts` | 6 | 0.2 min | shard 1, shard 9, repeat |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `menu-rows.spec.ts` | 12 | 0.1 min | shard 9, shard 16, repeat |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 15 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 9, shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.8 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.9 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 33.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 32.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.5 s |
