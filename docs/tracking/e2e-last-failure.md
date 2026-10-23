# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39942129628
- Commit: `225594a14c8b74e1f2ff5ee55ccb8ad43b3362e0`
- Attempt: 1
- Written (UTC): 2026-10-23T11:34:16.555Z
- Passed: 1970 · Skipped: 94 · Failed: 9
- Gating failures: 9 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: smoke
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (17 of 18 results files read, 17 of 18 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: smoke

`smoke`: log unavailable.

118 line(s), 36 message(s): 2 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `too many previews` (quiet) | 24 | shard 1, shard 4, shard 9, shard 12 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 9, shard 10, shard 12 |
| `listing not found` | 6 | shard 7, shard 14, shard 15 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-lt<n>oi: e<n>e_par_<n>tfk<n> → e<n>e_chi_t<n>dk<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-t<n>aq<n>: e<n>e_par_<n>sg<n>i → e<n>e_chi_mfvxrv` (quiet) | 1 | shard 10 |

Quiet (allowlisted): too many previews ×24 · digest mismatch ×12 · categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-lt<n>oi: e<n>e_par_<n>tfk<n> → e<n>e_chi_t<n>dk<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-local-<n>-<n>-t<n>aq<n>: e<n>e_par_<n>sg<n>i → e<n>e_chi_mfvxrv ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 7, shard 14, shard 15
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PR-3 a complete draft publishes to screening and never to active ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-50 the specifications show every row open in display order (D41) ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1 · PW-188 a list that hangs under another answer offers its shared Other last under ×1

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

Logs read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: smoke

`smoke`: log unavailable.

## Timing (DEC-087, non-gating)

Results read: email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16 · unavailable: smoke

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-10-23T11:13:15.647Z | 0.2 min |
| shard 1 | 2026-10-23T11:13:36.397Z | 9.4 min |
| shard 2 | 2026-10-23T11:13:15.509Z | 10.0 min |
| shard 3 | 2026-10-23T11:13:11.334Z | 11.4 min |
| shard 4 | 2026-10-23T11:14:10.807Z | 6.8 min |
| shard 5 | 2026-10-23T11:13:55.160Z | 6.6 min |
| shard 6 | 2026-10-23T11:14:31.740Z | 10.9 min |
| shard 7 | 2026-10-23T11:21:24.091Z | 5.9 min |
| shard 8 | 2026-10-23T11:21:35.568Z | 7.3 min |
| shard 9 | 2026-10-23T11:13:30.715Z | 8.5 min |
| shard 10 | 2026-10-23T11:21:15.444Z | 12.2 min |
| shard 11 | 2026-10-23T11:13:43.737Z | 13.3 min |
| shard 12 | 2026-10-23T11:13:36.908Z | 5.3 min |
| shard 13 | 2026-10-23T11:13:41.311Z | 5.9 min |
| shard 14 | 2026-10-23T11:15:15.729Z | 10.8 min |
| shard 15 | 2026-10-23T11:13:55.019Z | 8.1 min |
| shard 16 | 2026-10-23T11:13:54.780Z | 6.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 212 | 8.9 min | shard 8, shard 16 |
| `post-wizard-bundle2.spec.ts` | 70 | 6.0 min | shard 6, shard 14 |
| `post-wizard-specs.spec.ts` | 82 | 5.5 min | shard 7, shard 15 |
| `admin-attributes-library.spec.ts` | 42 | 5.0 min | shard 1, shard 9 |
| `feed-screens.spec.ts` | 36 | 4.6 min | shard 4, shard 12 |
| `post-wizard-place.spec.ts` | 38 | 4.5 min | shard 6, shard 14 |
| `admin-translations-console.spec.ts` | 44 | 4.4 min | shard 3, shard 11 |
| `admin-locations.spec.ts` | 38 | 4.4 min | shard 2, shard 10 |
| `admin-roles.spec.ts` | 26 | 4.3 min | shard 3, shard 11 |
| `admin-screening.spec.ts` | 52 | 4.0 min | shard 3, shard 11 |
| `admin-categories-console.spec.ts` | 34 | 4.0 min | shard 2, shard 10 |
| `viewing-place.spec.ts` | 22 | 3.9 min | shard 8, shard 16 |
| `admin-users.spec.ts` | 28 | 3.8 min | shard 3, shard 11 |
| `post-wizard-where.spec.ts` | 32 | 3.7 min | shard 7, shard 15 |
| `admin-attributes-links.spec.ts` | 34 | 3.5 min | shard 1, shard 9 |
| `post-wizard-pricing.spec.ts` | 52 | 3.5 min | shard 6, shard 14 |
| `photo-pipeline.spec.ts` | 68 | 3.4 min | shard 5, shard 13 |
| `admin-categories-lifecycle.spec.ts` | 52 | 3.4 min | shard 2, shard 10 |
| `my-listings-ad.spec.ts` | 36 | 3.1 min | shard 5, shard 13 |
| `post-wizard-category.spec.ts` | 48 | 2.8 min | shard 6, shard 14 |
| `admin-listings.spec.ts` | 62 | 2.8 min | shard 2, shard 10 |
| `admin-attributes-editor.spec.ts` | 36 | 2.8 min | shard 1, shard 9 |
| `post-wizard-resets.spec.ts` | 34 | 2.7 min | shard 6, shard 14 |
| `posting-routes.spec.ts` | 80 | 2.5 min | shard 7, shard 15 |
| `ad-page.spec.ts` | 68 | 2.4 min | shard 1, shard 9 |
| `admin-attributes-safety.spec.ts` | 18 | 2.4 min | shard 1, shard 10 |
| `admin-countries.spec.ts` | 18 | 2.1 min | shard 2, shard 10 |
| `admin-attributes-import.spec.ts` | 40 | 2.1 min | shard 1, shard 9 |
| `import-security.spec.ts` | 36 | 2.0 min | shard 4, shard 12 |
| `auth-signout.spec.ts` | 28 | 2.0 min | shard 3, shard 11 |
| `admin-translations-data.spec.ts` | 10 | 2.0 min | shard 3, shard 11 |
| `admin-translations-governance.spec.ts` | 8 | 1.8 min | shard 3, shard 11 |
| `admin-categories-home.spec.ts` | 10 | 1.6 min | shard 2, shard 10 |
| `legal-admin.spec.ts` | 40 | 1.4 min | shard 4, shard 12 |
| `mfa-stepup.spec.ts` | 18 | 1.4 min | shard 5, shard 13 |
| `legal-certify.spec.ts` | 40 | 1.4 min | shard 4, shard 12 |
| `admin-audit.spec.ts` | 14 | 1.3 min | shard 2, shard 10 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 5, shard 13 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 5, shard 13 |
| `admin-shell.spec.ts` | 12 | 0.8 min | shard 3, shard 11 |
| `my-listings-page.spec.ts` | 16 | 0.7 min | shard 5, shard 13 |
| `post-wizard-removed.spec.ts` | 4 | 0.7 min | shard 6, shard 14 |
| `admin-coverage.spec.ts` | 16 | 0.7 min | shard 2, shard 10 |
| `legal-doors.spec.ts` | 34 | 0.7 min | shard 5, shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 0.6 min | shard 7, shard 15 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 4, shard 12 |
| `posting-routes-dials.spec.ts` | 18 | 0.5 min | shard 7, shard 15 |
| `post-wizard-finder.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `admin-categories-images.spec.ts` | 2 | 0.5 min | shard 2, shard 10 |
| `post-wizard-details.spec.ts` | 8 | 0.5 min | shard 6, shard 14 |
| `ad-page-doors.spec.ts` | 30 | 0.4 min | shard 1, shard 9 |
| `my-listings-doors.spec.ts` | 28 | 0.4 min | shard 5, shard 13 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 7, shard 15 |
| `breadcrumbs.spec.ts` | 6 | 0.3 min | shard 4, shard 11 |
| `legal-accept.spec.ts` | 8 | 0.3 min | shard 4, shard 12 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 4, shard 12 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 7, shard 15 |
| `i18n-coverage.spec.ts` | 14 | 0.2 min | shard 4, shard 12 |
| `admin-services.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `settings.spec.ts` | 4 | 0.2 min | shard 8 |
| `legal-history.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `auth-caller-gates.spec.ts` | 10 | 0.2 min | shard 3, shard 11 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 4, shard 12 |
| `layout.spec.ts` | 10 | 0.2 min | shard 4, shard 12 |
| `legal-pages.spec.ts` | 6 | 0.2 min | shard 5, shard 13 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 8, shard 16 |
| `feed-route.spec.ts` | 22 | 0.2 min | shard 4, shard 12 |
| `post-wizard-recent.spec.ts` | 2 | 0.2 min | shard 6, shard 14 |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 7, shard 15 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 3 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 1, shard 9 |
| `auth-signup.spec.ts` | 4 | 0.1 min | email |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8, shard 16 |
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
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | desktop-1280 | 48.1 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | desktop-1280 | 32.4 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.3 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 32.0 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 31.7 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | mobile-360 | 31.2 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | mobile-360 | 30.4 s |
| `viewing-place.spec.ts` › VP-9 the account's newer pick wins over this browser's older one | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | desktop-1280 | 30.3 s |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 30.2 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | desktop-1280 | 26.7 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | desktop-1280 | 25.1 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | desktop-1280 | 24.8 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39942129628-local-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 39942129628-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 39942129628-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 39942129628-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39942129628-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 39942129628-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39942129628-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 39942129628-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39942129628-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 39942129628-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 2, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 39942129628-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 2, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 39942129628-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39942129628-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 2, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 39942129628-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 4 (pool 2, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39942129628-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 3 (pool 2, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 39942129628-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39942129628-local-16
```

## auth-caller-gates.spec.ts › CG-1 a deactivated account is refused at the doors that had no gate

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [CG] terms has no in-force version
--- further error 1 ---
Error: [CG] terms has no in-force version

  114 |       const body = answer.data as { version_id?: unknown } | null;
  115 |       if (typeof body?.version_id !== "string")
> 116 |         throw new Error(`[CG] ${kind} has no in-force version`);
      |               ^
  117 |       versionIds.push(body.version_id);
  118 |     }
  119 |     const staff = await leaseUser();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-caller-gates.spec.ts:116:15
```

Context: context file not found for `auth-caller-gates-CG-1-a-deactivated-account-is-refused-at-the-doors-that-had-no-gate-mobile-360` — Playwright's name `auth-caller-gates-CG-1-a-d-2ee30--the-doors-that-had-no-gate-mobile-360`; this run carried 0 context file(s); of the same spec: none

## auth-caller-gates.spec.ts › CG-2 the three retired doors are closed to a signed-in account

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "42501"
Received: "PGRST202"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "42501"
Received: "PGRST202"

  177 |   ] as const) {
  178 |     const { error } = await caller.rpc(fn, args);
> 179 |     expect(error?.code).toBe("42501");
      |                         ^
  180 |     expect(error?.message).toContain("permission denied for function");
  181 |     expect(error?.message).not.toMatch(/only a super admin|not your listing|not authenticated/);
  182 |   }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-caller-gates.spec.ts:179:25
```

Context: context file not found for `auth-caller-gates-CG-2-the-three-retired-doors-are-closed-to-a-signed-in-account-mobile-360` — Playwright's name `auth-caller-gates-CG-2-the-ee3ca-osed-to-a-signed-in-account-mobile-360`; this run carried 0 context file(s); of the same spec: none

## auth-caller-gates.spec.ts › CG-4 a fresh password sign-in is the proof — and the last-method rule still refuses an email-only account

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /last sign-in method/i
Received string:  "recent sign-in required"
--- further error 1 ---
Error: expect(received).toMatch(expected)

Expected pattern: /last sign-in method/i
Received string:  "recent sign-in required"

  206 |     await passwordGrant(user.email, user.password);
  207 |     const result = await bearerClient(first.access_token).rpc("remove_own_password");
> 208 |     expect(result.error?.message).toMatch(/last sign-in method/i);
      |                                   ^
  209 |     expect((await passwordGrant(user.email, user.password)).user?.id).toBe(user.id);
  210 |   },
  211 | );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-caller-gates.spec.ts:208:35
```

Context: context file not found for `auth-caller-gates-CG-4-a-fresh-password-sign-in-is-the-proof-and-the-last-method-rule-still-refuses-an-email-only-account-mobile-360` — Playwright's name `auth-caller-gates-CG-4-a-f-f54a2-fuses-an-email-only-account-mobile-360`; this run carried 0 context file(s); of the same spec: none

## auth-caller-gates.spec.ts › CG-5 the dial

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "rateLimited"
Received string:    "recent sign-in required"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "rateLimited"
Received string:    "recent sign-in required"

  224 |       "recent sign-in required",
  225 |     );
> 226 |   expect((await caller.rpc("remove_own_password")).error?.message).toContain("rateLimited");
      |                                                                    ^
  227 | });
  228 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-caller-gates.spec.ts:226:68
```

Context: context file not found for `auth-caller-gates-CG-5-the-dial-mobile-360` — Playwright's name `auth-caller-gates-CG-5-the-dial-mobile-360`; this run carried 0 context file(s); of the same spec: none

## auth-caller-gates.spec.ts › CG-1 a deactivated account is refused at the doors that had no gate

- Source: `shard 11`
- Project: `desktop-1280`

```text
Error: [CG] terms has no in-force version
--- further error 1 ---
Error: [CG] terms has no in-force version

  114 |       const body = answer.data as { version_id?: unknown } | null;
  115 |       if (typeof body?.version_id !== "string")
> 116 |         throw new Error(`[CG] ${kind} has no in-force version`);
      |               ^
  117 |       versionIds.push(body.version_id);
  118 |     }
  119 |     const staff = await leaseUser();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-caller-gates.spec.ts:116:15
```

Context: context file not found for `auth-caller-gates-CG-1-a-deactivated-account-is-refused-at-the-doors-that-had-no-gate-desktop-1280` — Playwright's name `auth-caller-gates-CG-1-a-d-2ee30--the-doors-that-had-no-gate-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## auth-caller-gates.spec.ts › CG-2 the three retired doors are closed to a signed-in account

- Source: `shard 11`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: "42501"
Received: "PGRST202"
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "42501"
Received: "PGRST202"

  177 |   ] as const) {
  178 |     const { error } = await caller.rpc(fn, args);
> 179 |     expect(error?.code).toBe("42501");
      |                         ^
  180 |     expect(error?.message).toContain("permission denied for function");
  181 |     expect(error?.message).not.toMatch(/only a super admin|not your listing|not authenticated/);
  182 |   }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-caller-gates.spec.ts:179:25
```

Context: context file not found for `auth-caller-gates-CG-2-the-three-retired-doors-are-closed-to-a-signed-in-account-desktop-1280` — Playwright's name `auth-caller-gates-CG-2-the-ee3ca-osed-to-a-signed-in-account-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## auth-caller-gates.spec.ts › CG-4 a fresh password sign-in is the proof — and the last-method rule still refuses an email-only account

- Source: `shard 11`
- Project: `desktop-1280`

```text
Error: expect(received).toMatch(expected)

Expected pattern: /last sign-in method/i
Received string:  "recent sign-in required"
--- further error 1 ---
Error: expect(received).toMatch(expected)

Expected pattern: /last sign-in method/i
Received string:  "recent sign-in required"

  206 |     await passwordGrant(user.email, user.password);
  207 |     const result = await bearerClient(first.access_token).rpc("remove_own_password");
> 208 |     expect(result.error?.message).toMatch(/last sign-in method/i);
      |                                   ^
  209 |     expect((await passwordGrant(user.email, user.password)).user?.id).toBe(user.id);
  210 |   },
  211 | );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-caller-gates.spec.ts:208:35
```

Context: context file not found for `auth-caller-gates-CG-4-a-fresh-password-sign-in-is-the-proof-and-the-last-method-rule-still-refuses-an-email-only-account-desktop-1280` — Playwright's name `auth-caller-gates-CG-4-a-f-f54a2-fuses-an-email-only-account-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## auth-caller-gates.spec.ts › CG-5 the dial

- Source: `shard 11`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "rateLimited"
Received string:    "recent sign-in required"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "rateLimited"
Received string:    "recent sign-in required"

  224 |       "recent sign-in required",
  225 |     );
> 226 |   expect((await caller.rpc("remove_own_password")).error?.message).toContain("rateLimited");
      |                                                                    ^
  227 | });
  228 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-caller-gates.spec.ts:226:68
```

Context: context file not found for `auth-caller-gates-CG-5-the-dial-desktop-1280` — Playwright's name `auth-caller-gates-CG-5-the-dial-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: PW-153: the review did not show the range (stored model: e2e_settle_1792754157033_kkqa9r_m2)

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-review-preview').locator('[data-key="e2e_settle_1792754157033_kkqa9r_mah"]')
Expected: "4,056–4,288 mAh"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-153: the review did not show the range (stored model: e2e_settle_1792754157033_kkqa9r_m2) with timeout 20000ms
  - waiting for getByTestId('post-review-preview').locator('[data-key="e2e_settle_1792754157033_kkqa9r_mah"]')

--- further error 1 ---
Error: PW-153: the review did not show the range (stored model: e2e_settle_1792754157033_kkqa9r_m2)

expect(locator).toHaveText(expected) failed

Locator: getByTestId('post-review-preview').locator('[data-key="e2e_settle_1792754157033_kkqa9r_mah"]')
Expected: "4,056–4,288 mAh"
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-153: the review did not show the range (stored model: e2e_settle_1792754157033_kkqa9r_m2) with timeout 20000ms
  - waiting for getByTestId('post-review-preview').locator('[data-key="e2e_settle_1792754157033_kkqa9r_mah"]')


  1951 |       page.getByTestId("post-review-preview").locator(`[data-key="${battery}"]`),
  1952 |       `PW-153: the review did not show the range (stored model: ${storedModel})`,
> 1953 |     ).toHaveText("4,056–4,288 mAh", { timeout: 20_000 });
       |       ^
  1954 |     await page.getByTestId("post-preview-open").click();
  1955 |     await expect(
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-153-a-settled-range-hides-its-number-and-the-review-and-buyer-sheet-show-the-range-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--26bb2--buyer-sheet-show-the-range-desktop-1280`; this run carried 0 context file(s); of the same spec: none

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 3

No `[ssr-error]` lines in the `shard 3` log (or no log was uploaded).

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 11

No `[ssr-error]` lines in the `shard 11` log (or no log was uploaded).

## Client errors: shard 11

No `[client-error]` lines in the `shard 11` log (or no log was uploaded).

## Server errors: shard 15

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 15

No `[client-error]` lines in the `shard 15` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```
