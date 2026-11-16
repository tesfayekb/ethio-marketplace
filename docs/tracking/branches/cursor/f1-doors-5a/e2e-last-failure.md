# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43797120892
- Commit: `88e6f6c7c9512942fa1d82691ef3d163e45eb86f`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-0b8abc8b7c2d… (0 read)
- Repeat: 32 of 144 tests repeated — specs directly changed 3/7, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-16T03:30:57.743Z
- Passed: 2673 · Skipped: 360 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 20 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

69 line(s), 29 message(s): 2 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `notYourListing` | 5 | shard 2, shard 3, shard 12 |
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
| `rateLimited` | 2 | shard 2 |
| `strings badHeader` (quiet) | 2 | shard 4 |
| `strings emptyFile` (quiet) | 2 | shard 4 |
| `strings nulByte` (quiet) | 2 | shard 4 |
| `strings tooManyRows` (quiet) | 2 | shard 4 |
| `strings unknownColumn` (quiet) | 2 | shard 4 |
| `strings wrongFile` (quiet) | 2 | shard 4 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### notYourListing

- Count: 5 · Sources: shard 2, shard 3, shard 12
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · AT-5 delete: refused while linked, accepted once unlinked ×1 · PR-3 a complete draft publishes to screening and never to active ×1 · PW-146 a saved place with a street line but no pin carries its lines to a new dr ×1 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1 · PW-188 a list that hangs under another answer offers its shared Other last under ×1

```text
[WebServer] [ssr-error] /api/listings/draft notYourListing
```

### rateLimited

- Count: 2 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-7 the draft dial refuses by name once the ceiling is reached ×2 · PR-8 no bearer is 401 on every posting route ×2

```text
[WebServer] [ssr-error] /api/listings/draft rateLimited
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-16T03:19:39.786Z | 3.7 min |
| email | 2026-11-16T03:20:20.880Z | 0.3 min |
| webkit | 2026-11-16T03:19:43.387Z | 6.8 min |
| shard 1 | 2026-11-16T03:23:59.289Z | 5.9 min |
| shard 2 | 2026-11-16T03:20:02.119Z | 7.4 min |
| shard 3 | 2026-11-16T03:19:27.741Z | 5.9 min |
| shard 4 | 2026-11-16T03:19:04.924Z | 5.3 min |
| shard 5 | 2026-11-16T03:19:14.004Z | 6.3 min |
| shard 6 | 2026-11-16T03:19:31.678Z | 5.6 min |
| shard 7 | 2026-11-16T03:19:17.128Z | 5.7 min |
| shard 8 | 2026-11-16T03:20:02.831Z | 7.2 min |
| shard 9 | 2026-11-16T03:20:01.878Z | 6.0 min |
| shard 10 | 2026-11-16T03:19:14.497Z | 5.3 min |
| shard 11 | 2026-11-16T03:21:00.924Z | 6.2 min |
| shard 12 | 2026-11-16T03:19:58.938Z | 7.3 min |
| shard 13 | 2026-11-16T03:19:58.291Z | 5.6 min |
| shard 14 | 2026-11-16T03:19:12.231Z | 5.2 min |
| shard 15 | 2026-11-16T03:19:33.181Z | 6.2 min |
| shard 16 | 2026-11-16T03:19:29.505Z | 5.5 min |
| repeat | 2026-11-16T03:21:20.548Z | 8.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-users.spec.ts` | 84 | 10.6 min | shard 16, repeat |
| `shell.spec.ts` | 234 | 10.2 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 7.0 min | shard 2 |
| `admin-translations-console.spec.ts` | 46 | 5.7 min | smoke, shard 8 |
| `post-wizard-specs.spec.ts` | 82 | 5.5 min | shard 12 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.2 min | shard 3 |
| `admin-listings.spec.ts` | 78 | 5.2 min | webkit, shard 10 |
| `ad-page.spec.ts` | 104 | 4.8 min | webkit, shard 13 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `import-security.spec.ts` | 36 | 4.8 min | shard 4 |
| `post-wizard-place.spec.ts` | 40 | 4.8 min | shard 11 |
| `admin-roles.spec.ts` | 28 | 4.7 min | shard 9 |
| `admin-categories-console.spec.ts` | 34 | 4.7 min | shard 7 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 6 |
| `admin-screening.spec.ts` | 58 | 4.4 min | webkit, shard 14 |
| `admin-attributes-links.spec.ts` | 34 | 4.3 min | shard 13 |
| `post-wizard-pricing.spec.ts` | 52 | 4.3 min | shard 8 |
| `photo-pipeline.spec.ts` | 74 | 4.0 min | webkit, shard 16 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 11 |
| `my-listings-ad.spec.ts` | 38 | 3.6 min | shard 12 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `posting-routes.spec.ts` | 80 | 3.4 min | shard 2 |
| `auth-signout.spec.ts` | 36 | 3.3 min | shard 9 |
| `admin-monetisation.spec.ts` | 34 | 3.3 min | smoke, shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `choice-lists.spec.ts` | 96 | 2.9 min | shard 7 |
| `admin-translations-data.spec.ts` | 10 | 2.7 min | shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 2.6 min | shard 8 |
| `post-wizard-category.spec.ts` | 52 | 2.6 min | webkit, shard 4 |
| `dialogs.spec.ts` | 20 | 2.5 min | webkit, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `legal-admin.spec.ts` | 44 | 2.1 min | shard 7 |
| `sage-tiers.spec.ts` | 52 | 2.0 min | webkit, shard 2 |
| `sage-ad-page.spec.ts` | 30 | 1.9 min | webkit, shard 11 |
| `admin-audit.spec.ts` | 16 | 1.8 min | shard 9 |
| `mfa-stepup.spec.ts` | 22 | 1.7 min | webkit, shard 15 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `admin-shell.spec.ts` | 12 | 1.4 min | shard 2 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 12 |
| `press.spec.ts` | 22 | 1.3 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.2 min | shard 11 |
| `my-listings-doors.spec.ts` | 84 | 1.2 min | shard 3, repeat |
| `auth-caller-gates.spec.ts` | 24 | 1.1 min | shard 5, repeat |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `user-guides.spec.ts` | 18 | 1.0 min | shard 13 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 9 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `legal-doors.spec.ts` | 34 | 0.9 min | smoke, shard 8 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `supabase-door.spec.ts` | 12 | 0.6 min | shard 13 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 9 |
| `shell-bands.spec.ts` | 16 | 0.4 min | shard 12 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `submenu-look.spec.ts` | 12 | 0.3 min | shard 2 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 10 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | shard 8 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 2 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 1 |
| `dark-cards.spec.ts` | 4 | 0.0 min | shard 10 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-data.spec.ts` › TR-14 the Data scope edits and approves a location name | desktop-1280 | 54.6 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 46.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.9 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 35.5 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 32.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43797120892-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43797120892-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 43797120892-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43797120892-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 43797120892-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43797120892-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 43797120892-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 43797120892-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43797120892-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43797120892-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 3, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 43797120892-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 43797120892-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43797120892-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43797120892-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43797120892-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43797120892-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 43797120892-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 43797120892-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 43797120892-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 2, fresh 13)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 43797120892-local-repeat
```

## admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "edited:አዲስ አበባ 43797120892-local-5"
Received: "none:"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "edited:አዲስ አበባ 43797120892-local-5"
Received: "none:"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  209 |       });
  210 |
> 211 |       await expect
      |       ^
  212 |         .poll(
  213 |           async () => {
  214 |             const { data } = await supabase
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-data.spec.ts:211:7
```

Context:

```text
          - listitem [ref=e368]:
            - generic [ref=e369]: About
          - listitem [ref=e370]:
            - generic [ref=e371]: Contact
      - navigation "Help" [ref=e372]:
        - heading "Help" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - generic [ref=e376]: Safety
      - navigation "Legal" [ref=e377]:
        - heading "Legal" [level=2] [ref=e378]
        - list [ref=e379]:
          - listitem [ref=e380]:
            - link "Terms" [ref=e381] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e382]:
            - link "Privacy" [ref=e383] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e385]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).
