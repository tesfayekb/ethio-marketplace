# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45337319415
- Commit: `71d06fb4d2afa51329627f4e3ffe5bef6096c17b`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-b86d3fe253df… (0 read)
- Repeat: 18 of 18 tests repeated — specs directly changed 1/1, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-24T06:30:08.295Z
- Passed: 2608 · Skipped: 360 · Failed: 0
- Gating failures: 0 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: repeat (INFRA: install-chromium-s-system-libraries)
- Infrastructure: 1 lane(s) died before any test at install-chromium-s-system-libraries — ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh chromium webkit ran past its 1500s deadline on try 1 of 1
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (20 of 20 results files read, 19 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: repeat

`repeat`: log unavailable.

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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: repeat

`repeat`: log unavailable.

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-24T06:04:58.935Z | 4.1 min |
| email | 2026-11-24T06:09:38.926Z | 0.3 min |
| webkit | 2026-11-24T06:06:59.520Z | 13.3 min |
| shard 1 | 2026-11-24T06:09:36.165Z | 5.5 min |
| shard 2 | 2026-11-24T06:12:38.845Z | 5.2 min |
| shard 3 | 2026-11-24T06:10:05.486Z | 5.9 min |
| shard 4 | 2026-11-24T06:09:21.796Z | 5.1 min |
| shard 5 | 2026-11-24T06:09:19.971Z | 6.1 min |
| shard 6 | 2026-11-24T06:10:45.637Z | 5.6 min |
| shard 7 | 2026-11-24T06:05:30.387Z | 7.5 min |
| shard 8 | 2026-11-24T06:09:19.016Z | 5.5 min |
| shard 9 | 2026-11-24T06:10:27.380Z | 6.3 min |
| shard 10 | 2026-11-24T06:09:47.554Z | 5.7 min |
| shard 11 | 2026-11-24T06:08:43.317Z | 5.9 min |
| shard 12 | 2026-11-24T06:10:19.288Z | 5.8 min |
| shard 13 | 2026-11-24T06:08:54.857Z | 4.9 min |
| shard 14 | 2026-11-24T06:05:28.307Z | 7.0 min |
| shard 15 | 2026-11-24T06:11:41.426Z | 6.5 min |
| shard 16 | 2026-11-24T06:09:40.871Z | 5.3 min |
| repeat | 2026-11-24T06:02:18.660Z | 0.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `admin-screening.spec.ts` | 64 | 6.1 min | webkit, shard 14 |
| `dialogs.spec.ts` | 36 | 6.1 min | webkit, shard 10 |
| `admin-categories-console.spec.ts` | 34 | 5.7 min | shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 5.4 min | shard 2 |
| `admin-listings.spec.ts` | 82 | 5.3 min | webkit, shard 10 |
| `auth-signout.spec.ts` | 44 | 5.3 min | webkit, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.2 min | shard 3 |
| `ad-page.spec.ts` | 104 | 5.0 min | webkit, shard 13 |
| `feed-screens.spec.ts` | 40 | 5.0 min | webkit, shard 5 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `admin-locations.spec.ts` | 44 | 4.5 min | shard 6 |
| `import-security.spec.ts` | 36 | 4.5 min | shard 4 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `post-wizard-place.spec.ts` | 40 | 4.3 min | shard 11 |
| `admin-attributes-editor.spec.ts` | 36 | 4.1 min | shard 14 |
| `choice-lists.spec.ts` | 96 | 4.0 min | shard 7 |
| `photo-pipeline.spec.ts` | 74 | 4.0 min | webkit, shard 16 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `post-wizard-where.spec.ts` | 32 | 3.9 min | shard 11 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `admin-monetisation.spec.ts` | 34 | 3.2 min | smoke, shard 10 |
| `admin-translations-governance.spec.ts` | 20 | 3.1 min | smoke, shard 16 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `legal-admin.spec.ts` | 44 | 2.9 min | shard 7 |
| `post-wizard-category.spec.ts` | 52 | 2.7 min | webkit, shard 4 |
| `mfa-stepup.spec.ts` | 28 | 2.5 min | webkit, shard 15 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `legal-certify.spec.ts` | 44 | 2.3 min | shard 14 |
| `sage-ad-page.spec.ts` | 30 | 2.2 min | webkit, shard 11 |
| `admin-countries.spec.ts` | 18 | 2.1 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 2.1 min | shard 2 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 5 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 2 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `sage-cards.spec.ts` | 40 | 1.1 min | webkit, shard 7 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 10 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `house-style.spec.ts` | 18 | 0.8 min | shard 11 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `ad-page-doors.spec.ts` | 30 | 0.7 min | shard 14 |
| `post-wizard-details.spec.ts` | 8 | 0.6 min | shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `settings.spec.ts` | 13 | 0.5 min | shard 1 |
| `my-listings-levels.spec.ts` | 28 | 0.5 min | shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 15 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `rbac.spec.ts` | 6 | 0.3 min | shard 7 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 7 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 46.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 44.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 44.4 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 38.8 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-390 | 35.5 s |
| `dialogs.spec.ts` › DLG-E12 a filter row's list opens in the panel's flow under its row with its choices in view above the footer; one press opens another row's list; Escape closes the list, then the panel | webkit-390 | 34.4 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | webkit-1280 | 34.0 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 33.8 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 33.7 s |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 33.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 32.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.9 s |
| `dialogs.spec.ts` › DLG-E11 every banded panel of the board: the body has its content's height or scrolls, between the header and the last band, inside the window | webkit-390 | 31.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45337319415-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45337319415-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45337319415-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45337319415-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 45337319415-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45337319415-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 45337319415-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 45337319415-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45337319415-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45337319415-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 45337319415-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 45337319415-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45337319415-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45337319415-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45337319415-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45337319415-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45337319415-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 34 (pool 2, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 49 user(s) owned by process 45337319415-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 45337319415-local-16
```

## Server errors: repeat

No `[ssr-error]` lines in the `repeat` log (or no log was uploaded).

## Client errors: repeat

No `[client-error]` lines in the `repeat` log (or no log was uploaded).

## repeat: results file with zero tests

repeat: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

- Class: **infrastructure** (INC-1101) — died before any test at `install-chromium-s-system-libraries`; re-run the failed jobs, never a code finding
- Failed step: `install-chromium-s-system-libraries` (outcome failure) — ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh chromium webkit ran past its 1500s deadline on try 1 of 1

```text
Step install-chromium-s-system-libraries: outcome failure
  Get:133 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libfreeaptx0 amd64 0.1.1-2build1 [13.5 kB]
  Get:134 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libgraphene-1.0-0 amd64 1.10.8-3build2 [46.2 kB]
  Get:135 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libgssdp-1.6-0 amd64 1.6.3-1build3 [40.4 kB]
  Get:136 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libegl1 amd64 1.7.0-1build1 [28.7 kB]
  Get:137 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libgstreamer-gl1.0-0 amd64 1.24.2-1ubuntu0.7 [214 kB]
  Get:138 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libgtk-4-common all 4.14.5+ds-0ubuntu0.10 [1497 kB]
  Get:139 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libgtk-4-1 amd64 4.14.5+ds-0ubuntu0.10 [3295 kB]
  Get:140 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libgupnp-1.6-0 amd64 1.6.6-1build3 [92.7 kB]
  Get:141 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libgupnp-igd-1.6-0 amd64 1.6.0-3build3 [16.5 kB]
  Get:142 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libharfbuzz-icu0 amd64 8.3.0-2build2 [13.3 kB]
  Get:143 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libhyphen0 amd64 2.8.8-7build3 [26.5 kB]
  Get:144 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libimath-3-1-29t64 amd64 3.1.9-3.1ubuntu2 [72.2 kB]
  Get:145 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 liblc3-1 amd64 1.0.4-3build1 [69.7 kB]
  Get:146 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libldacbt-enc2 amd64 2.0.2.3+git20200429+ed310a0-4ubuntu2 [27.1 kB]
  Get:147 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libraptor2-0 amd64 2.0.16-3ubuntu0.1 [165 kB]
  Get:148 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 liblrdf0 amd64 0.6.1-4build1 [18.5 kB]
  Get:149 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libltc11 amd64 1.3.2-1build1 [13.0 kB]
  Get:150 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libmanette-0.2-0 amd64 0.2.7-1build2 [30.6 kB]
  Get:151 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libmfx1 amd64 22.5.4-1 [3124 kB]
  ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh chromium webkit ran past its 1500s deadline on try 1 of 1
```

```text
(no log tail was uploaded for this source)
```
