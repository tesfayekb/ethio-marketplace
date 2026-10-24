# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40071930414
- Commit: `522230b3a7850a9e5629cc39da59941e2d0cf1ce`
- Attempt: 1
- Written (UTC): 2026-10-24T07:09:31.760Z
- Passed: 2171 · Skipped: 154 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (18 of 18 results files read, 18 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: none

133 line(s), 37 message(s): 3 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 23 | shard 1, shard 4, shard 9, shard 12 |
| `permission denied` | 16 | shard 4, shard 5, shard 12, shard 13 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 9, shard 10, shard 12 |
| `listing not found` | 6 | shard 5, shard 6, shard 7, shard 14, shard 15 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-w<n>asj<n>: e<n>e_par_ej<n>qj<n> → e<n>e_chi_dphiit` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-yo<n>i<n>: e<n>e_par_<n>sxcef → e<n>e_chi_zv<n>aae` (quiet) | 1 | shard 10 |

Quiet (allowlisted): too many previews ×23 · digest mismatch ×12 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-w<n>asj<n>: e<n>e_par_ej<n>qj<n> → e<n>e_chi_dphiit ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-yo<n>i<n>: e<n>e_par_<n>sxcef → e<n>e_chi_zv<n>aae ×1

Off the allowlist:

### permission denied

- Count: 16 · Sources: shard 4, shard 5, shard 12, shard 13
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): LGC-6 a statement's public page shows the global statement, and the country's wi ×12 · LGP-4 /legal/publishing with no statement in force shows its soon state and carr ×12 · LGP-2 a scratch document's page: meta, contents, frozen facts, the site's langua ×4

```text
[WebServer] [ssr-error] /e2e-pub-lgc6t14g74 permission denied
```

### listing not found

- Count: 6 · Sources: shard 5, shard 6, shard 7, shard 14, shard 15
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×2 · PP-17 Move earlier and Move later put a photo at its place, and the first is the ×1 · PP-18 a photo dragged onto another photo takes its place (computer) ×1 · PW-188 a list that hangs under another answer offers its shared Other last under ×1

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
| smoke | 2026-10-24T06:55:04.556Z | 10.8 min |
| email | 2026-10-24T06:55:34.368Z | 0.4 min |
| shard 1 | 2026-10-24T06:55:23.938Z | 9.9 min |
| shard 2 | 2026-10-24T06:55:19.096Z | 11.8 min |
| shard 3 | 2026-10-24T06:55:13.600Z | 11.5 min |
| shard 4 | 2026-10-24T06:55:28.933Z | 6.2 min |
| shard 5 | 2026-10-24T06:55:22.698Z | 5.8 min |
| shard 6 | 2026-10-24T06:55:13.812Z | 10.6 min |
| shard 7 | 2026-10-24T06:56:10.785Z | 6.7 min |
| shard 8 | 2026-10-24T06:55:27.882Z | 7.3 min |
| shard 9 | 2026-10-24T06:55:10.320Z | 8.5 min |
| shard 10 | 2026-10-24T06:55:51.329Z | 13.2 min |
| shard 11 | 2026-10-24T06:55:00.541Z | 10.8 min |
| shard 12 | 2026-10-24T06:55:24.721Z | 7.0 min |
| shard 13 | 2026-10-24T06:55:16.336Z | 5.9 min |
| shard 14 | 2026-10-24T06:55:09.101Z | 9.1 min |
| shard 15 | 2026-10-24T06:55:29.339Z | 6.8 min |
| shard 16 | 2026-10-24T06:55:24.364Z | 6.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 17.5 min | smoke, shard 8, shard 16 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.6 min | shard 6, shard 14 |
| `admin-attributes-library.spec.ts` | 42 | 5.1 min | shard 1, shard 9 |
| `post-wizard-specs.spec.ts` | 82 | 5.0 min | shard 7, shard 15 |
| `admin-locations.spec.ts` | 38 | 4.8 min | shard 2, shard 10 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `admin-categories-console.spec.ts` | 34 | 4.4 min | shard 2, shard 10 |
| `post-wizard-place.spec.ts` | 38 | 4.1 min | shard 6, shard 14 |
| `admin-translations-console.spec.ts` | 44 | 4.0 min | shard 3, shard 11 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.9 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 26 | 3.9 min | shard 3, shard 11 |
| `auth-signout.spec.ts` | 56 | 3.7 min | smoke, shard 3, shard 11 |
| `admin-attributes-links.spec.ts` | 34 | 3.6 min | shard 1, shard 9 |
| `admin-screening.spec.ts` | 52 | 3.6 min | shard 3, shard 11 |
| `post-wizard-where.spec.ts` | 32 | 3.5 min | shard 7, shard 15 |
| `admin-listings.spec.ts` | 62 | 3.5 min | shard 2, shard 10 |
| `photo-pipeline.spec.ts` | 68 | 3.5 min | shard 5, shard 13 |
| `admin-users.spec.ts` | 28 | 3.3 min | shard 3, shard 11 |
| `post-wizard-pricing.spec.ts` | 52 | 3.1 min | shard 6, shard 14 |
| `admin-attributes-editor.spec.ts` | 36 | 2.9 min | shard 1, shard 9 |
| `posting-routes.spec.ts` | 80 | 2.8 min | shard 7, shard 15 |
| `my-listings-ad.spec.ts` | 36 | 2.8 min | shard 5, shard 13 |
| `admin-attributes-safety.spec.ts` | 18 | 2.6 min | shard 1, shard 10 |
| `post-wizard-category.spec.ts` | 48 | 2.5 min | shard 6, shard 14 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 6, shard 14 |
| `ad-page.spec.ts` | 68 | 2.5 min | shard 1, shard 9 |
| `admin-countries.spec.ts` | 18 | 2.3 min | shard 2, shard 10 |
| `import-security.spec.ts` | 36 | 2.1 min | shard 4, shard 12 |
| `admin-attributes-import.spec.ts` | 40 | 2.1 min | shard 1, shard 9 |
| `admin-translations-data.spec.ts` | 10 | 1.9 min | shard 3, shard 11 |
| `legal-admin.spec.ts` | 42 | 1.9 min | shard 4, shard 12 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.7 min | shard 2, shard 10 |
| `legal-certify.spec.ts` | 42 | 1.6 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.5 min | shard 2, shard 10 |
| `mfa-stepup.spec.ts` | 18 | 1.2 min | shard 5, shard 13 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 0.8 min | shard 5, shard 13 |
| `admin-coverage.spec.ts` | 16 | 0.8 min | shard 2, shard 10 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `admin-shell.spec.ts` | 12 | 0.7 min | shard 3, shard 11 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 7, shard 15 |
| `my-listings-page.spec.ts` | 16 | 0.6 min | shard 5, shard 13 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `legal-doors.spec.ts` | 34 | 0.6 min | shard 5, shard 13 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 7, shard 15 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `ad-page-doors.spec.ts` | 30 | 0.5 min | shard 1, shard 9 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 6, shard 14 |
| `legal-accept.spec.ts` | 12 | 0.4 min | shard 4, shard 12 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 8, shard 15 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `auth-caller-gates.spec.ts` | 8 | 0.3 min | shard 3, shard 11 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `auth-signup.spec.ts` | 6 | 0.3 min | email |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.2 min | smoke, shard 8, shard 16 |
| `breadcrumbs.spec.ts` | 6 | 0.2 min | shard 4, shard 11 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `legal-pages.spec.ts` | 8 | 0.2 min | shard 5, shard 13 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `settings.spec.ts` | 4 | 0.2 min | shard 8 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 1, shard 9 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 6, shard 14 |
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
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.5 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.3 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.7 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.6 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.2 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.2 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | desktop-1280 | 26.5 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 25.6 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 25.6 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 25.3 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 24.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40071930414-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40071930414-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40071930414-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40071930414-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 40071930414-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40071930414-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 40071930414-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40071930414-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40071930414-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40071930414-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40071930414-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 40071930414-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40071930414-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 2, fresh 14)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 40071930414-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 40071930414-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40071930414-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 40071930414-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 40071930414-local-16
```

## legal-certify.spec.ts › Legal certification › LGC-6 a statement's public page shows the global statement, and the country's with its country line; anyone may read it (DEC-236)

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: SSR error page twice for http://127.0.0.1:4173/legal/e2e-pub-lgc6t14g74?countries=%5B%5D: (no visible cause — production build without VITE_E2E)
--- further error 1 ---
Error: SSR error page twice for http://127.0.0.1:4173/legal/e2e-pub-lgc6t14g74?countries=%5B%5D: (no visible cause — production build without VITE_E2E)

   at fixtures.ts:110

  108 |   if (!state) return;
  109 |   if (state.pending) await state.pending;
> 110 |   if (state.failure) throw new Error(state.failure);
      |                            ^
  111 | }
  112 |
  113 | /**
    at assertSsrHealthy (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/fixtures.ts:110:28)
    at gotoReady (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:201:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:1254:5
--- further error 2 ---
Error: SSR error page twice for http://127.0.0.1:4173/legal/e2e-pub-lgc6t14g74?countries=%5B%5D: (no visible cause — production build without VITE_E2E)

   at fixtures.ts:327

  325 |       await use();
  326 |       const state = states.get(page);
> 327 |       if (state?.failure) throw new Error(state.failure);
      |                                 ^
  328 |     },
  329 |     { auto: true },
  330 |   ],
    at Object.base.extend.ssrGuard.auto (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/fixtures.ts:327:33)
```

Context:

```text
          - listitem [ref=e182]:
            - generic [ref=e183]: About
          - listitem [ref=e184]:
            - generic [ref=e185]: Contact
      - navigation "Help" [ref=e186]:
        - heading "Help" [level=2] [ref=e187]
        - list [ref=e188]:
          - listitem [ref=e189]:
            - generic [ref=e190]: Safety
      - navigation "Legal" [ref=e191]:
        - heading "Legal" [level=2] [ref=e192]
        - list [ref=e193]:
          - listitem [ref=e194]:
            - link "Terms" [ref=e195] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e196]:
            - link "Privacy" [ref=e197] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e199]: © 2026 ethio.com — All rights reserved.
```
```

## legal-pages.spec.ts › Legal public pages › LGP-4 /legal/publishing with no statement in force shows its soon state and carries the publishing title (DEC-236)

- Source: `shard 5`
- Project: `mobile-360`

```text
Error: SSR error page twice for http://127.0.0.1:4173/legal/publishing?countries=%5B%5D: (no visible cause — production build without VITE_E2E)
--- further error 1 ---
Error: SSR error page twice for http://127.0.0.1:4173/legal/publishing?countries=%5B%5D: (no visible cause — production build without VITE_E2E)

   at fixtures.ts:110

  108 |   if (!state) return;
  109 |   if (state.pending) await state.pending;
> 110 |   if (state.failure) throw new Error(state.failure);
      |                            ^
  111 | }
  112 |
  113 | /**
    at assertSsrHealthy (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/fixtures.ts:110:28)
    at gotoReady (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:201:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-pages.spec.ts:139:5
--- further error 2 ---
Error: SSR error page twice for http://127.0.0.1:4173/legal/publishing?countries=%5B%5D: (no visible cause — production build without VITE_E2E)

   at fixtures.ts:327

  325 |       await use();
  326 |       const state = states.get(page);
> 327 |       if (state?.failure) throw new Error(state.failure);
      |                                 ^
  328 |     },
  329 |     { auto: true },
  330 |   ],
    at Object.base.extend.ssrGuard.auto (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/fixtures.ts:327:33)
```

Context:

```text
          - listitem [ref=e182]:
            - generic [ref=e183]: About
          - listitem [ref=e184]:
            - generic [ref=e185]: Contact
      - navigation "Help" [ref=e186]:
        - heading "Help" [level=2] [ref=e187]
        - list [ref=e188]:
          - listitem [ref=e189]:
            - generic [ref=e190]: Safety
      - navigation "Legal" [ref=e191]:
        - heading "Legal" [level=2] [ref=e192]
        - list [ref=e193]:
          - listitem [ref=e194]:
            - link "Terms" [ref=e195] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e196]:
            - link "Privacy" [ref=e197] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e199]: © 2026 ethio.com — All rights reserved.
```
```

## legal-certify.spec.ts › Legal certification › LGC-6 a statement's public page shows the global statement, and the country's with its country line; anyone may read it (DEC-236)

- Source: `shard 12`
- Project: `desktop-1280`

```text
Error: SSR error page twice for http://127.0.0.1:4173/legal/e2e-pub-lgc6l92s69?countries=%5B%5D: (no visible cause — production build without VITE_E2E)
--- further error 1 ---
Error: SSR error page twice for http://127.0.0.1:4173/legal/e2e-pub-lgc6l92s69?countries=%5B%5D: (no visible cause — production build without VITE_E2E)

   at fixtures.ts:110

  108 |   if (!state) return;
  109 |   if (state.pending) await state.pending;
> 110 |   if (state.failure) throw new Error(state.failure);
      |                            ^
  111 | }
  112 |
  113 | /**
    at assertSsrHealthy (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/fixtures.ts:110:28)
    at gotoReady (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:201:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:1254:5
--- further error 2 ---
Error: SSR error page twice for http://127.0.0.1:4173/legal/e2e-pub-lgc6l92s69?countries=%5B%5D: (no visible cause — production build without VITE_E2E)

   at fixtures.ts:327

  325 |       await use();
  326 |       const state = states.get(page);
> 327 |       if (state?.failure) throw new Error(state.failure);
      |                                 ^
  328 |     },
  329 |     { auto: true },
  330 |   ],
    at Object.base.extend.ssrGuard.auto (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/fixtures.ts:327:33)
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

## legal-pages.spec.ts › Legal public pages › LGP-4 /legal/publishing with no statement in force shows its soon state and carries the publishing title (DEC-236)

- Source: `shard 13`
- Project: `desktop-1280`

```text
Error: SSR error page twice for http://127.0.0.1:4173/legal/publishing?countries=%5B%5D: (no visible cause — production build without VITE_E2E)
--- further error 1 ---
Error: SSR error page twice for http://127.0.0.1:4173/legal/publishing?countries=%5B%5D: (no visible cause — production build without VITE_E2E)

   at fixtures.ts:110

  108 |   if (!state) return;
  109 |   if (state.pending) await state.pending;
> 110 |   if (state.failure) throw new Error(state.failure);
      |                            ^
  111 | }
  112 |
  113 | /**
    at assertSsrHealthy (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/fixtures.ts:110:28)
    at gotoReady (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:201:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-pages.spec.ts:139:5
--- further error 2 ---
Error: SSR error page twice for http://127.0.0.1:4173/legal/publishing?countries=%5B%5D: (no visible cause — production build without VITE_E2E)

   at fixtures.ts:327

  325 |       await use();
  326 |       const state = states.get(page);
> 327 |       if (state?.failure) throw new Error(state.failure);
      |                                 ^
  328 |     },
  329 |     { auto: true },
  330 |   ],
    at Object.base.extend.ssrGuard.auto (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/fixtures.ts:327:33)
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

## Server errors: shard 4

```text
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
[WebServer] [ssr-error] /e2e-pub-lgc6t14g74 permission denied ×2
[WebServer] [ssr-error] /e2e-pub-lgc66vyx3z permission denied ×2
```

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/legal/e2e-pub-lgc6t14g74?countries=%5B%5D (<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/assets/styles-CTnv1S6m.css" dat)
[client-error] pageerror: Error: Minified React error #520; visit https://react.dev/errors/520 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwException (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:4260:22) at throwAndUnwindWorkLoop (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6885:8) at renderRootSync (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6742:125) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6503:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7316:3) at flushSyncWorkAcrossRoots_impl (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7239:389) at flushSpawnedWork (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7096:4) at commitRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6985:4) at commitRootWhenReady (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6604:3) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6573:6)
[client-error] console.error: Error: legal page permission denied at http://127.0.0.1:4173/legal/e2e-pub-lgc6t14g74?countries=%5B%5D:1:29455 at http://127.0.0.1:4173/legal/e2e-pub-lgc6t14g74?countries=%5B%5D:1:29507
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/legal/e2e-pub-lgc6t14g74?countries=%5B%5D (<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/assets/styles-CTnv1S6m.css" dat)
[client-error] pageerror: Error: Minified React error #520; visit https://react.dev/errors/520 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwException (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:4260:22) at throwAndUnwindWorkLoop (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6885:8) at renderRootSync (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6742:125) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6503:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7316:3) at flushSyncWorkAcrossRoots_impl (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7239:389) at flushSpawnedWork (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7096:4) at commitRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6985:4) at commitRootWhenReady (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6604:3) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6573:6)
[client-error] console.error: Error: legal page permission denied at http://127.0.0.1:4173/legal/e2e-pub-lgc6t14g74?countries=%5B%5D:1:29455 at http://127.0.0.1:4173/legal/e2e-pub-lgc6t14g74?countries=%5B%5D:1:29507
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/legal/e2e-pub-lgc66vyx3z?countries=%5B%5D (<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/assets/styles-CTnv1S6m.css" dat)
[client-error] pageerror: Error: Minified React error #520; visit https://react.dev/errors/520 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwException (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:4260:22) at throwAndUnwindWorkLoop (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6885:8) at renderRootSync (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6742:125) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6503:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7316:3) at flushSyncWorkAcrossRoots_impl (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7239:389) at flushSpawnedWork (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7096:4) at commitRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6985:4) at commitRootWhenReady (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6604:3) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6573:6)
[client-error] console.error: Error: legal page permission denied at http://127.0.0.1:4173/legal/e2e-pub-lgc66vyx3z?countries=%5B%5D:1:29455 at http://127.0.0.1:4173/legal/e2e-pub-lgc66vyx3z?countries=%5B%5D:1:29507
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] console.error: [client-error] gate fetch threw
[client-error] HTTP 500 GET http://127.0.0.1:4173/legal/e2e-pub-lgc66vyx3z?countries=%5B%5D (<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/assets/styles-CTnv1S6m.css" dat)
[client-error] pageerror: Error: Minified React error #520; visit https://react.dev/errors/520 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwException (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:4260:22) at throwAndUnwindWorkLoop (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6885:8) at renderRootSync (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6742:125) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6503:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7316:3) at flushSyncWorkAcrossRoots_impl (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7239:389) at flushSpawnedWork (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7096:4) at commitRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6985:4) at commitRootWhenReady (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6604:3) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6573:6)
[client-error] console.error: Error: legal page permission denied at http://127.0.0.1:4173/legal/e2e-pub-lgc66vyx3z?countries=%5B%5D:1:29455 at http://127.0.0.1:4173/legal/e2e-pub-lgc66vyx3z?countries=%5B%5D:1:29507
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] /publishing permission denied ×4
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/legal/publishing?countries=%5B%5D (<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/assets/styles-CTnv1S6m.css" dat)
[client-error] pageerror: Error: Minified React error #520; visit https://react.dev/errors/520 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwException (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:4260:22) at throwAndUnwindWorkLoop (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6885:8) at renderRootSync (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6742:125) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6503:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7316:3) at flushSyncWorkAcrossRoots_impl (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7239:389) at flushSpawnedWork (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7096:4) at commitRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6985:4) at commitRootWhenReady (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6604:3) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6573:6)
[client-error] console.error: Error: legal page permission denied at http://127.0.0.1:4173/legal/publishing?countries=%5B%5D:1:29623 at http://127.0.0.1:4173/legal/publishing?countries=%5B%5D:1:29675
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/legal/publishing?countries=%5B%5D (<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/assets/styles-CTnv1S6m.css" dat)
[client-error] pageerror: Error: Minified React error #520; visit https://react.dev/errors/520 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwException (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:4260:22) at throwAndUnwindWorkLoop (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6885:8) at renderRootSync (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6742:125) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6503:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7316:3) at flushSyncWorkAcrossRoots_impl (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7239:389) at flushSpawnedWork (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7096:4) at commitRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6985:4) at commitRootWhenReady (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6604:3) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6573:6)
[client-error] console.error: Error: legal page permission denied at http://127.0.0.1:4173/legal/publishing?countries=%5B%5D:1:29623 at http://127.0.0.1:4173/legal/publishing?countries=%5B%5D:1:29675
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/legal/publishing?countries=%5B%5D (<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/assets/styles-CTnv1S6m.css" dat)
[client-error] pageerror: Error: Minified React error #520; visit https://react.dev/errors/520 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwException (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:4260:22) at throwAndUnwindWorkLoop (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6885:8) at renderRootSync (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6742:125) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6503:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7316:3) at flushSyncWorkAcrossRoots_impl (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7239:389) at flushSpawnedWork (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7096:4) at commitRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6985:4) at commitRootWhenReady (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6604:3) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6573:6)
[client-error] console.error: Error: legal page permission denied at http://127.0.0.1:4173/legal/publishing?countries=%5B%5D:1:29623 at http://127.0.0.1:4173/legal/publishing?countries=%5B%5D:1:29675
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/legal/publishing?countries=%5B%5D (<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/assets/styles-CTnv1S6m.css" dat)
[client-error] pageerror: Error: Minified React error #520; visit https://react.dev/errors/520 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwException (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:4260:22) at throwAndUnwindWorkLoop (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6885:8) at renderRootSync (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6742:125) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6503:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7316:3) at flushSyncWorkAcrossRoots_impl (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7239:389) at flushSpawnedWork (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7096:4) at commitRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6985:4) at commitRootWhenReady (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6604:3) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6573:6)
[client-error] console.error: Error: legal page permission denied at http://127.0.0.1:4173/legal/publishing?countries=%5B%5D:1:29623 at http://127.0.0.1:4173/legal/publishing?countries=%5B%5D:1:29675
```

## Server errors: shard 12

```text
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
[WebServer] [ssr-error] /e2e-pub-lgc6l92s69 permission denied ×2
[WebServer] [ssr-error] /e2e-pub-lgc6nhyfy3 permission denied ×2
```

## Client errors: shard 12

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/legal/e2e-pub-lgc6l92s69?countries=%5B%5D (<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/assets/styles-CTnv1S6m.css" dat)
[client-error] pageerror: Error: Minified React error #520; visit https://react.dev/errors/520 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwException (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:4260:22) at throwAndUnwindWorkLoop (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6885:8) at renderRootSync (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6742:125) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6503:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7316:3) at flushSyncWorkAcrossRoots_impl (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7239:389) at flushSpawnedWork (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7096:4) at commitRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6985:4) at commitRootWhenReady (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6604:3) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6573:6)
[client-error] console.error: Error: legal page permission denied at http://127.0.0.1:4173/legal/e2e-pub-lgc6l92s69?countries=%5B%5D:1:29455 at http://127.0.0.1:4173/legal/e2e-pub-lgc6l92s69?countries=%5B%5D:1:29507
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/legal/e2e-pub-lgc6l92s69?countries=%5B%5D (<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/assets/styles-CTnv1S6m.css" dat)
[client-error] pageerror: Error: Minified React error #520; visit https://react.dev/errors/520 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwException (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:4260:22) at throwAndUnwindWorkLoop (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6885:8) at renderRootSync (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6742:125) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6503:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7316:3) at flushSyncWorkAcrossRoots_impl (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7239:389) at flushSpawnedWork (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7096:4) at commitRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6985:4) at commitRootWhenReady (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6604:3) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6573:6)
[client-error] console.error: Error: legal page permission denied at http://127.0.0.1:4173/legal/e2e-pub-lgc6l92s69?countries=%5B%5D:1:29455 at http://127.0.0.1:4173/legal/e2e-pub-lgc6l92s69?countries=%5B%5D:1:29507
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/legal/e2e-pub-lgc6nhyfy3?countries=%5B%5D (<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/assets/styles-CTnv1S6m.css" dat)
[client-error] pageerror: Error: Minified React error #520; visit https://react.dev/errors/520 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwException (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:4260:22) at throwAndUnwindWorkLoop (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6885:8) at renderRootSync (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6742:125) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6503:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7316:3) at flushSyncWorkAcrossRoots_impl (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7239:389) at flushSpawnedWork (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7096:4) at commitRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6985:4) at commitRootWhenReady (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6604:3) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6573:6)
[client-error] console.error: Error: legal page permission denied at http://127.0.0.1:4173/legal/e2e-pub-lgc6nhyfy3?countries=%5B%5D:1:29455 at http://127.0.0.1:4173/legal/e2e-pub-lgc6nhyfy3?countries=%5B%5D:1:29507
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/legal/e2e-pub-lgc6nhyfy3?countries=%5B%5D (<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/assets/styles-CTnv1S6m.css" dat)
[client-error] pageerror: Error: Minified React error #520; visit https://react.dev/errors/520 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwException (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:4260:22) at throwAndUnwindWorkLoop (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6885:8) at renderRootSync (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6742:125) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6503:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7316:3) at flushSyncWorkAcrossRoots_impl (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7239:389) at flushSpawnedWork (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7096:4) at commitRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6985:4) at commitRootWhenReady (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6604:3) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6573:6)
[client-error] console.error: Error: legal page permission denied at http://127.0.0.1:4173/legal/e2e-pub-lgc6nhyfy3?countries=%5B%5D:1:29455 at http://127.0.0.1:4173/legal/e2e-pub-lgc6nhyfy3?countries=%5B%5D:1:29507
```

## Server errors: shard 13

```text
[WebServer] [ssr-error] /publishing permission denied ×4
```

## Client errors: shard 13

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/legal/publishing?countries=%5B%5D (<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/assets/styles-CTnv1S6m.css" dat)
[client-error] pageerror: Error: Minified React error #520; visit https://react.dev/errors/520 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwException (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:4260:22) at throwAndUnwindWorkLoop (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6885:8) at renderRootSync (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6742:125) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6503:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7316:3) at flushSyncWorkAcrossRoots_impl (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7239:389) at flushSpawnedWork (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7096:4) at commitRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6985:4) at commitRootWhenReady (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6604:3) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6573:6)
[client-error] console.error: Error: legal page permission denied at http://127.0.0.1:4173/legal/publishing?countries=%5B%5D:1:29623 at http://127.0.0.1:4173/legal/publishing?countries=%5B%5D:1:29675
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/legal/publishing?countries=%5B%5D (<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/assets/styles-CTnv1S6m.css" dat)
[client-error] pageerror: Error: Minified React error #520; visit https://react.dev/errors/520 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwException (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:4260:22) at throwAndUnwindWorkLoop (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6885:8) at renderRootSync (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6742:125) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6503:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7316:3) at flushSyncWorkAcrossRoots_impl (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7239:389) at flushSpawnedWork (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7096:4) at commitRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6985:4) at commitRootWhenReady (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6604:3) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6573:6)
[client-error] console.error: Error: legal page permission denied at http://127.0.0.1:4173/legal/publishing?countries=%5B%5D:1:29623 at http://127.0.0.1:4173/legal/publishing?countries=%5B%5D:1:29675
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/legal/publishing?countries=%5B%5D (<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/assets/styles-CTnv1S6m.css" dat)
[client-error] pageerror: Error: Minified React error #520; visit https://react.dev/errors/520 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwException (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:4260:22) at throwAndUnwindWorkLoop (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6885:8) at renderRootSync (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6742:125) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6503:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7316:3) at flushSyncWorkAcrossRoots_impl (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7239:389) at flushSpawnedWork (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7096:4) at commitRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6985:4) at commitRootWhenReady (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6604:3) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6573:6)
[client-error] console.error: Error: legal page permission denied at http://127.0.0.1:4173/legal/publishing?countries=%5B%5D:1:29623 at http://127.0.0.1:4173/legal/publishing?countries=%5B%5D:1:29675
[client-error] console.error: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
[client-error] HTTP 500 GET http://127.0.0.1:4173/legal/publishing?countries=%5B%5D (<!DOCTYPE html><html lang="en" dir="ltr"><head><meta charSet="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><link rel="stylesheet" href="/assets/styles-CTnv1S6m.css" dat)
[client-error] pageerror: Error: Minified React error #520; visit https://react.dev/errors/520 for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwException (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:4260:22) at throwAndUnwindWorkLoop (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6885:8) at renderRootSync (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6742:125) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6503:233) at performSyncWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7316:3) at flushSyncWorkAcrossRoots_impl (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7239:389) at flushSpawnedWork (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:7096:4) at commitRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6985:4) at commitRootWhenReady (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6604:3) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-Cb1i9yrB.js:6573:6)
[client-error] console.error: Error: legal page permission denied at http://127.0.0.1:4173/legal/publishing?countries=%5B%5D:1:29623 at http://127.0.0.1:4173/legal/publishing?countries=%5B%5D:1:29675
```
