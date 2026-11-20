# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44704920803
- Commit: `5eb894419ca0dca6dcfa1c3332481e1ba60a069c`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-20T08:57:40.946Z
- Passed: 2547 · Skipped: 360 · Failed: 1
- Gating failures: 1 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

64 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

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
| `rateLimited:<n>-<n>-<n>T<n>:<n>:<n>+<n>:<n>` | 2 | shard 2 |
| `strings badHeader` (quiet) | 2 | shard 4 |
| `strings emptyFile` (quiet) | 2 | shard 4 |
| `strings nulByte` (quiet) | 2 | shard 4 |
| `strings tooManyRows` (quiet) | 2 | shard 4 |
| `strings unknownColumn` (quiet) | 2 | shard 4 |
| `strings wrongFile` (quiet) | 2 | shard 4 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### rateLimited:<n>-<n>-<n>T<n>:<n>:<n>+<n>:<n>

- Count: 2 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-7 the draft dial refuses by name once the ceiling is reached ×2 · PR-8 no bearer is 401 on every posting route ×2

```text
[WebServer] [ssr-error] /api/listings/draft rateLimited:2026-11-20T09:00:00+00:00
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-20T08:48:37.350Z | 4.4 min |
| email | 2026-11-20T08:49:07.055Z | 0.4 min |
| webkit | 2026-11-20T08:48:12.584Z | 6.9 min |
| shard 1 | 2026-11-20T08:48:33.768Z | 6.1 min |
| shard 2 | 2026-11-20T08:47:43.827Z | 5.3 min |
| shard 3 | 2026-11-20T08:51:27.358Z | 5.6 min |
| shard 4 | 2026-11-20T08:48:59.214Z | 5.4 min |
| shard 5 | 2026-11-20T08:48:52.880Z | 6.6 min |
| shard 6 | 2026-11-20T08:48:40.025Z | 5.6 min |
| shard 7 | 2026-11-20T08:47:52.113Z | 5.2 min |
| shard 8 | 2026-11-20T08:48:01.638Z | 5.9 min |
| shard 9 | 2026-11-20T08:50:06.664Z | 6.1 min |
| shard 10 | 2026-11-20T08:48:05.675Z | 6.4 min |
| shard 11 | 2026-11-20T08:48:24.078Z | 5.6 min |
| shard 12 | 2026-11-20T08:48:46.468Z | 7.9 min |
| shard 13 | 2026-11-20T08:49:22.244Z | 4.8 min |
| shard 14 | 2026-11-20T08:48:13.176Z | 5.3 min |
| shard 15 | 2026-11-20T08:48:28.763Z | 6.1 min |
| shard 16 | 2026-11-20T08:49:41.934Z | 5.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.4 min | shard 1 |
| `post-wizard-specs.spec.ts` | 82 | 5.9 min | shard 12 |
| `admin-listings.spec.ts` | 78 | 5.8 min | webkit, shard 10 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 2 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 5 |
| `admin-translations-console.spec.ts` | 46 | 4.9 min | smoke, shard 8 |
| `import-security.spec.ts` | 36 | 4.9 min | shard 4 |
| `admin-roles.spec.ts` | 28 | 4.8 min | shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.7 min | shard 3 |
| `admin-screening.spec.ts` | 58 | 4.7 min | webkit, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 6 |
| `admin-monetisation.spec.ts` | 34 | 4.4 min | smoke, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 4.3 min | shard 7 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 11 |
| `my-listings-ad.spec.ts` | 38 | 4.1 min | shard 12 |
| `ad-page.spec.ts` | 104 | 4.1 min | webkit, shard 13 |
| `photo-pipeline.spec.ts` | 74 | 4.0 min | webkit, shard 16 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 16 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 15 |
| `auth-signout.spec.ts` | 36 | 3.4 min | shard 9 |
| `admin-translations-governance.spec.ts` | 20 | 3.4 min | smoke, shard 16 |
| `post-wizard-pricing.spec.ts` | 52 | 3.4 min | shard 8 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.8 min | shard 5 |
| `dialogs.spec.ts` | 20 | 2.8 min | webkit, shard 10 |
| `post-wizard-category.spec.ts` | 52 | 2.6 min | webkit, shard 4 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 2.2 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 2.1 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 2 |
| `admin-audit.spec.ts` | 16 | 1.9 min | shard 9 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `admin-attributes-import.spec.ts` | 40 | 1.8 min | shard 8 |
| `mfa-stepup.spec.ts` | 22 | 1.7 min | webkit, shard 15 |
| `sage-ad-page.spec.ts` | 30 | 1.7 min | webkit, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `phone-frame.spec.ts` | 18 | 1.6 min | shard 12 |
| `press.spec.ts` | 22 | 1.5 min | shard 12 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `my-listings-page.spec.ts` | 20 | 1.1 min | webkit, shard 10 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 9 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 15 |
| `sage-cards.spec.ts` | 40 | 0.7 min | webkit, shard 7 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.5 min | shard 5 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 13 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `shell-bands.spec.ts` | 16 | 0.4 min | shard 12 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 9 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 10 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 1 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 46.3 s |
| `admin-monetisation.spec.ts` › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back | mobile-360 | 46.1 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 45.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.6 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.4 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.4 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.9 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 44704920803-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44704920803-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 44704920803-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44704920803-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 44704920803-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44704920803-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 44704920803-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 44704920803-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44704920803-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44704920803-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 44704920803-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 44704920803-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 44704920803-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44704920803-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44704920803-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44704920803-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 44704920803-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 44704920803-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 44704920803-local-16
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('product-e2e_mon_perk_local10_0_m-perks').locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)').getByTestId('override-[account id]-card').getByTestId('override-[account id]-photos')
Expected: ""
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('product-e2e_mon_perk_local10_0_m-perks').locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)').getByTestId('override-[account id]-card').getByTestId('override-[account id]-photos')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('product-e2e_mon_perk_local10_0_m-perks').locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)').getByTestId('override-[account id]-card').getByTestId('override-[account id]-photos')
Expected: ""
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('product-e2e_mon_perk_local10_0_m-perks').locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)').getByTestId('override-[account id]-card').getByTestId('override-[account id]-photos')


  899 |     await expect(rootRow).toBeVisible({ timeout: 20000 });
  900 |     await expect(rootRow.getByTestId(`override-${byRoot?.id}-days`)).toHaveText("45");
> 901 |     await expect(rootRow.getByTestId(`override-${byRoot?.id}-photos`)).toHaveText("");
      |                                                                        ^
  902 |     await expect(rootRow.getByTestId(`override-${byRoot?.id}-country`)).toHaveText(
  903 |       en["admin.monetisation.countryAny"],
  904 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:901:72
```

Context:

```text
          - listitem [ref=e947]:
            - generic [ref=e948]: About
          - listitem [ref=e949]:
            - generic [ref=e950]: Contact
      - navigation "Help" [ref=e951]:
        - heading "Help" [level=2] [ref=e952]
        - list [ref=e953]:
          - listitem [ref=e954]:
            - generic [ref=e955]: Safety
      - navigation "Legal" [ref=e956]:
        - heading "Legal" [level=2] [ref=e957]
        - list [ref=e958]:
          - listitem [ref=e959]:
            - link "Terms" [ref=e960] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e961]:
            - link "Privacy" [ref=e962] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e964]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 10

No `[ssr-error]` lines in the `shard 10` log (or no log was uploaded).

## Client errors: shard 10

No `[client-error]` lines in the `shard 10` log (or no log was uploaded).
