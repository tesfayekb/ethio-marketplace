# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44759809186
- Commit: `55e939fe30dae548ca18d78eb7b422033b23d747`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-a61efeac7e1f… (0 read)
- Repeat: 22 of 22 tests repeated — specs directly changed 1/1, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-20T15:25:19.707Z
- Passed: 2641 · Skipped: 401 · Failed: 6
- Gating failures: 6 · STAGING-SINK (INC-1175, still gating): 0
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
| smoke | 2026-11-20T15:10:27.281Z | 4.5 min |
| email | 2026-11-20T15:10:22.314Z | 0.3 min |
| webkit | 2026-11-20T15:11:42.372Z | 7.9 min |
| shard 1 | 2026-11-20T15:10:23.584Z | 6.2 min |
| shard 2 | 2026-11-20T15:10:09.609Z | 6.0 min |
| shard 3 | 2026-11-20T15:09:20.363Z | 5.9 min |
| shard 4 | 2026-11-20T15:11:13.813Z | 5.9 min |
| shard 5 | 2026-11-20T15:09:21.912Z | 6.1 min |
| shard 6 | 2026-11-20T15:10:06.835Z | 5.6 min |
| shard 7 | 2026-11-20T15:10:20.739Z | 6.6 min |
| shard 8 | 2026-11-20T15:10:22.981Z | 5.5 min |
| shard 9 | 2026-11-20T15:10:20.613Z | 7.2 min |
| shard 10 | 2026-11-20T15:14:27.445Z | 5.3 min |
| shard 11 | 2026-11-20T15:10:24.294Z | 7.4 min |
| shard 12 | 2026-11-20T15:10:51.912Z | 5.8 min |
| shard 13 | 2026-11-20T15:10:22.341Z | 6.5 min |
| shard 14 | 2026-11-20T15:09:49.280Z | 5.3 min |
| shard 15 | 2026-11-20T15:09:51.672Z | 6.2 min |
| shard 16 | 2026-11-20T15:12:58.859Z | 5.4 min |
| repeat | 2026-11-20T15:11:54.726Z | 12.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `auth-signout.spec.ts` | 176 | 18.8 min | webkit, shard 9, repeat |
| `shell.spec.ts` | 234 | 10.6 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 6.0 min | shard 2 |
| `post-wizard-place.spec.ts` | 40 | 5.3 min | shard 11 |
| `import-security.spec.ts` | 36 | 5.3 min | shard 4 |
| `ad-page.spec.ts` | 104 | 5.2 min | webkit, shard 13 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.2 min | shard 3 |
| `admin-categories-console.spec.ts` | 34 | 5.2 min | shard 7 |
| `admin-listings.spec.ts` | 78 | 5.1 min | webkit, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 5.0 min | shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 5.0 min | shard 13 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-screening.spec.ts` | 58 | 4.7 min | webkit, shard 14 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 6 |
| `admin-roles.spec.ts` | 28 | 4.5 min | shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `photo-pipeline.spec.ts` | 74 | 3.9 min | webkit, shard 16 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-monetisation.spec.ts` | 34 | 3.8 min | smoke, shard 10 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `my-listings-ad.spec.ts` | 38 | 3.6 min | shard 12 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 15 |
| `admin-translations-governance.spec.ts` | 20 | 3.4 min | smoke, shard 16 |
| `choice-lists.spec.ts` | 96 | 3.4 min | shard 7 |
| `admin-attributes-editor.spec.ts` | 36 | 3.2 min | shard 14 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 8 |
| `post-wizard-category.spec.ts` | 52 | 2.9 min | webkit, shard 4 |
| `posting-routes.spec.ts` | 80 | 2.6 min | shard 2 |
| `dialogs.spec.ts` | 20 | 2.5 min | webkit, shard 10 |
| `legal-admin.spec.ts` | 44 | 2.5 min | shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `sage-ad-page.spec.ts` | 30 | 2.2 min | webkit, shard 11 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 5 |
| `mfa-stepup.spec.ts` | 22 | 1.7 min | webkit, shard 15 |
| `admin-audit.spec.ts` | 16 | 1.7 min | shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 2 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 8 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `user-guides.spec.ts` | 18 | 1.2 min | shard 13 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `my-listings-page.spec.ts` | 20 | 0.9 min | webkit, shard 10 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.9 min | webkit, shard 7 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `house-style.spec.ts` | 12 | 0.7 min | shard 11 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `my-listings-levels.spec.ts` | 28 | 0.7 min | shard 4 |
| `supabase-door.spec.ts` | 12 | 0.7 min | shard 13 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `page-head.spec.ts` | 4 | 0.4 min | shard 13 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 7 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 48.4 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 36.6 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 35.7 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 35.4 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 34.5 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.4 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 34.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.3 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 34.3 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 34.3 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 34.2 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 33.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 44759809186-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44759809186-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 44759809186-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44759809186-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 44759809186-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44759809186-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 44759809186-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 44759809186-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44759809186-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44759809186-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 44759809186-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 44759809186-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 44759809186-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44759809186-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44759809186-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44759809186-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 44759809186-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 44759809186-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 44759809186-local-16
```

## auth-signout.spec.ts › D189 deactivated session › SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661)

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    3 × unexpected value "http://127.0.0.1:4173/auth"
    16 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    3 × unexpected value "http://127.0.0.1:4173/auth"
    16 × unexpected value "http://127.0.0.1:4173/"


  663 |
  664 |       // The page must land on /auth with the deactivated reason, never the signed-in screen.
> 665 |       await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      |                          ^
  666 |       await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
  667 |       await expect(page.getByTestId("account-menu")).toHaveCount(0);
  668 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:665:26
```

Context:

```text
          - listitem [ref=e234]:
            - generic [ref=e235]: About
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Help" [ref=e238]:
        - heading "Help" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Safety
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - link "Terms" [ref=e247] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e248]:
            - link "Privacy" [ref=e249] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

## auth-signout.spec.ts › D189 deactivated session › SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661)

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    3 × unexpected value "http://127.0.0.1:4173/auth"
    16 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    3 × unexpected value "http://127.0.0.1:4173/auth"
    16 × unexpected value "http://127.0.0.1:4173/"


  663 |
  664 |       // The page must land on /auth with the deactivated reason, never the signed-in screen.
> 665 |       await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      |                          ^
  666 |       await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
  667 |       await expect(page.getByTestId("account-menu")).toHaveCount(0);
  668 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:665:26
```

Context:

```text
          - listitem [ref=e285]:
            - generic [ref=e286]: About
          - listitem [ref=e287]:
            - generic [ref=e288]: Contact
      - navigation "Help" [ref=e289]:
        - heading "Help" [level=2] [ref=e290]
        - list [ref=e291]:
          - listitem [ref=e292]:
            - generic [ref=e293]: Safety
      - navigation "Legal" [ref=e294]:
        - heading "Legal" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - link "Terms" [ref=e298] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e299]:
            - link "Privacy" [ref=e300] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e302]: © 2026 ethio.com — All rights reserved.
```
```

## auth-signout.spec.ts › D189 deactivated session › SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661)

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    3 × unexpected value "http://127.0.0.1:4173/auth"
    16 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    3 × unexpected value "http://127.0.0.1:4173/auth"
    16 × unexpected value "http://127.0.0.1:4173/"


  663 |
  664 |       // The page must land on /auth with the deactivated reason, never the signed-in screen.
> 665 |       await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      |                          ^
  666 |       await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
  667 |       await expect(page.getByTestId("account-menu")).toHaveCount(0);
  668 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:665:26
```

Context:

```text
          - listitem [ref=e234]:
            - generic [ref=e235]: About
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Help" [ref=e238]:
        - heading "Help" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Safety
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - link "Terms" [ref=e247] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e248]:
            - link "Privacy" [ref=e249] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

## auth-signout.spec.ts › D189 deactivated session › SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661)

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    3 × unexpected value "http://127.0.0.1:4173/auth"
    16 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    3 × unexpected value "http://127.0.0.1:4173/auth"
    16 × unexpected value "http://127.0.0.1:4173/"


  663 |
  664 |       // The page must land on /auth with the deactivated reason, never the signed-in screen.
> 665 |       await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      |                          ^
  666 |       await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
  667 |       await expect(page.getByTestId("account-menu")).toHaveCount(0);
  668 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:665:26
```

Context:

```text
          - listitem [ref=e234]:
            - generic [ref=e235]: About
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Help" [ref=e238]:
        - heading "Help" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Safety
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - link "Terms" [ref=e247] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e248]:
            - link "Privacy" [ref=e249] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

## auth-signout.spec.ts › D189 deactivated session › SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661)

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    3 × unexpected value "http://127.0.0.1:4173/auth"
    16 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    3 × unexpected value "http://127.0.0.1:4173/auth"
    16 × unexpected value "http://127.0.0.1:4173/"


  663 |
  664 |       // The page must land on /auth with the deactivated reason, never the signed-in screen.
> 665 |       await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      |                          ^
  666 |       await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
  667 |       await expect(page.getByTestId("account-menu")).toHaveCount(0);
  668 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:665:26
```

Context:

```text
          - listitem [ref=e234]:
            - generic [ref=e235]: About
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Help" [ref=e238]:
        - heading "Help" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Safety
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - link "Terms" [ref=e247] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e248]:
            - link "Privacy" [ref=e249] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

## auth-signout.spec.ts › D189 deactivated session › SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661)

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    3 × unexpected value "http://127.0.0.1:4173/auth"
    16 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    3 × unexpected value "http://127.0.0.1:4173/auth"
    16 × unexpected value "http://127.0.0.1:4173/"


  663 |
  664 |       // The page must land on /auth with the deactivated reason, never the signed-in screen.
> 665 |       await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      |                          ^
  666 |       await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
  667 |       await expect(page.getByTestId("account-menu")).toHaveCount(0);
  668 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:665:26
```

Context:

```text
          - listitem [ref=e285]:
            - generic [ref=e286]: About
          - listitem [ref=e287]:
            - generic [ref=e288]: Contact
      - navigation "Help" [ref=e289]:
        - heading "Help" [level=2] [ref=e290]
        - list [ref=e291]:
          - listitem [ref=e292]:
            - generic [ref=e293]: Safety
      - navigation "Legal" [ref=e294]:
        - heading "Legal" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - link "Terms" [ref=e298] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e299]:
            - link "Privacy" [ref=e300] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e302]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 9

No `[ssr-error]` lines in the `shard 9` log (or no log was uploaded).

## Client errors: shard 9

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×2
[client-error] console.error: [client-error] legal landing read failed
[client-error] HTTP 403 POST /rest/v1/rpc/my_legal_status ({"code":"P0D01","details":null,"hint":null,"message":"accountDeactivated"})
[client-error] HTTP 403 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "accountDeactivated", "refusals": [{"reason": "accountDeactivated"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×2
[client-error] console.error: [client-error] legal landing read failed
[client-error] HTTP 403 POST /rest/v1/rpc/my_legal_status ({"code":"P0D01","details":null,"hint":null,"message":"accountDeactivated"})
[client-error] HTTP 403 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "accountDeactivated", "refusals": [{"reason": "accountDeactivated"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×2
[client-error] console.error: [client-error] legal landing read failed
[client-error] HTTP 403 POST /rest/v1/rpc/my_legal_status ({"code":"P0D01","details":null,"hint":null,"message":"accountDeactivated"})
[client-error] HTTP 403 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "accountDeactivated", "refusals": [{"reason": "accountDeactivated"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×2
[client-error] console.error: [client-error] legal landing read failed
[client-error] HTTP 403 POST /rest/v1/rpc/my_legal_status ({"code":"P0D01","details":null,"hint":null,"message":"accountDeactivated"})
[client-error] HTTP 403 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "accountDeactivated", "refusals": [{"reason": "accountDeactivated"}]})
console.error: [client-error] legal landing read failed ×4
```

## Server errors: repeat

No `[ssr-error]` lines in the `repeat` log (or no log was uploaded).

## Client errors: repeat

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×2
[client-error] console.error: [client-error] legal landing read failed
[client-error] HTTP 403 POST /rest/v1/rpc/my_legal_status ({"code":"P0D01","details":null,"hint":null,"message":"accountDeactivated"})
[client-error] HTTP 403 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "accountDeactivated", "refusals": [{"reason": "accountDeactivated"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×2
[client-error] console.error: [client-error] legal landing read failed
[client-error] HTTP 403 POST /rest/v1/rpc/my_legal_status ({"code":"P0D01","details":null,"hint":null,"message":"accountDeactivated"})
[client-error] HTTP 403 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "accountDeactivated", "refusals": [{"reason": "accountDeactivated"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×2
[client-error] console.error: [client-error] legal landing read failed
[client-error] HTTP 403 POST /rest/v1/rpc/my_legal_status ({"code":"P0D01","details":null,"hint":null,"message":"accountDeactivated"})
[client-error] HTTP 403 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "accountDeactivated", "refusals": [{"reason": "accountDeactivated"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 () ×2
[client-error] console.error: [client-error] legal landing read failed
[client-error] HTTP 403 POST /rest/v1/rpc/my_legal_status ({"code":"P0D01","details":null,"hint":null,"message":"accountDeactivated"})
[client-error] HTTP 403 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "accountDeactivated", "refusals": [{"reason": "accountDeactivated"}]})
console.error: [client-error] legal landing read failed ×4
```
