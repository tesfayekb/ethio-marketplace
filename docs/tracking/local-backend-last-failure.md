# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41178779969
- Commit: `fc918fbbc9dda9336541df2a95e429d77e824ccf`
- Attempt: 1
- Written (UTC): 2026-10-31T07:20:35.453Z
- Passed: 2326 · Skipped: 367 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: shard 12
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 19 results files read, 18 of 19 logs read).

## Backend start failure (INC-973)

The temporary backend never came up, so these sources have neither results nor a lane log: shard 12. The start log's error lines, redacted, from `shard 12` (one lane's lines stand for every lane that failed the same way):

```text
migration: Applying migration 20261029073342_cba46fd4-8476-4450-8253-ec69daedcf2b.sql...
ERROR: refused:replay (SQLSTATE P0001)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: shard 12

`shard 12`: log unavailable.

35 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 3 | shard 2, shard 4, shard 10 |
| `categories wrongFile` (quiet) | 3 | shard 2, shard 4, shard 10 |
| `definitions badHeader` (quiet) | 3 | shard 1, shard 4, shard 9 |
| `definitions wrongFile` (quiet) | 3 | shard 1, shard 4, shard 9 |
| `categories file too large` (quiet) | 1 | shard 4 |
| `categories nulByte` (quiet) | 1 | shard 4 |
| `categories unknownColumn` (quiet) | 1 | shard 4 |
| `countries badHeader` (quiet) | 1 | shard 4 |
| `countries nulByte` (quiet) | 1 | shard 4 |
| `countries tooManyRows` (quiet) | 1 | shard 4 |
| `countries unknownColumn` (quiet) | 1 | shard 4 |
| `countries wrongFile` (quiet) | 1 | shard 4 |
| `definitions nulByte` (quiet) | 1 | shard 4 |
| `definitions tooManyRows` (quiet) | 1 | shard 4 |
| `definitions unknownColumn` (quiet) | 1 | shard 4 |
| `links unknownColumn` (quiet) | 1 | shard 4 |
| `locations badHeader` (quiet) | 1 | shard 4 |
| `locations file too large` (quiet) | 1 | shard 4 |
| `locations nulByte` (quiet) | 1 | shard 4 |
| `locations unknownColumn` (quiet) | 1 | shard 4 |
| `locations wrongFile` (quiet) | 1 | shard 4 |
| `strings badHeader` (quiet) | 1 | shard 4 |
| `strings emptyFile` (quiet) | 1 | shard 4 |
| `strings nulByte` (quiet) | 1 | shard 4 |
| `strings tooManyRows` (quiet) | 1 | shard 4 |
| `strings unknownColumn` (quiet) | 1 | shard 4 |
| `strings wrongFile` (quiet) | 1 | shard 4 |

Quiet (allowlisted): categories badHeader ×3 · categories wrongFile ×3 · definitions badHeader ×3 · definitions wrongFile ×3 · categories file too large ×1 · categories nulByte ×1 · categories unknownColumn ×1 · countries badHeader ×1 · countries nulByte ×1 · countries tooManyRows ×1 · countries unknownColumn ×1 · countries wrongFile ×1 · definitions nulByte ×1 · definitions tooManyRows ×1 · definitions unknownColumn ×1 · links unknownColumn ×1 · locations badHeader ×1 · locations file too large ×1 · locations nulByte ×1 · locations unknownColumn ×1 · locations wrongFile ×1 · strings badHeader ×1 · strings emptyFile ×1 · strings nulByte ×1 · strings tooManyRows ×1 · strings unknownColumn ×1 · strings wrongFile ×1

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: shard 12

`shard 12`: log unavailable.

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: shard 12

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-31T07:02:45.678Z | 13.7 min |
| email | 2026-10-31T07:02:59.578Z | 0.4 min |
| shard 1 | 2026-10-31T07:02:43.192Z | 11.6 min |
| shard 2 | 2026-10-31T07:02:57.093Z | 15.4 min |
| shard 3 | 2026-10-31T07:03:31.877Z | 12.6 min |
| shard 4 | 2026-10-31T07:03:21.584Z | 8.1 min |
| shard 5 | 2026-10-31T07:02:07.144Z | 7.1 min |
| shard 6 | 2026-10-31T07:02:58.258Z | 11.3 min |
| shard 7 | 2026-10-31T07:03:11.300Z | 4.7 min |
| shard 8 | 2026-10-31T07:02:50.890Z | 8.1 min |
| shard 9 | 2026-10-31T07:02:46.675Z | 11.5 min |
| shard 10 | 2026-10-31T07:02:56.344Z | 17.1 min |
| shard 11 | 2026-10-31T07:02:32.648Z | 11.3 min |
| shard 13 | 2026-10-31T07:05:28.650Z | 6.7 min |
| shard 14 | 2026-10-31T07:03:18.082Z | 12.9 min |
| shard 15 | 2026-10-31T07:05:25.210Z | 6.1 min |
| shard 16 | 2026-10-31T07:03:21.592Z | 3.5 min |
| repeat | 2026-10-31T07:03:12.241Z | 3.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 19.5 min | smoke, shard 8, shard 15 |
| `auth-signout.spec.ts` | 68 | 6.4 min | smoke, shard 3, shard 11 |
| `admin-attributes-library.spec.ts` | 42 | 5.7 min | shard 1, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 5.0 min | shard 6, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 2, shard 10 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 3, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.5 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.5 min | shard 3, shard 11 |
| `post-wizard-place.spec.ts` | 38 | 4.5 min | shard 6, shard 14 |
| `admin-roles.spec.ts` | 26 | 4.3 min | shard 2, shard 10 |
| `admin-screening.spec.ts` | 52 | 4.3 min | shard 2, shard 10 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.2 min | shard 5, shard 13 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 1, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.0 min | shard 2, shard 10 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `admin-listings.spec.ts` | 62 | 3.9 min | shard 2, shard 10 |
| `choice-lists.spec.ts` | 168 | 3.9 min | shard 3, shard 11, repeat |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 3, shard 11 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 1, shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.4 min | shard 6, shard 14 |
| `ad-page.spec.ts` | 78 | 3.3 min | shard 1, shard 9 |
| `posting-routes.spec.ts` | 80 | 2.9 min | shard 7, shard 14 |
| `photo-pipeline.spec.ts` | 68 | 2.8 min | shard 5, shard 13 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 6, shard 14 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 7, shard 15 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 1, shard 9 |
| `import-security.spec.ts` | 18 | 2.4 min | shard 4 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 10 |
| `post-wizard-category.spec.ts` | 48 | 2.0 min | shard 5, shard 13 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.9 min | shard 1, shard 9 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `admin-audit.spec.ts` | 14 | 1.6 min | shard 1, shard 10 |
| `my-listings-ad.spec.ts` | 18 | 1.4 min | shard 5 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 21 | 1.1 min | shard 4 |
| `legal-certify.spec.ts` | 21 | 0.9 min | shard 4 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 10 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 5, shard 13 |
| `mfa-stepup.spec.ts` | 9 | 0.8 min | shard 4 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 7, shard 15 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6, shard 14 |
| `my-listings-page.spec.ts` | 16 | 0.6 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 4 | 0.5 min | shard 4 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 6, shard 14 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 13 |
| `i18n-sign-in-language.spec.ts` | 6 | 0.4 min | shard 4 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `legal-doors.spec.ts` | 17 | 0.3 min | shard 4 |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `i18n-bundle.spec.ts` | 3 | 0.3 min | shard 4 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 7, shard 15 |
| `legal-accept.spec.ts` | 6 | 0.2 min | shard 4 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `house-style.spec.ts` | 6 | 0.2 min | shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 7, shard 14 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `i18n-coverage.spec.ts` | 7 | 0.2 min | shard 4 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 11 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 6, shard 14 |
| `legal-pages.spec.ts` | 5 | 0.1 min | shard 4 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `layout.spec.ts` | 5 | 0.1 min | shard 4 |
| `legal-history.spec.ts` | 3 | 0.1 min | shard 4 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 15 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `i18n-layers.spec.ts` | 3 | 0.0 min | shard 4 |
| `locale-format.spec.ts` | 1 | 0.0 min | shard 4 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `fonts.spec.ts` | 1 | 0.0 min | shard 4 |
| `geo.spec.ts` | 5 | 0.0 min | shard 4 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 31.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |
| `auth-signout.spec.ts` › SO-11 a sign-out whose server cannot be reached still ends the session on this device (DEC-268) | mobile-360 | 28.5 s |
| `auth-signout.spec.ts` › SO-11 a sign-out whose server cannot be reached still ends the session on this device (DEC-268) | mobile-360 | 28.4 s |
| `auth-signout.spec.ts` › SO-11 a sign-out whose server cannot be reached still ends the session on this device (DEC-268) | desktop-1280 | 28.3 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41178779969-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41178779969-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 41178779969-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 41178779969-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 2, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 41178779969-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 27 (pool 2, fresh 25)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 32 user(s) owned by process 41178779969-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41178779969-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41178779969-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41178779969-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41178779969-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 41178779969-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 41178779969-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 41178779969-local-11
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41178779969-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41178779969-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41178779969-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41178779969-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41178779969-local-repeat
```

## Server errors: shard 12

No `[ssr-error]` lines in the `shard 12` log (or no log was uploaded).

## Client errors: shard 12

No `[client-error]` lines in the `shard 12` log (or no log was uploaded).

## shard 12: no results file

shard 12: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
