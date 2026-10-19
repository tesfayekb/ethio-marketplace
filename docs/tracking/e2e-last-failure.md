# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39188855266
- Commit: `bef1d07fd45848b6c216a9b3b6c03087c442bbd8`
- Attempt: 1
- Written (UTC): 2026-10-19T03:15:12.123Z
- Passed: 187 · Skipped: 59 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 0
- Post-test errors (DEC-059, non-gating): smoke, email
- Sources without results: shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Errors outside any test (INC-589): none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 8 results files read, 7 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 5, shard 6 · unavailable: shard 4

`shard 4`: log unavailable.

90 line(s), 34 message(s): 2 off the allowlist, 32 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 10 | shard 1, shard 2, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 3, shard 6 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 3 | shard 1, shard 2, shard 5 |
| `definitions badHeader` (quiet) | 3 | shard 1, shard 2, shard 5 |
| `definitions wrongFile` (quiet) | 3 | shard 1, shard 2, shard 5 |
| `auth upstream unavailable (<n>)` | 2 | shard 1, shard 2 |
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
| `export_failed permission denied` (quiet) | 2 | shard 1 |
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
| `preview_failed permission denied` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×10 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×3 · definitions badHeader ×3 · definitions wrongFile ×3 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · export_failed permission denied ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · preview_failed permission denied ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-33 a region alone never lists itself; its city does (W6 R2) ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1 · PW-13 review: the preview shows what was answered, and Publish lands in review — ×1 · PW-17 the currency is preselected and searchable by name in one control ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### auth upstream unavailable (<n>)

- Count: 2 · Sources: shard 1, shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): @private-identity IG-3 categories: a changed file cannot be committed and previe ×1 · AT-29 an imported label_am is pending, silent when blank, and undone ×1 · AT-5 delete: refused while linked, accepted once unlinked ×1 · FS-10 nothing anywhere: the invitation card comes first, with the category and t ×1

```text
[WebServer] [ssr-error] /api/admin/attributes/import auth upstream unavailable (504)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 5, shard 6 · unavailable: shard 4

`shard 4`: log unavailable.

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email · unavailable: shard 1, shard 2, shard 3, shard 4, shard 5, shard 6

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-19T02:49:24.783Z | 20.5 min |
| email | 2026-10-19T02:49:25.295Z | 0.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 210 | 13.8 min | smoke |
| `auth-signout.spec.ts` | 28 | 5.5 min | smoke |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `smoke-auth-i18n.spec.ts` | 2 | 0.4 min | smoke |
| `auth-signup.spec.ts` | 3 | 0.2 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `shell.spec.ts` › md+ rail: items scroll, header fixed | desktop-1280 | 53.9 s |
| `shell.spec.ts` › PN-2 recent own picks and the saved place's descendants show no notice | desktop-1280 | 27.5 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 26.2 s |
| `shell.spec.ts` › FF-1 every text field is at least 16 px on a phone | mobile-360 | 24.5 s |
| `auth-signout.spec.ts` › SP-3 absolute: continuous activity does not save the session | desktop-1280 | 23.7 s |
| `auth-signout.spec.ts` › SP-6 stale stamps from a previous session never sign the new one out | desktop-1280 | 23.3 s |
| `shell.spec.ts` › LS-10 a saved area beats the deepest guess | desktop-1280 | 20.3 s |
| `shell.spec.ts` › TR-37 the account carries onto a starless device, and never over a star | desktop-1280 | 19.3 s |
| `shell.spec.ts` › the desktop rail switcher NAVIGATES to the panel's home (U0e) | desktop-1280 | 18.9 s |
| `shell.spec.ts` › LS-2 a pick is remembered; Any area is remembered as everywhere | mobile-360 | 18.8 s |
| `shell.spec.ts` › LS-8 a city name alone selects that city | desktop-1280 | 18.3 s |
| `auth-signout.spec.ts` › SP-6 stale stamps from a previous session never sign the new one out | mobile-360 | 18.0 s |
| `shell.spec.ts` › LS-10 a saved area beats the deepest guess | mobile-360 | 17.8 s |
| `shell.spec.ts` › PN-1 an old own choice offers an unrelated same-market place, Keep and Switch | mobile-360 | 17.0 s |
| `shell.spec.ts` › LS-13 a second city stops the auto-select at the region | mobile-360 | 16.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39188855266-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39188855266-email
```

## shell.spec.ts › SHELL — the phone page never widens (bundle 21 turn 10) › FF-1 every text field is at least 16 px on a phone

- Source: `smoke`
- Project: `mobile-360`

```text
Error: /post: no visible fields reached

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
--- further error 1 ---
Error: /post: no visible fields reached

expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0

  3936 |         ).toBeGreaterThanOrEqual(16);
  3937 |       }
> 3938 |       expect(visible, `${path}: no visible fields reached`).toBeGreaterThan(0);
       |                                                             ^
  3939 |     };
  3940 |     await gotoReady(page, "/");
  3941 |     await page.getByTestId("search-toggle").click();
    at sweep (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3938:61)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3949:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e391]
        - list [ref=e392]:
          - listitem [ref=e393]:
            - generic [ref=e394]: About
          - listitem [ref=e395]:
            - generic [ref=e396]: Contact
      - navigation "Help" [ref=e397]:
        - heading "Help" [level=2] [ref=e398]
        - list [ref=e399]:
          - listitem [ref=e400]:
            - generic [ref=e401]: Safety
      - navigation "Legal" [ref=e402]:
        - heading "Legal" [level=2] [ref=e403]
        - list [ref=e404]:
          - listitem [ref=e405]:
            - generic [ref=e406]: Terms
          - listitem [ref=e407]:
            - generic [ref=e408]: Privacy
    - paragraph [ref=e410]: © 2026 ethio.com — All rights reserved.
```
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
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import auth upstream unavailable (504)
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

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-BXDa0dYG.js:142:25) at http://127.0.0.1:4173/assets/feed-BXDa0dYG.js:176:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6028:5)
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:15427:27 at getResponse (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:15470:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:15427:9) at async client (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:17475:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:17406:20) at async userNext (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:17392:21) ×3
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

No `[ssr-error]` lines in the `shard 4` log (or no log was uploaded).

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
--- error lines (2) ---
  ✘   97 [mobile-360] › e2e/admin-attributes-library.spec.ts:223:3 › C3 attributes console › AT-5 delete: refused while linked, accepted once unlinked (37.7s)
  ✘   96 [mobile-360] › e2e/admin-attributes-links.spec.ts:175:3 › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone (1.1m)
--- final 10 lines ---
✓  131 [mobile-360] › e2e/admin-attributes-links.spec.ts:1505:3 › C3 attributes console › AT-67 catalogue tokens import and are stored unchanged (13.1s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39188855266-1-3012-3-o8ccll@ethio-e2e.invalid)
  ✓  132 [mobile-360] › e2e/admin-attributes-safety.spec.ts:240:3 › Bundle 7 attribute safety › AT-73b a failed holders read shows its error, keeps the confirm disabled and removes nothing (7.2s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+39188855266-1-3012-2-00mqv2@ethio-e2e.invalid)
  ✓  133 [mobile-360] › e2e/admin-attributes-links.spec.ts:1590:3 › C3 attributes console › AT-68 an import naming an unknown category is refused (4.3s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39188855266-1-3012-3-o8ccll@ethio-e2e.invalid)
  ✓  135 [mobile-360] › e2e/admin-attributes-links.spec.ts:1647:5 › C3 attributes console › AT-84 key fact ranks › AT-84 the Key fact tick ranks in tick order, unticks renumber, a fifth is greyed (21.4s)
  ✓  134 [mobile-360] › e2e/admin-attributes-safety.spec.ts:281:3 › Bundle 7 attribute safety › AT-74 a merge is refused while a listing holds a source's answer, and merges when none does (25.7s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+39188855266-1-3012-2-00mqv2@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/import auth upstream unavailable (504)
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (4) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-BXDa0dYG.js:142:25) at http://127.0.0.1:4173/assets/feed-BXDa0dYG.js:176:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6028:5)
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:15427:27 at getResponse (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:15470:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:15427:9) at async client (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:17475:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:17406:20) at async userNext (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:17392:21) ×3
  ✘  128 [mobile-360] › e2e/import-security.spec.ts:793:5 › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited (1.9m)
--- final 10 lines ---
✓  166 [mobile-360] › e2e/mfa-stepup.spec.ts:238:3 › U1f-4 step-up freshness › MF-6 unenrolling the only factor drops the stepped-up state @private-identity (9.3s)
  ✓  162 [mobile-360] › e2e/my-listings-ad.spec.ts:348:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's (33.2s)
  ✓  167 [mobile-360] › e2e/mfa-stepup.spec.ts:266:3 › U1f-4 step-up freshness › MF-7 a verification older than the window re-prompts @private-identity (12.9s)
  ✓  168 [mobile-360] › e2e/my-listings-ad.spec.ts:404:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-2 listing_history says which way a Reserved change went (15.8s)
  ✓  169 [mobile-360] › e2e/mfa-stepup.spec.ts:314:3 › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing @private-identity (11.0s)
  ✓  171 [mobile-360] › e2e/mfa-stepup.spec.ts:345:3 › FIX-SCAN-1 step-up abort › MF-7c a no-factor identity is released with the hint @private-identity (6.0s)
  ✓  170 [mobile-360] › e2e/my-listings-ad.spec.ts:430:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-3 The ad's page: Open from the list, the status and dates, Reserved on and off (D173) (20.6s)
  ✓  172 [mobile-360] › e2e/my-listings-doors.spec.ts:388:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-1 Close and reopen keep the days left; Reserved goes on close; a closed ad shows in Admin's Ended (D174) (25.3s)
  ✓  173 [mobile-360] › e2e/my-listings-ad.spec.ts:505:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-4 No longer available keeps the days left; Reopen gives them back (D174 2) (17.0s)
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

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-BXDa0dYG.js:142:25) at http://127.0.0.1:4173/assets/feed-BXDa0dYG.js:176:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:6028:5)
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:15427:27 at getResponse (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:15470:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:15427:9) at async client (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:17475:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:17406:20) at async userNext (http://127.0.0.1:4173/assets/index-BTo8Ngf0.js:17392:21) ×3
```

## shard 3: no results file

shard 3: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (2) ---
  ✘   64 [mobile-360] › e2e/post-wizard-specs.spec.ts:411:3 › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable (1.0m)
  ✘   63 [mobile-360] › e2e/post-wizard-resets.spec.ts:511:3 › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) (1.3m)
--- final 10 lines ---
✓   82 [mobile-360] › e2e/post-wizard-resets.spec.ts:1164:3 › POSTING WIZARD › PW-152 a two-pair condition shows its row only when both answers match (19.8s)
  ✓   83 [mobile-360] › e2e/post-wizard-specs.spec.ts:846:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) (24.4s)
  ✓   84 [mobile-360] › e2e/post-wizard-resets.spec.ts:1287:3 › POSTING WIZARD › PW-164 an identity change keeps every detail that does not depend on it, resets the ones that do, and Undo restores them (23.1s)
  ✓   86 [mobile-360] › e2e/post-wizard-resets.spec.ts:1364:3 › POSTING WIZARD › PW-165 a parent's change never touches a detail that depends on another parent (19.7s)
  ✓   85 [mobile-360] › e2e/post-wizard-specs.spec.ts:846:5 › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) (25.5s)
  ✓   87 [mobile-360] › e2e/post-wizard-resets.spec.ts:1434:3 › POSTING WIZARD › PW-166 a prefill the seller left goes with the old choice; one the seller changed stays when it fits and is cleared when it does not (22.6s)
  ✓   88 [mobile-360] › e2e/post-wizard-specs.spec.ts:1102:3 › POSTING WIZARD › PW-75 the required mark is uniform across steps (D72) (21.7s)
  ✓   89 [mobile-360] › e2e/post-wizard-resets.spec.ts:1520:3 › POSTING WIZARD › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer (21.0s)
  ✓   90 [mobile-360] › e2e/post-wizard-specs.spec.ts:1160:3 › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step (16.4s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
(no log tail was uploaded for this source)
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (2) ---
  ✘  149 [desktop-1280] › e2e/import-security.spec.ts:793:5 › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited (18.1s)
  ✘  147 [desktop-1280] › e2e/feed-screens.spec.ts:618:3 › FEED SCREENS › FS-14 with no place chosen the page is headed All listings (D127) (50.2s)
--- final 10 lines ---
✓  188 [desktop-1280] › e2e/my-listings-ad.spec.ts:758:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-9 Rented and Filled: a sold ad takes its category's word (call H) (19.2s)
  ✓  189 [desktop-1280] › e2e/my-listings-doors.spec.ts:656:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-6 An edit's review gives back the days the ad had; an expired ad is renewed before it is edited (D174) (14.6s)
  ✓  190 [desktop-1280] › e2e/my-listings-ad.spec.ts:826:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-10 A refused ad's Delete is answered in words when it was refused for a severe reason (12.7s)
  ✓  191 [desktop-1280] › e2e/my-listings-doors.spec.ts:698:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-7 Renew takes an expired ad only, live at once for the admin's days, with a fresh posting date and the first kept (D174, D175, D176) (13.7s)
  ✓  193 [desktop-1280] › e2e/my-listings-doors.spec.ts:734:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-8 The expiry sweep expires full and reduced reach through the state machine, with the system's revision (INC-470, INC-626) (12.1s)
  ✓  192 [desktop-1280] › e2e/my-listings-ad.spec.ts:848:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-11 the ad's page says what buyers see; its marks and its picture's ribbon (D180) (19.7s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39188855266-5-2788-3-ygc9zj@ethio-e2e.invalid)
  ✓  195 [desktop-1280] › e2e/my-listings-ad.spec.ts:898:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-12 the ad's actions are one bar under the title, its main next step filled (D181) (10.8s)
  ✓  194 [desktop-1280] › e2e/my-listings-doors.spec.ts:779:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-9 The seller's history: each change, by you, staff or the system, never a name (12.2s)
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
--- error lines (3) ---
  ✘   55 [desktop-1280] › e2e/post-wizard-specs.spec.ts:411:3 › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable (38.3s)
  ✘   61 [desktop-1280] › e2e/post-wizard-specs.spec.ts:600:3 › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi (41.4s)
  ✘   68 [desktop-1280] › e2e/post-wizard-specs.spec.ts:675:3 › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320) (47.8s)
--- final 10 lines ---
✓   88 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1273:3 › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion (19.5s)
  ✓   89 [desktop-1280] › e2e/post-wizard-units.spec.ts:103:3 › POSTING WIZARD — UNITS › PW-175 the price page asks the unit of sale above the quantity (20.1s)
  ✓   90 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1299:3 › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change (18.4s)
  ✓   91 [desktop-1280] › e2e/post-wizard-where.spec.ts:157:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place (21.1s)
  ✓   92 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1352:3 › POSTING WIZARD › PW-188 a list that hangs under another answer offers its shared Other last under every parent, and stores the seller's words (INC-609) (16.8s)
  ✓   94 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1397:3 › POSTING WIZARD › PW-22 a link's allowed options narrow the picker and its default prefills (20.6s)
  ✓   93 [desktop-1280] › e2e/post-wizard-where.spec.ts:208:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-84 a new post opens on the seller's own last post, never another seller's (42.8s)
  ✓   95 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1465:3 › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met (16.6s)
  ✓   97 [desktop-1280] › e2e/post-wizard-specs.spec.ts:1508:3 › POSTING WIZARD › PW-9 an option's facts prefill the siblings they name (19.3s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```
