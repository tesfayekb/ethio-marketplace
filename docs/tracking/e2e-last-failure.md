# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38203524897
- Commit: `e1c251c1fc9aaff4d051abc71c6f1c8e1615290a`
- Attempt: 2
- Written (UTC): 2026-10-12T05:31:57.474Z
- Passed: 1620 · Skipped: 124 · Failed: 1
- Gating failures: 1 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 7
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-73 Remove from a category names the listings that hold an answer, and removes — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · posting-routes-identity.spec.ts › POSTING ROUTES — IDENTITY GATE › PR-26 the imitation check is rate-gated before the model is asked — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · post-wizard-place.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan — Error: PW-11: the coverage never reached the draft
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-41 the door refuses an answer the chosen options do not allow — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-33 the map fallback report is capped at 60 an hour per address — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · shell.spec.ts › panel follows the route › /settings shows the Account context, and returning shows categories — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-73 Remove from a category names the listings that hold an answer, and removes

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-remove-confirm')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-remove-confirm')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-remove-confirm')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-remove-confirm')


  188 |         .getByTestId(`attribute-actions-${free}-more-remove`)
  189 |         .click();
> 190 |       await expect(page.getByTestId("attribute-remove-confirm")).toBeVisible({ timeout: 20000 });
      |                                                                  ^
  191 |       await expect(page.getByTestId("attribute-remove-submit")).toBeEnabled({ timeout: 20000 });
  192 |       await expect(page.getByTestId("attribute-remove-holders")).toHaveCount(0);
  193 |       await page.getByTestId("attribute-remove-submit").click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-safety.spec.ts:190:66
```

Context:

```text
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Remove from a category — e2e_free_w0a030" [ref=e2]:
    - heading "Remove from a category — e2e_free_w0a030" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Remove from a category — e2e_free_w0a030
      - paragraph [ref=e6]: The attribute stays in the library; only this category stops asking for it.
      - generic [ref=e7]:
        - generic [ref=e8]: Category
        - combobox "Category" [ref=e9]:
          - option "Choose a category" [selected]
          - option "e2e-cat-1-0-dpywnp (e2e-cat-1-0-dpywnp)"
      - generic [ref=e10]:
        - button "Cancel" [ref=e11] [cursor=pointer]
        - button "Remove from category" [ref=e12] [cursor=pointer]
    - button "Close" [active] [ref=e13] [cursor=pointer]:
      - img [ref=e14]
      - generic [ref=e17]: Close
```
```

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')


  337 |   async function pricingToReview(page: Page) {
  338 |     await page.getByTestId("post-next").click();
> 339 |     await expect(page.getByTestId("post-step-5")).toBeVisible();
      |                                                   ^
  340 |     await page.getByTestId("post-title").fill("e2e d31c listing title");
  341 |     await page.getByTestId("post-description").fill("e2e d31c listing description");
  342 |     await page.getByTestId("post-next").click();
    at pricingToReview (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:339:51)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-55-a-commission-basis-asks-a-percentage-stores-basis-points-and-reads-it-back-in-both-languages-mobile-360`

### posting-routes-identity.spec.ts › POSTING ROUTES — IDENTITY GATE › PR-26 the imitation check is rate-gated before the model is asked

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500

  57 |       const alias = `${stem}${letters(4)}`;
  58 |       const answer = await postRoute(page, IDENTITY, { alias }, { token, country: "ET" });
> 59 |       expect(answer.status).toBe(200);
     |                             ^
  60 |       const reasons = reasonsOf(answer.payload);
  61 |       expect(
  62 |         reasons.filter((r) => r.field === "rate"),
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-identity.spec.ts:59:29
```

Context:

```text
          - listitem [ref=e418]:
            - generic [ref=e419]: About
          - listitem [ref=e420]:
            - generic [ref=e421]: How it works
      - navigation "Help" [ref=e422]:
        - heading "Help" [level=2] [ref=e423]
        - list [ref=e424]:
          - listitem [ref=e425]:
            - generic [ref=e426]: Safety
          - listitem [ref=e427]:
            - generic [ref=e428]: Contact
      - navigation "Legal" [ref=e429]:
        - heading "Legal" [level=2] [ref=e430]
        - list [ref=e431]:
          - listitem [ref=e432]:
            - generic [ref=e433]: Terms
          - listitem [ref=e434]:
            - generic [ref=e435]: Privacy
    - paragraph [ref=e437]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-place.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: PW-11: the coverage never reached the draft

expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0

Call Log:
- Test timeout of 60000ms exceeded
--- further error 1 ---
Error: PW-11: the coverage never reached the draft

expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0

Call Log:
- Test timeout of 60000ms exceeded

  343 |     // DB TRUTH: one coverage row, and it is the item's own place (J4).
  344 |     await page.getByTestId("post-next").click();
> 345 |     await expect
      |     ^
  346 |       .poll(async () => (await coverageOf(listingId)).placeIds.length, {
  347 |         message: "PW-11: the coverage never reached the draft",
  348 |         timeout: 20_000,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:345:5
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-11-where-the-market-is-prefilled-from-the-edge-a-city-with-sub-cities-offers-all-of-it-and-a-second-place-is-refused-by-the-plan-desktop-1280`

### posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-41 the door refuses an answer the chosen options do not allow

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: case 6 changed: {"ok":false,"refusals":[{"field":"door","reason":"doorError"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_alw_1zdawi_1", "detail": "b", "reason": "optionNotAllowed"}]
Received: [{"field": "door", "reason": "doorError"}]

  324 |       expect
  325 |         .soft(answer["refusals"], `${label}: ${JSON.stringify(answer)}`)
> 326 |         .toEqual(
      |          ^
  327 |           expect.arrayContaining([
  328 |             expect.objectContaining({ attr_key: key, reason: "optionNotAllowed", detail }),
  329 |           ]),
    at refusedAt (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:326:10)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:361:5
--- further error 2 ---
Error: expect(received).toBeNull()

Received: {"code": "23503", "details": "Key (attribute_id)=(f8cfed56-4b78-4c8e-afbd-d9771a4be0e0) is not present in table \"attributes\".", "hint": null, "message": "insert or update on table \"category_attribute_links\" violates foreign key constraint \"category_attribute_links_attribute_id_fkey\""}

  307 |           })),
  308 |         );
> 309 |       expect(links.error).toBeNull();
      |                           ^
  310 |       return cat;
  311 |     }
  312 |     const judge = (categoryId: string, attributes: Record<string, unknown>, listingId?: string) =>
    at leaf (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:309:27)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:372:19
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

### posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-33 the map fallback report is capped at 60 an hour per address

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: apiRequestContext.post: Target page, context or browser has been closed
Call log:
  - → POST http://127.0.0.1:4173/api/map/tiles
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.7632.6 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - x-forwarded-for: 198.51.100.74-1791782401722
    - content-type: application/json
    - content-length: 16


  202 |     const answers: boolean[] = [];
  203 |     for (let i = 0; i < 61; i += 1) {
> 204 |       const response = await page.request.post("/api/map/tiles", {
      |                                           ^
  205 |         data: { reason: "e2e" },
  206 |         headers: { "x-forwarded-for": address },
  207 |       });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:204:43
```

Context: context file not found for `posting-routes-dials-POSTING-DOOR-DIALS-PR-33-the-map-fallback-report-is-capped-at-60-an-hour-per-address-desktop-1280`

### shell.spec.ts › panel follows the route › /settings shows the Account context, and returning shows categories

- Source: `shard 8`
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


  1395 |     await expect(page.getByTestId("location-row")).toHaveCount(0);
  1396 |     // The settings page itself still renders (no placeholder).
> 1397 |     await expect(page.getByRole("heading", { name: en["settings.title"] })).toBeVisible();
       |                                                                             ^
  1398 |
  1399 |     // Back to Marketplace: categories again, Settings not among them.
  1400 |     await openPanel(page, "marketplace");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1397:77
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

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

114 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 13 | shard 3, shard 4, shard 7, shard 8 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 5, shard 7 |
| `too many previews` (quiet) | 10 | shard 3, shard 7 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 5, shard 6 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `categories file too large` (quiet) | 2 | shard 3, shard 7 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 7 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `commit_failed step-up required: no verified factor` (quiet) | 2 | shard 1, shard 5 |
| `countries badHeader` (quiet) | 2 | shard 3, shard 7 |
| `countries nulByte` (quiet) | 2 | shard 3, shard 7 |
| `countries tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `countries unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `countries wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `definitions nulByte` (quiet) | 2 | shard 3, shard 7 |
| `definitions tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `definitions unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `links unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations badHeader` (quiet) | 2 | shard 3, shard 7 |
| `locations file too large` (quiet) | 2 | shard 3, shard 7 |
| `locations nulByte` (quiet) | 2 | shard 3, shard 7 |
| `locations unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `locations wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `strings badHeader` (quiet) | 2 | shard 3, shard 7 |
| `strings emptyFile` (quiet) | 2 | shard 3, shard 7 |
| `strings nulByte` (quiet) | 2 | shard 3, shard 7 |
| `strings tooManyRows` (quiet) | 2 | shard 3, shard 7 |
| `strings unknownColumn` (quiet) | 2 | shard 3, shard 7 |
| `strings wrongFile` (quiet) | 2 | shard 3, shard 7 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>s<n>r<n>: e<n>e_par_bbckhw → e<n>e_chi_<n>j<n>gu` (quiet) | 1 | shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>u<n>ku: e<n>e_par_gvri<n>k → e<n>e_chi_oaszhm` (quiet) | 1 | shard 1 |
| `rate limit identity:imitation: canceling statement due to statement timeout \| at consumeRate (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/router-BQugzQ<n>Y.mjs:<n>:<n>)` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>s<n>r<n>: e<n>e_par_bbckhw → e<n>e_chi_<n>j<n>gu ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>u<n>ku: e<n>e_par_gvri<n>k → e<n>e_chi_oaszhm ×1

Off the allowlist:

### listing not found

- Count: 13 · Sources: shard 3, shard 4, shard 7, shard 8

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### rate limit identity:imitation: canceling statement due to statement timeout | at consumeRate (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/router-BQugzQ<n>Y.mjs:<n>:<n>)

- Count: 1 · Sources: shard 4

```text
[WebServer] [ssr-error] /api/listings/identity rate limit identity:imitation: canceling statement due to statement timeout | at consumeRate (/home/runner/work/ethio-marketplace/ethio-marketplace/dist/server/_ssr/router-BQugzQ1Y.mjs:4572:23)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-12T04:59:35.261Z | 18.3 min |
| email | 2026-10-12T04:59:35.214Z | 0.2 min |
| shard 1 | 2026-10-12T04:59:33.681Z | 25.4 min |
| shard 2 | 2026-10-12T04:59:33.799Z | 27.6 min |
| shard 3 | 2026-10-12T04:59:41.115Z | 31.0 min |
| shard 4 | 2026-10-12T04:59:36.590Z | 32.0 min |
| shard 5 | 2026-10-12T04:59:40.831Z | 31.4 min |
| shard 6 | 2026-10-12T04:59:49.911Z | 24.5 min |
| shard 7 | 2026-10-12T04:59:36.941Z | 29.4 min |
| shard 8 | 2026-10-12T04:59:45.696Z | 31.5 min |
| changed | 2026-10-12T04:59:38.577Z | 16.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 108 | 58.5 min | shard 2, shard 5, changed |
| `post-wizard-specs.spec.ts` | 78 | 32.9 min | shard 4, shard 8 |
| `post-wizard-bundle2.spec.ts` | 66 | 26.8 min | shard 3, shard 7 |
| `shell.spec.ts` | 336 | 21.0 min | smoke, shard 4, shard 8 |
| `admin-categories-lifecycle.spec.ts` | 50 | 18.7 min | shard 1, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 17.3 min | shard 4, shard 8 |
| `post-wizard-category.spec.ts` | 46 | 17.2 min | shard 3, shard 7 |
| `admin-screening.spec.ts` | 30 | 17.0 min | shard 2, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 15.6 min | shard 3, shard 7 |
| `post-wizard-where.spec.ts` | 32 | 15.1 min | shard 4, shard 8 |
| `post-wizard-pricing.spec.ts` | 50 | 14.9 min | shard 3, shard 7 |
| `feed-screens.spec.ts` | 28 | 14.6 min | shard 3, shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 13.4 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 11.6 min | shard 4, shard 8 |
| `auth-signout.spec.ts` | 44 | 11.2 min | smoke, shard 2, shard 6 |
| `posting-routes.spec.ts` | 50 | 11.1 min | shard 4, shard 8 |
| `admin-categories-console.spec.ts` | 34 | 11.1 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 38 | 10.7 min | shard 2, shard 6 |
| `admin-attributes-links.spec.ts` | 32 | 10.7 min | shard 1, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 10.0 min | shard 1, shard 5 |
| `admin-users.spec.ts` | 26 | 9.8 min | shard 2, shard 6 |
| `admin-translations-console.spec.ts` | 42 | 8.6 min | shard 2, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 8.6 min | shard 3, shard 7 |
| `feed-index.spec.ts` | 28 | 8.1 min | shard 2, shard 6 |
| `admin-attributes-safety.spec.ts` | 14 | 7.6 min | shard 1, shard 5 |
| `import-security.spec.ts` | 34 | 7.6 min | shard 3, shard 7 |
| `admin-attributes-editor.spec.ts` | 34 | 7.5 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 7.2 min | shard 2, shard 6 |
| `feed-route.spec.ts` | 16 | 5.9 min | shard 2, shard 6 |
| `viewing-place.spec.ts` | 22 | 5.7 min | shard 4, shard 8 |
| `posting-routes-dials.spec.ts` | 14 | 5.7 min | shard 4, shard 8 |
| `admin-audit.spec.ts` | 12 | 5.3 min | shard 1, shard 5 |
| `admin-countries.spec.ts` | 18 | 4.6 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 3.5 min | shard 3, shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 3.4 min | shard 3, shard 7 |
| `admin-categories-home.spec.ts` | 8 | 3.4 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 3.2 min | shard 2, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 3.1 min | shard 4, shard 8 |
| `admin-translations-governance.spec.ts` | 8 | 3.1 min | shard 2, shard 6 |
| `admin-shell.spec.ts` | 10 | 3.0 min | shard 2, shard 6 |
| `admin-coverage.spec.ts` | 14 | 2.9 min | shard 1, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 2.8 min | shard 4, shard 8 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 3, shard 7 |
| `post-wizard-units.spec.ts` | 4 | 1.8 min | shard 4, shard 8 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.3 min | shard 4, shard 8 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `i18n-coverage.spec.ts` | 8 | 1.0 min | shard 3, shard 7 |
| `settings.spec.ts` | 4 | 0.9 min | shard 4 |
| `auth-reset.spec.ts` | 6 | 0.8 min | shard 2 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 5 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 4, shard 8 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 4, shard 8 |
| `phone-frame.spec.ts` | 18 | 0.7 min | shard 3, shard 7 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 3, shard 7 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `category-nav.spec.ts` | 10 | 0.7 min | shard 2, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 4, shard 8 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 3, shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 4, shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | desktop-1280 | 124.3 s |
| `post-wizard-place.spec.ts` › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan | desktop-1280 | 119.1 s |
| `posting-routes-dials.spec.ts` › PR-33 the map fallback report is capped at 60 an hour per address | desktop-1280 | 105.3 s |
| `posting-routes-identity.spec.ts` › PR-26 the imitation check is rate-gated before the model is asked | mobile-360 | 98.5 s |
| `admin-attributes-safety.spec.ts` › AT-73 Remove from a category names the listings that hold an answer, and removes | mobile-360 | 91.6 s |
| `post-wizard-place.spec.ts` › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan | mobile-360 | 84.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-37 undoing a category delete restores its attribute links or names the skipped ones | desktop-1280 | 80.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-37 undoing a category delete restores its attribute links or names the skipped ones | mobile-360 | 80.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 79.9 s |
| `admin-listings.spec.ts` › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view | desktop-1280 | 74.3 s |
| `posting-routes-catalog.spec.ts` › PR-37 coverage first appearance is stored once, renumbered in either order | mobile-360 | 71.1 s |
| `feed-route.spec.ts` › FR-4 a place with 8 listings does not widen | desktop-1280 | 70.9 s |
| `post-wizard-finder.spec.ts` › PW-87 off the chosen path the step asks again, Keep it returns, a new leaf clears it | desktop-1280 | 67.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 63.3 s |
| `post-wizard-bundle2.spec.ts` › PW-133 contact details are kept on the profile and open the next ad | mobile-360 | 61.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38203524897-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38203524897-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 4, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 38203524897-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 5, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 21 user(s) owned by process 38203524897-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38203524897-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38203524897-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 5, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 38203524897-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 5, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 38203524897-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38203524897-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38203524897-8
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38203524897-changed
```

## post-wizard-place.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-5')


  292 |     await page.getByTestId("post-price-mode-free").click();
  293 |     await page.getByTestId("post-next").click();
> 294 |     await expect(page.getByTestId("post-step-5")).toBeVisible();
      |                                                   ^
  295 |     await page.getByTestId("post-title").fill("e2e c2a listing title");
  296 |     await page.getByTestId("post-description").fill("e2e c2a listing description");
  297 |     await page.getByTestId("post-next").click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:294:51
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-11-where-the-market-is-prefilled-from-the-edge-a-city-with-sub-cities-offers-all-of-it-and-a-second-place-is-refused-by-the-plan-mobile-360`

## Server errors: shard 3

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
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×2
```
