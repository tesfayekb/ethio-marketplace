# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42213335985
- Commit: `b272311966cbb029fd0aada850ef90c2aeeceb1b`
- Attempt: 1
- Written (UTC): 2026-11-06T12:19:13.752Z
- Passed: 1341 · Skipped: 168 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): shard 2, shard 4, shard 5, shard 7, shard 10, shard 11, shard 13, shard 16, repeat
- Sources without results: smoke, email, shard 1, shard 3, shard 6, shard 8, shard 9, shard 12, shard 14, shard 15
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 19 results files read, 9 of 19 logs read).

## Backend start failure (INC-973)

The temporary backend never came up, so these sources have neither results nor a lane log: email, shard 1, shard 3, shard 6, shard 8, shard 9, shard 12, shard 14, shard 15. The start log's error lines, redacted, from `email` (one lane's lines stand for every lane that failed the same way):

```text
migration: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.275 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
Server record (DEC-340, stream):
172.18.0.1 2026-11-06 11:54:38.098 UTC [275] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.275 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 11:54:38.098 UTC [275] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 11:54:38.098 UTC [275] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(241 statement lines dropped)
```

## Server errors — census (DEC-083, non-gating)

Logs read: shard 2, shard 4, shard 5, shard 7, shard 10, shard 11, shard 13, shard 16, repeat · unavailable: smoke, email, shard 1, shard 3, shard 6, shard 8, shard 9, shard 12, shard 14, shard 15

`smoke`, `email`, `shard 1`, `shard 3`, `shard 6`, `shard 8`, `shard 9`, `shard 12`, `shard 14`, `shard 15`: log unavailable.

31 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 3 | shard 2, shard 4, shard 10 |
| `categories wrongFile` (quiet) | 3 | shard 2, shard 4, shard 10 |
| `categories file too large` (quiet) | 1 | shard 4 |
| `categories nulByte` (quiet) | 1 | shard 4 |
| `categories unknownColumn` (quiet) | 1 | shard 4 |
| `countries badHeader` (quiet) | 1 | shard 4 |
| `countries nulByte` (quiet) | 1 | shard 4 |
| `countries tooManyRows` (quiet) | 1 | shard 4 |
| `countries unknownColumn` (quiet) | 1 | shard 4 |
| `countries wrongFile` (quiet) | 1 | shard 4 |
| `definitions badHeader` (quiet) | 1 | shard 4 |
| `definitions nulByte` (quiet) | 1 | shard 4 |
| `definitions tooManyRows` (quiet) | 1 | shard 4 |
| `definitions unknownColumn` (quiet) | 1 | shard 4 |
| `definitions wrongFile` (quiet) | 1 | shard 4 |
| `links unknownColumn` (quiet) | 1 | shard 4 |
| `locations badHeader` (quiet) | 1 | shard 4 |
| `locations file too large` (quiet) | 1 | shard 4 |
| `locations nulByte` (quiet) | 1 | shard 4 |
| `locations unknownColumn` (quiet) | 1 | shard 4 |
| `locations wrongFile` (quiet) | 1 | shard 4 |
| `strings badHeader` (quiet) | 1 | shard 4 |
| `strings emptyFile` (quiet) | 1 | shard 4 |
| `strings nulByte` (quiet) | 1 | shard 4 |
| `strings tooManyRows` (quiet) | 1 | shard 4 |
| `strings unknownColumn` (quiet) | 1 | shard 4 |
| `strings wrongFile` (quiet) | 1 | shard 4 |

Quiet (allowlisted): categories badHeader ×3 · categories wrongFile ×3 · categories file too large ×1 · categories nulByte ×1 · categories unknownColumn ×1 · countries badHeader ×1 · countries nulByte ×1 · countries tooManyRows ×1 · countries unknownColumn ×1 · countries wrongFile ×1 · definitions badHeader ×1 · definitions nulByte ×1 · definitions tooManyRows ×1 · definitions unknownColumn ×1 · definitions wrongFile ×1 · links unknownColumn ×1 · locations badHeader ×1 · locations file too large ×1 · locations nulByte ×1 · locations unknownColumn ×1 · locations wrongFile ×1 · strings badHeader ×1 · strings emptyFile ×1 · strings nulByte ×1 · strings tooManyRows ×1 · strings unknownColumn ×1 · strings wrongFile ×1

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: shard 2, shard 4, shard 5, shard 7, shard 10, shard 11, shard 13, shard 16, repeat · unavailable: smoke, email, shard 1, shard 3, shard 6, shard 8, shard 9, shard 12, shard 14, shard 15

`smoke`, `email`, `shard 1`, `shard 3`, `shard 6`, `shard 8`, `shard 9`, `shard 12`, `shard 14`, `shard 15`: log unavailable.

## Timing (DEC-087, non-gating)

Results read: shard 2, shard 4, shard 5, shard 7, shard 10, shard 11, shard 13, shard 16, repeat · unavailable: smoke, email, shard 1, shard 3, shard 6, shard 8, shard 9, shard 12, shard 14, shard 15

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| shard 2 | 2026-11-06T11:54:38.173Z | 16.0 min |
| shard 4 | 2026-11-06T11:56:30.623Z | 11.2 min |
| shard 5 | 2026-11-06T12:09:53.050Z | 7.8 min |
| shard 7 | 2026-11-06T11:54:33.071Z | 3.4 min |
| shard 10 | 2026-11-06T12:04:01.759Z | 14.7 min |
| shard 11 | 2026-11-06T11:55:03.259Z | 11.0 min |
| shard 13 | 2026-11-06T11:57:36.524Z | 8.0 min |
| shard 16 | 2026-11-06T12:04:54.561Z | 7.8 min |
| repeat | 2026-11-06T12:05:17.811Z | 7.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 228 | 12.0 min | shard 2, shard 10, repeat |
| `post-wizard-bundle2.spec.ts` | 70 | 4.7 min | shard 5, shard 13 |
| `admin-locations.spec.ts` | 38 | 4.4 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 28 | 4.3 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.3 min | shard 2, shard 11 |
| `shell.spec.ts` | 117 | 4.2 min | shard 16 |
| `admin-screening.spec.ts` | 54 | 3.9 min | shard 2, shard 10 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.3 min | shard 2, shard 10 |
| `admin-monetisation.spec.ts` | 34 | 3.3 min | shard 2, shard 10 |
| `photo-pipeline.spec.ts` | 68 | 3.1 min | shard 5, shard 13 |
| `feed-screens.spec.ts` | 18 | 2.4 min | shard 4 |
| `post-wizard-category.spec.ts` | 48 | 2.2 min | shard 5, shard 13 |
| `import-security.spec.ts` | 18 | 2.1 min | shard 4 |
| `admin-countries.spec.ts` | 18 | 2.1 min | shard 2, shard 10 |
| `viewing-place.spec.ts` | 11 | 1.9 min | shard 16 |
| `admin-users.spec.ts` | 14 | 1.9 min | shard 11 |
| `my-listings-ad.spec.ts` | 18 | 1.7 min | shard 4 |
| `sage-bands.spec.ts` | 38 | 1.5 min | shard 7 |
| `auth-signout.spec.ts` | 18 | 1.5 min | shard 11 |
| `choice-lists.spec.ts` | 48 | 1.2 min | shard 11 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 5, shard 13 |
| `admin-translations-data.spec.ts` | 5 | 1.0 min | shard 11 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2, shard 11 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 5, shard 13 |
| `admin-translations-governance.spec.ts` | 4 | 0.9 min | shard 11 |
| `legal-admin.spec.ts` | 22 | 0.9 min | shard 4 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `admin-guides.spec.ts` | 14 | 0.9 min | shard 2, shard 10 |
| `dialogs.spec.ts` | 7 | 0.8 min | shard 11 |
| `admin-categories-home.spec.ts` | 5 | 0.8 min | shard 10 |
| `legal-certify.spec.ts` | 22 | 0.7 min | shard 4 |
| `mfa-stepup.spec.ts` | 10 | 0.7 min | shard 4 |
| `my-listings-page.spec.ts` | 16 | 0.7 min | shard 5, shard 13 |
| `my-listings-levels.spec.ts` | 26 | 0.6 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 4 | 0.5 min | shard 4 |
| `press.spec.ts` | 11 | 0.5 min | shard 7 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `user-guides.spec.ts` | 9 | 0.4 min | shard 16 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 5, shard 13 |
| `i18n-sign-in-language.spec.ts` | 6 | 0.4 min | shard 4 |
| `i18n-bundle.spec.ts` | 3 | 0.3 min | shard 4 |
| `legal-doors.spec.ts` | 17 | 0.3 min | shard 4 |
| `sage-ad-page.spec.ts` | 9 | 0.3 min | shard 7 |
| `submenu.spec.ts` | 7 | 0.2 min | shard 16 |
| `sage-tiers.spec.ts` | 20 | 0.2 min | shard 7 |
| `supabase-door.spec.ts` | 6 | 0.2 min | shard 16 |
| `sage-shell.spec.ts` | 40 | 0.2 min | shard 7 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 2, shard 10 |
| `settings.spec.ts` | 9 | 0.2 min | shard 7 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `house-style.spec.ts` | 6 | 0.2 min | shard 4 |
| `auth-caller-gates.spec.ts` | 4 | 0.2 min | shard 11 |
| `legal-accept.spec.ts` | 6 | 0.2 min | shard 4 |
| `menu-rows.spec.ts` | 3 | 0.2 min | shard 16 |
| `submenu-look.spec.ts` | 6 | 0.2 min | shard 16 |
| `breadcrumbs.spec.ts` | 3 | 0.1 min | shard 11 |
| `overlays.spec.ts` | 8 | 0.1 min | shard 5, shard 13 |
| `primitives-law.spec.ts` | 12 | 0.1 min | shard 7 |
| `sage-cards.spec.ts` | 14 | 0.1 min | shard 7 |
| `i18n-coverage.spec.ts` | 7 | 0.1 min | shard 4 |
| `legal-pages.spec.ts` | 5 | 0.1 min | shard 4 |
| `legal-history.spec.ts` | 3 | 0.1 min | shard 4 |
| `layout.spec.ts` | 5 | 0.1 min | shard 4 |
| `category-nav.spec.ts` | 5 | 0.1 min | shard 11 |
| `feed-index.spec.ts` | 15 | 0.1 min | shard 11 |
| `feed-route.spec.ts` | 11 | 0.1 min | shard 11 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `submenu-touch.spec.ts` | 4 | 0.1 min | shard 16 |
| `rbac.spec.ts` | 3 | 0.1 min | shard 7 |
| `door-refusals.spec.ts` | 6 | 0.1 min | shard 11 |
| `smoke-auth-i18n.spec.ts` | 1 | 0.1 min | shard 16 |
| `overlay-shift.spec.ts` | 3 | 0.1 min | shard 16 |
| `shell-table-law.spec.ts` | 1 | 0.0 min | shard 16 |
| `i18n-layers.spec.ts` | 3 | 0.0 min | shard 4 |
| `category-image-routes.spec.ts` | 5 | 0.0 min | shard 11 |
| `dark-cards.spec.ts` | 2 | 0.0 min | shard 11 |
| `locale-format.spec.ts` | 1 | 0.0 min | shard 4 |
| `seller-name-hidden.spec.ts` | 1 | 0.0 min | shard 7 |
| `fonts.spec.ts` | 1 | 0.0 min | shard 4 |
| `rail-first-paint.spec.ts` | 2 | 0.0 min | shard 7 |
| `geo.spec.ts` | 5 | 0.0 min | shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 42.2 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 38.8 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 37.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.3 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.3 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 28.7 s |
| `auth-signout.spec.ts` › SO-11 a sign-out whose server cannot be reached still ends the session on this device (DEC-268) | desktop-1280 | 28.0 s |
| `admin-monetisation.spec.ts` › MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given | mobile-360 | 27.7 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 26.7 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 25.7 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 23.7 s |

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 42213335985-local-2
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42213335985-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42213335985-local-5
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42213335985-local-7
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 42213335985-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 42213335985-local-11
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42213335985-local-13
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42213335985-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 42213335985-local-repeat
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

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: shard 8

No `[ssr-error]` lines in the `shard 8` log (or no log was uploaded).

## Client errors: shard 8

No `[client-error]` lines in the `shard 8` log (or no log was uploaded).

## Server errors: shard 9

No `[ssr-error]` lines in the `shard 9` log (or no log was uploaded).

## Client errors: shard 9

No `[client-error]` lines in the `shard 9` log (or no log was uploaded).

## Server errors: shard 12

No `[ssr-error]` lines in the `shard 12` log (or no log was uploaded).

## Client errors: shard 12

No `[client-error]` lines in the `shard 12` log (or no log was uploaded).

## Server errors: shard 14

No `[ssr-error]` lines in the `shard 14` log (or no log was uploaded).

## Client errors: shard 14

No `[client-error]` lines in the `shard 14` log (or no log was uploaded).

## Server errors: shard 15

No `[ssr-error]` lines in the `shard 15` log (or no log was uploaded).

## Client errors: shard 15

No `[client-error]` lines in the `shard 15` log (or no log was uploaded).

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

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 8: no results file

shard 8: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 9: no results file

shard 9: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 12: no results file

shard 12: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 14: no results file

shard 14: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 15: no results file

shard 15: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
