# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45214184929
- Commit: `f676957701108eafd85c2a12938cdd33b78c019d`
- Attempt: 1
- Repeat: 30 of 248 tests repeated — specs directly changed 2/6, importers of a changed helper 2/9; budget 643 s; the time cap stopped the serial pass
- Written (UTC): 2026-11-23T16:52:57.623Z
- Passed: 2550 · Skipped: 424 · Failed: 114
- Gating failures: 114 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): repeat (2)

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 763s for the test suite to run
(no place given)
```

```text
Timed out waiting 763s for the teardown for test suite to run
(no place given)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

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

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-23T16:21:52.864Z | 5.1 min |
| email | 2026-11-23T16:22:09.631Z | 0.3 min |
| webkit | 2026-11-23T16:27:07.811Z | 9.6 min |
| shard 1 | 2026-11-23T16:20:30.093Z | 6.0 min |
| shard 2 | 2026-11-23T16:22:06.642Z | 10.2 min |
| shard 3 | 2026-11-23T16:20:15.759Z | 6.5 min |
| shard 4 | 2026-11-23T16:20:42.282Z | 8.4 min |
| shard 5 | 2026-11-23T16:20:56.620Z | 6.2 min |
| shard 6 | 2026-11-23T16:20:58.266Z | 9.8 min |
| shard 7 | 2026-11-23T16:22:07.210Z | 13.6 min |
| shard 8 | 2026-11-23T16:20:04.289Z | 11.7 min |
| shard 9 | 2026-11-23T16:20:18.536Z | 8.7 min |
| shard 10 | 2026-11-23T16:24:35.841Z | 11.9 min |
| shard 11 | 2026-11-23T16:20:59.786Z | 7.6 min |
| shard 12 | 2026-11-23T16:24:43.161Z | 7.7 min |
| shard 13 | 2026-11-23T16:22:42.815Z | 5.0 min |
| shard 14 | 2026-11-23T16:20:56.150Z | 16.1 min |
| shard 15 | 2026-11-23T16:27:59.215Z | 24.6 min |
| shard 16 | 2026-11-23T16:21:06.613Z | 14.0 min |
| repeat | 2026-11-23T16:21:37.582Z | 12.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `mfa-stepup.spec.ts` | 32 | 33.6 min | webkit, shard 15 |
| `admin-categories-console.spec.ts` | 102 | 28.4 min | shard 7, repeat |
| `admin-screening.spec.ts` | 64 | 18.0 min | webkit, shard 14 |
| `admin-users.spec.ts` | 28 | 16.8 min | shard 16 |
| `admin-listings.spec.ts` | 82 | 16.1 min | webkit, shard 10 |
| `admin-translations-console.spec.ts` | 46 | 12.8 min | smoke, shard 8 |
| `shell.spec.ts` | 234 | 10.2 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 8.9 min | shard 2 |
| `admin-locations.spec.ts` | 44 | 8.6 min | shard 6 |
| `import-security.spec.ts` | 36 | 7.1 min | shard 4 |
| `admin-roles.spec.ts` | 28 | 6.0 min | shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 5.8 min | shard 12 |
| `admin-shell.spec.ts` | 12 | 5.6 min | shard 2 |
| `auth-signout.spec.ts` | 44 | 5.5 min | webkit, shard 9 |
| `admin-attributes-editor.spec.ts` | 36 | 5.4 min | shard 14 |
| `post-wizard-place.spec.ts` | 40 | 5.2 min | shard 11 |
| `photo-pipeline.spec.ts` | 74 | 5.0 min | webkit, shard 16 |
| `admin-monetisation.spec.ts` | 34 | 5.0 min | smoke, shard 10 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.9 min | shard 15 |
| `post-wizard-where.spec.ts` | 32 | 4.9 min | shard 11 |
| `post-wizard-bundle2.spec.ts` | 70 | 4.8 min | shard 3 |
| `feed-screens.spec.ts` | 40 | 4.8 min | webkit, shard 5 |
| `dialogs.spec.ts` | 36 | 4.7 min | webkit, shard 10 |
| `admin-countries.spec.ts` | 18 | 4.3 min | shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 4.2 min | shard 13 |
| `my-listings-ad.spec.ts` | 38 | 4.1 min | shard 12 |
| `ad-page.spec.ts` | 104 | 4.1 min | webkit, shard 13 |
| `admin-audit.spec.ts` | 16 | 4.0 min | shard 9 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 15 |
| `admin-translations-governance.spec.ts` | 20 | 3.7 min | smoke, shard 16 |
| `legal-admin.spec.ts` | 44 | 3.5 min | shard 7 |
| `post-wizard-category.spec.ts` | 52 | 3.4 min | webkit, shard 4 |
| `sage-bands.spec.ts` | 76 | 3.3 min | shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 2.9 min | shard 8 |
| `post-wizard-pricing.spec.ts` | 52 | 2.9 min | shard 8 |
| `admin-guides.spec.ts` | 14 | 2.7 min | shard 3 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 5 |
| `choice-lists.spec.ts` | 96 | 2.5 min | shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `sage-ad-page.spec.ts` | 30 | 2.2 min | webkit, shard 11 |
| `posting-routes.spec.ts` | 80 | 2.2 min | shard 2 |
| `admin-categories-images.spec.ts` | 14 | 2.1 min | smoke, webkit, shard 12, repeat |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 5 |
| `house-style.spec.ts` | 54 | 2.0 min | shard 11, repeat |
| `legal-certify.spec.ts` | 44 | 2.0 min | shard 14 |
| `i18n-coverage.spec.ts` | 14 | 2.0 min | shard 4 |
| `admin-categories-home.spec.ts` | 10 | 2.0 min | shard 4 |
| `my-listings-promote.spec.ts` | 10 | 1.5 min | shard 11 |
| `press.spec.ts` | 22 | 1.5 min | shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.4 min | webkit, shard 2 |
| `phone-frame.spec.ts` | 18 | 1.4 min | shard 12 |
| `shell-table-law.spec.ts` | 2 | 1.2 min | shard 2 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | smoke, shard 9 |
| `my-listings-page.spec.ts` | 24 | 1.0 min | webkit, shard 10 |
| `sage-shell.spec.ts` | 80 | 0.9 min | shard 16 |
| `one-line-slots-admin.spec.ts` | 10 | 0.9 min | shard 3 |
| `my-listings-levels.spec.ts` | 28 | 0.9 min | shard 4 |
| `rbac.spec.ts` | 6 | 0.9 min | shard 7 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 0.8 min | shard 6 |
| `locations-tree.spec.ts` | 8 | 0.7 min | shard 13 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.7 min | shard 15 |
| `sage-cards.spec.ts` | 40 | 0.7 min | webkit, shard 7 |
| `settings.spec.ts` | 13 | 0.7 min | shard 1 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 7 |
| `ad-page-doors.spec.ts` | 30 | 0.6 min | shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 16 |
| `legal-doors.spec.ts` | 34 | 0.5 min | smoke, shard 8 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 3 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `layout.spec.ts` | 18 | 0.4 min | webkit, shard 10 |
| `shell-bands.spec.ts` | 16 | 0.4 min | smoke, shard 12 |
| `legal-pages.spec.ts` | 10 | 0.4 min | shard 11 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 1 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `admin-ai-calls.spec.ts` | 6 | 0.3 min | shard 11, repeat |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `feed-index.spec.ts` | 30 | 0.3 min | shard 6 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 15 |
| `account-saved.spec.ts` | 4 | 0.3 min | shard 4 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 10 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 15 |
| `door-refusals.spec.ts` | 14 | 0.1 min | shard 7 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-screening.spec.ts` › SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129) | desktop-1280 | 360.8 s |
| `admin-screening.spec.ts` › SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129) | mobile-360 | 360.5 s |
| `admin-translations-console.spec.ts` › TR-7b sync after a step-up prompt still reports its counts | desktop-1280 | 240.7 s |
| `mfa-stepup.spec.ts` › MF-9 one code covers a category's creation and its picture step | desktop-1280 | 240.7 s |
| `mfa-stepup.spec.ts` › MF-9 one code covers a category's creation and its picture step | mobile-360 | 240.6 s |
| `admin-translations-console.spec.ts` › TR-7b sync after a step-up prompt still reports its counts | mobile-360 | 240.6 s |
| `admin-users.spec.ts` › AU-3 detail: reason required, deactivate, audit row, reactivate | desktop-1280 | 121.7 s |
| `admin-users.spec.ts` › AU-3 detail: reason required, deactivate, audit row, reactivate | mobile-360 | 121.5 s |
| `admin-users.spec.ts` › AU-2 search and status filter | mobile-360 | 120.7 s |
| `mfa-stepup.spec.ts` › MF-7b cancelling the prompt releases the caller and writes nothing | desktop-1280 | 120.7 s |
| `mfa-stepup.spec.ts` › MF-2 gate: wrong code refused, correct code lets the action through | desktop-1280 | 120.6 s |
| `admin-categories-console.spec.ts` › CT-7b browse paths: an unproven factor cannot move a pointer | desktop-1280 | 120.6 s |
| `admin-categories-console.spec.ts` › CT-7b browse paths: an unproven factor cannot move a pointer | mobile-360 | 120.6 s |
| `mfa-stepup.spec.ts` › MF-2 gate: wrong code refused, correct code lets the action through | mobile-360 | 120.6 s |
| `mfa-stepup.spec.ts` › MF-6 unenrolling the only factor drops the stepped-up state | desktop-1280 | 120.5 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45214184929-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45214184929-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45214184929-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45214184929-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45214184929-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 3, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45214184929-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 45214184929-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 45214184929-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45214184929-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45214184929-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 10 user(s) owned by process 45214184929-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 45214184929-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 45214184929-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45214184929-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45214184929-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45214184929-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45214184929-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 48 (pool 2, fresh 46)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 75 user(s) owned by process 45214184929-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 27 user(s) owned by process 45214184929-local-16
```

## dialogs.spec.ts › a Filters panel in rows (Lovable bundle 3) › DLG-E12 a filter row's list opens in the panel's flow under its row with its choices in view above the footer; one press opens another row's list; Escape closes the list, then the panel

- Source: `webkit`
- Project: `webkit-1280`

```text
Error: DLG-E12 the choices a person sees @ 834 x 900

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 6
Received:    3
--- further error 1 ---
Error: DLG-E12 the choices a person sees @ 834 x 900

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 6
Received:    3

  814 |         tall?.choicesInView ?? 0,
  815 |         `DLG-E12 the choices a person sees @ ${width} x 900`,
> 816 |       ).toBeGreaterThanOrEqual(Math.min(tall?.choices ?? 0, 6));
      |         ^
  817 |
  818 |       // Several at once (DEC-420): the list stays open and marks each choice.
  819 |       await panel.getByTestId("style-filters-colour-Red").click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/dialogs.spec.ts:816:9
```

Context:

```text
              - option "Pink" [ref=e1802]:
                - generic [ref=e1803]: Pink
              - option "Orange" [ref=e1804]:
                - generic [ref=e1805]: Orange
              - option "Grey" [ref=e1806]:
                - generic [ref=e1807]: Grey
              - option "Silver" [ref=e1808]:
                - generic [ref=e1809]: Silver
        - generic [ref=e1812]:
          - generic "Size" [ref=e1813]
          - button "Size All" [ref=e1815] [cursor=pointer]:
            - generic [ref=e1816]: All
            - img
      - generic:
        - img
        - generic: More below
    - generic [ref=e1817]:
      - button "Clear all" [disabled]
      - button "Done" [disabled]
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-search')


  64 |     await switchUser(page, admin.email, admin.password);
  65 |     await gotoReady(page, "/admin/attributes");
> 66 |     await expect(page.getByTestId("attribute-search")).toBeVisible({ timeout: 20000 });
     |                                                        ^
  67 |     // The ratified library is non-empty, so page one carries rows.
  68 |     await expect(page.getByTestId("attribute-pagination-range")).toContainText("1–25");
  69 |     await expectNoHorizontalOverflow(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:66:56
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-14 a categories:view-only user reads the library and every write door refuses

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-search')


  809 |       await gotoReady(page, "/admin/attributes");
  810 |       // THE READ LANDS.
> 811 |       await expect(page.getByTestId("attribute-search")).toBeVisible({ timeout: 20000 });
      |                                                          ^
  812 |       await page.getByTestId("attribute-search").fill(key);
  813 |       await expect(
  814 |         librarySurface(page).getByTestId(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:811:58
```

Context:

```text
          - listitem [ref=e160]:
            - generic [ref=e161]: About
          - listitem [ref=e162]:
            - generic [ref=e163]: Contact
      - navigation "Help" [ref=e164]:
        - heading "Help" [level=2] [ref=e165]
        - list [ref=e166]:
          - listitem [ref=e167]:
            - generic [ref=e168]: Safety
      - navigation "Legal" [ref=e169]:
        - heading "Legal" [level=2] [ref=e170]
        - list [ref=e171]:
          - listitem [ref=e172]:
            - link "Terms" [ref=e173] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e174]:
            - link "Privacy" [ref=e175] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e177]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-search')


  64 |     await switchUser(page, admin.email, admin.password);
  65 |     await gotoReady(page, "/admin/attributes");
> 66 |     await expect(page.getByTestId("attribute-search")).toBeVisible({ timeout: 20000 });
     |                                                        ^
  67 |     // The ratified library is non-empty, so page one carries rows.
  68 |     await expect(page.getByTestId("attribute-pagination-range")).toContainText("1–25");
  69 |     await expectNoHorizontalOverflow(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:66:56
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-14 a categories:view-only user reads the library and every write door refuses

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-search')


  809 |       await gotoReady(page, "/admin/attributes");
  810 |       // THE READ LANDS.
> 811 |       await expect(page.getByTestId("attribute-search")).toBeVisible({ timeout: 20000 });
      |                                                          ^
  812 |       await page.getByTestId("attribute-search").fill(key);
  813 |       await expect(
  814 |         librarySurface(page).getByTestId(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:811:58
```

Context:

```text
          - listitem [ref=e184]:
            - generic [ref=e185]: About
          - listitem [ref=e186]:
            - generic [ref=e187]: Contact
      - navigation "Help" [ref=e188]:
        - heading "Help" [level=2] [ref=e189]
        - list [ref=e190]:
          - listitem [ref=e191]:
            - generic [ref=e192]: Safety
      - navigation "Legal" [ref=e193]:
        - heading "Legal" [level=2] [ref=e194]
        - list [ref=e195]:
          - listitem [ref=e196]:
            - link "Terms" [ref=e197] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e198]:
            - link "Privacy" [ref=e199] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e201]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-6 admin fixture: gated section nav, section page + breadcrumb, deep link

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('admin-nav-cards').getByRole('link')
Expected: 9
Received: 0
Timeout:  15000ms

Call log:
  - Expect "toHaveCount" with timeout 15000ms
  - waiting for getByTestId('admin-nav-cards').getByRole('link')
    19 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('admin-nav-cards').getByRole('link')
Expected: 9
Received: 0
Timeout:  15000ms

Call log:
  - Expect "toHaveCount" with timeout 15000ms
  - waiting for getByTestId('admin-nav-cards').getByRole('link')
    19 × locator resolved to 0 elements
       - unexpected value "0"


  103 |
  104 |     const cards = page.getByTestId("admin-nav-cards").getByRole("link");
> 105 |     await expect(cards).toHaveCount(expected.length, { timeout: 15000 });
      |                         ^
  106 |     // U0d (INC-070): each card is a real link carrying BOTH the section title
  107 |     // and its description — the landing theme, not a bare list.
```

Context:

```text
          - listitem [ref=e214]:
            - generic [ref=e215]: About
          - listitem [ref=e216]:
            - generic [ref=e217]: Contact
      - navigation "Help" [ref=e218]:
        - heading "Help" [level=2] [ref=e219]
        - list [ref=e220]:
          - listitem [ref=e221]:
            - generic [ref=e222]: Safety
      - navigation "Legal" [ref=e223]:
        - heading "Legal" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - link "Terms" [ref=e227] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e228]:
            - link "Privacy" [ref=e229] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e231]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-7 moderator fixture: two sections (All listings, audit), other deep links refused, admin tab still visible

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('admin-nav-cards').getByRole('link')
Expected: 2
Received: 0
Timeout:  15000ms

Call log:
  - Expect "toHaveCount" with timeout 15000ms
  - waiting for getByTestId('admin-nav-cards').getByRole('link')
    19 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('admin-nav-cards').getByRole('link')
Expected: 2
Received: 0
Timeout:  15000ms

Call log:
  - Expect "toHaveCount" with timeout 15000ms
  - waiting for getByTestId('admin-nav-cards').getByRole('link')
    19 × locator resolved to 0 elements
       - unexpected value "0"


  213 |     // Exactly TWO cards: All listings and Audit & Security.
  214 |     const cards = page.getByTestId("admin-nav-cards").getByRole("link");
> 215 |     await expect(cards).toHaveCount(mine.length, { timeout: 15000 });
      |                         ^
  216 |     for (const id of mine) {
  217 |       const section = ADMIN_SECTIONS.find((s) => s.id === id)!;
```

Context:

```text
          - listitem [ref=e136]:
            - generic [ref=e137]: About
          - listitem [ref=e138]:
            - generic [ref=e139]: Contact
      - navigation "Help" [ref=e140]:
        - heading "Help" [level=2] [ref=e141]
        - list [ref=e142]:
          - listitem [ref=e143]:
            - generic [ref=e144]: Safety
      - navigation "Legal" [ref=e145]:
        - heading "Legal" [level=2] [ref=e146]
        - list [ref=e147]:
          - listitem [ref=e148]:
            - link "Terms" [ref=e149] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e150]:
            - link "Privacy" [ref=e151] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e153]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-4 admin TAB from marketplace navigates to /admin (INC-071)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-landing')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-landing')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-landing')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-landing')


  266 |     await openPanel(page, "admin");
  267 |     await expect(page).toHaveURL(/\/admin$/);
> 268 |     await expect(page.getByTestId("admin-landing")).toBeVisible({ timeout: 15000 });
      |                                                     ^
  269 |     await expect(page.getByTestId("admin-nav-cards")).toBeVisible();
  270 |     await expect(page.getByText(en["shell.placeholderTitle"], { exact: true })).toHaveCount(0);
  271 |     await expect(page.getByText(en["shell.placeholderBody"], { exact: true })).toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:268:53
```

Context:

```text
          - listitem [ref=e214]:
            - generic [ref=e215]: About
          - listitem [ref=e216]:
            - generic [ref=e217]: Contact
      - navigation "Help" [ref=e218]:
        - heading "Help" [level=2] [ref=e219]
        - list [ref=e220]:
          - listitem [ref=e221]:
            - generic [ref=e222]: Safety
      - navigation "Legal" [ref=e223]:
        - heading "Legal" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - link "Terms" [ref=e227] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e228]:
            - link "Privacy" [ref=e229] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e231]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-section-categories')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-section-categories')


  309 |     await page.goto(visible[0]!.path);
  310 |     await waitForHydration(page);
> 311 |     await expect(page.getByTestId(`admin-section-${visible[0]!.id}`)).toBeVisible({
      |                                                                       ^
  312 |       timeout: 15000,
  313 |     });
  314 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:311:71
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › IN-1 sub-items indent when open and share one folded icon column

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-section-categories')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-section-categories')


  424 |     await signIn(page, staff.email, staff.password);
  425 |     await gotoReady(page, section.path);
> 426 |     await expect(page.getByTestId(`admin-section-${section.id}`)).toBeVisible();
      |                                                                   ^
  427 |     const iconBox = async (scope: import("@playwright/test").Locator, id: string) => {
  428 |       const icon = scope.getByTestId(id).locator("svg").nth(0);
  429 |       await expect(icon).toBeVisible();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:426:67
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-6 admin fixture: gated section nav, section page + breadcrumb, deep link

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('admin-nav-cards').getByRole('link')
Expected: 9
Received: 0
Timeout:  15000ms

Call log:
  - Expect "toHaveCount" with timeout 15000ms
  - waiting for getByTestId('admin-nav-cards').getByRole('link')
    19 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('admin-nav-cards').getByRole('link')
Expected: 9
Received: 0
Timeout:  15000ms

Call log:
  - Expect "toHaveCount" with timeout 15000ms
  - waiting for getByTestId('admin-nav-cards').getByRole('link')
    19 × locator resolved to 0 elements
       - unexpected value "0"


  103 |
  104 |     const cards = page.getByTestId("admin-nav-cards").getByRole("link");
> 105 |     await expect(cards).toHaveCount(expected.length, { timeout: 15000 });
      |                         ^
  106 |     // U0d (INC-070): each card is a real link carrying BOTH the section title
  107 |     // and its description — the landing theme, not a bare list.
```

Context:

```text
          - listitem [ref=e219]:
            - generic [ref=e220]: About
          - listitem [ref=e221]:
            - generic [ref=e222]: Contact
      - navigation "Help" [ref=e223]:
        - heading "Help" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - generic [ref=e227]: Safety
      - navigation "Legal" [ref=e228]:
        - heading "Legal" [level=2] [ref=e229]
        - list [ref=e230]:
          - listitem [ref=e231]:
            - link "Terms" [ref=e232] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e233]:
            - link "Privacy" [ref=e234] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e236]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-7 moderator fixture: two sections (All listings, audit), other deep links refused, admin tab still visible

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('admin-nav-cards').getByRole('link')
Expected: 2
Received: 0
Timeout:  15000ms

Call log:
  - Expect "toHaveCount" with timeout 15000ms
  - waiting for getByTestId('admin-nav-cards').getByRole('link')
    19 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('admin-nav-cards').getByRole('link')
Expected: 2
Received: 0
Timeout:  15000ms

Call log:
  - Expect "toHaveCount" with timeout 15000ms
  - waiting for getByTestId('admin-nav-cards').getByRole('link')
    19 × locator resolved to 0 elements
       - unexpected value "0"


  213 |     // Exactly TWO cards: All listings and Audit & Security.
  214 |     const cards = page.getByTestId("admin-nav-cards").getByRole("link");
> 215 |     await expect(cards).toHaveCount(mine.length, { timeout: 15000 });
      |                         ^
  216 |     for (const id of mine) {
  217 |       const section = ADMIN_SECTIONS.find((s) => s.id === id)!;
```

Context:

```text
          - listitem [ref=e179]:
            - generic [ref=e180]: About
          - listitem [ref=e181]:
            - generic [ref=e182]: Contact
      - navigation "Help" [ref=e183]:
        - heading "Help" [level=2] [ref=e184]
        - list [ref=e185]:
          - listitem [ref=e186]:
            - generic [ref=e187]: Safety
      - navigation "Legal" [ref=e188]:
        - heading "Legal" [level=2] [ref=e189]
        - list [ref=e190]:
          - listitem [ref=e191]:
            - link "Terms" [ref=e192] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e193]:
            - link "Privacy" [ref=e194] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e196]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-4 admin TAB from marketplace navigates to /admin (INC-071)

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-landing')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-landing')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-landing')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-landing')


  266 |     await openPanel(page, "admin");
  267 |     await expect(page).toHaveURL(/\/admin$/);
> 268 |     await expect(page.getByTestId("admin-landing")).toBeVisible({ timeout: 15000 });
      |                                                     ^
  269 |     await expect(page.getByTestId("admin-nav-cards")).toBeVisible();
  270 |     await expect(page.getByText(en["shell.placeholderTitle"], { exact: true })).toHaveCount(0);
  271 |     await expect(page.getByText(en["shell.placeholderBody"], { exact: true })).toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:268:53
```

Context:

```text
          - listitem [ref=e219]:
            - generic [ref=e220]: About
          - listitem [ref=e221]:
            - generic [ref=e222]: Contact
      - navigation "Help" [ref=e223]:
        - heading "Help" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - generic [ref=e227]: Safety
      - navigation "Legal" [ref=e228]:
        - heading "Legal" [level=2] [ref=e229]
        - list [ref=e230]:
          - listitem [ref=e231]:
            - link "Terms" [ref=e232] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e233]:
            - link "Privacy" [ref=e234] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e236]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-section-categories')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('admin-section-categories')


  309 |     await page.goto(visible[0]!.path);
  310 |     await waitForHydration(page);
> 311 |     await expect(page.getByTestId(`admin-section-${visible[0]!.id}`)).toBeVisible({
      |                                                                       ^
  312 |       timeout: 15000,
  313 |     });
  314 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:311:71
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › IN-1 sub-items indent when open and share one folded icon column

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-section-categories')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-categories')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-section-categories')


  424 |     await signIn(page, staff.email, staff.password);
  425 |     await gotoReady(page, section.path);
> 426 |     await expect(page.getByTestId(`admin-section-${section.id}`)).toBeVisible();
      |                                                                   ^
  427 |     const iconBox = async (scope: import("@playwright/test").Locator, id: string) => {
  428 |       const icon = scope.getByTestId(id).locator("svg").nth(0);
  429 |       await expect(icon).toBeVisible();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:426:67
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## shell-table-law.spec.ts › shell table law › admin tables never overflow horizontally

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('data-table-cards')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('data-table-cards')


  28 |     await page.setViewportSize({ width: 360, height: 740 });
  29 |     await gotoReady(page, "/admin/users");
> 30 |     await expect(page.getByTestId("data-table-cards")).toBeVisible({ timeout: 15000 });
     |                                                        ^
  31 |     await expect(page.locator("table")).toBeHidden();
  32 |     await expectFits(page);
  33 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell-table-law.spec.ts:30:56
```

Context:

```text
          - listitem [ref=e221]:
            - generic [ref=e222]: About
          - listitem [ref=e223]:
            - generic [ref=e224]: Contact
      - navigation "Help" [ref=e225]:
        - heading "Help" [level=2] [ref=e226]
        - list [ref=e227]:
          - listitem [ref=e228]:
            - generic [ref=e229]: Safety
      - navigation "Legal" [ref=e230]:
        - heading "Legal" [level=2] [ref=e231]
        - list [ref=e232]:
          - listitem [ref=e233]:
            - link "Terms" [ref=e234] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e235]:
            - link "Privacy" [ref=e236] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e238]: © 2026 ethio.com — All rights reserved.
```
```

## shell-table-law.spec.ts › shell table law › admin tables never overflow horizontally

- Source: `shard 2`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('data-table-cards')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('data-table-cards')


  28 |     await page.setViewportSize({ width: 360, height: 740 });
  29 |     await gotoReady(page, "/admin/users");
> 30 |     await expect(page.getByTestId("data-table-cards")).toBeVisible({ timeout: 15000 });
     |                                                        ^
  31 |     await expect(page.locator("table")).toBeHidden();
  32 |     await expectFits(page);
  33 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell-table-law.spec.ts:30:56
```

Context:

```text
          - listitem [ref=e221]:
            - generic [ref=e222]: About
          - listitem [ref=e223]:
            - generic [ref=e224]: Contact
      - navigation "Help" [ref=e225]:
        - heading "Help" [level=2] [ref=e226]
        - list [ref=e227]:
          - listitem [ref=e228]:
            - generic [ref=e229]: Safety
      - navigation "Legal" [ref=e230]:
        - heading "Legal" [level=2] [ref=e231]
        - list [ref=e232]:
          - listitem [ref=e233]:
            - link "Terms" [ref=e234] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e235]:
            - link "Privacy" [ref=e236] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e238]: © 2026 ethio.com — All rights reserved.
```
```

## admin-guides.spec.ts › Admin › the Guide on every block (P-1c, D313) › AG-6 a next whose section the signed-in person may not open leads to the admin landing: no refusal notice, no error, nothing written

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-listings')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-section-listings')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-listings')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-section-listings')


  286 |     await signIn(page, moderator.email, moderator.password);
  287 |     await gotoReady(page, "/admin/listings");
> 288 |     await expect(page.getByTestId(sectionFrame("listings"))).toBeVisible({ timeout: 20000 });
      |                                                              ^
  289 |     const sheet = await openGuide(page, LISTINGS);
  290 |     const next = sheet.getByTestId(`${LISTINGS}-guide-next`);
  291 |     await expect(next).toHaveText(en["admin.listings.guide.next"]);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-guides.spec.ts:288:62
```

Context:

```text
          - listitem [ref=e150]:
            - generic [ref=e151]: About
          - listitem [ref=e152]:
            - generic [ref=e153]: Contact
      - navigation "Help" [ref=e154]:
        - heading "Help" [level=2] [ref=e155]
        - list [ref=e156]:
          - listitem [ref=e157]:
            - generic [ref=e158]: Safety
      - navigation "Legal" [ref=e159]:
        - heading "Legal" [level=2] [ref=e160]
        - list [ref=e161]:
          - listitem [ref=e162]:
            - link "Terms" [ref=e163] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e164]:
            - link "Privacy" [ref=e165] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e167]: © 2026 ethio.com — All rights reserved.
```
```

## admin-guides.spec.ts › Admin › the Guide on every block (P-1c, D313) › AG-6 a next whose section the signed-in person may not open leads to the admin landing: no refusal notice, no error, nothing written

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-listings')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-section-listings')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-listings')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-section-listings')


  286 |     await signIn(page, moderator.email, moderator.password);
  287 |     await gotoReady(page, "/admin/listings");
> 288 |     await expect(page.getByTestId(sectionFrame("listings"))).toBeVisible({ timeout: 20000 });
      |                                                              ^
  289 |     const sheet = await openGuide(page, LISTINGS);
  290 |     const next = sheet.getByTestId(`${LISTINGS}-guide-next`);
  291 |     await expect(next).toHaveText(en["admin.listings.guide.next"]);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-guides.spec.ts:288:62
```

Context:

```text
          - listitem [ref=e193]:
            - generic [ref=e194]: About
          - listitem [ref=e195]:
            - generic [ref=e196]: Contact
      - navigation "Help" [ref=e197]:
        - heading "Help" [level=2] [ref=e198]
        - list [ref=e199]:
          - listitem [ref=e200]:
            - generic [ref=e201]: Safety
      - navigation "Legal" [ref=e202]:
        - heading "Legal" [level=2] [ref=e203]
        - list [ref=e204]:
          - listitem [ref=e205]:
            - link "Terms" [ref=e206] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e207]:
            - link "Privacy" [ref=e208] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e210]: © 2026 ethio.com — All rights reserved.
```
```

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  242 |     await setAccountLanguage(page, staff.id, "am");
  243 |     await gotoReady(page, `/admin/roles/${role.id}`);
> 244 |     await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
      |                                                        ^
  245 |
  246 |     const labels = await textsWithin(page, [
  247 |       '[data-testid^="role-resource-heading-"]',
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/i18n-coverage.spec.ts:244:56
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: ስለ እኛ
          - listitem [ref=e230]:
            - generic [ref=e231]: ያግኙን
      - navigation "እገዛ" [ref=e232]:
        - heading "እገዛ" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: ደህንነት
      - navigation "ሕጋዊ" [ref=e237]:
        - heading "ሕጋዊ" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "ውሎች" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "ግላዊነት" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('role-permissions')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('role-permissions')


  242 |     await setAccountLanguage(page, staff.id, "am");
  243 |     await gotoReady(page, `/admin/roles/${role.id}`);
> 244 |     await expect(page.getByTestId("role-permissions")).toBeVisible({ timeout: 20000 });
      |                                                        ^
  245 |
  246 |     const labels = await textsWithin(page, [
  247 |       '[data-testid^="role-resource-heading-"]',
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/i18n-coverage.spec.ts:244:56
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: ስለ እኛ
          - listitem [ref=e235]:
            - generic [ref=e236]: ያግኙን
      - navigation "እገዛ" [ref=e237]:
        - heading "እገዛ" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: ደህንነት
      - navigation "ሕጋዊ" [ref=e242]:
        - heading "ሕጋዊ" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "ውሎች" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "ግላዊነት" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('country-search')

[country-dump] at /admin/countries: section false, loading false, error false, step-up false
[country-dump] main: Two-factor authentication neededStaff screens open only for an account with two-factor authentication. Set it up in Settings, then come back.Set it up
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('country-search')

[country-dump] at /admin/countries: section false, loading false, error false, step-up false
[country-dump] main: Two-factor authentication neededStaff screens open only for an account with two-factor authentication. Set it up in Settings, then come back.Set it up

   at helpers/countries.ts:164

  162 |   } catch (error) {
  163 |     const reason = errorText(error);
> 164 |     throw new Error(`${reason}\n${await rosterDump(page)}`);
      |           ^
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('country-search')

[country-dump] at /admin/countries: section false, loading false, error false, step-up false
[country-dump] main: Two-factor authentication neededStaff screens open only for an account with two-factor authentication. Set it up in Settings, then come back.Set it up
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('country-search')

[country-dump] at /admin/countries: section false, loading false, error false, step-up false
[country-dump] main: Two-factor authentication neededStaff screens open only for an account with two-factor authentication. Set it up in Settings, then come back.Set it up

   at helpers/countries.ts:164

  162 |   } catch (error) {
  163 |     const reason = errorText(error);
> 164 |     throw new Error(`${reason}\n${await rosterDump(page)}`);
      |           ^
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')


   at helpers/locations.ts:123

  121 | export async function selectMarket(page: Page, code: string) {
  122 |   const picker = page.getByTestId("location-country-filter");
> 123 |   await expect(picker).toBeVisible({ timeout: 20000 });
      |                        ^
  124 |   await picker.selectOption(code);
  125 | }
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')


   at helpers/locations.ts:123

  121 | export async function selectMarket(page: Page, code: string) {
  122 |   const picker = page.getByTestId("location-country-filter");
> 123 |   await expect(picker).toBeVisible({ timeout: 20000 });
      |                        ^
  124 |   await picker.selectOption(code);
  125 | }
```

Context:

```text
          - listitem [ref=e290]:
            - generic [ref=e291]: About
          - listitem [ref=e292]:
            - generic [ref=e293]: Contact
      - navigation "Help" [ref=e294]:
        - heading "Help" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - generic [ref=e298]: Safety
      - navigation "Legal" [ref=e299]:
        - heading "Legal" [level=2] [ref=e300]
        - list [ref=e301]:
          - listitem [ref=e302]:
            - link "Terms" [ref=e303] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e304]:
            - link "Privacy" [ref=e305] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e307]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')


   at helpers/locations.ts:123

  121 | export async function selectMarket(page: Page, code: string) {
  122 |   const picker = page.getByTestId("location-country-filter");
> 123 |   await expect(picker).toBeVisible({ timeout: 20000 });
      |                        ^
  124 |   await picker.selectOption(code);
  125 | }
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('location-country-filter')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('location-country-filter')


   at helpers/locations.ts:123

  121 | export async function selectMarket(page: Page, code: string) {
  122 |   const picker = page.getByTestId("location-country-filter");
> 123 |   await expect(picker).toBeVisible({ timeout: 20000 });
      |                        ^
  124 |   await picker.selectOption(code);
  125 | }
```

Context:

```text
          - listitem [ref=e270]:
            - generic [ref=e271]: About
          - listitem [ref=e272]:
            - generic [ref=e273]: Contact
      - navigation "Help" [ref=e274]:
        - heading "Help" [level=2] [ref=e275]
        - list [ref=e276]:
          - listitem [ref=e277]:
            - generic [ref=e278]: Safety
      - navigation "Legal" [ref=e279]:
        - heading "Legal" [level=2] [ref=e280]
        - list [ref=e281]:
          - listitem [ref=e282]:
            - link "Terms" [ref=e283] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e284]:
            - link "Privacy" [ref=e285] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e287]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


  117 |     await switchUser(page, admin.email, admin.password);
  118 |     await gotoReady(page, "/admin/categories");
> 119 |     await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      |                                                       ^
  120 |   });
  121 |
  122 |   test("CT-2 roster: the ratified tree renders, search narrows it, nothing overflows", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:119:55
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-2 roster: the ratified tree renders, search narrows it, nothing overflows

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


   at helpers/categories.ts:171

  169 |  */
  170 | export async function anchorRealRow(page: Page, slug: string): Promise<Locator> {
> 171 |   await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      |                                                     ^
  172 |   await page.getByTestId("category-search").fill(slug);
  173 |   const row = categoryRow(page, slug);
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 7`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('category-search')


   at helpers/categories.ts:97

   95 |  */
   96 | export async function findRow(page: Page, slug: string, createdAt?: number): Promise<Locator> {
>  97 |   await page.getByTestId("category-search").fill(slug);
      |                                             ^
   98 |   const row = categoryRow(page, slug);
   99 |   try {
  100 |     await expect(row).toBeVisible({ timeout: 20000 });
    at findRow (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/categories.ts:97:45)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:505:13
```

Context:

```text
          - listitem [ref=e290]:
            - generic [ref=e291]: About
          - listitem [ref=e292]:
            - generic [ref=e293]: Contact
      - navigation "Help" [ref=e294]:
        - heading "Help" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - generic [ref=e298]: Safety
      - navigation "Legal" [ref=e299]:
        - heading "Legal" [level=2] [ref=e300]
        - list [ref=e301]:
          - listitem [ref=e302]:
            - link "Terms" [ref=e303] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e304]:
            - link "Privacy" [ref=e305] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e307]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-9b roster shape: the parent line and pagination inside cards

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


   at helpers/categories.ts:171

  169 |  */
  170 | export async function anchorRealRow(page: Page, slug: string): Promise<Locator> {
> 171 |   await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      |                                                     ^
  172 |   await page.getByTestId("category-search").fill(slug);
  173 |   const row = categoryRow(page, slug);
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-11 roster controls: missing-assets filter (in Filters, as a chip) and a device page size (in the footer)

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


   at helpers/categories.ts:171

  169 |  */
  170 | export async function anchorRealRow(page: Page, slug: string): Promise<Locator> {
> 171 |   await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      |                                                     ^
  172 |   await page.getByTestId("category-search").fill(slug);
  173 |   const row = categoryRow(page, slug);
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-29 every ratified category renders its own glyph, not the fallback

- Source: `shard 7`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('category-pagination-size')


  798 |
  799 |     // The rendered truth, read one page at a time (J7: assert what rendered).
> 800 |     await page.getByTestId("category-pagination-size").selectOption("100");
      |                                                        ^
  801 |     const rendered = new Map<string, string>();
  802 |     for (let guardPage = 0; guardPage < 12; guardPage += 1) {
  803 |       await expect
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:800:56
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


  117 |     await switchUser(page, admin.email, admin.password);
  118 |     await gotoReady(page, "/admin/categories");
> 119 |     await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      |                                                       ^
  120 |   });
  121 |
  122 |   test("CT-2 roster: the ratified tree renders, search narrows it, nothing overflows", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:119:55
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-2 roster: the ratified tree renders, search narrows it, nothing overflows

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


   at helpers/categories.ts:171

  169 |  */
  170 | export async function anchorRealRow(page: Page, slug: string): Promise<Locator> {
> 171 |   await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      |                                                     ^
  172 |   await page.getByTestId("category-search").fill(slug);
  173 |   const row = categoryRow(page, slug);
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 7`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('category-search')


   at helpers/categories.ts:97

   95 |  */
   96 | export async function findRow(page: Page, slug: string, createdAt?: number): Promise<Locator> {
>  97 |   await page.getByTestId("category-search").fill(slug);
      |                                             ^
   98 |   const row = categoryRow(page, slug);
   99 |   try {
  100 |     await expect(row).toBeVisible({ timeout: 20000 });
    at findRow (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/categories.ts:97:45)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:505:13
```

Context:

```text
          - listitem [ref=e270]:
            - generic [ref=e271]: About
          - listitem [ref=e272]:
            - generic [ref=e273]: Contact
      - navigation "Help" [ref=e274]:
        - heading "Help" [level=2] [ref=e275]
        - list [ref=e276]:
          - listitem [ref=e277]:
            - generic [ref=e278]: Safety
      - navigation "Legal" [ref=e279]:
        - heading "Legal" [level=2] [ref=e280]
        - list [ref=e281]:
          - listitem [ref=e282]:
            - link "Terms" [ref=e283] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e284]:
            - link "Privacy" [ref=e285] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e287]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-9a roster shape: the parent column and a 25-row page (table twin)

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


   at helpers/categories.ts:171

  169 |  */
  170 | export async function anchorRealRow(page: Page, slug: string): Promise<Locator> {
> 171 |   await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      |                                                     ^
  172 |   await page.getByTestId("category-search").fill(slug);
  173 |   const row = categoryRow(page, slug);
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-11 roster controls: missing-assets filter (in Filters, as a chip) and a device page size (in the footer)

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


   at helpers/categories.ts:171

  169 |  */
  170 | export async function anchorRealRow(page: Page, slug: string): Promise<Locator> {
> 171 |   await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      |                                                     ^
  172 |   await page.getByTestId("category-search").fill(slug);
  173 |   const row = categoryRow(page, slug);
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-29 every ratified category renders its own glyph, not the fallback

- Source: `shard 7`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('category-pagination-size')


  798 |
  799 |     // The rendered truth, read one page at a time (J7: assert what rendered).
> 800 |     await page.getByTestId("category-pagination-size").selectOption("100");
      |                                                        ^
  801 |     const rendered = new Map<string, string>();
  802 |     for (let guardPage = 0; guardPage < 12; guardPage += 1) {
  803 |       await expect
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:800:56
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-1 Legal cards, facts and the permission-gated admin menu

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-access-notice')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-access-notice')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-access-notice')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-access-notice')


  297 |     await switchUser(page, admin.email, admin.password);
  298 |     await gotoReady(page, "/admin/legal");
> 299 |     await expect(page.getByTestId("admin-access-notice")).toBeVisible();
      |                                                           ^
  300 |     await expect(page.locator('a[href="/admin/legal"]')).toHaveCount(0);
  301 |   });
  302 |   test("LGA-2 bilingual draft round trip, preview and first-version publishing", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:299:59
```

Context:

```text
          - listitem [ref=e214]:
            - generic [ref=e215]: About
          - listitem [ref=e216]:
            - generic [ref=e217]: Contact
      - navigation "Help" [ref=e218]:
        - heading "Help" [level=2] [ref=e219]
        - list [ref=e220]:
          - listitem [ref=e221]:
            - generic [ref=e222]: Safety
      - navigation "Legal" [ref=e223]:
        - heading "Legal" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - link "Terms" [ref=e227] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e228]:
            - link "Privacy" [ref=e229] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e231]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-localx7-q6drw-7-m-card-global').getByTestId('legal-view-inforce')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-localx7-q6drw-7-m-card-global').getByTestId('legal-view-inforce')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-localx7-q6drw-7-m-card-global').getByTestId('legal-view-inforce')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-localx7-q6drw-7-m-card-global').getByTestId('legal-view-inforce')


  1038 |       await gotoReady(page, "/admin/legal");
  1039 |       const card = page.getByTestId(`legal-doc-${kind}-global`);
> 1040 |       await expect(card.getByTestId("legal-view-inforce")).toBeVisible();
       |                                                            ^
  1041 |       const languageRow = await supabase
  1042 |         .from("languages")
  1043 |         .select("name_en")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:1040:60
```

Context:

```text
          - listitem [ref=e128]:
            - generic [ref=e129]: About
          - listitem [ref=e130]:
            - generic [ref=e131]: Contact
      - navigation "Help" [ref=e132]:
        - heading "Help" [level=2] [ref=e133]
        - list [ref=e134]:
          - listitem [ref=e135]:
            - generic [ref=e136]: Safety
      - navigation "Legal" [ref=e137]:
        - heading "Legal" [level=2] [ref=e138]
        - list [ref=e139]:
          - listitem [ref=e140]:
            - link "Terms" [ref=e141] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e142]:
            - link "Privacy" [ref=e143] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e145]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-1 Legal cards, facts and the permission-gated admin menu

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-access-notice')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-access-notice')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-access-notice')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-access-notice')


  297 |     await switchUser(page, admin.email, admin.password);
  298 |     await gotoReady(page, "/admin/legal");
> 299 |     await expect(page.getByTestId("admin-access-notice")).toBeVisible();
      |                                                           ^
  300 |     await expect(page.locator('a[href="/admin/legal"]')).toHaveCount(0);
  301 |   });
  302 |   test("LGA-2 bilingual draft round trip, preview and first-version publishing", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:299:59
```

Context:

```text
          - listitem [ref=e219]:
            - generic [ref=e220]: About
          - listitem [ref=e221]:
            - generic [ref=e222]: Contact
      - navigation "Help" [ref=e223]:
        - heading "Help" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - generic [ref=e227]: Safety
      - navigation "Legal" [ref=e228]:
        - heading "Legal" [level=2] [ref=e229]
        - list [ref=e230]:
          - listitem [ref=e231]:
            - link "Terms" [ref=e232] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e233]:
            - link "Privacy" [ref=e234] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e236]: © 2026 ethio.com — All rights reserved.
```
```

## legal-admin.spec.ts › Admin Legal › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-localx7-ghmyy-31-d-card-global').getByTestId('legal-view-inforce')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-localx7-ghmyy-31-d-card-global').getByTestId('legal-view-inforce')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('legal-doc-e2e-al-localx7-ghmyy-31-d-card-global').getByTestId('legal-view-inforce')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('legal-doc-e2e-al-localx7-ghmyy-31-d-card-global').getByTestId('legal-view-inforce')


  1038 |       await gotoReady(page, "/admin/legal");
  1039 |       const card = page.getByTestId(`legal-doc-${kind}-global`);
> 1040 |       await expect(card.getByTestId("legal-view-inforce")).toBeVisible();
       |                                                            ^
  1041 |       const languageRow = await supabase
  1042 |         .from("languages")
  1043 |         .select("name_en")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:1040:60
```

Context:

```text
          - listitem [ref=e176]:
            - generic [ref=e177]: About
          - listitem [ref=e178]:
            - generic [ref=e179]: Contact
      - navigation "Help" [ref=e180]:
        - heading "Help" [level=2] [ref=e181]
        - list [ref=e182]:
          - listitem [ref=e183]:
            - generic [ref=e184]: Safety
      - navigation "Legal" [ref=e185]:
        - heading "Legal" [level=2] [ref=e186]
        - list [ref=e187]:
          - listitem [ref=e188]:
            - link "Terms" [ref=e189] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e190]:
            - link "Privacy" [ref=e191] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e193]: © 2026 ethio.com — All rights reserved.
```
```

## rbac.spec.ts › RBAC client seam › R-8 staff user: Admin tab appears and /admin renders

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Admin' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('heading', { name: 'Admin' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Admin' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('heading', { name: 'Admin' })


  54 |     await waitForHydration(page);
  55 |     await expect(page.getByTestId("admin-panel-root")).toBeVisible({ timeout: 15000 });
> 56 |     await expect(page.getByRole("heading", { name: en["admin.title"] })).toBeVisible();
     |                                                                          ^
  57 |   });
  58 | });
  59 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/rbac.spec.ts:56:74
```

Context:

```text
          - listitem [ref=e214]:
            - generic [ref=e215]: About
          - listitem [ref=e216]:
            - generic [ref=e217]: Contact
      - navigation "Help" [ref=e218]:
        - heading "Help" [level=2] [ref=e219]
        - list [ref=e220]:
          - listitem [ref=e221]:
            - generic [ref=e222]: Safety
      - navigation "Legal" [ref=e223]:
        - heading "Legal" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - link "Terms" [ref=e227] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e228]:
            - link "Privacy" [ref=e229] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e231]: © 2026 ethio.com — All rights reserved.
```
```

## rbac.spec.ts › RBAC client seam › R-8 staff user: Admin tab appears and /admin renders

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Admin' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('heading', { name: 'Admin' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Admin' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('heading', { name: 'Admin' })


  54 |     await waitForHydration(page);
  55 |     await expect(page.getByTestId("admin-panel-root")).toBeVisible({ timeout: 15000 });
> 56 |     await expect(page.getByRole("heading", { name: en["admin.title"] })).toBeVisible();
     |                                                                          ^
  57 |   });
  58 | });
  59 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/rbac.spec.ts:56:74
```

Context:

```text
          - listitem [ref=e219]:
            - generic [ref=e220]: About
          - listitem [ref=e221]:
            - generic [ref=e222]: Contact
      - navigation "Help" [ref=e223]:
        - heading "Help" [level=2] [ref=e224]
        - list [ref=e225]:
          - listitem [ref=e226]:
            - generic [ref=e227]: Safety
      - navigation "Legal" [ref=e228]:
        - heading "Legal" [level=2] [ref=e229]
        - list [ref=e230]:
          - listitem [ref=e231]:
            - link "Terms" [ref=e232] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e233]:
            - link "Privacy" [ref=e234] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e236]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-import.spec.ts › C3 attributes console › AT-23 a categories:view-only operator sees no import control and is refused

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-search')


  1210 |       await switchUser(page, viewer.email, viewer.password);
  1211 |       await gotoReady(page, "/admin/attributes");
> 1212 |       await expect(page.getByTestId("attribute-search")).toBeVisible({ timeout: 20000 });
       |                                                          ^
  1213 |       await expect(page.getByTestId("attribute-import")).toHaveCount(0);
  1214 |
  1215 |       const token = await bearerOf(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-import.spec.ts:1212:58
```

Context:

```text
          - listitem [ref=e160]:
            - generic [ref=e161]: About
          - listitem [ref=e162]:
            - generic [ref=e163]: Contact
      - navigation "Help" [ref=e164]:
        - heading "Help" [level=2] [ref=e165]
        - list [ref=e166]:
          - listitem [ref=e167]:
            - generic [ref=e168]: Safety
      - navigation "Legal" [ref=e169]:
        - heading "Legal" [level=2] [ref=e170]
        - list [ref=e171]:
          - listitem [ref=e172]:
            - link "Terms" [ref=e173] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e174]:
            - link "Privacy" [ref=e175] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e177]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-import.spec.ts › C3 attributes console › AT-23 a categories:view-only operator sees no import control and is refused

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-search')


  1210 |       await switchUser(page, viewer.email, viewer.password);
  1211 |       await gotoReady(page, "/admin/attributes");
> 1212 |       await expect(page.getByTestId("attribute-search")).toBeVisible({ timeout: 20000 });
       |                                                          ^
  1213 |       await expect(page.getByTestId("attribute-import")).toHaveCount(0);
  1214 |
  1215 |       const token = await bearerOf(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-import.spec.ts:1212:58
```

Context:

```text
          - listitem [ref=e184]:
            - generic [ref=e185]: About
          - listitem [ref=e186]:
            - generic [ref=e187]: Contact
      - navigation "Help" [ref=e188]:
        - heading "Help" [level=2] [ref=e189]
        - list [ref=e190]:
          - listitem [ref=e191]:
            - generic [ref=e192]: Safety
      - navigation "Legal" [ref=e193]:
        - heading "Legal" [level=2] [ref=e194]
        - list [ref=e195]:
          - listitem [ref=e196]:
            - link "Terms" [ref=e197] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e198]:
            - link "Privacy" [ref=e199] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e201]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts

- Source: `shard 8`
- Project: `mobile-360`

```text
Test timeout of 120000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByTestId('translations-sync-run')


  333 |
  334 |       const syncRoute = watchRoute(page, "admin_sync_ui_keys");
> 335 |       await page.getByTestId("translations-sync-run").click();
      |                                                       ^
  336 |       // The gate must actually ask — that is the path under test.
  337 |       await stepUpIfPrompted(page, secret);
  338 |       const syncResult = await syncRoute;
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:335:55
```

Context:

```text
          - listitem [ref=e289]:
            - generic [ref=e290]: About
          - listitem [ref=e291]:
            - generic [ref=e292]: Contact
      - navigation "Help" [ref=e293]:
        - heading "Help" [level=2] [ref=e294]
        - list [ref=e295]:
          - listitem [ref=e296]:
            - generic [ref=e297]: Safety
      - navigation "Legal" [ref=e298]:
        - heading "Legal" [level=2] [ref=e299]
        - list [ref=e300]:
          - listitem [ref=e301]:
            - link "Terms" [ref=e302] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e303]:
            - link "Privacy" [ref=e304] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e306]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByTestId('translations-sync-run')


  333 |
  334 |       const syncRoute = watchRoute(page, "admin_sync_ui_keys");
> 335 |       await page.getByTestId("translations-sync-run").click();
      |                                                       ^
  336 |       // The gate must actually ask — that is the path under test.
  337 |       await stepUpIfPrompted(page, secret);
  338 |       const syncResult = await syncRoute;
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:335:55
```

Context:

```text
          - listitem [ref=e269]:
            - generic [ref=e270]: About
          - listitem [ref=e271]:
            - generic [ref=e272]: Contact
      - navigation "Help" [ref=e273]:
        - heading "Help" [level=2] [ref=e274]
        - list [ref=e275]:
          - listitem [ref=e276]:
            - generic [ref=e277]: Safety
      - navigation "Legal" [ref=e278]:
        - heading "Legal" [level=2] [ref=e279]
        - list [ref=e280]:
          - listitem [ref=e281]:
            - link "Terms" [ref=e282] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e283]:
            - link "Privacy" [ref=e284] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e286]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-audit')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-audit')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-audit')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-audit')


  57 |     await switchUser(page, moderator.email, moderator.password);
  58 |     await gotoReady(page, "/admin/audit");
> 59 |     await expect(page.getByTestId("admin-audit")).toBeVisible();
     |                                                   ^
  60 |     await expect(page.getByTestId("audit-stats")).toBeVisible();
  61 |     await expect(page.getByTestId("audit-chart")).toBeVisible();
  62 |     // G3b (INC-547) — the chart is drawn once its data arrives (the frame
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:59:51
```

Context:

```text
          - listitem [ref=e143]:
            - generic [ref=e144]: About
          - listitem [ref=e145]:
            - generic [ref=e146]: Contact
      - navigation "Help" [ref=e147]:
        - heading "Help" [level=2] [ref=e148]
        - list [ref=e149]:
          - listitem [ref=e150]:
            - generic [ref=e151]: Safety
      - navigation "Legal" [ref=e152]:
        - heading "Legal" [level=2] [ref=e153]
        - list [ref=e154]:
          - listitem [ref=e155]:
            - link "Terms" [ref=e156] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e157]:
            - link "Privacy" [ref=e158] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e160]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › AS-3 the log on the agreed blocks: heading, toolbar, Filters with pills and dates, Columns, page size

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('audit-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('audit-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('audit-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('audit-search')


  118 |     await switchUser(page, moderator.email, moderator.password);
  119 |     await gotoReady(page, "/admin/audit");
> 120 |     await expect(page.getByTestId("audit-search")).toBeVisible({ timeout: 20000 });
      |                                                    ^
  121 |
  122 |     const header = page.getByTestId("audit-header");
  123 |     await expect(header.getByRole("heading", { level: 1 })).toHaveText(en["admin.audit.title"]);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:120:52
```

Context:

```text
          - listitem [ref=e143]:
            - generic [ref=e144]: About
          - listitem [ref=e145]:
            - generic [ref=e146]: Contact
      - navigation "Help" [ref=e147]:
        - heading "Help" [level=2] [ref=e148]
        - list [ref=e149]:
          - listitem [ref=e150]:
            - generic [ref=e151]: Safety
      - navigation "Legal" [ref=e152]:
        - heading "Legal" [level=2] [ref=e153]
        - list [ref=e154]:
          - listitem [ref=e155]:
            - link "Terms" [ref=e156] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e157]:
            - link "Privacy" [ref=e158] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e160]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-audit')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-audit')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-audit')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-audit')


  57 |     await switchUser(page, moderator.email, moderator.password);
  58 |     await gotoReady(page, "/admin/audit");
> 59 |     await expect(page.getByTestId("admin-audit")).toBeVisible();
     |                                                   ^
  60 |     await expect(page.getByTestId("audit-stats")).toBeVisible();
  61 |     await expect(page.getByTestId("audit-chart")).toBeVisible();
  62 |     // G3b (INC-547) — the chart is drawn once its data arrives (the frame
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:59:51
```

Context:

```text
          - listitem [ref=e186]:
            - generic [ref=e187]: About
          - listitem [ref=e188]:
            - generic [ref=e189]: Contact
      - navigation "Help" [ref=e190]:
        - heading "Help" [level=2] [ref=e191]
        - list [ref=e192]:
          - listitem [ref=e193]:
            - generic [ref=e194]: Safety
      - navigation "Legal" [ref=e195]:
        - heading "Legal" [level=2] [ref=e196]
        - list [ref=e197]:
          - listitem [ref=e198]:
            - link "Terms" [ref=e199] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e200]:
            - link "Privacy" [ref=e201] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e203]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › AS-3 the log on the agreed blocks: heading, toolbar, Filters with pills and dates, Columns, page size

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('audit-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('audit-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('audit-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('audit-search')


  118 |     await switchUser(page, moderator.email, moderator.password);
  119 |     await gotoReady(page, "/admin/audit");
> 120 |     await expect(page.getByTestId("audit-search")).toBeVisible({ timeout: 20000 });
      |                                                    ^
  121 |
  122 |     const header = page.getByTestId("audit-header");
  123 |     await expect(header.getByRole("heading", { level: 1 })).toHaveText(en["admin.audit.title"]);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:120:52
```

Context:

```text
          - listitem [ref=e186]:
            - generic [ref=e187]: About
          - listitem [ref=e188]:
            - generic [ref=e189]: Contact
      - navigation "Help" [ref=e190]:
        - heading "Help" [level=2] [ref=e191]
        - list [ref=e192]:
          - listitem [ref=e193]:
            - generic [ref=e194]: Safety
      - navigation "Legal" [ref=e195]:
        - heading "Legal" [level=2] [ref=e196]
        - list [ref=e197]:
          - listitem [ref=e198]:
            - link "Terms" [ref=e199] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e200]:
            - link "Privacy" [ref=e201] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e203]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-roles')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-section-roles')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-roles')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-section-roles')


  149 |     await switchUser(page, admin.email, admin.password);
  150 |     await gotoReady(page, "/admin/roles");
> 151 |     await expect(page.getByTestId("admin-section-roles")).toBeVisible();
      |                                                           ^
  152 |     await expect(roleRow(page, "admin")).toBeVisible();
  153 |     await expect(roleRow(page, "super_admin")).toBeVisible();
  154 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:151:59
```

Context:

```text
          - listitem [ref=e221]:
            - generic [ref=e222]: About
          - listitem [ref=e223]:
            - generic [ref=e224]: Contact
      - navigation "Help" [ref=e225]:
        - heading "Help" [level=2] [ref=e226]
        - list [ref=e227]:
          - listitem [ref=e228]:
            - generic [ref=e229]: Safety
      - navigation "Legal" [ref=e230]:
        - heading "Legal" [level=2] [ref=e231]
        - list [ref=e232]:
          - listitem [ref=e233]:
            - link "Terms" [ref=e234] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e235]:
            - link "Privacy" [ref=e236] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e238]: © 2026 ethio.com — All rights reserved.
```
```

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-roles')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-section-roles')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-section-roles')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('admin-section-roles')


  149 |     await switchUser(page, admin.email, admin.password);
  150 |     await gotoReady(page, "/admin/roles");
> 151 |     await expect(page.getByTestId("admin-section-roles")).toBeVisible();
      |                                                           ^
  152 |     await expect(roleRow(page, "admin")).toBeVisible();
  153 |     await expect(roleRow(page, "super_admin")).toBeVisible();
  154 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:151:59
```

Context:

```text
          - listitem [ref=e226]:
            - generic [ref=e227]: About
          - listitem [ref=e228]:
            - generic [ref=e229]: Contact
      - navigation "Help" [ref=e230]:
        - heading "Help" [level=2] [ref=e231]
        - list [ref=e232]:
          - listitem [ref=e233]:
            - generic [ref=e234]: Safety
      - navigation "Legal" [ref=e235]:
        - heading "Legal" [level=2] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - link "Terms" [ref=e239] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e240]:
            - link "Privacy" [ref=e241] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e243]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-11 All listings page with listings:view and no other listing right: the public name, never the e-mail, no moves

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-search')


  830 |     await signInViaSession(page, viewer.email, viewer.password);
  831 |     await gotoReady(page, "/admin/listings");
> 832 |     await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
      |                                                       ^
  833 |     await page.getByTestId("listings-search").fill(live.id);
  834 |     await expect(listingRow(page, live.id)).toBeVisible({ timeout: 20000 });
  835 |     await expect(listingRow(page, live.id)).toContainText(seller.alias);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:832:55
```

Context:

```text
          - listitem [ref=e142]:
            - generic [ref=e143]: About
          - listitem [ref=e144]:
            - generic [ref=e145]: Contact
      - navigation "Help" [ref=e146]:
        - heading "Help" [level=2] [ref=e147]
        - list [ref=e148]:
          - listitem [ref=e149]:
            - generic [ref=e150]: Safety
      - navigation "Legal" [ref=e151]:
        - heading "Legal" [level=2] [ref=e152]
        - list [ref=e153]:
          - listitem [ref=e154]:
            - link "Terms" [ref=e155] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e156]:
            - link "Privacy" [ref=e157] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e159]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('listing-title')
Expected: "E2E admin listing local-xx ifixcdar"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-title')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('listing-title')
Expected: "E2E admin listing local-xx ifixcdar"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-title')


  1257 |     await signInViaSession(page, viewer.email, viewer.password);
  1258 |     await gotoReady(page, `/admin/listings/${live.id}`);
> 1259 |     await expect(page.getByTestId("listing-title")).toHaveText(live.title, { timeout: 20000 });
       |                                                     ^
  1260 |     await expect(page.getByTestId("listing-fact-seller")).toContainText(seller.alias);
  1261 |     await expect(page.getByTestId("admin-listing-detail")).not.toContainText(seller.email);
  1262 |     await expect(page.getByTestId("listing-open-seller")).toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1259:53
```

Context:

```text
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: Contact
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
      - navigation "Legal" [ref=e158]:
        - heading "Legal" [level=2] [ref=e159]
        - list [ref=e160]:
          - listitem [ref=e161]:
            - link "Terms" [ref=e162] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e163]:
            - link "Privacy" [ref=e164] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e166]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-30 Settings in All listings: the renew settings as stored, Cancel changes nothing, a day count outside 1 to 365 is refused before any call; no Settings without listings:enforce (D174 3, D175 2)

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-header').getByTestId('listings-settings')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-header').getByTestId('listings-settings')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-header').getByTestId('listings-settings')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-header').getByTestId('listings-settings')


  2036 |     await gotoReady(page, "/admin/listings");
  2037 |     const open = page.getByTestId("listings-header").getByTestId("listings-settings");
> 2038 |     await expect(open).toBeVisible({ timeout: 20000 });
       |                        ^
  2039 |     await open.click();
  2040 |     const dialog = page.getByTestId("listings-settings-dialog");
  2041 |     const renew = dialog.getByTestId("listings-settings-renew");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2038:24
```

Context:

```text
          - listitem [ref=e142]:
            - generic [ref=e143]: About
          - listitem [ref=e144]:
            - generic [ref=e145]: Contact
      - navigation "Help" [ref=e146]:
        - heading "Help" [level=2] [ref=e147]
        - list [ref=e148]:
          - listitem [ref=e149]:
            - generic [ref=e150]: Safety
      - navigation "Legal" [ref=e151]:
        - heading "Legal" [level=2] [ref=e152]
        - list [ref=e153]:
          - listitem [ref=e154]:
            - link "Terms" [ref=e155] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e156]:
            - link "Privacy" [ref=e157] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e159]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone

- Source: `shard 10`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('listings-search')


  2128 |     ]);
  2129 |     await gotoReady(page, "/admin/listings");
> 2130 |     await page.getByTestId("listings-search").fill(ad.id);
       |                                               ^
  2131 |     const row = listingRow(page, ad.id);
  2132 |     await expect(row).toBeVisible();
  2133 |     await expect(row.getByTestId(`listing-row-${ad.id}-reports`)).toHaveText("Reports: 2");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2130:47
```

Context:

```text
          - listitem [ref=e151]:
            - generic [ref=e152]: About
          - listitem [ref=e153]:
            - generic [ref=e154]: Contact
      - navigation "Help" [ref=e155]:
        - heading "Help" [level=2] [ref=e156]
        - list [ref=e157]:
          - listitem [ref=e158]:
            - generic [ref=e159]: Safety
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - link "Terms" [ref=e164] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e165]:
            - link "Privacy" [ref=e166] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › ATR-3 a reviewer is refused by the door and sees no Set tier; nothing is written

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('listing-title')
Expected: "E2E admin listing local-xx tekckwde"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-title')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('listing-title')
Expected: "E2E admin listing local-xx tekckwde"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-title')


  2393 |
  2394 |     await gotoReady(page, `/admin/listings/${ad.id}`);
> 2395 |     await expect(page.getByTestId("listing-title")).toHaveText(ad.title, { timeout: 20000 });
       |                                                     ^
  2396 |     await expect(page.getByTestId("listing-set-tier")).toHaveCount(0);
  2397 |
  2398 |     expect((await tierTruth(ad.id))?.["tier"]).toBe("regular");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2395:53
```

Context:

```text
          - listitem [ref=e158]:
            - generic [ref=e159]: About
          - listitem [ref=e160]:
            - generic [ref=e161]: Contact
      - navigation "Help" [ref=e162]:
        - heading "Help" [level=2] [ref=e163]
        - list [ref=e164]:
          - listitem [ref=e165]:
            - generic [ref=e166]: Safety
      - navigation "Legal" [ref=e167]:
        - heading "Legal" [level=2] [ref=e168]
        - list [ref=e169]:
          - listitem [ref=e170]:
            - link "Terms" [ref=e171] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e172]:
            - link "Privacy" [ref=e173] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e175]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › ATR-7 a reviewer's row menu has no Set tier and the door refuses him; nothing is written

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-search')


  2568 |     await signInViaSession(page, reviewer.email, reviewer.password);
  2569 |     await gotoReady(page, "/admin/listings");
> 2570 |     await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
       |                                                       ^
  2571 |     await page.getByTestId("listings-search").fill(ad.id);
  2572 |     await expect(listingRow(page, ad.id)).toBeVisible({ timeout: 20000 });
  2573 |     await rowMore(page, ad.id).click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2570:55
```

Context:

```text
          - listitem [ref=e151]:
            - generic [ref=e152]: About
          - listitem [ref=e153]:
            - generic [ref=e154]: Contact
      - navigation "Help" [ref=e155]:
        - heading "Help" [level=2] [ref=e156]
        - list [ref=e157]:
          - listitem [ref=e158]:
            - generic [ref=e159]: Safety
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - link "Terms" [ref=e164] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e165]:
            - link "Privacy" [ref=e166] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-11 All listings page with listings:view and no other listing right: the public name, never the e-mail, no moves

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-search')


  830 |     await signInViaSession(page, viewer.email, viewer.password);
  831 |     await gotoReady(page, "/admin/listings");
> 832 |     await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
      |                                                       ^
  833 |     await page.getByTestId("listings-search").fill(live.id);
  834 |     await expect(listingRow(page, live.id)).toBeVisible({ timeout: 20000 });
  835 |     await expect(listingRow(page, live.id)).toContainText(seller.alias);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:832:55
```

Context:

```text
          - listitem [ref=e185]:
            - generic [ref=e186]: About
          - listitem [ref=e187]:
            - generic [ref=e188]: Contact
      - navigation "Help" [ref=e189]:
        - heading "Help" [level=2] [ref=e190]
        - list [ref=e191]:
          - listitem [ref=e192]:
            - generic [ref=e193]: Safety
      - navigation "Legal" [ref=e194]:
        - heading "Legal" [level=2] [ref=e195]
        - list [ref=e196]:
          - listitem [ref=e197]:
            - link "Terms" [ref=e198] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e199]:
            - link "Privacy" [ref=e200] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e202]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('listing-title')
Expected: "E2E admin listing local-xx ziboqcil"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-title')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('listing-title')
Expected: "E2E admin listing local-xx ziboqcil"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-title')


  1257 |     await signInViaSession(page, viewer.email, viewer.password);
  1258 |     await gotoReady(page, `/admin/listings/${live.id}`);
> 1259 |     await expect(page.getByTestId("listing-title")).toHaveText(live.title, { timeout: 20000 });
       |                                                     ^
  1260 |     await expect(page.getByTestId("listing-fact-seller")).toContainText(seller.alias);
  1261 |     await expect(page.getByTestId("admin-listing-detail")).not.toContainText(seller.email);
  1262 |     await expect(page.getByTestId("listing-open-seller")).toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1259:53
```

Context:

```text
          - listitem [ref=e192]:
            - generic [ref=e193]: About
          - listitem [ref=e194]:
            - generic [ref=e195]: Contact
      - navigation "Help" [ref=e196]:
        - heading "Help" [level=2] [ref=e197]
        - list [ref=e198]:
          - listitem [ref=e199]:
            - generic [ref=e200]: Safety
      - navigation "Legal" [ref=e201]:
        - heading "Legal" [level=2] [ref=e202]
        - list [ref=e203]:
          - listitem [ref=e204]:
            - link "Terms" [ref=e205] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e206]:
            - link "Privacy" [ref=e207] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e209]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-30 Settings in All listings: the renew settings as stored, Cancel changes nothing, a day count outside 1 to 365 is refused before any call; no Settings without listings:enforce (D174 3, D175 2)

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-header').getByTestId('listings-settings')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-header').getByTestId('listings-settings')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-header').getByTestId('listings-settings')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-header').getByTestId('listings-settings')


  2036 |     await gotoReady(page, "/admin/listings");
  2037 |     const open = page.getByTestId("listings-header").getByTestId("listings-settings");
> 2038 |     await expect(open).toBeVisible({ timeout: 20000 });
       |                        ^
  2039 |     await open.click();
  2040 |     const dialog = page.getByTestId("listings-settings-dialog");
  2041 |     const renew = dialog.getByTestId("listings-settings-renew");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2038:24
```

Context:

```text
          - listitem [ref=e185]:
            - generic [ref=e186]: About
          - listitem [ref=e187]:
            - generic [ref=e188]: Contact
      - navigation "Help" [ref=e189]:
        - heading "Help" [level=2] [ref=e190]
        - list [ref=e191]:
          - listitem [ref=e192]:
            - generic [ref=e193]: Safety
      - navigation "Legal" [ref=e194]:
        - heading "Legal" [level=2] [ref=e195]
        - list [ref=e196]:
          - listitem [ref=e197]:
            - link "Terms" [ref=e198] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e199]:
            - link "Privacy" [ref=e200] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e202]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone

- Source: `shard 10`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('listings-search')


  2128 |     ]);
  2129 |     await gotoReady(page, "/admin/listings");
> 2130 |     await page.getByTestId("listings-search").fill(ad.id);
       |                                               ^
  2131 |     const row = listingRow(page, ad.id);
  2132 |     await expect(row).toBeVisible();
  2133 |     await expect(row.getByTestId(`listing-row-${ad.id}-reports`)).toHaveText("Reports: 2");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2130:47
```

Context:

```text
          - listitem [ref=e185]:
            - generic [ref=e186]: About
          - listitem [ref=e187]:
            - generic [ref=e188]: Contact
      - navigation "Help" [ref=e189]:
        - heading "Help" [level=2] [ref=e190]
        - list [ref=e191]:
          - listitem [ref=e192]:
            - generic [ref=e193]: Safety
      - navigation "Legal" [ref=e194]:
        - heading "Legal" [level=2] [ref=e195]
        - list [ref=e196]:
          - listitem [ref=e197]:
            - link "Terms" [ref=e198] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e199]:
            - link "Privacy" [ref=e200] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e202]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › ATR-3 a reviewer is refused by the door and sees no Set tier; nothing is written

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('listing-title')
Expected: "E2E admin listing local-xx jyoezhtu"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-title')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('listing-title')
Expected: "E2E admin listing local-xx jyoezhtu"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-title')


  2393 |
  2394 |     await gotoReady(page, `/admin/listings/${ad.id}`);
> 2395 |     await expect(page.getByTestId("listing-title")).toHaveText(ad.title, { timeout: 20000 });
       |                                                     ^
  2396 |     await expect(page.getByTestId("listing-set-tier")).toHaveCount(0);
  2397 |
  2398 |     expect((await tierTruth(ad.id))?.["tier"]).toBe("regular");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2395:53
```

Context:

```text
          - listitem [ref=e192]:
            - generic [ref=e193]: About
          - listitem [ref=e194]:
            - generic [ref=e195]: Contact
      - navigation "Help" [ref=e196]:
        - heading "Help" [level=2] [ref=e197]
        - list [ref=e198]:
          - listitem [ref=e199]:
            - generic [ref=e200]: Safety
      - navigation "Legal" [ref=e201]:
        - heading "Legal" [level=2] [ref=e202]
        - list [ref=e203]:
          - listitem [ref=e204]:
            - link "Terms" [ref=e205] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e206]:
            - link "Privacy" [ref=e207] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e209]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › ATR-7 a reviewer's row menu has no Set tier and the door refuses him; nothing is written

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listings-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('listings-search')


  2568 |     await signInViaSession(page, reviewer.email, reviewer.password);
  2569 |     await gotoReady(page, "/admin/listings");
> 2570 |     await expect(page.getByTestId("listings-search")).toBeVisible({ timeout: 20000 });
       |                                                       ^
  2571 |     await page.getByTestId("listings-search").fill(ad.id);
  2572 |     await expect(listingRow(page, ad.id)).toBeVisible({ timeout: 20000 });
  2573 |     await rowMore(page, ad.id).click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2570:55
```

Context:

```text
          - listitem [ref=e185]:
            - generic [ref=e186]: About
          - listitem [ref=e187]:
            - generic [ref=e188]: Contact
      - navigation "Help" [ref=e189]:
        - heading "Help" [level=2] [ref=e190]
        - list [ref=e191]:
          - listitem [ref=e192]:
            - generic [ref=e193]: Safety
      - navigation "Legal" [ref=e194]:
        - heading "Legal" [level=2] [ref=e195]
        - list [ref=e196]:
          - listitem [ref=e197]:
            - link "Terms" [ref=e198] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e199]:
            - link "Privacy" [ref=e200] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e202]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-2 gating: a reviewer has no entry and a deep link is turned away; a packages:view-only staff sees the blocks without a verb; the doors refuse both by name

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-nav-cards')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-nav-cards')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-nav-cards')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-nav-cards')


  571 |     await signInViaSession(page, reviewer.email, reviewer.password);
  572 |     await gotoReady(page, "/admin");
> 573 |     await expect(page.getByTestId("admin-nav-cards")).toBeVisible({ timeout: 20000 });
      |                                                       ^
  574 |     await expect(page.getByTestId("admin-section-link-monetisation")).toHaveCount(0);
  575 |     await page.goto("/admin/monetisation");
  576 |     await waitForHydration(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:573:55
```

Context:

```text
          - listitem [ref=e137]:
            - generic [ref=e138]: About
          - listitem [ref=e139]:
            - generic [ref=e140]: Contact
      - navigation "Help" [ref=e141]:
        - heading "Help" [level=2] [ref=e142]
        - list [ref=e143]:
          - listitem [ref=e144]:
            - generic [ref=e145]: Safety
      - navigation "Legal" [ref=e146]:
        - heading "Legal" [level=2] [ref=e147]
        - list [ref=e148]:
          - listitem [ref=e149]:
            - link "Terms" [ref=e150] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e151]:
            - link "Privacy" [ref=e152] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e154]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-2 gating: a reviewer has no entry and a deep link is turned away; a packages:view-only staff sees the blocks without a verb; the doors refuse both by name

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-nav-cards')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-nav-cards')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-nav-cards')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-nav-cards')


  571 |     await signInViaSession(page, reviewer.email, reviewer.password);
  572 |     await gotoReady(page, "/admin");
> 573 |     await expect(page.getByTestId("admin-nav-cards")).toBeVisible({ timeout: 20000 });
      |                                                       ^
  574 |     await expect(page.getByTestId("admin-section-link-monetisation")).toHaveCount(0);
  575 |     await page.goto("/admin/monetisation");
  576 |     await waitForHydration(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:573:55
```

Context:

```text
          - listitem [ref=e171]:
            - generic [ref=e172]: About
          - listitem [ref=e173]:
            - generic [ref=e174]: Contact
      - navigation "Help" [ref=e175]:
        - heading "Help" [level=2] [ref=e176]
        - list [ref=e177]:
          - listitem [ref=e178]:
            - generic [ref=e179]: Safety
      - navigation "Legal" [ref=e180]:
        - heading "Legal" [level=2] [ref=e181]
        - list [ref=e182]:
          - listitem [ref=e183]:
            - link "Terms" [ref=e184] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e185]:
            - link "Privacy" [ref=e186] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e188]: © 2026 ethio.com — All rights reserved.
```
```

## dialogs.spec.ts › a Filters panel in rows (Lovable bundle 3) › DLG-E12 a filter row's list opens in the panel's flow under its row with its choices in view above the footer; one press opens another row's list; Escape closes the list, then the panel

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: DLG-E12 the choices a person sees @ 834 x 900

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 6
Received:    2
--- further error 1 ---
Error: DLG-E12 the choices a person sees @ 834 x 900

expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 6
Received:    2

  814 |         tall?.choicesInView ?? 0,
  815 |         `DLG-E12 the choices a person sees @ ${width} x 900`,
> 816 |       ).toBeGreaterThanOrEqual(Math.min(tall?.choices ?? 0, 6));
      |         ^
  817 |
  818 |       // Several at once (DEC-420): the list stays open and marks each choice.
  819 |       await panel.getByTestId("style-filters-colour-Red").click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/dialogs.spec.ts:816:9
```

Context:

```text
              - option "Pink" [ref=e1812]:
                - generic [ref=e1813]: Pink
              - option "Orange" [ref=e1814]:
                - generic [ref=e1815]: Orange
              - option "Grey" [ref=e1816]:
                - generic [ref=e1817]: Grey
              - option "Silver" [ref=e1818]:
                - generic [ref=e1819]: Silver
        - generic [ref=e1822]:
          - generic "Size" [ref=e1823]
          - button "Size All" [ref=e1825] [cursor=pointer]:
            - generic [ref=e1826]: All
            - img
      - generic:
        - img
        - generic: More below
    - generic [ref=e1827]:
      - button "Clear all" [disabled]
      - button "Done" [disabled]
```
```

## admin-attributes-editor.spec.ts › C3 attributes console › AT-34 a categories:view-only operator cannot set a dependency

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-search')


  402 |       await switchUser(page, viewer.email, viewer.password);
  403 |       await gotoReady(page, "/admin/attributes");
> 404 |       await expect(page.getByTestId("attribute-search")).toBeVisible({ timeout: 20000 });
      |                                                          ^
  405 |       // The editor is unreachable, so the control cannot be on the page.
  406 |       await expect(page.getByTestId("attribute-depends-on")).toHaveCount(0);
  407 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-editor.spec.ts:404:58
```

Context:

```text
          - listitem [ref=e160]:
            - generic [ref=e161]: About
          - listitem [ref=e162]:
            - generic [ref=e163]: Contact
      - navigation "Help" [ref=e164]:
        - heading "Help" [level=2] [ref=e165]
        - list [ref=e166]:
          - listitem [ref=e167]:
            - generic [ref=e168]: Safety
      - navigation "Legal" [ref=e169]:
        - heading "Legal" [level=2] [ref=e170]
        - list [ref=e171]:
          - listitem [ref=e172]:
            - link "Terms" [ref=e173] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e174]:
            - link "Privacy" [ref=e175] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e177]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-editor.spec.ts › C3 attributes console › AT-34 a categories:view-only operator cannot set a dependency

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-search')


  402 |       await switchUser(page, viewer.email, viewer.password);
  403 |       await gotoReady(page, "/admin/attributes");
> 404 |       await expect(page.getByTestId("attribute-search")).toBeVisible({ timeout: 20000 });
      |                                                          ^
  405 |       // The editor is unreachable, so the control cannot be on the page.
  406 |       await expect(page.getByTestId("attribute-depends-on")).toHaveCount(0);
  407 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-editor.spec.ts:404:58
```

Context:

```text
          - listitem [ref=e184]:
            - generic [ref=e185]: About
          - listitem [ref=e186]:
            - generic [ref=e187]: Contact
      - navigation "Help" [ref=e188]:
        - heading "Help" [level=2] [ref=e189]
        - list [ref=e190]:
          - listitem [ref=e191]:
            - generic [ref=e192]: Safety
      - navigation "Legal" [ref=e193]:
        - heading "Legal" [level=2] [ref=e194]
        - list [ref=e195]:
          - listitem [ref=e196]:
            - link "Terms" [ref=e197] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e198]:
            - link "Privacy" [ref=e199] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e201]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129)

- Source: `shard 14`
- Project: `mobile-360`

```text
Test timeout of 180000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 180000ms exceeded.
Call log:
  - waiting for getByTestId('admin-screening-search')


  216 |   async function findRow(page: Page, title: string, id: string) {
  217 |     await gotoReady(page, "/admin/screening");
> 218 |     await page.getByTestId("admin-screening-search").fill(title);
      |                                                      ^
  219 |     const row = rowOf(page, id);
  220 |     await expect(row).toBeVisible({ timeout: 20000 });
  221 |     return row;
    at findRow (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:218:54)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:738:5
```

Context:

```text
          - listitem [ref=e151]:
            - generic [ref=e152]: About
          - listitem [ref=e153]:
            - generic [ref=e154]: Contact
      - navigation "Help" [ref=e155]:
        - heading "Help" [level=2] [ref=e156]
        - list [ref=e157]:
          - listitem [ref=e158]:
            - generic [ref=e159]: Safety
      - navigation "Legal" [ref=e160]:
        - heading "Legal" [level=2] [ref=e161]
        - list [ref=e162]:
          - listitem [ref=e163]:
            - link "Terms" [ref=e164] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e165]:
            - link "Privacy" [ref=e166] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e168]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Test timeout of 180000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 180000ms exceeded.
Call log:
  - waiting for getByTestId('admin-screening-search')


  216 |   async function findRow(page: Page, title: string, id: string) {
  217 |     await gotoReady(page, "/admin/screening");
> 218 |     await page.getByTestId("admin-screening-search").fill(title);
      |                                                      ^
  219 |     const row = rowOf(page, id);
  220 |     await expect(row).toBeVisible({ timeout: 20000 });
  221 |     return row;
    at findRow (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:218:54)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:738:5
```

Context:

```text
          - listitem [ref=e185]:
            - generic [ref=e186]: About
          - listitem [ref=e187]:
            - generic [ref=e188]: Contact
      - navigation "Help" [ref=e189]:
        - heading "Help" [level=2] [ref=e190]
        - list [ref=e191]:
          - listitem [ref=e192]:
            - generic [ref=e193]: Safety
      - navigation "Legal" [ref=e194]:
        - heading "Legal" [level=2] [ref=e195]
        - list [ref=e196]:
          - listitem [ref=e197]:
            - link "Terms" [ref=e198] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e199]:
            - link "Privacy" [ref=e200] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e202]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-22 a categories:view-only operator sees no import control and is refused

- Source: `shard 15`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


  1861 |       await switchUser(page, viewer.email, viewer.password);
  1862 |       await gotoReady(page, "/admin/categories");
> 1863 |       await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
       |                                                         ^
  1864 |       await expect(page.getByTestId("category-import")).toHaveCount(0);
  1865 |
  1866 |       const token = await bearerOf(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-lifecycle.spec.ts:1863:57
```

Context:

```text
          - listitem [ref=e160]:
            - generic [ref=e161]: About
          - listitem [ref=e162]:
            - generic [ref=e163]: Contact
      - navigation "Help" [ref=e164]:
        - heading "Help" [level=2] [ref=e165]
        - list [ref=e166]:
          - listitem [ref=e167]:
            - generic [ref=e168]: Safety
      - navigation "Legal" [ref=e169]:
        - heading "Legal" [level=2] [ref=e170]
        - list [ref=e171]:
          - listitem [ref=e172]:
            - link "Terms" [ref=e173] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e174]:
            - link "Privacy" [ref=e175] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e177]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-22 a categories:view-only operator sees no import control and is refused

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


  1861 |       await switchUser(page, viewer.email, viewer.password);
  1862 |       await gotoReady(page, "/admin/categories");
> 1863 |       await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
       |                                                         ^
  1864 |       await expect(page.getByTestId("category-import")).toHaveCount(0);
  1865 |
  1866 |       const token = await bearerOf(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-lifecycle.spec.ts:1863:57
```

Context:

```text
          - listitem [ref=e184]:
            - generic [ref=e185]: About
          - listitem [ref=e186]:
            - generic [ref=e187]: Contact
      - navigation "Help" [ref=e188]:
        - heading "Help" [level=2] [ref=e189]
        - list [ref=e190]:
          - listitem [ref=e191]:
            - generic [ref=e192]: Safety
      - navigation "Legal" [ref=e193]:
        - heading "Legal" [level=2] [ref=e194]
        - list [ref=e195]:
          - listitem [ref=e196]:
            - link "Terms" [ref=e197] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e198]:
            - link "Privacy" [ref=e199] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e201]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `shard 15`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('deactivate-reason')


  112 |       await switchUser(page, staff.email, staff.password);
  113 |       await gotoReady(page, `/admin/users/${target.id}`);
> 114 |       await page.getByTestId("deactivate-reason").fill("MF-2 proof");
      |                                                   ^
  115 |       await page.getByTestId("deactivate-user").click();
  116 |
  117 |       const modal = page.getByTestId("step-up-modal");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:114:51
```

Context:

```text
          - listitem [ref=e234]:
            - generic [ref=e235]: About
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Help" [ref=e238]:
        - heading "Help" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Safety
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - link "Terms" [ref=e247] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e248]:
            - link "Privacy" [ref=e249] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-3 no factor: the modal explains and the RPC is never called

- Source: `shard 15`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('deactivate-reason')


  141 |
  142 |     await gotoReady(page, `/admin/users/${target.id}`);
> 143 |     await page.getByTestId("deactivate-reason").fill("MF-3 proof");
      |                                                 ^
  144 |     await page.getByTestId("deactivate-user").click();
  145 |
  146 |     await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:143:49
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-8 the gate's dialog is not in the page's first download; the first step-up fetches it and draws it on the top layer

- Source: `shard 15`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('deactivate-reason')


  173 |
  174 |     await gotoReady(page, `/admin/users/${target.id}`);
> 175 |     await page.getByTestId("deactivate-reason").fill("MF-8 proof");
      |                                                 ^
  176 |     expect(await asked()).toEqual({ preloaded: [], fetched: [] });
  177 |     await page.getByTestId("deactivate-user").click();
  178 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:175:49
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `shard 15`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('deactivate-reason')


  112 |       await switchUser(page, staff.email, staff.password);
  113 |       await gotoReady(page, `/admin/users/${target.id}`);
> 114 |       await page.getByTestId("deactivate-reason").fill("MF-2 proof");
      |                                                   ^
  115 |       await page.getByTestId("deactivate-user").click();
  116 |
  117 |       const modal = page.getByTestId("step-up-modal");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:114:51
```

Context:

```text
          - listitem [ref=e239]:
            - generic [ref=e240]: About
          - listitem [ref=e241]:
            - generic [ref=e242]: Contact
      - navigation "Help" [ref=e243]:
        - heading "Help" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - generic [ref=e247]: Safety
      - navigation "Legal" [ref=e248]:
        - heading "Legal" [level=2] [ref=e249]
        - list [ref=e250]:
          - listitem [ref=e251]:
            - link "Terms" [ref=e252] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e253]:
            - link "Privacy" [ref=e254] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e256]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-3 no factor: the modal explains and the RPC is never called

- Source: `shard 15`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('deactivate-reason')


  141 |
  142 |     await gotoReady(page, `/admin/users/${target.id}`);
> 143 |     await page.getByTestId("deactivate-reason").fill("MF-3 proof");
      |                                                 ^
  144 |     await page.getByTestId("deactivate-user").click();
  145 |
  146 |     await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:143:49
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-8 the gate's dialog is not in the page's first download; the first step-up fetches it and draws it on the top layer

- Source: `shard 15`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('deactivate-reason')


  173 |
  174 |     await gotoReady(page, `/admin/users/${target.id}`);
> 175 |     await page.getByTestId("deactivate-reason").fill("MF-8 proof");
      |                                                 ^
  176 |     expect(await asked()).toEqual({ preloaded: [], fetched: [] });
  177 |     await page.getByTestId("deactivate-user").click();
  178 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:175:49
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f-4 step-up freshness › MF-6 unenrolling the only factor drops the stepped-up state

- Source: `shard 15`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('deactivate-reason')


  275 |
  276 |       await gotoReady(page, `/admin/users/${target.id}`);
> 277 |       await page.getByTestId("deactivate-reason").fill("MF-6 proof");
      |                                                   ^
  278 |       await page.getByTestId("deactivate-user").click();
  279 |
  280 |       await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:277:51
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f-4 step-up freshness › MF-6 unenrolling the only factor drops the stepped-up state

- Source: `shard 15`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('deactivate-reason')


  275 |
  276 |       await gotoReady(page, `/admin/users/${target.id}`);
> 277 |       await page.getByTestId("deactivate-reason").fill("MF-6 proof");
      |                                                   ^
  278 |       await page.getByTestId("deactivate-user").click();
  279 |
  280 |       await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:277:51
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing

- Source: `shard 15`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('edit-display-name')


  346 |
  347 |       await gotoReady(page, `/admin/users/${target.id}`);
> 348 |       await page.getByTestId("edit-display-name").fill("MF-7b never written");
      |                                                   ^
  349 |       await page.getByTestId("edit-save").click();
  350 |
  351 |       const modal = page.getByTestId("step-up-modal");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:348:51
```

Context:

```text
          - listitem [ref=e234]:
            - generic [ref=e235]: About
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Help" [ref=e238]:
        - heading "Help" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Safety
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - link "Terms" [ref=e247] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e248]:
            - link "Privacy" [ref=e249] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7c a no-factor identity is released with the hint

- Source: `shard 15`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('edit-display-name')


  373 |       await switchUser(page, staff.email, staff.password);
  374 |       await gotoReady(page, `/admin/users/${target.id}`);
> 375 |       await page.getByTestId("edit-display-name").fill("MF-7c never written");
      |                                                   ^
  376 |       await page.getByTestId("edit-save").click();
  377 |
  378 |       await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:375:51
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing

- Source: `shard 15`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('edit-display-name')


  346 |
  347 |       await gotoReady(page, `/admin/users/${target.id}`);
> 348 |       await page.getByTestId("edit-display-name").fill("MF-7b never written");
      |                                                   ^
  349 |       await page.getByTestId("edit-save").click();
  350 |
  351 |       const modal = page.getByTestId("step-up-modal");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:348:51
```

Context:

```text
          - listitem [ref=e239]:
            - generic [ref=e240]: About
          - listitem [ref=e241]:
            - generic [ref=e242]: Contact
      - navigation "Help" [ref=e243]:
        - heading "Help" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - generic [ref=e247]: Safety
      - navigation "Legal" [ref=e248]:
        - heading "Legal" [level=2] [ref=e249]
        - list [ref=e250]:
          - listitem [ref=e251]:
            - link "Terms" [ref=e252] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e253]:
            - link "Privacy" [ref=e254] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e256]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7c a no-factor identity is released with the hint

- Source: `shard 15`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('edit-display-name')


  373 |       await switchUser(page, staff.email, staff.password);
  374 |       await gotoReady(page, `/admin/users/${target.id}`);
> 375 |       await page.getByTestId("edit-display-name").fill("MF-7c never written");
      |                                                   ^
  376 |       await page.getByTestId("edit-save").click();
  377 |
  378 |       await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:375:51
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › INC-1234 one step-up, one prompt › MF-9 one code covers a category's creation and its picture step

- Source: `shard 15`
- Project: `mobile-360`

```text
Test timeout of 120000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByTestId('category-create-open')


  430 |         await gotoReady(page, "/admin/categories");
  431 |         const before = await opened();
> 432 |         await page.getByTestId("category-create-open").click();
      |                                                        ^
  433 |         await page.getByTestId("category-create-name").fill(slug);
  434 |         await expect(page.getByTestId("category-create-slug-preview")).toHaveText(slug);
  435 |         await page.getByTestId("category-create-submit").click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:432:56
```

Context:

```text
          - listitem [ref=e296]:
            - generic [ref=e297]: About
          - listitem [ref=e298]:
            - generic [ref=e299]: Contact
      - navigation "Help" [ref=e300]:
        - heading "Help" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - generic [ref=e304]: Safety
      - navigation "Legal" [ref=e305]:
        - heading "Legal" [level=2] [ref=e306]
        - list [ref=e307]:
          - listitem [ref=e308]:
            - link "Terms" [ref=e309] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e310]:
            - link "Privacy" [ref=e311] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e313]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › INC-1234 one step-up, one prompt › MF-9 one code covers a category's creation and its picture step

- Source: `shard 15`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByTestId('category-create-open')


  430 |         await gotoReady(page, "/admin/categories");
  431 |         const before = await opened();
> 432 |         await page.getByTestId("category-create-open").click();
      |                                                        ^
  433 |         await page.getByTestId("category-create-name").fill(slug);
  434 |         await expect(page.getByTestId("category-create-slug-preview")).toHaveText(slug);
  435 |         await page.getByTestId("category-create-submit").click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:432:56
```

Context:

```text
          - listitem [ref=e276]:
            - generic [ref=e277]: About
          - listitem [ref=e278]:
            - generic [ref=e279]: Contact
      - navigation "Help" [ref=e280]:
        - heading "Help" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - generic [ref=e284]: Safety
      - navigation "Legal" [ref=e285]:
        - heading "Legal" [level=2] [ref=e286]
        - list [ref=e287]:
          - listitem [ref=e288]:
            - link "Terms" [ref=e289] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e290]:
            - link "Privacy" [ref=e291] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e293]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-1 permission: moderator is refused, admin sees the list

- Source: `shard 16`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByText('You don\'t have access to that section.')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByText('You don\'t have access to that section.')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByText('You don\'t have access to that section.')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByText('You don\'t have access to that section.')


  150 |     await waitForHydration(page);
  151 |     await expect(page).toHaveURL(/\/admin\/?$/);
> 152 |     await expect(page.getByText(en["admin.accessDenied"])).toBeVisible({ timeout: 15000 });
      |                                                            ^
  153 |
  154 |     const staff = await leaseUser();
  155 |     await grantRole(staff.id, "admin");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:152:60
```

Context:

```text
          - listitem [ref=e136]:
            - generic [ref=e137]: About
          - listitem [ref=e138]:
            - generic [ref=e139]: Contact
      - navigation "Help" [ref=e140]:
        - heading "Help" [level=2] [ref=e141]
        - list [ref=e142]:
          - listitem [ref=e143]:
            - generic [ref=e144]: Safety
      - navigation "Legal" [ref=e145]:
        - heading "Legal" [level=2] [ref=e146]
        - list [ref=e147]:
          - listitem [ref=e148]:
            - link "Terms" [ref=e149] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e150]:
            - link "Privacy" [ref=e151] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e153]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-2 search and status filter

- Source: `shard 16`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('users-search')


  172 |     await waitForHydration(page);
  173 |
> 174 |     await page.getByTestId("users-search").fill(scratch.email);
      |                                            ^
  175 |     await expect(userRow(page, scratch.id)).toBeVisible({ timeout: 15000 });
  176 |
  177 |     // Bundle 11 G2a (INC-543) — the status is a pill in the Filters panel.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:174:44
```

Context:

```text
          - listitem [ref=e221]:
            - generic [ref=e222]: About
          - listitem [ref=e223]:
            - generic [ref=e224]: Contact
      - navigation "Help" [ref=e225]:
        - heading "Help" [level=2] [ref=e226]
        - list [ref=e227]:
          - listitem [ref=e228]:
            - generic [ref=e229]: Safety
      - navigation "Legal" [ref=e230]:
        - heading "Legal" [level=2] [ref=e231]
        - list [ref=e232]:
          - listitem [ref=e233]:
            - link "Terms" [ref=e234] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e235]:
            - link "Privacy" [ref=e236] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e238]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Source: `shard 16`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('activate-user')


  223 |     await page.goto(`/admin/users/${scratch.id}`);
  224 |     await waitForHydration(page);
> 225 |     await page.getByTestId("activate-user").click();
      |                                             ^
  226 |     // A fresh sign-in starts at aal1, so the gate fires again here.
  227 |     await stepUpIfPrompted(page, secret);
  228 |     await expectAal2(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:225:45
```

Context:

```text
          - listitem [ref=e234]:
            - generic [ref=e235]: About
          - listitem [ref=e236]:
            - generic [ref=e237]: Contact
      - navigation "Help" [ref=e238]:
        - heading "Help" [level=2] [ref=e239]
        - list [ref=e240]:
          - listitem [ref=e241]:
            - generic [ref=e242]: Safety
      - navigation "Legal" [ref=e243]:
        - heading "Legal" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - link "Terms" [ref=e247] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e248]:
            - link "Privacy" [ref=e249] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e251]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-8 own row: status controls are not offered on your own record

- Source: `shard 16`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('own-account-note')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('own-account-note')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('own-account-note')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('own-account-note')


  258 |     await waitForHydration(page);
  259 |
> 260 |     await expect(page.getByTestId("own-account-note")).toBeVisible({ timeout: 15000 });
      |                                                        ^
  261 |     await expect(page.getByTestId("deactivate-user")).toHaveCount(0);
  262 |     await expect(page.getByTestId("activate-user")).toHaveCount(0);
  263 |   });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:260:56
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-11 own row: no edit form on your own record

- Source: `shard 16`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('own-account-note-edit')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('own-account-note-edit')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('own-account-note-edit')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('own-account-note-edit')


  487 |     await waitForHydration(page);
  488 |
> 489 |     await expect(page.getByTestId("own-account-note-edit")).toBeVisible({ timeout: 15000 });
      |                                                             ^
  490 |     await expect(page.getByTestId("user-edit-form")).toHaveCount(0);
  491 |   });
  492 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:489:61
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-13 the users list on the agreed blocks: heading, toolbar, pills, Columns, page size

- Source: `shard 16`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('users-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('users-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('users-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('users-search')


  504 |     await switchUser(page, staff.email, staff.password);
  505 |     await gotoReady(page, "/admin/users");
> 506 |     await expect(page.getByTestId("users-search")).toBeVisible({ timeout: 20000 });
      |                                                    ^
  507 |
  508 |     const header = page.getByTestId("users-header");
  509 |     await expect(header.getByRole("heading", { level: 1 })).toHaveText(en["admin.users.title"]);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:506:52
```

Context:

```text
          - listitem [ref=e221]:
            - generic [ref=e222]: About
          - listitem [ref=e223]:
            - generic [ref=e224]: Contact
      - navigation "Help" [ref=e225]:
        - heading "Help" [level=2] [ref=e226]
        - list [ref=e227]:
          - listitem [ref=e228]:
            - generic [ref=e229]: Safety
      - navigation "Legal" [ref=e230]:
        - heading "Legal" [level=2] [ref=e231]
        - list [ref=e232]:
          - listitem [ref=e233]:
            - link "Terms" [ref=e234] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e235]:
            - link "Privacy" [ref=e236] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e238]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-1 permission: moderator is refused, admin sees the list

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByText('You don\'t have access to that section.')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByText('You don\'t have access to that section.')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByText('You don\'t have access to that section.')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByText('You don\'t have access to that section.')


  150 |     await waitForHydration(page);
  151 |     await expect(page).toHaveURL(/\/admin\/?$/);
> 152 |     await expect(page.getByText(en["admin.accessDenied"])).toBeVisible({ timeout: 15000 });
      |                                                            ^
  153 |
  154 |     const staff = await leaseUser();
  155 |     await grantRole(staff.id, "admin");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:152:60
```

Context:

```text
          - listitem [ref=e179]:
            - generic [ref=e180]: About
          - listitem [ref=e181]:
            - generic [ref=e182]: Contact
      - navigation "Help" [ref=e183]:
        - heading "Help" [level=2] [ref=e184]
        - list [ref=e185]:
          - listitem [ref=e186]:
            - generic [ref=e187]: Safety
      - navigation "Legal" [ref=e188]:
        - heading "Legal" [level=2] [ref=e189]
        - list [ref=e190]:
          - listitem [ref=e191]:
            - link "Terms" [ref=e192] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e193]:
            - link "Privacy" [ref=e194] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e196]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-2 search and status filter

- Source: `shard 16`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('users-search')


  172 |     await waitForHydration(page);
  173 |
> 174 |     await page.getByTestId("users-search").fill(scratch.email);
      |                                            ^
  175 |     await expect(userRow(page, scratch.id)).toBeVisible({ timeout: 15000 });
  176 |
  177 |     // Bundle 11 G2a (INC-543) — the status is a pill in the Filters panel.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:174:44
```

Context:

```text
          - listitem [ref=e226]:
            - generic [ref=e227]: About
          - listitem [ref=e228]:
            - generic [ref=e229]: Contact
      - navigation "Help" [ref=e230]:
        - heading "Help" [level=2] [ref=e231]
        - list [ref=e232]:
          - listitem [ref=e233]:
            - generic [ref=e234]: Safety
      - navigation "Legal" [ref=e235]:
        - heading "Legal" [level=2] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - link "Terms" [ref=e239] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e240]:
            - link "Privacy" [ref=e241] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e243]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Source: `shard 16`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('activate-user')


  223 |     await page.goto(`/admin/users/${scratch.id}`);
  224 |     await waitForHydration(page);
> 225 |     await page.getByTestId("activate-user").click();
      |                                             ^
  226 |     // A fresh sign-in starts at aal1, so the gate fires again here.
  227 |     await stepUpIfPrompted(page, secret);
  228 |     await expectAal2(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:225:45
```

Context:

```text
          - listitem [ref=e239]:
            - generic [ref=e240]: About
          - listitem [ref=e241]:
            - generic [ref=e242]: Contact
      - navigation "Help" [ref=e243]:
        - heading "Help" [level=2] [ref=e244]
        - list [ref=e245]:
          - listitem [ref=e246]:
            - generic [ref=e247]: Safety
      - navigation "Legal" [ref=e248]:
        - heading "Legal" [level=2] [ref=e249]
        - list [ref=e250]:
          - listitem [ref=e251]:
            - link "Terms" [ref=e252] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e253]:
            - link "Privacy" [ref=e254] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e256]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-8 own row: status controls are not offered on your own record

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('own-account-note')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('own-account-note')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('own-account-note')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('own-account-note')


  258 |     await waitForHydration(page);
  259 |
> 260 |     await expect(page.getByTestId("own-account-note")).toBeVisible({ timeout: 15000 });
      |                                                        ^
  261 |     await expect(page.getByTestId("deactivate-user")).toHaveCount(0);
  262 |     await expect(page.getByTestId("activate-user")).toHaveCount(0);
  263 |   });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:260:56
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-11 own row: no edit form on your own record

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('own-account-note-edit')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('own-account-note-edit')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('own-account-note-edit')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('own-account-note-edit')


  487 |     await waitForHydration(page);
  488 |
> 489 |     await expect(page.getByTestId("own-account-note-edit")).toBeVisible({ timeout: 15000 });
      |                                                             ^
  490 |     await expect(page.getByTestId("user-edit-form")).toHaveCount(0);
  491 |   });
  492 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:489:61
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: About
          - listitem [ref=e235]:
            - generic [ref=e236]: Contact
      - navigation "Help" [ref=e237]:
        - heading "Help" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: Safety
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - link "Terms" [ref=e246] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e247]:
            - link "Privacy" [ref=e248] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-13 the users list on the agreed blocks: heading, toolbar, pills, Columns, page size

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('users-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('users-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('users-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('users-search')


  504 |     await switchUser(page, staff.email, staff.password);
  505 |     await gotoReady(page, "/admin/users");
> 506 |     await expect(page.getByTestId("users-search")).toBeVisible({ timeout: 20000 });
      |                                                    ^
  507 |
  508 |     const header = page.getByTestId("users-header");
  509 |     await expect(header.getByRole("heading", { level: 1 })).toHaveText(en["admin.users.title"]);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:506:52
```

Context:

```text
          - listitem [ref=e226]:
            - generic [ref=e227]: About
          - listitem [ref=e228]:
            - generic [ref=e229]: Contact
      - navigation "Help" [ref=e230]:
        - heading "Help" [level=2] [ref=e231]
        - list [ref=e232]:
          - listitem [ref=e233]:
            - generic [ref=e234]: Safety
      - navigation "Legal" [ref=e235]:
        - heading "Legal" [level=2] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - link "Terms" [ref=e239] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e240]:
            - link "Privacy" [ref=e241] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e243]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


  117 |     await switchUser(page, admin.email, admin.password);
  118 |     await gotoReady(page, "/admin/categories");
> 119 |     await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      |                                                       ^
  120 |   });
  121 |
  122 |   test("CT-2 roster: the ratified tree renders, search narrows it, nothing overflows", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:119:55
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-2 roster: the ratified tree renders, search narrows it, nothing overflows

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


   at helpers/categories.ts:171

  169 |  */
  170 | export async function anchorRealRow(page: Page, slug: string): Promise<Locator> {
> 171 |   await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      |                                                     ^
  172 |   await page.getByTestId("category-search").fill(slug);
  173 |   const row = categoryRow(page, slug);
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `repeat`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('category-search')


   at helpers/categories.ts:97

   95 |  */
   96 | export async function findRow(page: Page, slug: string, createdAt?: number): Promise<Locator> {
>  97 |   await page.getByTestId("category-search").fill(slug);
      |                                             ^
   98 |   const row = categoryRow(page, slug);
   99 |   try {
  100 |     await expect(row).toBeVisible({ timeout: 20000 });
    at findRow (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/categories.ts:97:45)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:505:13
```

Context:

```text
          - listitem [ref=e290]:
            - generic [ref=e291]: About
          - listitem [ref=e292]:
            - generic [ref=e293]: Contact
      - navigation "Help" [ref=e294]:
        - heading "Help" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - generic [ref=e298]: Safety
      - navigation "Legal" [ref=e299]:
        - heading "Legal" [level=2] [ref=e300]
        - list [ref=e301]:
          - listitem [ref=e302]:
            - link "Terms" [ref=e303] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e304]:
            - link "Privacy" [ref=e305] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e307]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-9b roster shape: the parent line and pagination inside cards

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


   at helpers/categories.ts:171

  169 |  */
  170 | export async function anchorRealRow(page: Page, slug: string): Promise<Locator> {
> 171 |   await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      |                                                     ^
  172 |   await page.getByTestId("category-search").fill(slug);
  173 |   const row = categoryRow(page, slug);
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-11 roster controls: missing-assets filter (in Filters, as a chip) and a device page size (in the footer)

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


   at helpers/categories.ts:171

  169 |  */
  170 | export async function anchorRealRow(page: Page, slug: string): Promise<Locator> {
> 171 |   await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      |                                                     ^
  172 |   await page.getByTestId("category-search").fill(slug);
  173 |   const row = categoryRow(page, slug);
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-29 every ratified category renders its own glyph, not the fallback

- Source: `repeat`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('category-pagination-size')


  798 |
  799 |     // The rendered truth, read one page at a time (J7: assert what rendered).
> 800 |     await page.getByTestId("category-pagination-size").selectOption("100");
      |                                                        ^
  801 |     const rendered = new Map<string, string>();
  802 |     for (let guardPage = 0; guardPage < 12; guardPage += 1) {
  803 |       await expect
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:800:56
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


  117 |     await switchUser(page, admin.email, admin.password);
  118 |     await gotoReady(page, "/admin/categories");
> 119 |     await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      |                                                       ^
  120 |   });
  121 |
  122 |   test("CT-2 roster: the ratified tree renders, search narrows it, nothing overflows", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:119:55
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-2 roster: the ratified tree renders, search narrows it, nothing overflows

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


   at helpers/categories.ts:171

  169 |  */
  170 | export async function anchorRealRow(page: Page, slug: string): Promise<Locator> {
> 171 |   await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      |                                                     ^
  172 |   await page.getByTestId("category-search").fill(slug);
  173 |   const row = categoryRow(page, slug);
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `repeat`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('category-search')


   at helpers/categories.ts:97

   95 |  */
   96 | export async function findRow(page: Page, slug: string, createdAt?: number): Promise<Locator> {
>  97 |   await page.getByTestId("category-search").fill(slug);
      |                                             ^
   98 |   const row = categoryRow(page, slug);
   99 |   try {
  100 |     await expect(row).toBeVisible({ timeout: 20000 });
    at findRow (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/categories.ts:97:45)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:505:13
```

Context:

```text
          - listitem [ref=e290]:
            - generic [ref=e291]: About
          - listitem [ref=e292]:
            - generic [ref=e293]: Contact
      - navigation "Help" [ref=e294]:
        - heading "Help" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - generic [ref=e298]: Safety
      - navigation "Legal" [ref=e299]:
        - heading "Legal" [level=2] [ref=e300]
        - list [ref=e301]:
          - listitem [ref=e302]:
            - link "Terms" [ref=e303] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e304]:
            - link "Privacy" [ref=e305] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e307]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-9b roster shape: the parent line and pagination inside cards

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


   at helpers/categories.ts:171

  169 |  */
  170 | export async function anchorRealRow(page: Page, slug: string): Promise<Locator> {
> 171 |   await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      |                                                     ^
  172 |   await page.getByTestId("category-search").fill(slug);
  173 |   const row = categoryRow(page, slug);
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-11 roster controls: missing-assets filter (in Filters, as a chip) and a device page size (in the footer)

- Source: `repeat`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-search')


   at helpers/categories.ts:171

  169 |  */
  170 | export async function anchorRealRow(page: Page, slug: string): Promise<Locator> {
> 171 |   await expect(page.getByTestId("category-search")).toBeVisible({ timeout: 20000 });
      |                                                     ^
  172 |   await page.getByTestId("category-search").fill(slug);
  173 |   const row = categoryRow(page, slug);
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-29 every ratified category renders its own glyph, not the fallback

- Source: `repeat`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('category-pagination-size')


  798 |
  799 |     // The rendered truth, read one page at a time (J7: assert what rendered).
> 800 |     await page.getByTestId("category-pagination-size").selectOption("100");
      |                                                        ^
  801 |     const rendered = new Map<string, string>();
  802 |     for (let guardPage = 0; guardPage < 12; guardPage += 1) {
  803 |       await expect
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:800:56
```

Context:

```text
          - listitem [ref=e228]:
            - generic [ref=e229]: About
          - listitem [ref=e230]:
            - generic [ref=e231]: Contact
      - navigation "Help" [ref=e232]:
        - heading "Help" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - generic [ref=e236]: Safety
      - navigation "Legal" [ref=e237]:
        - heading "Legal" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - link "Terms" [ref=e241] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e242]:
            - link "Privacy" [ref=e243] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e245]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: webkit

No `[ssr-error]` lines in the `webkit` log (or no log was uploaded).

## Client errors: webkit

No `[client-error]` lines in the `webkit` log (or no log was uploaded).

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

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

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: shard 7

No `[ssr-error]` lines in the `shard 7` log (or no log was uploaded).

## Client errors: shard 7

No `[client-error]` lines in the `shard 7` log (or no log was uploaded).

## Server errors: shard 8

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
```

## Client errors: shard 8

No `[client-error]` lines in the `shard 8` log (or no log was uploaded).

## Server errors: shard 9

No `[ssr-error]` lines in the `shard 9` log (or no log was uploaded).

## Client errors: shard 9

No `[client-error]` lines in the `shard 9` log (or no log was uploaded).

## Server errors: shard 10

No `[ssr-error]` lines in the `shard 10` log (or no log was uploaded).

## Client errors: shard 10

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/admin_set_listing_tier ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/admin_set_listing_tier ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/admin_set_listing_tier ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/admin_set_listing_tier ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "permissionDenied", "refusals": [{"reason": "permissionDenied"}]})
```

## Server errors: shard 14

No `[ssr-error]` lines in the `shard 14` log (or no log was uploaded).

## Client errors: shard 14

No `[client-error]` lines in the `shard 14` log (or no log was uploaded).

## Server errors: shard 15

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 15

No `[client-error]` lines in the `shard 15` log (or no log was uploaded).

## Server errors: shard 16

No `[ssr-error]` lines in the `shard 16` log (or no log was uploaded).

## Client errors: shard 16

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "accountDeactivated", "refusals": [{"reason": "accountDeactivated"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "accountDeactivated", "refusals": [{"reason": "accountDeactivated"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "accountDeactivated", "refusals": [{"reason": "accountDeactivated"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 403 ()
[client-error] HTTP 403 POST /rest/v1/rpc/user_set_preferred_language ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "accountDeactivated", "refusals": [{"reason": "accountDeactivated"}]})
```

## Server errors: repeat

No `[ssr-error]` lines in the `repeat` log (or no log was uploaded).

## Client errors: repeat

No `[client-error]` lines in the `repeat` log (or no log was uploaded).
