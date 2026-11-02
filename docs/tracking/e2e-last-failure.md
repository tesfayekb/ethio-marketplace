# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41395409251
- Commit: `cbdfc96929874e4cd27478b971f3ca6436296e8d`
- Attempt: 1
- Written (UTC): 2026-11-02T06:03:39.146Z
- Passed: 2621 · Skipped: 429 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 19 results files read, 19 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `categories file too large` (quiet) | 2 | shard 4, shard 12 |
| `categories nulByte` (quiet) | 2 | shard 4, shard 12 |
| `categories unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `countries badHeader` (quiet) | 2 | shard 4, shard 12 |
| `countries nulByte` (quiet) | 2 | shard 4, shard 12 |
| `countries tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `countries unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `countries wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `definitions nulByte` (quiet) | 2 | shard 4, shard 12 |
| `definitions tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `definitions unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `links unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations badHeader` (quiet) | 2 | shard 4, shard 12 |
| `locations file too large` (quiet) | 2 | shard 4, shard 12 |
| `locations nulByte` (quiet) | 2 | shard 4, shard 12 |
| `locations unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `locations wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `strings badHeader` (quiet) | 2 | shard 4, shard 12 |
| `strings emptyFile` (quiet) | 2 | shard 4, shard 12 |
| `strings nulByte` (quiet) | 2 | shard 4, shard 12 |
| `strings tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `strings unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `strings wrongFile` (quiet) | 2 | shard 4, shard 12 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-02T05:46:06.229Z | 12.6 min |
| email | 2026-11-02T05:46:20.335Z | 0.3 min |
| shard 1 | 2026-11-02T05:46:32.817Z | 13.2 min |
| shard 2 | 2026-11-02T05:46:15.437Z | 14.0 min |
| shard 3 | 2026-11-02T05:46:35.259Z | 9.7 min |
| shard 4 | 2026-11-02T05:46:51.029Z | 11.7 min |
| shard 5 | 2026-11-02T05:46:34.901Z | 12.4 min |
| shard 6 | 2026-11-02T05:46:57.166Z | 10.5 min |
| shard 7 | 2026-11-02T05:46:38.039Z | 4.3 min |
| shard 8 | 2026-11-02T05:46:46.179Z | 8.6 min |
| shard 9 | 2026-11-02T05:47:51.680Z | 14.9 min |
| shard 10 | 2026-11-02T05:46:03.503Z | 14.2 min |
| shard 11 | 2026-11-02T05:49:21.152Z | 11.1 min |
| shard 12 | 2026-11-02T05:46:06.893Z | 8.1 min |
| shard 13 | 2026-11-02T05:47:01.799Z | 11.5 min |
| shard 14 | 2026-11-02T05:46:25.992Z | 9.2 min |
| shard 15 | 2026-11-02T05:46:55.482Z | 4.6 min |
| shard 16 | 2026-11-02T05:46:37.292Z | 8.0 min |
| repeat | 2026-11-02T05:46:40.092Z | 7.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 468 | 19.1 min | smoke, shard 8, shard 16 |
| `auth-signout.spec.ts` | 72 | 6.5 min | smoke, shard 3, shard 11 |
| `admin-attributes-library.spec.ts` | 42 | 5.7 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.6 min | shard 5, shard 13 |
| `press.spec.ts` | 88 | 5.5 min | shard 7, shard 15, repeat |
| `import-security.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 4.7 min | shard 6, shard 14 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 11 |
| `post-wizard-place.spec.ts` | 38 | 4.4 min | shard 5, shard 13 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 1, shard 9 |
| `admin-locations.spec.ts` | 38 | 4.3 min | shard 2, shard 10 |
| `sage-ad-page.spec.ts` | 72 | 4.2 min | shard 7, shard 15, repeat |
| `admin-translations-console.spec.ts` | 44 | 4.2 min | shard 2, shard 10 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 1, shard 9 |
| `admin-users.spec.ts` | 28 | 4.0 min | shard 3, shard 11 |
| `photo-pipeline.spec.ts` | 68 | 4.0 min | shard 5, shard 13 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `admin-roles.spec.ts` | 26 | 3.9 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 6, shard 14 |
| `admin-screening.spec.ts` | 52 | 3.6 min | shard 2, shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 3.4 min | shard 1, shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.3 min | shard 6, shard 14 |
| `ad-page.spec.ts` | 78 | 3.2 min | shard 1, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.2 min | shard 2, shard 10 |
| `choice-lists.spec.ts` | 96 | 3.1 min | shard 3, shard 11 |
| `my-listings-ad.spec.ts` | 36 | 3.1 min | shard 4, shard 12 |
| `admin-listings.spec.ts` | 62 | 2.8 min | shard 2, shard 10 |
| `sage-bands.spec.ts` | 76 | 2.8 min | shard 7, shard 15 |
| `post-wizard-category.spec.ts` | 48 | 2.8 min | shard 5, shard 13 |
| `posting-routes.spec.ts` | 80 | 2.6 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.6 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 1, shard 9 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `admin-countries.spec.ts` | 18 | 2.1 min | shard 2, shard 10 |
| `admin-attributes-import.spec.ts` | 40 | 2.0 min | shard 1, shard 9 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.7 min | shard 4, shard 12 |
| `dialogs.spec.ts` | 14 | 1.6 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 2, shard 10 |
| `mfa-stepup.spec.ts` | 20 | 1.5 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 1, shard 9 |
| `legal-certify.spec.ts` | 42 | 1.5 min | shard 4, shard 12 |
| `one-line-slots-admin.spec.ts` | 10 | 1.3 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `sage-tiers.spec.ts` | 40 | 1.0 min | shard 7, shard 15 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2, shard 10 |
| `my-listings-page.spec.ts` | 16 | 0.9 min | shard 5, shard 13 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 7, shard 15 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 4, shard 12 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `admin-coverage.spec.ts` | 16 | 0.6 min | shard 2, shard 10 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 4, shard 12 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 6, shard 14 |
| `one-line-slots.spec.ts` | 10 | 0.5 min | shard 5, shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 5, shard 13 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 5, shard 13 |
| `admin-categories-images.spec.ts` | 2 | 0.4 min | shard 2, shard 10 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 2, shard 10 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 11 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 8, shard 15 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 44.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.2 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.8 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.3 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 34.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41395409251-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41395409251-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 41395409251-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 41395409251-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 2, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 41395409251-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 34 user(s) owned by process 41395409251-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41395409251-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41395409251-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41395409251-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41395409251-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 41395409251-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 41395409251-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 41395409251-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 34 user(s) owned by process 41395409251-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41395409251-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41395409251-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41395409251-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41395409251-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41395409251-local-repeat
```

## press.spec.ts › The chosen mark moves at once › PS-9 the panel switcher checks the chosen panel before its page lands; the heading waits

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('rail-menu').getByTestId('panel-header-title')
Expected: "Marketplace"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('rail-menu').getByTestId('panel-header-title')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('rail-menu').getByTestId('panel-header-title')
Expected: "Marketplace"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('rail-menu').getByTestId('panel-header-title')


  415 |     const rail = await openRailScope(page);
  416 |     const title = rail.getByTestId("panel-header-title");
> 417 |     await expect(title).toHaveText(en["panel.marketplace"]);
      |                         ^
  418 |     const switcher = rail.getByTestId("panel-header-switcher");
  419 |     const option = (id: string) => page.getByRole("menu").getByTestId(`panel-header-option-${id}`);
  420 |     await switcher.click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/press.spec.ts:417:25
```

Context:

```text
          - listitem [ref=e432]:
            - generic [ref=e433]: About
          - listitem [ref=e434]:
            - generic [ref=e435]: Contact
      - navigation "Help" [ref=e436]:
        - heading "Help" [level=2] [ref=e437]
        - list [ref=e438]:
          - listitem [ref=e439]:
            - generic [ref=e440]: Safety
      - navigation "Legal" [ref=e441]:
        - heading "Legal" [level=2] [ref=e442]
        - list [ref=e443]:
          - listitem [ref=e444]:
            - link "Terms" [ref=e445] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e446]:
            - link "Privacy" [ref=e447] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e449]: © 2026 ethio.com — All rights reserved.
```
```

## press.spec.ts › The chosen mark moves at once › PS-9 the panel switcher checks the chosen panel before its page lands; the heading waits

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('rail-menu').getByTestId('panel-header-title')
Expected: "Marketplace"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('rail-menu').getByTestId('panel-header-title')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('rail-menu').getByTestId('panel-header-title')
Expected: "Marketplace"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('rail-menu').getByTestId('panel-header-title')


  415 |     const rail = await openRailScope(page);
  416 |     const title = rail.getByTestId("panel-header-title");
> 417 |     await expect(title).toHaveText(en["panel.marketplace"]);
      |                         ^
  418 |     const switcher = rail.getByTestId("panel-header-switcher");
  419 |     const option = (id: string) => page.getByRole("menu").getByTestId(`panel-header-option-${id}`);
  420 |     await switcher.click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/press.spec.ts:417:25
```

Context:

```text
          - listitem [ref=e432]:
            - generic [ref=e433]: About
          - listitem [ref=e434]:
            - generic [ref=e435]: Contact
      - navigation "Help" [ref=e436]:
        - heading "Help" [level=2] [ref=e437]
        - list [ref=e438]:
          - listitem [ref=e439]:
            - generic [ref=e440]: Safety
      - navigation "Legal" [ref=e441]:
        - heading "Legal" [level=2] [ref=e442]
        - list [ref=e443]:
          - listitem [ref=e444]:
            - link "Terms" [ref=e445] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e446]:
            - link "Privacy" [ref=e447] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e449]: © 2026 ethio.com — All rights reserved.
```
```

## press.spec.ts › The chosen mark moves at once › PS-9 the panel switcher checks the chosen panel before its page lands; the heading waits

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('rail-menu').getByTestId('panel-header-title')
Expected: "Marketplace"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('rail-menu').getByTestId('panel-header-title')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('rail-menu').getByTestId('panel-header-title')
Expected: "Marketplace"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('rail-menu').getByTestId('panel-header-title')


  415 |     const rail = await openRailScope(page);
  416 |     const title = rail.getByTestId("panel-header-title");
> 417 |     await expect(title).toHaveText(en["panel.marketplace"]);
      |                         ^
  418 |     const switcher = rail.getByTestId("panel-header-switcher");
  419 |     const option = (id: string) => page.getByRole("menu").getByTestId(`panel-header-option-${id}`);
  420 |     await switcher.click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/press.spec.ts:417:25
```

Context:

```text
          - listitem [ref=e432]:
            - generic [ref=e433]: About
          - listitem [ref=e434]:
            - generic [ref=e435]: Contact
      - navigation "Help" [ref=e436]:
        - heading "Help" [level=2] [ref=e437]
        - list [ref=e438]:
          - listitem [ref=e439]:
            - generic [ref=e440]: Safety
      - navigation "Legal" [ref=e441]:
        - heading "Legal" [level=2] [ref=e442]
        - list [ref=e443]:
          - listitem [ref=e444]:
            - link "Terms" [ref=e445] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e446]:
            - link "Privacy" [ref=e447] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e449]: © 2026 ethio.com — All rights reserved.
```
```

## press.spec.ts › The chosen mark moves at once › PS-9 the panel switcher checks the chosen panel before its page lands; the heading waits

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('rail-menu').getByTestId('panel-header-title')
Expected: "Marketplace"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('rail-menu').getByTestId('panel-header-title')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('rail-menu').getByTestId('panel-header-title')
Expected: "Marketplace"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('rail-menu').getByTestId('panel-header-title')


  415 |     const rail = await openRailScope(page);
  416 |     const title = rail.getByTestId("panel-header-title");
> 417 |     await expect(title).toHaveText(en["panel.marketplace"]);
      |                         ^
  418 |     const switcher = rail.getByTestId("panel-header-switcher");
  419 |     const option = (id: string) => page.getByRole("menu").getByTestId(`panel-header-option-${id}`);
  420 |     await switcher.click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/press.spec.ts:417:25
```

Context:

```text
          - listitem [ref=e432]:
            - generic [ref=e433]: About
          - listitem [ref=e434]:
            - generic [ref=e435]: Contact
      - navigation "Help" [ref=e436]:
        - heading "Help" [level=2] [ref=e437]
        - list [ref=e438]:
          - listitem [ref=e439]:
            - generic [ref=e440]: Safety
      - navigation "Legal" [ref=e441]:
        - heading "Legal" [level=2] [ref=e442]
        - list [ref=e443]:
          - listitem [ref=e444]:
            - link "Terms" [ref=e445] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e446]:
            - link "Privacy" [ref=e447] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e449]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 7

No `[ssr-error]` lines in the `shard 7` log (or no log was uploaded).

## Client errors: shard 7

```text
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw
```

## Server errors: repeat

No `[ssr-error]` lines in the `repeat` log (or no log was uploaded).

## Client errors: repeat

No `[client-error]` lines in the `repeat` log (or no log was uploaded).
