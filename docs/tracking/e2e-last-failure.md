# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38505679902
- Commit: `1f28c90a4c352f6d3dc521039ec8c96bae8f8362`
- Attempt: 1
- Written (UTC): 2026-10-14T04:47:56.889Z
- Passed: 1372 · Skipped: 170 · Failed: 306
- Gating failures: 306 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 9
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-26 imported Amharic names land pending, and undo removes them — Error: [e2e:c2] reading e2e-cat-1-0-kr36zy failed: upstream request timeout
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-128 a number typed before the phone library arrives is saved only once read — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes-identity.spec.ts › POSTING ROUTES — IDENTITY GATE › PR-26 the imitation check is rate-gated before the model is asked — Error: expect(received).toBe(expected) // Object.is equality
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes.spec.ts › POSTING ROUTES › PR-2 an incomplete step is the door's own refusal, at status 200 — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in — Error: CT-42 round 3 undo: {"error":"server error","message":"upstream request timeout"}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-3 creation is absent from the header; the countries file is the only creation path — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-124 the phone box shows an example and a length hint per country — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session — Test timeout of 120000ms exceeded while running "afterEach" hook.

## Flaky bodies (DEC-078)

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-26 imported Amharic names land pending, and undo removes them

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:c2] reading e2e-cat-1-0-kr36zy failed: upstream request timeout
--- further error 1 ---
Error: [e2e:c2] reading e2e-cat-1-0-kr36zy failed: upstream request timeout

   at helpers/categories.ts:277

  275 |     .eq("slug", slug)
  276 |     .maybeSingle();
> 277 |   if (error) throw new Error(`[e2e:c2] reading ${slug} failed: ${error.message}`);
      |                    ^
  278 |   return data;
  279 | }
  280 |
    at readCategory (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/categories.ts:277:20)
    at destroyCategory (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/categories.ts:348:15)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-lifecycle.spec.ts:2066:7
```

Context:

```text
          - listitem [ref=e1541]:
            - generic [ref=e1542]: About
          - listitem [ref=e1543]:
            - generic [ref=e1544]: How it works
      - navigation "Help" [ref=e1545]:
        - heading "Help" [level=2] [ref=e1546]
        - list [ref=e1547]:
          - listitem [ref=e1548]:
            - generic [ref=e1549]: Safety
          - listitem [ref=e1550]:
            - generic [ref=e1551]: Contact
      - navigation "Legal" [ref=e1552]:
        - heading "Legal" [level=2] [ref=e1553]
        - list [ref=e1554]:
          - listitem [ref=e1555]:
            - generic [ref=e1556]: Terms
          - listitem [ref=e1557]:
            - generic [ref=e1558]: Privacy
    - paragraph [ref=e1560]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-128 a number typed before the phone library arrives is saved only once read

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-128-a-number-typed-before-the-phone-library-arrives-is-saved-only-once-read-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-9f54e-ves-is-saved-only-once-read-mobile-360`; this run carried 16 context file(s); of the same spec: none

### posting-routes-identity.spec.ts › POSTING ROUTES — IDENTITY GATE › PR-26 the imitation check is rate-gated before the model is asked

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 503
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 503

  57 |       const alias = `${stem}${letters(4)}`;
  58 |       const answer = await postRoute(page, IDENTITY, { alias }, { token, country: "ET" });
> 59 |       expect(answer.status).toBe(200);
     |                             ^
  60 |       const reasons = reasonsOf(answer.payload);
  61 |       expect(
  62 |         reasons.filter((r) => r.field === "rate"),
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-identity.spec.ts:59:29
--- further error 2 ---
Test timeout of 120000ms exceeded while running "afterEach" hook.

  41 |   const sellers: string[] = [];
  42 |
> 43 |   test.afterEach(async () => {
     |        ^
  44 |     while (sellers.length > 0) await destroyListingsOf(sellers.pop()!);
  45 |   });
  46 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-identity.spec.ts:43:8
```

Context:

```text
          - listitem [ref=e260]:
            - generic [ref=e261]: About
          - listitem [ref=e262]:
            - generic [ref=e263]: How it works
      - navigation "Help" [ref=e264]:
        - heading "Help" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - generic [ref=e268]: Safety
          - listitem [ref=e269]:
            - generic [ref=e270]: Contact
      - navigation "Legal" [ref=e271]:
        - heading "Legal" [level=2] [ref=e272]
        - list [ref=e273]:
          - listitem [ref=e274]:
            - generic [ref=e275]: Terms
          - listitem [ref=e276]:
            - generic [ref=e277]: Privacy
    - paragraph [ref=e279]: © 2026 ethio.com — All rights reserved.
```
```

### posting-routes.spec.ts › POSTING ROUTES › PR-2 an incomplete step is the door's own refusal, at status 200

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-2-an-incomplete-step-is-the-door-s-own-refusal-at-status-200-mobile-360` — Playwright's name `posting-routes-POSTING-ROU-8e98e-s-own-refusal-at-status-200-mobile-360`; this run carried 16 context file(s); of the same spec: `posting-routes-POSTING-ROU-11e37-once-the-ceiling-is-reached-desktop-1280`

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: CT-42 round 3 undo: {"error":"server error","message":"upstream request timeout"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500
--- further error 1 ---
Error: CT-42 round 3 undo: {"error":"server error","message":"upstream request timeout"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500

  1217 |
  1218 |         const undo = await importPost(page, token, { mode: "undo", batchId });
> 1219 |         expect(undo.status, `CT-42 round ${round} undo: ${JSON.stringify(undo.payload)}`).toBe(200);
       |                                                                                           ^
  1220 |         expect(await readCategory(xSlug), `CT-42 round ${round} left X`).toBeNull();
  1221 |         expect(await readCategory(cSlug), `CT-42 round ${round} left C`).toBeNull();
  1222 |         expect(await readCategory(gSlug), `CT-42 round ${round} left G`).toBeNull();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-lifecycle.spec.ts:1219:91
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 504 ()
[client-error] HTTP 504 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation (upstream request timeout)
```

Context:

```text
          - listitem [ref=e1496]:
            - generic [ref=e1497]: About
          - listitem [ref=e1498]:
            - generic [ref=e1499]: How it works
      - navigation "Help" [ref=e1500]:
        - heading "Help" [level=2] [ref=e1501]
        - list [ref=e1502]:
          - listitem [ref=e1503]:
            - generic [ref=e1504]: Safety
          - listitem [ref=e1505]:
            - generic [ref=e1506]: Contact
      - navigation "Legal" [ref=e1507]:
        - heading "Legal" [level=2] [ref=e1508]
        - list [ref=e1509]:
          - listitem [ref=e1510]:
            - generic [ref=e1511]: Terms
          - listitem [ref=e1512]:
            - generic [ref=e1513]: Privacy
    - paragraph [ref=e1515]: © 2026 ethio.com — All rights reserved.
```
```

### admin-countries.spec.ts › L2b countries console › CO-3 creation is absent from the header; the countries file is the only creation path

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-countries-L2b-countries-console-CO-3-creation-is-absent-from-the-header-the-countries-file-is-the-only-creation-path-desktop-1280` — Playwright's name `admin-countries-L2b-countr-4e0c4-e-is-the-only-creation-path-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-countries-L2b-countr-68061-arrow-on-the-agreed-toolbar-desktop-1280`

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-124 the phone box shows an example and a length hint per country

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-124-the-phone-box-shows-an-example-and-a-length-hint-per-country-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-3f3f7-d-a-length-hint-per-country-desktop-1280`; this run carried 16 context file(s); of the same spec: none

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-43-a-fact-prefills-a-sibling-the-same-selection-unhides-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--accdb--the-same-selection-unhides-desktop-1280`; this run carried 16 context file(s); of the same spec: none

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded while running "afterEach" hook.
--- further error 1 ---
Test timeout of 120000ms exceeded while running "afterEach" hook.

  88 |   const objects: { userId: string; listingId: string }[] = [];
  89 |
> 90 |   test.afterEach(async ({ page }) => {
     |        ^
  91 |     // INC-323 / INC-398 — stop the page first: wait out a save in flight, then
  92 |     // blank it, so no autosave lands after the purge (about:blank alone left a
  93 |     // save already sent to land as "listing not found").
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:90:8
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-21-a-published-ad-s-cover-photo-reaches-the-feed-card-signed-for-a-visitor-without-a-session-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-1b301-a-visitor-without-a-session-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

239 line(s), 45 message(s): 10 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `<!DOCTYPE html>` | 54 | shard 2, shard 3, shard 5, shard 6 |
| `upstream returned an HTML error page (<n>)` | 34 | shard 1, shard 2, shard 3, shard 5, shard 6 |
| `gate fetch failed <n>` | 28 | shard 2, shard 3, shard 5, shard 6 |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 10 | shard 3, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `auth upstream unavailable (<n>)` | 7 | shard 1, shard 2, shard 3, shard 5, shard 6 |
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
| `upstream request timeout` | 2 | shard 2, shard 4 |
| `[WebServer] <!DOCTYPE html>` | 1 | shard 2 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-g<n>ww<n>b: e<n>e_par_<n>ify<n>p → e<n>e_chi_daat<n>p` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-pzk<n>li: e<n>e_par_<n> → e<n>e_chi_rdkdvo` (quiet) | 1 | shard 4 |
| `register_listing_photo: upstream unavailable (<n>)` | 1 | shard 5 |
| `submit_listing: upstream unavailable (<n>)` | 1 | shard 6 |
| `undo_failed upstream request timeout` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-g<n>ww<n>b: e<n>e_par_<n>ify<n>p → e<n>e_chi_daat<n>p ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-pzk<n>li: e<n>e_par_<n> → e<n>e_chi_rdkdvo ×1

Off the allowlist:

### <!DOCTYPE html>

- Count: 54 · Sources: shard 2, shard 3, shard 5, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-14 D20: a signed-out visitor is sent to sign in with a return path, comes bac ×15 · admin panel is absent for a normal signed-in user ×4 · C1: a rail row is 36px high with a mouse from md ×4 · PR-21 step 7: private columns are owner-only, through my_listing_private (retry  ×4 · PR-23 an ad has no end unless the seller sets a date or the category holds a lim ×4 · PR-9 catalog finder is bounded, multilingual and rate-limited ×4

```text
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
```

### upstream returned an HTML error page (<n>)

- Count: 34 · Sources: shard 1, shard 2, shard 3, shard 5, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-14 D20: a signed-out visitor is sent to sign in with a return path, comes bac ×8 · admin panel is absent for a normal signed-in user ×2 · AL-16 The listing page's door: who reads what, drafts never, a pin and an addres ×2 · C1: a rail row is 36px high with a mouse from md ×2 · LT-10 tones: retired is destructive, active is secondary, a level badge is outli ×2 · PR-21 step 7: private columns are owner-only, through my_listing_private (retry  ×2

```text
[WebServer] [ssr-error] /api/feed upstream returned an HTML error page (520)
```

### gate fetch failed <n>

- Count: 28 · Sources: shard 2, shard 3, shard 5, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-14 D20: a signed-out visitor is sent to sign in with a return path, comes bac ×8 · C1: a rail row is 36px high with a mouse from md ×2 · L3: the footer spans the full width beneath the fixed rail ×2 · password visibility stays inside the full-width field ×2 · PR-8 no bearer is 401 on every posting route ×2 · PW-105 the searching row shows while the finder is asked; no-hits only after its ×2

```text
[WebServer] [ssr-error] /__root gate fetch failed 522
```

### listing not found

- Count: 10 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-50 the specifications show every row open in display order (D41) ×2 · PW-61 a category change resets details, title, description and price, and Undo w ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### auth upstream unavailable (<n>)

- Count: 7 · Sources: shard 1, shard 2, shard 3, shard 5, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-17 Move earlier and Move later put a photo at its place, and the first is the ×3 · PW-149 a save refused for another reason shows a message at Next and can be retr ×3 · AL-2 All listings: the views, the filters and newest first ×1 · AL-2 All listings: the views, the filters and newest first (retry #1) ×1 · PR-1 the draft route sets the observed residency from the edge exactly once ×1 · PR-1 the draft route sets the observed residency from the edge exactly once (ret ×1

```text
[WebServer] [ssr-error] /api/admin/categories/import auth upstream unavailable (504)
```

### upstream request timeout

- Count: 2 · Sources: shard 2, shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CO-3 creation is absent from the header; the countries file is the only creation ×1 · CT-42 the undo of an import removes a created chain and its guest link, whatever ×1 · PP-19 Next and Back wait while a photo is sent, and the cover carries its ribbon ×1 · PW-128 a number typed before the phone library arrives is saved only once read ( ×1

```text
[WebServer] [ssr-error] /api/media/photo-links upstream request timeout
```

### [WebServer] <!DOCTYPE html>

- Count: 1 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-14 D20: a signed-out visitor is sent to sign in with a return path, comes bac ×1 · PW-85 an option label, an alias and an Amharic alias each find the leaf, and the ×1

```text
[WebServer] [ssr-error] /api/locations [WebServer] <!DOCTYPE html>
```

### register_listing_photo: upstream unavailable (<n>)

- Count: 1 · Sources: shard 5
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-14 a photo removed while it uploads, or while it waits its turn, never comes  ×1 · PW-124 the phone box shows an example and a length hint per country (retry #1) ×1

```text
[WebServer] [ssr-error] /api/upload/photo register_listing_photo: upstream unavailable (504)
```

### submit_listing: upstream unavailable (<n>)

- Count: 1 · Sources: shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): /settings shows the Account context, and returning shows categories ×1 · PR-7 the draft dial refuses by name once the ceiling is reached ×1

```text
[WebServer] [ssr-error] /api/listings/draft submit_listing: upstream unavailable (520)
```

### undo_failed upstream request timeout

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CO-3 creation is absent from the header; the countries file is the only creation ×1 · CT-42 the undo of an import removes a created chain and its guest link, whatever ×1

```text
[WebServer] [ssr-error] /api/admin/categories/import undo_failed upstream request timeout
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-14T03:21:06.507Z | 18.1 min |
| email | 2026-10-14T03:20:59.053Z | 0.2 min |
| shard 1 | 2026-10-14T03:20:59.180Z | 72.0 min |
| shard 2 | 2026-10-14T03:20:58.873Z | 77.9 min |
| shard 3 | 2026-10-14T03:20:55.560Z | 43.4 min |
| shard 4 | 2026-10-14T03:21:00.309Z | 86.5 min |
| shard 5 | 2026-10-14T03:20:58.159Z | 81.9 min |
| shard 6 | 2026-10-14T03:21:04.627Z | 61.4 min |
| changed | 2026-10-14T03:21:08.673Z | 24.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-screening.spec.ts` | 76 | 65.4 min | shard 1, shard 4, changed |
| `admin-listings.spec.ts` | 54 | 53.4 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 48.6 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 96 | 45.5 min | shard 2, shard 5, changed |
| `post-wizard-category.spec.ts` | 48 | 40.7 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 33.3 min | smoke, shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 31.6 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 29.3 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 27.8 min | shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 80 | 27.7 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 52 | 24.2 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 38 | 21.8 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 50 | 20.6 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 16.9 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 13.2 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.6 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 12.3 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 11.7 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 10.6 min | smoke, shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 10.5 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 28 | 10.2 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 10.1 min | shard 3, shard 6 |
| `admin-categories-console.spec.ts` | 34 | 9.9 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 8.9 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 8.9 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.8 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 8.6 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.1 min | shard 1, shard 4 |
| `admin-services.spec.ts` | 16 | 7.7 min | shard 1, shard 4, changed |
| `admin-attributes-safety.spec.ts` | 16 | 6.9 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 6.8 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 6.7 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 6.7 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 4.8 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 14 | 4.4 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.1 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 10 | 3.7 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.6 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 1.9 min | smoke, shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.2 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 282.3 s |
| `photo-pipeline.spec.ts` › PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session | desktop-1280 | 242.0 s |
| `posting-routes-identity.spec.ts` › PR-26 the imitation check is rate-gated before the model is asked | mobile-360 | 236.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-26 imported Amharic names land pending, and undo removes them | mobile-360 | 204.0 s |
| `photo-pipeline.spec.ts` › PP-13 photo links: the owner and staff get them; another seller and no session do not | desktop-1280 | 180.1 s |
| `admin-listings.spec.ts` › AL-2 All listings: the views, the filters and newest first | mobile-360 | 180.1 s |
| `posting-routes-catalog.spec.ts` › PR-37 coverage first appearance is stored once, renumbered in either order | desktop-1280 | 177.5 s |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | mobile-360 | 159.6 s |
| `admin-listings.spec.ts` › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown | mobile-360 | 143.7 s |
| `post-wizard-category.spec.ts` › PW-14 D20: a signed-out visitor is sent to sign in with a return path, comes back, and a foreign return is ignored | mobile-360 | 141.0 s |
| `post-wizard-category.spec.ts` › PW-14 D20: a signed-out visitor is sent to sign in with a return path, comes back, and a foreign return is ignored | desktop-1280 | 140.7 s |
| `posting-routes.spec.ts` › PR-7 the draft dial refuses by name once the ceiling is reached | desktop-1280 | 129.6 s |
| `post-wizard-bundle2.spec.ts` › PW-133 contact details are kept on the profile and open the next ad | desktop-1280 | 128.6 s |
| `shell.spec.ts` › TR-27 a star set signed-out survives reload, sign-in and sign-out | desktop-1280 | 120.9 s |
| `post-wizard-specs.spec.ts` › PW-42 Amharic catalog text falls back field by field | desktop-1280 | 120.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38505679902-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38505679902-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38505679902-1: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38505679902-2: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38505679902-3: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38505679902-4: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38505679902-5: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 0 (pool 0, fresh 0)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] WARNING could not list users for process 38505679902-6: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38505679902-changed
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-2 All listings: the views, the filters and newest first

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Test timeout of 60000ms exceeded while running "afterEach" hook.

  186 |   const specSets: string[][] = [];
  187 |
> 188 |   test.afterEach(async () => {
      |        ^
  189 |     const supabase = adminClient();
  190 |     for (const id of listingIds.splice(0)) {
  191 |       const removed = await supabase.from("listings").delete().eq("id", id);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:188:8
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-2-All-listings-the-views-the-filters-and-newest-first-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-52c18-he-filters-and-newest-first-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:c1a] linking the branch failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 520: Web server is returning an unknown error</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Web server is returning an unknown error</span>
                <span class="code-label">Error code 520</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_520&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:48:32 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:c1a] linking the branch failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 520: Web server is returning an unknown error</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
--- further error 2 ---
Error: [e2e:reap] listings of seller aa6dabbc-51c6-4197-812e-3aff905abcc1 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-16-The-listing-page-s-door-who-reads-what-drafts-never-a-pin-and-an-address-named-but-never-shown-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-211bf-dress-named-but-never-shown-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-17 The listing's page: opened from All listings, Remove with a reason, the history's newest line, the buyer's view

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1217:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-17-The-listing-s-page-opened-from-All-listings-Remove-with-a-reason-the-history-s-newest-line-the-buyer-s-view-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-216b5-ewest-line-the-buyer-s-view-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1282:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-18-The-listing-s-page-with-listings-view-alone-no-e-mail-no-moves-a-staff-line-without-a-name-drafts-not-found-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-09fd4-out-a-name-drafts-not-found-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-19 Edit is judged on what an admin can change: the seller's end date within a day and a switched-off place do not block it

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1338:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-19-Edit-is-judged-on-what-an-admin-can-change-the-seller-s-end-date-within-a-day-and-a-switched-off-place-do-not-block-it-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-a7d1d-d-off-place-do-not-block-it-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1395:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-20-Edit-on-the-listing-s-page-the-title-and-the-price-with-a-reason-and-a-note-the-seller-is-told-a-price-prints-with-its-unit-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-b20b6--price-prints-with-its-unit-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-21 Edit: a refusal under its field and nothing written; Cancel; nothing changed says so

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1488:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-21-Edit-a-refusal-under-its-field-and-nothing-written-Cancel-nothing-changed-says-so-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-d0071-cel-nothing-changed-says-so-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-22 Edit moves a listing to another category with Wrong category; the seller is told

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1541:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-22-Edit-moves-a-listing-to-another-category-with-Wrong-category-the-seller-is-told-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-87bfb-category-the-seller-is-told-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-23 Edit changes a specification: a refusal under its control, then the answer saved

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1602:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-23-Edit-changes-a-specification-a-refusal-under-its-control-then-the-answer-saved-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-5ef46-ntrol-then-the-answer-saved-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-26 Undo this edit: the newest edit's before-values come back as a new edit with the reason Undo; the seller is told

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1689:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-26-Undo-this-edit-the-newest-edit-s-before-values-come-back-as-a-new-edit-with-the-reason-Undo-the-seller-is-told-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-f18fc-son-Undo-the-seller-is-told-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-27 Undo refuses: nothing to undo, a stale line, a listing changed since, an undo, the seller's own line, today's rules

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1774:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-27-Undo-refuses-nothing-to-undo-a-stale-line-a-listing-changed-since-an-undo-the-seller-s-own-line-today-s-rules-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-947d4-er-s-own-line-today-s-rules-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-locations.spec.ts › L2a locations console › LT-10 tones: retired is destructive, active is secondary, a level badge is outline

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:l2a] no active region in ET: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context:

```text
          - listitem [ref=e123]:
            - generic [ref=e124]: About
          - listitem [ref=e125]:
            - generic [ref=e126]: How it works
      - navigation "Help" [ref=e127]:
        - heading "Help" [level=2] [ref=e128]
        - list [ref=e129]:
          - listitem [ref=e130]:
            - generic [ref=e131]: Safety
          - listitem [ref=e132]:
            - generic [ref=e133]: Contact
      - navigation "Legal" [ref=e134]:
        - heading "Legal" [level=2] [ref=e135]
        - list [ref=e136]:
          - listitem [ref=e137]:
            - generic [ref=e138]: Terms
          - listitem [ref=e139]:
            - generic [ref=e140]: Privacy
    - paragraph [ref=e142]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-11 one read per country: filtering costs no request, switching the market costs exactly one

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:49:54 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-11-one-read-per-country-filtering-costs-no-request-switching-the-market-costs-exactly-one-mobile-360` — Playwright's name `admin-locations-L2a-locati-fdc81-he-market-costs-exactly-one-mobile-360`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-12 transfer scope: exports and the import title follow the selected country

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:50:36 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-12-transfer-scope-exports-and-the-import-title-follow-the-selected-country-mobile-360` — Playwright's name `admin-locations-L2a-locati-7d329-follow-the-selected-country-mobile-360`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:51:18 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-13-all-countries-the-picker-opens-on-every-market-the-roster-spans-them-and-the-transfer-group-carries-no-scope-mobile-360` — Playwright's name `admin-locations-L2a-locati-37bec-sfer-group-carries-no-scope-mobile-360`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-14 market state and whole-country parent follow the selected market

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:52:00 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-14-market-state-and-whole-country-parent-follow-the-selected-market-mobile-360` — Playwright's name `admin-locations-L2a-locati-8de66--follow-the-selected-market-mobile-360`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-16 the row's actions: Edit, a red Delete and the menu's verbs open the editor's own dialogs

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:52:43 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-16-the-row-s-actions-Edit-a-red-Delete-and-the-menu-s-verbs-open-the-editor-s-own-dialogs-mobile-360` — Playwright's name `admin-locations-L2a-locati-82d2f-en-the-editor-s-own-dialogs-mobile-360`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › OV-1 overview totals, links and group breadcrumbs

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:53:24 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-OV-1-overview-totals-links-and-group-breadcrumbs-mobile-360` — Playwright's name `admin-locations-L2a-locati-59426-links-and-group-breadcrumbs-mobile-360`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:u2] moderator role unreadable: no row
--- further error 1 ---
Error: [e2e:u2] moderator role unreadable: no row

  139 |     .single();
  140 |   if (roleError || !role) {
> 141 |     throw new Error(`[e2e:u2] moderator role unreadable: ${roleError?.message ?? "no row"}`);
      |           ^
  142 |   }
  143 |   type Row = {
  144 |     id: string;
    at healModeratorBaseline (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:141:11)
```

Context: context file not found for `admin-roles-U2-roles-console-RP-1-gating-moderator-refused-admin-sees-the-list-signed-out-deep-link-redirects-mobile-360` — Playwright's name `admin-roles-U2-roles-conso-b7879-ned-out-deep-link-redirects-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-1 the queue lists an ad waiting for review

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:272:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-1-the-queue-lists-an-ad-waiting-for-review-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-5507e-ts-an-ad-waiting-for-review-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-2 Approve puts the ad on the site

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:281:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-2-Approve-puts-the-ad-on-the-site-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-67008-ove-puts-the-ad-on-the-site-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-3 Reject keeps the ad off

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:300:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-3-Reject-keeps-the-ad-off-mobile-360` — Playwright's name `admin-screening-ADMIN-SCREENING-SC-3-Reject-keeps-the-ad-off-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-4 a person with no role cannot decide

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:324:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-4-a-person-with-no-role-cannot-decide-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-6b6c5--with-no-role-cannot-decide-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-16 a reviewer without a fresh second factor cannot decide

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:340:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-16-a-reviewer-without-a-fresh-second-factor-cannot-decide-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-f4ca6-second-factor-cannot-decide-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-5 an empty search shows the empty message

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:01:33 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-5-an-empty-search-shows-the-empty-message-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-fe3db-rch-shows-the-empty-message-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-6 Preview as buyer draws the ad's category picture

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:390:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-6-Preview-as-buyer-draws-the-ad-s-category-picture-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-5b94c-s-the-ad-s-category-picture-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-7 a reviewer reads the preview's facts: the ad's country, the methods shown and the public name, never a value

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:416:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-7-a-reviewer-reads-the-preview-s-facts-the-ad-s-country-the-methods-shown-and-the-public-name-never-a-value-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-d877c-e-public-name-never-a-value-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-8 a person who is not a reviewer reads nothing and reveals nothing, and no row is written

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:449:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-8-a-person-who-is-not-a-reviewer-reads-nothing-and-reveals-nothing-and-no-row-is-written-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-a1977-thing-and-no-row-is-written-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-17 a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:468:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-17-a-reviewer-without-a-second-factor-reads-the-facts-and-reveals-a-shown-number-logged-once-D129-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-421d5-wn-number-logged-once-D129--mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-9 Show number: a reviewer with a fresh second factor gets the number, and one audit row names the channel and never the number

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:489:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-9-Show-number-a-reviewer-with-a-fresh-second-factor-gets-the-number-and-one-audit-row-names-the-channel-and-never-the-number-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-3d745-hannel-and-never-the-number-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-10 an ad that is not waiting for review answers neither door

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:520:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-10-an-ad-that-is-not-waiting-for-review-answers-neither-door-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-89ad0-review-answers-neither-door-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-11 the toolbar: Columns hides a column and remembers it; Filters settles on the ad's market — another market lists none, its own lists it, never an error — and its chip clears

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:535:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-11-the-toolbar-Columns-hides-a-column-and-remembers-it-Filters-settles-on-the-ad-s-market-another-market-lists-none-its-own-lists-it-never-an-error-and-its-chip-clears-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-50239-error-—-and-its-chip-clears-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-12 two ticked ads are approved together, after one confirmation that counts them

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:591:19
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-12-two-ticked-ads-are-approved-together-after-one-confirmation-that-counts-them-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-d873d-nfirmation-that-counts-them-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-13 Preview as buyer shows the public name, then the methods shown one per row; Show number puts the number in its row with no second factor and logs it

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:630:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-13-Preview-as-buyer-shows-the-public-name-then-the-methods-shown-one-per-row-Show-number-puts-the-number-in-its-row-with-no-second-factor-and-logs-it-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-a5a3c-o-second-factor-and-logs-it-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-14 Reject at the foot of the preview closes it and keeps the ad off

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:721:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-14-Reject-at-the-foot-of-the-preview-closes-it-and-keeps-the-ad-off-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-bde16-ses-it-and-keeps-the-ad-off-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:755:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-15-a-reviewer-with-no-second-factor-opens-the-preview-and-Show-number-shows-the-number-in-its-row-logged-once-D129-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-7c2dd-n-its-row-logged-once-D129--mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-18 the preview counts the photos not checked by AI, and Approve approves them with the ad (D158)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:876:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-18-the-preview-counts-the-photos-not-checked-by-AI-and-Approve-approves-them-with-the-ad-D158-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-638f2-oves-them-with-the-ad-D158--mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-19 a move to live with no session leaves the photo held: no buyer reads it or gets it as the card's cover (D158)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:907:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-19-a-move-to-live-with-no-session-leaves-the-photo-held-no-buyer-reads-it-or-gets-it-as-the-card-s-cover-D158-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-fbe09-t-as-the-card-s-cover-D158--mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-services.spec.ts › ADMIN › SERVICES — the AI switches and meter (D158) › SV-1 a seller can neither read nor change a switch, call the meter or read its tables

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-services.spec.ts:139:20
```

Context: context file not found for `admin-services-ADMIN-SERVICES-the-AI-switches-and-meter-D158-SV-1-a-seller-can-neither-read-nor-change-a-switch-call-the-meter-or-read-its-tables-mobile-360` — Playwright's name `admin-services-ADMIN-›-SER-6b6c7-he-meter-or-read-its-tables-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-services.spec.ts › ADMIN › SERVICES — the AI switches and meter (D158) › SV-2 the super admin reads the six features and changes a switch through its door

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:sv] seeding e2e-sv-mv7l4x4s-zsolbv failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:04:07 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:sv] seeding e2e-sv-mv7l4x4s-zsolbv failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-services-ADMIN-SERVICES-the-AI-switches-and-meter-D158-SV-2-the-super-admin-reads-the-six-features-and-changes-a-switch-through-its-door-mobile-360` — Playwright's name `admin-services-ADMIN-›-SER-ef511-s-a-switch-through-its-door-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-services.spec.ts › ADMIN › SERVICES — the AI switches and meter (D158) › SV-3 the meter on the app's own connection: today's row, the alerts and off at the budget

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:sv] seeding e2e-sv-mv7l5tk2-25s0la failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:04:48 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:sv] seeding e2e-sv-mv7l5tk2-25s0la failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-services-ADMIN-SERVICES-the-AI-switches-and-meter-D158-SV-3-the-meter-on-the-app-s-own-connection-today-s-row-the-alerts-and-off-at-the-budget-mobile-360` — Playwright's name `admin-services-ADMIN-›-SER-22ccc-lerts-and-off-at-the-budget-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-services.spec.ts › ADMIN › SERVICES — the AI switches and meter (D158) › SV-4 the page Admin › Services › AI lists the six features, and photo screening's switch says what off does

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:05:32 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-services-ADMIN-SERVICES-the-AI-switches-and-meter-D158-SV-4-the-page-Admin-Services-AI-lists-the-six-features-and-photo-screening-s-switch-says-what-off-does-mobile-360` — Playwright's name `admin-services-ADMIN-›-SER-9f6e4-s-switch-says-what-off-does-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-shell.spec.ts › Admin shell (U0) › A-6 admin fixture: gated section nav, section page + breadcrumb, deep link

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:95:19
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-6-admin-fixture-gated-section-nav-section-page-breadcrumb-deep-link-mobile-360` — Playwright's name `admin-shell-Admin-shell-U0-7e4b8-n-page-breadcrumb-deep-link-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-shell.spec.ts › Admin shell (U0) › A-7 moderator fixture: two sections (All listings, audit), other deep links refused, admin tab still visible

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:192:17
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-7-moderator-fixture-two-sections-All-listings-audit-other-deep-links-refused-admin-tab-still-visible-mobile-360` — Playwright's name `admin-shell-Admin-shell-U0-4e476-sed-admin-tab-still-visible-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-shell.spec.ts › Admin shell (U0) › A-4 admin TAB from marketplace navigates to /admin (INC-071)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:250:19
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-4-admin-TAB-from-marketplace-navigates-to-admin-INC-071-mobile-360` — Playwright's name `admin-shell-Admin-shell-U0-63fbf-navigates-to-admin-INC-071--mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-shell.spec.ts › Admin shell (U0) › A-8 regular user: /admin still redirects home

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:269:18
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-8-regular-user-admin-still-redirects-home-mobile-360` — Playwright's name `admin-shell-Admin-shell-U0-214d1--admin-still-redirects-home-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:295:19
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-5-the-Categories-group-carries-its-sub-items-expands-on-a-sub-route-and-gates-each-one-mobile-360` — Playwright's name `admin-shell-Admin-shell-U0-d40f7-ub-route-and-gates-each-one-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-1 gating: a permissionless user is refused; a super admin sees the roster

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:113:19
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-1-gating-a-permissionless-user-is-refused-a-super-admin-sees-the-roster-mobile-360` — Playwright's name `admin-translations-console-994f0-super-admin-sees-the-roster-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-38 the roster on the agreed blocks: heading, Columns, the footer

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:14:22 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-38-the-roster-on-the-agreed-blocks-heading-Columns-the-footer-mobile-360` — Playwright's name `admin-translations-console-94f3d--heading-Columns-the-footer-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-2 roster shows every language including admin-only ones

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:15:04 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-2-roster-shows-every-language-including-admin-only-ones-mobile-360` — Playwright's name `admin-translations-console-d0b1f-e-including-admin-only-ones-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-3 the strings page lists keys with source and status

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:u4b] seeding e2e.scratch.38505679902-1-1-mobile-360-95-tr3 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:15:46 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4b] seeding e2e.scratch.38505679902-1-1-mobile-360-95-tr3 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-3-the-strings-page-lists-keys-with-source-and-status-mobile-360` — Playwright's name `admin-translations-console-b1a98-keys-with-source-and-status-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-4 scope: a translator outside the language is refused by the SERVER

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:u4b] seeding e2e.scratch.38505679902-1-1-mobile-360-99-tr4 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:16:28 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4b] seeding e2e.scratch.38505679902-1-1-mobile-360-99-tr4 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-4-scope-a-translator-outside-the-language-is-refused-by-the-SERVER-mobile-360` — Playwright's name `admin-translations-console-0ec7b-ge-is-refused-by-the-SERVER-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-5 filters live in the URL and survive a reload

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:17:10 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-5-filters-live-in-the-URL-and-survive-a-reload-mobile-360` — Playwright's name `admin-translations-console-5583b-he-URL-and-survive-a-reload-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-39 a language's page: the breadcrumb names the language and leads back to the roster

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:17:52 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-39-a-language-s-page-the-breadcrumb-names-the-language-and-leads-back-to-the-roster-mobile-360` — Playwright's name `admin-translations-console-32059-nd-leads-back-to-the-roster-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:18:34 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-6-coverage-gate-empty-and-incomplete-catalogs-both-refuse-publication-mobile-360` — Playwright's name `admin-translations-console-2f8a7-ogs-both-refuse-publication-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:19:16 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-7-sync-imports-the-compiled-catalog-and-reports-its-counts-mobile-360` — Playwright's name `admin-translations-console-ae27b-alog-and-reports-its-counts-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+38505679902-1-113-2-khgaiu@ethio-e2e.invalid: {}
--- further error 1 ---
Error: [e2e:users] admin.createUser failed for e2e+38505679902-1-113-2-khgaiu@ethio-e2e.invalid: {}

   at helpers/users.ts:69

  67 |   });
  68 |   if (error || !data?.user?.id) {
> 69 |     throw new Error(
     |           ^
  70 |       `[e2e:users] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}`,
  71 |     );
  72 |   }
    at createUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:69:11)
    at mintPrivateSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:732:16)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:344:32
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-7b-sync-after-a-step-up-prompt-still-reports-its-counts-mobile-360` — Playwright's name `admin-translations-console-5e339-pt-still-reports-its-counts-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-8 save then approve moves a string through the status machine

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:u4b] seeding e2e.scratch.38505679902-1-1-mobile-360-115-tr8 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:20:41 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4b] seeding e2e.scratch.38505679902-1-1-mobile-360-115-tr8 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-8-save-then-approve-moves-a-string-through-the-status-machine-mobile-360` — Playwright's name `admin-translations-console-bf0e8--through-the-status-machine-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:21:23 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-9-the-Amharic-runtime-still-renders-after-the-DB-bundle-merge-mobile-360` — Playwright's name `admin-translations-console-20630-s-after-the-DB-bundle-merge-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-10 translator card proves both permission states

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:22:05 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-10-translator-card-proves-both-permission-states-mobile-360` — Playwright's name `admin-translations-console-8cd8c-oves-both-permission-states-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:u4b] seeding e2e.scratch.38505679902-1-1-mobile-360-121-tr11 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:22:47 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4b] seeding e2e.scratch.38505679902-1-1-mobile-360-121-tr11 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-11-per-row-AI-translate-writes-a-machine-row-and-captures-a-revision-mobile-360` — Playwright's name `admin-translations-console-7b0af-row-and-captures-a-revision-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:u4c] fence language zxx-mo upsert failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:23:29 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4c] fence language zxx-mo upsert failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-12-bulk-AI-fill-translates-every-untranslated-scratch-key-mobile-360` — Playwright's name `admin-translations-console-fcc82-ry-untranslated-scratch-key-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-13 the placeholder validator flags a machine write too

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:u4b] seeding e2e.scratch.38505679902-1-1-mobile-360-125-tr13-break failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:24:10 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4b] seeding e2e.scratch.38505679902-1-1-mobile-360-125-tr13-break failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-13-the-placeholder-validator-flags-a-machine-write-too-mobile-360` — Playwright's name `admin-translations-console-16ba1-r-flags-a-machine-write-too-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-35 machine translation keeps the {country} token

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:u4b] seeding e2e.scratch.38505679902-1-1-mobile-360-127-tr35 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:24:52 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4b] seeding e2e.scratch.38505679902-1-1-mobile-360-127-tr35 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-35-machine-translation-keeps-the-country-token-mobile-360` — Playwright's name `admin-translations-console-162ad-ion-keeps-the-country-token-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-23 machine translation keeps placeholders, and the editor repairs a mangled one

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:u4b] seeding e2e.scratch.38505679902-1-1-mobile-360-129-tr23-kept failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:25:35 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4b] seeding e2e.scratch.38505679902-1-1-mobile-360-129-tr23-kept failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-23-machine-translation-keeps-placeholders-and-the-editor-repairs-a-mangled-one-mobile-360` — Playwright's name `admin-translations-console-457f6-ditor-repairs-a-mangled-one-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-scope AI: a translator outside the language gets the structured refusal

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:951:18
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-scope-AI-a-translator-outside-the-language-gets-the-structured-refusal-mobile-360` — Playwright's name `admin-translations-console-aa427-gets-the-structured-refusal-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:u4b] seeding e2e.scratch.38505679902-1-1-mobile-360-133-tr16 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:27:38 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4b] seeding e2e.scratch.38505679902-1-1-mobile-360-133-tr16 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-16-the-History-drawer-lists-revisions-and-restores-one-as-a-new-edit-mobile-360` — Playwright's name `admin-translations-console-2e8fa--restores-one-as-a-new-edit-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-33 an empty filter leaves export enabled and downloads the language

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:28:20 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-33-an-empty-filter-leaves-export-enabled-and-downloads-the-language-mobile-360` — Playwright's name `admin-translations-console-33b04--and-downloads-the-language-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-40 sync follows a changed Amharic text no person wrote, and keeps one a person wrote

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:tr40] seeding e2e.scratch.38505679902-1-1-mobile-360-137-tr40-followed failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:29:02 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:tr40] seeding e2e.scratch.38505679902-1-1-mobile-360-137-tr40-followed failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-40-sync-follows-a-changed-Amharic-text-no-person-wrote-and-keeps-one-a-person-wrote-mobile-360` — Playwright's name `admin-translations-console-1d4e4-nd-keeps-one-a-person-wrote-mobile-360`; this run carried 16 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: Timeout 10000ms exceeded while waiting on the predicate

  808 |     // Move later on the first: [b, a, c], and b is the cover.
  809 |     await stored.nth(0).getByTestId("post-photo-later").click();
> 810 |     await expect
      |     ^
  811 |       .poll(order, { message: "PP-17: Move later did not move the photo" })
  812 |       .toEqual([b, a, c]);
  813 |     await expect(stored.nth(0)).toHaveAttribute("data-photo-id", b);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:810:5
--- further error 2 ---
Test timeout of 60000ms exceeded while running "afterEach" hook.

  88 |   const objects: { userId: string; listingId: string }[] = [];
  89 |
> 90 |   test.afterEach(async ({ page }) => {
     |        ^
  91 |     // INC-323 / INC-398 — stop the page first: wait out a save in flight, then
  92 |     // blank it, so no autosave lands after the purge (about:blank alone left a
  93 |     // save already sent to land as "listing not found").
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:90:8
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-17-Move-earlier-and-Move-later-put-a-photo-at-its-place-and-the-first-is-the-cover-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-890a4--and-the-first-is-the-cover-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-149 a save refused for another reason shows a message at Next and can be retried

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s2a-010@ethio-e2e.invalid (factors) failed: {}
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s2a-010@ethio-e2e.invalid (factors) failed: {}

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:355:22)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:390:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at signedInSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:121:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1026:18
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-149-a-save-refused-for-another-reason-shows-a-message-at-Next-and-can-be-retried-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-f583c--at-Next-and-can-be-retried-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-27 the mobile strip walks back to a step already done, and no further

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:a2c] seeding the postable category failed: no row
--- further error 1 ---
Error: [e2e:a2c] seeding the postable category failed: no row

   at helpers/posting.ts:214

  212 |     .single();
  213 |   if (error || !data) {
> 214 |     throw new Error(
      |           ^
  215 |       `[e2e:a2c] seeding the postable category failed: ${error?.message ?? "no row"}`,
  216 |     );
  217 |   }
    at seedPostableCategory (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:214:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1037:22
--- further error 2 ---
Error: [e2e:reap] listings of seller 83c7b696-4e88-433e-a761-4be94808c8d5 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-27-the-mobile-strip-walks-back-to-a-step-already-done-and-no-further-mobile-360` — Playwright's name `post-wizard-category-POSTI-c4ec3-already-done-and-no-further-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-14 D20: a signed-out visitor is sent to sign in with a return path, comes back, and a foreign return is ignored

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-14-D20-a-signed-out-visitor-is-sent-to-sign-in-with-a-return-path-comes-back-and-a-foreign-return-is-ignored-mobile-360` — Playwright's name `post-wizard-category-POSTI-8f868-a-foreign-return-is-ignored-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-181 D119: a folder in the address opens step 1 inside it, a leaf is chosen, an unknown one opens the top level

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:c1a] seeding the folder failed: no row
--- further error 1 ---
Error: [e2e:c1a] seeding the folder failed: no row

   at helpers/posting.ts:387

  385 |     .single();
  386 |   if (parentError || !parent) {
> 387 |     throw new Error(`[e2e:c1a] seeding the folder failed: ${parentError?.message ?? "no row"}`);
      |           ^
  388 |   }
  389 |
  390 |   const { data: leaf, error: leafError } = await supabase
    at seedCategoryBranch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:387:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1100:30
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-181-D119-a-folder-in-the-address-opens-step-1-inside-it-a-leaf-is-chosen-an-unknown-one-opens-the-top-level-mobile-360` — Playwright's name `post-wizard-category-POSTI-3e408-own-one-opens-the-top-level-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-182 D119: the sign-in return keeps the invite's category and place, through the password door and the callback (INC-530)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:c1a] seeding the folder failed: no row
--- further error 1 ---
Error: [e2e:c1a] seeding the folder failed: no row

   at helpers/posting.ts:387

  385 |     .single();
  386 |   if (parentError || !parent) {
> 387 |     throw new Error(`[e2e:c1a] seeding the folder failed: ${parentError?.message ?? "no row"}`);
      |           ^
  388 |   }
  389 |
  390 |   const { data: leaf, error: leafError } = await supabase
    at seedCategoryBranch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:387:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1138:30
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-182-D119-the-sign-in-return-keeps-the-invite-s-category-and-place-through-the-password-door-and-the-callback-INC-530-mobile-360` — Playwright's name `post-wizard-category-POSTI-b040f-r-and-the-callback-INC-530--mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-15 the posting entry lives in My Listings, not in Account

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:143:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1179:5
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-15-the-posting-entry-lives-in-My-Listings-not-in-Account-mobile-360` — Playwright's name `post-wizard-category-POSTI-65e2f--My-Listings-not-in-Account-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-187 Post from the home page never shows the home page inside the form's frame (INC-581)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:143:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1241:5
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-187-Post-from-the-home-page-never-shows-the-home-page-inside-the-form-s-frame-INC-581-mobile-360` — Playwright's name `post-wizard-category-POSTI-773a8-e-the-form-s-frame-INC-581--mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:143:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1291:18
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-29-the-photos-caption-counts-against-the-plan-s-cap-mobile-360` — Playwright's name `post-wizard-category-POSTI-b40c2-unts-against-the-plan-s-cap-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-36 a category surfaced under a second root appears under it in the tree

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:c1a] seeding the folder failed: no row
--- further error 1 ---
Error: [e2e:c1a] seeding the folder failed: no row

   at helpers/posting.ts:387

  385 |     .single();
  386 |   if (parentError || !parent) {
> 387 |     throw new Error(`[e2e:c1a] seeding the folder failed: ${parentError?.message ?? "no row"}`);
      |           ^
  388 |   }
  389 |
  390 |   const { data: leaf, error: leafError } = await supabase
    at seedCategoryBranch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:387:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1328:37
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-36-a-category-surfaced-under-a-second-root-appears-under-it-in-the-tree-mobile-360` — Playwright's name `post-wizard-category-POSTI-04d30-ppears-under-it-in-the-tree-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-46 a category created with a secondary parent reaches the tree inside the cache window

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:143:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1366:5
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-46-a-category-created-with-a-secondary-parent-reaches-the-tree-inside-the-cache-window-mobile-360` — Playwright's name `post-wizard-category-POSTI-72c6b-ree-inside-the-cache-window-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-47 a level lists the host's own children first, guests next and other- last

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:d30] seeding e2e-post-2-40-wndlch failed: no row
--- further error 1 ---
Error: [e2e:d30] seeding e2e-post-2-40-wndlch failed: no row

   at helpers/posting.ts:1874

  1872 |       .single();
  1873 |     if (error || !data) {
> 1874 |       throw new Error(`[e2e:d30] seeding ${slug} failed: ${error?.message ?? "no row"}`);
       |             ^
  1875 |     }
  1876 |     return data;
  1877 |   };
    at mint (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:1874:13)
    at seedSurfacedLevel (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:1879:16)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1432:19
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-47-a-level-lists-the-host-s-own-children-first-guests-next-and-other-last-mobile-360` — Playwright's name `post-wizard-category-POSTI-d59c8-guests-next-and-other--last-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-44 a dependent list on a surfaced leaf narrows by its parent

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:c1a] seeding the folder failed: no row
--- further error 1 ---
Error: [e2e:c1a] seeding the folder failed: no row

   at helpers/posting.ts:387

  385 |     .single();
  386 |   if (parentError || !parent) {
> 387 |     throw new Error(`[e2e:c1a] seeding the folder failed: ${parentError?.message ?? "no row"}`);
      |           ^
  388 |   }
  389 |
  390 |   const { data: leaf, error: leafError } = await supabase
    at seedCategoryBranch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:387:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1493:37
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-44-a-dependent-list-on-a-surfaced-leaf-narrows-by-its-parent-mobile-360` — Playwright's name `post-wizard-category-POSTI-f6a45--leaf-narrows-by-its-parent-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:143:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1586:18
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-48-a-catch-all-leaf-can-be-chosen-and-its-listing-lands-in-review-mobile-360` — Playwright's name `post-wizard-category-POSTI-0c481-its-listing-lands-in-review-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-170 the suggested title leads with the seller's own name for the item (Bundle 7 B3)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:c1a] reading the seller's drafts failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
--- further error 2 ---
Error: [e2e:reap] listings of seller 6152d8f3-96e9-489a-b848-649165c042e8 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-170-the-suggested-title-leads-with-the-seller-s-own-name-for-the-item-Bundle-7-B3-mobile-360` — Playwright's name `post-wizard-details-POSTIN-48347-e-for-the-item-Bundle-7-B3--mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-172 a held answer whose option is switched off prints its label, never offered (INC-466)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-details.spec.ts:239:18
```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-172-a-held-answer-whose-option-is-switched-off-prints-its-label-never-offered-INC-466-mobile-360` — Playwright's name `post-wizard-details-POSTIN-3703d-abel-never-offered-INC-466--mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-85 an option label, an alias and an Amharic alias each find the leaf, and the choice prefills the option

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:45:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:72:18
```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-85-an-option-label-an-alias-and-an-Amharic-alias-each-find-the-leaf-and-the-choice-prefills-the-option-mobile-360` — Playwright's name `post-wizard-finder-POSTING-d5e02--choice-prefills-the-option-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-86 a failing finder leaves the name matches on screen, with the notice

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:45:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:128:5
```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-86-a-failing-finder-leaves-the-name-matches-on-screen-with-the-notice-mobile-360` — Playwright's name `post-wizard-finder-POSTING-f6b7b-s-on-screen-with-the-notice-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-105 the searching row shows while the finder is asked; no-hits only after its answer

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:45:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:152:5
```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-105-the-searching-row-shows-while-the-finder-is-asked-no-hits-only-after-its-answer-mobile-360` — Playwright's name `post-wizard-finder-POSTING-28b0f--hits-only-after-its-answer-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-87 off the chosen path the step asks again, Keep it returns, a new leaf clears it

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:45:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:183:5
```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-87-off-the-chosen-path-the-step-asks-again-Keep-it-returns-a-new-leaf-clears-it-mobile-360` — Playwright's name `post-wizard-finder-POSTING-3cb2f-eturns-a-new-leaf-clears-it-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:272:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-11-where-the-market-is-prefilled-from-the-edge-a-city-with-sub-cities-offers-all-of-it-and-a-second-place-is-refused-by-the-plan-mobile-360` — Playwright's name `post-wizard-place-POSTING--47508-lace-is-refused-by-the-plan-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:453:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-mobile-360` — Playwright's name `post-wizard-place-POSTING--17792-d-a-shown-channel-is-stored-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:544:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-112-who-a-new-post-opens-with-the-last-post-s-channels-stored-on-the-draft-unchanged-mobile-360` — Playwright's name `post-wizard-place-POSTING--d2ba0-ored-on-the-draft-unchanged-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:589:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-mobile-360` — Playwright's name `post-wizard-place-POSTING--4521b-ands-in-review-—-never-live-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:698:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-mobile-360` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-31 the market select waits for the prefill chain and never preselects

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:889:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-31-the-market-select-waits-for-the-prefill-chain-and-never-preselects-mobile-360` — Playwright's name `post-wizard-place-POSTING--6888f--chain-and-never-preselects-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, is ticked, and a lone city box offers no Remove

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:928:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-20-where-the-default-place-lists-itself-is-ticked-and-a-lone-city-box-offers-no-Remove-mobile-360` — Playwright's name `post-wizard-place-POSTING--5d9be-e-city-box-offers-no-Remove-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-33 a region alone never lists itself; its city does (W6 R2)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1015:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-33-a-region-alone-never-lists-itself-its-city-does-W6-R2-mobile-360` — Playwright's name `post-wizard-place-POSTING--775f8-itself-its-city-does-W6-R2--mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1067:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-80-a-city-is-required-marked-before-Next-refused-and-scrolled-to-on-Next-cleared-by-a-city-mobile-360` — Playwright's name `post-wizard-place-POSTING--8f238-o-on-Next-cleared-by-a-city-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1163:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-81-a-prefilled-city-counts-as-chosen-no-mark-Next-passes-untouched-mobile-360` — Playwright's name `post-wizard-place-POSTING--40d61--mark-Next-passes-untouched-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-82 the add buttons follow the plan's own limits

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PW-82: the free plan could not be read: undefined
--- further error 1 ---
Error: PW-82: the free plan could not be read: undefined

  1208 |       .single();
  1209 |     if (error || !plan)
> 1210 |       throw new Error(`PW-82: the free plan could not be read: ${error?.message}`);
       |             ^
  1211 |     const user = await seller(page);
  1212 |     const category = await leaf();
  1213 |     const chain = await seedScratchChain("ET");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1210:13
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-82-the-add-buttons-follow-the-plan-s-own-limits-mobile-360` — Playwright's name `post-wizard-place-POSTING--a546c-ollow-the-plan-s-own-limits-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1279:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-37-a-tap-on-the-map-places-a-pin-and-the-door-stores-it-as-exact-mobile-360` — Playwright's name `post-wizard-place-POSTING--90a6a-the-door-stores-it-as-exact-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1312:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-38-a-place-search-moves-the-pin-and-fills-the-street-line-mobile-360` — Playwright's name `post-wizard-place-POSTING--c721f-n-and-fills-the-street-line-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1348:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-39-an-approximate-pin-is-stored-as-approx-and-drawn-as-an-area-never-a-point-mobile-360` — Playwright's name `post-wizard-place-POSTING--7d413-wn-as-an-area-never-a-point-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-40 removing the pin clears all four columns

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1383:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-40-removing-the-pin-clears-all-four-columns-mobile-360` — Playwright's name `post-wizard-place-POSTING--dcdc1-pin-clears-all-four-columns-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-160 Use my location stays pressed until the pin is moved by hand

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1417:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-160-Use-my-location-stays-pressed-until-the-pin-is-moved-by-hand-mobile-360` — Playwright's name `post-wizard-place-POSTING--be1b3-il-the-pin-is-moved-by-hand-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-41 the geocode route spends a dial and refuses the call past its ceiling

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1442:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-41-the-geocode-route-spends-a-dial-and-refuses-the-call-past-its-ceiling-mobile-360` — Playwright's name `post-wizard-place-POSTING--b12f0-s-the-call-past-its-ceiling-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1480:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-76-a-detail-the-model-pins-to-one-value-is-filled-and-hidden-and-still-reviewed-DEC-085-mobile-360` — Playwright's name `post-wizard-place-POSTING--d27b1-and-still-reviewed-DEC-085--mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-78 a big model list shows its required mark once the brand is chosen (INC-336)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1664:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-78-a-big-model-list-shows-its-required-mark-once-the-brand-is-chosen-INC-336-mobile-360` — Playwright's name `post-wizard-place-POSTING--e7684-he-brand-is-chosen-INC-336--mobile-360`; this run carried 16 context file(s); of the same spec: none

## posting-routes.spec.ts › POSTING ROUTES › PR-1 the draft route sets the observed residency from the edge exactly once

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-1-the-draft-route-sets-the-observed-residency-from-the-edge-exactly-once-mobile-360` — Playwright's name `posting-routes-POSTING-ROU-3cc3c--from-the-edge-exactly-once-mobile-360`; this run carried 16 context file(s); of the same spec: `posting-routes-POSTING-ROU-11e37-once-the-ceiling-is-reached-desktop-1280`

## shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:l2a] reading e2e-loc-3-4-gs-region-msqvqh failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:48:31 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:l2a] reading e2e-loc-3-4-gs-region-msqvqh failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `shell-L4b-location-picker-LS-6-the-nearest-curated-metro-wins-by-geometry-mobile-360` — Playwright's name `shell-L4b-location-picker--83294-ated-metro-wins-by-geometry-mobile-360`; this run carried 16 context file(s); of the same spec: none

## shell.spec.ts › L4b location picker › LS-7 a region code alone selects the region

- Source: `shard 3`
- Project: `mobile-360`

```text
(no error message captured)
```

Context: context file not found for `shell-L4b-location-picker-LS-7-a-region-code-alone-selects-the-region-mobile-360` — Playwright's name `shell-L4b-location-picker--30e15-de-alone-selects-the-region-mobile-360`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-2 a place that is not shown is refused, and the saved place stays

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s3a-010@ethio-e2e.invalid (profile) failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 520: Web server is returning an unknown error</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Web server is returning an unknown error</span>
                <span class="code-label">Error code 520</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_520&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:48:32 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s3a-010@ethio-e2e.invalid (profile) failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 520: Web server is returning an unknown error</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-account-doors-D106-VP-2-a-place-that-is-not-shown-is-refused-and-the-saved-place-stays-mobile-360` — Playwright's name `viewing-place-VIEWING-PLAC-b8ebe-d-and-the-saved-place-stays-mobile-360`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-3 a saved place that stops being shown reads as not usable; NULL clears

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s3a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s3a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at signedIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:52:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:144:25
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-account-doors-D106-VP-3-a-saved-place-that-stops-being-shown-reads-as-not-usable-NULL-clears-mobile-360` — Playwright's name `viewing-place-VIEWING-PLAC-7186b-s-as-not-usable-NULL-clears-mobile-360`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-4 the viewing_place dial refuses the call past the account's limit

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at signedIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:52:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:163:25
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-account-doors-D106-VP-4-the-viewing_place-dial-refuses-the-call-past-the-account-s-limit-mobile-360` — Playwright's name `viewing-place-VIEWING-PLAC-fbd18-ll-past-the-account-s-limit-mobile-360`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-5 no session reaches either door, and the owner's client cannot write the columns

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at signedIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:52:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:181:25
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-account-doors-D106-VP-5-no-session-reaches-either-door-and-the-owner-s-client-cannot-write-the-columns-mobile-360` — Playwright's name `viewing-place-VIEWING-PLAC-42001-nt-cannot-write-the-columns-mobile-360`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-6 a pick while signed in is saved on the account, with its time here too; any area clears it

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at lease (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:229:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:301:18
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-6-a-pick-while-signed-in-is-saved-on-the-account-with-its-time-here-too-any-area-clears-it-mobile-360` — Playwright's name `viewing-place-VIEWING-PLAC-4345a-here-too-any-area-clears-it-mobile-360`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-7 another browser opens on the account's place, and signing out there keeps it

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at lease (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:229:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:328:18
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-7-another-browser-opens-on-the-account-s-place-and-signing-out-there-keeps-it-mobile-360` — Playwright's name `viewing-place-VIEWING-PLAC-8f060--signing-out-there-keeps-it-mobile-360`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-8 this browser's newer pick wins and is saved on the account

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at lease (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:229:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:346:18
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-8-this-browser-s-newer-pick-wins-and-is-saved-on-the-account-mobile-360` — Playwright's name `viewing-place-VIEWING-PLAC-1cc34-and-is-saved-on-the-account-mobile-360`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-9 the account's newer pick wins over this browser's older one

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at lease (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:229:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:366:18
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-9-the-account-s-newer-pick-wins-over-this-browser-s-older-one-mobile-360` — Playwright's name `viewing-place-VIEWING-PLAC-c9ba8-er-this-browser-s-older-one-mobile-360`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-10 a browser pick saved before D106 (no time) loses to the account's place

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at lease (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:229:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:388:18
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-10-a-browser-pick-saved-before-D106-no-time-loses-to-the-account-s-place-mobile-360` — Playwright's name `viewing-place-VIEWING-PLAC-7b2a8-oses-to-the-account-s-place-mobile-360`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-11 with nothing saved here or on the account, the guess shows and nothing is saved

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at lease (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:229:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:411:18
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-11-with-nothing-saved-here-or-on-the-account-the-guess-shows-and-nothing-is-saved-mobile-360` — Playwright's name `viewing-place-VIEWING-PLAC-72716--shows-and-nothing-is-saved-mobile-360`; this run carried 16 context file(s); of the same spec: none

## admin-countries.spec.ts › L2b countries console › CO-2 roster: every market renders, the two open ones carry the open tone, search and the status filter narrow, on the agreed toolbar

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('country-pagination-range')
Expected pattern: /[1-9]/
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('country-pagination-range')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('country-pagination-range')
Expected pattern: /[1-9]/
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('country-pagination-range')


  113 |         { timeout: 20000 },
  114 |       )
> 115 |       .toBe(true);
      |        ^
  116 |
  117 |     // Search is the anchor: Ethiopia is located through the box, then its tone.
  118 |     await awaitRoster(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:115:8
```

Context:

```text
          - listitem [ref=e130]:
            - generic [ref=e131]: About
          - listitem [ref=e132]:
            - generic [ref=e133]: How it works
      - navigation "Help" [ref=e134]:
        - heading "Help" [level=2] [ref=e135]
        - list [ref=e136]:
          - listitem [ref=e137]:
            - generic [ref=e138]: Safety
          - listitem [ref=e139]:
            - generic [ref=e140]: Contact
      - navigation "Legal" [ref=e141]:
        - heading "Legal" [level=2] [ref=e142]
        - list [ref=e143]:
          - listitem [ref=e144]:
            - generic [ref=e145]: Terms
          - listitem [ref=e146]:
            - generic [ref=e147]: Privacy
    - paragraph [ref=e149]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-12 Edit refuses as the super admin: the admin's own, a draft, a removed listing, a key not editable, a reason without its note

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-12-Edit-refuses-as-the-super-admin-the-admin-s-own-a-draft-a-removed-listing-a-key-not-editable-a-reason-without-its-note-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-bdbdb-e-a-reason-without-its-note-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-4 Edit: the change, one revision, one audit row and one notice; a live listing stays live

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:498:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-4-Edit-the-change-one-revision-one-audit-row-and-one-notice-a-live-listing-stays-live-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-8b4c6-e-a-live-listing-stays-live-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-5 Edit keeps the seller's rules: a refusal is the seller's refusal, and nothing is written

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:548:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-5-Edit-keeps-the-seller-s-rules-a-refusal-is-the-seller-s-refusal-and-nothing-is-written-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-0f4cc-usal-and-nothing-is-written-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-6 Edit removes a photo: the row goes, the next becomes the cover, the revision keeps the file

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:589:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-6-Edit-removes-a-photo-the-row-goes-the-next-becomes-the-cover-the-revision-keeps-the-file-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-0c30d-the-revision-keeps-the-file-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-7 Remove, then Restore: back to Waiting, never straight to live; each move logged and told

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:645:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-7-Remove-then-Restore-back-to-Waiting-never-straight-to-live-each-move-logged-and-told-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-c2fed-e-each-move-logged-and-told-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-8 Restore: not by the owner, not without a second factor; a severe removal by a super admin only

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:690:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-8-Restore-not-by-the-owner-not-without-a-second-factor-a-severe-removal-by-a-super-admin-only-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-7b145-moval-by-a-super-admin-only-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-9 Send back to review; the seller reads their own notices and no one else's

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:732:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-9-Send-back-to-review-the-seller-reads-their-own-notices-and-no-one-else-s-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-a2638-n-notices-and-no-one-else-s-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-10 All listings page: the blocks, the views, the seller filter, newest first, drafts never

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:790:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-10-All-listings-page-the-blocks-the-views-the-seller-filter-newest-first-drafts-never-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-1f9ae-r-newest-first-drafts-never-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-11 All listings page with listings:view and no other listing right: the public name, never the e-mail, no moves

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:875:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-11-All-listings-page-with-listings-view-and-no-other-listing-right-the-public-name-never-the-e-mail-no-moves-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-1ace3-e-never-the-e-mail-no-moves-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-13 Remove then Restore from the row: a reason first, then Removed, then Waiting for review

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:957:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-13-Remove-then-Restore-from-the-row-a-reason-first-then-Removed-then-Waiting-for-review-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-a03cc-ved-then-Waiting-for-review-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-14 Send back to review: Other needs a note, and the note reaches the audit and the seller

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1012:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-14-Send-back-to-review-Other-needs-a-note-and-the-note-reaches-the-audit-and-the-seller-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-2390a-es-the-audit-and-the-seller-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-15 Tick-boxes: Remove two listings at once, then Restore both from the Removed view

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1052:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-15-Tick-boxes-Remove-two-listings-at-once-then-Restore-both-from-the-Removed-view-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-d85e4--both-from-the-Removed-view-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-16 The listing page's door: who reads what, drafts never, a pin and an address named but never shown

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1113:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-16-The-listing-page-s-door-who-reads-what-drafts-never-a-pin-and-an-address-named-but-never-shown-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-211bf-dress-named-but-never-shown-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-17 The listing's page: opened from All listings, Remove with a reason, the history's newest line, the buyer's view

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1217:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-17-The-listing-s-page-opened-from-All-listings-Remove-with-a-reason-the-history-s-newest-line-the-buyer-s-view-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-216b5-ewest-line-the-buyer-s-view-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1282:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-18-The-listing-s-page-with-listings-view-alone-no-e-mail-no-moves-a-staff-line-without-a-name-drafts-not-found-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-09fd4-out-a-name-drafts-not-found-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-19 Edit is judged on what an admin can change: the seller's end date within a day and a switched-off place do not block it

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1338:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-19-Edit-is-judged-on-what-an-admin-can-change-the-seller-s-end-date-within-a-day-and-a-switched-off-place-do-not-block-it-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-a7d1d-d-off-place-do-not-block-it-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1395:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-20-Edit-on-the-listing-s-page-the-title-and-the-price-with-a-reason-and-a-note-the-seller-is-told-a-price-prints-with-its-unit-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-b20b6--price-prints-with-its-unit-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-21 Edit: a refusal under its field and nothing written; Cancel; nothing changed says so

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1488:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-21-Edit-a-refusal-under-its-field-and-nothing-written-Cancel-nothing-changed-says-so-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-d0071-cel-nothing-changed-says-so-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-22 Edit moves a listing to another category with Wrong category; the seller is told

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1541:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-22-Edit-moves-a-listing-to-another-category-with-Wrong-category-the-seller-is-told-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-87bfb-category-the-seller-is-told-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-23 Edit changes a specification: a refusal under its control, then the answer saved

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1602:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-23-Edit-changes-a-specification-a-refusal-under-its-control-then-the-answer-saved-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-5ef46-ntrol-then-the-answer-saved-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-26 Undo this edit: the newest edit's before-values come back as a new edit with the reason Undo; the seller is told

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1689:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-26-Undo-this-edit-the-newest-edit-s-before-values-come-back-as-a-new-edit-with-the-reason-Undo-the-seller-is-told-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-f18fc-son-Undo-the-seller-is-told-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-27 Undo refuses: nothing to undo, a stale line, a listing changed since, an undo, the seller's own line, today's rules

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1774:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-27-Undo-refuses-nothing-to-undo-a-stale-line-a-listing-changed-since-an-undo-the-seller-s-own-line-today-s-rules-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-947d4-er-s-own-line-today-s-rules-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s4a-011@ethio-e2e.invalid (profile) failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 520: Web server is returning an unknown error</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Web server is returning an unknown error</span>
                <span class="code-label">Error code 520</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_520&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:48:32 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s4a-011@ethio-e2e.invalid (profile) failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 520: Web server is returning an unknown error</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context:

```text
          - listitem [ref=e296]:
            - generic [ref=e297]: About
          - listitem [ref=e298]:
            - generic [ref=e299]: How it works
      - navigation "Help" [ref=e300]:
        - heading "Help" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - generic [ref=e304]: Safety
          - listitem [ref=e305]:
            - generic [ref=e306]: Contact
      - navigation "Legal" [ref=e307]:
        - heading "Legal" [level=2] [ref=e308]
        - list [ref=e309]:
          - listitem [ref=e310]:
            - generic [ref=e311]: Terms
          - listitem [ref=e312]:
            - generic [ref=e313]: Privacy
    - paragraph [ref=e315]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-2 roster: the seeded ET tree renders, an alias narrows the search, the level filter scopes, nothing overflows

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:49:19 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-2-roster-the-seeded-ET-tree-renders-an-alias-narrows-the-search-the-level-filter-scopes-nothing-overflows-desktop-1280` — Playwright's name `admin-locations-L2a-locati-c7f36-er-scopes-nothing-overflows-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-3 create chain: region → city → sub-city are born retired with their ancestry filled, and activate top-down

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:50:00 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-3-create-chain-region-city-sub-city-are-born-retired-with-their-ancestry-filled-and-activate-top-down-desktop-1280` — Playwright's name `admin-locations-L2a-locati-4732e-illed-and-activate-top-down-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:50:42 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-4-path-rule-retiring-a-scratch-region-hides-its-active-descendants-from-the-public-tree-desktop-1280` — Playwright's name `admin-locations-L2a-locati-da99e-ndants-from-the-public-tree-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-5 delete guard: a parent is refused, then the chain deletes deepest-first with the typed address

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:51:24 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-5-delete-guard-a-parent-is-refused-then-the-chain-deletes-deepest-first-with-the-typed-address-desktop-1280` — Playwright's name `admin-locations-L2a-locati-0bcb5-irst-with-the-typed-address-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:l2a] reading e2e-loc-4-20-lt6a-02pirj failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:52:26 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:l2a] reading e2e-loc-4-20-lt6a-02pirj failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-6-step-up-an-unproven-factor-cannot-move-a-row-once-proven-the-move-carries-the-descendants-desktop-1280` — Playwright's name `admin-locations-L2a-locati-224b6-ove-carries-the-descendants-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-7 import round trip: a three-row file previews, commits, exports, deletes and undoes with the original ids

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:53:28 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-7-import-round-trip-a-three-row-file-previews-commits-exports-deletes-and-undoes-with-the-original-ids-desktop-1280` — Playwright's name `admin-locations-L2a-locati-6d907-ndoes-with-the-original-ids-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-15 an imported place name is in the name table after commit and gone after undo

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:54:10 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-15-an-imported-place-name-is-in-the-name-table-after-commit-and-gone-after-undo-desktop-1280` — Playwright's name `admin-locations-L2a-locati-cca9e--commit-and-gone-after-undo-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-7b the editor round-trips a row without dropping a stored field

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:54:52 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-7b-the-editor-round-trips-a-row-without-dropping-a-stored-field-desktop-1280` — Playwright's name `admin-locations-L2a-locati-1951f-out-dropping-a-stored-field-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-8 verb reachability: every verb and the save button are inside the viewport (CT-8 mirror)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:55:34 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-8-verb-reachability-every-verb-and-the-save-button-are-inside-the-viewport-CT-8-mirror-desktop-1280` — Playwright's name `admin-locations-L2a-locati-3b51c-e-the-viewport-CT-8-mirror--desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-9a roster shape, table twin: the edit icon sits in the end column with pagination

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:56:16 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-9a-roster-shape-table-twin-the-edit-icon-sits-in-the-end-column-with-pagination-desktop-1280` — Playwright's name `admin-locations-L2a-locati-90e56--end-column-with-pagination-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-10 tones: retired is destructive, active is secondary, a level badge is outline

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:56:58 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-10-tones-retired-is-destructive-active-is-secondary-a-level-badge-is-outline-desktop-1280` — Playwright's name `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-11 one read per country: filtering costs no request, switching the market costs exactly one

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:57:40 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-11-one-read-per-country-filtering-costs-no-request-switching-the-market-costs-exactly-one-desktop-1280` — Playwright's name `admin-locations-L2a-locati-fdc81-he-market-costs-exactly-one-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-12 transfer scope: exports and the import title follow the selected country

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:58:22 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-12-transfer-scope-exports-and-the-import-title-follow-the-selected-country-desktop-1280` — Playwright's name `admin-locations-L2a-locati-7d329-follow-the-selected-country-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-13 all countries: the picker opens on every market, the roster spans them, and the transfer group carries no scope

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:59:04 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-13-all-countries-the-picker-opens-on-every-market-the-roster-spans-them-and-the-transfer-group-carries-no-scope-desktop-1280` — Playwright's name `admin-locations-L2a-locati-37bec-sfer-group-carries-no-scope-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-14 market state and whole-country parent follow the selected market

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:59:46 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-14-market-state-and-whole-country-parent-follow-the-selected-market-desktop-1280` — Playwright's name `admin-locations-L2a-locati-8de66--follow-the-selected-market-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › LT-16 the row's actions: Edit, a red Delete and the menu's verbs open the editor's own dialogs

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:00:28 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-LT-16-the-row-s-actions-Edit-a-red-Delete-and-the-menu-s-verbs-open-the-editor-s-own-dialogs-desktop-1280` — Playwright's name `admin-locations-L2a-locati-82d2f-en-the-editor-s-own-dialogs-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-locations.spec.ts › L2a locations console › OV-1 overview totals, links and group breadcrumbs

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:01:10 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-locations-L2a-locations-console-OV-1-overview-totals-links-and-group-breadcrumbs-desktop-1280` — Playwright's name `admin-locations-L2a-locati-59426-links-and-group-breadcrumbs-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-locations-L2a-locati-09a80-ry-a-level-badge-is-outline-mobile-360`, `admin-locations-L2a-locati-fd655-actions-render-for-an-admin-desktop-1280`

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:u2] moderator role unreadable: no row
--- further error 1 ---
Error: [e2e:u2] moderator role unreadable: no row

  139 |     .single();
  140 |   if (roleError || !role) {
> 141 |     throw new Error(`[e2e:u2] moderator role unreadable: ${roleError?.message ?? "no row"}`);
      |           ^
  142 |   }
  143 |   type Row = {
  144 |     id: string;
    at healModeratorBaseline (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:141:11)
```

Context: context file not found for `admin-roles-U2-roles-console-RP-1-gating-moderator-refused-admin-sees-the-list-signed-out-deep-link-redirects-desktop-1280` — Playwright's name `admin-roles-U2-roles-conso-b7879-ned-out-deep-link-redirects-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-1 the queue lists an ad waiting for review

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:272:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-1-the-queue-lists-an-ad-waiting-for-review-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-5507e-ts-an-ad-waiting-for-review-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-2 Approve puts the ad on the site

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:281:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-2-Approve-puts-the-ad-on-the-site-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-67008-ove-puts-the-ad-on-the-site-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-3 Reject keeps the ad off

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:300:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-3-Reject-keeps-the-ad-off-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCREENING-SC-3-Reject-keeps-the-ad-off-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-4 a person with no role cannot decide

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:324:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-4-a-person-with-no-role-cannot-decide-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-6b6c5--with-no-role-cannot-decide-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-16 a reviewer without a fresh second factor cannot decide

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:340:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-16-a-reviewer-without-a-fresh-second-factor-cannot-decide-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-f4ca6-second-factor-cannot-decide-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-5 an empty search shows the empty message

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:09:18 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-5-an-empty-search-shows-the-empty-message-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-fe3db-rch-shows-the-empty-message-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-6 Preview as buyer draws the ad's category picture

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:390:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-6-Preview-as-buyer-draws-the-ad-s-category-picture-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-5b94c-s-the-ad-s-category-picture-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-7 a reviewer reads the preview's facts: the ad's country, the methods shown and the public name, never a value

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:416:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-7-a-reviewer-reads-the-preview-s-facts-the-ad-s-country-the-methods-shown-and-the-public-name-never-a-value-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-d877c-e-public-name-never-a-value-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-8 a person who is not a reviewer reads nothing and reveals nothing, and no row is written

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:449:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-8-a-person-who-is-not-a-reviewer-reads-nothing-and-reveals-nothing-and-no-row-is-written-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-a1977-thing-and-no-row-is-written-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-17 a reviewer without a second factor reads the facts and reveals a shown number, logged once (D129)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:468:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-17-a-reviewer-without-a-second-factor-reads-the-facts-and-reveals-a-shown-number-logged-once-D129-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-421d5-wn-number-logged-once-D129--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-9 Show number: a reviewer with a fresh second factor gets the number, and one audit row names the channel and never the number

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:489:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-9-Show-number-a-reviewer-with-a-fresh-second-factor-gets-the-number-and-one-audit-row-names-the-channel-and-never-the-number-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-3d745-hannel-and-never-the-number-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-10 an ad that is not waiting for review answers neither door

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:520:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-10-an-ad-that-is-not-waiting-for-review-answers-neither-door-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-89ad0-review-answers-neither-door-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-11 the toolbar: Columns hides a column and remembers it; Filters settles on the ad's market — another market lists none, its own lists it, never an error — and its chip clears

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:535:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-11-the-toolbar-Columns-hides-a-column-and-remembers-it-Filters-settles-on-the-ad-s-market-another-market-lists-none-its-own-lists-it-never-an-error-and-its-chip-clears-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-50239-error-—-and-its-chip-clears-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-12 two ticked ads are approved together, after one confirmation that counts them

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:591:19
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-12-two-ticked-ads-are-approved-together-after-one-confirmation-that-counts-them-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-d873d-nfirmation-that-counts-them-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-13 Preview as buyer shows the public name, then the methods shown one per row; Show number puts the number in its row with no second factor and logs it

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:630:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-13-Preview-as-buyer-shows-the-public-name-then-the-methods-shown-one-per-row-Show-number-puts-the-number-in-its-row-with-no-second-factor-and-logs-it-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-a5a3c-o-second-factor-and-logs-it-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-14 Reject at the foot of the preview closes it and keeps the ad off

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:721:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-14-Reject-at-the-foot-of-the-preview-closes-it-and-keeps-the-ad-off-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-bde16-ses-it-and-keeps-the-ad-off-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:755:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-15-a-reviewer-with-no-second-factor-opens-the-preview-and-Show-number-shows-the-number-in-its-row-logged-once-D129-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-7c2dd-n-its-row-logged-once-D129--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-18 the preview counts the photos not checked by AI, and Approve approves them with the ad (D158)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:876:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-18-the-preview-counts-the-photos-not-checked-by-AI-and-Approve-approves-them-with-the-ad-D158-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-638f2-oves-them-with-the-ad-D158--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-19 a move to live with no session leaves the photo held: no buyer reads it or gets it as the card's cover (D158)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:178:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:907:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-19-a-move-to-live-with-no-session-leaves-the-photo-held-no-buyer-reads-it-or-gets-it-as-the-card-s-cover-D158-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-fbe09-t-as-the-card-s-cover-D158--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-services.spec.ts › ADMIN › SERVICES — the AI switches and meter (D158) › SV-1 a seller can neither read nor change a switch, call the meter or read its tables

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-services.spec.ts:139:20
```

Context: context file not found for `admin-services-ADMIN-SERVICES-the-AI-switches-and-meter-D158-SV-1-a-seller-can-neither-read-nor-change-a-switch-call-the-meter-or-read-its-tables-desktop-1280` — Playwright's name `admin-services-ADMIN-›-SER-6b6c7-he-meter-or-read-its-tables-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-services.spec.ts › ADMIN › SERVICES — the AI switches and meter (D158) › SV-2 the super admin reads the six features and changes a switch through its door

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:sv] seeding e2e-sv-mv7loxmc-41y4kj failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:19:40 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:sv] seeding e2e-sv-mv7loxmc-41y4kj failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-services-ADMIN-SERVICES-the-AI-switches-and-meter-D158-SV-2-the-super-admin-reads-the-six-features-and-changes-a-switch-through-its-door-desktop-1280` — Playwright's name `admin-services-ADMIN-›-SER-ef511-s-a-switch-through-its-door-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-services.spec.ts › ADMIN › SERVICES — the AI switches and meter (D158) › SV-3 the meter on the app's own connection: today's row, the alerts and off at the budget

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:sv] seeding e2e-sv-mv7lpu3w-fjtsxw failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:20:22 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:sv] seeding e2e-sv-mv7lpu3w-fjtsxw failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-services-ADMIN-SERVICES-the-AI-switches-and-meter-D158-SV-3-the-meter-on-the-app-s-own-connection-today-s-row-the-alerts-and-off-at-the-budget-desktop-1280` — Playwright's name `admin-services-ADMIN-›-SER-22ccc-lerts-and-off-at-the-budget-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-services.spec.ts › ADMIN › SERVICES — the AI switches and meter (D158) › SV-4 the page Admin › Services › AI lists the six features, and photo screening's switch says what off does

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:21:04 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-services-ADMIN-SERVICES-the-AI-switches-and-meter-D158-SV-4-the-page-Admin-Services-AI-lists-the-six-features-and-photo-screening-s-switch-says-what-off-does-desktop-1280` — Playwright's name `admin-services-ADMIN-›-SER-9f6e4-s-switch-says-what-off-does-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-shell.spec.ts › Admin shell (U0) › A-6 admin fixture: gated section nav, section page + breadcrumb, deep link

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:95:19
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-6-admin-fixture-gated-section-nav-section-page-breadcrumb-deep-link-desktop-1280` — Playwright's name `admin-shell-Admin-shell-U0-7e4b8-n-page-breadcrumb-deep-link-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-shell.spec.ts › Admin shell (U0) › A-7 moderator fixture: two sections (All listings, audit), other deep links refused, admin tab still visible

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:192:17
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-7-moderator-fixture-two-sections-All-listings-audit-other-deep-links-refused-admin-tab-still-visible-desktop-1280` — Playwright's name `admin-shell-Admin-shell-U0-4e476-sed-admin-tab-still-visible-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-shell.spec.ts › Admin shell (U0) › A-4 admin TAB from marketplace navigates to /admin (INC-071)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:250:19
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-4-admin-TAB-from-marketplace-navigates-to-admin-INC-071-desktop-1280` — Playwright's name `admin-shell-Admin-shell-U0-63fbf-navigates-to-admin-INC-071--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-shell.spec.ts › Admin shell (U0) › A-8 regular user: /admin still redirects home

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:269:18
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-8-regular-user-admin-still-redirects-home-desktop-1280` — Playwright's name `admin-shell-Admin-shell-U0-214d1--admin-still-redirects-home-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:295:19
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-5-the-Categories-group-carries-its-sub-items-expands-on-a-sub-route-and-gates-each-one-desktop-1280` — Playwright's name `admin-shell-Admin-shell-U0-d40f7-ub-route-and-gates-each-one-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-1 gating: a permissionless user is refused; a super admin sees the roster

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:113:19
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-1-gating-a-permissionless-user-is-refused-a-super-admin-sees-the-roster-desktop-1280` — Playwright's name `admin-translations-console-994f0-super-admin-sees-the-roster-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-38 the roster on the agreed blocks: heading, Columns, the footer

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:28:56 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-38-the-roster-on-the-agreed-blocks-heading-Columns-the-footer-desktop-1280` — Playwright's name `admin-translations-console-94f3d--heading-Columns-the-footer-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-2 roster shows every language including admin-only ones

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:29:38 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-2-roster-shows-every-language-including-admin-only-ones-desktop-1280` — Playwright's name `admin-translations-console-d0b1f-e-including-admin-only-ones-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-3 the strings page lists keys with source and status

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:u4b] seeding e2e.scratch.38505679902-4-4-desktop-1280-148-tr3 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:30:20 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4b] seeding e2e.scratch.38505679902-4-4-desktop-1280-148-tr3 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-3-the-strings-page-lists-keys-with-source-and-status-desktop-1280` — Playwright's name `admin-translations-console-b1a98-keys-with-source-and-status-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-4 scope: a translator outside the language is refused by the SERVER

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:u4b] seeding e2e.scratch.38505679902-4-4-desktop-1280-150-tr4 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:31:02 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4b] seeding e2e.scratch.38505679902-4-4-desktop-1280-150-tr4 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-4-scope-a-translator-outside-the-language-is-refused-by-the-SERVER-desktop-1280` — Playwright's name `admin-translations-console-0ec7b-ge-is-refused-by-the-SERVER-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-5 filters live in the URL and survive a reload

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:31:43 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-5-filters-live-in-the-URL-and-survive-a-reload-desktop-1280` — Playwright's name `admin-translations-console-5583b-he-URL-and-survive-a-reload-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-39 a language's page: the breadcrumb names the language and leads back to the roster

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:32:26 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-39-a-language-s-page-the-breadcrumb-names-the-language-and-leads-back-to-the-roster-desktop-1280` — Playwright's name `admin-translations-console-32059-nd-leads-back-to-the-roster-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-6 coverage gate: empty and incomplete catalogs both refuse publication

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:33:08 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-6-coverage-gate-empty-and-incomplete-catalogs-both-refuse-publication-desktop-1280` — Playwright's name `admin-translations-console-2f8a7-ogs-both-refuse-publication-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-7 sync imports the compiled catalog and reports its counts

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:33:50 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-7-sync-imports-the-compiled-catalog-and-reports-its-counts-desktop-1280` — Playwright's name `admin-translations-console-ae27b-alog-and-reports-its-counts-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+38505679902-4-160-2-sp1gao@ethio-e2e.invalid: {}
--- further error 1 ---
Error: [e2e:users] admin.createUser failed for e2e+38505679902-4-160-2-sp1gao@ethio-e2e.invalid: {}

   at helpers/users.ts:69

  67 |   });
  68 |   if (error || !data?.user?.id) {
> 69 |     throw new Error(
     |           ^
  70 |       `[e2e:users] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}`,
  71 |     );
  72 |   }
    at createUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:69:11)
    at mintPrivateSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:732:16)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:344:32
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-7b-sync-after-a-step-up-prompt-still-reports-its-counts-desktop-1280` — Playwright's name `admin-translations-console-5e339-pt-still-reports-its-counts-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-8 save then approve moves a string through the status machine

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:u4b] seeding e2e.scratch.38505679902-4-4-desktop-1280-162-tr8 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:35:14 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4b] seeding e2e.scratch.38505679902-4-4-desktop-1280-162-tr8 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-8-save-then-approve-moves-a-string-through-the-status-machine-desktop-1280` — Playwright's name `admin-translations-console-bf0e8--through-the-status-machine-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-9 the Amharic runtime still renders after the DB bundle merge

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:35:56 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-9-the-Amharic-runtime-still-renders-after-the-DB-bundle-merge-desktop-1280` — Playwright's name `admin-translations-console-20630-s-after-the-DB-bundle-merge-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-10 translator card proves both permission states

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:36:38 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-10-translator-card-proves-both-permission-states-desktop-1280` — Playwright's name `admin-translations-console-8cd8c-oves-both-permission-states-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-11 per-row AI translate writes a machine row and captures a revision

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:u4b] seeding e2e.scratch.38505679902-4-4-desktop-1280-168-tr11 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:37:20 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4b] seeding e2e.scratch.38505679902-4-4-desktop-1280-168-tr11 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-11-per-row-AI-translate-writes-a-machine-row-and-captures-a-revision-desktop-1280` — Playwright's name `admin-translations-console-7b0af-row-and-captures-a-revision-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-12 bulk AI fill translates every untranslated scratch key

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:u4c] fence language zxx-de upsert failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:38:01 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4c] fence language zxx-de upsert failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-12-bulk-AI-fill-translates-every-untranslated-scratch-key-desktop-1280` — Playwright's name `admin-translations-console-fcc82-ry-untranslated-scratch-key-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-13 the placeholder validator flags a machine write too

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:u4b] seeding e2e.scratch.38505679902-4-4-desktop-1280-172-tr13-break failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:38:43 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4b] seeding e2e.scratch.38505679902-4-4-desktop-1280-172-tr13-break failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-13-the-placeholder-validator-flags-a-machine-write-too-desktop-1280` — Playwright's name `admin-translations-console-16ba1-r-flags-a-machine-write-too-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-35 machine translation keeps the {country} token

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:u4b] seeding e2e.scratch.38505679902-4-4-desktop-1280-174-tr35 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:39:25 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4b] seeding e2e.scratch.38505679902-4-4-desktop-1280-174-tr35 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-35-machine-translation-keeps-the-country-token-desktop-1280` — Playwright's name `admin-translations-console-162ad-ion-keeps-the-country-token-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-23 machine translation keeps placeholders, and the editor repairs a mangled one

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:u4b] seeding e2e.scratch.38505679902-4-4-desktop-1280-176-tr23-kept failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:40:06 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4b] seeding e2e.scratch.38505679902-4-4-desktop-1280-176-tr23-kept failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-23-machine-translation-keeps-placeholders-and-the-editor-repairs-a-mangled-one-desktop-1280` — Playwright's name `admin-translations-console-457f6-ditor-repairs-a-mangled-one-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-scope AI: a translator outside the language gets the structured refusal

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:951:18
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-scope-AI-a-translator-outside-the-language-gets-the-structured-refusal-desktop-1280` — Playwright's name `admin-translations-console-aa427-gets-the-structured-refusal-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-16 the History drawer lists revisions and restores one as a new edit

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:u4b] seeding e2e.scratch.38505679902-4-4-desktop-1280-180-tr16 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:42:09 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:u4b] seeding e2e.scratch.38505679902-4-4-desktop-1280-180-tr16 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-16-the-History-drawer-lists-revisions-and-restores-one-as-a-new-edit-desktop-1280` — Playwright's name `admin-translations-console-2e8fa--restores-one-as-a-new-edit-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-33 an empty filter leaves export enabled and downloads the language

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:42:51 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-33-an-empty-filter-leaves-export-enabled-and-downloads-the-language-desktop-1280` — Playwright's name `admin-translations-console-33b04--and-downloads-the-language-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## admin-translations-console.spec.ts › U4b translations console › TR-40 sync follows a changed Amharic text no person wrote, and keeps one a person wrote

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:tr40] seeding e2e.scratch.38505679902-4-4-desktop-1280-184-tr40-followed failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:43:33 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:tr40] seeding e2e.scratch.38505679902-4-4-desktop-1280-184-tr40-followed failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-40-sync-follows-a-changed-Amharic-text-no-person-wrote-and-keeps-one-a-person-wrote-desktop-1280` — Playwright's name `admin-translations-console-1d4e4-nd-keeps-one-a-person-wrote-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-13 photo links: the owner and staff get them; another seller and no session do not

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Test timeout of 60000ms exceeded while running "afterEach" hook.

  88 |   const objects: { userId: string; listingId: string }[] = [];
  89 |
> 90 |   test.afterEach(async ({ page }) => {
     |        ^
  91 |     // INC-323 / INC-398 — stop the page first: wait out a save in flight, then
  92 |     // blank it, so no autosave lands after the purge (about:blank alone left a
  93 |     // save already sent to land as "listing not found").
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:90:8
--- further error 2 ---
Error: apiRequestContext.post: Request context disposed.
Call log:
  - → POST http://127.0.0.1:4173/api/upload/photo
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.7632.6 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Authorization: Bearer [redacted-jwt]
    - content-type: multipart/form-data; boundary=----WebKitFormBoundaryIkrGTTFbCDSoiA0k
    - content-length: 214805


   at helpers/photos.ts:71

  69 |   if (options.token) headers["Authorization"] = `Bearer ${options.token}`;
  70 |   const small: { name: FixtureName; as?: string } = { name: "marker-13px.jpg" };
> 71 |   const response = await page.request.post("/api/upload/photo", {
     |                                       ^
  72 |     headers,
  73 |     multipart: {
  74 |       listingId: options.listingId,
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-13-photo-links-the-owner-and-staff-get-them-another-seller-and-no-session-do-not-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-86e15-eller-and-no-session-do-not-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-123 Post another ad opens step 1 with no draft carried

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-123-Post-another-ad-opens-step-1-with-no-draft-carried-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-49605-tep-1-with-no-draft-carried-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-133 contact details are kept on the profile and open the next ad

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-7')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-7')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-7')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-7')


  168 |         ? page.locator('section[data-testid^="post-step-"]')
  169 |         : page.getByTestId(`post-step-${step + 1}`);
> 170 |     await expect(opened).toBeVisible({ timeout: 20_000 });
      |                          ^
  171 |     return listingId;
  172 |   }
  173 |
    at openDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:170:26)
--- further error 2 ---
Test timeout of 60000ms exceeded while running "afterEach" hook.

   99 |   const places: string[] = [];
  100 |
> 101 |   test.afterEach(async ({ page }) => {
      |        ^
  102 |     await stopPageBeforePurge(page);
  103 |     for (const ref of objects.splice(0)) await purgeListingObjects(ref.userId, ref.listingId);
  104 |     for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:101:8
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-133-contact-details-are-kept-on-the-profile-and-open-the-next-ad-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-7c4e1-rofile-and-open-the-next-ad-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at signedInSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:121:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1571:18
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-144-leaving-the-contact-step-makes-one-identity-call-or-none-when-nothing-changed-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-a2e7f-r-none-when-nothing-changed-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-185 a Next pressed while the contact step is still reading waits for it, then reaches review

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at signedInSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:121:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1617:18
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-185-a-Next-pressed-while-the-contact-step-is-still-reading-waits-for-it-then-reaches-review-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-3c2e5--for-it-then-reaches-review-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "saving"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    14 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
       - unexpected value "saving"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "saving"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    14 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
       - unexpected value "saving"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
  175 |       // AUTO-ADVANCE: the leaf IS the answer; D39 — specifications open next.
  176 |       await expect(page.getByTestId("post-step-3")).toBeVisible();
--- further error 2 ---
Test timeout of 60000ms exceeded while running "afterEach" hook.

  91 |   const walkMarks: string[] = [];
  92 |
> 93 |   test.afterEach(async ({ page }) => {
     |        ^
  94 |     // INC-323 — stop the page first, and wait out a save in flight, so none lands after the purge.
  95 |     await stopPageBeforePurge(page);
  96 |     const ladder = walkMarks.splice(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:93:8
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-2-search-to-leaf-chooses-a-category-and-creates-the-draft-at-once-desktop-1280` — Playwright's name `post-wizard-category-POSTI-6e4af-d-creates-the-draft-at-once-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-52 a category with an icon name shows its glyph; one without shows none (D38)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: no row
--- further error 1 ---
Error: [e2e:c1a] seeding the folder failed: no row

   at helpers/posting.ts:387

  385 |     .single();
  386 |   if (parentError || !parent) {
> 387 |     throw new Error(`[e2e:c1a] seeding the folder failed: ${parentError?.message ?? "no row"}`);
      |           ^
  388 |   }
  389 |
  390 |   const { data: leaf, error: leafError } = await supabase
    at seedCategoryBranch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:387:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:233:37
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-52-a-category-with-an-icon-name-shows-its-glyph-one-without-shows-none-D38-desktop-1280` — Playwright's name `post-wizard-category-POSTI-e3795-one-without-shows-none-D38--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-53 Back responds after typing in Find a category (INC-277)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: no row
--- further error 1 ---
Error: [e2e:c1a] seeding the folder failed: no row

   at helpers/posting.ts:387

  385 |     .single();
  386 |   if (parentError || !parent) {
> 387 |     throw new Error(`[e2e:c1a] seeding the folder failed: ${parentError?.message ?? "no row"}`);
      |           ^
  388 |   }
  389 |
  390 |   const { data: leaf, error: leafError } = await supabase
    at seedCategoryBranch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:387:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:268:37
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-53-Back-responds-after-typing-in-Find-a-category-INC-277-desktop-1280` — Playwright's name `post-wizard-category-POSTI-d3cc7-in-Find-a-category-INC-277--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-62 a level follows pointer order, a guest follows the host's own children, and the home is the flagged pointer (DEC-080)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pw-62] seeding the rows failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:51:25 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:pw-62] seeding the rows failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
--- further error 2 ---
Error: [e2e:reap] reading branch e2e-post-5-15-c62nv5,e2e-post-5-15-ct7gcp,e2e-post-5-15-i9qtjy,e2e-post-5-15-2wc6h4,e2e-post-5-15-k3v5bd failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-62-a-level-follows-pointer-order-a-guest-follows-the-host-s-own-children-and-the-home-is-the-flagged-pointer-DEC-080-desktop-1280` — Playwright's name `post-wizard-category-POSTI-59e31-he-flagged-pointer-DEC-080--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-3 a folder is browsable and never selectable; its leaf is (D11)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: no row
--- further error 1 ---
Error: [e2e:c1a] seeding the folder failed: no row

   at helpers/posting.ts:387

  385 |     .single();
  386 |   if (parentError || !parent) {
> 387 |     throw new Error(`[e2e:c1a] seeding the folder failed: ${parentError?.message ?? "no row"}`);
      |           ^
  388 |   }
  389 |
  390 |   const { data: leaf, error: leafError } = await supabase
    at seedCategoryBranch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:387:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:424:37
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-3-a-folder-is-browsable-and-never-selectable-its-leaf-is-D11-desktop-1280` — Playwright's name `post-wizard-category-POSTI-b6d76-selectable-its-leaf-is-D11--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:143:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:506:18
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-4-a-photo-is-prepared-on-the-device-stored-stripped-and-removable-desktop-1280` — Playwright's name `post-wizard-category-POSTI-3bd93-ored-stripped-and-removable-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:143:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:570:18
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-141-Photos-coming-soon-the-tick-shows-only-with-no-photo-is-saved-draws-the-ribbon-and-goes-when-a-photo-is-added-bundle-4-steps-14-15-desktop-1280` — Playwright's name `post-wizard-category-POSTI-5c6b1-added-bundle-4-steps-14-15--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-7 a draft resumes at the next step, and only for its owner

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:143:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:684:18
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-7-a-draft-resumes-at-the-next-step-and-only-for-its-owner-desktop-1280` — Playwright's name `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:143:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:724:18
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-54-the-wizard-walks-category-specifications-photos-details-and-resumes-at-the-first-unfinished-step-desktop-1280` — Playwright's name `post-wizard-category-POSTI-75ef6-t-the-first-unfinished-step-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-8 an unreachable save keeps the answers, says so, and retries

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:143:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:812:18
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-8-an-unreachable-save-keeps-the-answers-says-so-and-retries-desktop-1280` — Playwright's name `post-wizard-category-POSTI-a400a-answers-says-so-and-retries-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-71 the category group wears the soft border until a leaf is chosen (D71)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:143:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:924:18
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-71-the-category-group-wears-the-soft-border-until-a-leaf-is-chosen-D71-desktop-1280` — Playwright's name `post-wizard-category-POSTI-8625e-until-a-leaf-is-chosen-D71--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-14 D20: a signed-out visitor is sent to sign in with a return path, comes back, and a foreign return is ignored

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-14-D20-a-signed-out-visitor-is-sent-to-sign-in-with-a-return-path-comes-back-and-a-foreign-return-is-ignored-desktop-1280` — Playwright's name `post-wizard-category-POSTI-8f868-a-foreign-return-is-ignored-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-181 D119: a folder in the address opens step 1 inside it, a leaf is chosen, an unknown one opens the top level

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: no row
--- further error 1 ---
Error: [e2e:c1a] seeding the folder failed: no row

   at helpers/posting.ts:387

  385 |     .single();
  386 |   if (parentError || !parent) {
> 387 |     throw new Error(`[e2e:c1a] seeding the folder failed: ${parentError?.message ?? "no row"}`);
      |           ^
  388 |   }
  389 |
  390 |   const { data: leaf, error: leafError } = await supabase
    at seedCategoryBranch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:387:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1100:30
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-181-D119-a-folder-in-the-address-opens-step-1-inside-it-a-leaf-is-chosen-an-unknown-one-opens-the-top-level-desktop-1280` — Playwright's name `post-wizard-category-POSTI-3e408-own-one-opens-the-top-level-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-182 D119: the sign-in return keeps the invite's category and place, through the password door and the callback (INC-530)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: no row
--- further error 1 ---
Error: [e2e:c1a] seeding the folder failed: no row

   at helpers/posting.ts:387

  385 |     .single();
  386 |   if (parentError || !parent) {
> 387 |     throw new Error(`[e2e:c1a] seeding the folder failed: ${parentError?.message ?? "no row"}`);
      |           ^
  388 |   }
  389 |
  390 |   const { data: leaf, error: leafError } = await supabase
    at seedCategoryBranch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:387:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1138:30
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-182-D119-the-sign-in-return-keeps-the-invite-s-category-and-place-through-the-password-door-and-the-callback-INC-530-desktop-1280` — Playwright's name `post-wizard-category-POSTI-b040f-r-and-the-callback-INC-530--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-15 the posting entry lives in My Listings, not in Account

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:143:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1179:5
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-15-the-posting-entry-lives-in-My-Listings-not-in-Account-desktop-1280` — Playwright's name `post-wizard-category-POSTI-65e2f--My-Listings-not-in-Account-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:143:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1291:18
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-29-the-photos-caption-counts-against-the-plan-s-cap-desktop-1280` — Playwright's name `post-wizard-category-POSTI-b40c2-unts-against-the-plan-s-cap-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-36 a category surfaced under a second root appears under it in the tree

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: no row
--- further error 1 ---
Error: [e2e:c1a] seeding the folder failed: no row

   at helpers/posting.ts:387

  385 |     .single();
  386 |   if (parentError || !parent) {
> 387 |     throw new Error(`[e2e:c1a] seeding the folder failed: ${parentError?.message ?? "no row"}`);
      |           ^
  388 |   }
  389 |
  390 |   const { data: leaf, error: leafError } = await supabase
    at seedCategoryBranch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:387:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1328:37
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-36-a-category-surfaced-under-a-second-root-appears-under-it-in-the-tree-desktop-1280` — Playwright's name `post-wizard-category-POSTI-04d30-ppears-under-it-in-the-tree-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-46 a category created with a secondary parent reaches the tree inside the cache window

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:143:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1366:5
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-46-a-category-created-with-a-secondary-parent-reaches-the-tree-inside-the-cache-window-desktop-1280` — Playwright's name `post-wizard-category-POSTI-72c6b-ree-inside-the-cache-window-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-47 a level lists the host's own children first, guests next and other- last

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:d30] seeding e2e-post-5-73-03zdz5 failed: no row
--- further error 1 ---
Error: [e2e:d30] seeding e2e-post-5-73-03zdz5 failed: no row

   at helpers/posting.ts:1874

  1872 |       .single();
  1873 |     if (error || !data) {
> 1874 |       throw new Error(`[e2e:d30] seeding ${slug} failed: ${error?.message ?? "no row"}`);
       |             ^
  1875 |     }
  1876 |     return data;
  1877 |   };
    at mint (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:1874:13)
    at seedSurfacedLevel (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:1879:16)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1432:19
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-47-a-level-lists-the-host-s-own-children-first-guests-next-and-other-last-desktop-1280` — Playwright's name `post-wizard-category-POSTI-d59c8-guests-next-and-other--last-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-44 a dependent list on a surfaced leaf narrows by its parent

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:c1a] seeding the folder failed: no row
--- further error 1 ---
Error: [e2e:c1a] seeding the folder failed: no row

   at helpers/posting.ts:387

  385 |     .single();
  386 |   if (parentError || !parent) {
> 387 |     throw new Error(`[e2e:c1a] seeding the folder failed: ${parentError?.message ?? "no row"}`);
      |           ^
  388 |   }
  389 |
  390 |   const { data: leaf, error: leafError } = await supabase
    at seedCategoryBranch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:387:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1493:37
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-44-a-dependent-list-on-a-surfaced-leaf-narrows-by-its-parent-desktop-1280` — Playwright's name `post-wizard-category-POSTI-f6a45--leaf-narrows-by-its-parent-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:143:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1586:18
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-48-a-catch-all-leaf-can-be-chosen-and-its-listing-lands-in-review-desktop-1280` — Playwright's name `post-wizard-category-POSTI-0c481-its-listing-lands-in-review-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-102 a type that leaves only Other shows that question's text box, and the typed text saves

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at reachStep3 (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-details.spec.ts:63:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-details.spec.ts:96:32
```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-102-a-type-that-leaves-only-Other-shows-that-question-s-text-box-and-the-typed-text-saves-desktop-1280` — Playwright's name `post-wizard-details-POSTIN-819c2-ox-and-the-typed-text-saves-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-103 required text, optional text and a list's Other text each save; an empty required text is refused by name

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at reachStep3 (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-details.spec.ts:63:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-details.spec.ts:122:32
```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-103-required-text-optional-text-and-a-list-s-Other-text-each-save-an-empty-required-text-is-refused-by-name-desktop-1280` — Playwright's name `post-wizard-details-POSTIN-214fe-red-text-is-refused-by-name-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-170 the suggested title leads with the seller's own name for the item (Bundle 7 B3)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-details.spec.ts:163:18
```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-170-the-suggested-title-leads-with-the-seller-s-own-name-for-the-item-Bundle-7-B3-desktop-1280` — Playwright's name `post-wizard-details-POSTIN-48347-e-for-the-item-Bundle-7-B3--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-172 a held answer whose option is switched off prints its label, never offered (INC-466)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-details.spec.ts:239:18
```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-172-a-held-answer-whose-option-is-switched-off-prints-its-label-never-offered-INC-466-desktop-1280` — Playwright's name `post-wizard-details-POSTIN-3703d-abel-never-offered-INC-466--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-85 an option label, an alias and an Amharic alias each find the leaf, and the choice prefills the option

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:45:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:72:18
```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-85-an-option-label-an-alias-and-an-Amharic-alias-each-find-the-leaf-and-the-choice-prefills-the-option-desktop-1280` — Playwright's name `post-wizard-finder-POSTING-d5e02--choice-prefills-the-option-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-86 a failing finder leaves the name matches on screen, with the notice

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:45:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:128:5
```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-86-a-failing-finder-leaves-the-name-matches-on-screen-with-the-notice-desktop-1280` — Playwright's name `post-wizard-finder-POSTING-f6b7b-s-on-screen-with-the-notice-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-105 the searching row shows while the finder is asked; no-hits only after its answer

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:45:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:152:5
```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-105-the-searching-row-shows-while-the-finder-is-asked-no-hits-only-after-its-answer-desktop-1280` — Playwright's name `post-wizard-finder-POSTING-28b0f--hits-only-after-its-answer-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-87 off the chosen path the step asks again, Keep it returns, a new leaf clears it

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:45:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:183:5
```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-87-off-the-chosen-path-the-step-asks-again-Keep-it-returns-a-new-leaf-clears-it-desktop-1280` — Playwright's name `post-wizard-finder-POSTING-3cb2f-eturns-a-new-leaf-clears-it-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:272:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-11-where-the-market-is-prefilled-from-the-edge-a-city-with-sub-cities-offers-all-of-it-and-a-second-place-is-refused-by-the-plan-desktop-1280` — Playwright's name `post-wizard-place-POSTING--47508-lace-is-refused-by-the-plan-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:453:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-desktop-1280` — Playwright's name `post-wizard-place-POSTING--17792-d-a-shown-channel-is-stored-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:544:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-112-who-a-new-post-opens-with-the-last-post-s-channels-stored-on-the-draft-unchanged-desktop-1280` — Playwright's name `post-wizard-place-POSTING--d2ba0-ored-on-the-draft-unchanged-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:589:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-desktop-1280` — Playwright's name `post-wizard-place-POSTING--4521b-ands-in-review-—-never-live-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:698:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-desktop-1280` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-31 the market select waits for the prefill chain and never preselects

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:889:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-31-the-market-select-waits-for-the-prefill-chain-and-never-preselects-desktop-1280` — Playwright's name `post-wizard-place-POSTING--6888f--chain-and-never-preselects-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, is ticked, and a lone city box offers no Remove

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:928:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-20-where-the-default-place-lists-itself-is-ticked-and-a-lone-city-box-offers-no-Remove-desktop-1280` — Playwright's name `post-wizard-place-POSTING--5d9be-e-city-box-offers-no-Remove-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-33 a region alone never lists itself; its city does (W6 R2)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1015:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-33-a-region-alone-never-lists-itself-its-city-does-W6-R2-desktop-1280` — Playwright's name `post-wizard-place-POSTING--775f8-itself-its-city-does-W6-R2--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1067:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-80-a-city-is-required-marked-before-Next-refused-and-scrolled-to-on-Next-cleared-by-a-city-desktop-1280` — Playwright's name `post-wizard-place-POSTING--8f238-o-on-Next-cleared-by-a-city-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1163:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-81-a-prefilled-city-counts-as-chosen-no-mark-Next-passes-untouched-desktop-1280` — Playwright's name `post-wizard-place-POSTING--40d61--mark-Next-passes-untouched-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-82 the add buttons follow the plan's own limits

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PW-82: the free plan could not be read: undefined
--- further error 1 ---
Error: PW-82: the free plan could not be read: undefined

  1208 |       .single();
  1209 |     if (error || !plan)
> 1210 |       throw new Error(`PW-82: the free plan could not be read: ${error?.message}`);
       |             ^
  1211 |     const user = await seller(page);
  1212 |     const category = await leaf();
  1213 |     const chain = await seedScratchChain("ET");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1210:13
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-82-the-add-buttons-follow-the-plan-s-own-limits-desktop-1280` — Playwright's name `post-wizard-place-POSTING--a546c-ollow-the-plan-s-own-limits-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1279:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-37-a-tap-on-the-map-places-a-pin-and-the-door-stores-it-as-exact-desktop-1280` — Playwright's name `post-wizard-place-POSTING--90a6a-the-door-stores-it-as-exact-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1312:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-38-a-place-search-moves-the-pin-and-fills-the-street-line-desktop-1280` — Playwright's name `post-wizard-place-POSTING--c721f-n-and-fills-the-street-line-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1348:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-39-an-approximate-pin-is-stored-as-approx-and-drawn-as-an-area-never-a-point-desktop-1280` — Playwright's name `post-wizard-place-POSTING--7d413-wn-as-an-area-never-a-point-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-40 removing the pin clears all four columns

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1383:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-40-removing-the-pin-clears-all-four-columns-desktop-1280` — Playwright's name `post-wizard-place-POSTING--dcdc1-pin-clears-all-four-columns-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-160 Use my location stays pressed until the pin is moved by hand

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1417:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-160-Use-my-location-stays-pressed-until-the-pin-is-moved-by-hand-desktop-1280` — Playwright's name `post-wizard-place-POSTING--be1b3-il-the-pin-is-moved-by-hand-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-41 the geocode route spends a dial and refuses the call past its ceiling

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1442:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-41-the-geocode-route-spends-a-dial-and-refuses-the-call-past-its-ceiling-desktop-1280` — Playwright's name `post-wizard-place-POSTING--b12f0-s-the-call-past-its-ceiling-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1480:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-76-a-detail-the-model-pins-to-one-value-is-filled-and-hidden-and-still-reviewed-DEC-085-desktop-1280` — Playwright's name `post-wizard-place-POSTING--d27b1-and-still-reviewed-DEC-085--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-78 a big model list shows its required mark once the brand is chosen (INC-336)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:162:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1664:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-78-a-big-model-list-shows-its-required-mark-once-the-brand-is-chosen-INC-336-desktop-1280` — Playwright's name `post-wizard-place-POSTING--e7684-he-brand-is-chosen-INC-336--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-42-Amharic-catalog-text-falls-back-field-by-field-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--2f428-t-falls-back-field-by-field-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-37 coverage first appearance is stored once, renumbered in either order

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: {"error":"upstream unavailable"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 503
--- further error 1 ---
Error: {"error":"upstream unavailable"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 503

  67 |   async function save(page: Page, token: string, body: Record<string, unknown>) {
  68 |     const answer = await postRoute(page, DRAFT, body, { token, country: "ET" });
> 69 |     expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
     |                                                           ^
  70 |     return answer.payload;
  71 |   }
  72 |   async function attrs(id: string) {
    at save (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:69:59)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:558:22
--- further error 2 ---
Test timeout of 60000ms exceeded while running "afterEach" hook.

  25 |   const definitions: string[] = [];
  26 |   const places: string[] = [];
> 27 |   test.afterEach(async () => {
     |        ^
  28 |     const leased = sellers.splice(0);
  29 |     for (const id of leased) await destroyListingsOf(id);
  30 |     // A saved seller place points at a scratch place: remove it first (J3).
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:27:8
```

Context:

```text
          - listitem [ref=e293]:
            - generic [ref=e294]: About
          - listitem [ref=e295]:
            - generic [ref=e296]: How it works
      - navigation "Help" [ref=e297]:
        - heading "Help" [level=2] [ref=e298]
        - list [ref=e299]:
          - listitem [ref=e300]:
            - generic [ref=e301]: Safety
          - listitem [ref=e302]:
            - generic [ref=e303]: Contact
      - navigation "Legal" [ref=e304]:
        - heading "Legal" [level=2] [ref=e305]
        - list [ref=e306]:
          - listitem [ref=e307]:
            - generic [ref=e308]: Terms
          - listitem [ref=e309]:
            - generic [ref=e310]: Privacy
    - paragraph [ref=e312]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-7 the draft dial refuses by name once the ceiling is reached

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PR-7 override cleanup

expect(received).toBeNull()

Received: {"message": "<!DOCTYPE html>
<!--[if lt IE 7]> <html class=\"no-js ie6 oldie\" lang=\"en-US\"> <![endif]-->
<!--[if IE 7]>    <html class=\"no-js ie7 oldie\" lang=\"en-US\"> <![endif]-->
<!--[if IE 8]>    <html class=\"no-js ie8 oldie\" lang=\"en-US\"> <![endif]-->
<!--[if gt IE 8]><!--> <html class=\"no-js\" lang=\"en-US\"> <!--<![endif]-->
<head>·
<title>supabase.co | 522: Connection timed out</title>
<meta charset=\"UTF-8\" />
<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />
<meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\" />
<meta name=\"robots\" content=\"noindex, nofollow\" />
<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\" />
<link rel=\"stylesheet\" id=\"cf_styles-css\" href=\"/cdn-cgi/styles/main.css\" />
</head>
<body>
<div id=\"cf-wrapper\">
    <div id=\"cf-error-details\" class=\"p-0\">
        <header class=\"mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8\">
            <h1 class=\"inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2\">
                <span class=\"inline-block\">Connection timed out</span>
                <span class=\"code-label\">Error code 522</span>
            </h1>
            <div>
                Visit <a href=\"https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co\" target=\"_blank\" rel=\"noopener noreferrer\">cloudflare.com</a> for more information.
            </div>
            <div class=\"mt-3\">2026-10-14 03:48:51 UTC</div>
        </header>
        <div class=\"my-8 bg-gradient-gray\">
            <div class=\"w-240 lg:w-full mx-auto\">
                <div class=\"clearfix md:px-8\">
                    <div id=\"cf-browser-status\" class=\" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center\">
  <div class=\"relative mb-10 md:m-0\">·····
    <span class=\"cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat\"></span>
    <span class=\"cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4\"></span>·····
  </div>
  <span class=\"md:block w-full truncate\">You</span>
--- further error 1 ---
Error: PR-7 override cleanup

expect(received).toBeNull()

Received: {"message": "<!DOCTYPE html>
<!--[if lt IE 7]> <html class=\"no-js ie6 oldie\" lang=\"en-US\"> <![endif]-->
<!--[if IE 7]>    <html class=\"no-js ie7 oldie\" lang=\"en-US\"> <![endif]-->
<!--[if IE 8]>    <html class=\"no-js ie8 oldie\" lang=\"en-US\"> <![endif]-->
<!--[if gt IE 8]><!--> <html class=\"no-js\" lang=\"en-US\"> <!--<![endif]-->
<head>·
<title>supabase.co | 522: Connection timed out</title>
<meta charset=\"UTF-8\" />
<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />
<meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\" />
<meta name=\"robots\" content=\"noindex, nofollow\" />
<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\" />
<link rel=\"stylesheet\" id=\"cf_styles-css\" href=\"/cdn-cgi/styles/main.css\" />
</head>
<body>
<div id=\"cf-wrapper\">
--- further error 2 ---
Error: [e2e:reap] listings of seller 98a3f97f-2250-430b-9621-9b73c619cb2f failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context:

```text
          - listitem [ref=e317]:
            - generic [ref=e318]: About
          - listitem [ref=e319]:
            - generic [ref=e320]: How it works
      - navigation "Help" [ref=e321]:
        - heading "Help" [level=2] [ref=e322]
        - list [ref=e323]:
          - listitem [ref=e324]:
            - generic [ref=e325]: Safety
          - listitem [ref=e326]:
            - generic [ref=e327]: Contact
      - navigation "Legal" [ref=e328]:
        - heading "Legal" [level=2] [ref=e329]
        - list [ref=e330]:
          - listitem [ref=e331]:
            - generic [ref=e332]: Terms
          - listitem [ref=e333]:
            - generic [ref=e334]: Privacy
    - paragraph [ref=e336]: © 2026 ethio.com — All rights reserved.
```
```

## posting-routes.spec.ts › POSTING ROUTES › PR-9 catalog finder is bounded, multilingual and rate-limited

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the finder leaf failed: no row
--- further error 1 ---
Error: [e2e:a2c] seeding the finder leaf failed: no row

   at helpers/posting.ts:159

  157 |     .single();
  158 |   if (error || !data) {
> 159 |     throw new Error(`[e2e:a2c] seeding the finder leaf failed: ${error?.message ?? "no row"}`);
      |           ^
  160 |   }
  161 |   await rebuildFinderIndex();
  162 |   return { id: data.id, slug: data.slug, english, amharic };
    at seedFinderLeaf (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:159:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:577:18
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-9-catalog-finder-is-bounded-multilingual-and-rate-limited-desktop-1280` — Playwright's name `posting-routes-POSTING-ROU-a9542-ltilingual-and-rate-limited-desktop-1280`; this run carried 16 context file(s); of the same spec: `posting-routes-POSTING-ROU-11e37-once-the-ceiling-is-reached-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-19 a category import commit refreshes the finder index before any search

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 03:51:17 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (522): <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-19-a-category-import-commit-refreshes-the-finder-index-before-any-search-desktop-1280` — Playwright's name `posting-routes-POSTING-ROU-a1a80-der-index-before-any-search-desktop-1280`; this run carried 16 context file(s); of the same spec: `posting-routes-POSTING-ROU-11e37-once-the-ceiling-is-reached-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-17 the draft route refuses a region-only place and accepts a city and a sub-city

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:80:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:709:23
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-17-the-draft-route-refuses-a-region-only-place-and-accepts-a-city-and-a-sub-city-desktop-1280` — Playwright's name `posting-routes-POSTING-ROU-ec9d2-cepts-a-city-and-a-sub-city-desktop-1280`; this run carried 16 context file(s); of the same spec: `posting-routes-POSTING-ROU-11e37-once-the-ceiling-is-reached-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-18 the draft route accepts a 5000-character description and refuses 5001

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:80:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:746:23
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-18-the-draft-route-accepts-a-5000-character-description-and-refuses-5001-desktop-1280` — Playwright's name `posting-routes-POSTING-ROU-0e50f-escription-and-refuses-5001-desktop-1280`; this run carried 16 context file(s); of the same spec: `posting-routes-POSTING-ROU-11e37-once-the-ceiling-is-reached-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-16 a model question that matters is required by the draft route (DEC-086)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:80:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:788:23
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-16-a-model-question-that-matters-is-required-by-the-draft-route-DEC-086-desktop-1280` — Playwright's name `posting-routes-POSTING-ROU-3f66f-by-the-draft-route-DEC-086--desktop-1280`; this run carried 16 context file(s); of the same spec: `posting-routes-POSTING-ROU-11e37-once-the-ceiling-is-reached-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-20 step 5: the counters are server-only; the server path still counts

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:80:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:884:29
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-20-step-5-the-counters-are-server-only-the-server-path-still-counts-desktop-1280` — Playwright's name `posting-routes-POSTING-ROU-b089b-he-server-path-still-counts-desktop-1280`; this run carried 16 context file(s); of the same spec: `posting-routes-POSTING-ROU-11e37-once-the-ceiling-is-reached-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:80:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:916:23
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-21-step-7-private-columns-are-owner-only-through-my_listing_private-desktop-1280` — Playwright's name `posting-routes-POSTING-ROU-d4637--through-my-listing-private-desktop-1280`; this run carried 16 context file(s); of the same spec: `posting-routes-POSTING-ROU-11e37-once-the-ceiling-is-reached-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-22 step 8: attribute tables leave the browser; categories still read

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:80:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:961:23
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-22-step-8-attribute-tables-leave-the-browser-categories-still-read-desktop-1280` — Playwright's name `posting-routes-POSTING-ROU-fb787-owser-categories-still-read-desktop-1280`; this run carried 16 context file(s); of the same spec: `posting-routes-POSTING-ROU-11e37-once-the-ceiling-is-reached-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-23 an ad has no end unless the seller sets a date or the category holds a limit (DEC-117)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:80:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1026:29
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-23-an-ad-has-no-end-unless-the-seller-sets-a-date-or-the-category-holds-a-limit-DEC-117-desktop-1280` — Playwright's name `posting-routes-POSTING-ROU-2e3f9-gory-holds-a-limit-DEC-117--desktop-1280`; this run carried 16 context file(s); of the same spec: `posting-routes-POSTING-ROU-11e37-once-the-ceiling-is-reached-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-24 a seller without a public name, or a person without a first name, is refused at publish (INC-423)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: no row
--- further error 1 ---
Error: [e2e:a2c] seeding the postable category failed: no row

   at helpers/posting.ts:214

  212 |     .single();
  213 |   if (error || !data) {
> 214 |     throw new Error(
      |           ^
  215 |       `[e2e:a2c] seeding the postable category failed: ${error?.message ?? "no row"}`,
  216 |     );
  217 |   }
    at seedPostableCategory (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:214:11)
    at category (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:88:17)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1090:17
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-24-a-seller-without-a-public-name-or-a-person-without-a-first-name-is-refused-at-publish-INC-423-desktop-1280` — Playwright's name `posting-routes-POSTING-ROU-7adf7-refused-at-publish-INC-423--desktop-1280`; this run carried 16 context file(s); of the same spec: `posting-routes-POSTING-ROU-11e37-once-the-ceiling-is-reached-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-44 a business with its name and no first or last name publishes (INC-423)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: no row
--- further error 1 ---
Error: [e2e:a2c] seeding the postable category failed: no row

   at helpers/posting.ts:214

  212 |     .single();
  213 |   if (error || !data) {
> 214 |     throw new Error(
      |           ^
  215 |       `[e2e:a2c] seeding the postable category failed: ${error?.message ?? "no row"}`,
  216 |     );
  217 |   }
    at seedPostableCategory (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:214:11)
    at category (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:88:17)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1163:17
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-44-a-business-with-its-name-and-no-first-or-last-name-publishes-INC-423-desktop-1280` — Playwright's name `posting-routes-POSTING-ROU-21e7f-ast-name-publishes-INC-423--desktop-1280`; this run carried 16 context file(s); of the same spec: `posting-routes-POSTING-ROU-11e37-once-the-ceiling-is-reached-desktop-1280`

## posting-routes.spec.ts › POSTING ROUTES › PR-25 a successful publish stamps the seller's statement (bundle 4 step 19)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:a2c] seeding the postable category failed: no row
--- further error 1 ---
Error: [e2e:a2c] seeding the postable category failed: no row

   at helpers/posting.ts:214

  212 |     .single();
  213 |   if (error || !data) {
> 214 |     throw new Error(
      |           ^
  215 |       `[e2e:a2c] seeding the postable category failed: ${error?.message ?? "no row"}`,
  216 |     );
  217 |   }
    at seedPostableCategory (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:214:11)
    at category (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:88:17)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1177:17
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-25-a-successful-publish-stamps-the-seller-s-statement-bundle-4-step-19-desktop-1280` — Playwright's name `posting-routes-POSTING-ROU-26419-statement-bundle-4-step-19--desktop-1280`; this run carried 16 context file(s); of the same spec: `posting-routes-POSTING-ROU-11e37-once-the-ceiling-is-reached-desktop-1280`

## shell.spec.ts › panel follows the route › /settings shows the Account context, and returning shows categories

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://127.0.0.1:4173/settings", waiting until "load"


   at helpers/ui.ts:160

  158 |
  159 | export async function gotoReady(page: Page, path: string) {
> 160 |   await page.goto(path);
      |              ^
  161 |   await assertSsrHealthy(page);
  162 |   await waitForHydration(page);
  163 |   await assertNoStringifiedLeak(page, `gotoReady(${path})`);
    at gotoReady (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:160:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1384:11
```

Context: context file not found for `shell-panel-follows-the-route-settings-shows-the-Account-context-and-returning-shows-categories-desktop-1280` — Playwright's name `shell-panel-follows-the-ro-eb253--returning-shows-categories-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## shell.spec.ts › panel follows the route › admin panel is absent for a normal signed-in user

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1415:18
```

Context: context file not found for `shell-panel-follows-the-route-admin-panel-is-absent-for-a-normal-signed-in-user-desktop-1280` — Playwright's name `shell-panel-follows-the-ro-ae646-for-a-normal-signed-in-user-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## shell.spec.ts › panel header band (U0d) › the desktop rail switcher NAVIGATES to the panel's home (U0e)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1444:18
```

Context: context file not found for `shell-panel-header-band-U0d-the-desktop-rail-switcher-NAVIGATES-to-the-panel-s-home-U0e-desktop-1280` — Playwright's name `shell-panel-header-band-U0-768ee-ES-to-the-panel-s-home-U0e--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## shell.spec.ts › rail scroll regions (U0f) › md+ rail: items scroll, header fixed

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1512:19
```

Context: context file not found for `shell-rail-scroll-regions-U0f-md-rail-items-scroll-header-fixed-desktop-1280` — Playwright's name `shell-rail-scroll-regions--69b0c-l-items-scroll-header-fixed-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## shell.spec.ts › rail scroll regions (U0f) › footer never covers the rail's Sign out

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1555:18
```

Context: context file not found for `shell-rail-scroll-regions-U0f-footer-never-covers-the-rail-s-Sign-out-desktop-1280` — Playwright's name `shell-rail-scroll-regions--64d69--covers-the-rail-s-Sign-out-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## shell.spec.ts › desktop layout laws (U0g) › the bottom bar is phones only; the tabs show from md

- Source: `shard 6`
- Project: `desktop-1280`

```text
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
--- further error 1 ---
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON

   at helpers/session.ts:91

  89 |     body: JSON.stringify({ email, password }),
  90 |   });
> 91 |   const body = (await response.json()) as Record<string, unknown>;
     |                 ^
  92 |   if (!response.ok || typeof body["access_token"] !== "string") {
  93 |     throw new Error(
  94 |       `[e2e:session] password grant failed for ${email} (HTTP ${response.status}): ` +
    at passwordGrant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:91:17)
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:463:19)
    at poolSignIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:856:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1610:5
```

Context: context file not found for `shell-desktop-layout-laws-U0g-the-bottom-bar-is-phones-only-the-tabs-show-from-md-desktop-1280` — Playwright's name `shell-desktop-layout-laws--72ea7--only-the-tabs-show-from-md-desktop-1280`; this run carried 16 context file(s); of the same spec: `shell-desktop-layout-laws--b58f4-x-high-with-a-mouse-from-md-desktop-1280-retry1`, `shell-desktop-layout-laws--b58f4-x-high-with-a-mouse-from-md-desktop-1280`

## shell.spec.ts › desktop layout laws (U0g) › C1: a rail row is 36px high with a mouse from md

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('app-rail').getByTestId('rail-category-skeleton')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('app-rail').getByTestId('rail-category-skeleton')
    14 × locator resolved to 6 elements
       - unexpected value "6"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('app-rail').getByTestId('rail-category-skeleton')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('app-rail').getByTestId('rail-category-skeleton')
    14 × locator resolved to 6 elements
       - unexpected value "6"


  1688 |     await gotoReady(page, "/");
  1689 |     const rail = page.getByTestId("app-rail");
> 1690 |     await expect(rail.getByTestId("rail-category-skeleton")).toHaveCount(0);
       |                                                              ^
  1691 |     const heights = await rail
  1692 |       .getByTestId("rail-scroll")
```

Context:

```text
          - listitem [ref=e121]:
            - generic [ref=e122]: About
          - listitem [ref=e123]:
            - generic [ref=e124]: How it works
      - navigation "Help" [ref=e125]:
        - heading "Help" [level=2] [ref=e126]
        - list [ref=e127]:
          - listitem [ref=e128]:
            - generic [ref=e129]: Safety
          - listitem [ref=e130]:
            - generic [ref=e131]: Contact
      - navigation "Legal" [ref=e132]:
        - heading "Legal" [level=2] [ref=e133]
        - list [ref=e134]:
          - listitem [ref=e135]:
            - generic [ref=e136]: Terms
          - listitem [ref=e137]:
            - generic [ref=e138]: Privacy
    - paragraph [ref=e140]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › i18n gate is non-blocking (U4f-2) › TR-36 the header renders while the languages read is still in flight

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThan(expected)

Expected: < 5000
Received:   19847
--- further error 1 ---
Error: expect(received).toBeLessThan(expected)

Expected: < 5000
Received:   19847

  1901 |     expect(languages.resolved).toBe(false);
  1902 |     // SECONDARY (clock): unchanged budget.
> 1903 |     expect(Date.now() - started).toBeLessThan(5000);
       |                                  ^
  1904 |   });
  1905 |
  1906 |   test("TR-18 a regular user is still redirected off /admin before the list resolves", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1903:34
```

Context:

```text
          - listitem [ref=e121]:
            - generic [ref=e122]: About
          - listitem [ref=e123]:
            - generic [ref=e124]: How it works
      - navigation "Help" [ref=e125]:
        - heading "Help" [level=2] [ref=e126]
        - list [ref=e127]:
          - listitem [ref=e128]:
            - generic [ref=e129]: Safety
          - listitem [ref=e130]:
            - generic [ref=e131]: Contact
      - navigation "Legal" [ref=e132]:
        - heading "Legal" [level=2] [ref=e133]
        - list [ref=e134]:
          - listitem [ref=e135]:
            - generic [ref=e136]: Terms
          - listitem [ref=e137]:
            - generic [ref=e138]: Privacy
    - paragraph [ref=e140]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › i18n gate is non-blocking (U4f-2) › TR-18 a regular user is still redirected off /admin before the list resolves

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1909:18
```

Context: context file not found for `shell-i18n-gate-is-non-blocking-U4f-2-TR-18-a-regular-user-is-still-redirected-off-admin-before-the-list-resolves-desktop-1280` — Playwright's name `shell-i18n-gate-is-non-blo-57907-in-before-the-list-resolves-desktop-1280`; this run carried 16 context file(s); of the same spec: `shell-i18n-gate-is-non-blo-4c168-ges-read-is-still-in-flight-desktop-1280`, `shell-i18n-gate-is-non-blo-4c168-ges-read-is-still-in-flight-desktop-1280-retry1`

## shell.spec.ts › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('language-star-am')


  1940 |     await waitForHydration(page);
  1941 |     await page.getByTestId("language-switcher").click();
> 1942 |     await page.getByTestId(`language-star-${code}`).click();
       |                                                     ^
  1943 |     await expect(page.getByTestId("language-switcher")).toBeVisible();
  1944 |     await expect(page.locator("html")).toHaveAttribute("lang", code, { timeout: 15000 });
  1945 |   }
    at starLanguage (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1942:53)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1964:5
```

Context:

```text
            - list:
              - listitem:
                - generic: Safety
              - listitem:
                - generic: Contact
          - navigation:
            - heading [level=2]: Legal
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - menu "Language" [active] [ref=e1]:
    - menuitem "English Set as this device's default language" [ref=e2]:
      - generic [ref=e4]: English
      - button "Set as this device's default language" [ref=e5]:
        - img [ref=e6]
```
```

## shell.spec.ts › U4h device language star › TR-37 the account carries onto a starless device, and never over a star

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1985:23
```

Context: context file not found for `shell-U4h-device-language-star-TR-37-the-account-carries-onto-a-starless-device-and-never-over-a-star-desktop-1280` — Playwright's name `shell-U4h-device-language--606df-evice-and-never-over-a-star-desktop-1280`; this run carried 16 context file(s); of the same spec: `shell-U4h-device-language--f13fb-reload-sign-in-and-sign-out-desktop-1280-retry1`, `shell-U4h-device-language--de517-l-the-anon-publication-gate-desktop-1280-retry1`, `shell-U4h-device-language--f13fb-reload-sign-in-and-sign-out-desktop-1280`, `shell-U4h-device-language--de517-l-the-anon-publication-gate-desktop-1280`

## shell.spec.ts › U4h device language star › TR-28 hreflang alternates equal the anon publication gate

- Source: `shard 6`
- Project: `desktop-1280`

```text
TimeoutError: page.waitForFunction: Timeout 15000ms exceeded.
--- further error 1 ---
TimeoutError: page.waitForFunction: Timeout 15000ms exceeded.

  2053 |      * exactly so a reader can wait for truth (J7: poll on truth, no sleep).
  2054 |      */
> 2055 |     await page.waitForFunction(
       |                ^
  2056 |       () => {
  2057 |         const value = (window as unknown as Record<string, unknown>)["__ethioPublicLanguages"] as
  2058 |           | { gateReady?: boolean; codes?: string[] }
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2055:16
```

Context:

```text
          - listitem [ref=e121]:
            - generic [ref=e122]: About
          - listitem [ref=e123]:
            - generic [ref=e124]: How it works
      - navigation "Help" [ref=e125]:
        - heading "Help" [level=2] [ref=e126]
        - list [ref=e127]:
          - listitem [ref=e128]:
            - generic [ref=e129]: Safety
          - listitem [ref=e130]:
            - generic [ref=e131]: Contact
      - navigation "Legal" [ref=e132]:
        - heading "Legal" [level=2] [ref=e133]
        - list [ref=e134]:
          - listitem [ref=e135]:
            - generic [ref=e136]: Terms
          - listitem [ref=e137]:
            - generic [ref=e138]: Privacy
    - paragraph [ref=e140]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › L4b location picker › LS-1 the cascade reaches a sub-city

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: INC-285: reading curated settlements failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Connection timed out</span>
                <span class="code-label">Error code 522</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_522&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-14 04:06:18 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: INC-285: reading curated settlements failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 522: Connection timed out</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `shell-L4b-location-picker-LS-1-the-cascade-reaches-a-sub-city-desktop-1280` — Playwright's name `shell-L4b-location-picker--c2bb1--cascade-reaches-a-sub-city-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/smoke-auth-i18n.spec.ts:20:16
```

Context: context file not found for `smoke-auth-i18n-smoke-sign-in-header-identity-Amharic-switch-360px-overflow-sign-out-private-identity-desktop-1280` — Playwright's name `smoke-auth-i18n-smoke-sign-8cacc-w-sign-out-private-identity-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-1 a visible place is saved on the account with its time, and read back

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at signedIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:52:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:99:25
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-account-doors-D106-VP-1-a-visible-place-is-saved-on-the-account-with-its-time-and-read-back-desktop-1280` — Playwright's name `viewing-place-VIEWING-PLAC-fb91b-with-its-time-and-read-back-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-2 a place that is not shown is refused, and the saved place stays

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at signedIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:52:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:117:25
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-account-doors-D106-VP-2-a-place-that-is-not-shown-is-refused-and-the-saved-place-stays-desktop-1280` — Playwright's name `viewing-place-VIEWING-PLAC-b8ebe-d-and-the-saved-place-stays-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-3 a saved place that stops being shown reads as not usable; NULL clears

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at signedIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:52:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:144:25
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-account-doors-D106-VP-3-a-saved-place-that-stops-being-shown-reads-as-not-usable-NULL-clears-desktop-1280` — Playwright's name `viewing-place-VIEWING-PLAC-7186b-s-as-not-usable-NULL-clears-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-4 the viewing_place dial refuses the call past the account's limit

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at signedIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:52:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:163:25
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-account-doors-D106-VP-4-the-viewing_place-dial-refuses-the-call-past-the-account-s-limit-desktop-1280` — Playwright's name `viewing-place-VIEWING-PLAC-fbd18-ll-past-the-account-s-limit-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the account doors (D106) › VP-5 no session reaches either door, and the owner's client cannot write the columns

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at signedIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:52:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:181:25
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-account-doors-D106-VP-5-no-session-reaches-either-door-and-the-owner-s-client-cannot-write-the-columns-desktop-1280` — Playwright's name `viewing-place-VIEWING-PLAC-42001-nt-cannot-write-the-columns-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-6 a pick while signed in is saved on the account, with its time here too; any area clears it

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at lease (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:229:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:301:18
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-6-a-pick-while-signed-in-is-saved-on-the-account-with-its-time-here-too-any-area-clears-it-desktop-1280` — Playwright's name `viewing-place-VIEWING-PLAC-4345a-here-too-any-area-clears-it-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-7 another browser opens on the account's place, and signing out there keeps it

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at lease (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:229:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:328:18
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-7-another-browser-opens-on-the-account-s-place-and-signing-out-there-keeps-it-desktop-1280` — Playwright's name `viewing-place-VIEWING-PLAC-8f060--signing-out-there-keeps-it-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-8 this browser's newer pick wins and is saved on the account

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at lease (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:229:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:346:18
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-8-this-browser-s-newer-pick-wins-and-is-saved-on-the-account-desktop-1280` — Playwright's name `viewing-place-VIEWING-PLAC-1cc34-and-is-saved-on-the-account-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-9 the account's newer pick wins over this browser's older one

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at lease (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:229:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:366:18
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-9-the-account-s-newer-pick-wins-over-this-browser-s-older-one-desktop-1280` — Playwright's name `viewing-place-VIEWING-PLAC-c9ba8-er-this-browser-s-older-one-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-10 a browser pick saved before D106 (no time) loses to the account's place

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at lease (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:229:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:388:18
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-10-a-browser-pick-saved-before-D106-no-time-loses-to-the-account-s-place-desktop-1280` — Playwright's name `viewing-place-VIEWING-PLAC-7b2a8-oses-to-the-account-s-place-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-11 with nothing saved here or on the account, the guess shows and nothing is saved

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at lease (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:229:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:411:18
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-11-with-nothing-saved-here-or-on-the-account-the-guess-shows-and-nothing-is-saved-desktop-1280` — Playwright's name `viewing-place-VIEWING-PLAC-72716--shows-and-nothing-is-saved-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-g7ww2b: e2e_par_8ify3p → e2e_chi_daat5p
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import auth upstream unavailable (504)
[WebServer] [ssr-error] /api/feed upstream returned an HTML error page (520)
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (522)
```

## Client errors: shard 1

```text
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/my_viewing_location' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_entity_bundle' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_my_permissions' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/listings/photos/$id auth upstream unavailable (504)
[WebServer] [ssr-error] /api/listings/draft auth upstream unavailable (504)
[WebServer] [ssr-error] /api/media/photo-links upstream request timeout
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (520)
[WebServer] [ssr-error] /api/feed upstream returned an HTML error page (520)
[WebServer] [ssr-error] /__root gate fetch failed 522
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (522)
[WebServer] [ssr-error] /__root gate fetch failed 522
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (522)
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
[WebServer] [ssr-error] /__root gate fetch failed 522 ×2
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (522)
[WebServer] [ssr-error] /api/locations [WebServer] <!DOCTYPE html>
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (522)
```

## Client errors: shard 2

```text
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_entity_bundle' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway) ×2
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/locations ((body unavailable))
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/i18n/en ((body unavailable))
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/categories/tree ((body unavailable))
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_entity_bundle' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_entity_bundle' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway) ×2
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/languages?select=code,name_en,name_native,rtl,sort&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: [client-error] gate fetch threw
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/i18n/en ((body unavailable))
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/categories/tree ((body unavailable))
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/locations ((body unavailable))
console.error: [client-error] gate fetch threw
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
[WebServer] [ssr-error] /api/listings/identity auth upstream unavailable (504)
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /__root gate fetch failed 522
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (522)
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-pzk0li: e2e_par_885408 → e2e_chi_rdkdvo
[WebServer] [ssr-error] /api/admin/categories/import undo_failed upstream request timeout
[WebServer] [ssr-error] /api/categories/tree upstream request timeout
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 504 ()
[client-error] HTTP 504 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation (upstream request timeout)
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CArgp9rL.js:34102:25) at http://127.0.0.1:4173/assets/index-CArgp9rL.js:34134:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CArgp9rL.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CArgp9rL.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CArgp9rL.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CArgp9rL.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CArgp9rL.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CArgp9rL.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CArgp9rL.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CArgp9rL.js:6025:5)
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
[WebServer] [ssr-error] /api/upload/photo register_listing_photo: upstream unavailable (504)
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (520)
[WebServer] [ssr-error] /api/listings/draft auth upstream unavailable (522)
[WebServer] [ssr-error] /__root gate fetch failed 522
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
[WebServer] [ssr-error] /__root gate fetch failed 522
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (522)
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (522)
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /__root gate fetch failed 522
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /__root gate fetch failed 522
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (522)
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (522)
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
```

## Client errors: shard 5

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/categories/tree ((body unavailable))
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/i18n/en ((body unavailable))
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/locations ((body unavailable))
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_entity_bundle' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/languages?select=code,name_en,name_native,rtl,sort&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] console.error: [client-error] gate fetch threw
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/locations ((body unavailable))
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway) ×3
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/languages?select=code,name_en,name_native,rtl,sort&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_entity_bundle' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/categories/tree ((body unavailable))
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/locations ((body unavailable))
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/i18n/en ((body unavailable))
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (522)
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /api/feed upstream returned an HTML error page (522)
[WebServer] [ssr-error] /__root gate fetch failed 522
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (522)
[WebServer] [ssr-error] /api/feed upstream returned an HTML error page (522)
[WebServer] [ssr-error] /__root gate fetch failed 522
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (522)
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /__root gate fetch failed 522
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (522)
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /__root gate fetch failed 522
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (522)
[WebServer] [ssr-error] /api/locations <!DOCTYPE html>
[WebServer] [ssr-error] /api/i18n <!DOCTYPE html>
```

## Client errors: shard 6

```text
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/languages?select=code,name_en,name_native,rtl,sort&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway) ×2
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/languages?select=code,name_en,name_native,rtl,sort&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_ui_bundle' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/languages?select=code,name_en,name_native,rtl,sort&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_entity_bundle' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway) ×3
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/languages?select=code,name_en,name_native,rtl,sort&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_ui_bundle' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
```
