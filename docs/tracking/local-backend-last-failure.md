# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41138429380
- Commit: `d0b6a4add54ade3a01a771df3b632c8bb5ad27a3`
- Attempt: 1
- Written (UTC): 2026-10-30T22:47:05.149Z
- Passed: 2438 · Skipped: 263 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
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
| smoke | 2026-10-30T22:34:13.055Z | 12.4 min |
| email | 2026-10-30T22:36:03.991Z | 0.3 min |
| shard 1 | 2026-10-30T22:31:57.518Z | 11.6 min |
| shard 2 | 2026-10-30T22:31:46.382Z | 14.8 min |
| shard 3 | 2026-10-30T22:31:53.484Z | 10.4 min |
| shard 4 | 2026-10-30T22:31:36.792Z | 7.6 min |
| shard 5 | 2026-10-30T22:31:28.044Z | 8.7 min |
| shard 6 | 2026-10-30T22:31:25.483Z | 8.8 min |
| shard 7 | 2026-10-30T22:32:23.312Z | 9.0 min |
| shard 8 | 2026-10-30T22:31:20.898Z | 2.3 min |
| shard 9 | 2026-10-30T22:32:04.448Z | 10.2 min |
| shard 10 | 2026-10-30T22:31:44.403Z | 14.3 min |
| shard 11 | 2026-10-30T22:31:35.268Z | 13.9 min |
| shard 12 | 2026-10-30T22:34:52.943Z | 7.9 min |
| shard 13 | 2026-10-30T22:34:24.051Z | 11.4 min |
| shard 14 | 2026-10-30T22:31:38.461Z | 9.7 min |
| shard 15 | 2026-10-30T22:31:54.026Z | 7.8 min |
| shard 16 | 2026-10-30T22:32:00.647Z | 3.4 min |
| repeat | 2026-10-30T22:32:11.273Z | 10.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 19.0 min | smoke, shard 7, shard 15 |
| `feed-screens.spec.ts` | 108 | 14.1 min | shard 4, shard 11, repeat |
| `auth-signout.spec.ts` | 68 | 6.1 min | smoke, shard 3, shard 11 |
| `admin-attributes-library.spec.ts` | 42 | 5.7 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 5.1 min | shard 4, shard 12 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.0 min | shard 5, shard 13 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.5 min | shard 3, shard 11 |
| `post-wizard-specs.spec.ts` | 82 | 4.2 min | shard 6, shard 14 |
| `admin-categories-console.spec.ts` | 34 | 4.2 min | shard 2, shard 10 |
| `admin-attributes-links.spec.ts` | 34 | 4.2 min | shard 1, shard 9 |
| `admin-roles.spec.ts` | 26 | 4.2 min | shard 2, shard 10 |
| `admin-screening.spec.ts` | 52 | 4.1 min | shard 2, shard 11 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 3, shard 11 |
| `post-wizard-place.spec.ts` | 38 | 3.7 min | shard 6, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.6 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 1, shard 9 |
| `photo-pipeline.spec.ts` | 68 | 3.4 min | shard 5, shard 13 |
| `ad-page.spec.ts` | 78 | 3.3 min | shard 1, shard 9 |
| `admin-listings.spec.ts` | 62 | 3.3 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 36 | 3.1 min | shard 5, shard 13 |
| `post-wizard-pricing.spec.ts` | 52 | 2.8 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.8 min | shard 7, shard 15 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 10 |
| `post-wizard-category.spec.ts` | 48 | 2.5 min | shard 5, shard 13 |
| `post-wizard-resets.spec.ts` | 34 | 2.3 min | shard 6, shard 14 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `admin-shell.spec.ts` | 12 | 2.1 min | shard 3, shard 11 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.9 min | shard 1, shard 9 |
| `legal-admin.spec.ts` | 42 | 1.8 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 2, shard 10 |
| `legal-certify.spec.ts` | 42 | 1.5 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 18 | 1.5 min | shard 5, shard 13 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 1, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 12 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 5, shard 13 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 7, shard 15 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 4, shard 12 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 7, shard 15 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 6, shard 14 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 4, shard 12 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `submenu-look.spec.ts` | 36 | 0.6 min | shard 8, shard 16, repeat |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 7, shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 8, shard 16 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 7, shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 5, shard 12 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 48.1 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 47.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 46.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.7 s |
| `admin-shell.spec.ts` › A-6 admin fixture: gated section nav, section page + breadcrumb, deep link | desktop-1280 | 39.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.9 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 31.0 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41138429380-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41138429380-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 41138429380-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 41138429380-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 2, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 41138429380-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 2, fresh 15)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 41138429380-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 2, fresh 13)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 41138429380-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41138429380-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41138429380-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41138429380-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 41138429380-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 41138429380-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 41138429380-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 2, fresh 15)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 41138429380-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 2, fresh 13)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 41138429380-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41138429380-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41138429380-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41138429380-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41138429380-local-repeat
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveClass(expected) failed

Locator: getByTestId('rail-menu').getByTestId('admin-group-categories')
Expected pattern: /bg-nav-active/
Received string:  "flex md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center rounded-row text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring menu-on bg-card font-semibold text-nav-ink shadow-row-on justify-start gap-3 ps-[var(--rail-pad)] pe-2 h-8 min-h-8 max-h-10 flex-1"
Timeout: 10000ms

Call log:
  - Expect "toHaveClass" with timeout 10000ms
  - waiting for getByTestId('rail-menu').getByTestId('admin-group-categories')
    14 × locator resolved to <div aria-current="true" aria-label="Catalog" data-testid="admin-group-categories" class="flex md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center rounded-row text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring menu-on bg-card font-semibold text-nav-ink shadow-row-on justify-start gap-3 ps-[var(--rail-pad)] pe-2 h-8 min-h-8 max-h-10 flex-1">…</div>
       - unexpected value "flex md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center rounded-row text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring menu-on bg-card font-semibold text-nav-ink shadow-row-on justify-start gap-3 ps-[var(--rail-pad)] pe-2 h-8 min-h-8 max-h-10 flex-1"

--- further error 1 ---
Error: expect(locator).toHaveClass(expected) failed

Locator: getByTestId('rail-menu').getByTestId('admin-group-categories')
Expected pattern: /bg-nav-active/
Received string:  "flex md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center rounded-row text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring menu-on bg-card font-semibold text-nav-ink shadow-row-on justify-start gap-3 ps-[var(--rail-pad)] pe-2 h-8 min-h-8 max-h-10 flex-1"
Timeout: 10000ms

Call log:
  - Expect "toHaveClass" with timeout 10000ms
  - waiting for getByTestId('rail-menu').getByTestId('admin-group-categories')
    14 × locator resolved to <div aria-current="true" aria-label="Catalog" data-testid="admin-group-categories" class="flex md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center rounded-row text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring menu-on bg-card font-semibold text-nav-ink shadow-row-on justify-start gap-3 ps-[var(--rail-pad)] pe-2 h-8 min-h-8 max-h-10 flex-1">…</div>
       - unexpected value "flex md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center rounded-row text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring menu-on bg-card font-semibold text-nav-ink shadow-row-on justify-start gap-3 ps-[var(--rail-pad)] pe-2 h-8 min-h-8 max-h-10 flex-1"


  337 |     await expect(group, "the group item never rendered").toBeVisible({ timeout: 15000 });
  338 |     await expect(group).toContainText(en[ADMIN_GROUPS.categories.titleKey]);
> 339 |     await expect(group).toHaveClass(/bg-nav-active/);
      |                         ^
  340 |     if (isMobile(page)) {
  341 |       // VERDICT (phones keep today's menu, D255) — a visual cluster, NOT an accordion: no
```

Context:

```text
          - listitem [ref=e1630]:
            - generic [ref=e1631]: About
          - listitem [ref=e1632]:
            - generic [ref=e1633]: Contact
      - navigation "Help" [ref=e1634]:
        - heading "Help" [level=2] [ref=e1635]
        - list [ref=e1636]:
          - listitem [ref=e1637]:
            - generic [ref=e1638]: Safety
      - navigation "Legal" [ref=e1639]:
        - heading "Legal" [level=2] [ref=e1640]
        - list [ref=e1641]:
          - listitem [ref=e1642]:
            - link "Terms" [ref=e1643] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1644]:
            - link "Privacy" [ref=e1645] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1647]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-6 admin fixture: gated section nav, section page + breadcrumb, deep link

- Source: `shard 11`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveClass(expected) failed

Locator: getByTestId('app-rail').getByTestId('rail-item-ad-users')
Expected pattern: /bg-nav-active/
Received string:  "flex min-h-11 md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center gap-2 rounded-row pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 menu-on bg-card font-semibold text-nav-ink shadow-row-on active"
Timeout: 10000ms

Call log:
  - Expect "toHaveClass" with timeout 10000ms
  - waiting for getByTestId('app-rail').getByTestId('rail-item-ad-users')
    14 × locator resolved to <a aria-label="Users" aria-current="page" href="/admin/users" data-status="active" data-testid="rail-item-ad-users" class="flex min-h-11 md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center gap-2 rounded-row pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 menu-on bg-card font-semibold text-nav-ink shadow-row-on active">…</a>
       - unexpected value "flex min-h-11 md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center gap-2 rounded-row pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 menu-on bg-card font-semibold text-nav-ink shadow-row-on active"

--- further error 1 ---
Error: expect(locator).toHaveClass(expected) failed

Locator: getByTestId('app-rail').getByTestId('rail-item-ad-users')
Expected pattern: /bg-nav-active/
Received string:  "flex min-h-11 md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center gap-2 rounded-row pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 menu-on bg-card font-semibold text-nav-ink shadow-row-on active"
Timeout: 10000ms

Call log:
  - Expect "toHaveClass" with timeout 10000ms
  - waiting for getByTestId('app-rail').getByTestId('rail-item-ad-users')
    14 × locator resolved to <a aria-label="Users" aria-current="page" href="/admin/users" data-status="active" data-testid="rail-item-ad-users" class="flex min-h-11 md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center gap-2 rounded-row pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 menu-on bg-card font-semibold text-nav-ink shadow-row-on active">…</a>
       - unexpected value "flex min-h-11 md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center gap-2 rounded-row pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 menu-on bg-card font-semibold text-nav-ink shadow-row-on active"


  195 |           currentGroup ? `admin-group-${currentGroup}` : `rail-item-ad-${current.id}`,
  196 |         ),
> 197 |       ).toHaveClass(/bg-nav-active/);
      |         ^
  198 |     }
  199 |
```

Context:

```text
          - listitem [ref=e419]:
            - generic [ref=e420]: About
          - listitem [ref=e421]:
            - generic [ref=e422]: Contact
      - navigation "Help" [ref=e423]:
        - heading "Help" [level=2] [ref=e424]
        - list [ref=e425]:
          - listitem [ref=e426]:
            - generic [ref=e427]: Safety
      - navigation "Legal" [ref=e428]:
        - heading "Legal" [level=2] [ref=e429]
        - list [ref=e430]:
          - listitem [ref=e431]:
            - link "Terms" [ref=e432] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e433]:
            - link "Privacy" [ref=e434] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e436]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 11`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveClass(expected) failed

Locator: getByTestId('app-rail').getByTestId('admin-group-categories')
Expected pattern: /bg-nav-active/
Received string:  "flex min-h-11 md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center gap-2 rounded-row pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 menu-on bg-card font-semibold text-nav-ink shadow-row-on active"
Timeout: 10000ms

Call log:
  - Expect "toHaveClass" with timeout 10000ms
  - waiting for getByTestId('app-rail').getByTestId('admin-group-categories')
    14 × locator resolved to <a aria-current="page" aria-label="Catalog" data-status="active" aria-expanded="false" href="/admin/categories" data-submenu="ad-group-categories" data-testid="admin-group-categories" class="flex min-h-11 md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center gap-2 rounded-row pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 menu-on bg-card font-semibold text…>…</a>
       - unexpected value "flex min-h-11 md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center gap-2 rounded-row pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 menu-on bg-card font-semibold text-nav-ink shadow-row-on active"

--- further error 1 ---
Error: expect(locator).toHaveClass(expected) failed

Locator: getByTestId('app-rail').getByTestId('admin-group-categories')
Expected pattern: /bg-nav-active/
Received string:  "flex min-h-11 md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center gap-2 rounded-row pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 menu-on bg-card font-semibold text-nav-ink shadow-row-on active"
Timeout: 10000ms

Call log:
  - Expect "toHaveClass" with timeout 10000ms
  - waiting for getByTestId('app-rail').getByTestId('admin-group-categories')
    14 × locator resolved to <a aria-current="page" aria-label="Catalog" data-status="active" aria-expanded="false" href="/admin/categories" data-submenu="ad-group-categories" data-testid="admin-group-categories" class="flex min-h-11 md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center gap-2 rounded-row pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 menu-on bg-card font-semibold text…>…</a>
       - unexpected value "flex min-h-11 md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center gap-2 rounded-row pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ps-[var(--rail-pad)] rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0 menu-on bg-card font-semibold text-nav-ink shadow-row-on active"


  337 |     await expect(group, "the group item never rendered").toBeVisible({ timeout: 15000 });
  338 |     await expect(group).toContainText(en[ADMIN_GROUPS.categories.titleKey]);
> 339 |     await expect(group).toHaveClass(/bg-nav-active/);
      |                         ^
  340 |     if (isMobile(page)) {
  341 |       // VERDICT (phones keep today's menu, D255) — a visual cluster, NOT an accordion: no
```

Context:

```text
          - listitem [ref=e1444]:
            - generic [ref=e1445]: About
          - listitem [ref=e1446]:
            - generic [ref=e1447]: Contact
      - navigation "Help" [ref=e1448]:
        - heading "Help" [level=2] [ref=e1449]
        - list [ref=e1450]:
          - listitem [ref=e1451]:
            - generic [ref=e1452]: Safety
      - navigation "Legal" [ref=e1453]:
        - heading "Legal" [level=2] [ref=e1454]
        - list [ref=e1455]:
          - listitem [ref=e1456]:
            - link "Terms" [ref=e1457] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e1458]:
            - link "Privacy" [ref=e1459] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e1461]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 11

No `[ssr-error]` lines in the `shard 11` log (or no log was uploaded).

## Client errors: shard 11

No `[client-error]` lines in the `shard 11` log (or no log was uploaded).
