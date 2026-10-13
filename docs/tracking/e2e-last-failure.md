# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38338617804
- Commit: `506d4a4e7ffaca6c28d0c3f9ceeec0b85330cdc4`
- Attempt: 1
- Written (UTC): 2026-10-13T03:05:35.935Z
- Passed: 148 · Skipped: 50 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email
- Sources without results: shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

94 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 10 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 4 | shard 3, shard 6 |
| `categories badHeader` (quiet) | 2 | shard 2, shard 5 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `categories wrongFile` (quiet) | 2 | shard 2, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-j<n>rcyr: e<n>e_par_e<n>demy → e<n>e_chi_<n>thezu` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qm<n>jtk: e<n>e_par_knm<n>ik → e<n>e_chi_xyyvtl` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×10 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-j<n>rcyr: e<n>e_par_e<n>demy → e<n>e_chi_<n>thezu ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-qm<n>jtk: e<n>e_par_knm<n>ik → e<n>e_chi_xyyvtl ×1

Off the allowlist:

### listing not found

- Count: 4 · Sources: shard 3, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email · unavailable: shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-13T02:49:13.886Z | 14.5 min |
| email | 2026-10-13T02:49:16.489Z | 0.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 168 | 9.4 min | smoke |
| `auth-signout.spec.ts` | 22 | 4.0 min | smoke |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `smoke-auth-i18n.spec.ts` | 2 | 0.3 min | smoke |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 26.7 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 26.2 s |
| `shell.spec.ts` › LS-10 a saved area beats the deepest guess | desktop-1280 | 19.9 s |
| `shell.spec.ts` › TR-37 the account carries onto a starless device, and never over a star | mobile-360 | 18.8 s |
| `auth-signout.spec.ts` › SP-6 stale stamps from a previous session never sign the new one out | desktop-1280 | 18.8 s |
| `auth-signout.spec.ts` › SP-6 stale stamps from a previous session never sign the new one out | mobile-360 | 18.2 s |
| `shell.spec.ts` › LS-10 a saved area beats the deepest guess | mobile-360 | 17.9 s |
| `shell.spec.ts` › LS-2 a pick is remembered, clearing forgets it | desktop-1280 | 16.9 s |
| `shell.spec.ts` › LS-8 a city name alone selects that city | desktop-1280 | 16.3 s |
| `shell.spec.ts` › long location names share one 32px line | mobile-360 | 16.1 s |
| `shell.spec.ts` › LS-7 a region code alone selects the region | mobile-360 | 15.9 s |
| `shell.spec.ts` › LS-13 a second city stops the auto-select at the region | desktop-1280 | 15.8 s |
| `shell.spec.ts` › LS-9 coordinates far from every metro stop at the market | mobile-360 | 15.8 s |
| `shell.spec.ts` › LS-8 a city name alone selects that city | mobile-360 | 15.8 s |
| `shell.spec.ts` › LS-7 a region code alone selects the region | desktop-1280 | 15.3 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38338617804-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38338617804-email
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-qm0jtk: e2e_par_knm3ik → e2e_chi_xyyvtl
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
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
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-j0rcyr: e2e_par_e5demy → e2e_chi_6thezu
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

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38338617804-1-3046-2-yarizn@ethio-e2e.invalid)
  ✓  127 [mobile-360] › e2e/admin-countries.spec.ts:213:3 › L2b countries console › CO-5 profile round trip: units, currency and order are saved and read back (13.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38338617804-1-3046-2-yarizn@ethio-e2e.invalid)
  ✓  126 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:1240:3 › CAT-IE categories import/export › CT-37 undoing a category delete restores its attribute links or names the skipped ones (26.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38338617804-1-3046-3-6yvrxx@ethio-e2e.invalid)
  ✓  128 [mobile-360] › e2e/admin-countries.spec.ts:243:3 › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row (13.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38338617804-1-3046-2-yarizn@ethio-e2e.invalid)
  ✓  129 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:1373:3 › CAT-IE categories import/export › CT-35 an imported category name is in the name table after commit and gone after undo (16.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38338617804-1-3046-3-6yvrxx@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-qm0jtk: e2e_par_knm3ik → e2e_chi_xyyvtl
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
✓  176 [mobile-360] › e2e/post-wizard-category.spec.ts:181:3 › POSTING WIZARD › PW-1 the shell renders one step of eight, Back and Next both closed (15.2s)
  ✓  177 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:658:3 › POSTING WIZARD — bundle 2 place and contact › PW-150 a saved seller name offers no suggestions until its box is cleared (19.5s)
  ✓  178 [mobile-360] › e2e/post-wizard-category.spec.ts:206:3 › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once (13.1s)
  ✓  179 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:693:3 › POSTING WIZARD — bundle 2 place and contact › PW-151 the account card shows the name and each saved channel with whether buyers see it (8.7s)
  ✓  180 [mobile-360] › e2e/post-wizard-category.spec.ts:230:3 › POSTING WIZARD › PW-52 a category with an icon name shows its glyph; one without shows none (D38) (11.3s)
  ✓  181 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:722:3 › POSTING WIZARD — bundle 2 place and contact › PW-148 Next refuses at the empty name box: public name, first and last for a person, business name for a business (bundle 4 step 22, INC-423) (16.6s)
  ✓  182 [mobile-360] › e2e/post-wizard-category.spec.ts:267:3 › POSTING WIZARD › PW-53 Back responds after typing in Find a category (INC-277) (13.7s)
  ✓  183 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:757:3 › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved (17.6s)
  ✓  184 [mobile-360] › e2e/post-wizard-category.spec.ts:307:3 › POSTING WIZARD › PW-62 a level follows pointer order, a guest follows the host's own children, and the home is the flagged pointer (DEC-080) (17.5s)
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
[WebServer] [map] fallback provider=osm reason=e2e
[WebServer] [map] fallback provider=osm reason=e2e
[WebServer] [map] fallback provider=osm reason=e2e
[WebServer] [map] fallback provider=osm reason=e2e
[WebServer] [map] fallback provider=osm reason=e2e
[WebServer] [map] fallback provider=osm reason=e2e
[WebServer] [map] fallback provider=osm reason=e2e
  ✓  119 [mobile-360] › e2e/posting-routes-dials.spec.ts:199:3 › POSTING DOOR DIALS › PR-33 the map fallback report is capped at 60 an hour per address (6.1s)
  ✓  117 [mobile-360] › e2e/posting-routes-identity.spec.ts:47:3 › POSTING ROUTES — IDENTITY GATE › PR-26 the imitation check is rate-gated before the model is asked (22.8s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  113 [desktop-1280] › e2e/admin-categories-console.spec.ts:696:3 › C2 categories console › CT-11 roster controls: missing-assets filter (in Filters, as a chip) and a device page size (in the footer) (21.5s)
  ✓  115 [desktop-1280] › e2e/admin-categories-console.spec.ts:751:3 › C2 categories console › CT-29 every ratified category renders its own glyph, not the fallback (13.5s)
  ✓  114 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:561:3 › C2 categories console › CT-17 create flow: two steps, chained countries + position, image (23.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38338617804-4-3042-3-ecm8rh@ethio-e2e.invalid)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38338617804-4-3042-2-9lmg00@ethio-e2e.invalid)
  ✓  117 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:935:3 › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op (8.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38338617804-4-3042-3-ecm8rh@ethio-e2e.invalid)
  ✓  118 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:990:3 › CAT-IE categories import/export › CT-19 a create and a rename commit through the doors and undo (18.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38338617804-4-3042-3-ecm8rh@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-j0rcyr: e2e_par_e5demy → e2e_chi_6thezu
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  149 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:434:3 › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing (17.8s)
  ✓  152 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:473:3 › POSTING WIZARD — bundle 2 place and contact › PW-134 names typed during the identity read survive it and are saved (23.7s)
  ✓  151 [desktop-1280] › e2e/photo-pipeline.spec.ts:223:3 › PHOTO PIPELINE › PP-6 another seller's listing is a 403 (33.3s)
  ✓  153 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:542:3 › POSTING WIZARD — bundle 2 place and contact › PW-130 a refused seller name offers three free names, claimed on save (23.5s)
  ✓  155 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:589:3 › POSTING WIZARD — bundle 2 place and contact › PW-147 an empty seller-name box offers three names from the typed names; a saved name offers none until cleared (bundle 4 step 21, INC-422) (15.4s)
  ✓  154 [desktop-1280] › e2e/photo-pipeline.spec.ts:247:3 › PHOTO PIPELINE › PP-7 the eleventh photo is refused tooManyPhotos (40.1s)
  ✓  156 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:658:3 › POSTING WIZARD — bundle 2 place and contact › PW-150 a saved seller name offers no suggestions until its box is cleared (18.0s)
  ✓  158 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:693:3 › POSTING WIZARD — bundle 2 place and contact › PW-151 the account card shows the name and each saved channel with whether buyers see it (13.7s)
  ✓  157 [desktop-1280] › e2e/photo-pipeline.spec.ts:267:3 › PHOTO PIPELINE › PP-8 DELETE removes the row and the objects; POST makes a photo the cover (24.2s)
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
✓  189 [desktop-1280] › e2e/shell.spec.ts:1771:3 › desktop layout laws (U0g) › L3: the footer spans the full width beneath the fixed rail (831ms)
  ✓  190 [desktop-1280] › e2e/shell.spec.ts:1835:3 › desktop layout laws (U0g) › U0i: the rail ends at the footer top and its last item stays reachable (1.0s)
  -  191 [desktop-1280] › e2e/shell.spec.ts:1862:3 › desktop layout laws (U0g) › the tall fixture does not overflow horizontally at 360
  ✓  183 [desktop-1280] › e2e/posting-routes.spec.ts:706:3 › POSTING ROUTES › PR-17 the draft route refuses a region-only place and accepts a city and a sub-city (14.2s)
  ✓  192 [desktop-1280] › e2e/shell.spec.ts:1894:3 › i18n gate is non-blocking (U4f-2) › TR-36 the header renders while the languages read is still in flight (658ms)
  ✓  194 [desktop-1280] › e2e/shell.spec.ts:1906:3 › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves (9.4s)
  ✓  193 [desktop-1280] › e2e/posting-routes.spec.ts:743:3 › POSTING ROUTES › PR-18 the draft route accepts a 5000-character description and refuses 5001 (14.5s)
  ✓  195 [desktop-1280] › e2e/shell.spec.ts:1962:3 › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out (10.0s)
  ✓  196 [desktop-1280] › e2e/posting-routes.spec.ts:785:3 › POSTING ROUTES › PR-16 a model question that matters is required by the draft route (DEC-086) (14.7s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```
