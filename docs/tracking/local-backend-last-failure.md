# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40087352763
- Commit: `3db3fd464a0225c928ce570ab6668c126b9dffb0`
- Attempt: 1
- Written (UTC): 2026-10-24T11:06:37.312Z
- Passed: 2048 · Skipped: 154 · Failed: 129
- Gating failures: 129 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

110 line(s), 36 message(s): 2 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 21 | shard 1, shard 4, shard 9, shard 12 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 9, shard 10, shard 12 |
| `categories badHeader` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `categories wrongFile` (quiet) | 4 | shard 2, shard 4, shard 10, shard 12 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 4, shard 9, shard 12 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 9 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 2, shard 9, shard 10 |
| `categories file too large` (quiet) | 2 | shard 4, shard 12 |
| `categories nulByte` (quiet) | 2 | shard 4, shard 12 |
| `categories unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 2, shard 10 |
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
| `new row for relation <q> violates check constraint <q>` | 2 | shard 6, shard 14 |
| `strings badHeader` (quiet) | 2 | shard 4, shard 12 |
| `strings emptyFile` (quiet) | 2 | shard 4, shard 12 |
| `strings nulByte` (quiet) | 2 | shard 4, shard 12 |
| `strings tooManyRows` (quiet) | 2 | shard 4, shard 12 |
| `strings unknownColumn` (quiet) | 2 | shard 4, shard 12 |
| `strings wrongFile` (quiet) | 2 | shard 4, shard 12 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>w<n>ujq: e<n>e_par_e<n>uu<n>s → e<n>e_chi_t<n>ra` (quiet) | 1 | shard 10 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-wclnyj: e<n>e_par_rxw<n>ex → e<n>e_chi_fy<n>y<n>` (quiet) | 1 | shard 1 |
| `listing not found` | 1 | shard 7 |

Quiet (allowlisted): too many previews ×21 · digest mismatch ×12 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>w<n>ujq: e<n>e_par_e<n>uu<n>s → e<n>e_chi_t<n>ra ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-wclnyj: e<n>e_par_rxw<n>ex → e<n>e_chi_fy<n>y<n> ×1

Off the allowlist:

### new row for relation <q> violates check constraint <q>

- Count: 2 · Sources: shard 6, shard 14
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-61 a category change resets details, title, description and price, and Undo w ×2 · PW-73 the door's currency fill is mirrored, so Undo restores a complete price (I ×2

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

### listing not found

- Count: 1 · Sources: shard 7
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-49 a prefill-only fact keeps its input while a settled one does not ×1 · PW-50 the specifications show every row open in display order (D41) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-24T10:51:49.265Z | 11.2 min |
| email | 2026-10-24T10:50:28.913Z | 0.2 min |
| shard 1 | 2026-10-24T10:50:52.091Z | 11.3 min |
| shard 2 | 2026-10-24T10:53:47.636Z | 12.4 min |
| shard 3 | 2026-10-24T10:50:59.712Z | 12.8 min |
| shard 4 | 2026-10-24T10:51:22.492Z | 6.8 min |
| shard 5 | 2026-10-24T10:52:53.142Z | 8.7 min |
| shard 6 | 2026-10-24T10:51:06.437Z | 10.9 min |
| shard 7 | 2026-10-24T10:50:33.967Z | 7.0 min |
| shard 8 | 2026-10-24T10:50:59.117Z | 7.9 min |
| shard 9 | 2026-10-24T10:50:43.925Z | 8.3 min |
| shard 10 | 2026-10-24T10:51:17.510Z | 12.2 min |
| shard 11 | 2026-10-24T10:51:32.627Z | 13.4 min |
| shard 12 | 2026-10-24T10:51:56.312Z | 7.0 min |
| shard 13 | 2026-10-24T10:50:53.262Z | 9.5 min |
| shard 14 | 2026-10-24T10:51:04.077Z | 11.1 min |
| shard 15 | 2026-10-24T10:51:08.442Z | 9.9 min |
| shard 16 | 2026-10-24T10:51:14.681Z | 6.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 18.1 min | smoke, shard 8, shard 16 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.1 min | shard 6, shard 14 |
| `admin-attributes-library.spec.ts` | 42 | 5.4 min | shard 1, shard 9 |
| `photo-pipeline.spec.ts` | 68 | 5.3 min | shard 5, shard 13 |
| `admin-locations.spec.ts` | 38 | 4.7 min | shard 2, shard 10 |
| `admin-translations-console.spec.ts` | 44 | 4.7 min | shard 3, shard 11 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `post-wizard-specs.spec.ts` | 82 | 4.6 min | shard 7, shard 15 |
| `post-wizard-place.spec.ts` | 38 | 4.5 min | shard 6, shard 14 |
| `admin-screening.spec.ts` | 52 | 4.4 min | shard 3, shard 11 |
| `admin-roles.spec.ts` | 26 | 4.3 min | shard 3, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.3 min | shard 2, shard 10 |
| `auth-signout.spec.ts` | 56 | 4.1 min | smoke, shard 3, shard 11 |
| `admin-users.spec.ts` | 28 | 4.0 min | shard 3, shard 11 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-attributes-links.spec.ts` | 34 | 3.8 min | shard 1, shard 9 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.8 min | shard 2, shard 10 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 7, shard 15 |
| `admin-listings.spec.ts` | 62 | 3.5 min | shard 2, shard 10 |
| `post-wizard-pricing.spec.ts` | 52 | 3.4 min | shard 6, shard 14 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 5, shard 13 |
| `posting-routes.spec.ts` | 80 | 3.3 min | shard 7, shard 15 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 1, shard 9 |
| `post-wizard-category.spec.ts` | 48 | 2.8 min | shard 6, shard 14 |
| `ad-page.spec.ts` | 68 | 2.8 min | shard 1, shard 9 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.5 min | shard 1, shard 10 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 10 |
| `import-security.spec.ts` | 36 | 2.3 min | shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 2.2 min | shard 1, shard 9 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 2.0 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `legal-certify.spec.ts` | 42 | 1.8 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `mfa-stepup.spec.ts` | 18 | 1.5 min | shard 5, shard 13 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 2, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 5, shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 1.0 min | shard 7, shard 15 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 3, shard 11 |
| `posting-routes-dials.spec.ts` | 18 | 1.0 min | shard 7, shard 15 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 4, shard 12 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 8, shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 4, shard 11 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `settings.spec.ts` | 4 | 0.3 min | shard 8 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 6, shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 7, shard 15 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.5 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.1 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 30.9 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.5 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 29.3 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 25.7 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 25.7 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 25.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40087352763-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40087352763-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40087352763-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40087352763-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 40087352763-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40087352763-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 40087352763-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40087352763-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40087352763-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40087352763-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40087352763-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40087352763-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40087352763-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40087352763-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 40087352763-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40087352763-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40087352763-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40087352763-local-16
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036)

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:156:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-1-a-JPEG-carrying-GPS-XMP-and-ICC-is-stored-as-image-data-only-REQ-036-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-e01d4-as-image-data-only-REQ-036--mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:196:25
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-2-a-PNG-and-a-WebP-carrying-metadata-chunks-are-stored-as-image-data-only-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-0aed8-e-stored-as-image-data-only-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:218:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-3-a-PDF-renamed-jpg-is-refused-unsupportedFormat-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-869bf-s-refused-unsupportedFormat-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:232:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-4-a-variant-over-its-size-dial-is-refused-by-name-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-44a81-ize-dial-is-refused-by-name-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:251:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-5-the-policy-pass-refuses-the-cover-and-stores-nothing-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-22289-he-cover-and-stores-nothing-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-6 another seller's listing is a 403

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:267:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-6-another-seller-s-listing-is-a-403-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-9168b-r-seller-s-listing-is-a-403-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:292:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-7-the-eleventh-photo-is-refused-tooManyPhotos-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-99f02-to-is-refused-tooManyPhotos-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:313:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-8-DELETE-removes-the-row-and-the-objects-POST-makes-a-photo-the-cover-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-86a2e-OST-makes-a-photo-the-cover-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-9 the upload dial refuses once the seller's hourly ceiling is reached

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:409:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-9-the-upload-dial-refuses-once-the-seller-s-hourly-ceiling-is-reached-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-b2c50-s-hourly-ceiling-is-reached-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-10 a refusal is final and never retried; a 5xx is retried once, then handed over

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:438:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-10-a-refusal-is-final-and-never-retried-a-5xx-is-retried-once-then-handed-over-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-55ced-tried-once-then-handed-over-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-11 a refused photo holds Next until it is removed; the step says photos are public

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:511:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-11-a-refused-photo-holds-Next-until-it-is-removed-the-step-says-photos-are-public-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-eef25-step-says-photos-are-public-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-12 a stored photo is drawn on the photo step through a link that expires

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:563:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-12-a-stored-photo-is-drawn-on-the-photo-step-through-a-link-that-expires-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-18dfa-through-a-link-that-expires-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-13 photo links: the owner and staff get them; another seller and no session do not

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:603:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-13-photo-links-the-owner-and-staff-get-them-another-seller-and-no-session-do-not-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-86e15-eller-and-no-session-do-not-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-14 a photo removed while it uploads, or while it waits its turn, never comes back

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:686:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-14-a-photo-removed-while-it-uploads-or-while-it-waits-its-turn-never-comes-back-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-e6596-s-its-turn-never-comes-back-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-15 a photo stored in an earlier visit can be made the cover, which moves it first, and removed

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:754:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-15-a-photo-stored-in-an-earlier-visit-can-be-made-the-cover-which-moves-it-first-and-removed-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-0fa8a--moves-it-first-and-removed-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-16 a photo dropped on the step is added like a picked one

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:811:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-16-a-photo-dropped-on-the-step-is-added-like-a-picked-one-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-42cc2--is-added-like-a-picked-one-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:855:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-17-Move-earlier-and-Move-later-put-a-photo-at-its-place-and-the-first-is-the-cover-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-890a4--and-the-first-is-the-cover-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-19 Next and Back wait while a photo is sent, and the cover carries its ribbon

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:972:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-19-Next-and-Back-wait-while-a-photo-is-sent-and-the-cover-carries-its-ribbon-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-02885-he-cover-carries-its-ribbon-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1138:21
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-21-a-published-ad-s-cover-photo-reaches-the-feed-card-signed-for-a-visitor-without-a-session-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-1b301-a-visitor-without-a-session-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-screen viewer

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1200:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-22-the-buyer-s-preview-is-a-gallery-thumbnails-arrows-a-swipe-and-a-full-screen-viewer-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-5eb1a-pe-and-a-full-screen-viewer-mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613)

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1309:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-23-the-gallery-draws-the-middle-size-and-on-a-computer-a-wide-photo-s-top-meets-the-first-thumbnail-D162-INC-613-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-63be5-rst-thumbnail-D162-INC-613--mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-24 a middle size over its cap is refused by name and nothing is stored (D162)

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1404:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-24-a-middle-size-over-its-cap-is-refused-by-name-and-nothing-is-stored-D162-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-8fa41-and-nothing-is-stored-D162--mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2)

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1443:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-25-an-edited-photo-takes-the-old-photo-s-place-its-objects-go-at-the-cap-it-is-still-taken-D154-B2-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-2fc14--it-is-still-taken-D154-B2--mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-26 a refused edit leaves the old photo as it was; a photo not on the listing is gone (D154 B2)

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1522:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-26-a-refused-edit-leaves-the-old-photo-as-it-was-a-photo-not-on-the-listing-is-gone-D154-B2-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-2112b-he-listing-is-gone-D154-B2--mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2)

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1583:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-27-Edit-turns-a-photo-and-crops-the-cover-each-saved-in-its-place-D154-B2-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-24fb0-saved-in-its-place-D154-B2--mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-28 a refused edit keeps the editor open with its reason and the photo as it was (D154 B2)

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1654:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-28-a-refused-edit-keeps-the-editor-open-with-its-reason-and-the-photo-as-it-was-D154-B2-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-cb41c-he-photo-as-it-was-D154-B2--mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-29 a photo that may not fit the ad is stored with a warning the seller sees and no visitor reads (D154 B3)

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1726:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-29-a-photo-that-may-not-fit-the-ad-is-stored-with-a-warning-the-seller-sees-and-no-visitor-reads-D154-B3-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-01965-d-no-visitor-reads-D154-B3--mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-30 Remove background is on the cover only; the preview lies on the house background; Keep stores it as the cover (D159)

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1814:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-30-Remove-background-is-on-the-cover-only-the-preview-lies-on-the-house-background-Keep-stores-it-as-the-cover-D159-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-9d802-tores-it-as-the-cover-D159--mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-31 the background route: the seller's own cover only, two tries an ad, then spent; nothing stored (D159)

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1904:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-31-the-background-route-the-seller-s-own-cover-only-two-tries-an-ad-then-spent-nothing-stored-D159-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-a2e57--spent-nothing-stored-D159--mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-32 a failed or unsure photo is kept hidden with its review; nudity is refused and stored nowhere (D178, D183)

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1956:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-32-a-failed-or-unsure-photo-is-kept-hidden-with-its-review-nudity-is-refused-and-stored-nowhere-D178-D183-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-99c80-d-stored-nowhere-D178-D183--mobile-360`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-33 the seller is told why a photo is hidden: the rule it may break, or an unsure check (D178)

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:2046:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-33-the-seller-is-told-why-a-photo-is-hidden-the-rule-it-may-break-or-an-unsure-check-D178-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-2c05a-ak-or-an-unsure-check-D178--mobile-360`; this run carried 128 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: PW-54: the draft route returned no listing

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PW-54: the draft route returned no listing

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  763 |       expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
  764 |       const id = String(answer.payload["listing_id"] ?? "");
> 765 |       expect(id, "PW-54: the draft route returned no listing").not.toBe("");
      |                                                                    ^
  766 |       objects.push({ userId: user.id, listingId: id });
  767 |       const { error } = await adminClient()
  768 |         .from("listings")
    at seedDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:765:68)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:781:7
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-54-the-wizard-walks-category-specifications-photos-details-and-resumes-at-the-first-unfinished-step-mobile-360` — Playwright's name `post-wizard-category-POSTI-75ef6-t-the-first-unfinished-step-mobile-360`; this run carried 128 context file(s); of the same spec: none

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-34 removed held question is released by autosave and strict route save

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  118 |     const held = { [specs.text.attrKey]: "held answer" };
  119 |     const first = await save(page, token, body(cat.id, held));
> 120 |     expect(first["ok"], JSON.stringify(first)).toBe(true);
      |                                                ^
  121 |     const id = String(first["listing_id"]);
  122 |     const unlinked = await adminClient()
  123 |       .from("category_attribute_links")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:120:48
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

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-35 removed held option is released; a required strict question asks again

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  150 |     };
  151 |     const first = await save(page, token, body(cat.id, held));
> 152 |     expect(first["ok"], JSON.stringify(first)).toBe(true);
      |                                                ^
  153 |     const id = String(first["listing_id"]);
  154 |     const removed = await adminClient()
  155 |       .from("attributes")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:152:48
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

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-36 new unknown key and new unknown option remain refused

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  186 |     const held = { [specs.text.attrKey]: "held answer" };
  187 |     const first = await save(page, token, body(cat.id, held));
> 188 |     expect(first["ok"], JSON.stringify(first)).toBe(true);
      |                                                ^
  189 |     const id = String(first["listing_id"]);
  190 |     for (const [attributes, reason, key] of [
  191 |       [{ ...held, e2e_never_held: "new" }, "unknownAttribute", "e2e_never_held"],
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:188:48
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

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-40 a removed question or option is let go once, then the same body is refused

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  213 |     const heldText = { [specs.text.attrKey]: "held answer" };
  214 |     const first = await save(page, token, body(cat.id, heldText));
> 215 |     expect(first["ok"], JSON.stringify(first)).toBe(true);
      |                                                ^
  216 |     const id = String(first["listing_id"]);
  217 |     const unlinked = await adminClient()
  218 |       .from("category_attribute_links")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:215:48
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

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-41 the door refuses an answer the chosen options do not allow

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: case 1: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_alw_3h0aza_1", "detail": "b", "reason": "optionNotAllowed"}]
Received: [{"detail": "invalid_type", "field": "listingId", "reason": "badShape"}]
--- further error 1 ---
Error: case 1: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_alw_3h0aza_1", "detail": "b", "reason": "optionNotAllowed"}]
Received: [{"detail": "invalid_type", "field": "listingId", "reason": "badShape"}]

  324 |       expect
  325 |         .soft(answer["refusals"], `${label}: ${JSON.stringify(answer)}`)
> 326 |         .toEqual(
      |          ^
  327 |           expect.arrayContaining([
  328 |             expect.objectContaining({ attr_key: key, reason: "optionNotAllowed", detail }),
  329 |           ]),
    at refusedAt (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:326:10)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:344:5
--- further error 2 ---
Error: case 2: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  331 |     }
  332 |     function accepted(label: string, answer: Record<string, unknown>) {
> 333 |       expect.soft(answer["ok"], `${label}: ${JSON.stringify(answer)}`).toBe(true);
      |                                                                        ^
  334 |     }
  335 |
  336 |     // Cases 1, 2, 6 and 7: parent P narrows child C to [a]; T is free to change.
    at accepted (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:333:72)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:346:5
--- further error 3 ---
Error: case 7: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_alw_3h0aza_1", "detail": "other", "reason": "optionNotAllowed"}]
Received: [{"detail": "invalid_type", "field": "listingId", "reason": "badShape"}]

  324 |       expect
  325 |         .soft(answer["refusals"], `${label}: ${JSON.stringify(answer)}`)
> 326 |         .toEqual(
      |          ^
  327 |           expect.arrayContaining([
  328 |             expect.objectContaining({ attr_key: key, reason: "optionNotAllowed", detail }),
  329 |           ]),
    at refusedAt (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:326:10)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:347:5
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

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-42 the door reads a padded answer as the value it stores

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: padded (1): {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_trm_p4mu4e_1", "detail": "b", "reason": "optionNotAllowed"}]
Received: [{"detail": "invalid_type", "field": "listingId", "reason": "badShape"}]
--- further error 1 ---
Error: padded (1): {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_trm_p4mu4e_1", "detail": "b", "reason": "optionNotAllowed"}]
Received: [{"detail": "invalid_type", "field": "listingId", "reason": "badShape"}]

  455 |     ) {
  456 |       expect.soft(answer["ok"], `${label}: ${JSON.stringify(answer)}`).toBe(false);
> 457 |       expect.soft(answer["refusals"], `${label}: ${JSON.stringify(answer)}`).toEqual(
      |                                                                              ^
  458 |         expect.arrayContaining([
  459 |           expect.objectContaining({
  460 |             attr_key: key,
    at refusedAt (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:457:78)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:491:7
--- further error 2 ---
Error: padded (2): {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_trm_p4mu4e_3", "detail": "1..10", "reason": "outOfBounds"}]
Received: [{"detail": "invalid_type", "field": "listingId", "reason": "badShape"}]

  455 |     ) {
  456 |       expect.soft(answer["ok"], `${label}: ${JSON.stringify(answer)}`).toBe(false);
> 457 |       expect.soft(answer["refusals"], `${label}: ${JSON.stringify(answer)}`).toEqual(
      |                                                                              ^
  458 |         expect.arrayContaining([
  459 |           expect.objectContaining({
  460 |             attr_key: key,
    at refusedAt (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:457:78)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:498:7
--- further error 3 ---
Error: padded (3): {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_trm_p4mu4e_6", "reason": "required"}]
Received: [{"detail": "invalid_type", "field": "listingId", "reason": "badShape"}]

  455 |     ) {
  456 |       expect.soft(answer["ok"], `${label}: ${JSON.stringify(answer)}`).toBe(false);
> 457 |       expect.soft(answer["refusals"], `${label}: ${JSON.stringify(answer)}`).toEqual(
      |                                                                              ^
  458 |         expect.arrayContaining([
  459 |           expect.objectContaining({
  460 |             attr_key: key,
    at refusedAt (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:457:78)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:505:7
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

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-37 coverage first appearance is stored once, renumbered in either order

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  557 |     ]) {
  558 |       const answer = await save(page, token, { ...draft, listingId: id, coverage: order });
> 559 |       expect(answer["ok"], JSON.stringify(answer)).toBe(true);
      |                                                    ^
  560 |       id = String(answer["listing_id"]);
  561 |       expect(
  562 |         (await storedPlaces(id)).map(({ location_id, position }) => ({ location_id, position })),
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:559:52
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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:134:45
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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-28 transition_listing counts against the revise dial

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:157:33
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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-29 renew_listing counts against the revise dial

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:169:33
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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-30 set_listing_pin counts against the revise dial

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:178:33
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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-31 mark_sold counts against the revise dial

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:187:33
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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-32 relist_listing counts against the revise dial

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:196:33
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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-45 set_listing_reserved counts against the revise dial

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:205:33
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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-46 set_listing_price counts against the revise dial

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:214:33
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

## posting-routes.spec.ts › POSTING ROUTES › PR-1 the draft route sets the observed residency from the edge exactly once

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  109 |     );
  110 |     expect(first.status, JSON.stringify(first.payload)).toBe(200);
> 111 |     expect(first.payload["ok"], JSON.stringify(first.payload)).toBe(true);
      |                                                                ^
  112 |     expect(String(first.payload["listing_id"] ?? "")).not.toBe("");
  113 |     // DB truth (J4): the fact the door will read, written by the route.
  114 |     expect(await observedCountryOf(user.id)).toBe("ET");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:111:64
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

## posting-routes.spec.ts › POSTING ROUTES › PR-2 an incomplete step is the door's own refusal, at status 200

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toContain(expected) // indexOf

Expected value: "price_amount"
Received array: ["listingId"]
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toContain(expected) // indexOf

Expected value: "price_amount"
Received array: ["listingId"]

  151 |       reasonsOf(answer.payload).map((entry) => entry.field),
  152 |       JSON.stringify(answer.payload),
> 153 |     ).toContain("price_amount");
      |       ^
  154 |   });
  155 |
  156 |   test("PR-10 a pricing basis is the door's own refusal by name, at status 200 (DEC-079)", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:153:7
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

## posting-routes.spec.ts › POSTING ROUTES › PR-10 a pricing basis is the door's own refusal by name, at status 200 (DEC-079)

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "price_period", "reason": "periodFollowsBasis"}
Received array: [{"field": "listingId", "reason": "badShape"}]
--- further error 1 ---
Error: expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "price_period", "reason": "periodFollowsBasis"}
Received array: [{"field": "listingId", "reason": "badShape"}]

  188 |         pricePeriod: "once",
  189 |       }),
> 190 |     ).toContainEqual({ field: "price_period", reason: "periodFollowsBasis" });
      |       ^
  191 |     expect(
  192 |       await ask("quote", { priceMode: "fixed", priceAmount: 100, priceCurrency: "ETB" }),
  193 |     ).toContainEqual({ field: "price_mode", reason: "modeFollowsBasis" });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:190:7
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

## posting-routes.spec.ts › POSTING ROUTES › PR-11 negotiable is a flag: stored on a price, forced off on contact (DEC-081)

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  243 |     );
  244 |     expect(fixed.status, JSON.stringify(fixed.payload)).toBe(200);
> 245 |     expect(fixed.payload["ok"], JSON.stringify(fixed.payload)).toBe(true);
      |                                                                ^
  246 |     const listingId = String(fixed.payload["listing_id"] ?? "");
  247 |     expect(listingId).not.toBe("");
  248 |     expect(await negotiableOf(listingId)).toBe(true);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:245:64
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

## posting-routes.spec.ts › POSTING ROUTES › PR-12 the draft door at step 1 takes 'negotiable' as an alias: fixed + flag (INC-309)

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  270 |     );
  271 |     expect(draft.status, JSON.stringify(draft.payload)).toBe(200);
> 272 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
      |                                                                ^
  273 |     const listingId = String(draft.payload["listing_id"] ?? "");
  274 |     expect(listingId).not.toBe("");
  275 |     const { data, error } = await adminClient()
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:272:64
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

## posting-routes.spec.ts › POSTING ROUTES › PR-13 a draft may carry a commission before its percentage (INC-312)

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  292 |     );
  293 |     expect(draft.status, JSON.stringify(draft.payload)).toBe(200);
> 294 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
      |                                                                ^
  295 |     const listingId = String(draft.payload["listing_id"] ?? "");
  296 |     expect(listingId).not.toBe("");
  297 |     const { data, error } = await adminClient()
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:294:64
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

## posting-routes.spec.ts › POSTING ROUTES › PR-14 the draft door's answer names the currency it stored (INC-321)

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  329 |     console.log(`PR-14 answer: ${JSON.stringify(answer.payload)}`);
  330 |     expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
> 331 |     expect(answer.payload["ok"], JSON.stringify(answer.payload)).toBe(true);
      |                                                                  ^
  332 |     const code = String(answer.payload["price_currency"] ?? "");
  333 |     expect(code).toMatch(/^[A-Z]{3}$/);
  334 |     const { data, error } = await adminClient()
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:331:66
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

## posting-routes.spec.ts › POSTING ROUTES › PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (INC-324)

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  353 |     );
  354 |     expect(first.status, JSON.stringify(first.payload)).toBe(200);
> 355 |     expect(first.payload["ok"], JSON.stringify(first.payload)).toBe(true);
      |                                                                ^
  356 |     const listingId = String(first.payload["listing_id"] ?? "");
  357 |     expect(listingId).not.toBe("");
  358 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:355:64
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

## posting-routes.spec.ts › POSTING ROUTES › PR-5 assist answers from the facts alone, within the field caps

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: PR-5: the draft door made no listing

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PR-5: the draft door made no listing

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  461 |     );
  462 |     const listingId = String(draft.payload["listing_id"] ?? "");
> 463 |     expect(listingId, "PR-5: the draft door made no listing").not.toBe("");
      |                                                                   ^
  464 |
  465 |     const answer = await postRoute(
  466 |       page,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:463:67
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

## posting-routes.spec.ts › POSTING ROUTES › PR-7 the draft dial refuses by name once the ceiling is reached

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: the dial never refused within 5 calls

expect(received).not.toBeNull()

Received: null
--- further error 1 ---
Error: the dial never refused within 5 calls

expect(received).not.toBeNull()

Received: null

  554 |         }
  555 |       }
> 556 |       expect(refusal, `the dial never refused within ${ceiling + 2} calls`).not.toBeNull();
      |                                                                                 ^
  557 |       const entry = (Array.isArray(refusal!["refusals"]) ? refusal!["refusals"][0] : {}) as Record<
  558 |         string,
  559 |         unknown
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:556:81
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

## posting-routes.spec.ts › POSTING ROUTES › PR-17 the draft route refuses a region-only place and accepts a city and a sub-city

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: step 3

expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "coverage", "reason": "cityRequired"}
Received array: [{"field": "listingId", "reason": "badShape"}]
--- further error 1 ---
Error: step 3

expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "coverage", "reason": "cityRequired"}
Received array: [{"field": "listingId", "reason": "badShape"}]

  734 |       expect(refused.status, JSON.stringify(refused.payload)).toBe(200);
  735 |       expect(refused.payload["ok"], JSON.stringify(refused.payload)).toBe(false);
> 736 |       expect(reasonsOf(refused.payload), `step ${step}`).toContainEqual({
      |                                                          ^
  737 |         field: "coverage",
  738 |         reason: "cityRequired",
  739 |       });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:736:58
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

## posting-routes.spec.ts › POSTING ROUTES › PR-18 the draft route accepts a 5000-character description and refuses 5001

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "description", "reason": "tooLong"}
Received array: [{"field": "listingId", "reason": "badShape"}]
--- further error 1 ---
Error: expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "description", "reason": "tooLong"}
Received array: [{"field": "listingId", "reason": "badShape"}]

  782 |     expect(refused.status).toBe(200);
  783 |     expect(refused.payload["ok"], JSON.stringify(refused.payload)).toBe(false);
> 784 |     expect(reasonsOf(refused.payload)).toContainEqual({
      |                                        ^
  785 |       field: "description",
  786 |       reason: "tooLong",
  787 |     });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:784:40
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

## posting-routes.spec.ts › POSTING ROUTES › PR-16 a model question that matters is required by the draft route (DEC-086)

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toContainEqual(expected) // deep equality

Expected value: {"attr_key": "e2e_pr16_54_6ujrr7_model", "reason": "required"}
Received array: [{"attr_key": undefined, "reason": "badShape"}]
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toContainEqual(expected) // deep equality

Expected value: {"attr_key": "e2e_pr16_54_6ujrr7_model", "reason": "required"}
Received array: [{"attr_key": undefined, "reason": "badShape"}]

  856 |     expect(missing.status, JSON.stringify(missing.payload)).toBe(200);
  857 |     expect(missing.payload["ok"], JSON.stringify(missing.payload)).toBe(false);
> 858 |     expect(refusalsOf(missing.payload), JSON.stringify(missing.payload)).toContainEqual({
      |                                                                          ^
  859 |       attr_key: modelKey,
  860 |       reason: "required",
  861 |     });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:858:74
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

## posting-routes.spec.ts › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  933 |       { token, country: "ET" },
  934 |     );
> 935 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
      |                                                                ^
  936 |     const listingId = String(draft.payload["listing_id"] ?? "");
  937 |
  938 |     for (const column of ["contact_pref", "pin_lat", "pin_lng", "home_country_code"]) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:935:64
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

## posting-routes.spec.ts › POSTING ROUTES › PR-48 the writing helper spends only its caller's own listing's tries

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: PR-48: the draft door made no listing

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PR-48: the draft door made no listing

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  1259 |     );
  1260 |     const listingId = String(draft.payload["listing_id"] ?? "");
> 1261 |     expect(listingId, "PR-48: the draft door made no listing").not.toBe("");
       |                                                                    ^
  1262 |     const other = await seller(page);
  1263 |     const body = { categoryId: cat.id, locale: "en", attrs: {}, listingId };
  1264 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1261:68
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

## posting-routes.spec.ts › POSTING ROUTES › PR-50 photos on drafts stop past 50 in 7 days with no ad submitted, and come back once one is (D185)

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: PR-50: the draft door made no listing

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PR-50: the draft door made no listing

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  1336 |     );
  1337 |     const listingId = String(draft.payload["listing_id"] ?? "");
> 1338 |     expect(listingId, "PR-50: the draft door made no listing").not.toBe("");
       |                                                                    ^
  1339 |     await inOneWindow(604800, 20_000, "PR-50");
  1340 |     try {
  1341 |       const windowStart = new Date(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1338:68
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

## posting-routes.spec.ts › POSTING ROUTES › D189 deactivated seller › PR-52 the assist peek answers the budget without spending, and refuses what is not the caller's (INC-669)

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  1451 |       );
  1452 |       expect(draft.status, JSON.stringify(draft.payload)).toBe(200);
> 1453 |       expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
       |                                                                  ^
  1454 |       const listingId = String(draft.payload["listing_id"] ?? "");
  1455 |       expect(listingId, "PR-52: the draft door made no listing").not.toBe("");
  1456 |       const headers = { Authorization: `Bearer ${token}` };
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1453:66
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

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036)

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:156:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-1-a-JPEG-carrying-GPS-XMP-and-ICC-is-stored-as-image-data-only-REQ-036-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-e01d4-as-image-data-only-REQ-036--desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:196:25
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-2-a-PNG-and-a-WebP-carrying-metadata-chunks-are-stored-as-image-data-only-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-0aed8-e-stored-as-image-data-only-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:218:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-3-a-PDF-renamed-jpg-is-refused-unsupportedFormat-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-869bf-s-refused-unsupportedFormat-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-4 a variant over its size dial is refused by name

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:232:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-4-a-variant-over-its-size-dial-is-refused-by-name-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-44a81-ize-dial-is-refused-by-name-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-5 the policy pass refuses the cover and stores nothing

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:251:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-5-the-policy-pass-refuses-the-cover-and-stores-nothing-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-22289-he-cover-and-stores-nothing-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-6 another seller's listing is a 403

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:267:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-6-another-seller-s-listing-is-a-403-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-9168b-r-seller-s-listing-is-a-403-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:292:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-7-the-eleventh-photo-is-refused-tooManyPhotos-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-99f02-to-is-refused-tooManyPhotos-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:313:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-8-DELETE-removes-the-row-and-the-objects-POST-makes-a-photo-the-cover-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-86a2e-OST-makes-a-photo-the-cover-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-9 the upload dial refuses once the seller's hourly ceiling is reached

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:409:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-9-the-upload-dial-refuses-once-the-seller-s-hourly-ceiling-is-reached-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-b2c50-s-hourly-ceiling-is-reached-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-10 a refusal is final and never retried; a 5xx is retried once, then handed over

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:438:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-10-a-refusal-is-final-and-never-retried-a-5xx-is-retried-once-then-handed-over-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-55ced-tried-once-then-handed-over-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-11 a refused photo holds Next until it is removed; the step says photos are public

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:511:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-11-a-refused-photo-holds-Next-until-it-is-removed-the-step-says-photos-are-public-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-eef25-step-says-photos-are-public-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-12 a stored photo is drawn on the photo step through a link that expires

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:563:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-12-a-stored-photo-is-drawn-on-the-photo-step-through-a-link-that-expires-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-18dfa-through-a-link-that-expires-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-13 photo links: the owner and staff get them; another seller and no session do not

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:603:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-13-photo-links-the-owner-and-staff-get-them-another-seller-and-no-session-do-not-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-86e15-eller-and-no-session-do-not-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-14 a photo removed while it uploads, or while it waits its turn, never comes back

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:686:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-14-a-photo-removed-while-it-uploads-or-while-it-waits-its-turn-never-comes-back-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-e6596-s-its-turn-never-comes-back-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-15 a photo stored in an earlier visit can be made the cover, which moves it first, and removed

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:754:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-15-a-photo-stored-in-an-earlier-visit-can-be-made-the-cover-which-moves-it-first-and-removed-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-0fa8a--moves-it-first-and-removed-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-16 a photo dropped on the step is added like a picked one

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:811:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-16-a-photo-dropped-on-the-step-is-added-like-a-picked-one-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-42cc2--is-added-like-a-picked-one-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:855:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-17-Move-earlier-and-Move-later-put-a-photo-at-its-place-and-the-first-is-the-cover-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-890a4--and-the-first-is-the-cover-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-18 a photo dragged onto another photo takes its place (computer)

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:928:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-18-a-photo-dragged-onto-another-photo-takes-its-place-computer-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-fe44d-o-takes-its-place-computer--desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-19 Next and Back wait while a photo is sent, and the cover carries its ribbon

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:972:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-19-Next-and-Back-wait-while-a-photo-is-sent-and-the-cover-carries-its-ribbon-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-02885-he-cover-carries-its-ribbon-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1138:21
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-21-a-published-ad-s-cover-photo-reaches-the-feed-card-signed-for-a-visitor-without-a-session-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-1b301-a-visitor-without-a-session-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-screen viewer

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1200:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-22-the-buyer-s-preview-is-a-gallery-thumbnails-arrows-a-swipe-and-a-full-screen-viewer-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-5eb1a-pe-and-a-full-screen-viewer-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613)

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1309:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-23-the-gallery-draws-the-middle-size-and-on-a-computer-a-wide-photo-s-top-meets-the-first-thumbnail-D162-INC-613-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-63be5-rst-thumbnail-D162-INC-613--desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-24 a middle size over its cap is refused by name and nothing is stored (D162)

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1404:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-24-a-middle-size-over-its-cap-is-refused-by-name-and-nothing-is-stored-D162-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-8fa41-and-nothing-is-stored-D162--desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2)

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1443:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-25-an-edited-photo-takes-the-old-photo-s-place-its-objects-go-at-the-cap-it-is-still-taken-D154-B2-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-2fc14--it-is-still-taken-D154-B2--desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-26 a refused edit leaves the old photo as it was; a photo not on the listing is gone (D154 B2)

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1522:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-26-a-refused-edit-leaves-the-old-photo-as-it-was-a-photo-not-on-the-listing-is-gone-D154-B2-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-2112b-he-listing-is-gone-D154-B2--desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-27 Edit turns a photo and crops the cover, each saved in its place (D154 B2)

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1583:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-27-Edit-turns-a-photo-and-crops-the-cover-each-saved-in-its-place-D154-B2-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-24fb0-saved-in-its-place-D154-B2--desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-28 a refused edit keeps the editor open with its reason and the photo as it was (D154 B2)

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1654:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-28-a-refused-edit-keeps-the-editor-open-with-its-reason-and-the-photo-as-it-was-D154-B2-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-cb41c-he-photo-as-it-was-D154-B2--desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-29 a photo that may not fit the ad is stored with a warning the seller sees and no visitor reads (D154 B3)

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1726:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-29-a-photo-that-may-not-fit-the-ad-is-stored-with-a-warning-the-seller-sees-and-no-visitor-reads-D154-B3-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-01965-d-no-visitor-reads-D154-B3--desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-30 Remove background is on the cover only; the preview lies on the house background; Keep stores it as the cover (D159)

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1814:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-30-Remove-background-is-on-the-cover-only-the-preview-lies-on-the-house-background-Keep-stores-it-as-the-cover-D159-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-9d802-tores-it-as-the-cover-D159--desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-31 the background route: the seller's own cover only, two tries an ad, then spent; nothing stored (D159)

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1904:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-31-the-background-route-the-seller-s-own-cover-only-two-tries-an-ad-then-spent-nothing-stored-D159-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-a2e57--spent-nothing-stored-D159--desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-32 a failed or unsure photo is kept hidden with its review; nudity is refused and stored nowhere (D178, D183)

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1956:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-32-a-failed-or-unsure-photo-is-kept-hidden-with-its-review-nudity-is-refused-and-stored-nowhere-D178-D183-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-99c80-d-stored-nowhere-D178-D183--desktop-1280`; this run carried 128 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-33 the seller is told why a photo is hidden: the rule it may break, or an unsure check (D178)

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PP: the draft route returned no listing ({"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]})

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  136 |       listingId,
  137 |       `PP: the draft route returned no listing (${JSON.stringify(answer.payload)})`,
> 138 |     ).not.toBe("");
      |           ^
  139 |     objects.push({ userId, listingId });
  140 |     // D39 — photos follow specifications in the walk; the scratch draft is
  141 |     // recorded as past specifications (service client, this scratch row only)
    at draft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:138:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:2046:23
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-33-the-seller-is-told-why-a-photo-is-hidden-the-rule-it-may-break-or-an-unsure-check-D178-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-2c05a-ak-or-an-unsure-check-D178--desktop-1280`; this run carried 128 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step

- Source: `shard 14`
- Project: `desktop-1280`

```text
Error: PW-54: the draft route returned no listing

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PW-54: the draft route returned no listing

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  763 |       expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
  764 |       const id = String(answer.payload["listing_id"] ?? "");
> 765 |       expect(id, "PW-54: the draft route returned no listing").not.toBe("");
      |                                                                    ^
  766 |       objects.push({ userId: user.id, listingId: id });
  767 |       const { error } = await adminClient()
  768 |         .from("listings")
    at seedDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:765:68)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:781:7
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-54-the-wizard-walks-category-specifications-photos-details-and-resumes-at-the-first-unfinished-step-desktop-1280` — Playwright's name `post-wizard-category-POSTI-75ef6-t-the-first-unfinished-step-desktop-1280`; this run carried 128 context file(s); of the same spec: none

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-34 removed held question is released by autosave and strict route save

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  118 |     const held = { [specs.text.attrKey]: "held answer" };
  119 |     const first = await save(page, token, body(cat.id, held));
> 120 |     expect(first["ok"], JSON.stringify(first)).toBe(true);
      |                                                ^
  121 |     const id = String(first["listing_id"]);
  122 |     const unlinked = await adminClient()
  123 |       .from("category_attribute_links")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:120:48
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

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-35 removed held option is released; a required strict question asks again

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  150 |     };
  151 |     const first = await save(page, token, body(cat.id, held));
> 152 |     expect(first["ok"], JSON.stringify(first)).toBe(true);
      |                                                ^
  153 |     const id = String(first["listing_id"]);
  154 |     const removed = await adminClient()
  155 |       .from("attributes")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:152:48
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

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-36 new unknown key and new unknown option remain refused

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  186 |     const held = { [specs.text.attrKey]: "held answer" };
  187 |     const first = await save(page, token, body(cat.id, held));
> 188 |     expect(first["ok"], JSON.stringify(first)).toBe(true);
      |                                                ^
  189 |     const id = String(first["listing_id"]);
  190 |     for (const [attributes, reason, key] of [
  191 |       [{ ...held, e2e_never_held: "new" }, "unknownAttribute", "e2e_never_held"],
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:188:48
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

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-40 a removed question or option is let go once, then the same body is refused

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  213 |     const heldText = { [specs.text.attrKey]: "held answer" };
  214 |     const first = await save(page, token, body(cat.id, heldText));
> 215 |     expect(first["ok"], JSON.stringify(first)).toBe(true);
      |                                                ^
  216 |     const id = String(first["listing_id"]);
  217 |     const unlinked = await adminClient()
  218 |       .from("category_attribute_links")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:215:48
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

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-41 the door refuses an answer the chosen options do not allow

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: case 1: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_alw_1n9083_1", "detail": "b", "reason": "optionNotAllowed"}]
Received: [{"detail": "invalid_type", "field": "listingId", "reason": "badShape"}]
--- further error 1 ---
Error: case 1: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_alw_1n9083_1", "detail": "b", "reason": "optionNotAllowed"}]
Received: [{"detail": "invalid_type", "field": "listingId", "reason": "badShape"}]

  324 |       expect
  325 |         .soft(answer["refusals"], `${label}: ${JSON.stringify(answer)}`)
> 326 |         .toEqual(
      |          ^
  327 |           expect.arrayContaining([
  328 |             expect.objectContaining({ attr_key: key, reason: "optionNotAllowed", detail }),
  329 |           ]),
    at refusedAt (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:326:10)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:344:5
--- further error 2 ---
Error: case 2: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  331 |     }
  332 |     function accepted(label: string, answer: Record<string, unknown>) {
> 333 |       expect.soft(answer["ok"], `${label}: ${JSON.stringify(answer)}`).toBe(true);
      |                                                                        ^
  334 |     }
  335 |
  336 |     // Cases 1, 2, 6 and 7: parent P narrows child C to [a]; T is free to change.
    at accepted (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:333:72)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:346:5
--- further error 3 ---
Error: case 7: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_alw_1n9083_1", "detail": "other", "reason": "optionNotAllowed"}]
Received: [{"detail": "invalid_type", "field": "listingId", "reason": "badShape"}]

  324 |       expect
  325 |         .soft(answer["refusals"], `${label}: ${JSON.stringify(answer)}`)
> 326 |         .toEqual(
      |          ^
  327 |           expect.arrayContaining([
  328 |             expect.objectContaining({ attr_key: key, reason: "optionNotAllowed", detail }),
  329 |           ]),
    at refusedAt (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:326:10)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:347:5
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

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-42 the door reads a padded answer as the value it stores

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: padded (1): {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_trm_njw503_1", "detail": "b", "reason": "optionNotAllowed"}]
Received: [{"detail": "invalid_type", "field": "listingId", "reason": "badShape"}]
--- further error 1 ---
Error: padded (1): {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_trm_njw503_1", "detail": "b", "reason": "optionNotAllowed"}]
Received: [{"detail": "invalid_type", "field": "listingId", "reason": "badShape"}]

  455 |     ) {
  456 |       expect.soft(answer["ok"], `${label}: ${JSON.stringify(answer)}`).toBe(false);
> 457 |       expect.soft(answer["refusals"], `${label}: ${JSON.stringify(answer)}`).toEqual(
      |                                                                              ^
  458 |         expect.arrayContaining([
  459 |           expect.objectContaining({
  460 |             attr_key: key,
    at refusedAt (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:457:78)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:491:7
--- further error 2 ---
Error: padded (2): {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_trm_njw503_3", "detail": "1..10", "reason": "outOfBounds"}]
Received: [{"detail": "invalid_type", "field": "listingId", "reason": "badShape"}]

  455 |     ) {
  456 |       expect.soft(answer["ok"], `${label}: ${JSON.stringify(answer)}`).toBe(false);
> 457 |       expect.soft(answer["refusals"], `${label}: ${JSON.stringify(answer)}`).toEqual(
      |                                                                              ^
  458 |         expect.arrayContaining([
  459 |           expect.objectContaining({
  460 |             attr_key: key,
    at refusedAt (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:457:78)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:498:7
--- further error 3 ---
Error: padded (3): {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_trm_njw503_6", "reason": "required"}]
Received: [{"detail": "invalid_type", "field": "listingId", "reason": "badShape"}]

  455 |     ) {
  456 |       expect.soft(answer["ok"], `${label}: ${JSON.stringify(answer)}`).toBe(false);
> 457 |       expect.soft(answer["refusals"], `${label}: ${JSON.stringify(answer)}`).toEqual(
      |                                                                              ^
  458 |         expect.arrayContaining([
  459 |           expect.objectContaining({
  460 |             attr_key: key,
    at refusedAt (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:457:78)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:505:7
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

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-37 coverage first appearance is stored once, renumbered in either order

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  557 |     ]) {
  558 |       const answer = await save(page, token, { ...draft, listingId: id, coverage: order });
> 559 |       expect(answer["ok"], JSON.stringify(answer)).toBe(true);
      |                                                    ^
  560 |       id = String(answer["listing_id"]);
  561 |       expect(
  562 |         (await storedPlaces(id)).map(({ location_id, position }) => ({ location_id, position })),
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:559:52
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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:134:45
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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-28 transition_listing counts against the revise dial

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:157:33
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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-29 renew_listing counts against the revise dial

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:169:33
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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-30 set_listing_pin counts against the revise dial

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:178:33
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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-31 mark_sold counts against the revise dial

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:187:33
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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-32 relist_listing counts against the revise dial

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:196:33
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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-45 set_listing_reserved counts against the revise dial

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:205:33
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

## posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-46 set_listing_price counts against the revise dial

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:214:33
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

## posting-routes.spec.ts › POSTING ROUTES › PR-1 the draft route sets the observed residency from the edge exactly once

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  109 |     );
  110 |     expect(first.status, JSON.stringify(first.payload)).toBe(200);
> 111 |     expect(first.payload["ok"], JSON.stringify(first.payload)).toBe(true);
      |                                                                ^
  112 |     expect(String(first.payload["listing_id"] ?? "")).not.toBe("");
  113 |     // DB truth (J4): the fact the door will read, written by the route.
  114 |     expect(await observedCountryOf(user.id)).toBe("ET");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:111:64
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

## posting-routes.spec.ts › POSTING ROUTES › PR-2 an incomplete step is the door's own refusal, at status 200

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toContain(expected) // indexOf

Expected value: "price_amount"
Received array: ["listingId"]
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toContain(expected) // indexOf

Expected value: "price_amount"
Received array: ["listingId"]

  151 |       reasonsOf(answer.payload).map((entry) => entry.field),
  152 |       JSON.stringify(answer.payload),
> 153 |     ).toContain("price_amount");
      |       ^
  154 |   });
  155 |
  156 |   test("PR-10 a pricing basis is the door's own refusal by name, at status 200 (DEC-079)", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:153:7
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

## posting-routes.spec.ts › POSTING ROUTES › PR-10 a pricing basis is the door's own refusal by name, at status 200 (DEC-079)

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "price_period", "reason": "periodFollowsBasis"}
Received array: [{"field": "listingId", "reason": "badShape"}]
--- further error 1 ---
Error: expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "price_period", "reason": "periodFollowsBasis"}
Received array: [{"field": "listingId", "reason": "badShape"}]

  188 |         pricePeriod: "once",
  189 |       }),
> 190 |     ).toContainEqual({ field: "price_period", reason: "periodFollowsBasis" });
      |       ^
  191 |     expect(
  192 |       await ask("quote", { priceMode: "fixed", priceAmount: 100, priceCurrency: "ETB" }),
  193 |     ).toContainEqual({ field: "price_mode", reason: "modeFollowsBasis" });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:190:7
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

## posting-routes.spec.ts › POSTING ROUTES › PR-11 negotiable is a flag: stored on a price, forced off on contact (DEC-081)

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  243 |     );
  244 |     expect(fixed.status, JSON.stringify(fixed.payload)).toBe(200);
> 245 |     expect(fixed.payload["ok"], JSON.stringify(fixed.payload)).toBe(true);
      |                                                                ^
  246 |     const listingId = String(fixed.payload["listing_id"] ?? "");
  247 |     expect(listingId).not.toBe("");
  248 |     expect(await negotiableOf(listingId)).toBe(true);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:245:64
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

## posting-routes.spec.ts › POSTING ROUTES › PR-12 the draft door at step 1 takes 'negotiable' as an alias: fixed + flag (INC-309)

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  270 |     );
  271 |     expect(draft.status, JSON.stringify(draft.payload)).toBe(200);
> 272 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
      |                                                                ^
  273 |     const listingId = String(draft.payload["listing_id"] ?? "");
  274 |     expect(listingId).not.toBe("");
  275 |     const { data, error } = await adminClient()
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:272:64
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

## posting-routes.spec.ts › POSTING ROUTES › PR-13 a draft may carry a commission before its percentage (INC-312)

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  292 |     );
  293 |     expect(draft.status, JSON.stringify(draft.payload)).toBe(200);
> 294 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
      |                                                                ^
  295 |     const listingId = String(draft.payload["listing_id"] ?? "");
  296 |     expect(listingId).not.toBe("");
  297 |     const { data, error } = await adminClient()
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:294:64
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

## posting-routes.spec.ts › POSTING ROUTES › PR-14 the draft door's answer names the currency it stored (INC-321)

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  329 |     console.log(`PR-14 answer: ${JSON.stringify(answer.payload)}`);
  330 |     expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
> 331 |     expect(answer.payload["ok"], JSON.stringify(answer.payload)).toBe(true);
      |                                                                  ^
  332 |     const code = String(answer.payload["price_currency"] ?? "");
  333 |     expect(code).toMatch(/^[A-Z]{3}$/);
  334 |     const { data, error } = await adminClient()
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:331:66
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

## posting-routes.spec.ts › POSTING ROUTES › PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (INC-324)

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  353 |     );
  354 |     expect(first.status, JSON.stringify(first.payload)).toBe(200);
> 355 |     expect(first.payload["ok"], JSON.stringify(first.payload)).toBe(true);
      |                                                                ^
  356 |     const listingId = String(first.payload["listing_id"] ?? "");
  357 |     expect(listingId).not.toBe("");
  358 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:355:64
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

## posting-routes.spec.ts › POSTING ROUTES › PR-5 assist answers from the facts alone, within the field caps

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: PR-5: the draft door made no listing

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PR-5: the draft door made no listing

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  461 |     );
  462 |     const listingId = String(draft.payload["listing_id"] ?? "");
> 463 |     expect(listingId, "PR-5: the draft door made no listing").not.toBe("");
      |                                                                   ^
  464 |
  465 |     const answer = await postRoute(
  466 |       page,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:463:67
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

## posting-routes.spec.ts › POSTING ROUTES › PR-7 the draft dial refuses by name once the ceiling is reached

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: the dial never refused within 5 calls

expect(received).not.toBeNull()

Received: null
--- further error 1 ---
Error: the dial never refused within 5 calls

expect(received).not.toBeNull()

Received: null

  554 |         }
  555 |       }
> 556 |       expect(refusal, `the dial never refused within ${ceiling + 2} calls`).not.toBeNull();
      |                                                                                 ^
  557 |       const entry = (Array.isArray(refusal!["refusals"]) ? refusal!["refusals"][0] : {}) as Record<
  558 |         string,
  559 |         unknown
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:556:81
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

## posting-routes.spec.ts › POSTING ROUTES › PR-17 the draft route refuses a region-only place and accepts a city and a sub-city

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: step 3

expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "coverage", "reason": "cityRequired"}
Received array: [{"field": "listingId", "reason": "badShape"}]
--- further error 1 ---
Error: step 3

expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "coverage", "reason": "cityRequired"}
Received array: [{"field": "listingId", "reason": "badShape"}]

  734 |       expect(refused.status, JSON.stringify(refused.payload)).toBe(200);
  735 |       expect(refused.payload["ok"], JSON.stringify(refused.payload)).toBe(false);
> 736 |       expect(reasonsOf(refused.payload), `step ${step}`).toContainEqual({
      |                                                          ^
  737 |         field: "coverage",
  738 |         reason: "cityRequired",
  739 |       });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:736:58
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

## posting-routes.spec.ts › POSTING ROUTES › PR-18 the draft route accepts a 5000-character description and refuses 5001

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "description", "reason": "tooLong"}
Received array: [{"field": "listingId", "reason": "badShape"}]
--- further error 1 ---
Error: expect(received).toContainEqual(expected) // deep equality

Expected value: {"field": "description", "reason": "tooLong"}
Received array: [{"field": "listingId", "reason": "badShape"}]

  782 |     expect(refused.status).toBe(200);
  783 |     expect(refused.payload["ok"], JSON.stringify(refused.payload)).toBe(false);
> 784 |     expect(reasonsOf(refused.payload)).toContainEqual({
      |                                        ^
  785 |       field: "description",
  786 |       reason: "tooLong",
  787 |     });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:784:40
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

## posting-routes.spec.ts › POSTING ROUTES › PR-16 a model question that matters is required by the draft route (DEC-086)

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toContainEqual(expected) // deep equality

Expected value: {"attr_key": "e2e_pr16_54_tydzpm_model", "reason": "required"}
Received array: [{"attr_key": undefined, "reason": "badShape"}]
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toContainEqual(expected) // deep equality

Expected value: {"attr_key": "e2e_pr16_54_tydzpm_model", "reason": "required"}
Received array: [{"attr_key": undefined, "reason": "badShape"}]

  856 |     expect(missing.status, JSON.stringify(missing.payload)).toBe(200);
  857 |     expect(missing.payload["ok"], JSON.stringify(missing.payload)).toBe(false);
> 858 |     expect(refusalsOf(missing.payload), JSON.stringify(missing.payload)).toContainEqual({
      |                                                                          ^
  859 |       attr_key: modelKey,
  860 |       reason: "required",
  861 |     });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:858:74
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

## posting-routes.spec.ts › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  933 |       { token, country: "ET" },
  934 |     );
> 935 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
      |                                                                ^
  936 |     const listingId = String(draft.payload["listing_id"] ?? "");
  937 |
  938 |     for (const column of ["contact_pref", "pin_lat", "pin_lng", "home_country_code"]) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:935:64
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

## posting-routes.spec.ts › POSTING ROUTES › PR-48 the writing helper spends only its caller's own listing's tries

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: PR-48: the draft door made no listing

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PR-48: the draft door made no listing

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  1259 |     );
  1260 |     const listingId = String(draft.payload["listing_id"] ?? "");
> 1261 |     expect(listingId, "PR-48: the draft door made no listing").not.toBe("");
       |                                                                    ^
  1262 |     const other = await seller(page);
  1263 |     const body = { categoryId: cat.id, locale: "en", attrs: {}, listingId };
  1264 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1261:68
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

## posting-routes.spec.ts › POSTING ROUTES › PR-50 photos on drafts stop past 50 in 7 days with no ad submitted, and come back once one is (D185)

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: PR-50: the draft door made no listing

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""
--- further error 1 ---
Error: PR-50: the draft door made no listing

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  1336 |     );
  1337 |     const listingId = String(draft.payload["listing_id"] ?? "");
> 1338 |     expect(listingId, "PR-50: the draft door made no listing").not.toBe("");
       |                                                                    ^
  1339 |     await inOneWindow(604800, 20_000, "PR-50");
  1340 |     try {
  1341 |       const windowStart = new Date(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1338:68
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

## posting-routes.spec.ts › POSTING ROUTES › D189 deactivated seller › PR-52 the assist peek answers the budget without spending, and refuses what is not the caller's (INC-669)

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"badShape","detail":"invalid_type"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  1451 |       );
  1452 |       expect(draft.status, JSON.stringify(draft.payload)).toBe(200);
> 1453 |       expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
       |                                                                  ^
  1454 |       const listingId = String(draft.payload["listing_id"] ?? "");
  1455 |       expect(listingId, "PR-52: the draft door made no listing").not.toBe("");
  1456 |       const headers = { Authorization: `Bearer ${token}` };
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1453:66
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

## Server errors: shard 5

No `[ssr-error]` lines in the `shard 5` log (or no log was uploaded).

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: shard 7

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 7

No `[client-error]` lines in the `shard 7` log (or no log was uploaded).

## Server errors: shard 13

No `[ssr-error]` lines in the `shard 13` log (or no log was uploaded).

## Client errors: shard 13

No `[client-error]` lines in the `shard 13` log (or no log was uploaded).

## Server errors: shard 14

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Client errors: shard 14

No `[client-error]` lines in the `shard 14` log (or no log was uploaded).

## Server errors: shard 15

No `[ssr-error]` lines in the `shard 15` log (or no log was uploaded).

## Client errors: shard 15

No `[client-error]` lines in the `shard 15` log (or no log was uploaded).
