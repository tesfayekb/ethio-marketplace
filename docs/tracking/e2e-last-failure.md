# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37222581720
- Commit: `06b61f12498bcf312f1e593b8b38164508a47a4e`
- Attempt: 1
- Written (UTC): 2026-10-04T18:16:29.165Z
- Passed: 331 · Skipped: 42 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 6, changed
- Sources without results: shard 1, shard 2, shard 3, shard 4, shard 5

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

109 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 3, shard 6, changed |
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

- Count: 9 · Sources: shard 3, shard 6, changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 6, changed · unavailable: shard 1, shard 2, shard 3, shard 4, shard 5

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-04T18:00:07.532Z | 13.2 min |
| email | 2026-10-04T18:00:04.450Z | 0.2 min |
| shard 6 | 2026-10-04T18:00:14.121Z | 15.7 min |
| changed | 2026-10-04T18:00:09.287Z | 9.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 189 | 13.2 min | smoke, shard 6 |
| `post-wizard-bundle2.spec.ts` | 42 | 11.3 min | changed |
| `post-wizard-resets.spec.ts` | 27 | 10.2 min | shard 6, changed |
| `post-wizard-specs.spec.ts` | 31 | 10.0 min | shard 6 |
| `posting-routes.spec.ts` | 24 | 5.2 min | shard 6 |
| `post-wizard-where.spec.ts` | 14 | 4.9 min | shard 6 |
| `auth-signout.spec.ts` | 22 | 4.0 min | smoke |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `rbac.spec.ts` | 3 | 0.4 min | shard 6 |
| `primitives-law.spec.ts` | 12 | 0.2 min | shard 6 |
| `smoke-auth-i18n.spec.ts` | 3 | 0.2 min | smoke, shard 6 |
| `shell-table-law.spec.ts` | 1 | 0.1 min | shard 6 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 42.5 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | mobile-360 | 37.8 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 36.5 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 34.3 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 33.6 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | desktop-1280 | 33.4 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | desktop-1280 | 31.7 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 30.4 s |
| `posting-routes.spec.ts` › PR-24 a seller is named before an ad is published (INC-423) | desktop-1280 | 29.6 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 28.4 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | desktop-1280 | 26.8 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 26.4 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | desktop-1280 | 26.2 s |
| `post-wizard-resets.spec.ts` › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317) | desktop-1280 | 25.9 s |
| `post-wizard-resets.spec.ts` › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) | desktop-1280 | 25.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37222581720-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37222581720-email
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37222581720-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37222581720-changed
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

## Server errors: shard 2

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

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×6
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

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
✓  109 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:1701:3 › CAT-IE categories import/export › CT-27 a leaf delete undoes with its Amharic name; a parent delete names its child (10.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37222581720-1-3084-2-gszzy0@ethio-e2e.invalid)
  ✓  110 [mobile-360] › e2e/admin-countries.spec.ts:230:3 › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row (10.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37222581720-1-3084-3-aoysyz@ethio-e2e.invalid)
  ✓  111 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:1797:3 › CAT-IE categories import/export › CT-28 the import dialog reaches Applied and undoes (16.1s)
  ✓  112 [mobile-360] › e2e/admin-countries.spec.ts:337:3 › L2b countries console › CO-7 transfer: the markets file round-trips through this toolbar and the undo puts it back (17.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37222581720-1-3084-3-aoysyz@ethio-e2e.invalid)
  ✓  113 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:1880:3 › C2-HOME categories home flag › CT-33 the flagged pointer is the home, a reorder never moves it, and deleting it promotes the other (4.9s)
  ✓  114 [mobile-360] › e2e/admin-countries.spec.ts:391:3 › L2b countries console › CO-8 geometry: nothing overflows and every verb is reachable in both twins (3.0s)
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

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓  152 [mobile-360] › e2e/post-wizard-category.spec.ts:1213:3 › POSTING WIZARD › PW-44 a dependent list on a surfaced leaf narrows by its parent (12.9s)
  ✓  153 [mobile-360] › e2e/post-wizard-finder.spec.ts:69:3 › POSTING WIZARD — the category finder (W7) › PW-85 an option label, an alias and an Amharic alias each find the leaf, and the choice prefills the option (16.6s)
  ✓  154 [mobile-360] › e2e/post-wizard-category.spec.ts:1305:3 › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review (17.4s)
  ✓  155 [mobile-360] › e2e/post-wizard-finder.spec.ts:125:3 › POSTING WIZARD — the category finder (W7) › PW-86 a failing finder leaves the name matches on screen, with the notice (7.9s)
  ✓  157 [mobile-360] › e2e/post-wizard-finder.spec.ts:149:3 › POSTING WIZARD — the category finder (W7) › PW-105 the searching row shows while the finder is asked; no-hits only after its answer (6.7s)
  ✓  156 [mobile-360] › e2e/post-wizard-place.spec.ts:268:3 › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan (19.6s)
  ✓  158 [mobile-360] › e2e/post-wizard-finder.spec.ts:180:3 › POSTING WIZARD — the category finder (W7) › PW-87 off the chosen path the step asks again, Keep it returns, a new leaf clears it (10.3s)
  ✓  159 [mobile-360] › e2e/post-wizard-place.spec.ts:449:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (15.7s)
  ✓  160 [mobile-360] › e2e/post-wizard-place.spec.ts:537:3 › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged (12.4s)
```

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

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  104 [mobile-360] › e2e/rbac.spec.ts:34:3 › RBAC client seam › R-1 logged out: no Admin tab and no RBAC request at all (799ms)
  ✓  105 [mobile-360] › e2e/rbac.spec.ts:47:3 › RBAC client seam › R-2 regular user: no Admin tab, and /admin redirects home (6.0s)
  ✓   98 [mobile-360] › e2e/posting-routes.spec.ts:913:3 › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private (14.5s)
  ✓  106 [mobile-360] › e2e/rbac.spec.ts:61:3 › RBAC client seam › R-3 staff user: Admin tab appears and /admin renders (6.8s)
  ✓  108 [mobile-360] › e2e/settings.spec.ts:20:1 › S-1: unauthenticated /settings lands on /auth (934ms)
  ✓  107 [mobile-360] › e2e/posting-routes.spec.ts:958:3 › POSTING ROUTES › PR-22 step 8: attribute tables leave the browser; categories still read (6.1s)
  ✓  109 [mobile-360] › e2e/settings.spec.ts:26:1 › S-2: settings renders all three sections and guards the only method (6.7s)
  ✓  110 [mobile-360] › e2e/posting-routes.spec.ts:1023:3 › POSTING ROUTES › PR-23 an ad has no end unless the seller sets a date or the category holds a limit (DEC-117) (10.7s)
  ✓  111 [mobile-360] › e2e/settings.spec.ts:50:1 › S-3 (U-4): wrong current password is rejected; correct one rotates the password (13.1s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×6
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  141 [desktop-1280] › e2e/admin-locations.spec.ts:743:3 › L2a locations console › LT-8 verb reachability: every verb and the save button are inside the viewport (CT-8 mirror) (4.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37222581720-4-2982-2-qs8yl5@ethio-e2e.invalid)
  ✓  143 [desktop-1280] › e2e/admin-locations.spec.ts:799:3 › L2a locations console › LT-9a roster shape, table twin: the edit icon sits in the end column with pagination (2.0s)
  -  144 [desktop-1280] › e2e/admin-locations.spec.ts:818:3 › L2a locations console › LT-9b roster shape, card twin: the edit icon sits inline beside the path line
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37222581720-4-2982-2-qs8yl5@ethio-e2e.invalid)
  ✓  142 [desktop-1280] › e2e/admin-roles.spec.ts:418:3 › U2 roles console › RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC (9.0s)
  ✓  145 [desktop-1280] › e2e/admin-locations.spec.ts:844:3 › L2a locations console › LT-10 tones: retired is destructive, active is secondary, a level badge is outline (3.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37222581720-4-2982-3-km66xl@ethio-e2e.invalid)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37222581720-4-2982-2-qs8yl5@ethio-e2e.invalid)
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
✓  154 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:422:3 › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371) (9.3s)
  ✓  156 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:436:3 › POSTING WIZARD › PW-94 a listing card prints its price period (6.6s)
  ✓  155 [desktop-1280] › e2e/post-wizard-place.spec.ts:882:3 › POSTING WIZARD › PW-31 the market select waits for the prefill chain and never preselects (12.7s)
  ✓  158 [desktop-1280] › e2e/post-wizard-place.spec.ts:921:3 › POSTING WIZARD › PW-20 where: the default place lists itself, is ticked, and a lone city box offers no Remove (9.6s)
  ✓  157 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:458:3 › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal (12.6s)
  ✓  159 [desktop-1280] › e2e/post-wizard-place.spec.ts:1010:3 › POSTING WIZARD › PW-33 a region alone never lists itself; its city does (W6 R2) (10.7s)
  ✓  160 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:482:3 › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301) (10.3s)
  ✓  162 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:534:3 › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) (9.1s)
  ✓  161 [desktop-1280] › e2e/post-wizard-place.spec.ts:1060:3 › POSTING WIZARD › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city (16.1s)
```

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
