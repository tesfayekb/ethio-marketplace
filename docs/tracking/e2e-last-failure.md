# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/37715570406
- Commit: `accdd3fe34b18699a5b24590fd97dca41b3f3e9c`
- Attempt: 1
- Written (UTC): 2026-10-08T02:19:57.874Z
- Passed: 315 · Skipped: 42 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email, shard 6, changed
- Sources without results: shard 1, shard 2, shard 3, shard 4, shard 5

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

106 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 2, shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-cjygws: e<n>e_par_dfojwr → e<n>e_chi_oezlkr` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-p<n>cgsi: e<n>e_par_<n>nox<n> → e<n>e_chi_<n>paphd` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-cjygws: e<n>e_par_dfojwr → e<n>e_chi_oezlkr ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-p<n>cgsi: e<n>e_par_<n>nox<n> → e<n>e_chi_<n>paphd ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 2, shard 3, shard 5, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 6, changed · unavailable: shard 1, shard 2, shard 3, shard 4, shard 5

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-08T01:59:52.767Z | 12.0 min |
| email | 2026-10-08T01:59:54.806Z | 0.2 min |
| shard 6 | 2026-10-08T01:59:47.875Z | 15.8 min |
| changed | 2026-10-08T02:00:02.227Z | 0.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 189 | 11.7 min | smoke, shard 6 |
| `post-wizard-specs.spec.ts` | 39 | 8.4 min | shard 6 |
| `post-wizard-resets.spec.ts` | 17 | 4.6 min | shard 6 |
| `post-wizard-where.spec.ts` | 15 | 3.9 min | shard 6 |
| `auth-signout.spec.ts` | 22 | 3.5 min | smoke |
| `posting-routes.spec.ts` | 25 | 3.2 min | shard 6 |
| `posting-routes-catalog.spec.ts` | 9 | 2.2 min | shard 6 |
| `posting-routes-dials.spec.ts` | 7 | 1.0 min | shard 6 |
| `post-wizard-removed.spec.ts` | 2 | 0.7 min | shard 6 |
| `a11y.spec.ts` | 4 | 0.4 min | smoke |
| `post-wizard-units.spec.ts` | 2 | 0.3 min | shard 6 |
| `posting-routes-identity.spec.ts` | 1 | 0.2 min | shard 6 |
| `rbac.spec.ts` | 3 | 0.2 min | shard 6 |
| `primitives-law.spec.ts` | 12 | 0.2 min | shard 6 |
| `smoke-auth-i18n.spec.ts` | 3 | 0.2 min | smoke, shard 6 |
| `post-wizard-recent.spec.ts` | 1 | 0.2 min | shard 6 |
| `house-style.spec.ts` | 4 | 0.2 min | changed |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `shell-table-law.spec.ts` | 1 | 0.1 min | shard 6 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 32.6 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 28.8 s |
| `post-wizard-resets.spec.ts` › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321) | desktop-1280 | 26.6 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 26.4 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | desktop-1280 | 26.4 s |
| `post-wizard-where.spec.ts` › PW-98 the item tick sits on the city line, fresh and prefilled | desktop-1280 | 26.2 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | desktop-1280 | 25.5 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 25.1 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 24.7 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 24.5 s |
| `post-wizard-resets.spec.ts` › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold | desktop-1280 | 23.3 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 21.8 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 21.7 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 21.6 s |
| `post-wizard-where.spec.ts` › PW-90 two boxes, a red border per unfilled level, the plan in one line | desktop-1280 | 20.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37715570406-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37715570406-email
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 37715570406-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 37715570406-changed
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-p0cgsi: e2e_par_9nox56 → e2e_chi_6paphd
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
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-cjygws: e2e_par_dfojwr → e2e_chi_oezlkr
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
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37715570406-1-3016-2-px7n0j@ethio-e2e.invalid)
  ✓  159 [mobile-360] › e2e/admin-roles.spec.ts:333:3 › U2 roles console › RP-7 registration: DEC-016 permissions appear as grantable rows (7.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37715570406-1-3016-2-px7n0j@ethio-e2e.invalid)
  ✓  158 [mobile-360] › e2e/admin-locations.spec.ts:705:3 › L2a locations console › LT-15 an imported place name is in the name table after commit and gone after undo (14.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37715570406-1-3016-3-s04sn9@ethio-e2e.invalid)
  ✓  160 [mobile-360] › e2e/admin-roles.spec.ts:346:3 › U2 roles console › RP-8 Amharic + no horizontal overflow (9.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37715570406-1-3016-2-px7n0j@ethio-e2e.invalid)
  ✓  161 [mobile-360] › e2e/admin-locations.spec.ts:759:3 › L2a locations console › LT-7b the editor round-trips a row without dropping a stored field (9.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37715570406-1-3016-3-s04sn9@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-p0cgsi: e2e_par_9nox56 → e2e_chi_6paphd
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
✓  185 [mobile-360] › e2e/post-wizard-pricing.spec.ts:540:3 › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) (11.6s)
  ✓  186 [mobile-360] › e2e/post-wizard-place.spec.ts:1060:3 › POSTING WIZARD › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city (17.6s)
  ✓  187 [mobile-360] › e2e/post-wizard-pricing.spec.ts:574:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (17.0s)
  ✓  188 [mobile-360] › e2e/post-wizard-place.spec.ts:1156:3 › POSTING WIZARD › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched (14.8s)
  ✓  189 [mobile-360] › e2e/post-wizard-pricing.spec.ts:608:3 › POSTING WIZARD › PW-65 the currency list opens home first and USD second, with symbols (D62-2) (9.5s)
  ✓  190 [mobile-360] › e2e/post-wizard-place.spec.ts:1199:3 › POSTING WIZARD › PW-82 the add buttons follow the plan's own limits (15.1s)
  ✓  191 [mobile-360] › e2e/post-wizard-pricing.spec.ts:638:3 › POSTING WIZARD › PW-169 with a currency chosen, the list opens with it first and marked, and keeps it first under a search that misses it (Bundle 7 B2) (9.9s)
  ✓  193 [mobile-360] › e2e/post-wizard-pricing.spec.ts:667:3 › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309) (8.1s)
  ✓  192 [mobile-360] › e2e/post-wizard-place.spec.ts:1274:3 › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact (12.1s)
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
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  191 [mobile-360] › e2e/shell.spec.ts:1939:3 › L4b location picker › LS-6 the nearest curated metro wins by geometry (10.0s)
  ✓  192 [mobile-360] › e2e/posting-routes.spec.ts:1023:3 › POSTING ROUTES › PR-23 an ad has no end unless the seller sets a date or the category holds a limit (DEC-117) (9.6s)
  ✓  193 [mobile-360] › e2e/shell.spec.ts:1968:3 › L4b location picker › LS-7 a region code alone selects the region (15.0s)
  ✓  194 [mobile-360] › e2e/posting-routes.spec.ts:1084:3 › POSTING ROUTES › PR-24 a seller is named before an ad is published (INC-423) (19.6s)
  ✓  196 [mobile-360] › e2e/posting-routes.spec.ts:1160:3 › POSTING ROUTES › PR-25 a successful publish stamps the seller's statement (bundle 4 step 19) (7.3s)
  ✓  195 [mobile-360] › e2e/shell.spec.ts:1996:3 › L4b location picker › LS-8 a city name alone selects that city (16.3s)
  ✓  197 [mobile-360] › e2e/shell.spec.ts:2018:3 › L4b location picker › LS-9 coordinates far from every metro stop at the market (15.1s)
  ✓  198 [mobile-360] › e2e/shell.spec.ts:2046:3 › L4b location picker › LS-10 a saved area beats the deepest guess (17.5s)
  ✓  199 [mobile-360] › e2e/shell.spec.ts:2089:3 › L4b location picker › LS-11 picking a second market renders its own tree and saves its own node (23.8s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  170 [desktop-1280] › e2e/admin-locations.spec.ts:997:3 › L2a locations console › LT-12 transfer scope: exports and the import title follow the selected country (3.4s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37715570406-4-2873-2-k6urk9@ethio-e2e.invalid)
  ✓  172 [desktop-1280] › e2e/admin-locations.spec.ts:1037:3 › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope (4.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37715570406-4-2873-2-k6urk9@ethio-e2e.invalid)
  ✓  171 [desktop-1280] › e2e/admin-roles.spec.ts:418:3 › U2 roles console › RP-11 DEC-017: a reserved permission is locked in the matrix and refused by the RPC (9.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+37715570406-4-2873-3-87jgpl@ethio-e2e.invalid)
  ✓  173 [desktop-1280] › e2e/admin-locations.spec.ts:1122:3 › L2a locations console › LT-14 market state and whole-country parent follow the selected market (2.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+37715570406-4-2873-2-k6urk9@ethio-e2e.invalid)
  ✓  175 [desktop-1280] › e2e/admin-locations.spec.ts:1153:3 › L2a locations console › OV-1 overview totals, links and group breadcrumbs (2.4s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-cjygws: e2e_par_dfojwr → e2e_chi_oezlkr
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
  ✘   47 [desktop-1280] › e2e/house-style.spec.ts:38:3 › house style fixture › HS-2 axe is clean in light and in dark mode (2.8s)
--- final 10 lines ---
✓  177 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:540:3 › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2) (11.5s)
  ✓  178 [desktop-1280] › e2e/post-wizard-place.spec.ts:1060:3 › POSTING WIZARD › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city (18.1s)
  ✓  179 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:574:3 › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081) (16.1s)
  ✓  181 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:608:3 › POSTING WIZARD › PW-65 the currency list opens home first and USD second, with symbols (D62-2) (9.1s)
  ✓  180 [desktop-1280] › e2e/post-wizard-place.spec.ts:1156:3 › POSTING WIZARD › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched (14.0s)
  ✓  182 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:638:3 › POSTING WIZARD › PW-169 with a currency chosen, the list opens with it first and marked, and keeps it first under a search that misses it (Bundle 7 B2) (9.3s)
  ✓  183 [desktop-1280] › e2e/post-wizard-place.spec.ts:1199:3 › POSTING WIZARD › PW-82 the add buttons follow the plan's own limits (15.3s)
  ✓  184 [desktop-1280] › e2e/post-wizard-pricing.spec.ts:667:3 › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309) (9.0s)
  ✓  185 [desktop-1280] › e2e/post-wizard-place.spec.ts:1274:3 › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact (12.3s)
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
[WebServer] [ssr-error] /api/listings/draft listing not found
```
