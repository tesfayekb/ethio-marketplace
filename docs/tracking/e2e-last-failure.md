# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39588958890
- Commit: `db01a7fd088b75c30a57b7466da87e675632604f`
- Attempt: 1
- Written (UTC): 2026-10-21T11:17:12.737Z
- Passed: 2144 · Skipped: 154 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (14 of 14 results files read, 14 of 14 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12 · unavailable: none

118 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 19 | shard 1, shard 3, shard 7, shard 9 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>epjd: e<n>e_par_itd<n>io → e<n>e_chi_i<n>mf<n>d` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>vq: e<n>e_par_<n>nby → e<n>e_chi_coh<n>b<n>` (quiet) | 1 | shard 7 |

Quiet (allowlisted): too many previews ×19 · digest mismatch ×12 · category-images: no GEMINI_API_KEY — fake mode ×5 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>epjd: e<n>e_par_itd<n>io → e<n>e_chi_i<n>mf<n>d ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-<n>vq: e<n>e_par_<n>nby → e<n>e_chi_coh<n>b<n> ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 5, shard 6, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-50 the specifications show every row open in display order (D41) ×2 · L9 cardUntil=lg keeps cards at 768 until lg ×1 · PR-3 a complete draft publishes to screening and never to active ×1 · PW-16 typing is saved without judgement; only Next asks the door to judge the st ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### new row for relation <q> violates check constraint <q>

- Count: 2 · Sources: shard 5, shard 11
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-73 the door's currency fill is mirrored, so Undo restores a complete price (I ×2 · PW-160 Use my location stays pressed until the pin is moved by hand ×1 · PW-76 a detail the model pins to one value is filled and hidden, and still revie ×1

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
| smoke | 2026-10-21T11:04:49.455Z | 11.6 min |
| email | 2026-10-21T11:05:08.890Z | 0.3 min |
| shard 1 | 2026-10-21T11:04:59.912Z | 8.9 min |
| shard 2 | 2026-10-21T11:05:25.167Z | 10.7 min |
| shard 3 | 2026-10-21T11:04:47.401Z | 4.8 min |
| shard 4 | 2026-10-21T11:05:24.610Z | 6.3 min |
| shard 5 | 2026-10-21T11:04:57.928Z | 5.9 min |
| shard 6 | 2026-10-21T11:04:57.288Z | 6.6 min |
| shard 7 | 2026-10-21T11:05:41.137Z | 8.3 min |
| shard 8 | 2026-10-21T11:04:46.436Z | 10.6 min |
| shard 9 | 2026-10-21T11:04:53.986Z | 6.6 min |
| shard 10 | 2026-10-21T11:04:58.616Z | 7.2 min |
| shard 11 | 2026-10-21T11:04:58.958Z | 8.0 min |
| shard 12 | 2026-10-21T11:04:48.152Z | 4.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 19.0 min | smoke, shard 6, shard 12 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.9 min | shard 4, shard 10 |
| `admin-attributes-library.spec.ts` | 42 | 5.7 min | shard 1, shard 7 |
| `admin-locations.spec.ts` | 38 | 5.5 min | shard 2, shard 8 |
| `post-wizard-place.spec.ts` | 38 | 5.2 min | shard 5, shard 11 |
| `admin-screening.spec.ts` | 52 | 5.1 min | shard 2, shard 8 |
| `post-wizard-specs.spec.ts` | 82 | 5.1 min | shard 5, shard 11 |
| `admin-translations-console.spec.ts` | 44 | 5.1 min | shard 2, shard 8 |
| `admin-roles.spec.ts` | 26 | 4.8 min | shard 2, shard 8 |
| `feed-screens.spec.ts` | 36 | 4.7 min | shard 3, shard 9 |
| `photo-pipeline.spec.ts` | 66 | 4.6 min | shard 4, shard 10 |
| `admin-attributes-links.spec.ts` | 34 | 4.5 min | shard 1, shard 7 |
| `auth-signout.spec.ts` | 56 | 4.4 min | smoke, shard 3, shard 9 |
| `admin-users.spec.ts` | 28 | 4.2 min | shard 2, shard 9 |
| `admin-listings.spec.ts` | 62 | 4.2 min | shard 2, shard 8 |
| `admin-categories-console.spec.ts` | 34 | 4.2 min | shard 1, shard 7 |
| `viewing-place.spec.ts` | 22 | 4.1 min | shard 6, shard 12 |
| `post-wizard-where.spec.ts` | 32 | 4.1 min | shard 5, shard 11 |
| `admin-categories-lifecycle.spec.ts` | 52 | 4.1 min | shard 1, shard 8 |
| `my-listings-ad.spec.ts` | 36 | 4.0 min | shard 4, shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 3.6 min | shard 1, shard 7 |
| `post-wizard-pricing.spec.ts` | 52 | 3.5 min | shard 5, shard 11 |
| `post-wizard-category.spec.ts` | 48 | 3.3 min | shard 4, shard 10 |
| `posting-routes.spec.ts` | 80 | 3.1 min | shard 6, shard 11 |
| `ad-page.spec.ts` | 68 | 3.1 min | shard 1, shard 7 |
| `post-wizard-resets.spec.ts` | 34 | 3.0 min | shard 5, shard 11 |
| `admin-countries.spec.ts` | 18 | 2.9 min | shard 2, shard 8 |
| `admin-attributes-safety.spec.ts` | 18 | 2.7 min | shard 1, shard 7 |
| `import-security.spec.ts` | 36 | 2.5 min | shard 3, shard 9 |
| `legal-certify.spec.ts` | 40 | 2.1 min | shard 3, shard 9 |
| `legal-admin.spec.ts` | 36 | 2.1 min | shard 3, shard 9 |
| `admin-translations-governance.spec.ts` | 8 | 1.9 min | shard 2, shard 9 |
| `admin-categories-home.spec.ts` | 10 | 1.8 min | shard 1, shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 1.8 min | shard 1, shard 7 |
| `mfa-stepup.spec.ts` | 18 | 1.8 min | shard 4, shard 10 |
| `admin-translations-data.spec.ts` | 8 | 1.7 min | shard 2, shard 9 |
| `admin-audit.spec.ts` | 14 | 1.4 min | shard 1, shard 7 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 4, shard 10 |
| `admin-shell.spec.ts` | 12 | 1.2 min | shard 2, shard 8 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 4, shard 10 |
| `admin-coverage.spec.ts` | 16 | 1.0 min | shard 2, shard 8 |
| `my-listings-page.spec.ts` | 16 | 0.9 min | shard 4, shard 10 |
| `legal-doors.spec.ts` | 32 | 0.9 min | shard 4, shard 10 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 5, shard 11 |
| `my-listings-doors.spec.ts` | 28 | 0.7 min | shard 4, shard 10 |
| `ad-page-doors.spec.ts` | 30 | 0.7 min | shard 1, shard 7 |
| `primitives-law.spec.ts` | 24 | 0.7 min | shard 6, shard 12 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 5, shard 11 |
| `post-wizard-finder.spec.ts` | 8 | 0.6 min | shard 5, shard 11 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 3, shard 9 |
| `post-wizard-details.spec.ts` | 8 | 0.6 min | shard 5, shard 11 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 1, shard 8 |
| `legal-accept.spec.ts` | 8 | 0.5 min | shard 3, shard 9 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 5, shard 11 |
| `breadcrumbs.spec.ts` | 6 | 0.4 min | shard 3, shard 9 |
| `legal-history.spec.ts` | 6 | 0.4 min | shard 4, shard 10 |
| `admin-services.spec.ts` | 10 | 0.4 min | shard 2, shard 8 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 3, shard 9 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 9 |
| `settings.spec.ts` | 4 | 0.3 min | shard 6 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 5, shard 11 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.3 min | smoke, shard 6, shard 12 |
| `a11y.spec.ts` | 4 | 0.3 min | smoke |
| `category-nav.spec.ts` | 10 | 0.3 min | shard 3, shard 9 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 3, shard 9 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 3 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 4, shard 10 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 6, shard 12 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 3, shard 9 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 6, shard 11 |
| `account-saved.spec.ts` | 4 | 0.2 min | shard 1, shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 3 |
| `auth-signup.spec.ts` | 4 | 0.2 min | email |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 3, shard 9 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 6, shard 12 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 5, shard 11 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 3, shard 9 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 3 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 9 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 37.9 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 36.7 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 33.6 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 31.5 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 31.1 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.9 s |
| `admin-countries.spec.ts` › CO-6 rail order: two roots are stored in position order, and the reset removes every row | mobile-360 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.1 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.1 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.0 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 29.8 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 25.7 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 25.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 39588958890-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39588958890-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 10 user(s) owned by process 39588958890-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 16 user(s) owned by process 39588958890-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 22 (pool 4, fresh 18)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 39588958890-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 18 (pool 4, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 39588958890-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39588958890-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39588958890-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 10 user(s) owned by process 39588958890-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 39588958890-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 20 (pool 4, fresh 16)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 39588958890-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 18 (pool 4, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 39588958890-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39588958890-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39588958890-local-12
```

## admin-countries.spec.ts › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: CO-6: the rail save refused notARoot twice
--- further error 1 ---
Error: CO-6: the rail save refused notARoot twice

  337 |           await saveSwap(pair[0]);
  338 |           if ((await outcome(pair[0], pair[1])) === "notARoot") {
> 339 |             throw new Error("CO-6: the rail save refused notARoot twice");
      |                   ^
  340 |           }
  341 |         }
  342 |         // Relative, never absolute: a sibling's scratch root may cascade away.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:339:19
```

Context:

```text
        - listitem [ref=e56]:
          - generic [ref=e57]: 13. Pets & Animals
          - button "Move up" [ref=e58] [cursor=pointer]: ↑
          - button "Move down" [ref=e59] [cursor=pointer]: ↓
        - listitem [ref=e60]:
          - generic [ref=e61]: 14. Babies & Kids
          - button "Move up" [ref=e62] [cursor=pointer]: ↑
          - button "Move down" [ref=e63] [cursor=pointer]: ↓
        - listitem [ref=e64]:
          - generic [ref=e65]: 15. Commercial Equipment
          - button "Move up" [ref=e66] [cursor=pointer]: ↑
          - button "Move down" [disabled]: ↓
      - alert [ref=e67]: Only a root category can be ordered on the rail.
      - generic [ref=e68]:
        - button "Reset order" [ref=e69] [cursor=pointer]
        - button "Save order" [ref=e70] [cursor=pointer]
    - button "Close" [ref=e71] [cursor=pointer]:
      - img [ref=e72]
      - generic [ref=e75]: Close
```
```

## Server errors: shard 2

No `[ssr-error]` lines in the `shard 2` log (or no log was uploaded).

## Client errors: shard 2

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_country_root_order ({"code":"P0001","details":null,"hint":null,"message":"notARoot"}) ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 400 () ×2
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_country_root_order ({"code":"P0001","details":null,"hint":null,"message":"notARoot"}) ×2
```
