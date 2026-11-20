# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44716853765
- Commit: `a6d18bdb73c0506c43970a5e2636c6d6c8f621c3`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-a9e9485a239f… (0 read)
- Repeat: nothing to repeat
- Written (UTC): 2026-11-20T10:27:55.072Z
- Passed: 2544 · Skipped: 360 · Failed: 4
- Gating failures: 4 · STAGING-SINK (INC-1175, still gating): 0
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
[WebServer] [ssr-error] /api/listings/draft rateLimited:2026-11-20T11:00:00+00:00
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-20T10:13:42.956Z | 3.7 min |
| email | 2026-11-20T10:15:03.931Z | 0.3 min |
| webkit | 2026-11-20T10:14:27.095Z | 8.4 min |
| shard 1 | 2026-11-20T10:21:17.356Z | 5.9 min |
| shard 2 | 2026-11-20T10:15:06.102Z | 7.7 min |
| shard 3 | 2026-11-20T10:13:38.908Z | 5.8 min |
| shard 4 | 2026-11-20T10:13:46.164Z | 5.3 min |
| shard 5 | 2026-11-20T10:13:54.318Z | 6.1 min |
| shard 6 | 2026-11-20T10:13:13.300Z | 5.6 min |
| shard 7 | 2026-11-20T10:18:38.789Z | 5.7 min |
| shard 8 | 2026-11-20T10:13:45.706Z | 7.2 min |
| shard 9 | 2026-11-20T10:13:52.318Z | 6.5 min |
| shard 10 | 2026-11-20T10:21:09.751Z | 5.8 min |
| shard 11 | 2026-11-20T10:13:35.160Z | 5.9 min |
| shard 12 | 2026-11-20T10:14:52.932Z | 8.3 min |
| shard 13 | 2026-11-20T10:13:58.275Z | 4.9 min |
| shard 14 | 2026-11-20T10:13:54.481Z | 6.6 min |
| shard 15 | 2026-11-20T10:14:15.336Z | 6.1 min |
| shard 16 | 2026-11-20T10:13:58.899Z | 7.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.1 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 7.1 min | shard 2 |
| `post-wizard-specs.spec.ts` | 82 | 6.2 min | shard 12 |
| `admin-screening.spec.ts` | 58 | 5.6 min | webkit, shard 14 |
| `admin-translations-console.spec.ts` | 46 | 5.6 min | smoke, shard 8 |
| `admin-listings.spec.ts` | 78 | 5.6 min | webkit, shard 10 |
| `photo-pipeline.spec.ts` | 74 | 5.4 min | webkit, shard 16 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.1 min | shard 3 |
| `admin-roles.spec.ts` | 28 | 5.0 min | shard 9 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `import-security.spec.ts` | 36 | 4.7 min | shard 4 |
| `admin-categories-console.spec.ts` | 34 | 4.6 min | shard 7 |
| `post-wizard-place.spec.ts` | 40 | 4.6 min | shard 11 |
| `admin-users.spec.ts` | 28 | 4.6 min | shard 16 |
| `admin-locations.spec.ts` | 38 | 4.5 min | shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 4.3 min | shard 8 |
| `my-listings-ad.spec.ts` | 38 | 4.2 min | shard 12 |
| `ad-page.spec.ts` | 104 | 4.2 min | webkit, shard 13 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-attributes-editor.spec.ts` | 36 | 3.9 min | shard 14 |
| `admin-monetisation.spec.ts` | 34 | 3.7 min | smoke, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `auth-signout.spec.ts` | 36 | 3.6 min | shard 9 |
| `posting-routes.spec.ts` | 80 | 3.6 min | shard 2 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 15 |
| `admin-translations-governance.spec.ts` | 20 | 3.1 min | smoke, shard 16 |
| `choice-lists.spec.ts` | 96 | 2.9 min | shard 7 |
| `dialogs.spec.ts` | 20 | 2.9 min | webkit, shard 10 |
| `post-wizard-category.spec.ts` | 52 | 2.8 min | webkit, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 2.6 min | shard 8 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `sage-tiers.spec.ts` | 52 | 2.3 min | webkit, shard 2 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `sage-ad-page.spec.ts` | 30 | 2.1 min | webkit, shard 11 |
| `admin-audit.spec.ts` | 16 | 2.0 min | shard 9 |
| `legal-admin.spec.ts` | 44 | 2.0 min | shard 7 |
| `legal-certify.spec.ts` | 44 | 1.9 min | shard 14 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 5 |
| `mfa-stepup.spec.ts` | 22 | 1.7 min | webkit, shard 15 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 4 |
| `phone-frame.spec.ts` | 18 | 1.6 min | shard 12 |
| `press.spec.ts` | 22 | 1.6 min | shard 12 |
| `admin-categories-images.spec.ts` | 6 | 1.6 min | smoke, webkit, shard 12 |
| `admin-shell.spec.ts` | 12 | 1.5 min | shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `name-check-queue.spec.ts` | 8 | 1.1 min | smoke, shard 9 |
| `sage-shell.spec.ts` | 80 | 1.0 min | shard 16 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `my-listings-page.spec.ts` | 20 | 1.0 min | webkit, shard 10 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `legal-doors.spec.ts` | 34 | 0.9 min | smoke, shard 8 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `ad-page-doors.spec.ts` | 30 | 0.7 min | shard 14 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 16 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-accept.spec.ts` | 12 | 0.6 min | shard 2 |
| `post-wizard-details.spec.ts` | 8 | 0.6 min | shard 14 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 11 |
| `posting-routes-dials.spec.ts` | 14 | 0.5 min | shard 9 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `shell-bands.spec.ts` | 16 | 0.5 min | shard 12 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 3 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 13 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `submenu-look.spec.ts` | 12 | 0.3 min | shard 2 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | shard 8 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 2 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.7 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.0 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 29.9 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 29.4 s |
| `auth-signout.spec.ts` › SO-11 a sign-out whose server cannot be reached still ends the session on this device (DEC-268) | desktop-1280 | 29.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 44716853765-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44716853765-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 44716853765-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44716853765-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 44716853765-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44716853765-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 44716853765-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 44716853765-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44716853765-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44716853765-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 3, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 44716853765-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 44716853765-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 44716853765-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44716853765-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44716853765-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44716853765-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 44716853765-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 44716853765-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 44716853765-local-16
```

## auth-caller-gates.spec.ts › CG-2 the six retired doors are closed to a signed-in account

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: relist_listing

expect(received).toBe(expected) // Object.is equality

Expected: "42501"
Received: "PGRST202"
--- further error 1 ---
Error: relist_listing

expect(received).toBe(expected) // Object.is equality

Expected: "42501"
Received: "PGRST202"

  254 |   ] as const) {
  255 |     const { error } = await caller.rpc(fn, args);
> 256 |     expect(error?.code, fn).toBe("42501");
      |                             ^
  257 |     expect(error?.message, fn).toContain("permission denied for function");
  258 |     expect(error?.message, fn).not.toMatch(
  259 |       /only a super admin|not your listing|notYourListing|not authenticated|notSignedIn|illegal transition/,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-caller-gates.spec.ts:256:29
```

Context: context file not found for `auth-caller-gates-CG-2-the-six-retired-doors-are-closed-to-a-signed-in-account-mobile-360` — Playwright's name `auth-caller-gates-CG-2-the-8afc3-osed-to-a-signed-in-account-mobile-360`; this run carried 0 context file(s); of the same spec: none

## auth-caller-gates.spec.ts › CG-2 the six retired doors are closed to a signed-in account

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: relist_listing

expect(received).toBe(expected) // Object.is equality

Expected: "42501"
Received: "PGRST202"
--- further error 1 ---
Error: relist_listing

expect(received).toBe(expected) // Object.is equality

Expected: "42501"
Received: "PGRST202"

  254 |   ] as const) {
  255 |     const { error } = await caller.rpc(fn, args);
> 256 |     expect(error?.code, fn).toBe("42501");
      |                             ^
  257 |     expect(error?.message, fn).toContain("permission denied for function");
  258 |     expect(error?.message, fn).not.toMatch(
  259 |       /only a super admin|not your listing|notYourListing|not authenticated|notSignedIn|illegal transition/,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-caller-gates.spec.ts:256:29
```

Context: context file not found for `auth-caller-gates-CG-2-the-six-retired-doors-are-closed-to-a-signed-in-account-desktop-1280` — Playwright's name `auth-caller-gates-CG-2-the-8afc3-osed-to-a-signed-in-account-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## legal-certify.spec.ts › Legal certification › LGC-6 a publishing statement is for signed-in people: the doors refuse a visitor, the page sends one to sign in, and a seller reads the global statement and the country's (D236, M24)

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: legal_in_force

expect(received).toBe(expected) // Object.is equality

Expected: 500
Received: 401
--- further error 1 ---
Error: legal_in_force

expect(received).toBe(expected) // Object.is equality

Expected: 500
Received: 401

  1341 |     for (const fn of ["legal_in_force", "legal_scheduled"]) {
  1342 |       const refused = await anonRpc(fn, { p_kind: kind });
> 1343 |       expect(refused.status, fn).toBe(500);
       |                                  ^
  1344 |       expect(refused.body, fn).toMatchObject({ code: "P0D01", message: "notSignedIn" });
  1345 |     }
  1346 |     const publicKind = await anonRpc("legal_in_force", { p_kind: "e2e-lgc6-public" });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:1343:34
```

Context: context file not found for `legal-certify-Legal-certification-LGC-6-a-publishing-statement-is-for-signed-in-people-the-doors-refuse-a-visitor-the-page-sends-one-to-sign-in-and-a-seller-reads-the-global-statement-and-the-country-s-D236-M24-mobile-360` — Playwright's name `legal-certify-Legal-certif-64657-and-the-country-s-D236-M24--mobile-360`; this run carried 0 context file(s); of the same spec: none

## legal-certify.spec.ts › Legal certification › LGC-6 a publishing statement is for signed-in people: the doors refuse a visitor, the page sends one to sign in, and a seller reads the global statement and the country's (D236, M24)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: legal_in_force

expect(received).toBe(expected) // Object.is equality

Expected: 500
Received: 401
--- further error 1 ---
Error: legal_in_force

expect(received).toBe(expected) // Object.is equality

Expected: 500
Received: 401

  1341 |     for (const fn of ["legal_in_force", "legal_scheduled"]) {
  1342 |       const refused = await anonRpc(fn, { p_kind: kind });
> 1343 |       expect(refused.status, fn).toBe(500);
       |                                  ^
  1344 |       expect(refused.body, fn).toMatchObject({ code: "P0D01", message: "notSignedIn" });
  1345 |     }
  1346 |     const publicKind = await anonRpc("legal_in_force", { p_kind: "e2e-lgc6-public" });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:1343:34
```

Context: context file not found for `legal-certify-Legal-certification-LGC-6-a-publishing-statement-is-for-signed-in-people-the-doors-refuse-a-visitor-the-page-sends-one-to-sign-in-and-a-seller-reads-the-global-statement-and-the-country-s-D236-M24-desktop-1280` — Playwright's name `legal-certify-Legal-certif-64657-and-the-country-s-D236-M24--desktop-1280`; this run carried 0 context file(s); of the same spec: none

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 14

No `[ssr-error]` lines in the `shard 14` log (or no log was uploaded).

## Client errors: shard 14

No `[client-error]` lines in the `shard 14` log (or no log was uploaded).
