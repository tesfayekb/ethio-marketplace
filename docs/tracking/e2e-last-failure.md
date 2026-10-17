# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39014733235
- Commit: `0ba71cc7d83edc3428db6c71e49066d1f627972b`
- Attempt: 1
- Written (UTC): 2026-10-17T08:56:24.368Z
- Passed: 1823 · Skipped: 126 · Failed: 8
- Gating failures: 8 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 13
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-3 An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes.spec.ts › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private — Error: {"error":"upstream unavailable"}
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › L4b location picker › LS-2 a pick is remembered, clearing forgets it — Error: [e2e:l4b] seeding city failed: canceling statement due to statement timeout
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-46 rented and filled are accepted by the import and an unknown token is still refused — Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-coverage.spec.ts › L2b coverage console › CV-1 gating: a plain user is refused; the roster renders for a super admin — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · posting-routes.spec.ts › POSTING ROUTES › PR-24 a seller without a public name, or a person without a first name, is refused at publish (INC-423) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · posting-routes.spec.ts › POSTING ROUTES › PR-44 a business with its name and no first or last name publishes (INC-423) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · shell.spec.ts › rail scroll regions (U0f) › md+ rail: items scroll, header fixed — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-3 An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "E2E admin listing x xeubndtt"
Received: undefined

  434 |     expect(await noticeRows(target.id)).toEqual([]);
  435 |     expect(await revisionRows(target.id, "edit")).toEqual([]);
> 436 |     expect((await listingTruth(target.id))?.["title"]).toBe(target.title);
      |                                                        ^
  437 |   }
  438 |
  439 |   test("AL-3 An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written", async () => {
    at refusedEdit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:436:56)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:440:5
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-3-An-account-with-no-listing-right-All-listings-the-listing-s-page-and-Edit-refuse-it-nothing-is-written-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-7bc3c-efuse-it-nothing-is-written-mobile-360`; this run carried 16 context file(s); of the same spec: `admin-listings-ADMIN-LISTI-0ab5d-eller-is-told-D194-D154-B4--mobile-360-retry1`, `admin-listings-ADMIN-LISTI-0ab5d-eller-is-told-D194-D154-B4--mobile-360`, `admin-listings-ADMIN-LISTI-0ab5d-eller-is-told-D194-D154-B4--desktop-1280`, `admin-listings-ADMIN-LISTI-0ab5d-eller-is-told-D194-D154-B4--desktop-1280-retry1`

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-24-Edit-refuses-a-reviewer-listings-view-and-review-not-enforce-and-writes-nothing-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-071c7--enforce-and-writes-nothing-mobile-360`; this run carried 16 context file(s); of the same spec: `admin-listings-ADMIN-LISTI-0ab5d-eller-is-told-D194-D154-B4--mobile-360-retry1`, `admin-listings-ADMIN-LISTI-0ab5d-eller-is-told-D194-D154-B4--mobile-360`, `admin-listings-ADMIN-LISTI-0ab5d-eller-is-told-D194-D154-B4--desktop-1280`, `admin-listings-ADMIN-LISTI-0ab5d-eller-is-told-D194-D154-B4--desktop-1280-retry1`

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-1-a-JPEG-carrying-GPS-XMP-and-ICC-is-stored-as-image-data-only-REQ-036-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-e01d4-as-image-data-only-REQ-036--mobile-360`; this run carried 16 context file(s); of the same spec: none

### posting-routes.spec.ts › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: {"error":"upstream unavailable"}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: undefined
--- further error 1 ---
Error: {"error":"upstream unavailable"}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: undefined

  932 |       { token, country: "ET" },
  933 |     );
> 934 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
      |                                                                ^
  935 |     const listingId = String(draft.payload["listing_id"] ?? "");
  936 |
  937 |     for (const column of ["contact_pref", "pin_lat", "pin_lng", "home_country_code"]) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:934:64
```

Context:

```text
          - listitem [ref=e276]:
            - generic [ref=e277]: About
          - listitem [ref=e278]:
            - generic [ref=e279]: How it works
      - navigation "Help" [ref=e280]:
        - heading "Help" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - generic [ref=e284]: Safety
          - listitem [ref=e285]:
            - generic [ref=e286]: Contact
      - navigation "Legal" [ref=e287]:
        - heading "Legal" [level=2] [ref=e288]
        - list [ref=e289]:
          - listitem [ref=e290]:
            - generic [ref=e291]: Terms
          - listitem [ref=e292]:
            - generic [ref=e293]: Privacy
    - paragraph [ref=e295]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › L4b location picker › LS-2 a pick is remembered, clearing forgets it

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:l4b] seeding city failed: canceling statement due to statement timeout
--- further error 1 ---
Error: [e2e:l4b] seeding city failed: canceling statement due to statement timeout

   at helpers/locations.ts:370

  368 |       .single();
  369 |     if (error || !data) {
> 370 |       throw new Error(`[e2e:l4b] seeding ${level} failed: ${error?.message ?? "no row"}`);
      |             ^
  371 |     }
  372 |     return data;
  373 |   };
    at insert (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:370:13)
    at seedScratchChain (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:375:16)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2191:19
```

Context: context file not found for `shell-L4b-location-picker-LS-2-a-pick-is-remembered-clearing-forgets-it-mobile-360` — Playwright's name `shell-L4b-location-picker--932c9-embered-clearing-forgets-it-mobile-360`; this run carried 16 context file(s); of the same spec: none

### admin-categories-console.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - generic [ref=e42]: Listing lifetime (days)
        - textbox "Listing lifetime (days)" [ref=e43]:
          - /placeholder: No end
      - generic [ref=e44]:
        - checkbox "Accepts listings" [checked] [ref=e45] [cursor=pointer]:
          - generic:
            - img
        - text: Accepts listings
      - generic [ref=e46]:
        - checkbox "Price field enabled" [checked] [ref=e47] [cursor=pointer]:
          - generic:
            - img
        - text: Price field enabled
      - generic [ref=e48]:
        - button "Cancel" [ref=e49] [cursor=pointer]
        - button "Save" [ref=e50] [cursor=pointer]
    - button "Close" [ref=e51] [cursor=pointer]:
      - img [ref=e52]
      - generic [ref=e55]: Close
```
```

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-46 rented and filled are accepted by the import and an unknown token is still refused

- Source: `shard 4`
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
    at freshAal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:817:17)
    at useJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:936:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-lifecycle.spec.ts:1775:5
```

Context: context file not found for `admin-categories-lifecycle-CAT-IE-categories-import-export-CT-46-rented-and-filled-are-accepted-by-the-import-and-an-unknown-token-is-still-refused-desktop-1280` — Playwright's name `admin-categories-lifecycle-830f0-nown-token-is-still-refused-desktop-1280`; this run carried 16 context file(s); of the same spec: none

### admin-coverage.spec.ts › L2b coverage console › CV-1 gating: a plain user is refused; the roster renders for a super admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:33479:25) at http://127.0.0.1:4173/assets/index-mICEDFoJ.js:33511:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:6027:5)
```

Context:

```text
          - listitem [ref=e323]:
            - generic [ref=e324]: About
          - listitem [ref=e325]:
            - generic [ref=e326]: How it works
      - navigation "Help" [ref=e327]:
        - heading "Help" [level=2] [ref=e328]
        - list [ref=e329]:
          - listitem [ref=e330]:
            - generic [ref=e331]: Safety
          - listitem [ref=e332]:
            - generic [ref=e333]: Contact
      - navigation "Legal" [ref=e334]:
        - heading "Legal" [level=2] [ref=e335]
        - list [ref=e336]:
          - listitem [ref=e337]:
            - generic [ref=e338]: Terms
          - listitem [ref=e339]:
            - generic [ref=e340]: Privacy
    - paragraph [ref=e342]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:mlp] reserving X

expect(received).toBeNull()

Received: "listing not found"

  253 |     if (notice.error) throw new Error(`[e2e:mlp] notice failed: ${notice.error.message}`);
  254 |     const reserved = await a.rpc("set_listing_reserved", { p_listing_id: X, p_reserved: true });
> 255 |     expect(reserved.error, "[e2e:mlp] reserving X").toBeNull();
      |                                                     ^
  256 |     const priced = await a.rpc("set_listing_price", {
  257 |       p_listing_id: X,
  258 |       p_price_mode: "fixed",
    at seedBoth (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:255:53)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:271:15
```

Context: context file not found for `my-listings-page-MY-LISTINGS-the-list-page-bundle-16-turn-2-MLP-1-my_listings-the-seller-s-own-ads-in-six-groups-newest-change-first-with-their-counts-nobody-else-s-desktop-1280` — Playwright's name `my-listings-page-MY-LISTIN-3e815--their-counts-nobody-else-s-desktop-1280`; this run carried 16 context file(s); of the same spec: `my-listings-page-MY-LISTIN-c1d11-ut-the-page-asks-to-sign-in-desktop-1280-retry1`, `my-listings-page-MY-LISTIN-c1d11-ut-the-page-asks-to-sign-in-desktop-1280`

### posting-routes.spec.ts › POSTING ROUTES › PR-24 a seller without a public name, or a person without a first name, is refused at publish (INC-423)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e303]:
            - generic [ref=e304]: About
          - listitem [ref=e305]:
            - generic [ref=e306]: How it works
      - navigation "Help" [ref=e307]:
        - heading "Help" [level=2] [ref=e308]
        - list [ref=e309]:
          - listitem [ref=e310]:
            - generic [ref=e311]: Safety
          - listitem [ref=e312]:
            - generic [ref=e313]: Contact
      - navigation "Legal" [ref=e314]:
        - heading "Legal" [level=2] [ref=e315]
        - list [ref=e316]:
          - listitem [ref=e317]:
            - generic [ref=e318]: Terms
          - listitem [ref=e319]:
            - generic [ref=e320]: Privacy
    - paragraph [ref=e322]: © 2026 ethio.com — All rights reserved.
```
```

- posting-routes.spec.ts › POSTING ROUTES › PR-44 a business with its name and no first or last name publishes (INC-423) · `desktop-1280` · source `shard 6` — body omitted: cap
- shell.spec.ts › rail scroll regions (U0f) › md+ rail: items scroll, header fixed · `desktop-1280` · source `shard 6` — body omitted: cap
- smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity · `desktop-1280` · source `shard 6` — body omitted: cap

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

111 line(s), 39 message(s): 4 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 3, shard 6 |
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
| `auth upstream unavailable (<n>)` | 1 | shard 3 |
| `catalog_find_refresh: canceling statement due to statement timeout` | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-c<n>cr<n>: e<n>e_par_<n>nkw<n>u → e<n>e_chi_o<n>ahwi` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-spz<n>t<n>: e<n>e_par_h<n>cq<n>j → e<n>e_chi_<n>pglen` (quiet) | 1 | shard 1 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-c<n>cr<n>: e<n>e_par_<n>nkw<n>u → e<n>e_chi_o<n>ahwi ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-spz<n>t<n>: e<n>e_par_h<n>cq<n>j → e<n>e_chi_<n>pglen ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1 · PW-17 the currency is preselected and searchable by name in one control ×1 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×1 · PW-30 review and buyer preview render option labels, units, multi-values and boo ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### auth upstream unavailable (<n>)

- Count: 1 · Sources: shard 3
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): LS-2 a pick is remembered, clearing forgets it ×1 · PR-21 step 7: private columns are owner-only, through my_listing_private ×1

```text
[WebServer] [ssr-error] /api/listings/draft auth upstream unavailable (504)
```

### catalog_find_refresh: canceling statement due to statement timeout

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CO-7 transfer: the markets file round-trips through the header's Import and the  ×1 · CT-35 an imported category name is in the name table after commit and gone after ×1

```text
[WebServer] [ssr-error] /api/admin/categories/import catalog_find_refresh: canceling statement due to statement timeout
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: shard 5
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): ML-9 The seller's history: each change, by you, staff or the system, never a nam ×1 · MLA-12 the ad's actions are one bar under the title, its main next step filled ( ×1

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
| smoke | 2026-10-17T08:12:50.687Z | 15.7 min |
| email | 2026-10-17T08:12:51.585Z | 0.2 min |
| shard 1 | 2026-10-17T08:12:58.662Z | 40.0 min |
| shard 2 | 2026-10-17T08:12:58.445Z | 42.6 min |
| shard 3 | 2026-10-17T08:12:47.286Z | 32.8 min |
| shard 4 | 2026-10-17T08:12:53.822Z | 43.1 min |
| shard 5 | 2026-10-17T08:12:51.217Z | 39.6 min |
| shard 6 | 2026-10-17T08:12:49.436Z | 30.8 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 25.6 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 22.7 min | smoke, shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 22.1 min | shard 1, shard 4 |
| `admin-listings.spec.ts` | 60 | 20.2 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 19.5 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 64 | 19.2 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 17.0 min | shard 2, shard 5 |
| `my-listings-ad.spec.ts` | 36 | 17.0 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 14.3 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 14.1 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 13.7 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 12.3 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 12.2 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 11.8 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 10.4 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 10.1 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 30 | 9.9 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 9.7 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 32 | 9.5 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 8.8 min | shard 3, shard 6 |
| `ad-page.spec.ts` | 16 | 8.6 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.1 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.0 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.9 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.8 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.8 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 7.5 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.1 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.4 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.4 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.4 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 6.3 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 5.6 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 5.6 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 14 | 4.2 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 4.1 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.9 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 14 | 3.8 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 16 | 3.7 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.9 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 1.7 min | smoke, shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 1.6 min | shard 3, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 1.6 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.4 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.0 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.9 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 190.6 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | desktop-1280 | 185.6 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 135.2 s |
| `ad-page.spec.ts` › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id | mobile-360 | 129.8 s |
| `ad-page.spec.ts` › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id | desktop-1280 | 128.6 s |
| `admin-listings.spec.ts` › AL-3 An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written | mobile-360 | 126.9 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 110.8 s |
| `admin-coverage.spec.ts` › CV-1 gating: a plain user is refused; the roster renders for a super admin | desktop-1280 | 101.7 s |
| `admin-categories-console.spec.ts` › CT-6 retirement: a retired category leaves the active tree and keeps its listings home | desktop-1280 | 95.4 s |
| `posting-routes.spec.ts` › PR-24 a seller without a public name, or a person without a first name, is refused at publish (INC-423) | desktop-1280 | 92.5 s |
| `posting-routes.spec.ts` › PR-21 step 7: private columns are owner-only, through my_listing_private | mobile-360 | 91.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-27 a leaf delete undoes with its Amharic name; a parent delete names its child | mobile-360 | 83.5 s |
| `admin-listings.spec.ts` › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing | mobile-360 | 83.4 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 83.0 s |
| `photo-pipeline.spec.ts` › PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036) | mobile-360 | 80.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39014733235-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39014733235-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 39014733235-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39014733235-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39014733235-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 39014733235-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39014733235-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39014733235-6
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: response.json: Test timeout of 60000ms exceeded.

  195 |       const counted = await response;
  196 |       expect(counted.status()).toBe(200);
> 197 |       return counted.json();
      |                      ^
  198 |     }
  199 |     async function views() {
  200 |       const { data, error } = await adminClient()
    at visit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:197:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:207:12
```

Context:

```text
          - listitem [ref=e254]:
            - generic [ref=e255]: About
          - listitem [ref=e256]:
            - generic [ref=e257]: How it works
      - navigation "Help" [ref=e258]:
        - heading "Help" [level=2] [ref=e259]
        - list [ref=e260]:
          - listitem [ref=e261]:
            - generic [ref=e262]: Safety
          - listitem [ref=e263]:
            - generic [ref=e264]: Contact
      - navigation "Legal" [ref=e265]:
        - heading "Legal" [level=2] [ref=e266]
        - list [ref=e267]:
          - listitem [ref=e268]:
            - generic [ref=e269]: Terms
          - listitem [ref=e270]:
            - generic [ref=e271]: Privacy
    - paragraph [ref=e273]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1955 |     // D171 — no sideways scroll, the two photos on one row.
  1956 |     await expectNoHorizontalOverflow(page);
> 1957 |     await expect
       |     ^
  1958 |       .poll(() =>
  1959 |         items.evaluateAll((nodes) =>
  1960 |           nodes.every((n) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1957:5
```

Context:

```text
          - listitem [ref=e365]:
            - generic [ref=e366]: About
          - listitem [ref=e367]:
            - generic [ref=e368]: How it works
      - navigation "Help" [ref=e369]:
        - heading "Help" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Safety
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Terms
          - listitem [ref=e381]:
            - generic [ref=e382]: Privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `my-listings-page-MY-LISTINGS-the-list-page-bundle-16-turn-2-MLP-1-my_listings-the-seller-s-own-ads-in-six-groups-newest-change-first-with-their-counts-nobody-else-s-mobile-360` — Playwright's name `my-listings-page-MY-LISTIN-3e815--their-counts-nobody-else-s-mobile-360`; this run carried 16 context file(s); of the same spec: `my-listings-page-MY-LISTIN-c1d11-ut-the-page-asks-to-sign-in-desktop-1280-retry1`, `my-listings-page-MY-LISTIN-c1d11-ut-the-page-asks-to-sign-in-desktop-1280`

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

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


  772 |       else {
  773 |         await page.getByTestId("post-back").click();
> 774 |         await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                       ^
  775 |         await page.getByTestId("post-back").click();
  776 |       }
  777 |       await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    at toSpecs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:774:55)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--mobile-360`; this run carried 16 context file(s); of the same spec: none

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-17 a visit counts one view, the same address not twice in the hour, the owner never; the seller's page shows the count; the route refuses a bad id

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: response.json: Test timeout of 60000ms exceeded.

  195 |       const counted = await response;
  196 |       expect(counted.status()).toBe(200);
> 197 |       return counted.json();
      |                      ^
  198 |     }
  199 |     async function views() {
  200 |       const { data, error } = await adminClient()
    at visit (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:197:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:207:12
```

Context:

```text
          - listitem [ref=e270]:
            - generic [ref=e271]: About
          - listitem [ref=e272]:
            - generic [ref=e273]: How it works
      - navigation "Help" [ref=e274]:
        - heading "Help" [level=2] [ref=e275]
        - list [ref=e276]:
          - listitem [ref=e277]:
            - generic [ref=e278]: Safety
          - listitem [ref=e279]:
            - generic [ref=e280]: Contact
      - navigation "Legal" [ref=e281]:
        - heading "Legal" [level=2] [ref=e282]
        - list [ref=e283]:
          - listitem [ref=e284]:
            - generic [ref=e285]: Terms
          - listitem [ref=e286]:
            - generic [ref=e287]: Privacy
    - paragraph [ref=e289]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  1955 |     // D171 — no sideways scroll, the two photos on one row.
  1956 |     await expectNoHorizontalOverflow(page);
> 1957 |     await expect
       |     ^
  1958 |       .poll(() =>
  1959 |         items.evaluateAll((nodes) =>
  1960 |           nodes.every((n) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1957:5
```

Context:

```text
          - listitem [ref=e389]:
            - generic [ref=e390]: About
          - listitem [ref=e391]:
            - generic [ref=e392]: How it works
      - navigation "Help" [ref=e393]:
        - heading "Help" [level=2] [ref=e394]
        - list [ref=e395]:
          - listitem [ref=e396]:
            - generic [ref=e397]: Safety
          - listitem [ref=e398]:
            - generic [ref=e399]: Contact
      - navigation "Legal" [ref=e400]:
        - heading "Legal" [level=2] [ref=e401]
        - list [ref=e402]:
          - listitem [ref=e403]:
            - generic [ref=e404]: Terms
          - listitem [ref=e405]:
            - generic [ref=e406]: Privacy
    - paragraph [ref=e408]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e284]:
            - generic [ref=e285]: About
          - listitem [ref=e286]:
            - generic [ref=e287]: How it works
      - navigation "Help" [ref=e288]:
        - heading "Help" [level=2] [ref=e289]
        - list [ref=e290]:
          - listitem [ref=e291]:
            - generic [ref=e292]: Safety
          - listitem [ref=e293]:
            - generic [ref=e294]: Contact
      - navigation "Legal" [ref=e295]:
        - heading "Legal" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Terms
          - listitem [ref=e300]:
            - generic [ref=e301]: Privacy
    - paragraph [ref=e303]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 6`
- Project: `desktop-1280`

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


  772 |       else {
  773 |         await page.getByTestId("post-back").click();
> 774 |         await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                       ^
  775 |         await page.getByTestId("post-back").click();
  776 |       }
  777 |       await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
    at toSpecs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:774:55)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-spz8t3: e2e_par_h8cq7j → e2e_chi_9pglen
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
[WebServer] [ssr-error] /api/listings/draft auth upstream unavailable (504)
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-c92cr0: e2e_par_1nkw6u → e2e_chi_o9ahwi
[WebServer] [ssr-error] /api/admin/categories/import catalog_find_refresh: canceling statement due to statement timeout
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:33479:25) at http://127.0.0.1:4173/assets/index-mICEDFoJ.js:33511:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-mICEDFoJ.js:6027:5)
```

## Server errors: shard 5

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
[WebServer] [ssr-error] /api/locations Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```
