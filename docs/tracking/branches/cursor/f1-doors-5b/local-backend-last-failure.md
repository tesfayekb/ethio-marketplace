# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44017605815
- Commit: `d519d8d5ff7b69ae081c0739c55cec75a6e04be1`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-17T04:45:03.282Z
- Passed: 2528 · Skipped: 360 · Failed: 18
- Gating failures: 18 · STAGING-SINK (INC-1175, still gating): 0
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
| smoke | 2026-11-17T04:35:08.626Z | 3.7 min |
| email | 2026-11-17T04:34:13.269Z | 0.4 min |
| webkit | 2026-11-17T04:33:36.166Z | 6.5 min |
| shard 1 | 2026-11-17T04:33:54.458Z | 5.5 min |
| shard 2 | 2026-11-17T04:34:04.128Z | 6.5 min |
| shard 3 | 2026-11-17T04:34:07.592Z | 7.6 min |
| shard 4 | 2026-11-17T04:33:53.674Z | 6.2 min |
| shard 5 | 2026-11-17T04:33:31.024Z | 6.3 min |
| shard 6 | 2026-11-17T04:33:26.381Z | 5.5 min |
| shard 7 | 2026-11-17T04:33:36.604Z | 5.2 min |
| shard 8 | 2026-11-17T04:34:38.247Z | 5.5 min |
| shard 9 | 2026-11-17T04:34:04.336Z | 5.3 min |
| shard 10 | 2026-11-17T04:33:42.253Z | 5.8 min |
| shard 11 | 2026-11-17T04:34:17.483Z | 5.7 min |
| shard 12 | 2026-11-17T04:33:22.959Z | 5.8 min |
| shard 13 | 2026-11-17T04:34:26.771Z | 7.1 min |
| shard 14 | 2026-11-17T04:37:42.646Z | 5.7 min |
| shard 15 | 2026-11-17T04:36:59.213Z | 6.4 min |
| shard 16 | 2026-11-17T04:34:24.538Z | 6.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.5 min | shard 1 |
| `ad-page.spec.ts` | 104 | 6.7 min | webkit, shard 13 |
| `admin-attributes-library.spec.ts` | 42 | 6.4 min | shard 2 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.3 min | shard 3 |
| `import-security.spec.ts` | 36 | 5.7 min | shard 4 |
| `admin-listings.spec.ts` | 78 | 5.5 min | webkit, shard 10 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `photo-pipeline.spec.ts` | 74 | 4.7 min | webkit, shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 4.6 min | shard 13 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 6 |
| `admin-screening.spec.ts` | 58 | 4.5 min | webkit, shard 14 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 7 |
| `post-wizard-place.spec.ts` | 40 | 4.4 min | shard 11 |
| `admin-roles.spec.ts` | 28 | 4.3 min | shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `admin-users.spec.ts` | 28 | 4.2 min | shard 16 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 15 |
| `admin-monetisation.spec.ts` | 34 | 3.7 min | smoke, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 15 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 3.1 min | shard 3 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `posting-routes.spec.ts` | 80 | 2.9 min | shard 2 |
| `post-wizard-category.spec.ts` | 52 | 2.7 min | webkit, shard 4 |
| `dialogs.spec.ts` | 20 | 2.6 min | webkit, shard 10 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `admin-countries.spec.ts` | 18 | 2.1 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `legal-certify.spec.ts` | 44 | 1.7 min | shard 14 |
| `sage-ad-page.spec.ts` | 30 | 1.7 min | webkit, shard 11 |
| `sage-tiers.spec.ts` | 52 | 1.7 min | webkit, shard 2 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 8 |
| `mfa-stepup.spec.ts` | 22 | 1.7 min | webkit, shard 15 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 9 |
| `admin-guides.spec.ts` | 14 | 1.5 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.5 min | shard 3 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | smoke, webkit, shard 12 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2 |
| `user-guides.spec.ts` | 18 | 1.1 min | shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `my-listings-page.spec.ts` | 20 | 1.0 min | webkit, shard 10 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 13 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 16 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `auth-caller-gates.spec.ts` | 8 | 0.7 min | shard 5 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 3 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `ad-page-doors.spec.ts` | 30 | 0.6 min | shard 14 |
| `supabase-door.spec.ts` | 12 | 0.6 min | shard 13 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 16 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `post-wizard-units.spec.ts` | 4 | 0.4 min | shard 3 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 3 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 46.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 46.1 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 37.2 s |
| `ad-page.spec.ts` › AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart | desktop-1280 | 35.0 s |
| `ad-page.spec.ts` › AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart | mobile-360 | 32.7 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 32.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 31.1 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 31.1 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 44017605815-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44017605815-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 44017605815-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44017605815-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 44017605815-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44017605815-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 44017605815-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 44017605815-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44017605815-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44017605815-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 44017605815-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 44017605815-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44017605815-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44017605815-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44017605815-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44017605815-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 44017605815-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 44017605815-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 44017605815-local-16
```

## auth-caller-gates.spec.ts › CG-1 a deactivated account is refused at the doors that had no gate

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "account is deactivated"
Received string:    "accountDeactivated"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "account is deactivated"
Received string:    "accountDeactivated"

  187 |       ],
  188 |     ] as const)
> 189 |       expect((await caller.rpc(fn, args)).error?.message).toContain(refusal);
      |                                                           ^
  190 |     const after = await admin
  191 |       .from("listings")
  192 |       .select("cover_photo_id")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-caller-gates.spec.ts:189:59
```

Context: context file not found for `auth-caller-gates-CG-1-a-deactivated-account-is-refused-at-the-doors-that-had-no-gate-mobile-360` — Playwright's name `auth-caller-gates-CG-1-a-d-2ee30--the-doors-that-had-no-gate-mobile-360`; this run carried 20 context file(s); of the same spec: none

## auth-caller-gates.spec.ts › CG-1 a deactivated account is refused at the doors that had no gate

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "account is deactivated"
Received string:    "accountDeactivated"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "account is deactivated"
Received string:    "accountDeactivated"

  187 |       ],
  188 |     ] as const)
> 189 |       expect((await caller.rpc(fn, args)).error?.message).toContain(refusal);
      |                                                           ^
  190 |     const after = await admin
  191 |       .from("listings")
  192 |       .select("cover_photo_id")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-caller-gates.spec.ts:189:59
```

Context: context file not found for `auth-caller-gates-CG-1-a-deactivated-account-is-refused-at-the-doors-that-had-no-gate-desktop-1280` — Playwright's name `auth-caller-gates-CG-1-a-d-2ee30--the-doors-that-had-no-gate-desktop-1280`; this run carried 20 context file(s); of the same spec: none

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart

- Source: `shard 13`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('listing-save')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('listing-save')
    14 × locator resolved to 1 element
       - unexpected value "1"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('listing-save')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('listing-save')
    14 × locator resolved to 1 element
       - unexpected value "1"


  567 |       await expect(ownHeart).toHaveAttribute("data-state", "unsaved");
  568 |       await ownHeart.click();
> 569 |       await expect(ownHeart).toHaveCount(0);
      |                              ^
  570 |     } finally {
  571 |       await context.close();
```

Context:

```text
          - listitem [ref=e312]:
            - generic [ref=e313]: About
          - listitem [ref=e314]:
            - generic [ref=e315]: Contact
      - navigation "Help" [ref=e316]:
        - heading "Help" [level=2] [ref=e317]
        - list [ref=e318]:
          - listitem [ref=e319]:
            - generic [ref=e320]: Safety
      - navigation "Legal" [ref=e321]:
        - heading "Legal" [level=2] [ref=e322]
        - list [ref=e323]:
          - listitem [ref=e324]:
            - link "Terms" [ref=e325] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e326]:
            - link "Privacy" [ref=e327] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e329]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-29 Report on the buyer's page: signed out, the link signs in and comes back to #report; signed in, the dialog sends a reason and a note once and thanks; a second report says already reported; the owner's page has no Report

- Source: `shard 13`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-report-status')
Expected: "already"
Received: "failed"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-report-status')
    14 × locator resolved to <p role="status" data-state="failed" class="break-words text-sm" data-testid="listing-report-status">The report was not sent — try again.</p>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-report-status')
Expected: "already"
Received: "failed"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-report-status')
    14 × locator resolved to <p role="status" data-state="failed" class="break-words text-sm" data-testid="listing-report-status">The report was not sent — try again.</p>
       - unexpected value "failed"


  624 |     await page.getByTestId("listing-report-reason-spam").click();
  625 |     await page.getByTestId("listing-report-send").click();
> 626 |     await expect(page.getByTestId("listing-report-status")).toHaveAttribute(
      |                                                             ^
  627 |       "data-state",
  628 |       "already",
```

Context:

```text
        - radio "Already sold" [ref=e27]
        - generic [ref=e28]: Already sold
      - generic [ref=e29] [cursor=pointer]:
        - radio "Someone in it appears to be under 18" [ref=e30]
        - generic [ref=e31]: Someone in it appears to be under 18
      - generic [ref=e32] [cursor=pointer]:
        - radio "Copyright or stolen photos" [ref=e33]
        - generic [ref=e34]: Copyright or stolen photos
      - generic [ref=e35] [cursor=pointer]:
        - radio "Something else" [ref=e36]
        - generic [ref=e37]: Something else
    - generic [ref=e38]: Anything else we should know? (optional)
    - textbox "Anything else we should know? (optional)" [ref=e39]
    - generic [ref=e40]:
      - button "Cancel" [ref=e41] [cursor=pointer]
      - button "Send report" [ref=e42] [cursor=pointer]
    - button "Close" [ref=e43] [cursor=pointer]:
      - img [ref=e44]
      - generic [ref=e47]: Close
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-26 the heart: signed out sign-in return; signed in saves and unsaves with counts; owner sees saves and no heart

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('listing-save')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('listing-save')
    14 × locator resolved to 1 element
       - unexpected value "1"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('listing-save')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('listing-save')
    14 × locator resolved to 1 element
       - unexpected value "1"


  567 |       await expect(ownHeart).toHaveAttribute("data-state", "unsaved");
  568 |       await ownHeart.click();
> 569 |       await expect(ownHeart).toHaveCount(0);
      |                              ^
  570 |     } finally {
  571 |       await context.close();
```

Context:

```text
          - listitem [ref=e389]:
            - generic [ref=e390]: About
          - listitem [ref=e391]:
            - generic [ref=e392]: Contact
      - navigation "Help" [ref=e393]:
        - heading "Help" [level=2] [ref=e394]
        - list [ref=e395]:
          - listitem [ref=e396]:
            - generic [ref=e397]: Safety
      - navigation "Legal" [ref=e398]:
        - heading "Legal" [level=2] [ref=e399]
        - list [ref=e400]:
          - listitem [ref=e401]:
            - link "Terms" [ref=e402] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e403]:
            - link "Privacy" [ref=e404] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e406]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-29 Report on the buyer's page: signed out, the link signs in and comes back to #report; signed in, the dialog sends a reason and a note once and thanks; a second report says already reported; the owner's page has no Report

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-report-status')
Expected: "already"
Received: "failed"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-report-status')
    13 × locator resolved to <p role="status" data-state="failed" class="break-words text-sm" data-testid="listing-report-status">The report was not sent — try again.</p>
       - unexpected value "failed"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('listing-report-status')
Expected: "already"
Received: "failed"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-report-status')
    13 × locator resolved to <p role="status" data-state="failed" class="break-words text-sm" data-testid="listing-report-status">The report was not sent — try again.</p>
       - unexpected value "failed"


  624 |     await page.getByTestId("listing-report-reason-spam").click();
  625 |     await page.getByTestId("listing-report-send").click();
> 626 |     await expect(page.getByTestId("listing-report-status")).toHaveAttribute(
      |                                                             ^
  627 |       "data-state",
  628 |       "already",
```

Context:

```text
        - radio "Already sold" [ref=e27]
        - generic [ref=e28]: Already sold
      - generic [ref=e29] [cursor=pointer]:
        - radio "Someone in it appears to be under 18" [ref=e30]
        - generic [ref=e31]: Someone in it appears to be under 18
      - generic [ref=e32] [cursor=pointer]:
        - radio "Copyright or stolen photos" [ref=e33]
        - generic [ref=e34]: Copyright or stolen photos
      - generic [ref=e35] [cursor=pointer]:
        - radio "Something else" [ref=e36]
        - generic [ref=e37]: Something else
    - generic [ref=e38]: Anything else we should know? (optional)
    - textbox "Anything else we should know? (optional)" [ref=e39]
    - generic [ref=e40]:
      - button "Cancel" [ref=e41] [cursor=pointer]
      - button "Send report" [ref=e42] [cursor=pointer]
    - button "Close" [ref=e43] [cursor=pointer]:
      - img [ref=e44]
      - generic [ref=e47]: Close
```
```

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8)

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(received).toBeNull()

Received: "ownListing"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "ownListing"

  608 |     const owner = await asPerson(seller);
  609 |     const own = await owner.rpc("save_listing", { p_public_id: idA });
> 610 |     expect(own.error).toBeNull();
      |                       ^
  611 |     expect(own.data).toMatchObject({ ok: false, reason: "ownListing" });
  612 |
  613 |     for (const id of [idB, idC]) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:610:23
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-24-Save-by-public-id-a-buyer-saves-once-and-the-count-says-so-the-owner-cannot-save-his-own-ad-unsave-a-sold-ad-within-its-30-days-can-be-saved-anything-not-public-cannot-my_saved_listings-lists-newest-first-and-greys-an-ad-that-left-the-public-D201-8-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-308d3-at-left-the-public-D201-§8--mobile-360`; this run carried 20 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8)

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(received).toBeNull()

Received: "rateLimited"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "rateLimited"

  748 |       expect(secondAd.data).toMatchObject({ ok: true, saved: true });
  749 |       const repeat = await buyer.rpc("save_listing", { p_public_id: idB });
> 750 |       expect(repeat.error).toBeNull();
      |                            ^
  751 |       expect(repeat.data).toMatchObject({ ok: true, saved: true });
  752 |       const adC = await seed(seller);
  753 |       const third = await buyer.rpc("save_listing", { p_public_id: await publicIdOf(adC.id) });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:750:28
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-25-no-client-reads-or-writes-saved_listings-the-save-dial-counts-new-rows-only-D201-8-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-6e5ba-unts-new-rows-only-D201-§8--mobile-360`; this run carried 20 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-27 Report by public id: a buyer reports once with a reason and a note; the owner cannot report his own ad; a reason outside the list and a note over 500 characters are refused; a second open report by the same buyer is alreadyReported; a sold ad within its 30 days can be reported; a draft, an unknown or a malformed id cannot; the report dial counts written rows only

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(received).toBeNull()

Received: "alreadyReported"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "alreadyReported"

  817 |       });
  818 |       const repeat = await report(idA);
> 819 |       expect(repeat.error).toBeNull();
      |                            ^
  820 |       expect(repeat.data).toEqual({ ok: false, reason: "alreadyReported" });
  821 |       expect(await truth()).toHaveLength(1);
  822 |       const owner = await asPerson(seller);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:819:28
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-27-Report-by-public-id-a-buyer-reports-once-with-a-reason-and-a-note-the-owner-cannot-report-his-own-ad-a-reason-outside-the-list-and-a-note-over-500-characters-are-refused-a-second-open-report-by-the-same-buyer-is-alreadyReported-a-sold-ad-within-its-30-days-can-be-reported-a-draft-an-unknown-or-a-malformed-id-cannot-the-report-dial-counts-written-rows-only-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-f974b-al-counts-written-rows-only-mobile-360`; this run carried 20 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: "ownListing"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "ownListing"

  608 |     const owner = await asPerson(seller);
  609 |     const own = await owner.rpc("save_listing", { p_public_id: idA });
> 610 |     expect(own.error).toBeNull();
      |                       ^
  611 |     expect(own.data).toMatchObject({ ok: false, reason: "ownListing" });
  612 |
  613 |     for (const id of [idB, idC]) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:610:23
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-24-Save-by-public-id-a-buyer-saves-once-and-the-count-says-so-the-owner-cannot-save-his-own-ad-unsave-a-sold-ad-within-its-30-days-can-be-saved-anything-not-public-cannot-my_saved_listings-lists-newest-first-and-greys-an-ad-that-left-the-public-D201-8-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-308d3-at-left-the-public-D201-§8--desktop-1280`; this run carried 20 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: "rateLimited"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "rateLimited"

  748 |       expect(secondAd.data).toMatchObject({ ok: true, saved: true });
  749 |       const repeat = await buyer.rpc("save_listing", { p_public_id: idB });
> 750 |       expect(repeat.error).toBeNull();
      |                            ^
  751 |       expect(repeat.data).toMatchObject({ ok: true, saved: true });
  752 |       const adC = await seed(seller);
  753 |       const third = await buyer.rpc("save_listing", { p_public_id: await publicIdOf(adC.id) });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:750:28
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-25-no-client-reads-or-writes-saved_listings-the-save-dial-counts-new-rows-only-D201-8-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-6e5ba-unts-new-rows-only-D201-§8--desktop-1280`; this run carried 20 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-27 Report by public id: a buyer reports once with a reason and a note; the owner cannot report his own ad; a reason outside the list and a note over 500 characters are refused; a second open report by the same buyer is alreadyReported; a sold ad within its 30 days can be reported; a draft, an unknown or a malformed id cannot; the report dial counts written rows only

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: "alreadyReported"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "alreadyReported"

  817 |       });
  818 |       const repeat = await report(idA);
> 819 |       expect(repeat.error).toBeNull();
      |                            ^
  820 |       expect(repeat.data).toEqual({ ok: false, reason: "alreadyReported" });
  821 |       expect(await truth()).toHaveLength(1);
  822 |       const owner = await asPerson(seller);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:819:28
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-27-Report-by-public-id-a-buyer-reports-once-with-a-reason-and-a-note-the-owner-cannot-report-his-own-ad-a-reason-outside-the-list-and-a-note-over-500-characters-are-refused-a-second-open-report-by-the-same-buyer-is-alreadyReported-a-sold-ad-within-its-30-days-can-be-reported-a-draft-an-unknown-or-a-malformed-id-cannot-the-report-dial-counts-written-rows-only-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-f974b-al-counts-written-rows-only-desktop-1280`; this run carried 20 context file(s); of the same spec: none

## legal-certify.spec.ts › Legal certification › LG-20 the contact reveal answers acceptanceRequired to a viewer who owes an acceptance; the owner still sees his own

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(received).toBeNull()

Received: "acceptanceRequired"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "acceptanceRequired"

  784 |     await seedDocument(s, `e2e-acc-${hex(listingId)}`, null, "Terms to accept");
  785 |     const refused = await buyer.rpc("reveal_listing_contact", args);
> 786 |     expect(refused.error).toBeNull();
      |                           ^
  787 |     expect(refused.data).toEqual({ ok: false, reason: "acceptanceRequired" });
  788 |     const owner = await (await asPerson(seller)).rpc("reveal_listing_contact", args);
  789 |     expect(owner.error).toBeNull();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:786:27
```

Context:

```text
          - listitem [ref=e249]:
            - generic [ref=e250]: About
          - listitem [ref=e251]:
            - generic [ref=e252]: Contact
      - navigation "Help" [ref=e253]:
        - heading "Help" [level=2] [ref=e254]
        - list [ref=e255]:
          - listitem [ref=e256]:
            - generic [ref=e257]: Safety
      - navigation "Legal" [ref=e258]:
        - heading "Legal" [level=2] [ref=e259]
        - list [ref=e260]:
          - listitem [ref=e261]:
            - link "Terms" [ref=e262] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e263]:
            - link "Privacy" [ref=e264] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e266]: © 2026 ethio.com — All rights reserved.
```
```

## legal-certify.spec.ts › Legal certification › LG-20 the contact reveal answers acceptanceRequired to a viewer who owes an acceptance; the owner still sees his own

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: "acceptanceRequired"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "acceptanceRequired"

  784 |     await seedDocument(s, `e2e-acc-${hex(listingId)}`, null, "Terms to accept");
  785 |     const refused = await buyer.rpc("reveal_listing_contact", args);
> 786 |     expect(refused.error).toBeNull();
      |                           ^
  787 |     expect(refused.data).toEqual({ ok: false, reason: "acceptanceRequired" });
  788 |     const owner = await (await asPerson(seller)).rpc("reveal_listing_contact", args);
  789 |     expect(owner.error).toBeNull();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:786:27
```

Context:

```text
          - listitem [ref=e364]:
            - generic [ref=e365]: About
          - listitem [ref=e366]:
            - generic [ref=e367]: Contact
      - navigation "Help" [ref=e368]:
        - heading "Help" [level=2] [ref=e369]
        - list [ref=e370]:
          - listitem [ref=e371]:
            - generic [ref=e372]: Safety
      - navigation "Legal" [ref=e373]:
        - heading "Legal" [level=2] [ref=e374]
        - list [ref=e375]:
          - listitem [ref=e376]:
            - link "Terms" [ref=e377] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e378]:
            - link "Privacy" [ref=e379] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e381]: © 2026 ethio.com — All rights reserved.
```
```

## viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-2 a place that is not shown is refused, and the saved place stays

- Source: `shard 15`
- Project: `mobile-360`

```text
Error: {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"placeNotOpen","refusals":[{"reason":"placeNotOpen"}]}

expect(received).toBeNull()

Received: {"code": "P0D01", "details": null, "hint": null, "message": "placeNotOpen", "ok": false, "refusals": [{"reason": "placeNotOpen"}]}
--- further error 1 ---
Error: {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"placeNotOpen","refusals":[{"reason":"placeNotOpen"}]}

expect(received).toBeNull()

Received: {"code": "P0D01", "details": null, "hint": null, "message": "placeNotOpen", "ok": false, "refusals": [{"reason": "placeNotOpen"}]}

  85 |   async function setPlace(own: SupabaseClient, id: string | null): Promise<Answer> {
  86 |     const { data, error } = await own.rpc("user_set_viewing_location", { p_location: id });
> 87 |     expect(error, JSON.stringify(error)).toBeNull();
     |                                          ^
  88 |     return data as Answer;
  89 |   }
  90 |
    at setPlace (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:87:42)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:137:14
```

Context:

```text
          - listitem [ref=e257]:
            - generic [ref=e258]: About
          - listitem [ref=e259]:
            - generic [ref=e260]: Contact
      - navigation "Help" [ref=e261]:
        - heading "Help" [level=2] [ref=e262]
        - list [ref=e263]:
          - listitem [ref=e264]:
            - generic [ref=e265]: Safety
      - navigation "Legal" [ref=e266]:
        - heading "Legal" [level=2] [ref=e267]
        - list [ref=e268]:
          - listitem [ref=e269]:
            - link "Terms" [ref=e270] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e271]:
            - link "Privacy" [ref=e272] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e274]: © 2026 ethio.com — All rights reserved.
```
```

## viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-4 the viewing_place dial refuses the call past the account's limit

- Source: `shard 15`
- Project: `mobile-360`

```text
Error: {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"rateLimited","refusals":[{"reason":"rateLimited"}]}

expect(received).toBeNull()

Received: {"code": "P0D01", "details": null, "hint": null, "message": "rateLimited", "ok": false, "refusals": [{"reason": "rateLimited"}]}
--- further error 1 ---
Error: {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"rateLimited","refusals":[{"reason":"rateLimited"}]}

expect(received).toBeNull()

Received: {"code": "P0D01", "details": null, "hint": null, "message": "rateLimited", "ok": false, "refusals": [{"reason": "rateLimited"}]}

  85 |   async function setPlace(own: SupabaseClient, id: string | null): Promise<Answer> {
  86 |     const { data, error } = await own.rpc("user_set_viewing_location", { p_location: id });
> 87 |     expect(error, JSON.stringify(error)).toBeNull();
     |                                          ^
  88 |     return data as Answer;
  89 |   }
  90 |
    at setPlace (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:87:42)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:175:19
```

Context:

```text
          - listitem [ref=e265]:
            - generic [ref=e266]: About
          - listitem [ref=e267]:
            - generic [ref=e268]: Contact
      - navigation "Help" [ref=e269]:
        - heading "Help" [level=2] [ref=e270]
        - list [ref=e271]:
          - listitem [ref=e272]:
            - generic [ref=e273]: Safety
      - navigation "Legal" [ref=e274]:
        - heading "Legal" [level=2] [ref=e275]
        - list [ref=e276]:
          - listitem [ref=e277]:
            - link "Terms" [ref=e278] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e279]:
            - link "Privacy" [ref=e280] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e282]: © 2026 ethio.com — All rights reserved.
```
```

## viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-2 a place that is not shown is refused, and the saved place stays

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"placeNotOpen","refusals":[{"reason":"placeNotOpen"}]}

expect(received).toBeNull()

Received: {"code": "P0D01", "details": null, "hint": null, "message": "placeNotOpen", "ok": false, "refusals": [{"reason": "placeNotOpen"}]}
--- further error 1 ---
Error: {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"placeNotOpen","refusals":[{"reason":"placeNotOpen"}]}

expect(received).toBeNull()

Received: {"code": "P0D01", "details": null, "hint": null, "message": "placeNotOpen", "ok": false, "refusals": [{"reason": "placeNotOpen"}]}

  85 |   async function setPlace(own: SupabaseClient, id: string | null): Promise<Answer> {
  86 |     const { data, error } = await own.rpc("user_set_viewing_location", { p_location: id });
> 87 |     expect(error, JSON.stringify(error)).toBeNull();
     |                                          ^
  88 |     return data as Answer;
  89 |   }
  90 |
    at setPlace (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:87:42)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:137:14
```

Context:

```text
          - listitem [ref=e326]:
            - generic [ref=e327]: About
          - listitem [ref=e328]:
            - generic [ref=e329]: Contact
      - navigation "Help" [ref=e330]:
        - heading "Help" [level=2] [ref=e331]
        - list [ref=e332]:
          - listitem [ref=e333]:
            - generic [ref=e334]: Safety
      - navigation "Legal" [ref=e335]:
        - heading "Legal" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - link "Terms" [ref=e339] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e340]:
            - link "Privacy" [ref=e341] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e343]: © 2026 ethio.com — All rights reserved.
```
```

## viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-4 the viewing_place dial refuses the call past the account's limit

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"rateLimited","refusals":[{"reason":"rateLimited"}]}

expect(received).toBeNull()

Received: {"code": "P0D01", "details": null, "hint": null, "message": "rateLimited", "ok": false, "refusals": [{"reason": "rateLimited"}]}
--- further error 1 ---
Error: {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"rateLimited","refusals":[{"reason":"rateLimited"}]}

expect(received).toBeNull()

Received: {"code": "P0D01", "details": null, "hint": null, "message": "rateLimited", "ok": false, "refusals": [{"reason": "rateLimited"}]}

  85 |   async function setPlace(own: SupabaseClient, id: string | null): Promise<Answer> {
  86 |     const { data, error } = await own.rpc("user_set_viewing_location", { p_location: id });
> 87 |     expect(error, JSON.stringify(error)).toBeNull();
     |                                          ^
  88 |     return data as Answer;
  89 |   }
  90 |
    at setPlace (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:87:42)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:175:19
```

Context:

```text
          - listitem [ref=e326]:
            - generic [ref=e327]: About
          - listitem [ref=e328]:
            - generic [ref=e329]: Contact
      - navigation "Help" [ref=e330]:
        - heading "Help" [level=2] [ref=e331]
        - list [ref=e332]:
          - listitem [ref=e333]:
            - generic [ref=e334]: Safety
      - navigation "Legal" [ref=e335]:
        - heading "Legal" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - link "Terms" [ref=e339] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e340]:
            - link "Privacy" [ref=e341] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e343]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 13

No `[ssr-error]` lines in the `shard 13` log (or no log was uploaded).

## Client errors: shard 13

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [report-listing] alreadyReported
[client-error] HTTP 400 POST /rest/v1/rpc/report_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "alreadyReported", "refusals": [{"reason": "alreadyReported"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [report-listing] alreadyReported
[client-error] HTTP 400 POST /rest/v1/rpc/report_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "alreadyReported", "refusals": [{"reason": "alreadyReported"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [report-listing] alreadyReported
[client-error] HTTP 400 POST /rest/v1/rpc/report_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "alreadyReported", "refusals": [{"reason": "alreadyReported"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [report-listing] alreadyReported
[client-error] HTTP 400 POST /rest/v1/rpc/report_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "alreadyReported", "refusals": [{"reason": "alreadyReported"}]})
```

## Server errors: shard 14

No `[ssr-error]` lines in the `shard 14` log (or no log was uploaded).

## Client errors: shard 14

No `[client-error]` lines in the `shard 14` log (or no log was uploaded).

## Server errors: shard 15

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 15

No `[client-error]` lines in the `shard 15` log (or no log was uploaded).
