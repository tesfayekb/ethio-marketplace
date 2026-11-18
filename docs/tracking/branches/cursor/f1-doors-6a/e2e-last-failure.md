# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44247634746
- Commit: `857a8e728c0f864a93cb56bd053fd4a7ef724edb`
- Attempt: 1
- Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-403527fe76be… (0 read)
- Repeat: 0 of 52 tests repeated — specs directly changed 0/1, importers of a changed helper 0/0; budget 643 s
- Written (UTC): 2026-11-18T06:23:47.062Z
- Passed: 2451 · Skipped: 407 · Failed: 68
- Gating failures: 68 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: smoke
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (19 of 20 results files read, 18 of 20 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: smoke, repeat

`smoke`, `repeat`: log unavailable.

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

Logs read: email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: smoke, repeat

`smoke`, `repeat`: log unavailable.

## Timing (DEC-087, non-gating)

Results read: email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: smoke

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-11-18T06:02:29.835Z | 0.3 min |
| webkit | 2026-11-18T06:15:59.389Z | 7.1 min |
| shard 1 | 2026-11-18T06:03:17.063Z | 5.4 min |
| shard 2 | 2026-11-18T05:59:50.893Z | 6.1 min |
| shard 3 | 2026-11-18T05:59:46.281Z | 6.7 min |
| shard 4 | 2026-11-18T06:00:07.305Z | 6.0 min |
| shard 5 | 2026-11-18T06:03:47.301Z | 6.1 min |
| shard 6 | 2026-11-18T06:03:50.542Z | 5.7 min |
| shard 7 | 2026-11-18T05:59:46.612Z | 5.9 min |
| shard 8 | 2026-11-18T06:01:46.848Z | 6.9 min |
| shard 9 | 2026-11-18T06:02:33.535Z | 5.4 min |
| shard 10 | 2026-11-18T06:00:17.744Z | 9.2 min |
| shard 11 | 2026-11-18T05:59:07.293Z | 5.6 min |
| shard 12 | 2026-11-18T06:00:05.666Z | 8.0 min |
| shard 13 | 2026-11-18T06:05:38.152Z | 4.9 min |
| shard 14 | 2026-11-18T06:01:49.348Z | 16.7 min |
| shard 15 | 2026-11-18T06:05:42.640Z | 6.2 min |
| shard 16 | 2026-11-18T06:01:37.597Z | 5.2 min |
| repeat | 2026-11-18T05:57:07.737Z | 0.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-screening.spec.ts` | 58 | 21.1 min | webkit, shard 14 |
| `admin-listings.spec.ts` | 78 | 9.7 min | webkit, shard 10 |
| `shell.spec.ts` | 234 | 9.5 min | shard 1 |
| `admin-attributes-library.spec.ts` | 42 | 6.1 min | shard 2 |
| `post-wizard-specs.spec.ts` | 82 | 5.9 min | shard 12 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.5 min | shard 3 |
| `admin-translations-console.spec.ts` | 44 | 5.4 min | shard 8 |
| `import-security.spec.ts` | 36 | 5.1 min | shard 4 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 4.8 min | shard 7 |
| `admin-locations.spec.ts` | 38 | 4.6 min | shard 6 |
| `post-wizard-place.spec.ts` | 40 | 4.4 min | shard 11 |
| `admin-roles.spec.ts` | 28 | 4.4 min | shard 9 |
| `my-listings-ad.spec.ts` | 38 | 4.2 min | shard 12 |
| `ad-page.spec.ts` | 156 | 4.1 min | webkit, shard 13, repeat |
| `post-wizard-pricing.spec.ts` | 52 | 4.0 min | shard 8 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 13 |
| `photo-pipeline.spec.ts` | 74 | 3.7 min | webkit, shard 16 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 11 |
| `admin-attributes-editor.spec.ts` | 36 | 3.7 min | shard 14 |
| `admin-users.spec.ts` | 28 | 3.6 min | shard 16 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.5 min | shard 15 |
| `auth-signout.spec.ts` | 36 | 3.1 min | shard 9 |
| `post-wizard-category.spec.ts` | 52 | 3.1 min | webkit, shard 4 |
| `choice-lists.spec.ts` | 96 | 3.0 min | shard 7 |
| `dialogs.spec.ts` | 20 | 2.9 min | webkit, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.8 min | shard 3 |
| `admin-monetisation.spec.ts` | 30 | 2.8 min | shard 10 |
| `posting-routes.spec.ts` | 80 | 2.6 min | shard 2 |
| `sage-bands.spec.ts` | 76 | 2.4 min | shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 2.4 min | shard 8 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 6 |
| `legal-admin.spec.ts` | 44 | 2.2 min | shard 7 |
| `legal-certify.spec.ts` | 44 | 2.1 min | shard 14 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 16 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 4 |
| `mfa-stepup.spec.ts` | 22 | 1.7 min | webkit, shard 15 |
| `sage-ad-page.spec.ts` | 30 | 1.7 min | webkit, shard 11 |
| `phone-frame.spec.ts` | 18 | 1.7 min | shard 12 |
| `sage-tiers.spec.ts` | 52 | 1.6 min | webkit, shard 2 |
| `admin-audit.spec.ts` | 16 | 1.6 min | shard 9 |
| `press.spec.ts` | 22 | 1.6 min | shard 12 |
| `my-listings-page.spec.ts` | 20 | 1.3 min | webkit, shard 10 |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 3 |
| `admin-guides.spec.ts` | 14 | 1.2 min | shard 3 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2 |
| `admin-categories-images.spec.ts` | 4 | 1.1 min | webkit, shard 12 |
| `my-listings-promote.spec.ts` | 10 | 1.0 min | shard 11 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 13 |
| `my-listings-levels.spec.ts` | 28 | 0.8 min | shard 4 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `legal-doors.spec.ts` | 32 | 0.8 min | shard 8 |
| `name-check-queue.spec.ts` | 6 | 0.8 min | shard 9 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 15 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 7 |
| `ad-page-doors.spec.ts` | 30 | 0.7 min | shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 3 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 16 |
| `post-wizard-details.spec.ts` | 8 | 0.6 min | shard 14 |
| `i18n-coverage.spec.ts` | 14 | 0.5 min | shard 4 |
| `layout.spec.ts` | 18 | 0.5 min | webkit, shard 10 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `shell-bands.spec.ts` | 16 | 0.5 min | shard 12 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 10 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 2 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 8 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 16 |
| `posting-routes-dials.spec.ts` | 14 | 0.3 min | shard 9 |
| `settings.spec.ts` | 9 | 0.3 min | shard 1 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 15 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 1 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 11 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 13 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 3 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 8 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 4 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 16 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 12 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 15 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 9 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | shard 8 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 7 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 2 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 13 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 1 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `i18n-bundle.spec.ts` | 2 | 0.0 min | shard 5 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-screening.spec.ts` › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188) | mobile-360 | 70.9 s |
| `admin-screening.spec.ts` › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188) | mobile-360 | 69.6 s |
| `admin-screening.spec.ts` › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188) | desktop-1280 | 69.3 s |
| `admin-screening.spec.ts` › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188) | desktop-1280 | 68.7 s |
| `admin-screening.spec.ts` › SC-18 the preview counts the photos not checked by AI, and Approve approves them with the ad (D158) | desktop-1280 | 59.8 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | desktop-1280 | 58.4 s |
| `admin-screening.spec.ts` › SC-23 approving an ad shows its held photos only; a failed photo waits for its own decision (D178) | mobile-360 | 58.2 s |
| `admin-screening.spec.ts` › SC-12 two ticked ads are approved together, after one confirmation that counts them | mobile-360 | 58.1 s |
| `admin-screening.spec.ts` › SC-14 Reject at the foot of the preview closes it and keeps the ad off | mobile-360 | 57.9 s |
| `admin-screening.spec.ts` › SC-3 Reject keeps the ad off | mobile-360 | 57.9 s |
| `admin-screening.spec.ts` › SC-23 approving an ad shows its held photos only; a failed photo waits for its own decision (D178) | desktop-1280 | 57.7 s |
| `admin-screening.spec.ts` › SC-2 Approve puts the ad on the site | mobile-360 | 57.3 s |
| `admin-screening.spec.ts` › SC-14 Reject at the foot of the preview closes it and keeps the ad off | desktop-1280 | 57.1 s |
| `admin-screening.spec.ts` › SC-18 the preview counts the photos not checked by AI, and Approve approves them with the ad (D158) | mobile-360 | 56.4 s |
| `admin-screening.spec.ts` › SC-3 Reject keeps the ad off | desktop-1280 | 56.1 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44247634746-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 44247634746-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44247634746-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 44247634746-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44247634746-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 44247634746-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 44247634746-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44247634746-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44247634746-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 3, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 44247634746-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 44247634746-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44247634746-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44247634746-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 44247634746-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 44247634746-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 44247634746-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 44247634746-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 44247634746-local-16
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "ownerOnly:closed-active"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "ownerOnly:closed-active"
Received: "notYourListing"

  351 |       roles,
  352 |     );
> 353 |     expect((await reopen(b, x.id)).error).toBe("ownerOnly:closed-active");
      |                                           ^
  354 |     const service = await adminClient().rpc("transition_listing", {
  355 |       p_listing_id: x.id,
  356 |       p_new_status: "active",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:353:43
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-2-Nobody-else-moves-a-seller-s-ad-and-a-refused-call-writes-nothing-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-13738-refused-call-writes-nothing-mobile-360`; this run carried 108 context file(s); of the same spec: none

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-10 The renew setting: signed-in users read its two values; only listings:enforce with a fresh second factor may change it (D175)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"

  719 |     const set = (person: Person, allowed: boolean | null, n: number) =>
  720 |       person.rpc("admin_set_listing_policy", { p_renew_allowed: allowed, p_renew_days: n });
> 721 |     expect((await set(me, true, 30)).error).toBe("permission denied");
      |                                             ^
  722 |     // The same seller, now holding listings:view and listings:review (DEC-174).
  723 |     await grantScratchRole(
  724 |       seller.id,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:721:45
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-10-The-renew-setting-signed-in-users-read-its-two-values-only-listings-enforce-with-a-fresh-second-factor-may-change-it-D175-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-bdee8--factor-may-change-it-D175--mobile-360`; this run carried 108 context file(s); of the same spec: none

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "ownerOnly:closed-active"
Received: "notYourListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "ownerOnly:closed-active"
Received: "notYourListing"

  351 |       roles,
  352 |     );
> 353 |     expect((await reopen(b, x.id)).error).toBe("ownerOnly:closed-active");
      |                                           ^
  354 |     const service = await adminClient().rpc("transition_listing", {
  355 |       p_listing_id: x.id,
  356 |       p_new_status: "active",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:353:43
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-2-Nobody-else-moves-a-seller-s-ad-and-a-refused-call-writes-nothing-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-13738-refused-call-writes-nothing-desktop-1280`; this run carried 108 context file(s); of the same spec: none

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-10 The renew setting: signed-in users read its two values; only listings:enforce with a fresh second factor may change it (D175)

- Source: `shard 3`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"

  719 |     const set = (person: Person, allowed: boolean | null, n: number) =>
  720 |       person.rpc("admin_set_listing_policy", { p_renew_allowed: allowed, p_renew_days: n });
> 721 |     expect((await set(me, true, 30)).error).toBe("permission denied");
      |                                             ^
  722 |     // The same seller, now holding listings:view and listings:review (DEC-174).
  723 |     await grantScratchRole(
  724 |       seller.id,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:721:45
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-10-The-renew-setting-signed-in-users-read-its-two-values-only-listings-enforce-with-a-fresh-second-factor-may-change-it-D175-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-bdee8--factor-may-change-it-D175--desktop-1280`; this run carried 108 context file(s); of the same spec: none

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "reveal",
+ ]
--- further error 1 ---
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "reveal",
+ ]

  250 |     expect(labels.length, "matrix vocabulary: nothing rendered").toBeGreaterThan(0);
  251 |     const english = labels.filter((label) => !ALLOW.has(label) && LATIN_ONLY.test(label));
> 252 |     expect(english, "matrix vocabulary: raw English actions/resources rendered").toEqual([]);
      |                                                                                  ^
  253 |     assertAmharicChrome(labels, "roles permission matrix");
  254 |   });
  255 | });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/i18n-coverage.spec.ts:252:82
```

Context:

```text
          - listitem [ref=e588]:
            - generic [ref=e589]: ስለ እኛ
          - listitem [ref=e590]:
            - generic [ref=e591]: ያግኙን
      - navigation "እገዛ" [ref=e592]:
        - heading "እገዛ" [level=2] [ref=e593]
        - list [ref=e594]:
          - listitem [ref=e595]:
            - generic [ref=e596]: ደህንነት
      - navigation "ሕጋዊ" [ref=e597]:
        - heading "ሕጋዊ" [level=2] [ref=e598]
        - list [ref=e599]:
          - listitem [ref=e600]:
            - link "ውሎች" [ref=e601] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e602]:
            - link "ግላዊነት" [ref=e603] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e605]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "reveal",
+ ]
--- further error 1 ---
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "reveal",
+ ]

  250 |     expect(labels.length, "matrix vocabulary: nothing rendered").toBeGreaterThan(0);
  251 |     const english = labels.filter((label) => !ALLOW.has(label) && LATIN_ONLY.test(label));
> 252 |     expect(english, "matrix vocabulary: raw English actions/resources rendered").toEqual([]);
      |                                                                                  ^
  253 |     assertAmharicChrome(labels, "roles permission matrix");
  254 |   });
  255 | });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/i18n-coverage.spec.ts:252:82
```

Context:

```text
          - listitem [ref=e593]:
            - generic [ref=e594]: ስለ እኛ
          - listitem [ref=e595]:
            - generic [ref=e596]: ያግኙን
      - navigation "እገዛ" [ref=e597]:
        - heading "እገዛ" [level=2] [ref=e598]
        - list [ref=e599]:
          - listitem [ref=e600]:
            - generic [ref=e601]: ደህንነት
      - navigation "ሕጋዊ" [ref=e602]:
        - heading "ሕጋዊ" [level=2] [ref=e603]
        - list [ref=e604]:
          - listitem [ref=e605]:
            - link "ውሎች" [ref=e606] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e607]:
            - link "ግላዊነት" [ref=e608] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e610]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-2 All listings: the views, the filters and newest first

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown view"
Received: "badValue:view"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown view"
Received: "badValue:view"

  285 |     const page1 = await list(page, { p_seller: seller.alias, p_limit: 2, p_offset: 0 });
  286 |     expect((page1.data as Row[]).map((row) => row.total_count)).toEqual([5, 5]);
> 287 |     expect((await list(page, { p_view: "bogus" })).error).toBe("unknown view");
      |                                                           ^
  288 |   });
  289 |
  290 |   /**
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:287:59
```

Context:

```text
          - listitem [ref=e323]:
            - generic [ref=e324]: About
          - listitem [ref=e325]:
            - generic [ref=e326]: Contact
      - navigation "Help" [ref=e327]:
        - heading "Help" [level=2] [ref=e328]
        - list [ref=e329]:
          - listitem [ref=e330]:
            - generic [ref=e331]: Safety
      - navigation "Legal" [ref=e332]:
        - heading "Legal" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - link "Terms" [ref=e336] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e337]:
            - link "Privacy" [ref=e338] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e340]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-3 An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"

  329 |   test("AL-3 An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written", async () => {
  330 |     await refusedEdit(await leaseUser(), "permission denied", async (person, listingId) => {
> 331 |       expect((await person.rpc("admin_list_listings", { p_search: listingId })).error).toBe(
      |                                                                                        ^
  332 |         "permission denied",
  333 |       );
  334 |       expect((await person.rpc("admin_listing_detail", { p_listing_id: listingId })).error).toBe(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:331:88
    at refusedEdit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:316:29)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:330:5
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-3-An-account-with-no-listing-right-All-listings-the-listing-s-page-and-Edit-refuse-it-nothing-is-written-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-7bc3c-efuse-it-nothing-is-written-mobile-360`; this run carried 108 context file(s); of the same spec: `admin-listings-ADMIN-LISTI-d3fdb-ad-which-offers-no-Set-tier-desktop-1280`, `admin-listings-ADMIN-LISTI-e5ef6-Set-tier-nothing-is-written-mobile-360-retry1`, `admin-listings-ADMIN-LISTI-d3fdb-ad-which-offers-no-Set-tier-mobile-360`, `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-mobile-360-retry1`, `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-desktop-1280`

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"

  320 |       p_reason: "misleading",
  321 |     });
> 322 |     expect(answer.error).toBe(expected);
      |                          ^
  323 |     expect(await auditRows(target.id)).toEqual([]);
  324 |     expect(await noticeRows(target.id)).toEqual([]);
  325 |     expect(await revisionRows(target.id, "edit")).toEqual([]);
    at refusedEdit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:322:26)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:350:5
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-24-Edit-refuses-a-reviewer-listings-view-and-review-not-enforce-and-writes-nothing-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-071c7--enforce-and-writes-nothing-mobile-360`; this run carried 108 context file(s); of the same spec: `admin-listings-ADMIN-LISTI-d3fdb-ad-which-offers-no-Set-tier-desktop-1280`, `admin-listings-ADMIN-LISTI-e5ef6-Set-tier-nothing-is-written-mobile-360-retry1`, `admin-listings-ADMIN-LISTI-d3fdb-ad-which-offers-no-Set-tier-mobile-360`, `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-mobile-360-retry1`, `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-desktop-1280`

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-12 Edit refuses as the super admin: the admin's own, a draft, a removed listing, a key not editable, a reason without its note

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "your own listing is edited the seller's way"
Received: "ownListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "your own listing is edited the seller's way"
Received: "ownListing"

  374 |     const { user } = await signInJobSuperAdmin(page);
  375 |     const own = await seed({ ...seller, id: user.id }, "active", { own: true });
> 376 |     expect((await edit(own.id, { title: "My own" })).error).toBe(
      |                                                             ^
  377 |       "your own listing is edited the seller's way",
  378 |     );
  379 |     expect((await edit(draft.id, { title: "A draft" })).error).toBe("listing not found");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:376:61
```

Context:

```text
          - listitem [ref=e299]:
            - generic [ref=e300]: About
          - listitem [ref=e301]:
            - generic [ref=e302]: Contact
      - navigation "Help" [ref=e303]:
        - heading "Help" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Safety
      - navigation "Legal" [ref=e308]:
        - heading "Legal" [level=2] [ref=e309]
        - list [ref=e310]:
          - listitem [ref=e311]:
            - link "Terms" [ref=e312] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e313]:
            - link "Privacy" [ref=e314] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e316]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-4 Edit: the change, one revision, one audit row and one notice; a live listing stays live

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "nothing changed"
Received: "nothingChanged"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "nothing changed"
Received: "nothingChanged"

  464 |       p_reason: "misleading",
  465 |     });
> 466 |     expect(again.error).toBe("nothing changed");
      |                         ^
  467 |     expect(await revisionRows(target.id, "edit")).toHaveLength(1);
  468 |   });
  469 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:466:25
```

Context:

```text
          - listitem [ref=e299]:
            - generic [ref=e300]: About
          - listitem [ref=e301]:
            - generic [ref=e302]: Contact
      - navigation "Help" [ref=e303]:
        - heading "Help" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Safety
      - navigation "Legal" [ref=e308]:
        - heading "Legal" [level=2] [ref=e309]
        - list [ref=e310]:
          - listitem [ref=e311]:
            - link "Terms" [ref=e312] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e313]:
            - link "Privacy" [ref=e314] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e316]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-6 Edit removes a photo: the row goes, the next becomes the cover, the revision keeps the file

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "error": "photo not found on this listing",
+   "error": "photoNotFound",
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "error": "photo not found on this listing",
+   "error": "photoNotFound",
  }

  549 |         p_reason: "photo",
  550 |       }),
> 551 |     ).toMatchObject({ error: "photo not found on this listing" });
      |       ^
  552 |   });
  553 |
  554 |   test("AL-7 Remove, then Restore: back to Waiting, never straight to live; each move logged and told", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:551:7
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: About
          - listitem [ref=e293]:
            - generic [ref=e294]: Contact
      - navigation "Help" [ref=e295]:
        - heading "Help" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Safety
      - navigation "Legal" [ref=e300]:
        - heading "Legal" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - link "Terms" [ref=e304] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e305]:
            - link "Privacy" [ref=e306] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e308]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-7 Remove, then Restore: back to Waiting, never straight to live; each move logged and told

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown reason"
Received: "badValue:reason"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown reason"
Received: "badValue:reason"

  565 |       });
  566 |
> 567 |     expect((await move("removed", "removed_in_error")).error).toBe("unknown reason");
      |                                                               ^
  568 |     expect((await move("removed", "prohibited")).data).toEqual({
  569 |       ok: true,
  570 |       kind: "admin_remove",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:567:63
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: About
          - listitem [ref=e293]:
            - generic [ref=e294]: Contact
      - navigation "Help" [ref=e295]:
        - heading "Help" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Safety
      - navigation "Legal" [ref=e300]:
        - heading "Legal" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - link "Terms" [ref=e304] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e305]:
            - link "Privacy" [ref=e306] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e308]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "a listing removed for a severe reason is restored by a super admin only"
Received: "step-up required: no verified factor"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "a listing removed for a severe reason is restored by a super admin only"
Received: "step-up required: no verified factor"

  630 |       });
  631 |     expect((await restoreAs(plainRemoved.id)).error).toBe("step-up required: no verified factor");
> 632 |     expect((await restoreAs(severe.id)).error).toBe(
      |                                                ^
  633 |       "a listing removed for a severe reason is restored by a super admin only",
  634 |     );
  635 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:632:48
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-8-Restore-not-by-the-owner-not-without-a-second-factor-a-severe-removal-by-a-super-admin-only-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-7b145-moval-by-a-super-admin-only-mobile-360`; this run carried 108 context file(s); of the same spec: `admin-listings-ADMIN-LISTI-d3fdb-ad-which-offers-no-Set-tier-desktop-1280`, `admin-listings-ADMIN-LISTI-e5ef6-Set-tier-nothing-is-written-mobile-360-retry1`, `admin-listings-ADMIN-LISTI-d3fdb-ad-which-offers-no-Set-tier-mobile-360`, `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-mobile-360-retry1`, `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-desktop-1280`

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-9 Send back to review; the seller reads their own notices and no one else's

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "illegal move: sold -> screening"
Received: "illegalTransition:sold-screening"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "illegal move: sold -> screening"
Received: "illegalTransition:sold-screening"

  660 |       status: "screening",
  661 |     });
> 662 |     expect((await sendBack(sold.id)).error).toBe("illegal move: sold -> screening");
      |                                             ^
  663 |
  664 |     const notices = `seller_notices?select=kind,reason&listing_id=eq.${live.id}`;
  665 |     const owner = await asPerson(seller);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:662:45
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: About
          - listitem [ref=e293]:
            - generic [ref=e294]: Contact
      - navigation "Help" [ref=e295]:
        - heading "Help" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Safety
      - navigation "Legal" [ref=e300]:
        - heading "Legal" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - link "Terms" [ref=e304] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e305]:
            - link "Privacy" [ref=e306] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e308]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "listing not found"
Received: "listingNotFound"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "listing not found"
Received: "listingNotFound"

  1064 |     await grantScratchRole(viewerAccount.id, [["listings", "view"]], roles);
  1065 |     const viewer = await asPerson(viewerAccount);
> 1066 |     expect((await viewer.rpc("admin_listing_detail", { p_listing_id: draft.id })).error).toBe(
       |                                                                                          ^
  1067 |       "listing not found",
  1068 |     );
  1069 |     const seen = await viewer.rpc("admin_listing_detail", { p_listing_id: live.id });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1066:90
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-16-The-listing-page-s-door-who-reads-what-drafts-never-a-pin-and-an-address-named-but-never-shown-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-211bf-dress-named-but-never-shown-mobile-360`; this run carried 108 context file(s); of the same spec: `admin-listings-ADMIN-LISTI-d3fdb-ad-which-offers-no-Set-tier-desktop-1280`, `admin-listings-ADMIN-LISTI-e5ef6-Set-tier-nothing-is-written-mobile-360-retry1`, `admin-listings-ADMIN-LISTI-d3fdb-ad-which-offers-no-Set-tier-mobile-360`, `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-mobile-360-retry1`, `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-desktop-1280`

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-error')
Expected: "This listing does not exist, or it is a seller's draft."
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-error')
    24 × locator resolved to <p role="alert" data-testid="listing-error" class="text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-error')
Expected: "This listing does not exist, or it is a seller's draft."
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-error')
    24 × locator resolved to <p role="alert" data-testid="listing-error" class="text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"


  1254 |
  1255 |     await gotoReady(page, `/admin/listings/${draft.id}`);
> 1256 |     await expect(page.getByTestId("listing-error")).toHaveText(
       |                                                     ^
  1257 |       en["admin.listings.detail.notFound"],
  1258 |       { timeout: 20000 },
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

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-27 Undo refuses: nothing to undo, a stale line, a listing changed since, an undo, the seller's own line, today's rules

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "nothing to undo"
Received: "nothingToUndo"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "nothing to undo"
Received: "nothingToUndo"

  1741 |
  1742 |     // Nothing to undo yet; "undo" is not an edit reason; nothing is written.
> 1743 |     expect((await undo(live.id, new Date().toISOString())).error).toBe("nothing to undo");
       |                                                                   ^
  1744 |     const asReason = await pageDoor(page, "admin_edit_listing", {
  1745 |       p_listing_id: live.id,
  1746 |       p_changes: { title: `Corrected listing ${token()}` },
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1743:67
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: About
          - listitem [ref=e293]:
            - generic [ref=e294]: Contact
      - navigation "Help" [ref=e295]:
        - heading "Help" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Safety
      - navigation "Legal" [ref=e300]:
        - heading "Legal" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - link "Terms" [ref=e304] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e305]:
            - link "Privacy" [ref=e306] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e308]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-29 Neither door moves a posted ad to another category; nothing is written (D172)

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "error": "the category of a posted listing is not changed",
+   "error": "categoryFixed",
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "error": "the category of a posted listing is not changed",
+   "error": "categoryFixed",
  }

  1984 |         p_reason: "misleading",
  1985 |       }),
> 1986 |     ).toMatchObject({ error: "the category of a posted listing is not changed" });
       |       ^
  1987 |     expect(await stored()).toEqual(kept);
  1988 |     expect(await revisionRows(live.id, "edit")).toEqual([]);
  1989 |     expect(await noticeRows(live.id)).toEqual([]);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1986:7
```

Context:

```text
          - listitem [ref=e299]:
            - generic [ref=e300]: About
          - listitem [ref=e301]:
            - generic [ref=e302]: Contact
      - navigation "Help" [ref=e303]:
        - heading "Help" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Safety
      - navigation "Legal" [ref=e308]:
        - heading "Legal" [level=2] [ref=e309]
        - list [ref=e310]:
          - listitem [ref=e311]:
            - link "Terms" [ref=e312] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e313]:
            - link "Privacy" [ref=e314] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e316]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › ATR-2 the dialog refuses the unchanged tier and Other without a note; the door refuses a removed ad, which offers no Set tier

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "a removed listing takes no tier"
Received: "listingRemoved"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "a removed listing takes no tier"
Received: "listingRemoved"

  2295 |       p_reason: "promotion",
  2296 |     });
> 2297 |     expect(refused.error).toBe("a removed listing takes no tier");
       |                           ^
  2298 |     expect((await tierTruth(gone.id))?.["tier"]).toBe("regular");
  2299 |     expect(await tierAudits(gone.id)).toHaveLength(0);
  2300 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2297:27
```

Context:

```text
          - listitem [ref=e408]:
            - generic [ref=e409]: About
          - listitem [ref=e410]:
            - generic [ref=e411]: Contact
      - navigation "Help" [ref=e412]:
        - heading "Help" [level=2] [ref=e413]
        - list [ref=e414]:
          - listitem [ref=e415]:
            - generic [ref=e416]: Safety
      - navigation "Legal" [ref=e417]:
        - heading "Legal" [level=2] [ref=e418]
        - list [ref=e419]:
          - listitem [ref=e420]:
            - link "Terms" [ref=e421] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e422]:
            - link "Privacy" [ref=e423] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e425]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › ATR-3 a reviewer is refused by the door and sees no Set tier; nothing is written

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"

  2327 |       p_reason: "promotion",
  2328 |     });
> 2329 |     expect(denied.error).toBe("permission denied");
       |                          ^
  2330 |
  2331 |     await gotoReady(page, `/admin/listings/${ad.id}`);
  2332 |     await expect(page.getByTestId("listing-title")).toHaveText(ad.title, { timeout: 20000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2329:26
```

Context:

```text
          - listitem [ref=e327]:
            - generic [ref=e328]: About
          - listitem [ref=e329]:
            - generic [ref=e330]: Contact
      - navigation "Help" [ref=e331]:
        - heading "Help" [level=2] [ref=e332]
        - list [ref=e333]:
          - listitem [ref=e334]:
            - generic [ref=e335]: Safety
      - navigation "Legal" [ref=e336]:
        - heading "Legal" [level=2] [ref=e337]
        - list [ref=e338]:
          - listitem [ref=e339]:
            - link "Terms" [ref=e340] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e341]:
            - link "Privacy" [ref=e342] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e344]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › ATR-7 a reviewer's row menu has no Set tier and the door refuses him; nothing is written

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"

  2522 |       p_reason: "promotion",
  2523 |     });
> 2524 |     expect(denied.error).toBe("permission denied");
       |                          ^
  2525 |     expect((await tierTruth(ad.id))?.["tier"]).toBe("regular");
  2526 |     expect(await tierAudits(ad.id)).toHaveLength(0);
  2527 |     expect(await revisionRows(ad.id, "edit")).toHaveLength(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2524:26
```

Context:

```text
              - generic [ref=e282]: Contact
        - navigation "Help" [ref=e283]:
          - heading "Help" [level=2] [ref=e284]
          - list [ref=e285]:
            - listitem [ref=e286]:
              - generic [ref=e287]: Safety
        - navigation "Legal" [ref=e288]:
          - heading "Legal" [level=2] [ref=e289]
          - list [ref=e290]:
            - listitem [ref=e291]:
              - link "Terms" [ref=e292] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e293]:
              - link "Privacy" [ref=e294] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e296]: © 2026 ethio.com — All rights reserved.
  - generic [ref=e298]:
    - text: Actions
    - tooltip "Actions" [ref=e299]
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-2 All listings: the views, the filters and newest first

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown view"
Received: "badValue:view"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown view"
Received: "badValue:view"

  285 |     const page1 = await list(page, { p_seller: seller.alias, p_limit: 2, p_offset: 0 });
  286 |     expect((page1.data as Row[]).map((row) => row.total_count)).toEqual([5, 5]);
> 287 |     expect((await list(page, { p_view: "bogus" })).error).toBe("unknown view");
      |                                                           ^
  288 |   });
  289 |
  290 |   /**
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:287:59
```

Context:

```text
          - listitem [ref=e401]:
            - generic [ref=e402]: About
          - listitem [ref=e403]:
            - generic [ref=e404]: Contact
      - navigation "Help" [ref=e405]:
        - heading "Help" [level=2] [ref=e406]
        - list [ref=e407]:
          - listitem [ref=e408]:
            - generic [ref=e409]: Safety
      - navigation "Legal" [ref=e410]:
        - heading "Legal" [level=2] [ref=e411]
        - list [ref=e412]:
          - listitem [ref=e413]:
            - link "Terms" [ref=e414] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e415]:
            - link "Privacy" [ref=e416] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e418]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-3 An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"

  329 |   test("AL-3 An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written", async () => {
  330 |     await refusedEdit(await leaseUser(), "permission denied", async (person, listingId) => {
> 331 |       expect((await person.rpc("admin_list_listings", { p_search: listingId })).error).toBe(
      |                                                                                        ^
  332 |         "permission denied",
  333 |       );
  334 |       expect((await person.rpc("admin_listing_detail", { p_listing_id: listingId })).error).toBe(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:331:88
    at refusedEdit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:316:29)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:330:5
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-3-An-account-with-no-listing-right-All-listings-the-listing-s-page-and-Edit-refuse-it-nothing-is-written-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-7bc3c-efuse-it-nothing-is-written-desktop-1280`; this run carried 108 context file(s); of the same spec: `admin-listings-ADMIN-LISTI-d3fdb-ad-which-offers-no-Set-tier-desktop-1280`, `admin-listings-ADMIN-LISTI-e5ef6-Set-tier-nothing-is-written-mobile-360-retry1`, `admin-listings-ADMIN-LISTI-d3fdb-ad-which-offers-no-Set-tier-mobile-360`, `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-mobile-360-retry1`, `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-desktop-1280`

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"

  320 |       p_reason: "misleading",
  321 |     });
> 322 |     expect(answer.error).toBe(expected);
      |                          ^
  323 |     expect(await auditRows(target.id)).toEqual([]);
  324 |     expect(await noticeRows(target.id)).toEqual([]);
  325 |     expect(await revisionRows(target.id, "edit")).toEqual([]);
    at refusedEdit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:322:26)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:350:5
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-24-Edit-refuses-a-reviewer-listings-view-and-review-not-enforce-and-writes-nothing-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-071c7--enforce-and-writes-nothing-desktop-1280`; this run carried 108 context file(s); of the same spec: `admin-listings-ADMIN-LISTI-d3fdb-ad-which-offers-no-Set-tier-desktop-1280`, `admin-listings-ADMIN-LISTI-e5ef6-Set-tier-nothing-is-written-mobile-360-retry1`, `admin-listings-ADMIN-LISTI-d3fdb-ad-which-offers-no-Set-tier-mobile-360`, `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-mobile-360-retry1`, `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-desktop-1280`

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-12 Edit refuses as the super admin: the admin's own, a draft, a removed listing, a key not editable, a reason without its note

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "your own listing is edited the seller's way"
Received: "ownListing"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "your own listing is edited the seller's way"
Received: "ownListing"

  374 |     const { user } = await signInJobSuperAdmin(page);
  375 |     const own = await seed({ ...seller, id: user.id }, "active", { own: true });
> 376 |     expect((await edit(own.id, { title: "My own" })).error).toBe(
      |                                                             ^
  377 |       "your own listing is edited the seller's way",
  378 |     );
  379 |     expect((await edit(draft.id, { title: "A draft" })).error).toBe("listing not found");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:376:61
```

Context:

```text
          - listitem [ref=e399]:
            - generic [ref=e400]: About
          - listitem [ref=e401]:
            - generic [ref=e402]: Contact
      - navigation "Help" [ref=e403]:
        - heading "Help" [level=2] [ref=e404]
        - list [ref=e405]:
          - listitem [ref=e406]:
            - generic [ref=e407]: Safety
      - navigation "Legal" [ref=e408]:
        - heading "Legal" [level=2] [ref=e409]
        - list [ref=e410]:
          - listitem [ref=e411]:
            - link "Terms" [ref=e412] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e413]:
            - link "Privacy" [ref=e414] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e416]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-4 Edit: the change, one revision, one audit row and one notice; a live listing stays live

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "nothing changed"
Received: "nothingChanged"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "nothing changed"
Received: "nothingChanged"

  464 |       p_reason: "misleading",
  465 |     });
> 466 |     expect(again.error).toBe("nothing changed");
      |                         ^
  467 |     expect(await revisionRows(target.id, "edit")).toHaveLength(1);
  468 |   });
  469 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:466:25
```

Context:

```text
          - listitem [ref=e399]:
            - generic [ref=e400]: About
          - listitem [ref=e401]:
            - generic [ref=e402]: Contact
      - navigation "Help" [ref=e403]:
        - heading "Help" [level=2] [ref=e404]
        - list [ref=e405]:
          - listitem [ref=e406]:
            - generic [ref=e407]: Safety
      - navigation "Legal" [ref=e408]:
        - heading "Legal" [level=2] [ref=e409]
        - list [ref=e410]:
          - listitem [ref=e411]:
            - link "Terms" [ref=e412] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e413]:
            - link "Privacy" [ref=e414] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e416]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-6 Edit removes a photo: the row goes, the next becomes the cover, the revision keeps the file

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "error": "photo not found on this listing",
+   "error": "photoNotFound",
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "error": "photo not found on this listing",
+   "error": "photoNotFound",
  }

  549 |         p_reason: "photo",
  550 |       }),
> 551 |     ).toMatchObject({ error: "photo not found on this listing" });
      |       ^
  552 |   });
  553 |
  554 |   test("AL-7 Remove, then Restore: back to Waiting, never straight to live; each move logged and told", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:551:7
```

Context:

```text
          - listitem [ref=e417]:
            - generic [ref=e418]: About
          - listitem [ref=e419]:
            - generic [ref=e420]: Contact
      - navigation "Help" [ref=e421]:
        - heading "Help" [level=2] [ref=e422]
        - list [ref=e423]:
          - listitem [ref=e424]:
            - generic [ref=e425]: Safety
      - navigation "Legal" [ref=e426]:
        - heading "Legal" [level=2] [ref=e427]
        - list [ref=e428]:
          - listitem [ref=e429]:
            - link "Terms" [ref=e430] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e431]:
            - link "Privacy" [ref=e432] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e434]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-7 Remove, then Restore: back to Waiting, never straight to live; each move logged and told

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown reason"
Received: "badValue:reason"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown reason"
Received: "badValue:reason"

  565 |       });
  566 |
> 567 |     expect((await move("removed", "removed_in_error")).error).toBe("unknown reason");
      |                                                               ^
  568 |     expect((await move("removed", "prohibited")).data).toEqual({
  569 |       ok: true,
  570 |       kind: "admin_remove",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:567:63
```

Context:

```text
          - listitem [ref=e407]:
            - generic [ref=e408]: About
          - listitem [ref=e409]:
            - generic [ref=e410]: Contact
      - navigation "Help" [ref=e411]:
        - heading "Help" [level=2] [ref=e412]
        - list [ref=e413]:
          - listitem [ref=e414]:
            - generic [ref=e415]: Safety
      - navigation "Legal" [ref=e416]:
        - heading "Legal" [level=2] [ref=e417]
        - list [ref=e418]:
          - listitem [ref=e419]:
            - link "Terms" [ref=e420] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e421]:
            - link "Privacy" [ref=e422] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e424]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "a listing removed for a severe reason is restored by a super admin only"
Received: "step-up required: no verified factor"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "a listing removed for a severe reason is restored by a super admin only"
Received: "step-up required: no verified factor"

  630 |       });
  631 |     expect((await restoreAs(plainRemoved.id)).error).toBe("step-up required: no verified factor");
> 632 |     expect((await restoreAs(severe.id)).error).toBe(
      |                                                ^
  633 |       "a listing removed for a severe reason is restored by a super admin only",
  634 |     );
  635 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:632:48
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-8-Restore-not-by-the-owner-not-without-a-second-factor-a-severe-removal-by-a-super-admin-only-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-7b145-moval-by-a-super-admin-only-desktop-1280`; this run carried 108 context file(s); of the same spec: `admin-listings-ADMIN-LISTI-d3fdb-ad-which-offers-no-Set-tier-desktop-1280`, `admin-listings-ADMIN-LISTI-e5ef6-Set-tier-nothing-is-written-mobile-360-retry1`, `admin-listings-ADMIN-LISTI-d3fdb-ad-which-offers-no-Set-tier-mobile-360`, `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-mobile-360-retry1`, `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-desktop-1280`

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-9 Send back to review; the seller reads their own notices and no one else's

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "illegal move: sold -> screening"
Received: "illegalTransition:sold-screening"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "illegal move: sold -> screening"
Received: "illegalTransition:sold-screening"

  660 |       status: "screening",
  661 |     });
> 662 |     expect((await sendBack(sold.id)).error).toBe("illegal move: sold -> screening");
      |                                             ^
  663 |
  664 |     const notices = `seller_notices?select=kind,reason&listing_id=eq.${live.id}`;
  665 |     const owner = await asPerson(seller);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:662:45
```

Context:

```text
          - listitem [ref=e407]:
            - generic [ref=e408]: About
          - listitem [ref=e409]:
            - generic [ref=e410]: Contact
      - navigation "Help" [ref=e411]:
        - heading "Help" [level=2] [ref=e412]
        - list [ref=e413]:
          - listitem [ref=e414]:
            - generic [ref=e415]: Safety
      - navigation "Legal" [ref=e416]:
        - heading "Legal" [level=2] [ref=e417]
        - list [ref=e418]:
          - listitem [ref=e419]:
            - link "Terms" [ref=e420] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e421]:
            - link "Privacy" [ref=e422] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e424]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "listing not found"
Received: "listingNotFound"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "listing not found"
Received: "listingNotFound"

  1064 |     await grantScratchRole(viewerAccount.id, [["listings", "view"]], roles);
  1065 |     const viewer = await asPerson(viewerAccount);
> 1066 |     expect((await viewer.rpc("admin_listing_detail", { p_listing_id: draft.id })).error).toBe(
       |                                                                                          ^
  1067 |       "listing not found",
  1068 |     );
  1069 |     const seen = await viewer.rpc("admin_listing_detail", { p_listing_id: live.id });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1066:90
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-16-The-listing-page-s-door-who-reads-what-drafts-never-a-pin-and-an-address-named-but-never-shown-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-211bf-dress-named-but-never-shown-desktop-1280`; this run carried 108 context file(s); of the same spec: `admin-listings-ADMIN-LISTI-d3fdb-ad-which-offers-no-Set-tier-desktop-1280`, `admin-listings-ADMIN-LISTI-e5ef6-Set-tier-nothing-is-written-mobile-360-retry1`, `admin-listings-ADMIN-LISTI-d3fdb-ad-which-offers-no-Set-tier-mobile-360`, `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-mobile-360-retry1`, `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-desktop-1280`

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-error')
Expected: "This listing does not exist, or it is a seller's draft."
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-error')
    24 × locator resolved to <p role="alert" data-testid="listing-error" class="text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-error')
Expected: "This listing does not exist, or it is a seller's draft."
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-error')
    24 × locator resolved to <p role="alert" data-testid="listing-error" class="text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"


  1254 |
  1255 |     await gotoReady(page, `/admin/listings/${draft.id}`);
> 1256 |     await expect(page.getByTestId("listing-error")).toHaveText(
       |                                                     ^
  1257 |       en["admin.listings.detail.notFound"],
  1258 |       { timeout: 20000 },
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

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-27 Undo refuses: nothing to undo, a stale line, a listing changed since, an undo, the seller's own line, today's rules

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "nothing to undo"
Received: "nothingToUndo"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "nothing to undo"
Received: "nothingToUndo"

  1741 |
  1742 |     // Nothing to undo yet; "undo" is not an edit reason; nothing is written.
> 1743 |     expect((await undo(live.id, new Date().toISOString())).error).toBe("nothing to undo");
       |                                                                   ^
  1744 |     const asReason = await pageDoor(page, "admin_edit_listing", {
  1745 |       p_listing_id: live.id,
  1746 |       p_changes: { title: `Corrected listing ${token()}` },
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1743:67
```

Context:

```text
          - listitem [ref=e369]:
            - generic [ref=e370]: About
          - listitem [ref=e371]:
            - generic [ref=e372]: Contact
      - navigation "Help" [ref=e373]:
        - heading "Help" [level=2] [ref=e374]
        - list [ref=e375]:
          - listitem [ref=e376]:
            - generic [ref=e377]: Safety
      - navigation "Legal" [ref=e378]:
        - heading "Legal" [level=2] [ref=e379]
        - list [ref=e380]:
          - listitem [ref=e381]:
            - link "Terms" [ref=e382] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e383]:
            - link "Privacy" [ref=e384] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e386]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-29 Neither door moves a posted ad to another category; nothing is written (D172)

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "error": "the category of a posted listing is not changed",
+   "error": "categoryFixed",
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 1
+ Received  + 1

  Object {
-   "error": "the category of a posted listing is not changed",
+   "error": "categoryFixed",
  }

  1984 |         p_reason: "misleading",
  1985 |       }),
> 1986 |     ).toMatchObject({ error: "the category of a posted listing is not changed" });
       |       ^
  1987 |     expect(await stored()).toEqual(kept);
  1988 |     expect(await revisionRows(live.id, "edit")).toEqual([]);
  1989 |     expect(await noticeRows(live.id)).toEqual([]);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1986:7
```

Context:

```text
          - listitem [ref=e417]:
            - generic [ref=e418]: About
          - listitem [ref=e419]:
            - generic [ref=e420]: Contact
      - navigation "Help" [ref=e421]:
        - heading "Help" [level=2] [ref=e422]
        - list [ref=e423]:
          - listitem [ref=e424]:
            - generic [ref=e425]: Safety
      - navigation "Legal" [ref=e426]:
        - heading "Legal" [level=2] [ref=e427]
        - list [ref=e428]:
          - listitem [ref=e429]:
            - link "Terms" [ref=e430] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e431]:
            - link "Privacy" [ref=e432] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e434]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › ATR-2 the dialog refuses the unchanged tier and Other without a note; the door refuses a removed ad, which offers no Set tier

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "a removed listing takes no tier"
Received: "listingRemoved"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "a removed listing takes no tier"
Received: "listingRemoved"

  2295 |       p_reason: "promotion",
  2296 |     });
> 2297 |     expect(refused.error).toBe("a removed listing takes no tier");
       |                           ^
  2298 |     expect((await tierTruth(gone.id))?.["tier"]).toBe("regular");
  2299 |     expect(await tierAudits(gone.id)).toHaveLength(0);
  2300 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2297:27
```

Context:

```text
          - listitem [ref=e388]:
            - generic [ref=e389]: About
          - listitem [ref=e390]:
            - generic [ref=e391]: Contact
      - navigation "Help" [ref=e392]:
        - heading "Help" [level=2] [ref=e393]
        - list [ref=e394]:
          - listitem [ref=e395]:
            - generic [ref=e396]: Safety
      - navigation "Legal" [ref=e397]:
        - heading "Legal" [level=2] [ref=e398]
        - list [ref=e399]:
          - listitem [ref=e400]:
            - link "Terms" [ref=e401] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e402]:
            - link "Privacy" [ref=e403] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e405]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › ATR-3 a reviewer is refused by the door and sees no Set tier; nothing is written

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"

  2327 |       p_reason: "promotion",
  2328 |     });
> 2329 |     expect(denied.error).toBe("permission denied");
       |                          ^
  2330 |
  2331 |     await gotoReady(page, `/admin/listings/${ad.id}`);
  2332 |     await expect(page.getByTestId("listing-title")).toHaveText(ad.title, { timeout: 20000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2329:26
```

Context:

```text
          - listitem [ref=e369]:
            - generic [ref=e370]: About
          - listitem [ref=e371]:
            - generic [ref=e372]: Contact
      - navigation "Help" [ref=e373]:
        - heading "Help" [level=2] [ref=e374]
        - list [ref=e375]:
          - listitem [ref=e376]:
            - generic [ref=e377]: Safety
      - navigation "Legal" [ref=e378]:
        - heading "Legal" [level=2] [ref=e379]
        - list [ref=e380]:
          - listitem [ref=e381]:
            - link "Terms" [ref=e382] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e383]:
            - link "Privacy" [ref=e384] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e386]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › ATR-7 a reviewer's row menu has no Set tier and the door refuses him; nothing is written

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"

  2522 |       p_reason: "promotion",
  2523 |     });
> 2524 |     expect(denied.error).toBe("permission denied");
       |                          ^
  2525 |     expect((await tierTruth(ad.id))?.["tier"]).toBe("regular");
  2526 |     expect(await tierAudits(ad.id)).toHaveLength(0);
  2527 |     expect(await revisionRows(ad.id, "edit")).toHaveLength(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2524:26
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

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-28 who reads the reports: the reporter his own rows, nobody else's; staff with listings:review through the two admin doors; a plain account is refused

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"

  935 |       });
  936 |       expect(insert.error).toContain("permission denied");
> 937 |       expect((await x.rpc("admin_listing_reports", { p_listing_id: ad.id })).error).toContain(
      |                                                                                     ^
  938 |         "permission denied",
  939 |       );
  940 |       expect((await x.rpc("admin_open_report_counts", { p_listing_ids: [ad.id] })).error).toContain(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:937:85
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-28-who-reads-the-reports-the-reporter-his-own-rows-nobody-else-s-staff-with-listings-review-through-the-two-admin-doors-a-plain-account-is-refused-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-298ee--a-plain-account-is-refused-mobile-360`; this run carried 108 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-28 who reads the reports: the reporter his own rows, nobody else's; staff with listings:review through the two admin doors; a plain account is refused

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "permissionDenied"

  935 |       });
  936 |       expect(insert.error).toContain("permission denied");
> 937 |       expect((await x.rpc("admin_listing_reports", { p_listing_id: ad.id })).error).toContain(
      |                                                                                     ^
  938 |         "permission denied",
  939 |       );
  940 |       expect((await x.rpc("admin_open_report_counts", { p_listing_ids: [ad.id] })).error).toContain(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:937:85
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-28-who-reads-the-reports-the-reporter-his-own-rows-nobody-else-s-staff-with-listings-review-through-the-two-admin-doors-a-plain-account-is-refused-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-298ee--a-plain-account-is-refused-desktop-1280`; this run carried 108 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-2 Approve puts the ad on the site

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"


  242 |     await page.getByTestId("admin-screening-confirm-go").click();
  243 |     await stepUpIfPrompted(page, secret);
> 244 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  245 |       en["admin.screening.approved"],
  246 |       { timeout: 20000 },
```

Context:

```text
          - listitem [ref=e378]:
            - generic [ref=e379]: About
          - listitem [ref=e380]:
            - generic [ref=e381]: Contact
      - navigation "Help" [ref=e382]:
        - heading "Help" [level=2] [ref=e383]
        - list [ref=e384]:
          - listitem [ref=e385]:
            - generic [ref=e386]: Safety
      - navigation "Legal" [ref=e387]:
        - heading "Legal" [level=2] [ref=e388]
        - list [ref=e389]:
          - listitem [ref=e390]:
            - link "Terms" [ref=e391] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e392]:
            - link "Privacy" [ref=e393] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e395]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-3 Reject keeps the ad off

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Rejected"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Rejected"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"


  261 |     await page.getByTestId("admin-screening-confirm-go").click();
  262 |     await stepUpIfPrompted(page, secret);
> 263 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  264 |       en["admin.screening.rejected"],
  265 |       { timeout: 20000 },
```

Context:

```text
          - listitem [ref=e378]:
            - generic [ref=e379]: About
          - listitem [ref=e380]:
            - generic [ref=e381]: Contact
      - navigation "Help" [ref=e382]:
        - heading "Help" [level=2] [ref=e383]
        - list [ref=e384]:
          - listitem [ref=e385]:
            - generic [ref=e386]: Safety
      - navigation "Legal" [ref=e387]:
        - heading "Legal" [level=2] [ref=e388]
        - list [ref=e389]:
          - listitem [ref=e390]:
            - link "Terms" [ref=e391] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e392]:
            - link "Privacy" [ref=e393] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e395]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-16 a reviewer without a fresh second factor cannot decide

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /no verified factor|step-up required/i
Received string:  "notYourListing"
--- further error 1 ---
Error: expect(received).toMatch(expected)

Expected pattern: /no verified factor|step-up required/i
Received string:  "notYourListing"

  309 |       })
  310 |     ).error;
> 311 |     expect(deniedReviewer).toMatch(/no verified factor|step-up required/i);
      |                            ^
  312 |     expect((await listingTruth(ad.id)).status).toBe("screening");
  313 |   });
  314 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:311:28
```

Context:

```text
          - listitem [ref=e321]:
            - generic [ref=e322]: About
          - listitem [ref=e323]:
            - generic [ref=e324]: Contact
      - navigation "Help" [ref=e325]:
        - heading "Help" [level=2] [ref=e326]
        - list [ref=e327]:
          - listitem [ref=e328]:
            - generic [ref=e329]: Safety
      - navigation "Legal" [ref=e330]:
        - heading "Legal" [level=2] [ref=e331]
        - list [ref=e332]:
          - listitem [ref=e333]:
            - link "Terms" [ref=e334] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e335]:
            - link "Privacy" [ref=e336] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e338]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-8 a person who is not a reviewer reads nothing and reveals nothing, and no row is written

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"

  397 |     await gotoReady(page, "/");
  398 |     const facts = await pageDoor(page, "admin_screening_facts", { p_listing_id: ad.id });
> 399 |     expect(facts.error).toBe("permission denied");
      |                         ^
  400 |     const shown = await pageDoor(page, "admin_reveal_listing_contact", {
  401 |       p_listing_id: ad.id,
  402 |       p_channel: "phone",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:399:25
```

Context:

```text
          - listitem [ref=e265]:
            - generic [ref=e266]: About
          - listitem [ref=e267]:
            - generic [ref=e268]: Contact
      - navigation "Help" [ref=e269]:
        - heading "Help" [level=2] [ref=e270]
        - list [ref=e271]:
          - listitem [ref=e272]:
            - generic [ref=e273]: Safety
      - navigation "Legal" [ref=e274]:
        - heading "Legal" [level=2] [ref=e275]
        - list [ref=e276]:
          - listitem [ref=e277]:
            - link "Terms" [ref=e278] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e279]:
            - link "Privacy" [ref=e280] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e282]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-17 a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129)

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: SC-17: the reveal asked for a second factor (D129)

expect(received).toBeNull()

Received: "permissionDenied"
--- further error 1 ---
Error: SC-17: the reveal asked for a second factor (D129)

expect(received).toBeNull()

Received: "permissionDenied"

  422 |       p_channel: "phone",
  423 |     });
> 424 |     expect(revealed.error, "SC-17: the reveal asked for a second factor (D129)").toBeNull();
      |                                                                                  ^
  425 |     expect(revealed.data).toEqual({ ok: true, channel: "phone", value: "+251911000101" });
  426 |     expect(await revealRows(ad.id)).toEqual([
  427 |       { actor_id: reviewer.id, action: "listing.contact_revealed", meta: { channel: "phone" } },
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:424:82
```

Context:

```text
          - listitem [ref=e257]:
            - generic [ref=e258]: About
          - listitem [ref=e259]:
            - generic [ref=e260]: Contact
      - navigation "Help" [ref=e261]:
        - heading "Help" [level=2] [ref=e262]
        - list [ref=e263]:
          - listitem [ref=e264]:
            - generic [ref=e265]: Safety
      - navigation "Legal" [ref=e266]:
        - heading "Legal" [level=2] [ref=e267]
        - list [ref=e268]:
          - listitem [ref=e269]:
            - link "Terms" [ref=e270] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e271]:
            - link "Privacy" [ref=e272] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e274]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-9 Show number: a reviewer with a fresh second factor gets the number, and one audit row names the channel and never the number

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown channel"
Received: "badValue:channel"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown channel"
Received: "badValue:channel"

  458 |       p_channel: "telegram",
  459 |     });
> 460 |     expect(handle.error).toBe("unknown channel");
      |                          ^
  461 |     expect(await revealRows(ad.id), "SC-9: a refused reveal wrote a row").toHaveLength(1);
  462 |   });
  463 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:460:26
```

Context:

```text
          - listitem [ref=e271]:
            - generic [ref=e272]: About
          - listitem [ref=e273]:
            - generic [ref=e274]: Contact
      - navigation "Help" [ref=e275]:
        - heading "Help" [level=2] [ref=e276]
        - list [ref=e277]:
          - listitem [ref=e278]:
            - generic [ref=e279]: Safety
      - navigation "Legal" [ref=e280]:
        - heading "Legal" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - link "Terms" [ref=e284] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e285]:
            - link "Privacy" [ref=e286] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e288]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-10 an ad that is not waiting for review answers neither door

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "listing not found"
Received: "listingNotFound"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "listing not found"
Received: "listingNotFound"

  466 |     await signInJobSuperAdmin(page);
  467 |     const facts = await pageDoor(page, "admin_screening_facts", { p_listing_id: ad.id });
> 468 |     expect(facts.error).toBe("listing not found");
      |                         ^
  469 |     const shown = await pageDoor(page, "admin_reveal_listing_contact", {
  470 |       p_listing_id: ad.id,
  471 |       p_channel: "phone",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:468:25
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: About
          - listitem [ref=e293]:
            - generic [ref=e294]: Contact
      - navigation "Help" [ref=e295]:
        - heading "Help" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Safety
      - navigation "Legal" [ref=e300]:
        - heading "Legal" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - link "Terms" [ref=e304] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e305]:
            - link "Privacy" [ref=e306] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e308]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-12 two ticked ads are approved together, after one confirmation that counts them

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"


  561 |     await page.getByTestId("admin-screening-confirm-go").click();
  562 |     await stepUpIfPrompted(page, secret);
> 563 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  564 |       en["admin.screening.approved"],
  565 |       { timeout: 20000 },
```

Context:

```text
          - listitem [ref=e409]:
            - generic [ref=e410]: About
          - listitem [ref=e411]:
            - generic [ref=e412]: Contact
      - navigation "Help" [ref=e413]:
        - heading "Help" [level=2] [ref=e414]
        - list [ref=e415]:
          - listitem [ref=e416]:
            - generic [ref=e417]: Safety
      - navigation "Legal" [ref=e418]:
        - heading "Legal" [level=2] [ref=e419]
        - list [ref=e420]:
          - listitem [ref=e421]:
            - link "Terms" [ref=e422] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e423]:
            - link "Privacy" [ref=e424] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e426]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-14 Reject at the foot of the preview closes it and keeps the ad off

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Rejected"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Rejected"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"


  680 |     await page.getByTestId("admin-screening-confirm-go").click();
  681 |     await stepUpIfPrompted(page, secret);
> 682 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  683 |       en["admin.screening.rejected"],
  684 |       { timeout: 20000 },
```

Context:

```text
          - listitem [ref=e378]:
            - generic [ref=e379]: About
          - listitem [ref=e380]:
            - generic [ref=e381]: Contact
      - navigation "Help" [ref=e382]:
        - heading "Help" [level=2] [ref=e383]
        - list [ref=e384]:
          - listitem [ref=e385]:
            - generic [ref=e386]: Safety
      - navigation "Legal" [ref=e387]:
        - heading "Legal" [level=2] [ref=e388]
        - list [ref=e389]:
          - listitem [ref=e390]:
            - link "Terms" [ref=e391] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e392]:
            - link "Privacy" [ref=e393] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e395]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129)

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]').getByTestId('admin-screening-number-whatsapp')
Expected: "+251911000303"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]').getByTestId('admin-screening-number-whatsapp')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]').getByTestId('admin-screening-number-whatsapp')
Expected: "+251911000303"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]').getByTestId('admin-screening-number-whatsapp')


  712 |         .locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]')
  713 |         .getByTestId("admin-screening-number-whatsapp"),
> 714 |     ).toHaveText("+251911000303", { timeout: 20000 });
      |       ^
  715 |     await expect(
  716 |       page.getByTestId("step-up-modal"),
  717 |       "SC-15: Show number asked for a code",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:714:7
```

Context:

```text
          - generic [ref=e43]:
            - generic [ref=e44]:
              - heading "Description" [level=3] [ref=e45]
              - paragraph [ref=e46]: e2e scratch listing for the screening queue
            - complementary [ref=e47]:
              - heading "Meet, inspect, then pay — no deposit, no payment link, no code" [level=3] [ref=e48]
              - list [ref=e49]:
                - listitem [ref=e50]: Never pay a deposit, a delivery fee or a 'booking' before you have seen the item.
                - listitem [ref=e51]: Meet the seller in a public place, in daylight, with someone you trust.
                - listitem [ref=e52]: Inspect what you are buying; test it; check every document.
                - listitem [ref=e53]: Pay only when the item is in your hands — no payment links, no codes, no transfers to 'reserve' it.
      - generic [ref=e54]:
        - link "Open the ad's page" [ref=e55] [cursor=pointer]:
          - /url: /admin/listings/[account id]
        - button "Approve" [ref=e56] [cursor=pointer]
        - button "Reject" [ref=e57] [cursor=pointer]
    - button "Close" [ref=e58] [cursor=pointer]:
      - img [ref=e59]
      - generic [ref=e62]: Close
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-18 the preview counts the photos not checked by AI, and Approve approves them with the ad (D158)

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"


  831 |     await page.getByTestId("admin-screening-confirm-go").click();
  832 |     await stepUpIfPrompted(page, secret);
> 833 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  834 |       en["admin.screening.approved"],
  835 |       { timeout: 20000 },
```

Context:

```text
          - listitem [ref=e378]:
            - generic [ref=e379]: About
          - listitem [ref=e380]:
            - generic [ref=e381]: Contact
      - navigation "Help" [ref=e382]:
        - heading "Help" [level=2] [ref=e383]
        - list [ref=e384]:
          - listitem [ref=e385]:
            - generic [ref=e386]: Safety
      - navigation "Legal" [ref=e387]:
        - heading "Legal" [level=2] [ref=e388]
        - list [ref=e389]:
          - listitem [ref=e390]:
            - link "Terms" [ref=e391] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e392]:
            - link "Privacy" [ref=e393] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e395]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-23 approving an ad shows its held photos only; a failed photo waits for its own decision (D178)

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"


  1153 |     await page.getByTestId("admin-screening-confirm-go").click();
  1154 |     await stepUpIfPrompted(page, secret);
> 1155 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
       |                                                              ^
  1156 |       en["admin.screening.approved"],
  1157 |       { timeout: 20000 },
```

Context:

```text
          - listitem [ref=e400]:
            - generic [ref=e401]: About
          - listitem [ref=e402]:
            - generic [ref=e403]: Contact
      - navigation "Help" [ref=e404]:
        - heading "Help" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: Safety
      - navigation "Legal" [ref=e409]:
        - heading "Legal" [level=2] [ref=e410]
        - list [ref=e411]:
          - listitem [ref=e412]:
            - link "Terms" [ref=e413] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e414]:
            - link "Privacy" [ref=e415] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e417]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188)

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"


  1349 |     await page.getByTestId("admin-screening-confirm-go").click();
  1350 |     await stepUpIfPrompted(page, secret);
> 1351 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
       |                                                              ^
  1352 |       en["admin.screening.approved"],
  1353 |       { timeout: 20000 },
```

Context:

```text
          - listitem [ref=e430]:
            - generic [ref=e431]: About
          - listitem [ref=e432]:
            - generic [ref=e433]: Contact
      - navigation "Help" [ref=e434]:
        - heading "Help" [level=2] [ref=e435]
        - list [ref=e436]:
          - listitem [ref=e437]:
            - generic [ref=e438]: Safety
      - navigation "Legal" [ref=e439]:
        - heading "Legal" [level=2] [ref=e440]
        - list [ref=e441]:
          - listitem [ref=e442]:
            - link "Terms" [ref=e443] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e444]:
            - link "Privacy" [ref=e445] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e447]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188)

- Source: `shard 14`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "/admin/screening"
Received: "/admin/listings/[account id]/edit"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "/admin/screening"
Received: "/admin/listings/[account id]/edit"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  1412 |     await page.getByTestId("post-edit-confirm-go").click();
  1413 |     await stepUpIfPrompted(page, secret);
> 1414 |     await expect
       |     ^
  1415 |       .poll(() => new URL(page.url()).pathname, { timeout: 20000 })
  1416 |       .toBe("/admin/screening");
  1417 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:1414:5
```

Context:

```text
          - listitem [ref=e458]:
            - generic [ref=e459]: About
          - listitem [ref=e460]:
            - generic [ref=e461]: Contact
      - navigation "Help" [ref=e462]:
        - heading "Help" [level=2] [ref=e463]
        - list [ref=e464]:
          - listitem [ref=e465]:
            - generic [ref=e466]: Safety
      - navigation "Legal" [ref=e467]:
        - heading "Legal" [level=2] [ref=e468]
        - list [ref=e469]:
          - listitem [ref=e470]:
            - link "Terms" [ref=e471] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e472]:
            - link "Privacy" [ref=e473] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e475]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-2 Approve puts the ad on the site

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"


  242 |     await page.getByTestId("admin-screening-confirm-go").click();
  243 |     await stepUpIfPrompted(page, secret);
> 244 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  245 |       en["admin.screening.approved"],
  246 |       { timeout: 20000 },
```

Context:

```text
          - listitem [ref=e363]:
            - generic [ref=e364]: About
          - listitem [ref=e365]:
            - generic [ref=e366]: Contact
      - navigation "Help" [ref=e367]:
        - heading "Help" [level=2] [ref=e368]
        - list [ref=e369]:
          - listitem [ref=e370]:
            - generic [ref=e371]: Safety
      - navigation "Legal" [ref=e372]:
        - heading "Legal" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - link "Terms" [ref=e376] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e377]:
            - link "Privacy" [ref=e378] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e380]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-3 Reject keeps the ad off

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Rejected"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Rejected"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"


  261 |     await page.getByTestId("admin-screening-confirm-go").click();
  262 |     await stepUpIfPrompted(page, secret);
> 263 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  264 |       en["admin.screening.rejected"],
  265 |       { timeout: 20000 },
```

Context:

```text
          - listitem [ref=e363]:
            - generic [ref=e364]: About
          - listitem [ref=e365]:
            - generic [ref=e366]: Contact
      - navigation "Help" [ref=e367]:
        - heading "Help" [level=2] [ref=e368]
        - list [ref=e369]:
          - listitem [ref=e370]:
            - generic [ref=e371]: Safety
      - navigation "Legal" [ref=e372]:
        - heading "Legal" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - link "Terms" [ref=e376] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e377]:
            - link "Privacy" [ref=e378] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e380]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-16 a reviewer without a fresh second factor cannot decide

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /no verified factor|step-up required/i
Received string:  "notYourListing"
--- further error 1 ---
Error: expect(received).toMatch(expected)

Expected pattern: /no verified factor|step-up required/i
Received string:  "notYourListing"

  309 |       })
  310 |     ).error;
> 311 |     expect(deniedReviewer).toMatch(/no verified factor|step-up required/i);
      |                            ^
  312 |     expect((await listingTruth(ad.id)).status).toBe("screening");
  313 |   });
  314 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:311:28
```

Context:

```text
          - listitem [ref=e346]:
            - generic [ref=e347]: About
          - listitem [ref=e348]:
            - generic [ref=e349]: Contact
      - navigation "Help" [ref=e350]:
        - heading "Help" [level=2] [ref=e351]
        - list [ref=e352]:
          - listitem [ref=e353]:
            - generic [ref=e354]: Safety
      - navigation "Legal" [ref=e355]:
        - heading "Legal" [level=2] [ref=e356]
        - list [ref=e357]:
          - listitem [ref=e358]:
            - link "Terms" [ref=e359] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e360]:
            - link "Privacy" [ref=e361] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e363]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-8 a person who is not a reviewer reads nothing and reveals nothing, and no row is written

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "permission denied"
Received: "permissionDenied"

  397 |     await gotoReady(page, "/");
  398 |     const facts = await pageDoor(page, "admin_screening_facts", { p_listing_id: ad.id });
> 399 |     expect(facts.error).toBe("permission denied");
      |                         ^
  400 |     const shown = await pageDoor(page, "admin_reveal_listing_contact", {
  401 |       p_listing_id: ad.id,
  402 |       p_channel: "phone",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:399:25
```

Context:

```text
          - listitem [ref=e346]:
            - generic [ref=e347]: About
          - listitem [ref=e348]:
            - generic [ref=e349]: Contact
      - navigation "Help" [ref=e350]:
        - heading "Help" [level=2] [ref=e351]
        - list [ref=e352]:
          - listitem [ref=e353]:
            - generic [ref=e354]: Safety
      - navigation "Legal" [ref=e355]:
        - heading "Legal" [level=2] [ref=e356]
        - list [ref=e357]:
          - listitem [ref=e358]:
            - link "Terms" [ref=e359] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e360]:
            - link "Privacy" [ref=e361] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e363]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-17 a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: SC-17: the reveal asked for a second factor (D129)

expect(received).toBeNull()

Received: "permissionDenied"
--- further error 1 ---
Error: SC-17: the reveal asked for a second factor (D129)

expect(received).toBeNull()

Received: "permissionDenied"

  422 |       p_channel: "phone",
  423 |     });
> 424 |     expect(revealed.error, "SC-17: the reveal asked for a second factor (D129)").toBeNull();
      |                                                                                  ^
  425 |     expect(revealed.data).toEqual({ ok: true, channel: "phone", value: "+251911000101" });
  426 |     expect(await revealRows(ad.id)).toEqual([
  427 |       { actor_id: reviewer.id, action: "listing.contact_revealed", meta: { channel: "phone" } },
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:424:82
```

Context:

```text
          - listitem [ref=e346]:
            - generic [ref=e347]: About
          - listitem [ref=e348]:
            - generic [ref=e349]: Contact
      - navigation "Help" [ref=e350]:
        - heading "Help" [level=2] [ref=e351]
        - list [ref=e352]:
          - listitem [ref=e353]:
            - generic [ref=e354]: Safety
      - navigation "Legal" [ref=e355]:
        - heading "Legal" [level=2] [ref=e356]
        - list [ref=e357]:
          - listitem [ref=e358]:
            - link "Terms" [ref=e359] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e360]:
            - link "Privacy" [ref=e361] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e363]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-9 Show number: a reviewer with a fresh second factor gets the number, and one audit row names the channel and never the number

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown channel"
Received: "badValue:channel"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "unknown channel"
Received: "badValue:channel"

  458 |       p_channel: "telegram",
  459 |     });
> 460 |     expect(handle.error).toBe("unknown channel");
      |                          ^
  461 |     expect(await revealRows(ad.id), "SC-9: a refused reveal wrote a row").toHaveLength(1);
  462 |   });
  463 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:460:26
```

Context:

```text
          - listitem [ref=e351]:
            - generic [ref=e352]: About
          - listitem [ref=e353]:
            - generic [ref=e354]: Contact
      - navigation "Help" [ref=e355]:
        - heading "Help" [level=2] [ref=e356]
        - list [ref=e357]:
          - listitem [ref=e358]:
            - generic [ref=e359]: Safety
      - navigation "Legal" [ref=e360]:
        - heading "Legal" [level=2] [ref=e361]
        - list [ref=e362]:
          - listitem [ref=e363]:
            - link "Terms" [ref=e364] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e365]:
            - link "Privacy" [ref=e366] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e368]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-10 an ad that is not waiting for review answers neither door

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "listing not found"
Received: "listingNotFound"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "listing not found"
Received: "listingNotFound"

  466 |     await signInJobSuperAdmin(page);
  467 |     const facts = await pageDoor(page, "admin_screening_facts", { p_listing_id: ad.id });
> 468 |     expect(facts.error).toBe("listing not found");
      |                         ^
  469 |     const shown = await pageDoor(page, "admin_reveal_listing_contact", {
  470 |       p_listing_id: ad.id,
  471 |       p_channel: "phone",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:468:25
```

Context:

```text
          - listitem [ref=e379]:
            - generic [ref=e380]: About
          - listitem [ref=e381]:
            - generic [ref=e382]: Contact
      - navigation "Help" [ref=e383]:
        - heading "Help" [level=2] [ref=e384]
        - list [ref=e385]:
          - listitem [ref=e386]:
            - generic [ref=e387]: Safety
      - navigation "Legal" [ref=e388]:
        - heading "Legal" [level=2] [ref=e389]
        - list [ref=e390]:
          - listitem [ref=e391]:
            - link "Terms" [ref=e392] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e393]:
            - link "Privacy" [ref=e394] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e396]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-12 two ticked ads are approved together, after one confirmation that counts them

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"


  561 |     await page.getByTestId("admin-screening-confirm-go").click();
  562 |     await stepUpIfPrompted(page, secret);
> 563 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  564 |       en["admin.screening.approved"],
  565 |       { timeout: 20000 },
```

Context:

```text
          - listitem [ref=e407]:
            - generic [ref=e408]: About
          - listitem [ref=e409]:
            - generic [ref=e410]: Contact
      - navigation "Help" [ref=e411]:
        - heading "Help" [level=2] [ref=e412]
        - list [ref=e413]:
          - listitem [ref=e414]:
            - generic [ref=e415]: Safety
      - navigation "Legal" [ref=e416]:
        - heading "Legal" [level=2] [ref=e417]
        - list [ref=e418]:
          - listitem [ref=e419]:
            - link "Terms" [ref=e420] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e421]:
            - link "Privacy" [ref=e422] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e424]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-14 Reject at the foot of the preview closes it and keeps the ad off

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Rejected"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Rejected"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"


  680 |     await page.getByTestId("admin-screening-confirm-go").click();
  681 |     await stepUpIfPrompted(page, secret);
> 682 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  683 |       en["admin.screening.rejected"],
  684 |       { timeout: 20000 },
```

Context:

```text
          - listitem [ref=e363]:
            - generic [ref=e364]: About
          - listitem [ref=e365]:
            - generic [ref=e366]: Contact
      - navigation "Help" [ref=e367]:
        - heading "Help" [level=2] [ref=e368]
        - list [ref=e369]:
          - listitem [ref=e370]:
            - generic [ref=e371]: Safety
      - navigation "Legal" [ref=e372]:
        - heading "Legal" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - link "Terms" [ref=e376] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e377]:
            - link "Privacy" [ref=e378] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e380]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]').getByTestId('admin-screening-number-whatsapp')
Expected: "+251911000303"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]').getByTestId('admin-screening-number-whatsapp')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-preview-sheet').locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]').getByTestId('admin-screening-number-whatsapp')
Expected: "+251911000303"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('post-preview-sheet').locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]').getByTestId('admin-screening-number-whatsapp')


  712 |         .locator('[data-testid="listing-detail-channel"][data-channel="whatsapp"]')
  713 |         .getByTestId("admin-screening-number-whatsapp"),
> 714 |     ).toHaveText("+251911000303", { timeout: 20000 });
      |       ^
  715 |     await expect(
  716 |       page.getByTestId("step-up-modal"),
  717 |       "SC-15: Show number asked for a code",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:714:7
```

Context:

```text
          - generic [ref=e43]:
            - generic [ref=e44]:
              - heading "Description" [level=3] [ref=e45]
              - paragraph [ref=e46]: e2e scratch listing for the screening queue
            - complementary [ref=e47]:
              - heading "Meet, inspect, then pay — no deposit, no payment link, no code" [level=3] [ref=e48]
              - list [ref=e49]:
                - listitem [ref=e50]: Never pay a deposit, a delivery fee or a 'booking' before you have seen the item.
                - listitem [ref=e51]: Meet the seller in a public place, in daylight, with someone you trust.
                - listitem [ref=e52]: Inspect what you are buying; test it; check every document.
                - listitem [ref=e53]: Pay only when the item is in your hands — no payment links, no codes, no transfers to 'reserve' it.
      - generic [ref=e54]:
        - link "Open the ad's page" [ref=e55] [cursor=pointer]:
          - /url: /admin/listings/[account id]
        - button "Approve" [ref=e56] [cursor=pointer]
        - button "Reject" [ref=e57] [cursor=pointer]
    - button "Close" [ref=e58] [cursor=pointer]:
      - img [ref=e59]
      - generic [ref=e62]: Close
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-18 the preview counts the photos not checked by AI, and Approve approves them with the ad (D158)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"


  831 |     await page.getByTestId("admin-screening-confirm-go").click();
  832 |     await stepUpIfPrompted(page, secret);
> 833 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
      |                                                              ^
  834 |       en["admin.screening.approved"],
  835 |       { timeout: 20000 },
```

Context:

```text
          - listitem [ref=e363]:
            - generic [ref=e364]: About
          - listitem [ref=e365]:
            - generic [ref=e366]: Contact
      - navigation "Help" [ref=e367]:
        - heading "Help" [level=2] [ref=e368]
        - list [ref=e369]:
          - listitem [ref=e370]:
            - generic [ref=e371]: Safety
      - navigation "Legal" [ref=e372]:
        - heading "Legal" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - link "Terms" [ref=e376] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e377]:
            - link "Privacy" [ref=e378] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e380]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-23 approving an ad shows its held photos only; a failed photo waits for its own decision (D178)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"


  1153 |     await page.getByTestId("admin-screening-confirm-go").click();
  1154 |     await stepUpIfPrompted(page, secret);
> 1155 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
       |                                                              ^
  1156 |       en["admin.screening.approved"],
  1157 |       { timeout: 20000 },
```

Context:

```text
          - listitem [ref=e385]:
            - generic [ref=e386]: About
          - listitem [ref=e387]:
            - generic [ref=e388]: Contact
      - navigation "Help" [ref=e389]:
        - heading "Help" [level=2] [ref=e390]
        - list [ref=e391]:
          - listitem [ref=e392]:
            - generic [ref=e393]: Safety
      - navigation "Legal" [ref=e394]:
        - heading "Legal" [level=2] [ref=e395]
        - list [ref=e396]:
          - listitem [ref=e397]:
            - link "Terms" [ref=e398] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e399]:
            - link "Privacy" [ref=e400] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e402]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('admin-screening-notice')
Expected: "Approved"
Received: "Something went wrong"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('admin-screening-notice')
    24 × locator resolved to <p role="status" data-tone="error" aria-live="polite" data-testid="admin-screening-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+var(--bar-rise))] text-sm text-destructive">Something went wrong</p>
       - unexpected value "Something went wrong"


  1349 |     await page.getByTestId("admin-screening-confirm-go").click();
  1350 |     await stepUpIfPrompted(page, secret);
> 1351 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
       |                                                              ^
  1352 |       en["admin.screening.approved"],
  1353 |       { timeout: 20000 },
```

Context:

```text
          - listitem [ref=e363]:
            - generic [ref=e364]: About
          - listitem [ref=e365]:
            - generic [ref=e366]: Contact
      - navigation "Help" [ref=e367]:
        - heading "Help" [level=2] [ref=e368]
        - list [ref=e369]:
          - listitem [ref=e370]:
            - generic [ref=e371]: Safety
      - navigation "Legal" [ref=e372]:
        - heading "Legal" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - link "Terms" [ref=e376] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e377]:
            - link "Privacy" [ref=e378] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e380]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188)

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "/admin/screening"
Received: "/admin/listings/[account id]/edit"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "/admin/screening"
Received: "/admin/listings/[account id]/edit"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  1412 |     await page.getByTestId("post-edit-confirm-go").click();
  1413 |     await stepUpIfPrompted(page, secret);
> 1414 |     await expect
       |     ^
  1415 |       .poll(() => new URL(page.url()).pathname, { timeout: 20000 })
  1416 |       .toBe("/admin/screening");
  1417 |     await expect(page.getByTestId("admin-screening-notice")).toHaveText(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:1414:5
```

Context:

```text
          - listitem [ref=e447]:
            - generic [ref=e448]: About
          - listitem [ref=e449]:
            - generic [ref=e450]: Contact
      - navigation "Help" [ref=e451]:
        - heading "Help" [level=2] [ref=e452]
        - list [ref=e453]:
          - listitem [ref=e454]:
            - generic [ref=e455]: Safety
      - navigation "Legal" [ref=e456]:
        - heading "Legal" [level=2] [ref=e457]
        - list [ref=e458]:
          - listitem [ref=e459]:
            - link "Terms" [ref=e460] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e461]:
            - link "Privacy" [ref=e462] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e464]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

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

## Server errors: shard 10

No `[ssr-error]` lines in the `shard 10` log (or no log was uploaded).

## Client errors: shard 10

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_undo_listing_edit ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "nothingToUndo", "refusals": [{"reason": "nothingToUndo"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_undo_listing_edit ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "nothingToUndo", "refusals": [{"reason": "nothingToUndo"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_edit_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "categoryFixed", "refusals": [{"reason": "categoryFixed"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_edit_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "categoryFixed", "refusals": [{"reason": "categoryFixed"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_listing_tier ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "listingRemoved", "refusals": [{"reason": "listingRemoved"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_listing_tier ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "listingRemoved", "refusals": [{"reason": "listingRemoved"}]})
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

```text
[client-error] console.error: [screening] decision failed {ok: false, code: P0D01, hint: null, details: null, message: notYourListing} :: [screening] decision failed {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"notYourListing","refusals":[{"reason":"notYourListing"}]}
[client-error] HTTP 400 POST /rest/v1/rpc/transition_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notYourListing", "refusals": [{"reason": "notYourListing"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [screening] decision failed {ok: false, code: P0D01, hint: null, details: null, message: notYourListing} :: [screening] decision failed {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"notYourListing","refusals":[{"reason":"notYourListing"}]}
[client-error] HTTP 400 POST /rest/v1/rpc/transition_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notYourListing", "refusals": [{"reason": "notYourListing"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [screening] decision failed {ok: false, code: P0D01, hint: null, details: null, message: notYourListing} :: [screening] decision failed {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"notYourListing","refusals":[{"reason":"notYourListing"}]}
[client-error] HTTP 400 POST /rest/v1/rpc/transition_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notYourListing", "refusals": [{"reason": "notYourListing"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [screening] decision failed {ok: false, code: P0D01, hint: null, details: null, message: notYourListing} :: [screening] decision failed {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"notYourListing","refusals":[{"reason":"notYourListing"}]}
[client-error] HTTP 400 POST /rest/v1/rpc/transition_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notYourListing", "refusals": [{"reason": "notYourListing"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [screening] decision failed {ok: false, code: P0D01, hint: null, details: null, message: notYourListing} :: [screening] decision failed {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"notYourListing","refusals":[{"reason":"notYourListing"}]}
[client-error] HTTP 400 POST /rest/v1/rpc/transition_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notYourListing", "refusals": [{"reason": "notYourListing"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [screening] decision failed {ok: false, code: P0D01, hint: null, details: null, message: notYourListing} :: [screening] decision failed {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"notYourListing","refusals":[{"reason":"notYourListing"}]}
[client-error] HTTP 400 POST /rest/v1/rpc/transition_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notYourListing", "refusals": [{"reason": "notYourListing"}]})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [screening] decision failed {ok: false, code: P0D01, hint: null, details: null, message: notYourListing} :: [screening] decision failed {"ok":false,"code":"P0D01","hint":null,"details":null,"message":"notYourListing","refusals":[{"reason":"notYourListing"}]}
[client-error] HTTP 400 POST /rest/v1/rpc/transition_listing ({"ok": false, "code": "P0D01", "hint": null, "details": null, "message": "notYourListing", "refusals": [{"reason": "notYourListing"}]})
```

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

- Failed step: `acceptance-doors-guard` (outcome failure) — Acceptance-doors guard FAIL: admin_review_listing(uuid,text): missing acceptance check and allowance

```text
Step acceptance-doors-guard: outcome failure
  Acceptance-doors guard FAIL: admin_review_listing(uuid,text): missing acceptance check and allowance
```

```text
(no log tail was uploaded for this source)
```
