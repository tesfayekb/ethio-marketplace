# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44309748223
- Commit: `4cd29db8039d29d1973b14212597135ad298f304`
- Attempt: 1
- Repeat: 29 of 97 tests repeated — specs directly changed 2/4, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-18T13:22:08.019Z
- Passed: 2592 · Skipped: 336 · Failed: 0
- Gating failures: 0 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: webkit
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 20 results files read, 19 of 20 logs read).

## Backend start failure (INC-973)

The temporary backend never came up, so these sources have neither results nor a lane log: webkit. The start log's error lines, redacted, from `webkit` (one lane's lines stand for every lane that failed the same way):

```text
migration: Applying migration 20261118012400_64aca671-da4e-4957-9b60-d2507bbdec58.sql...
ERROR: F1-6a part 4 proof (d): a country enforcer's edit of its country's ad answered {"ok": false, "refusals": [{"field": "title", "reason": "contactInText"}]} (SQLSTATE P0001)
Server record (DEC-340, stream):
172.18.0.1 2026-11-18 13:05:24.636 UTC [274] postgres@postgres ERROR:  F1-6a part 4 proof (d): a country enforcer's edit of its country's ad answered {"ok": false, "refusals": [{"field": "title", "reason": "contactInText"}]}
172.18.0.1 2026-11-18 13:05:24.636 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 232 at RAISE
172.18.0.1 2026-11-18 13:05:24.636 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 3. PROOFS
(279 statement lines dropped)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: webkit

`webkit`: log unavailable.

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

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: webkit

`webkit`: log unavailable.

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: webkit

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-18T13:10:51.177Z | 3.4 min |
| email | 2026-11-18T13:06:25.347Z | 0.3 min |
| shard 1 | 2026-11-18T13:15:11.564Z | 5.5 min |
| shard 2 | 2026-11-18T13:07:01.227Z | 6.6 min |
| shard 3 | 2026-11-18T13:11:53.258Z | 5.5 min |
| shard 4 | 2026-11-18T13:08:03.807Z | 7.1 min |
| shard 5 | 2026-11-18T13:06:48.995Z | 6.2 min |
| shard 6 | 2026-11-18T13:06:54.354Z | 6.6 min |
| shard 7 | 2026-11-18T13:07:21.710Z | 5.1 min |
| shard 8 | 2026-11-18T13:08:24.383Z | 5.7 min |
| shard 9 | 2026-11-18T13:10:27.548Z | 6.6 min |
| shard 10 | 2026-11-18T13:15:23.538Z | 4.9 min |
| shard 11 | 2026-11-18T13:07:38.808Z | 7.2 min |
| shard 12 | 2026-11-18T13:06:57.906Z | 7.9 min |
| shard 13 | 2026-11-18T13:09:06.234Z | 6.6 min |
| shard 14 | 2026-11-18T13:06:45.266Z | 6.1 min |
| shard 15 | 2026-11-18T13:06:32.166Z | 6.1 min |
| shard 16 | 2026-11-18T13:16:27.288Z | 5.3 min |
| repeat | 2026-11-18T13:06:59.799Z | 2.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.5 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 6.5 min | shard 2 |
| `import-security.spec.ts` | 36 | 6.4 min | shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 5.9 min | shard 12 |
| `post-wizard-place.spec.ts` | 40 | 5.2 min | shard 11 |
| `admin-locations.spec.ts` | 38 | 5.2 min | shard 6 |
| `admin-roles.spec.ts` | 28 | 5.1 min | shard 9 |
| `admin-attributes-links.spec.ts` | 34 | 5.0 min | shard 13 |
| `admin-translations-console.spec.ts` | 46 | 4.8 min | smoke, shard 8 |
| `admin-screening.spec.ts` | 54 | 4.8 min | shard 14 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 5 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.6 min | shard 3 |
| `ad-page.spec.ts` | 82 | 4.3 min | shard 13 |
| `post-wizard-where.spec.ts` | 32 | 4.3 min | shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.3 min | shard 7 |
| `my-listings-ad.spec.ts` | 38 | 4.2 min | shard 12 |
| `admin-listings.spec.ts` | 76 | 4.2 min | shard 10 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 16 |
| `admin-attributes-editor.spec.ts` | 36 | 3.6 min | shard 14 |
| `auth-signout.spec.ts` | 36 | 3.6 min | shard 9 |
| `photo-pipeline.spec.ts` | 70 | 3.4 min | shard 16 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 15 |
| `post-wizard-pricing.spec.ts` | 52 | 3.2 min | shard 8 |
| `post-wizard-category.spec.ts` | 48 | 3.1 min | shard 4 |
| `sage-bands.spec.ts` | 76 | 3.0 min | shard 6 |
| `admin-monetisation.spec.ts` | 34 | 2.9 min | smoke, shard 10 |
| `posting-routes.spec.ts` | 80 | 2.9 min | shard 2 |
| `admin-translations-governance.spec.ts` | 20 | 2.9 min | smoke, shard 16 |
| `choice-lists.spec.ts` | 96 | 2.5 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 3 |
| `admin-countries.spec.ts` | 18 | 2.4 min | shard 6 |
| `admin-audit.spec.ts` | 16 | 2.1 min | shard 9 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `admin-categories-home.spec.ts` | 10 | 1.9 min | shard 4 |
| `legal-certify.spec.ts` | 44 | 1.9 min | shard 14 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 7 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 8 |
| `ad-page-doors.spec.ts` | 90 | 1.6 min | shard 14, repeat |
| `dialogs.spec.ts` | 16 | 1.5 min | shard 10 |
| `mfa-stepup.spec.ts` | 20 | 1.5 min | shard 15 |
| `press.spec.ts` | 22 | 1.5 min | shard 12 |
| `phone-frame.spec.ts` | 18 | 1.5 min | shard 12 |
| `my-listings-doors.spec.ts` | 84 | 1.5 min | shard 3, repeat |
| `my-listings-promote.spec.ts` | 10 | 1.5 min | shard 11 |
| `sage-tiers.spec.ts` | 40 | 1.3 min | shard 2 |
| `admin-shell.spec.ts` | 12 | 1.3 min | shard 2 |
| `user-guides.spec.ts` | 18 | 1.2 min | shard 13 |
| `sage-ad-page.spec.ts` | 18 | 1.2 min | shard 11 |
| `name-check-queue.spec.ts` | 8 | 1.1 min | smoke, shard 9 |
| `one-line-slots-admin.spec.ts` | 10 | 1.0 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.0 min | shard 3 |
| `admin-categories-images.spec.ts` | 4 | 0.9 min | smoke, shard 12 |
| `my-listings-levels.spec.ts` | 28 | 0.9 min | shard 4 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `my-listings-page.spec.ts` | 18 | 0.8 min | shard 10 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `house-style.spec.ts` | 12 | 0.7 min | shard 11 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `supabase-door.spec.ts` | 12 | 0.7 min | shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6 |
| `legal-doors.spec.ts` | 34 | 0.6 min | smoke, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 0.5 min | shard 9 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `shell-bands.spec.ts` | 16 | 0.4 min | shard 12 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 11 |
| `page-head.spec.ts` | 4 | 0.4 min | shard 13 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `account-saved.spec.ts` | 4 | 0.3 min | shard 4 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `layout.spec.ts` | 10 | 0.2 min | shard 10 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 9 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 53.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 51.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 50.8 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 35.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.1 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 32.0 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 31.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 31.1 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.1 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.1 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.1 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 29.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 44309748223-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44309748223-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44309748223-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 44309748223-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44309748223-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 44309748223-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 44309748223-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44309748223-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44309748223-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 44309748223-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 44309748223-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44309748223-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44309748223-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44309748223-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44309748223-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 44309748223-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 44309748223-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 44309748223-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 2, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 18 user(s) owned by process 44309748223-local-repeat
```

## Server errors: webkit

No `[ssr-error]` lines in the `webkit` log (or no log was uploaded).

## Client errors: webkit

No `[client-error]` lines in the `webkit` log (or no log was uploaded).

## webkit: no results file

webkit: no results file — the process failed outside test results (setup/teardown/preflight).

- Failed step: `backend` (outcome failure) — ::add-mask::[masked]

```text
start failed in 20261118012400_64aca671-da4e-4957-9b60-d2507bbdec58 stmt 7; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
```

```text
(no log tail was uploaded for this source)
```
