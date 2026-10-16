# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38919547339
- Commit: `5ba16bbbfeaaac3191a517a4097f6f21bd84be4f`
- Attempt: 1
- Written (UTC): 2026-10-16T15:09:23.330Z
- Passed: 0 · Skipped: 0 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): email
- Sources without results: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (0 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

73 line(s), 33 message(s): 1 off the allowlist, 32 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 7 | shard 3, shard 6 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `digest mismatch` (quiet) | 4 | shard 1, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `too many previews` (quiet) | 3 | shard 5 |
| `categories badHeader` (quiet) | 2 | shard 2, shard 5 |
| `categories file too large` (quiet) | 2 | shard 2, shard 5 |
| `categories nulByte` (quiet) | 2 | shard 2, shard 5 |
| `categories unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `categories wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `countries badHeader` (quiet) | 2 | shard 2, shard 5 |
| `countries wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `definitions nulByte` (quiet) | 2 | shard 2, shard 5 |
| `definitions tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `definitions unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `preview_failed permission denied` (quiet) | 2 | shard 1, shard 4 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-pmz<n>d<n>: e<n>e_par_<n>w<n>fk → e<n>e_chi_<n>sew<n>` (quiet) | 1 | shard 1 |
| `countries nulByte` (quiet) | 1 | shard 5 |
| `countries tooManyRows` (quiet) | 1 | shard 5 |
| `countries unknownColumn` (quiet) | 1 | shard 5 |
| `locations badHeader` (quiet) | 1 | shard 5 |
| `locations file too large` (quiet) | 1 | shard 5 |
| `locations nulByte` (quiet) | 1 | shard 5 |
| `locations unknownColumn` (quiet) | 1 | shard 5 |
| `locations wrongFile` (quiet) | 1 | shard 5 |

Quiet (allowlisted): category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · digest mismatch ×4 · export_failed permission denied ×4 · too many previews ×3 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-pmz<n>d<n>: e<n>e_par_<n>w<n>fk → e<n>e_chi_<n>sew<n> ×1 · countries nulByte ×1 · countries tooManyRows ×1 · countries unknownColumn ×1 · locations badHeader ×1 · locations file too large ×1 · locations nulByte ×1 · locations unknownColumn ×1 · locations wrongFile ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-17 the currency is preselected and searchable by name in one control ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1 · PW-136 a product type that allows only some units narrows the unit list on the p ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: none · unavailable: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

No timing: no source carried a results.json.

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38919547339-email
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

## Server errors: email

No `[ssr-error]` lines in the `email` log (or no log was uploaded).

## Client errors: email

No `[client-error]` lines in the `email` log (or no log was uploaded).

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-pmz7d0: e2e_par_8w14fk → e2e_chi_1sew25
```

## Client errors: shard 1

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
[client-error] console.error: [client-error] gate fetch threw
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
```

## Client errors: shard 2

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×2
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
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
```

## Client errors: shard 4

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
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
```

## Client errors: shard 5

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×2
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×2
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  176 [desktop-1280] › e2e/shell.spec.ts:1771:3 › desktop layout laws (U0g) › L3: the footer spans the full width beneath the fixed rail (1.7s)
  ✓  177 [desktop-1280] › e2e/shell.spec.ts:1835:3 › desktop layout laws (U0g) › U0i: the rail ends at the footer top and its last item stays reachable (1.0s)
  -  178 [desktop-1280] › e2e/shell.spec.ts:1862:3 › desktop layout laws (U0g) › the tall fixture does not overflow horizontally at 360
  ✓  179 [desktop-1280] › e2e/shell.spec.ts:1894:3 › i18n gate is non-blocking (U4f-2) › TR-36 the header renders while the languages read is still in flight (599ms)
  ✓  180 [desktop-1280] › e2e/shell.spec.ts:1906:3 › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves (5.9s)
  ✓  181 [desktop-1280] › e2e/shell.spec.ts:1962:3 › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out (7.7s)
  ✓  182 [desktop-1280] › e2e/shell.spec.ts:1977:3 › U4h device language star › TR-37 the account carries onto a starless device, and never over a star (12.4s)
  ✓  183 [desktop-1280] › e2e/shell.spec.ts:2044:3 › U4h device language star › TR-28 hreflang alternates equal the anon publication gate (1.1s)
  ✓  184 [desktop-1280] › e2e/shell.spec.ts:2172:3 › L4b location picker › LS-1 the cascade reaches a sub-city (4.9s)
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  1 [email-serial] › e2e/auth-signup.spec.ts:124:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (4.9s)
  ✓  2 [email-serial] › e2e/auth-signup.spec.ts:161:1 › SU-1 sign-up asks for the password twice, and a mismatch sends nothing (1.3s)
  ✓  3 [email-serial] › e2e/auth-signup.spec.ts:192:1 › SU-2 a throwaway mail address is refused at sign-up, in words, and no account is made (D185) (2.1s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38919547339-email

  3 passed (14.7s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (6) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
[client-error] console.error: [client-error] gate fetch threw
  ✘   38 [mobile-360] › e2e/admin-attributes-library.spec.ts:52:3 › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin (36.1s)
  ✘   41 [mobile-360] › e2e/admin-attributes-library.spec.ts:52:3 › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin (retry #1) (36.9s)
  ✘   81 [mobile-360] › e2e/admin-audit.spec.ts:90:3 › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log (33.7s)
  ✘   84 [mobile-360] › e2e/admin-audit.spec.ts:90:3 › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log (retry #1) (31.2s)
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-pmz7d0: e2e_par_8w14fk → e2e_chi_1sew25
  ✘   84 [mobile-360] › e2e/admin-audit.spec.ts:90:3 › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log (retry #1) (31.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38919547339-1-3009-3-2xqaa9@ethio-e2e.invalid)
  ✓   85 [mobile-360] › e2e/admin-attributes-safety.spec.ts:481:3 › Bundle 7 attribute safety › AT-77 an import whose end state asks a child first is refused whole at the commit (22.4s)
  ✓   86 [mobile-360] › e2e/admin-audit.spec.ts:110:3 › U3 audit & security › AS-2 filters: an action filter narrows the list (4.4s)
  ✓   88 [mobile-360] › e2e/admin-audit.spec.ts:155:3 › U3 audit & security › AS-3 the log on the agreed blocks: heading, toolbar, Filters with pills and dates, Columns, page size (11.8s)
  ✓   87 [mobile-360] › e2e/admin-attributes-safety.spec.ts:524:3 › Bundle 7 attribute safety › AT-82 a single-pick question made multi-pick: every ad's answer becomes a one-answer list in the same change; other questions and other changes are untouched (INC-632) (18.8s)
  ✓   90 [mobile-360] › e2e/admin-categories-console.spec.ts:88:3 › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin (15.4s)
  ✓   89 [mobile-360] › e2e/admin-audit.spec.ts:234:3 › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it @private-identity (23.0s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-pmz7d0: e2e_par_8w14fk → e2e_chi_1sew25
```

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
[client-error] console.error: [client-error] gate fetch threw
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (11) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
  ✘   95 [mobile-360] › e2e/import-security.spec.ts:793:5 › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited (23.7s)
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
  ✘   97 [mobile-360] › e2e/import-security.spec.ts:793:5 › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited (retry #1) (24.7s)
[client-error] console.error: [client-error] gate fetch threw
  ✘  101 [mobile-360] › e2e/import-security.spec.ts:793:5 › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited (25.0s)
  ✘  103 [mobile-360] › e2e/import-security.spec.ts:793:5 › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited (retry #1) (26.0s)
  ✘  108 [mobile-360] › e2e/import-security.spec.ts:793:5 › IMPORT-GATE translations › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited (23.8s)
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
  ✘  110 [mobile-360] › e2e/import-security.spec.ts:793:5 › IMPORT-GATE translations › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited (retry #1) (24.0s)
--- final 10 lines ---
✘  110 [mobile-360] › e2e/import-security.spec.ts:793:5 › IMPORT-GATE translations › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited (retry #1) (24.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38919547339-2-3009-2-nmr7dy@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
  ✓  112 [mobile-360] › e2e/import-security.spec.ts:845:7 › IMPORT-GATE translations › IG-4 translations: XLIFF enters the same door and is judged by the same law (5.1s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38919547339-2-3009-2-nmr7dy@ethio-e2e.invalid)
  ✓  111 [mobile-360] › e2e/feed-screens.spec.ts:574:3 › FEED SCREENS › FS-15 the card's ribbon and the old price (D173, D175 1, D180) (19.1s)
  -  114 [mobile-360] › e2e/layout.spec.ts:18:1 › LY-1 wide pages use most of the desktop content width
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
```

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import definitions unknownColumn
[WebServer] [ssr-error] /api/admin/attributes/import definitions tooManyRows
[WebServer] [ssr-error] /api/admin/attributes/import definitions nulByte
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings emptyFile
[WebServer] [ssr-error] /api/admin/locations/import countries badHeader
[WebServer] [ssr-error] /api/admin/locations/import countries wrongFile
```

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×2
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   74 [mobile-360] › e2e/post-wizard-resets.spec.ts:1151:3 › POSTING WIZARD › PW-152 a two-pair condition shows its row only when both answers match (11.2s)
  ✓   75 [mobile-360] › e2e/post-wizard-specs.spec.ts:792:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) (14.3s)
  ✓   76 [mobile-360] › e2e/post-wizard-resets.spec.ts:1274:3 › POSTING WIZARD › PW-164 an identity change keeps every detail that does not depend on it, resets the ones that do, and Undo restores them (12.0s)
  ✓   78 [mobile-360] › e2e/post-wizard-resets.spec.ts:1351:3 › POSTING WIZARD › PW-165 a parent's change never touches a detail that depends on another parent (11.8s)
  ✓   77 [mobile-360] › e2e/post-wizard-specs.spec.ts:792:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) (14.6s)
  ✓   79 [mobile-360] › e2e/post-wizard-resets.spec.ts:1421:3 › POSTING WIZARD › PW-166 a prefill the seller left goes with the old choice; one the seller changed stays when it fits and is cleared when it does not (13.0s)
  ✓   80 [mobile-360] › e2e/post-wizard-specs.spec.ts:1048:3 › POSTING WIZARD › PW-75 the required mark is uniform across steps (D72) (14.7s)
  ✓   81 [mobile-360] › e2e/post-wizard-resets.spec.ts:1507:3 › POSTING WIZARD › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer (11.5s)
  ✓   82 [mobile-360] › e2e/post-wizard-specs.spec.ts:1106:3 › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step (9.0s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (3) ---
  ✘   38 [desktop-1280] › e2e/admin-attributes-library.spec.ts:52:3 › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin (30.9s)
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
  ✘   40 [desktop-1280] › e2e/admin-attributes-library.spec.ts:52:3 › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin (retry #1) (36.6s)
--- final 10 lines ---
✓   76 [desktop-1280] › e2e/admin-attributes-safety.spec.ts:240:3 › Bundle 7 attribute safety › AT-73b a failed holders read shows its error, keeps the confirm disabled and removes nothing (9.8s)
  ✓   75 [desktop-1280] › e2e/admin-attributes-library.spec.ts:1189:3 › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin (14.5s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38919547339-4-2801-2-rua3aa@ethio-e2e.invalid)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38919547339-4-2801-3-kncxm4@ethio-e2e.invalid)
  ✓   78 [desktop-1280] › e2e/admin-attributes-library.spec.ts:1251:3 › C3 attributes console › AT-19 an inherited row has no write verb and the write RPCs refuse it (11.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38919547339-4-2801-3-kncxm4@ethio-e2e.invalid)
  ✓   79 [desktop-1280] › e2e/admin-attributes-library.spec.ts:1340:3 › C3 attributes console › AT-36 a secondary parent confers nothing, a primary parent confers (18.0s)
  ✓   77 [desktop-1280] › e2e/admin-attributes-safety.spec.ts:281:3 › Bundle 7 attribute safety › AT-74 a merge is refused while a listing holds a source's answer, and merges when none does (30.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+38919547339-4-2801-2-rua3aa@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (10) ---
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
  ✘   98 [desktop-1280] › e2e/import-security.spec.ts:793:5 › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited (22.8s)
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
[client-error] console.error: [client-error] gate fetch threw
  ✘  105 [desktop-1280] › e2e/import-security.spec.ts:793:5 › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited (22.8s)
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
  ✘  108 [desktop-1280] › e2e/import-security.spec.ts:793:5 › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited (retry #1) (23.4s)
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
  ✘  113 [desktop-1280] › e2e/import-security.spec.ts:793:5 › IMPORT-GATE translations › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited (21.7s)
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
  ✓  129 [desktop-1280] › e2e/import-security.spec.ts:340:5 › IMPORT-GATE locations-locations › IG-1 locations-locations: malformed, foreign, oversized and unreadable files are refused whole (3.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+38919547339-5-3031-3-dgun2p@ethio-e2e.invalid)
  ✓  130 [desktop-1280] › e2e/import-security.spec.ts:415:5 › IMPORT-GATE locations-locations › IG-2 locations-locations: dangerous cells refuse their own row and name the reason (2.9s)
  ✓  124 [desktop-1280] › e2e/locations-tree.spec.ts:129:3 › L1c · public per-country location tree › LR-3 a row disappears when an ancestor is retired, and the version moves (32.6s)
  ✓  132 [desktop-1280] › e2e/locations-tree.spec.ts:246:3 › L1c · public per-country location tree › LR-4 the payload carries the eleven read fields and nothing else (132ms)
```

```text
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
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
```

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×2
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×2
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   70 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1151:3 › POSTING WIZARD › PW-152 a two-pair condition shows its row only when both answers match (11.9s)
  ✓   71 [desktop-1280] › e2e/post-wizard-specs.spec.ts:792:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) (12.6s)
  ✓   72 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1274:3 › POSTING WIZARD › PW-164 an identity change keeps every detail that does not depend on it, resets the ones that do, and Undo restores them (12.4s)
  ✓   74 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1351:3 › POSTING WIZARD › PW-165 a parent's change never touches a detail that depends on another parent (12.5s)
  ✓   73 [desktop-1280] › e2e/post-wizard-specs.spec.ts:792:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) (13.2s)
  ✓   75 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1421:3 › POSTING WIZARD › PW-166 a prefill the seller left goes with the old choice; one the seller changed stays when it fits and is cleared when it does not (15.8s)
  ✓   76 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1048:3 › POSTING WIZARD › PW-75 the required mark is uniform across steps (D72) (16.2s)
  ✓   78 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1106:3 › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step (10.4s)
  ✓   77 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1507:3 › POSTING WIZARD › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer (14.6s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```
