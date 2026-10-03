# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37157449618
- Commit: `fb53f29460d7d76de16b29d4d171dc452f7cf1c6`
- Attempt: 1
- Written (UTC): 2026-10-03T22:24:30.956Z
- Passed: 184 · Skipped: 31 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, changed
- Sources without results: shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

111 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 11 | shard 3, shard 6, changed |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
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

- Count: 11 · Sources: shard 3, shard 6, changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, changed · unavailable: shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-03T22:10:07.687Z | 13.0 min |
| email | 2026-10-03T22:10:06.583Z | 0.2 min |
| changed | 2026-10-03T22:10:12.879Z | 6.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 126 | 8.3 min | smoke |
| `posting-routes.spec.ts` | 38 | 6.2 min | changed |
| `post-wizard-bundle2.spec.ts` | 22 | 5.9 min | changed |
| `auth-signout.spec.ts` | 22 | 3.7 min | smoke |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `smoke-auth-i18n.spec.ts` | 2 | 0.2 min | smoke |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 31.1 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | desktop-1280 | 30.7 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 27.9 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 24.3 s |
| `post-wizard-bundle2.spec.ts` › PW-119 another seller's visible phone is never carried | desktop-1280 | 23.3 s |
| `posting-routes.spec.ts` › PR-17 the draft route refuses a region-only place and accepts a city and a sub-city | desktop-1280 | 21.7 s |
| `post-wizard-bundle2.spec.ts` › PW-123 Post another ad opens step 1 with no draft carried | desktop-1280 | 21.4 s |
| `shell.spec.ts` › LS-10 a saved area beats the deepest guess | desktop-1280 | 21.4 s |
| `post-wizard-bundle2.spec.ts` › PW-115 without own_place the last post's pin, directions and details carry over | desktop-1280 | 20.3 s |
| `auth-signout.spec.ts` › SP-6 stale stamps from a previous session never sign the new one out | mobile-360 | 20.2 s |
| `post-wizard-bundle2.spec.ts` › PW-119 another seller's visible phone is never carried | mobile-360 | 18.8 s |
| `shell.spec.ts` › LS-2 a pick is remembered, clearing forgets it | mobile-360 | 18.7 s |
| `post-wizard-bundle2.spec.ts` › PW-123 Post another ad opens step 1 with no draft carried | mobile-360 | 17.7 s |
| `post-wizard-bundle2.spec.ts` › PW-118 a draft's own channel is never overwritten by the last post's | mobile-360 | 17.6 s |
| `shell.spec.ts` › LS-2 a pick is remembered, clearing forgets it | desktop-1280 | 17.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37157449618-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37157449618-email
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37157449618-changed
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

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37157449618-1-3128-3-7ilwle@ethio-e2e.invalid)
  ✓  119 [mobile-360] › e2e/admin-coverage.spec.ts:207:3 › L2b coverage console › CV-7 photo cap: the plan's photo cap round-trips through the door (D22) (3.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37157449618-1-3128-2-i5teki@ethio-e2e.invalid)
  ✓  120 [mobile-360] › e2e/admin-locations.spec.ts:142:3 › L2a locations console › LT-2 roster: the seeded ET tree renders, an alias narrows the search, the level filter scopes, nothing overflows (4.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37157449618-1-3128-3-7ilwle@ethio-e2e.invalid)
  ✓  121 [mobile-360] › e2e/admin-coverage.spec.ts:249:3 › L2b coverage console › CV-4 refusal: a limit below one is refused by name and nothing is saved (2.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37157449618-1-3128-2-i5teki@ethio-e2e.invalid)
  ✓  123 [mobile-360] › e2e/admin-coverage.spec.ts:271:3 › L2b coverage console › CV-5 add: a scratch plan is created through the door and seen in the roster (7.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37157449618-1-3128-2-i5teki@ethio-e2e.invalid)
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
✓  155 [mobile-360] › e2e/post-wizard-category.spec.ts:1294:3 › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review (20.9s)
  ✓  157 [mobile-360] › e2e/post-wizard-place.spec.ts:921:3 › POSTING WIZARD › PW-20 where: the default place lists itself, is ticked, and a lone city box offers no Remove (12.4s)
  ✓  158 [mobile-360] › e2e/post-wizard-place.spec.ts:1006:3 › POSTING WIZARD › PW-33 a region alone never lists itself; its city does (W6 R2) (10.7s)
  ✓  159 [mobile-360] › e2e/post-wizard-place.spec.ts:1052:3 › POSTING WIZARD › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city (22.7s)
  ✓  160 [mobile-360] › e2e/post-wizard-place.spec.ts:1144:3 › POSTING WIZARD › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched (19.6s)
  ✓  161 [mobile-360] › e2e/post-wizard-place.spec.ts:1183:3 › POSTING WIZARD › PW-82 the add buttons follow the plan's own limits (12.0s)
  ✓  162 [mobile-360] › e2e/post-wizard-place.spec.ts:1250:3 › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact (8.6s)
  ✓  163 [mobile-360] › e2e/post-wizard-place.spec.ts:1283:3 › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line (9.8s)
  ✓  164 [mobile-360] › e2e/post-wizard-place.spec.ts:1317:3 › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point (11.2s)
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
✓  132 [mobile-360] › e2e/shell.spec.ts:784:3 › dark mode › the toggle flips the mode and the surfaces actually change (1.1s)
  ✓  133 [mobile-360] › e2e/shell.spec.ts:807:3 › mobile chrome › rail is a drawer behind the hamburger (902ms)
  ✓  134 [mobile-360] › e2e/shell.spec.ts:823:3 › mobile chrome › the drawer switcher NAVIGATES to the panel's home (U0e) (5.7s)
  ✓  135 [mobile-360] › e2e/shell.spec.ts:850:3 › mobile chrome › the drawer logo block matches the top bar's divider and height (821ms)
  ✓  136 [mobile-360] › e2e/shell.spec.ts:868:3 › mobile chrome › the rail-collapse toggle does not exist on mobile (698ms)
  ✓  137 [mobile-360] › e2e/shell.spec.ts:877:3 › mobile chrome › no Settings item leaks into the mobile category drawer (825ms)
  ✓  138 [mobile-360] › e2e/shell.spec.ts:886:3 › mobile chrome › search opens a full-width row BELOW the bar (726ms)
  ✓  139 [mobile-360] › e2e/shell.spec.ts:900:3 › mobile chrome › no horizontal overflow and text stays legible at 360 (619ms)
  ✓  140 [mobile-360] › e2e/shell.spec.ts:918:3 › mobile chrome › primary touch targets are at least 44px (897ms)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×6
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37157449618-4-2859-3-tseau3@ethio-e2e.invalid)
  ✓  127 [desktop-1280] › e2e/admin-roles.spec.ts:178:3 › U2 roles console › RP-2 create: a super admin creates a custom role through step-up (7.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37157449618-4-2859-3-tseau3@ethio-e2e.invalid)
  ✓  126 [desktop-1280] › e2e/admin-locations.spec.ts:219:3 › L2a locations console › LT-3 create chain: region → city → sub-city are born retired with their ancestry filled, and activate top-down (21.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37157449618-4-2859-2-ljoxr1@ethio-e2e.invalid)
  ✓  128 [desktop-1280] › e2e/admin-roles.spec.ts:191:3 › U2 roles console › RP-3 matrix: grant then revoke a benign permission, persisted across reload (17.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37157449618-4-2859-3-tseau3@ethio-e2e.invalid)
  ✓  130 [desktop-1280] › e2e/admin-roles.spec.ts:221:3 › U2 roles console › RP-4 system lock: super_admin role is read-only in UI and refused by the RPCs (2.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37157449618-4-2859-3-tseau3@ethio-e2e.invalid)
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
✓  127 [desktop-1280] › e2e/post-wizard-category.spec.ts:956:3 › POSTING WIZARD › PW-15 the posting entry lives in My Listings, not in Account (9.8s)
  ✓  129 [desktop-1280] › e2e/post-wizard-category.spec.ts:1000:3 › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap (11.7s)
  ✓  128 [desktop-1280] › e2e/post-wizard-place.spec.ts:268:3 › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan (20.1s)
  ✓  130 [desktop-1280] › e2e/post-wizard-category.spec.ts:1035:3 › POSTING WIZARD › PW-36 a category surfaced under a second root appears under it in the tree (8.4s)
  ✓  132 [desktop-1280] › e2e/post-wizard-category.spec.ts:1073:3 › POSTING WIZARD › PW-46 a category created with a secondary parent reaches the tree inside the cache window (10.5s)
  ✓  131 [desktop-1280] › e2e/post-wizard-place.spec.ts:441:3 › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored (19.2s)
  ✓  133 [desktop-1280] › e2e/post-wizard-category.spec.ts:1139:3 › POSTING WIZARD › PW-47 a level lists the host's own children first, guests next and other- last (10.3s)
  ✓  134 [desktop-1280] › e2e/post-wizard-place.spec.ts:543:3 › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged (12.3s)
  ✓  135 [desktop-1280] › e2e/post-wizard-category.spec.ts:1202:3 › POSTING WIZARD › PW-44 a dependent list on a surfaced leaf narrows by its parent (10.1s)
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

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  141 [desktop-1280] › e2e/shell.spec.ts:1754:3 › L4b location picker › LS-1 the cascade reaches a sub-city (9.3s)
  ✓  142 [desktop-1280] › e2e/shell.spec.ts:1772:3 › L4b location picker › LS-2 a pick is remembered, clearing forgets it (15.3s)
  ✓  143 [desktop-1280] › e2e/shell.spec.ts:1805:3 › L4b location picker › LS-3 an open market is guessed from the edge country, never saved (838ms)
  ✓  144 [desktop-1280] › e2e/shell.spec.ts:1822:3 › L4b location picker › LS-4 a closed market is not guessed (900ms)
  ✓  145 [desktop-1280] › e2e/shell.spec.ts:1841:3 › L4b location picker › LS-5 no header and no cookie: no guess, and the markets route caches (719ms)
  ✓  146 [desktop-1280] › e2e/shell.spec.ts:1939:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (8.6s)
  ✓  147 [desktop-1280] › e2e/shell.spec.ts:1968:3 › L4b location picker › LS-7 a region code alone selects the region (15.6s)
  ✓  148 [desktop-1280] › e2e/shell.spec.ts:1996:3 › L4b location picker › LS-8 a city name alone selects that city (15.2s)
  ✓  149 [desktop-1280] › e2e/shell.spec.ts:2018:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (14.8s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```
