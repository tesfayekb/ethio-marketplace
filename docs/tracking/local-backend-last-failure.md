# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42567023039
- Commit: `635b7a02f936cc86604113f2ee89e3d98b3b1940`
- Attempt: 1
- Written (UTC): 2026-11-09T05:44:34.578Z
- Passed: 2588 · Skipped: 332 · Failed: 8
- Gating failures: 8 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: smoke
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 19 results files read, 18 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: smoke

`smoke`: log unavailable.

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

Logs read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: smoke

`smoke`: log unavailable.

## Timing (DEC-087, non-gating)

Results read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: smoke

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-11-09T05:26:33.690Z | 0.3 min |
| shard 1 | 2026-11-09T05:26:41.544Z | 13.1 min |
| shard 2 | 2026-11-09T05:27:11.679Z | 16.9 min |
| shard 3 | 2026-11-09T05:27:30.552Z | 10.0 min |
| shard 4 | 2026-11-09T05:28:08.054Z | 10.9 min |
| shard 5 | 2026-11-09T05:27:17.060Z | 10.6 min |
| shard 6 | 2026-11-09T05:27:25.161Z | 11.9 min |
| shard 7 | 2026-11-09T05:26:51.500Z | 3.9 min |
| shard 8 | 2026-11-09T05:27:16.107Z | 8.9 min |
| shard 9 | 2026-11-09T05:26:17.335Z | 12.3 min |
| shard 10 | 2026-11-09T05:29:15.394Z | 14.8 min |
| shard 11 | 2026-11-09T05:29:01.493Z | 10.3 min |
| shard 12 | 2026-11-09T05:26:58.331Z | 12.6 min |
| shard 13 | 2026-11-09T05:26:30.480Z | 7.6 min |
| shard 14 | 2026-11-09T05:27:07.932Z | 14.5 min |
| shard 15 | 2026-11-09T05:27:08.583Z | 4.8 min |
| shard 16 | 2026-11-09T05:26:37.891Z | 8.0 min |
| repeat | 2026-11-09T05:27:22.126Z | 12.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-monetisation.spec.ts` | 96 | 14.7 min | shard 2, shard 10, repeat |
| `shell.spec.ts` | 234 | 9.7 min | shard 8, shard 16 |
| `post-wizard-place.spec.ts` | 40 | 5.2 min | shard 6, shard 14 |
| `admin-attributes-library.spec.ts` | 42 | 5.1 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.0 min | shard 5, shard 13 |
| `post-wizard-specs.spec.ts` | 82 | 5.0 min | shard 6, shard 14 |
| `import-security.spec.ts` | 36 | 4.9 min | shard 4, shard 12 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 4, shard 12 |
| `admin-locations.spec.ts` | 38 | 4.3 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.2 min | shard 2, shard 11 |
| `admin-roles.spec.ts` | 28 | 4.1 min | shard 2, shard 10 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 8, shard 16 |
| `admin-categories-console.spec.ts` | 34 | 4.0 min | shard 1, shard 9 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 3, shard 11 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 6, shard 14 |
| `admin-attributes-links.spec.ts` | 34 | 3.7 min | shard 1, shard 9 |
| `admin-screening.spec.ts` | 54 | 3.7 min | shard 2, shard 10 |
| `admin-listings.spec.ts` | 76 | 3.7 min | shard 2, shard 10 |
| `photo-pipeline.spec.ts` | 68 | 3.4 min | shard 5, shard 13 |
| `post-wizard-pricing.spec.ts` | 52 | 3.4 min | shard 6, shard 14 |
| `admin-guides.spec.ts` | 42 | 3.3 min | shard 2, shard 10, repeat |
| `auth-signout.spec.ts` | 36 | 3.2 min | shard 3, shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.2 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 38 | 3.2 min | shard 4, shard 12 |
| `admin-attributes-editor.spec.ts` | 36 | 2.9 min | shard 1, shard 9 |
| `choice-lists.spec.ts` | 96 | 2.9 min | shard 3, shard 11 |
| `sage-bands.spec.ts` | 76 | 2.8 min | shard 7, shard 15 |
| `posting-routes.spec.ts` | 80 | 2.7 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 6, shard 14 |
| `ad-page.spec.ts` | 78 | 2.6 min | shard 1, shard 9 |
| `post-wizard-category.spec.ts` | 48 | 2.5 min | shard 5, shard 13 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 1, shard 9 |
| `admin-countries.spec.ts` | 18 | 2.1 min | shard 2, shard 10 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 44 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `legal-certify.spec.ts` | 44 | 1.7 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 20 | 1.6 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 1, shard 10 |
| `dialogs.spec.ts` | 14 | 1.5 min | shard 3, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 1.4 min | shard 1, shard 9 |
| `admin-audit.spec.ts` | 14 | 1.3 min | shard 1, shard 9 |
| `one-line-slots-admin.spec.ts` | 10 | 1.3 min | shard 5, shard 13 |
| `press.spec.ts` | 22 | 1.1 min | shard 7, shard 15 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `sage-tiers.spec.ts` | 40 | 1.1 min | shard 7, shard 15 |
| `sage-ad-page.spec.ts` | 18 | 1.0 min | shard 7, shard 15 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2, shard 11 |
| `name-check-queue.spec.ts` | 8 | 0.9 min | shard 5, shard 13 |
| `user-guides.spec.ts` | 18 | 0.9 min | shard 8, shard 16 |
| `my-listings-promote.spec.ts` | 8 | 0.8 min | shard 5, shard 13 |
| `sage-shell.spec.ts` | 80 | 0.8 min | shard 7, shard 15 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 4, shard 12 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 6, shard 14 |
| `my-listings-levels.spec.ts` | 28 | 0.6 min | shard 5, shard 13 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 4, shard 12 |
| `feed-route.spec.ts` | 66 | 0.6 min | shard 3, shard 11, repeat |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `account-saved.spec.ts` | 12 | 0.6 min | shard 1, shard 9, repeat |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 8, shard 16 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `one-line-slots.spec.ts` | 10 | 0.5 min | shard 5, shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `posting-routes-dials.spec.ts` | 14 | 0.4 min | shard 6, shard 14 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `settings.spec.ts` | 9 | 0.3 min | shard 8 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `post-wizard-units.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `dark-cards.spec.ts` | 12 | 0.2 min | shard 3, shard 11, repeat |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 2, shard 10 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 11 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 14 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 6, shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `door-refusals.spec.ts` | 12 | 0.1 min | shard 3, shard 11 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 8, shard 16 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-monetisation.spec.ts` › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it | mobile-360 | 62.6 s |
| `admin-monetisation.spec.ts` › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it | desktop-1280 | 62.3 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | mobile-360 | 44.9 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 44.5 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 40.8 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 36.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 34.4 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 34.2 s |
| `admin-monetisation.spec.ts` › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it | desktop-1280 | 32.7 s |
| `admin-monetisation.spec.ts` › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it | desktop-1280 | 32.5 s |
| `admin-monetisation.spec.ts` › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it | mobile-360 | 32.4 s |
| `admin-monetisation.spec.ts` › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it | mobile-360 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42567023039-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42567023039-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 42567023039-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 2, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 42567023039-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42567023039-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42567023039-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42567023039-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42567023039-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42567023039-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 42567023039-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 42567023039-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 42567023039-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 42567023039-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42567023039-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42567023039-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42567023039-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 42567023039-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 42567023039-local-repeat
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)').getByTestId('product-e2e_mon_reach_local2_0_m-card')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)').getByTestId('product-e2e_mon_reach_local2_0_m-card')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

   at helpers/ui.ts:1202

  1200 |   // The poller IS the wait (no sleep): each tick reads the outcome first, then
  1201 |   // answers the gate once if that is what showed up instead.
> 1202 |   await expect
       |   ^
  1203 |     .poll(
  1204 |       async () => {
  1205 |         if (await reached()) return "outcome";
    at awaitGuardedOutcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1202:3)
```

Context:

```text
        - checkbox "Switched on" [checked] [ref=e20]
        - generic [ref=e21]: Switched on
      - generic [ref=e22]:
        - checkbox "Sellers may apply it" [checked] [ref=e23]
        - generic [ref=e24]: Sellers may apply it
      - generic [ref=e25]:
        - checkbox "Extends the ad's lifetime" [checked] [ref=e26]
        - generic [ref=e27]: Extends the ad's lifetime
      - generic [ref=e28]:
        - generic [ref=e29]: Order
        - textbox "Order" [ref=e30]
      - paragraph [ref=e31]: A package can be switched off, never removed.
      - alert [ref=e32]: A limit is a whole number, 1 or more, or blank for no limit.
      - generic [ref=e33]:
        - button "Cancel" [ref=e34] [cursor=pointer]
        - button "Save" [ref=e35] [cursor=pointer]
    - button "Close" [ref=e36] [cursor=pointer]:
      - img [ref=e37]
      - generic [ref=e40]: Close
```
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-193 an ad at nationwide reach has room for a second city and says no city limit

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: [e2e:pw193] updating the listing failed: new row for relation "listings" violates check constraint "listings_reach_with_source_check"
--- further error 1 ---
Error: [e2e:pw193] updating the listing failed: new row for relation "listings" violates check constraint "listings_reach_with_source_check"

   at helpers/listing-seed.ts:275

  273 |   const columns = options.select ? `id,tier,${options.select}` : "id,tier";
  274 |   const { data, error } = await write.select(columns).maybeSingle();
> 275 |   if (error) throw new Error(`[e2e:${options.tag}] updating the listing failed: ${error.message}`);
      |                    ^
  276 |   return data === null ? null : seededOf(data, options.tag);
  277 | }
  278 |
    at updateListingRow (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/listing-seed.ts:275:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1286:5
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-193-an-ad-at-nationwide-reach-has-room-for-a-second-city-and-says-no-city-limit-mobile-360` — Playwright's name `post-wizard-place-POSTING--6485b-city-and-says-no-city-limit-mobile-360`; this run carried 6 context file(s); of the same spec: none

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('table:not(table *)').getByTestId('product-e2e_mon_reach_local10_0_d')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('table:not(table *)').getByTestId('product-e2e_mon_reach_local10_0_d')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

   at helpers/ui.ts:1202

  1200 |   // The poller IS the wait (no sleep): each tick reads the outcome first, then
  1201 |   // answers the gate once if that is what showed up instead.
> 1202 |   await expect
       |   ^
  1203 |     .poll(
  1204 |       async () => {
  1205 |         if (await reached()) return "outcome";
    at awaitGuardedOutcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1202:3)
```

Context:

```text
        - checkbox "Switched on" [checked] [ref=e20]
        - generic [ref=e21]: Switched on
      - generic [ref=e22]:
        - checkbox "Sellers may apply it" [checked] [ref=e23]
        - generic [ref=e24]: Sellers may apply it
      - generic [ref=e25]:
        - checkbox "Extends the ad's lifetime" [checked] [ref=e26]
        - generic [ref=e27]: Extends the ad's lifetime
      - generic [ref=e28]:
        - generic [ref=e29]: Order
        - textbox "Order" [ref=e30]
      - paragraph [ref=e31]: A package can be switched off, never removed.
      - alert [ref=e32]: A limit is a whole number, 1 or more, or blank for no limit.
      - generic [ref=e33]:
        - button "Cancel" [ref=e34] [cursor=pointer]
        - button "Save" [ref=e35] [cursor=pointer]
    - button "Close" [ref=e36] [cursor=pointer]:
      - img [ref=e37]
      - generic [ref=e40]: Close
```
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-193 an ad at nationwide reach has room for a second city and says no city limit

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: [e2e:pw193] updating the listing failed: new row for relation "listings" violates check constraint "listings_reach_with_source_check"
--- further error 1 ---
Error: [e2e:pw193] updating the listing failed: new row for relation "listings" violates check constraint "listings_reach_with_source_check"

   at helpers/listing-seed.ts:275

  273 |   const columns = options.select ? `id,tier,${options.select}` : "id,tier";
  274 |   const { data, error } = await write.select(columns).maybeSingle();
> 275 |   if (error) throw new Error(`[e2e:${options.tag}] updating the listing failed: ${error.message}`);
      |                    ^
  276 |   return data === null ? null : seededOf(data, options.tag);
  277 | }
  278 |
    at updateListingRow (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/listing-seed.ts:275:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1286:5
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-193-an-ad-at-nationwide-reach-has-room-for-a-second-city-and-says-no-city-limit-desktop-1280` — Playwright's name `post-wizard-place-POSTING--6485b-city-and-says-no-city-limit-desktop-1280`; this run carried 6 context file(s); of the same spec: none

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it

- Source: `repeat`
- Project: `mobile-360`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)').getByTestId('product-e2e_mon_reach_localrepeat_0_m-card')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)').getByTestId('product-e2e_mon_reach_localrepeat_0_m-card')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

   at helpers/ui.ts:1202

  1200 |   // The poller IS the wait (no sleep): each tick reads the outcome first, then
  1201 |   // answers the gate once if that is what showed up instead.
> 1202 |   await expect
       |   ^
  1203 |     .poll(
  1204 |       async () => {
  1205 |         if (await reached()) return "outcome";
    at awaitGuardedOutcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1202:3)
```

Context:

```text
        - checkbox "Switched on" [checked] [ref=e20]
        - generic [ref=e21]: Switched on
      - generic [ref=e22]:
        - checkbox "Sellers may apply it" [checked] [ref=e23]
        - generic [ref=e24]: Sellers may apply it
      - generic [ref=e25]:
        - checkbox "Extends the ad's lifetime" [checked] [ref=e26]
        - generic [ref=e27]: Extends the ad's lifetime
      - generic [ref=e28]:
        - generic [ref=e29]: Order
        - textbox "Order" [ref=e30]
      - paragraph [ref=e31]: A package can be switched off, never removed.
      - alert [ref=e32]: A limit is a whole number, 1 or more, or blank for no limit.
      - generic [ref=e33]:
        - button "Cancel" [ref=e34] [cursor=pointer]
        - button "Save" [ref=e35] [cursor=pointer]
    - button "Close" [ref=e36] [cursor=pointer]:
      - img [ref=e37]
      - generic [ref=e40]: Close
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it

- Source: `repeat`
- Project: `mobile-360`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)').getByTestId('product-e2e_mon_reach_localrepeat_2_m-card')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('[data-testid="data-table-cards"]:not([data-testid="data-table-cards"] *)').getByTestId('product-e2e_mon_reach_localrepeat_2_m-card')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

   at helpers/ui.ts:1202

  1200 |   // The poller IS the wait (no sleep): each tick reads the outcome first, then
  1201 |   // answers the gate once if that is what showed up instead.
> 1202 |   await expect
       |   ^
  1203 |     .poll(
  1204 |       async () => {
  1205 |         if (await reached()) return "outcome";
    at awaitGuardedOutcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1202:3)
```

Context:

```text
        - checkbox "Switched on" [checked] [ref=e20]
        - generic [ref=e21]: Switched on
      - generic [ref=e22]:
        - checkbox "Sellers may apply it" [checked] [ref=e23]
        - generic [ref=e24]: Sellers may apply it
      - generic [ref=e25]:
        - checkbox "Extends the ad's lifetime" [checked] [ref=e26]
        - generic [ref=e27]: Extends the ad's lifetime
      - generic [ref=e28]:
        - generic [ref=e29]: Order
        - textbox "Order" [ref=e30]
      - paragraph [ref=e31]: A package can be switched off, never removed.
      - alert [ref=e32]: A limit is a whole number, 1 or more, or blank for no limit.
      - generic [ref=e33]:
        - button "Cancel" [ref=e34] [cursor=pointer]
        - button "Save" [ref=e35] [cursor=pointer]
    - button "Close" [ref=e36] [cursor=pointer]:
      - img [ref=e37]
      - generic [ref=e40]: Close
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('table:not(table *)').getByTestId('product-e2e_mon_reach_localrepeat_4_d')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('table:not(table *)').getByTestId('product-e2e_mon_reach_localrepeat_4_d')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

   at helpers/ui.ts:1202

  1200 |   // The poller IS the wait (no sleep): each tick reads the outcome first, then
  1201 |   // answers the gate once if that is what showed up instead.
> 1202 |   await expect
       |   ^
  1203 |     .poll(
  1204 |       async () => {
  1205 |         if (await reached()) return "outcome";
    at awaitGuardedOutcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1202:3)
```

Context:

```text
        - checkbox "Switched on" [checked] [ref=e20]
        - generic [ref=e21]: Switched on
      - generic [ref=e22]:
        - checkbox "Sellers may apply it" [checked] [ref=e23]
        - generic [ref=e24]: Sellers may apply it
      - generic [ref=e25]:
        - checkbox "Extends the ad's lifetime" [checked] [ref=e26]
        - generic [ref=e27]: Extends the ad's lifetime
      - generic [ref=e28]:
        - generic [ref=e29]: Order
        - textbox "Order" [ref=e30]
      - paragraph [ref=e31]: A package can be switched off, never removed.
      - alert [ref=e32]: A limit is a whole number, 1 or more, or blank for no limit.
      - generic [ref=e33]:
        - button "Cancel" [ref=e34] [cursor=pointer]
        - button "Save" [ref=e35] [cursor=pointer]
    - button "Close" [ref=e36] [cursor=pointer]:
      - img [ref=e37]
      - generic [ref=e40]: Close
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it

- Source: `repeat`
- Project: `desktop-1280`

```text
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('table:not(table *)').getByTestId('product-e2e_mon_reach_localrepeat_6_d')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: [e2e:INC-210] the guarded outcome never arrived within 30000 ms — waited on getByTestId('monetisation-reach').locator('table:not(table *)').getByTestId('product-e2e_mon_reach_localrepeat_6_d')

expect(received).toBe(expected) // Object.is equality

Expected: "outcome"
Received: "neither yet"

Call Log:
- Timeout 30000ms exceeded while waiting on the predicate

   at helpers/ui.ts:1202

  1200 |   // The poller IS the wait (no sleep): each tick reads the outcome first, then
  1201 |   // answers the gate once if that is what showed up instead.
> 1202 |   await expect
       |   ^
  1203 |     .poll(
  1204 |       async () => {
  1205 |         if (await reached()) return "outcome";
    at awaitGuardedOutcome (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:1202:3)
```

Context:

```text
        - checkbox "Switched on" [checked] [ref=e20]
        - generic [ref=e21]: Switched on
      - generic [ref=e22]:
        - checkbox "Sellers may apply it" [checked] [ref=e23]
        - generic [ref=e24]: Sellers may apply it
      - generic [ref=e25]:
        - checkbox "Extends the ad's lifetime" [checked] [ref=e26]
        - generic [ref=e27]: Extends the ad's lifetime
      - generic [ref=e28]:
        - generic [ref=e29]: Order
        - textbox "Order" [ref=e30]
      - paragraph [ref=e31]: A package can be switched off, never removed.
      - alert [ref=e32]: A limit is a whole number, 1 or more, or blank for no limit.
      - generic [ref=e33]:
        - button "Cancel" [ref=e34] [cursor=pointer]
        - button "Save" [ref=e35] [cursor=pointer]
    - button "Close" [ref=e36] [cursor=pointer]:
      - img [ref=e37]
      - generic [ref=e40]: Close
```
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

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"code":"P0001","details":null,"hint":null,"message":"bad caps"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"code":"P0001","details":null,"hint":null,"message":"bad caps"})
```

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

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"code":"P0001","details":null,"hint":null,"message":"bad caps"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"code":"P0001","details":null,"hint":null,"message":"bad caps"})
```

## Server errors: shard 14

No `[ssr-error]` lines in the `shard 14` log (or no log was uploaded).

## Client errors: shard 14

No `[client-error]` lines in the `shard 14` log (or no log was uploaded).

## Server errors: repeat

No `[ssr-error]` lines in the `repeat` log (or no log was uploaded).

## Client errors: repeat

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"code":"P0001","details":null,"hint":null,"message":"bad caps"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"code":"P0001","details":null,"hint":null,"message":"bad caps"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"code":"P0001","details":null,"hint":null,"message":"bad caps"})
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_save_listing_package ({"code":"P0001","details":null,"hint":null,"message":"bad caps"})
```

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
