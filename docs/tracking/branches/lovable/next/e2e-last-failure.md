# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44992385314
- Commit: `1ed26064d1cd5de58a409ca376ffeb0b43749dc1`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-08d912d888a1… (0 read)
- Repeat: 29 of 46 tests repeated — specs directly changed 1/3, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-22T06:36:31.918Z
- Passed: 2645 · Skipped: 360 · Failed: 31
- Gating failures: 31 · STAGING-SINK (INC-1175, still gating): 0
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
| smoke | 2026-11-22T06:12:33.666Z | 4.3 min |
| email | 2026-11-22T06:11:42.239Z | 0.3 min |
| webkit | 2026-11-22T06:12:14.959Z | 16.0 min |
| shard 1 | 2026-11-22T06:12:18.590Z | 5.7 min |
| shard 2 | 2026-11-22T06:11:56.365Z | 5.4 min |
| shard 3 | 2026-11-22T06:12:47.331Z | 15.9 min |
| shard 4 | 2026-11-22T06:11:47.876Z | 5.3 min |
| shard 5 | 2026-11-22T06:12:10.730Z | 6.1 min |
| shard 6 | 2026-11-22T06:12:34.649Z | 7.2 min |
| shard 7 | 2026-11-22T06:13:12.116Z | 5.9 min |
| shard 8 | 2026-11-22T06:12:27.294Z | 6.1 min |
| shard 9 | 2026-11-22T06:12:14.423Z | 6.3 min |
| shard 10 | 2026-11-22T06:13:17.298Z | 5.5 min |
| shard 11 | 2026-11-22T06:15:19.906Z | 20.3 min |
| shard 12 | 2026-11-22T06:12:12.127Z | 5.9 min |
| shard 13 | 2026-11-22T06:12:34.057Z | 6.5 min |
| shard 14 | 2026-11-22T06:13:32.167Z | 6.5 min |
| shard 15 | 2026-11-22T06:12:26.542Z | 6.8 min |
| shard 16 | 2026-11-22T06:12:40.097Z | 8.0 min |
| repeat | 2026-11-22T06:14:20.179Z | 9.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 70 | 22.1 min | shard 3 |
| `post-wizard-place.spec.ts` | 40 | 20.1 min | shard 11 |
| `post-wizard-where.spec.ts` | 32 | 16.1 min | shard 11 |
| `admin-screening.spec.ts` | 174 | 14.3 min | webkit, shard 14, repeat |
| `shell.spec.ts` | 234 | 9.9 min | shard 1 |
| `admin-listings.spec.ts` | 78 | 8.9 min | webkit, shard 10 |
| `photo-pipeline.spec.ts` | 74 | 6.3 min | webkit, shard 16 |
| `admin-locations.spec.ts` | 38 | 5.7 min | shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 5.6 min | shard 2 |
| `ad-page.spec.ts` | 104 | 5.5 min | webkit, shard 13 |
| `auth-signout.spec.ts` | 44 | 5.3 min | webkit, shard 9 |
| `admin-translations-console.spec.ts` | 46 | 5.0 min | smoke, shard 8 |
| `admin-categories-images.spec.ts` | 6 | 4.9 min | smoke, webkit, shard 12 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 4.8 min | shard 13 |
| `admin-users.spec.ts` | 28 | 4.8 min | shard 16 |
| `admin-categories-console.spec.ts` | 34 | 4.8 min | shard 7 |
| `import-security.spec.ts` | 36 | 4.7 min | shard 4 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 12 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.1 min | shard 15 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 15 |
| `admin-attributes-editor.spec.ts` | 36 | 3.8 min | shard 14 |
| `sage-bands.spec.ts` | 76 | 3.6 min | shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 3.4 min | shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 3.4 min | smoke, shard 16 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `admin-monetisation.spec.ts` | 34 | 3.0 min | smoke, shard 10 |
| `choice-lists.spec.ts` | 96 | 3.0 min | shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 3.0 min | shard 3 |
| `dialogs.spec.ts` | 20 | 2.8 min | webkit, shard 10 |
| `post-wizard-category.spec.ts` | 52 | 2.7 min | webkit, shard 4 |
| `admin-countries.spec.ts` | 18 | 2.7 min | shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `mfa-stepup.spec.ts` | 24 | 2.3 min | webkit, shard 15 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 2 |
| `legal-admin.spec.ts` | 44 | 2.1 min | shard 7 |
| `legal-certify.spec.ts` | 44 | 2.1 min | shard 14 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 1.9 min | shard 8 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `admin-guides.spec.ts` | 14 | 1.5 min | shard 3 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `one-line-slots-admin.spec.ts` | 10 | 1.3 min | shard 3 |
| `user-guides.spec.ts` | 18 | 1.2 min | shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `press.spec.ts` | 22 | 1.1 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `sage-shell.spec.ts` | 80 | 1.0 min | shard 16 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.9 min | shard 15 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 0.8 min | shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `ad-page-doors.spec.ts` | 30 | 0.7 min | shard 14 |
| `legal-doors.spec.ts` | 34 | 0.7 min | smoke, shard 8 |
| `supabase-door.spec.ts` | 12 | 0.7 min | shard 13 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 3 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `house-style.spec.ts` | 14 | 0.6 min | shard 11 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 16 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `page-head.spec.ts` | 4 | 0.4 min | shard 13 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 15 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-bundle2.spec.ts` › PW-186 a pin saved while the directions save is unanswered keeps both | desktop-1280 | 142.2 s |
| `post-wizard-bundle2.spec.ts` › PW-186 a pin saved while the directions save is unanswered keeps both | mobile-360 | 141.3 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-1280 | 123.1 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | webkit-390 | 122.2 s |
| `post-wizard-place.spec.ts` › PW-160 Use my location stays pressed until the pin is moved by hand | desktop-1280 | 122.1 s |
| `post-wizard-bundle2.spec.ts` › PW-179 a pin save never restates directions the step could not read | desktop-1280 | 121.7 s |
| `post-wizard-bundle2.spec.ts` › PW-113 directions are saved, survive a pin move, and refuse a phone number | mobile-360 | 121.6 s |
| `post-wizard-bundle2.spec.ts` › PW-178 a late read of the place text never replaces a newer save | mobile-360 | 121.5 s |
| `admin-categories-images.spec.ts` › CI-4 image tab: generate persists three assets and regenerate re-versions them | webkit-1280 | 121.4 s |
| `post-wizard-place.spec.ts` › PW-40 removing the pin clears all four columns | mobile-360 | 121.3 s |
| `post-wizard-where.spec.ts` › PW-92 a refused tile plan falls back to OSM; the pin still drops and Save stays on screen | desktop-1280 | 121.3 s |
| `admin-categories-images.spec.ts` › CI-4 image tab: generate persists three assets and regenerate re-versions them | webkit-390 | 121.3 s |
| `post-wizard-bundle2.spec.ts` › PW-178 a late read of the place text never replaces a newer save | desktop-1280 | 121.3 s |
| `post-wizard-bundle2.spec.ts` › PW-179 a pin save never restates directions the step could not read | mobile-360 | 121.2 s |
| `post-wizard-bundle2.spec.ts` › PW-113 directions are saved, survive a pin move, and refuse a phone number | desktop-1280 | 121.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 44992385314-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44992385314-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 44992385314-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44992385314-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 44992385314-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44992385314-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 44992385314-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 44992385314-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44992385314-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44992385314-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 44992385314-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 44992385314-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 44992385314-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44992385314-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44992385314-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44992385314-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 44992385314-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 2, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 45 user(s) owned by process 44992385314-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 44992385314-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 44992385314-local-repeat
```

## admin-categories-images.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them

- Source: `webkit`
- Project: `webkit-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('category-edit-dialog').getByTestId('category-image-e2e-cat-local-webkit-0-wt6t9t')
    - locator resolved to <button type="button" title="Image" data-pressable="" data-testid="category-image-e2e-cat-local-webkit-0-wt6t9t" class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 foc…>…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-foot="" class="relative flex shrink-0 flex-wrap-reverse items-center justify-end gap-2 bg-card px-6 py-4 pb-[calc(1.375rem+env(safe-area-inset-bottom))] shadow-bar-up max-sm:[&>button]:flex-1">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-foot="" class="relative flex shrink-0 flex-wrap-reverse items-center justify-end gap-2 bg-card px-6 py-4 pb-[calc(1.375rem+env(safe-area-inset-bottom))] shadow-bar-up max-sm:[&>button]:flex-1">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    93 × waiting for element to be visible, enabled and stable
```

Context:

```text
          - generic [ref=e60]:
            - checkbox "Accepts listings" [checked] [ref=e61] [cursor=pointer]:
              - generic:
                - img
            - generic [ref=e62]: Accepts listings
          - generic [ref=e64]:
            - checkbox "Price field enabled" [checked] [ref=e65] [cursor=pointer]:
              - generic:
                - img
            - generic [ref=e66]: Price field enabled
      - button "More below" [ref=e67]:
        - img [ref=e68]
        - text: More below
    - generic [ref=e70]:
      - button "Cancel" [ref=e71] [cursor=pointer]
      - button "Save" [ref=e72] [cursor=pointer]
    - button "Close" [ref=e73] [cursor=pointer]:
      - img [ref=e74]
      - generic [ref=e77]: Close
```
```

## admin-categories-images.spec.ts › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them

- Source: `webkit`
- Project: `webkit-390`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('category-edit-dialog').getByTestId('category-image-e2e-cat-local-webkit-7-rzbcda')
    - locator resolved to <button type="button" title="Image" data-pressable="" data-testid="category-image-e2e-cat-local-webkit-7-rzbcda" class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 foc…>…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-foot="" class="relative flex shrink-0 flex-wrap-reverse items-center justify-end gap-2 bg-card px-6 py-4 pb-[calc(1.375rem+env(safe-area-inset-bottom))] shadow-bar-up max-sm:[&>button]:flex-1">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <button type="button" data-pressable="" data-testid="category-edit-submit" class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-…>Save</button> from <div data-panel-foot="" class="relative flex shrink-0 flex-wrap-reverse items-center justify-end gap-2 bg-card px-6 py-4 pb-[calc(1.375rem+env(safe-area-inset-bottom))] shadow-bar-up max-sm:[&>button]:flex-1">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    23 × waiting for element to be visible, enabled and stable
```

Context:

```text
          - generic [ref=e60]:
            - checkbox "Accepts listings" [checked] [ref=e61] [cursor=pointer]:
              - generic:
                - img
            - generic [ref=e62]: Accepts listings
          - generic [ref=e64]:
            - checkbox "Price field enabled" [checked] [ref=e65] [cursor=pointer]:
              - generic:
                - img
            - generic [ref=e66]: Price field enabled
      - button "More below" [ref=e67]:
        - img [ref=e68]
        - text: More below
    - generic [ref=e70]:
      - button "Cancel" [ref=e71] [cursor=pointer]
      - button "Save" [ref=e72] [cursor=pointer]
    - button "Close" [ref=e73] [cursor=pointer]:
      - img [ref=e74]
      - generic [ref=e77]: Close
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4)

- Source: `webkit`
- Project: `webkit-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('listing-photo-remove-dialog').getByTestId('listing-photo-remove-reason-photo')
    - locator resolved to <button type="button" aria-pressed="false" data-testid="listing-photo-remove-reason-photo" class="inline-flex h-10 min-w-0 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input bg-card font-medium text-foreground shadow-xs hover:bg-accent">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-foot="" class="relative flex shrink-0 flex-wrap-reverse items-center justify-end gap-2 bg-card px-6 py-4 pb-[calc(1.375rem+env(safe-area-inset-bottom))] shadow-bar-up max-sm:[&>button]:flex-1">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-foot="" class="relative flex shrink-0 flex-wrap-reverse items-center justify-end gap-2 bg-card px-6 py-4 pb-[calc(1.375rem+env(safe-area-inset-bottom))] shadow-bar-up max-sm:[&>button]:flex-1">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    104 × waiting for element to be visible, enabled and stable
```

Context:

```text
                    - generic [ref=e31]: The site's rules
                  - button "Other" [ref=e32] [cursor=pointer]:
                    - generic [ref=e33]: Other
          - generic [ref=e34]:
            - generic [ref=e35]:
              - generic [ref=e36]: Note for the seller
              - generic [ref=e37]: Optional
            - textbox "Note for the seller Optional" [ref=e38]
            - paragraph [ref=e40]: Required when the reason is Other; at most 500 characters.
          - alert [ref=e41]: Choose a reason.
      - button "More below" [ref=e42]:
        - img [ref=e43]
        - text: More below
    - generic [ref=e45]:
      - button "Cancel" [ref=e46] [cursor=pointer]
      - button "Remove photo" [active] [ref=e47] [cursor=pointer]
    - button "Close" [ref=e48] [cursor=pointer]:
      - img [ref=e49]
      - generic [ref=e52]: Close
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4)

- Source: `webkit`
- Project: `webkit-390`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('listing-photo-remove-dialog').getByTestId('listing-photo-remove-reason-photo')
    - locator resolved to <button type="button" aria-pressed="false" data-testid="listing-photo-remove-reason-photo" class="inline-flex h-10 min-w-0 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input bg-card font-medium text-foreground shadow-xs hover:bg-accent">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-foot="" class="relative flex shrink-0 flex-wrap-reverse items-center justify-end gap-2 bg-card px-6 py-4 pb-[calc(1.375rem+env(safe-area-inset-bottom))] shadow-bar-up max-sm:[&>button]:flex-1">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <button type="button" data-pressable="" data-testid="listing-photo-remove-cancel" class="data-[pressed]:shadow-row-on data-[pressed]:transition-none data-[released]:transition-[background-color,box-shadow,color] data-[released]:duration-120 data-[released]:ease-out motion-reduce:transition-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:p…>Cancel</button> from <div data-panel-foot="" class="relative flex shrink-0 flex-wrap-reverse items-center justify-end gap-2 bg-card px-6 py-4 pb-[calc(1.375rem+env(safe-area-inset-bottom))] shadow-bar-up max-sm:[&>button]:flex-1">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    25 × waiting for element to be visible, enabled and stable
```

Context:

```text
                    - generic [ref=e31]: The site's rules
                  - button "Other" [ref=e32] [cursor=pointer]:
                    - generic [ref=e33]: Other
          - generic [ref=e34]:
            - generic [ref=e35]:
              - generic [ref=e36]: Note for the seller
              - generic [ref=e37]: Optional
            - textbox "Note for the seller Optional" [ref=e38]
            - paragraph [ref=e40]: Required when the reason is Other; at most 500 characters.
          - alert [ref=e41]: Choose a reason.
      - button "More below" [ref=e42]:
        - img [ref=e43]
        - text: More below
    - generic [ref=e45]:
      - button "Cancel" [ref=e46] [cursor=pointer]
      - button "Remove photo" [active] [ref=e47] [cursor=pointer]
    - button "Close" [ref=e48] [cursor=pointer]:
      - img [ref=e49]
      - generic [ref=e52]: Close
```
```

## dialogs.spec.ts › the full-screen surfaces on the one primitive (turn S6-4) › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: the pin map @ 1440 light: the 32rem card

expect(received).toBe(expected) // Object.is equality

Expected: 512
Received: 896
--- further error 1 ---
Error: the pin map @ 1440 light: the 32rem card

expect(received).toBe(expected) // Object.is equality

Expected: 512
Received: 896

  467 |       `${where}: the whole screen`,
  468 |     ).toEqual([0, 0, view.width, view.height]);
> 469 |   else expect(Math.round(box.width), `${where}: the 32rem card`).toBe(512);
      |                                                                  ^
  470 |   if (reduced) {
  471 |     const durations = await panel.evaluate((el) =>
  472 |       getComputedStyle(el)
    at opens (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/dialogs.spec.ts:469:66)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/dialogs.spec.ts:597:21
```

Context: context file not found for `dialogs-the-full-screen-surfaces-on-the-one-primitive-turn-S6-4-DLG-E8-the-photo-viewer-the-preview-and-the-pin-map-Escape-closes-the-top-layer-only-the-focus-returns-to-the-opener-the-page-does-not-move-reduced-motion-is-respected-webkit-1280` — Playwright's name `dialogs-the-full-screen-su-e8f79-reduced-motion-is-respected-webkit-1280`; this run carried 10 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-113 directions are saved, survive a pin move, and refuse a phone number

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    108 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-113-directions-are-saved-survive-a-pin-move-and-refuse-a-phone-number-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-fc528-e-and-refuse-a-phone-number-mobile-360`; this run carried 10 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-178 a late read of the place text never replaces a newer save

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    106 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-178-a-late-read-of-the-place-text-never-replaces-a-newer-save-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-7ecd4-never-replaces-a-newer-save-mobile-360`; this run carried 10 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-179 a pin save never restates directions the step could not read

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    94 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-179-a-pin-save-never-restates-directions-the-step-could-not-read-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-94e69-ons-the-step-could-not-read-mobile-360`; this run carried 10 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-186 a pin saved while the directions save is unanswered keeps both

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    129 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-186-a-pin-saved-while-the-directions-save-is-unanswered-keeps-both-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-2b2b1-ve-is-unanswered-keeps-both-mobile-360`; this run carried 10 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-113 directions are saved, survive a pin move, and refuse a phone number

- Source: `shard 3`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    110 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-113-directions-are-saved-survive-a-pin-move-and-refuse-a-phone-number-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-fc528-e-and-refuse-a-phone-number-desktop-1280`; this run carried 10 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-178 a late read of the place text never replaces a newer save

- Source: `shard 3`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    109 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-178-a-late-read-of-the-place-text-never-replaces-a-newer-save-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-7ecd4-never-replaces-a-newer-save-desktop-1280`; this run carried 10 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-179 a pin save never restates directions the step could not read

- Source: `shard 3`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    94 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-179-a-pin-save-never-restates-directions-the-step-could-not-read-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-94e69-ons-the-step-could-not-read-desktop-1280`; this run carried 10 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-186 a pin saved while the directions save is unanswered keeps both

- Source: `shard 3`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    127 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-186-a-pin-saved-while-the-directions-save-is-unanswered-keeps-both-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-2b2b1-ve-is-unanswered-keeps-both-desktop-1280`; this run carried 10 context file(s); of the same spec: none

## dialogs.spec.ts › one dialog look on a real surface (turn S6-1) › DLG-E7 Share this ad: a bottom sheet with its grabber below md, a floating dialog from md

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: share @ 390 padding

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    "0px",
    "0px",
-   "0px",
+   "22px",
    "0px",
  ]
--- further error 1 ---
Error: share @ 390 padding

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
    "0px",
    "0px",
-   "0px",
+   "22px",
    "0px",
  ]

  114 |   const look = await lookOf(panel);
  115 |   const bands = (await panel.getAttribute("data-bands")) !== null;
> 116 |   expect(look.padding, `${where} padding`).toEqual(
      |                                            ^
  117 |     bands ? ["0px", "0px", "0px", "0px"] : ["22px", "24px", "22px", "24px"],
```

Context:

```text
          - generic [ref=e27]:
            - img
          - generic [ref=e28]: WhatsApp
        - link "Facebook" [ref=e29]:
          - /url: https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F127.0.0.1%3A4173%2Fl%2Fe2e-ad-page-local-xx-fumfdoay-gruvkerwa4
          - generic [ref=e30]:
            - img
          - generic [ref=e31]: Facebook
        - button "Copy link" [active] [ref=e32]:
          - generic [ref=e33]:
            - img
          - generic [ref=e34]: Copy link
        - button "QR code" [ref=e35]:
          - generic [ref=e36]:
            - img
          - generic [ref=e37]: QR code
    - button "Close" [ref=e38] [cursor=pointer]:
      - img [ref=e39]
      - generic [ref=e42]: Close
```
```

## dialogs.spec.ts › the full-screen surfaces on the one primitive (turn S6-4) › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: the pin map @ 1440 light: the 32rem card

expect(received).toBe(expected) // Object.is equality

Expected: 512
Received: 896
--- further error 1 ---
Error: the pin map @ 1440 light: the 32rem card

expect(received).toBe(expected) // Object.is equality

Expected: 512
Received: 896

  467 |       `${where}: the whole screen`,
  468 |     ).toEqual([0, 0, view.width, view.height]);
> 469 |   else expect(Math.round(box.width), `${where}: the 32rem card`).toBe(512);
      |                                                                  ^
  470 |   if (reduced) {
  471 |     const durations = await panel.evaluate((el) =>
  472 |       getComputedStyle(el)
    at opens (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/dialogs.spec.ts:469:66)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/dialogs.spec.ts:597:21
```

Context: context file not found for `dialogs-the-full-screen-surfaces-on-the-one-primitive-turn-S6-4-DLG-E8-the-photo-viewer-the-preview-and-the-pin-map-Escape-closes-the-top-layer-only-the-focus-returns-to-the-opener-the-page-does-not-move-reduced-motion-is-respected-desktop-1280` — Playwright's name `dialogs-the-full-screen-su-e8f79-reduced-motion-is-respected-desktop-1280`; this run carried 10 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact

- Source: `shard 11`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    110 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-37-a-tap-on-the-map-places-a-pin-and-the-door-stores-it-as-exact-mobile-360` — Playwright's name `post-wizard-place-POSTING--90a6a-the-door-stores-it-as-exact-mobile-360`; this run carried 10 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point

- Source: `shard 11`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="8.54000" data-testid="post-pin-map" data-center-lng="39.27000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span class="text-xs font-normal text-muted-foreground">Optional</span> from <div data-form-field="" data-testid="post-field" data-field="post-pin-street" class="scroll-mt-20 space-y-1">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span class="text-xs font-normal text-muted-foreground">Optional</span> from <div data-form-field="" data-testid="post-field" data-field="post-pin-street" class="scroll-mt-20 space-y-1">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    109 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-39-an-approximate-pin-is-stored-as-approx-and-drawn-as-an-area-never-a-point-mobile-360` — Playwright's name `post-wizard-place-POSTING--7d413-wn-as-an-area-never-a-point-mobile-360`; this run carried 10 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-40 removing the pin clears all four columns

- Source: `shard 11`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <p data-lat="" data-lng="" class="text-sm text-foreground" data-testid="post-pin-sheet-position">No pin yet.</p> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <p data-lat="" data-lng="" class="text-sm text-foreground" data-testid="post-pin-sheet-position">No pin yet.</p> intercepts pointer events
    - retrying click action
      - waiting 100ms
    109 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-40-removing-the-pin-clears-all-four-columns-mobile-360` — Playwright's name `post-wizard-place-POSTING--dcdc1-pin-clears-all-four-columns-mobile-360`; this run carried 10 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-160 Use my location stays pressed until the pin is moved by hand

- Source: `shard 11`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="16" data-outline="0" data-provider="osm" data-center-lat="9.01080" data-testid="post-pin-map" data-center-lng="38.76130" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    109 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-160-Use-my-location-stays-pressed-until-the-pin-is-moved-by-hand-mobile-360` — Playwright's name `post-wizard-place-POSTING--be1b3-il-the-pin-is-moved-by-hand-mobile-360`; this run carried 10 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact

- Source: `shard 11`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    109 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-37-a-tap-on-the-map-places-a-pin-and-the-door-stores-it-as-exact-desktop-1280` — Playwright's name `post-wizard-place-POSTING--90a6a-the-door-stores-it-as-exact-desktop-1280`; this run carried 10 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point

- Source: `shard 11`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="8.54000" data-testid="post-pin-map" data-center-lng="39.27000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span class="text-xs font-normal text-muted-foreground">Optional</span> from <div data-form-field="" data-testid="post-field" data-field="post-pin-street" class="scroll-mt-20 space-y-1">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span class="text-xs font-normal text-muted-foreground">Optional</span> from <div data-form-field="" data-testid="post-field" data-field="post-pin-street" class="scroll-mt-20 space-y-1">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    109 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-39-an-approximate-pin-is-stored-as-approx-and-drawn-as-an-area-never-a-point-desktop-1280` — Playwright's name `post-wizard-place-POSTING--7d413-wn-as-an-area-never-a-point-desktop-1280`; this run carried 10 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-40 removing the pin clears all four columns

- Source: `shard 11`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <p data-lat="" data-lng="" class="text-sm text-foreground" data-testid="post-pin-sheet-position">No pin yet.</p> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <p data-lat="" data-lng="" class="text-sm text-foreground" data-testid="post-pin-sheet-position">No pin yet.</p> intercepts pointer events
    - retrying click action
      - waiting 100ms
    110 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-40-removing-the-pin-clears-all-four-columns-desktop-1280` — Playwright's name `post-wizard-place-POSTING--dcdc1-pin-clears-all-four-columns-desktop-1280`; this run carried 10 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-160 Use my location stays pressed until the pin is moved by hand

- Source: `shard 11`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="16" data-outline="0" data-provider="osm" data-center-lat="9.01080" data-testid="post-pin-map" data-center-lng="38.76130" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    110 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-160-Use-my-location-stays-pressed-until-the-pin-is-moved-by-hand-desktop-1280` — Playwright's name `post-wizard-place-POSTING--be1b3-il-the-pin-is-moved-by-hand-desktop-1280`; this run carried 10 context file(s); of the same spec: none

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-92 a refused tile plan falls back to OSM; the pin still drops and Save stays on screen

- Source: `shard 11`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    112 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-92-a-refused-tile-plan-falls-back-to-OSM-the-pin-still-drops-and-Save-stays-on-screen-mobile-360` — Playwright's name `post-wizard-where-POSTING--b0fda-ps-and-Save-stays-on-screen-mobile-360`; this run carried 10 context file(s); of the same spec: none

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-100 every category offers the map; after Save the preview shows the pin

- Source: `shard 11`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    111 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-100-every-category-offers-the-map-after-Save-the-preview-shows-the-pin-mobile-360` — Playwright's name `post-wizard-where-POSTING--c95da-e-the-preview-shows-the-pin-mobile-360`; this run carried 10 context file(s); of the same spec: none

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-96 the saved pin keeps its zoom; the dropper reopens at it

- Source: `shard 11`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    110 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-96-the-saved-pin-keeps-its-zoom-the-dropper-reopens-at-it-mobile-360` — Playwright's name `post-wizard-where-POSTING--3066b-m-the-dropper-reopens-at-it-mobile-360`; this run carried 10 context file(s); of the same spec: none

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-92 a refused tile plan falls back to OSM; the pin still drops and Save stays on screen

- Source: `shard 11`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    112 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-92-a-refused-tile-plan-falls-back-to-OSM-the-pin-still-drops-and-Save-stays-on-screen-desktop-1280` — Playwright's name `post-wizard-where-POSTING--b0fda-ps-and-Save-stays-on-screen-desktop-1280`; this run carried 10 context file(s); of the same spec: none

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-100 every category offers the map; after Save the preview shows the pin

- Source: `shard 11`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    112 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-100-every-category-offers-the-map-after-Save-the-preview-shows-the-pin-desktop-1280` — Playwright's name `post-wizard-where-POSTING--c95da-e-the-preview-shows-the-pin-desktop-1280`; this run carried 10 context file(s); of the same spec: none

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-96 the saved pin keeps its zoom; the dropper reopens at it

- Source: `shard 11`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-pin-map')
    - locator resolved to <div tabindex="0" data-ready="1" data-zoom="14" data-outline="0" data-provider="osm" data-center-lat="9.03000" data-testid="post-pin-map" data-center-lng="38.74000" class="isolate h-72 w-full overflow-hidden rounded-md border border-border sm:h-80 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom">…</div>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div data-panel-body="" data-testid="post-pin" class="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-6 py-4">…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    112 × waiting for element to be visible, enabled and stable
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-96-the-saved-pin-keeps-its-zoom-the-dropper-reopens-at-it-desktop-1280` — Playwright's name `post-wizard-where-POSTING--3066b-m-the-dropper-reopens-at-it-desktop-1280`; this run carried 10 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-screen viewer

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: PP-22: on a computer the thumbnails are not beside the photo

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 317
Received:    685.59375
--- further error 1 ---
Error: PP-22: on a computer the thumbnails are not beside the photo

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 317
Received:    685.59375

  1280 |         thumbsBox!.x + thumbsBox!.width,
  1281 |         "PP-22: on a computer the thumbnails are not beside the photo",
> 1282 |       ).toBeLessThanOrEqual(mainBox!.x + 1);
       |         ^
  1283 |     }
  1284 |
  1285 |     // A thumbnail shows its photo; the arrows step and stop at the ends.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1282:9
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-22-the-buyer-s-preview-is-a-gallery-thumbnails-arrows-a-swipe-and-a-full-screen-viewer-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-5eb1a-pe-and-a-full-screen-viewer-desktop-1280`; this run carried 10 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613)

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: PP-23: on a computer the wide photo's top does not meet the first thumbnail's

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    250.5419921875

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: PP-23: on a computer the wide photo's top does not meet the first thumbnail's

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    250.5419921875

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  1389 |       // (object-fit contain, at its object-position), against the first thumbnail.
  1390 |       const first = gallery.getByTestId("gallery-thumb").nth(0);
> 1391 |       await expect
       |       ^
  1392 |         .poll(
  1393 |           async () => {
  1394 |             const drawnTop = await image.evaluate((element: HTMLImageElement) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1391:7
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-23-the-gallery-draws-the-middle-size-and-on-a-computer-a-wide-photo-s-top-meets-the-first-thumbnail-D162-INC-613-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-63be5-rst-thumbnail-D162-INC-613--desktop-1280`; this run carried 10 context file(s); of the same spec: none

## Server errors: webkit

No `[ssr-error]` lines in the `webkit` log (or no log was uploaded).

## Client errors: webkit

```text
[client-error] pageerror: Fetch API cannot load https://127.0.0.1:31321/rest/v1/rpc/get_active_impersonation due to access control checks. at fetch ([native code]:0:0) ×2
```

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×4
[client-error] console.error: [pin] place text read failed: TypeError: Failed to fetch
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×4
[client-error] console.error: [pin] place text read failed: TypeError: Failed to fetch
[client-error] console.error: [pin] set_listing_pin refused: TypeError: Failed to fetch ×2
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×4
[client-error] console.error: [pin] place text read failed: TypeError: Failed to fetch
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×4
[client-error] console.error: [pin] place text read failed: TypeError: Failed to fetch
[client-error] console.error: [pin] set_listing_pin refused: TypeError: Failed to fetch ×2
```

## Server errors: shard 10

No `[ssr-error]` lines in the `shard 10` log (or no log was uploaded).

## Client errors: shard 10

No `[client-error]` lines in the `shard 10` log (or no log was uploaded).

## Server errors: shard 11

No `[ssr-error]` lines in the `shard 11` log (or no log was uploaded).

## Client errors: shard 11

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 (Forbidden)
[client-error] HTTP 403 GET /api/map/tiles ({})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 (Forbidden)
[client-error] HTTP 403 GET /api/map/tiles ({})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 (Forbidden)
[client-error] HTTP 403 GET /api/map/tiles ({})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 (Forbidden)
[client-error] HTTP 403 GET /api/map/tiles ({})
```

## Server errors: shard 16

No `[ssr-error]` lines in the `shard 16` log (or no log was uploaded).

## Client errors: shard 16

No `[client-error]` lines in the `shard 16` log (or no log was uploaded).
