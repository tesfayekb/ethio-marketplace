# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38241194130 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38241194130
- Commit: `a2bf184725bede7ed46c29ff5f2ac44f77f0b337`
- Attempt: 1
- Written (UTC): 2026-10-12T11:50:21.013Z
- Post-test warnings: 33
- Flaky (passed on retry, DEC-030, non-gating): 12

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-5 profile round trip: units, currency and order are saved and read back — Error: Timeout 20000ms exceeded while waiting on the predicate
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-console.spec.ts › U4b translations console › TR-23 machine translation keeps placeholders, and the editor repairs a mangled one — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-32 an import is undoable while nothing has touched the rows — Error: Timeout 20000ms exceeded while waiting on the predicate
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · settings.spec.ts › S-3 (U-4): wrong current password is rejected; correct one rotates the password — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · admin-categories-console.spec.ts › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · feed-index.spec.ts › FEED INDEX › FE-8 the tier sets the rank — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · post-wizard-place.spec.ts › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · post-wizard-place.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-41 the door refuses an answer the chosen options do not allow — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-33 the map fallback report is capped at 60 an hour per address — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-5 profile round trip: units, currency and order are saved and read back

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: Timeout 20000ms exceeded while waiting on the predicate

  230 |       await stepUpIfPrompted(page, secret);
  231 |
> 232 |       await expect
      |       ^
  233 |         .poll(async () => (await readCountry(code))?.unit_system, { timeout: 20000 })
  234 |         .toBe("imperial");
  235 |       const row = await readCountry(code);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:232:7
```

Context:

```text
          - listitem [ref=e301]:
            - generic [ref=e302]: About
          - listitem [ref=e303]:
            - generic [ref=e304]: How it works
      - navigation "Help" [ref=e305]:
        - heading "Help" [level=2] [ref=e306]
        - list [ref=e307]:
          - listitem [ref=e308]:
            - generic [ref=e309]: Safety
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Legal" [ref=e312]:
        - heading "Legal" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Terms
          - listitem [ref=e317]:
            - generic [ref=e318]: Privacy
    - paragraph [ref=e320]: © 2026 ethio.com — All rights reserved.
```
```

### admin-translations-console.spec.ts › U4b translations console › TR-23 machine translation keeps placeholders, and the editor repairs a mangled one

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
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

### admin-translations-governance.spec.ts › U4g bulk approval, order and orphans › TR-32 an import is undoable while nothing has touched the rows

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: Timeout 20000ms exceeded while waiting on the predicate

  1099 |       await expect(page.getByTestId("strings-undo-result")).toBeVisible({ timeout: 30000 });
  1100 |       await expect(page.getByTestId("strings-transfer-error")).toHaveCount(0);
> 1101 |       await expect
       |       ^
  1102 |         .poll(async () => `${await readRow(keyA)}::${await readRow(keyB)}`, {
  1103 |           timeout: 20000,
  1104 |           message: "the conflicted undo did not restore exactly one row",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-governance.spec.ts:1101:7
```

Context:

```text
          - listitem [ref=e984]:
            - generic [ref=e985]: About
          - listitem [ref=e986]:
            - generic [ref=e987]: How it works
      - navigation "Help" [ref=e988]:
        - heading "Help" [level=2] [ref=e989]
        - list [ref=e990]:
          - listitem [ref=e991]:
            - generic [ref=e992]: Safety
          - listitem [ref=e993]:
            - generic [ref=e994]: Contact
      - navigation "Legal" [ref=e995]:
        - heading "Legal" [level=2] [ref=e996]
        - list [ref=e997]:
          - listitem [ref=e998]:
            - generic [ref=e999]: Terms
          - listitem [ref=e1000]:
            - generic [ref=e1001]: Privacy
    - paragraph [ref=e1003]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [INC-562] step 5 did not come after Next. Saves (draft, identity): draft 200 after 682 ms, ok=true | draft 200 after 1328 ms, ok=true. Refusal lines shown: none.

   at helpers/posting.ts:2789

  2787 |       .allInnerTexts()
  2788 |       .catch(() => [] as string[]);
> 2789 |     throw new Error(
       |           ^
  2790 |       `[INC-562] step ${String(step)} did not come after Next. Saves (draft, identity): ${
  2791 |         answered.join(" | ") || "none answered"
  2792 |       }. Refusal lines shown: ${shown.join(" | ") || "none"}.`,
    at nextToStep (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:2789:11)
    at pricingToReview (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:341:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:477:5
[cause]: Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-5')
Expected: visible
Error: element(s) not found

```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-57-a-per-quintal-basis-keeps-the-period-once-and-reviews-as-a-price-per-quintal-mobile-360`

### settings.spec.ts › S-3 (U-4): wrong current password is rejected; correct one rotates the password

- Source: `shard 4`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: locator('form').filter({ has: locator('#current-password') }).getByRole('status')
Expected: "Your password has been changed."
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for locator('form').filter({ has: locator('#current-password') }).getByRole('status')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: locator('form').filter({ has: locator('#current-password') }).getByRole('status')
Expected: "Your password has been changed."
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for locator('form').filter({ has: locator('#current-password') }).getByRole('status')


  101 |   await again.fill(newPassword);
  102 |   await submit.click();
> 103 |   await expect(form.getByRole("status")).toHaveText(en["settings.passwordChanged"], {
      |                                          ^
  104 |     timeout: 15000,
  105 |   });
  106 |   await expect(form.getByRole("status")).toBeInViewport();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/settings.spec.ts:103:42
```

Context:

```text
          - listitem [ref=e238]:
            - generic [ref=e239]: About
          - listitem [ref=e240]:
            - generic [ref=e241]: How it works
      - navigation "Help" [ref=e242]:
        - heading "Help" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Safety
          - listitem [ref=e247]:
            - generic [ref=e248]: Contact
      - navigation "Legal" [ref=e249]:
        - heading "Legal" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Terms
          - listitem [ref=e254]:
            - generic [ref=e255]: Privacy
    - paragraph [ref=e257]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-console.spec.ts › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-5-0-ht8phg')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-5-0-ht8phg')

[dialog-dump findRow(e2e-cat-5-0-ht8phg)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-5-0-ht8phg) after create] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-5-0-ht8phg')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-5-0-ht8phg')

[dialog-dump findRow(e2e-cat-5-0-ht8phg)] open dialogs: none
[dialog-dump createViaUi(e2e-cat-5-0-ht8phg) after create] open dialogs: none

   at helpers/categories.ts:354

  352 |     await findRow(page, slug);
  353 |   } catch (error) {
> 354 |     throw new Error(`${error instanceof Error ? error.message : String(error)}\n${afterCreate}`);
      |           ^
```

Context:

```text
          - listitem [ref=e291]:
            - generic [ref=e292]: About
          - listitem [ref=e293]:
            - generic [ref=e294]: How it works
      - navigation "Help" [ref=e295]:
        - heading "Help" [level=2] [ref=e296]
        - list [ref=e297]:
          - listitem [ref=e298]:
            - generic [ref=e299]: Safety
          - listitem [ref=e300]:
            - generic [ref=e301]: Contact
      - navigation "Legal" [ref=e302]:
        - heading "Legal" [level=2] [ref=e303]
        - list [ref=e304]:
          - listitem [ref=e305]:
            - generic [ref=e306]: Terms
          - listitem [ref=e307]:
            - generic [ref=e308]: Privacy
    - paragraph [ref=e310]: © 2026 ethio.com — All rights reserved.
```
```

### feed-index.spec.ts › FEED INDEX › FE-8 the tier sets the rank

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 22
+ Received  +  1

- Array [
-   "00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000",
-   "00000000-0000-0000-0000-000000000000|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "00000000-0000-0000-0000-000000000000|1f366fca-727e-4c55-8717-37d7b810f8d9",
-   "00000000-0000-0000-0000-000000000000|589e34cf-ce15-4c2c-af81-0f9ed002a9c6",
-   "00000000-0000-0000-0000-000000000000|73ff3b4f-f2e2-4d9c-856e-e82799106a1f",
-   "8cce8d9e-9ce8-44ca-b95c-8679251cf15a|00000000-0000-0000-0000-000000000000",
-   "8cce8d9e-9ce8-44ca-b95c-8679251cf15a|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "8cce8d9e-9ce8-44ca-b95c-8679251cf15a|1f366fca-727e-4c55-8717-37d7b810f8d9",
-   "8cce8d9e-9ce8-44ca-b95c-8679251cf15a|589e34cf-ce15-4c2c-af81-0f9ed002a9c6",
-   "8cce8d9e-9ce8-44ca-b95c-8679251cf15a|73ff3b4f-f2e2-4d9c-856e-e82799106a1f",
-   "ade8272a-ed31-4b86-907c-3c24ebb86f95|00000000-0000-0000-0000-000000000000",
-   "ade8272a-ed31-4b86-907c-3c24ebb86f95|09fa1d9c-a82e-465c-8b73-40bd3e8e10ef",
-   "ade8272a-ed31-4b86-907c-3c24ebb86f95|1f366fca-727e-4c55-8717-37d7b810f8d9",
-   "ade8272a-ed31-4b86-907c-3c24ebb86f95|589e34cf-ce15-4c2c-af81-0f9ed002a9c6",
```

Context: context file not found for `feed-index-FEED-INDEX-FE-8-the-tier-sets-the-rank-desktop-1280`

### post-wizard-place.spec.ts › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged

- Source: `shard 7`
- Project: `desktop-1280`

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


  436 |     await page.getByTestId("post-price-mode-free").click();
  437 |     await page.getByTestId("post-next").click();
> 438 |     await expect(page.getByTestId("post-step-5")).toBeVisible();
      |                                                   ^
  439 |     await page.getByTestId("post-title").fill("e2e listing title");
  440 |     await page.getByTestId("post-description").fill("e2e listing description");
  441 |     await page.getByTestId("post-next").click();
    at reachStep7 (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:438:51)
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-112-who-a-new-post-opens-with-the-last-post-s-channels-stored-on-the-draft-unchanged-desktop-1280`

### post-wizard-place.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-7')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-7')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-7')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-7')


  444 |     await chooseOneCity(page);
  445 |     await page.getByTestId("post-next").click();
> 446 |     await expect(page.getByTestId("post-step-7")).toBeVisible();
      |                                                   ^
  447 |     return listingId;
  448 |   }
  449 |
    at reachStep7 (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:446:51)
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-desktop-1280`

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371)

- Source: `shard 7`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-category-search')


  150 |     expectSaved = true,
  151 |   ) {
> 152 |     await page.getByTestId("post-category-search").fill(slug);
      |                                                    ^
  153 |     const hit = page.locator(`[data-testid="post-category-hit"][data-category="${categoryId}"]`);
  154 |     await expect(hit).toBeVisible();
  155 |     await hit.click();
    at chooseBySearch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:152:52)
    at reachStep3 (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:204:11)
    at reachPricingWithBasis (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:326:23)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:432:5
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-108-an-Other-basis-names-the-seller-s-written-unit-INC-371-desktop-1280`

- posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-41 the door refuses an answer the chosen options do not allow · `desktop-1280` · source `shard 8` — body omitted: cap
- posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-33 the map fallback report is capped at 60 an hour per address · `desktop-1280` · source `shard 8` — body omitted: cap

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

113 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 5, shard 7 |
| `listing not found` | 12 | shard 3, shard 4, shard 7, shard 8 |
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
| `canceling statement due to statement timeout` | 1 | shard 7 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-j<n>pwbl: e<n>e_par_<n>aaa → e<n>e_chi_<n>r<n>kr<n>` (quiet) | 1 | shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-wvyy<n>q: e<n>e_par_dp<n>jbc → e<n>e_chi_q<n>dupa` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-j<n>pwbl: e<n>e_par_<n>aaa → e<n>e_chi_<n>r<n>kr<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-wvyy<n>q: e<n>e_par_dp<n>jbc → e<n>e_chi_q<n>dupa ×1

Off the allowlist:

### listing not found

- Count: 12 · Sources: shard 3, shard 4, shard 7, shard 8

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### canceling statement due to statement timeout

- Count: 1 · Sources: shard 7

```text
[WebServer] [ssr-error] /api/categories/tree canceling statement due to statement timeout
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-12T11:17:24.442Z | 17.0 min |
| email | 2026-10-12T11:18:17.157Z | 0.3 min |
| shard 1 | 2026-10-12T11:17:34.750Z | 27.0 min |
| shard 2 | 2026-10-12T11:17:29.593Z | 29.7 min |
| shard 3 | 2026-10-12T11:17:16.973Z | 28.4 min |
| shard 4 | 2026-10-12T11:17:17.842Z | 30.1 min |
| shard 5 | 2026-10-12T11:17:32.865Z | 30.0 min |
| shard 6 | 2026-10-12T11:18:47.434Z | 23.8 min |
| shard 7 | 2026-10-12T11:17:18.869Z | 28.7 min |
| shard 8 | 2026-10-12T11:17:25.912Z | 32.5 min |
| changed | 2026-10-12T11:17:22.963Z | 13.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 32.1 min | shard 4, shard 8 |
| `shell.spec.ts` | 504 | 32.1 min | smoke, shard 4, shard 8, changed |
| `admin-listings.spec.ts` | 54 | 26.7 min | shard 2, shard 5 |
| `post-wizard-bundle2.spec.ts` | 66 | 23.0 min | shard 3, shard 7 |
| `admin-categories-lifecycle.spec.ts` | 50 | 19.1 min | shard 1, shard 5 |
| `admin-screening.spec.ts` | 34 | 18.4 min | shard 2, shard 6 |
| `viewing-place.spec.ts` | 44 | 17.3 min | shard 4, shard 8, changed |
| `post-wizard-resets.spec.ts` | 34 | 17.1 min | shard 4, shard 8 |
| `post-wizard-pricing.spec.ts` | 50 | 17.1 min | shard 3, shard 7 |
| `post-wizard-place.spec.ts` | 38 | 16.9 min | shard 3, shard 7 |
| `post-wizard-where.spec.ts` | 32 | 15.4 min | shard 4, shard 8 |
| `post-wizard-category.spec.ts` | 46 | 14.8 min | shard 3, shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 13.8 min | shard 1, shard 5 |
| `posting-routes.spec.ts` | 52 | 12.5 min | shard 4, shard 8 |
| `feed-screens.spec.ts` | 28 | 12.4 min | shard 3, shard 7 |
| `admin-categories-console.spec.ts` | 34 | 12.2 min | shard 1, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 11.2 min | shard 1, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 10.9 min | shard 4, shard 8 |
| `admin-locations.spec.ts` | 38 | 10.4 min | shard 2, shard 6 |
| `admin-translations-console.spec.ts` | 42 | 10.3 min | shard 2, shard 6 |
| `auth-signout.spec.ts` | 44 | 10.1 min | smoke, shard 2, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 9.6 min | shard 1, shard 5 |
| `admin-users.spec.ts` | 26 | 8.4 min | shard 2, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 7.8 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.6 min | shard 2, shard 6 |
| `photo-pipeline.spec.ts` | 20 | 7.4 min | shard 3, shard 7 |
| `admin-translations-governance.spec.ts` | 16 | 7.3 min | shard 2, shard 6, changed |
| `admin-roles.spec.ts` | 26 | 7.2 min | shard 2, shard 6 |
| `import-security.spec.ts` | 34 | 6.6 min | shard 3, shard 7 |
| `admin-attributes-safety.spec.ts` | 14 | 6.5 min | shard 1, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 5.6 min | shard 4, shard 8 |
| `admin-countries.spec.ts` | 18 | 5.4 min | shard 1, shard 5 |
| `feed-route.spec.ts` | 16 | 5.3 min | shard 2, shard 6 |
| `admin-audit.spec.ts` | 14 | 5.1 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 3.9 min | shard 3, shard 7 |
| `admin-translations-data.spec.ts` | 8 | 3.7 min | shard 2, shard 6 |
| `admin-categories-home.spec.ts` | 8 | 3.5 min | shard 1, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 3.3 min | shard 3, shard 7 |
| `admin-shell.spec.ts` | 10 | 3.2 min | shard 2, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 3, shard 7 |
| `admin-coverage.spec.ts` | 14 | 2.6 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.5 min | shard 4, shard 8 |
| `settings.spec.ts` | 8 | 1.9 min | shard 4, changed |
| `post-wizard-units.spec.ts` | 4 | 1.6 min | shard 4, shard 8 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 4, shard 8 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 3, shard 7 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 3, shard 7 |
| `i18n-coverage.spec.ts` | 8 | 0.9 min | shard 3, shard 7 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 4, shard 8 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.8 min | shard 4, shard 8 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 3, shard 7 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 4, shard 8 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.6 min | shard 4, shard 8 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 3, shard 7 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 4, shard 8 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `posting-routes-catalog.spec.ts` › PR-41 the door refuses an answer the chosen options do not allow | desktop-1280 | 121.5 s |
| `admin-translations-governance.spec.ts` › TR-32 an import is undoable while nothing has touched the rows | mobile-360 | 114.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 106.2 s |
| `post-wizard-place.spec.ts` › PW-13 review: the preview shows what was answered, and Publish lands in review — never live | desktop-1280 | 95.3 s |
| `post-wizard-pricing.spec.ts` › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal | mobile-360 | 92.8 s |
| `post-wizard-pricing.spec.ts` › PW-108 an Other basis names the seller's written unit (INC-371) | desktop-1280 | 90.6 s |
| `posting-routes-dials.spec.ts` › PR-33 the map fallback report is capped at 60 an hour per address | desktop-1280 | 88.8 s |
| `feed-index.spec.ts` › FE-8 the tier sets the rank | desktop-1280 | 87.8 s |
| `admin-translations-console.spec.ts` › TR-23 machine translation keeps placeholders, and the editor repairs a mangled one | mobile-360 | 85.7 s |
| `admin-listings.spec.ts` › AL-3 An account with no listing right: All listings, the listing's page and Edit refuse it; nothing is written | desktop-1280 | 79.2 s |
| `post-wizard-place.spec.ts` › PW-30 review and buyer preview render option labels, units, multi-values and booleans | mobile-360 | 76.7 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 75.0 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 73.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 70.6 s |
| `feed-route.spec.ts` › FR-6 the answer is public and carries no seller | desktop-1280 | 70.5 s |
