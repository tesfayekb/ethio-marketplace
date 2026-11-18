# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44300180305
- Commit: `d142e3ae1c2e5b4e653e73f27f524117d5bed0fb`
- Attempt: 1
- Repeat: 29 of 97 tests repeated — specs directly changed 2/4, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-18T12:24:26.904Z
- Passed: 2650 · Skipped: 360 · Failed: 12
- Gating failures: 12 · STAGING-SINK (INC-1175, still gating): 0
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
| smoke | 2026-11-18T12:13:08.805Z | 3.4 min |
| email | 2026-11-18T12:07:09.835Z | 0.3 min |
| webkit | 2026-11-18T12:08:19.504Z | 10.3 min |
| shard 1 | 2026-11-18T12:06:58.860Z | 6.1 min |
| shard 2 | 2026-11-18T12:11:24.366Z | 6.9 min |
| shard 3 | 2026-11-18T12:12:38.580Z | 5.8 min |
| shard 4 | 2026-11-18T12:06:30.710Z | 5.6 min |
| shard 5 | 2026-11-18T12:09:36.131Z | 6.1 min |
| shard 6 | 2026-11-18T12:07:00.066Z | 6.6 min |
| shard 7 | 2026-11-18T12:06:37.988Z | 7.0 min |
| shard 8 | 2026-11-18T12:07:43.341Z | 5.8 min |
| shard 9 | 2026-11-18T12:07:07.831Z | 6.6 min |
| shard 10 | 2026-11-18T12:06:42.546Z | 6.2 min |
| shard 11 | 2026-11-18T12:13:39.110Z | 5.7 min |
| shard 12 | 2026-11-18T12:08:57.789Z | 5.9 min |
| shard 13 | 2026-11-18T12:11:23.753Z | 4.9 min |
| shard 14 | 2026-11-18T12:17:47.072Z | 6.2 min |
| shard 15 | 2026-11-18T12:06:55.283Z | 7.8 min |
| shard 16 | 2026-11-18T12:07:00.669Z | 6.4 min |
| repeat | 2026-11-18T12:12:32.338Z | 1.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.5 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 6.6 min | shard 2 |
| `admin-screening.spec.ts` | 58 | 6.3 min | webkit, shard 14 |
| `admin-listings.spec.ts` | 78 | 6.0 min | webkit, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 5.4 min | shard 7 |
| `admin-locations.spec.ts` | 38 | 5.2 min | shard 6 |
| `admin-roles.spec.ts` | 28 | 5.1 min | shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.0 min | shard 3 |
| `ad-page.spec.ts` | 104 | 5.0 min | webkit, shard 13 |
| `photo-pipeline.spec.ts` | 74 | 5.0 min | webkit, shard 16 |
| `import-security.spec.ts` | 36 | 4.9 min | shard 4 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.9 min | shard 15 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-translations-console.spec.ts` | 46 | 4.9 min | smoke, shard 8 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 12 |
| `post-wizard-place.spec.ts` | 40 | 4.4 min | shard 11 |
| `admin-users.spec.ts` | 28 | 4.3 min | shard 16 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `auth-signout.spec.ts` | 36 | 3.6 min | shard 9 |
| `choice-lists.spec.ts` | 96 | 3.6 min | shard 7 |
| `my-listings-ad.spec.ts` | 38 | 3.6 min | shard 12 |
| `admin-monetisation.spec.ts` | 34 | 3.4 min | smoke, shard 10 |
| `dialogs.spec.ts` | 20 | 3.3 min | webkit, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 3.3 min | shard 8 |
| `sage-bands.spec.ts` | 76 | 3.2 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 3.1 min | shard 2 |
| `post-wizard-category.spec.ts` | 52 | 3.1 min | webkit, shard 4 |
| `admin-translations-governance.spec.ts` | 20 | 3.1 min | smoke, shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 14 |
| `legal-admin.spec.ts` | 44 | 2.7 min | shard 7 |
| `mfa-stepup.spec.ts` | 22 | 2.5 min | webkit, shard 15 |
| `admin-countries.spec.ts` | 18 | 2.5 min | shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `sage-ad-page.spec.ts` | 30 | 2.2 min | webkit, shard 11 |
| `admin-audit.spec.ts` | 16 | 2.1 min | shard 9 |
| `sage-tiers.spec.ts` | 52 | 2.0 min | webkit, shard 2 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 8 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 12 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 14 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 2 |
| `my-listings-doors.spec.ts` | 84 | 1.2 min | shard 3, repeat |
| `ad-page-doors.spec.ts` | 90 | 1.2 min | shard 14, repeat |
| `i18n-sign-in-language.spec.ts` | 12 | 1.1 min | shard 15 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `name-check-queue.spec.ts` | 8 | 1.1 min | smoke, shard 9 |
| `my-listings-page.spec.ts` | 20 | 1.1 min | webkit, shard 10 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `sage-cards.spec.ts` | 40 | 1.0 min | webkit, shard 7 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 16 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `layout.spec.ts` | 18 | 0.6 min | webkit, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 0.5 min | shard 9 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 16 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `submenu.spec.ts` | 14 | 0.4 min | shard 15 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `feed-route.spec.ts` | 22 | 0.3 min | shard 9 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 0.3 min | shard 15 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `door-refusals.spec.ts` | 12 | 0.2 min | shard 7 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-screening.spec.ts` › SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129) | desktop-1280 | 48.0 s |
| `admin-screening.spec.ts` › SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129) | mobile-360 | 46.6 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 42.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.6 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 35.6 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.7 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 34.4 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-1280 | 33.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 31.0 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 44300180305-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44300180305-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 44300180305-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44300180305-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 44300180305-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44300180305-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 44300180305-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 44300180305-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44300180305-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44300180305-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 44300180305-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 44300180305-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44300180305-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44300180305-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44300180305-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44300180305-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 44300180305-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 44300180305-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 44300180305-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 2, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 18 user(s) owned by process 44300180305-local-repeat
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "ownerOnly:closed-active"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "ownerOnly:closed-active"
Received: "notYourListing"

  351 |       roles,
  352 |     );
> 353 |     expect((await reopen(b, x.id)).error).toBe("ownerOnly:closed-active");
      |                                           ^
  354 |     const service = await adminClient().rpc("transition_listing", {
  355 |       p_listing_id: x.id,
  356 |       p_new_status: "active",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:353:43
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-2-Nobody-else-moves-a-seller-s-ad-and-a-refused-call-writes-nothing-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-13738-refused-call-writes-nothing-mobile-360`; this run carried 12 context file(s); of the same spec: none

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "ownerOnly:closed-active"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "ownerOnly:closed-active"
Received: "notYourListing"

  351 |       roles,
  352 |     );
> 353 |     expect((await reopen(b, x.id)).error).toBe("ownerOnly:closed-active");
      |                                           ^
  354 |     const service = await adminClient().rpc("transition_listing", {
  355 |       p_listing_id: x.id,
  356 |       p_new_status: "active",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:353:43
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-2-Nobody-else-moves-a-seller-s-ad-and-a-refused-call-writes-nothing-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-13738-refused-call-writes-nothing-desktop-1280`; this run carried 12 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-6 Edit removes a photo: the row goes, the next becomes the cover, the revision keeps the file

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "error": "photo not found on this listing",
+   "error": "photoNotFound",
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "error": "photo not found on this listing",
+   "error": "photoNotFound",
  }

  545 |         p_reason: "photo",
  546 |       }),
> 547 |     ).toMatchObject({ error: "photo not found on this listing" });
      |       ^
  548 |   });
  549 |
  550 |   test("AL-7 Remove, then Restore: back to Waiting, never straight to live; each move logged and told", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:547:7
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: About
          - listitem [ref=e293]:
            - generic [ref=e294]: Contact
      - navigation "Help" [ref=e295]:
        - heading "Help" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Safety
      - navigation "Legal" [ref=e300]:
        - heading "Legal" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - link "Terms" [ref=e304] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e305]:
            - link "Privacy" [ref=e306] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e308]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-29 Neither door moves a posted ad to another category; nothing is written (D172)

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "error": "the category of a posted listing is not changed",
+   "error": "categoryFixed",
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "error": "the category of a posted listing is not changed",
+   "error": "categoryFixed",
  }

  1979 |         p_reason: "misleading",
  1980 |       }),
> 1981 |     ).toMatchObject({ error: "the category of a posted listing is not changed" });
       |       ^
  1982 |     expect(await stored()).toEqual(kept);
  1983 |     expect(await revisionRows(live.id, "edit")).toEqual([]);
  1984 |     expect(await noticeRows(live.id)).toEqual([]);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1981:7
```

Context:

```text
          - listitem [ref=e299]:
            - generic [ref=e300]: About
          - listitem [ref=e301]:
            - generic [ref=e302]: Contact
      - navigation "Help" [ref=e303]:
        - heading "Help" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Safety
      - navigation "Legal" [ref=e308]:
        - heading "Legal" [level=2] [ref=e309]
        - list [ref=e310]:
          - listitem [ref=e311]:
            - link "Terms" [ref=e312] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e313]:
            - link "Privacy" [ref=e314] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e316]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-6 Edit removes a photo: the row goes, the next becomes the cover, the revision keeps the file

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "error": "photo not found on this listing",
+   "error": "photoNotFound",
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "error": "photo not found on this listing",
+   "error": "photoNotFound",
  }

  545 |         p_reason: "photo",
  546 |       }),
> 547 |     ).toMatchObject({ error: "photo not found on this listing" });
      |       ^
  548 |   });
  549 |
  550 |   test("AL-7 Remove, then Restore: back to Waiting, never straight to live; each move logged and told", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:547:7
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

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-29 Neither door moves a posted ad to another category; nothing is written (D172)

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "error": "the category of a posted listing is not changed",
+   "error": "categoryFixed",
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "error": "the category of a posted listing is not changed",
+   "error": "categoryFixed",
  }

  1979 |         p_reason: "misleading",
  1980 |       }),
> 1981 |     ).toMatchObject({ error: "the category of a posted listing is not changed" });
       |       ^
  1982 |     expect(await stored()).toEqual(kept);
  1983 |     expect(await revisionRows(live.id, "edit")).toEqual([]);
  1984 |     expect(await noticeRows(live.id)).toEqual([]);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1981:7
```

Context:

```text
          - listitem [ref=e379]:
            - generic [ref=e380]: About
          - listitem [ref=e381]:
            - generic [ref=e382]: Contact
      - navigation "Help" [ref=e383]:
        - heading "Help" [level=2] [ref=e384]
        - list [ref=e385]:
          - listitem [ref=e386]:
            - generic [ref=e387]: Safety
      - navigation "Legal" [ref=e388]:
        - heading "Legal" [level=2] [ref=e389]
        - list [ref=e390]:
          - listitem [ref=e391]:
            - link "Terms" [ref=e392] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e393]:
            - link "Privacy" [ref=e394] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e396]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129)

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]').getByTestId('admin-screening-number-whatsapp')
Expected: "+251911000303"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]').getByTestId('admin-screening-number-whatsapp')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]').getByTestId('admin-screening-number-whatsapp')
Expected: "+251911000303"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]').getByTestId('admin-screening-number-whatsapp')


  720 |         .locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]')
  721 |         .getByTestId("admin-screening-number-whatsapp"),
> 722 |     ).toHaveText("+251911000303", { timeout: 20000 });
      |       ^
  723 |     await expect(
  724 |       page.getByTestId("step-up-modal"),
  725 |       "SC-15: Show number asked for a code",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:722:7
```

Context:

```text
          - generic [ref=e40]:
            - generic [ref=e41]:
              - heading "Description" [level=3] [ref=e42]
              - paragraph [ref=e43]: e2e scratch listing for the screening queue
            - complementary [ref=e44]:
              - heading "Meet, inspect, then pay — no deposit, no payment link, no code" [level=3] [ref=e45]
              - list [ref=e46]:
                - listitem [ref=e47]: Never pay a deposit, a delivery fee or a 'booking' before you have seen the item.
                - listitem [ref=e48]: Meet the seller in a public place, in daylight, with someone you trust.
                - listitem [ref=e49]: Inspect what you are buying; test it; check every document.
                - listitem [ref=e50]: Pay only when the item is in your hands — no payment links, no codes, no transfers to 'reserve' it.
      - generic [ref=e51]:
        - link "Open the ad's page" [ref=e52] [cursor=pointer]:
          - /url: /admin/listings/[account id]
        - button "Approve" [ref=e53] [cursor=pointer]
        - button "Reject" [ref=e54] [cursor=pointer]
    - button "Close" [ref=e55] [cursor=pointer]:
      - img [ref=e56]
      - generic [ref=e59]: Close
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]').getByTestId('admin-screening-number-whatsapp')
Expected: "+251911000303"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]').getByTestId('admin-screening-number-whatsapp')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]').getByTestId('admin-screening-number-whatsapp')
Expected: "+251911000303"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]').getByTestId('admin-screening-number-whatsapp')


  720 |         .locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]')
  721 |         .getByTestId("admin-screening-number-whatsapp"),
> 722 |     ).toHaveText("+251911000303", { timeout: 20000 });
      |       ^
  723 |     await expect(
  724 |       page.getByTestId("step-up-modal"),
  725 |       "SC-15: Show number asked for a code",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:722:7
```

Context:

```text
          - generic [ref=e40]:
            - generic [ref=e41]:
              - heading "Description" [level=3] [ref=e42]
              - paragraph [ref=e43]: e2e scratch listing for the screening queue
            - complementary [ref=e44]:
              - heading "Meet, inspect, then pay — no deposit, no payment link, no code" [level=3] [ref=e45]
              - list [ref=e46]:
                - listitem [ref=e47]: Never pay a deposit, a delivery fee or a 'booking' before you have seen the item.
                - listitem [ref=e48]: Meet the seller in a public place, in daylight, with someone you trust.
                - listitem [ref=e49]: Inspect what you are buying; test it; check every document.
                - listitem [ref=e50]: Pay only when the item is in your hands — no payment links, no codes, no transfers to 'reserve' it.
      - generic [ref=e51]:
        - link "Open the ad's page" [ref=e52] [cursor=pointer]:
          - /url: /admin/listings/[account id]
        - button "Approve" [ref=e53] [cursor=pointer]
        - button "Reject" [ref=e54] [cursor=pointer]
    - button "Close" [ref=e55] [cursor=pointer]:
      - img [ref=e56]
      - generic [ref=e59]: Close
```
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "ownerOnly:closed-active"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "ownerOnly:closed-active"
Received: "notYourListing"

  351 |       roles,
  352 |     );
> 353 |     expect((await reopen(b, x.id)).error).toBe("ownerOnly:closed-active");
      |                                           ^
  354 |     const service = await adminClient().rpc("transition_listing", {
  355 |       p_listing_id: x.id,
  356 |       p_new_status: "active",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:353:43
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-2-Nobody-else-moves-a-seller-s-ad-and-a-refused-call-writes-nothing-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-13738-refused-call-writes-nothing-mobile-360`; this run carried 12 context file(s); of the same spec: none

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "ownerOnly:closed-active"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "ownerOnly:closed-active"
Received: "notYourListing"

  351 |       roles,
  352 |     );
> 353 |     expect((await reopen(b, x.id)).error).toBe("ownerOnly:closed-active");
      |                                           ^
  354 |     const service = await adminClient().rpc("transition_listing", {
  355 |       p_listing_id: x.id,
  356 |       p_new_status: "active",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:353:43
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-2-Nobody-else-moves-a-seller-s-ad-and-a-refused-call-writes-nothing-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-13738-refused-call-writes-nothing-mobile-360`; this run carried 12 context file(s); of the same spec: none

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "ownerOnly:closed-active"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "ownerOnly:closed-active"
Received: "notYourListing"

  351 |       roles,
  352 |     );
> 353 |     expect((await reopen(b, x.id)).error).toBe("ownerOnly:closed-active");
      |                                           ^
  354 |     const service = await adminClient().rpc("transition_listing", {
  355 |       p_listing_id: x.id,
  356 |       p_new_status: "active",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:353:43
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-2-Nobody-else-moves-a-seller-s-ad-and-a-refused-call-writes-nothing-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-13738-refused-call-writes-nothing-desktop-1280`; this run carried 12 context file(s); of the same spec: none

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "ownerOnly:closed-active"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "ownerOnly:closed-active"
Received: "notYourListing"

  351 |       roles,
  352 |     );
> 353 |     expect((await reopen(b, x.id)).error).toBe("ownerOnly:closed-active");
      |                                           ^
  354 |     const service = await adminClient().rpc("transition_listing", {
  355 |       p_listing_id: x.id,
  356 |       p_new_status: "active",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:353:43
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-2-Nobody-else-moves-a-seller-s-ad-and-a-refused-call-writes-nothing-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-13738-refused-call-writes-nothing-desktop-1280`; this run carried 12 context file(s); of the same spec: none

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 10

No `[ssr-error]` lines in the `shard 10` log (or no log was uploaded).

## Client errors: shard 10

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_edit_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "photoNotFound", "refusals": [{"reason": "photoNotFound"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_edit_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "photoNotFound", "refusals": [{"reason": "photoNotFound"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_edit_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "categoryFixed", "refusals": [{"reason": "categoryFixed"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_edit_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "categoryFixed", "refusals": [{"reason": "categoryFixed"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_edit_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "photoNotFound", "refusals": [{"reason": "photoNotFound"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_edit_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "photoNotFound", "refusals": [{"reason": "photoNotFound"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_edit_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "categoryFixed", "refusals": [{"reason": "categoryFixed"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_edit_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "categoryFixed", "refusals": [{"reason": "categoryFixed"}]})
```

## Server errors: shard 14

No `[ssr-error]` lines in the `shard 14` log (or no log was uploaded).

## Client errors: shard 14

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] console.error: [screening] reveal failed {ok: false, code: P0D01, hint: null, details: null, message: permissionDenied} :: [screening] reveal failed {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"permissionDenied","refusals":[{"reason":"permissionDenied"}]}
[client-error] HTTP 403 POST /rest/v1/rpc/admin_reveal_listing_contact ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] console.error: [screening] reveal failed {ok: false, code: P0D01, hint: null, details: null, message: permissionDenied} :: [screening] reveal failed {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"permissionDenied","refusals":[{"reason":"permissionDenied"}]}
[client-error] HTTP 403 POST /rest/v1/rpc/admin_reveal_listing_contact ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] console.error: [screening] reveal failed {ok: false, code: P0D01, hint: null, details: null, message: permissionDenied} :: [screening] reveal failed {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"permissionDenied","refusals":[{"reason":"permissionDenied"}]}
[client-error] HTTP 403 POST /rest/v1/rpc/admin_reveal_listing_contact ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] console.error: [screening] reveal failed {ok: false, code: P0D01, hint: null, details: null, message: permissionDenied} :: [screening] reveal failed {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"permissionDenied","refusals":[{"reason":"permissionDenied"}]}
[client-error] HTTP 403 POST /rest/v1/rpc/admin_reveal_listing_contact ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
```

## Server errors: repeat

No `[ssr-error]` lines in the `repeat` log (or no log was uploaded).

## Client errors: repeat

No `[client-error]` lines in the `repeat` log (or no log was uploaded).
