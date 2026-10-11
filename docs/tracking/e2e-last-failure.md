# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38183335583
- Commit: `33bba75870349b7c247f944fd810645e118f07be`
- Attempt: 1
- Written (UTC): 2026-10-11T23:49:01.471Z
- Passed: 1737 · Skipped: 124 · Failed: 5
- Gating failures: 5 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 10
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans — Error: PW-30: no place was chosen
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-36 new unknown key and new unknown option remain refused — Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-29 renew_listing counts against the revise dial — Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-coverage.spec.ts › L2b coverage console › CV-6 geometry: nothing overflows and the editor's controls are on screen — Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-86 a failing finder leaves the name matches on screen, with the notice — Error: [e2e:pool] reaping e2e-pool-s7a-000@ethio-e2e.invalid (password) failed: {}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-42 the door reads a padded answer as the value it stores — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · posting-routes-identity.spec.ts › POSTING ROUTES — IDENTITY GATE › PR-26 the imitation check is rate-gated before the model is asked — Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-categories-lifecycle.spec.ts › C2 categories console › CT-44 a second Move up waits for the first and lands from the new order — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-30: no place was chosen
PW-30 step timings: signed in @ 9639 ms | category and specifications seeded @ 10375 ms | step 3 reached @ 12222 ms | specifications answered @ 12595 ms | step 6 open @ 18336 ms | tree served @ 18900 ms

expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-where-chosen')
Expected: "1"
Received: "0"
Timeout:  20000ms

Call log:
  - PW-30: no place was chosen
PW-30 step timings: signed in @ 9639 ms | category and specifications seeded @ 10375 ms | step 3 reached @ 12222 ms | specifications answered @ 12595 ms | step 6 open @ 18336 ms | tree served @ 18900 ms with timeout 20000ms
  - waiting for getByTestId('post-where-chosen')
    24 × locator resolved to <ul data-count="0" class="space-y-1" data-testid="post-where-chosen"></ul>
       - unexpected value "0"

--- further error 1 ---
Error: PW-30: no place was chosen
PW-30 step timings: signed in @ 9639 ms | category and specifications seeded @ 10375 ms | step 3 reached @ 12222 ms | specifications answered @ 12595 ms | step 6 open @ 18336 ms | tree served @ 18900 ms

expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-where-chosen')
Expected: "1"
Received: "0"
Timeout:  20000ms

Call log:
  - PW-30: no place was chosen
PW-30 step timings: signed in @ 9639 ms | category and specifications seeded @ 10375 ms | step 3 reached @ 12222 ms | specifications answered @ 12595 ms | step 6 open @ 18336 ms | tree served @ 18900 ms with timeout 20000ms
  - waiting for getByTestId('post-where-chosen')
    24 × locator resolved to <ul data-count="0" class="space-y-1" data-testid="post-where-chosen"></ul>
       - unexpected value "0"


  767 |       page.getByTestId("post-where-chosen"),
  768 |       why("PW-30: no place was chosen"),
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-mobile-360`

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')


  191 |   async function nextThroughPhotos(page: import("@playwright/test").Page) {
  192 |     await page.getByTestId("post-next").click();
> 193 |     await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                   ^
  194 |     await page.getByTestId("post-next").click();
  195 |   }
  196 |
    at nextThroughPhotos (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:193:51)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-55-a-commission-basis-asks-a-percentage-stores-basis-points-and-reads-it-back-in-both-languages-mobile-360`

### posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-36 new unknown key and new unknown option remain refused

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:372:23)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:41:18)
    at setup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:55:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:185:35
```

Context: context file not found for `posting-routes-catalog-POSTING-ROUTES-catalogue-changes-PR-36-new-unknown-key-and-new-unknown-option-remain-refused-mobile-360`

### posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-29 renew_listing counts against the revise dial

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:372:23)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:76:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:164:33
```

Context: context file not found for `posting-routes-dials-POSTING-DOOR-DIALS-PR-29-renew_listing-counts-against-the-revise-dial-mobile-360`

### admin-coverage.spec.ts › L2b coverage console › CV-6 geometry: nothing overflows and the editor's controls are on screen

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at freshAal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:777:17)
    at useJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:896:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-coverage.spec.ts:317:5
```

Context: context file not found for `admin-coverage-L2b-coverage-console-CV-6-geometry-nothing-overflows-and-the-editor-s-controls-are-on-screen-desktop-1280`

### post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-86 a failing finder leaves the name matches on screen, with the notice

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s7a-000@ethio-e2e.invalid (password) failed: {}
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s7a-000@ethio-e2e.invalid (password) failed: {}

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:369:22)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:45:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:128:5
```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-86-a-failing-finder-leaves-the-name-matches-on-screen-with-the-notice-desktop-1280`

### posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-42 the door reads a padded answer as the value it stores

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: (5) unpadded (2): {"ok":false,"refusals":[{"reason":"unknownAttribute","attr_key":"e2e_trm_uir430_3"},{"reason":"unknownAttribute","attr_key":"e2e_trm_uir430_4"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_trm_uir430_3", "detail": "1..10", "reason": "outOfBounds"}]
Received: [{"attr_key": "e2e_trm_uir430_3", "reason": "unknownAttribute"}, {"attr_key": "e2e_trm_uir430_4", "reason": "unknownAttribute"}]

  455 |     ) {
  456 |       expect.soft(answer["ok"], `${label}: ${JSON.stringify(answer)}`).toBe(false);
> 457 |       expect.soft(answer["refusals"], `${label}: ${JSON.stringify(answer)}`).toEqual(
      |                                                                              ^
  458 |         expect.arrayContaining([
  459 |           expect.objectContaining({
  460 |             attr_key: key,
    at refusedAt (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:457:78)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:498:7
--- further error 2 ---
Error: (5) unpadded (3): {"ok":false,"refusals":[{"reason":"unknownAttribute","attr_key":"e2e_trm_uir430_5"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_trm_uir430_6", "reason": "required"}]
Received: [{"attr_key": "e2e_trm_uir430_5", "reason": "unknownAttribute"}]

  455 |     ) {
  456 |       expect.soft(answer["ok"], `${label}: ${JSON.stringify(answer)}`).toBe(false);
> 457 |       expect.soft(answer["refusals"], `${label}: ${JSON.stringify(answer)}`).toEqual(
      |                                                                              ^
  458 |         expect.arrayContaining([
  459 |           expect.objectContaining({
  460 |             attr_key: key,
    at refusedAt (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:457:78)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:505:7
--- further error 3 ---
Error: (5) unpadded (4): {"ok":false,"refusals":[{"reason":"unknownAttribute","attr_key":"e2e_trm_uir430_7"},{"reason":"unknownAttribute","attr_key":"e2e_trm_uir430_8"}]}

expect(received).toEqual(expected) // deep equality

Expected: ArrayContaining [ObjectContaining {"attr_key": "e2e_trm_uir430_7", "detail": "1..10", "reason": "outOfBounds"}]
Received: [{"attr_key": "e2e_trm_uir430_7", "reason": "unknownAttribute"}, {"attr_key": "e2e_trm_uir430_8", "reason": "unknownAttribute"}]

  455 |     ) {
  456 |       expect.soft(answer["ok"], `${label}: ${JSON.stringify(answer)}`).toBe(false);
> 457 |       expect.soft(answer["refusals"], `${label}: ${JSON.stringify(answer)}`).toEqual(
      |                                                                              ^
  458 |         expect.arrayContaining([
  459 |           expect.objectContaining({
  460 |             attr_key: key,
    at refusedAt (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:457:78)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:506:7
```

Context:

```text
          - listitem [ref=e329]:
            - generic [ref=e330]: About
          - listitem [ref=e331]:
            - generic [ref=e332]: How it works
      - navigation "Help" [ref=e333]:
        - heading "Help" [level=2] [ref=e334]
        - list [ref=e335]:
          - listitem [ref=e336]:
            - generic [ref=e337]: Safety
          - listitem [ref=e338]:
            - generic [ref=e339]: Contact
      - navigation "Legal" [ref=e340]:
        - heading "Legal" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - generic [ref=e344]: Terms
          - listitem [ref=e345]:
            - generic [ref=e346]: Privacy
    - paragraph [ref=e348]: © 2026 ethio.com — All rights reserved.
```
```

### posting-routes-identity.spec.ts › POSTING ROUTES — IDENTITY GATE › PR-26 the imitation check is rate-gated before the model is asked

- Source: `shard 8`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:372:23)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-identity.spec.ts:49:18
```

Context: context file not found for `posting-routes-identity-POSTING-ROUTES-IDENTITY-GATE-PR-26-the-imitation-check-is-rate-gated-before-the-model-is-asked-desktop-1280`

### admin-categories-lifecycle.spec.ts › C2 categories console › CT-44 a second Move up waits for the first and lands from the new order

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-categories-lifecycle-C2-categories-console-CT-44-a-second-Move-up-waits-for-the-first-and-lands-from-the-new-order-desktop-1280`

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:reap] location 8a20f002-6807-4f9a-8b9d-ae30000423c4 failed: update or delete on table "locations" violates foreign key constraint "listings_location_id_fkey" on table "listings"

   at helpers/locations.ts:277

  275 |     const deleted = await supabase.from("locations").delete().eq("id", id);
  276 |     if (deleted.error)
> 277 |       throw new Error(`[e2e:reap] location ${id} failed: ${deleted.error.message}`);
      |             ^
  278 |   }
  279 | }
  280 |
    at destroyLocation (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:277:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:196:43
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-1-All-listings-listings-view-reads-every-listing-but-drafts-the-e-mail-only-with-profiles-view-desktop-1280`

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

125 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 14 | shard 1, shard 3, shard 5, shard 7, changed |
| `listing not found` | 13 | shard 3, shard 4, shard 7, shard 8 |
| `too many previews` (quiet) | 10 | shard 3, shard 7 |
| `categories badHeader` (quiet) | 6 | shard 1, shard 3, shard 5, shard 7, changed |
| `categories wrongFile` (quiet) | 6 | shard 1, shard 3, shard 5, shard 7, changed |
| `preview_failed permission denied` (quiet) | 6 | shard 1, shard 5, changed |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 5 | shard 1, shard 2, shard 5, shard 6, changed |
| `commit_failed step-up required: no verified factor` (quiet) | 4 | shard 1, shard 5, changed |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 3, shard 5, shard 7 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 5 |
| `categories file too large` (quiet) | 2 | shard 3, shard 7 |
| `categories nulByte` (quiet) | 2 | shard 3, shard 7 |
| `categories unknownColumn` (quiet) | 2 | shard 3, shard 7 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-bwc<n>r<n>: e<n>e_par_<n>bv<n> → e<n>e_chi_pt<n>opq` (quiet) | 1 | shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ybqn<n>g: e<n>e_par_us<n>eqm → e<n>e_chi_a<n>d<n>g` (quiet) | 1 | shard 1 |
| `name_folds_rebuild: canceling statement due to statement timeout` | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×14 · too many previews ×10 · categories badHeader ×6 · categories wrongFile ×6 · preview_failed permission denied ×6 · category-images: no GEMINI_API_KEY — fake mode ×5 · commit_failed step-up required: no verified factor ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-bwc<n>r<n>: e<n>e_par_<n>bv<n> → e<n>e_chi_pt<n>opq ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ybqn<n>g: e<n>e_par_us<n>eqm → e<n>e_chi_a<n>d<n>g ×1

Off the allowlist:

### listing not found

- Count: 13 · Sources: shard 3, shard 4, shard 7, shard 8

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### name_folds_rebuild: canceling statement due to statement timeout

- Count: 1 · Sources: shard 1

```text
[WebServer] [ssr-error] /api/admin/categories/import name_folds_rebuild: canceling statement due to statement timeout
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-11T23:12:44.079Z | 21.5 min |
| email | 2026-10-11T23:12:46.019Z | 0.3 min |
| shard 1 | 2026-10-11T23:12:41.628Z | 28.1 min |
| shard 2 | 2026-10-11T23:12:36.937Z | 29.3 min |
| shard 3 | 2026-10-11T23:12:36.093Z | 30.8 min |
| shard 4 | 2026-10-11T23:12:45.689Z | 35.9 min |
| shard 5 | 2026-10-11T23:12:48.575Z | 32.8 min |
| shard 6 | 2026-10-11T23:12:34.291Z | 23.4 min |
| shard 7 | 2026-10-11T23:12:38.724Z | 32.0 min |
| shard 8 | 2026-10-11T23:12:34.861Z | 33.2 min |
| changed | 2026-10-11T23:12:37.815Z | 33.6 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 100 | 50.9 min | shard 2, shard 5, changed |
| `admin-categories-lifecycle.spec.ts` | 100 | 39.2 min | shard 1, shard 5, changed |
| `post-wizard-specs.spec.ts` | 78 | 35.9 min | shard 4, shard 8 |
| `post-wizard-bundle2.spec.ts` | 66 | 25.9 min | shard 3, shard 7 |
| `admin-attributes-links.spec.ts` | 64 | 23.4 min | shard 1, shard 5, changed |
| `shell.spec.ts` | 336 | 22.4 min | smoke, shard 4, shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 19.8 min | shard 4, shard 8 |
| `post-wizard-place.spec.ts` | 38 | 17.6 min | shard 3, shard 7 |
| `admin-translations-console.spec.ts` | 84 | 17.3 min | shard 2, shard 6, changed |
| `post-wizard-pricing.spec.ts` | 50 | 17.2 min | shard 3, shard 7 |
| `admin-screening.spec.ts` | 30 | 16.6 min | shard 2, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 16.5 min | shard 4, shard 8 |
| `post-wizard-category.spec.ts` | 46 | 16.3 min | shard 3, shard 7 |
| `feed-screens.spec.ts` | 28 | 15.0 min | shard 3, shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 14.8 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 14.0 min | shard 4, shard 8 |
| `auth-signout.spec.ts` | 44 | 12.8 min | smoke, shard 2, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 12.5 min | shard 1, shard 5 |
| `posting-routes.spec.ts` | 50 | 11.7 min | shard 4, shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 10.7 min | shard 1, shard 5 |
| `admin-users.spec.ts` | 26 | 10.3 min | shard 2, shard 6 |
| `admin-locations.spec.ts` | 38 | 9.7 min | shard 2, shard 6 |
| `feed-index.spec.ts` | 28 | 9.0 min | shard 2, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 8.5 min | shard 3, shard 7 |
| `admin-attributes-editor.spec.ts` | 34 | 7.9 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 7.2 min | shard 4, shard 8 |
| `import-security.spec.ts` | 34 | 7.0 min | shard 3, shard 7 |
| `admin-attributes-safety.spec.ts` | 14 | 7.0 min | shard 1, shard 5 |
| `admin-roles.spec.ts` | 26 | 6.9 min | shard 2, shard 6 |
| `admin-countries.spec.ts` | 18 | 5.8 min | shard 1, shard 5 |
| `viewing-place.spec.ts` | 22 | 5.5 min | shard 4, shard 8 |
| `feed-route.spec.ts` | 16 | 5.4 min | shard 2, shard 6 |
| `admin-audit.spec.ts` | 12 | 5.4 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 16 | 5.2 min | shard 2, shard 6, changed |
| `post-wizard-details.spec.ts` | 8 | 5.0 min | shard 3, shard 7 |
| `post-wizard-finder.spec.ts` | 8 | 4.1 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 3.9 min | shard 1, shard 5 |
| `admin-categories-home.spec.ts` | 8 | 3.6 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 3.2 min | shard 4, shard 8 |
| `admin-shell.spec.ts` | 10 | 3.2 min | shard 2, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 3, shard 7 |
| `posting-routes-identity.spec.ts` | 4 | 2.5 min | shard 4, shard 8 |
| `post-wizard-units.spec.ts` | 4 | 1.8 min | shard 4, shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 1.5 min | shard 4, shard 8 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `i18n-coverage.spec.ts` | 8 | 1.1 min | shard 3, shard 7 |
| `a11y.spec.ts` | 4 | 1.1 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.9 min | smoke, shard 4, shard 8 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 3, shard 7 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 4, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 3, shard 7 |
| `settings.spec.ts` | 4 | 0.7 min | shard 4 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 4, shard 8 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 3, shard 7 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 4, shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `posting-routes-catalog.spec.ts` › PR-42 the door reads a padded answer as the value it stores | desktop-1280 | 144.0 s |
| `post-wizard-place.spec.ts` › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored | mobile-360 | 137.5 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 127.8 s |
| `admin-countries.spec.ts` › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin | mobile-360 | 111.6 s |
| `admin-listings.spec.ts` › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view | desktop-1280 | 110.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 109.4 s |
| `post-wizard-pricing.spec.ts` › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages | mobile-360 | 108.8 s |
| `admin-users.spec.ts` › AU-5 seam: a deactivated account cannot write a listing | mobile-360 | 93.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-37 undoing a category delete restores its attribute links or names the skipped ones | desktop-1280 | 89.1 s |
| `admin-translations-console.spec.ts` › TR-16 the History drawer lists revisions and restores one as a new edit | desktop-1280 | 88.6 s |
| `posting-routes-dials.spec.ts` › PR-29 renew_listing counts against the revise dial | mobile-360 | 80.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-44 a second Move up waits for the first and lands from the new order | desktop-1280 | 79.9 s |
| `posting-routes-identity.spec.ts` › PR-26 the imitation check is rate-gated before the model is asked | desktop-1280 | 79.9 s |
| `admin-translations-console.spec.ts` › TR-16 the History drawer lists revisions and restores one as a new edit | desktop-1280 | 78.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 74.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38183335583-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38183335583-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 5, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 38183335583-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 5, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 22 user(s) owned by process 38183335583-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38183335583-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38183335583-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 5, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 6 user(s) owned by process 38183335583-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 5, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 38183335583-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38183335583-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38183335583-8
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 38183335583-changed
```

## admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
--- further error 1 ---
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================

   at helpers/ui.ts:406

  404 |
  405 |   // 1. The route the auth screen navigates to on password success.
> 406 |   await page.waitForURL(/\/$/, { timeout: 15000 });
      |              ^
  407 |   // 2. Authoritative signed-in signal: the account menu trigger renders ONLY on
  408 |   //    the authenticated branch of app-header (stable testid, no hover/open
  409 |   //    prerequisite), unlike the signed-out "Sign in" link whose absence is
    at signIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:406:14)
    at switchUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:517:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:73:5
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: How it works
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
          - listitem [ref=e317]:
            - generic [ref=e318]: Contact
      - navigation "Legal" [ref=e319]:
        - heading "Legal" [level=2] [ref=e320]
        - list [ref=e321]:
          - listitem [ref=e322]:
            - generic [ref=e323]: Terms
          - listitem [ref=e324]:
            - generic [ref=e325]: Privacy
    - paragraph [ref=e327]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-5 seam: a deactivated account cannot write a listing

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+38183335583-2-1-7-nka0xd@ethio-e2e.invalid: A user with this email address has already been registered
--- further error 1 ---
Error: [e2e:users] admin.createUser failed for e2e+38183335583-2-1-7-nka0xd@ethio-e2e.invalid: A user with this email address has already been registered

   at helpers/users.ts:69

  67 |   });
  68 |   if (error || !data?.user?.id) {
> 69 |     throw new Error(
     |           ^
  70 |       `[e2e:users] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}`,
  71 |     );
  72 |   }
    at createUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:69:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:334:21
```

Context: context file not found for `admin-users-U1-admin-users-AU-5-seam-a-deactivated-account-cannot-write-a-listing-mobile-360`

## post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-12: the shown phone never reached the draft

expect(received).toBe(expected) // Object.is equality

Expected: "true:+251911234567"
Received: "false:"

Call Log:
- Test timeout of 60000ms exceeded
--- further error 1 ---
Error: PW-12: the shown phone never reached the draft

expect(received).toBe(expected) // Object.is equality

Expected: "true:+251911234567"
Received: "false:"

Call Log:
- Test timeout of 60000ms exceeded

  516 |     await page.getByTestId("post-who-show-phone").check();
  517 |     await page.getByTestId("post-next").click();
> 518 |     await expect
      |     ^
  519 |       .poll(
  520 |         async () => {
  521 |           const pref = await contactPrefOf(listingId);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:518:5
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-mobile-360`

## admin-translations-console.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-38183335583-6-6-desktop-1280-0-tr16').getByTestId('string-input-e2e-scratch-38183335583-6-6-desktop-1280-0-tr16')
Expected pattern: /⟪am⟫/
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-38183335583-6-6-desktop-1280-0-tr16').getByTestId('string-input-e2e-scratch-38183335583-6-6-desktop-1280-0-tr16')

--- further error 1 ---
Error: expect(locator).toHaveValue(expected) failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-38183335583-6-6-desktop-1280-0-tr16').getByTestId('string-input-e2e-scratch-38183335583-6-6-desktop-1280-0-tr16')
Expected pattern: /⟪am⟫/
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-38183335583-6-6-desktop-1280-0-tr16').getByTestId('string-input-e2e-scratch-38183335583-6-6-desktop-1280-0-tr16')


  1136 |         .toBe("edited|true");
  1137 |       // INC-558's class (turn G3c) — the box follows the restored text.
> 1138 |       await expect(expansionControl(page, id, "string-input")).toHaveValue(/⟪am⟫/, {
       |                                                                ^
  1139 |         timeout: 20000,
  1140 |       });
  1141 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:1138:64
```

Context:

```text
      - listitem [ref=e22]:
        - generic [ref=e23]:
          - generic [ref=e24]: Human edit
          - generic [ref=e25]: Machine
          - generic [ref=e26]: Machine
        - paragraph [ref=e27]: 6 seconds ago · e2e+38183335583-changed-2822-3-vwmagt
        - paragraph [ref=e28]: ⟪am⟫ History source
        - generic [ref=e29]:
          - paragraph [ref=e30]: Restores this text as an EDITED value — history keeps everything
          - button "Restore this value" [ref=e31] [cursor=pointer]
      - listitem [ref=e32]:
        - generic [ref=e33]:
          - generic [ref=e34]: Machine write
          - generic [ref=e35]: Untranslated
          - generic [ref=e36]: Human
        - paragraph [ref=e37]: 11 seconds ago · e2e+38183335583-changed-2822-3-vwmagt
        - paragraph [ref=e38]: (no value)
        - button "Clear instead" [ref=e39] [cursor=pointer]
    - status [ref=e40]: Restored.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveValue(expected) failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-38183335583-changed-changed-desktop-1280-4-tr16').getByTestId('string-input-e2e-scratch-38183335583-changed-changed-desktop-1280-4-tr16')
Expected pattern: /⟪am⟫/
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-38183335583-changed-changed-desktop-1280-4-tr16').getByTestId('string-input-e2e-scratch-38183335583-changed-changed-desktop-1280-4-tr16')

--- further error 1 ---
Error: expect(locator).toHaveValue(expected) failed

Locator: getByRole('table').getByTestId('string-editor-e2e-scratch-38183335583-changed-changed-desktop-1280-4-tr16').getByTestId('string-input-e2e-scratch-38183335583-changed-changed-desktop-1280-4-tr16')
Expected pattern: /⟪am⟫/
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('string-editor-e2e-scratch-38183335583-changed-changed-desktop-1280-4-tr16').getByTestId('string-input-e2e-scratch-38183335583-changed-changed-desktop-1280-4-tr16')


  1136 |         .toBe("edited|true");
  1137 |       // INC-558's class (turn G3c) — the box follows the restored text.
> 1138 |       await expect(expansionControl(page, id, "string-input")).toHaveValue(/⟪am⟫/, {
       |                                                                ^
  1139 |         timeout: 20000,
  1140 |       });
  1141 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:1138:64
```

Context:

```text
      - listitem [ref=e22]:
        - generic [ref=e23]:
          - generic [ref=e24]: Human edit
          - generic [ref=e25]: Machine
          - generic [ref=e26]: Machine
        - paragraph [ref=e27]: 6 seconds ago · e2e+38183335583-changed-2822-3-vwmagt
        - paragraph [ref=e28]: ⟪am⟫ History source
        - generic [ref=e29]:
          - paragraph [ref=e30]: Restores this text as an EDITED value — history keeps everything
          - button "Restore this value" [ref=e31] [cursor=pointer]
      - listitem [ref=e32]:
        - generic [ref=e33]:
          - generic [ref=e34]: Machine write
          - generic [ref=e35]: Untranslated
          - generic [ref=e36]: Human
        - paragraph [ref=e37]: 11 seconds ago · e2e+38183335583-changed-2822-3-vwmagt
        - paragraph [ref=e38]: (no value)
        - button "Clear instead" [ref=e39] [cursor=pointer]
    - status [ref=e40]: Restored.
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-ybqn2g: e2e_par_us2eqm → e2e_chi_a12d9g
[WebServer] [ssr-error] /api/admin/categories/import name_folds_rebuild: canceling statement due to statement timeout
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-D4YPmn9p.js:34066:25) at http://127.0.0.1:4173/assets/index-D4YPmn9p.js:34098:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-D4YPmn9p.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D4YPmn9p.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D4YPmn9p.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D4YPmn9p.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D4YPmn9p.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D4YPmn9p.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-D4YPmn9p.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-D4YPmn9p.js:6025:5)
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

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
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests) ×3
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: changed

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
