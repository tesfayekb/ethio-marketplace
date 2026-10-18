# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39096720222
- Commit: `4322efa1cf7120d5aaf6ce79aed982e4bee848e2`
- Attempt: 1
- Written (UTC): 2026-10-18T05:11:30.751Z
- Passed: 1896 · Skipped: 130 · Failed: 9
- Gating failures: 9 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 13
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-coverage.spec.ts › L2b coverage console › CV-2 roster: the free plan renders its three limits and its everywhere state, on the agreed toolbar — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-11 edit_my_listing: amounts and picked answers apply at once; words and a refused ad's edit go to review (D177) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes.spec.ts › POSTING ROUTES › PR-9 catalog finder is bounded, multilingual and rate-limited — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes.spec.ts › POSTING ROUTES › D189 deactivated seller › PR-52 the assist peek answers the budget without spending, and refuses what is not the caller's (INC-669) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › L4b location picker › LS-13 a second city stops the auto-select at the region — Error: the open-market list never carried QS within 20 s
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-3 An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-coverage.spec.ts › L2b coverage console › CV-2 roster: the free plan renders its three limits and its everywhere state, on the agreed toolbar

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('bottom-bar-account')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('bottom-bar-account')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('bottom-bar-account')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('bottom-bar-account')


   at helpers/ui.ts:941

  939 |   await gotoReady(page, "/");
  940 |   await assertInjectedIdentity(page, session);
> 941 |   await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
      |                                      ^
  942 |   await waitForHydration(page);
  943 |   // READ-BACK from the client: the injected session really is AAL2.
```

Context:

```text
          - listitem [ref=e87]:
            - generic [ref=e88]: About
          - listitem [ref=e89]:
            - generic [ref=e90]: How it works
      - navigation "Help" [ref=e91]:
        - heading "Help" [level=2] [ref=e92]
        - list [ref=e93]:
          - listitem [ref=e94]:
            - generic [ref=e95]: Safety
          - listitem [ref=e96]:
            - generic [ref=e97]: Contact
      - navigation "Legal" [ref=e98]:
        - heading "Legal" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Terms
          - listitem [ref=e103]:
            - generic [ref=e104]: Privacy
    - paragraph [ref=e106]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-11 edit_my_listing: amounts and picked answers apply at once; words and a refused ad's edit go to review (D177)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:ml] listing 72a4feee-4418-4596-a91b-4bae3190357d not found

  172 |     .maybeSingle();
  173 |   if (error) throw new Error(`[e2e:ml] listing read failed: ${error.message}`);
> 174 |   if (!data) throw new Error(`[e2e:ml] listing ${listingId} not found`);
      |                    ^
  175 |   return data as unknown as Row;
  176 | }
  177 |
    at listingTruth (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:174:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:951:15
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-11-edit_my_listing-amounts-and-picked-answers-apply-at-once-words-and-a-refused-ad-s-edit-go-to-review-D177-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-d5fb4-d-s-edit-go-to-review-D177--mobile-360`; this run carried 18 context file(s); of the same spec: none

### my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e266]:
            - generic [ref=e267]: About
          - listitem [ref=e268]:
            - generic [ref=e269]: How it works
      - navigation "Help" [ref=e270]:
        - heading "Help" [level=2] [ref=e271]
        - list [ref=e272]:
          - listitem [ref=e273]:
            - generic [ref=e274]: Safety
          - listitem [ref=e275]:
            - generic [ref=e276]: Contact
      - navigation "Legal" [ref=e277]:
        - heading "Legal" [level=2] [ref=e278]
        - list [ref=e279]:
          - listitem [ref=e280]:
            - generic [ref=e281]: Terms
          - listitem [ref=e282]:
            - generic [ref=e283]: Privacy
    - paragraph [ref=e285]: © 2026 ethio.com — All rights reserved.
```
```

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: meta.webp: {"ok":false,"refusals":[{"field":"door","reason":"doorError"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  197 |       const answer = await uploadPhoto(page, { listingId, token, cover: { name } });
  198 |       expect(answer.status, `${name}: ${JSON.stringify(answer.payload)}`).toBe(200);
> 199 |       expect(answer.payload["ok"], `${name}: ${JSON.stringify(answer.payload)}`).toBe(true);
      |                                                                                  ^
  200 |
  201 |       const rows = await photoRowsOf(listingId);
  202 |       expect(rows, `PP-2 ${name}: no row was registered`).toHaveLength(1);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:199:82
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-2-a-PNG-and-a-WebP-carrying-metadata-chunks-are-stored-as-image-data-only-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-0aed8-e-stored-as-image-data-only-mobile-360`; this run carried 18 context file(s); of the same spec: none

### posting-routes.spec.ts › POSTING ROUTES › PR-9 catalog finder is bounded, multilingual and rate-limited

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500

  603 |       { headers },
  604 |     );
> 605 |     expect(amharic.status()).toBe(200);
      |                              ^
  606 |     const amharicBody = (await amharic.json()) as {
  607 |       results?: Array<{ slug?: string; path?: string[] }>;
  608 |     };
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:605:30
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-9-catalog-finder-is-bounded-multilingual-and-rate-limited-mobile-360` — Playwright's name `posting-routes-POSTING-ROU-a9542-ltilingual-and-rate-limited-mobile-360`; this run carried 18 context file(s); of the same spec: `posting-routes-POSTING-ROU-87ecb-s-not-the-caller-s-INC-669--mobile-360`

### posting-routes.spec.ts › POSTING ROUTES › D189 deactivated seller › PR-52 the assist peek answers the budget without spending, and refuses what is not the caller's (INC-669)

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"listingId","reason":"notYourListing"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  1476 |         expect(peek.status()).toBe(200);
  1477 |         const payload = await peek.json();
> 1478 |         expect(payload["ok"], JSON.stringify(payload)).toBe(true);
       |                                                        ^
  1479 |         expect(payload["triesLeft"], JSON.stringify(payload)).toBe(4);
  1480 |       }
  1481 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1478:56
```

Context:

```text
          - listitem [ref=e263]:
            - generic [ref=e264]: About
          - listitem [ref=e265]:
            - generic [ref=e266]: How it works
      - navigation "Help" [ref=e267]:
        - heading "Help" [level=2] [ref=e268]
        - list [ref=e269]:
          - listitem [ref=e270]:
            - generic [ref=e271]: Safety
          - listitem [ref=e272]:
            - generic [ref=e273]: Contact
      - navigation "Legal" [ref=e274]:
        - heading "Legal" [level=2] [ref=e275]
        - list [ref=e276]:
          - listitem [ref=e277]:
            - generic [ref=e278]: Terms
          - listitem [ref=e279]:
            - generic [ref=e280]: Privacy
    - paragraph [ref=e282]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › L4b location picker › LS-13 a second city stops the auto-select at the region

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: the open-market list never carried QS within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "QS"
Received array: ["ET", "QM", "US"]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: the open-market list never carried QS within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "QS"
Received array: ["ET", "QM", "US"]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

   at helpers/locations.ts:618

  616 |
  617 | export async function waitForOpenMarket(page: Page, code: string, timeoutMs = 20_000) {
> 618 |   await expect
      |   ^
  619 |     .poll(
  620 |       async () => {
  621 |         // A test poll must never PRIME the browser cache with a stale answer the
    at waitForOpenMarket (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:618:3)
```

Context: context file not found for `shell-L4b-location-picker-LS-13-a-second-city-stops-the-auto-select-at-the-region-mobile-360` — Playwright's name `shell-L4b-location-picker--28524-e-auto-select-at-the-region-mobile-360`; this run carried 18 context file(s); of the same spec: none

### admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e312]:
            - generic [ref=e313]: About
          - listitem [ref=e314]:
            - generic [ref=e315]: How it works
      - navigation "Help" [ref=e316]:
        - heading "Help" [level=2] [ref=e317]
        - list [ref=e318]:
          - listitem [ref=e319]:
            - generic [ref=e320]: Safety
          - listitem [ref=e321]:
            - generic [ref=e322]: Contact
      - navigation "Legal" [ref=e323]:
        - heading "Legal" [level=2] [ref=e324]
        - list [ref=e325]:
          - listitem [ref=e326]:
            - generic [ref=e327]: Terms
          - listitem [ref=e328]:
            - generic [ref=e329]: Privacy
    - paragraph [ref=e331]: © 2026 ethio.com — All rights reserved.
```
```

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-3 An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-3-An-account-with-no-listing-right-All-listings-the-listing-s-page-and-Edit-refuse-it-nothing-is-written-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-7bc3c-efuse-it-nothing-is-written-desktop-1280`; this run carried 18 context file(s); of the same spec: none

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('post-review')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('post-review')


  1199 |       await page.keyboard.press("Tab");
  1200 |       await page.getByTestId("post-next").click();
> 1201 |       await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 15000 });
       |                                                     ^
  1202 |       await expect(page.getByTestId("post-edit-notice")).toHaveText(
  1203 |         en["myListings.editBox.doneReview"],
  1204 |         { timeout: 15000 },
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:1201:53
```

Context:

```text
          - listitem [ref=e324]:
            - generic [ref=e325]: About
          - listitem [ref=e326]:
            - generic [ref=e327]: How it works
      - navigation "Help" [ref=e328]:
        - heading "Help" [level=2] [ref=e329]
        - list [ref=e330]:
          - listitem [ref=e331]:
            - generic [ref=e332]: Safety
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Legal" [ref=e335]:
        - heading "Legal" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Terms
          - listitem [ref=e340]:
            - generic [ref=e341]: Privacy
    - paragraph [ref=e343]: © 2026 ethio.com — All rights reserved.
```
```

- my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing · `desktop-1280` · source `shard 5` — body omitted: cap
- my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in · `desktop-1280` · source `shard 5` — body omitted: cap
- photo-pipeline.spec.ts › PHOTO PIPELINE › PP-3 a PDF renamed .jpg is refused unsupportedFormat · `desktop-1280` · source `shard 5` — body omitted: cap

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

109 line(s), 38 message(s): 3 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 3, shard 6 |
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
| `catalog search: canceling statement due to statement timeout \| at catalogSearch (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/address-JXvhEq<n>i.mjs:<n>:<n>)` | 1 | shard 3 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>k<n>a<n>p: e<n>e_par_<n>y<n>y<n> → e<n>e_chi_<n>btwyd` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-cyhu<n>g: e<n>e_par_<n>ysa<n> → e<n>e_chi_vyxafz` (quiet) | 1 | shard 4 |
| `register_listing_photo: listing not found` | 1 | shard 2 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>k<n>a<n>p: e<n>e_par_<n>y<n>y<n> → e<n>e_chi_<n>btwyd ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-cyhu<n>g: e<n>e_par_<n>ysa<n> → e<n>e_chi_vyxafz ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-45 a declared swatch renders one ink, a two-tone and a pattern tile ×2 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1 · PW-17 the currency is preselected and searchable by name in one control ×1 · PW-26 a category change drops the details the new category never asks ×1 · PW-31 the market select waits for the prefill chain and never preselects ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### catalog search: canceling statement due to statement timeout | at catalogSearch (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/address-JXvhEq<n>i.mjs:<n>:<n>)

- Count: 1 · Sources: shard 3
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): primary touch targets are at least 44px ×1 · the bottom bar, signed out ×1

```text
[WebServer] [ssr-error] /api/catalog/find catalog search: canceling statement due to statement timeout | at catalogSearch (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/address-JXvhEq3i.mjs:40:23)
```

### register_listing_photo: listing not found

- Count: 1 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): MLP-3 My Listings opens its own page; signed out, the page asks to sign in ×1 · PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only ×1

```text
[WebServer] [ssr-error] /api/upload/photo register_listing_photo: listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-18T04:26:59.351Z | 17.4 min |
| email | 2026-10-18T04:27:00.422Z | 0.2 min |
| shard 1 | 2026-10-18T04:27:10.008Z | 44.1 min |
| shard 2 | 2026-10-18T04:27:19.026Z | 43.8 min |
| shard 3 | 2026-10-18T04:27:00.128Z | 33.9 min |
| shard 4 | 2026-10-18T04:26:59.172Z | 41.3 min |
| shard 5 | 2026-10-18T04:27:07.029Z | 43.2 min |
| shard 6 | 2026-10-18T04:27:02.197Z | 32.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 66 | 27.1 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 66 | 24.9 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 21.9 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 21.9 min | smoke, shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 17.0 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 66 | 16.4 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 15.7 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 15.5 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.3 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 14.1 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 14.0 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 13.6 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 11.9 min | smoke, shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 11.8 min | shard 3, shard 6 |
| `ad-page-doors.spec.ts` | 30 | 11.2 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.1 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 10.7 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 30 | 10.3 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 10.3 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 9.6 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.6 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 9.5 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 9.4 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.7 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 8.6 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 8.3 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 8.1 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 7.8 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 7.4 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.1 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 7.0 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 38 | 6.4 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 6.1 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 5.3 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.2 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.6 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 4.0 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.8 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.0 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.8 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 2, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 2.3 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 2.3 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.2 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.0 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.8 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.2 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 1.0 min | smoke, shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.8 min | shard 1, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.4 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 123.2 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 121.2 s |
| `my-listings-doors.spec.ts` › ML-11 edit_my_listing: amounts and picked answers apply at once; words and a refused ad's edit go to review (D177) | mobile-360 | 111.2 s |
| `photo-pipeline.spec.ts` › PP-2 a PNG and a WebP carrying metadata chunks are stored as image data only | mobile-360 | 107.1 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | mobile-360 | 102.0 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | desktop-1280 | 100.3 s |
| `admin-countries.spec.ts` › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin | desktop-1280 | 83.8 s |
| `posting-routes.spec.ts` › PR-52 the assist peek answers the budget without spending, and refuses what is not the caller's (INC-669) | mobile-360 | 79.4 s |
| `shell.spec.ts` › LS-13 a second city stops the auto-select at the region | mobile-360 | 79.0 s |
| `photo-pipeline.spec.ts` › PP-3 a PDF renamed .jpg is refused unsupportedFormat | desktop-1280 | 78.8 s |
| `admin-listings.spec.ts` › AL-3 An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written | desktop-1280 | 77.8 s |
| `photo-pipeline.spec.ts` › PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613) | desktop-1280 | 77.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-37 undoing a category delete restores its attribute links or names the skipped ones | mobile-360 | 71.7 s |
| `ad-page.spec.ts` › AP-45 the tabs on a wide screen | desktop-1280 | 67.1 s |
| `my-listings-ad.spec.ts` › MLA-14 Edit from the list's row opens the wizard's Review; Post similar opens a new draft (D194, D182 4) | mobile-360 | 65.0 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39096720222-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39096720222-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39096720222-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 37 (pool 4, fresh 33)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 49 user(s) owned by process 39096720222-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39096720222-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39096720222-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39096720222-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39096720222-6
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-37 the in-page bar scrolls to each section and stays under the sub-band

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('listing-section-nav').getByTestId('listing-section-nav-item')
Expected: 4
Received: 3
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('listing-section-nav').getByTestId('listing-section-nav-item')
    14 × locator resolved to 3 elements
       - unexpected value "3"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('listing-section-nav').getByTestId('listing-section-nav-item')
Expected: 4
Received: 3
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('listing-section-nav').getByTestId('listing-section-nav-item')
    14 × locator resolved to 3 elements
       - unexpected value "3"


  965 |     await gotoReady(page, (await address(ad)).canonical);
  966 |     const bar = page.getByTestId("listing-section-nav");
> 967 |     await expect(bar.getByTestId("listing-section-nav-item")).toHaveCount(4);
      |                                                               ^
  968 |     expect(
  969 |       await bar
```

Context:

```text
          - listitem [ref=e345]:
            - generic [ref=e346]: About
          - listitem [ref=e347]:
            - generic [ref=e348]: How it works
      - navigation "Help" [ref=e349]:
        - heading "Help" [level=2] [ref=e350]
        - list [ref=e351]:
          - listitem [ref=e352]:
            - generic [ref=e353]: Safety
          - listitem [ref=e354]:
            - generic [ref=e355]: Contact
      - navigation "Legal" [ref=e356]:
        - heading "Legal" [level=2] [ref=e357]
        - list [ref=e358]:
          - listitem [ref=e359]:
            - generic [ref=e360]: Terms
          - listitem [ref=e361]:
            - generic [ref=e362]: Privacy
    - paragraph [ref=e364]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-47 the in-page bar shows no scrollbar (INC-717)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('listing-section-nav').getByTestId('listing-section-nav-item')
Expected: 4
Received: 3
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('listing-section-nav').getByTestId('listing-section-nav-item')
    14 × locator resolved to 3 elements
       - unexpected value "3"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('listing-section-nav').getByTestId('listing-section-nav-item')
Expected: 4
Received: 3
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('listing-section-nav').getByTestId('listing-section-nav-item')
    14 × locator resolved to 3 elements
       - unexpected value "3"


  1579 |     await gotoReady(page, (await address(ad)).canonical);
  1580 |     const bar = page.getByTestId("listing-section-nav");
> 1581 |     await expect(bar.getByTestId("listing-section-nav-item")).toHaveCount(4);
       |                                                               ^
  1582 |     const scrollbarWidth = await bar.evaluate((nav) => getComputedStyle(nav).scrollbarWidth);
  1583 |     expect(scrollbarWidth).toBe("none");
```

Context:

```text
          - listitem [ref=e319]:
            - generic [ref=e320]: About
          - listitem [ref=e321]:
            - generic [ref=e322]: How it works
      - navigation "Help" [ref=e323]:
        - heading "Help" [level=2] [ref=e324]
        - list [ref=e325]:
          - listitem [ref=e326]:
            - generic [ref=e327]: Safety
          - listitem [ref=e328]:
            - generic [ref=e329]: Contact
      - navigation "Legal" [ref=e330]:
        - heading "Legal" [level=2] [ref=e331]
        - list [ref=e332]:
          - listitem [ref=e333]:
            - generic [ref=e334]: Terms
          - listitem [ref=e335]:
            - generic [ref=e336]: Privacy
    - paragraph [ref=e338]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-places')
Expected substring: "Adama"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-places')

--- further error 1 ---
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-places')
Expected substring: "Adama"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-places')


  647 |     // city shows in the sheet's place line (INC-721).
  648 |     await expect(sheet.getByTestId("listing-detail-location")).toHaveCount(0);
> 649 |     await expect(sheet.getByTestId("listing-detail-places")).toContainText(cityName);
      |                                                              ^
  650 |     await expect(sheet.getByTestId("listing-section-nav")).toHaveCount(0);
  651 |     await page.getByTestId("post-preview-close").click();
  652 |     await expect(sheet, "PW-13: the preview sheet would not close").toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:649:62
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-mobile-360` — Playwright's name `post-wizard-place-POSTING--4521b-ands-in-review-—-never-live-mobile-360`; this run carried 18 context file(s); of the same spec: none

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-45 the tabs on a wide screen

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).not.toHaveAttribute(expected) failed

Locator:  getByTestId('listing-section-nav').locator('[data-target="details"]')
Expected: not "true"
Received: "true"
Timeout:  10000ms

Call log:
  - Expect "not toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-section-nav').locator('[data-target="details"]')
    14 × locator resolved to <button type="button" aria-current="true" data-target="details" data-testid="listing-section-nav-item" class="inline-flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 py-2 min-h-11 flex-1 justify-center rounded-none borde…>Details</button>
       - unexpected value "true"

--- further error 1 ---
Error: expect(locator).not.toHaveAttribute(expected) failed

Locator:  getByTestId('listing-section-nav').locator('[data-target="details"]')
Expected: not "true"
Received: "true"
Timeout:  10000ms

Call log:
  - Expect "not toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-section-nav').locator('[data-target="details"]')
    14 × locator resolved to <button type="button" aria-current="true" data-target="details" data-testid="listing-section-nav-item" class="inline-flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 py-2 min-h-11 flex-1 justify-center rounded-none borde…>Details</button>
       - unexpected value "true"


  1426 |         "true",
  1427 |       );
> 1428 |       await expect(bar.locator('[data-target="details"]')).not.toHaveAttribute(
       |                                                                ^
  1429 |         "aria-current",
  1430 |         "true",
```

Context:

```text
          - listitem [ref=e361]:
            - generic [ref=e362]: About
          - listitem [ref=e363]:
            - generic [ref=e364]: How it works
      - navigation "Help" [ref=e365]:
        - heading "Help" [level=2] [ref=e366]
        - list [ref=e367]:
          - listitem [ref=e368]:
            - generic [ref=e369]: Safety
          - listitem [ref=e370]:
            - generic [ref=e371]: Contact
      - navigation "Legal" [ref=e372]:
        - heading "Legal" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - generic [ref=e376]: Terms
          - listitem [ref=e377]:
            - generic [ref=e378]: Privacy
    - paragraph [ref=e380]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-46 Save and Share sit in the title box

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    251
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    251

  1561 |       expect(
  1562 |         Math.abs(headlineBox.y + headlineBox.height - (mediaBox.y + mediaBox.height)),
> 1563 |       ).toBeLessThanOrEqual(1);
       |         ^
  1564 |   });
  1565 |
  1566 |   test("AP-47 the in-page bar shows no scrollbar (INC-717)", async ({ page }, testInfo) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1563:9
```

Context:

```text
          - listitem [ref=e286]:
            - generic [ref=e287]: About
          - listitem [ref=e288]:
            - generic [ref=e289]: How it works
      - navigation "Help" [ref=e290]:
        - heading "Help" [level=2] [ref=e291]
        - list [ref=e292]:
          - listitem [ref=e293]:
            - generic [ref=e294]: Safety
          - listitem [ref=e295]:
            - generic [ref=e296]: Contact
      - navigation "Legal" [ref=e297]:
        - heading "Legal" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - generic [ref=e301]: Terms
          - listitem [ref=e302]:
            - generic [ref=e303]: Privacy
    - paragraph [ref=e305]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-47 the in-page bar shows no scrollbar (INC-717)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('listing-section-nav').getByTestId('listing-section-nav-item')
Expected: 4
Received: 3
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('listing-section-nav').getByTestId('listing-section-nav-item')
    14 × locator resolved to 3 elements
       - unexpected value "3"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('listing-section-nav').getByTestId('listing-section-nav-item')
Expected: 4
Received: 3
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('listing-section-nav').getByTestId('listing-section-nav-item')
    14 × locator resolved to 3 elements
       - unexpected value "3"


  1579 |     await gotoReady(page, (await address(ad)).canonical);
  1580 |     const bar = page.getByTestId("listing-section-nav");
> 1581 |     await expect(bar.getByTestId("listing-section-nav-item")).toHaveCount(4);
       |                                                               ^
  1582 |     const scrollbarWidth = await bar.evaluate((nav) => getComputedStyle(nav).scrollbarWidth);
  1583 |     expect(scrollbarWidth).toBe("none");
```

Context:

```text
          - listitem [ref=e332]:
            - generic [ref=e333]: About
          - listitem [ref=e334]:
            - generic [ref=e335]: How it works
      - navigation "Help" [ref=e336]:
        - heading "Help" [level=2] [ref=e337]
        - list [ref=e338]:
          - listitem [ref=e339]:
            - generic [ref=e340]: Safety
          - listitem [ref=e341]:
            - generic [ref=e342]: Contact
      - navigation "Legal" [ref=e343]:
        - heading "Legal" [level=2] [ref=e344]
        - list [ref=e345]:
          - listitem [ref=e346]:
            - generic [ref=e347]: Terms
          - listitem [ref=e348]:
            - generic [ref=e349]: Privacy
    - paragraph [ref=e351]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-48 the thumbnails' arrows (INC-717, INC-720)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    30
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    30

  1616 |       expect(
  1617 |         Math.abs(moreBox.y + moreBox.height - (stripBox.y + stripBox.height)),
> 1618 |       ).toBeLessThanOrEqual(1);
       |         ^
  1619 |       await more.click();
  1620 |       await expect(page.getByTestId("gallery-strip-back")).toBeVisible();
  1621 |       await expect.poll(async () => strip.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1618:9
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: How it works
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
          - listitem [ref=e337]:
            - generic [ref=e338]: Contact
      - navigation "Legal" [ref=e339]:
        - heading "Legal" [level=2] [ref=e340]
        - list [ref=e341]:
          - listitem [ref=e342]:
            - generic [ref=e343]: Terms
          - listitem [ref=e344]:
            - generic [ref=e345]: Privacy
    - paragraph [ref=e347]: © 2026 ethio.com — All rights reserved.
```
```

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PP-23: on a computer the wide photo's top does not meet the first thumbnail's

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    51.5625

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: PP-23: on a computer the wide photo's top does not meet the first thumbnail's

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    51.5625

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  1301 |       // (object-fit contain, at its object-position), against the first thumbnail.
  1302 |       const first = gallery.getByTestId("gallery-thumb").nth(0);
> 1303 |       await expect
       |       ^
  1304 |         .poll(
  1305 |           async () => {
  1306 |             const drawnTop = await image.evaluate((element: HTMLImageElement) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1303:7
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-23-the-gallery-draws-the-middle-size-and-on-a-computer-a-wide-photo-s-top-meets-the-first-thumbnail-D162-INC-613-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-63be5-rst-thumbnail-D162-INC-613--desktop-1280`; this run carried 18 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-places')
Expected substring: "Adama"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-places')

--- further error 1 ---
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-places')
Expected substring: "Adama"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-places')


  647 |     // city shows in the sheet's place line (INC-721).
  648 |     await expect(sheet.getByTestId("listing-detail-location")).toHaveCount(0);
> 649 |     await expect(sheet.getByTestId("listing-detail-places")).toContainText(cityName);
      |                                                              ^
  650 |     await expect(sheet.getByTestId("listing-section-nav")).toHaveCount(0);
  651 |     await page.getByTestId("post-preview-close").click();
  652 |     await expect(sheet, "PW-13: the preview sheet would not close").toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:649:62
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-desktop-1280` — Playwright's name `post-wizard-place-POSTING--4521b-ands-in-review-—-never-live-desktop-1280`; this run carried 18 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-5-2k7a4p: e2e_par_34y1y4 → e2e_chi_2btwyd
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

No `[client-error]` lines in the `shard 1` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
[WebServer] [ssr-error] /api/catalog/find catalog search: canceling statement due to statement timeout | at catalogSearch (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/address-JXvhEq3i.mjs:40:23)
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-cyhu1g: e2e_par_88ysa1 → e2e_chi_vyxafz
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
