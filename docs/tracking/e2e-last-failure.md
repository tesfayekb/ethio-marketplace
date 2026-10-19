# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39251271300 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39251271300
- Commit: `96c78869caa6955ece1f5aec87807d88f0a9a9bc`
- Attempt: 1
- Written (UTC): 2026-10-19T13:18:34.409Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 7
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-37 the in-page bar scrolls to each section and stays under the sub-band — Error: AP-37 seller at 805 ms: current description
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up — Error: Timeout 20000ms exceeded while waiting on the predicate
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) — Error: reachStep7: the region level never rendered
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-41 the door refuses an answer the chosen options do not allow — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-37 the in-page bar scrolls to each section and stays under the sub-band

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AP-37 seller at 805 ms: current description

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Array [
-   "seller",
+   "description",
  ]
--- further error 1 ---
Error: AP-37 seller at 805 ms: current description

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

### admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 200

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 200

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  212 |         .poll(async () => (await readCountry(code))?.is_active, { timeout: 20000 })
  213 |         .toBe(false);
> 214 |       await expect
      |       ^
  215 |         .poll(async () => (await page.request.get(`/api/locations/${code}`)).status(), {
  216 |           timeout: 20000,
  217 |         })
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:214:7
```

Context:

```text
          - listitem [ref=e320]:
            - generic [ref=e321]: About
          - listitem [ref=e322]:
            - generic [ref=e323]: Contact
      - navigation "Help" [ref=e324]:
        - heading "Help" [level=2] [ref=e325]
        - list [ref=e326]:
          - listitem [ref=e327]:
            - generic [ref=e328]: Safety
      - navigation "Legal" [ref=e329]:
        - heading "Legal" [level=2] [ref=e330]
        - list [ref=e331]:
          - listitem [ref=e332]:
            - link "Terms" [ref=e333] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e334]:
            - link "Privacy" [ref=e335] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e337]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:ml] coverage failed: insert or update on table "listing_locations" violates foreign key constraint "listing_locations_listing_id_fkey"

  291 |       .from("listing_locations")
  292 |       .insert({ listing_id: row["id"], location_id: seller.cityId, position: 1 });
> 293 |     if (located.error) throw new Error(`[e2e:ml] coverage failed: ${located.error.message}`);
      |                              ^
  294 |     return row as Row & { id: string; title: string };
  295 |   }
  296 |
    at seed (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:293:30)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:1080:15
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-13-copy_my_listing-a-new-draft-with-the-ad-s-details-and-places-without-photos-or-dates-drafts-removed-refused-and-others-ads-are-not-copied-D182-4-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-7cc69--ads-are-not-copied-D182-4--mobile-360`; this run carried 4 context file(s); of the same spec: none

### admin-categories-console.spec.ts › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: Timeout 20000ms exceeded while waiting on the predicate

  277 |       );
  278 |
> 279 |       await expect
      |       ^
  280 |         .poll(async () => (await readCategory(slug))?.name_en, { timeout: 20000 })
  281 |         .toBe(`E2E renamed ${slug}`);
  282 |     } finally {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-console.spec.ts:279:7
```

Context:

```text
          - listitem [ref=e401]:
            - generic [ref=e402]: About
          - listitem [ref=e403]:
            - generic [ref=e404]: Contact
      - navigation "Help" [ref=e405]:
        - heading "Help" [level=2] [ref=e406]
        - list [ref=e407]:
          - listitem [ref=e408]:
            - generic [ref=e409]: Safety
      - navigation "Legal" [ref=e410]:
        - heading "Legal" [level=2] [ref=e411]
        - list [ref=e412]:
          - listitem [ref=e413]:
            - link "Terms" [ref=e414] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e415]:
            - link "Privacy" [ref=e416] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e418]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:reap] location f544f7ca-0aee-472e-b6a0-715fc70e66cb failed: update or delete on table "locations" violates foreign key constraint "listings_location_id_fkey" on table "listings"

   at helpers/locations.ts:277

  275 |     const deleted = await supabase.from("locations").delete().eq("id", id);
  276 |     if (deleted.error)
> 277 |       throw new Error(`[e2e:reap] location ${id} failed: ${deleted.error.message}`);
      |             ^
  278 |   }
  279 | }
  280 |
    at destroyLocation (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:277:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:205:43
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-13-copy_my_listing-a-new-draft-with-the-ad-s-details-and-places-without-photos-or-dates-drafts-removed-refused-and-others-ads-are-not-copied-D182-4-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-7cc69--ads-are-not-copied-D182-4--desktop-1280`; this run carried 4 context file(s); of the same spec: none

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: reachStep7: the region level never rendered

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-region')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - reachStep7: the region level never rendered with timeout 10000ms
  - waiting for getByTestId('post-where-region')

--- further error 1 ---
Error: reachStep7: the region level never rendered

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-region')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - reachStep7: the region level never rendered with timeout 10000ms
  - waiting for getByTestId('post-where-region')


  1028 |     await waitForTreeSlug(page, "ET", city.slug);
  1029 |     const region = page.getByTestId("post-where-region");
> 1030 |     await expect(region, "reachStep7: the region level never rendered").toBeVisible();
       |                                                                         ^
  1031 |     // The city's own region is whichever one carries it: the cascade is walked,
  1032 |     // not guessed, by selecting each region until the city appears.
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/locations/ET ((body unavailable))
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-137-Pieces-per-Pack-shows-with-per-pack-and-goes-with-its-value-on-another-unit-the-size-and-terms-lines-read-under-the-price-bundle-4-steps-9-10-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-70be6--price-bundle-4-steps-9-10--desktop-1280`; this run carried 4 context file(s); of the same spec: none

### posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-41 the door refuses an answer the chosen options do not allow

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:c1b] destroying the spec set failed: update or delete on table "attributes" violates foreign key constraint "category_attribute_links_attribute_id_fkey" on table "category_attribute_links"

   at helpers/posting.ts:1476

  1474 |   reapStep("spec set links", links.error);
  1475 |   const { error } = await supabase.from("attributes").delete().in("id", ids);
> 1476 |   if (error) throw new Error(`[e2e:c1b] destroying the spec set failed: ${error.message}`);
       |                    ^
  1477 | }
  1478 |
  1479 | /** DB truth: the attributes the door recorded on a draft, normalised by the validator. */
    at destroySpecSet (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:1476:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:36:5
--- further error 2 ---
Error: apiRequestContext.post: Target page, context or browser has been closed
Call log:
  - → POST http://127.0.0.1:4173/api/listings/draft
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.7632.6 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - Authorization: Bearer [redacted-jwt]
    - cf-ipcountry: ET
    - content-length: 270


   at helpers/posting.ts:61

  59 |   // edge does (`cf-ipcountry`) and never as the body.
  60 |   if (options.country) headers["cf-ipcountry"] = options.country;
> 61 |   const response = await page.request.post(path, { headers, data: body });
     |                                       ^
  62 |   let payload: Record<string, unknown> = {};
  63 |   try {
```

Context:

```text
          - listitem [ref=e359]:
            - generic [ref=e360]: About
          - listitem [ref=e361]:
            - generic [ref=e362]: Contact
      - navigation "Help" [ref=e363]:
        - heading "Help" [level=2] [ref=e364]
        - list [ref=e365]:
          - listitem [ref=e366]:
            - generic [ref=e367]: Safety
      - navigation "Legal" [ref=e368]:
        - heading "Legal" [level=2] [ref=e369]
        - list [ref=e370]:
          - listitem [ref=e371]:
            - link "Terms" [ref=e372] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e373]:
            - link "Privacy" [ref=e374] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e376]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

115 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 14 | shard 3, shard 6 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>mka: e<n>e_par_dohddy → e<n>e_chi_tifoqa` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-uwjv<n>q: e<n>e_par_u<n>wn → e<n>e_chi_jz<n>qf` (quiet) | 1 | shard 4 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | shard 6 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>mka: e<n>e_par_dohddy → e<n>e_chi_tifoqa ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-uwjv<n>q: e<n>e_par_u<n>wn → e<n>e_chi_jz<n>qf ×1

Off the allowlist:

### listing not found

- Count: 14 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-33 a region alone never lists itself; its city does (W6 R2) ×2 · PW-45 a declared swatch renders one ink, a two-tone and a pattern tile ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-137 Pieces per Pack shows with per pack and goes, with its value, on another  ×1 · PW-76 a detail the model pins to one value is filled and hidden, and still revie ×1

```text
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-19T12:27:16.533Z | 22.0 min |
| email | 2026-10-19T12:27:10.874Z | 0.3 min |
| shard 1 | 2026-10-19T12:27:11.813Z | 45.1 min |
| shard 2 | 2026-10-19T12:27:12.370Z | 44.7 min |
| shard 3 | 2026-10-19T12:27:12.731Z | 38.6 min |
| shard 4 | 2026-10-19T12:27:16.646Z | 50.9 min |
| shard 5 | 2026-10-19T12:27:13.916Z | 44.1 min |
| shard 6 | 2026-10-19T12:27:12.158Z | 39.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 68 | 27.1 min | shard 1, shard 4 |
| `shell.spec.ts` | 424 | 27.1 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 26.7 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 25.0 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 62 | 21.2 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 80 | 18.4 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 18.2 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 17.6 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 16.4 min | shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 16.1 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 14.5 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.4 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 52 | 14.3 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 14.0 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 36 | 12.3 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 12.0 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 11.8 min | smoke, shard 2, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 11.8 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.5 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 11.1 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 10.2 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 9.3 min | shard 3, shard 6 |
| `admin-attributes-editor.spec.ts` | 36 | 9.2 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 16 | 8.1 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.1 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 8.0 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.0 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.7 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.7 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 7.1 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 6.9 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.9 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.4 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.9 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.9 min | shard 2, shard 5 |
| `legal-doors.spec.ts` | 28 | 5.8 min | shard 2, shard 5 |
| `legal-certify.spec.ts` | 14 | 5.0 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 18 | 4.9 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 4.7 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.6 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 4.2 min | shard 1, shard 4 |
| `legal-admin.spec.ts` | 16 | 3.2 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.3 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.3 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 12 | 2.2 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `legal-accept.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.8 min | shard 2, shard 5 |
| `legal-history.spec.ts` | 6 | 1.3 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.3 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 1.2 min | shard 1, shard 4 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 14 | 0.8 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `legal-pages.spec.ts` | 6 | 0.2 min | shard 2, shard 5 |
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
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | mobile-360 | 111.8 s |
| `my-listings-doors.spec.ts` › ML-13 copy_my_listing: a new draft with the ad's details and places, without photos or dates; drafts, removed, refused and others' ads are not copied (D182 4) | desktop-1280 | 101.5 s |
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | desktop-1280 | 95.4 s |
| `admin-countries.spec.ts` › CO-4 open and close: opening publishes the market's tree, closing takes it away | mobile-360 | 80.6 s |
| `post-wizard-pricing.spec.ts` › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10) | desktop-1280 | 69.8 s |
| `admin-categories-console.spec.ts` › CT-3 create + edit: a scratch category is born and renamed through step-up | desktop-1280 | 65.5 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | desktop-1280 | 64.6 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 64.2 s |
| `posting-routes-catalog.spec.ts` › PR-38 owner's client cannot insert, update or delete coverage; the route can | mobile-360 | 59.2 s |
| `admin-categories-home.spec.ts` › CT-38 a retired category with a child is not deleted until the child moves away | desktop-1280 | 58.4 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 57.8 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 56.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-19 a create and a rename commit through the doors and undo | mobile-360 | 55.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 53.8 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 53.4 s |
