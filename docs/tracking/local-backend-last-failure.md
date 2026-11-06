# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42232739640
- Commit: `1cc806ce729336dc0710939f9ede8fae0a25801c`
- Attempt: 1
- Written (UTC): 2026-11-06T14:36:20.735Z
- Passed: 1217 · Skipped: 147 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 12, repeat
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 10, shard 11, shard 13, shard 14, shard 15, shard 16
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 19 results files read, 8 of 19 logs read).

## Backend start failure (INC-973)

The temporary backend never came up, so these sources have neither results nor a lane log: email, shard 1, shard 2, shard 3, shard 10, shard 11, shard 13, shard 14, shard 15, shard 16. The start log's error lines, redacted, from `email` (one lane's lines stand for every lane that failed the same way):

```text
migration: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.269 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
Server record (DEC-340, stream):
172.18.0.1 2026-11-06 14:22:02.051 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.269 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:22:02.051 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:22:02.051 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(241 statement lines dropped)
```

## Server errors — census (DEC-083, non-gating)

Logs read: shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 12, repeat · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 10, shard 11, shard 13, shard 14, shard 15, shard 16

`smoke`, `email`, `shard 1`, `shard 2`, `shard 3`, `shard 10`, `shard 11`, `shard 13`, `shard 14`, `shard 15`, `shard 16`: log unavailable.

56 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `definitions badHeader` (quiet) | 3 | shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 3 | shard 4, shard 9, shard 12 |
| `categories badHeader` (quiet) | 2 | shard 4, shard 12 |
| `categories file too large` (quiet) | 2 | shard 4, shard 12 |
| `categories nulByte` (quiet) | 2 | shard 4, shard 12 |
| `categories unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `categories wrongFile` (quiet) | 2 | shard 4, shard 12 |
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

Quiet (allowlisted): definitions badHeader ×3 · definitions wrongFile ×3 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 12, repeat · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 10, shard 11, shard 13, shard 14, shard 15, shard 16

`smoke`, `email`, `shard 1`, `shard 2`, `shard 3`, `shard 10`, `shard 11`, `shard 13`, `shard 14`, `shard 15`, `shard 16`: log unavailable.

## Timing (DEC-087, non-gating)

Results read: shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 12, repeat · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 10, shard 11, shard 13, shard 14, shard 15, shard 16

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| shard 4 | 2026-11-06T14:21:40.059Z | 12.0 min |
| shard 5 | 2026-11-06T14:21:34.605Z | 7.7 min |
| shard 6 | 2026-11-06T14:21:28.026Z | 10.5 min |
| shard 7 | 2026-11-06T14:22:27.282Z | 4.1 min |
| shard 8 | 2026-11-06T14:21:14.478Z | 7.8 min |
| shard 9 | 2026-11-06T14:21:20.364Z | 12.0 min |
| shard 12 | 2026-11-06T14:24:21.581Z | 11.5 min |
| repeat | 2026-11-06T14:23:33.879Z | 8.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 152 | 8.0 min | repeat |
| `import-security.spec.ts` | 36 | 5.2 min | shard 4, shard 12 |
| `shell.spec.ts` | 117 | 4.9 min | shard 8 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `my-listings-ad.spec.ts` | 36 | 3.3 min | shard 4, shard 12 |
| `admin-attributes-library.spec.ts` | 21 | 2.5 min | shard 9 |
| `post-wizard-bundle2.spec.ts` | 35 | 2.2 min | shard 5 |
| `admin-categories-console.spec.ts` | 17 | 2.0 min | shard 9 |
| `post-wizard-specs.spec.ts` | 41 | 1.9 min | shard 6 |
| `viewing-place.spec.ts` | 11 | 1.9 min | shard 8 |
| `post-wizard-place.spec.ts` | 19 | 1.9 min | shard 6 |
| `legal-admin.spec.ts` | 44 | 1.8 min | shard 4, shard 12 |
| `sage-bands.spec.ts` | 38 | 1.8 min | shard 7 |
| `admin-attributes-links.spec.ts` | 17 | 1.8 min | shard 9 |
| `post-wizard-where.spec.ts` | 16 | 1.7 min | shard 6 |
| `legal-certify.spec.ts` | 44 | 1.6 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 20 | 1.5 min | shard 4, shard 12 |
| `admin-attributes-editor.spec.ts` | 18 | 1.4 min | shard 9 |
| `photo-pipeline.spec.ts` | 34 | 1.4 min | shard 5 |
| `post-wizard-pricing.spec.ts` | 26 | 1.4 min | shard 6 |
| `ad-page.spec.ts` | 39 | 1.3 min | shard 9 |
| `admin-attributes-safety.spec.ts` | 9 | 1.2 min | shard 9 |
| `post-wizard-resets.spec.ts` | 17 | 1.1 min | shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `post-wizard-category.spec.ts` | 24 | 1.1 min | shard 5 |
| `one-line-slots-admin.spec.ts` | 5 | 1.1 min | shard 5 |
| `posting-routes.spec.ts` | 40 | 1.0 min | shard 6 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 20 | 0.6 min | shard 9 |
| `admin-audit.spec.ts` | 7 | 0.6 min | shard 9 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 4, shard 12 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `press.spec.ts` | 11 | 0.5 min | shard 7 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `user-guides.spec.ts` | 9 | 0.4 min | shard 8 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `one-line-slots.spec.ts` | 5 | 0.4 min | shard 5 |
| `name-check-queue.spec.ts` | 4 | 0.4 min | shard 5 |
| `sage-ad-page.spec.ts` | 9 | 0.3 min | shard 7 |
| `post-wizard-removed.spec.ts` | 2 | 0.3 min | shard 6 |
| `sage-tiers.spec.ts` | 20 | 0.3 min | shard 7 |
| `my-listings-page.spec.ts` | 8 | 0.3 min | shard 5 |
| `sage-shell.spec.ts` | 40 | 0.3 min | shard 7 |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `posting-routes-catalog.spec.ts` | 9 | 0.2 min | shard 6 |
| `my-listings-levels.spec.ts` | 13 | 0.2 min | shard 5 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `supabase-door.spec.ts` | 6 | 0.2 min | shard 8 |
| `post-wizard-finder.spec.ts` | 4 | 0.2 min | shard 6 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `phone-frame.spec.ts` | 9 | 0.2 min | shard 5 |
| `ad-page-doors.spec.ts` | 15 | 0.2 min | shard 9 |
| `my-listings-doors.spec.ts` | 14 | 0.2 min | shard 5 |
| `post-wizard-details.spec.ts` | 4 | 0.2 min | shard 6 |
| `primitives-law.spec.ts` | 12 | 0.2 min | shard 7 |
| `sage-cards.spec.ts` | 14 | 0.2 min | shard 7 |
| `posting-routes-dials.spec.ts` | 7 | 0.1 min | shard 6 |
| `post-wizard-units.spec.ts` | 2 | 0.1 min | shard 6 |
| `page-head.spec.ts` | 2 | 0.1 min | shard 5 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `rbac.spec.ts` | 3 | 0.1 min | shard 7 |
| `overlays.spec.ts` | 4 | 0.1 min | shard 5 |
| `account-saved.spec.ts` | 2 | 0.1 min | shard 9 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `posting-routes-identity.spec.ts` | 2 | 0.1 min | shard 6 |
| `smoke-auth-i18n.spec.ts` | 1 | 0.1 min | shard 8 |
| `post-wizard-recent.spec.ts` | 1 | 0.1 min | shard 6 |
| `shell-table-law.spec.ts` | 1 | 0.0 min | shard 8 |
| `on-demand-failure.spec.ts` | 1 | 0.0 min | shard 5 |
| `overlay-shift.spec.ts` | 3 | 0.0 min | shard 8 |
| `seller-name-hidden.spec.ts` | 1 | 0.0 min | shard 7 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `admin-ai-calls.spec.ts` | 1 | 0.0 min | shard 9 |
| `ad-page-layout.spec.ts` | 1 | 0.0 min | shard 9 |
| `shell-bands.spec.ts` | 8 | 0.0 min | shard 8 |
| `rail-first-paint.spec.ts` | 2 | 0.0 min | shard 7 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `submenu.spec.ts` | 7 | 0.0 min | shard 8 |
| `submenu-look.spec.ts` | 6 | 0.0 min | shard 9 |
| `submenu-touch.spec.ts` | 4 | 0.0 min | shard 9 |
| `menu-rows.spec.ts` | 3 | 0.0 min | shard 8 |
| `ad-page-routes.spec.ts` | 2 | 0.0 min | shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 44.6 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 44.2 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 41.5 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 35.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 33.7 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.2 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | desktop-1280 | 27.1 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 24.6 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 24.6 s |

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42232739640-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42232739640-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42232739640-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42232739640-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42232739640-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42232739640-local-9
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42232739640-local-12
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 42232739640-local-repeat
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

## Server errors: shard 10

No `[ssr-error]` lines in the `shard 10` log (or no log was uploaded).

## Client errors: shard 10

No `[client-error]` lines in the `shard 10` log (or no log was uploaded).

## Server errors: shard 11

No `[ssr-error]` lines in the `shard 11` log (or no log was uploaded).

## Client errors: shard 11

No `[client-error]` lines in the `shard 11` log (or no log was uploaded).

## Server errors: shard 13

No `[ssr-error]` lines in the `shard 13` log (or no log was uploaded).

## Client errors: shard 13

No `[client-error]` lines in the `shard 13` log (or no log was uploaded).

## Server errors: shard 14

No `[ssr-error]` lines in the `shard 14` log (or no log was uploaded).

## Client errors: shard 14

No `[client-error]` lines in the `shard 14` log (or no log was uploaded).

## Server errors: shard 15

No `[ssr-error]` lines in the `shard 15` log (or no log was uploaded).

## Client errors: shard 15

No `[client-error]` lines in the `shard 15` log (or no log was uploaded).

## Server errors: shard 16

No `[ssr-error]` lines in the `shard 16` log (or no log was uploaded).

## Client errors: shard 16

No `[client-error]` lines in the `shard 16` log (or no log was uploaded).

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

## shard 15: no results file

shard 15: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 16: no results file

shard 16: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
