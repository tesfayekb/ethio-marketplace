# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43457682073
- Commit: `5e36f569f071600db18f229a1a0691e0c09949ab`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-e358dffe362e… (0 read)
- Repeat: nothing to repeat
- Written (UTC): 2026-11-13T16:10:24.844Z
- Passed: 2470 · Skipped: 336 · Failed: 2
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 1
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: webkit
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 19 results files read, 18 of 19 logs read).

## Backend start failure (INC-973)

The temporary backend never came up, so these sources have neither results nor a lane log: webkit. The start log's error lines, redacted, from `webkit` (one lane's lines stand for every lane that failed the same way):

```text
migration: Applying migration 20261028235443_3e3ea913-f01e-472e-a2dd-671adba96a2e.sql...
ERROR: M5b proof (2): the door after the import answered success (SQLSTATE P0001)
Server record (DEC-340, stream):
172.18.0.1 2026-11-13 16:00:00.002 UTC [274] postgres@postgres ERROR:  M5b proof (2): the door after the import answered success
172.18.0.1 2026-11-13 16:00:00.002 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 82 at RAISE
172.18.0.1 2026-11-13 16:00:00.002 UTC [274] postgres@postgres STATEMENT:  DO $proof$
(91 statement lines dropped)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: webkit

`webkit`: log unavailable.

63 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

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
| `gate fetch threw upstream ssr language gate timed out after <n>ms` | 1 | shard 11 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### gate fetch threw upstream ssr language gate timed out after <n>ms

- Count: 1 · Sources: shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): HS-5 the filters button counts and its chips clear ×1 · LGP-2 a scratch document's page: meta, contents, frozen facts, the site's langua ×1

```text
[WebServer] [ssr-error] /__root gate fetch threw upstream ssr language gate timed out after 1500ms
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: webkit

`webkit`: log unavailable.

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: webkit

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-13T16:00:18.527Z | 2.9 min |
| email | 2026-11-13T16:00:32.024Z | 0.3 min |
| shard 1 | 2026-11-13T16:01:12.810Z | 6.3 min |
| shard 2 | 2026-11-13T16:00:27.489Z | 5.9 min |
| shard 3 | 2026-11-13T16:00:34.322Z | 6.5 min |
| shard 4 | 2026-11-13T16:00:34.007Z | 6.8 min |
| shard 5 | 2026-11-13T16:00:37.880Z | 6.7 min |
| shard 6 | 2026-11-13T16:00:51.268Z | 6.9 min |
| shard 7 | 2026-11-13T16:00:01.427Z | 5.6 min |
| shard 8 | 2026-11-13T16:01:43.693Z | 6.3 min |
| shard 9 | 2026-11-13T16:00:48.329Z | 5.6 min |
| shard 10 | 2026-11-13T16:00:26.393Z | 7.0 min |
| shard 11 | 2026-11-13T16:00:54.784Z | 7.4 min |
| shard 12 | 2026-11-13T16:00:27.547Z | 8.0 min |
| shard 13 | 2026-11-13T16:00:32.450Z | 6.4 min |
| shard 14 | 2026-11-13T16:02:08.049Z | 7.0 min |
| shard 15 | 2026-11-13T16:00:49.137Z | 7.8 min |
| shard 16 | 2026-11-13T16:02:56.769Z | 6.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 11.0 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 6.0 min | shard 2 |
| `post-wizard-specs.spec.ts` | 82 | 6.0 min | shard 12 |
| `import-security.spec.ts` | 36 | 5.8 min | shard 4 |
| `admin-listings.spec.ts` | 76 | 5.5 min | shard 10 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.5 min | shard 3 |
| `admin-locations.spec.ts` | 38 | 5.4 min | shard 6 |
| `post-wizard-place.spec.ts` | 40 | 5.3 min | shard 11 |
| `admin-screening.spec.ts` | 54 | 5.2 min | shard 14 |
| `admin-translations-console.spec.ts` | 46 | 5.1 min | smoke, shard 8 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.9 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 4.8 min | shard 13 |
| `feed-screens.spec.ts` | 36 | 4.8 min | shard 5 |
| `post-wizard-where.spec.ts` | 32 | 4.8 min | shard 11 |
| `photo-pipeline.spec.ts` | 70 | 4.7 min | shard 16 |
| `admin-categories-console.spec.ts` | 34 | 4.7 min | shard 7 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `admin-users.spec.ts` | 28 | 4.4 min | shard 16 |
| `ad-page.spec.ts` | 82 | 4.2 min | shard 13 |
| `my-listings-ad.spec.ts` | 38 | 4.2 min | shard 12 |
| `admin-monetisation.spec.ts` | 34 | 4.2 min | shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 4.2 min | shard 14 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 15 |
| `admin-translations-governance.spec.ts` | 20 | 3.9 min | smoke, shard 16 |
| `post-wizard-pricing.spec.ts` | 52 | 3.6 min | shard 8 |
| `sage-bands.spec.ts` | 76 | 3.4 min | shard 6 |
| `post-wizard-category.spec.ts` | 48 | 3.3 min | shard 4 |
| `auth-signout.spec.ts` | 36 | 3.2 min | shard 9 |
| `choice-lists.spec.ts` | 96 | 2.9 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 2.7 min | shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 2.6 min | shard 3 |
| `admin-countries.spec.ts` | 18 | 2.6 min | shard 6 |
| `posting-routes.spec.ts` | 80 | 2.6 min | shard 2 |
| `legal-certify.spec.ts` | 44 | 2.4 min | shard 14 |
| `mfa-stepup.spec.ts` | 20 | 2.2 min | shard 15 |
| `admin-translations-data.spec.ts` | 10 | 2.2 min | shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 2.1 min | shard 8 |
| `legal-admin.spec.ts` | 44 | 2.0 min | shard 7 |
| `admin-categories-home.spec.ts` | 10 | 1.9 min | shard 4 |
| `dialogs.spec.ts` | 14 | 1.8 min | shard 10 |
| `phone-frame.spec.ts` | 18 | 1.6 min | shard 12 |
| `press.spec.ts` | 22 | 1.5 min | shard 12 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 9 |
| `my-listings-promote.spec.ts` | 10 | 1.4 min | shard 11 |
| `admin-guides.spec.ts` | 14 | 1.2 min | shard 3 |
| `user-guides.spec.ts` | 18 | 1.2 min | shard 13 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 3 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.2 min | shard 15 |
| `sage-ad-page.spec.ts` | 18 | 1.1 min | shard 11 |
| `sage-tiers.spec.ts` | 40 | 1.1 min | shard 2 |
| `admin-shell.spec.ts` | 12 | 1.1 min | shard 2 |
| `my-listings-page.spec.ts` | 18 | 1.1 min | shard 10 |
| `sage-shell.spec.ts` | 80 | 1.0 min | shard 16 |
| `admin-categories-images.spec.ts` | 4 | 0.9 min | smoke, shard 12 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 9 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 13 |
| `legal-doors.spec.ts` | 34 | 0.8 min | shard 8 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `ad-page-doors.spec.ts` | 30 | 0.7 min | shard 14 |
| `house-style.spec.ts` | 12 | 0.7 min | shard 11 |
| `supabase-door.spec.ts` | 12 | 0.7 min | shard 13 |
| `post-wizard-details.spec.ts` | 8 | 0.6 min | shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 5 |
| `my-listings-doors.spec.ts` | 28 | 0.6 min | shard 3 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 16 |
| `auth-caller-gates.spec.ts` | 8 | 0.5 min | shard 5 |
| `legal-pages.spec.ts` | 10 | 0.5 min | shard 11 |
| `admin-services.spec.ts` | 10 | 0.5 min | shard 1 |
| `i18n-coverage.spec.ts` | 14 | 0.4 min | shard 4 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `shell-bands.spec.ts` | 16 | 0.4 min | shard 12 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7 |
| `settings.spec.ts` | 9 | 0.4 min | shard 1 |
| `submenu.spec.ts` | 14 | 0.4 min | shard 15 |
| `page-head.spec.ts` | 4 | 0.4 min | shard 13 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 10 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 5 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `layout.spec.ts` | 10 | 0.3 min | shard 10 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 0.3 min | shard 15 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-governance.spec.ts` › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state | desktop-1280 | 72.2 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 50.7 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 49.4 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 42.3 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 39.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 32.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.1 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 31.6 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 31.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 31.2 s |
| `admin-monetisation.spec.ts` › MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given | mobile-360 | 31.0 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.8 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 43457682073-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43457682073-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43457682073-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 43457682073-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43457682073-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 43457682073-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 43457682073-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43457682073-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43457682073-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 3, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 43457682073-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 43457682073-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43457682073-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43457682073-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 43457682073-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 43457682073-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 43457682073-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 43457682073-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 43457682073-local-16
```

## admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state

- Class: **quarantined global-state** (INC-117, non-gating)

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: pseudo text never landed for admin.translations.title

expect(received).toBe(expected) // Object.is equality

Expected: "machine|true|true|true"
Received: "missing"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: pseudo text never landed for admin.translations.title

expect(received).toBe(expected) // Object.is equality

Expected: "machine|true|true|true"
Received: "missing"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

  1301 |       expect(baseValue, `[e2e:u4i] TR-30 probe key ${probe} has no EN source`).not.toBe("");
  1302 |
> 1303 |       await expect
       |       ^
  1304 |         .poll(
  1305 |           async () => {
  1306 |             const { data, error } = await adminClient()
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-governance.spec.ts:1303:7
```

Context:

```text
          - listitem [ref=e700]:
            - generic [ref=e701]: About
          - listitem [ref=e702]:
            - generic [ref=e703]: Contact
      - navigation "Help" [ref=e704]:
        - heading "Help" [level=2] [ref=e705]
        - list [ref=e706]:
          - listitem [ref=e707]:
            - generic [ref=e708]: Safety
      - navigation "Legal" [ref=e709]:
        - heading "Legal" [level=2] [ref=e710]
        - list [ref=e711]:
          - listitem [ref=e712]:
            - link "Terms" [ref=e713] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e714]:
            - link "Privacy" [ref=e715] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e717]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › ATR-1 Premium from the console: the badge, the preview's look, the History line, the row, one audit row, the feed's rank; then Regular again

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
-   2,
+   3,
  ]
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
-   2,
+   3,
  ]

  2247 |       tier_source: "staff",
  2248 |     });
> 2249 |     expect(await feedRanks(ad.id)).toEqual([2]);
       |                                    ^
  2250 |     // No seller notice (ruling 1, answer 5).
  2251 |     expect(await noticeRows(ad.id)).toHaveLength(0);
  2252 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2249:36
```

Context:

```text
          - listitem [ref=e394]:
            - generic [ref=e395]: About
          - listitem [ref=e396]:
            - generic [ref=e397]: Contact
      - navigation "Help" [ref=e398]:
        - heading "Help" [level=2] [ref=e399]
        - list [ref=e400]:
          - listitem [ref=e401]:
            - generic [ref=e402]: Safety
      - navigation "Legal" [ref=e403]:
        - heading "Legal" [level=2] [ref=e404]
        - list [ref=e405]:
          - listitem [ref=e406]:
            - link "Terms" [ref=e407] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e408]:
            - link "Privacy" [ref=e409] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e411]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: webkit

No `[ssr-error]` lines in the `webkit` log (or no log was uploaded).

## Client errors: webkit

No `[client-error]` lines in the `webkit` log (or no log was uploaded).

## Server errors: shard 10

No `[ssr-error]` lines in the `shard 10` log (or no log was uploaded).

## Client errors: shard 10

No `[client-error]` lines in the `shard 10` log (or no log was uploaded).

## webkit: no results file

webkit: no results file — the process failed outside test results (setup/teardown/preflight).

- Failed step: `backend` (outcome failure) — ::add-mask::[masked]

```text
start failed in 20261028235443_3e3ea913-f01e-472e-a2dd-671adba96a2e stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
```

```text
(no log tail was uploaded for this source)
```
