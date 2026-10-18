# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39100812245
- Commit: `e03837b5af83584abcf3e90f21a4aa71514d3657`
- Attempt: 1
- Written (UTC): 2026-10-18T06:53:31.123Z
- Passed: 1903 · Skipped: 130 · Failed: 3
- Gating failures: 3 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 12
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-library.spec.ts › C3 attributes console › AT-10 Used by names the category the attribute was assigned to (DB truth) — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-links.spec.ts › C3 attributes console › AT-59 the link editor's Save reflects change, saved and error — Error: AT-59 the cell never reported Saved
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · feed-screens.spec.ts › FEED SCREENS › FS-12 on a phone three cards share a row and the invitation is the size of a card (D123) — Test timeout of 60000ms exceeded while running "afterEach" hook.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the admin shell renders no English fallback — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change — Test timeout of 60000ms exceeded while running "afterEach" hook.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-units.spec.ts › POSTING WIZARD — UNITS › PW-175 the price page asks the unit of sale above the quantity — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-library.spec.ts › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-links.spec.ts › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone — Error: {"error":"upstream unavailable"}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7c a no-factor identity is released with the hint — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-3 The ad's page: Open from the list, the status and dates, Reserved on and off (D173) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is held by the price page's unit — Test timeout of 60000ms exceeded while running "afterEach" hook.

## Flaky bodies (DEC-078)

### admin-attributes-library.spec.ts › C3 attributes console › AT-10 Used by names the category the attribute was assigned to (DB truth)

- Source: `shard 1`
- Project: `mobile-360`

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
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 504 ()
[client-error] console.error: Failed to load resource: the server responded with a status of 503 (Service Unavailable)
[client-error] HTTP 503 POST http://127.0.0.1:4173/api/admin/categories/suggest-icon ({"error":"server error"})
[client-error] HTTP 504 GET https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/user (upstream request timeout)
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
```

Context:

```text
      - generic:
        - button: Cancel
        - button [disabled]: Save
    - button:
      - img
      - generic: Close
  - dialog [ref=e3]:
    - heading "Two-factor verification required" [level=2] [ref=e4]
    - generic [ref=e5]:
      - paragraph [ref=e6]: Two-factor verification required
      - paragraph [ref=e7]: This action requires two-factor verification. Enter the current code from your authenticator app.
      - generic [ref=e8]: Six-digit code
      - textbox "Six-digit code" [active] [ref=e9]:
        - /placeholder: "123456"
      - button "Verify and continue" [disabled]
      - button "Cancel" [ref=e10] [cursor=pointer]
    - button "Close" [ref=e11] [cursor=pointer]:
      - img [ref=e12]
      - generic [ref=e15]: Close
```
```

### admin-attributes-links.spec.ts › C3 attributes console › AT-59 the link editor's Save reflects change, saved and error

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-59 the cell never reported Saved

expect(locator).toBeVisible() failed

Locator: getByTestId('category-attribute-cell-saved-allowed-e2e_attr_9wqwff')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - AT-59 the cell never reported Saved with timeout 20000ms
  - waiting for getByTestId('category-attribute-cell-saved-allowed-e2e_attr_9wqwff')

--- further error 1 ---
Error: AT-59 the cell never reported Saved

expect(locator).toBeVisible() failed

Locator: getByTestId('category-attribute-cell-saved-allowed-e2e_attr_9wqwff')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - AT-59 the cell never reported Saved with timeout 20000ms
  - waiting for getByTestId('category-attribute-cell-saved-allowed-e2e_attr_9wqwff')


  834 |         page.getByTestId(`category-attribute-cell-saved-allowed-${key}`),
  835 |         "AT-59 the cell never reported Saved",
> 836 |       ).toBeVisible({ timeout: 20_000 });
      |         ^
  837 |       await expect(save, "AT-59 Save stayed enabled after a clean save").toBeDisabled({
  838 |         timeout: 20_000,
```

Context:

```text
              - combobox [ref=e37]:
                - option "Always visible" [selected]
              - button "Save" [disabled]
          - generic [ref=e38]:
            - generic [ref=e39]: Order 0
            - button "Move up" [disabled]
            - button "Move down" [disabled]
            - button "Unlink" [ref=e40] [cursor=pointer]
      - generic [ref=e41]:
        - textbox "Search the library" [ref=e42]: e2e_attr_9wqwff
        - combobox "Add attribute" [ref=e43]:
          - option "Choose an attribute" [selected]
        - button "Add attribute" [disabled]
      - generic [ref=e44]:
        - paragraph [ref=e45]: Changes save as you go
        - button "Done" [ref=e46] [cursor=pointer]
    - button "Close" [ref=e47] [cursor=pointer]:
      - img [ref=e48]
      - generic [ref=e51]: Close
```
```

### feed-screens.spec.ts › FEED SCREENS › FS-12 on a phone three cards share a row and the invitation is the size of a card (D123)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded while running "afterEach" hook.
--- further error 1 ---
Test timeout of 60000ms exceeded while running "afterEach" hook.

  40 |   const branches: string[][] = [];
  41 |
> 42 |   test.afterEach(async () => {
     |        ^
  43 |     for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
  44 |     for (const slug of regions.splice(0)) await destroyLocation(slug);
  45 |     for (const branch of branches.splice(0)) await destroyCategoryBranch(branch);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-screens.spec.ts:42:8
```

Context:

```text
          - listitem [ref=e319]:
            - generic [ref=e320]: About
          - listitem [ref=e321]:
            - generic [ref=e322]: How it works
      - navigation "Help" [ref=e323]:
        - heading "Help" [level=2] [ref=e324]
        - list [ref=e325]:
          - listitem [ref=e326]:
            - generic [ref=e327]: Safety
          - listitem [ref=e328]:
            - generic [ref=e329]: Contact
      - navigation "Legal" [ref=e330]:
        - heading "Legal" [level=2] [ref=e331]
        - list [ref=e332]:
          - listitem [ref=e333]:
            - generic [ref=e334]: Terms
          - listitem [ref=e335]:
            - generic [ref=e336]: Privacy
    - paragraph [ref=e338]: © 2026 ethio.com — All rights reserved.
```
```

### i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the admin shell renders no English fallback

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('bottom-bar-account')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('bottom-bar-account')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('bottom-bar-account')
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for getByTestId('bottom-bar-account')


   at helpers/ui.ts:451

  449 |   //    prerequisite), unlike the signed-out "Sign in" link whose absence is
  450 |   //    also true mid-render.
> 451 |   await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
      |                                      ^
  452 |   // 3. Belt: the session is persisted, so a full navigation rehydrates it.
  453 |   await page.waitForFunction(
```

Context:

```text
          - listitem [ref=e87]:
            - generic [ref=e88]: About
          - listitem [ref=e89]:
            - generic [ref=e90]: How it works
      - navigation "Help" [ref=e91]:
        - heading "Help" [level=2] [ref=e92]
        - list [ref=e93]:
          - listitem [ref=e94]:
            - generic [ref=e95]: Safety
          - listitem [ref=e96]:
            - generic [ref=e97]: Contact
      - navigation "Legal" [ref=e98]:
        - heading "Legal" [level=2] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]:
            - generic [ref=e102]: Terms
          - listitem [ref=e103]:
            - generic [ref=e104]: Privacy
    - paragraph [ref=e106]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-21 a child detail shows only the chosen parent's options and clears on change

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded while running "afterEach" hook.
--- further error 1 ---
Test timeout of 60000ms exceeded while running "afterEach" hook.

  73 |   const walkMarks: string[] = [];
  74 |
> 75 |   test.afterEach(async ({ page }) => {
     |        ^
  76 |     // INC-323 — stop the page first, and wait out a save in flight, so none lands after the purge.
  77 |     await stopPageBeforePurge(page);
  78 |     const ladder = walkMarks.splice(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:75:8
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-21-a-child-detail-shows-only-the-chosen-parent-s-options-and-clears-on-change-mobile-360` — Playwright's name `post-wizard-specs-POSTING--59573-ptions-and-clears-on-change-mobile-360`; this run carried 12 context file(s); of the same spec: none

### post-wizard-units.spec.ts › POSTING WIZARD — UNITS › PW-175 the price page asks the unit of sale above the quantity

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:reap] category e2e-post-3-0-pxxd34 failed: update or delete on table "categories" violates foreign key constraint "listings_category_id_fkey" on table "listings"

   at helpers/posting.ts:227

  225 |  */
  226 | export function reapStep(label: string, error: { message: string } | null): void {
> 227 |   if (error) throw new Error(`[e2e:reap] ${label} failed: ${error.message}`);
      |                    ^
  228 | }
  229 |
  230 | export async function destroyPostableCategory(slug: string): Promise<void> {
    at reapStep (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:227:20)
    at destroyPostableCategory (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:247:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-units.spec.ts:36:46
--- further error 2 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-specs')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-specs')


  57 |     expect(listingId, "step 1 created no draft").not.toBe("");
  58 |     objects.push({ userId, listingId });
> 59 |     await expect(page.getByTestId("post-specs")).toBeVisible({ timeout: 20_000 });
     |                                                  ^
  60 |   }
  61 |
  62 |   test("PW-161 a number's unit reads in English, and in Amharic under Amharic", async ({
    at reachStep3 (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-units.spec.ts:59:50)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-units.spec.ts:129:5
```

Context:

```text
          - listitem [ref=e220]:
            - generic [ref=e221]: About
          - listitem [ref=e222]:
            - generic [ref=e223]: How it works
      - navigation "Help" [ref=e224]:
        - heading "Help" [level=2] [ref=e225]
        - list [ref=e226]:
          - listitem [ref=e227]:
            - generic [ref=e228]: Safety
          - listitem [ref=e229]:
            - generic [ref=e230]: Contact
      - navigation "Legal" [ref=e231]:
        - heading "Legal" [level=2] [ref=e232]
        - list [ref=e233]:
          - listitem [ref=e234]:
            - generic [ref=e235]: Terms
          - listitem [ref=e236]:
            - generic [ref=e237]: Privacy
    - paragraph [ref=e239]: © 2026 ethio.com — All rights reserved.
```
```

### admin-attributes-library.spec.ts › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
      - generic [ref=e33]:
        - generic [ref=e34]: Visible until
        - textbox "Visible until" [ref=e35]
      - generic [ref=e36]:
        - generic [ref=e37]: Hide in countries
        - generic [ref=e38]:
          - generic [ref=e39]:
            - checkbox "ET — Ethiopia" [ref=e40] [cursor=pointer]
            - generic [ref=e41]: ET — Ethiopia
          - generic [ref=e42]:
            - checkbox "US — United States" [ref=e43] [cursor=pointer]
            - generic [ref=e44]: US — United States
        - paragraph [ref=e45]: The category stays hidden in every country you tick; you can change this later.
      - generic [ref=e46]:
        - button "Cancel" [ref=e47] [cursor=pointer]
        - button "Save" [disabled]
    - button "Close" [ref=e48] [cursor=pointer]:
      - img [ref=e49]
      - generic [ref=e52]: Close
```
```

### admin-attributes-links.spec.ts › C3 attributes console › AT-29 an imported label_am is pending, silent when blank, and undone

- Source: `shard 4`
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

  227 |       const blank = `${DEF_HEADER}\r\n${v2(`${key},${key},,text,,,,1`)}\r\n`;
  228 |       const silent = await importPost(page, token, { mode: "preview", definitions: blank });
> 229 |       expect(silent.status, JSON.stringify(silent.payload)).toBe(200);
      |                                                             ^
  230 |       expect(
  231 |         (silent.payload["counts"] as Record<string, number>).changes,
  232 |         `AT-29 a blank am cell read as a change: ${JSON.stringify(silent.payload["counts"])}`,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-links.spec.ts:229:61
```

Context:

```text
          - listitem [ref=e1241]:
            - generic [ref=e1242]: About
          - listitem [ref=e1243]:
            - generic [ref=e1244]: How it works
      - navigation "Help" [ref=e1245]:
        - heading "Help" [level=2] [ref=e1246]
        - list [ref=e1247]:
          - listitem [ref=e1248]:
            - generic [ref=e1249]: Safety
          - listitem [ref=e1250]:
            - generic [ref=e1251]: Contact
      - navigation "Legal" [ref=e1252]:
        - heading "Legal" [level=2] [ref=e1253]
        - list [ref=e1254]:
          - listitem [ref=e1255]:
            - generic [ref=e1256]: Terms
          - listitem [ref=e1257]:
            - generic [ref=e1258]: Privacy
    - paragraph [ref=e1260]: © 2026 ethio.com — All rights reserved.
```
```

### mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7c a no-factor identity is released with the hint

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `mfa-stepup-FIX-SCAN-1-step-up-abort-MF-7c-a-no-factor-identity-is-released-with-the-hint-desktop-1280` — Playwright's name `mfa-stepup-FIX-SCAN-1-step-72382-y-is-released-with-the-hint-desktop-1280`; this run carried 12 context file(s); of the same spec: none

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-3 The ad's page: Open from the list, the status and dates, Reserved on and off (D173)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `my-listings-ad-MY-LISTINGS-one-ad-s-page-bundle-16-turn-3-MLA-3-The-ad-s-page-Open-from-the-list-the-status-and-dates-Reserved-on-and-off-D173-desktop-1280` — Playwright's name `my-listings-ad-MY-LISTINGS-61492-s-Reserved-on-and-off-D173--desktop-1280`; this run carried 12 context file(s); of the same spec: none

- post-wizard-specs.spec.ts › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range · `desktop-1280` · source `shard 6` — body omitted: cap
- post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-104 a unit settled by the type is held by the price page's unit · `desktop-1280` · source `shard 6` — body omitted: cap

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

111 line(s), 38 message(s): 3 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 9 | shard 2, shard 5 |
| `listing not found` | 8 | shard 3, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `auth upstream unavailable (<n>)` | 3 | shard 1, shard 4 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>vov<n>s: e<n>e_par_l<n>l → e<n>e_chi_<n>kgq<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jj<n>aq: e<n>e_par_fhm<n>k<n> → e<n>e_chi_mhaknw` (quiet) | 1 | shard 4 |
| `insert or update on table <q> violates foreign key constraint <q>` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×9 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>vov<n>s: e<n>e_par_l<n>l → e<n>e_chi_<n>kgq<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-jj<n>aq: e<n>e_par_fhm<n>k<n> → e<n>e_chi_mhaknw ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-17 the currency is preselected and searchable by name in one control ×2 · PW-177 a question removed while the form is open never blocks the next edits ×2 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-112 who: a new post opens with the last post's channels, stored on the draft  ×1 · PW-33 a region alone never lists itself; its city does (W6 R2) ×1 · PW-45 a declared swatch renders one ink, a two-tone and a pattern tile ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### auth upstream unavailable (<n>)

- Count: 3 · Sources: shard 1, shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AT-29 an imported label_am is pending, silent when blank, and undone ×2 · AT-29 an imported label_am is pending, silent when blank, and undone (retry #1) ×2 · AT-10 Used by names the category the attribute was assigned to (DB truth) ×1 · AT-59 the link editor's Save reflects change, saved and error ×1

```text
[WebServer] [ssr-error] /api/admin/categories/suggest-icon auth upstream unavailable (504)
```

### insert or update on table <q> violates foreign key constraint <q>

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AP-47 the in-page bar shows no scrollbar (INC-717) ×1 · AT-2 definitions: a scratch attribute is created and renamed (DB truth) ×1

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
| smoke | 2026-10-18T06:03:44.943Z | 17.2 min |
| email | 2026-10-18T06:03:45.630Z | 0.3 min |
| shard 1 | 2026-10-18T06:03:48.763Z | 45.7 min |
| shard 2 | 2026-10-18T06:03:51.892Z | 45.7 min |
| shard 3 | 2026-10-18T06:03:44.109Z | 38.1 min |
| shard 4 | 2026-10-18T06:03:46.945Z | 49.4 min |
| shard 5 | 2026-10-18T06:03:43.020Z | 39.1 min |
| shard 6 | 2026-10-18T06:03:50.055Z | 34.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 82 | 29.3 min | shard 3, shard 6 |
| `ad-page.spec.ts` | 66 | 29.3 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 66 | 23.6 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 20.2 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 17.5 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.2 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 15.6 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 15.0 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 14.8 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 14.5 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 13.6 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.5 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 66 | 13.1 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 30 | 13.1 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 13.0 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 13.0 min | shard 3, shard 6 |
| `ad-page-doors.spec.ts` | 30 | 12.0 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 52 | 11.4 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 11.2 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 56 | 11.1 min | smoke, shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 10.0 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 9.7 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.7 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.4 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 8.4 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 8.1 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.1 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 7.9 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.6 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 7.1 min | shard 2, shard 5 |
| `feed-route.spec.ts` | 22 | 6.9 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.5 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 18 | 6.4 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.9 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 5.6 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 4.5 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 4.0 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 3.2 min | shard 3, shard 6 |
| `posting-routes-dials.spec.ts` | 18 | 2.9 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.6 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.1 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.1 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 2.1 min | shard 1, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 1.9 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.5 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 1.4 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.8 min | smoke, shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.8 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-specs.spec.ts` › PW-21 a child detail shows only the chosen parent's options and clears on change | mobile-360 | 149.8 s |
| `post-wizard-where.spec.ts` › PW-104 a unit settled by the type is held by the price page's unit | desktop-1280 | 149.0 s |
| `admin-attributes-links.spec.ts` › AT-59 the link editor's Save reflects change, saved and error | mobile-360 | 139.1 s |
| `feed-screens.spec.ts` › FS-12 on a phone three cards share a row and the invitation is the size of a card (D123) | mobile-360 | 128.3 s |
| `admin-attributes-library.spec.ts` › AT-4 card picker: two ranked attributes clear the amber flag | desktop-1280 | 113.3 s |
| `admin-attributes-links.spec.ts` › AT-29 an imported label_am is pending, silent when blank, and undone | desktop-1280 | 112.1 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | desktop-1280 | 104.4 s |
| `admin-attributes-library.spec.ts` › AT-10 Used by names the category the attribute was assigned to (DB truth) | mobile-360 | 102.5 s |
| `my-listings-ad.spec.ts` › MLA-3 The ad's page: Open from the list, the status and dates, Reserved on and off (D173) | desktop-1280 | 96.7 s |
| `ad-page.spec.ts` › AP-45 the tabs on a wide screen | desktop-1280 | 88.7 s |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | mobile-360 | 83.8 s |
| `mfa-stepup.spec.ts` › MF-7c a no-factor identity is released with the hint | desktop-1280 | 82.7 s |
| `post-wizard-units.spec.ts` › PW-175 the price page asks the unit of sale above the quantity | mobile-360 | 82.5 s |
| `post-wizard-units.spec.ts` › PW-161 a number's unit reads in English, and in Amharic under Amharic | mobile-360 | 76.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | desktop-1280 | 59.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39100812245-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39100812245-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39100812245-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39100812245-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39100812245-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39100812245-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 39100812245-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39100812245-6
```

## import-security.spec.ts › IMPORT-GATE translations › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('mfa-status')
Expected: "Two-factor authentication is on"
Received: "Two-factor authentication is off"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('mfa-status')
    24 × locator resolved to <p data-testid="mfa-status" class="mt-3 text-sm font-medium text-foreground">Two-factor authentication is off</p>
       - unexpected value "Two-factor authentication is off"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('mfa-status')
Expected: "Two-factor authentication is on"
Received: "Two-factor authentication is off"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('mfa-status')
    24 × locator resolved to <p data-testid="mfa-status" class="mt-3 text-sm font-medium text-foreground">Two-factor authentication is off</p>
       - unexpected value "Two-factor authentication is off"


   at helpers/ui.ts:576

  574 |   await page.getByTestId("mfa-code").fill(totp(secret));
  575 |   await page.getByTestId("mfa-verify").click();
> 576 |   await expect(page.getByTestId("mfa-status")).toHaveText(en["mfa.statusOn"], { timeout: 20000 });
      |                                                ^
```

Context:

```text
          - listitem [ref=e258]:
            - generic [ref=e259]: About
          - listitem [ref=e260]:
            - generic [ref=e261]: How it works
      - navigation "Help" [ref=e262]:
        - heading "Help" [level=2] [ref=e263]
        - list [ref=e264]:
          - listitem [ref=e265]:
            - generic [ref=e266]: Safety
          - listitem [ref=e267]:
            - generic [ref=e268]: Contact
      - navigation "Legal" [ref=e269]:
        - heading "Legal" [level=2] [ref=e270]
        - list [ref=e271]:
          - listitem [ref=e272]:
            - generic [ref=e273]: Terms
          - listitem [ref=e274]:
            - generic [ref=e275]: Privacy
    - paragraph [ref=e277]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-36 the layout follows the article's width (DEC-192, drawings v13)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 134
Received:    -52.109375
--- further error 1 ---
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 134
Received:    -52.109375

  918 |         expect(near(description.height, details.height, 1)).toBe(true);
  919 |         expect(near(description.width, details.width, 1)).toBe(true);
> 920 |         expect(details.y).toBeGreaterThanOrEqual(nav.y + nav.height);
      |                           ^
  921 |         expect(near(sellerBox.x, article.x, 1)).toBe(true);
  922 |         expect(near(sellerBox.width, details.width, 1)).toBe(true);
  923 |         expect(near(sellerBox.y, location.y, 1)).toBe(true);
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:920:27)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:975:27
```

Context:

```text
          - listitem [ref=e362]:
            - generic [ref=e363]: About
          - listitem [ref=e364]:
            - generic [ref=e365]: How it works
      - navigation "Help" [ref=e366]:
        - heading "Help" [level=2] [ref=e367]
        - list [ref=e368]:
          - listitem [ref=e369]:
            - generic [ref=e370]: Safety
          - listitem [ref=e371]:
            - generic [ref=e372]: Contact
      - navigation "Legal" [ref=e373]:
        - heading "Legal" [level=2] [ref=e374]
        - list [ref=e375]:
          - listitem [ref=e376]:
            - generic [ref=e377]: Terms
          - listitem [ref=e378]:
            - generic [ref=e379]: Privacy
    - paragraph [ref=e381]: © 2026 ethio.com — All rights reserved.
```
```

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-45 the tabs on a wide screen

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).not.toHaveAttribute(expected) failed

Locator:  getByTestId('listing-section-nav').locator('[data-target="details"]')
Expected: not "true"
Received: "true"
Timeout:  10000ms

Call log:
  - Expect "not toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-section-nav').locator('[data-target="details"]')
    14 × locator resolved to <button type="button" aria-current="true" data-target="details" data-testid="listing-section-nav-item" class="inline-flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 py-2 min-h-11 flex-1 justify-center rounded-none borde…>Details</button>
       - unexpected value "true"

--- further error 1 ---
Error: expect(locator).not.toHaveAttribute(expected) failed

Locator:  getByTestId('listing-section-nav').locator('[data-target="details"]')
Expected: not "true"
Received: "true"
Timeout:  10000ms

Call log:
  - Expect "not toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('listing-section-nav').locator('[data-target="details"]')
    14 × locator resolved to <button type="button" aria-current="true" data-target="details" data-testid="listing-section-nav-item" class="inline-flex items-center gap-2 text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 py-2 min-h-11 flex-1 justify-center rounded-none borde…>Details</button>
       - unexpected value "true"


  1483 |         "true",
  1484 |       );
> 1485 |       await expect(bar.locator('[data-target="details"]')).not.toHaveAttribute(
       |                                                                ^
  1486 |         "aria-current",
  1487 |         "true",
```

Context:

```text
          - listitem [ref=e355]:
            - generic [ref=e356]: About
          - listitem [ref=e357]:
            - generic [ref=e358]: How it works
      - navigation "Help" [ref=e359]:
        - heading "Help" [level=2] [ref=e360]
        - list [ref=e361]:
          - listitem [ref=e362]:
            - generic [ref=e363]: Safety
          - listitem [ref=e364]:
            - generic [ref=e365]: Contact
      - navigation "Legal" [ref=e366]:
        - heading "Legal" [level=2] [ref=e367]
        - list [ref=e368]:
          - listitem [ref=e369]:
            - generic [ref=e370]: Terms
          - listitem [ref=e371]:
            - generic [ref=e372]: Privacy
    - paragraph [ref=e374]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
[WebServer] [ssr-error] /api/admin/translations/import strings unknownColumn
[WebServer] [ssr-error] /api/admin/translations/import strings tooManyRows
[WebServer] [ssr-error] /api/admin/translations/import strings nulByte
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

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Cf9_I1dw.js:30219:25) at http://127.0.0.1:4173/assets/index-Cf9_I1dw.js:30253:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Cf9_I1dw.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cf9_I1dw.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cf9_I1dw.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cf9_I1dw.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cf9_I1dw.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cf9_I1dw.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cf9_I1dw.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cf9_I1dw.js:6028:5)
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/listings/view insert or update on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/categories/suggest-icon auth upstream unavailable (504)
[WebServer] [ssr-error] /api/admin/attributes/import auth upstream unavailable (504)
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-6-jj56aq: e2e_par_fhm6k5 → e2e_chi_mhaknw
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).
