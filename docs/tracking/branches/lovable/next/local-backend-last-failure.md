# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45534020394
- Commit: `f04da58b6e20046b4e7d2cdf787c71637a7f7640`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-25T02:55:24.607Z
- Passed: 2565 · Skipped: 360 · Failed: 43
- Gating failures: 43 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 4, shard 15 |
| `categories wrongFile` (quiet) | 4 | shard 4, shard 15 |
| `definitions badHeader` (quiet) | 4 | shard 4, shard 8 |
| `definitions wrongFile` (quiet) | 4 | shard 4, shard 8 |
| `categories file too large` (quiet) | 2 | shard 4 |
| `categories nulByte` (quiet) | 2 | shard 4 |
| `categories unknownColumn` (quiet) | 2 | shard 4 |
| `countries badHeader` (quiet) | 2 | shard 4 |
| `countries nulByte` (quiet) | 2 | shard 4 |
| `countries tooManyRows` (quiet) | 2 | shard 4 |
| `countries unknownColumn` (quiet) | 2 | shard 4 |
| `countries wrongFile` (quiet) | 2 | shard 4 |
| `definitions nulByte` (quiet) | 2 | shard 4 |
| `definitions tooManyRows` (quiet) | 2 | shard 4 |
| `definitions unknownColumn` (quiet) | 2 | shard 4 |
| `links unknownColumn` (quiet) | 2 | shard 4 |
| `locations badHeader` (quiet) | 2 | shard 4 |
| `locations file too large` (quiet) | 2 | shard 4 |
| `locations nulByte` (quiet) | 2 | shard 4 |
| `locations unknownColumn` (quiet) | 2 | shard 4 |
| `locations wrongFile` (quiet) | 2 | shard 4 |
| `strings badHeader` (quiet) | 2 | shard 4 |
| `strings emptyFile` (quiet) | 2 | shard 4 |
| `strings nulByte` (quiet) | 2 | shard 4 |
| `strings tooManyRows` (quiet) | 2 | shard 4 |
| `strings unknownColumn` (quiet) | 2 | shard 4 |
| `strings wrongFile` (quiet) | 2 | shard 4 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-25T02:41:35.563Z | 4.7 min |
| email | 2026-11-25T02:41:22.063Z | 0.3 min |
| webkit | 2026-11-25T02:41:11.292Z | 10.6 min |
| shard 1 | 2026-11-25T02:40:43.303Z | 6.2 min |
| shard 2 | 2026-11-25T02:41:49.993Z | 8.1 min |
| shard 3 | 2026-11-25T02:41:33.066Z | 5.6 min |
| shard 4 | 2026-11-25T02:41:02.616Z | 7.0 min |
| shard 5 | 2026-11-25T02:41:43.257Z | 6.9 min |
| shard 6 | 2026-11-25T02:41:45.328Z | 7.7 min |
| shard 7 | 2026-11-25T02:41:42.797Z | 8.3 min |
| shard 8 | 2026-11-25T02:41:19.282Z | 6.1 min |
| shard 9 | 2026-11-25T02:41:21.512Z | 12.1 min |
| shard 10 | 2026-11-25T02:41:28.815Z | 5.8 min |
| shard 11 | 2026-11-25T02:41:29.456Z | 6.0 min |
| shard 12 | 2026-11-25T02:40:46.111Z | 5.8 min |
| shard 13 | 2026-11-25T02:41:01.625Z | 5.0 min |
| shard 14 | 2026-11-25T02:42:05.535Z | 7.1 min |
| shard 15 | 2026-11-25T02:41:56.180Z | 9.0 min |
| shard 16 | 2026-11-25T02:41:09.608Z | 13.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.4 min | shard 1 |
| `auth-signout.spec.ts` | 44 | 10.2 min | webkit, shard 9 |
| `sage-shell.spec.ts` | 80 | 8.6 min | shard 16 |
| `admin-attributes-library.spec.ts` | 42 | 7.5 min | shard 2 |
| `admin-categories-console.spec.ts` | 34 | 6.6 min | shard 7 |
| `import-security.spec.ts` | 36 | 6.2 min | shard 4 |
| `admin-screening.spec.ts` | 64 | 6.1 min | webkit, shard 14 |
| `admin-locations.spec.ts` | 44 | 6.0 min | shard 6 |
| `admin-listings.spec.ts` | 82 | 5.7 min | webkit, shard 10 |
| `mfa-stepup.spec.ts` | 28 | 5.3 min | webkit, shard 15 |
| `feed-screens.spec.ts` | 40 | 5.3 min | webkit, shard 5 |
| `admin-translations-console.spec.ts` | 46 | 5.2 min | smoke, shard 8 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.9 min | shard 15 |
| `dialogs.spec.ts` | 36 | 4.9 min | webkit, shard 10 |
| `admin-roles.spec.ts` | 28 | 4.9 min | shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.9 min | shard 3 |
| `viewing-place.spec.ts` | 22 | 4.4 min | shard 15 |
| `admin-users.spec.ts` | 28 | 4.3 min | shard 16 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 11 |
| `ad-page.spec.ts` | 104 | 4.2 min | webkit, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 4.2 min | shard 14 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 13 |
| `choice-lists.spec.ts` | 96 | 3.8 min | shard 7 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 11 |
| `photo-pipeline.spec.ts` | 74 | 3.8 min | webkit, shard 16 |
| `legal-admin.spec.ts` | 44 | 3.6 min | shard 7 |
| `my-listings-ad.spec.ts` | 38 | 3.6 min | shard 12 |
| `posting-routes.spec.ts` | 80 | 3.5 min | shard 2 |
| `admin-translations-governance.spec.ts` | 20 | 3.3 min | smoke, shard 16 |
| `sage-bands.spec.ts` | 76 | 3.3 min | shard 6 |
| `admin-monetisation.spec.ts` | 34 | 3.2 min | smoke, shard 10 |
| `admin-countries.spec.ts` | 18 | 3.1 min | shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `admin-attributes-safety.spec.ts` | 18 | 2.7 min | shard 5 |
| `admin-audit.spec.ts` | 16 | 2.6 min | shard 9 |
| `post-wizard-category.spec.ts` | 52 | 2.6 min | webkit, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `legal-certify.spec.ts` | 44 | 2.3 min | shard 14 |
| `admin-translations-data.spec.ts` | 10 | 2.2 min | shard 5 |
| `admin-shell.spec.ts` | 12 | 2.0 min | shard 2 |
| `sage-tiers.spec.ts` | 52 | 2.0 min | webkit, shard 2 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 11 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.7 min | shard 15 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 10 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `sage-cards.spec.ts` | 40 | 1.0 min | webkit, shard 7 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `house-style.spec.ts` | 18 | 0.8 min | shard 11 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6 |
| `ad-page-doors.spec.ts` | 30 | 0.7 min | shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `post-wizard-details.spec.ts` | 8 | 0.6 min | shard 14 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `settings.spec.ts` | 13 | 0.5 min | shard 1 |
| `auth-caller-gates.spec.ts` | 8 | 0.5 min | shard 5 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `submenu.spec.ts` | 14 | 0.4 min | smoke, shard 15 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 10 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 7 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 2 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `sage-shell.spec.ts` › SGS-6 Sign in is raised (1440, dark) | desktop-1280 | 120.3 s |
| `sage-shell.spec.ts` › SGS-6 Sign in is raised (1440, light) | desktop-1280 | 120.2 s |
| `sage-shell.spec.ts` › SGS-6 Sign in is raised (834, dark) | desktop-1280 | 120.2 s |
| `sage-shell.spec.ts` › SGS-6 Sign in is raised (834, light) | desktop-1280 | 120.2 s |
| `auth-signout.spec.ts` › SO-11 a sign-out whose server cannot be reached still ends the session on this device (DEC-268) | desktop-1280 | 85.1 s |
| `admin-categories-console.spec.ts` › CT-7b browse paths: an unproven factor cannot move a pointer | desktop-1280 | 50.4 s |
| `admin-shell.spec.ts` › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one | desktop-1280 | 50.0 s |
| `viewing-place.spec.ts` › VP-7 another browser opens on the account's place, and signing out there keeps it | desktop-1280 | 47.7 s |
| `feed-screens.spec.ts` › FS-11 signing out keeps the place this browser chose (INC-532) | desktop-1280 | 47.7 s |
| `mfa-stepup.spec.ts` › MF-2 gate: wrong code refused, correct code lets the action through | desktop-1280 | 44.3 s |
| `admin-categories-console.spec.ts` › CT-1 gating: a plain user is refused; the section renders for an admin | desktop-1280 | 42.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.7 s |
| `admin-attributes-library.spec.ts` › AT-1 gating: a plain user is refused; the library renders for an admin | desktop-1280 | 42.6 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 42.0 s |
| `mfa-stepup.spec.ts` › MF-7b cancelling the prompt releases the caller and writes nothing | desktop-1280 | 41.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45534020394-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45534020394-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45534020394-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 3, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45534020394-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 45534020394-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45534020394-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 35 user(s) owned by process 45534020394-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 45534020394-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45534020394-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45534020394-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 45534020394-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 4, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 45534020394-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 45534020394-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45534020394-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45534020394-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45534020394-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45534020394-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 37 (pool 2, fresh 35)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 57 user(s) owned by process 45534020394-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 45534020394-local-16
```

## auth-signout.spec.ts › F1-7d the end of a session › SO-16 a sign-out and a fresh sign-in in one tab, with a second tab open, keep the fresh session (INC-1218) @webkit

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## shell.spec.ts › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out

- Source: `shard 1`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "የሕክምና መሣሪያዎች አቅራቢዎች" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: የሕክምና መሣሪያዎች አቅራቢዎች
      - listitem [ref=e332]:
        - link "የግንባታ መሳሪያዎች" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: የግንባታ መሳሪያዎች
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## shell.spec.ts › U4h device language star › TR-37 the account carries onto a starless device, and (D239) over a star too

- Source: `shard 1`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "የሕክምና መሣሪያዎች አቅራቢዎች" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: የሕክምና መሣሪያዎች አቅራቢዎች
      - listitem [ref=e332]:
        - link "የግንባታ መሳሪያዎች" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: የግንባታ መሳሪያዎች
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
            - listitem [ref=e302]:
              - generic [ref=e303]: Safety
        - navigation "Legal" [ref=e304]:
          - heading "Legal" [level=2] [ref=e305]
          - list [ref=e306]:
            - listitem [ref=e307]:
              - link "Terms" [ref=e308] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e309]:
              - link "Privacy" [ref=e310] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e312]: © 2026 ethio.com — All rights reserved.
  - region "e2e-cat-inh-jtznqi" [ref=e313]:
    - list [ref=e314]:
      - listitem [ref=e315]:
        - link "e2e-cat-inh-jtznqi-child" [ref=e316] [cursor=pointer]:
          - /url: /c/e2e-cat-inh-jtznqi-child
          - img [ref=e318]
          - generic [ref=e322]: e2e-cat-inh-jtznqi-child
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## import-security.spec.ts › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## import-security.spec.ts › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
          - listitem [ref=e293]:
            - generic [ref=e294]: About
          - listitem [ref=e295]:
            - generic [ref=e296]: Contact
      - navigation "Help" [ref=e297]:
        - heading "Help" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - generic [ref=e301]: Safety
      - navigation "Legal" [ref=e302]:
        - heading "Legal" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - link "Terms" [ref=e306] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e307]:
            - link "Privacy" [ref=e308] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e310]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE translations › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## import-security.spec.ts › IMPORT-GATE locations-countries › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## import-security.spec.ts › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## feed-screens.spec.ts › FEED SCREENS › FS-11 signing out keeps the place this browser chose (INC-532)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
            - listitem [ref=e320]:
              - generic [ref=e321]: Safety
        - navigation "Legal" [ref=e322]:
          - heading "Legal" [level=2] [ref=e323]
          - list [ref=e324]:
            - listitem [ref=e325]:
              - link "Terms" [ref=e326] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e327]:
              - link "Privacy" [ref=e328] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e330]: © 2026 ethio.com — All rights reserved.
  - region "e2e-post-local-5-3-6eyr63" [ref=e331]:
    - list [ref=e332]:
      - listitem [ref=e333]:
        - link "e2e-post-local-5-3-2wxujk" [ref=e334] [cursor=pointer]:
          - /url: /c/e2e-post-local-5-3-2wxujk
          - img [ref=e336]
          - generic [ref=e340]: e2e-post-local-5-3-2wxujk
```
```

## admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
            - listitem [ref=e770]:
              - generic [ref=e771]: Safety
        - navigation "Legal" [ref=e772]:
          - heading "Legal" [level=2] [ref=e773]
          - list [ref=e774]:
            - listitem [ref=e775]:
              - link "Terms" [ref=e776] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e777]:
              - link "Privacy" [ref=e778] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e780]: © 2026 ethio.com — All rights reserved.
  - region "e2e-post-local-6-0-opq6sa" [ref=e781]:
    - list [ref=e782]:
      - listitem [ref=e783]:
        - link "e2e-post-local-6-0-u4lq6c" [ref=e784] [cursor=pointer]:
          - /url: /c/e2e-post-local-6-0-u4lq6c
          - img [ref=e786]
          - generic [ref=e790]: e2e-post-local-6-0-u4lq6c
```
```

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
          - listitem [ref=e294]:
            - generic [ref=e295]: About
          - listitem [ref=e296]:
            - generic [ref=e297]: Contact
      - navigation "Help" [ref=e298]:
        - heading "Help" [level=2] [ref=e299]
        - list [ref=e300]:
          - listitem [ref=e301]:
            - generic [ref=e302]: Safety
      - navigation "Legal" [ref=e303]:
        - heading "Legal" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - link "Terms" [ref=e307] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e308]:
            - link "Privacy" [ref=e309] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e311]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-1 Legal cards, facts and the permission-gated admin menu

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## legal-admin.spec.ts › Admin Legal › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
          - listitem [ref=e293]:
            - generic [ref=e294]: About
          - listitem [ref=e295]:
            - generic [ref=e296]: Contact
      - navigation "Help" [ref=e297]:
        - heading "Help" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - generic [ref=e301]: Safety
      - navigation "Legal" [ref=e302]:
        - heading "Legal" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - link "Terms" [ref=e306] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e307]:
            - link "Privacy" [ref=e308] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e310]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-6 the active-session check runs for staff only, never on a member's page

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## auth-signout.spec.ts › U0j sign-out hard reset › SO-1 admin: one click signs out and resets to the marketplace

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## auth-signout.spec.ts › U0j sign-out hard reset › SO-2 settings: confirmed sign-out empties the gated surface

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## auth-signout.spec.ts › U0j sign-out hard reset › SO-4 signed-out marketplace carries no gated UI

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## auth-signout.spec.ts › U0j sign-out hard reset › SO-11 a sign-out whose server cannot be reached still ends the session on this device (DEC-268)

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


  200 |     }
  201 |     await expect(page).toHaveURL(/\/$/, { timeout: 60_000 });
> 202 |     await expect(signInMarker(page)).toBeVisible({ timeout: 15_000 });
      |                                      ^
  203 |     await expect(page.getByTestId("account-menu")).toHaveCount(0);
  204 |     expect(await sessionsIn(page), "no project's stored session is left on this device").toEqual(
  205 |       [],
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:202:38
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## auth-signout.spec.ts › U0j sign-out hard reset › SO-12 an offline sign-out keeps the site on screen, signed out, and loads it afresh when the connection returns (DEC-271)

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


  237 |     }
  238 |     // The site stays on screen, signed out — not the browser's own "cannot open" page.
> 239 |     await expect(signInMarker(page)).toBeVisible({ timeout: 15_000 });
      |                                      ^
  240 |     await expect(page.getByTestId("account-menu")).toHaveCount(0);
  241 |     await expect(page).toHaveURL(/\/$/);
  242 |     expect(loads, "no load is tried while offline").toBe(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:239:38
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## auth-signout.spec.ts › U0j sign-out hard reset › SO-13 an offline sign-out from a page opened directly lands on a working Home page (DEC-279, INC-930)

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('header a[href="/auth"]')


  303 |     await expect(page.getByTestId("feed-container")).toBeVisible({ timeout: 15_000 });
  304 |     await expect(page.getByTestId("route-error-refresh")).toHaveCount(0);
> 305 |     await expect(signInMarker(page)).toBeVisible();
      |                                      ^
  306 |     await expect(page.getByTestId("account-menu")).toHaveCount(0);
  307 |     expect(loads, "no load is tried while offline").toBe(0);
  308 |     expect(await sessionsIn(page), "no project's stored session is left on this device").toEqual(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:305:38
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## auth-signout.spec.ts › U0k session policy › SP-4 cross-tab: signing out in one tab evacuates the other

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## auth-signout.spec.ts › F1-7d the end of a session › SO-14 a refresh the server refuses ends the session once: the notice offers sign-in, nothing says it could not be loaded, and the sign-in after it sticks (INC-1218)

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('header a[href="/auth"]')


  785 |       timeout: 45_000,
  786 |     });
> 787 |     await expect(signInMarker(page)).toBeVisible();
      |                                      ^
  788 |     await expect(signedInMarker(page)).toHaveCount(0);
  789 |     expect(await loadFailedTextsOn(page), "the end showed a could-not-be-loaded message").toEqual(
  790 |       [],
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:787:38
```

Context:

```text
            - listitem [ref=e288]:
              - generic [ref=e289]: About
            - listitem [ref=e290]:
              - generic [ref=e291]: Contact
        - navigation "Help" [ref=e292]:
          - heading "Help" [level=2] [ref=e293]
          - list [ref=e294]:
            - listitem [ref=e295]:
              - generic [ref=e296]: Safety
        - navigation "Legal" [ref=e297]:
          - heading "Legal" [level=2] [ref=e298]
          - list [ref=e299]:
            - listitem [ref=e300]:
              - link "Terms" [ref=e301] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e302]:
              - link "Privacy" [ref=e303] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## auth-signout.spec.ts › F1-7d the end of a session › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218)

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('header a[href="/auth"]')


  821 |       timeout: 45_000,
  822 |     });
> 823 |     await expect(signInMarker(page)).toBeVisible();
      |                                      ^
  824 |     expect(await loadFailedTextsOn(page), "the end showed a could-not-be-loaded message").toEqual(
  825 |       [],
  826 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:823:38
```

Context:

```text
            - listitem [ref=e288]:
              - generic [ref=e289]: About
            - listitem [ref=e290]:
              - generic [ref=e291]: Contact
        - navigation "Help" [ref=e292]:
          - heading "Help" [level=2] [ref=e293]
          - list [ref=e294]:
            - listitem [ref=e295]:
              - generic [ref=e296]: Safety
        - navigation "Legal" [ref=e297]:
          - heading "Legal" [level=2] [ref=e298]
          - list [ref=e299]:
            - listitem [ref=e300]:
              - link "Terms" [ref=e301] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e302]:
              - link "Privacy" [ref=e303] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## auth-signout.spec.ts › F1-7d the end of a session › SO-16 a sign-out and a fresh sign-in in one tab, with a second tab open, keep the fresh session (INC-1218) @webkit

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
            - listitem [ref=e312]:
              - generic [ref=e313]: Safety
        - navigation "Legal" [ref=e314]:
          - heading "Legal" [level=2] [ref=e315]
          - list [ref=e316]:
            - listitem [ref=e317]:
              - link "Terms" [ref=e318] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e319]:
              - link "Privacy" [ref=e320] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e322]: © 2026 ethio.com — All rights reserved.
  - region "e2e-post-local-10-3-jvcjwd" [ref=e323]:
    - list [ref=e324]:
      - listitem [ref=e325]:
        - link "e2e-post-local-10-3-u5yvwr" [ref=e326] [cursor=pointer]:
          - /url: /c/e2e-post-local-10-3-u5yvwr
          - img [ref=e328]
          - generic [ref=e332]: e2e-post-local-10-3-u5yvwr
```
```

## i18n-sign-in-language.spec.ts › D239 — the account's language at sign-in › D239-E5 sign-out keeps the current language

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "የሕክምና መሣሪያዎች አቅራቢዎች" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: የሕክምና መሣሪያዎች አቅራቢዎች
      - listitem [ref=e332]:
        - link "የግንባታ መሳሪያዎች" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: የግንባታ መሳሪያዎች
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## mfa-stepup.spec.ts › INC-1234 one step-up, one prompt › MF-9 one code covers a category's creation and its picture step

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-7 another browser opens on the account's place, and signing out there keeps it

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e342] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e344]
          - generic [ref=e349]: Medical Equipment
      - listitem [ref=e350]:
        - link "Tools & Site Machinery" [ref=e351] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e353]
          - generic [ref=e360]: Tools & Site Machinery
      - listitem [ref=e361]:
        - link "Industrial Machinery" [ref=e362] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e364]
          - generic [ref=e367]: Industrial Machinery
      - listitem [ref=e368]:
        - link "Other Commercial Equipment" [ref=e369] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e371]
          - generic [ref=e376]: Other Commercial Equipment
```
```

## admin-users.spec.ts › U1 admin users › AU-1 permission: moderator is refused, admin sees the list

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')

--- further error 1 ---
Error: sign-in affordance never returned after sign-out

expect(locator).toBeVisible() failed

Locator: locator('header a[href="/auth"]')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in affordance never returned after sign-out with timeout 15000ms
  - waiting for locator('header a[href="/auth"]')


   at helpers/ui.ts:503

  501 |     ? page.getByRole("link", { name: labels.signIn })
  502 |     : signInMarker(page);
> 503 |   await expect(signInLink, "sign-in affordance never returned after sign-out").toBeVisible({
      |                                                                                ^
```

Context:

```text
        - link "Medical Equipment" [ref=e324] [cursor=pointer]:
          - /url: /c/medical-equipment
          - img [ref=e326]
          - generic [ref=e331]: Medical Equipment
      - listitem [ref=e332]:
        - link "Tools & Site Machinery" [ref=e333] [cursor=pointer]:
          - /url: /c/construction-tools
          - img [ref=e335]
          - generic [ref=e342]: Tools & Site Machinery
      - listitem [ref=e343]:
        - link "Industrial Machinery" [ref=e344] [cursor=pointer]:
          - /url: /c/industrial-equipment
          - img [ref=e346]
          - generic [ref=e349]: Industrial Machinery
      - listitem [ref=e350]:
        - link "Other Commercial Equipment" [ref=e351] [cursor=pointer]:
          - /url: /c/other-commercial-equipment
          - img [ref=e353]
          - generic [ref=e358]: Other Commercial Equipment
```
```

## sage-shell.spec.ts › Sage shell at 834 px, light › SGS-6 Sign in is raised (834, light)

- Source: `shard 16`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.evaluate: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('topbar-controls').locator('a[href="/auth"]')


  51 |
  52 | const style = async (locator: Locator, property: string) => {
> 53 |   const value = await locator.evaluate(
     |                               ^
  54 |     (el, prop) => getComputedStyle(el)[prop as "color"],
  55 |     property,
  56 |   );
    at style (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-shell.spec.ts:53:31)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-shell.spec.ts:214:22
```

Context:

```text
          - listitem [ref=e285]:
            - generic [ref=e286]: About
          - listitem [ref=e287]:
            - generic [ref=e288]: Contact
      - navigation "Help" [ref=e289]:
        - heading "Help" [level=2] [ref=e290]
        - list [ref=e291]:
          - listitem [ref=e292]:
            - generic [ref=e293]: Safety
      - navigation "Legal" [ref=e294]:
        - heading "Legal" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - link "Terms" [ref=e298] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e299]:
            - link "Privacy" [ref=e300] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e302]: © 2026 ethio.com — All rights reserved.
```
```

## sage-shell.spec.ts › Sage shell at 834 px, dark › SGS-6 Sign in is raised (834, dark)

- Source: `shard 16`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.evaluate: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('topbar-controls').locator('a[href="/auth"]')


  51 |
  52 | const style = async (locator: Locator, property: string) => {
> 53 |   const value = await locator.evaluate(
     |                               ^
  54 |     (el, prop) => getComputedStyle(el)[prop as "color"],
  55 |     property,
  56 |   );
    at style (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-shell.spec.ts:53:31)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-shell.spec.ts:214:22
```

Context:

```text
          - listitem [ref=e281]:
            - generic [ref=e282]: About
          - listitem [ref=e283]:
            - generic [ref=e284]: Contact
      - navigation "Help" [ref=e285]:
        - heading "Help" [level=2] [ref=e286]
        - list [ref=e287]:
          - listitem [ref=e288]:
            - generic [ref=e289]: Safety
      - navigation "Legal" [ref=e290]:
        - heading "Legal" [level=2] [ref=e291]
        - list [ref=e292]:
          - listitem [ref=e293]:
            - link "Terms" [ref=e294] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e295]:
            - link "Privacy" [ref=e296] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e298]: © 2026 ethio.com — All rights reserved.
```
```

## sage-shell.spec.ts › Sage shell at 1440 px, light › SGS-6 Sign in is raised (1440, light)

- Source: `shard 16`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.evaluate: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('topbar-controls').locator('a[href="/auth"]')


  51 |
  52 | const style = async (locator: Locator, property: string) => {
> 53 |   const value = await locator.evaluate(
     |                               ^
  54 |     (el, prop) => getComputedStyle(el)[prop as "color"],
  55 |     property,
  56 |   );
    at style (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-shell.spec.ts:53:31)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-shell.spec.ts:214:22
```

Context:

```text
          - listitem [ref=e285]:
            - generic [ref=e286]: About
          - listitem [ref=e287]:
            - generic [ref=e288]: Contact
      - navigation "Help" [ref=e289]:
        - heading "Help" [level=2] [ref=e290]
        - list [ref=e291]:
          - listitem [ref=e292]:
            - generic [ref=e293]: Safety
      - navigation "Legal" [ref=e294]:
        - heading "Legal" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - link "Terms" [ref=e298] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e299]:
            - link "Privacy" [ref=e300] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e302]: © 2026 ethio.com — All rights reserved.
```
```

## sage-shell.spec.ts › Sage shell at 1440 px, dark › SGS-6 Sign in is raised (1440, dark)

- Source: `shard 16`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.evaluate: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('topbar-controls').locator('a[href="/auth"]')


  51 |
  52 | const style = async (locator: Locator, property: string) => {
> 53 |   const value = await locator.evaluate(
     |                               ^
  54 |     (el, prop) => getComputedStyle(el)[prop as "color"],
  55 |     property,
  56 |   );
    at style (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-shell.spec.ts:53:31)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-shell.spec.ts:214:22
```

Context:

```text
          - listitem [ref=e281]:
            - generic [ref=e282]: About
          - listitem [ref=e283]:
            - generic [ref=e284]: Contact
      - navigation "Help" [ref=e285]:
        - heading "Help" [level=2] [ref=e286]
        - list [ref=e287]:
          - listitem [ref=e288]:
            - generic [ref=e289]: Safety
      - navigation "Legal" [ref=e290]:
        - heading "Legal" [level=2] [ref=e291]
        - list [ref=e292]:
          - listitem [ref=e293]:
            - link "Terms" [ref=e294] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e295]:
            - link "Privacy" [ref=e296] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e298]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: webkit

No `[ssr-error]` lines in the `webkit` log (or no log was uploaded).

## Client errors: webkit

No `[client-error]` lines in the `webkit` log (or no log was uploaded).

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: shard 7

No `[ssr-error]` lines in the `shard 7` log (or no log was uploaded).

## Client errors: shard 7

No `[client-error]` lines in the `shard 7` log (or no log was uploaded).

## Server errors: shard 8

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
```

## Client errors: shard 8

No `[client-error]` lines in the `shard 8` log (or no log was uploaded).

## Server errors: shard 9

No `[ssr-error]` lines in the `shard 9` log (or no log was uploaded).

## Client errors: shard 9

```text
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×5
[client-error] console.error: [client-error] reader-failure failed to load: Failed to fetch dynamically imported module: http://127.0.0.1:4173/assets/reader-failure-CDhn6AH8.js
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-D9j9nDvH.js:79:43)
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED ×5
[client-error] console.error: [client-error] reader-failure failed to load: Failed to fetch dynamically imported module: http://127.0.0.1:4173/assets/reader-failure-CDhn6AH8.js
[client-error] console.error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-D9j9nDvH.js:79:43)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 401 () ×2
[client-error] HTTP 400 POST /auth/v1/token ({"code":"refresh_token_not_found","message":"Invalid Refresh Token: Refresh Token Not Found"})
[client-error] HTTP 401 POST /rest/v1/rpc/get_active_impersonation ({"code":"42501","details":null,"hint":null,"message":"permission denied for function get_active_impersonation"}) ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 401 () ×2
[client-error] HTTP 400 POST /auth/v1/token ({"code":"refresh_token_not_found","message":"Invalid Refresh Token: Refresh Token Not Found"})
[client-error] HTTP 401 POST /rest/v1/rpc/get_active_impersonation ({"code":"42501","details":null,"hint":null,"message":"permission denied for function get_active_impersonation"}) ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 401 () ×2
[client-error] HTTP 401 POST /rest/v1/rpc/get_active_impersonation ({"code":"42501","details":null,"hint":null,"message":"permission denied for function get_active_impersonation"}) ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 401 () ×2
[client-error] HTTP 401 POST /rest/v1/rpc/get_active_impersonation ({"code":"42501","details":null,"hint":null,"message":"permission denied for function get_active_impersonation"}) ×2
console.error: [client-error] reader-failure failed to load: Failed to fetch dynamicall...
```

## Server errors: shard 10

No `[ssr-error]` lines in the `shard 10` log (or no log was uploaded).

## Client errors: shard 10

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_move_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "severeRestore", "refusals": [{"reason": "severeRestore"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_move_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "severeRestore", "refusals": [{"reason": "severeRestore"}]})
```

## Server errors: shard 15

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 15

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/admin_set_account_status ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/admin_set_account_status ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
```

## Server errors: shard 16

No `[ssr-error]` lines in the `shard 16` log (or no log was uploaded).

## Client errors: shard 16

```text
[client-error] console.error: [client-error] gate fetch threw ×5
console.error: [client-error] gate fetch threw ×5
```
