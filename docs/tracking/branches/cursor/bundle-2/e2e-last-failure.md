# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44979930034
- Commit: `1754bf3bfeca7ce8cefb9495e1feb6c242572f28`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-50e2785c8a98… (0 read)
- Repeat: 32 of 81 tests repeated — specs directly changed 2/4, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-22T03:42:17.941Z
- Passed: 2654 · Skipped: 360 · Failed: 32
- Gating failures: 32 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 20 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-22T03:21:27.214Z | 4.8 min |
| email | 2026-11-22T03:26:40.326Z | 0.3 min |
| webkit | 2026-11-22T03:21:45.004Z | 9.6 min |
| shard 1 | 2026-11-22T03:21:05.981Z | 5.4 min |
| shard 2 | 2026-11-22T03:21:38.262Z | 7.3 min |
| shard 3 | 2026-11-22T03:21:07.062Z | 5.9 min |
| shard 4 | 2026-11-22T03:21:14.783Z | 5.9 min |
| shard 5 | 2026-11-22T03:23:20.236Z | 6.5 min |
| shard 6 | 2026-11-22T03:22:15.482Z | 19.1 min |
| shard 7 | 2026-11-22T03:29:19.840Z | 5.3 min |
| shard 8 | 2026-11-22T03:21:20.511Z | 5.8 min |
| shard 9 | 2026-11-22T03:21:18.546Z | 6.3 min |
| shard 10 | 2026-11-22T03:21:10.382Z | 5.4 min |
| shard 11 | 2026-11-22T03:21:51.796Z | 5.6 min |
| shard 12 | 2026-11-22T03:21:13.308Z | 5.7 min |
| shard 13 | 2026-11-22T03:20:51.474Z | 4.9 min |
| shard 14 | 2026-11-22T03:21:08.660Z | 5.3 min |
| shard 15 | 2026-11-22T03:20:52.120Z | 6.3 min |
| shard 16 | 2026-11-22T03:21:44.217Z | 6.2 min |
| repeat | 2026-11-22T03:21:09.215Z | 5.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-locations.spec.ts` | 38 | 28.4 min | shard 6 |
| `shell.spec.ts` | 234 | 9.4 min | shard 1 |
| `admin-monetisation.spec.ts` | 102 | 8.3 min | smoke, shard 10, repeat |
| `admin-attributes-library.spec.ts` | 42 | 7.0 min | shard 2 |
| `admin-listings.spec.ts` | 78 | 5.5 min | webkit, shard 10 |
| `auth-signout.spec.ts` | 44 | 5.3 min | webkit, shard 9 |
| `import-security.spec.ts` | 36 | 5.3 min | shard 4 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.1 min | shard 3 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 5 |
| `admin-translations-console.spec.ts` | 46 | 4.8 min | smoke, shard 8 |
| `admin-screening.spec.ts` | 58 | 4.8 min | webkit, shard 14 |
| `photo-pipeline.spec.ts` | 74 | 4.7 min | webkit, shard 16 |
| `ad-page.spec.ts` | 104 | 4.5 min | webkit, shard 13 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.3 min | shard 7 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `admin-users.spec.ts` | 28 | 4.2 min | shard 16 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `admin-translations-governance.spec.ts` | 20 | 3.5 min | smoke, shard 16 |
| `posting-routes.spec.ts` | 80 | 3.4 min | shard 2 |
| `post-wizard-pricing.spec.ts` | 52 | 3.2 min | shard 8 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `post-wizard-category.spec.ts` | 52 | 3.1 min | webkit, shard 4 |
| `choice-lists.spec.ts` | 96 | 2.8 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 2.7 min | shard 5 |
| `dialogs.spec.ts` | 20 | 2.7 min | webkit, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `sage-tiers.spec.ts` | 52 | 2.3 min | webkit, shard 2 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 2.1 min | shard 6 |
| `mfa-stepup.spec.ts` | 24 | 2.1 min | webkit, shard 15 |
| `sage-ad-page.spec.ts` | 30 | 2.0 min | webkit, shard 11 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 8 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `admin-shell.spec.ts` | 12 | 1.4 min | shard 2 |
| `ad-page-doors.spec.ts` | 90 | 1.2 min | shard 14, repeat |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 3 |
| `my-listings-promote.spec.ts` | 10 | 1.0 min | shard 11 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `sage-shell.spec.ts` | 80 | 0.9 min | shard 16 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `auth-caller-gates.spec.ts` | 8 | 0.5 min | shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 16 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 13 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 11 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 15 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 2 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `dark-cards.spec.ts` | 4 | 0.0 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-locations.spec.ts` › LT-14 market state and whole-country parent follow the selected market | desktop-1280 | 120.4 s |
| `admin-locations.spec.ts` › LT-3 create chain: region → city → sub-city are born retired with their ancestry filled, and activate top-down | desktop-1280 | 120.3 s |
| `admin-locations.spec.ts` › LT-14 market state and whole-country parent follow the selected market | mobile-360 | 120.3 s |
| `admin-locations.spec.ts` › LT-3 create chain: region → city → sub-city are born retired with their ancestry filled, and activate top-down | mobile-360 | 120.3 s |
| `admin-locations.spec.ts` › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids | desktop-1280 | 60.6 s |
| `admin-locations.spec.ts` › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids | mobile-360 | 60.2 s |
| `admin-locations.spec.ts` › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin | mobile-360 | 51.9 s |
| `admin-locations.spec.ts` › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin | desktop-1280 | 49.7 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 48.9 s |
| `admin-locations.spec.ts` › LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants | desktop-1280 | 46.1 s |
| `admin-locations.spec.ts` › LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants | mobile-360 | 45.4 s |
| `admin-locations.spec.ts` › LT-12 transfer scope: exports and the import title follow the selected country | desktop-1280 | 44.4 s |
| `admin-locations.spec.ts` › LT-11 one read per country: filtering costs no request, switching the market costs exactly one | desktop-1280 | 44.0 s |
| `admin-locations.spec.ts` › LT-7b the editor round-trips a row without dropping a stored field | desktop-1280 | 44.0 s |
| `admin-locations.spec.ts` › LT-10 tones: retired is destructive, active is secondary, a level badge is outline | desktop-1280 | 43.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 44979930034-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44979930034-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 44979930034-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44979930034-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 44979930034-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44979930034-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 44979930034-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 44979930034-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44979930034-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44979930034-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 44979930034-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 44979930034-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 44979930034-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44979930034-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44979930034-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44979930034-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 44979930034-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 2, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 45 user(s) owned by process 44979930034-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 44979930034-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 2, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 18 user(s) owned by process 44979930034-local-repeat
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] deleted 2 user(s) owned by process 44979930034-local-repeat
```

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')


  124 |     await selectMarket(page, "ET");
  125 |
> 126 |     await expect(locationRow(page, await regionKeyUnder("ET"))).toBeVisible({ timeout: 20000 });
      |                                                                 ^
  127 |     await expect(locationRow(page, ANCHOR)).toHaveCount(0);
  128 |     const toolbar = page.getByTestId("data-table-toolbar");
  129 |     await expect(toolbar).toBeVisible();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:126:65
```

Context:

```text
          - listitem [ref=e266]:
            - generic [ref=e267]: About
          - listitem [ref=e268]:
            - generic [ref=e269]: Contact
      - navigation "Help" [ref=e270]:
        - heading "Help" [level=2] [ref=e271]
        - list [ref=e272]:
          - listitem [ref=e273]:
            - generic [ref=e274]: Safety
      - navigation "Legal" [ref=e275]:
        - heading "Legal" [level=2] [ref=e276]
        - list [ref=e277]:
          - listitem [ref=e278]:
            - link "Terms" [ref=e279] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e280]:
            - link "Privacy" [ref=e281] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e283]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-2 roster: the seeded ET tree renders, an alias narrows the search, the level filter scopes, nothing overflows

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')


  193 |       await gotoReady(page, "/admin/places");
  194 |       await selectMarket(page, "ET");
> 195 |       await expect(locationRow(page, `${ANCHOR}/${region.slug}`)).toBeVisible({ timeout: 20000 });
      |                                                                   ^
  196 |       await expect(locationRow(page, ANCHOR)).toHaveCount(0);
  197 |
  198 |       // (i) the primitive's own scroller does not scroll sideways …
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:195:67
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-3 create chain: region → city → sub-city are born retired with their ancestry filled, and activate top-down

- Source: `shard 6`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('location-create-open')
    - locator resolved to <button disabled type="button" data-pressable="" data-testid="location-create-open" class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled…>…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    112 × waiting for element to be visible, enabled and stable
        - element is not enabled
      - retrying click action
        - waiting 500ms


  258 |
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-9-lt4r-pq1if4-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-9-lt4r-pq1if4-card')

[dialog-dump findRow(ethiopia/e2e-loc-local-6-9-lt4r-pq1if4)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-9-lt4r-pq1if4-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-9-lt4r-pq1if4-card')

[dialog-dump findRow(ethiopia/e2e-loc-local-6-9-lt4r-pq1if4)] open dialogs: none

   at helpers/locations.ts:146

  144 |     await expect(row).toBeVisible({ timeout: 20000 });
  145 |   } catch (error) {
> 146 |     throw new Error(`${errorText(error)}\n${await dialogDump(page, `findRow(${key})`)}`);
      |           ^
  147 |   }
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-5 delete guard: a parent is refused, then the chain deletes deepest-first with the typed address

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-11-lt5r-orppu8-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-11-lt5r-orppu8-card')

[dialog-dump findRow(ethiopia/e2e-loc-local-6-11-lt5r-orppu8)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-11-lt5r-orppu8-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-11-lt5r-orppu8-card')

[dialog-dump findRow(ethiopia/e2e-loc-local-6-11-lt5r-orppu8)] open dialogs: none

   at helpers/locations.ts:146

  144 |     await expect(row).toBeVisible({ timeout: 20000 });
  145 |   } catch (error) {
> 146 |     throw new Error(`${errorText(error)}\n${await dialogDump(page, `findRow(${key})`)}`);
      |           ^
  147 |   }
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-15-lt6a-scbd6f__e2e-loc-local-6-15-lt6c-bl36xr-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-15-lt6a-scbd6f__e2e-loc-local-6-15-lt6c-bl36xr-card')

[dialog-dump findRow(ethiopia/e2e-loc-local-6-15-lt6a-scbd6f/e2e-loc-local-6-15-lt6c-bl36xr)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-15-lt6a-scbd6f__e2e-loc-local-6-15-lt6c-bl36xr-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-15-lt6a-scbd6f__e2e-loc-local-6-15-lt6c-bl36xr-card')

[dialog-dump findRow(ethiopia/e2e-loc-local-6-15-lt6a-scbd6f/e2e-loc-local-6-15-lt6c-bl36xr)] open dialogs: none

   at helpers/locations.ts:146

  144 |     await expect(row).toBeVisible({ timeout: 20000 });
  145 |   } catch (error) {
> 146 |     throw new Error(`${errorText(error)}\n${await dialogDump(page, `findRow(${key})`)}`);
      |           ^
  147 |   }
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-19-lt7r-mdrzw5-card')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-19-lt7r-mdrzw5-card')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-19-lt7r-mdrzw5-card')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-19-lt7r-mdrzw5-card')


  737 |       await page.getByTestId("location-import-close").click();
  738 |       await page.getByTestId("location-search").fill(regionSlug);
> 739 |       await expect(locationRow(page, `${ANCHOR}/${regionSlug}`)).toBeVisible();
      |                                                                  ^
  740 |     } finally {
  741 |       await destroyLocation(regionSlug);
  742 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:739:66
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-7b the editor round-trips a row without dropping a stored field

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-22-lt7b-nn1mt7-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-22-lt7b-nn1mt7-card')

[dialog-dump findRow(ethiopia/addis-ababa/e2e-loc-local-6-22-lt7b-nn1mt7)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-22-lt7b-nn1mt7-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-22-lt7b-nn1mt7-card')

[dialog-dump findRow(ethiopia/addis-ababa/e2e-loc-local-6-22-lt7b-nn1mt7)] open dialogs: none

   at helpers/locations.ts:146

  144 |     await expect(row).toBeVisible({ timeout: 20000 });
  145 |   } catch (error) {
> 146 |     throw new Error(`${errorText(error)}\n${await dialogDump(page, `findRow(${key})`)}`);
      |           ^
  147 |   }
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-8 verb reachability: every verb and the save button are inside the viewport (CT-8 mirror)

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')

[dialog-dump findRow(ethiopia/addis-ababa)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')

[dialog-dump findRow(ethiopia/addis-ababa)] open dialogs: none

   at helpers/locations.ts:146

  144 |     await expect(row).toBeVisible({ timeout: 20000 });
  145 |   } catch (error) {
> 146 |     throw new Error(`${errorText(error)}\n${await dialogDump(page, `findRow(${key})`)}`);
      |           ^
  147 |   }
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-9b roster shape, card twin: the edit icon sits inline beside the path line

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')


  931 |     await selectMarket(page, "ET");
  932 |     const regionKey = await regionKeyUnder("ET");
> 933 |     await expect(locationRow(page, regionKey)).toBeVisible({ timeout: 20000 });
      |                                                ^
  934 |     await expect(locationRow(page, ANCHOR)).toHaveCount(0);
  935 |
  936 |     await expect(page.getByTestId("data-table-cards")).toBeVisible();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:933:48
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-10 tones: retired is destructive, active is secondary, a level badge is outline

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-33-lt10-ah2ods-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-33-lt10-ah2ods-card')

[dialog-dump findRow(ethiopia/addis-ababa/e2e-loc-local-6-33-lt10-ah2ods)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-33-lt10-ah2ods-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-33-lt10-ah2ods-card')

[dialog-dump findRow(ethiopia/addis-ababa/e2e-loc-local-6-33-lt10-ah2ods)] open dialogs: none

   at helpers/locations.ts:146

  144 |     await expect(row).toBeVisible({ timeout: 20000 });
  145 |   } catch (error) {
> 146 |     throw new Error(`${errorText(error)}\n${await dialogDump(page, `findRow(${key})`)}`);
      |           ^
  147 |   }
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-11 one read per country: filtering costs no request, switching the market costs exactly one

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')


  1005 |     await gotoReady(page, "/admin/places");
  1006 |     await selectMarket(page, "ET");
> 1007 |     await expect(locationRow(page, await regionKeyUnder("ET"))).toBeVisible({ timeout: 20000 });
       |                                                                 ^
  1008 |     await expect(locationRow(page, ANCHOR)).toHaveCount(0);
  1009 |     const afterLoad = reads;
  1010 |     expect(afterLoad, "the roster was never read").toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:1007:65
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-12 transfer scope: exports and the import title follow the selected country

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa-card')


  1057 |     await gotoReady(page, "/admin/places");
  1058 |     await selectMarket(page, "ET");
> 1059 |     await expect(locationRow(page, await regionKeyUnder("ET"))).toBeVisible({ timeout: 20000 });
       |                                                                 ^
  1060 |     await expect(locationRow(page, ANCHOR)).toHaveCount(0);
  1061 |     await page.getByTestId("location-export-locations").click();
  1062 |     await expect.poll(() => exportScopes.at(-1), { timeout: 10000 }).toBe("ET");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:1059:65
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-14 market state and whole-country parent follow the selected market

- Source: `shard 6`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('location-create-open')
    - locator resolved to <button disabled type="button" data-pressable="" data-testid="location-create-open" class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled…>…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    112 × waiting for element to be visible, enabled and stable
        - element is not enabled
      - retrying click action
        - waiting 500ms


  1179 |       en["admin.locations.market.open"].replace("{country}", "Ethiopia"),
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-16 the row's actions: Edit, a red Delete and the menu's verbs open the editor's own dialogs

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-51-lt16-x2v9fm-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-51-lt16-x2v9fm-card')

[dialog-dump findRow(ethiopia/addis-ababa/e2e-loc-local-6-51-lt16-x2v9fm)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-51-lt16-x2v9fm-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-51-lt16-x2v9fm-card')

[dialog-dump findRow(ethiopia/addis-ababa/e2e-loc-local-6-51-lt16-x2v9fm)] open dialogs: none

   at helpers/locations.ts:146

  144 |     await expect(row).toBeVisible({ timeout: 20000 });
  145 |   } catch (error) {
> 146 |     throw new Error(`${errorText(error)}\n${await dialogDump(page, `findRow(${key})`)}`);
      |           ^
  147 |   }
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa')


  124 |     await selectMarket(page, "ET");
  125 |
> 126 |     await expect(locationRow(page, await regionKeyUnder("ET"))).toBeVisible({ timeout: 20000 });
      |                                                                 ^
  127 |     await expect(locationRow(page, ANCHOR)).toHaveCount(0);
  128 |     const toolbar = page.getByTestId("data-table-toolbar");
  129 |     await expect(toolbar).toBeVisible();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:126:65
```

Context:

```text
          - listitem [ref=e271]:
            - generic [ref=e272]: About
          - listitem [ref=e273]:
            - generic [ref=e274]: Contact
      - navigation "Help" [ref=e275]:
        - heading "Help" [level=2] [ref=e276]
        - list [ref=e277]:
          - listitem [ref=e278]:
            - generic [ref=e279]: Safety
      - navigation "Legal" [ref=e280]:
        - heading "Legal" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - link "Terms" [ref=e284] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e285]:
            - link "Privacy" [ref=e286] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e288]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-2 roster: the seeded ET tree renders, an alias narrows the search, the level filter scopes, nothing overflows

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa')


  193 |       await gotoReady(page, "/admin/places");
  194 |       await selectMarket(page, "ET");
> 195 |       await expect(locationRow(page, `${ANCHOR}/${region.slug}`)).toBeVisible({ timeout: 20000 });
      |                                                                   ^
  196 |       await expect(locationRow(page, ANCHOR)).toHaveCount(0);
  197 |
  198 |       // (i) the primitive's own scroller does not scroll sideways …
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:195:67
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - link "Terms" [ref=e321] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e322]:
            - link "Privacy" [ref=e323] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-3 create chain: region → city → sub-city are born retired with their ancestry filled, and activate top-down

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('location-create-open')
    - locator resolved to <button disabled type="button" data-pressable="" data-testid="location-create-open" class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled…>…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    113 × waiting for element to be visible, enabled and stable
        - element is not enabled
      - retrying click action
        - waiting 500ms
    - waiting for element to be visible, enabled and stable


```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - link "Terms" [ref=e321] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e322]:
            - link "Privacy" [ref=e323] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-24-lt4r-49ucys')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-24-lt4r-49ucys')

[dialog-dump findRow(ethiopia/e2e-loc-local-6-24-lt4r-49ucys)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-24-lt4r-49ucys')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-24-lt4r-49ucys')

[dialog-dump findRow(ethiopia/e2e-loc-local-6-24-lt4r-49ucys)] open dialogs: none

   at helpers/locations.ts:146

  144 |     await expect(row).toBeVisible({ timeout: 20000 });
  145 |   } catch (error) {
> 146 |     throw new Error(`${errorText(error)}\n${await dialogDump(page, `findRow(${key})`)}`);
      |           ^
  147 |   }
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - link "Terms" [ref=e321] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e322]:
            - link "Privacy" [ref=e323] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-5 delete guard: a parent is refused, then the chain deletes deepest-first with the typed address

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-28-lt5r-cddczs')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-28-lt5r-cddczs')

[dialog-dump findRow(ethiopia/e2e-loc-local-6-28-lt5r-cddczs)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-28-lt5r-cddczs')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-28-lt5r-cddczs')

[dialog-dump findRow(ethiopia/e2e-loc-local-6-28-lt5r-cddczs)] open dialogs: none

   at helpers/locations.ts:146

  144 |     await expect(row).toBeVisible({ timeout: 20000 });
  145 |   } catch (error) {
> 146 |     throw new Error(`${errorText(error)}\n${await dialogDump(page, `findRow(${key})`)}`);
      |           ^
  147 |   }
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - link "Terms" [ref=e321] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e322]:
            - link "Privacy" [ref=e323] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-32-lt6a-rjeglu__e2e-loc-local-6-32-lt6c-ybcs31')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-32-lt6a-rjeglu__e2e-loc-local-6-32-lt6c-ybcs31')

[dialog-dump findRow(ethiopia/e2e-loc-local-6-32-lt6a-rjeglu/e2e-loc-local-6-32-lt6c-ybcs31)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-32-lt6a-rjeglu__e2e-loc-local-6-32-lt6c-ybcs31')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-32-lt6a-rjeglu__e2e-loc-local-6-32-lt6c-ybcs31')

[dialog-dump findRow(ethiopia/e2e-loc-local-6-32-lt6a-rjeglu/e2e-loc-local-6-32-lt6c-ybcs31)] open dialogs: none

   at helpers/locations.ts:146

  144 |     await expect(row).toBeVisible({ timeout: 20000 });
  145 |   } catch (error) {
> 146 |     throw new Error(`${errorText(error)}\n${await dialogDump(page, `findRow(${key})`)}`);
      |           ^
  147 |   }
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - link "Terms" [ref=e321] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e322]:
            - link "Privacy" [ref=e323] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-36-lt7r-5smf6x')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-36-lt7r-5smf6x')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-36-lt7r-5smf6x')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-36-lt7r-5smf6x')


  737 |       await page.getByTestId("location-import-close").click();
  738 |       await page.getByTestId("location-search").fill(regionSlug);
> 739 |       await expect(locationRow(page, `${ANCHOR}/${regionSlug}`)).toBeVisible();
      |                                                                  ^
  740 |     } finally {
  741 |       await destroyLocation(regionSlug);
  742 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:739:66
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - link "Terms" [ref=e321] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e322]:
            - link "Privacy" [ref=e323] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-7b the editor round-trips a row without dropping a stored field

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-41-lt7b-qoawvp')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-41-lt7b-qoawvp')

[dialog-dump findRow(ethiopia/addis-ababa/e2e-loc-local-6-41-lt7b-qoawvp)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-41-lt7b-qoawvp')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-41-lt7b-qoawvp')

[dialog-dump findRow(ethiopia/addis-ababa/e2e-loc-local-6-41-lt7b-qoawvp)] open dialogs: none

   at helpers/locations.ts:146

  144 |     await expect(row).toBeVisible({ timeout: 20000 });
  145 |   } catch (error) {
> 146 |     throw new Error(`${errorText(error)}\n${await dialogDump(page, `findRow(${key})`)}`);
      |           ^
  147 |   }
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - link "Terms" [ref=e321] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e322]:
            - link "Privacy" [ref=e323] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-8 verb reachability: every verb and the save button are inside the viewport (CT-8 mirror)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa')

[dialog-dump findRow(ethiopia/addis-ababa)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa')

[dialog-dump findRow(ethiopia/addis-ababa)] open dialogs: none

   at helpers/locations.ts:146

  144 |     await expect(row).toBeVisible({ timeout: 20000 });
  145 |   } catch (error) {
> 146 |     throw new Error(`${errorText(error)}\n${await dialogDump(page, `findRow(${key})`)}`);
      |           ^
  147 |   }
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - link "Terms" [ref=e321] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e322]:
            - link "Privacy" [ref=e323] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-9a roster shape, table twin: the edit icon sits in the end column with pagination

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa')


  912 |     await selectMarket(page, "ET");
  913 |     const regionKey = await regionKeyUnder("ET");
> 914 |     await expect(locationRow(page, regionKey)).toBeVisible({ timeout: 20000 });
      |                                                ^
  915 |     await expect(locationRow(page, ANCHOR)).toHaveCount(0);
  916 |
  917 |     await expect(page.getByRole("table")).toBeVisible();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:914:48
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - link "Terms" [ref=e321] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e322]:
            - link "Privacy" [ref=e323] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-10 tones: retired is destructive, active is secondary, a level badge is outline

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-50-lt10-bw138n')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-50-lt10-bw138n')

[dialog-dump findRow(ethiopia/addis-ababa/e2e-loc-local-6-50-lt10-bw138n)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-50-lt10-bw138n')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-50-lt10-bw138n')

[dialog-dump findRow(ethiopia/addis-ababa/e2e-loc-local-6-50-lt10-bw138n)] open dialogs: none

   at helpers/locations.ts:146

  144 |     await expect(row).toBeVisible({ timeout: 20000 });
  145 |   } catch (error) {
> 146 |     throw new Error(`${errorText(error)}\n${await dialogDump(page, `findRow(${key})`)}`);
      |           ^
  147 |   }
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - link "Terms" [ref=e321] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e322]:
            - link "Privacy" [ref=e323] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-11 one read per country: filtering costs no request, switching the market costs exactly one

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa')


  1005 |     await gotoReady(page, "/admin/places");
  1006 |     await selectMarket(page, "ET");
> 1007 |     await expect(locationRow(page, await regionKeyUnder("ET"))).toBeVisible({ timeout: 20000 });
       |                                                                 ^
  1008 |     await expect(locationRow(page, ANCHOR)).toHaveCount(0);
  1009 |     const afterLoad = reads;
  1010 |     expect(afterLoad, "the roster was never read").toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:1007:65
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - link "Terms" [ref=e321] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e322]:
            - link "Privacy" [ref=e323] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-12 transfer scope: exports and the import title follow the selected country

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa')


  1057 |     await gotoReady(page, "/admin/places");
  1058 |     await selectMarket(page, "ET");
> 1059 |     await expect(locationRow(page, await regionKeyUnder("ET"))).toBeVisible({ timeout: 20000 });
       |                                                                 ^
  1060 |     await expect(locationRow(page, ANCHOR)).toHaveCount(0);
  1061 |     await page.getByTestId("location-export-locations").click();
  1062 |     await expect.poll(() => exportScopes.at(-1), { timeout: 10000 }).toBe("ET");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-locations.spec.ts:1059:65
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - link "Terms" [ref=e321] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e322]:
            - link "Privacy" [ref=e323] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-14 market state and whole-country parent follow the selected market

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('location-create-open')
    - locator resolved to <button disabled type="button" data-pressable="" data-testid="location-create-open" class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled…>…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    114 × waiting for element to be visible, enabled and stable
        - element is not enabled
      - retrying click action
        - waiting 500ms


  1179 |       en["admin.locations.market.open"].replace("{country}", "Ethiopia"),
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - link "Terms" [ref=e321] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e322]:
            - link "Privacy" [ref=e323] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-16 the row's actions: Edit, a red Delete and the menu's verbs open the editor's own dialogs

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-63-lt16-br7r7v')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-63-lt16-br7r7v')

[dialog-dump findRow(ethiopia/addis-ababa/e2e-loc-local-6-63-lt16-br7r7v)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-63-lt16-br7r7v')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__addis-ababa__e2e-loc-local-6-63-lt16-br7r7v')

[dialog-dump findRow(ethiopia/addis-ababa/e2e-loc-local-6-63-lt16-br7r7v)] open dialogs: none

   at helpers/locations.ts:146

  144 |     await expect(row).toBeVisible({ timeout: 20000 });
  145 |   } catch (error) {
> 146 |     throw new Error(`${errorText(error)}\n${await dialogDump(page, `findRow(${key})`)}`);
      |           ^
  147 |   }
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - link "Terms" [ref=e321] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e322]:
            - link "Privacy" [ref=e323] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-16 the order strip: a market switched on with a sellable product that has no price reads Needs a row, names a product and its market, and its link opens that product's prices

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('monetisation-order-markets-detail')
Expected substring: "E2E-Scratch-XK-local-repeat-1"
Received string:    "Paid levels on: E2E-Scratch-XK-local-repeat-0"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('monetisation-order-markets-detail')
    14 × locator resolved to <span data-testid="monetisation-order-markets-detail" class="min-w-0 break-words text-xs text-muted-foreground">Paid levels on: E2E-Scratch-XK-local-repeat-0</span>
       - unexpected value "Paid levels on: E2E-Scratch-XK-local-repeat-0"

--- further error 1 ---
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('monetisation-order-markets-detail')
Expected substring: "E2E-Scratch-XK-local-repeat-1"
Received string:    "Paid levels on: E2E-Scratch-XK-local-repeat-0"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('monetisation-order-markets-detail')
    14 × locator resolved to <span data-testid="monetisation-order-markets-detail" class="min-w-0 break-words text-xs text-muted-foreground">Paid levels on: E2E-Scratch-XK-local-repeat-0</span>
       - unexpected value "Paid levels on: E2E-Scratch-XK-local-repeat-0"


  1507 |       ).toHaveAttribute("aria-expanded", "true");
  1508 |       // Markets names the switched-on market; Products is Set (the real level and reach rows).
> 1509 |       await expect(page.getByTestId("monetisation-order-markets-detail")).toContainText(
       |                                                                           ^
  1510 |         market.anchor.name_en as string,
  1511 |       );
```

Context: context file not found for `admin-monetisation-P-1b-Admin-Monetisation-MON-16-the-order-strip-a-market-switched-on-with-a-sellable-product-that-has-no-price-reads-Needs-a-row-names-a-product-and-its-market-and-its-link-opens-that-product-s-prices-mobile-360` — Playwright's name `admin-monetisation-P-1b-Ad-aa046-opens-that-product-s-prices-mobile-360`; this run carried 62 context file(s); of the same spec: `admin-monetisation-P-1b-Ad-aa046-opens-that-product-s-prices-desktop-1280-repeat1`, `admin-monetisation-P-1b-Ad-aa046-opens-that-product-s-prices-mobile-360-repeat1`

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-16 the order strip: a market switched on with a sellable product that has no price reads Needs a row, names a product and its market, and its link opens that product's prices

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('monetisation-order-markets-detail')
Expected substring: "E2E-Scratch-QM-local-repeat-4"
Received string:    "Paid levels on: E2E-Scratch-QM-local-repeat-3"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('monetisation-order-markets-detail')
    14 × locator resolved to <span data-testid="monetisation-order-markets-detail" class="min-w-0 break-words text-xs text-muted-foreground">Paid levels on: E2E-Scratch-QM-local-repeat-3</span>
       - unexpected value "Paid levels on: E2E-Scratch-QM-local-repeat-3"

--- further error 1 ---
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('monetisation-order-markets-detail')
Expected substring: "E2E-Scratch-QM-local-repeat-4"
Received string:    "Paid levels on: E2E-Scratch-QM-local-repeat-3"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('monetisation-order-markets-detail')
    14 × locator resolved to <span data-testid="monetisation-order-markets-detail" class="min-w-0 break-words text-xs text-muted-foreground">Paid levels on: E2E-Scratch-QM-local-repeat-3</span>
       - unexpected value "Paid levels on: E2E-Scratch-QM-local-repeat-3"


  1507 |       ).toHaveAttribute("aria-expanded", "true");
  1508 |       // Markets names the switched-on market; Products is Set (the real level and reach rows).
> 1509 |       await expect(page.getByTestId("monetisation-order-markets-detail")).toContainText(
       |                                                                           ^
  1510 |         market.anchor.name_en as string,
  1511 |       );
```

Context: context file not found for `admin-monetisation-P-1b-Admin-Monetisation-MON-16-the-order-strip-a-market-switched-on-with-a-sellable-product-that-has-no-price-reads-Needs-a-row-names-a-product-and-its-market-and-its-link-opens-that-product-s-prices-desktop-1280` — Playwright's name `admin-monetisation-P-1b-Ad-aa046-opens-that-product-s-prices-desktop-1280`; this run carried 62 context file(s); of the same spec: `admin-monetisation-P-1b-Ad-aa046-opens-that-product-s-prices-desktop-1280-repeat1`, `admin-monetisation-P-1b-Ad-aa046-opens-that-product-s-prices-mobile-360-repeat1`

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] HTTP 400 POST /rest/v1/rpc/admin_list_locations ({"code":"22P02","details":"Array value must start with \"{\" or dimension information.","hint":null,"message":"malformed array literal: \"ET\""}) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] HTTP 400 POST /rest/v1/rpc/admin_list_locations ({"code":"22P02","details":"Array value must start with \"{\" or dimension information.","hint":null,"message":"malformed array literal: \"ET\""}) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] HTTP 400 POST /rest/v1/rpc/admin_list_locations ({"code":"22P02","details":"Array value must start with \"{\" or dimension information.","hint":null,"message":"malformed array literal: \"ET\""}) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] HTTP 400 POST /rest/v1/rpc/admin_list_locations ({"code":"22P02","details":"Array value must start with \"{\" or dimension information.","hint":null,"message":"malformed array literal: \"ET\""}) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] HTTP 400 POST /rest/v1/rpc/admin_list_locations ({"code":"22P02","details":"Array value must start with \"{\" or dimension information.","hint":null,"message":"malformed array literal: \"ET\""}) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] HTTP 400 POST /rest/v1/rpc/admin_list_locations ({"code":"22P02","details":"Array value must start with \"{\" or dimension information.","hint":null,"message":"malformed array literal: \"ET\""}) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] HTTP 400 POST /rest/v1/rpc/admin_list_locations ({"code":"22P02","details":"Array value must start with \"{\" or dimension information.","hint":null,"message":"malformed array literal: \"ET\""}) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] HTTP 400 POST /rest/v1/rpc/admin_list_locations ({"code":"22P02","details":"Array value must start with \"{\" or dimension information.","hint":null,"message":"malformed array literal: \"ET\""}) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] HTTP 400 POST /rest/v1/rpc/admin_list_locations ({"code":"22P02","details":"Array value must start with \"{\" or dimension information.","hint":null,"message":"malformed array literal: \"ET\""}) ×4
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×4
[client-error] HTTP 400 POST /rest/v1/rpc/admin_list_locations ({"code":"22P02","details":"Array value must start with \"{\" or dimension information.","hint":null,"message":"malformed array literal: \"ET\""}) ×4
```

## Server errors: repeat

No `[ssr-error]` lines in the `repeat` log (or no log was uploaded).

## Client errors: repeat

No `[client-error]` lines in the `repeat` log (or no log was uploaded).
