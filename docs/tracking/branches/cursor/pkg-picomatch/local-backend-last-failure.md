# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44280551332
- Commit: `5ce698ebe11cda26be91b8ac74ed67529418e6c1`
- Attempt: 1
- Repeat: 0 of 52 tests repeated — specs directly changed 0/1, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-18T10:24:42.257Z
- Passed: 2476 · Skipped: 388 · Failed: 0
- Gating failures: 0 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: webkit (INFRA: install-chromium-s-system-libraries)
- Infrastructure: 1 lane(s) died before any test at install-chromium-s-system-libraries — ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh webkit ran past its 1500s deadline on try 1 of 1
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
| smoke | 2026-11-18T10:05:31.418Z | 3.5 min |
| email | 2026-11-18T09:59:49.994Z | 0.4 min |
| shard 1 | 2026-11-18T10:01:32.283Z | 6.1 min |
| shard 2 | 2026-11-18T09:59:52.270Z | 6.2 min |
| shard 3 | 2026-11-18T09:59:35.356Z | 6.7 min |
| shard 4 | 2026-11-18T10:03:08.293Z | 5.3 min |
| shard 5 | 2026-11-18T10:02:10.844Z | 6.0 min |
| shard 6 | 2026-11-18T10:04:22.185Z | 5.7 min |
| shard 7 | 2026-11-18T10:00:09.904Z | 7.3 min |
| shard 8 | 2026-11-18T10:03:03.451Z | 5.6 min |
| shard 9 | 2026-11-18T10:03:00.165Z | 5.5 min |
| shard 10 | 2026-11-18T10:00:18.113Z | 6.7 min |
| shard 11 | 2026-11-18T10:00:51.218Z | 6.9 min |
| shard 12 | 2026-11-18T10:00:07.753Z | 8.0 min |
| shard 13 | 2026-11-18T09:59:39.674Z | 5.4 min |
| shard 14 | 2026-11-18T10:00:51.378Z | 6.0 min |
| shard 15 | 2026-11-18T10:02:52.316Z | 6.7 min |
| shard 16 | 2026-11-18T10:04:27.674Z | 5.3 min |
| repeat | 2026-11-18T09:57:07.729Z | 0.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.4 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 6.2 min | shard 2 |
| `admin-listings.spec.ts` | 76 | 6.0 min | shard 10 |
| `post-wizard-specs.spec.ts` | 82 | 5.9 min | shard 12 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.7 min | shard 3 |
| `admin-categories-console.spec.ts` | 34 | 5.6 min | shard 7 |
| `post-wizard-place.spec.ts` | 40 | 5.1 min | shard 11 |
| `admin-translations-console.spec.ts` | 46 | 4.7 min | smoke, shard 8 |
| `admin-locations.spec.ts` | 38 | 4.7 min | shard 6 |
| `import-security.spec.ts` | 36 | 4.7 min | shard 4 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 5 |
| `admin-screening.spec.ts` | 54 | 4.6 min | shard 14 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `admin-attributes-links.spec.ts` | 34 | 4.3 min | shard 13 |
| `post-wizard-where.spec.ts` | 32 | 4.2 min | shard 11 |
| `my-listings-ad.spec.ts` | 38 | 4.2 min | shard 12 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 15 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.9 min | shard 15 |
| `choice-lists.spec.ts` | 96 | 3.8 min | shard 7 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 3.6 min | shard 14 |
| `admin-monetisation.spec.ts` | 34 | 3.6 min | smoke, shard 10 |
| `photo-pipeline.spec.ts` | 70 | 3.4 min | shard 16 |
| `ad-page.spec.ts` | 134 | 3.4 min | shard 13, repeat |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 8 |
| `admin-translations-governance.spec.ts` | 20 | 3.0 min | smoke, shard 16 |
| `post-wizard-resets.spec.ts` | 34 | 2.8 min | shard 3 |
| `legal-admin.spec.ts` | 44 | 2.8 min | shard 7 |
| `posting-routes.spec.ts` | 80 | 2.7 min | shard 2 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `post-wizard-category.spec.ts` | 48 | 2.3 min | shard 4 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `dialogs.spec.ts` | 16 | 2.0 min | shard 10 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 5 |
| `legal-certify.spec.ts` | 44 | 1.9 min | shard 14 |
| `mfa-stepup.spec.ts` | 20 | 1.8 min | shard 15 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 8 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 4 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `phone-frame.spec.ts` | 18 | 1.6 min | shard 12 |
| `press.spec.ts` | 22 | 1.5 min | shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `admin-guides.spec.ts` | 14 | 1.2 min | shard 3 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 3 |
| `sage-ad-page.spec.ts` | 18 | 1.2 min | shard 11 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2 |
| `sage-tiers.spec.ts` | 40 | 1.2 min | shard 2 |
| `my-listings-page.spec.ts` | 18 | 1.1 min | shard 10 |
| `user-guides.spec.ts` | 18 | 1.0 min | shard 13 |
| `admin-categories-images.spec.ts` | 4 | 0.9 min | smoke, shard 12 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | smoke, shard 9 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.9 min | shard 15 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.8 min | shard 7 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `house-style.spec.ts` | 12 | 0.6 min | shard 11 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 4 |
| `ad-page-doors.spec.ts` | 30 | 0.6 min | shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.6 min | shard 3 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `sage-cards.spec.ts` | 28 | 0.6 min | shard 7 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `shell-bands.spec.ts` | 16 | 0.4 min | shard 12 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 11 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 10 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `layout.spec.ts` | 10 | 0.3 min | shard 10 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `door-refusals.spec.ts` | 12 | 0.2 min | shard 7 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
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
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | desktop-1280 | 45.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.3 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.7 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 35.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.4 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 33.1 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.8 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.3 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 29.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 44280551332-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44280551332-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44280551332-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 44280551332-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44280551332-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 44280551332-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 44280551332-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44280551332-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44280551332-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 44280551332-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 44280551332-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44280551332-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44280551332-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44280551332-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44280551332-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 44280551332-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 44280551332-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 44280551332-local-16
```

## Server errors: webkit

No `[ssr-error]` lines in the `webkit` log (or no log was uploaded).

## Client errors: webkit

No `[client-error]` lines in the `webkit` log (or no log was uploaded).

## webkit: no results file

webkit: no results file — the process failed outside test results (setup/teardown/preflight).

- Class: **infrastructure** (INC-1101) — died before any test at `install-chromium-s-system-libraries`; re-run the failed jobs, never a code finding
- Failed step: `install-chromium-s-system-libraries` (outcome failure) — ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh webkit ran past its 1500s deadline on try 1 of 1

```text
Step install-chromium-s-system-libraries: outcome failure
  Get:161 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libopenni2-0 amd64 2.2.0.33+dfsg-18 [370 kB]
  Get:162 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libqrencode4 amd64 4.1.1-1build2 [25.0 kB]
  Get:163 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libsecret-common all 0.21.4-1build3 [4962 B]
  Get:164 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libsecret-1-0 amd64 0.21.4-1build3 [116 kB]
  Get:165 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libsndio7.0 amd64 1.9.0-0.3build3 [29.6 kB]
  Get:166 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libsoundtouch1 amd64 2.3.2+ds1-1build1 [60.5 kB]
  Get:167 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libspandsp2t64 amd64 0.0.6+dfsg-2.1build1 [311 kB]
  Get:168 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libsrtp2-1 amd64 2.5.0-3build1 [41.9 kB]
  Get:169 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libwayland-server0 amd64 1.22.0-2.1build1 [33.9 kB]
  Get:170 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libwildmidi2 amd64 0.4.3-1build3 [68.5 kB]
  Get:171 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libwoff1 amd64 1.0.2-2build1 [45.3 kB]
  Get:172 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libxcb-xkb1 amd64 1.15-1ubuntu2 [32.3 kB]
  Get:173 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 libxkbcommon-x11-0 amd64 1.6.0-1build1 [14.5 kB]
  Get:174 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libzbar0t64 amd64 0.23.93-4build3 [123 kB]
  Get:175 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 libzxing3 amd64 2.2.1-3 [583 kB]
  Get:176 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 xfonts-encodings all 1:1.0.5-0ubuntu2 [578 kB]
  Get:177 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 xfonts-utils amd64 1:7.7+6build3 [94.4 kB]
  Get:178 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/universe amd64 xfonts-cyrillic all 1:1.0.5+nmu1 [384 kB]
  Get:179 http://us-east-2.ec2.archive.ubuntu.com/ubuntu noble/main amd64 xfonts-scalable all 1:1.0.3-1.3 [304 kB]
  ::error title=ci-deadline::bash scripts/ci/install-browser-deps.sh webkit ran past its 1500s deadline on try 1 of 1
```

```text
(no log tail was uploaded for this source)
```
