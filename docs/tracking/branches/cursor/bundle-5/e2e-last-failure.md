# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45187492568
- Commit: `4f7ae8837be6c4eb1ed8152e1d6a8ee119e34a6c`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-a579f106ddf3… (0 read)
- Repeat: 30 of 219 tests repeated — specs directly changed 2/4, importers of a changed helper 2/9; budget 643 s; the time cap left 2 test runs; the time cap stopped the serial pass
- Written (UTC): 2026-11-23T14:09:39.188Z
- Passed: 2708 · Skipped: 370 · Failed: 2
- Gating failures: 2 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): repeat (2)

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 763s for the test suite to run
(no place given)
```

```text
Timed out waiting 763s for the teardown for test suite to run
(no place given)
```

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
| smoke | 2026-11-23T13:52:11.241Z | 3.8 min |
| email | 2026-11-23T13:51:24.292Z | 0.3 min |
| webkit | 2026-11-23T13:59:28.911Z | 9.1 min |
| shard 1 | 2026-11-23T13:53:55.122Z | 5.5 min |
| shard 2 | 2026-11-23T13:55:21.360Z | 6.4 min |
| shard 3 | 2026-11-23T13:51:52.530Z | 7.3 min |
| shard 4 | 2026-11-23T13:54:23.119Z | 5.0 min |
| shard 5 | 2026-11-23T13:52:04.480Z | 6.1 min |
| shard 6 | 2026-11-23T13:53:13.424Z | 5.7 min |
| shard 7 | 2026-11-23T13:52:00.336Z | 7.1 min |
| shard 8 | 2026-11-23T13:55:33.989Z | 5.5 min |
| shard 9 | 2026-11-23T13:52:03.185Z | 6.3 min |
| shard 10 | 2026-11-23T13:53:19.829Z | 5.7 min |
| shard 11 | 2026-11-23T13:55:53.273Z | 5.9 min |
| shard 12 | 2026-11-23T13:52:10.675Z | 5.7 min |
| shard 13 | 2026-11-23T13:57:19.972Z | 4.9 min |
| shard 14 | 2026-11-23T13:51:20.932Z | 5.6 min |
| shard 15 | 2026-11-23T13:51:13.480Z | 6.1 min |
| shard 16 | 2026-11-23T13:52:07.893Z | 7.2 min |
| repeat | 2026-11-23T13:54:08.800Z | 12.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-categories-console.spec.ts` | 102 | 14.7 min | shard 7, repeat |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.2 min | shard 3 |
| `admin-attributes-library.spec.ts` | 42 | 6.1 min | shard 2 |
| `photo-pipeline.spec.ts` | 74 | 5.5 min | webkit, shard 16 |
| `admin-listings.spec.ts` | 82 | 5.2 min | webkit, shard 10 |
| `auth-signout.spec.ts` | 44 | 5.2 min | webkit, shard 9 |
| `admin-screening.spec.ts` | 64 | 5.1 min | webkit, shard 14 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-users.spec.ts` | 28 | 4.7 min | shard 16 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `admin-locations.spec.ts` | 44 | 4.7 min | shard 6 |
| `dialogs.spec.ts` | 36 | 4.6 min | webkit, shard 10 |
| `import-security.spec.ts` | 36 | 4.5 min | shard 4 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 11 |
| `post-wizard-specs.spec.ts` | 82 | 4.2 min | shard 12 |
| `ad-page.spec.ts` | 104 | 4.2 min | webkit, shard 13 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.9 min | shard 11 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `choice-lists.spec.ts` | 96 | 3.7 min | shard 7 |
| `my-listings-ad.spec.ts` | 38 | 3.5 min | shard 12 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.3 min | shard 15 |
| `admin-monetisation.spec.ts` | 34 | 3.2 min | smoke, shard 10 |
| `admin-translations-governance.spec.ts` | 20 | 3.1 min | smoke, shard 16 |
| `posting-routes.spec.ts` | 80 | 3.0 min | shard 2 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 3.0 min | shard 3 |
| `legal-admin.spec.ts` | 44 | 2.7 min | shard 7 |
| `post-wizard-category.spec.ts` | 52 | 2.5 min | webkit, shard 4 |
| `house-style.spec.ts` | 54 | 2.5 min | shard 11, repeat |
| `admin-categories-images.spec.ts` | 14 | 2.4 min | smoke, webkit, shard 12, repeat |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `mfa-stepup.spec.ts` | 28 | 2.2 min | webkit, shard 15 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 5 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `legal-certify.spec.ts` | 44 | 1.6 min | shard 14 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `sage-tiers.spec.ts` | 52 | 1.5 min | webkit, shard 2 |
| `admin-guides.spec.ts` | 14 | 1.4 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.4 min | shard 3 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `sage-shell.spec.ts` | 80 | 1.1 min | shard 16 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 10 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 15 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 16 |
| `ad-page-doors.spec.ts` | 30 | 0.6 min | shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `my-listings-levels.spec.ts` | 28 | 0.5 min | shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `admin-ai-calls.spec.ts` | 6 | 0.4 min | shard 11, repeat |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 15 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 7 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 9 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 15 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
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
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.9 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.6 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 34.0 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 33.8 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 33.8 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 33.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 31.1 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 31.1 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.3 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45187492568-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45187492568-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45187492568-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45187492568-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 45187492568-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45187492568-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 45187492568-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 45187492568-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45187492568-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45187492568-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 45187492568-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 45187492568-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45187492568-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45187492568-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45187492568-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45187492568-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45187492568-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 34 (pool 2, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 49 user(s) owned by process 45187492568-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 45187492568-local-16
```

## dialogs.spec.ts › a Filters panel in rows (Lovable bundle 3) › DLG-E12 a filter row's list opens in the panel's flow under its row with its choices in view above the footer; one press opens another row's list; Escape closes the list, then the panel

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: DLG-E12 the choices a person sees @ 834 x 900

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 6
Received:    3
--- further error 1 ---
Error: DLG-E12 the choices a person sees @ 834 x 900

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 6
Received:    3

  814 |         tall?.choicesInView ?? 0,
  815 |         `DLG-E12 the choices a person sees @ ${width} x 900`,
> 816 |       ).toBeGreaterThanOrEqual(Math.min(tall?.choices ?? 0, 6));
      |         ^
  817 |
  818 |       // Several at once (DEC-420): the list stays open and marks each choice.
  819 |       await panel.getByTestId("style-filters-colour-Red").click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/dialogs.spec.ts:816:9
```

Context:

```text
              - option "Pink" [ref=e1802]:
                - generic [ref=e1803]: Pink
              - option "Orange" [ref=e1804]:
                - generic [ref=e1805]: Orange
              - option "Grey" [ref=e1806]:
                - generic [ref=e1807]: Grey
              - option "Silver" [ref=e1808]:
                - generic [ref=e1809]: Silver
        - generic [ref=e1812]:
          - generic "Size" [ref=e1813]
          - button "Size All" [ref=e1815] [cursor=pointer]:
            - generic [ref=e1816]: All
            - img
      - generic:
        - img
        - generic: More below
    - generic [ref=e1817]:
      - button "Clear all" [disabled]
      - button "Done" [disabled]
```
```

## dialogs.spec.ts › a Filters panel in rows (Lovable bundle 3) › DLG-E12 a filter row's list opens in the panel's flow under its row with its choices in view above the footer; one press opens another row's list; Escape closes the list, then the panel

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: DLG-E12 the choices a person sees @ 834 x 900

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 6
Received:    2
--- further error 1 ---
Error: DLG-E12 the choices a person sees @ 834 x 900

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 6
Received:    2

  814 |         tall?.choicesInView ?? 0,
  815 |         `DLG-E12 the choices a person sees @ ${width} x 900`,
> 816 |       ).toBeGreaterThanOrEqual(Math.min(tall?.choices ?? 0, 6));
      |         ^
  817 |
  818 |       // Several at once (DEC-420): the list stays open and marks each choice.
  819 |       await panel.getByTestId("style-filters-colour-Red").click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/dialogs.spec.ts:816:9
```

Context:

```text
              - option "Pink" [ref=e1802]:
                - generic [ref=e1803]: Pink
              - option "Orange" [ref=e1804]:
                - generic [ref=e1805]: Orange
              - option "Grey" [ref=e1806]:
                - generic [ref=e1807]: Grey
              - option "Silver" [ref=e1808]:
                - generic [ref=e1809]: Silver
        - generic [ref=e1812]:
          - generic "Size" [ref=e1813]
          - button "Size All" [ref=e1815] [cursor=pointer]:
            - generic [ref=e1816]: All
            - img
      - generic:
        - img
        - generic: More below
    - generic [ref=e1817]:
      - button "Clear all" [disabled]
      - button "Done" [disabled]
```
```

## Server errors: webkit

No `[ssr-error]` lines in the `webkit` log (or no log was uploaded).

## Client errors: webkit

No `[client-error]` lines in the `webkit` log (or no log was uploaded).

## Server errors: shard 10

No `[ssr-error]` lines in the `shard 10` log (or no log was uploaded).

## Client errors: shard 10

No `[client-error]` lines in the `shard 10` log (or no log was uploaded).
