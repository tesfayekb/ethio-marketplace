# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39420853317 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39420853317
- Commit: `6baac3069618a8574b5d13e2525268281c1403ea`
- Attempt: 1
- Written (UTC): 2026-10-20T13:07:59.098Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 9
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes.spec.ts › POSTING ROUTES › PR-24 a seller without a public name, or a person without a first name, is refused at publish (INC-423) — Error: [e2e:pool] reaping e2e-pool-s3a-000@ethio-e2e.invalid (translator languages) failed: <html>
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · legal-certify.spec.ts › Legal certification › LG-22 the sold ad's shown days are the legal setting: the public read follows sold_cutoff() — Error: [e2e:pool] reaping e2e-pool-s5a-000@ethio-e2e.invalid (seller places) failed: <html>
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-9 Rented and Filled: a sold ad takes its category's word (call H) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175) — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:reap] location 93823b3a-35c6-4e1b-a641-f444916c2eb7 failed: update or delete on table "locations" violates foreign key constraint "listings_location_id_fkey" on table "listings"

   at helpers/locations.ts:277

  275 |     const deleted = await supabase.from("locations").delete().eq("id", id);
  276 |     if (deleted.error)
> 277 |       throw new Error(`[e2e:reap] location ${id} failed: ${deleted.error.message}`);
      |             ^
  278 |   }
  279 | }
  280 |
    at destroyLocation (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:277:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:204:43
```

Context: context file not found for `my-listings-ad-MY-LISTINGS-one-ad-s-page-bundle-16-turn-3-MLA-6-Renew-an-expired-ad-a-draft-continues-an-ad-in-review-waits-another-seller-s-ad-and-a-signed-out-visit-mobile-360` — Playwright's name `my-listings-ad-MY-LISTINGS-9d729-s-ad-and-a-signed-out-visit-mobile-360`; this run carried 3 context file(s); of the same spec: `my-listings-ad-MY-LISTINGS-a20b5-its-category-s-word-call-H--desktop-1280`

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "listing not found"

  587 |
  588 |     const relisted = await me.rpc("relist_listing", { p_listing_id: p.id });
> 589 |     expect(relisted.error).toBeNull();
      |                            ^
  590 |     expect(relisted.data).toEqual({ ok: true, status: "screening" });
  591 |     expect(await listingTruth(p.id)).toMatchObject({ status: "screening", sold_at: null });
  592 |   });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:589:28
--- further error 2 ---
Error: [e2e:reap] location 3aac4248-4776-43f7-8d21-fd01ae00e8c0 failed: update or delete on table "locations" violates foreign key constraint "listings_location_id_fkey" on table "listings"

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

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-4-Sold-from-live-and-from-closed-the-contact-closes-to-others-the-seller-s-choice-is-kept-relist-takes-a-sold-ad-only-D175-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-891cb--takes-a-sold-ad-only-D175--mobile-360`; this run carried 3 context file(s); of the same spec: none

### posting-routes.spec.ts › POSTING ROUTES › PR-24 a seller without a public name, or a person without a first name, is refused at publish (INC-423)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s3a-000@ethio-e2e.invalid (translator languages) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s3a-000@ethio-e2e.invalid (translator languages) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>


   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:295:24)
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-24-a-seller-without-a-public-name-or-a-person-without-a-first-name-is-refused-at-publish-INC-423-mobile-360` — Playwright's name `posting-routes-POSTING-ROU-7adf7-refused-at-publish-INC-423--mobile-360`; this run carried 3 context file(s); of the same spec: none

### admin-categories-lifecycle.spec.ts › C2 categories console › CT-12 lifecycle: a retired category is reactivated through step-up

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-editor-image')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-editor-image')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-editor-image')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-editor-image')


   at helpers/categories.ts:391

  389 |   // C5m — ONE dialog: the SAME testid persists and now shows the Image
  390 |   // surface; Escape leaves it, and the roster is asserted after it is gone.
> 391 |   await expect(page.getByTestId("category-editor-image")).toBeVisible({ timeout: 20000 });
      |                                                           ^
  392 |   const createdAt = Date.now();
  393 |   await page.keyboard.press("Escape");
```

Context:

```text
      - generic [ref=e37]:
        - generic [ref=e38]: Visible until
        - textbox "Visible until" [ref=e39]
      - generic [ref=e40]:
        - generic [ref=e41]: Hide in countries
        - generic [ref=e42]:
          - generic [ref=e43]:
            - checkbox "ET — Ethiopia" [ref=e44] [cursor=pointer]
            - generic [ref=e45]: ET — Ethiopia
          - generic [ref=e46]:
            - checkbox "US — United States" [ref=e47] [cursor=pointer]
            - generic [ref=e48]: US — United States
        - paragraph [ref=e49]: The category stays hidden in every country you tick; you can change this later.
      - generic [ref=e50]:
        - button "Cancel" [ref=e51] [cursor=pointer]
        - button "Save" [disabled]
    - button "Close" [ref=e52] [cursor=pointer]:
      - img [ref=e53]
      - generic [ref=e56]: Close
```
```

### admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-C3saIG54.js:83:25) at http://127.0.0.1:4173/assets/feed-C3saIG54.js:117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:5125:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:6030:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:6021:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:6029:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:6021:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:6029:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:6021:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DRzq-D3G.js:6029:5)
```

Context:

```text
          - listitem [ref=e384]:
            - generic [ref=e385]: About
          - listitem [ref=e386]:
            - generic [ref=e387]: Contact
      - navigation "Help" [ref=e388]:
        - heading "Help" [level=2] [ref=e389]
        - list [ref=e390]:
          - listitem [ref=e391]:
            - generic [ref=e392]: Safety
      - navigation "Legal" [ref=e393]:
        - heading "Legal" [level=2] [ref=e394]
        - list [ref=e395]:
          - listitem [ref=e396]:
            - link "Terms" [ref=e397] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e398]:
            - link "Privacy" [ref=e399] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e401]: © 2026 ethio.com — All rights reserved.
```
```

### legal-certify.spec.ts › Legal certification › LG-22 the sold ad's shown days are the legal setting: the public read follows sold_cutoff()

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s5a-000@ethio-e2e.invalid (seller places) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s5a-000@ethio-e2e.invalid (seller places) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>


   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:278:21)
```

Context: context file not found for `legal-certify-Legal-certification-LG-22-the-sold-ad-s-shown-days-are-the-legal-setting-the-public-read-follows-sold_cutoff-desktop-1280` — Playwright's name `legal-certify-Legal-certif-7de21-c-read-follows-sold-cutoff--desktop-1280`; this run carried 3 context file(s); of the same spec: none

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-9 Rented and Filled: a sold ad takes its category's word (call H)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:reap] location a0ea5c8d-1d24-4b6f-80eb-9158539f7aa4 failed: update or delete on table "locations" violates foreign key constraint "listings_location_id_fkey" on table "listings"

   at helpers/locations.ts:277

  275 |     const deleted = await supabase.from("locations").delete().eq("id", id);
  276 |     if (deleted.error)
> 277 |       throw new Error(`[e2e:reap] location ${id} failed: ${deleted.error.message}`);
      |             ^
  278 |   }
  279 | }
  280 |
    at destroyLocation (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:277:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:204:43
```

Context:

```text
          - listitem [ref=e230]:
            - generic [ref=e231]: About
          - listitem [ref=e232]:
            - generic [ref=e233]: Contact
      - navigation "Help" [ref=e234]:
        - heading "Help" [level=2] [ref=e235]
        - list [ref=e236]:
          - listitem [ref=e237]:
            - generic [ref=e238]: Safety
      - navigation "Legal" [ref=e239]:
        - heading "Legal" [level=2] [ref=e240]
        - list [ref=e241]:
          - listitem [ref=e242]:
            - link "Terms" [ref=e243] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e244]:
            - link "Privacy" [ref=e245] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e247]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "the price of this listing is changed through its edit"
Received: "listing not found"

  466 |
  467 |     expect((await close(a, y.id)).error).toBe("illegal transition: screening -> closed");
> 468 |     expect((await price(a, y.id, 90)).error).toBe(
      |                                              ^
  469 |       "the price of this listing is changed through its edit",
  470 |     );
  471 |     expect((await reserve(a, y.id, true)).error).toBe("only a live listing is reserved");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:468:46
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-2-Nobody-else-moves-a-seller-s-ad-and-a-refused-call-writes-nothing-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-13738-refused-call-writes-nothing-desktop-1280`; this run carried 3 context file(s); of the same spec: none

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:ml] listing ac90ff73-80eb-49e4-a0c3-77916b195a81 not found

  172 |     .maybeSingle();
  173 |   if (error) throw new Error(`[e2e:ml] listing read failed: ${error.message}`);
> 174 |   if (!data) throw new Error(`[e2e:ml] listing ${listingId} not found`);
      |                    ^
  175 |   return data as unknown as Row;
  176 | }
  177 |
    at listingTruth (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:174:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:570:18
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-4-Sold-from-live-and-from-closed-the-contact-closes-to-others-the-seller-s-choice-is-kept-relist-takes-a-sold-ad-only-D175-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-891cb--takes-a-sold-ad-only-D175--desktop-1280`; this run carried 3 context file(s); of the same spec: none

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-nvqnk<n>: e<n>e_par_y<n>dsee → e<n>e_chi_<n>svv<n>n` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-zu<n>yr: e<n>e_par_no<n>oxp → e<n>e_chi_izrkn<n>` (quiet) | 1 | shard 1 |
| `Error: unknown certificate verification error` | 1 | shard 3 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-nvqnk<n>: e<n>e_par_y<n>dsee → e<n>e_chi_<n>svv<n>n ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-zu<n>yr: e<n>e_par_no<n>oxp → e<n>e_chi_izrkn<n> ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · location row is present on Marketplace and absent on Account ×1 · PW-104 a unit settled by the type is held by the price page's unit ×1 · PW-12 who: the alias is checked against the door, messages cannot be switched of ×1 · PW-159 a list fact ticks its tick list once, and the seller's untick stays ×1 · PW-17 the currency is preselected and searchable by name in one control ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### Error: unknown certificate verification error

- Count: 1 · Sources: shard 3
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-102 a type that leaves only Other shows that question's text box, and the typ ×1 · PW-85 an option label, an alias and an Amharic alias each find the leaf, and the ×1

```text
[WebServer] [ssr-error] /api/i18n Error: unknown certificate verification error
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-20T12:17:01.326Z | 18.7 min |
| email | 2026-10-20T12:17:16.337Z | 0.2 min |
| shard 1 | 2026-10-20T12:17:04.605Z | 45.8 min |
| shard 2 | 2026-10-20T12:18:06.730Z | 49.5 min |
| shard 3 | 2026-10-20T12:18:27.823Z | 37.0 min |
| shard 4 | 2026-10-20T12:19:40.656Z | 44.0 min |
| shard 5 | 2026-10-20T12:18:12.498Z | 49.1 min |
| shard 6 | 2026-10-20T12:17:05.162Z | 36.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 424 | 27.6 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 24.1 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 23.9 min | shard 2, shard 5 |
| `ad-page.spec.ts` | 68 | 23.0 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 80 | 21.5 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 20.4 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 62 | 20.3 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 19.3 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 16.8 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 70 | 16.7 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 16.0 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 14.0 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 36 | 13.9 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 12.9 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.9 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.0 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 10.8 min | smoke, shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 10.7 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 10.1 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 9.6 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 9.3 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.8 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 8.7 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.6 min | shard 2, shard 5 |
| `legal-certify.spec.ts` | 26 | 8.5 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 8.5 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.4 min | shard 2, shard 5 |
| `legal-doors.spec.ts` | 32 | 7.8 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.5 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 16 | 7.5 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.3 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 7.0 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.7 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.7 min | shard 3, shard 6 |
| `viewing-place.spec.ts` | 22 | 6.4 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.0 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `legal-admin.spec.ts` | 28 | 5.2 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 4.9 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.9 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.3 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.7 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 12 | 2.1 min | shard 1, shard 4 |
| `breadcrumbs.spec.ts` | 6 | 2.1 min | shard 2, shard 5 |
| `legal-accept.spec.ts` | 8 | 2.1 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 1.6 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.5 min | shard 3, shard 6 |
| `legal-history.spec.ts` | 6 | 1.5 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 1.3 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.2 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 1.0 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 0.9 min | shard 1, shard 4 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
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
| `my-listings-doors.spec.ts` › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175) | desktop-1280 | 118.2 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | desktop-1280 | 115.5 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 111.0 s |
| `my-listings-ad.spec.ts` › MLA-9 Rented and Filled: a sold ad takes its category's word (call H) | desktop-1280 | 103.2 s |
| `my-listings-doors.spec.ts` › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175) | mobile-360 | 97.0 s |
| `admin-countries.spec.ts` › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin | desktop-1280 | 96.6 s |
| `posting-routes.spec.ts` › PR-17 the draft route refuses a region-only place and accepts a city and a sub-city | desktop-1280 | 71.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it | mobile-360 | 64.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 62.7 s |
| `my-listings-ad.spec.ts` › MLA-5 Mark as sold asks first; then the ad is sold for good (D175 1) | desktop-1280 | 60.2 s |
| `admin-listings.spec.ts` › AL-25 Edit refuses an enforcer without a second factor, and writes nothing | mobile-360 | 58.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 57.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-19 a create and a rename commit through the doors and undo | desktop-1280 | 56.2 s |
| `my-listings-doors.spec.ts` › ML-8 The expiry sweep expires full and reduced reach through the state machine, with the system's revision (INC-470, INC-626) | mobile-360 | 56.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-12 lifecycle: a retired category is reactivated through step-up | desktop-1280 | 54.2 s |
