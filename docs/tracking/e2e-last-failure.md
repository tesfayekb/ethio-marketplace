# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 40981493608 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40981493608
- Commit: `f66ca04cd6883aa73944dd4b7b8ae651802b387d`
- Attempt: 1
- Written (UTC): 2026-10-30T01:02:42.953Z
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
| smoke | 2026-10-30T00:48:56.273Z | 13.0 min |
| email | 2026-10-30T00:46:57.844Z | 0.4 min |
| shard 1 | 2026-10-30T00:47:07.876Z | 8.7 min |
| shard 2 | 2026-10-30T00:46:00.157Z | 13.3 min |
| shard 3 | 2026-10-30T00:46:38.024Z | 12.0 min |
| shard 4 | 2026-10-30T00:46:33.036Z | 8.3 min |
| shard 5 | 2026-10-30T00:48:16.438Z | 7.2 min |
| shard 6 | 2026-10-30T00:46:24.648Z | 10.4 min |
| shard 7 | 2026-10-30T00:46:20.254Z | 6.3 min |
| shard 8 | 2026-10-30T00:47:03.209Z | 8.3 min |
| shard 9 | 2026-10-30T00:46:26.591Z | 10.0 min |
| shard 10 | 2026-10-30T00:46:25.824Z | 13.7 min |
| shard 11 | 2026-10-30T00:46:27.508Z | 12.6 min |
| shard 12 | 2026-10-30T00:46:29.761Z | 8.2 min |
| shard 13 | 2026-10-30T00:46:41.870Z | 7.1 min |
| shard 14 | 2026-10-30T00:47:04.158Z | 8.0 min |
| shard 15 | 2026-10-30T00:50:25.946Z | 7.1 min |
| shard 16 | 2026-10-30T00:46:42.553Z | 7.2 min |
| repeat | 2026-10-30T00:46:41.628Z | 8.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 436 | 19.0 min | smoke, shard 8, shard 16 |
| `auth-signout.spec.ts` | 68 | 6.3 min | smoke, shard 3, shard 11 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 5.0 min | shard 4, shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 4.9 min | shard 7, shard 15 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.9 min | shard 6, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 2, shard 10 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-translations-console.spec.ts` | 44 | 4.5 min | shard 3, shard 11 |
| `admin-audit.spec.ts` | 42 | 4.4 min | shard 2, shard 10, repeat |
| `admin-screening.spec.ts` | 52 | 4.3 min | shard 3, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.2 min | shard 2, shard 10 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 1, shard 9 |
| `admin-roles.spec.ts` | 26 | 4.0 min | shard 2, shard 11 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `post-wizard-place.spec.ts` | 38 | 4.0 min | shard 6, shard 14 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 3, shard 11 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 7, shard 15 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 2, shard 10 |
| `photo-pipeline.spec.ts` | 68 | 3.5 min | shard 5, shard 13 |
| `admin-listings.spec.ts` | 62 | 3.4 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 36 | 3.3 min | shard 5, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 78 | 3.2 min | shard 1, shard 9 |
| `name-check-queue.spec.ts` | 24 | 3.0 min | shard 5, shard 13, repeat |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.6 min | shard 7, shard 15 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 2, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 6, shard 14 |
| `post-wizard-category.spec.ts` | 48 | 2.3 min | shard 6, shard 14 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 1, shard 9 |
| `legal-certify.spec.ts` | 42 | 1.6 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 90 | 1.5 min | shard 1, shard 9, repeat |
| `mfa-stepup.spec.ts` | 18 | 1.4 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 3, shard 11 |
| `legal-pages.spec.ts` | 30 | 0.8 min | shard 5, shard 13, repeat |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 10 |
| `my-listings-page.spec.ts` | 16 | 0.7 min | shard 5, shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 18 | 0.7 min | shard 5, shard 13, repeat |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 5, shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 7, shard 15 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `account-saved.spec.ts` | 12 | 0.5 min | shard 1, shard 9, repeat |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 7, shard 15 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `admin-ai-calls.spec.ts` | 6 | 0.2 min | shard 1, shard 9, repeat |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 11 |
| `ad-page-layout.spec.ts` | 6 | 0.2 min | shard 1, shard 9, repeat |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 8, shard 16 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 46.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.5 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.6 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 36.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 33.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.7 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.8 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.0 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.8 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |
