# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37177199928
- Commit: `3abfd1dacbf6677fa30e6fea683519eb244740a9`
- Attempt: 1
- Written (UTC): 2026-10-04T04:43:37.679Z
- Passed: 39 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email, changed
- Sources without results: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

97 line(s), 34 message(s): 1 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 10 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 3, shard 6 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `categories badHeader` (quiet) | 2 | shard 2, shard 5 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `categories wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed duplicate key value violates unique constraint <q>` (quiet) | 2 | shard 1, shard 4 |
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
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |

Quiet (allowlisted): digest mismatch ×10 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · commit_failed duplicate key value violates unique constraint <q> ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: email, changed · unavailable: smoke, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| email | 2026-10-04T04:31:42.065Z | 0.2 min |
| changed | 2026-10-04T04:31:43.698Z | 6.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 38 | 12.9 min | changed |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 35.1 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | desktop-1280 | 34.9 s |
| `post-wizard-bundle2.spec.ts` › PW-119 another seller's visible phone is never carried | mobile-360 | 30.6 s |
| `post-wizard-bundle2.spec.ts` › PW-119 another seller's visible phone is never carried | desktop-1280 | 27.9 s |
| `post-wizard-bundle2.spec.ts` › PW-123 Post another ad opens step 1 with no draft carried | desktop-1280 | 24.5 s |
| `post-wizard-bundle2.spec.ts` › PW-123 Post another ad opens step 1 with no draft carried | mobile-360 | 23.8 s |
| `post-wizard-bundle2.spec.ts` › PW-131 an imitating name is refused when the step is saved | mobile-360 | 22.9 s |
| `post-wizard-bundle2.spec.ts` › PW-131 an imitating name is refused when the step is saved | desktop-1280 | 22.5 s |
| `post-wizard-bundle2.spec.ts` › PW-116 an own_place category never carries the last post's pin | mobile-360 | 21.7 s |
| `post-wizard-bundle2.spec.ts` › PW-114 a second phone appears on request and is stored as phone2 | desktop-1280 | 21.2 s |
| `post-wizard-bundle2.spec.ts` › PW-132 a non-Latin seller name shows the Latin line as the refusal | mobile-360 | 21.1 s |
| `post-wizard-bundle2.spec.ts` › PW-114 a second phone appears on request and is stored as phone2 | mobile-360 | 21.0 s |
| `post-wizard-bundle2.spec.ts` › PW-116 an own_place category never carries the last post's pin | desktop-1280 | 21.0 s |
| `post-wizard-bundle2.spec.ts` › PW-132 a non-Latin seller name shows the Latin line as the refusal | desktop-1280 | 20.7 s |
| `post-wizard-bundle2.spec.ts` › PW-130 a refused seller name offers three free names, claimed on save | mobile-360 | 20.4 s |

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37177199928-email
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37177199928-changed
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  113 [desktop-1280] › e2e/shell.spec.ts:784:3 › dark mode › the toggle flips the mode and the surfaces actually change (1.2s)
  -  114 [desktop-1280] › e2e/shell.spec.ts:807:3 › mobile chrome › rail is a drawer behind the hamburger
  -  115 [desktop-1280] › e2e/shell.spec.ts:823:3 › mobile chrome › the drawer switcher NAVIGATES to the panel's home (U0e)
  -  116 [desktop-1280] › e2e/shell.spec.ts:850:3 › mobile chrome › the drawer logo block matches the top bar's divider and height
  -  117 [desktop-1280] › e2e/shell.spec.ts:868:3 › mobile chrome › the rail-collapse toggle does not exist on mobile
  -  118 [desktop-1280] › e2e/shell.spec.ts:877:3 › mobile chrome › no Settings item leaks into the mobile category drawer
  -  119 [desktop-1280] › e2e/shell.spec.ts:886:3 › mobile chrome › search opens a full-width row BELOW the bar
  -  120 [desktop-1280] › e2e/shell.spec.ts:900:3 › mobile chrome › no horizontal overflow and text stays legible at 360
  -  121 [desktop-1280] › e2e/shell.spec.ts:918:3 › mobile chrome › primary touch targets are at least 44px
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[e2e:setup] EN baseline probe unavailable: TypeError: fetch failed (UND_ERR_HEADERS_OVERFLOW) after 4 attempts
--- final 10 lines ---
✓   74 [mobile-360] › e2e/admin-categories-console.spec.ts:282:3 › C2 categories console › CT-4 visibility window: a future window is stored as DB truth (16.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37177199928-1-2927-3-0d88da@ethio-e2e.invalid)
  ✓   76 [mobile-360] › e2e/admin-categories-console.spec.ts:313:3 › C2 categories console › CT-5 exclusions: saving a country set writes the exclusion rows (15.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37177199928-1-2927-3-0d88da@ethio-e2e.invalid)
  ✓   75 [mobile-360] › e2e/admin-categories-images.spec.ts:42:3 › C2 categories console › CI-4 image tab: generate persists three assets and regenerate re-versions them (23.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37177199928-1-2927-2-bqqzul@ethio-e2e.invalid)
  ✓   78 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:44:3 › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up (16.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37177199928-1-2927-2-bqqzul@ethio-e2e.invalid)
  ✓   77 [mobile-360] › e2e/admin-categories-console.spec.ts:343:3 › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home (23.8s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓  124 [mobile-360] › e2e/post-wizard-category.spec.ts:193:3 › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once (10.2s)
  ✓  125 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:430:3 › POSTING WIZARD — bundle 2 place and contact › PW-124 the phone box shows an example and a length hint per country (11.3s)
  ✓  126 [mobile-360] › e2e/post-wizard-category.spec.ts:217:3 › POSTING WIZARD › PW-52 a category with an icon name shows its glyph; one without shows none (D38) (9.4s)
  ✓  127 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:454:3 › POSTING WIZARD — bundle 2 place and contact › PW-125 the phone box keeps digits only and saves the number as read (11.2s)
  ✓  128 [mobile-360] › e2e/post-wizard-category.spec.ts:254:3 › POSTING WIZARD › PW-53 Back responds after typing in Find a category (INC-277) (8.9s)
  ✓  129 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:480:3 › POSTING WIZARD — bundle 2 place and contact › PW-127 picking a home country only selects; Next refuses until it is confirmed (11.8s)
  ✓  130 [mobile-360] › e2e/post-wizard-category.spec.ts:294:3 › POSTING WIZARD › PW-62 a level follows pointer order, a guest follows the host's own children, and the home is the flagged pointer (DEC-080) (10.5s)
  ✓  131 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:529:3 › POSTING WIZARD — bundle 2 place and contact › PW-128 a number typed before the phone library arrives is saved only once read (11.9s)
  ✓  132 [mobile-360] › e2e/post-wizard-category.spec.ts:408:3 › POSTING WIZARD › PW-3 a folder is browsable and never selectable; its leaf is (D11) (7.8s)
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
✓   77 [mobile-360] › e2e/post-wizard-specs.spec.ts:1876:3 › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides (13.5s)
  ✓   79 [mobile-360] › e2e/posting-routes.spec.ts:483:3 › POSTING ROUTES › PR-6 the options route is ETag'd: a conditional repeat costs a 304 (6.7s)
  ✓   81 [mobile-360] › e2e/posting-routes.spec.ts:514:3 › POSTING ROUTES › PR-7 the draft dial refuses by name once the ceiling is reached (6.3s)
  ✓   82 [mobile-360] › e2e/posting-routes.spec.ts:562:3 › POSTING ROUTES › PR-8 no bearer is 401 on every posting route (631ms)
  ✓   80 [mobile-360] › e2e/post-wizard-specs.spec.ts:1938:3 › POSTING WIZARD › PW-49 a prefill-only fact keeps its input while a settled one does not (11.3s)
  ✓   83 [mobile-360] › e2e/posting-routes.spec.ts:570:3 › POSTING ROUTES › PR-9 catalog finder is bounded, multilingual and rate-limited (2.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37177199928-3-3060-2-9zbvmt@ethio-e2e.invalid)
  ✓   85 [mobile-360] › e2e/posting-routes.spec.ts:615:3 › POSTING ROUTES › PR-19 a category import commit refreshes the finder index before any search (3.7s)
  ✓   84 [mobile-360] › e2e/post-wizard-specs.spec.ts:2013:3 › POSTING WIZARD › PW-50 the specifications show every row open in display order (D41) (7.4s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   81 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:211:3 › C2 categories console › CT-14 catch-all law: never a parent, refused server-side, no move verbs (4.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37177199928-4-2855-3-d6fwua@ethio-e2e.invalid)
  ✓   80 [desktop-1280] › e2e/admin-categories-console.spec.ts:343:3 › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home (26.7s)
  ✓   82 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:268:3 › C2 categories console › CT-15 reorder: Move up flips the order with no step-up, catch-all last (13.0s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37177199928-4-2855-3-d6fwua@ethio-e2e.invalid)
  ✓   84 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:395:3 › C2 categories console › CT-16 return path: closing a secondary dialog returns to the open editor (9.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37177199928-4-2855-3-d6fwua@ethio-e2e.invalid)
  ✓   83 [desktop-1280] › e2e/admin-categories-console.spec.ts:438:3 › C2 categories console › CT-7 step-up: the server refuses the write until AAL2 is proven (15.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37177199928-4-2855-2-pmg3ms@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed duplicate key value violates unique constraint "category_attribute_links_card_rank_unique"
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  112 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:480:3 › POSTING WIZARD — bundle 2 place and contact › PW-127 picking a home country only selects; Next refuses until it is confirmed (12.3s)
  ✓  113 [desktop-1280] › e2e/post-wizard-category.spec.ts:294:3 › POSTING WIZARD › PW-62 a level follows pointer order, a guest follows the host's own children, and the home is the flagged pointer (DEC-080) (10.1s)
  ✓  115 [desktop-1280] › e2e/post-wizard-category.spec.ts:408:3 › POSTING WIZARD › PW-3 a folder is browsable and never selectable; its leaf is (D11) (10.7s)
  ✓  114 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:529:3 › POSTING WIZARD — bundle 2 place and contact › PW-128 a number typed before the phone library arrives is saved only once read (15.0s)
  ✓  117 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:572:3 › POSTING WIZARD — bundle 2 place and contact › PW-126 a carried number reopens grouped (10.7s)
  ✓  116 [desktop-1280] › e2e/post-wizard-category.spec.ts:490:3 › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable (14.1s)
  ✓  118 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:609:3 › POSTING WIZARD — bundle 2 place and contact › PW-115 without own_place the last post's pin, directions and details carry over (11.0s)
  ✓  119 [desktop-1280] › e2e/post-wizard-category.spec.ts:553:3 › POSTING WIZARD › PW-7 a draft resumes at the next step, and only for its owner (13.5s)
  ✓  120 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:635:3 › POSTING WIZARD — bundle 2 place and contact › PW-116 an own_place category never carries the last post's pin (10.6s)
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
✓  131 [desktop-1280] › e2e/posting-routes.spec.ts:866:3 › POSTING ROUTES › PR-20 step 5: the counters are server-only; the server path still counts (7.1s)
  ✓  137 [desktop-1280] › e2e/shell.spec.ts:1504:3 › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves (6.1s)
  ✓  139 [desktop-1280] › e2e/shell.spec.ts:1560:3 › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out (7.3s)
  ✓  138 [desktop-1280] › e2e/posting-routes.spec.ts:898:3 › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private (15.4s)
  ✓  141 [desktop-1280] › e2e/posting-routes.spec.ts:943:3 › POSTING ROUTES › PR-22 step 8: attribute tables leave the browser; categories still read (7.0s)
  ✓  140 [desktop-1280] › e2e/shell.spec.ts:1575:3 › U4h device language star › TR-28 the account carries onto a starless device, and never over a star (12.7s)
  ✓  143 [desktop-1280] › e2e/shell.spec.ts:1642:3 › U4h device language star › TR-28 hreflang alternates equal the anon publication gate (1.0s)
  ✓  142 [desktop-1280] › e2e/smoke-auth-i18n.spec.ts:18:1 › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out (3.9s)
  ✓  144 [desktop-1280] › e2e/shell.spec.ts:1754:3 › L4b location picker › LS-1 the cascade reaches a sub-city (3.8s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```
