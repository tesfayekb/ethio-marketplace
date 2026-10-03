# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37136753288
- Commit: `be3fc1a46f9b51ced7fb7812366cd3e50662ae94`
- Attempt: 1
- Written (UTC): 2026-10-03T16:42:21.952Z
- Passed: 485 · Skipped: 43 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 2, shard 6, changed
- Sources without results: shard 1, shard 3, shard 4, shard 5

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

108 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 3, shard 5, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 4 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 5 |
| `countries nulByte` (quiet) | 2 | shard 2, shard 5 |
| `countries tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `countries unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `links unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations badHeader` (quiet) | 2 | shard 2, shard 5 |
| `locations file too large` (quiet) | 2 | shard 2, shard 5 |
| `locations nulByte` (quiet) | 2 | shard 2, shard 5 |
| `locations unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `locations wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 5, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 2, shard 6, changed · unavailable: shard 1, shard 3, shard 4, shard 5

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-03T16:26:04.506Z | 13.0 min |
| email | 2026-10-03T16:26:11.119Z | 0.2 min |
| shard 2 | 2026-10-03T16:26:09.676Z | 15.6 min |
| shard 6 | 2026-10-03T16:26:03.773Z | 12.4 min |
| changed | 2026-10-03T16:26:12.168Z | 12.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-place.spec.ts` | 54 | 19.1 min | shard 2, changed |
| `shell.spec.ts` | 189 | 12.4 min | smoke, shard 6 |
| `post-wizard-specs.spec.ts` | 31 | 7.7 min | shard 6 |
| `post-wizard-bundle2.spec.ts` | 27 | 7.6 min | shard 2, changed |
| `auth-signout.spec.ts` | 33 | 5.9 min | smoke, shard 2 |
| `post-wizard-where.spec.ts` | 14 | 4.0 min | shard 6 |
| `post-wizard-category.spec.ts` | 20 | 3.8 min | shard 2 |
| `import-security.spec.ts` | 17 | 3.5 min | shard 2 |
| `admin-users.spec.ts` | 11 | 2.8 min | shard 2 |
| `post-wizard-resets.spec.ts` | 9 | 2.8 min | shard 6 |
| `posting-routes.spec.ts` | 19 | 2.8 min | shard 6 |
| `photo-pipeline.spec.ts` | 10 | 2.7 min | shard 2 |
| `admin-translations-governance.spec.ts` | 4 | 1.4 min | shard 2 |
| `admin-translations-data.spec.ts` | 4 | 1.3 min | shard 2 |
| `mfa-stepup.spec.ts` | 9 | 1.3 min | shard 2 |
| `post-wizard-finder.spec.ts` | 4 | 0.7 min | shard 2 |
| `locations-tree.spec.ts` | 4 | 0.6 min | shard 2 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-image-routes.spec.ts` | 5 | 0.5 min | shard 2 |
| `post-wizard-details.spec.ts` | 2 | 0.4 min | shard 2 |
| `i18n-coverage.spec.ts` | 4 | 0.3 min | shard 2 |
| `i18n-bundle.spec.ts` | 2 | 0.3 min | shard 2 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `rbac.spec.ts` | 3 | 0.2 min | shard 6 |
| `primitives-law.spec.ts` | 12 | 0.2 min | shard 6 |
| `smoke-auth-i18n.spec.ts` | 3 | 0.2 min | smoke, shard 6 |
| `category-nav.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `layout.spec.ts` | 5 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `shell-table-law.spec.ts` | 1 | 0.1 min | shard 6 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 5 | 0.0 min | shard 2 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited | mobile-360 | 54.3 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 41.8 s |
| `post-wizard-place.spec.ts` › PW-33 a region alone never lists itself; its city does (W6 R2) | mobile-360 | 38.7 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | desktop-1280 | 38.3 s |
| `post-wizard-place.spec.ts` › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched | mobile-360 | 36.1 s |
| `locations-tree.spec.ts` › LR-3 a row disappears when an ancestor is retired, and the version moves | mobile-360 | 32.7 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 32.6 s |
| `post-wizard-place.spec.ts` › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) | mobile-360 | 32.4 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 31.5 s |
| `post-wizard-place.spec.ts` › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan | desktop-1280 | 31.1 s |
| `import-security.spec.ts` › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited | mobile-360 | 30.4 s |
| `post-wizard-place.spec.ts` › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city | mobile-360 | 30.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 29.9 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | desktop-1280 | 29.6 s |
| `post-wizard-place.spec.ts` › PW-41 the geocode route spends a dial and refuses the call past its ceiling | mobile-360 | 29.3 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37136753288-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37136753288-email
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 37136753288-2
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37136753288-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 3, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37136753288-changed
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
✓  136 [mobile-360] › e2e/admin-locations.spec.ts:563:3 › L2a locations console › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids (20.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37136753288-1-2837-3-6mmabv@ethio-e2e.invalid)
  ✓  139 [mobile-360] › e2e/admin-locations.spec.ts:697:3 › L2a locations console › LT-7b the editor round-trips a row without dropping a stored field (7.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37136753288-1-2837-3-6mmabv@ethio-e2e.invalid)
  ✓  138 [mobile-360] › e2e/admin-roles.spec.ts:396:3 › U2 roles console › RP-10 members link preselects the role filter via the URL (9.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37136753288-1-2837-2-zrzjla@ethio-e2e.invalid)
  ✓  140 [mobile-360] › e2e/admin-locations.spec.ts:743:3 › L2a locations console › LT-8 verb reachability: every verb and the save button are inside the viewport (CT-8 mirror) (3.5s)
  -  142 [mobile-360] › e2e/admin-locations.spec.ts:799:3 › L2a locations console › LT-9a roster shape, table twin: the edit icon sits in the end column with pagination
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37136753288-1-2837-3-6mmabv@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  161 [mobile-360] › e2e/shell.spec.ts:1772:3 › L4b location picker › LS-2 a pick is remembered, clearing forgets it (15.5s)
  ✓  162 [mobile-360] › e2e/shell.spec.ts:1805:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (728ms)
  ✓  163 [mobile-360] › e2e/shell.spec.ts:1822:3 › L4b location picker › LS-4 a closed market is not guessed (683ms)
  ✓  164 [mobile-360] › e2e/shell.spec.ts:1841:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (587ms)
  ✓  165 [mobile-360] › e2e/shell.spec.ts:1939:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (11.9s)
  ✓  166 [mobile-360] › e2e/shell.spec.ts:1968:3 › L4b location picker › LS-7 a region code alone selects the region (14.7s)
  ✓  167 [mobile-360] › e2e/shell.spec.ts:1996:3 › L4b location picker › LS-8 a city name alone selects that city (15.5s)
  ✓  168 [mobile-360] › e2e/shell.spec.ts:2018:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (15.5s)
  ✓  169 [mobile-360] › e2e/shell.spec.ts:2046:3 › L4b location picker › LS-10 a saved area beats the deepest guess (16.8s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  130 [desktop-1280] › e2e/admin-roles.spec.ts:221:3 › U2 roles console › RP-4 system lock: super_admin role is read-only in UI and refused by the RPCs (2.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37136753288-4-3052-3-t9wkfd@ethio-e2e.invalid)
  ✓  131 [desktop-1280] › e2e/admin-roles.spec.ts:257:3 › U2 roles console › RP-5 delete guards: members block deletion; typed confirm deletes (16.4s)
  ✓  129 [desktop-1280] › e2e/admin-locations.spec.ts:325:3 › L2a locations console › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree (34.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37136753288-4-3052-2-mxasaz@ethio-e2e.invalid)
  ✓  132 [desktop-1280] › e2e/admin-roles.spec.ts:287:3 › U2 roles console › RP-6 revocation path: unenrolling the factor refuses the next change @private-identity (15.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37136753288-4-3052-3-t9wkfd@ethio-e2e.invalid)
  ✓  134 [desktop-1280] › e2e/admin-roles.spec.ts:333:3 › U2 roles console › RP-7 registration: DEC-016 permissions appear as grantable rows (7.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37136753288-4-3052-3-t9wkfd@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  147 [desktop-1280] › e2e/post-wizard-place.spec.ts:1144:3 › POSTING WIZARD › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched (14.5s)
  ✓  148 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:457:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (13.1s)
  ✓  150 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:481:3 › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) (11.4s)
  ✓  149 [desktop-1280] › e2e/post-wizard-place.spec.ts:1183:3 › POSTING WIZARD › PW-82 the add buttons follow the plan's own limits (15.1s)
[WebServer] [ssr-error] /api/listings/draft listing not found
  ✓  151 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:528:3 › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) (11.2s)
  ✓  152 [desktop-1280] › e2e/post-wizard-place.spec.ts:1250:3 › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact (11.0s)
  ✓  154 [desktop-1280] › e2e/post-wizard-place.spec.ts:1283:3 › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line (11.1s)
  ✓  153 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:566:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (14.2s)
```

```text
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```
