# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 40556429894 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40556429894
- Commit: `0586d7f28089e02d75d6b896a4661edd836df284`
- Attempt: 1
- Written (UTC): 2026-10-27T22:35:44.738Z
- Post-test warnings: 6
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 2 results files read, 2 of 2 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: nightly, full · unavailable: none

63 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | full |
| `categories wrongFile` (quiet) | 4 | full |
| `definitions badHeader` (quiet) | 4 | full |
| `definitions wrongFile` (quiet) | 4 | full |
| `categories file too large` (quiet) | 2 | full |
| `categories nulByte` (quiet) | 2 | full |
| `categories unknownColumn` (quiet) | 2 | full |
| `countries badHeader` (quiet) | 2 | full |
| `countries nulByte` (quiet) | 2 | full |
| `countries tooManyRows` (quiet) | 2 | full |
| `countries unknownColumn` (quiet) | 2 | full |
| `countries wrongFile` (quiet) | 2 | full |
| `definitions nulByte` (quiet) | 2 | full |
| `definitions tooManyRows` (quiet) | 2 | full |
| `definitions unknownColumn` (quiet) | 2 | full |
| `links unknownColumn` (quiet) | 2 | full |
| `locations badHeader` (quiet) | 2 | full |
| `locations file too large` (quiet) | 2 | full |
| `locations nulByte` (quiet) | 2 | full |
| `locations unknownColumn` (quiet) | 2 | full |
| `locations wrongFile` (quiet) | 2 | full |
| `strings badHeader` (quiet) | 2 | full |
| `strings emptyFile` (quiet) | 2 | full |
| `strings nulByte` (quiet) | 2 | full |
| `strings tooManyRows` (quiet) | 2 | full |
| `strings unknownColumn` (quiet) | 2 | full |
| `strings wrongFile` (quiet) | 2 | full |
| `gate fetch threw upstream ssr language gate timed out after <n>ms` | 1 | full |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### gate fetch threw upstream ssr language gate timed out after <n>ms

- Count: 1 · Sources: full
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CT-37 undoing a category delete restores its attribute links or names the skippe ×1 · CT-42 the undo of an import removes a created chain and its guest link, whatever ×1

```text
[WebServer] [ssr-error] /__root gate fetch threw upstream ssr language gate timed out after 1500ms
```

## Accessibility (DEC-084, gating)

Logs read: nightly, full · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: nightly, full · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| nightly | 2026-10-27T18:05:01.219Z | 3.5 min |
| full | 2026-10-27T18:08:34.934Z | 267.1 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 68 | 14.2 min | full |
| `shell.spec.ts` | 218 | 10.6 min | full |
| `ad-page.spec.ts` | 76 | 10.2 min | full |
| `post-wizard-bundle2.spec.ts` | 70 | 10.2 min | full |
| `post-wizard-specs.spec.ts` | 82 | 10.0 min | full |
| `admin-listings.spec.ts` | 62 | 9.8 min | full |
| `import-security.spec.ts` | 36 | 9.4 min | full |
| `admin-screening.spec.ts` | 52 | 8.7 min | full |
| `admin-attributes-library.spec.ts` | 42 | 6.9 min | full |
| `post-wizard-pricing.spec.ts` | 52 | 6.8 min | full |
| `admin-categories-lifecycle.spec.ts` | 52 | 6.7 min | full |
| `my-listings-ad.spec.ts` | 36 | 6.6 min | full |
| `post-wizard-place.spec.ts` | 38 | 6.6 min | full |
| `posting-routes.spec.ts` | 80 | 6.5 min | full |
| `legal-certify.spec.ts` | 42 | 6.0 min | full |
| `post-wizard-category.spec.ts` | 48 | 5.9 min | full |
| `admin-categories-console.spec.ts` | 34 | 5.9 min | full |
| `admin-locations.spec.ts` | 38 | 5.7 min | full |
| `post-wizard-where.spec.ts` | 32 | 5.7 min | full |
| `admin-attributes-links.spec.ts` | 34 | 5.6 min | full |
| `feed-screens.spec.ts` | 36 | 5.5 min | full |
| `admin-translations-console.spec.ts` | 46 | 5.5 min | full |
| `admin-translations-governance.spec.ts` | 20 | 5.4 min | full |
| `admin-users.spec.ts` | 28 | 5.3 min | full |
| `post-wizard-resets.spec.ts` | 34 | 5.1 min | full |
| `admin-roles.spec.ts` | 26 | 5.0 min | full |
| `admin-attributes-editor.spec.ts` | 36 | 4.9 min | full |
| `viewing-place.spec.ts` | 22 | 4.8 min | full |
| `auth-signout.spec.ts` | 32 | 4.3 min | full |
| `my-listings-doors.spec.ts` | 28 | 4.0 min | full |
| `admin-attributes-safety.spec.ts` | 18 | 3.8 min | full |
| `legal-admin.spec.ts` | 42 | 3.7 min | full |
| `ad-page-doors.spec.ts` | 30 | 3.6 min | full |
| `auth-resend-exhaustion.spec.ts` | 1 | 3.4 min | nightly |
| `admin-attributes-import.spec.ts` | 40 | 3.3 min | full |
| `my-listings-page.spec.ts` | 16 | 2.9 min | full |
| `legal-doors.spec.ts` | 34 | 2.7 min | full |
| `admin-countries.spec.ts` | 18 | 2.5 min | full |
| `admin-translations-data.spec.ts` | 10 | 2.4 min | full |
| `admin-audit.spec.ts` | 14 | 2.3 min | full |
| `admin-categories-home.spec.ts` | 10 | 2.2 min | full |
| `posting-routes-catalog.spec.ts` | 18 | 2.1 min | full |
| `feed-index.spec.ts` | 30 | 1.9 min | full |
| `mfa-stepup.spec.ts` | 18 | 1.7 min | full |
| `feed-route.spec.ts` | 22 | 1.6 min | full |
| `admin-shell.spec.ts` | 12 | 1.5 min | full |
| `posting-routes-dials.spec.ts` | 18 | 1.2 min | full |
| `admin-coverage.spec.ts` | 16 | 1.2 min | full |
| `locations-tree.spec.ts` | 8 | 1.1 min | full |
| `admin-categories-images.spec.ts` | 4 | 1.1 min | full |
| `post-wizard-removed.spec.ts` | 4 | 1.1 min | full |
| `phone-frame.spec.ts` | 18 | 1.1 min | full |
| `supabase-door.spec.ts` | 12 | 1.0 min | full |
| `auth-caller-gates.spec.ts` | 8 | 0.9 min | full |
| `post-wizard-details.spec.ts` | 8 | 0.9 min | full |
| `legal-accept.spec.ts` | 12 | 0.9 min | full |
| `post-wizard-finder.spec.ts` | 8 | 0.8 min | full |
| `breadcrumbs.spec.ts` | 6 | 0.7 min | full |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | full |
| `legal-history.spec.ts` | 6 | 0.6 min | full |
| `posting-routes-identity.spec.ts` | 4 | 0.5 min | full |
| `post-wizard-units.spec.ts` | 4 | 0.5 min | full |
| `account-saved.spec.ts` | 4 | 0.5 min | full |
| `a11y.spec.ts` | 4 | 0.4 min | full |
| `admin-services.spec.ts` | 10 | 0.4 min | full |
| `category-image-routes.spec.ts` | 10 | 0.4 min | full |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | full |
| `settings.spec.ts` | 9 | 0.4 min | full |
| `primitives-law.spec.ts` | 24 | 0.4 min | full |
| `legal-pages.spec.ts` | 10 | 0.4 min | full |
| `post-wizard-recent.spec.ts` | 2 | 0.3 min | full |
| `house-style.spec.ts` | 12 | 0.3 min | full |
| `rbac.spec.ts` | 6 | 0.3 min | full |
| `category-nav.spec.ts` | 10 | 0.3 min | full |
| `layout.spec.ts` | 10 | 0.2 min | full |
| `auth-reset.spec.ts` | 6 | 0.2 min | full |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | full |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | full |
| `shell-table-law.spec.ts` | 2 | 0.1 min | full |
| `auth-callback.spec.ts` | 4 | 0.1 min | full |
| `i18n-layers.spec.ts` | 6 | 0.1 min | full |
| `overlays.spec.ts` | 6 | 0.1 min | full |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | full |
| `fonts.spec.ts` | 2 | 0.0 min | full |
| `auth-google.spec.ts` | 2 | 0.0 min | full |
| `geo.spec.ts` | 10 | 0.0 min | full |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | full |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `auth-resend-exhaustion.spec.ts` › A-3: three resends exhaust the per-visit limit | nightly-mobile-360 | 204.8 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 129.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 57.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 54.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 54.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 53.9 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 53.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 52.6 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 50.4 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.5 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 36.2 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 34.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 33.7 s |
