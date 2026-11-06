# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42207489602
- Commit: `6e4d68d53a2af0bdceb25f8ccd8538edec031dac`
- Attempt: 1
- Written (UTC): 2026-11-06T11:29:23.528Z
- Passed: 1320 · Skipped: 206 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): shard 4, shard 8, shard 9, shard 10, shard 11, shard 12, shard 15, shard 16, repeat
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 5, shard 6, shard 7, shard 13, shard 14
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 19 results files read, 9 of 19 logs read).

## Backend start failure (INC-973)

The temporary backend never came up, so these sources have neither results nor a lane log: email, shard 1, shard 2, shard 3, shard 5, shard 6, shard 7, shard 13, shard 14. The start log's error lines, redacted, from `email` (one lane's lines stand for every lane that failed the same way):

```text
migration: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.280 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
Server record (DEC-340, stream):
172.18.0.1 2026-11-06 11:08:02.257 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.280 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 11:08:02.257 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 11:08:02.257 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(241 statement lines dropped)
```

## Server errors — census (DEC-083, non-gating)

Logs read: shard 4, shard 8, shard 9, shard 10, shard 11, shard 12, shard 15, shard 16, repeat · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 5, shard 6, shard 7, shard 13, shard 14

`smoke`, `email`, `shard 1`, `shard 2`, `shard 3`, `shard 5`, `shard 6`, `shard 7`, `shard 13`, `shard 14`: log unavailable.

58 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 3 | shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 3 | shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 3 | shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 3 | shard 4, shard 9, shard 12 |
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

Quiet (allowlisted): categories badHeader ×3 · categories wrongFile ×3 · definitions badHeader ×3 · definitions wrongFile ×3 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: shard 4, shard 8, shard 9, shard 10, shard 11, shard 12, shard 15, shard 16, repeat · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 5, shard 6, shard 7, shard 13, shard 14

`smoke`, `email`, `shard 1`, `shard 2`, `shard 3`, `shard 5`, `shard 6`, `shard 7`, `shard 13`, `shard 14`: log unavailable.

## Timing (DEC-087, non-gating)

Results read: shard 4, shard 8, shard 9, shard 10, shard 11, shard 12, shard 15, shard 16, repeat · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 5, shard 6, shard 7, shard 13, shard 14

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| shard 4 | 2026-11-06T11:07:28.803Z | 11.2 min |
| shard 8 | 2026-11-06T11:08:04.602Z | 7.8 min |
| shard 9 | 2026-11-06T11:07:35.864Z | 12.0 min |
| shard 10 | 2026-11-06T11:07:44.482Z | 15.0 min |
| shard 11 | 2026-11-06T11:17:45.166Z | 11.1 min |
| shard 12 | 2026-11-06T11:07:37.703Z | 10.5 min |
| shard 15 | 2026-11-06T11:08:00.150Z | 3.8 min |
| shard 16 | 2026-11-06T11:08:06.034Z | 7.8 min |
| repeat | 2026-11-06T11:09:11.031Z | 8.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 190 | 10.2 min | shard 10, repeat |
| `shell.spec.ts` | 234 | 9.2 min | shard 8, shard 16 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `import-security.spec.ts` | 36 | 4.4 min | shard 4, shard 12 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 8, shard 16 |
| `my-listings-ad.spec.ts` | 36 | 3.1 min | shard 4, shard 12 |
| `admin-attributes-library.spec.ts` | 21 | 2.5 min | shard 9 |
| `admin-locations.spec.ts` | 19 | 2.2 min | shard 10 |
| `admin-translations-console.spec.ts` | 22 | 2.2 min | shard 11 |
| `admin-roles.spec.ts` | 14 | 2.2 min | shard 10 |
| `admin-screening.spec.ts` | 27 | 2.0 min | shard 10 |
| `admin-categories-console.spec.ts` | 17 | 2.0 min | shard 9 |
| `admin-users.spec.ts` | 14 | 1.9 min | shard 11 |
| `admin-categories-lifecycle.spec.ts` | 26 | 1.8 min | shard 10 |
| `admin-attributes-links.spec.ts` | 17 | 1.8 min | shard 9 |
| `legal-admin.spec.ts` | 44 | 1.7 min | shard 4, shard 12 |
| `auth-signout.spec.ts` | 18 | 1.5 min | shard 11 |
| `admin-monetisation.spec.ts` | 17 | 1.5 min | shard 10 |
| `legal-certify.spec.ts` | 44 | 1.5 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 20 | 1.4 min | shard 4, shard 12 |
| `admin-attributes-editor.spec.ts` | 18 | 1.4 min | shard 9 |
| `ad-page.spec.ts` | 39 | 1.3 min | shard 9 |
| `admin-attributes-safety.spec.ts` | 9 | 1.2 min | shard 9 |
| `choice-lists.spec.ts` | 48 | 1.1 min | shard 11 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `admin-countries.spec.ts` | 9 | 1.1 min | shard 10 |
| `admin-translations-data.spec.ts` | 5 | 1.0 min | shard 11 |
| `admin-translations-governance.spec.ts` | 4 | 0.9 min | shard 11 |
| `dialogs.spec.ts` | 7 | 0.8 min | shard 11 |
| `admin-categories-home.spec.ts` | 5 | 0.8 min | shard 10 |
| `sage-bands.spec.ts` | 38 | 0.8 min | shard 15 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 8, shard 16 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 20 | 0.6 min | shard 9 |
| `admin-audit.spec.ts` | 7 | 0.6 min | shard 9 |
| `admin-shell.spec.ts` | 6 | 0.6 min | shard 11 |
| `sage-ad-page.spec.ts` | 9 | 0.6 min | shard 15 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `sage-tiers.spec.ts` | 20 | 0.6 min | shard 15 |
| `legal-doors.spec.ts` | 34 | 0.5 min | shard 4, shard 12 |
| `press.spec.ts` | 11 | 0.5 min | shard 15 |
| `admin-guides.spec.ts` | 7 | 0.5 min | shard 10 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 8, shard 16 |
| `sage-shell.spec.ts` | 40 | 0.4 min | shard 15 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `admin-categories-images.spec.ts` | 1 | 0.2 min | shard 10 |
| `sage-cards.spec.ts` | 14 | 0.2 min | shard 15 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 15 | 0.2 min | shard 9 |
| `auth-caller-gates.spec.ts` | 4 | 0.2 min | shard 11 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `primitives-law.spec.ts` | 12 | 0.2 min | shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `breadcrumbs.spec.ts` | 3 | 0.1 min | shard 11 |
| `admin-services.spec.ts` | 5 | 0.1 min | shard 10 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `category-nav.spec.ts` | 5 | 0.1 min | shard 11 |
| `feed-index.spec.ts` | 15 | 0.1 min | shard 11 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `rbac.spec.ts` | 3 | 0.1 min | shard 15 |
| `feed-route.spec.ts` | 11 | 0.1 min | shard 11 |
| `account-saved.spec.ts` | 2 | 0.1 min | shard 9 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `door-refusals.spec.ts` | 6 | 0.1 min | shard 11 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `category-image-routes.spec.ts` | 5 | 0.0 min | shard 11 |
| `seller-name-hidden.spec.ts` | 1 | 0.0 min | shard 15 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `dark-cards.spec.ts` | 2 | 0.0 min | shard 11 |
| `admin-ai-calls.spec.ts` | 1 | 0.0 min | shard 9 |
| `ad-page-layout.spec.ts` | 1 | 0.0 min | shard 9 |
| `rail-first-paint.spec.ts` | 2 | 0.0 min | shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 2 | 0.0 min | shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 47.1 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 46.4 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.0 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.6 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.9 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.9 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 31.1 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.2 s |

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42207489602-local-4
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42207489602-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42207489602-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 42207489602-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 42207489602-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42207489602-local-12
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42207489602-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42207489602-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 42207489602-local-repeat
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: email

No `[ssr-error]` lines in the `email` log (or no log was uploaded).

## Client errors: email

No `[client-error]` lines in the `email` log (or no log was uploaded).

## Server errors: shard 1

No `[ssr-error]` lines in the `shard 1` log (or no log was uploaded).

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: shard 7

No `[ssr-error]` lines in the `shard 7` log (or no log was uploaded).

## Client errors: shard 7

No `[client-error]` lines in the `shard 7` log (or no log was uploaded).

## Server errors: shard 13

No `[ssr-error]` lines in the `shard 13` log (or no log was uploaded).

## Client errors: shard 13

No `[client-error]` lines in the `shard 13` log (or no log was uploaded).

## Server errors: shard 14

No `[ssr-error]` lines in the `shard 14` log (or no log was uploaded).

## Client errors: shard 14

No `[client-error]` lines in the `shard 14` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 7: no results file

shard 7: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 13: no results file

shard 13: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 14: no results file

shard 14: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
