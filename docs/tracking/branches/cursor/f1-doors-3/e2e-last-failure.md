# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43607584070
- Commit: `f6e8f3c439c8d412ba515e59d257da5dbe861df9`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-8373de50f1e8… (0 read)
- Repeat: 27 of 65 tests repeated — specs directly changed 2/4, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-14T15:17:23.367Z
- Passed: 2646 · Skipped: 360 · Failed: 8
- Gating failures: 8 · Quarantined (@global-state, INC-117, non-gating): 0
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
| smoke | 2026-11-14T15:01:19.263Z | 4.2 min |
| email | 2026-11-14T15:00:45.241Z | 0.3 min |
| webkit | 2026-11-14T15:06:25.134Z | 10.2 min |
| shard 1 | 2026-11-14T15:01:38.836Z | 6.3 min |
| shard 2 | 2026-11-14T15:00:52.896Z | 5.2 min |
| shard 3 | 2026-11-14T15:00:49.388Z | 6.0 min |
| shard 4 | 2026-11-14T15:01:34.232Z | 5.9 min |
| shard 5 | 2026-11-14T15:02:07.077Z | 6.6 min |
| shard 6 | 2026-11-14T15:01:35.306Z | 6.9 min |
| shard 7 | 2026-11-14T15:01:39.609Z | 7.1 min |
| shard 8 | 2026-11-14T15:03:12.595Z | 6.6 min |
| shard 9 | 2026-11-14T15:01:14.690Z | 5.4 min |
| shard 10 | 2026-11-14T15:01:52.221Z | 6.6 min |
| shard 11 | 2026-11-14T15:01:37.744Z | 7.3 min |
| shard 12 | 2026-11-14T15:00:45.732Z | 5.7 min |
| shard 13 | 2026-11-14T15:03:35.058Z | 5.8 min |
| shard 14 | 2026-11-14T15:02:19.328Z | 6.3 min |
| shard 15 | 2026-11-14T15:02:42.008Z | 7.5 min |
| shard 16 | 2026-11-14T15:03:55.497Z | 5.4 min |
| repeat | 2026-11-14T15:01:06.618Z | 12.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-translations-console.spec.ts` | 134 | 13.6 min | smoke, shard 8, repeat |
| `shell.spec.ts` | 234 | 10.9 min | shard 1 |
| `admin-listings.spec.ts` | 78 | 6.5 min | webkit, shard 10 |
| `admin-translations-data.spec.ts` | 30 | 5.9 min | shard 5, repeat |
| `ad-page.spec.ts` | 104 | 5.5 min | webkit, shard 13 |
| `admin-categories-console.spec.ts` | 34 | 5.5 min | shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 2 |
| `admin-locations.spec.ts` | 38 | 5.4 min | shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.3 min | shard 3 |
| `post-wizard-place.spec.ts` | 40 | 5.3 min | shard 11 |
| `admin-screening.spec.ts` | 58 | 5.3 min | webkit, shard 14 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 5.0 min | shard 11 |
| `import-security.spec.ts` | 36 | 4.7 min | shard 4 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.7 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 4.5 min | shard 13 |
| `admin-roles.spec.ts` | 28 | 4.3 min | shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.2 min | shard 12 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 15 |
| `photo-pipeline.spec.ts` | 74 | 4.1 min | webkit, shard 16 |
| `admin-monetisation.spec.ts` | 34 | 4.0 min | smoke, shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 3.8 min | shard 14 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `post-wizard-pricing.spec.ts` | 52 | 3.7 min | shard 8 |
| `choice-lists.spec.ts` | 96 | 3.6 min | shard 7 |
| `post-wizard-category.spec.ts` | 52 | 3.6 min | webkit, shard 4 |
| `sage-bands.spec.ts` | 76 | 3.4 min | shard 6 |
| `dialogs.spec.ts` | 20 | 3.2 min | webkit, shard 10 |
| `admin-translations-governance.spec.ts` | 20 | 3.2 min | smoke, shard 16 |
| `my-listings-ad.spec.ts` | 38 | 3.2 min | shard 12 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `admin-attributes-safety.spec.ts` | 18 | 2.8 min | shard 5 |
| `legal-admin.spec.ts` | 44 | 2.7 min | shard 7 |
| `sage-ad-page.spec.ts` | 30 | 2.7 min | webkit, shard 11 |
| `admin-countries.spec.ts` | 18 | 2.6 min | shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `mfa-stepup.spec.ts` | 22 | 2.5 min | webkit, shard 15 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 2 |
| `admin-attributes-import.spec.ts` | 40 | 2.1 min | shard 8 |
| `legal-certify.spec.ts` | 44 | 2.0 min | shard 14 |
| `admin-categories-home.spec.ts` | 10 | 1.9 min | shard 4 |
| `sage-tiers.spec.ts` | 52 | 1.8 min | webkit, shard 2 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 12 |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 9 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `my-listings-page.spec.ts` | 20 | 1.2 min | webkit, shard 10 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.1 min | shard 15 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `user-guides.spec.ts` | 18 | 1.1 min | shard 13 |
| `admin-guides.spec.ts` | 14 | 1.1 min | shard 3 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `sage-cards.spec.ts` | 40 | 1.0 min | webkit, shard 7 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `legal-doors.spec.ts` | 34 | 0.9 min | smoke, shard 8 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `house-style.spec.ts` | 12 | 0.7 min | shard 11 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `ad-page-doors.spec.ts` | 30 | 0.7 min | shard 14 |
| `layout.spec.ts` | 18 | 0.6 min | webkit, shard 10 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `supabase-door.spec.ts` | 12 | 0.6 min | shard 13 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `auth-caller-gates.spec.ts` | 8 | 0.5 min | shard 5 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.5 min | shard 1 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `submenu.spec.ts` | 14 | 0.4 min | shard 15 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `door-refusals.spec.ts` | 12 | 0.2 min | shard 7 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.1 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 40.5 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 36.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 36.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 36.2 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-1280 | 34.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 34.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.4 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 32.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.9 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.8 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43607584070-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43607584070-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 43607584070-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43607584070-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 43607584070-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43607584070-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 43607584070-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 43607584070-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43607584070-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43607584070-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 3, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 43607584070-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 43607584070-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43607584070-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43607584070-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43607584070-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43607584070-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 43607584070-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 43607584070-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 43607584070-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 1, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 43607584070-local-repeat
```

## admin-translations-console.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "notFullyApproved"
Received: "notFullyApproved:1"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "notFullyApproved"
Received: "notFullyApproved:1"

  289 |       await expect(publicSwitch).toBeDisabled();
  290 |       await expect(surfaceControl(page, "lang-public-gate-om")).toBeVisible();
> 291 |       expect(await flipOm()).toBe("notFullyApproved");
      |                              ^
  292 |     } finally {
  293 |       await reapScratchKey(key);
  294 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:291:30
```

Context:

```text
          - listitem [ref=e577]:
            - generic [ref=e578]: About
          - listitem [ref=e579]:
            - generic [ref=e580]: Contact
      - navigation "Help" [ref=e581]:
        - heading "Help" [level=2] [ref=e582]
        - list [ref=e583]:
          - listitem [ref=e584]:
            - generic [ref=e585]: Safety
      - navigation "Legal" [ref=e586]:
        - heading "Legal" [level=2] [ref=e587]
        - list [ref=e588]:
          - listitem [ref=e589]:
            - link "Terms" [ref=e590] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e591]:
            - link "Privacy" [ref=e592] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e594]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "notFullyApproved"
Received: "notFullyApproved:3456"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "notFullyApproved"
Received: "notFullyApproved:3456"

  289 |       await expect(publicSwitch).toBeDisabled();
  290 |       await expect(surfaceControl(page, "lang-public-gate-om")).toBeVisible();
> 291 |       expect(await flipOm()).toBe("notFullyApproved");
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

## legal-doors.spec.ts › Legal doors › LG-24 admin_export_legal_acceptances: refused for an anonymous caller, a plain user, an admin by role and a stale second factor; the super admin reads a published version's acceptances page by page — account id, time, language, method, home country and the two flags, never a name or e-mail — with one audit row

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 3
Received array:  [{"id": "[account id]"}, {"id": "[account id]"}, {"id": "[account id]"}]
--- further error 1 ---
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 3
Received array:  [{"id": "[account id]"}, {"id": "[account id]"}, {"id": "[account id]"}]

  1367 |       .eq("entity_id", fixture.publishedId);
  1368 |     expect(audit.error).toBeNull();
> 1369 |     expect(audit.data).toHaveLength(1);
       |                        ^
  1370 |   });
  1371 |   test(
  1372 |     "LG-32 acceptance records the language actually shown, version by version",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:1369:24
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

## legal-doors.spec.ts › Legal doors › LG-24 admin_export_legal_acceptances: refused for an anonymous caller, a plain user, an admin by role and a stale second factor; the super admin reads a published version's acceptances page by page — account id, time, language, method, home country and the two flags, never a name or e-mail — with one audit row

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 3
Received array:  [{"id": "[account id]"}, {"id": "[account id]"}, {"id": "[account id]"}]
--- further error 1 ---
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 3
Received array:  [{"id": "[account id]"}, {"id": "[account id]"}, {"id": "[account id]"}]

  1367 |       .eq("entity_id", fixture.publishedId);
  1368 |     expect(audit.error).toBeNull();
> 1369 |     expect(audit.data).toHaveLength(1);
       |                        ^
  1370 |   });
  1371 |   test(
  1372 |     "LG-32 acceptance records the language actually shown, version by version",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:1369:24
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

## admin-translations-console.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "notFullyApproved"
Received: "notFullyApproved:1"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "notFullyApproved"
Received: "notFullyApproved:1"

  289 |       await expect(publicSwitch).toBeDisabled();
  290 |       await expect(surfaceControl(page, "lang-public-gate-om")).toBeVisible();
> 291 |       expect(await flipOm()).toBe("notFullyApproved");
      |                              ^
  292 |     } finally {
  293 |       await reapScratchKey(key);
  294 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:291:30
```

Context:

```text
          - listitem [ref=e577]:
            - generic [ref=e578]: About
          - listitem [ref=e579]:
            - generic [ref=e580]: Contact
      - navigation "Help" [ref=e581]:
        - heading "Help" [level=2] [ref=e582]
        - list [ref=e583]:
          - listitem [ref=e584]:
            - generic [ref=e585]: Safety
      - navigation "Legal" [ref=e586]:
        - heading "Legal" [level=2] [ref=e587]
        - list [ref=e588]:
          - listitem [ref=e589]:
            - link "Terms" [ref=e590] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e591]:
            - link "Privacy" [ref=e592] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e594]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "notFullyApproved"
Received: "notFullyApproved:3456"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "notFullyApproved"
Received: "notFullyApproved:3456"

  289 |       await expect(publicSwitch).toBeDisabled();
  290 |       await expect(surfaceControl(page, "lang-public-gate-om")).toBeVisible();
> 291 |       expect(await flipOm()).toBe("notFullyApproved");
      |                              ^
  292 |     } finally {
  293 |       await reapScratchKey(key);
  294 |     }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:291:30
```

Context:

```text
          - listitem [ref=e577]:
            - generic [ref=e578]: About
          - listitem [ref=e579]:
            - generic [ref=e580]: Contact
      - navigation "Help" [ref=e581]:
        - heading "Help" [level=2] [ref=e582]
        - list [ref=e583]:
          - listitem [ref=e584]:
            - generic [ref=e585]: Safety
      - navigation "Legal" [ref=e586]:
        - heading "Legal" [level=2] [ref=e587]
        - list [ref=e588]:
          - listitem [ref=e589]:
            - link "Terms" [ref=e590] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e591]:
            - link "Privacy" [ref=e592] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e594]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "notFullyApproved"
Received: "notFullyApproved:3456"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "notFullyApproved"
Received: "notFullyApproved:3456"

  289 |       await expect(publicSwitch).toBeDisabled();
  290 |       await expect(surfaceControl(page, "lang-public-gate-om")).toBeVisible();
> 291 |       expect(await flipOm()).toBe("notFullyApproved");
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

## admin-translations-console.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "notFullyApproved"
Received: "notFullyApproved:3456"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "notFullyApproved"
Received: "notFullyApproved:3456"

  289 |       await expect(publicSwitch).toBeDisabled();
  290 |       await expect(surfaceControl(page, "lang-public-gate-om")).toBeVisible();
> 291 |       expect(await flipOm()).toBe("notFullyApproved");
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

## Server errors: shard 8

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
```

## Client errors: shard 8

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "catalogEmpty", "refusals": [{"reason": "catalogEmpty"}]})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notFullyApproved:1", "refusals": [{"detail": "1", "reason": "notFullyApproved"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "catalogEmpty", "refusals": [{"reason": "catalogEmpty"}]})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notFullyApproved:1", "refusals": [{"detail": "1", "reason": "notFullyApproved"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notFullyApproved:3456", "refusals": [{"detail": "3456", "reason": "notFullyApproved"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notFullyApproved:3456", "refusals": [{"detail": "3456", "reason": "notFullyApproved"}]})
```

## Server errors: repeat

No `[ssr-error]` lines in the `repeat` log (or no log was uploaded).

## Client errors: repeat

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "catalogEmpty", "refusals": [{"reason": "catalogEmpty"}]})
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notFullyApproved:1", "refusals": [{"detail": "1", "reason": "notFullyApproved"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notFullyApproved:3456", "refusals": [{"detail": "3456", "reason": "notFullyApproved"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notFullyApproved:3456", "refusals": [{"detail": "3456", "reason": "notFullyApproved"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_language_flags ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notFullyApproved:3456", "refusals": [{"detail": "3456", "reason": "notFullyApproved"}]})
```
