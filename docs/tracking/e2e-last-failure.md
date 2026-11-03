# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41589975179
- Commit: `610250df68ecf4aa58374cbc80347bed6bbde842`
- Attempt: 1
- Written (UTC): 2026-11-03T06:49:08.192Z
- Passed: 2558 · Skipped: 402 · Failed: 18
- Gating failures: 18 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

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

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-03T06:30:35.482Z | 14.0 min |
| email | 2026-11-03T06:30:58.493Z | 0.4 min |
| shard 1 | 2026-11-03T06:31:27.080Z | 13.9 min |
| shard 2 | 2026-11-03T06:32:27.743Z | 15.8 min |
| shard 3 | 2026-11-03T06:30:49.050Z | 11.0 min |
| shard 4 | 2026-11-03T06:30:05.544Z | 9.3 min |
| shard 5 | 2026-11-03T06:31:00.673Z | 11.8 min |
| shard 6 | 2026-11-03T06:30:44.863Z | 11.2 min |
| shard 7 | 2026-11-03T06:30:08.243Z | 3.5 min |
| shard 8 | 2026-11-03T06:30:35.723Z | 8.6 min |
| shard 9 | 2026-11-03T06:31:04.681Z | 15.0 min |
| shard 10 | 2026-11-03T06:30:37.330Z | 15.9 min |
| shard 11 | 2026-11-03T06:30:42.743Z | 12.6 min |
| shard 12 | 2026-11-03T06:33:27.515Z | 9.6 min |
| shard 13 | 2026-11-03T06:30:33.683Z | 11.0 min |
| shard 14 | 2026-11-03T06:31:41.471Z | 13.1 min |
| shard 15 | 2026-11-03T06:30:37.031Z | 4.2 min |
| shard 16 | 2026-11-03T06:31:55.748Z | 8.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 20.0 min | smoke, shard 8, shard 16 |
| `auth-signout.spec.ts` | 72 | 6.8 min | smoke, shard 3, shard 11 |
| `admin-attributes-library.spec.ts` | 42 | 5.8 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.6 min | shard 5, shard 13 |
| `post-wizard-specs.spec.ts` | 82 | 4.8 min | shard 6, shard 14 |
| `import-security.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `admin-translations-console.spec.ts` | 44 | 4.7 min | shard 3, shard 11 |
| `admin-listings.spec.ts` | 76 | 4.6 min | shard 2, shard 10 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-categories-console.spec.ts` | 34 | 4.6 min | shard 1, shard 9 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.2 min | shard 6, shard 14 |
| `admin-attributes-links.spec.ts` | 34 | 4.2 min | shard 1, shard 9 |
| `admin-screening.spec.ts` | 54 | 4.1 min | shard 2, shard 10 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `photo-pipeline.spec.ts` | 68 | 3.9 min | shard 5, shard 13 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 3, shard 11 |
| `admin-packages.spec.ts` | 18 | 3.8 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 6, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.6 min | shard 2, shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 3.5 min | shard 1, shard 9 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 5, shard 13 |
| `ad-page.spec.ts` | 78 | 3.3 min | shard 1, shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.3 min | shard 6, shard 14 |
| `choice-lists.spec.ts` | 96 | 3.0 min | shard 3, shard 11 |
| `post-wizard-category.spec.ts` | 48 | 2.8 min | shard 5, shard 13 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 7, shard 15 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 1, shard 9 |
| `post-wizard-resets.spec.ts` | 34 | 2.6 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.6 min | shard 6, shard 14 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.9 min | shard 1, shard 9 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.7 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `dialogs.spec.ts` | 14 | 1.6 min | shard 3, shard 11 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 1, shard 9 |
| `legal-certify.spec.ts` | 42 | 1.4 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 20 | 1.4 min | shard 4, shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.4 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2, shard 11 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `press.spec.ts` | 22 | 1.1 min | shard 7, shard 15 |
| `admin-coverage.spec.ts` | 24 | 1.0 min | shard 2, shard 10 |
| `sage-tiers.spec.ts` | 40 | 1.0 min | shard 7, shard 15 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 5, shard 13 |
| `sage-ad-page.spec.ts` | 18 | 1.0 min | shard 7, shard 15 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 7, shard 15 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 4, shard 12 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `legal-doors.spec.ts` | 34 | 0.5 min | shard 4, shard 12 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 6, shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `one-line-slots.spec.ts` | 10 | 0.5 min | shard 5, shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 13 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 5, shard 13 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 16 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 8, shard 16 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 11 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-packages.spec.ts` › PKG-2 lifecycle: a package is created, edited (days, label), switched off and on through the door; the key is fixed on edit; each save is audited | desktop-1280 | 77.0 s |
| `admin-packages.spec.ts` › PKG-2 lifecycle: a package is created, edited (days, label), switched off and on through the door; the key is fixed on edit; each save is audited | mobile-360 | 76.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 46.6 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 44.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 43.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.8 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.8 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.9 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.8 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.8 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41589975179-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41589975179-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 41589975179-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 41589975179-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 2, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 41589975179-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 34 user(s) owned by process 41589975179-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41589975179-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41589975179-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41589975179-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41589975179-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 41589975179-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 41589975179-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 41589975179-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 34 user(s) owned by process 41589975179-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41589975179-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41589975179-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41589975179-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41589975179-local-16
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-1 gating: a super admin sees the two seeded packages with their tier words; a plain user is refused and has no entry

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pkg] reading the package featured_45 failed: column listing_packages.tier does not exist
--- further error 1 ---
Error: [e2e:pkg] reading the package featured_45 failed: column listing_packages.tier does not exist

  174 |     .eq("key", key)
  175 |     .maybeSingle();
> 176 |   if (error) throw new Error(`[e2e:pkg] reading the package ${key} failed: ${error.message}`);
      |                    ^
  177 |   return data;
  178 | }
  179 |
    at readPackage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:176:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:426:22
```

Context:

```text
          - listitem [ref=e321]:
            - generic [ref=e322]: About
          - listitem [ref=e323]:
            - generic [ref=e324]: Contact
      - navigation "Help" [ref=e325]:
        - heading "Help" [level=2] [ref=e326]
        - list [ref=e327]:
          - listitem [ref=e328]:
            - generic [ref=e329]: Safety
      - navigation "Legal" [ref=e330]:
        - heading "Legal" [level=2] [ref=e331]
        - list [ref=e332]:
          - listitem [ref=e333]:
            - link "Terms" [ref=e334] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e335]:
            - link "Privacy" [ref=e336] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e338]: © 2026 ethio.com — All rights reserved.
```
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-2 lifecycle: a package is created, edited (days, label), switched off and on through the door; the key is fixed on edit; each save is audited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('packages-roster').getByTestId('data-table-cards').getByTestId('package-e2e_pkg_life_local2_2_m-card')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('packages-roster').getByTestId('data-table-cards').getByTestId('package-e2e_pkg_life_local2_2_m-card')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

   at helpers/ui.ts:1180

  1178 |   // The poller IS the wait (no sleep): each tick reads the outcome first, then
  1179 |   // answers the gate once if that is what showed up instead.
> 1180 |   await expect
       |   ^
  1181 |     .poll(
  1182 |       async () => {
  1183 |         if (await reached()) return "outcome";
    at awaitGuardedOutcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1180:3)
```

Context:

```text
        - generic [ref=e21]: Sellers may apply it
      - generic [ref=e22]:
        - checkbox "Extends the ad's lifetime" [checked] [ref=e23]
        - generic [ref=e24]: Extends the ad's lifetime
      - generic [ref=e25]:
        - generic [ref=e26]: Label key
        - textbox "Label key" [ref=e27]: package.e2e_pkg_life_local2_2_m
      - generic [ref=e28]:
        - generic [ref=e29]: Order
        - textbox "Order" [ref=e30]: "77"
      - paragraph [ref=e31]: A package can be switched off, never removed.
      - alert [ref=e32]: That could not be saved.
      - paragraph [ref=e33]: "Reason: Could not find the function public.admin_save_listing_package(p_days, p_enabled, p_extends_lifetime, p_key, p_label_key, p_self_serve, p_sort, p_tier) in the schema cache"
      - generic [ref=e34]:
        - button "Cancel" [ref=e35] [cursor=pointer]
        - button "Save" [ref=e36] [cursor=pointer]
    - button "Close" [ref=e37] [cursor=pointer]:
      - img [ref=e38]
      - generic [ref=e41]: Close
```
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-3 refusal: a reviewer and a coverage editor have no Packages entry, the screen refuses them, and the doors refuse them by name; nothing is written

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PKG-3 the package door did not refuse the reviewer

expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "Could not find the function public.admin_save_listing_package(p_days, p_enabled, p_extends_lifetime, p_key, p_self_serve, p_tier) in the schema cache"
--- further error 1 ---
Error: PKG-3 the package door did not refuse the reviewer

expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "Could not find the function public.admin_save_listing_package(p_days, p_enabled, p_extends_lifetime, p_key, p_self_serve, p_tier) in the schema cache"

  594 |         }),
  595 |         `PKG-3 the package door did not refuse the ${who}`,
> 596 |       ).toBe("permission denied");
      |         ^
  597 |       expect(
  598 |         await doorError(page, "admin_save_package_price", {
  599 |           p_package_key: "featured_45",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:596:9
```

Context:

```text
          - listitem [ref=e148]:
            - generic [ref=e149]: About
          - listitem [ref=e150]:
            - generic [ref=e151]: Contact
      - navigation "Help" [ref=e152]:
        - heading "Help" [level=2] [ref=e153]
        - list [ref=e154]:
          - listitem [ref=e155]:
            - generic [ref=e156]: Safety
      - navigation "Legal" [ref=e157]:
        - heading "Legal" [level=2] [ref=e158]
        - list [ref=e159]:
          - listitem [ref=e160]:
            - link "Terms" [ref=e161] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e162]:
            - link "Privacy" [ref=e163] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e165]: © 2026 ethio.com — All rights reserved.
```
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-4 prices: a free price for every market and three narrower rows are saved through the door; the resolver answers by precedence and NULL where nothing covers

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pkg] seeding e2e_pkg_price_local2_6_m failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
--- further error 1 ---
Error: [e2e:pkg] seeding e2e_pkg_price_local2_6_m failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache

  312 |         sort: 90,
  313 |       });
> 314 |     if (error) throw new Error(`[e2e:pkg] seeding ${key} failed: ${error.message}`);
      |                      ^
  315 |     packages.push(key);
  316 |   }
  317 |
    at seedPackage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:314:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:623:5
```

Context:

```text
          - listitem [ref=e254]:
            - generic [ref=e255]: About
          - listitem [ref=e256]:
            - generic [ref=e257]: Contact
      - navigation "Help" [ref=e258]:
        - heading "Help" [level=2] [ref=e259]
        - list [ref=e260]:
          - listitem [ref=e261]:
            - generic [ref=e262]: Safety
      - navigation "Legal" [ref=e263]:
        - heading "Legal" [level=2] [ref=e264]
        - list [ref=e265]:
          - listitem [ref=e266]:
            - link "Terms" [ref=e267] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e268]:
            - link "Privacy" [ref=e269] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e271]: © 2026 ethio.com — All rights reserved.
```
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-5 windows: a price whose dates overlap another of the same scope is refused by name and nothing is written; an adjacent window saves

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pkg] seeding e2e_pkg_win_local2_8_m failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
--- further error 1 ---
Error: [e2e:pkg] seeding e2e_pkg_win_local2_8_m failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache

  312 |         sort: 90,
  313 |       });
> 314 |     if (error) throw new Error(`[e2e:pkg] seeding ${key} failed: ${error.message}`);
      |                      ^
  315 |     packages.push(key);
  316 |   }
  317 |
    at seedPackage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:314:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:743:5
```

Context:

```text
          - listitem [ref=e254]:
            - generic [ref=e255]: About
          - listitem [ref=e256]:
            - generic [ref=e257]: Contact
      - navigation "Help" [ref=e258]:
        - heading "Help" [level=2] [ref=e259]
        - list [ref=e260]:
          - listitem [ref=e261]:
            - generic [ref=e262]: Safety
      - navigation "Legal" [ref=e263]:
        - heading "Legal" [level=2] [ref=e264]
        - list [ref=e265]:
          - listitem [ref=e266]:
            - link "Terms" [ref=e267] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e268]:
            - link "Privacy" [ref=e269] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e271]: © 2026 ethio.com — All rights reserved.
```
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-6 end: End price sets the end to now; the row stays in the console, the public read no longer lists it, and the resolver answers NULL

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pkg] seeding e2e_pkg_end_local2_10_m failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
--- further error 1 ---
Error: [e2e:pkg] seeding e2e_pkg_end_local2_10_m failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache

  312 |         sort: 90,
  313 |       });
> 314 |     if (error) throw new Error(`[e2e:pkg] seeding ${key} failed: ${error.message}`);
      |                      ^
  315 |     packages.push(key);
  316 |   }
  317 |
    at seedPackage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:314:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:817:5
```

Context:

```text
          - listitem [ref=e254]:
            - generic [ref=e255]: About
          - listitem [ref=e256]:
            - generic [ref=e257]: Contact
      - navigation "Help" [ref=e258]:
        - heading "Help" [level=2] [ref=e259]
        - list [ref=e260]:
          - listitem [ref=e261]:
            - generic [ref=e262]: Safety
      - navigation "Legal" [ref=e263]:
        - heading "Legal" [level=2] [ref=e264]
        - list [ref=e265]:
          - listitem [ref=e266]:
            - link "Terms" [ref=e267] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e268]:
            - link "Privacy" [ref=e269] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e271]: © 2026 ethio.com — All rights reserved.
```
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-7 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pkg] reading the package e2e_pkg_aal_local2_12_m failed: column listing_packages.tier does not exist
--- further error 1 ---
Error: [e2e:pkg] reading the package e2e_pkg_aal_local2_12_m failed: column listing_packages.tier does not exist

  174 |     .eq("key", key)
  175 |     .maybeSingle();
> 176 |   if (error) throw new Error(`[e2e:pkg] reading the package ${key} failed: ${error.message}`);
      |                    ^
  177 |   return data;
  178 | }
  179 |
    at readPackage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:176:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:894:12
```

Context:

```text
        - button: Cancel
        - button: Save
    - button:
      - img
      - generic: Close
  - dialog [ref=e3]:
    - generic [ref=e4]:
      - heading "Two-factor verification required" [level=2] [ref=e5]
      - paragraph [ref=e6]: This action requires two-factor verification. Enter the current code from your authenticator app.
    - generic [ref=e7]:
      - generic [ref=e8]: Six-digit code
      - textbox "Six-digit code" [active] [ref=e9]:
        - /placeholder: "123456"
    - generic [ref=e10]:
      - button "Cancel" [ref=e11] [cursor=pointer]
      - button "Verify and continue" [disabled]
    - button "Close" [ref=e12] [cursor=pointer]:
      - img [ref=e13]
      - generic [ref=e16]: Close
```
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-8 geometry: the screen, its dialogs and the prices table hold at 360 and in Amharic

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pkg] seeding e2e_pkg_geo_local2_14_m failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
--- further error 1 ---
Error: [e2e:pkg] seeding e2e_pkg_geo_local2_14_m failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache

  312 |         sort: 90,
  313 |       });
> 314 |     if (error) throw new Error(`[e2e:pkg] seeding ${key} failed: ${error.message}`);
      |                      ^
  315 |     packages.push(key);
  316 |   }
  317 |
    at seedPackage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:314:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:907:5
```

Context:

```text
          - listitem [ref=e254]:
            - generic [ref=e255]: About
          - listitem [ref=e256]:
            - generic [ref=e257]: Contact
      - navigation "Help" [ref=e258]:
        - heading "Help" [level=2] [ref=e259]
        - list [ref=e260]:
          - listitem [ref=e261]:
            - generic [ref=e262]: Safety
      - navigation "Legal" [ref=e263]:
        - heading "Legal" [level=2] [ref=e264]
        - list [ref=e265]:
          - listitem [ref=e266]:
            - link "Terms" [ref=e267] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e268]:
            - link "Privacy" [ref=e269] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e271]: © 2026 ethio.com — All rights reserved.
```
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-9 the browser roles read enabled packages and valid prices only, by their own columns, never updated_by

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pkg] seeding e2e_pkg_pubon_local2_16_m failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
--- further error 1 ---
Error: [e2e:pkg] seeding e2e_pkg_pubon_local2_16_m failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache

  312 |         sort: 90,
  313 |       });
> 314 |     if (error) throw new Error(`[e2e:pkg] seeding ${key} failed: ${error.message}`);
      |                      ^
  315 |     packages.push(key);
  316 |   }
  317 |
    at seedPackage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:314:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:954:5
```

Context: context file not found for `admin-packages-P-1-Admin-Packages-PKG-9-the-browser-roles-read-enabled-packages-and-valid-prices-only-by-their-own-columns-never-updated_by-mobile-360` — Playwright's name `admin-packages-P-1-Admin-›-90813-wn-columns-never-updated-by-mobile-360`; this run carried 32 context file(s); of the same spec: `admin-packages-P-1-Admin-›-b4ebe-n-edit-each-save-is-audited-mobile-360`, `admin-packages-P-1-Admin-›-f80ac-d-NULL-where-nothing-covers-mobile-360-retry1`, `admin-packages-P-1-Admin-›-a631e-ands-once-the-code-is-given-mobile-360`, `admin-packages-P-1-Admin-›-f2f2a--by-name-nothing-is-written-mobile-360-retry1`, `admin-packages-P-1-Admin-›-a631e-ands-once-the-code-is-given-mobile-360-retry1`

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-1 gating: a super admin sees the two seeded packages with their tier words; a plain user is refused and has no entry

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:pkg] reading the package featured_45 failed: column listing_packages.tier does not exist
--- further error 1 ---
Error: [e2e:pkg] reading the package featured_45 failed: column listing_packages.tier does not exist

  174 |     .eq("key", key)
  175 |     .maybeSingle();
> 176 |   if (error) throw new Error(`[e2e:pkg] reading the package ${key} failed: ${error.message}`);
      |                    ^
  177 |   return data;
  178 | }
  179 |
    at readPackage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:176:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:426:22
```

Context:

```text
          - listitem [ref=e292]:
            - generic [ref=e293]: About
          - listitem [ref=e294]:
            - generic [ref=e295]: Contact
      - navigation "Help" [ref=e296]:
        - heading "Help" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - generic [ref=e300]: Safety
      - navigation "Legal" [ref=e301]:
        - heading "Legal" [level=2] [ref=e302]
        - list [ref=e303]:
          - listitem [ref=e304]:
            - link "Terms" [ref=e305] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e306]:
            - link "Privacy" [ref=e307] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e309]: © 2026 ethio.com — All rights reserved.
```
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-2 lifecycle: a package is created, edited (days, label), switched off and on through the door; the key is fixed on edit; each save is audited

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('packages-roster').getByRole('table').getByTestId('package-e2e_pkg_life_local10_2_d')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('packages-roster').getByRole('table').getByTestId('package-e2e_pkg_life_local10_2_d')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

   at helpers/ui.ts:1180

  1178 |   // The poller IS the wait (no sleep): each tick reads the outcome first, then
  1179 |   // answers the gate once if that is what showed up instead.
> 1180 |   await expect
       |   ^
  1181 |     .poll(
  1182 |       async () => {
  1183 |         if (await reached()) return "outcome";
    at awaitGuardedOutcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1180:3)
```

Context:

```text
        - generic [ref=e21]: Sellers may apply it
      - generic [ref=e22]:
        - checkbox "Extends the ad's lifetime" [checked] [ref=e23]
        - generic [ref=e24]: Extends the ad's lifetime
      - generic [ref=e25]:
        - generic [ref=e26]: Label key
        - textbox "Label key" [ref=e27]: package.e2e_pkg_life_local10_2_d
      - generic [ref=e28]:
        - generic [ref=e29]: Order
        - textbox "Order" [ref=e30]: "77"
      - paragraph [ref=e31]: A package can be switched off, never removed.
      - alert [ref=e32]: That could not be saved.
      - paragraph [ref=e33]: "Reason: Could not find the function public.admin_save_listing_package(p_days, p_enabled, p_extends_lifetime, p_key, p_label_key, p_self_serve, p_sort, p_tier) in the schema cache"
      - generic [ref=e34]:
        - button "Cancel" [ref=e35] [cursor=pointer]
        - button "Save" [ref=e36] [cursor=pointer]
    - button "Close" [ref=e37] [cursor=pointer]:
      - img [ref=e38]
      - generic [ref=e41]: Close
```
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-3 refusal: a reviewer and a coverage editor have no Packages entry, the screen refuses them, and the doors refuse them by name; nothing is written

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: PKG-3 the package door did not refuse the reviewer

expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "Could not find the function public.admin_save_listing_package(p_days, p_enabled, p_extends_lifetime, p_key, p_self_serve, p_tier) in the schema cache"
--- further error 1 ---
Error: PKG-3 the package door did not refuse the reviewer

expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "Could not find the function public.admin_save_listing_package(p_days, p_enabled, p_extends_lifetime, p_key, p_self_serve, p_tier) in the schema cache"

  594 |         }),
  595 |         `PKG-3 the package door did not refuse the ${who}`,
> 596 |       ).toBe("permission denied");
      |         ^
  597 |       expect(
  598 |         await doorError(page, "admin_save_package_price", {
  599 |           p_package_key: "featured_45",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:596:9
```

Context:

```text
          - listitem [ref=e182]:
            - generic [ref=e183]: About
          - listitem [ref=e184]:
            - generic [ref=e185]: Contact
      - navigation "Help" [ref=e186]:
        - heading "Help" [level=2] [ref=e187]
        - list [ref=e188]:
          - listitem [ref=e189]:
            - generic [ref=e190]: Safety
      - navigation "Legal" [ref=e191]:
        - heading "Legal" [level=2] [ref=e192]
        - list [ref=e193]:
          - listitem [ref=e194]:
            - link "Terms" [ref=e195] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e196]:
            - link "Privacy" [ref=e197] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e199]: © 2026 ethio.com — All rights reserved.
```
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-4 prices: a free price for every market and three narrower rows are saved through the door; the resolver answers by precedence and NULL where nothing covers

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:pkg] seeding e2e_pkg_price_local10_6_d failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
--- further error 1 ---
Error: [e2e:pkg] seeding e2e_pkg_price_local10_6_d failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache

  312 |         sort: 90,
  313 |       });
> 314 |     if (error) throw new Error(`[e2e:pkg] seeding ${key} failed: ${error.message}`);
      |                      ^
  315 |     packages.push(key);
  316 |   }
  317 |
    at seedPackage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:314:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:623:5
```

Context:

```text
          - listitem [ref=e330]:
            - generic [ref=e331]: About
          - listitem [ref=e332]:
            - generic [ref=e333]: Contact
      - navigation "Help" [ref=e334]:
        - heading "Help" [level=2] [ref=e335]
        - list [ref=e336]:
          - listitem [ref=e337]:
            - generic [ref=e338]: Safety
      - navigation "Legal" [ref=e339]:
        - heading "Legal" [level=2] [ref=e340]
        - list [ref=e341]:
          - listitem [ref=e342]:
            - link "Terms" [ref=e343] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e344]:
            - link "Privacy" [ref=e345] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e347]: © 2026 ethio.com — All rights reserved.
```
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-5 windows: a price whose dates overlap another of the same scope is refused by name and nothing is written; an adjacent window saves

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:pkg] seeding e2e_pkg_win_local10_8_d failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
--- further error 1 ---
Error: [e2e:pkg] seeding e2e_pkg_win_local10_8_d failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache

  312 |         sort: 90,
  313 |       });
> 314 |     if (error) throw new Error(`[e2e:pkg] seeding ${key} failed: ${error.message}`);
      |                      ^
  315 |     packages.push(key);
  316 |   }
  317 |
    at seedPackage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:314:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:743:5
```

Context:

```text
          - listitem [ref=e330]:
            - generic [ref=e331]: About
          - listitem [ref=e332]:
            - generic [ref=e333]: Contact
      - navigation "Help" [ref=e334]:
        - heading "Help" [level=2] [ref=e335]
        - list [ref=e336]:
          - listitem [ref=e337]:
            - generic [ref=e338]: Safety
      - navigation "Legal" [ref=e339]:
        - heading "Legal" [level=2] [ref=e340]
        - list [ref=e341]:
          - listitem [ref=e342]:
            - link "Terms" [ref=e343] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e344]:
            - link "Privacy" [ref=e345] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e347]: © 2026 ethio.com — All rights reserved.
```
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-6 end: End price sets the end to now; the row stays in the console, the public read no longer lists it, and the resolver answers NULL

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:pkg] seeding e2e_pkg_end_local10_10_d failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
--- further error 1 ---
Error: [e2e:pkg] seeding e2e_pkg_end_local10_10_d failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache

  312 |         sort: 90,
  313 |       });
> 314 |     if (error) throw new Error(`[e2e:pkg] seeding ${key} failed: ${error.message}`);
      |                      ^
  315 |     packages.push(key);
  316 |   }
  317 |
    at seedPackage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:314:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:817:5
```

Context:

```text
          - listitem [ref=e330]:
            - generic [ref=e331]: About
          - listitem [ref=e332]:
            - generic [ref=e333]: Contact
      - navigation "Help" [ref=e334]:
        - heading "Help" [level=2] [ref=e335]
        - list [ref=e336]:
          - listitem [ref=e337]:
            - generic [ref=e338]: Safety
      - navigation "Legal" [ref=e339]:
        - heading "Legal" [level=2] [ref=e340]
        - list [ref=e341]:
          - listitem [ref=e342]:
            - link "Terms" [ref=e343] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e344]:
            - link "Privacy" [ref=e345] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e347]: © 2026 ethio.com — All rights reserved.
```
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-7 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:pkg] reading the package e2e_pkg_aal_local10_12_d failed: column listing_packages.tier does not exist
--- further error 1 ---
Error: [e2e:pkg] reading the package e2e_pkg_aal_local10_12_d failed: column listing_packages.tier does not exist

  174 |     .eq("key", key)
  175 |     .maybeSingle();
> 176 |   if (error) throw new Error(`[e2e:pkg] reading the package ${key} failed: ${error.message}`);
      |                    ^
  177 |   return data;
  178 | }
  179 |
    at readPackage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:176:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:894:12
```

Context:

```text
        - button: Cancel
        - button: Save
    - button:
      - img
      - generic: Close
  - dialog [ref=e3]:
    - generic [ref=e4]:
      - heading "Two-factor verification required" [level=2] [ref=e5]
      - paragraph [ref=e6]: This action requires two-factor verification. Enter the current code from your authenticator app.
    - generic [ref=e7]:
      - generic [ref=e8]: Six-digit code
      - textbox "Six-digit code" [active] [ref=e9]:
        - /placeholder: "123456"
    - generic [ref=e10]:
      - button "Cancel" [ref=e11] [cursor=pointer]
      - button "Verify and continue" [disabled]
    - button "Close" [ref=e12] [cursor=pointer]:
      - img [ref=e13]
      - generic [ref=e16]: Close
```
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-8 geometry: the screen, its dialogs and the prices table hold at 360 and in Amharic

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:pkg] seeding e2e_pkg_geo_local10_14_d failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
--- further error 1 ---
Error: [e2e:pkg] seeding e2e_pkg_geo_local10_14_d failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache

  312 |         sort: 90,
  313 |       });
> 314 |     if (error) throw new Error(`[e2e:pkg] seeding ${key} failed: ${error.message}`);
      |                      ^
  315 |     packages.push(key);
  316 |   }
  317 |
    at seedPackage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:314:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:907:5
```

Context:

```text
          - listitem [ref=e330]:
            - generic [ref=e331]: About
          - listitem [ref=e332]:
            - generic [ref=e333]: Contact
      - navigation "Help" [ref=e334]:
        - heading "Help" [level=2] [ref=e335]
        - list [ref=e336]:
          - listitem [ref=e337]:
            - generic [ref=e338]: Safety
      - navigation "Legal" [ref=e339]:
        - heading "Legal" [level=2] [ref=e340]
        - list [ref=e341]:
          - listitem [ref=e342]:
            - link "Terms" [ref=e343] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e344]:
            - link "Privacy" [ref=e345] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e347]: © 2026 ethio.com — All rights reserved.
```
```

## admin-packages.spec.ts › P-1 Admin › Packages › PKG-9 the browser roles read enabled packages and valid prices only, by their own columns, never updated_by

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:pkg] seeding e2e_pkg_pubon_local10_16_d failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache
--- further error 1 ---
Error: [e2e:pkg] seeding e2e_pkg_pubon_local10_16_d failed: Could not find the 'label_key' column of 'listing_packages' in the schema cache

  312 |         sort: 90,
  313 |       });
> 314 |     if (error) throw new Error(`[e2e:pkg] seeding ${key} failed: ${error.message}`);
      |                      ^
  315 |     packages.push(key);
  316 |   }
  317 |
    at seedPackage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:314:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-packages.spec.ts:954:5
```

Context: context file not found for `admin-packages-P-1-Admin-Packages-PKG-9-the-browser-roles-read-enabled-packages-and-valid-prices-only-by-their-own-columns-never-updated_by-desktop-1280` — Playwright's name `admin-packages-P-1-Admin-›-90813-wn-columns-never-updated-by-desktop-1280`; this run carried 32 context file(s); of the same spec: `admin-packages-P-1-Admin-›-b4ebe-n-edit-each-save-is-audited-mobile-360`, `admin-packages-P-1-Admin-›-f80ac-d-NULL-where-nothing-covers-mobile-360-retry1`, `admin-packages-P-1-Admin-›-a631e-ands-once-the-code-is-given-mobile-360`, `admin-packages-P-1-Admin-›-f2f2a--by-name-nothing-is-written-mobile-360-retry1`, `admin-packages-P-1-Admin-›-a631e-ands-once-the-code-is-given-mobile-360-retry1`

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 2

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] HTTP 400 GET /rest/v1/listing_packages ({"code":"42703","details":null,"hint":null,"message":"column listing_packages.tier does not exist"}) ×4
[client-error] HTTP 404 POST /rest/v1/rpc/admin_save_listing_package ({"code":"PGRST202","details":"Searched for the function public.admin_save_listing_package with parameters p_days, p_enabled, p_extends_lifetime, p_key, p_label_key, p_self_serve, p_sort, p_tier or wit)
[client-error] HTTP 400 GET /rest/v1/listing_packages ({"code":"42703","details":null,"hint":null,"message":"column listing_packages.tier does not exist"}) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 404 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] HTTP 400 GET /rest/v1/listing_packages ({"code":"42703","details":null,"hint":null,"message":"column listing_packages.tier does not exist"}) ×4
[client-error] HTTP 404 POST /rest/v1/rpc/admin_save_listing_package ({"code":"PGRST202","details":"Searched for the function public.admin_save_listing_package with parameters p_days, p_enabled, p_extends_lifetime, p_key, p_label_key, p_self_serve, p_sort, p_tier or wit)
[client-error] HTTP 400 GET /rest/v1/listing_packages ({"code":"42703","details":null,"hint":null,"message":"column listing_packages.tier does not exist"}) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 404 ()
[client-error] HTTP 404 POST /rest/v1/rpc/admin_save_listing_package ({"code":"PGRST202","details":"Searched for the function public.admin_save_listing_package with parameters p_days, p_enabled, p_extends_lifetime, p_key, p_self_serve, p_tier or with a single unnamed js)
[client-error] console.error: Failed to load resource: the server responded with a status of 404 ()
[client-error] HTTP 404 POST /rest/v1/rpc/admin_save_listing_package ({"code":"PGRST202","details":"Searched for the function public.admin_save_listing_package with parameters p_days, p_enabled, p_extends_lifetime, p_key, p_self_serve, p_tier or with a single unnamed js)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] HTTP 400 GET /rest/v1/listing_packages ({"code":"42703","details":null,"hint":null,"message":"column listing_packages.tier does not exist"}) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] HTTP 400 GET /rest/v1/listing_packages ({"code":"42703","details":null,"hint":null,"message":"column listing_packages.tier does not exist"}) ×4
```

## Server errors: shard 10

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 10

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] HTTP 400 GET /rest/v1/listing_packages ({"code":"42703","details":null,"hint":null,"message":"column listing_packages.tier does not exist"}) ×4
[client-error] HTTP 404 POST /rest/v1/rpc/admin_save_listing_package ({"code":"PGRST202","details":"Searched for the function public.admin_save_listing_package with parameters p_days, p_enabled, p_extends_lifetime, p_key, p_label_key, p_self_serve, p_sort, p_tier or wit)
[client-error] HTTP 400 GET /rest/v1/listing_packages ({"code":"42703","details":null,"hint":null,"message":"column listing_packages.tier does not exist"}) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 404 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] HTTP 400 GET /rest/v1/listing_packages ({"code":"42703","details":null,"hint":null,"message":"column listing_packages.tier does not exist"}) ×4
[client-error] HTTP 404 POST /rest/v1/rpc/admin_save_listing_package ({"code":"PGRST202","details":"Searched for the function public.admin_save_listing_package with parameters p_days, p_enabled, p_extends_lifetime, p_key, p_label_key, p_self_serve, p_sort, p_tier or wit)
[client-error] HTTP 400 GET /rest/v1/listing_packages ({"code":"42703","details":null,"hint":null,"message":"column listing_packages.tier does not exist"}) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 404 ()
[client-error] HTTP 404 POST /rest/v1/rpc/admin_save_listing_package ({"code":"PGRST202","details":"Searched for the function public.admin_save_listing_package with parameters p_days, p_enabled, p_extends_lifetime, p_key, p_self_serve, p_tier or with a single unnamed js)
[client-error] console.error: Failed to load resource: the server responded with a status of 404 ()
[client-error] HTTP 404 POST /rest/v1/rpc/admin_save_listing_package ({"code":"PGRST202","details":"Searched for the function public.admin_save_listing_package with parameters p_days, p_enabled, p_extends_lifetime, p_key, p_self_serve, p_tier or with a single unnamed js)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] HTTP 400 GET /rest/v1/listing_packages ({"code":"42703","details":null,"hint":null,"message":"column listing_packages.tier does not exist"}) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
[client-error] HTTP 400 GET /rest/v1/listing_packages ({"code":"42703","details":null,"hint":null,"message":"column listing_packages.tier does not exist"}) ×4
```
