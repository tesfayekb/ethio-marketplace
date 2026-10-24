# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 40093106582 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40093106582
- Commit: `9aaf7db37bf7ea0a843d4f842088067166815b3b`
- Attempt: 1
- Written (UTC): 2026-10-24T12:31:20.602Z
- Post-test warnings: 54
- Flaky (passed on retry, DEC-030, non-gating): 0
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

115 line(s), 34 message(s): 0 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 29 | shard 1, shard 4, shard 9, shard 12 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 9, shard 10, shard 12 |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 9 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 2, shard 9, shard 10 |
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
| `strings badHeader` (quiet) | 2 | shard 4, shard 12 |
| `strings emptyFile` (quiet) | 2 | shard 4, shard 12 |
| `strings nulByte` (quiet) | 2 | shard 4, shard 12 |
| `strings tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `strings unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `strings wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-jgz<n>lc: e<n>e_par_oyqqzg → e<n>e_chi_i<n>ydnf` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-ser<n>: e<n>e_par_<n>l → e<n>e_chi_<n>w<n>utt` (quiet) | 1 | shard 10 |

Quiet (allowlisted): too many previews ×29 · digest mismatch ×12 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-jgz<n>lc: e<n>e_par_oyqqzg → e<n>e_chi_i<n>ydnf ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-ser<n>: e<n>e_par_<n>l → e<n>e_chi_<n>w<n>utt ×1

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-24T12:16:48.765Z | 11.7 min |
| email | 2026-10-24T12:17:32.272Z | 0.4 min |
| shard 1 | 2026-10-24T12:16:56.353Z | 9.4 min |
| shard 2 | 2026-10-24T12:18:50.605Z | 11.2 min |
| shard 3 | 2026-10-24T12:17:14.840Z | 12.0 min |
| shard 4 | 2026-10-24T12:17:30.878Z | 6.8 min |
| shard 5 | 2026-10-24T12:16:54.142Z | 5.5 min |
| shard 6 | 2026-10-24T12:17:55.304Z | 10.6 min |
| shard 7 | 2026-10-24T12:18:58.359Z | 7.1 min |
| shard 8 | 2026-10-24T12:17:16.494Z | 6.9 min |
| shard 9 | 2026-10-24T12:17:48.682Z | 8.0 min |
| shard 10 | 2026-10-24T12:17:07.044Z | 13.5 min |
| shard 11 | 2026-10-24T12:17:36.592Z | 13.2 min |
| shard 12 | 2026-10-24T12:16:59.361Z | 6.6 min |
| shard 13 | 2026-10-24T12:17:29.798Z | 7.4 min |
| shard 14 | 2026-10-24T12:16:27.187Z | 8.1 min |
| shard 15 | 2026-10-24T12:17:12.940Z | 7.3 min |
| shard 16 | 2026-10-24T12:17:20.280Z | 6.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 18.0 min | smoke, shard 8, shard 16 |
| `post-wizard-specs.spec.ts` | 82 | 5.3 min | shard 7, shard 15 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.1 min | shard 6, shard 14 |
| `admin-attributes-library.spec.ts` | 42 | 4.9 min | shard 1, shard 9 |
| `admin-locations.spec.ts` | 38 | 4.7 min | shard 2, shard 10 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 3, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 26 | 4.2 min | shard 3, shard 11 |
| `admin-screening.spec.ts` | 52 | 4.2 min | shard 3, shard 11 |
| `auth-signout.spec.ts` | 56 | 4.1 min | smoke, shard 3, shard 11 |
| `post-wizard-place.spec.ts` | 38 | 4.0 min | shard 6, shard 14 |
| `post-wizard-where.spec.ts` | 32 | 4.0 min | shard 7, shard 15 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.9 min | shard 2, shard 10 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 3, shard 11 |
| `photo-pipeline.spec.ts` | 68 | 3.5 min | shard 5, shard 13 |
| `admin-attributes-links.spec.ts` | 34 | 3.5 min | shard 1, shard 9 |
| `admin-listings.spec.ts` | 62 | 3.2 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 36 | 3.1 min | shard 5, shard 13 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.9 min | shard 7, shard 15 |
| `admin-attributes-editor.spec.ts` | 36 | 2.7 min | shard 1, shard 9 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 6, shard 14 |
| `post-wizard-category.spec.ts` | 48 | 2.4 min | shard 6, shard 14 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 10 |
| `import-security.spec.ts` | 36 | 2.2 min | shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 2.2 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 68 | 2.1 min | shard 1, shard 9 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `legal-certify.spec.ts` | 42 | 1.6 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 2, shard 10 |
| `mfa-stepup.spec.ts` | 18 | 1.5 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 3, shard 11 |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 10 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 7, shard 15 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 7, shard 15 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 1, shard 9 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 4, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 8, shard 15 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 5, shard 13 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `settings.spec.ts` | 4 | 0.2 min | shard 8 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 1, shard 9 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.7 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 31.1 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 31.0 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.1 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 30.0 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 26.5 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | desktop-1280 | 25.4 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 24.7 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 24.6 s |
