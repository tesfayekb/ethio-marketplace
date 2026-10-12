# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38245598293 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38245598293
- Commit: `93b4cbe1cf6b6dd532371f2ecc095b3d8c22bf6b`
- Attempt: 1
- Written (UTC): 2026-10-12T12:30:17.535Z
- Post-test warnings: 33
- Flaky (passed on retry, DEC-030, non-gating): 17

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-75 the import preview names the holders of an unlinked question and a removed answer — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-13 Remove then Restore from the row: a reason first, then Removed, then Waiting for review — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · post-wizard-resets.spec.ts › POSTING WIZARD › PW-166 a prefill the seller left goes with the old choice; one the seller changed stays when it fits and is cleared when it does not — Error: PW-166: the draft after m2 is wrong
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-84 a new post opens on the seller's own last post, never another seller's — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-attributes-library.spec.ts › C3 attributes console › AT-7 filter: a category narrows the library to its linked attributes (DB truth) — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-75 the import preview names the holders of an unlinked question and a removed answer — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-categories-console.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-categories-home.spec.ts › Bundle 7 category doors › CT-39 the badge sits on the home path, and Make primary moves it — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · post-wizard-resets.spec.ts › POSTING WIZARD › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288) — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-128 a number typed before the phone library arrives is saved only once read — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `changed` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-117 two sub-cities of one city both save and count as that one city — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-119 another seller's visible phone is never carried — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-75 the import preview names the holders of an unlinked question and a removed answer

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e1318]:
            - generic [ref=e1319]: About
          - listitem [ref=e1320]:
            - generic [ref=e1321]: How it works
      - navigation "Help" [ref=e1322]:
        - heading "Help" [level=2] [ref=e1323]
        - list [ref=e1324]:
          - listitem [ref=e1325]:
            - generic [ref=e1326]: Safety
          - listitem [ref=e1327]:
            - generic [ref=e1328]: Contact
      - navigation "Legal" [ref=e1329]:
        - heading "Legal" [level=2] [ref=e1330]
        - list [ref=e1331]:
          - listitem [ref=e1332]:
            - generic [ref=e1333]: Terms
          - listitem [ref=e1334]:
            - generic [ref=e1335]: Privacy
    - paragraph [ref=e1337]: © 2026 ethio.com — All rights reserved.
```
```

### admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
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

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-13 Remove then Restore from the row: a reason first, then Removed, then Waiting for review

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('listings-move-dialog')
Expected: 0
Received: 1

Call log:
  - Expect "toHaveCount" with timeout 20000ms
  - waiting for getByTestId('listings-move-dialog')
    10 × locator resolved to 1 element
       - unexpected value "1"


  940 |     if (note !== undefined) await dialog.getByTestId("listings-move-note").fill(note);
  941 |     await dialog.getByTestId("listings-move-confirm").click();
> 942 |     await expect(dialog).toHaveCount(0, { timeout: 20000 });
      |                          ^
  943 |   }
  944 |
  945 |   const moveAudits = async (listingId: string, action: string) =>
```

Context:

```text
            - button "Contact details in the text" [ref=e19] [cursor=pointer]:
              - generic [ref=e20]: Contact details in the text
            - button "A photo" [ref=e21] [cursor=pointer]:
              - generic [ref=e22]: A photo
            - button "The site's rules" [ref=e23] [cursor=pointer]:
              - generic [ref=e24]: The site's rules
            - button "Other" [ref=e25] [cursor=pointer]:
              - generic [ref=e26]: Other
        - generic [ref=e27]:
          - generic [ref=e28]: Note for the seller
          - textbox "Note for the seller" [ref=e29]
          - paragraph [ref=e30]: Required when the reason is Other; at most 500 characters.
        - alert [ref=e31]: This listing no longer exists.
        - generic [ref=e32]:
          - button "Cancel" [ref=e33] [cursor=pointer]
          - button "Remove" [ref=e34] [cursor=pointer]
    - button "Close" [ref=e35] [cursor=pointer]:
      - img [ref=e36]
      - generic [ref=e39]: Close
```
```

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-131-an-imitating-name-is-refused-when-the-step-is-saved-mobile-360`

### post-wizard-resets.spec.ts › POSTING WIZARD › PW-166 a prefill the seller left goes with the old choice; one the seller changed stays when it fits and is cleared when it does not

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: PW-166: the draft after m2 is wrong

expect(received).toBe(expected) // Object.is equality

Expected: "e2e_r166_1791806693594_f58ixe_m2|e2e_r166_1791806693594_f58ixe_van|e2e_r166_1791806693594_f58ixe_t2"
Received: "e2e_r166_1791806693594_f58ixe_m1|e2e_r166_1791806693594_f58ixe_hatch|e2e_r166_1791806693594_f58ixe_t2"

Call Log:
- Test timeout of 60000ms exceeded
--- further error 1 ---
Error: PW-166: the draft after m2 is wrong

expect(received).toBe(expected) // Object.is equality

Expected: "e2e_r166_1791806693594_f58ixe_m2|e2e_r166_1791806693594_f58ixe_van|e2e_r166_1791806693594_f58ixe_t2"
Received: "e2e_r166_1791806693594_f58ixe_m1|e2e_r166_1791806693594_f58ixe_hatch|e2e_r166_1791806693594_f58ixe_t2"

Call Log:
- Test timeout of 60000ms exceeded

  1467 |       "PW-166: a changed prefill that fits was lost",
  1468 |     ).toHaveValue(v("t2"));
> 1469 |     await expect
       |     ^
  1470 |       .poll(
  1471 |         async () => {
  1472 |           const row = await stored();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:1469:5
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-166-a-prefill-the-seller-left-goes-with-the-old-choice-one-the-seller-changed-stays-when-it-fits-and-is-cleared-when-it-does-not-mobile-360`

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list)

- Source: `shard 4`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-big-model-list-mobile-360`

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `shard 4`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-3')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-3')


  216 |
  217 |     // D39 — the category lands on specifications directly; no photos leg.
> 218 |     await expect(page.getByTestId("post-step-3")).toBeVisible();
      |                                                   ^
  219 |     // D41 — every row is open; the walk waits only for the form to settle.
  220 |     await specsSettled(page);
  221 |     return listingId;
    at reachStep3 (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:218:51)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:1355:23
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-28-a-conditional-detail-appears-only-when-its-condition-is-met-mobile-360`

### post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-84 a new post opens on the seller's own last post, never another seller's

- Source: `shard 4`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"category_id","reason":"categoryNotPostable"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  137 |       { token, country: "ET" },
  138 |     );
> 139 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
      |                                                                ^
  140 |     const listingId = String(draft.payload["listing_id"] ?? "");
  141 |     const published = await postRoute(page, PUBLISH, { listingId }, { token, country: "ET" });
  142 |     expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
    at publishedAt (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:139:64)
    at otherSellersActiveListing (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:332:25)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:225:5
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-84-a-new-post-opens-on-the-seller-s-own-last-post-never-another-seller-s-mobile-360`

### admin-attributes-library.spec.ts › C3 attributes console › AT-7 filter: a category narrows the library to its linked attributes (DB truth)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-5-1-mypri7')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-5-1-mypri7')

[dialog-dump findRow(e2e-cat-5-1-mypri7)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-5-1-mypri7) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-5-1-mypri7')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-5-1-mypri7')

[dialog-dump findRow(e2e-cat-5-1-mypri7)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-5-1-mypri7) after create] open dialogs: none

   at helpers/categories.ts:354

  352 |     await findRow(page, slug);
  353 |   } catch (error) {
> 354 |     throw new Error(`${error instanceof Error ? error.message : String(error)}\n${afterCreate}`);
      |           ^
```

Context: context file not found for `admin-attributes-library-C3-attributes-console-AT-7-filter-a-category-narrows-the-library-to-its-linked-attributes-DB-truth-desktop-1280`

### admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-75 the import preview names the holders of an unlinked question and a removed answer

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - generic [ref=e9]:
          - generic [ref=e10]: Definitions file
          - generic [ref=e11]: Optional — choose it only when the category links change.
          - button "Definitions file" [ref=e12]
          - generic [ref=e13]:
            - button "Choose Definitions file…" [ref=e14] [cursor=pointer]
            - generic [ref=e15]: definitions.csv
        - generic [ref=e16]:
          - generic [ref=e17]: Links file
          - generic [ref=e18]: Optional — choose it only when the category links change.
          - button "Links file" [ref=e19]
          - generic [ref=e20]:
            - button "Choose Links file…" [ref=e21] [cursor=pointer]
            - generic [ref=e22]: links.csv
      - button "Checking the files…" [disabled]
      - button "Discard" [ref=e24] [cursor=pointer]
    - button "Close" [ref=e25] [cursor=pointer]:
      - img [ref=e26]
      - generic [ref=e29]: Close
```
```

- admin-categories-console.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home · `desktop-1280` · source `shard 5` — body omitted: cap
- admin-categories-home.spec.ts › Bundle 7 category doors › CT-39 the badge sits on the home path, and Make primary moves it · `desktop-1280` · source `shard 5` — body omitted: cap
- post-wizard-resets.spec.ts › POSTING WIZARD › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer · `desktop-1280` · source `shard 8` — body omitted: cap
- post-wizard-specs.spec.ts › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288) · `desktop-1280` · source `shard 8` — body omitted: cap
- post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-128 a number typed before the phone library arrives is saved only once read · `mobile-360` · source `changed` — body omitted: cap
- post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-117 two sub-cities of one city both save and count as that one city · `mobile-360` · source `changed` — body omitted: cap
- post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-119 another seller's visible phone is never carried · `desktop-1280` · source `changed` — body omitted: cap

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

117 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 17 | shard 3, shard 4, shard 7, shard 8, changed |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>th<n>a: e<n>e_par_<n>qggky → e<n>e_chi_zl<n>zni` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-upsncr: e<n>e_par_<n>tsx → e<n>e_chi_u<n>x<n>tb` (quiet) | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>th<n>a: e<n>e_par_<n>qggky → e<n>e_chi_zl<n>zni ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-upsncr: e<n>e_par_<n>tsx → e<n>e_chi_u<n>x<n>tb ×1

Off the allowlist:

### listing not found

- Count: 17 · Sources: shard 3, shard 4, shard 7, shard 8, changed

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-12T11:55:13.732Z | 18.3 min |
| email | 2026-10-12T11:55:18.138Z | 0.3 min |
| shard 1 | 2026-10-12T11:55:19.662Z | 25.5 min |
| shard 2 | 2026-10-12T11:55:21.129Z | 27.8 min |
| shard 3 | 2026-10-12T11:55:19.193Z | 31.1 min |
| shard 4 | 2026-10-12T11:55:19.024Z | 34.6 min |
| shard 5 | 2026-10-12T11:55:07.164Z | 29.2 min |
| shard 6 | 2026-10-12T11:55:23.816Z | 23.9 min |
| shard 7 | 2026-10-12T11:55:29.216Z | 30.9 min |
| shard 8 | 2026-10-12T11:55:16.257Z | 31.3 min |
| changed | 2026-10-12T11:55:24.039Z | 17.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 136 | 64.6 min | shard 3, shard 7, changed |
| `post-wizard-specs.spec.ts` | 78 | 39.4 min | shard 4, shard 8 |
| `admin-listings.spec.ts` | 54 | 25.4 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 21.7 min | shard 4, shard 8 |
| `admin-screening.spec.ts` | 34 | 20.6 min | shard 2, shard 6 |
| `shell.spec.ts` | 336 | 20.1 min | smoke, shard 4, shard 8 |
| `post-wizard-category.spec.ts` | 46 | 18.7 min | shard 3, shard 7 |
| `post-wizard-where.spec.ts` | 32 | 17.9 min | shard 4, shard 8 |
| `admin-categories-lifecycle.spec.ts` | 50 | 15.3 min | shard 1, shard 5 |
| `feed-screens.spec.ts` | 28 | 15.3 min | shard 3, shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 14.3 min | shard 1, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 12.4 min | shard 3, shard 7 |
| `admin-attributes-links.spec.ts` | 32 | 12.2 min | shard 1, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 11.8 min | shard 3, shard 7 |
| `admin-categories-console.spec.ts` | 34 | 11.5 min | shard 1, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 11.1 min | shard 3, shard 7 |
| `admin-locations.spec.ts` | 38 | 10.0 min | shard 2, shard 6 |
| `auth-signout.spec.ts` | 44 | 9.7 min | smoke, shard 2, shard 6 |
| `posting-routes.spec.ts` | 52 | 9.2 min | shard 4, shard 8 |
| `admin-translations-console.spec.ts` | 42 | 9.1 min | shard 2, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 9.0 min | shard 1, shard 5 |
| `admin-attributes-safety.spec.ts` | 14 | 8.6 min | shard 1, shard 5 |
| `import-security.spec.ts` | 34 | 8.5 min | shard 3, shard 7 |
| `admin-users.spec.ts` | 26 | 8.3 min | shard 2, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 8.2 min | shard 4, shard 8 |
| `admin-attributes-editor.spec.ts` | 34 | 7.7 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 6.9 min | shard 2, shard 6 |
| `feed-index.spec.ts` | 28 | 6.8 min | shard 2, shard 6 |
| `admin-audit.spec.ts` | 14 | 5.9 min | shard 1, shard 5 |
| `viewing-place.spec.ts` | 22 | 5.8 min | shard 4, shard 8 |
| `feed-route.spec.ts` | 16 | 4.6 min | shard 2, shard 6 |
| `admin-categories-home.spec.ts` | 8 | 4.3 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 4.2 min | shard 4, shard 8 |
| `admin-countries.spec.ts` | 18 | 3.9 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 3.8 min | shard 2, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 3.2 min | shard 3, shard 7 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 3.0 min | shard 4, shard 8 |
| `mfa-stepup.spec.ts` | 18 | 2.9 min | shard 3, shard 7 |
| `admin-shell.spec.ts` | 10 | 2.8 min | shard 2, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 2.2 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 2.1 min | shard 1, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.7 min | shard 4, shard 8 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 4, shard 8 |
| `a11y.spec.ts` | 4 | 1.3 min | smoke |
| `post-wizard-recent.spec.ts` | 2 | 1.3 min | shard 4, shard 8 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 3, shard 7 |
| `i18n-coverage.spec.ts` | 8 | 1.0 min | shard 3, shard 7 |
| `locations-tree.spec.ts` | 8 | 0.8 min | shard 3, shard 7 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 4, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 3, shard 7 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 4, shard 8 |
| `settings.spec.ts` | 4 | 0.6 min | shard 4 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 4, shard 8 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 3, shard 7 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 4, shard 8 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 132.7 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | mobile-360 | 111.1 s |
| `admin-listings.spec.ts` › AL-13 Remove then Restore from the row: a reason first, then Removed, then Waiting for review | mobile-360 | 104.5 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | mobile-360 | 103.8 s |
| `admin-audit.spec.ts` › IMP-1 impersonation: super admin opens a read-only session and ends it | mobile-360 | 103.4 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 101.7 s |
| `post-wizard-resets.spec.ts` › PW-166 a prefill the seller left goes with the old choice; one the seller changed stays when it fits and is cleared when it does not | mobile-360 | 101.0 s |
| `post-wizard-resets.spec.ts` › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer | desktop-1280 | 99.6 s |
| `post-wizard-bundle2.spec.ts` › PW-119 another seller's visible phone is never carried | desktop-1280 | 96.4 s |
| `post-wizard-bundle2.spec.ts` › PW-128 a number typed before the phone library arrives is saved only once read | mobile-360 | 94.0 s |
| `post-wizard-specs.spec.ts` › PW-28 a conditional detail appears only when its condition is met | mobile-360 | 92.4 s |
| `admin-categories-console.spec.ts` › CT-6 retirement: a retired category leaves the active tree and keeps its listings home | desktop-1280 | 90.6 s |
| `post-wizard-specs.spec.ts` › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288) | desktop-1280 | 90.2 s |
| `admin-attributes-safety.spec.ts` › AT-75 the import preview names the holders of an unlinked question and a removed answer | mobile-360 | 87.4 s |
| `admin-attributes-safety.spec.ts` › AT-75 the import preview names the holders of an unlinked question and a removed answer | desktop-1280 | 86.6 s |
