# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44613326890
- Commit: `ed6cd485156c38d9c6a91f5a0e9a0e906b9665cb`
- Attempt: 1
- Repeat: nothing to repeat
- Written (UTC): 2026-11-19T21:24:18.520Z
- Passed: 2544 · Skipped: 360 · Failed: 2
- Gating failures: 2 · STAGING-SINK (INC-1175, still gating): 0
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
| smoke | 2026-11-19T20:58:18.499Z | 4.2 min |
| email | 2026-11-19T21:00:26.019Z | 0.3 min |
| webkit | 2026-11-19T21:16:15.045Z | 7.4 min |
| shard 1 | 2026-11-19T20:58:41.941Z | 6.2 min |
| shard 2 | 2026-11-19T20:58:08.481Z | 6.1 min |
| shard 3 | 2026-11-19T21:03:35.597Z | 5.5 min |
| shard 4 | 2026-11-19T20:58:01.777Z | 5.4 min |
| shard 5 | 2026-11-19T21:00:42.195Z | 6.1 min |
| shard 6 | 2026-11-19T21:00:55.038Z | 5.6 min |
| shard 7 | 2026-11-19T20:58:39.437Z | 5.2 min |
| shard 8 | 2026-11-19T20:58:31.360Z | 7.2 min |
| shard 9 | 2026-11-19T20:59:55.796Z | 6.7 min |
| shard 10 | 2026-11-19T20:58:41.836Z | 9.0 min |
| shard 11 | 2026-11-19T21:01:45.951Z | 5.7 min |
| shard 12 | 2026-11-19T21:02:12.600Z | 5.9 min |
| shard 13 | 2026-11-19T21:02:50.594Z | 5.0 min |
| shard 14 | 2026-11-19T20:58:40.983Z | 5.6 min |
| shard 15 | 2026-11-19T21:01:41.759Z | 6.2 min |
| shard 16 | 2026-11-19T20:59:12.996Z | 6.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.5 min | shard 1 |
| `admin-listings.spec.ts` | 78 | 9.1 min | webkit, shard 10 |
| `admin-attributes-library.spec.ts` | 42 | 6.0 min | shard 2 |
| `admin-translations-console.spec.ts` | 46 | 5.7 min | smoke, shard 8 |
| `photo-pipeline.spec.ts` | 74 | 5.2 min | webkit, shard 16 |
| `admin-roles.spec.ts` | 28 | 5.1 min | shard 9 |
| `admin-screening.spec.ts` | 58 | 5.0 min | webkit, shard 14 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `import-security.spec.ts` | 36 | 4.8 min | shard 4 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.6 min | shard 3 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 6 |
| `admin-users.spec.ts` | 28 | 4.5 min | shard 16 |
| `post-wizard-place.spec.ts` | 40 | 4.4 min | shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.3 min | shard 7 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `post-wizard-pricing.spec.ts` | 52 | 4.2 min | shard 8 |
| `ad-page.spec.ts` | 104 | 4.2 min | webkit, shard 13 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-monetisation.spec.ts` | 34 | 3.7 min | smoke, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `auth-signout.spec.ts` | 36 | 3.7 min | shard 9 |
| `my-listings-ad.spec.ts` | 38 | 3.6 min | shard 12 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 15 |
| `admin-translations-governance.spec.ts` | 20 | 3.4 min | smoke, shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 14 |
| `posting-routes.spec.ts` | 80 | 2.8 min | shard 2 |
| `dialogs.spec.ts` | 20 | 2.6 min | webkit, shard 10 |
| `post-wizard-category.spec.ts` | 52 | 2.6 min | webkit, shard 4 |
| `choice-lists.spec.ts` | 96 | 2.6 min | shard 7 |
| `admin-attributes-import.spec.ts` | 40 | 2.5 min | shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `admin-audit.spec.ts` | 16 | 2.1 min | shard 9 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `sage-ad-page.spec.ts` | 30 | 1.8 min | webkit, shard 11 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `mfa-stepup.spec.ts` | 22 | 1.7 min | webkit, shard 15 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 2 |
| `legal-certify.spec.ts` | 44 | 1.6 min | shard 14 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-categories-images.spec.ts` | 6 | 1.4 min | smoke, webkit, shard 12 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `name-check-queue.spec.ts` | 8 | 1.1 min | smoke, shard 9 |
| `my-listings-page.spec.ts` | 20 | 1.1 min | webkit, shard 10 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `sage-shell.spec.ts` | 80 | 1.0 min | shard 16 |
| `legal-doors.spec.ts` | 34 | 0.9 min | smoke, shard 8 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 15 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 16 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `posting-routes-dials.spec.ts` | 14 | 0.5 min | shard 9 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | shard 8 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 15 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-listings.spec.ts` › AL-17 The listing's page: opened from All listings, Remove with a reason, the history's newest line, the buyer's view | desktop-1280 | 121.5 s |
| `admin-listings.spec.ts` › AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit | desktop-1280 | 121.0 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 47.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 44.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.8 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 40.7 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.1 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.4 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 35.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 33.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 44613326890-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44613326890-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 44613326890-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44613326890-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 44613326890-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44613326890-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 44613326890-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 44613326890-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44613326890-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44613326890-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 3, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 44613326890-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 44613326890-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 44613326890-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44613326890-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44613326890-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44613326890-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 44613326890-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 44613326890-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 44613326890-local-16
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-17 The listing's page: opened from All listings, Remove with a reason, the history's newest line, the buyer's view

- Source: `shard 10`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('listing-row-[account id]').getByTestId('listing-row-[account id]-open')
    - locator resolved to <a href="/admin/listings/[account id]" data-testid="listing-row-[account id]-open" class="block min-w-0 break-words font-medium text-foreground underline-offset-4 hover:underline">E2E admin listing local-xx jbcbaqco</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    111 × waiting for element to be visible, enabled and stable
        - element is not visible
      - retrying click action
        - waiting 500ms
    - waiting for element to be visible, enabled and stable


```

Context:

```text
          - listitem [ref=e367]:
            - generic [ref=e368]: About
          - listitem [ref=e369]:
            - generic [ref=e370]: Contact
      - navigation "Help" [ref=e371]:
        - heading "Help" [level=2] [ref=e372]
        - list [ref=e373]:
          - listitem [ref=e374]:
            - generic [ref=e375]: Safety
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - link "Terms" [ref=e380] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e381]:
            - link "Privacy" [ref=e382] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit

- Source: `shard 10`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('listing-row-[account id]').getByTestId('listing-row-[account id]-open')
    - locator resolved to <a href="/admin/listings/[account id]" data-testid="listing-row-[account id]-open" class="block min-w-0 break-words font-medium text-foreground underline-offset-4 hover:underline">E2E admin listing local-xx dxxtghln</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    112 × waiting for element to be visible, enabled and stable
        - element is not visible
      - retrying click action
        - waiting 500ms


  1364 |     await page.getByTestId("listings-search").fill(live.id);
```

Context:

```text
          - listitem [ref=e367]:
            - generic [ref=e368]: About
          - listitem [ref=e369]:
            - generic [ref=e370]: Contact
      - navigation "Help" [ref=e371]:
        - heading "Help" [level=2] [ref=e372]
        - list [ref=e373]:
          - listitem [ref=e374]:
            - generic [ref=e375]: Safety
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - link "Terms" [ref=e380] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e381]:
            - link "Privacy" [ref=e382] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 10

No `[ssr-error]` lines in the `shard 10` log (or no log was uploaded).

## Client errors: shard 10

No `[client-error]` lines in the `shard 10` log (or no log was uploaded).
