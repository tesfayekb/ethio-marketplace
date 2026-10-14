# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38550931642 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38550931642
- Commit: `825f4f6fa76dcaf12c6db5e70d8816607e497460`
- Attempt: 1
- Written (UTC): 2026-10-14T11:25:40.462Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 7
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · feed-route.spec.ts › FEED ROUTE › FR-6 the answer is public and carries no seller — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-category.spec.ts › POSTING WIZARD › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15) — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-26 Undo this edit: the newest edit's before-values come back as a new edit with the reason Undo; the seller is told — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-screening.spec.ts › ADMIN SCREENING › SC-3 Reject keeps the ad off — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-31 the background route: the seller's own cover only, two tries an ad, then spent; nothing stored (D159) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · shell.spec.ts › panel follows the route › /settings shows the Account context, and returning shows categories — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-10 a browser pick saved before D106 (no time) loses to the account's place — Error: the ET tree never carried e2e-loc-6-0-ls-sub-65r5fd within 20 s

## Flaky bodies (DEC-078)

### feed-route.spec.ts › FEED ROUTE › FR-6 the answer is public and carries no seller

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502

  213 |     await seedCityFive(seed);
  214 |     const r = await getFeed(request, { category: seed.leaf.id, place: seed.chain.city.id });
> 215 |     expect(r.status).toBe(200);
      |                      ^
  216 |     expect(r.cacheControl).toBe("public, max-age=60, stale-while-revalidate=300");
  217 |     const keys = [
  218 |       "id",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-route.spec.ts:215:22
```

Context: context file not found for `feed-route-FEED-ROUTE-FR-6-the-answer-is-public-and-carries-no-seller-mobile-360` — Playwright's name `feed-route-FEED-ROUTE-FR-6-7591a-ublic-and-carries-no-seller-mobile-360`; this run carried 2 context file(s); of the same spec: none

### post-wizard-category.spec.ts › POSTING WIZARD › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-4')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-4')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-4')


  630 |     // The review card (the wizard's side preview from the price page on).
  631 |     await page.getByTestId("post-next").click();
> 632 |     await expect(page.getByTestId("post-step-4")).toBeVisible({ timeout: 20_000 });
      |                                                   ^
  633 |     await expect(
  634 |       page.getByTestId("post-review-preview").getByTestId("listing-photos-soon-ribbon"),
  635 |       "PW-141: no ribbon on the review card",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:632:51
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-141-Photos-coming-soon-the-tick-shows-only-with-no-photo-is-saved-draws-the-ribbon-and-goes-when-a-photo-is-added-bundle-4-steps-14-15-mobile-360` — Playwright's name `post-wizard-category-POSTI-5c6b1-added-bundle-4-steps-14-15--mobile-360`; this run carried 2 context file(s); of the same spec: none

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-26 Undo this edit: the newest edit's before-values come back as a new edit with the reason Undo; the seller is told

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-26-Undo-this-edit-the-newest-edit-s-before-values-come-back-as-a-new-edit-with-the-reason-Undo-the-seller-is-told-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-f18fc-son-Undo-the-seller-is-told-desktop-1280`; this run carried 2 context file(s); of the same spec: none

### admin-screening.spec.ts › ADMIN SCREENING › SC-3 Reject keeps the ad off

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('admin-screening-row-6530f381-9609-42fe-b3dd-6a8b3b94b4e1')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('admin-screening-row-6530f381-9609-42fe-b3dd-6a8b3b94b4e1')


  249 |     await page.getByTestId("admin-screening-search").fill(title);
  250 |     const row = rowOf(page, id);
> 251 |     await expect(row).toBeVisible({ timeout: 20000 });
      |                       ^
  252 |     return row;
  253 |   }
  254 |
    at findRow (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:251:23)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:328:5
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/i18n/en ((body unavailable))
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/categories/tree ((body unavailable))
```

Context:

```text
          - listitem [ref=e292]:
            - generic [ref=e293]: About
          - listitem [ref=e294]:
            - generic [ref=e295]: How it works
      - navigation "Help" [ref=e296]:
        - heading "Help" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - generic [ref=e300]: Safety
          - listitem [ref=e301]:
            - generic [ref=e302]: Contact
      - navigation "Legal" [ref=e303]:
        - heading "Legal" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Terms
          - listitem [ref=e308]:
            - generic [ref=e309]: Privacy
    - paragraph [ref=e311]: © 2026 ethio.com — All rights reserved.
```
```

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-31 the background route: the seller's own cover only, two tries an ad, then spent; nothing stored (D159)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: apiRequestContext.post: Target page, context or browser has been closed
Call log:
  - → POST http://127.0.0.1:4173/api/upload/photo
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.7632.6 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Authorization: Bearer [redacted-jwt]
    - content-type: multipart/form-data; boundary=----WebKitFormBoundaryu4K14EdaF5rmT8bf
    - content-length: 50879


   at helpers/photos.ts:102

  100 |   if (options.token) headers["Authorization"] = `Bearer ${options.token}`;
  101 |   const small: { name: FixtureName; as?: string } = { name: "marker-13px.jpg" };
> 102 |   const response = await page.request.post("/api/upload/photo", {
      |                                       ^
  103 |     headers,
  104 |     multipart: {
  105 |       listingId: options.listingId,
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-31-the-background-route-the-seller-s-own-cover-only-two-tries-an-ad-then-spent-nothing-stored-D159-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-a2e57--spent-nothing-stored-D159--desktop-1280`; this run carried 2 context file(s); of the same spec: none

### shell.spec.ts › panel follows the route › /settings shows the Account context, and returning shows categories

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Settings' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('heading', { name: 'Settings' })

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Settings' })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('heading', { name: 'Settings' })


  1389 |     await expect(page.getByTestId("location-row")).toHaveCount(0);
  1390 |     // The settings page itself still renders (no placeholder).
> 1391 |     await expect(page.getByRole("heading", { name: en["settings.title"] })).toBeVisible();
       |                                                                             ^
  1392 |
  1393 |     // Back to Marketplace: categories again, Settings not among them.
  1394 |     await openPanel(page, "marketplace");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1391:77
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:34102:25) at http://127.0.0.1:4173/assets/index-DeJGKkl3.js:34134:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6025:5)
```

Context:

```text
          - listitem [ref=e187]:
            - generic [ref=e188]: About
          - listitem [ref=e189]:
            - generic [ref=e190]: How it works
      - navigation "Help" [ref=e191]:
        - heading "Help" [level=2] [ref=e192]
        - list [ref=e193]:
          - listitem [ref=e194]:
            - generic [ref=e195]: Safety
          - listitem [ref=e196]:
            - generic [ref=e197]: Contact
      - navigation "Legal" [ref=e198]:
        - heading "Legal" [level=2] [ref=e199]
        - list [ref=e200]:
          - listitem [ref=e201]:
            - generic [ref=e202]: Terms
          - listitem [ref=e203]:
            - generic [ref=e204]: Privacy
    - paragraph [ref=e206]: © 2026 ethio.com — All rights reserved.
```
```

### viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-10 a browser pick saved before D106 (no time) loses to the account's place

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: the ET tree never carried e2e-loc-6-0-ls-sub-65r5fd within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-6-0-ls-sub-65r5fd"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-4-0-ls-region-d6h935", "e2e-loc-4-0-ls-region-whxsla", "e2e-loc-4-1-ls-region-yeawcg", "e2e-loc-6-0-ls-region-52e3i5", "oromia", "sidama", …]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: the ET tree never carried e2e-loc-6-0-ls-sub-65r5fd within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-6-0-ls-sub-65r5fd"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-4-0-ls-region-d6h935", "e2e-loc-4-0-ls-region-whxsla", "e2e-loc-4-1-ls-region-yeawcg", "e2e-loc-6-0-ls-region-52e3i5", "oromia", "sidama", …]

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

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-10-a-browser-pick-saved-before-D106-no-time-loses-to-the-account-s-place-desktop-1280` — Playwright's name `viewing-place-VIEWING-PLAC-7b2a8-oses-to-the-account-s-place-desktop-1280`; this run carried 2 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

110 line(s), 39 message(s): 4 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 3, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `canceling statement due to statement timeout` | 2 | shard 4 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>g<n>p<n>s: e<n>e_par_g<n>swpq → e<n>e_chi_<n>nkot<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-wdx<n>q<n>: e<n>e_par_iqjo<n>o → e<n>e_chi_ivk<n>b<n>` (quiet) | 1 | shard 4 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | shard 2 |
| `register_listing_photo: listing not found` | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>g<n>p<n>s: e<n>e_par_g<n>swpq → e<n>e_chi_<n>nkot<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-wdx<n>q<n>: e<n>e_par_iqjo<n>o → e<n>e_chi_ivk<n>b<n> ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-61 a category change resets details, title, description and price, and Undo w ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · location row is present on Marketplace and absent on Account ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-161 a number's unit reads in English, and in Amharic under Amharic ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### canceling statement due to statement timeout

- Count: 2 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AL-26 Undo this edit: the newest edit's before-values come back as a new edit wi ×2 · SC-3 Reject keeps the ad off ×2

```text
[WebServer] [ssr-error] /api/categories/tree canceling statement due to statement timeout
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): FE-8 the tier sets the rank ×1 · FR-6 the answer is public and carries no seller ×1

```text
[WebServer] [ssr-error] /api/feed Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

### register_listing_photo: listing not found

- Count: 1 · Sources: shard 5
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-31 the background route: the seller's own cover only, two tries an ad, then s ×1 · PW-7 a draft resumes at the next step, and only for its owner ×1

```text
[WebServer] [ssr-error] /api/upload/photo register_listing_photo: listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-14T10:51:28.882Z | 16.4 min |
| email | 2026-10-14T10:51:42.637Z | 0.4 min |
| shard 1 | 2026-10-14T10:51:14.741Z | 29.9 min |
| shard 2 | 2026-10-14T10:51:21.162Z | 33.6 min |
| shard 3 | 2026-10-14T10:51:17.886Z | 24.6 min |
| shard 4 | 2026-10-14T10:51:20.244Z | 32.2 min |
| shard 5 | 2026-10-14T10:52:02.181Z | 33.3 min |
| shard 6 | 2026-10-14T10:51:24.671Z | 28.0 min |
| changed | 2026-10-14T10:51:17.981Z | 0.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 62 | 26.2 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 80 | 21.1 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 20.7 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 19.9 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 56 | 17.9 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 14.0 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 12.9 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 11.0 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 44 | 10.8 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 10.3 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 10.2 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 52 | 10.0 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 9.8 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.5 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 28 | 8.9 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 8.7 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 8.6 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 8.1 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 7.7 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.6 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 7.5 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 7.2 min | shard 3, shard 6 |
| `import-security.spec.ts` | 36 | 7.0 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.0 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.6 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 6.6 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.3 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.3 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 16 | 5.2 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.5 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.4 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.5 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 1.5 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.5 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 20 | 1.5 min | shard 1, shard 4, changed |
| `category-image-routes.spec.ts` | 10 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `viewing-place.spec.ts` › VP-10 a browser pick saved before D106 (no time) loses to the account's place | desktop-1280 | 106.5 s |
| `post-wizard-category.spec.ts` › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15) | mobile-360 | 90.7 s |
| `admin-screening.spec.ts` › SC-3 Reject keeps the ad off | desktop-1280 | 84.1 s |
| `photo-pipeline.spec.ts` › PP-31 the background route: the seller's own cover only, two tries an ad, then spent; nothing stored (D159) | desktop-1280 | 82.0 s |
| `admin-listings.spec.ts` › AL-26 Undo this edit: the newest edit's before-values come back as a new edit with the reason Undo; the seller is told | desktop-1280 | 79.8 s |
| `post-wizard-category.spec.ts` › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15) | desktop-1280 | 75.6 s |
| `admin-screening.spec.ts` › SC-17 a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129) | mobile-360 | 68.6 s |
| `post-wizard-details.spec.ts` › PW-102 a type that leaves only Other shows that question's text box, and the typed text saves | mobile-360 | 66.0 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | mobile-360 | 63.6 s |
| `admin-translations-console.spec.ts` › TR-7b sync after a step-up prompt still reports its counts | mobile-360 | 61.9 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | desktop-1280 | 59.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 52.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 51.2 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 50.1 s |
| `admin-listings.spec.ts` › AL-12 Edit refuses as the super admin: the admin's own, a draft, a removed listing, a key not editable, a reason without its note | desktop-1280 | 48.5 s |
