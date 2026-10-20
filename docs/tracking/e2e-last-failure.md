# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39441214162
- Commit: `17e867e2e28f169f11c2436dd4cbc4a4db316a7c`
- Attempt: 1
- Written (UTC): 2026-10-20T15:35:19.553Z
- Passed: 2116 · Skipped: 154 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 5
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width — Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Ebtqcvuasxzsmuehpuaoyldftheuwrdnxbwibgbgelmvetop","furthestElement":"breadcrumb-ad","crumbHeight":20}
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · feed-index.spec.ts › FEED INDEX › FE-9 an extra place removed or added changes the rows — Test timeout of 60000ms exceeded while running "afterEach" hook.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › SHELL — the phone page never widens (bundle 21 turn 10) › OVW-2 a 2000-px child never widens the page, and the sub-band still sticks — Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · shell.spec.ts › L4b location picker › LS-7 a region code alone selects the region — Error: the ET tree never carried e2e-loc-6-0-gs-region-0ylh1s within 20 s

## Flaky bodies (DEC-078)

### ad-page.spec.ts › AD PAGE — the phone page never widens (bundle 21 turn 10) › OVW-1 long unbroken words keep the ad page the screen's width

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Ebtqcvuasxzsmuehpuaoyldftheuwrdnxbwibgbgelmvetop","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1,"band":390,"furthest":382,"furthestText":"E2E Ebtqcvuasxzsmuehpuaoyldftheuwrdnxbwibgbgelmvetop","furthestElement":"breadcrumb-ad","crumbHeight":20}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  1877 |     expect(measured.innerWidth, JSON.stringify(measured)).toBe(390);
  1878 |     expect(measured.scrollWidth, JSON.stringify(measured)).toBeLessThanOrEqual(390);
> 1879 |     expect(Math.abs(measured.bottomBar - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
       |                                                                          ^
  1880 |     expect(Math.abs(measured.band - 390), JSON.stringify(measured)).toBeLessThanOrEqual(1);
  1881 |     expect(measured.furthest, JSON.stringify(measured)).toBeLessThanOrEqual(390);
  1882 |     expect(measured.crumbHeight, JSON.stringify(measured)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1879:74
```

Context:

```text
          - listitem [ref=e340]:
            - generic [ref=e341]: About
          - listitem [ref=e342]:
            - generic [ref=e343]: Contact
      - navigation "Help" [ref=e344]:
        - heading "Help" [level=2] [ref=e345]
        - list [ref=e346]:
          - listitem [ref=e347]:
            - generic [ref=e348]: Safety
      - navigation "Legal" [ref=e349]:
        - heading "Legal" [level=2] [ref=e350]
        - list [ref=e351]:
          - listitem [ref=e352]:
            - link "Terms" [ref=e353] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e354]:
            - link "Privacy" [ref=e355] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e357]: © 2026 ethio.com — All rights reserved.
```
```

### feed-index.spec.ts › FEED INDEX › FE-9 an extra place removed or added changes the rows

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded while running "afterEach" hook.
--- further error 1 ---
Test timeout of 60000ms exceeded while running "afterEach" hook.

  34 |   const branches: string[][] = [];
  35 |
> 36 |   test.afterEach(async () => {
     |        ^
  37 |     for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
  38 |     for (const slug of regions.splice(0)) await destroyLocation(slug);
  39 |     for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-index.spec.ts:36:8
```

Context: context file not found for `feed-index-FEED-INDEX-FE-9-an-extra-place-removed-or-added-changes-the-rows-mobile-360` — Playwright's name `feed-index-FEED-INDEX-FE-9-ff177-d-or-added-changes-the-rows-mobile-360`; this run carried 5 context file(s); of the same spec: none

### shell.spec.ts › SHELL — the phone page never widens (bundle 21 turn 10) › OVW-2 a 2000-px child never widens the page, and the sub-band still sticks

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391
--- further error 1 ---
Error: {"innerWidth":390,"scrollWidth":390,"bottomBar":-1}

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    391

  4199 |       expect(before.innerWidth, JSON.stringify(before)).toBe(390);
  4200 |       expect(before.scrollWidth, JSON.stringify(before)).toBeLessThanOrEqual(390);
> 4201 |       expect(Math.abs(before.bottomBar - 390), JSON.stringify(before)).toBeLessThanOrEqual(1);
       |                                                                        ^
  4202 |       await page.evaluate(() => window.scrollTo(0, 600));
  4203 |       await expect
  4204 |         .poll(() =>
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:4201:72
--- client errors of this attempt (DEC-177) ---
[client-error] pageerror: Error: Minified React error #418; visit https://react.dev/errors/418?args[]=HTML&args[]= for the full message or use the non-minified dev environment for full errors and additional helpful warnings. at throwOnHydrationMismatch (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:1984:50) at popHydrationState (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:2052:48) at completeWork (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:4858:10) at completeUnitOfWork (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:6688:15) at performUnitOfWork (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:6634:19) at workLoopConcurrentByScheduler (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:6629:54) at renderRootConcurrent (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:6612:5) at performWorkOnRoot (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:6278:188) at performWorkOnRootViaSchedulerTask (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:7080:3) at MessagePort.performWorkUntilDeadline (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:112:37)
```

Context:

```text
          - listitem [ref=e227]:
            - generic [ref=e228]: About
          - listitem [ref=e229]:
            - generic [ref=e230]: Contact
      - navigation "Help" [ref=e231]:
        - heading "Help" [level=2] [ref=e232]
        - list [ref=e233]:
          - listitem [ref=e234]:
            - generic [ref=e235]: Safety
      - navigation "Legal" [ref=e236]:
        - heading "Legal" [level=2] [ref=e237]
        - list [ref=e238]:
          - listitem [ref=e239]:
            - link "Terms" [ref=e240] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e241]:
            - link "Privacy" [ref=e242] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e244]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/my_listing ({"code":"P0001","details":null,"hint":null,"message":"not your listing"})
```

Context:

```text
          - listitem [ref=e148]:
            - generic [ref=e149]: About
          - listitem [ref=e150]:
            - generic [ref=e151]: Contact
      - navigation "Help" [ref=e152]:
        - heading "Help" [level=2] [ref=e153]
        - list [ref=e154]:
          - listitem [ref=e155]:
            - generic [ref=e156]: Safety
      - navigation "Legal" [ref=e157]:
        - heading "Legal" [level=2] [ref=e158]
        - list [ref=e159]:
          - listitem [ref=e160]:
            - link "Terms" [ref=e161] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e162]:
            - link "Privacy" [ref=e163] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e165]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › L4b location picker › LS-7 a region code alone selects the region

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: the ET tree never carried e2e-loc-6-0-gs-region-0ylh1s within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-6-0-gs-region-0ylh1s"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-2-0-ls-region-373zhy", "e2e-loc-2-0-ls-region-auygxq", "e2e-loc-2-1-ls-region-8nscoj", "e2e-loc-3-1-ls-region-tpkaho", "e2e-loc-5-1-ls-region-277ttb", "e2e-loc-6-0-gs-region-iu6ol5", …]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: the ET tree never carried e2e-loc-6-0-gs-region-0ylh1s within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-6-0-gs-region-0ylh1s"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-2-0-ls-region-373zhy", "e2e-loc-2-0-ls-region-auygxq", "e2e-loc-2-1-ls-region-8nscoj", "e2e-loc-3-1-ls-region-tpkaho", "e2e-loc-5-1-ls-region-277ttb", "e2e-loc-6-0-gs-region-iu6ol5", …]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

   at helpers/locations.ts:482

  480 | export async function waitForTreeSlug(page: Page, countryCode: string, slug: string) {
  481 |   let seen: string[] = [];
> 482 |   await expect
      |   ^
  483 |     .poll(
  484 |       async () => {
  485 |         seen = await treeSlugs(page, countryCode);
    at waitForTreeSlug (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:482:3)
```

Context: context file not found for `shell-L4b-location-picker-LS-7-a-region-code-alone-selects-the-region-desktop-1280` — Playwright's name `shell-L4b-location-picker--30e15-de-alone-selects-the-region-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

110 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ct<n>c<n>: e<n>e_par_<n>uhc<n> → e<n>e_chi_lmuuh<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-dhzzhs: e<n>e_par_<n>g<n>l<n> → e<n>e_chi_me<n>str` (quiet) | 1 | shard 4 |
| `name_folds_rebuild: canceling statement due to statement timeout` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ct<n>c<n>: e<n>e_par_<n>uhc<n> → e<n>e_chi_lmuuh<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-dhzzhs: e<n>e_par_<n>g<n>l<n> → e<n>e_chi_me<n>str ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-45 a declared swatch renders one ink, a two-tone and a pattern tile ×2 · an empty category shows the invitation alone, never the old box (D215) ×1 · location row is present on Marketplace and absent on Account ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### name_folds_rebuild: canceling statement due to statement timeout

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CO-7 transfer: the markets file round-trips through the header's Import and the  ×1 · CO-8 geometry: nothing overflows and every verb is reachable in both twins ×1

```text
[WebServer] [ssr-error] /api/admin/categories/import name_folds_rebuild: canceling statement due to statement timeout
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-20T14:42:24.773Z | 22.6 min |
| email | 2026-10-20T14:43:43.523Z | 0.2 min |
| shard 1 | 2026-10-20T14:43:54.432Z | 51.1 min |
| shard 2 | 2026-10-20T14:40:47.827Z | 39.8 min |
| shard 3 | 2026-10-20T14:44:00.004Z | 42.7 min |
| shard 4 | 2026-10-20T14:44:38.508Z | 42.6 min |
| shard 5 | 2026-10-20T14:44:38.782Z | 48.6 min |
| shard 6 | 2026-10-20T14:41:10.068Z | 36.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 82 | 28.8 min | shard 3, shard 6 |
| `shell.spec.ts` | 424 | 28.0 min | smoke, shard 3, shard 6 |
| `ad-page.spec.ts` | 68 | 27.1 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 66 | 23.7 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 62 | 19.5 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 80 | 18.9 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 18.0 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 18.0 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 15.8 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 15.1 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 14.4 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 13.8 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.8 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 13.5 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 13.5 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.6 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 11.4 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 11.1 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 36 | 10.9 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 10.3 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 10.1 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.2 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.9 min | shard 2, shard 5 |
| `legal-certify.spec.ts` | 26 | 8.3 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.1 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.8 min | shard 2, shard 5 |
| `legal-doors.spec.ts` | 32 | 7.6 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 7.5 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.4 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 7.3 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.3 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.9 min | shard 3, shard 6 |
| `my-listings-page.spec.ts` | 16 | 6.8 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.5 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 6.5 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 6.3 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.2 min | shard 2, shard 5 |
| `legal-admin.spec.ts` | 28 | 5.0 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 4.4 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.1 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 4.0 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.9 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 12 | 2.3 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 2.2 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `legal-accept.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `legal-history.spec.ts` | 6 | 1.4 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.2 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.9 min | smoke, shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 0.9 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `settings.spec.ts` | 4 | 0.8 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 114.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 90.0 s |
| `feed-index.spec.ts` › FE-9 an extra place removed or added changes the rows | mobile-360 | 83.9 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 73.4 s |
| `ad-page.spec.ts` › AP-37 the in-page bar scrolls to each section and stays under the sub-band | mobile-360 | 64.5 s |
| `ad-page.spec.ts` › OVW-1 long unbroken words keep the ad page the screen's width | mobile-360 | 61.5 s |
| `admin-categories-console.spec.ts` › CT-6 retirement: a retired category leaves the active tree and keeps its listings home | mobile-360 | 59.2 s |
| `my-listings-doors.spec.ts` › ML-3 Reserved on and off, on a live ad only (D173) | desktop-1280 | 55.6 s |
| `posting-routes.spec.ts` › PR-21 step 7: private columns are owner-only, through my_listing_private | desktop-1280 | 55.3 s |
| `photo-pipeline.spec.ts` › PP-22 the buyer's preview is a gallery: thumbnails, arrows, a swipe and a full-screen viewer | mobile-360 | 55.0 s |
| `admin-categories-home.spec.ts` › CT-41 the admin's own client cannot write the eight door tables; the doors still can | mobile-360 | 54.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 53.6 s |
| `post-wizard-specs.spec.ts` › PW-157 a category pointer in help text asks, then moves the ad and keeps the answer | mobile-360 | 53.1 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 51.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 51.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39441214162-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39441214162-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39441214162-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39441214162-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39441214162-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39441214162-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39441214162-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39441214162-6
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-37 the in-page bar scrolls to each section and stays under the sub-band

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AP-37 seller at 271 ms: current description

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
-   "seller",
+   "description",
  ]
--- further error 1 ---
Error: AP-37 seller at 271 ms: current description

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
-   "seller",
+   "description",
  ]

  1038 |           sample.current,
  1039 |           `AP-37 ${target} at ${sample.elapsed} ms: current ${sample.current.join(",") || "none"}`,
> 1040 |         ).toEqual([target]);
       |           ^
  1041 |       }
  1042 |     };
  1043 |     const sellerItem = bar.locator('[data-target="seller"]');
    at sampleScroll (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1040:11)
```

Context:

```text
          - listitem [ref=e361]:
            - generic [ref=e362]: About
          - listitem [ref=e363]:
            - generic [ref=e364]: Contact
      - navigation "Help" [ref=e365]:
        - heading "Help" [level=2] [ref=e366]
        - list [ref=e367]:
          - listitem [ref=e368]:
            - generic [ref=e369]: Safety
      - navigation "Legal" [ref=e370]:
        - heading "Legal" [level=2] [ref=e371]
        - list [ref=e372]:
          - listitem [ref=e373]:
            - link "Terms" [ref=e374] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e375]:
            - link "Privacy" [ref=e376] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e378]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-4-ct6c35: e2e_par_8uhc08 → e2e_chi_lmuuh2
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).
