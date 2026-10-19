# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39225541601 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39225541601
- Commit: `7779dfbb16a0b74b1b9a7841f85cf8bb9fed77fa`
- Attempt: 1
- Written (UTC): 2026-10-19T10:07:36.402Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 5
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-7 transfer: the markets file round-trips through the header's Import and the undo puts it back — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-41 the door refuses an answer the chosen options do not allow — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-lifecycle.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image — Error: CT-17 the dialog advances to the image surface — expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans — Error: PW-30: the alias never cleared
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · shell.spec.ts › L4b location picker › LS-10 a saved area beats the deepest guess — Error: the ET tree never carried e2e-loc-6-2-ls-city-v9lrse within 20 s

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-7 transfer: the markets file round-trips through the header's Import and the undo puts it back

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-import-applied')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('country-import-applied')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-import-applied')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('country-import-applied')


  399 |       await page.getByTestId("country-import-confirm").click();
  400 |       await stepUpIfPrompted(page, secret);
> 401 |       await expect(page.getByTestId("country-import-applied")).toBeVisible({ timeout: 20000 });
      |                                                                ^
  402 |       expect((await readCountry(code))?.is_active).toBe(false);
  403 |
  404 |       // THE UNDO PUTS IT BACK (INC-206): the market created by this batch was
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:401:64
```

Context:

```text
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import countries" [ref=e2]:
    - heading "Import countries" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import countries
      - paragraph [ref=e6]: "A file is written whole or not at all: one refused row stops the entire import."
      - paragraph [ref=e7]: Start from a download so the columns match. Read-only columns are never applied.
      - status [ref=e8]: 1 added · 0 changed · 0 retired · 0 reactivated · 0 deleted · 0 unchanged · 0 refused
      - status [ref=e9]: Import applied — 1 changes written
      - generic [ref=e10]:
        - button "Undo last import" [ref=e11] [cursor=pointer]
        - button "Close" [ref=e12] [cursor=pointer]
    - button "Close" [ref=e13] [cursor=pointer]:
      - img [ref=e14]
      - generic [ref=e17]: Close
```
```

### posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-41 the door refuses an answer the chosen options do not allow

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: case 4 xy: {"ok":false,"refusals":[{"reason":"unknownAttribute","attr_key":"e2e_alw_it8s16_7"},{"reason":"unknownAttribute","attr_key":"e2e_alw_it8s16_8"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  331 |     }
  332 |     function accepted(label: string, answer: Record<string, unknown>) {
> 333 |       expect.soft(answer["ok"], `${label}: ${JSON.stringify(answer)}`).toBe(true);
      |                                                                        ^
  334 |     }
  335 |
  336 |     // Cases 1, 2, 6 and 7: parent P narrows child C to [a]; T is free to change.
    at accepted (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:333:72)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:391:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e310]
        - list [ref=e311]:
          - listitem [ref=e312]:
            - generic [ref=e313]: About
          - listitem [ref=e314]:
            - generic [ref=e315]: Contact
      - navigation "Help" [ref=e316]:
        - heading "Help" [level=2] [ref=e317]
        - list [ref=e318]:
          - listitem [ref=e319]:
            - generic [ref=e320]: Safety
      - navigation "Legal" [ref=e321]:
        - heading "Legal" [level=2] [ref=e322]
        - list [ref=e323]:
          - listitem [ref=e324]:
            - generic [ref=e325]: Terms
          - listitem [ref=e326]:
            - generic [ref=e327]: Privacy
    - paragraph [ref=e329]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-lifecycle.spec.ts › C2 categories console › CT-17 create flow: two steps, chained countries + position, image

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: CT-17 the dialog advances to the image surface — expect(locator).toBeVisible() failed

Locator: getByTestId('category-editor-image')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-editor-image')

[dialog-dump CT-17 CT-17 the dialog advances to the image surface] open dialogs: category-edit-dialog opened-by=create-button
--- further error 1 ---
Error: CT-17 the dialog advances to the image surface — expect(locator).toBeVisible() failed

Locator: getByTestId('category-editor-image')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-editor-image')

[dialog-dump CT-17 CT-17 the dialog advances to the image surface] open dialogs: category-edit-dialog opened-by=create-button

  641 |         } catch (error) {
  642 |           const reason = error instanceof Error ? error.message : String(error);
> 643 |           throw new Error(`${label} — ${reason}\n${await dialogDump(page, `CT-17 ${label}`)}`);
      |                 ^
  644 |         }
  645 |       };
  646 |       const present = async (label: string, locator: Locator) => {
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 503 (Service Unavailable)
[client-error] HTTP 503 POST http://127.0.0.1:4173/api/admin/categories/suggest-icon ({"error":"server error"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_list_categories?order=id.asc&limit=1000 ({"code":"57014","details":null,"hint":null,"message":"canceling statement due to statement timeout"})
```

Context:

```text
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Edit category" [active] [ref=e2]:
    - heading "Edit category" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Edit category
      - generic [ref=e6]:
        - generic [ref=e7]:
          - paragraph [ref=e8]: Generated assets are saved immediately and reviewed here; regenerate until the artwork is right.
          - paragraph [ref=e9]: No image yet for this category.
          - button "Generate image" [ref=e10] [cursor=pointer]
        - button "Close" [ref=e12] [cursor=pointer]
    - button "Close" [ref=e13] [cursor=pointer]:
      - img [ref=e14]
      - generic [ref=e17]: Close
```
```

### post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-30: the alias never cleared
PW-30 step timings: signed in @ 7726 ms | category and specifications seeded @ 8355 ms | step 3 reached @ 10497 ms | specifications answered @ 10755 ms | step 6 open @ 15558 ms | tree served @ 16461 ms | place chosen @ 17034 ms

expect(locator).toBeVisible() failed

Locator: getByTestId('post-who-alias-ok')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-30: the alias never cleared
PW-30 step timings: signed in @ 7726 ms | category and specifications seeded @ 8355 ms | step 3 reached @ 10497 ms | specifications answered @ 10755 ms | step 6 open @ 15558 ms | tree served @ 16461 ms | place chosen @ 17034 ms with timeout 20000ms
  - waiting for getByTestId('post-who-alias-ok')

--- further error 1 ---
Error: PW-30: the alias never cleared
PW-30 step timings: signed in @ 7726 ms | category and specifications seeded @ 8355 ms | step 3 reached @ 10497 ms | specifications answered @ 10755 ms | step 6 open @ 15558 ms | tree served @ 16461 ms | place chosen @ 17034 ms

expect(locator).toBeVisible() failed

Locator: getByTestId('post-who-alias-ok')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-30: the alias never cleared
PW-30 step timings: signed in @ 7726 ms | category and specifications seeded @ 8355 ms | step 3 reached @ 10497 ms | specifications answered @ 10755 ms | step 6 open @ 15558 ms | tree served @ 16461 ms | place chosen @ 17034 ms with timeout 20000ms
  - waiting for getByTestId('post-who-alias-ok')


  789 |       page.getByTestId("post-who-alias-ok"),
  790 |       why("PW-30: the alias never cleared"),
> 791 |     ).toBeVisible({
      |       ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-desktop-1280` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-desktop-1280`; this run carried 3 context file(s); of the same spec: none

### shell.spec.ts › L4b location picker › LS-10 a saved area beats the deepest guess

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: the ET tree never carried e2e-loc-6-2-ls-city-v9lrse within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-6-2-ls-city-v9lrse"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-1-1-ls-region-tktnnj", "e2e-loc-2-0-ls-region-9qy17f", "e2e-loc-2-13-ls-region-bjyt8j", "e2e-loc-6-2-gs-region-4zkkbx", "e2e-loc-changed-14-ls-region-u6x1ss", "e2e-loc-smoke-3-gs-region-0y3m2k", …]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: the ET tree never carried e2e-loc-6-2-ls-city-v9lrse within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-6-2-ls-city-v9lrse"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-1-1-ls-region-tktnnj", "e2e-loc-2-0-ls-region-9qy17f", "e2e-loc-2-13-ls-region-bjyt8j", "e2e-loc-6-2-gs-region-4zkkbx", "e2e-loc-changed-14-ls-region-u6x1ss", "e2e-loc-smoke-3-gs-region-0y3m2k", …]

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

Context: context file not found for `shell-L4b-location-picker-LS-10-a-saved-area-beats-the-deepest-guess-desktop-1280` — Playwright's name `shell-L4b-location-picker--81e69-rea-beats-the-deepest-guess-desktop-1280`; this run carried 3 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

113 line(s), 41 message(s): 6 off the allowlist, 35 allowlisted.

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
| `name_folds_rebuild: canceling statement due to statement timeout` | 2 | shard 1 |
| `strings badHeader` (quiet) | 2 | shard 2, shard 5 |
| `strings emptyFile` (quiet) | 2 | shard 2, shard 5 |
| `strings nulByte` (quiet) | 2 | shard 2, shard 5 |
| `strings tooManyRows` (quiet) | 2 | shard 2, shard 5 |
| `strings unknownColumn` (quiet) | 2 | shard 2, shard 5 |
| `strings wrongFile` (quiet) | 2 | shard 2, shard 5 |
| `auth upstream unavailable (<n>)` | 1 | shard 4 |
| `canceling statement due to statement timeout` | 1 | shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-eich<n>o: e<n>e_par_snny<n>r → e<n>e_chi_iqusac` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-oxkfnj: e<n>e_par_icpkae → e<n>e_chi_a<n>vyxb` (quiet) | 1 | shard 1 |
| `Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()` | 1 | shard 5 |
| `insert or update on table <q> violates foreign key constraint <q>` | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-eich<n>o: e<n>e_par_snny<n>r → e<n>e_chi_iqusac ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-oxkfnj: e<n>e_par_icpkae → e<n>e_chi_a<n>vyxb ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-140 the title page opens with a title written from the answers, and the selle ×1 · PW-17 the currency is preselected and searchable by name in one control ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### name_folds_rebuild: canceling statement due to statement timeout

- Count: 2 · Sources: shard 1
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CO-7 transfer: the markets file round-trips through the header's Import and the  ×4

```text
[WebServer] [ssr-error] /api/admin/categories/import name_folds_rebuild: canceling statement due to statement timeout
```

### auth upstream unavailable (<n>)

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CT-17 create flow: two steps, chained countries + position, image ×1 · CT-32 a reactivate row carries its cell changes through commit and undo, and an  ×1

```text
[WebServer] [ssr-error] /api/admin/categories/suggest-icon auth upstream unavailable (504)
```

### canceling statement due to statement timeout

- Count: 1 · Sources: shard 5
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-14 a photo removed while it uploads, or while it waits its turn, never comes  ×1 · PW-131 an imitating name is refused when the step is saved ×1

```text
[WebServer] [ssr-error] /api/categories/tree canceling statement due to statement timeout
```

### Error: The socket connection was closed unexpectedly. For more information, pass <q> in the second argument to fetch()

- Count: 1 · Sources: shard 5
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): LGA-7 user Legal card shows acceptance and sent notice, then both empty states ×1 · LR-1 the open market answers, anchor first, and honours If-None-Match ×1

```text
[WebServer] [ssr-error] /api/feed Error: The socket connection was closed unexpectedly. For more information, pass `verbose: true` in the second argument to fetch()
```

### insert or update on table <q> violates foreign key constraint <q>

- Count: 1 · Sources: shard 1
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AP-42 a missing box gives its room to its row ×1 · AP-44 nothing covers the top bars ×1

```text
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-19T09:20:04.276Z | 22.2 min |
| email | 2026-10-19T09:19:59.072Z | 0.2 min |
| shard 1 | 2026-10-19T09:20:02.486Z | 45.2 min |
| shard 2 | 2026-10-19T09:19:56.904Z | 39.7 min |
| shard 3 | 2026-10-19T09:20:08.789Z | 42.5 min |
| shard 4 | 2026-10-19T09:20:04.317Z | 47.2 min |
| shard 5 | 2026-10-19T09:19:58.282Z | 39.3 min |
| shard 6 | 2026-10-19T09:19:57.843Z | 35.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 68 | 27.9 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 82 | 27.2 min | shard 3, shard 6 |
| `shell.spec.ts` | 424 | 26.9 min | smoke, shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 24.8 min | shard 2, shard 5 |
| `post-wizard-bundle2.spec.ts` | 70 | 20.2 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 62 | 18.5 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 80 | 17.9 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 17.3 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 16.0 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 15.3 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 14.2 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 14.1 min | shard 2, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 12.2 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 12.2 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 12.0 min | smoke, shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 12.0 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 36 | 11.9 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 11.7 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 52 | 11.3 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 10.6 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 10.1 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.4 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.6 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 8.6 min | shard 3, shard 6 |
| `admin-users.spec.ts` | 28 | 8.0 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.3 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 7.1 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.0 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 7.0 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.4 min | shard 3, shard 6 |
| `my-listings-page.spec.ts` | 16 | 6.4 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 6.0 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.0 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.5 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.1 min | shard 2, shard 5 |
| `legal-doors.spec.ts` | 20 | 4.9 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 4.6 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.5 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 4.5 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `legal-admin.spec.ts` | 14 | 2.7 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.5 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.4 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 2.1 min | shard 3, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.0 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 12 | 1.9 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.7 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.2 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.1 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 1.0 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 14 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
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
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | mobile-360 | 105.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 97.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 89.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-17 create flow: two steps, chained countries + position, image | desktop-1280 | 79.4 s |
| `admin-countries.spec.ts` › CO-7 transfer: the markets file round-trips through the header's Import and the undo puts it back | mobile-360 | 66.7 s |
| `post-wizard-place.spec.ts` › PW-30 review and buyer preview render option labels, units, multi-values and booleans | desktop-1280 | 66.2 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 62.0 s |
| `photo-pipeline.spec.ts` › PP-14 a photo removed while it uploads, or while it waits its turn, never comes back | desktop-1280 | 60.2 s |
| `photo-pipeline.spec.ts` › PP-16 a photo dropped on the step is added like a picked one | mobile-360 | 59.0 s |
| `shell.spec.ts` › LS-10 a saved area beats the deepest guess | desktop-1280 | 58.3 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 56.2 s |
| `posting-routes-dials.spec.ts` › PR-32 relist_listing counts against the revise dial | mobile-360 | 55.1 s |
| `post-wizard-bundle2.spec.ts` › PW-131 an imitating name is refused when the step is saved | desktop-1280 | 54.9 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 50.9 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 49.8 s |
