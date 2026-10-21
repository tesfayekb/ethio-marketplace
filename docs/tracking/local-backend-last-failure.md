# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39542085480
- Commit: `9cb65e4f610f6854f1366fd9c5a9848de821d68e`
- Attempt: 1
- Written (UTC): 2026-10-21T04:35:39.810Z
- Passed: 2129 · Skipped: 154 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (13 of 13 results files read, 13 of 13 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

115 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 16 | shard 1, shard 3, shard 7, shard 9 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `listing not found` | 6 | shard 5, shard 6, shard 11 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 5 | shard 1, shard 3, shard 7, shard 8, shard 9 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 3, shard 8, shard 9 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 3, shard 8, shard 9 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 7, shard 9 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 7, shard 9 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 7 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 7, shard 8 |
| `categories file too large` (quiet) | 2 | shard 3, shard 9 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 9 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 8 |
| `countries badHeader` (quiet) | 2 | shard 3, shard 9 |
| `countries nulByte` (quiet) | 2 | shard 3, shard 9 |
| `countries tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `countries unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `countries wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `definitions nulByte` (quiet) | 2 | shard 3, shard 9 |
| `definitions tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `definitions unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `links unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `locations badHeader` (quiet) | 2 | shard 3, shard 9 |
| `locations file too large` (quiet) | 2 | shard 3, shard 9 |
| `locations nulByte` (quiet) | 2 | shard 3, shard 9 |
| `locations unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `locations wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `new row for relation <q> violates check constraint <q>` | 2 | shard 5, shard 11 |
| `strings badHeader` (quiet) | 2 | shard 3, shard 9 |
| `strings emptyFile` (quiet) | 2 | shard 3, shard 9 |
| `strings nulByte` (quiet) | 2 | shard 3, shard 9 |
| `strings tooManyRows` (quiet) | 2 | shard 3, shard 9 |
| `strings unknownColumn` (quiet) | 2 | shard 3, shard 9 |
| `strings wrongFile` (quiet) | 2 | shard 3, shard 9 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-niik<n>q: e<n>e_par_guqewa → e<n>e_chi_bz<n>aq<n>` (quiet) | 1 | shard 7 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-y<n>p<n>: e<n>e_par_i<n>g<n> → e<n>e_chi_j<n>o` (quiet) | 1 | shard 1 |

Quiet (allowlisted): too many previews ×16 · digest mismatch ×12 · category-images: no GEMINI_API_KEY — fake mode ×5 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-niik<n>q: e<n>e_par_guqewa → e<n>e_chi_bz<n>aq<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-y<n>p<n>: e<n>e_par_i<n>g<n> → e<n>e_chi_j<n>o ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 5, shard 6, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×2 · PW-5 the specification form is generated, its options load on the first tap, and ×2 · PW-188 a list that hangs under another answer offers its shared Other last under ×1 · PW-21 a child detail shows only the chosen parent's options and clears on change ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### new row for relation <q> violates check constraint <q>

- Count: 2 · Sources: shard 5, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-61 a category change resets details, title, description and price, and Undo w ×2 · PW-73 the door's currency fill is mirrored, so Undo restores a complete price (I ×2

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-21T04:18:14.823Z | 11.9 min |
| shard 1 | 2026-10-21T04:18:10.538Z | 16.9 min |
| shard 2 | 2026-10-21T04:18:19.870Z | 15.4 min |
| shard 3 | 2026-10-21T04:17:59.887Z | 8.3 min |
| shard 4 | 2026-10-21T04:17:53.305Z | 8.2 min |
| shard 5 | 2026-10-21T04:18:30.351Z | 10.7 min |
| shard 6 | 2026-10-21T04:18:17.498Z | 8.6 min |
| shard 7 | 2026-10-21T04:18:32.804Z | 14.2 min |
| shard 8 | 2026-10-21T04:18:17.493Z | 17.0 min |
| shard 9 | 2026-10-21T04:18:12.198Z | 9.4 min |
| shard 10 | 2026-10-21T04:18:39.752Z | 11.7 min |
| shard 11 | 2026-10-21T04:18:35.150Z | 11.1 min |
| shard 12 | 2026-10-21T04:18:23.003Z | 7.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 18.2 min | smoke, shard 6, shard 12 |
| `admin-attributes-library.spec.ts` | 42 | 5.6 min | shard 1, shard 7 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.1 min | shard 4, shard 10 |
| `admin-locations.spec.ts` | 38 | 4.9 min | shard 2, shard 8 |
| `admin-translations-console.spec.ts` | 44 | 4.8 min | shard 2, shard 8 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 3, shard 9 |
| `admin-screening.spec.ts` | 52 | 4.4 min | shard 2, shard 8 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 1, shard 7 |
| `post-wizard-specs.spec.ts` | 82 | 4.4 min | shard 5, shard 11 |
| `admin-roles.spec.ts` | 26 | 4.3 min | shard 2, shard 8 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.1 min | shard 1, shard 8 |
| `admin-attributes-links.spec.ts` | 34 | 4.1 min | shard 1, shard 7 |
| `post-wizard-place.spec.ts` | 38 | 4.1 min | shard 5, shard 11 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 6, shard 12 |
| `auth-signout.spec.ts` | 56 | 3.9 min | smoke, shard 3, shard 9 |
| `admin-listings.spec.ts` | 62 | 3.9 min | shard 2, shard 8 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 5, shard 11 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 1, shard 7 |
| `admin-users.spec.ts` | 28 | 3.3 min | shard 3, shard 9 |
| `photo-pipeline.spec.ts` | 66 | 3.2 min | shard 4, shard 10 |
| `my-listings-ad.spec.ts` | 36 | 3.1 min | shard 4, shard 10 |
| `ad-page.spec.ts` | 68 | 3.1 min | shard 1, shard 7 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 5, shard 11 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 1, shard 7 |
| `post-wizard-category.spec.ts` | 48 | 2.4 min | shard 4, shard 10 |
| `post-wizard-resets.spec.ts` | 34 | 2.4 min | shard 5, shard 11 |
| `admin-countries.spec.ts` | 18 | 2.4 min | shard 2, shard 8 |
| `posting-routes.spec.ts` | 80 | 2.3 min | shard 6, shard 11 |
| `admin-attributes-import.spec.ts` | 40 | 2.2 min | shard 1, shard 7 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 2, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 1, shard 8 |
| `import-security.spec.ts` | 36 | 1.6 min | shard 3, shard 9 |
| `admin-translations-data.spec.ts` | 8 | 1.6 min | shard 2, shard 9 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 1, shard 7 |
| `mfa-stepup.spec.ts` | 18 | 1.4 min | shard 4, shard 10 |
| `legal-certify.spec.ts` | 40 | 1.2 min | shard 3, shard 9 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 10 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 4, shard 10 |
| `admin-shell.spec.ts` | 12 | 1.0 min | shard 2, shard 8 |
| `admin-coverage.spec.ts` | 16 | 0.9 min | shard 2, shard 8 |
| `legal-admin.spec.ts` | 28 | 0.8 min | shard 3, shard 9 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 4, shard 10 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 5, shard 11 |
| `legal-doors.spec.ts` | 32 | 0.6 min | shard 4, shard 10 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 3, shard 9 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 5, shard 11 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 1, shard 8 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 7 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 5, shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 5, shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 4, shard 10 |
| `posting-routes-dials.spec.ts` | 18 | 0.4 min | shard 5, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 6, shard 12 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 8 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 6, shard 12 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 5, shard 11 |
| `legal-accept.spec.ts` | 8 | 0.2 min | shard 3, shard 9 |
| `house-style.spec.ts` | 12 | 0.2 min | shard 3, shard 9 |
| `settings.spec.ts` | 4 | 0.2 min | shard 6 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 3, shard 9 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 7 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 3, shard 9 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 10 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 6, shard 12 |
| `layout.spec.ts` | 10 | 0.1 min | shard 3, shard 9 |
| `category-nav.spec.ts` | 10 | 0.1 min | shard 3, shard 9 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 3 |
| `feed-index.spec.ts` | 30 | 0.1 min | shard 3, shard 9 |
| `posting-routes-identity.spec.ts` | 4 | 0.1 min | shard 6, shard 11 |
| `legal-pages.spec.ts` | 6 | 0.1 min | shard 4, shard 10 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 5, shard 11 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 3, shard 9 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6, shard 12 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 9 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.7 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 32.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.5 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 27.7 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 25.7 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 25.6 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 25.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39542085480-localproof: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 2, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39542085480-local-1: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39542085480-local-2: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 23 (pool 2, fresh 21)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39542085480-local-3: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39542085480-local-4: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39542085480-local-5: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39542085480-local-6: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 2, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39542085480-local-7: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39542085480-local-8: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 18 (pool 2, fresh 16)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39542085480-local-9: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39542085480-local-10: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39542085480-local-11: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 39542085480-local-12: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## legal-certify.spec.ts › Legal certification › LG-29 taking an ad down is never held: while an acceptance is owed the seller marks one ad sold, closes one, removes one, and removes a photo

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: {"data":null,"error":"not your listing"}

expect(received).toBeNull()

Received: "not your listing"
--- further error 1 ---
Error: {"data":null,"error":"not your listing"}

expect(received).toBeNull()

Received: "not your listing"

  1064 |     for (const ad of ads) {
  1065 |       const pending = await me.rpc("my_listing_certification", { p_listing_id: ad.id });
> 1066 |       expect(pending.error, JSON.stringify(pending)).toBeNull();
       |                                                      ^
  1067 |       expect((pending.data as Row)["acceptance_pending"]).toBe(true);
  1068 |       const accepted = await adminClient()
  1069 |         .from("legal_acceptances")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:1066:54
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

## legal-certify.spec.ts › Legal certification › LG-30 a draft stays the seller's own while an acceptance is owed: its price, pin and photo order change

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: {"data":null,"error":"the price of this listing is changed through its edit"}

expect(received).toBeNull()

Received: "the price of this listing is changed through its edit"
--- further error 1 ---
Error: {"data":null,"error":"the price of this listing is changed through its edit"}

expect(received).toBeNull()

Received: "the price of this listing is changed through its edit"

  1091 |     ]) {
  1092 |       const answer = await me.rpc(call.fn, call.args);
> 1093 |       expect(answer.error, JSON.stringify(answer)).toBeNull();
       |                                                    ^
  1094 |       expect((answer.data as Row)["ok"]).toBe(true);
  1095 |     }
  1096 |     const truth = await guardedTruth(id);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:1093:52
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

## legal-certify.spec.ts › Legal certification › LG-29 taking an ad down is never held: while an acceptance is owed the seller marks one ad sold, closes one, removes one, and removes a photo

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: {"data":null,"error":"not your listing"}

expect(received).toBeNull()

Received: "not your listing"
--- further error 1 ---
Error: {"data":null,"error":"not your listing"}

expect(received).toBeNull()

Received: "not your listing"

  1064 |     for (const ad of ads) {
  1065 |       const pending = await me.rpc("my_listing_certification", { p_listing_id: ad.id });
> 1066 |       expect(pending.error, JSON.stringify(pending)).toBeNull();
       |                                                      ^
  1067 |       expect((pending.data as Row)["acceptance_pending"]).toBe(true);
  1068 |       const accepted = await adminClient()
  1069 |         .from("legal_acceptances")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:1066:54
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

## legal-certify.spec.ts › Legal certification › LG-30 a draft stays the seller's own while an acceptance is owed: its price, pin and photo order change

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: {"data":null,"error":"the price of this listing is changed through its edit"}

expect(received).toBeNull()

Received: "the price of this listing is changed through its edit"
--- further error 1 ---
Error: {"data":null,"error":"the price of this listing is changed through its edit"}

expect(received).toBeNull()

Received: "the price of this listing is changed through its edit"

  1091 |     ]) {
  1092 |       const answer = await me.rpc(call.fn, call.args);
> 1093 |       expect(answer.error, JSON.stringify(answer)).toBeNull();
       |                                                    ^
  1094 |       expect((answer.data as Row)["ok"]).toBe(true);
  1095 |     }
  1096 |     const truth = await guardedTruth(id);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:1093:52
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

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 9

```text
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
[WebServer] [ssr-error] /api/admin/locations/import countries unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import countries tooManyRows
[WebServer] [ssr-error] /api/admin/locations/import countries nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 9

No `[client-error]` lines in the `shard 9` log (or no log was uploaded).
