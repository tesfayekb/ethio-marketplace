# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 40809236156 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40809236156
- Commit: `c7bb093ae4d52fe53b186c0244c285c17ab791e0`
- Attempt: 1
- Written (UTC): 2026-10-29T03:25:33.895Z
- Post-test warnings: 54
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): repeat (2)

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 840s for the test suite to run
(no place given)
```

```text
Timed out waiting 840s for the teardown for test suite to run
(no place given)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

212 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 10 | shard 2, shard 4, shard 10, shard 12, repeat |
| `categories wrongFile` (quiet) | 10 | shard 2, shard 4, shard 10, shard 12, repeat |
| `definitions badHeader` (quiet) | 10 | shard 1, shard 4, shard 9, shard 12, repeat |
| `definitions wrongFile` (quiet) | 10 | shard 1, shard 4, shard 9, shard 12, repeat |
| `categories file too large` (quiet) | 8 | shard 4, shard 12, repeat |
| `categories nulByte` (quiet) | 8 | shard 4, shard 12, repeat |
| `categories unknownColumn` (quiet) | 8 | shard 4, shard 12, repeat |
| `definitions nulByte` (quiet) | 8 | shard 4, shard 12, repeat |
| `definitions tooManyRows` (quiet) | 8 | shard 4, shard 12, repeat |
| `definitions unknownColumn` (quiet) | 8 | shard 4, shard 12, repeat |
| `strings badHeader` (quiet) | 8 | shard 4, shard 12, repeat |
| `strings nulByte` (quiet) | 8 | shard 4, shard 12, repeat |
| `strings tooManyRows` (quiet) | 8 | shard 4, shard 12, repeat |
| `strings unknownColumn` (quiet) | 8 | shard 4, shard 12, repeat |
| `strings wrongFile` (quiet) | 8 | shard 4, shard 12, repeat |
| `countries badHeader` (quiet) | 7 | shard 4, shard 12, repeat |
| `countries nulByte` (quiet) | 7 | shard 4, shard 12, repeat |
| `countries tooManyRows` (quiet) | 7 | shard 4, shard 12, repeat |
| `countries unknownColumn` (quiet) | 7 | shard 4, shard 12, repeat |
| `countries wrongFile` (quiet) | 7 | shard 4, shard 12, repeat |
| `links unknownColumn` (quiet) | 7 | shard 4, shard 12, repeat |
| `locations badHeader` (quiet) | 7 | shard 4, shard 12, repeat |
| `locations file too large` (quiet) | 7 | shard 4, shard 12, repeat |
| `locations nulByte` (quiet) | 7 | shard 4, shard 12, repeat |
| `locations unknownColumn` (quiet) | 7 | shard 4, shard 12, repeat |
| `locations wrongFile` (quiet) | 7 | shard 4, shard 12, repeat |
| `strings emptyFile` (quiet) | 7 | shard 4, shard 12, repeat |

Quiet (allowlisted): categories badHeader ×10 · categories wrongFile ×10 · definitions badHeader ×10 · definitions wrongFile ×10 · categories file too large ×8 · categories nulByte ×8 · categories unknownColumn ×8 · definitions nulByte ×8 · definitions tooManyRows ×8 · definitions unknownColumn ×8 · strings badHeader ×8 · strings nulByte ×8 · strings tooManyRows ×8 · strings unknownColumn ×8 · strings wrongFile ×8 · countries badHeader ×7 · countries nulByte ×7 · countries tooManyRows ×7 · countries unknownColumn ×7 · countries wrongFile ×7 · links unknownColumn ×7 · locations badHeader ×7 · locations file too large ×7 · locations nulByte ×7 · locations unknownColumn ×7 · locations wrongFile ×7 · strings emptyFile ×7

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-29T03:09:17.480Z | 12.4 min |
| email | 2026-10-29T03:09:15.256Z | 0.3 min |
| shard 1 | 2026-10-29T03:09:17.432Z | 9.8 min |
| shard 2 | 2026-10-29T03:08:32.371Z | 13.2 min |
| shard 3 | 2026-10-29T03:09:19.950Z | 10.0 min |
| shard 4 | 2026-10-29T03:08:55.343Z | 8.0 min |
| shard 5 | 2026-10-29T03:10:27.410Z | 6.8 min |
| shard 6 | 2026-10-29T03:10:11.918Z | 10.5 min |
| shard 7 | 2026-10-29T03:09:07.372Z | 6.0 min |
| shard 8 | 2026-10-29T03:11:57.410Z | 8.1 min |
| shard 9 | 2026-10-29T03:09:25.983Z | 10.1 min |
| shard 10 | 2026-10-29T03:11:54.091Z | 13.2 min |
| shard 11 | 2026-10-29T03:09:16.612Z | 14.1 min |
| shard 12 | 2026-10-29T03:09:15.121Z | 8.3 min |
| shard 13 | 2026-10-29T03:09:37.071Z | 7.5 min |
| shard 14 | 2026-10-29T03:09:16.275Z | 10.6 min |
| shard 15 | 2026-10-29T03:09:10.679Z | 6.6 min |
| shard 16 | 2026-10-29T03:09:19.384Z | 6.6 min |
| repeat | 2026-10-29T03:09:48.016Z | 14.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `import-security.spec.ts` | 180 | 18.6 min | shard 4, shard 12, repeat |
| `shell.spec.ts` | 436 | 18.2 min | smoke, shard 8, shard 16 |
| `auth-signout.spec.ts` | 68 | 6.1 min | smoke, shard 3, shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.9 min | shard 6, shard 14 |
| `admin-attributes-library.spec.ts` | 42 | 5.8 min | shard 1, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.7 min | shard 7, shard 15 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.4 min | shard 6, shard 14 |
| `admin-translations-console.spec.ts` | 44 | 4.4 min | shard 3, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.3 min | shard 1, shard 9 |
| `admin-roles.spec.ts` | 26 | 4.2 min | shard 2, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.1 min | shard 2, shard 10 |
| `admin-screening.spec.ts` | 52 | 4.1 min | shard 3, shard 11 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `photo-pipeline.spec.ts` | 68 | 3.9 min | shard 5, shard 13 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 3, shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 7, shard 15 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 1, shard 9 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 5, shard 13 |
| `post-wizard-pricing.spec.ts` | 52 | 3.3 min | shard 6, shard 14 |
| `ad-page.spec.ts` | 78 | 3.2 min | shard 1, shard 9 |
| `admin-listings.spec.ts` | 62 | 3.2 min | shard 2, shard 10 |
| `post-wizard-category.spec.ts` | 48 | 2.7 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.6 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 2, shard 10 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 7, shard 15 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.9 min | shard 1, shard 9 |
| `legal-admin.spec.ts` | 42 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 2, shard 10 |
| `legal-certify.spec.ts` | 42 | 1.6 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 18 | 1.6 min | shard 5, shard 13 |
| `admin-audit.spec.ts` | 14 | 1.3 min | shard 2, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 3, shard 11 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 7, shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 7, shard 15 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 7, shard 15 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 3 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 51.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.8 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.4 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.4 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.4 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.3 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.0 s |
