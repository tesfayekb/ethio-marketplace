# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43591785189
- Commit: `698483b75991cb70fea2c02af7fd1f4617fdb03d`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-14T12:03:22.833Z
- Passed: 2528 · Skipped: 360 · Failed: 18
- Gating failures: 18 · Quarantined (@global-state, INC-117, non-gating): 0
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
| smoke | 2026-11-14T11:51:59.514Z | 3.7 min |
| email | 2026-11-14T11:52:10.947Z | 0.3 min |
| webkit | 2026-11-14T11:52:57.968Z | 10.0 min |
| shard 1 | 2026-11-14T11:52:59.166Z | 6.1 min |
| shard 2 | 2026-11-14T11:51:55.884Z | 5.3 min |
| shard 3 | 2026-11-14T11:52:19.020Z | 6.2 min |
| shard 4 | 2026-11-14T11:52:10.342Z | 6.0 min |
| shard 5 | 2026-11-14T11:52:07.375Z | 6.3 min |
| shard 6 | 2026-11-14T11:52:48.103Z | 7.0 min |
| shard 7 | 2026-11-14T11:51:55.261Z | 5.6 min |
| shard 8 | 2026-11-14T11:51:41.890Z | 5.6 min |
| shard 9 | 2026-11-14T11:53:24.930Z | 6.8 min |
| shard 10 | 2026-11-14T11:51:58.774Z | 5.3 min |
| shard 11 | 2026-11-14T11:52:08.180Z | 6.3 min |
| shard 12 | 2026-11-14T11:52:25.242Z | 6.9 min |
| shard 13 | 2026-11-14T11:54:52.243Z | 5.9 min |
| shard 14 | 2026-11-14T11:55:36.043Z | 5.8 min |
| shard 15 | 2026-11-14T11:52:26.945Z | 7.1 min |
| shard 16 | 2026-11-14T11:53:37.474Z | 5.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.5 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 5.6 min | shard 2 |
| `ad-page.spec.ts` | 104 | 5.5 min | webkit, shard 13 |
| `admin-locations.spec.ts` | 38 | 5.4 min | shard 6 |
| `admin-listings.spec.ts` | 78 | 5.4 min | webkit, shard 10 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.4 min | shard 3 |
| `import-security.spec.ts` | 36 | 5.4 min | shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 5.2 min | shard 12 |
| `admin-roles.spec.ts` | 28 | 5.1 min | shard 9 |
| `post-wizard-place.spec.ts` | 40 | 4.9 min | shard 11 |
| `admin-screening.spec.ts` | 58 | 4.9 min | webkit, shard 14 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `admin-attributes-links.spec.ts` | 34 | 4.5 min | shard 13 |
| `admin-categories-console.spec.ts` | 34 | 4.5 min | shard 7 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.4 min | shard 15 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 15 |
| `photo-pipeline.spec.ts` | 74 | 4.0 min | webkit, shard 16 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 11 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `auth-signout.spec.ts` | 36 | 3.6 min | shard 9 |
| `my-listings-ad.spec.ts` | 38 | 3.6 min | shard 12 |
| `admin-attributes-editor.spec.ts` | 36 | 3.5 min | shard 14 |
| `admin-monetisation.spec.ts` | 34 | 3.4 min | smoke, shard 10 |
| `sage-bands.spec.ts` | 76 | 3.4 min | shard 6 |
| `admin-translations-governance.spec.ts` | 20 | 3.2 min | smoke, shard 16 |
| `dialogs.spec.ts` | 20 | 3.0 min | webkit, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 8 |
| `post-wizard-category.spec.ts` | 52 | 2.9 min | webkit, shard 4 |
| `choice-lists.spec.ts` | 96 | 2.7 min | shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.6 min | shard 3 |
| `admin-countries.spec.ts` | 18 | 2.6 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 2.5 min | shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `sage-ad-page.spec.ts` | 30 | 2.3 min | webkit, shard 11 |
| `mfa-stepup.spec.ts` | 22 | 2.3 min | webkit, shard 15 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 2 |
| `legal-admin.spec.ts` | 44 | 2.1 min | shard 7 |
| `admin-audit.spec.ts` | 16 | 2.1 min | shard 9 |
| `legal-certify.spec.ts` | 44 | 1.8 min | shard 14 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 2 |
| `admin-attributes-import.spec.ts` | 40 | 1.5 min | shard 8 |
| `press.spec.ts` | 22 | 1.3 min | shard 12 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.2 min | shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 3 |
| `user-guides.spec.ts` | 18 | 1.1 min | shard 13 |
| `name-check-queue.spec.ts` | 8 | 1.1 min | smoke, shard 9 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.0 min | shard 15 |
| `my-listings-page.spec.ts` | 20 | 1.0 min | webkit, shard 10 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `posting-routes-dials.spec.ts` | 14 | 0.8 min | shard 9 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6 |
| `legal-doors.spec.ts` | 34 | 0.7 min | smoke, shard 8 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 4 |
| `ad-page-doors.spec.ts` | 30 | 0.6 min | shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `supabase-door.spec.ts` | 12 | 0.6 min | shard 13 |
| `layout.spec.ts` | 18 | 0.6 min | webkit, shard 10 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `submenu.spec.ts` | 14 | 0.4 min | shard 15 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `legal-accept.spec.ts` | 12 | 0.3 min | shard 2 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 8 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.8 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 39.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.4 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 36.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.6 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-1280 | 33.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 31.0 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43591785189-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43591785189-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 43591785189-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43591785189-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 43591785189-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43591785189-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 43591785189-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 43591785189-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43591785189-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43591785189-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 3, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 43591785189-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 43591785189-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43591785189-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43591785189-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43591785189-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43591785189-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 43591785189-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 43591785189-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 43591785189-local-16
```

## admin-translations-data.spec.ts › TR-42 answer-option translations (DEC-233) › TR-42 the Data scope saves and approves an answer option, excluding switched-off options and Amharic (INC-820)

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown entity"
Received: "unknownEntity"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown entity"
Received: "unknownEntity"

  788 |       { id, fence },
  789 |     );
> 790 |     expect(refusal).toBe("unknown entity");
      |                     ^
  791 |     const optionListCount = async (language: string) => {
  792 |       const rows = await inBrowserClient(
  793 |         page,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-data.spec.ts:790:21
```

Context:

```text
          - listitem [ref=e380]:
            - generic [ref=e381]: About
          - listitem [ref=e382]:
            - generic [ref=e383]: Contact
      - navigation "Help" [ref=e384]:
        - heading "Help" [level=2] [ref=e385]
        - list [ref=e386]:
          - listitem [ref=e387]:
            - generic [ref=e388]: Safety
      - navigation "Legal" [ref=e389]:
        - heading "Legal" [level=2] [ref=e390]
        - list [ref=e391]:
          - listitem [ref=e392]:
            - link "Terms" [ref=e393] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e394]:
            - link "Privacy" [ref=e395] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e397]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-data.spec.ts › TR-42 answer-option translations (DEC-233) › TR-42 the Data scope saves and approves an answer option, excluding switched-off options and Amharic (INC-820)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown entity"
Received: "unknownEntity"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown entity"
Received: "unknownEntity"

  788 |       { id, fence },
  789 |     );
> 790 |     expect(refusal).toBe("unknown entity");
      |                     ^
  791 |     const optionListCount = async (language: string) => {
  792 |       const rows = await inBrowserClient(
  793 |         page,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-data.spec.ts:790:21
```

Context:

```text
          - listitem [ref=e369]:
            - generic [ref=e370]: About
          - listitem [ref=e371]:
            - generic [ref=e372]: Contact
      - navigation "Help" [ref=e373]:
        - heading "Help" [level=2] [ref=e374]
        - list [ref=e375]:
          - listitem [ref=e376]:
            - generic [ref=e377]: Safety
      - navigation "Legal" [ref=e378]:
        - heading "Legal" [level=2] [ref=e379]
        - list [ref=e380]:
          - listitem [ref=e381]:
            - link "Terms" [ref=e382] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e383]:
            - link "Privacy" [ref=e384] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e386]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-16 a document's review: its publish counts; Reviewed — no change with a note moves the due date and is audited; a blank note sends nothing; the door refuses a person without legal:edit

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "{\"ok\":false,\"code\":\"P0D01\",\"hint\":null,\"details\":null,\"message\":\"permissionDenied\",\"refusals\":[{\"reason\":\"permissionDenied\"}]}"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "{\"ok\":false,\"code\":\"P0D01\",\"hint\":null,\"details\":null,\"message\":\"permissionDenied\",\"refusals\":[{\"reason\":\"permissionDenied\"}]}"

  781 |     });
  782 |     expect(refused.status).toBeGreaterThanOrEqual(400);
> 783 |     expect(JSON.stringify(refused.body)).toContain("permission denied");
      |                                          ^
  784 |     expect(await reviewRows(id)).toHaveLength(1);
  785 |   });
  786 |   test("LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view reads false", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:783:42
```

Context:

```text
          - listitem [ref=e490]:
            - generic [ref=e491]: About
          - listitem [ref=e492]:
            - generic [ref=e493]: Contact
      - navigation "Help" [ref=e494]:
        - heading "Help" [level=2] [ref=e495]
        - list [ref=e496]:
          - listitem [ref=e497]:
            - generic [ref=e498]: Safety
      - navigation "Legal" [ref=e499]:
        - heading "Legal" [level=2] [ref=e500]
        - list [ref=e501]:
          - listitem [ref=e502]:
            - link "Terms" [ref=e503] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e504]:
            - link "Privacy" [ref=e505] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e507]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view reads false

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: {"code": "P0D01", "details": null, "hint": null, "message": "permissionDenied"}
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: {"code": "P0D01", "details": null, "hint": null, "message": "permissionDenied"}

  857 |     expect((await rpcAs(staff, "legal_review_overdue")).body).toBe(false);
  858 |     const person = await leaseUser();
> 859 |     expect((await rpcAs(person, "legal_review_overdue")).body).toBe(false);
      |                                                                ^
  860 |   });
  861 |   test("LGA-18 INC-812: the account of someone who published a legal version can be deleted; the version keeps its text and loses only the name", async () => {
  862 |     const person = await createUser({ confirmed: true });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:859:64
```

Context:

```text
          - listitem [ref=e490]:
            - generic [ref=e491]: About
          - listitem [ref=e492]:
            - generic [ref=e493]: Contact
      - navigation "Help" [ref=e494]:
        - heading "Help" [level=2] [ref=e495]
        - list [ref=e496]:
          - listitem [ref=e497]:
            - generic [ref=e498]: Safety
      - navigation "Legal" [ref=e499]:
        - heading "Legal" [level=2] [ref=e500]
        - list [ref=e501]:
          - listitem [ref=e502]:
            - link "Terms" [ref=e503] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e504]:
            - link "Privacy" [ref=e505] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e507]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-16 a document's review: its publish counts; Reviewed — no change with a note moves the due date and is audited; a blank note sends nothing; the door refuses a person without legal:edit

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "{\"ok\":false,\"code\":\"P0D01\",\"hint\":null,\"details\":null,\"message\":\"permissionDenied\",\"refusals\":[{\"reason\":\"permissionDenied\"}]}"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "{\"ok\":false,\"code\":\"P0D01\",\"hint\":null,\"details\":null,\"message\":\"permissionDenied\",\"refusals\":[{\"reason\":\"permissionDenied\"}]}"

  781 |     });
  782 |     expect(refused.status).toBeGreaterThanOrEqual(400);
> 783 |     expect(JSON.stringify(refused.body)).toContain("permission denied");
      |                                          ^
  784 |     expect(await reviewRows(id)).toHaveLength(1);
  785 |   });
  786 |   test("LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view reads false", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:783:42
```

Context:

```text
          - listitem [ref=e470]:
            - generic [ref=e471]: About
          - listitem [ref=e472]:
            - generic [ref=e473]: Contact
      - navigation "Help" [ref=e474]:
        - heading "Help" [level=2] [ref=e475]
        - list [ref=e476]:
          - listitem [ref=e477]:
            - generic [ref=e478]: Safety
      - navigation "Legal" [ref=e479]:
        - heading "Legal" [level=2] [ref=e480]
        - list [ref=e481]:
          - listitem [ref=e482]:
            - link "Terms" [ref=e483] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e484]:
            - link "Privacy" [ref=e485] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e487]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view reads false

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: {"code": "P0D01", "details": null, "hint": null, "message": "permissionDenied"}
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: {"code": "P0D01", "details": null, "hint": null, "message": "permissionDenied"}

  857 |     expect((await rpcAs(staff, "legal_review_overdue")).body).toBe(false);
  858 |     const person = await leaseUser();
> 859 |     expect((await rpcAs(person, "legal_review_overdue")).body).toBe(false);
      |                                                                ^
  860 |   });
  861 |   test("LGA-18 INC-812: the account of someone who published a legal version can be deleted; the version keeps its text and loses only the name", async () => {
  862 |     const person = await createUser({ confirmed: true });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:859:64
```

Context:

```text
          - listitem [ref=e470]:
            - generic [ref=e471]: About
          - listitem [ref=e472]:
            - generic [ref=e473]: Contact
      - navigation "Help" [ref=e474]:
        - heading "Help" [level=2] [ref=e475]
        - list [ref=e476]:
          - listitem [ref=e477]:
            - generic [ref=e478]: Safety
      - navigation "Legal" [ref=e479]:
        - heading "Legal" [level=2] [ref=e480]
        - list [ref=e481]:
          - listitem [ref=e482]:
            - link "Terms" [ref=e483] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e484]:
            - link "Privacy" [ref=e485] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e487]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /catalog empty/i
Received string:  "catalogEmpty"
--- further error 1 ---
Error: expect(received).toMatch(expected)

Expected pattern: /catalog empty/i
Received string:  "catalogEmpty"

  279 |         en["admin.translations.syncFirstTooltip"],
  280 |       );
> 281 |       expect(await flipOm()).toMatch(/catalog empty/i);
      |                              ^
  282 |     }
  283 |
  284 |     // Step 2 — ensure NON-empty via this spec's own scratch key.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:281:30
```

Context:

```text
          - listitem [ref=e576]:
            - generic [ref=e577]: About
          - listitem [ref=e578]:
            - generic [ref=e579]: Contact
      - navigation "Help" [ref=e580]:
        - heading "Help" [level=2] [ref=e581]
        - list [ref=e582]:
          - listitem [ref=e583]:
            - generic [ref=e584]: Safety
      - navigation "Legal" [ref=e585]:
        - heading "Legal" [level=2] [ref=e586]
        - list [ref=e587]:
          - listitem [ref=e588]:
            - link "Terms" [ref=e589] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e590]:
            - link "Privacy" [ref=e591] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e593]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /not fully approved/i
Received string:  "notFullyApproved:3456"
--- further error 1 ---
Error: expect(received).toMatch(expected)

Expected pattern: /not fully approved/i
Received string:  "notFullyApproved:3456"

  289 |       await expect(publicSwitch).toBeDisabled();
  290 |       await expect(surfaceControl(page, "lang-public-gate-om")).toBeVisible();
> 291 |       expect(await flipOm()).toMatch(/not fully approved/i);
      |                              ^
  292 |     } finally {
  293 |       await reapScratchKey(key);
  294 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:291:30
```

Context:

```text
          - listitem [ref=e551]:
            - generic [ref=e552]: About
          - listitem [ref=e553]:
            - generic [ref=e554]: Contact
      - navigation "Help" [ref=e555]:
        - heading "Help" [level=2] [ref=e556]
        - list [ref=e557]:
          - listitem [ref=e558]:
            - generic [ref=e559]: Safety
      - navigation "Legal" [ref=e560]:
        - heading "Legal" [level=2] [ref=e561]
        - list [ref=e562]:
          - listitem [ref=e563]:
            - link "Terms" [ref=e564] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e565]:
            - link "Privacy" [ref=e566] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e568]: © 2026 ethio.com — All rights reserved.
```
```

## legal-doors.spec.ts › Legal doors › LG-2 publish and draft refusals: plain user, admin by role, stale second factor, and every content rule

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: plain user is refused the draft door

expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"
--- further error 1 ---
Error: plain user is refused the draft door

expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"

  283 |     ] as const) {
  284 |       const refused = await caller.rpc("admin_save_legal_draft", save);
> 285 |       expect(refused.error, `${who} is refused the draft door`).toContain("permission denied");
      |                                                                 ^
  286 |       const publishRefused = await caller.rpc("admin_publish_legal_version", {
  287 |         p_version_id: fixture.publishedId,
  288 |         p_material: false,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:285:65
```

Context: context file not found for `legal-doors-Legal-doors-LG-2-publish-and-draft-refusals-plain-user-admin-by-role-stale-second-factor-and-every-content-rule-mobile-360` — Playwright's name `legal-doors-Legal-doors-LG-9f099-ctor-and-every-content-rule-mobile-360`; this run carried 24 context file(s); of the same spec: `legal-doors-Legal-doors-LG-ddfc0-notice-door-is-service-only-desktop-1280-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360`, `legal-doors-Legal-doors-LG-ddfc0-notice-door-is-service-only-mobile-360-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360-retry1`

## legal-doors.spec.ts › Legal doors › LG-6 the settings doors: the seeded row for the super admin, refusals for every lesser caller and every bad value; the row is never written

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: plain user is refused the settings read

expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"
--- further error 1 ---
Error: plain user is refused the settings read

expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"

  707 |     ] as const) {
  708 |       const refused = await caller.rpc("admin_legal_settings");
> 709 |       expect(refused.error, `${who} is refused the settings read`).toContain("permission denied");
      |                                                                    ^
  710 |       const writeRefused = await caller.rpc("admin_set_legal_settings", {
  711 |         p_settings: { notice_days: 14 },
  712 |       });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:709:68
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - link "Terms" [ref=e268] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e269]:
            - link "Privacy" [ref=e270] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## legal-doors.spec.ts › Legal doors › LG-7 admin_user_legal_history shows staff the person's acceptances and legal e-mails, newest first; refused for a plain user; the notice door is service-only

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: a plain user is refused the staff history

expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"
--- further error 1 ---
Error: a plain user is refused the staff history

expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"

  811 |
  812 |     const plainRefused = await caller.rpc("admin_user_legal_history", { p_user_id: person.id });
> 813 |     expect(plainRefused.error, "a plain user is refused the staff history").toContain(
      |                                                                             ^
  814 |       "permission denied",
  815 |     );
  816 |     const asAdmin = await asPerson(admin);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:813:77
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - link "Terms" [ref=e268] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e269]:
            - link "Privacy" [ref=e270] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## legal-doors.spec.ts › Legal doors › LG-9 the staff reads: admin_legal_documents and admin_legal_version refuse every lesser caller; the super admin reads a scratch version whole, its change log included

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Matcher error: received value must not be null nor undefined

Received has value: undefined
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Matcher error: received value must not be null nor undefined

Received has value: undefined

  913 |     // without granting anonymous callers access to either staff function.
  914 |     const missingList = await adminClient().rpc("admin_legal_documents");
> 915 |     expect(missingList.error?.message, "missing caller: staff list").toContain("not authenticated");
      |                                                                      ^
  916 |     const missingVersion = await adminClient().rpc("admin_legal_version", {
  917 |       p_version_id: fixture.publishedId,
  918 |     });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:915:70
```

Context: context file not found for `legal-doors-Legal-doors-LG-9-the-staff-reads-admin_legal_documents-and-admin_legal_version-refuse-every-lesser-caller-the-super-admin-reads-a-scratch-version-whole-its-change-log-included-mobile-360` — Playwright's name `legal-doors-Legal-doors-LG-1267e-ole-its-change-log-included-mobile-360`; this run carried 24 context file(s); of the same spec: `legal-doors-Legal-doors-LG-ddfc0-notice-door-is-service-only-desktop-1280-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360`, `legal-doors-Legal-doors-LG-ddfc0-notice-door-is-service-only-mobile-360-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360-retry1`

## legal-doors.spec.ts › Legal doors › LG-24 admin_export_legal_acceptances: refused for an anonymous caller, a plain user, an admin by role and a stale second factor; the super admin reads a published version's acceptances page by page — account id, time, language, method, home country and the two flags, never a name or e-mail — with one audit row

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"

  1277 |     const anon = await asAnonymous();
  1278 |     for (const caller of [anon, plainCaller, adminCaller]) {
> 1279 |       expect((await caller.rpc("admin_export_legal_acceptances", args)).error).toContain(
       |                                                                                ^
  1280 |         "permission denied",
  1281 |       );
  1282 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:1279:80
```

Context: context file not found for `legal-doors-Legal-doors-LG-24-admin_export_legal_acceptances-refused-for-an-anonymous-caller-a-plain-user-an-admin-by-role-and-a-stale-second-factor-the-super-admin-reads-a-published-version-s-acceptances-page-by-page-account-id-time-language-method-home-country-and-the-two-flags-never-a-name-or-e-mail-with-one-audit-row-mobile-360` — Playwright's name `legal-doors-Legal-doors-LG-57fce-e-mail-—-with-one-audit-row-mobile-360`; this run carried 24 context file(s); of the same spec: `legal-doors-Legal-doors-LG-ddfc0-notice-door-is-service-only-desktop-1280-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360`, `legal-doors-Legal-doors-LG-ddfc0-notice-door-is-service-only-mobile-360-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360-retry1`

## legal-doors.spec.ts › Legal doors › LG-2 publish and draft refusals: plain user, admin by role, stale second factor, and every content rule

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: plain user is refused the draft door

expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"
--- further error 1 ---
Error: plain user is refused the draft door

expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"

  283 |     ] as const) {
  284 |       const refused = await caller.rpc("admin_save_legal_draft", save);
> 285 |       expect(refused.error, `${who} is refused the draft door`).toContain("permission denied");
      |                                                                 ^
  286 |       const publishRefused = await caller.rpc("admin_publish_legal_version", {
  287 |         p_version_id: fixture.publishedId,
  288 |         p_material: false,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:285:65
```

Context: context file not found for `legal-doors-Legal-doors-LG-2-publish-and-draft-refusals-plain-user-admin-by-role-stale-second-factor-and-every-content-rule-desktop-1280` — Playwright's name `legal-doors-Legal-doors-LG-9f099-ctor-and-every-content-rule-desktop-1280`; this run carried 24 context file(s); of the same spec: `legal-doors-Legal-doors-LG-ddfc0-notice-door-is-service-only-desktop-1280-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360`, `legal-doors-Legal-doors-LG-ddfc0-notice-door-is-service-only-mobile-360-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360-retry1`

## legal-doors.spec.ts › Legal doors › LG-6 the settings doors: the seeded row for the super admin, refusals for every lesser caller and every bad value; the row is never written

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: plain user is refused the settings read

expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"
--- further error 1 ---
Error: plain user is refused the settings read

expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"

  707 |     ] as const) {
  708 |       const refused = await caller.rpc("admin_legal_settings");
> 709 |       expect(refused.error, `${who} is refused the settings read`).toContain("permission denied");
      |                                                                    ^
  710 |       const writeRefused = await caller.rpc("admin_set_legal_settings", {
  711 |         p_settings: { notice_days: 14 },
  712 |       });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:709:68
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - link "Terms" [ref=e344] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e345]:
            - link "Privacy" [ref=e346] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

## legal-doors.spec.ts › Legal doors › LG-7 admin_user_legal_history shows staff the person's acceptances and legal e-mails, newest first; refused for a plain user; the notice door is service-only

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: a plain user is refused the staff history

expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"
--- further error 1 ---
Error: a plain user is refused the staff history

expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"

  811 |
  812 |     const plainRefused = await caller.rpc("admin_user_legal_history", { p_user_id: person.id });
> 813 |     expect(plainRefused.error, "a plain user is refused the staff history").toContain(
      |                                                                             ^
  814 |       "permission denied",
  815 |     );
  816 |     const asAdmin = await asPerson(admin);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:813:77
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - link "Terms" [ref=e344] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e345]:
            - link "Privacy" [ref=e346] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

## legal-doors.spec.ts › Legal doors › LG-9 the staff reads: admin_legal_documents and admin_legal_version refuse every lesser caller; the super admin reads a scratch version whole, its change log included

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Matcher error: received value must not be null nor undefined

Received has value: undefined
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Matcher error: received value must not be null nor undefined

Received has value: undefined

  913 |     // without granting anonymous callers access to either staff function.
  914 |     const missingList = await adminClient().rpc("admin_legal_documents");
> 915 |     expect(missingList.error?.message, "missing caller: staff list").toContain("not authenticated");
      |                                                                      ^
  916 |     const missingVersion = await adminClient().rpc("admin_legal_version", {
  917 |       p_version_id: fixture.publishedId,
  918 |     });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:915:70
```

Context: context file not found for `legal-doors-Legal-doors-LG-9-the-staff-reads-admin_legal_documents-and-admin_legal_version-refuse-every-lesser-caller-the-super-admin-reads-a-scratch-version-whole-its-change-log-included-desktop-1280` — Playwright's name `legal-doors-Legal-doors-LG-1267e-ole-its-change-log-included-desktop-1280`; this run carried 24 context file(s); of the same spec: `legal-doors-Legal-doors-LG-ddfc0-notice-door-is-service-only-desktop-1280-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360`, `legal-doors-Legal-doors-LG-ddfc0-notice-door-is-service-only-mobile-360-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360-retry1`

## legal-doors.spec.ts › Legal doors › LG-24 admin_export_legal_acceptances: refused for an anonymous caller, a plain user, an admin by role and a stale second factor; the super admin reads a published version's acceptances page by page — account id, time, language, method, home country and the two flags, never a name or e-mail — with one audit row

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"

  1277 |     const anon = await asAnonymous();
  1278 |     for (const caller of [anon, plainCaller, adminCaller]) {
> 1279 |       expect((await caller.rpc("admin_export_legal_acceptances", args)).error).toContain(
       |                                                                                ^
  1280 |         "permission denied",
  1281 |       );
  1282 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:1279:80
```

Context: context file not found for `legal-doors-Legal-doors-LG-24-admin_export_legal_acceptances-refused-for-an-anonymous-caller-a-plain-user-an-admin-by-role-and-a-stale-second-factor-the-super-admin-reads-a-published-version-s-acceptances-page-by-page-account-id-time-language-method-home-country-and-the-two-flags-never-a-name-or-e-mail-with-one-audit-row-desktop-1280` — Playwright's name `legal-doors-Legal-doors-LG-57fce-e-mail-—-with-one-audit-row-desktop-1280`; this run carried 24 context file(s); of the same spec: `legal-doors-Legal-doors-LG-ddfc0-notice-door-is-service-only-desktop-1280-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360`, `legal-doors-Legal-doors-LG-ddfc0-notice-door-is-service-only-mobile-360-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360-retry1`

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_entity_translation ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "unknownEntity", "refusals": [{"reason": "unknownEntity"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_entity_translation ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "unknownEntity", "refusals": [{"reason": "unknownEntity"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_entity_translation ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "unknownEntity", "refusals": [{"reason": "unknownEntity"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_entity_translation ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "unknownEntity", "refusals": [{"reason": "unknownEntity"}]})
```

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

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "catalogEmpty", "refusals": [{"reason": "catalogEmpty"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "catalogEmpty", "refusals": [{"reason": "catalogEmpty"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notFullyApproved:3456", "refusals": [{"detail": "3456", "reason": "notFullyApproved"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notFullyApproved:3456", "refusals": [{"detail": "3456", "reason": "notFullyApproved"}]})
```
