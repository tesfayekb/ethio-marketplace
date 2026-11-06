# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42214769331
- Commit: `2bcca530fc58f240dec98dd0c0b998089a2cb241`
- Attempt: 1
- Written (UTC): 2026-11-06T12:37:13.781Z
- Passed: 1091 · Skipped: 216 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): shard 3, shard 5, shard 7, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: smoke, email, shard 1, shard 2, shard 4, shard 6, shard 8, shard 9, shard 10, shard 11, shard 12
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 19 results files read, 8 of 19 logs read).

## Backend start failure (INC-973)

The temporary backend never came up, so these sources have neither results nor a lane log: email, shard 1, shard 2, shard 4, shard 6, shard 8, shard 9, shard 10, shard 11, shard 12. The start log's error lines, redacted, from `email` (one lane's lines stand for every lane that failed the same way):

```text
migration: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.312 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
Server record (DEC-340, stream):
172.18.0.1 2026-11-06 12:22:47.600 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.312 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 12:22:47.600 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 12:22:47.600 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(241 statement lines dropped)
```

## Server errors — census (DEC-083, non-gating)

Logs read: shard 3, shard 5, shard 7, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: smoke, email, shard 1, shard 2, shard 4, shard 6, shard 8, shard 9, shard 10, shard 11, shard 12

`smoke`, `email`, `shard 1`, `shard 2`, `shard 4`, `shard 6`, `shard 8`, `shard 9`, `shard 10`, `shard 11`, `shard 12`: log unavailable.

## Accessibility (DEC-084, gating)

Logs read: shard 3, shard 5, shard 7, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: smoke, email, shard 1, shard 2, shard 4, shard 6, shard 8, shard 9, shard 10, shard 11, shard 12

`smoke`, `email`, `shard 1`, `shard 2`, `shard 4`, `shard 6`, `shard 8`, `shard 9`, `shard 10`, `shard 11`, `shard 12`: log unavailable.

## Timing (DEC-087, non-gating)

Results read: shard 3, shard 5, shard 7, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: smoke, email, shard 1, shard 2, shard 4, shard 6, shard 8, shard 9, shard 10, shard 11, shard 12

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| shard 3 | 2026-11-06T12:22:33.642Z | 8.1 min |
| shard 5 | 2026-11-06T12:25:25.922Z | 8.0 min |
| shard 7 | 2026-11-06T12:32:39.026Z | 4.1 min |
| shard 13 | 2026-11-06T12:22:28.580Z | 6.7 min |
| shard 14 | 2026-11-06T12:22:54.043Z | 11.3 min |
| shard 15 | 2026-11-06T12:22:56.216Z | 3.7 min |
| shard 16 | 2026-11-06T12:22:57.616Z | 8.1 min |
| repeat | 2026-11-06T12:23:03.117Z | 8.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 152 | 8.1 min | repeat |
| `post-wizard-bundle2.spec.ts` | 70 | 4.3 min | shard 5, shard 13 |
| `shell.spec.ts` | 117 | 4.2 min | shard 16 |
| `photo-pipeline.spec.ts` | 68 | 2.9 min | shard 5, shard 13 |
| `sage-bands.spec.ts` | 76 | 2.6 min | shard 7, shard 15 |
| `post-wizard-specs.spec.ts` | 41 | 2.1 min | shard 14 |
| `post-wizard-category.spec.ts` | 48 | 2.1 min | shard 5, shard 13 |
| `viewing-place.spec.ts` | 11 | 2.1 min | shard 16 |
| `post-wizard-place.spec.ts` | 19 | 1.9 min | shard 14 |
| `post-wizard-where.spec.ts` | 16 | 1.7 min | shard 14 |
| `admin-users.spec.ts` | 14 | 1.7 min | shard 3 |
| `auth-signout.spec.ts` | 18 | 1.6 min | shard 3 |
| `post-wizard-pricing.spec.ts` | 26 | 1.5 min | shard 14 |
| `choice-lists.spec.ts` | 48 | 1.3 min | shard 3 |
| `post-wizard-resets.spec.ts` | 17 | 1.2 min | shard 14 |
| `posting-routes.spec.ts` | 40 | 1.2 min | shard 14 |
| `one-line-slots-admin.spec.ts` | 10 | 1.1 min | shard 5, shard 13 |
| `press.spec.ts` | 22 | 1.0 min | shard 7, shard 15 |
| `admin-translations-data.spec.ts` | 5 | 1.0 min | shard 3 |
| `sage-tiers.spec.ts` | 40 | 0.9 min | shard 7, shard 15 |
| `sage-ad-page.spec.ts` | 18 | 0.9 min | shard 7, shard 15 |
| `admin-translations-governance.spec.ts` | 4 | 0.9 min | shard 3 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 5, shard 13 |
| `sage-shell.spec.ts` | 80 | 0.6 min | shard 7, shard 15 |
| `my-listings-page.spec.ts` | 16 | 0.6 min | shard 5, shard 13 |
| `dialogs.spec.ts` | 7 | 0.5 min | shard 3 |
| `my-listings-levels.spec.ts` | 26 | 0.5 min | shard 5, shard 13 |
| `user-guides.spec.ts` | 9 | 0.4 min | shard 16 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 5, shard 13 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 7, shard 15 |
| `post-wizard-removed.spec.ts` | 2 | 0.3 min | shard 14 |
| `posting-routes-catalog.spec.ts` | 9 | 0.3 min | shard 14 |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `submenu.spec.ts` | 7 | 0.3 min | shard 16 |
| `supabase-door.spec.ts` | 6 | 0.2 min | shard 16 |
| `shell-bands.spec.ts` | 8 | 0.2 min | shard 15 |
| `post-wizard-details.spec.ts` | 4 | 0.2 min | shard 14 |
| `post-wizard-finder.spec.ts` | 4 | 0.2 min | shard 14 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `auth-caller-gates.spec.ts` | 4 | 0.2 min | shard 3 |
| `submenu-look.spec.ts` | 6 | 0.2 min | shard 16 |
| `menu-rows.spec.ts` | 3 | 0.2 min | shard 16 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `posting-routes-dials.spec.ts` | 7 | 0.2 min | shard 14 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 3 |
| `overlays.spec.ts` | 8 | 0.1 min | shard 5, shard 13 |
| `post-wizard-units.spec.ts` | 2 | 0.1 min | shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `breadcrumbs.spec.ts` | 3 | 0.1 min | shard 3 |
| `category-nav.spec.ts` | 5 | 0.1 min | shard 3 |
| `feed-index.spec.ts` | 15 | 0.1 min | shard 3 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `posting-routes-identity.spec.ts` | 2 | 0.1 min | shard 14 |
| `submenu-touch.spec.ts` | 4 | 0.1 min | shard 16 |
| `feed-route.spec.ts` | 11 | 0.1 min | shard 3 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `post-wizard-recent.spec.ts` | 1 | 0.1 min | shard 14 |
| `smoke-auth-i18n.spec.ts` | 1 | 0.1 min | shard 16 |
| `overlay-shift.spec.ts` | 3 | 0.1 min | shard 16 |
| `shell-table-law.spec.ts` | 1 | 0.1 min | shard 16 |
| `door-refusals.spec.ts` | 6 | 0.0 min | shard 3 |
| `category-image-routes.spec.ts` | 5 | 0.0 min | shard 3 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `dark-cards.spec.ts` | 2 | 0.0 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.3 s |
| `auth-signout.spec.ts` › SO-11 a sign-out whose server cannot be reached still ends the session on this device (DEC-268) | mobile-360 | 27.6 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 22.1 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 18.5 s |
| `admin-users.spec.ts` › AU-12 edit: a reserved name needs a reason of ten characters | mobile-360 | 18.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 18.4 s |
| `admin-translations-data.spec.ts` › TR-24 the Data scope machine-translates one row and then every untranslated one | mobile-360 | 17.1 s |
| `shell.spec.ts` › PN-1 an old own choice offers an unrelated same-market place, Keep and Switch | desktop-1280 | 17.1 s |
| `admin-translations-governance.spec.ts` › TR-29 the catalog exports as CSV and a translated CSV imports back | mobile-360 | 17.0 s |
| `dialogs.spec.ts` › DLG-E8 the photo viewer, the preview and the pin map: Escape closes the top layer only, the focus returns to the opener, the page does not move, reduced motion is respected | mobile-360 | 16.6 s |
| `shell.spec.ts` › LS-2 a pick is remembered; Any area is remembered as everywhere | desktop-1280 | 16.3 s |
| `post-wizard-place.spec.ts` › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city | desktop-1280 | 16.0 s |
| `shell.spec.ts` › LS-8 a city name alone selects that city | desktop-1280 | 16.0 s |

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 2, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 42214769331-local-3
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42214769331-local-5
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42214769331-local-7
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42214769331-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42214769331-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42214769331-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42214769331-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 42214769331-local-repeat
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

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

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

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

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
