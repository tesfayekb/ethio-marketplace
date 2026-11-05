# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41974149932
- Commit: `ccffb095bf9604d8191e1ad05818d04c356242ff`
- Attempt: 1
- Written (UTC): 2026-11-05T05:50:04.242Z
- Passed: 2514 · Skipped: 332 · Failed: 30
- Gating failures: 30 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat
- Sources without results: smoke
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 19 results files read, 18 of 19 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: smoke

`smoke`: log unavailable.

63 line(s), 28 message(s): 1 off the allowlist, 27 allowlisted.

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
| `gate fetch threw upstream ssr language gate timed out after <n>ms` | 1 | shard 10 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### gate fetch threw upstream ssr language gate timed out after <n>ms

- Count: 1 · Sources: shard 10
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): SC-17 a reviewer without a second factor reads the facts and reveals a shown num ×1 · SC-9 Show number: a reviewer with a fresh second factor gets the number, and one ×1

```text
[WebServer] [ssr-error] /__root gate fetch threw upstream ssr language gate timed out after 1500ms
```

## Accessibility (DEC-084, gating)

Logs read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: smoke

`smoke`: log unavailable.

## Timing (DEC-087, non-gating)

Results read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: smoke

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-11-05T05:30:57.772Z | 0.4 min |
| shard 1 | 2026-11-05T05:31:07.134Z | 13.4 min |
| shard 2 | 2026-11-05T05:30:40.256Z | 13.7 min |
| shard 3 | 2026-11-05T05:31:11.946Z | 12.0 min |
| shard 4 | 2026-11-05T05:34:07.544Z | 10.9 min |
| shard 5 | 2026-11-05T05:30:58.647Z | 10.5 min |
| shard 6 | 2026-11-05T05:30:58.380Z | 11.5 min |
| shard 7 | 2026-11-05T05:31:52.039Z | 4.7 min |
| shard 8 | 2026-11-05T05:31:08.091Z | 7.7 min |
| shard 9 | 2026-11-05T05:31:16.094Z | 13.1 min |
| shard 10 | 2026-11-05T05:33:48.976Z | 15.4 min |
| shard 11 | 2026-11-05T05:31:11.500Z | 10.3 min |
| shard 12 | 2026-11-05T05:31:25.226Z | 12.6 min |
| shard 13 | 2026-11-05T05:32:00.464Z | 9.6 min |
| shard 14 | 2026-11-05T05:31:15.744Z | 11.8 min |
| shard 15 | 2026-11-05T05:31:07.420Z | 3.8 min |
| shard 16 | 2026-11-05T05:30:52.714Z | 7.8 min |
| repeat | 2026-11-05T05:34:17.547Z | 1.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 234 | 9.1 min | shard 8, shard 16 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.4 min | shard 5, shard 13 |
| `admin-attributes-library.spec.ts` | 42 | 5.3 min | shard 1, shard 9 |
| `admin-listings.spec.ts` | 76 | 5.1 min | shard 2, shard 10 |
| `feed-screens.spec.ts` | 36 | 4.8 min | shard 4, shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 4.6 min | shard 6, shard 14 |
| `import-security.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-translations-console.spec.ts` | 44 | 4.5 min | shard 3, shard 11 |
| `admin-locations.spec.ts` | 38 | 4.4 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 28 | 4.3 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.2 min | shard 6, shard 14 |
| `admin-categories-console.spec.ts` | 34 | 4.1 min | shard 1, shard 9 |
| `admin-screening.spec.ts` | 54 | 4.0 min | shard 2, shard 10 |
| `admin-attributes-links.spec.ts` | 34 | 3.9 min | shard 1, shard 9 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 8, shard 16 |
| `photo-pipeline.spec.ts` | 68 | 3.8 min | shard 5, shard 13 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 3, shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.6 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 6, shard 14 |
| `my-listings-ad.spec.ts` | 36 | 3.5 min | shard 5, shard 12 |
| `auth-signout.spec.ts` | 36 | 3.2 min | shard 3, shard 11 |
| `post-wizard-pricing.spec.ts` | 52 | 3.2 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 1, shard 9 |
| `choice-lists.spec.ts` | 96 | 2.8 min | shard 3, shard 11 |
| `sage-bands.spec.ts` | 76 | 2.7 min | shard 7, shard 15 |
| `ad-page.spec.ts` | 78 | 2.6 min | shard 1, shard 9 |
| `post-wizard-category.spec.ts` | 48 | 2.6 min | shard 5, shard 13 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 9 |
| `posting-routes.spec.ts` | 80 | 2.5 min | shard 6, shard 14 |
| `legal-admin.spec.ts` | 42 | 2.2 min | shard 4, shard 12 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `legal-certify.spec.ts` | 42 | 2.0 min | shard 4, shard 12 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `mfa-stepup.spec.ts` | 20 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 1, shard 10 |
| `admin-attributes-import.spec.ts` | 40 | 1.5 min | shard 1, shard 9 |
| `dialogs.spec.ts` | 14 | 1.4 min | shard 3, shard 11 |
| `admin-monetisation.spec.ts` | 34 | 1.4 min | shard 2, shard 10 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 1, shard 9 |
| `feed-index.spec.ts` | 180 | 1.2 min | shard 3, shard 11, repeat |
| `one-line-slots-admin.spec.ts` | 10 | 1.2 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `press.spec.ts` | 22 | 1.1 min | shard 7, shard 15 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 12 |
| `sage-tiers.spec.ts` | 40 | 1.0 min | shard 7, shard 15 |
| `name-check-queue.spec.ts` | 8 | 1.0 min | shard 5, shard 13 |
| `sage-ad-page.spec.ts` | 18 | 0.9 min | shard 7, shard 15 |
| `admin-guides.spec.ts` | 14 | 0.9 min | shard 2, shard 10 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2, shard 11 |
| `i18n-sign-in-language.spec.ts` | 12 | 0.8 min | shard 4, shard 12 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `user-guides.spec.ts` | 18 | 0.8 min | shard 8, shard 16 |
| `legal-doors.spec.ts` | 34 | 0.8 min | shard 4, shard 12 |
| `sage-shell.spec.ts` | 80 | 0.7 min | shard 7, shard 15 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 13 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `house-style.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 6, shard 14 |
| `one-line-slots.spec.ts` | 10 | 0.4 min | shard 5, shard 13 |
| `supabase-door.spec.ts` | 12 | 0.4 min | shard 8, shard 16 |
| `sage-cards.spec.ts` | 28 | 0.4 min | shard 7, shard 15 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 5, shard 13 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `settings.spec.ts` | 9 | 0.3 min | shard 7 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 6, shard 14 |
| `shell-bands.spec.ts` | 16 | 0.3 min | shard 8, shard 15 |
| `layout.spec.ts` | 10 | 0.3 min | shard 4, shard 12 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 4, shard 12 |
| `submenu.spec.ts` | 14 | 0.3 min | shard 8, shard 16 |
| `page-head.spec.ts` | 4 | 0.2 min | shard 5, shard 13 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 2, shard 11 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `submenu-look.spec.ts` | 12 | 0.2 min | shard 9, shard 16 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `overlays.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7, shard 15 |
| `menu-rows.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 11 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 6, shard 14 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 4, shard 12 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 9, shard 16 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 4, shard 12 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 5, shard 13 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 7, shard 15 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 11 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | shard 9, shard 16 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 3, shard 11 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 1, shard 9 |
| `fonts.spec.ts` | 2 | 0.0 min | shard 4, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 7, shard 15 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 40.2 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | desktop-1280 | 39.9 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | desktop-1280 | 37.8 s |
| `import-security.spec.ts` › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited | mobile-360 | 37.7 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 36.0 s |
| `admin-listings.spec.ts` › ATR-1 Premium from the console: the badge, the preview's look, the History line, the row, one audit row, the feed's rank; then Regular again | desktop-1280 | 35.3 s |
| `admin-listings.spec.ts` › ATR-1 Premium from the console: the badge, the preview's look, the History line, the row, one audit row, the feed's rank; then Regular again | mobile-360 | 34.2 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.8 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.2 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41974149932-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 41974149932-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 41974149932-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 2, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 41974149932-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 34 user(s) owned by process 41974149932-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41974149932-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41974149932-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41974149932-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41974149932-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 41974149932-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 41974149932-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 41974149932-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 2, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 34 user(s) owned by process 41974149932-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41974149932-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41974149932-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41974149932-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 41974149932-local-16
```

## Post-test errors: repeat

repeat: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 41974149932-local-repeat
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › ATR-1 Premium from the console: the badge, the preview's look, the History line, the row, one audit row, the feed's rank; then Regular again

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Tier"
Received: "Edited: Tier, Other details"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Tier, Other details</p>
       - unexpected value "Edited: Tier, Other details"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Tier"
Received: "Edited: Tier, Other details"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Tier, Other details</p>
       - unexpected value "Edited: Tier, Other details"


  2360 |     await expect(page.getByTestId("listing-detail")).toHaveAttribute("data-tier", "premium");
  2361 |     const first = page.getByTestId("listing-history-entry-0");
> 2362 |     await expect(first.getByTestId("listing-history-what")).toHaveText(
       |                                                             ^
  2363 |       en["admin.listings.history.edited"].replace("{fields}", en["admin.listings.filter.tier"]),
  2364 |     );
```

Context:

```text
          - listitem [ref=e414]:
            - generic [ref=e415]: About
          - listitem [ref=e416]:
            - generic [ref=e417]: Contact
      - navigation "Help" [ref=e418]:
        - heading "Help" [level=2] [ref=e419]
        - list [ref=e420]:
          - listitem [ref=e421]:
            - generic [ref=e422]: Safety
      - navigation "Legal" [ref=e423]:
        - heading "Legal" [level=2] [ref=e424]
        - list [ref=e425]:
          - listitem [ref=e426]:
            - link "Terms" [ref=e427] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e428]:
            - link "Privacy" [ref=e429] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e431]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › ATR-6 Set tier from the row menu: Premium through the ad page's dialog and door, the Tier filter lists it, one audit row and one revision; the own row and a removed row offer none

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
    "from": "regular",
    "reason": "promotion",
+   "source": "staff",
    "to": "premium",
  }
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
    "from": "regular",
    "reason": "promotion",
+   "source": "staff",
    "to": "premium",
  }

  2573 |     expect(audits).toHaveLength(1);
  2574 |     expect(audits[0]?.["actor_id"]).toBe(admin.user.id);
> 2575 |     expect(audits[0]?.["meta"]).toEqual({ from: "regular", to: "premium", reason: "promotion" });
       |                                 ^
  2576 |     const revisions = await revisionRows(ad.id, "edit");
  2577 |     expect(revisions).toHaveLength(1);
  2578 |     expect(revisions[0]?.["before"]).toEqual({ tier: "regular" });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2575:33
```

Context:

```text
            - generic [ref=e74]: Choose date
      - generic [ref=e75]:
        - generic [ref=e76]: Tier
        - group "Tier" [ref=e77]:
          - button "All" [ref=e78] [cursor=pointer]:
            - generic [ref=e79]: All
          - button "Premium" [active] [pressed] [ref=e80] [cursor=pointer]:
            - img [ref=e81]
            - generic [ref=e83]: Premium
          - button "Featured" [ref=e84] [cursor=pointer]:
            - generic [ref=e85]: Featured
          - button "Regular" [ref=e86] [cursor=pointer]:
            - generic [ref=e87]: Regular
    - generic [ref=e88]:
      - button "Clear all" [ref=e89] [cursor=pointer]
      - button "Show 1 results" [ref=e90] [cursor=pointer]
    - button "Close" [ref=e91] [cursor=pointer]:
      - img [ref=e92]
      - generic [ref=e95]: Close
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-2 gating: a reviewer has no entry and a deep link is turned away; a packages:view-only staff sees the blocks without a verb and no caps; the doors refuse both by name

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:670:5
```

Context: context file not found for `admin-monetisation-P-1b-Admin-Monetisation-MON-2-gating-a-reviewer-has-no-entry-and-a-deep-link-is-turned-away-a-packages-view-only-staff-sees-the-blocks-without-a-verb-and-no-caps-the-doors-refuse-both-by-name-mobile-360` — Playwright's name `admin-monetisation-P-1b-Ad-ed568-e-doors-refuse-both-by-name-mobile-360`; this run carried 52 context file(s); of the same spec: `admin-monetisation-P-1b-Ad-181f3-he-row-and-the-audit-follow-mobile-360`, `admin-monetisation-P-1b-Ad-181f3-he-row-and-the-audit-follow-mobile-360-retry1`, `admin-monetisation-P-1b-Ad-e3c61-l-an-ended-season-answers-0-mobile-360-retry1`, `admin-monetisation-P-1b-Ad-4509e-s-author-and-editor-by-name-mobile-360`, `admin-monetisation-P-1b-Ad-d5e3f-lic-read-no-longer-lists-it-mobile-360-retry1`

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-4 a level is created with its perks and both names, shown under the language switch, edited, and attributed to its author and editor by name

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:751:5
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - link "Terms" [ref=e268] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e269]:
            - link "Privacy" [ref=e270] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:872:5
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - link "Terms" [ref=e268] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e269]:
            - link "Privacy" [ref=e270] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:922:5
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - link "Terms" [ref=e268] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e269]:
            - link "Privacy" [ref=e270] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-7 a season: a root ending in ten days caps the level's days and names season_until; an ended season answers 0

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1053:5
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - link "Terms" [ref=e268] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e269]:
            - link "Privacy" [ref=e270] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-8 Add price inside the product's row names the product; the saved row reads Market · Category with its credit cost; a price for every market and a narrower one; the row's search narrows

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1086:5
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - link "Terms" [ref=e268] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e269]:
            - link "Privacy" [ref=e270] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-9 Edit while unused: the amount, the credit cost and the end change through the door; the start is kept; the row and the audit follow

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1169:5
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - link "Terms" [ref=e268] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e269]:
            - link "Privacy" [ref=e270] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-10 a used price: the service client marks it used, the door refuses Edit by name and nothing changes; after a refresh the verb is gone while End stays

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1222:5
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - link "Terms" [ref=e268] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e269]:
            - link "Privacy" [ref=e270] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-11 End price sets the end to now; the row stays, says so, offers no verb any more, and the public read no longer lists it

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1270:5
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - link "Terms" [ref=e268] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e269]:
            - link "Privacy" [ref=e270] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-13 the browser roles read enabled products and valid prices by their own columns, never created_by or updated_by; the console rpc refuses them

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1410:5
```

Context: context file not found for `admin-monetisation-P-1b-Admin-Monetisation-MON-13-the-browser-roles-read-enabled-products-and-valid-prices-by-their-own-columns-never-created_by-or-updated_by-the-console-rpc-refuses-them-mobile-360` — Playwright's name `admin-monetisation-P-1b-Ad-852f2-he-console-rpc-refuses-them-mobile-360`; this run carried 52 context file(s); of the same spec: `admin-monetisation-P-1b-Ad-181f3-he-row-and-the-audit-follow-mobile-360`, `admin-monetisation-P-1b-Ad-181f3-he-row-and-the-audit-follow-mobile-360-retry1`, `admin-monetisation-P-1b-Ad-e3c61-l-an-ended-season-answers-0-mobile-360-retry1`, `admin-monetisation-P-1b-Ad-4509e-s-author-and-editor-by-name-mobile-360`, `admin-monetisation-P-1b-Ad-d5e3f-lic-read-no-longer-lists-it-mobile-360-retry1`

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1499:5
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - link "Terms" [ref=e268] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e269]:
            - link "Privacy" [ref=e270] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-16 the order strip: a market switched on with a sellable product that has no price reads Needs a row, names a product and its market, and its link opens that product's prices

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1644:5
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - link "Terms" [ref=e268] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e269]:
            - link "Privacy" [ref=e270] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-17 the order strip: a price added for every market clears the product from Needs a row; the strip reads Set once no pair is left

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1696:5
```

Context:

```text
          - listitem [ref=e255]:
            - generic [ref=e256]: About
          - listitem [ref=e257]:
            - generic [ref=e258]: Contact
      - navigation "Help" [ref=e259]:
        - heading "Help" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Safety
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - link "Terms" [ref=e268] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e269]:
            - link "Privacy" [ref=e270] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › ATR-1 Premium from the console: the badge, the preview's look, the History line, the row, one audit row, the feed's rank; then Regular again

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Tier"
Received: "Edited: Tier, Other details"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Tier, Other details</p>
       - unexpected value "Edited: Tier, Other details"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Tier"
Received: "Edited: Tier, Other details"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Tier, Other details</p>
       - unexpected value "Edited: Tier, Other details"


  2360 |     await expect(page.getByTestId("listing-detail")).toHaveAttribute("data-tier", "premium");
  2361 |     const first = page.getByTestId("listing-history-entry-0");
> 2362 |     await expect(first.getByTestId("listing-history-what")).toHaveText(
       |                                                             ^
  2363 |       en["admin.listings.history.edited"].replace("{fields}", en["admin.listings.filter.tier"]),
  2364 |     );
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

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › ATR-6 Set tier from the row menu: Premium through the ad page's dialog and door, the Tier filter lists it, one audit row and one revision; the own row and a removed row offer none

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
    "from": "regular",
    "reason": "promotion",
+   "source": "staff",
    "to": "premium",
  }
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
    "from": "regular",
    "reason": "promotion",
+   "source": "staff",
    "to": "premium",
  }

  2573 |     expect(audits).toHaveLength(1);
  2574 |     expect(audits[0]?.["actor_id"]).toBe(admin.user.id);
> 2575 |     expect(audits[0]?.["meta"]).toEqual({ from: "regular", to: "premium", reason: "promotion" });
       |                                 ^
  2576 |     const revisions = await revisionRows(ad.id, "edit");
  2577 |     expect(revisions).toHaveLength(1);
  2578 |     expect(revisions[0]?.["before"]).toEqual({ tier: "regular" });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2575:33
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

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-2 gating: a reviewer has no entry and a deep link is turned away; a packages:view-only staff sees the blocks without a verb and no caps; the doors refuse both by name

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:670:5
```

Context: context file not found for `admin-monetisation-P-1b-Admin-Monetisation-MON-2-gating-a-reviewer-has-no-entry-and-a-deep-link-is-turned-away-a-packages-view-only-staff-sees-the-blocks-without-a-verb-and-no-caps-the-doors-refuse-both-by-name-desktop-1280` — Playwright's name `admin-monetisation-P-1b-Ad-ed568-e-doors-refuse-both-by-name-desktop-1280`; this run carried 52 context file(s); of the same spec: `admin-monetisation-P-1b-Ad-181f3-he-row-and-the-audit-follow-mobile-360`, `admin-monetisation-P-1b-Ad-181f3-he-row-and-the-audit-follow-mobile-360-retry1`, `admin-monetisation-P-1b-Ad-e3c61-l-an-ended-season-answers-0-mobile-360-retry1`, `admin-monetisation-P-1b-Ad-4509e-s-author-and-editor-by-name-mobile-360`, `admin-monetisation-P-1b-Ad-d5e3f-lic-read-no-longer-lists-it-mobile-360-retry1`

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-4 a level is created with its perks and both names, shown under the language switch, edited, and attributed to its author and editor by name

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:751:5
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - link "Terms" [ref=e344] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e345]:
            - link "Privacy" [ref=e346] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-5 a reach row is created without perks, shown in the Reach block, and refused by name when perks are sent to it

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:872:5
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - link "Terms" [ref=e344] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e345]:
            - link "Privacy" [ref=e346] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-6 per-category perks inside the level's row: Add override names the level; a root's days and a market's days-and-photos are saved through the door; level_perks_for answers by precedence for days AND max_photos; the cleared cell falls back

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:922:5
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - link "Terms" [ref=e344] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e345]:
            - link "Privacy" [ref=e346] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-7 a season: a root ending in ten days caps the level's days and names season_until; an ended season answers 0

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1053:5
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - link "Terms" [ref=e344] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e345]:
            - link "Privacy" [ref=e346] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-8 Add price inside the product's row names the product; the saved row reads Market · Category with its credit cost; a price for every market and a narrower one; the row's search narrows

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1086:5
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - link "Terms" [ref=e344] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e345]:
            - link "Privacy" [ref=e346] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-9 Edit while unused: the amount, the credit cost and the end change through the door; the start is kept; the row and the audit follow

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1169:5
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - link "Terms" [ref=e344] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e345]:
            - link "Privacy" [ref=e346] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-10 a used price: the service client marks it used, the door refuses Edit by name and nothing changes; after a refresh the verb is gone while End stays

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1222:5
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - link "Terms" [ref=e344] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e345]:
            - link "Privacy" [ref=e346] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-11 End price sets the end to now; the row stays, says so, offers no verb any more, and the public read no longer lists it

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1270:5
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - link "Terms" [ref=e344] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e345]:
            - link "Privacy" [ref=e346] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-13 the browser roles read enabled products and valid prices by their own columns, never created_by or updated_by; the console rpc refuses them

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1410:5
```

Context: context file not found for `admin-monetisation-P-1b-Admin-Monetisation-MON-13-the-browser-roles-read-enabled-products-and-valid-prices-by-their-own-columns-never-created_by-or-updated_by-the-console-rpc-refuses-them-desktop-1280` — Playwright's name `admin-monetisation-P-1b-Ad-852f2-he-console-rpc-refuses-them-desktop-1280`; this run carried 52 context file(s); of the same spec: `admin-monetisation-P-1b-Ad-181f3-he-row-and-the-audit-follow-mobile-360`, `admin-monetisation-P-1b-Ad-181f3-he-row-and-the-audit-follow-mobile-360-retry1`, `admin-monetisation-P-1b-Ad-e3c61-l-an-ended-season-answers-0-mobile-360-retry1`, `admin-monetisation-P-1b-Ad-4509e-s-author-and-editor-by-name-mobile-360`, `admin-monetisation-P-1b-Ad-d5e3f-lic-read-no-longer-lists-it-mobile-360-retry1`

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1499:5
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - link "Terms" [ref=e344] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e345]:
            - link "Privacy" [ref=e346] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-16 the order strip: a market switched on with a sellable product that has no price reads Needs a row, names a product and its market, and its link opens that product's prices

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1644:5
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - link "Terms" [ref=e344] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e345]:
            - link "Privacy" [ref=e346] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

## admin-monetisation.spec.ts › P-1b Admin › Monetisation › MON-17 the order strip: a price added for every market clears the product from Needs a row; the strip reads Set once no pair is left

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause
--- further error 1 ---
Error: [e2e:mon] product reap failed: DELETE requires a WHERE clause

  331 |   if (prices.error) throw new Error(`${TAG} price reap failed: ${prices.error.message}`);
  332 |   const row = await supabase.from("listing_packages").delete().eq("key", key);
> 333 |   if (row.error) throw new Error(`${TAG} product reap failed: ${row.error.message}`);
      |                        ^
  334 | }
  335 |
  336 | /** The rows a scratch market or category still anchors (FK), before the fixture goes. */
    at destroyProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:333:24)
    at seedProduct (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:469:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-monetisation.spec.ts:1696:5
```

Context:

```text
          - listitem [ref=e331]:
            - generic [ref=e332]: About
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Help" [ref=e335]:
        - heading "Help" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Safety
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - link "Terms" [ref=e344] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e345]:
            - link "Privacy" [ref=e346] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
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

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 10

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /__root gate fetch threw upstream ssr language gate timed out after 1500ms
```

## Client errors: shard 10

No `[client-error]` lines in the `shard 10` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
