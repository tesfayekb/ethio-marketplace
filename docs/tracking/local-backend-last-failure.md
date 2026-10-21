# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39595338155
- Commit: `39214d2c72c9a5bde34367afddb719dd50022640`
- Attempt: 1
- Written (UTC): 2026-10-21T12:14:24.034Z
- Passed: 2139 · Skipped: 154 · Failed: 6
- Gating failures: 6 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (14 of 14 results files read, 14 of 14 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-di<n>jlb: e<n>e_par_i<n>cmn<n> → e<n>e_chi_z<n>mkjq` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-qgolqv: e<n>e_par_deej<n>m → e<n>e_chi_tw<n>cu` (quiet) | 1 | shard 7 |

Quiet (allowlisted): too many previews ×16 · digest mismatch ×12 · category-images: no GEMINI_API_KEY — fake mode ×5 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-di<n>jlb: e<n>e_par_i<n>cmn<n> → e<n>e_chi_z<n>mkjq ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-qgolqv: e<n>e_par_deej<n>m → e<n>e_chi_tw<n>cu ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 5, shard 6, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-188 a list that hangs under another answer offers its shared Other last under ×2 · PW-21 a child detail shows only the chosen parent's options and clears on change ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1 · PW-49 a prefill-only fact keeps its input while a settled one does not ×1

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

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-21T11:56:18.278Z | 12.1 min |
| email | 2026-10-21T11:56:17.475Z | 0.2 min |
| shard 1 | 2026-10-21T11:56:30.917Z | 16.0 min |
| shard 2 | 2026-10-21T11:56:18.791Z | 17.6 min |
| shard 3 | 2026-10-21T11:56:15.034Z | 8.2 min |
| shard 4 | 2026-10-21T11:56:10.464Z | 9.6 min |
| shard 5 | 2026-10-21T11:56:40.111Z | 11.1 min |
| shard 6 | 2026-10-21T11:56:10.810Z | 8.4 min |
| shard 7 | 2026-10-21T11:56:30.975Z | 14.9 min |
| shard 8 | 2026-10-21T11:56:02.865Z | 17.7 min |
| shard 9 | 2026-10-21T11:56:13.089Z | 10.7 min |
| shard 10 | 2026-10-21T11:56:10.708Z | 11.6 min |
| shard 11 | 2026-10-21T11:56:09.156Z | 13.4 min |
| shard 12 | 2026-10-21T11:55:56.813Z | 6.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 17.8 min | smoke, shard 6, shard 12 |
| `admin-roles.spec.ts` | 26 | 6.3 min | shard 2, shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 5.8 min | shard 1, shard 7 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.5 min | shard 4, shard 10 |
| `post-wizard-specs.spec.ts` | 82 | 4.9 min | shard 5, shard 11 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 2, shard 8 |
| `admin-translations-console.spec.ts` | 44 | 4.6 min | shard 2, shard 8 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 3, shard 9 |
| `post-wizard-place.spec.ts` | 38 | 4.5 min | shard 5, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 1, shard 7 |
| `admin-screening.spec.ts` | 52 | 4.3 min | shard 2, shard 8 |
| `auth-signout.spec.ts` | 56 | 4.2 min | smoke, shard 3, shard 9 |
| `admin-attributes-links.spec.ts` | 34 | 4.2 min | shard 1, shard 7 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.8 min | shard 1, shard 8 |
| `viewing-place.spec.ts` | 22 | 3.8 min | shard 6, shard 12 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 5, shard 11 |
| `admin-users.spec.ts` | 28 | 3.7 min | shard 2, shard 9 |
| `photo-pipeline.spec.ts` | 66 | 3.5 min | shard 4, shard 10 |
| `admin-listings.spec.ts` | 62 | 3.5 min | shard 2, shard 8 |
| `post-wizard-pricing.spec.ts` | 52 | 3.5 min | shard 5, shard 11 |
| `my-listings-ad.spec.ts` | 36 | 3.4 min | shard 4, shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 3.3 min | shard 1, shard 7 |
| `ad-page.spec.ts` | 68 | 2.8 min | shard 1, shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 5, shard 11 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 1, shard 7 |
| `post-wizard-category.spec.ts` | 48 | 2.6 min | shard 4, shard 10 |
| `posting-routes.spec.ts` | 80 | 2.5 min | shard 6, shard 11 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 8 |
| `import-security.spec.ts` | 36 | 2.3 min | shard 3, shard 9 |
| `admin-attributes-import.spec.ts` | 40 | 2.2 min | shard 1, shard 7 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 2, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 1, shard 8 |
| `admin-translations-data.spec.ts` | 8 | 1.6 min | shard 2, shard 9 |
| `legal-certify.spec.ts` | 40 | 1.5 min | shard 3, shard 9 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 1, shard 7 |
| `mfa-stepup.spec.ts` | 18 | 1.4 min | shard 4, shard 10 |
| `legal-admin.spec.ts` | 36 | 1.4 min | shard 3, shard 9 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 4, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 10 |
| `admin-shell.spec.ts` | 12 | 0.9 min | shard 2, shard 8 |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 8 |
| `my-listings-page.spec.ts` | 16 | 0.8 min | shard 4, shard 10 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 5, shard 11 |
| `posting-routes-catalog.spec.ts` | 18 | 0.7 min | shard 5, shard 11 |
| `legal-doors.spec.ts` | 32 | 0.6 min | shard 4, shard 10 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 3, shard 9 |
| `ad-page-doors.spec.ts` | 30 | 0.6 min | shard 1, shard 7 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 5, shard 11 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 5, shard 11 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 1, shard 8 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 5, shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.5 min | shard 4, shard 10 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 3, shard 9 |
| `legal-accept.spec.ts` | 8 | 0.3 min | shard 3, shard 9 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `house-style.spec.ts` | 12 | 0.3 min | shard 3, shard 9 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 3, shard 9 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 5, shard 11 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 6, shard 12 |
| `admin-services.spec.ts` | 10 | 0.3 min | shard 2, shard 8 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 6, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 3, shard 9 |
| `settings.spec.ts` | 4 | 0.2 min | shard 6 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 4, shard 10 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 3, shard 9 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 9 |
| `auth-reset.spec.ts` | 6 | 0.2 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 7 |
| `auth-signup.spec.ts` | 4 | 0.2 min | email |
| `legal-pages.spec.ts` | 6 | 0.2 min | shard 4, shard 10 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 11 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 9 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 5, shard 11 |
| `rbac.spec.ts` | 6 | 0.1 min | shard 6, shard 12 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 3 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6, shard 12 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-roles.spec.ts` › RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles | desktop-1280 | 46.9 s |
| `admin-roles.spec.ts` › RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles | mobile-360 | 46.3 s |
| `admin-roles.spec.ts` › RP-8 Amharic + no horizontal overflow | desktop-1280 | 36.7 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 36.7 s |
| `admin-roles.spec.ts` › RP-8 Amharic + no horizontal overflow | mobile-360 | 36.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.2 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 39595338155-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39595338155-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 39595338155-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 2, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 39595338155-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 19 (pool 2, fresh 17)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 39595338155-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 2, fresh 13)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 39595338155-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 39595338155-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39595338155-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 39595338155-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 39595338155-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 2, fresh 15)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 22 user(s) owned by process 39595338155-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 2, fresh 13)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 39595338155-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 39595338155-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39595338155-local-12
```

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByText('ሚናዎችና ፈቃዶች').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('ሚናዎችና ፈቃዶች').first()

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByText('ሚናዎችና ፈቃዶች').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('ሚናዎችና ፈቃዶች').first()


  382 |     await switchLanguage(page, "am");
  383 |     // eslint-disable-next-line no-restricted-syntax -- DEC-027 census: locator is already scoped to a single viewport twin (or a non-twin surface); grandfathered pending the twin-helper sweep
> 384 |     await expect(page.getByText(am["admin.roles.title"]).first()).toBeVisible();
      |                                                                   ^
  385 |     await expect(page.getByText(en["admin.roles.subtitle"])).toHaveCount(0);
  386 |     await expectNoHorizontalOverflow(page);
  387 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:384:67
```

Context:

```text
          - listitem [ref=e535]:
            - generic [ref=e536]: ስለ እኛ
          - listitem [ref=e537]:
            - generic [ref=e538]: ያግኙን
      - navigation "እገዛ" [ref=e539]:
        - heading "እገዛ" [level=2] [ref=e540]
        - list [ref=e541]:
          - listitem [ref=e542]:
            - generic [ref=e543]: ደህንነት
      - navigation "ሕጋዊ" [ref=e544]:
        - heading "ሕጋዊ" [level=2] [ref=e545]
        - list [ref=e546]:
          - listitem [ref=e547]:
            - link "ውሎች" [ref=e548] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e549]:
            - link "ግላዊነት" [ref=e550] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e552]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## admin-roles.spec.ts › U2 roles console › RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('role-permission-baseline-account_panel:access')
Expected substring: "ሁሉም ሰው በ«ተጠቃሚ» ሚና በኩል ይህ አለው"
Received string:    "Everyone has this via the user role"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('role-permission-baseline-account_panel:access')
    14 × locator resolved to <div data-testid="role-permission-baseline-account_panel:access" class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">Everyone has this via the user role</div>
       - unexpected value "Everyone has this via the user role"

--- further error 1 ---
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('role-permission-baseline-account_panel:access')
Expected substring: "ሁሉም ሰው በ«ተጠቃሚ» ሚና በኩል ይህ አለው"
Received string:    "Everyone has this via the user role"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('role-permission-baseline-account_panel:access')
    14 × locator resolved to <div data-testid="role-permission-baseline-account_panel:access" class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">Everyone has this via the user role</div>
       - unexpected value "Everyone has this via the user role"


  512 |
  513 |     await switchLanguage(page, "am");
> 514 |     await expect(page.getByTestId("role-permission-baseline-account_panel:access")).toContainText(
      |                                                                                     ^
  515 |       am["admin.roles.perm.baselineBadge"],
  516 |     );
```

Context:

```text
          - listitem [ref=e643]:
            - generic [ref=e644]: ስለ እኛ
          - listitem [ref=e645]:
            - generic [ref=e646]: ያግኙን
      - navigation "እገዛ" [ref=e647]:
        - heading "እገዛ" [level=2] [ref=e648]
        - list [ref=e649]:
          - listitem [ref=e650]:
            - generic [ref=e651]: ደህንነት
      - navigation "ሕጋዊ" [ref=e652]:
        - heading "ሕጋዊ" [level=2] [ref=e653]
        - list [ref=e654]:
          - listitem [ref=e655]:
            - link "ውሎች" [ref=e656] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e657]:
            - link "ግላዊነት" [ref=e658] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e660]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 85

- Array []
+ Array [
+   "Account panel",
+   "Admin panel",
+   "Audit logs",
+   "Categories",
+   "Countries",
+   "Advertising coverage",
+   "Impersonation",
+   "Legal documents",
+   "Listings",
+   "Locations",
+   "Permissions",
+   "Profiles",
+   "Roles",
+   "Services",
+   "Translations",
+   "User roles",
+   "Access",
+   "Access",
+   "Export",
+   "View",
+   "Assets",
+   "Create",
+   "Delete",
+   "Import",
+   "Manage",
+   "Restructure",
+   "Update",
+   "View",
+   "Activate",
+   "Create",
+   "Delete",
--- further error 1 ---
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 85

- Array []
+ Array [
+   "Account panel",
+   "Admin panel",
+   "Audit logs",
+   "Categories",
+   "Countries",
+   "Advertising coverage",
+   "Impersonation",
+   "Legal documents",
+   "Listings",
+   "Locations",
+   "Permissions",
```

Context:

```text
          - listitem [ref=e569]:
            - generic [ref=e570]: ስለ እኛ
          - listitem [ref=e571]:
            - generic [ref=e572]: ያግኙን
      - navigation "እገዛ" [ref=e573]:
        - heading "እገዛ" [level=2] [ref=e574]
        - list [ref=e575]:
          - listitem [ref=e576]:
            - generic [ref=e577]: ደህንነት
      - navigation "ሕጋዊ" [ref=e578]:
        - heading "ሕጋዊ" [level=2] [ref=e579]
        - list [ref=e580]:
          - listitem [ref=e581]:
            - link "ውሎች" [ref=e582] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e583]:
            - link "ግላዊነት" [ref=e584] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e586]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## admin-roles.spec.ts › U2 roles console › RP-8 Amharic + no horizontal overflow

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByText('ሚናዎችና ፈቃዶች').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('ሚናዎችና ፈቃዶች').first()

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByText('ሚናዎችና ፈቃዶች').first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('ሚናዎችና ፈቃዶች').first()


  382 |     await switchLanguage(page, "am");
  383 |     // eslint-disable-next-line no-restricted-syntax -- DEC-027 census: locator is already scoped to a single viewport twin (or a non-twin surface); grandfathered pending the twin-helper sweep
> 384 |     await expect(page.getByText(am["admin.roles.title"]).first()).toBeVisible();
      |                                                                   ^
  385 |     await expect(page.getByText(en["admin.roles.subtitle"])).toHaveCount(0);
  386 |     await expectNoHorizontalOverflow(page);
  387 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:384:67
```

Context:

```text
          - listitem [ref=e522]:
            - generic [ref=e523]: ስለ እኛ
          - listitem [ref=e524]:
            - generic [ref=e525]: ያግኙን
      - navigation "እገዛ" [ref=e526]:
        - heading "እገዛ" [level=2] [ref=e527]
        - list [ref=e528]:
          - listitem [ref=e529]:
            - generic [ref=e530]: ደህንነት
      - navigation "ሕጋዊ" [ref=e531]:
        - heading "ሕጋዊ" [level=2] [ref=e532]
        - list [ref=e533]:
          - listitem [ref=e534]:
            - link "ውሎች" [ref=e535] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e536]:
            - link "ግላዊነት" [ref=e537] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e539]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## admin-roles.spec.ts › U2 roles console › RP-12 DEC-017: a user-baseline row badges instead of toggling; a normal row still toggles

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('role-permission-baseline-account_panel:access')
Expected substring: "ሁሉም ሰው በ«ተጠቃሚ» ሚና በኩል ይህ አለው"
Received string:    "Everyone has this via the user role"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('role-permission-baseline-account_panel:access')
    14 × locator resolved to <div data-testid="role-permission-baseline-account_panel:access" class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">Everyone has this via the user role</div>
       - unexpected value "Everyone has this via the user role"

--- further error 1 ---
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('role-permission-baseline-account_panel:access')
Expected substring: "ሁሉም ሰው በ«ተጠቃሚ» ሚና በኩል ይህ አለው"
Received string:    "Everyone has this via the user role"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('role-permission-baseline-account_panel:access')
    14 × locator resolved to <div data-testid="role-permission-baseline-account_panel:access" class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">Everyone has this via the user role</div>
       - unexpected value "Everyone has this via the user role"


  512 |
  513 |     await switchLanguage(page, "am");
> 514 |     await expect(page.getByTestId("role-permission-baseline-account_panel:access")).toContainText(
      |                                                                                     ^
  515 |       am["admin.roles.perm.baselineBadge"],
  516 |     );
```

Context:

```text
          - listitem [ref=e689]:
            - generic [ref=e690]: ስለ እኛ
          - listitem [ref=e691]:
            - generic [ref=e692]: ያግኙን
      - navigation "እገዛ" [ref=e693]:
        - heading "እገዛ" [level=2] [ref=e694]
        - list [ref=e695]:
          - listitem [ref=e696]:
            - generic [ref=e697]: ደህንነት
      - navigation "ሕጋዊ" [ref=e698]:
        - heading "ሕጋዊ" [level=2] [ref=e699]
        - list [ref=e700]:
          - listitem [ref=e701]:
            - link "ውሎች" [ref=e702] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e703]:
            - link "ግላዊነት" [ref=e704] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e706]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 85

- Array []
+ Array [
+   "Account panel",
+   "Admin panel",
+   "Audit logs",
+   "Categories",
+   "Countries",
+   "Advertising coverage",
+   "Impersonation",
+   "Legal documents",
+   "Listings",
+   "Locations",
+   "Permissions",
+   "Profiles",
+   "Roles",
+   "Services",
+   "Translations",
+   "User roles",
+   "Access",
+   "Access",
+   "Export",
+   "View",
+   "Assets",
+   "Create",
+   "Delete",
+   "Import",
+   "Manage",
+   "Restructure",
+   "Update",
+   "View",
+   "Activate",
+   "Create",
+   "Delete",
--- further error 1 ---
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 85

- Array []
+ Array [
+   "Account panel",
+   "Admin panel",
+   "Audit logs",
+   "Categories",
+   "Countries",
+   "Advertising coverage",
+   "Impersonation",
+   "Legal documents",
+   "Listings",
+   "Locations",
+   "Permissions",
```

Context:

```text
          - listitem [ref=e615]:
            - generic [ref=e616]: ስለ እኛ
          - listitem [ref=e617]:
            - generic [ref=e618]: ያግኙን
      - navigation "እገዛ" [ref=e619]:
        - heading "እገዛ" [level=2] [ref=e620]
        - list [ref=e621]:
          - listitem [ref=e622]:
            - generic [ref=e623]: ደህንነት
      - navigation "ሕጋዊ" [ref=e624]:
        - heading "ሕጋዊ" [level=2] [ref=e625]
        - list [ref=e626]:
          - listitem [ref=e627]:
            - link "ውሎች" [ref=e628] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e629]:
            - link "ግላዊነት" [ref=e630] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e632]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

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

## Server errors: shard 8

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 8

No `[client-error]` lines in the `shard 8` log (or no log was uploaded).

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
