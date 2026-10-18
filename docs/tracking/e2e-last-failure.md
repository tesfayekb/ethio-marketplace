# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39099449802
- Commit: `e3e364bc042b0df6d67268d62eceb10f8b82127f`
- Attempt: 1
- Written (UTC): 2026-10-18T06:02:20.192Z
- Passed: 1892 · Skipped: 130 · Failed: 16
- Gating failures: 16 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 10
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-links.spec.ts › C3 attributes console › AT-42 toggling Required keeps the card rank and never loses the link — Error: Timeout 20000ms exceeded while waiting on the predicate
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-links.spec.ts › C3 attributes console › AT-66 the link editor saves and reopens a two-pair condition — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · feed-screens.spec.ts › FEED SCREENS › FS-12 on a phone three cards share a row and the invitation is the size of a card (D123) — Error: expect(received).toEqual(expected) // deep equality
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · import-security.spec.ts › IMPORT-GATE locations-countries › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited — TimeoutError: page.waitForFunction: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference) — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-76b the link editor refuses a condition on the upper question naming the lower one, and accepts the reverse — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-77 an import whose end state asks a child first is refused whole at the commit — Error: [e2e:setup] POST /token?grant_type=password failed (504): upstream request timeout
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) — Error: PW-61: Undo did not restore the title
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) — Error: expect(locator).toHaveAttribute(expected) failed

## Flaky bodies (DEC-078)

### admin-attributes-links.spec.ts › C3 attributes console › AT-42 toggling Required keeps the card rank and never loses the link

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: Timeout 20000ms exceeded while waiting on the predicate

  624 |       await page.getByTestId(`category-attribute-card-${key}`).click();
  625 |       await stepUpIfPrompted(page, secret);
> 626 |       await expect
      |       ^
  627 |         .poll(async () => (await readLinks(scratch!.id))[0]?.card_rank ?? null, { timeout: 20000 })
  628 |         .not.toBeNull();
  629 |       const before = (await readLinks(scratch!.id))[0]!;
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-links.spec.ts:626:7
```

Context:

```text
              - combobox [ref=e32]:
                - option "Always visible" [selected]
              - button "Save" [disabled]
          - generic [ref=e33]:
            - generic [ref=e34]: Order 0
            - button "Move up" [disabled]
            - button "Move down" [disabled]
            - button "Unlink" [ref=e35] [cursor=pointer]
      - generic [ref=e36]:
        - textbox "Search the library" [ref=e37]: e2e_attr_njp6wz
        - combobox "Add attribute" [ref=e38]:
          - option "Choose an attribute" [selected]
        - button "Add attribute" [disabled]
      - generic [ref=e39]:
        - paragraph [ref=e40]: Changes save as you go
        - button "Done" [ref=e41] [cursor=pointer]
    - button "Close" [ref=e42] [cursor=pointer]:
      - img [ref=e43]
      - generic [ref=e46]: Close
```
```

### admin-attributes-links.spec.ts › C3 attributes console › AT-66 the link editor saves and reopens a two-pair condition

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-attribute-cell-saved-condition-e2e_attr_oq6ztr')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-attribute-cell-saved-condition-e2e_attr_oq6ztr')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('category-attribute-cell-saved-condition-e2e_attr_oq6ztr')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('category-attribute-cell-saved-condition-e2e_attr_oq6ztr')


  1476 |       await page.getByTestId(`category-attribute-save-condition-${id}`).click();
  1477 |       await stepUpIfPrompted(page, secret);
> 1478 |       await expect(page.getByTestId(`category-attribute-cell-saved-condition-${id}`)).toBeVisible({
       |                                                                                       ^
  1479 |         timeout: 20_000,
  1480 |       });
  1481 |       await expect
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-links.spec.ts:1478:87
```

Context:

```text
          - option "Toy Type (toy_type)"
          - option "Transmission (transmission-cars)"
          - option "Transmission (transmission-vehicles)"
          - option "Utilities Available (utilities_available)"
          - option "Warranty (warranty)"
          - option "Water Type (water_type)"
          - option "Weight Capacity (weight_capacity)"
          - option "Clothing Type (womens_clothing_type)"
          - option "Size (womens_size)"
          - option "Year (year)"
          - option "Year Built (year_built)"
          - option "Zoning / Land Use (zoning)"
        - button "Add attribute" [disabled]
      - generic [ref=e122]:
        - paragraph [ref=e123]: Changes save as you go
        - button "Done" [ref=e124] [cursor=pointer]
    - button "Close" [ref=e125] [cursor=pointer]:
      - img [ref=e126]
      - generic [ref=e129]: Close
```
```

### feed-screens.spec.ts › FEED SCREENS › FS-12 on a phone three cards share a row and the invitation is the size of a card (D123)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 3
+ Received  + 1

- Array [
-   "52415db8-d9ec-4904-8221-baa7a8fd74bc",
- ]
+ Array []

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 3
+ Received  + 1

- Array [
-   "52415db8-d9ec-4904-8221-baa7a8fd74bc",
- ]
+ Array []

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  486 |     await openArea(page, fx, baseURL!);
  487 |
> 488 |     await expect.poll(() => sectionIds(page, 1)).toEqual([a1]);
      |     ^
  489 |     const row = await page.locator('[data-testid="feed-section"][data-step="1"] ul').boundingBox();
  490 |     const card = await page
  491 |       .locator(`[data-testid="listing-card"][data-listing="${a1}"]`)
```

Context:

```text
          - listitem [ref=e285]:
            - generic [ref=e286]: About
          - listitem [ref=e287]:
            - generic [ref=e288]: How it works
      - navigation "Help" [ref=e289]:
        - heading "Help" [level=2] [ref=e290]
        - list [ref=e291]:
          - listitem [ref=e292]:
            - generic [ref=e293]: Safety
          - listitem [ref=e294]:
            - generic [ref=e295]: Contact
      - navigation "Legal" [ref=e296]:
        - heading "Legal" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - generic [ref=e300]: Terms
          - listitem [ref=e301]:
            - generic [ref=e302]: Privacy
    - paragraph [ref=e304]: © 2026 ethio.com — All rights reserved.
```
```

### import-security.spec.ts › IMPORT-GATE locations-countries › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
TimeoutError: page.waitForFunction: Timeout 15000ms exceeded.
--- further error 1 ---
TimeoutError: page.waitForFunction: Timeout 15000ms exceeded.

   at helpers/ui.ts:539

  537 |   // the header renders its auth branch asynchronously; an instantaneous count
  538 |   // is a race (INC-074 addendum).
> 539 |   await page.waitForFunction(
      |              ^
  540 |     ([enSignIn, amSignIn]) => {
  541 |       const accountMenu = document.querySelector('[data-testid="account-menu"]');
  542 |       if (accountMenu && accountMenu.isConnected) return true;
    at switchUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:539:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/import-security.spec.ts:804:7
```

Context:

```text
          - listitem [ref=e91]:
            - generic [ref=e92]: About
          - listitem [ref=e93]:
            - generic [ref=e94]: How it works
      - navigation "Help" [ref=e95]:
        - heading "Help" [level=2] [ref=e96]
        - list [ref=e97]:
          - listitem [ref=e98]:
            - generic [ref=e99]: Safety
          - listitem [ref=e100]:
            - generic [ref=e101]: Contact
      - navigation "Legal" [ref=e102]:
        - heading "Legal" [level=2] [ref=e103]
        - list [ref=e104]:
          - listitem [ref=e105]:
            - generic [ref=e106]: Terms
          - listitem [ref=e107]:
            - generic [ref=e108]: Privacy
    - paragraph [ref=e110]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `shard 3`
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


   at helpers/ui.ts:509

  507 |   // ids here, not surface later as an inexplicable permission assertion.
  508 |   await assertInjectedIdentity(page, session);
> 509 |   await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
      |                                      ^
  510 |   await page.waitForFunction(
  511 |     () => Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("auth-token")),
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-5-the-specification-form-is-generated-its-options-load-on-the-first-tap-and-an-empty-required-detail-is-refused-under-it-mobile-360` — Playwright's name `post-wizard-specs-POSTING--44a2d--detail-is-refused-under-it-mobile-360`; this run carried 16 context file(s); of the same spec: none

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference)

- Source: `shard 3`
- Project: `mobile-360`

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


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
  154 |       // AUTO-ADVANCE: the leaf IS the answer; D39 — specifications open next.
  155 |       await expect(page.getByTestId("post-step-3")).toBeVisible();
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-77-the-first-refused-field-s-label-lands-below-the-header-D2-no-preference-mobile-360` — Playwright's name `post-wizard-specs-POSTING--ebaac-he-header-D2-no-preference--mobile-360`; this run carried 16 context file(s); of the same spec: none

### admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-76b the link editor refuses a condition on the upper question naming the lower one, and accepts the reverse

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_update_attribute_link ({"code":"P0010","details":null,"hint":null,"message":"admin.attributes.error.parentAfterChild:e2e-cat-4-1-cvcx2n: e2e_low_35vwa3 → e2e_up_974pv1"})
```

Context:

```text
          - option "Toy Type (toy_type)"
          - option "Transmission (transmission-cars)"
          - option "Transmission (transmission-vehicles)"
          - option "Utilities Available (utilities_available)"
          - option "Warranty (warranty)"
          - option "Water Type (water_type)"
          - option "Weight Capacity (weight_capacity)"
          - option "Clothing Type (womens_clothing_type)"
          - option "Size (womens_size)"
          - option "Year (year)"
          - option "Year Built (year_built)"
          - option "Zoning / Land Use (zoning)"
        - button "Add attribute" [disabled]
      - generic [ref=e81]:
        - paragraph [ref=e82]: Changes save as you go
        - button "Done" [ref=e83] [cursor=pointer]
    - button "Close" [ref=e84] [cursor=pointer]:
      - img [ref=e85]
      - generic [ref=e88]: Close
```
```

### admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-77 an import whose end state asks a child first is refused whole at the commit

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
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-safety.spec.ts:485:24
```

Context: context file not found for `admin-attributes-safety-Bundle-7-attribute-safety-AT-77-an-import-whose-end-state-asks-a-child-first-is-refused-whole-at-the-commit-desktop-1280` — Playwright's name `admin-attributes-safety-Bu-667ec-refused-whole-at-the-commit-desktop-1280`; this run carried 16 context file(s); of the same spec: `admin-attributes-safety-Bu-aac42-nswer-a-type-change-removes-mobile-360`, `admin-attributes-safety-Bu-23ac4-one-and-accepts-the-reverse-desktop-1280`

### post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-61: Undo did not restore the title

expect(received).toBe(expected) // Object.is equality

Expected: "e2e d59 title"
Received: ""

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: PW-61: Undo did not restore the title

expect(received).toBe(expected) // Object.is equality

Expected: "e2e d59 title"
Received: ""

Call Log:
- Timeout 10000ms exceeded while waiting on the predicate

  552 |       typedValue,
  553 |     );
> 554 |     await expect
      |     ^
  555 |       .poll(async () => (await textOf(listingId)).title, {
  556 |         message: "PW-61: Undo did not restore the title",
  557 |       })
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:554:5
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-61-a-category-change-resets-details-title-description-and-price-and-Undo-within-ten-seconds-restores-them-D59-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-e57e3--seconds-restores-them-D59--desktop-1280`; this run carried 16 context file(s); of the same spec: none

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_trip_desktop1280_0_1792301453490_model"]')
Expected: "ready"
Received: "loading"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_trip_desktop1280_0_1792301453490_model"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_trip_desktop1280_0_1792301453490_model" id="post-attr-e2e_trip_desktop1280_0_1792301453490_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "loading"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_trip_desktop1280_0_1792301453490_model"]')
Expected: "ready"
Received: "loading"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_trip_desktop1280_0_1792301453490_model"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_trip_desktop1280_0_1792301453490_model" id="post-attr-e2e_trip_desktop1280_0_1792301453490_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "loading"


   997 |       await expect(model).toBeEnabled();
   998 |       await model.focus();
>  999 |       await expect(model).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
       |                           ^
  1000 |       await model.selectOption(chosenModel);
  1001 |       await expect(control("doors")).toHaveValue("3", { timeout: 20_000 });
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-big-model-list-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--c2c01-wer-INC-329-big-model-list--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

114 line(s), 38 message(s): 3 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 11 | shard 3, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `auth upstream unavailable (<n>)` | 2 | shard 6 |
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
| `canceling statement due to lock timeout` | 1 | shard 6 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-adexr<n>: e<n>e_par_tjzykf → e<n>e_chi_<n>yy<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-hm<n>lj: e<n>e_par_puu<n>wv → e<n>e_chi_<n>mnx<n>o` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-adexr<n>: e<n>e_par_tjzykf → e<n>e_chi_<n>yy<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-hm<n>lj: e<n>e_par_puu<n>wv → e<n>e_chi_<n>mnx<n>o ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · location row is present on Marketplace and absent on Account ×1 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-138 a required unit left empty is refused on the price page's Next, not on th ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### auth upstream unavailable (<n>)

- Count: 2 · Sources: shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-28 a conditional detail appears only when its condition is met (retry #1) ×2 · PW-84 a new post opens on the seller's own last post, never another seller's (re ×2

```text
[WebServer] [ssr-error] /api/attributes/ff42ddc0-0c2c-4b79-ae57-608e17375535/options auth upstream unavailable (504)
```

### canceling statement due to lock timeout

- Count: 1 · Sources: shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-166 a prefill the seller left goes with the old choice; one the seller change ×1 · PW-74 a step-3 round trip keeps every answer (INC-329, big model list) ×1

```text
[WebServer] [ssr-error] /api/attributes/8c7dd217-840e-49c1-a75c-df85f386cba8/options canceling statement due to lock timeout
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-18T05:12:48.051Z | 16.3 min |
| email | 2026-10-18T05:12:51.080Z | 0.2 min |
| shard 1 | 2026-10-18T05:12:57.756Z | 49.0 min |
| shard 2 | 2026-10-18T05:12:47.715Z | 39.7 min |
| shard 3 | 2026-10-18T05:13:01.530Z | 43.9 min |
| shard 4 | 2026-10-18T05:12:49.831Z | 44.9 min |
| shard 5 | 2026-10-18T05:12:48.714Z | 40.1 min |
| shard 6 | 2026-10-18T05:12:55.340Z | 42.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 82 | 35.3 min | shard 3, shard 6 |
| `ad-page.spec.ts` | 66 | 27.7 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 66 | 22.4 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 20.0 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 19.5 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 18.7 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 18.3 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 18.2 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 17.5 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 16.7 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 16.5 min | shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 16.2 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 66 | 14.6 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 14.2 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 13.5 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.3 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 11.0 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 52 | 10.8 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 10.4 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 9.9 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 30 | 9.8 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.2 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.1 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 8.5 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.2 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.8 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 38 | 7.6 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 7.4 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 7.1 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 7.0 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 7.0 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 6.6 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 5.9 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 5.8 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 5.4 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 18 | 4.1 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 3.2 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 2.7 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.7 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 2.2 min | shard 1, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.1 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.5 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.5 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.0 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.8 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.8 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
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
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 196.6 s |
| `my-listings-ad.spec.ts` › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659) | desktop-1280 | 180.3 s |
| `post-wizard-specs.spec.ts` › PW-19 the seller's own phrase survives into the suggestion | mobile-360 | 164.3 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 161.7 s |
| `admin-attributes-links.spec.ts` › AT-66 the link editor saves and reopens a two-pair condition | mobile-360 | 159.1 s |
| `my-listings-ad.spec.ts` › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it | mobile-360 | 150.2 s |
| `post-wizard-specs.spec.ts` › PW-28 a conditional detail appears only when its condition is met | desktop-1280 | 147.2 s |
| `my-listings-doors.spec.ts` › ML-14 edit_my_listing: places and contact apply at once, the first place the ad's own; the written directions go to review (D187) | mobile-360 | 142.3 s |
| `post-wizard-where.spec.ts` › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place | mobile-360 | 130.1 s |
| `admin-audit.spec.ts` › IMP-3 server refusals: self and a super-admin target | desktop-1280 | 120.8 s |
| `post-wizard-resets.spec.ts` › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59) | desktop-1280 | 116.0 s |
| `admin-attributes-safety.spec.ts` › AT-81 the editor names the listings holding an answer a type change removes | mobile-360 | 107.4 s |
| `admin-attributes-safety.spec.ts` › AT-76b the link editor refuses a condition on the upper question naming the lower one, and accepts the reverse | desktop-1280 | 105.3 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 86.8 s |
| `photo-pipeline.spec.ts` › PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613) | desktop-1280 | 84.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39099449802-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39099449802-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 12 user(s) owned by process 39099449802-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 38 (pool 4, fresh 34)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 51 user(s) owned by process 39099449802-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39099449802-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39099449802-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 32 (pool 4, fresh 28)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 42 user(s) owned by process 39099449802-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39099449802-6
```

## admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-81 the editor names the listings holding an answer a type change removes

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e269]:
            - generic [ref=e270]: About
          - listitem [ref=e271]:
            - generic [ref=e272]: How it works
      - navigation "Help" [ref=e273]:
        - heading "Help" [level=2] [ref=e274]
        - list [ref=e275]:
          - listitem [ref=e276]:
            - generic [ref=e277]: Safety
          - listitem [ref=e278]:
            - generic [ref=e279]: Contact
      - navigation "Legal" [ref=e280]:
        - heading "Legal" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - generic [ref=e284]: Terms
          - listitem [ref=e285]:
            - generic [ref=e286]: Privacy
    - paragraph [ref=e288]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-17 INC-658: in the Edit's Place, a country change with no city closes Save changes; a tap says Choose a city; a city opens it; Save writes it

- Source: `shard 2`
- Project: `mobile-360`

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

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-14 edit_my_listing: places and contact apply at once, the first place the ad's own; the written directions go to review (D187)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
SyntaxError: Unexpected token 'u', "upstream r"... is not valid JSON

   at helpers/session.ts:91

  89 |     body: JSON.stringify({ email, password }),
  90 |   });
> 91 |   const body = (await response.json()) as Record<string, unknown>;
     |                 ^
  92 |   if (!response.ok || typeof body["access_token"] !== "string") {
  93 |     throw new Error(
  94 |       `[e2e:session] password grant failed for ${email} (HTTP ${response.status}): ` +
    at passwordGrant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:91:17)
    at asPerson (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:92:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:1170:16
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-14-edit_my_listing-places-and-contact-apply-at-once-the-first-place-the-ad-s-own-the-written-directions-go-to-review-D187-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-d27e2-rections-go-to-review-D187--mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-places')
Expected substring: "Adama"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-places')

--- further error 1 ---
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-places')
Expected substring: "Adama"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-places')


  647 |     // city shows in the sheet's place line (INC-721).
  648 |     await expect(sheet.getByTestId("listing-detail-location")).toHaveCount(0);
> 649 |     await expect(sheet.getByTestId("listing-detail-places")).toContainText(cityName);
      |                                                              ^
  650 |     await expect(sheet.getByTestId("listing-section-nav")).toHaveCount(0);
  651 |     await page.getByTestId("post-preview-close").click();
  652 |     await expect(sheet, "PW-13: the preview sheet would not close").toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:649:62
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-mobile-360` — Playwright's name `post-wizard-place-POSTING--4521b-ands-in-review-—-never-live-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')


  188 |   async function nextThroughPhotos(page: import("@playwright/test").Page) {
  189 |     await page.getByTestId("post-next").click();
> 190 |     await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                   ^
  191 |     await page.getByTestId("post-next").click();
  192 |   }
  193 |
    at nextThroughPhotos (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:190:51)
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-19-the-seller-s-own-phrase-survives-into-the-suggestion-mobile-360` — Playwright's name `post-wizard-specs-POSTING--4f5a5-urvives-into-the-suggestion-mobile-360`; this run carried 16 context file(s); of the same spec: none

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-83 the ad's places: new heading, the single city box ticked, the ticked node is the item place

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: step-5 draft refused: {"ok":false,"refusals":[{"field":"category_id","reason":"categoryNotPostable"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  116 |       { token, country: "ET" },
  117 |     );
> 118 |     expect(draft.payload["ok"], `step-5 draft refused: ${JSON.stringify(draft.payload)}`).toBe(
      |                                                                                           ^
  119 |       true,
  120 |     );
  121 |     const listingId = String(draft.payload["listing_id"] ?? "");
    at openAtStep6 (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:118:91)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:166:23
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-83-the-ad-s-places-new-heading-the-single-city-box-ticked-the-ticked-node-is-the-item-place-mobile-360` — Playwright's name `post-wizard-where-POSTING--ee489-cked-node-is-the-item-place-mobile-360`; this run carried 16 context file(s); of the same spec: none

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

  920 |         expect(near(description.height, details.height, 1)).toBe(true);
  921 |         expect(near(description.width, details.width, 1)).toBe(true);
> 922 |         expect(details.y).toBeGreaterThanOrEqual(nav.y + nav.height);
      |                           ^
  923 |         expect(near(sellerBox.x, article.x, 1)).toBe(true);
  924 |         expect(near(sellerBox.width, details.width, 1)).toBe(true);
  925 |         expect(near(sellerBox.y, location.y, 1)).toBe(true);
    at check (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:922:27)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:977:27
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


  1470 |         "true",
  1471 |       );
> 1472 |       await expect(bar.locator('[data-target="details"]')).not.toHaveAttribute(
       |                                                                ^
  1473 |         "aria-current",
  1474 |         "true",
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

## ad-page.spec.ts › AD PAGE — the buyer's page (bundle 19 turn 5) › AP-48 the thumbnails' arrows (INC-717, INC-720)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    30
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    30

  1674 |       expect(
  1675 |         Math.abs(moreBox.y + moreBox.height - (stripBox.y + stripBox.height)),
> 1676 |       ).toBeLessThanOrEqual(1);
       |         ^
  1677 |       await more.click();
  1678 |       await expect(page.getByTestId("gallery-strip-back")).toBeVisible();
  1679 |       await expect.poll(async () => strip.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page.spec.ts:1676:9
```

Context:

```text
          - listitem [ref=e349]:
            - generic [ref=e350]: About
          - listitem [ref=e351]:
            - generic [ref=e352]: How it works
      - navigation "Help" [ref=e353]:
        - heading "Help" [level=2] [ref=e354]
        - list [ref=e355]:
          - listitem [ref=e356]:
            - generic [ref=e357]: Safety
          - listitem [ref=e358]:
            - generic [ref=e359]: Contact
      - navigation "Legal" [ref=e360]:
        - heading "Legal" [level=2] [ref=e361]
        - list [ref=e362]:
          - listitem [ref=e363]:
            - generic [ref=e364]: Terms
          - listitem [ref=e365]:
            - generic [ref=e366]: Privacy
    - paragraph [ref=e368]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › IMP-3 server refusals: self and a super-admin target

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e824]:
            - generic [ref=e825]: About
          - listitem [ref=e826]:
            - generic [ref=e827]: How it works
      - navigation "Help" [ref=e828]:
        - heading "Help" [level=2] [ref=e829]
        - list [ref=e830]:
          - listitem [ref=e831]:
            - generic [ref=e832]: Safety
          - listitem [ref=e833]:
            - generic [ref=e834]: Contact
      - navigation "Legal" [ref=e835]:
        - heading "Legal" [level=2] [ref=e836]
        - list [ref=e837]:
          - listitem [ref=e838]:
            - generic [ref=e839]: Terms
          - listitem [ref=e840]:
            - generic [ref=e841]: Privacy
    - paragraph [ref=e843]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-15 Edit, complete: a second city and a channel apply at once from the Place and Contact steps; typed directions go to review; the pin map opens on the new city (D194, INC-659)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded while running "afterEach" hook.
--- further error 1 ---
Test timeout of 60000ms exceeded while running "afterEach" hook.

  182 |   const roles: string[] = [];
  183 |
> 184 |   test.afterEach(async () => {
      |        ^
  185 |     const supabase = adminClient();
  186 |     for (const roleId of roles.splice(0)) {
  187 |       const a = await supabase.from("role_permissions").delete().eq("role_id", roleId);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:184:8
```

Context:

```text
          - listitem [ref=e324]:
            - generic [ref=e325]: About
          - listitem [ref=e326]:
            - generic [ref=e327]: How it works
      - navigation "Help" [ref=e328]:
        - heading "Help" [level=2] [ref=e329]
        - list [ref=e330]:
          - listitem [ref=e331]:
            - generic [ref=e332]: Safety
          - listitem [ref=e333]:
            - generic [ref=e334]: Contact
      - navigation "Legal" [ref=e335]:
        - heading "Legal" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: Terms
          - listitem [ref=e340]:
            - generic [ref=e341]: Privacy
    - paragraph [ref=e343]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-12-edit_my_listing-refuses-what-a-box-may-not-change-an-ad-it-may-not-edit-and-another-seller-s-and-writes-nothing-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-db191-seller-s-and-writes-nothing-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-23 the gallery draws the middle size, and on a computer a wide photo's top meets the first thumbnail (D162, INC-613)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PP-23: on a computer the wide photo's top does not meet the first thumbnail's

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    51.5625

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: PP-23: on a computer the wide photo's top does not meet the first thumbnail's

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    51.5625

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  1301 |       // (object-fit contain, at its object-position), against the first thumbnail.
  1302 |       const first = gallery.getByTestId("gallery-thumb").nth(0);
> 1303 |       await expect
       |       ^
  1304 |         .poll(
  1305 |           async () => {
  1306 |             const drawnTop = await image.evaluate((element: HTMLImageElement) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1303:7
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-23-the-gallery-draws-the-middle-size-and-on-a-computer-a-wide-photo-s-top-meets-the-first-thumbnail-D162-INC-613-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-63be5-rst-thumbnail-D162-INC-613--desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-places')
Expected substring: "Adama"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-places')

--- further error 1 ---
Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('post-preview-sheet').getByTestId('listing-detail-places')
Expected substring: "Adama"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-places')


  647 |     // city shows in the sheet's place line (INC-721).
  648 |     await expect(sheet.getByTestId("listing-detail-location")).toHaveCount(0);
> 649 |     await expect(sheet.getByTestId("listing-detail-places")).toContainText(cityName);
      |                                                              ^
  650 |     await expect(sheet.getByTestId("listing-section-nav")).toHaveCount(0);
  651 |     await page.getByTestId("post-preview-close").click();
  652 |     await expect(sheet, "PW-13: the preview sheet would not close").toHaveCount(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:649:62
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-desktop-1280` — Playwright's name `post-wizard-place-POSTING--4521b-ands-in-review-—-never-live-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-28-a-conditional-detail-appears-only-when-its-condition-is-met-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--25a96-y-when-its-condition-is-met-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-84 a new post opens on the seller's own last post, never another seller's

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded while running "afterEach" hook.
--- further error 1 ---
Test timeout of 60000ms exceeded while running "afterEach" hook.

  69 |   const specs: string[] = [];
  70 |
> 71 |   test.afterEach(async ({ page }) => {
     |        ^
  72 |     await stopPageBeforePurge(page);
  73 |     for (const ref of objects.splice(0)) await purgeListingObjects(ref.userId, ref.listingId);
  74 |     for (const sellerId of sellers.splice(0)) await destroyListingsOf(sellerId);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:71:8
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-84-a-new-post-opens-on-the-seller-s-own-last-post-never-another-seller-s-desktop-1280` — Playwright's name `post-wizard-where-POSTING--f3e54-post-never-another-seller-s-desktop-1280`; this run carried 16 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-5-adexr6: e2e_par_tjzykf → e2e_chi_3yy498
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-11-hm97lj: e2e_par_puu2wv → e2e_chi_1mnx3o
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/begin_impersonation ({"code":"P0001","details":null,"hint":null,"message":"cannot impersonate yourself"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_update_attribute_link ({"code":"P0010","details":null,"hint":null,"message":"admin.attributes.error.parentAfterChild:e2e-cat-4-1-cvcx2n: e2e_low_35vwa3 → e2e_up_974pv1"})
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DEHO52pt.js:30219:25) at http://127.0.0.1:4173/assets/index-DEHO52pt.js:30253:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DEHO52pt.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DEHO52pt.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DEHO52pt.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DEHO52pt.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DEHO52pt.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DEHO52pt.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DEHO52pt.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DEHO52pt.js:6028:5)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/begin_impersonation ({"code":"P0001","details":null,"hint":null,"message":"cannot impersonate yourself"})
```

## Server errors: shard 5

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

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×3
[WebServer] [ssr-error] /api/attributes/8c7dd217-840e-49c1-a75c-df85f386cba8/options canceling statement due to lock timeout
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/attributes/ff42ddc0-0c2c-4b79-ae57-608e17375535/options auth upstream unavailable (504)
[WebServer] [ssr-error] /api/attributes/43112aed-50af-4d1a-81b5-af2ffbf58ba5/options auth upstream unavailable (504)
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
