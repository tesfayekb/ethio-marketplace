# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41011892858
- Commit: `1c43379bfa34a1c7b0cf15b19ec7d7f1e83a9b19`
- Attempt: 1
- Written (UTC): 2026-10-30T06:23:36.236Z
- Passed: 2292 · Skipped: 187 · Failed: 9
- Gating failures: 9 · Quarantined (@global-state, INC-117, non-gating): 0
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
| smoke | 2026-10-30T06:09:15.001Z | 13.9 min |
| email | 2026-10-30T06:08:24.214Z | 0.3 min |
| shard 1 | 2026-10-30T06:06:34.711Z | 9.0 min |
| shard 2 | 2026-10-30T06:07:25.247Z | 13.8 min |
| shard 3 | 2026-10-30T06:07:37.899Z | 11.9 min |
| shard 4 | 2026-10-30T06:09:44.698Z | 8.5 min |
| shard 5 | 2026-10-30T06:06:46.617Z | 6.7 min |
| shard 6 | 2026-10-30T06:06:56.051Z | 10.4 min |
| shard 7 | 2026-10-30T06:06:32.108Z | 6.5 min |
| shard 8 | 2026-10-30T06:06:42.019Z | 8.0 min |
| shard 9 | 2026-10-30T06:07:58.318Z | 10.3 min |
| shard 10 | 2026-10-30T06:06:54.171Z | 11.4 min |
| shard 11 | 2026-10-30T06:07:15.299Z | 13.8 min |
| shard 12 | 2026-10-30T06:06:39.982Z | 8.9 min |
| shard 13 | 2026-10-30T06:06:52.871Z | 8.5 min |
| shard 14 | 2026-10-30T06:06:39.491Z | 11.7 min |
| shard 15 | 2026-10-30T06:06:25.728Z | 8.1 min |
| shard 16 | 2026-10-30T06:07:08.534Z | 2.9 min |
| repeat | 2026-10-30T06:06:17.175Z | 0.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 436 | 19.0 min | smoke, shard 8, shard 15 |
| `auth-signout.spec.ts` | 68 | 6.6 min | smoke, shard 3, shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.5 min | shard 6, shard 14 |
| `admin-attributes-library.spec.ts` | 42 | 5.4 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 5.4 min | shard 4, shard 12 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 3, shard 11 |
| `post-wizard-specs.spec.ts` | 82 | 4.6 min | shard 7, shard 14 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 2, shard 10 |
| `admin-screening.spec.ts` | 52 | 4.4 min | shard 3, shard 11 |
| `admin-roles.spec.ts` | 26 | 4.4 min | shard 2, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.1 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.1 min | shard 6, shard 14 |
| `admin-users.spec.ts` | 28 | 4.0 min | shard 3, shard 11 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 1, shard 9 |
| `photo-pipeline.spec.ts` | 68 | 3.8 min | shard 5, shard 13 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.6 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 7, shard 15 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 5, shard 13 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 78 | 2.9 min | shard 1, shard 9 |
| `admin-listings.spec.ts` | 62 | 2.9 min | shard 2, shard 10 |
| `post-wizard-category.spec.ts` | 48 | 2.6 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 1, shard 10 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 7, shard 15 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 2.1 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `legal-certify.spec.ts` | 42 | 1.8 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 2, shard 10 |
| `admin-attributes-import.spec.ts` | 40 | 1.6 min | shard 1, shard 9 |
| `mfa-stepup.spec.ts` | 18 | 1.5 min | shard 5, shard 13 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 2, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 3, shard 11 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 4, shard 12 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 7, shard 15 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 1, shard 9 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 7, shard 15 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `submenu.spec.ts` | 24 | 0.3 min | shard 8, shard 16, repeat |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 5, shard 13 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 5, shard 13 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 11 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 7, shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 9, shard 16 |
| `submenu-touch.spec.ts` | 12 | 0.1 min | shard 9, shard 16, repeat |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `menu-rows.spec.ts` | 12 | 0.1 min | shard 9, shard 16, repeat |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 15 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `overlays.spec.ts` | 6 | 0.1 min | shard 5, shard 13 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 8, shard 15 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.6 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41011892858-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41011892858-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 41011892858-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 41011892858-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 2, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 41011892858-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 2, fresh 15)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 41011892858-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 41011892858-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41011892858-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41011892858-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41011892858-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 41011892858-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 41011892858-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 41011892858-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 2, fresh 15)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 41011892858-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 41011892858-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41011892858-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41011892858-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41011892858-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41011892858-local-repeat
```

## shell.spec.ts › mobile chrome › the strip sits under the fixed bar

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 41
Received:    44.84375
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 41
Received:    44.84375

  1075 |     for (const height of rows) {
  1076 |       expect(height).toBeGreaterThanOrEqual(31);
> 1077 |       expect(height).toBeLessThanOrEqual(41);
       |                      ^
  1078 |     }
  1079 |   });
  1080 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1077:22
```

Context:

```text
          - listitem [ref=e199]:
            - generic [ref=e200]: About
          - listitem [ref=e201]:
            - generic [ref=e202]: Contact
      - navigation "Help" [ref=e203]:
        - heading "Help" [level=2] [ref=e204]
        - list [ref=e205]:
          - listitem [ref=e206]:
            - generic [ref=e207]: Safety
      - navigation "Legal" [ref=e208]:
        - heading "Legal" [level=2] [ref=e209]
        - list [ref=e210]:
          - listitem [ref=e211]:
            - link "Terms" [ref=e212] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e213]:
            - link "Privacy" [ref=e214] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e216]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › the menu opens in place

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 41
Received:    44.84375
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 41
Received:    44.84375

  1343 |       .toBe("level");
  1344 |     expect(rowBox.height).toBeGreaterThanOrEqual(31);
> 1345 |     expect(rowBox.height).toBeLessThanOrEqual(41);
       |                           ^
  1346 |     const iconBox = await row.locator("svg:nth-of-type(1)").boundingBox();
  1347 |     const nameBox = await row.locator("[data-cut]").boundingBox();
  1348 |     if (!iconBox || !nameBox) throw new Error("Missing menu row icon or name");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1345:27
```

Context:

```text
          - listitem [ref=e339]:
            - generic [ref=e340]: About
          - listitem [ref=e341]:
            - generic [ref=e342]: Contact
      - navigation "Help" [ref=e343]:
        - heading "Help" [level=2] [ref=e344]
        - list [ref=e345]:
          - listitem [ref=e346]:
            - generic [ref=e347]: Safety
      - navigation "Legal" [ref=e348]:
        - heading "Legal" [level=2] [ref=e349]
        - list [ref=e350]:
          - listitem [ref=e351]:
            - link "Terms" [ref=e352] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e353]:
            - link "Privacy" [ref=e354] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e356]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › primary touch targets are at least 44px

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 41
Received:    44.84375
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 41
Received:    44.84375

  1551 |     if (!stripRowBox) throw new Error("Missing strip category");
  1552 |     expect(stripRowBox.height).toBeGreaterThanOrEqual(31);
> 1553 |     expect(stripRowBox.height).toBeLessThanOrEqual(41);
       |                                ^
  1554 |
  1555 |     // Category rows inside the opened menu share the strip's fitted height.
  1556 |     const menu = await openRailScope(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1553:32
```

Context:

```text
          - listitem [ref=e199]:
            - generic [ref=e200]: About
          - listitem [ref=e201]:
            - generic [ref=e202]: Contact
      - navigation "Help" [ref=e203]:
        - heading "Help" [level=2] [ref=e204]
        - list [ref=e205]:
          - listitem [ref=e206]:
            - generic [ref=e207]: Safety
      - navigation "Legal" [ref=e208]:
        - heading "Legal" [level=2] [ref=e209]
        - list [ref=e210]:
          - listitem [ref=e211]:
            - link "Terms" [ref=e212] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e213]:
            - link "Privacy" [ref=e214] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e216]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › the strip sits under the fixed bar

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 41
Received:    44.84375
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 41
Received:    44.84375

  1075 |     for (const height of rows) {
  1076 |       expect(height).toBeGreaterThanOrEqual(31);
> 1077 |       expect(height).toBeLessThanOrEqual(41);
       |                      ^
  1078 |     }
  1079 |   });
  1080 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1077:22
```

Context:

```text
          - listitem [ref=e199]:
            - generic [ref=e200]: About
          - listitem [ref=e201]:
            - generic [ref=e202]: Contact
      - navigation "Help" [ref=e203]:
        - heading "Help" [level=2] [ref=e204]
        - list [ref=e205]:
          - listitem [ref=e206]:
            - generic [ref=e207]: Safety
      - navigation "Legal" [ref=e208]:
        - heading "Legal" [level=2] [ref=e209]
        - list [ref=e210]:
          - listitem [ref=e211]:
            - link "Terms" [ref=e212] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e213]:
            - link "Privacy" [ref=e214] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e216]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › the menu opens in place

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 41
Received:    44.84375
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 41
Received:    44.84375

  1343 |       .toBe("level");
  1344 |     expect(rowBox.height).toBeGreaterThanOrEqual(31);
> 1345 |     expect(rowBox.height).toBeLessThanOrEqual(41);
       |                           ^
  1346 |     const iconBox = await row.locator("svg:nth-of-type(1)").boundingBox();
  1347 |     const nameBox = await row.locator("[data-cut]").boundingBox();
  1348 |     if (!iconBox || !nameBox) throw new Error("Missing menu row icon or name");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1345:27
```

Context:

```text
          - listitem [ref=e339]:
            - generic [ref=e340]: About
          - listitem [ref=e341]:
            - generic [ref=e342]: Contact
      - navigation "Help" [ref=e343]:
        - heading "Help" [level=2] [ref=e344]
        - list [ref=e345]:
          - listitem [ref=e346]:
            - generic [ref=e347]: Safety
      - navigation "Legal" [ref=e348]:
        - heading "Legal" [level=2] [ref=e349]
        - list [ref=e350]:
          - listitem [ref=e351]:
            - link "Terms" [ref=e352] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e353]:
            - link "Privacy" [ref=e354] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e356]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › mobile chrome › primary touch targets are at least 44px

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 41
Received:    44.84375
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 41
Received:    44.84375

  1551 |     if (!stripRowBox) throw new Error("Missing strip category");
  1552 |     expect(stripRowBox.height).toBeGreaterThanOrEqual(31);
> 1553 |     expect(stripRowBox.height).toBeLessThanOrEqual(41);
       |                                ^
  1554 |
  1555 |     // Category rows inside the opened menu share the strip's fitted height.
  1556 |     const menu = await openRailScope(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1553:32
```

Context:

```text
          - listitem [ref=e199]:
            - generic [ref=e200]: About
          - listitem [ref=e201]:
            - generic [ref=e202]: Contact
      - navigation "Help" [ref=e203]:
        - heading "Help" [level=2] [ref=e204]
        - list [ref=e205]:
          - listitem [ref=e206]:
            - generic [ref=e207]: Safety
      - navigation "Legal" [ref=e208]:
        - heading "Legal" [level=2] [ref=e209]
        - list [ref=e210]:
          - listitem [ref=e211]:
            - link "Terms" [ref=e212] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e213]:
            - link "Privacy" [ref=e214] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e216]: © 2026 ethio.com — All rights reserved.
```
```

## menu-rows.spec.ts › ROWS-E3 the rail's list fits at 1280×600 when its rows fit at 32 px; it does not scroll

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: ROWS-E3 the tree's rows fit at 32 px in this region

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 302
Received:    448
--- further error 1 ---
Error: ROWS-E3 the tree's rows fit at 32 px in this region

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 302
Received:    448

  59 |   expect(many, "ROWS-E3 a list of 16 or fewer is not data-many").toBeNull();
  60 |   // The real tree (15 roots, no favourite) fits at 600 px.
> 61 |   expect(count * 32, "ROWS-E3 the tree's rows fit at 32 px in this region").toBeLessThanOrEqual(
     |                                                                             ^
  62 |     client,
  63 |   );
  64 |   await expect.poll(async () => (await scrollOf(page)).overflow).toBeLessThanOrEqual(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/menu-rows.spec.ts:61:77
```

Context:

```text
          - listitem [ref=e250]:
            - generic [ref=e251]: About
          - listitem [ref=e252]:
            - generic [ref=e253]: Contact
      - navigation "Help" [ref=e254]:
        - heading "Help" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Safety
      - navigation "Legal" [ref=e259]:
        - heading "Legal" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - link "Terms" [ref=e263] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e264]:
            - link "Privacy" [ref=e265] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e267]: © 2026 ethio.com — All rights reserved.
```
```

## menu-rows.spec.ts › ROWS-E3 the rail's list fits at 1280×600 when its rows fit at 32 px; it does not scroll

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: ROWS-E3 the tree's rows fit at 32 px in this region

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 302
Received:    448
--- further error 1 ---
Error: ROWS-E3 the tree's rows fit at 32 px in this region

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 302
Received:    448

  59 |   expect(many, "ROWS-E3 a list of 16 or fewer is not data-many").toBeNull();
  60 |   // The real tree (15 roots, no favourite) fits at 600 px.
> 61 |   expect(count * 32, "ROWS-E3 the tree's rows fit at 32 px in this region").toBeLessThanOrEqual(
     |                                                                             ^
  62 |     client,
  63 |   );
  64 |   await expect.poll(async () => (await scrollOf(page)).overflow).toBeLessThanOrEqual(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/menu-rows.spec.ts:61:77
```

Context:

```text
          - listitem [ref=e250]:
            - generic [ref=e251]: About
          - listitem [ref=e252]:
            - generic [ref=e253]: Contact
      - navigation "Help" [ref=e254]:
        - heading "Help" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Safety
      - navigation "Legal" [ref=e259]:
        - heading "Legal" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - link "Terms" [ref=e263] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e264]:
            - link "Privacy" [ref=e265] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e267]: © 2026 ethio.com — All rights reserved.
```
```

## menu-rows.spec.ts › ROWS-E3 the rail's list fits at 1280×600 when its rows fit at 32 px; it does not scroll

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: ROWS-E3 the tree's rows fit at 32 px in this region

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 302
Received:    448
--- further error 1 ---
Error: ROWS-E3 the tree's rows fit at 32 px in this region

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 302
Received:    448

  59 |   expect(many, "ROWS-E3 a list of 16 or fewer is not data-many").toBeNull();
  60 |   // The real tree (15 roots, no favourite) fits at 600 px.
> 61 |   expect(count * 32, "ROWS-E3 the tree's rows fit at 32 px in this region").toBeLessThanOrEqual(
     |                                                                             ^
  62 |     client,
  63 |   );
  64 |   await expect.poll(async () => (await scrollOf(page)).overflow).toBeLessThanOrEqual(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/menu-rows.spec.ts:61:77
```

Context:

```text
          - listitem [ref=e250]:
            - generic [ref=e251]: About
          - listitem [ref=e252]:
            - generic [ref=e253]: Contact
      - navigation "Help" [ref=e254]:
        - heading "Help" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Safety
      - navigation "Legal" [ref=e259]:
        - heading "Legal" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - link "Terms" [ref=e263] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e264]:
            - link "Privacy" [ref=e265] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e267]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 8

No `[ssr-error]` lines in the `shard 8` log (or no log was uploaded).

## Client errors: shard 8

No `[client-error]` lines in the `shard 8` log (or no log was uploaded).

## Server errors: shard 16

No `[ssr-error]` lines in the `shard 16` log (or no log was uploaded).

## Client errors: shard 16

No `[client-error]` lines in the `shard 16` log (or no log was uploaded).

## Server errors: repeat

No `[ssr-error]` lines in the `repeat` log (or no log was uploaded).

## Client errors: repeat

No `[client-error]` lines in the `repeat` log (or no log was uploaded).
