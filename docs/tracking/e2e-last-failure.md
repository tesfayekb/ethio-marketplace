# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42236422436
- Commit: `695554dd1f72248272daed52c134a926df0c2104`
- Attempt: 1
- Written (UTC): 2026-11-06T15:06:49.539Z
- Passed: 1123 · Skipped: 209 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email, shard 1, shard 4, shard 5, shard 7, shard 8, shard 9, shard 15, repeat
- Sources without results: smoke, shard 2, shard 3, shard 6, shard 10, shard 11, shard 12, shard 13, shard 14, shard 16
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 19 results files read, 9 of 19 logs read).

## Backend start failure (INC-973)

The temporary backend never came up, so these sources have neither results nor a lane log: smoke, shard 2, shard 3, shard 6, shard 10, shard 11, shard 12, shard 13, shard 14, shard 16. The start log's error lines, redacted, from `smoke` (one lane's lines stand for every lane that failed the same way):

```text
migration: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.274 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
Server record (DEC-340, stream):
172.18.0.1 2026-11-06 14:46:09.137 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.274 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:46:09.137 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:46:09.137 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(241 statement lines dropped)
```

## Server errors — census (DEC-083, non-gating)

Logs read: email, shard 1, shard 4, shard 5, shard 7, shard 8, shard 9, shard 15, repeat · unavailable: smoke, shard 2, shard 3, shard 6, shard 10, shard 11, shard 12, shard 13, shard 14, shard 16

`smoke`, `shard 2`, `shard 3`, `shard 6`, `shard 10`, `shard 11`, `shard 12`, `shard 13`, `shard 14`, `shard 16`: log unavailable.

31 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `definitions badHeader` (quiet) | 3 | shard 1, shard 4, shard 9 |
| `definitions wrongFile` (quiet) | 3 | shard 1, shard 4, shard 9 |
| `categories badHeader` (quiet) | 1 | shard 4 |
| `categories file too large` (quiet) | 1 | shard 4 |
| `categories nulByte` (quiet) | 1 | shard 4 |
| `categories unknownColumn` (quiet) | 1 | shard 4 |
| `categories wrongFile` (quiet) | 1 | shard 4 |
| `countries badHeader` (quiet) | 1 | shard 4 |
| `countries nulByte` (quiet) | 1 | shard 4 |
| `countries tooManyRows` (quiet) | 1 | shard 4 |
| `countries unknownColumn` (quiet) | 1 | shard 4 |
| `countries wrongFile` (quiet) | 1 | shard 4 |
| `definitions nulByte` (quiet) | 1 | shard 4 |
| `definitions tooManyRows` (quiet) | 1 | shard 4 |
| `definitions unknownColumn` (quiet) | 1 | shard 4 |
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

Quiet (allowlisted): definitions badHeader ×3 · definitions wrongFile ×3 · categories badHeader ×1 · categories file too large ×1 · categories nulByte ×1 · categories unknownColumn ×1 · categories wrongFile ×1 · countries badHeader ×1 · countries nulByte ×1 · countries tooManyRows ×1 · countries unknownColumn ×1 · countries wrongFile ×1 · definitions nulByte ×1 · definitions tooManyRows ×1 · definitions unknownColumn ×1 · links unknownColumn ×1 · locations badHeader ×1 · locations file too large ×1 · locations nulByte ×1 · locations unknownColumn ×1 · locations wrongFile ×1 · strings badHeader ×1 · strings emptyFile ×1 · strings nulByte ×1 · strings tooManyRows ×1 · strings unknownColumn ×1 · strings wrongFile ×1

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: email, shard 1, shard 4, shard 5, shard 7, shard 8, shard 9, shard 15, repeat · unavailable: smoke, shard 2, shard 3, shard 6, shard 10, shard 11, shard 12, shard 13, shard 14, shard 16

`smoke`, `shard 2`, `shard 3`, `shard 6`, `shard 10`, `shard 11`, `shard 12`, `shard 13`, `shard 14`, `shard 16`: log unavailable.

## Timing (DEC-087, non-gating)

Results read: email, shard 1, shard 4, shard 5, shard 7, shard 8, shard 9, shard 15, repeat · unavailable: smoke, shard 2, shard 3, shard 6, shard 10, shard 11, shard 12, shard 13, shard 14, shard 16

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-11-06T14:56:18.477Z | 0.3 min |
| shard 1 | 2026-11-06T14:46:43.093Z | 13.7 min |
| shard 4 | 2026-11-06T14:46:17.232Z | 11.2 min |
| shard 5 | 2026-11-06T14:46:03.512Z | 7.6 min |
| shard 7 | 2026-11-06T14:46:46.365Z | 3.6 min |
| shard 8 | 2026-11-06T14:57:48.024Z | 8.1 min |
| shard 9 | 2026-11-06T14:46:13.325Z | 12.4 min |
| shard 15 | 2026-11-06T14:46:37.451Z | 3.9 min |
| repeat | 2026-11-06T14:46:09.540Z | 8.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 152 | 7.9 min | repeat |
| `admin-attributes-library.spec.ts` | 42 | 5.2 min | shard 1, shard 9 |
| `shell.spec.ts` | 117 | 5.2 min | shard 8 |
| `admin-categories-console.spec.ts` | 34 | 4.0 min | shard 1, shard 9 |
| `admin-attributes-links.spec.ts` | 34 | 3.8 min | shard 1, shard 9 |
| `admin-attributes-editor.spec.ts` | 36 | 3.0 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 78 | 2.9 min | shard 1, shard 9 |
| `feed-screens.spec.ts` | 18 | 2.5 min | shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 1, shard 9 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 7, shard 15 |
| `import-security.spec.ts` | 18 | 2.2 min | shard 4 |
| `post-wizard-bundle2.spec.ts` | 35 | 2.1 min | shard 5 |
| `viewing-place.spec.ts` | 11 | 1.9 min | shard 8 |
| `my-listings-ad.spec.ts` | 18 | 1.7 min | shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 1.5 min | shard 1, shard 9 |
| `photo-pipeline.spec.ts` | 34 | 1.3 min | shard 5 |
| `admin-audit.spec.ts` | 14 | 1.3 min | shard 1, shard 9 |
| `post-wizard-category.spec.ts` | 24 | 1.1 min | shard 5 |
| `one-line-slots-admin.spec.ts` | 5 | 1.1 min | shard 5 |
| `press.spec.ts` | 22 | 1.0 min | shard 7, shard 15 |
| `sage-ad-page.spec.ts` | 18 | 0.9 min | shard 7, shard 15 |
| `sage-tiers.spec.ts` | 40 | 0.9 min | shard 7, shard 15 |
| `legal-admin.spec.ts` | 22 | 0.9 min | shard 4 |
| `admin-categories-home.spec.ts` | 5 | 0.8 min | shard 1 |
| `mfa-stepup.spec.ts` | 10 | 0.7 min | shard 4 |
| `legal-certify.spec.ts` | 22 | 0.7 min | shard 4 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 7, shard 15 |
| `locations-tree.spec.ts` | 4 | 0.5 min | shard 4 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `user-guides.spec.ts` | 9 | 0.4 min | shard 8 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `one-line-slots.spec.ts` | 5 | 0.4 min | shard 5 |
| `name-check-queue.spec.ts` | 4 | 0.4 min | shard 5 |
| `i18n-sign-in-language.spec.ts` | 6 | 0.3 min | shard 4 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `my-listings-page.spec.ts` | 8 | 0.3 min | shard 5 |
| `legal-doors.spec.ts` | 17 | 0.3 min | shard 4 |
| `i18n-bundle.spec.ts` | 3 | 0.3 min | shard 4 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `my-listings-levels.spec.ts` | 13 | 0.2 min | shard 5 |
| `settings.spec.ts` | 9 | 0.2 min | shard 7 |
| `supabase-door.spec.ts` | 6 | 0.2 min | shard 8 |
| `my-listings-doors.spec.ts` | 14 | 0.2 min | shard 5 |
| `legal-accept.spec.ts` | 6 | 0.2 min | shard 4 |
| `phone-frame.spec.ts` | 9 | 0.2 min | shard 5 |
| `house-style.spec.ts` | 6 | 0.2 min | shard 4 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `i18n-coverage.spec.ts` | 7 | 0.1 min | shard 4 |
| `legal-pages.spec.ts` | 5 | 0.1 min | shard 4 |
| `legal-history.spec.ts` | 3 | 0.1 min | shard 4 |
| `layout.spec.ts` | 5 | 0.1 min | shard 4 |
| `page-head.spec.ts` | 2 | 0.1 min | shard 5 |
| `overlays.spec.ts` | 4 | 0.1 min | shard 5 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `smoke-auth-i18n.spec.ts` | 1 | 0.1 min | shard 8 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `shell-table-law.spec.ts` | 1 | 0.0 min | shard 8 |
| `overlay-shift.spec.ts` | 3 | 0.0 min | shard 8 |
| `on-demand-failure.spec.ts` | 1 | 0.0 min | shard 5 |
| `i18n-layers.spec.ts` | 3 | 0.0 min | shard 4 |
| `locale-format.spec.ts` | 1 | 0.0 min | shard 4 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `fonts.spec.ts` | 1 | 0.0 min | shard 4 |
| `submenu.spec.ts` | 7 | 0.0 min | shard 8 |
| `submenu-look.spec.ts` | 6 | 0.0 min | shard 9 |
| `geo.spec.ts` | 5 | 0.0 min | shard 4 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |
| `submenu-touch.spec.ts` | 4 | 0.0 min | shard 9 |
| `menu-rows.spec.ts` | 3 | 0.0 min | shard 8 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 46.7 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 43.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 34.8 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.3 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 25.8 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 25.6 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 24.9 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 24.8 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 22.7 s |
| `feed-screens.spec.ts` › FS-10 nothing anywhere: the invitation card comes first, with the category and the place | mobile-360 | 20.0 s |
| `admin-categories-console.spec.ts` › CT-6 retirement: a retired category leaves the active tree and keeps its listings home | mobile-360 | 19.7 s |
| `admin-categories-console.spec.ts` › CT-6 retirement: a retired category leaves the active tree and keeps its listings home | desktop-1280 | 19.6 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42236422436-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42236422436-local-1
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42236422436-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42236422436-local-5
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42236422436-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42236422436-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42236422436-local-9
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42236422436-local-15
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 42236422436-local-repeat
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: shard 10

No `[ssr-error]` lines in the `shard 10` log (or no log was uploaded).

## Client errors: shard 10

No `[client-error]` lines in the `shard 10` log (or no log was uploaded).

## Server errors: shard 11

No `[ssr-error]` lines in the `shard 11` log (or no log was uploaded).

## Client errors: shard 11

No `[client-error]` lines in the `shard 11` log (or no log was uploaded).

## Server errors: shard 12

No `[ssr-error]` lines in the `shard 12` log (or no log was uploaded).

## Client errors: shard 12

No `[client-error]` lines in the `shard 12` log (or no log was uploaded).

## Server errors: shard 13

No `[ssr-error]` lines in the `shard 13` log (or no log was uploaded).

## Client errors: shard 13

No `[client-error]` lines in the `shard 13` log (or no log was uploaded).

## Server errors: shard 14

No `[ssr-error]` lines in the `shard 14` log (or no log was uploaded).

## Client errors: shard 14

No `[client-error]` lines in the `shard 14` log (or no log was uploaded).

## Server errors: shard 16

No `[ssr-error]` lines in the `shard 16` log (or no log was uploaded).

## Client errors: shard 16

No `[client-error]` lines in the `shard 16` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

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

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 10: no results file

shard 10: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 11: no results file

shard 11: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 12: no results file

shard 12: no results file — the process failed outside test results (setup/teardown/preflight).

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

## shard 16: no results file

shard 16: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
