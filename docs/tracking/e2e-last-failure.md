# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40820695815
- Commit: `34a898079ee1a627e4ce2c3f4de52a5a62677c75`
- Attempt: 1
- Written (UTC): 2026-10-29T05:17:56.168Z
- Passed: 2241 · Skipped: 159 · Failed: 14
- Gating failures: 14 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: none
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
| smoke | 2026-10-29T05:03:23.703Z | 13.5 min |
| email | 2026-10-29T05:03:04.164Z | 0.2 min |
| shard 1 | 2026-10-29T05:03:22.393Z | 9.1 min |
| shard 2 | 2026-10-29T05:03:38.272Z | 12.9 min |
| shard 3 | 2026-10-29T05:03:34.204Z | 12.5 min |
| shard 4 | 2026-10-29T05:03:34.709Z | 7.6 min |
| shard 5 | 2026-10-29T05:04:04.611Z | 6.7 min |
| shard 6 | 2026-10-29T05:03:51.814Z | 10.6 min |
| shard 7 | 2026-10-29T05:03:26.031Z | 5.8 min |
| shard 8 | 2026-10-29T05:03:29.791Z | 7.7 min |
| shard 9 | 2026-10-29T05:03:38.495Z | 10.6 min |
| shard 10 | 2026-10-29T05:03:26.902Z | 13.2 min |
| shard 11 | 2026-10-29T05:03:03.905Z | 11.5 min |
| shard 12 | 2026-10-29T05:04:11.955Z | 8.2 min |
| shard 13 | 2026-10-29T05:03:25.594Z | 6.8 min |
| shard 14 | 2026-10-29T05:03:27.893Z | 9.3 min |
| shard 15 | 2026-10-29T05:03:34.644Z | 6.7 min |
| shard 16 | 2026-10-29T05:04:05.176Z | 6.9 min |
| repeat | 2026-10-29T05:03:58.728Z | 2.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 436 | 18.9 min | smoke, shard 8, shard 16 |
| `auth-signout.spec.ts` | 68 | 6.2 min | smoke, shard 3, shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.6 min | shard 6, shard 14 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 1, shard 9 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 2, shard 10 |
| `import-security.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 4.6 min | shard 7, shard 15 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.1 min | shard 6, shard 14 |
| `admin-translations-console.spec.ts` | 44 | 4.1 min | shard 3, shard 11 |
| `admin-roles.spec.ts` | 26 | 3.9 min | shard 3, shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.9 min | shard 2, shard 10 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 1, shard 9 |
| `admin-screening.spec.ts` | 52 | 3.7 min | shard 3, shard 11 |
| `photo-pipeline.spec.ts` | 68 | 3.6 min | shard 5, shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 7, shard 15 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 5, shard 13 |
| `admin-users.spec.ts` | 28 | 3.4 min | shard 3, shard 11 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 1, shard 9 |
| `admin-ai-calls.spec.ts` | 14 | 3.3 min | shard 1, shard 9, repeat |
| `admin-listings.spec.ts` | 62 | 3.2 min | shard 2, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 6, shard 14 |
| `ad-page.spec.ts` | 78 | 3.0 min | shard 1, shard 9 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 2, shard 10 |
| `post-wizard-category.spec.ts` | 48 | 2.5 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 7, shard 15 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 10 |
| `admin-attributes-import.spec.ts` | 40 | 2.0 min | shard 1, shard 9 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `legal-certify.spec.ts` | 42 | 1.6 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 2, shard 10 |
| `mfa-stepup.spec.ts` | 18 | 1.5 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 10 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.7 min | shard 3, shard 11 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 7, shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 7, shard 15 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 4, shard 12 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 3, shard 11 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 7, shard 15 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.9 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.1 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 34.1 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 33.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.3 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40820695815-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40820695815-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40820695815-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40820695815-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 40820695815-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40820695815-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 40820695815-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40820695815-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40820695815-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40820695815-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40820695815-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40820695815-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40820695815-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40820695815-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 40820695815-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40820695815-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40820695815-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40820695815-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40820695815-local-repeat
```

## admin-ai-calls.spec.ts › ACR-E1 staff history filters through the real door and renders its exact page

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })

--- further error 1 ---
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })


  45 |   if (filtered.data.rows.length === 0)
  46 |     await expect(section.getByTestId("data-table-empty")).toBeVisible();
> 47 |   await expect(section.getByRole("button", { name: en["prim.table.previous"] })).toBeDisabled();
     |                                                                                  ^
  48 | });
  49 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-ai-calls.spec.ts:47:82
```

Context:

```text
          - listitem [ref=e552]:
            - generic [ref=e553]: About
          - listitem [ref=e554]:
            - generic [ref=e555]: Contact
      - navigation "Help" [ref=e556]:
        - heading "Help" [level=2] [ref=e557]
        - list [ref=e558]:
          - listitem [ref=e559]:
            - generic [ref=e560]: Safety
      - navigation "Legal" [ref=e561]:
        - heading "Legal" [level=2] [ref=e562]
        - list [ref=e563]:
          - listitem [ref=e564]:
            - link "Terms" [ref=e565] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e566]:
            - link "Privacy" [ref=e567] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e569]: © 2026 ethio.com — All rights reserved.
```
```

## admin-ai-calls.spec.ts › ACR-E1 staff history filters through the real door and renders its exact page

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })

--- further error 1 ---
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })


  45 |   if (filtered.data.rows.length === 0)
  46 |     await expect(section.getByTestId("data-table-empty")).toBeVisible();
> 47 |   await expect(section.getByRole("button", { name: en["prim.table.previous"] })).toBeDisabled();
     |                                                                                  ^
  48 | });
  49 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-ai-calls.spec.ts:47:82
```

Context:

```text
          - listitem [ref=e528]:
            - generic [ref=e529]: About
          - listitem [ref=e530]:
            - generic [ref=e531]: Contact
      - navigation "Help" [ref=e532]:
        - heading "Help" [level=2] [ref=e533]
        - list [ref=e534]:
          - listitem [ref=e535]:
            - generic [ref=e536]: Safety
      - navigation "Legal" [ref=e537]:
        - heading "Legal" [level=2] [ref=e538]
        - list [ref=e539]:
          - listitem [ref=e540]:
            - link "Terms" [ref=e541] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e542]:
            - link "Privacy" [ref=e543] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e545]: © 2026 ethio.com — All rights reserved.
```
```

## admin-ai-calls.spec.ts › ACR-E1 staff history filters through the real door and renders its exact page

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })

--- further error 1 ---
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })


  45 |   if (filtered.data.rows.length === 0)
  46 |     await expect(section.getByTestId("data-table-empty")).toBeVisible();
> 47 |   await expect(section.getByRole("button", { name: en["prim.table.previous"] })).toBeDisabled();
     |                                                                                  ^
  48 | });
  49 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-ai-calls.spec.ts:47:82
```

Context:

```text
          - listitem [ref=e552]:
            - generic [ref=e553]: About
          - listitem [ref=e554]:
            - generic [ref=e555]: Contact
      - navigation "Help" [ref=e556]:
        - heading "Help" [level=2] [ref=e557]
        - list [ref=e558]:
          - listitem [ref=e559]:
            - generic [ref=e560]: Safety
      - navigation "Legal" [ref=e561]:
        - heading "Legal" [level=2] [ref=e562]
        - list [ref=e563]:
          - listitem [ref=e564]:
            - link "Terms" [ref=e565] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e566]:
            - link "Privacy" [ref=e567] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e569]: © 2026 ethio.com — All rights reserved.
```
```

## admin-ai-calls.spec.ts › ACR-E1 staff history filters through the real door and renders its exact page

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })

--- further error 1 ---
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })


  45 |   if (filtered.data.rows.length === 0)
  46 |     await expect(section.getByTestId("data-table-empty")).toBeVisible();
> 47 |   await expect(section.getByRole("button", { name: en["prim.table.previous"] })).toBeDisabled();
     |                                                                                  ^
  48 | });
  49 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-ai-calls.spec.ts:47:82
```

Context:

```text
          - listitem [ref=e552]:
            - generic [ref=e553]: About
          - listitem [ref=e554]:
            - generic [ref=e555]: Contact
      - navigation "Help" [ref=e556]:
        - heading "Help" [level=2] [ref=e557]
        - list [ref=e558]:
          - listitem [ref=e559]:
            - generic [ref=e560]: Safety
      - navigation "Legal" [ref=e561]:
        - heading "Legal" [level=2] [ref=e562]
        - list [ref=e563]:
          - listitem [ref=e564]:
            - link "Terms" [ref=e565] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e566]:
            - link "Privacy" [ref=e567] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e569]: © 2026 ethio.com — All rights reserved.
```
```

## admin-ai-calls.spec.ts › ACR-E1 staff history filters through the real door and renders its exact page

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })

--- further error 1 ---
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })


  45 |   if (filtered.data.rows.length === 0)
  46 |     await expect(section.getByTestId("data-table-empty")).toBeVisible();
> 47 |   await expect(section.getByRole("button", { name: en["prim.table.previous"] })).toBeDisabled();
     |                                                                                  ^
  48 | });
  49 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-ai-calls.spec.ts:47:82
```

Context:

```text
          - listitem [ref=e552]:
            - generic [ref=e553]: About
          - listitem [ref=e554]:
            - generic [ref=e555]: Contact
      - navigation "Help" [ref=e556]:
        - heading "Help" [level=2] [ref=e557]
        - list [ref=e558]:
          - listitem [ref=e559]:
            - generic [ref=e560]: Safety
      - navigation "Legal" [ref=e561]:
        - heading "Legal" [level=2] [ref=e562]
        - list [ref=e563]:
          - listitem [ref=e564]:
            - link "Terms" [ref=e565] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e566]:
            - link "Privacy" [ref=e567] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e569]: © 2026 ethio.com — All rights reserved.
```
```

## admin-ai-calls.spec.ts › ACR-E1 staff history filters through the real door and renders its exact page

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })

--- further error 1 ---
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })


  45 |   if (filtered.data.rows.length === 0)
  46 |     await expect(section.getByTestId("data-table-empty")).toBeVisible();
> 47 |   await expect(section.getByRole("button", { name: en["prim.table.previous"] })).toBeDisabled();
     |                                                                                  ^
  48 | });
  49 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-ai-calls.spec.ts:47:82
```

Context:

```text
          - listitem [ref=e552]:
            - generic [ref=e553]: About
          - listitem [ref=e554]:
            - generic [ref=e555]: Contact
      - navigation "Help" [ref=e556]:
        - heading "Help" [level=2] [ref=e557]
        - list [ref=e558]:
          - listitem [ref=e559]:
            - generic [ref=e560]: Safety
      - navigation "Legal" [ref=e561]:
        - heading "Legal" [level=2] [ref=e562]
        - list [ref=e563]:
          - listitem [ref=e564]:
            - link "Terms" [ref=e565] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e566]:
            - link "Privacy" [ref=e567] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e569]: © 2026 ethio.com — All rights reserved.
```
```

## admin-ai-calls.spec.ts › ACR-E1 staff history filters through the real door and renders its exact page

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })

--- further error 1 ---
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })


  45 |   if (filtered.data.rows.length === 0)
  46 |     await expect(section.getByTestId("data-table-empty")).toBeVisible();
> 47 |   await expect(section.getByRole("button", { name: en["prim.table.previous"] })).toBeDisabled();
     |                                                                                  ^
  48 | });
  49 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-ai-calls.spec.ts:47:82
```

Context:

```text
          - listitem [ref=e552]:
            - generic [ref=e553]: About
          - listitem [ref=e554]:
            - generic [ref=e555]: Contact
      - navigation "Help" [ref=e556]:
        - heading "Help" [level=2] [ref=e557]
        - list [ref=e558]:
          - listitem [ref=e559]:
            - generic [ref=e560]: Safety
      - navigation "Legal" [ref=e561]:
        - heading "Legal" [level=2] [ref=e562]
        - list [ref=e563]:
          - listitem [ref=e564]:
            - link "Terms" [ref=e565] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e566]:
            - link "Privacy" [ref=e567] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e569]: © 2026 ethio.com — All rights reserved.
```
```

## admin-ai-calls.spec.ts › ACR-E1 staff history filters through the real door and renders its exact page

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })

--- further error 1 ---
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })


  45 |   if (filtered.data.rows.length === 0)
  46 |     await expect(section.getByTestId("data-table-empty")).toBeVisible();
> 47 |   await expect(section.getByRole("button", { name: en["prim.table.previous"] })).toBeDisabled();
     |                                                                                  ^
  48 | });
  49 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-ai-calls.spec.ts:47:82
```

Context:

```text
          - listitem [ref=e552]:
            - generic [ref=e553]: About
          - listitem [ref=e554]:
            - generic [ref=e555]: Contact
      - navigation "Help" [ref=e556]:
        - heading "Help" [level=2] [ref=e557]
        - list [ref=e558]:
          - listitem [ref=e559]:
            - generic [ref=e560]: Safety
      - navigation "Legal" [ref=e561]:
        - heading "Legal" [level=2] [ref=e562]
        - list [ref=e563]:
          - listitem [ref=e564]:
            - link "Terms" [ref=e565] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e566]:
            - link "Privacy" [ref=e567] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e569]: © 2026 ethio.com — All rights reserved.
```
```

## admin-ai-calls.spec.ts › ACR-E1 staff history filters through the real door and renders its exact page

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })

--- further error 1 ---
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })


  45 |   if (filtered.data.rows.length === 0)
  46 |     await expect(section.getByTestId("data-table-empty")).toBeVisible();
> 47 |   await expect(section.getByRole("button", { name: en["prim.table.previous"] })).toBeDisabled();
     |                                                                                  ^
  48 | });
  49 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-ai-calls.spec.ts:47:82
```

Context:

```text
          - listitem [ref=e528]:
            - generic [ref=e529]: About
          - listitem [ref=e530]:
            - generic [ref=e531]: Contact
      - navigation "Help" [ref=e532]:
        - heading "Help" [level=2] [ref=e533]
        - list [ref=e534]:
          - listitem [ref=e535]:
            - generic [ref=e536]: Safety
      - navigation "Legal" [ref=e537]:
        - heading "Legal" [level=2] [ref=e538]
        - list [ref=e539]:
          - listitem [ref=e540]:
            - link "Terms" [ref=e541] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e542]:
            - link "Privacy" [ref=e543] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e545]: © 2026 ethio.com — All rights reserved.
```
```

## admin-ai-calls.spec.ts › ACR-E1 staff history filters through the real door and renders its exact page

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })

--- further error 1 ---
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })


  45 |   if (filtered.data.rows.length === 0)
  46 |     await expect(section.getByTestId("data-table-empty")).toBeVisible();
> 47 |   await expect(section.getByRole("button", { name: en["prim.table.previous"] })).toBeDisabled();
     |                                                                                  ^
  48 | });
  49 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-ai-calls.spec.ts:47:82
```

Context:

```text
          - listitem [ref=e528]:
            - generic [ref=e529]: About
          - listitem [ref=e530]:
            - generic [ref=e531]: Contact
      - navigation "Help" [ref=e532]:
        - heading "Help" [level=2] [ref=e533]
        - list [ref=e534]:
          - listitem [ref=e535]:
            - generic [ref=e536]: Safety
      - navigation "Legal" [ref=e537]:
        - heading "Legal" [level=2] [ref=e538]
        - list [ref=e539]:
          - listitem [ref=e540]:
            - link "Terms" [ref=e541] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e542]:
            - link "Privacy" [ref=e543] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e545]: © 2026 ethio.com — All rights reserved.
```
```

## admin-ai-calls.spec.ts › ACR-E1 staff history filters through the real door and renders its exact page

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })

--- further error 1 ---
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })


  45 |   if (filtered.data.rows.length === 0)
  46 |     await expect(section.getByTestId("data-table-empty")).toBeVisible();
> 47 |   await expect(section.getByRole("button", { name: en["prim.table.previous"] })).toBeDisabled();
     |                                                                                  ^
  48 | });
  49 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-ai-calls.spec.ts:47:82
```

Context:

```text
          - listitem [ref=e528]:
            - generic [ref=e529]: About
          - listitem [ref=e530]:
            - generic [ref=e531]: Contact
      - navigation "Help" [ref=e532]:
        - heading "Help" [level=2] [ref=e533]
        - list [ref=e534]:
          - listitem [ref=e535]:
            - generic [ref=e536]: Safety
      - navigation "Legal" [ref=e537]:
        - heading "Legal" [level=2] [ref=e538]
        - list [ref=e539]:
          - listitem [ref=e540]:
            - link "Terms" [ref=e541] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e542]:
            - link "Privacy" [ref=e543] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e545]: © 2026 ethio.com — All rights reserved.
```
```

## admin-ai-calls.spec.ts › ACR-E1 staff history filters through the real door and renders its exact page

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })

--- further error 1 ---
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })


  45 |   if (filtered.data.rows.length === 0)
  46 |     await expect(section.getByTestId("data-table-empty")).toBeVisible();
> 47 |   await expect(section.getByRole("button", { name: en["prim.table.previous"] })).toBeDisabled();
     |                                                                                  ^
  48 | });
  49 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-ai-calls.spec.ts:47:82
```

Context:

```text
          - listitem [ref=e528]:
            - generic [ref=e529]: About
          - listitem [ref=e530]:
            - generic [ref=e531]: Contact
      - navigation "Help" [ref=e532]:
        - heading "Help" [level=2] [ref=e533]
        - list [ref=e534]:
          - listitem [ref=e535]:
            - generic [ref=e536]: Safety
      - navigation "Legal" [ref=e537]:
        - heading "Legal" [level=2] [ref=e538]
        - list [ref=e539]:
          - listitem [ref=e540]:
            - link "Terms" [ref=e541] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e542]:
            - link "Privacy" [ref=e543] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e545]: © 2026 ethio.com — All rights reserved.
```
```

## admin-ai-calls.spec.ts › ACR-E1 staff history filters through the real door and renders its exact page

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })

--- further error 1 ---
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })


  45 |   if (filtered.data.rows.length === 0)
  46 |     await expect(section.getByTestId("data-table-empty")).toBeVisible();
> 47 |   await expect(section.getByRole("button", { name: en["prim.table.previous"] })).toBeDisabled();
     |                                                                                  ^
  48 | });
  49 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-ai-calls.spec.ts:47:82
```

Context:

```text
          - listitem [ref=e528]:
            - generic [ref=e529]: About
          - listitem [ref=e530]:
            - generic [ref=e531]: Contact
      - navigation "Help" [ref=e532]:
        - heading "Help" [level=2] [ref=e533]
        - list [ref=e534]:
          - listitem [ref=e535]:
            - generic [ref=e536]: Safety
      - navigation "Legal" [ref=e537]:
        - heading "Legal" [level=2] [ref=e538]
        - list [ref=e539]:
          - listitem [ref=e540]:
            - link "Terms" [ref=e541] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e542]:
            - link "Privacy" [ref=e543] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e545]: © 2026 ethio.com — All rights reserved.
```
```

## admin-ai-calls.spec.ts › ACR-E1 staff history filters through the real door and renders its exact page

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })

--- further error 1 ---
Error: expect(locator).toBeDisabled() failed

Locator: getByTestId('ai-calls').getByRole('button', { name: 'Previous' })
Expected: disabled
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeDisabled" with timeout 10000ms
  - waiting for getByTestId('ai-calls').getByRole('button', { name: 'Previous' })


  45 |   if (filtered.data.rows.length === 0)
  46 |     await expect(section.getByTestId("data-table-empty")).toBeVisible();
> 47 |   await expect(section.getByRole("button", { name: en["prim.table.previous"] })).toBeDisabled();
     |                                                                                  ^
  48 | });
  49 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-ai-calls.spec.ts:47:82
```

Context:

```text
          - listitem [ref=e528]:
            - generic [ref=e529]: About
          - listitem [ref=e530]:
            - generic [ref=e531]: Contact
      - navigation "Help" [ref=e532]:
        - heading "Help" [level=2] [ref=e533]
        - list [ref=e534]:
          - listitem [ref=e535]:
            - generic [ref=e536]: Safety
      - navigation "Legal" [ref=e537]:
        - heading "Legal" [level=2] [ref=e538]
        - list [ref=e539]:
          - listitem [ref=e540]:
            - link "Terms" [ref=e541] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e542]:
            - link "Privacy" [ref=e543] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e545]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 9

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
```

## Client errors: shard 9

No `[client-error]` lines in the `shard 9` log (or no log was uploaded).

## Server errors: repeat

No `[ssr-error]` lines in the `repeat` log (or no log was uploaded).

## Client errors: repeat

No `[client-error]` lines in the `repeat` log (or no log was uploaded).
