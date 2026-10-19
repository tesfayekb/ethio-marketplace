# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39216535684
- Commit: `86fd282c69e328a84d254a8dfb03f915aca7c4d8`
- Attempt: 1
- Written (UTC): 2026-10-19T08:31:30.557Z
- Passed: 188 · Skipped: 60 · Failed: 0
- Gating failures: 0 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email
- Sources without results: shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · shell.spec.ts › FV-1 one device favourite leads every main list and survives reload — Error: expect(received).toBeLessThanOrEqual(expected)

## Flaky bodies (DEC-078)

### shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    68
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    68

  3821 |         const paintedBox = await strip.getByTestId(`strip-category-${mainSlug}`).boundingBox();
  3822 |         if (!menuBox || !paintedBox) throw new Error(`FV-1 missing ${mainSlug} bounds`);
> 3823 |         expect(Math.abs(menuBox.y - paintedBox.y)).toBeLessThanOrEqual(1);
       |                                                    ^
  3824 |       }
  3825 |       await page.getByTestId("rail-menu-close").click();
  3826 |     }
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3823:52)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3828:3
```

Context:

```text
        - heading "Company" [level=2] [ref=e680]
        - list [ref=e681]:
          - listitem [ref=e682]:
            - generic [ref=e683]: About
          - listitem [ref=e684]:
            - generic [ref=e685]: Contact
      - navigation "Help" [ref=e686]:
        - heading "Help" [level=2] [ref=e687]
        - list [ref=e688]:
          - listitem [ref=e689]:
            - generic [ref=e690]: Safety
      - navigation "Legal" [ref=e691]:
        - heading "Legal" [level=2] [ref=e692]
        - list [ref=e693]:
          - listitem [ref=e694]:
            - generic [ref=e695]: Terms
          - listitem [ref=e696]:
            - generic [ref=e697]: Privacy
    - paragraph [ref=e699]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (2 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

98 line(s), 34 message(s): 1 off the allowlist, 33 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 10 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 3, shard 6 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>rfn<n>f: e<n>e_par_epyvh<n> → e<n>e_chi_wn<n>nq<n>` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×10 · too many previews ×10 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories badHeader ×2 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · categories wrongFile ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · preview_failed permission denied ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>rfn<n>f: e<n>e_par_epyvh<n> → e<n>e_chi_wn<n>nq<n> ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1 · PW-16 typing is saved without judgement; only Next asks the door to judge the st ×1 · PW-17 the currency is preselected and searchable by name in one control ×1 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1

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
| smoke | 2026-10-19T08:06:30.494Z | 22.8 min |
| email | 2026-10-19T08:06:34.939Z | 0.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 212 | 14.2 min | smoke |
| `auth-signout.spec.ts` | 28 | 7.2 min | smoke |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `smoke-auth-i18n.spec.ts` | 2 | 0.5 min | smoke |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | desktop-1280 | 35.1 s |
| `shell.spec.ts` › LS-11 picking a second market renders its own tree and saves its own node | mobile-360 | 28.8 s |
| `shell.spec.ts` › TR-37 the account carries onto a starless device, and never over a star | mobile-360 | 26.5 s |
| `shell.spec.ts` › TR-37 the account carries onto a starless device, and never over a star | desktop-1280 | 24.4 s |
| `auth-signout.spec.ts` › SP-6 stale stamps from a previous session never sign the new one out | desktop-1280 | 24.2 s |
| `auth-signout.spec.ts` › SP-6 stale stamps from a previous session never sign the new one out | mobile-360 | 21.9 s |
| `shell.spec.ts` › LS-10 a saved area beats the deepest guess | desktop-1280 | 21.5 s |
| `auth-signout.spec.ts` › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189) | desktop-1280 | 20.6 s |
| `a11y.spec.ts` › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y | desktop-1280 | 20.0 s |
| `auth-signout.spec.ts` › SP-3 absolute: continuous activity does not save the session | desktop-1280 | 19.4 s |
| `auth-signout.spec.ts` › SP-2 stay signed in extends past the original deadline | desktop-1280 | 19.1 s |
| `shell.spec.ts` › LS-10 a saved area beats the deepest guess | mobile-360 | 18.7 s |
| `auth-signout.spec.ts` › SP-4 cross-tab: signing out in one tab evacuates the other | desktop-1280 | 18.3 s |
| `auth-signout.spec.ts` › SO-9 a deactivated account's password sign-in never shows the signed-in screen (INC-661) | desktop-1280 | 18.1 s |
| `shell.spec.ts` › PN-1 an old own choice offers an unrelated same-market place, Keep and Switch | mobile-360 | 17.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39216535684-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39216535684-email
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-4rfn9f: e2e_par_epyvh5 → e2e_chi_wn1nq2
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

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-K3--KupY.js:83:25) at http://127.0.0.1:4173/assets/feed-K3--KupY.js:117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CO61j1TC.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5)
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## shard 1: no results file

shard 1: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+39216535684-1-2801-2-rtlv3y@ethio-e2e.invalid)
  ✓  132 [mobile-360] › e2e/admin-audit.spec.ts:90:3 › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log (23.4s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39216535684-1-2801-3-ztzxg4@ethio-e2e.invalid)
  ✓  133 [mobile-360] › e2e/admin-audit.spec.ts:110:3 › U3 audit & security › AS-2 filters: an action filter narrows the list (5.3s)
  ✓  131 [mobile-360] › e2e/admin-attributes-safety.spec.ts:189:3 › Bundle 7 attribute safety › AT-73 Remove from a category names the listings that hold an answer, and removes (33.8s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+39216535684-1-2801-2-rtlv3y@ethio-e2e.invalid)
  ✓  135 [mobile-360] › e2e/admin-attributes-safety.spec.ts:240:3 › Bundle 7 attribute safety › AT-73b a failed holders read shows its error, keeps the confirm disabled and removes nothing (9.0s)
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+39216535684-1-2801-2-rtlv3y@ethio-e2e.invalid)
  ✓  134 [mobile-360] › e2e/admin-audit.spec.ts:155:3 › U3 audit & security › AS-3 the log on the agreed blocks: heading, toolbar, Filters with pills and dates, Columns, page size (14.7s)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
```

## shard 2: no results file

shard 2: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (9) ---
[WebServer] Error in renderToReadableStream: ReferenceError: window is not defined ×4
  ✘  113 [mobile-360] › e2e/i18n-coverage.spec.ts:248:3 › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary (17.9s)
  ✘  115 [mobile-360] › e2e/i18n-coverage.spec.ts:248:3 › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary (retry #1) (14.7s)
  ✘  153 [mobile-360] › e2e/legal-doors.spec.ts:202:3 › Legal doors › LG-1 legal_in_force answers the highest published version whose time has come, global and per country, and never the change log (4.1s)
  ✘  154 [mobile-360] › e2e/legal-doors.spec.ts:202:3 › Legal doors › LG-1 legal_in_force answers the highest published version whose time has come, global and per country, and never the change log (retry #1) (3.6s)
  ✘  160 [mobile-360] › e2e/legal-doors.spec.ts:569:3 › Legal doors › LG-5 my_legal_status lists the version in force until accepted, again after a material version, and scopes country documents to the home country (11.5s)
  ✘  162 [mobile-360] › e2e/legal-doors.spec.ts:569:3 › Legal doors › LG-5 my_legal_status lists the version in force until accepted, again after a material version, and scopes country documents to the home country (retry #1) (11.1s)
  ✘  164 [mobile-360] › e2e/legal-doors.spec.ts:636:3 › Legal doors › LG-6 the settings doors: the seeded row for the super admin, refusals for every lesser caller and every bad value; the row is never written (23.2s)
  ✘  167 [mobile-360] › e2e/legal-doors.spec.ts:636:3 › Legal doors › LG-6 the settings doors: the seeded row for the super admin, refusals for every lesser caller and every bad value; the row is never written (retry #1) (21.4s)
--- final 10 lines ---
✓  185 [mobile-360] › e2e/my-listings-ad.spec.ts:430:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-3 The ad's page: Open from the list, the status and dates, Reserved on and off (D173) (26.7s)
  ✓  184 [mobile-360] › e2e/my-listings-doors.spec.ts:450:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing (43.9s)
  ✓  186 [mobile-360] › e2e/my-listings-ad.spec.ts:505:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-4 No longer available keeps the days left; Reopen gives them back (D174 2) (20.3s)
  ✓  187 [mobile-360] › e2e/my-listings-doors.spec.ts:501:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-3 Reserved on and off, on a live ad only (D173) (22.9s)
  ✓  188 [mobile-360] › e2e/my-listings-ad.spec.ts:554:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-5 Mark as sold asks first; then the ad is sold for good (D175 1) (23.5s)
  ✓  189 [mobile-360] › e2e/my-listings-doors.spec.ts:538:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175) (33.1s)
  ✓  191 [mobile-360] › e2e/my-listings-doors.spec.ts:594:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-5 The price applies at once; Price reduced only for a real drop on a price that stood (D173, D174, D177) (23.6s)
  ✓  190 [mobile-360] › e2e/my-listings-ad.spec.ts:600:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit (44.2s)
  ✓  192 [mobile-360] › e2e/my-listings-doors.spec.ts:656:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-6 An edit's review gives back the days the ad had; an expired ad is renewed before it is edited (D174) (25.9s)
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
✓  101 [mobile-360] › e2e/post-wizard-where.spec.ts:261:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post (38.2s)
  ✓  103 [mobile-360] › e2e/post-wizard-specs.spec.ts:1573:3 › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288) (23.0s)
  ✓  104 [mobile-360] › e2e/post-wizard-where.spec.ts:385:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-88 a step-3 answer's fact and narrowing reach the unit asked on the price page (23.5s)
  ✓  105 [mobile-360] › e2e/post-wizard-specs.spec.ts:1743:3 › POSTING WIZARD › PW-183 under Amharic a year reads with its Ethiopian years, the same on the picker and the review (D45) (21.0s)
  ✓  106 [mobile-360] › e2e/post-wizard-where.spec.ts:438:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is held by the price page's unit (20.8s)
  ✓  107 [mobile-360] › e2e/post-wizard-specs.spec.ts:1795:3 › POSTING WIZARD › PW-159 a list fact ticks its tick list once, and the seller's untick stays (22.7s)
  ✓  108 [mobile-360] › e2e/post-wizard-where.spec.ts:472:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-89 thousand / million: the full amount is stored and shown (22.0s)
  ✓  109 [mobile-360] › e2e/post-wizard-specs.spec.ts:1876:3 › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range (22.2s)
  ✓  110 [mobile-360] › e2e/post-wizard-where.spec.ts:514:3 › POSTING WIZARD — where the ad is shown (W6b-1) › PW-90 two boxes, a red border per unfilled level, the plan in one line (22.7s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
```

## shard 4: no results file

shard 4: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39216535684-4-3003-3-yphw4x@ethio-e2e.invalid)
  ✓  163 [desktop-1280] › e2e/admin-categories-console.spec.ts:594:3 › C2 categories console › CT-9a roster shape: the parent column and a 25-row page (table twin) (14.3s)
  -  165 [desktop-1280] › e2e/admin-categories-console.spec.ts:635:3 › C2 categories console › CT-9b roster shape: the parent line and pagination inside cards
[e2e:pool] slot 0 minted a fresh aal2 session in node (e2e+39216535684-4-3003-2-bdiarr@ethio-e2e.invalid)
  ✓  166 [desktop-1280] › e2e/admin-categories-console.spec.ts:667:3 › C2 categories console › CT-10 parent picker: retired nodes are absent and options carry paths (11.7s)
  ✓  164 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:147:3 › C2 categories console › CT-13 lifecycle: a typed-slug delete removes the row and its dependents (21.9s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39216535684-4-3003-3-yphw4x@ethio-e2e.invalid)
  ✓  168 [desktop-1280] › e2e/admin-categories-lifecycle.spec.ts:225:3 › C2 categories console › CT-14 catch-all law: never a parent, refused server-side, no move verbs (6.2s)
[e2e:pool] slot 1 minted a fresh aal2 session in node (e2e+39216535684-4-3003-3-yphw4x@ethio-e2e.invalid)
```

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-4rfn9f: e2e_par_epyvh5 → e2e_chi_wn1nq2
```

## shard 5: no results file

shard 5: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- error lines (9) ---
  ✘   97 [desktop-1280] › e2e/i18n-coverage.spec.ts:248:3 › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary (16.5s)
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-K3--KupY.js:83:25) at http://127.0.0.1:4173/assets/feed-K3--KupY.js:117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CO61j1TC.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5)
  ✘   98 [desktop-1280] › e2e/i18n-coverage.spec.ts:248:3 › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary (retry #1) (15.6s)
  ✘  138 [desktop-1280] › e2e/legal-doors.spec.ts:202:3 › Legal doors › LG-1 legal_in_force answers the highest published version whose time has come, global and per country, and never the change log (4.8s)
  ✘  139 [desktop-1280] › e2e/legal-doors.spec.ts:202:3 › Legal doors › LG-1 legal_in_force answers the highest published version whose time has come, global and per country, and never the change log (retry #1) (3.3s)
  ✘  147 [desktop-1280] › e2e/legal-doors.spec.ts:569:3 › Legal doors › LG-5 my_legal_status lists the version in force until accepted, again after a material version, and scopes country documents to the home country (10.3s)
  ✘  148 [desktop-1280] › e2e/legal-doors.spec.ts:569:3 › Legal doors › LG-5 my_legal_status lists the version in force until accepted, again after a material version, and scopes country documents to the home country (retry #1) (12.1s)
  ✘  151 [desktop-1280] › e2e/legal-doors.spec.ts:636:3 › Legal doors › LG-6 the settings doors: the seeded row for the super admin, refusals for every lesser caller and every bad value; the row is never written (23.5s)
  ✘  155 [desktop-1280] › e2e/legal-doors.spec.ts:636:3 › Legal doors › LG-6 the settings doors: the seeded row for the super admin, refusals for every lesser caller and every bad value; the row is never written (retry #1) (22.8s)
--- final 10 lines ---
✓  168 [desktop-1280] › e2e/my-listings-doors.spec.ts:450:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing (44.3s)
  ✓  170 [desktop-1280] › e2e/my-listings-ad.spec.ts:554:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-5 Mark as sold asks first; then the ad is sold for good (D175 1) (21.9s)
  ✓  171 [desktop-1280] › e2e/my-listings-doors.spec.ts:501:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-3 Reserved on and off, on a live ad only (D173) (23.2s)
  ✓  172 [desktop-1280] › e2e/my-listings-ad.spec.ts:600:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit (45.2s)
  ✓  173 [desktop-1280] › e2e/my-listings-doors.spec.ts:538:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175) (32.7s)
  ✓  174 [desktop-1280] › e2e/my-listings-ad.spec.ts:674:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-7 Delete asks first; the deleted ad leaves My listings for good (call F) (28.2s)
  ✓  175 [desktop-1280] › e2e/my-listings-doors.spec.ts:594:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-5 The price applies at once; Price reduced only for a real drop on a price that stood (D173, D174, D177) (22.8s)
  ✓  176 [desktop-1280] › e2e/my-listings-ad.spec.ts:740:3 › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-8 A seller who also holds listings:enforce deletes his own ad as its owner; a deleted ad is never restored (25.8s)
  ✓  177 [desktop-1280] › e2e/my-listings-doors.spec.ts:656:3 › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-6 An edit's review gives back the days the ad had; an expired ad is renewed before it is edited (D174) (30.1s)
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
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-K3--KupY.js:83:25) at http://127.0.0.1:4173/assets/feed-K3--KupY.js:117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CO61j1TC.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5)
```

## shard 6: no results file

shard 6: no results file — the process failed outside test results (setup/teardown/preflight).

```text
--- final 10 lines ---
✓  127 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:114:3 › POSTING ROUTES — catalogue changes › PR-34 removed held question is released by autosave and strict route save (17.0s)
  ✓  128 [desktop-1280] › e2e/post-wizard-specs.spec.ts:2568:3 › POSTING WIZARD › PW-157 a category pointer in help text asks, then moves the ad and keeps the answer (19.4s)
  ✓  129 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:143:3 › POSTING ROUTES — catalogue changes › PR-35 removed held option is released; a required strict question asks again (17.6s)
  ✓  130 [desktop-1280] › e2e/post-wizard-specs.spec.ts:2629:3 › POSTING WIZARD › PW-158 a pointer to a category that is gone draws nothing and no braces (16.2s)
  ✓  131 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:184:3 › POSTING ROUTES — catalogue changes › PR-36 new unknown key and new unknown option remain refused (14.6s)
  ✓  132 [desktop-1280] › e2e/posting-routes-dials.spec.ts:133:3 › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial (11.8s)
  ✓  134 [desktop-1280] › e2e/posting-routes-dials.spec.ts:156:3 › POSTING DOOR DIALS › PR-28 transition_listing counts against the revise dial (13.5s)
  ✓  133 [desktop-1280] › e2e/posting-routes-catalog.spec.ts:209:3 › POSTING ROUTES — catalogue changes › PR-40 a removed question or option is let go once, then the same body is refused (19.3s)
  ✓  135 [desktop-1280] › e2e/posting-routes-dials.spec.ts:168:3 › POSTING DOOR DIALS › PR-29 renew_listing counts against the revise dial (14.4s)
```

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```
