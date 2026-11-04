# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41859570648
- Commit: `86d490740301971743c8315cfa118ebba4f74833`
- Attempt: 1
- Written (UTC): 2026-11-04T16:07:51.826Z
- Passed: 1568 · Skipped: 307 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email, shard 1, shard 3, shard 4, shard 5, shard 7, shard 8, shard 9, shard 11, shard 14, shard 15, shard 16
- Sources without results: smoke, shard 2, shard 6, shard 10, shard 12, shard 13
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (12 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
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

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: email, shard 1, shard 3, shard 4, shard 5, shard 7, shard 8, shard 9, shard 11, shard 14, shard 15, shard 16 · unavailable: smoke, shard 2, shard 6, shard 10, shard 12, shard 13

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-11-04T15:50:52.891Z | 0.4 min |
| shard 1 | 2026-11-04T15:45:31.351Z | 14.6 min |
| shard 3 | 2026-11-04T15:51:19.590Z | 12.6 min |
| shard 4 | 2026-11-04T15:40:52.531Z | 8.9 min |
| shard 5 | 2026-11-04T15:52:02.413Z | 11.9 min |
| shard 7 | 2026-11-04T15:55:59.099Z | 4.8 min |
| shard 8 | 2026-11-04T15:54:52.725Z | 8.7 min |
| shard 9 | 2026-11-04T15:50:36.874Z | 13.4 min |
| shard 11 | 2026-11-04T15:47:42.494Z | 12.4 min |
| shard 14 | 2026-11-04T15:50:57.989Z | 10.4 min |
| shard 15 | 2026-11-04T15:56:47.400Z | 3.9 min |
| shard 16 | 2026-11-04T15:55:00.027Z | 8.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 10.1 min | shard 8, shard 16 |
| `admin-attributes-library.spec.ts` | 42 | 5.5 min | shard 1, shard 9 |
| `admin-translations-console.spec.ts` | 44 | 4.9 min | shard 3, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.3 min | shard 1, shard 9 |
| `admin-users.spec.ts` | 28 | 4.2 min | shard 3, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 4.0 min | shard 1, shard 9 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `auth-signout.spec.ts` | 36 | 3.5 min | shard 3, shard 11 |
| `choice-lists.spec.ts` | 96 | 3.4 min | shard 3, shard 11 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 1, shard 9 |
| `ad-page.spec.ts` | 78 | 3.1 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 35 | 2.9 min | shard 5 |
| `sage-bands.spec.ts` | 76 | 2.8 min | shard 7, shard 15 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 9 |
| `feed-screens.spec.ts` | 18 | 2.5 min | shard 4 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `post-wizard-specs.spec.ts` | 41 | 2.0 min | shard 14 |
| `photo-pipeline.spec.ts` | 34 | 2.0 min | shard 5 |
| `import-security.spec.ts` | 18 | 2.0 min | shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `post-wizard-place.spec.ts` | 19 | 1.9 min | shard 14 |
| `my-listings-ad.spec.ts` | 18 | 1.7 min | shard 5 |
| `post-wizard-where.spec.ts` | 16 | 1.7 min | shard 14 |
| `dialogs.spec.ts` | 14 | 1.7 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.7 min | shard 1, shard 9 |
| `post-wizard-category.spec.ts` | 24 | 1.5 min | shard 5 |
| `post-wizard-pricing.spec.ts` | 26 | 1.4 min | shard 14 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 1, shard 9 |
| `one-line-slots-admin.spec.ts` | 5 | 1.3 min | shard 5 |
| `post-wizard-resets.spec.ts` | 17 | 1.1 min | shard 14 |
| `press.spec.ts` | 22 | 1.1 min | shard 7, shard 15 |
| `posting-routes.spec.ts` | 40 | 1.0 min | shard 14 |
| `sage-ad-page.spec.ts` | 18 | 1.0 min | shard 7, shard 15 |
| `user-guides.spec.ts` | 18 | 1.0 min | shard 8, shard 16 |
| `sage-tiers.spec.ts` | 40 | 1.0 min | shard 7, shard 15 |
| `admin-categories-home.spec.ts` | 5 | 0.8 min | shard 1 |
| `legal-admin.spec.ts` | 21 | 0.8 min | shard 4 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 7, shard 15 |
| `mfa-stepup.spec.ts` | 10 | 0.7 min | shard 4 |
| `admin-shell.spec.ts` | 6 | 0.7 min | shard 11 |
| `legal-certify.spec.ts` | 21 | 0.6 min | shard 4 |
| `locations-tree.spec.ts` | 4 | 0.5 min | shard 4 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `one-line-slots.spec.ts` | 5 | 0.4 min | shard 5 |
| `name-check-queue.spec.ts` | 4 | 0.4 min | shard 5 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `my-listings-page.spec.ts` | 8 | 0.4 min | shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 3, shard 11 |
| `post-wizard-removed.spec.ts` | 2 | 0.3 min | shard 14 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `i18n-sign-in-language.spec.ts` | 6 | 0.3 min | shard 4 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `phone-frame.spec.ts` | 9 | 0.3 min | shard 5 |
| `i18n-bundle.spec.ts` | 3 | 0.3 min | shard 4 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `my-listings-doors.spec.ts` | 14 | 0.2 min | shard 5 |
| `legal-doors.spec.ts` | 17 | 0.2 min | shard 4 |
| `posting-routes-catalog.spec.ts` | 9 | 0.2 min | shard 14 |
| `post-wizard-details.spec.ts` | 4 | 0.2 min | shard 5 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `posting-routes-dials.spec.ts` | 9 | 0.2 min | shard 14 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 11 |
| `legal-accept.spec.ts` | 6 | 0.2 min | shard 4 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `admin-services.spec.ts` | 5 | 0.2 min | shard 11 |
| `house-style.spec.ts` | 6 | 0.2 min | shard 4 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `page-head.spec.ts` | 2 | 0.1 min | shard 5 |
| `post-wizard-units.spec.ts` | 2 | 0.1 min | shard 14 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `i18n-coverage.spec.ts` | 7 | 0.1 min | shard 4 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 9, shard 16 |
| `legal-pages.spec.ts` | 5 | 0.1 min | shard 4 |
| `overlays.spec.ts` | 4 | 0.1 min | shard 5 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `legal-history.spec.ts` | 3 | 0.1 min | shard 4 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `layout.spec.ts` | 5 | 0.1 min | shard 4 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `posting-routes-identity.spec.ts` | 2 | 0.1 min | shard 14 |
| `post-wizard-recent.spec.ts` | 1 | 0.1 min | shard 14 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `on-demand-failure.spec.ts` | 1 | 0.0 min | shard 5 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `i18n-layers.spec.ts` | 3 | 0.0 min | shard 4 |
| `locale-format.spec.ts` | 1 | 0.0 min | shard 4 |
| `fonts.spec.ts` | 1 | 0.0 min | shard 4 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |
| `geo.spec.ts` | 5 | 0.0 min | shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 45.1 s |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 33.7 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.9 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
| `auth-signout.spec.ts` › SO-11 a sign-out whose server cannot be reached still ends the session on this device (DEC-268) | mobile-360 | 28.8 s |
| `auth-signout.spec.ts` › SO-11 a sign-out whose server cannot be reached still ends the session on this device (DEC-268) | desktop-1280 | 28.7 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 25.6 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 25.1 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 24.3 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41859570648-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 41859570648-local-1
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 2, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 41859570648-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 34 user(s) owned by process 41859570648-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41859570648-local-5
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41859570648-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41859570648-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 41859570648-local-9
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 41859570648-local-11
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41859570648-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41859570648-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41859570648-local-16
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: shard 10

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 10

No `[client-error]` lines in the `shard 10` log (or no log was uploaded).

## Server errors: shard 12

```text
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 12

No `[client-error]` lines in the `shard 12` log (or no log was uploaded).

## Server errors: shard 13

No `[ssr-error]` lines in the `shard 13` log (or no log was uploaded).

## Client errors: shard 13

No `[client-error]` lines in the `shard 13` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  239 [desktop-1280] › e2e/shell.spec.ts:2836:3 › L4b location picker › the location row uses the width-specific label (704ms)
[WebServer] [upstream] ssr language gate 200 4ms
  ✓  240 [desktop-1280] › e2e/shell.spec.ts:2855:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (732ms)
[WebServer] [upstream] ssr language gate 200 3ms
  ✓  241 [desktop-1280] › e2e/shell.spec.ts:2867:3 › L4b location picker › LS-4 a closed market is not guessed (677ms)
[WebServer] [upstream] ssr language gate 200 3ms
  ✓  242 [desktop-1280] › e2e/shell.spec.ts:2881:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (692ms)
[WebServer] [upstream] ssr language gate 200 2ms
  ✓  243 [desktop-1280] › e2e/shell.spec.ts:2981:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (8.8s)
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  110 [mobile-360] › e2e/admin-monetisation.spec.ts:1217:3 › P-1b Admin › Monetisation › MON-10 a used price: the service client marks it used, the door refuses Edit by name and nothing changes; after a refresh the verb is gone while End stays (3.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node ([e-mail])
[e2e:pool] slot 0 language baseline cleared en → null (INC-173b)
[WebServer] [upstream] ssr language gate 200 2ms
[WebServer] [upstream] ssr language gate 200 2ms
  ✓  111 [mobile-360] › e2e/admin-monetisation.spec.ts:1265:3 › P-1b Admin › Monetisation › MON-11 End price sets the end to now; the row stays, says so, offers no verb any more, and the public read no longer lists it (2.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node ([e-mail])
[e2e:pool] slot 0 language baseline cleared en → null (INC-173b)
[WebServer] [upstream] ssr language gate 200 3ms
```

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  171 [mobile-360] › e2e/posting-routes.spec.ts:1034:3 › POSTING ROUTES › PR-23 an ad has no end unless the seller sets a date or the category holds a limit (DEC-117) (2.2s)
[WebServer] [upstream] ssr language gate 200 2ms
[WebServer] [upstream] ssr language gate 200 2ms
[WebServer] [upstream] ssr language gate 200 2ms
[WebServer] [upstream] ssr language gate 200 2ms
  ✓  172 [mobile-360] › e2e/posting-routes.spec.ts:1098:3 › POSTING ROUTES › PR-24 a seller without a public name, or a person without a first name, is refused at publish (INC-423) (3.8s)
[WebServer] [upstream] ssr language gate 200 3ms
[WebServer] [upstream] ssr language gate 200 2ms
  ✓  173 [mobile-360] › e2e/posting-routes.spec.ts:1171:3 › POSTING ROUTES › PR-44 a business with its name and no first or last name publishes (INC-423) (2.1s)
```

## shard 10: no results file

shard 10: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 language baseline cleared en → null (INC-173b)
[WebServer] [upstream] ssr language gate 200 2ms
[WebServer] [upstream] ssr language gate 200 1ms
[WebServer] [upstream] ssr language gate 200 13ms
  ✓  124 [desktop-1280] › e2e/admin-roles.spec.ts:205:3 › U2 roles console › RP-2 create: a super admin creates a custom role through step-up (7.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node ([e-mail])
[e2e:pool] slot 0 language baseline cleared en → null (INC-173b)
[WebServer] [upstream] ssr language gate 200 2ms
[WebServer] [upstream] ssr language gate 200 2ms
```

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## shard 12: no results file

shard 12: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[WebServer] [upstream] ssr language gate 200 5ms
[WebServer] [upstream] ssr language gate 200 3ms
[WebServer] [upstream] ssr language gate 200 2ms
  ✓  145 [desktop-1280] › e2e/legal-pages.spec.ts:210:3 › Legal public pages › LGP-3 /legal/terms lands on /terms; /legal/not-a-kind is not found (1.0s)
[WebServer] [upstream] ssr language gate 200 2ms
[WebServer] [upstream] ssr language gate 200 3ms
  ✓  146 [desktop-1280] › e2e/locale-format.spec.ts:44:1 › LF-E1 an Amharic account sees the full Amharic month on My listings (2.1s)
  ✓  147 [desktop-1280] › e2e/locations-tree.spec.ts:91:3 › L1c · public per-country location tree › LR-1 the open market answers, anchor first, and honours If-None-Match (77ms)
  ✓  148 [desktop-1280] › e2e/locations-tree.spec.ts:119:3 › L1c · public per-country location tree › LR-2 a closed market is 404 and a malformed code is 400 (90ms)
```

```text
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## shard 13: no results file

shard 13: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[WebServer] [upstream] ssr language gate 200 2ms
[WebServer] [upstream] ssr language gate 200 2ms
  ✓  148 [desktop-1280] › e2e/post-wizard-details.spec.ts:160:3 › POSTING WIZARD — WRITE-IN DETAILS › PW-170 the suggested title leads with the seller's own name for the item (Bundle 7 B3) (3.5s)
[WebServer] [upstream] ssr language gate 200 2ms
[WebServer] [upstream] ssr language gate 200 3ms
[WebServer] [upstream] ssr language gate 200 2ms
  ✓  149 [desktop-1280] › e2e/post-wizard-details.spec.ts:236:3 › POSTING WIZARD — WRITE-IN DETAILS › PW-172 a held answer whose option is switched off prints its label, never offered (INC-466) (3.7s)
[WebServer] [upstream] ssr language gate 200 3ms
[WebServer] [upstream] ssr language gate 200 3ms
```
