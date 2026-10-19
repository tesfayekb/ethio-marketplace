# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39181374206
- Commit: `8de3a0358c1a83ee82fa494734b24ec28a18917c`
- Attempt: 1
- Written (UTC): 2026-10-19T00:50:40.241Z
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

87 line(s), 32 message(s): 1 off the allowlist, 31 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 10 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 5 | shard 3, shard 6 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 3 | shard 2, shard 4, shard 5 |
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
| `links unknownColumn` (quiet) | 1 | shard 2 |

Quiet (allowlisted): digest mismatch ×10 · too many previews ×10 · definitions badHeader ×4 · definitions wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×3 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · links unknownColumn ×1

Off the allowlist:

### listing not found

- Count: 5 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · PW-108 an Other basis names the seller's written unit (INC-371) ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1 · PW-17 the currency is preselected and searchable by name in one control ×1 · PW-20 where: the default place lists itself, is ticked, and a lone city box offe ×1

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
[e2e:teardown] deleted 4 user(s) owned by process 39181374206-email
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-BtNAMaj6.js:142:25) at http://127.0.0.1:4173/assets/feed-BtNAMaj6.js:176:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6028:5) ×2
```

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
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
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
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## smoke: no results file

smoke: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (4) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-BtNAMaj6.js:142:25) at http://127.0.0.1:4173/assets/feed-BtNAMaj6.js:176:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6028:5)
  ✘  119 [mobile-360] › e2e/shell.spec.ts:3857:3 › SHELL — the phone page never widens (bundle 21 turn 10) › OP-1 the ?overflow=1 probe measures the screen and names an offender (1.2s)
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-BtNAMaj6.js:142:25) at http://127.0.0.1:4173/assets/feed-BtNAMaj6.js:176:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6028:5)
  ✘  120 [mobile-360] › e2e/shell.spec.ts:3857:3 › SHELL — the phone page never widens (bundle 21 turn 10) › OP-1 the ?overflow=1 probe measures the screen and names an offender (retry #1) (1.5s)
--- final 10 lines ---
✓  131 [desktop-1280] › e2e/auth-signout.spec.ts:303:3 › U0k session policy › SP-3 absolute: continuous activity does not save the session (15.8s)
  ✓  132 [desktop-1280] › e2e/auth-signout.spec.ts:319:3 › U0k session policy › SP-4 cross-tab: signing out in one tab evacuates the other (15.1s)
  ✓  133 [desktop-1280] › e2e/auth-signout.spec.ts:342:3 › U0k session policy › SP-6 stale stamps from a previous session never sign the new one out (22.8s)
  ✓  134 [desktop-1280] › e2e/auth-signout.spec.ts:373:3 › U0k session policy › SP-7 reload of a live session keeps its clocks (no silent extension) (13.8s)
  ✓  135 [desktop-1280] › e2e/auth-signout.spec.ts:403:3 › D189 deactivated session › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189) (11.4s)
  ✓  136 [desktop-1280] › e2e/auth-signout.spec.ts:438:3 › D189 deactivated session › SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661) (12.5s)
  ✓  137 [desktop-1280] › e2e/auth-signout.spec.ts:488:3 › D189 deactivated session › SO-10 a signed-in tab's reload never shows the Sign in link before the account menu (INC-667) (13.1s)
  ✓  138 [desktop-1280] › e2e/shell.spec.ts:153:3 › app shell › LB-1 bands and bars lift without hard borders (750ms)
  ✓  139 [desktop-1280] › e2e/shell.spec.ts:181:3 › app shell › mounts with header, rail slot and footer, logged out (629ms)
```

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-BtNAMaj6.js:142:25) at http://127.0.0.1:4173/assets/feed-BtNAMaj6.js:176:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C3OnHVfR.js:6028:5) ×2
```

## email: no results file

email: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  1 [email-serial] › e2e/auth-signup.spec.ts:124:3 › A: sign-up + resend (needs a recipient-agnostic mail sink) › A-1+A-2: sign-up reaches check-email, and one resend click engages the throttle (3.3s)
  ✓  2 [email-serial] › e2e/auth-signup.spec.ts:161:1 › SU-1 sign-up asks for the password twice, and a mismatch sends nothing (1.2s)
  ✓  3 [email-serial] › e2e/auth-signup.spec.ts:192:1 › SU-2 a throwaway mail address is refused at sign-up, in words, and no account is made (D185) (1.9s)
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39181374206-email

  3 passed (13.3s)
```

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (2) ---
  ✘   51 [mobile-360] › e2e/ad-page.spec.ts:987:3 › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-37 the in-page bar scrolls to each section and stays under the sub-band (29.6s)
  ✘   80 [mobile-360] › e2e/ad-page.spec.ts:1581:3 › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-46 Save and Share sit in the title box (20.6s)
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39181374206-1-2831-3-nzrzgv@ethio-e2e.invalid)
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
  ✓   93 [mobile-360] › e2e/admin-attributes-import.spec.ts:1739:3 › C3 attributes console › AT-28 a categories file is refused by identity (4.5s)
  ✓   92 [mobile-360] › e2e/ad-page.spec.ts:1760:3 › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width (17.9s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+39181374206-1-2831-2-6nvrhr@ethio-e2e.invalid)
  ✓   94 [mobile-360] › e2e/admin-attributes-library.spec.ts:52:3 › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin (23.9s)
  ✓   95 [mobile-360] › e2e/admin-attributes-links.spec.ts:175:3 › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone (17.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39181374206-1-2831-3-nzrzgv@ethio-e2e.invalid)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+39181374206-1-2831-2-6nvrhr@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (1) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
  ✓  145 [mobile-360] › e2e/import-security.spec.ts:909:3 › IMPORT-GATE attributes-links › IG-5 attributes-links: an undeclared column is refused by name and the declared cells are not (4.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39181374206-2-3006-3-avn78v@ethio-e2e.invalid)
  ✓  147 [mobile-360] › e2e/import-security.spec.ts:965:3 › IMPORT-GATE audit › IG-6 the import audit row is written only by a caller who may run that family's import (15.1s)
  -  148 [mobile-360] › e2e/layout.spec.ts:18:1 › LY-1 wide pages use most of the desktop content width
  ✓  149 [mobile-360] › e2e/layout.spec.ts:35:1 › LY-2 mobile pages do not overflow (3.7s)
  ✓  150 [mobile-360] › e2e/layout.spec.ts:54:1 › LY-3 wizard actions are sticky only below md (1.5s)
  ✓  146 [mobile-360] › e2e/feed-screens.spec.ts:636:3 › FEED SCREENS › FS-17 a complete list across places ends with the one invitation (D215) (25.1s)
  ✓  151 [mobile-360] › e2e/layout.spec.ts:63:1 › LY-4 wizard aside is desktop-only (1.7s)
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
✓   65 [mobile-360] › e2e/post-wizard-resets.spec.ts:570:3 › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) (41.5s)
  ✓   68 [mobile-360] › e2e/post-wizard-specs.spec.ts:600:3 › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi (19.2s)
  ✓   69 [mobile-360] › e2e/post-wizard-resets.spec.ts:599:3 › POSTING WIZARD › PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else (24.7s)
  ✓   70 [mobile-360] › e2e/post-wizard-specs.spec.ts:629:3 › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369) (20.9s)
  ✓   71 [mobile-360] › e2e/post-wizard-resets.spec.ts:732:3 › POSTING WIZARD › PW-163 a first identity answer keeps the details filled above it; a change keeps them too (24.2s)
  ✓   72 [mobile-360] › e2e/post-wizard-specs.spec.ts:654:3 › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370) (18.1s)
  ✓   73 [mobile-360] › e2e/post-wizard-resets.spec.ts:855:3 › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold (19.4s)
  ✓   74 [mobile-360] › e2e/post-wizard-specs.spec.ts:675:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (21.7s)
  ✓   75 [mobile-360] › e2e/post-wizard-resets.spec.ts:995:3 › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores (19.3s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   92 [desktop-1280] › e2e/admin-attributes-library.spec.ts:72:3 › C3 attributes console › AT-2 definitions: a scratch attribute is created and renamed (DB truth) (18.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+39181374206-4-2992-2-7hw53k@ethio-e2e.invalid)
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
  ✓   94 [desktop-1280] › e2e/admin-attributes-links.spec.ts:175:3 › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone (14.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39181374206-4-2992-3-yafer5@ethio-e2e.invalid)
  ✓   96 [desktop-1280] › e2e/admin-attributes-links.spec.ts:251:3 › C3 attributes console › AT-30 an unlinked delete undoes and a linked delete names its categories (20.3s)
  ✓   95 [desktop-1280] › e2e/admin-attributes-library.spec.ts:131:3 › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked (27.6s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39181374206-4-2992-3-yafer5@ethio-e2e.invalid)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+39181374206-4-2992-2-7hw53k@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
  ✓  146 [desktop-1280] › e2e/import-security.spec.ts:340:5 › IMPORT-GATE locations-locations › IG-1 locations-locations: malformed, foreign, oversized and unreadable files are refused whole (4.5s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39181374206-5-2999-3-rgatvj@ethio-e2e.invalid)
  ✓  147 [desktop-1280] › e2e/import-security.spec.ts:415:5 › IMPORT-GATE locations-locations › IG-2 locations-locations: dangerous cells refuse their own row and name the reason (3.8s)
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
  ✓  145 [desktop-1280] › e2e/feed-screens.spec.ts:567:3 › FEED SCREENS › FS-13 each wider place is headed in its own name: the region, then the country (D127) (24.5s)
[WebServer] [ssr-error] /api/admin/locations/import too many previews
  ✓  148 [desktop-1280] › e2e/import-security.spec.ts:793:5 › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited (22.8s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39181374206-5-2999-3-rgatvj@ethio-e2e.invalid)
```

```text
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
[WebServer] [ssr-error] /api/admin/locations/import digest mismatch
[WebServer] [ssr-error] /api/admin/locations/import too many previews
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓   75 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1364:3 › POSTING WIZARD › PW-165 a parent's change never touches a detail that depends on another parent (17.7s)
  ✓   76 [desktop-1280] › e2e/post-wizard-specs.spec.ts:846:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) (24.4s)
  ✓   77 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1434:3 › POSTING WIZARD › PW-166 a prefill the seller left goes with the old choice; one the seller changed stays when it fits and is cleared when it does not (22.1s)
  ✓   78 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1102:3 › POSTING WIZARD › PW-75 the required mark is uniform across steps (D72) (23.3s)
  ✓   79 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1520:3 › POSTING WIZARD › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer (24.5s)
  ✓   80 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1160:3 › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step (18.3s)
  ✓   81 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1584:3 › POSTING WIZARD › PW-168 a chain: the brand changes, the model it no longer offers is cleared and what it filled goes; the seller's own colour stays (17.5s)
  ✓   82 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1225:3 › POSTING WIZARD › PW-18 specifications survive a step Back (17.2s)
  ✓   83 [desktop-1280] › e2e/post-wizard-resets.spec.ts:1668:3 › POSTING WIZARD › PW-174 a parent's move whose new option carries no fact leaves D on another parent's fact, as a prefill (Bundle 7 D4) (22.9s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```
