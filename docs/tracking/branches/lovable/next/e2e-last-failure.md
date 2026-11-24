# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45332415048
- Commit: `8a6464e5b3efa867121be6c0686112cbbf46eb8e`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-ef42aafe9979… (0 read)
- Repeat: 18 of 18 tests repeated — specs directly changed 1/1, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-24T05:49:11.397Z
- Passed: 2527 · Skipped: 336 · Failed: 1
- Gating failures: 1 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: webkit (INFRA: install-chromium-s-system-libraries), repeat (INFRA: install-chromium-s-system-libraries)
- Infrastructure: 2 lane(s) died before any test at install-chromium-s-system-libraries — ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh webkit ran past its 1500s deadline on try 1 of 1
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 20 results files read, 18 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: webkit, repeat

`webkit`, `repeat`: log unavailable.

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

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: webkit, repeat

`webkit`, `repeat`: log unavailable.

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: webkit

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-24T05:31:01.023Z | 3.5 min |
| email | 2026-11-24T05:23:43.141Z | 0.3 min |
| shard 1 | 2026-11-24T05:32:02.895Z | 5.5 min |
| shard 2 | 2026-11-24T05:24:26.158Z | 7.0 min |
| shard 3 | 2026-11-24T05:31:41.445Z | 5.5 min |
| shard 4 | 2026-11-24T05:24:25.213Z | 7.7 min |
| shard 5 | 2026-11-24T05:31:00.237Z | 6.1 min |
| shard 6 | 2026-11-24T05:24:31.102Z | 6.9 min |
| shard 7 | 2026-11-24T05:24:31.844Z | 7.4 min |
| shard 8 | 2026-11-24T05:24:57.703Z | 7.1 min |
| shard 9 | 2026-11-24T05:31:14.915Z | 6.3 min |
| shard 10 | 2026-11-24T05:34:32.753Z | 5.8 min |
| shard 11 | 2026-11-24T05:24:40.309Z | 7.5 min |
| shard 12 | 2026-11-24T05:24:10.519Z | 6.9 min |
| shard 13 | 2026-11-24T05:31:53.511Z | 4.9 min |
| shard 14 | 2026-11-24T05:32:15.500Z | 5.2 min |
| shard 15 | 2026-11-24T05:24:01.397Z | 6.7 min |
| shard 16 | 2026-11-24T05:32:12.812Z | 5.6 min |
| repeat | 2026-11-24T05:21:21.221Z | 0.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.6 min | shard 1 |
| `import-security.spec.ts` | 36 | 7.1 min | shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 6.8 min | shard 2 |
| `admin-translations-console.spec.ts` | 46 | 5.6 min | smoke, shard 8 |
| `admin-categories-console.spec.ts` | 34 | 5.6 min | shard 7 |
| `admin-locations.spec.ts` | 44 | 5.4 min | shard 6 |
| `post-wizard-place.spec.ts` | 40 | 5.2 min | shard 11 |
| `post-wizard-specs.spec.ts` | 82 | 5.2 min | shard 12 |
| `post-wizard-where.spec.ts` | 32 | 5.0 min | shard 11 |
| `auth-signout.spec.ts` | 42 | 4.9 min | shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.8 min | shard 3 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 5 |
| `admin-listings.spec.ts` | 80 | 4.6 min | shard 10 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `admin-screening.spec.ts` | 60 | 4.3 min | shard 14 |
| `post-wizard-pricing.spec.ts` | 52 | 4.2 min | shard 8 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `choice-lists.spec.ts` | 96 | 3.9 min | shard 7 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 16 |
| `my-listings-ad.spec.ts` | 38 | 3.8 min | shard 12 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.7 min | shard 15 |
| `photo-pipeline.spec.ts` | 70 | 3.6 min | shard 16 |
| `sage-bands.spec.ts` | 76 | 3.3 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 3.2 min | shard 2 |
| `admin-monetisation.spec.ts` | 34 | 3.2 min | smoke, shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 14 |
| `post-wizard-category.spec.ts` | 48 | 3.1 min | shard 4 |
| `ad-page.spec.ts` | 82 | 3.0 min | shard 13 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `legal-admin.spec.ts` | 44 | 2.8 min | shard 7 |
| `admin-countries.spec.ts` | 18 | 2.5 min | shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 2.5 min | shard 8 |
| `mfa-stepup.spec.ts` | 26 | 2.4 min | shard 15 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `dialogs.spec.ts` | 24 | 2.3 min | shard 10 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 5 |
| `admin-categories-home.spec.ts` | 10 | 1.9 min | shard 4 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `legal-certify.spec.ts` | 44 | 1.4 min | shard 14 |
| `sage-tiers.spec.ts` | 40 | 1.4 min | shard 2 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `admin-shell.spec.ts` | 12 | 1.4 min | shard 2 |
| `press.spec.ts` | 22 | 1.3 min | shard 12 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 12 |
| `sage-ad-page.spec.ts` | 18 | 1.2 min | shard 11 |
| `house-style.spec.ts` | 18 | 1.2 min | shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `admin-categories-images.spec.ts` | 4 | 0.9 min | smoke, shard 12 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.9 min | shard 15 |
| `legal-doors.spec.ts` | 34 | 0.8 min | smoke, shard 8 |
| `my-listings-page.spec.ts` | 22 | 0.8 min | shard 10 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `sage-cards.spec.ts` | 28 | 0.5 min | shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `settings.spec.ts` | 13 | 0.5 min | shard 1 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 14 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `i18n-coverage.spec.ts` | 14 | 0.5 min | shard 4 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 11 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 15 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `rbac.spec.ts` | 6 | 0.3 min | shard 7 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 7 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `layout.spec.ts` | 10 | 0.2 min | shard 10 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `admin-ai-calls.spec.ts` | 2 | 0.2 min | shard 11 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | shard 8 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 52.2 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 51.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 50.9 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 50.4 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 49.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 41.8 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 35.1 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | desktop-1280 | 33.8 s |
| `auth-signout.spec.ts` › SO-15 a session gone with no event ends at the first 401: the notice offers sign-in, and the poll calls no more (INC-1218) | mobile-360 | 33.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.1 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 31.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.9 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45332415048-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45332415048-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45332415048-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 45332415048-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45332415048-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 45332415048-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 45332415048-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45332415048-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45332415048-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 3, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 45332415048-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 45332415048-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 7 user(s) owned by process 45332415048-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45332415048-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45332415048-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45332415048-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45332415048-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 34 (pool 2, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 49 user(s) owned by process 45332415048-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 45332415048-local-16
```

## dialogs.spec.ts › a Filters panel in rows (Lovable bundle 3) › DLG-E12 a filter row's list opens in the panel's flow under its row with its choices in view above the footer; one press opens another row's list; Escape closes the list, then the panel

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: DLG-E12 the open list @ 834 x 560

expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
    "bodyEndsAtFooter": true,
    "footerInsidePanel": true,
    "inTheFlow": true,
-   "panelInsideWindow": true,
+   "panelInsideWindow": false,
    "rowInView": true,
    "underItsRow": true,
  }
--- further error 1 ---
Error: DLG-E12 the open list @ 834 x 560

expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
    "bodyEndsAtFooter": true,
    "footerInsidePanel": true,
    "inTheFlow": true,
-   "panelInsideWindow": true,
+   "panelInsideWindow": false,
    "rowInView": true,
    "underItsRow": true,
  }

  860 |         await listFacts(short, "style-filters-colour"),
  861 |         `DLG-E12 the open list @ ${width} x 560`,
> 862 |       ).toMatchObject({
```

Context:

```text
              - option "Pink" [ref=e1819]:
                - generic [ref=e1820]: Pink
              - option "Orange" [ref=e1821]:
                - generic [ref=e1822]: Orange
              - option "Grey" [ref=e1823]:
                - generic [ref=e1824]: Grey
              - option "Silver" [ref=e1825]:
                - generic [ref=e1826]: Silver
        - generic [ref=e1829]:
          - generic "Size" [ref=e1830]
          - button "Size Large" [ref=e1832] [cursor=pointer]:
            - generic [ref=e1833]: Large
            - img
      - generic:
        - img
        - generic: More below
    - generic [ref=e1834]:
      - button "Clear all" [ref=e1835] [cursor=pointer]
      - button "Done" [disabled]
```
```

## Server errors: webkit

No `[ssr-error]` lines in the `webkit` log (or no log was uploaded).

## Client errors: webkit

No `[client-error]` lines in the `webkit` log (or no log was uploaded).

## Server errors: shard 10

No `[ssr-error]` lines in the `shard 10` log (or no log was uploaded).

## Client errors: shard 10

No `[client-error]` lines in the `shard 10` log (or no log was uploaded).

## Server errors: repeat

No `[ssr-error]` lines in the `repeat` log (or no log was uploaded).

## Client errors: repeat

No `[client-error]` lines in the `repeat` log (or no log was uploaded).

## webkit: no results file

webkit: no results file — the process failed outside test results (setup/teardown/preflight).

- Class: **infrastructure** (INC-1101) — died before any test at `install-chromium-s-system-libraries`; re-run the failed jobs, never a code finding
- Failed step: `install-chromium-s-system-libraries` (outcome failure) — ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh webkit ran past its 1500s deadline on try 1 of 1

```text
Step install-chromium-s-system-libraries: outcome failure
  Ign:103 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libsoup-3.0-0 amd64 3.4.4-5ubuntu0.11
  Ign:104 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 gstreamer1.0-plugins-good amd64 1.24.2-1ubuntu1.8
  Ign:105 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libabsl20220623t64 amd64 20220623.1-3.1ubuntu3.2
  Get:106 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libgav1-1 amd64 0.18.0-1build3 [357 kB]
  Get:107 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libyuv0 amd64 0.0~git202401110.af6ac82-1 [178 kB]
  Get:108 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libavif16 amd64 1.0.4-1ubuntu3 [91.2 kB]
  Get:109 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libavtp0 amd64 0.2.0-1build1 [6414 B]
  Get:110 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libcairo-script-interpreter2 amd64 1.18.0-3build1 [60.3 kB]
  Get:111 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libdc1394-25 amd64 2.2.6-4build1 [90.1 kB]
  Get:112 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libde265-0 amd64 1.0.15-1ubuntu0.2 [167 kB]
  Get:113 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libdecor-0-0 amd64 0.2.2-1build2 [16.5 kB]
  Get:114 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libgles2 amd64 1.7.0-1build1 [17.1 kB]
  Get:115 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libdirectfb-1.7-7t64 amd64 1.7.7-11.1ubuntu2 [1035 kB]
  Get:116 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libdvdread8t64 amd64 6.1.3-1.1build1 [54.7 kB]
  Get:117 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libdvdnav4 amd64 6.1.1-3build1 [39.5 kB]
  Get:118 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libgl1-mesa-dri amd64 25.2.8-0ubuntu0.24.04.5 [38.0 kB]
  Ign:119 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libglx-mesa0 amd64 25.2.8-0ubuntu0.24.04.5
  Get:120 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libgbm1 amd64 25.2.8-0ubuntu0.24.04.5 [34.2 kB]
  Get:121 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 mesa-libgallium amd64 25.2.8-0ubuntu0.24.04.5 [10.8 MB]
  ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh webkit ran past its 1500s deadline on try 1 of 1
```

```text
(no log tail was uploaded for this source)
```

## repeat: results file with zero tests

repeat: SOURCE PRODUCED NO TESTS — the runner died before executing (webServer/setup): its results.json parsed but recorded zero tests.

- Class: **infrastructure** (INC-1101) — died before any test at `install-chromium-s-system-libraries`; re-run the failed jobs, never a code finding
- Failed step: `install-chromium-s-system-libraries` (outcome failure) — ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh chromium webkit ran past its 1500s deadline on try 1 of 1

```text
Step install-chromium-s-system-libraries: outcome failure
  Get:97 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libtag1v5-vanilla amd64 1.13.1-1build1 [326 kB]
  Get:98 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libtag1v5 amd64 1.13.1-1build1 [11.7 kB]
  Get:99 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libv4lconvert0t64 amd64 1.26.1-4build3 [87.6 kB]
  Get:100 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libv4l-0t64 amd64 1.26.1-4build3 [46.9 kB]
  Ign:101 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libwavpack1 amd64 5.6.0-1build1
  Ign:102 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libsoup-3.0-common all 3.4.4-5ubuntu0.11
  Get:103 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libsoup-3.0-0 amd64 3.4.4-5ubuntu0.11 [292 kB]
  Get:104 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 gstreamer1.0-plugins-good amd64 1.24.2-1ubuntu1.8 [2236 kB]
  Ign:105 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libabsl20220623t64 amd64 20220623.1-3.1ubuntu3.2
  Ign:106 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libgav1-1 amd64 0.18.0-1build3
  Get:107 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libyuv0 amd64 0.0~git202401110.af6ac82-1 [178 kB]
  Ign:108 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libavif16 amd64 1.0.4-1ubuntu3
  Get:109 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libavtp0 amd64 0.2.0-1build1 [6414 B]
  Get:110 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libcairo-script-interpreter2 amd64 1.18.0-3build1 [60.3 kB]
  Get:111 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libdc1394-25 amd64 2.2.6-4build1 [90.1 kB]
  Get:112 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble-updates/main amd64 libde265-0 amd64 1.0.15-1ubuntu0.2 [167 kB]
  Get:113 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libdecor-0-0 amd64 0.2.2-1build2 [16.5 kB]
  Get:114 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libgles2 amd64 1.7.0-1build1 [17.1 kB]
  Get:115 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libdirectfb-1.7-7t64 amd64 1.7.7-11.1ubuntu2 [1035 kB]
  ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh chromium webkit ran past its 1500s deadline on try 1 of 1
```

```text
(no log tail was uploaded for this source)
```
