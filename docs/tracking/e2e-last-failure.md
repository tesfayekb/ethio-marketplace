# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40077948039
- Commit: `e50fa844fe4478f06ec1fe01f44f880eb7289b58`
- Attempt: 1
- Written (UTC): 2026-10-24T08:41:51.123Z
- Passed: 2171 · Skipped: 154 · Failed: 6
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

118 line(s), 36 message(s): 2 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 23 | shard 1, shard 4, shard 9, shard 12 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 9, shard 10, shard 12 |
| `listing not found` | 7 | shard 6, shard 7, shard 14, shard 15 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>bn<n>d: e<n>e_par_qvlv<n> → e<n>e_chi_bbuscj` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-xnbnj<n>: e<n>e_par_ez<n>sqs → e<n>e_chi_fhic<n>z` (quiet) | 1 | shard 10 |

Quiet (allowlisted): too many previews ×23 · digest mismatch ×12 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>bn<n>d: e<n>e_par_qvlv<n> → e<n>e_chi_bbuscj ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-xnbnj<n>: e<n>e_par_ez<n>sqs → e<n>e_chi_fhic<n>z ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 6, shard 7, shard 14, shard 15
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×2 · PW-188 a list that hangs under another answer offers its shared Other last under ×2 · PW-21 a child detail shows only the chosen parent's options and clears on change ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### new row for relation <q> violates check constraint <q>

- Count: 2 · Sources: shard 6, shard 14
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-61 a category change resets details, title, description and price, and Undo w ×2 · PW-73 the door's currency fill is mirrored, so Undo restores a complete price (I ×2

```text
[WebServer] [ssr-error] /api/listings/draft new row for relation "listings" violates check constraint "listings_price_pair_check"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-24T08:28:51.632Z | 12.4 min |
| email | 2026-10-24T08:27:41.096Z | 0.4 min |
| shard 1 | 2026-10-24T08:27:33.446Z | 9.4 min |
| shard 2 | 2026-10-24T08:28:07.360Z | 12.6 min |
| shard 3 | 2026-10-24T08:27:46.005Z | 13.0 min |
| shard 4 | 2026-10-24T08:28:14.562Z | 6.0 min |
| shard 5 | 2026-10-24T08:27:52.871Z | 6.7 min |
| shard 6 | 2026-10-24T08:27:21.633Z | 8.3 min |
| shard 7 | 2026-10-24T08:27:41.229Z | 6.6 min |
| shard 8 | 2026-10-24T08:27:51.862Z | 8.6 min |
| shard 9 | 2026-10-24T08:28:04.896Z | 9.9 min |
| shard 10 | 2026-10-24T08:27:28.397Z | 11.9 min |
| shard 11 | 2026-10-24T08:27:53.357Z | 13.1 min |
| shard 12 | 2026-10-24T08:27:52.425Z | 6.8 min |
| shard 13 | 2026-10-24T08:27:57.108Z | 7.8 min |
| shard 14 | 2026-10-24T08:29:14.935Z | 10.9 min |
| shard 15 | 2026-10-24T08:27:53.165Z | 7.1 min |
| shard 16 | 2026-10-24T08:27:43.731Z | 6.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 19.8 min | smoke, shard 8, shard 16 |
| `admin-attributes-library.spec.ts` | 42 | 5.3 min | shard 1, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.2 min | shard 6, shard 14 |
| `post-wizard-specs.spec.ts` | 82 | 5.1 min | shard 7, shard 15 |
| `admin-translations-console.spec.ts` | 44 | 4.7 min | shard 3, shard 11 |
| `admin-locations.spec.ts` | 38 | 4.7 min | shard 2, shard 10 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-roles.spec.ts` | 26 | 4.4 min | shard 3, shard 11 |
| `admin-screening.spec.ts` | 52 | 4.3 min | shard 3, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.2 min | shard 2, shard 10 |
| `auth-signout.spec.ts` | 56 | 4.1 min | smoke, shard 3, shard 11 |
| `post-wizard-place.spec.ts` | 38 | 4.1 min | shard 6, shard 14 |
| `photo-pipeline.spec.ts` | 68 | 4.0 min | shard 5, shard 13 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-users.spec.ts` | 28 | 3.9 min | shard 3, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 3.8 min | shard 1, shard 9 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 7, shard 15 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.7 min | shard 2, shard 10 |
| `admin-listings.spec.ts` | 62 | 3.7 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 36 | 3.5 min | shard 5, shard 13 |
| `admin-attributes-editor.spec.ts` | 36 | 3.1 min | shard 1, shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.0 min | shard 6, shard 14 |
| `ad-page.spec.ts` | 68 | 2.8 min | shard 1, shard 9 |
| `posting-routes.spec.ts` | 80 | 2.6 min | shard 7, shard 15 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 6, shard 14 |
| `post-wizard-category.spec.ts` | 48 | 2.5 min | shard 6, shard 14 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 1, shard 10 |
| `admin-countries.spec.ts` | 18 | 2.2 min | shard 2, shard 10 |
| `admin-attributes-import.spec.ts` | 40 | 2.2 min | shard 1, shard 9 |
| `admin-translations-data.spec.ts` | 10 | 2.1 min | shard 3, shard 11 |
| `import-security.spec.ts` | 36 | 2.1 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.8 min | shard 4, shard 12 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `mfa-stepup.spec.ts` | 18 | 1.7 min | shard 5, shard 13 |
| `legal-certify.spec.ts` | 42 | 1.5 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 2, shard 10 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 3, shard 11 |
| `my-listings-page.spec.ts` | 16 | 0.9 min | shard 5, shard 13 |
| `legal-doors.spec.ts` | 34 | 0.8 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 10 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 7, shard 15 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 5, shard 13 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 7, shard 15 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 8, shard 15 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `auth-caller-gates.spec.ts` | 8 | 0.4 min | shard 3, shard 11 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `legal-pages.spec.ts` | 10 | 0.3 min | shard 5, shard 13 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 4, shard 11 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 3, shard 11 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 5, shard 13 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 8, shard 16 |
| `settings.spec.ts` | 4 | 0.2 min | shard 8 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 9 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 4, shard 12 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 4, shard 11 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 4, shard 12 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 9 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.9 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 31.9 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 30.9 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 29.1 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 27.6 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 25.9 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 25.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40077948039-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40077948039-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40077948039-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40077948039-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 40077948039-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40077948039-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 40077948039-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40077948039-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40077948039-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40077948039-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40077948039-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40077948039-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40077948039-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40077948039-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 40077948039-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40077948039-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40077948039-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40077948039-local-16
```

## shell.spec.ts › app shell › language toggle renders Amharic (Ge'ez path)

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })


  312 |     await expect(shown).toHaveText(narrow ? en["language.enShort"] : en["language.english"]);
  313 |     await trigger.click();
> 314 |     await expect(page.getByRole("menuitem", { name: en["language.english"] })).toBeVisible();
      |                                                                                ^
  315 |     await page.getByRole("menuitem", { name: en["language.amharic"] }).click();
  316 |
  317 |     const amharicHeading = page.getByRole("heading", { level: 1 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:314:80
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - link:
                  - /url: /terms
                  - text: Terms
              - listitem:
                - link:
                  - /url: /privacy
                  - text: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - menu "Language" [active] [ref=e1]:
    - group [ref=e2]:
      - menuitemradio "English" [checked] [ref=e3]:
        - img [ref=e6]
        - generic [ref=e9]: English
      - menuitemradio "አማርኛ" [ref=e10]:
        - generic [ref=e13]: አማርኛ
```
```

## shell.spec.ts › app shell › language toggle renders Amharic (Ge'ez path)

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })


  312 |     await expect(shown).toHaveText(narrow ? en["language.enShort"] : en["language.english"]);
  313 |     await trigger.click();
> 314 |     await expect(page.getByRole("menuitem", { name: en["language.english"] })).toBeVisible();
      |                                                                                ^
  315 |     await page.getByRole("menuitem", { name: en["language.amharic"] }).click();
  316 |
  317 |     const amharicHeading = page.getByRole("heading", { level: 1 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:314:80
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - link:
                  - /url: /terms
                  - text: Terms
              - listitem:
                - link:
                  - /url: /privacy
                  - text: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - menu "Language" [active] [ref=e1]:
    - group [ref=e2]:
      - menuitemradio "English" [checked] [ref=e3]:
        - img [ref=e6]
        - generic [ref=e9]: English
      - menuitemradio "አማርኛ" [ref=e10]:
        - generic [ref=e13]: አማርኛ
```
```

## shell.spec.ts › mobile chrome › the posting wizard keeps the frame

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('shell-topbar').getByRole('button', { name: 'Open menu' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('shell-topbar').getByRole('button', { name: 'Open menu' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('shell-topbar').getByRole('button', { name: 'Open menu' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('shell-topbar').getByRole('button', { name: 'Open menu' })


  1629 |     await expect(
  1630 |       page.getByTestId("shell-topbar").getByRole("button", { name: en["shell.openMenu"] }),
> 1631 |     ).toBeVisible();
       |       ^
  1632 |     const bar = await page.getByTestId("bottom-bar").boundingBox();
  1633 |     if (!bar) throw new Error("no bottom bar");
  1634 |     expect(await bottomOf(page, "form-layout-actions")).toBeLessThanOrEqual(bar.y + 1);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1631:7
```

Context:

```text
          - listitem [ref=e351]:
            - generic [ref=e352]: ስለ እኛ
          - listitem [ref=e353]:
            - generic [ref=e354]: ያግኙን
      - navigation "እገዛ" [ref=e355]:
        - heading "እገዛ" [level=2] [ref=e356]
        - list [ref=e357]:
          - listitem [ref=e358]:
            - generic [ref=e359]: ደህንነት
      - navigation "ሕጋዊ" [ref=e360]:
        - heading "ሕጋዊ" [level=2] [ref=e361]
        - list [ref=e362]:
          - listitem [ref=e363]:
            - link "ውሎች" [ref=e364] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e365]:
            - link "ግላዊነት" [ref=e366] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e368]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › app shell › language toggle renders Amharic (Ge'ez path)

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })


  312 |     await expect(shown).toHaveText(narrow ? en["language.enShort"] : en["language.english"]);
  313 |     await trigger.click();
> 314 |     await expect(page.getByRole("menuitem", { name: en["language.english"] })).toBeVisible();
      |                                                                                ^
  315 |     await page.getByRole("menuitem", { name: en["language.amharic"] }).click();
  316 |
  317 |     const amharicHeading = page.getByRole("heading", { level: 1 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:314:80
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - link:
                  - /url: /terms
                  - text: Terms
              - listitem:
                - link:
                  - /url: /privacy
                  - text: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - menu "Language" [active] [ref=e1]:
    - group [ref=e2]:
      - menuitemradio "English" [checked] [ref=e3]:
        - img [ref=e6]
        - generic [ref=e9]: English
      - menuitemradio "አማርኛ" [ref=e10]:
        - generic [ref=e13]: አማርኛ
```
```

## shell.spec.ts › mobile chrome › the posting wizard keeps the frame

- Source: `shard 8`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('shell-topbar').getByRole('button', { name: 'Open menu' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('shell-topbar').getByRole('button', { name: 'Open menu' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('shell-topbar').getByRole('button', { name: 'Open menu' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('shell-topbar').getByRole('button', { name: 'Open menu' })


  1629 |     await expect(
  1630 |       page.getByTestId("shell-topbar").getByRole("button", { name: en["shell.openMenu"] }),
> 1631 |     ).toBeVisible();
       |       ^
  1632 |     const bar = await page.getByTestId("bottom-bar").boundingBox();
  1633 |     if (!bar) throw new Error("no bottom bar");
  1634 |     expect(await bottomOf(page, "form-layout-actions")).toBeLessThanOrEqual(bar.y + 1);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1631:7
```

Context:

```text
          - listitem [ref=e351]:
            - generic [ref=e352]: ስለ እኛ
          - listitem [ref=e353]:
            - generic [ref=e354]: ያግኙን
      - navigation "እገዛ" [ref=e355]:
        - heading "እገዛ" [level=2] [ref=e356]
        - list [ref=e357]:
          - listitem [ref=e358]:
            - generic [ref=e359]: ደህንነት
      - navigation "ሕጋዊ" [ref=e360]:
        - heading "ሕጋዊ" [level=2] [ref=e361]
        - list [ref=e362]:
          - listitem [ref=e363]:
            - link "ውሎች" [ref=e364] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e365]:
            - link "ግላዊነት" [ref=e366] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e368]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## shell.spec.ts › app shell › language toggle renders Amharic (Ge'ez path)

- Source: `shard 16`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('menuitem', { name: 'English' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('menuitem', { name: 'English' })


  312 |     await expect(shown).toHaveText(narrow ? en["language.enShort"] : en["language.english"]);
  313 |     await trigger.click();
> 314 |     await expect(page.getByRole("menuitem", { name: en["language.english"] })).toBeVisible();
      |                                                                                ^
  315 |     await page.getByRole("menuitem", { name: en["language.amharic"] }).click();
  316 |
  317 |     const amharicHeading = page.getByRole("heading", { level: 1 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:314:80
```

Context:

```text
            - heading [level=2]: Legal
            - list:
              - listitem:
                - link:
                  - /url: /terms
                  - text: Terms
              - listitem:
                - link:
                  - /url: /privacy
                  - text: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - menu "Language" [active] [ref=e1]:
    - group [ref=e2]:
      - menuitemradio "English" [checked] [ref=e3]:
        - img [ref=e6]
        - generic [ref=e9]: English
      - menuitemradio "አማርኛ" [ref=e10]:
        - generic [ref=e13]: አማርኛ
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 8

No `[ssr-error]` lines in the `shard 8` log (or no log was uploaded).

## Client errors: shard 8

No `[client-error]` lines in the `shard 8` log (or no log was uploaded).

## Server errors: shard 16

No `[ssr-error]` lines in the `shard 16` log (or no log was uploaded).

## Client errors: shard 16

No `[client-error]` lines in the `shard 16` log (or no log was uploaded).
