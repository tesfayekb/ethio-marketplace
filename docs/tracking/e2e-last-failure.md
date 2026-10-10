# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38037552627
- Commit: `2c9869918afac570c48bc74d3924b395eee4c3de`
- Attempt: 1
- Written (UTC): 2026-10-10T08:38:35.190Z
- Passed: 147 · Skipped: 50 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email
- Sources without results: shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

93 line(s), 35 message(s): 1 off the allowlist, 34 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 10 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 3 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>bgs<n>p: e<n>e_par_<n>afhf<n> → e<n>e_chi_buub<n>z` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-khsb<n>y: e<n>e_par_v<n>xd<n>q → e<n>e_chi_e<n>t<n>` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×10 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>bgs<n>p: e<n>e_par_<n>afhf<n> → e<n>e_chi_buub<n>z ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-khsb<n>y: e<n>e_par_v<n>xd<n>q → e<n>e_chi_e<n>t<n> ×1

Off the allowlist:

### listing not found

- Count: 3 · Sources: shard 3, shard 6

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
| smoke | 2026-10-10T08:22:01.019Z | 15.5 min |
| email | 2026-10-10T08:22:04.793Z | 0.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 168 | 9.8 min | smoke |
| `auth-signout.spec.ts` | 22 | 4.5 min | smoke |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `smoke-auth-i18n.spec.ts` | 2 | 0.4 min | smoke |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 28.1 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 25.4 s |
| `shell.spec.ts` › LS-10 a saved area beats the deepest guess | mobile-360 | 22.3 s |
| `shell.spec.ts` › TR-28 the account carries onto a starless device, and never over a star | desktop-1280 | 21.2 s |
| `auth-signout.spec.ts` › SP-6 stale stamps from a previous session never sign the new one out | mobile-360 | 20.0 s |
| `shell.spec.ts` › LS-10 a saved area beats the deepest guess | desktop-1280 | 19.8 s |
| `shell.spec.ts` › TR-28 the account carries onto a starless device, and never over a star | mobile-360 | 18.7 s |
| `a11y.spec.ts` › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y | desktop-1280 | 17.4 s |
| `auth-signout.spec.ts` › SO-3b reload path: a cleared token means /admin never renders on mount | mobile-360 | 17.3 s |
| `shell.spec.ts` › LS-2 a pick is remembered, clearing forgets it | mobile-360 | 17.3 s |
| `shell.spec.ts` › LS-13 a second city stops the auto-select at the region | desktop-1280 | 17.0 s |
| `auth-signout.spec.ts` › SP-6 stale stamps from a previous session never sign the new one out | desktop-1280 | 16.8 s |
| `shell.spec.ts` › LS-7 a region code alone selects the region | desktop-1280 | 16.5 s |
| `shell.spec.ts` › LS-9 coordinates far from every metro stop at the market | desktop-1280 | 16.2 s |
| `auth-signout.spec.ts` › SP-2 stay signed in extends past the original deadline | desktop-1280 | 15.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38037552627-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38037552627-email
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-khsb5y: e2e_par_v9xd3q → e2e_chi_e845t2
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-8bgs7p: e2e_par_8afhf9 → e2e_chi_buub6z
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
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  122 [mobile-360] › e2e/admin-countries.spec.ts:230:3 › L2b countries console › CO-6 rail order: two roots are stored in position order, and the reset removes every row (14.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38037552627-1-2814-3-yzoukq@ethio-e2e.invalid)
  ✓  121 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:1127:3 › CAT-IE categories import/export › CT-37 undoing a category delete restores its attribute links or names the skipped ones (27.6s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38037552627-1-2814-2-rpst62@ethio-e2e.invalid)
  ✓  123 [mobile-360] › e2e/admin-countries.spec.ts:337:3 › L2b countries console › CO-7 transfer: the markets file round-trips through this toolbar and the undo puts it back (21.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38037552627-1-2814-3-yzoukq@ethio-e2e.invalid)
  ✓  125 [mobile-360] › e2e/admin-countries.spec.ts:391:3 › L2b countries console › CO-8 geometry: nothing overflows and every verb is reachable in both twins (8.1s)
  ✓  124 [mobile-360] › e2e/admin-categories-lifecycle.spec.ts:1260:3 › CAT-IE categories import/export › CT-35 an imported category name is in the name table after commit and gone after undo (21.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38037552627-1-2814-2-rpst62@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-khsb5y: e2e_par_v9xd3q → e2e_chi_e845t2
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  154 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:797:3 › POSTING WIZARD — bundle 2 place and contact › PW-122 an empty phone box opens on the country of the item's place (15.4s)
  ✓  153 [mobile-360] › e2e/post-wizard-category.spec.ts:503:3 › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable (21.7s)
  ✓  155 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:817:3 › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried (18.0s)
  ✓  156 [mobile-360] › e2e/post-wizard-category.spec.ts:566:3 › POSTING WIZARD › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15) (27.9s)
  ✓  157 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:845:3 › POSTING WIZARD — bundle 2 place and contact › PW-124 the phone box shows an example and a length hint per country (16.0s)
  ✓  158 [mobile-360] › e2e/post-wizard-category.spec.ts:680:3 › POSTING WIZARD › PW-7 a draft resumes at the next step, and only for its owner (17.9s)
  ✓  159 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:869:3 › POSTING WIZARD — bundle 2 place and contact › PW-125 the phone box keeps digits only and saves the number as read (17.6s)
  ✓  161 [mobile-360] › e2e/post-wizard-bundle2.spec.ts:895:3 › POSTING WIZARD — bundle 2 place and contact › PW-127 picking a home country only selects; Next refuses until it is confirmed (17.9s)
  ✓  160 [mobile-360] › e2e/post-wizard-category.spec.ts:721:3 › POSTING WIZARD › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step (46.8s)
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
  ✓   89 [mobile-360] › e2e/posting-routes-dials.spec.ts:199:3 › POSTING DOOR DIALS › PR-33 the map fallback report is capped at 60 an hour per address (21.3s)
  ✓   88 [mobile-360] › e2e/posting-routes-catalog.spec.ts:267:3 › POSTING ROUTES — catalogue changes › PR-41 the door refuses an answer the chosen options do not allow (31.9s)
  ✓   90 [mobile-360] › e2e/posting-routes-identity.spec.ts:47:3 › POSTING ROUTES — IDENTITY GATE › PR-26 the imitation check is rate-gated before the model is asked (24.0s)
  ✓   92 [mobile-360] › e2e/posting-routes-identity.spec.ts:94:3 › POSTING ROUTES — IDENTITY GATE › PR-43 the owner's own client cannot write the profile; the identity route still can (15.2s)
  ✓   91 [mobile-360] › e2e/posting-routes-catalog.spec.ts:400:3 › POSTING ROUTES — catalogue changes › PR-42 the door reads a padded answer as the value it stores (32.0s)
  ✓   93 [mobile-360] › e2e/posting-routes.spec.ts:93:3 › POSTING ROUTES › PR-1 the draft route sets the observed residency from the edge exactly once (14.8s)
  ✓   94 [mobile-360] › e2e/posting-routes-catalog.spec.ts:549:3 › POSTING ROUTES — catalogue changes › PR-37 coverage first appearance is stored once, renumbered in either order (32.9s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  110 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:822:3 › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op (5.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38037552627-4-3069-2-gunciz@ethio-e2e.invalid)
  ✓  109 [desktop-1280] › e2e/admin-categories-console.spec.ts:691:3 › C2 categories console › CT-11 roster controls: missing-assets filter and a device page size (11.5s)
  ✓  112 [desktop-1280] › e2e/admin-categories-console.spec.ts:740:3 › C2 categories console › CT-29 every ratified category renders its own glyph, not the fallback (13.3s)
  ✓  111 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:877:3 › CAT-IE categories import/export › CT-19 a create and a rename commit through the doors and undo (18.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38037552627-4-3069-2-gunciz@ethio-e2e.invalid)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38037552627-4-3069-3-zdsi62@ethio-e2e.invalid)
  ✓  114 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:952:3 › CAT-IE categories import/export › CT-36 a created leaf gets its secondary parents and the undo removes both pointers (20.3s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38037552627-4-3069-2-gunciz@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-8bgs7p: e2e_par_8afhf9 → e2e_chi_buub6z
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  156 [desktop-1280] › e2e/post-wizard-category.spec.ts:721:3 › POSTING WIZARD › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step (31.0s)
  ✓  158 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:988:3 › POSTING WIZARD — bundle 2 place and contact › PW-128 a number typed before the phone library arrives is saved only once read (17.7s)
  ✓  159 [desktop-1280] › e2e/post-wizard-category.spec.ts:811:3 › POSTING WIZARD › PW-8 an unreachable save keeps the answers, says so, and retries (16.1s)
  ✓  160 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:1031:3 › POSTING WIZARD — bundle 2 place and contact › PW-126 a carried number reopens grouped (16.3s)
  ✓  161 [desktop-1280] › e2e/post-wizard-category.spec.ts:921:3 › POSTING WIZARD › PW-71 the category group wears the soft border until a leaf is chosen (D71) (22.9s)
  -  163 [desktop-1280] › e2e/post-wizard-category.spec.ts:1032:3 › POSTING WIZARD › PW-27 the mobile strip walks back to a step already done, and no further
  ✓  162 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:1068:3 › POSTING WIZARD — bundle 2 place and contact › PW-115 without own_place the last post's pin, directions and details carry over (19.4s)
  ✓  164 [desktop-1280] › e2e/post-wizard-category.spec.ts:1070:3 › POSTING WIZARD › PW-14 D20: a signed-out visitor is sent to sign in with a return path, comes back, and a foreign return is ignored (10.3s)
  ✓  165 [desktop-1280] › e2e/post-wizard-bundle2.spec.ts:1094:3 › POSTING WIZARD — bundle 2 place and contact › PW-116 an own_place category never carries the last post's pin (22.1s)
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
✓   89 [desktop-1280] › e2e/posting-routes-dials.spec.ts:199:3 › POSTING DOOR DIALS › PR-33 the map fallback report is capped at 60 an hour per address (20.8s)
  ✓   91 [desktop-1280] › e2e/posting-routes-identity.spec.ts:47:3 › POSTING ROUTES — IDENTITY GATE › PR-26 the imitation check is rate-gated before the model is asked (22.3s)
  ✓   90 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:400:3 › POSTING ROUTES — catalogue changes › PR-42 the door reads a padded answer as the value it stores (29.6s)
  ✓   92 [desktop-1280] › e2e/posting-routes-identity.spec.ts:94:3 › POSTING ROUTES — IDENTITY GATE › PR-43 the owner's own client cannot write the profile; the identity route still can (13.5s)
  ✓   94 [desktop-1280] › e2e/posting-routes.spec.ts:93:3 › POSTING ROUTES › PR-1 the draft route sets the observed residency from the edge exactly once (13.9s)
  ✓   93 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:549:3 › POSTING ROUTES — catalogue changes › PR-37 coverage first appearance is stored once, renumbered in either order (23.0s)
  ✓   95 [desktop-1280] › e2e/posting-routes.spec.ts:123:3 › POSTING ROUTES › PR-2 an incomplete step is the door's own refusal, at status 200 (14.9s)
  ✓   96 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:596:3 › POSTING ROUTES — catalogue changes › PR-38 owner's client cannot insert, update or delete coverage; the route can (21.4s)
  ✓   97 [desktop-1280] › e2e/posting-routes.spec.ts:151:3 › POSTING ROUTES › PR-10 a pricing basis is the door's own refusal by name, at status 200 (DEC-079) (15.7s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```
