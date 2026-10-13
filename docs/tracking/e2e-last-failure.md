# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38460460625
- Commit: `6181e584ea13ac39e4f3eb084d7cf3bfbf81dfea`
- Attempt: 1
- Written (UTC): 2026-10-13T21:04:33.417Z
- Passed: 1418 · Skipped: 126 · Failed: 194
- Gating failures: 194 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 13
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-22 Edit moves a listing to another category with Wrong category; the seller is told — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-category.spec.ts › POSTING WIZARD › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15) — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-place.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59) — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-resets.spec.ts › POSTING WIZARD › PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-159 a list fact ticks its tick list once, and the seller's untick stays — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-26 Undo this edit: the newest edit's before-values come back as a new edit with the reason Undo; the seller is told — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-screening.spec.ts › ADMIN SCREENING › SC-3 Reject keeps the ad off — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-103 required text, optional text and a list's Other text each save; an empty required text is refused by name — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-resets.spec.ts › POSTING WIZARD › PW-168 a chain: the brand changes, the model it no longer offers is cleared and what it filled goes; the seller's own colour stays — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-51 a dependent detail never renders above the answer it hangs on — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · posting-routes.spec.ts › POSTING ROUTES › PR-4 identity: the alias is saved, and a second seller cannot take it — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-22 Edit moves a listing to another category with Wrong category; the seller is told

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('listing-notice')
Expected: "Saved. The seller is told what changed: Category."
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-notice')


  1564 |     await form.getByTestId("listing-edit-reason-wrong_category").click();
  1565 |     await form.getByTestId("listing-edit-save").click();
> 1566 |     await expect(page.getByTestId("listing-notice")).toHaveText(
       |                                                      ^
  1567 |       en["admin.listings.edit.done"].replace("{fields}", en["admin.listings.col.category"]),
  1568 |       { timeout: 20000 },
  1569 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1566:54
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_edit_listing ({"code":"P0001","details":null,"hint":null,"message":"listing not found"})
```

Context:

```text
          - listitem [ref=e318]:
            - generic [ref=e319]: About
          - listitem [ref=e320]:
            - generic [ref=e321]: How it works
      - navigation "Help" [ref=e322]:
        - heading "Help" [level=2] [ref=e323]
        - list [ref=e324]:
          - listitem [ref=e325]:
            - generic [ref=e326]: Safety
          - listitem [ref=e327]:
            - generic [ref=e328]: Contact
      - navigation "Legal" [ref=e329]:
        - heading "Legal" [level=2] [ref=e330]
        - list [ref=e331]:
          - listitem [ref=e332]:
            - generic [ref=e333]: Terms
          - listitem [ref=e334]:
            - generic [ref=e335]: Privacy
    - paragraph [ref=e337]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-category.spec.ts › POSTING WIZARD › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-141-Photos-coming-soon-the-tick-shows-only-with-no-photo-is-saved-draws-the-ribbon-and-goes-when-a-photo-is-added-bundle-4-steps-14-15-mobile-360` — Playwright's name `post-wizard-category-POSTI-5c6b1-added-bundle-4-steps-14-15--mobile-360`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

### post-wizard-place.spec.ts › POSTING WIZARD › PW-13 review: the preview shows what was answered, and Publish lands in review — never live

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-13-review-the-preview-shows-what-was-answered-and-Publish-lands-in-review-never-live-mobile-360` — Playwright's name `post-wizard-place-POSTING--4521b-ands-in-review-—-never-live-mobile-360`; this run carried 5 context file(s); of the same spec: none

### post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-61-after-ten-seconds-the-Undo-is-gone-and-the-reset-stands-D59-mobile-360` — Playwright's name `post-wizard-resets-POSTING-356d8-e-and-the-reset-stands-D59--mobile-360`; this run carried 5 context file(s); of the same spec: none

### post-wizard-resets.spec.ts › POSTING WIZARD › PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-59-a-card-1-identity-change-hides-only-what-hangs-on-it-and-a-card-2-change-touches-nothing-else-mobile-360` — Playwright's name `post-wizard-resets-POSTING-59cbe-change-touches-nothing-else-mobile-360`; this run carried 5 context file(s); of the same spec: none

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-159 a list fact ticks its tick list once, and the seller's untick stays

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-159-a-list-fact-ticks-its-tick-list-once-and-the-seller-s-untick-stays-mobile-360` — Playwright's name `post-wizard-specs-POSTING--3d2b2-d-the-seller-s-untick-stays-mobile-360`; this run carried 5 context file(s); of the same spec: none

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-26 Undo this edit: the newest edit's before-values come back as a new edit with the reason Undo; the seller is told

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-fact-price').locator('dd')
Expected: "100 ETB"
Received: "120 ETB"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-fact-price').locator('dd')
    24 × locator resolved to <dd class="min-w-0 break-words text-sm text-foreground">120 ETB</dd>
       - unexpected value "120 ETB"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-fact-price').locator('dd')
Expected: "100 ETB"
Received: "120 ETB"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('listing-fact-price').locator('dd')
    24 × locator resolved to <dd class="min-w-0 break-words text-sm text-foreground">120 ETB</dd>
       - unexpected value "120 ETB"


  1727 |     );
  1728 |     await expect(dialog).toHaveCount(0);
> 1729 |     await expect(page.getByTestId("listing-fact-price").locator("dd")).toHaveText("100 ETB", {
       |                                                                        ^
  1730 |       timeout: 20000,
  1731 |     });
```

Context:

```text
          - listitem [ref=e350]:
            - generic [ref=e351]: About
          - listitem [ref=e352]:
            - generic [ref=e353]: How it works
      - navigation "Help" [ref=e354]:
        - heading "Help" [level=2] [ref=e355]
        - list [ref=e356]:
          - listitem [ref=e357]:
            - generic [ref=e358]: Safety
          - listitem [ref=e359]:
            - generic [ref=e360]: Contact
      - navigation "Legal" [ref=e361]:
        - heading "Legal" [level=2] [ref=e362]
        - list [ref=e363]:
          - listitem [ref=e364]:
            - generic [ref=e365]: Terms
          - listitem [ref=e366]:
            - generic [ref=e367]: Privacy
    - paragraph [ref=e369]: © 2026 ethio.com — All rights reserved.
```
```

### admin-screening.spec.ts › ADMIN SCREENING › SC-3 Reject keeps the ad off

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:sc] reading the listing failed: Cannot coerce the result to a single JSON object

  91 |     .eq("id", id)
  92 |     .single();
> 93 |   if (error || !data) throw new Error(`[e2e:sc] reading the listing failed: ${error?.message}`);
     |                             ^
  94 |   return data as { status: string; published_at: string | null };
  95 | }
  96 |
    at listingTruth (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:93:29)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:306:13
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [client-error] gate fetch threw
```

Context:

```text
          - listitem [ref=e274]:
            - generic [ref=e275]: About
          - listitem [ref=e276]:
            - generic [ref=e277]: How it works
      - navigation "Help" [ref=e278]:
        - heading "Help" [level=2] [ref=e279]
        - list [ref=e280]:
          - listitem [ref=e281]:
            - generic [ref=e282]: Safety
          - listitem [ref=e283]:
            - generic [ref=e284]: Contact
      - navigation "Legal" [ref=e285]:
        - heading "Legal" [level=2] [ref=e286]
        - list [ref=e287]:
          - listitem [ref=e288]:
            - generic [ref=e289]: Terms
          - listitem [ref=e290]:
            - generic [ref=e291]: Privacy
    - paragraph [ref=e293]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-103 required text, optional text and a list's Other text each save; an empty required text is refused by name

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: PW-103: the empty required text was not refused by name

expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-attr-refusal"][data-attr="e2e_wri_5_12_g5f7ub_treq"]')
Expected: visible
Error: element(s) not found

Call log:
  - PW-103: the empty required text was not refused by name with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-refusal"][data-attr="e2e_wri_5_12_g5f7ub_treq"]')


  132 |       page.locator(`[data-testid="post-attr-refusal"][data-attr="${set.textRequired.attrKey}"]`),
  133 |       "PW-103: the empty required text was not refused by name",
> 134 |     ).toBeVisible({ timeout: 20_000 });
      |       ^
  135 |     await expect(page.getByTestId("post-step-3")).toBeVisible();
  136 |
  137 |     await control(page, set.textRequired.attrKey).fill("e2e required");
--- client errors of this attempt (DEC-177) ---
[client-error] refused POST /api/listings/draft: ok=false (e2e_wri_5_12_g5f7ub_treq:required)
```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-103-required-text-optional-text-and-a-list-s-Other-text-each-save-an-empty-required-text-is-refused-by-name-desktop-1280` — Playwright's name `post-wizard-details-POSTIN-214fe-red-text-is-refused-by-name-desktop-1280`; this run carried 5 context file(s); of the same spec: none

### post-wizard-resets.spec.ts › POSTING WIZARD › PW-168 a chain: the brand changes, the model it no longer offers is cleared and what it filled goes; the seller's own colour stays

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-168-a-chain-the-brand-changes-the-model-it-no-longer-offers-is-cleared-and-what-it-filled-goes-the-seller-s-own-colour-stays-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-7b26f-e-seller-s-own-colour-stays-desktop-1280`; this run carried 5 context file(s); of the same spec: none

- post-wizard-specs.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met · `desktop-1280` · source `shard 6` — body omitted: cap
- post-wizard-specs.spec.ts › POSTING WIZARD › PW-51 a dependent detail never renders above the answer it hangs on · `desktop-1280` · source `shard 6` — body omitted: cap
- posting-routes.spec.ts › POSTING ROUTES › PR-4 identity: the alias is saved, and a second seller cannot take it · `desktop-1280` · source `shard 6` — body omitted: cap

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

103 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `listing not found` | 3 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-i<n>q<n>: e<n>e_par_cit<n>uf → e<n>e_chi_qtp<n>g` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-idjp<n>: e<n>e_par_<n>a<n>tkd → e<n>e_chi_bkgpjr` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-i<n>q<n>: e<n>e_par_cit<n>uf → e<n>e_chi_qtp<n>g ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-idjp<n>: e<n>e_par_<n>a<n>tkd → e<n>e_chi_bkgpjr ×1

Off the allowlist:

### listing not found

- Count: 3 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-154 {country} in a label and its help reads the market's country in English ( ×1 · PW-183 under Amharic a year reads with its Ethiopian years, the same on the pick ×1 · PW-49 a prefill-only fact keeps its input while a settled one does not ×1 · PW-50 the specifications show every row open in display order (D41) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-13T20:16:13.427Z | 16.3 min |
| email | 2026-10-13T20:16:13.952Z | 0.2 min |
| shard 1 | 2026-10-13T20:16:15.281Z | 34.8 min |
| shard 2 | 2026-10-13T20:16:10.195Z | 42.5 min |
| shard 3 | 2026-10-13T20:16:15.166Z | 43.5 min |
| shard 4 | 2026-10-13T20:16:11.372Z | 34.2 min |
| shard 5 | 2026-10-13T20:16:10.971Z | 47.9 min |
| shard 6 | 2026-10-13T20:16:10.163Z | 36.5 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 80 | 53.5 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 30.0 min | shard 3, shard 5 |
| `photo-pipeline.spec.ts` | 42 | 25.6 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 24.0 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 54 | 21.7 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 21.4 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 21.1 min | shard 2, shard 5 |
| `post-wizard-bundle2.spec.ts` | 68 | 20.7 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 18.8 min | smoke, shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 14.0 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 34 | 13.7 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 13.6 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 10.6 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.9 min | smoke, shard 2, shard 5 |
| `posting-routes.spec.ts` | 52 | 9.8 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 28 | 8.6 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 8.6 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 8.5 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 8.5 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.4 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.6 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.6 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 7.0 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 6.7 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.6 min | shard 3, shard 6 |
| `feed-index.spec.ts` | 28 | 6.6 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.8 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 5.8 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 5.8 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 16 | 5.5 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.3 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 3.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.8 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 3.6 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 5 |
| `admin-categories-home.spec.ts` | 10 | 2.9 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.8 min | shard 3, shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 2.4 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 2.2 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 6 | 0.6 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.3 min | shard 3 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-20 a draft begun on /post takes its own address, and a reload opens it again | desktop-1280 | 246.6 s |
| `photo-pipeline.spec.ts` › PP-20 a draft begun on /post takes its own address, and a reload opens it again | mobile-360 | 245.8 s |
| `post-wizard-finder.spec.ts` › PW-87 off the chosen path the step asks again, Keep it returns, a new leaf clears it | desktop-1280 | 129.9 s |
| `post-wizard-finder.spec.ts` › PW-87 off the chosen path the step asks again, Keep it returns, a new leaf clears it | mobile-360 | 127.6 s |
| `post-wizard-where.spec.ts` › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post | desktop-1280 | 105.0 s |
| `post-wizard-specs.spec.ts` › PW-155 {country} reads the country in Amharic | desktop-1280 | 94.9 s |
| `admin-listings.spec.ts` › AL-22 Edit moves a listing to another category with Wrong category; the seller is told | mobile-360 | 93.9 s |
| `post-wizard-where.spec.ts` › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post | mobile-360 | 93.6 s |
| `post-wizard-category.spec.ts` › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15) | desktop-1280 | 90.5 s |
| `admin-screening.spec.ts` › SC-3 Reject keeps the ad off | desktop-1280 | 90.5 s |
| `post-wizard-specs.spec.ts` › PW-75 the required mark is uniform across steps (D72) | mobile-360 | 89.3 s |
| `admin-listings.spec.ts` › AL-26 Undo this edit: the newest edit's before-values come back as a new edit with the reason Undo; the seller is told | desktop-1280 | 89.1 s |
| `post-wizard-category.spec.ts` › PW-7 a draft resumes at the next step, and only for its owner | mobile-360 | 85.4 s |
| `posting-routes.spec.ts` › PR-4 identity: the alias is saved, and a second seller cannot take it | desktop-1280 | 84.4 s |
| `post-wizard-details.spec.ts` › PW-103 required text, optional text and a list's Other text each save; an empty required text is refused by name | desktop-1280 | 82.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38460460625-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38460460625-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38460460625-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 38460460625-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38460460625-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38460460625-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38460460625-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38460460625-6
```

## feed-route.spec.ts › FEED ROUTE › FR-6 the answer is public and carries no seller

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

@@ -1,7 +1,8 @@
  Array [
    "categoryId",
+   "coverPhotoId",
    "id",
    "locationId",
    "locationNameAm",
    "locationNameEn",
    "photosSoon",
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

@@ -1,7 +1,8 @@
  Array [
    "categoryId",
+   "coverPhotoId",
    "id",
    "locationId",
    "locationNameAm",
    "locationNameEn",
    "photosSoon",

  236 |     ].sort();
  237 |     expect(r.body.cards.length).toBeGreaterThan(0);
> 238 |     for (const card of r.body.cards) expect(Object.keys(card).sort()).toEqual(keys);
      |                                                                       ^
  239 |   });
```

Context: context file not found for `feed-route-FEED-ROUTE-FR-6-the-answer-is-public-and-carries-no-seller-mobile-360` — Playwright's name `feed-route-FEED-ROUTE-FR-6-7591a-ublic-and-carries-no-seller-mobile-360`; this run carried 5 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-20 a draft begun on /post takes its own address, and a reload opens it again

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 120000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByTestId('post-back')
    - locator resolved to <button disabled type="button" data-testid="post-back" class="inline-flex min-h-11 grow items-center justify-center rounded-md px-4 text-sm font-medium transition-colors disabled:opacity-60 border border-input bg-secondary text-secondary-foreground hover:bg-secondary/80">Back</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    198 × waiting for element to be visible, enabled and stable
        - element is not enabled
      - retrying click action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-20-a-draft-begun-on-post-takes-its-own-address-and-a-reload-opens-it-again-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-1cf21-and-a-reload-opens-it-again-mobile-360`; this run carried 5 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: PP-21: the feed did not name the card's cover

expect(received).toBe(expected) // Object.is equality

Expected: "ee527f93-317d-40f6-9b4b-db3fee5a5a19"
Received: "absent"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: PP-21: the feed did not name the card's cover

expect(received).toBe(expected) // Object.is equality

Expected: "ee527f93-317d-40f6-9b4b-db3fee5a5a19"
Received: "absent"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  1002 |
  1003 |     // The feed's card names its cover.
> 1004 |     await expect
       |     ^
  1005 |       .poll(
  1006 |         async () => {
  1007 |           const response = await page.request.get(`/api/feed?category=${leaf.id}`);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1004:5
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-21-a-published-ad-s-cover-photo-reaches-the-feed-card-signed-for-a-visitor-without-a-session-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-1b301-a-visitor-without-a-session-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-2-search-to-leaf-chooses-a-category-and-creates-the-draft-at-once-mobile-360` — Playwright's name `post-wizard-category-POSTI-6e4af-d-creates-the-draft-at-once-mobile-360`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-62 a level follows pointer order, a guest follows the host's own children, and the home is the flagged pointer (DEC-080)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-62-a-level-follows-pointer-order-a-guest-follows-the-host-s-own-children-and-the-home-is-the-flagged-pointer-DEC-080-mobile-360` — Playwright's name `post-wizard-category-POSTI-59e31-he-flagged-pointer-DEC-080--mobile-360`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-4-a-photo-is-prepared-on-the-device-stored-stripped-and-removable-mobile-360` — Playwright's name `post-wizard-category-POSTI-3bd93-ored-stripped-and-removable-mobile-360`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-7 a draft resumes at the next step, and only for its owner

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e137]:
            - generic [ref=e138]: About
          - listitem [ref=e139]:
            - generic [ref=e140]: How it works
      - navigation "Help" [ref=e141]:
        - heading "Help" [level=2] [ref=e142]
        - list [ref=e143]:
          - listitem [ref=e144]:
            - generic [ref=e145]: Safety
          - listitem [ref=e146]:
            - generic [ref=e147]: Contact
      - navigation "Legal" [ref=e148]:
        - heading "Legal" [level=2] [ref=e149]
        - list [ref=e150]:
          - listitem [ref=e151]:
            - generic [ref=e152]: Terms
          - listitem [ref=e153]:
            - generic [ref=e154]: Privacy
    - paragraph [ref=e156]: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-category.spec.ts › POSTING WIZARD › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-54-the-wizard-walks-category-specifications-photos-details-and-resumes-at-the-first-unfinished-step-mobile-360` — Playwright's name `post-wizard-category-POSTI-75ef6-t-the-first-unfinished-step-mobile-360`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-8 an unreachable save keeps the answers, says so, and retries

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  835 |     await page.getByTestId("post-save-retry").click();
  836 |
> 837 |     await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                       ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-8-an-unreachable-save-keeps-the-answers-says-so-and-retries-mobile-360` — Playwright's name `post-wizard-category-POSTI-a400a-answers-says-so-and-retries-mobile-360`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-71 the category group wears the soft border until a leaf is chosen (D71)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-71-the-category-group-wears-the-soft-border-until-a-leaf-is-chosen-D71-mobile-360` — Playwright's name `post-wizard-category-POSTI-8625e-until-a-leaf-is-chosen-D71--mobile-360`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-27 the mobile strip walks back to a step already done, and no further

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-27-the-mobile-strip-walks-back-to-a-step-already-done-and-no-further-mobile-360` — Playwright's name `post-wizard-category-POSTI-c4ec3-already-done-and-no-further-mobile-360`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-29-the-photos-caption-counts-against-the-plan-s-cap-mobile-360` — Playwright's name `post-wizard-category-POSTI-b40c2-unts-against-the-plan-s-cap-mobile-360`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-87 off the chosen path the step asks again, Keep it returns, a new leaf clears it

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-browse-crumb"][data-category=""]')
    - locator resolved to <button disabled type="button" data-category="" data-testid="post-browse-crumb" class="min-h-11 rounded-md border border-border px-3 py-1 text-xs text-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">All categories</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    91 × waiting for element to be visible, enabled and stable
       - element is not enabled
     - retrying click action
       - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-87-off-the-chosen-path-the-step-asks-again-Keep-it-returns-a-new-leaf-clears-it-mobile-360` — Playwright's name `post-wizard-finder-POSTING-3cb2f-eturns-a-new-leaf-clears-it-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-11-where-the-market-is-prefilled-from-the-edge-a-city-with-sub-cities-offers-all-of-it-and-a-second-place-is-refused-by-the-plan-mobile-360` — Playwright's name `post-wizard-place-POSTING--47508-lace-is-refused-by-the-plan-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-mobile-360` — Playwright's name `post-wizard-place-POSTING--17792-d-a-shown-channel-is-stored-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-112-who-a-new-post-opens-with-the-last-post-s-channels-stored-on-the-draft-unchanged-mobile-360` — Playwright's name `post-wizard-place-POSTING--d2ba0-ored-on-the-draft-unchanged-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-mobile-360` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-31 the market select waits for the prefill chain and never preselects

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-31-the-market-select-waits-for-the-prefill-chain-and-never-preselects-mobile-360` — Playwright's name `post-wizard-place-POSTING--6888f--chain-and-never-preselects-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, is ticked, and a lone city box offers no Remove

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-20-where-the-default-place-lists-itself-is-ticked-and-a-lone-city-box-offers-no-Remove-mobile-360` — Playwright's name `post-wizard-place-POSTING--5d9be-e-city-box-offers-no-Remove-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-33 a region alone never lists itself; its city does (W6 R2)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-33-a-region-alone-never-lists-itself-its-city-does-W6-R2-mobile-360` — Playwright's name `post-wizard-place-POSTING--775f8-itself-its-city-does-W6-R2--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-80-a-city-is-required-marked-before-Next-refused-and-scrolled-to-on-Next-cleared-by-a-city-mobile-360` — Playwright's name `post-wizard-place-POSTING--8f238-o-on-Next-cleared-by-a-city-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-81-a-prefilled-city-counts-as-chosen-no-mark-Next-passes-untouched-mobile-360` — Playwright's name `post-wizard-place-POSTING--40d61--mark-Next-passes-untouched-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-82 the add buttons follow the plan's own limits

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-82-the-add-buttons-follow-the-plan-s-own-limits-mobile-360` — Playwright's name `post-wizard-place-POSTING--a546c-ollow-the-plan-s-own-limits-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-37-a-tap-on-the-map-places-a-pin-and-the-door-stores-it-as-exact-mobile-360` — Playwright's name `post-wizard-place-POSTING--90a6a-the-door-stores-it-as-exact-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-38-a-place-search-moves-the-pin-and-fills-the-street-line-mobile-360` — Playwright's name `post-wizard-place-POSTING--c721f-n-and-fills-the-street-line-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-39-an-approximate-pin-is-stored-as-approx-and-drawn-as-an-area-never-a-point-mobile-360` — Playwright's name `post-wizard-place-POSTING--7d413-wn-as-an-area-never-a-point-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-40 removing the pin clears all four columns

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-40-removing-the-pin-clears-all-four-columns-mobile-360` — Playwright's name `post-wizard-place-POSTING--dcdc1-pin-clears-all-four-columns-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-160 Use my location stays pressed until the pin is moved by hand

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-160-Use-my-location-stays-pressed-until-the-pin-is-moved-by-hand-mobile-360` — Playwright's name `post-wizard-place-POSTING--be1b3-il-the-pin-is-moved-by-hand-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-76-a-detail-the-model-pins-to-one-value-is-filled-and-hidden-and-still-reviewed-DEC-085-mobile-360` — Playwright's name `post-wizard-place-POSTING--d27b1-and-still-reviewed-DEC-085--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-78 a big model list shows its required mark once the brand is chosen (INC-336)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-78-a-big-model-list-shows-its-required-mark-once-the-brand-is-chosen-INC-336-mobile-360` — Playwright's name `post-wizard-place-POSTING--e7684-he-brand-is-chosen-INC-336--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-10-pricing-currency-comes-before-the-amount-a-locked-period-shows-no-line-and-free-hides-the-amount-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-2bfeb-e-and-free-hides-the-amount-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-55-a-commission-basis-asks-a-percentage-stores-basis-points-and-reads-it-back-in-both-languages-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-a40fa-s-it-back-in-both-languages-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-56-an-hourly-basis-fixes-the-period-to-the-hour-and-a-changed-basis-moves-it-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-6ea10-nd-a-changed-basis-moves-it-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-109-a-quote-basis-forces-contact-and-a-changed-basis-releases-it-INC-375-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-9a05b--basis-releases-it-INC-375--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-108-an-Other-basis-names-the-seller-s-written-unit-INC-371-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-df19a-ler-s-written-unit-INC-371--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-57-a-per-quintal-basis-keeps-the-period-once-and-reviews-as-a-price-per-quintal-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-1e8b2-iews-as-a-price-per-quintal-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-58-a-commission-outside-0-01-100-is-refused-in-words-and-a-valid-one-advances-INC-301-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-62e66-valid-one-advances-INC-301--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-63-the-pricing-basis-is-asked-on-the-price-step-refused-there-when-empty-and-still-shapes-the-period-D62-2-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-ccd8b-ll-shapes-the-period-D62-2--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-64-the-negotiable-toggle-stores-the-flag-shows-a-badge-on-review-and-a-contact-price-clears-it-DEC-081-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-43ca0-ct-price-clears-it-DEC-081--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-65 the currency list opens home first and USD second, with symbols (D62-2)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-65-the-currency-list-opens-home-first-and-USD-second-with-symbols-D62-2-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-60322--second-with-symbols-D62-2--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-169 with a currency chosen, the list opens with it first and marked, and keeps it first under a search that misses it (Bundle 7 B2)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-169-with-a-currency-chosen-the-list-opens-with-it-first-and-marked-and-keeps-it-first-under-a-search-that-misses-it-Bundle-7-B2-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-82cc3-that-misses-it-Bundle-7-B2--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-66-a-pre-D62-2-negotiable-price-type-saves-step-1-and-reaches-step-3-with-no-refusal-INC-309-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-f687e--3-with-no-refusal-INC-309--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-67-a-commission-basis-chosen-on-step-5-is-stored-on-the-draft-before-the-percentage-is-typed-INC-312-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-82f73-ercentage-is-typed-INC-312--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-68 a Next refused on details does not pin the claim: Back then Next from price reopens details (INC-315)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-68-a-Next-refused-on-details-does-not-pin-the-claim-Back-then-Next-from-price-reopens-details-INC-315-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-9221d-ce-reopens-details-INC-315--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › LY-6 at 360 the open currency list is above the sticky action bar

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-LY-6-at-360-the-open-currency-list-is-above-the-sticky-action-bar-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-6283e-above-the-sticky-action-bar-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-136-a-product-type-that-allows-only-some-units-narrows-the-unit-list-on-the-price-page-bundle-4-step-9-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-e2f9a-price-page-bundle-4-step-9--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-137-Pieces-per-Pack-shows-with-per-pack-and-goes-with-its-value-on-another-unit-the-size-and-terms-lines-read-under-the-price-bundle-4-steps-9-10-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-70be6--price-bundle-4-steps-9-10--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-138 a required unit left empty is refused on the price page's Next, not on the specifications page's (bundle 4 step 9)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-138-a-required-unit-left-empty-is-refused-on-the-price-page-s-Next-not-on-the-specifications-page-s-bundle-4-step-9-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-ec116-ons-page-s-bundle-4-step-9--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-139 a category with no unit still asks Volume on the specifications page (bundle 4 step 9)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-139-a-category-with-no-unit-still-asks-Volume-on-the-specifications-page-bundle-4-step-9-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-459c7-tions-page-bundle-4-step-9--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-140 the title page opens with a title written from the answers, and the seller's edit survives a changed answer (bundle 4 step 12)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-140-the-title-page-opens-with-a-title-written-from-the-answers-and-the-seller-s-edit-survives-a-changed-answer-bundle-4-step-12-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-a8714-ed-answer-bundle-4-step-12--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-26-a-category-change-drops-the-details-the-new-category-never-asks-mobile-360` — Playwright's name `post-wizard-resets-POSTING-cf6f2-the-new-category-never-asks-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-72-after-a-category-reset-a-currency-prefill-that-lands-late-never-claims-a-step-the-seller-has-not-re-completed-INC-317-mobile-360` — Playwright's name `post-wizard-resets-POSTING-6e167-s-not-re-completed-INC-317--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-73 the door's currency fill is mirrored, so Undo restores a complete price (INC-321)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-73-the-door-s-currency-fill-is-mirrored-so-Undo-restores-a-complete-price-INC-321-mobile-360` — Playwright's name `post-wizard-resets-POSTING-16277-s-a-complete-price-INC-321--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-61-a-category-change-resets-details-title-description-and-price-and-Undo-within-ten-seconds-restores-them-D59-mobile-360` — Playwright's name `post-wizard-resets-POSTING-e57e3--seconds-restores-them-D59--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-163 a first identity answer keeps the details filled above it; a change keeps them too

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-163-a-first-identity-answer-keeps-the-details-filled-above-it-a-change-keeps-them-too-mobile-360` — Playwright's name `post-wizard-resets-POSTING-0c834--it-a-change-keeps-them-too-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-60-a-non-identity-fold-owner-change-clears-only-its-fold-child-an-identity-change-clears-nothing-it-does-not-hold-mobile-360` — Playwright's name `post-wizard-resets-POSTING-b8bbb-rs-nothing-it-does-not-hold-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-32-model-dependent-details-reset-on-a-model-change-seller-only-details-survive-and-Undo-restores-mobile-360` — Playwright's name `post-wizard-resets-POSTING-b6b2b-s-survive-and-Undo-restores-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-79-clearing-the-title-and-tapping-Next-at-once-still-registers-the-tap-INC-332-mobile-360` — Playwright's name `post-wizard-resets-POSTING-f73f2--registers-the-tap-INC-332--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-152 a two-pair condition shows its row only when both answers match

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-152-a-two-pair-condition-shows-its-row-only-when-both-answers-match-mobile-360` — Playwright's name `post-wizard-resets-POSTING-d0598-nly-when-both-answers-match-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-164 an identity change keeps every detail that does not depend on it, resets the ones that do, and Undo restores them

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-164-an-identity-change-keeps-every-detail-that-does-not-depend-on-it-resets-the-ones-that-do-and-Undo-restores-them-mobile-360` — Playwright's name `post-wizard-resets-POSTING-e6c71-t-do-and-Undo-restores-them-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-165 a parent's change never touches a detail that depends on another parent

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-165-a-parent-s-change-never-touches-a-detail-that-depends-on-another-parent-mobile-360` — Playwright's name `post-wizard-resets-POSTING-abfdc-t-depends-on-another-parent-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-168 a chain: the brand changes, the model it no longer offers is cleared and what it filled goes; the seller's own colour stays

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-168-a-chain-the-brand-changes-the-model-it-no-longer-offers-is-cleared-and-what-it-filled-goes-the-seller-s-own-colour-stays-mobile-360` — Playwright's name `post-wizard-resets-POSTING-7b26f-e-seller-s-own-colour-stays-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-5-the-specification-form-is-generated-its-options-load-on-the-first-tap-and-an-empty-required-detail-is-refused-under-it-mobile-360` — Playwright's name `post-wizard-specs-POSTING--44a2d--detail-is-refused-under-it-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-145 an over-limit options read says so under its control, and a second open loads the list

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-145-an-over-limit-options-read-says-so-under-its-control-and-a-second-open-loads-the-list-mobile-360` — Playwright's name `post-wizard-specs-POSTING--00e71--second-open-loads-the-list-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-6-the-AI-assist-fills-the-title-and-description-from-the-entered-details-and-both-stay-editable-mobile-360` — Playwright's name `post-wizard-specs-POSTING--ea063-ails-and-both-stay-editable-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-101 a phone number in a free-text answer is refused at its field

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-101-a-phone-number-in-a-free-text-answer-is-refused-at-its-field-mobile-360` — Playwright's name `post-wizard-specs-POSTING--e4738-wer-is-refused-at-its-field-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-93-a-number-outside-its-range-is-refused-as-it-is-typed-mobile-360` — Playwright's name `post-wizard-specs-POSTING--9aa14-e-is-refused-as-it-is-typed-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-120-a-phone-number-in-an-Other-write-in-is-flagged-as-typed-single-and-multi-mobile-360` — Playwright's name `post-wizard-specs-POSTING--0cc37-d-as-typed-single-and-multi-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-106-an-empty-Other-write-in-is-refused-and-focused-on-Next-INC-369-mobile-360` — Playwright's name `post-wizard-specs-POSTING--8b043-nd-focused-on-Next-INC-369--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-107-a-multi-choice-Other-carries-its-write-in-to-the-draft-INC-370-mobile-360` — Playwright's name `post-wizard-specs-POSTING--65408-te-in-to-the-draft-INC-370--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-69-a-lazy-model-list-shows-its-stored-answer-on-re-entry-with-no-tap-INC-320-mobile-360` — Playwright's name `post-wizard-specs-POSTING--6ecf9--entry-with-no-tap-INC-320--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-70-a-strict-refusal-focuses-the-first-refused-field-D70-mobile-360` — Playwright's name `post-wizard-specs-POSTING--ae94e-he-first-refused-field-D70--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-77-the-first-refused-field-s-label-lands-below-the-header-D2-no-preference-mobile-360` — Playwright's name `post-wizard-specs-POSTING--ebaac-he-header-D2-no-preference--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-77-the-first-refused-field-s-label-lands-below-the-header-D2-reduce-mobile-360` — Playwright's name `post-wizard-specs-POSTING--77acf-below-the-header-D2-reduce--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-small-model-list-mobile-360` — Playwright's name `post-wizard-specs-POSTING--4c4ed-r-INC-329-small-model-list--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-big-model-list-mobile-360` — Playwright's name `post-wizard-specs-POSTING--c2c01-wer-INC-329-big-model-list--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-75 the required mark is uniform across steps (D72)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-75-the-required-mark-is-uniform-across-steps-D72-mobile-360` — Playwright's name `post-wizard-specs-POSTING--b850a-s-uniform-across-steps-D72--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-16-typing-is-saved-without-judgement-only-Next-asks-the-door-to-judge-the-step-mobile-360` — Playwright's name `post-wizard-specs-POSTING--98508--the-door-to-judge-the-step-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-18 specifications survive a step Back

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-18-specifications-survive-a-step-Back-mobile-360` — Playwright's name `post-wizard-specs-POSTING--96e94-cations-survive-a-step-Back-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-28-a-conditional-detail-appears-only-when-its-condition-is-met-mobile-360` — Playwright's name `post-wizard-specs-POSTING--25a96-y-when-its-condition-is-met-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-25-an-inherited-year-picker-is-bounded-by-the-model-chosen-three-levels-down-and-relative-bounds-resolve-as-the-door-does-INC-288-mobile-360` — Playwright's name `post-wizard-specs-POSTING--36116-e-as-the-door-does-INC-288--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-183 under Amharic a year reads with its Ethiopian years, the same on the picker and the review (D45)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-183-under-Amharic-a-year-reads-with-its-Ethiopian-years-the-same-on-the-picker-and-the-review-D45-mobile-360` — Playwright's name `post-wizard-specs-POSTING--144bc--picker-and-the-review-D45--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-153-a-settled-range-hides-its-number-and-the-review-and-buyer-sheet-show-the-range-mobile-360` — Playwright's name `post-wizard-specs-POSTING--26bb2--buyer-sheet-show-the-range-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-34-a-colour-detail-offers-stemmed-swatches-and-an-unmapped-list-shows-no-tray-mobile-360` — Playwright's name `post-wizard-specs-POSTING--7f28e-unmapped-list-shows-no-tray-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-45-a-declared-swatch-renders-one-ink-a-two-tone-and-a-pattern-tile-mobile-360` — Playwright's name `post-wizard-specs-POSTING--bdd4a-two-tone-and-a-pattern-tile-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-35-a-model-s-single-allowed-answer-is-stored-not-rendered-and-the-review-shows-it-D44-mobile-360` — Playwright's name `post-wizard-specs-POSTING--ebdcf-nd-the-review-shows-it-D44--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">እየተቀመጠ ነው…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">እየተቀመጠ ነው…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-42-Amharic-catalog-text-falls-back-field-by-field-mobile-360` — Playwright's name `post-wizard-specs-POSTING--2f428-t-falls-back-field-by-field-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-43-a-fact-prefills-a-sibling-the-same-selection-unhides-mobile-360` — Playwright's name `post-wizard-specs-POSTING--accdb--the-same-selection-unhides-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-50 the specifications show every row open in display order (D41)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-50-the-specifications-show-every-row-open-in-display-order-D41-mobile-360` — Playwright's name `post-wizard-specs-POSTING--e95cf--open-in-display-order-D41--mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-51 a dependent detail never renders above the answer it hangs on

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-51-a-dependent-detail-never-renders-above-the-answer-it-hangs-on-mobile-360` — Playwright's name `post-wizard-specs-POSTING--dde07-bove-the-answer-it-hangs-on-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-154 {country} in a label and its help reads the market's country in English

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-154-country-in-a-label-and-its-help-reads-the-market-s-country-in-English-mobile-360` — Playwright's name `post-wizard-specs-POSTING--b356d-market-s-country-in-English-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-155 {country} reads the country in Amharic

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">እየተቀመጠ ነው…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">እየተቀመጠ ነው…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-155-country-reads-the-country-in-Amharic-mobile-360` — Playwright's name `post-wizard-specs-POSTING--57e08-eads-the-country-in-Amharic-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-156 with no place, market or confirmed home, {country} reads the fallback words

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-156-with-no-place-market-or-confirmed-home-country-reads-the-fallback-words-mobile-360` — Playwright's name `post-wizard-specs-POSTING--f2ae2-ry-reads-the-fallback-words-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-157 a category pointer in help text asks, then moves the ad and keeps the answer

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-157-a-category-pointer-in-help-text-asks-then-moves-the-ad-and-keeps-the-answer-mobile-360` — Playwright's name `post-wizard-specs-POSTING--c6d44-the-ad-and-keeps-the-answer-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-158 a pointer to a category that is gone draws nothing and no braces

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-158-a-pointer-to-a-category-that-is-gone-draws-nothing-and-no-braces-mobile-360` — Playwright's name `post-wizard-specs-POSTING--754ff-draws-nothing-and-no-braces-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-units.spec.ts › POSTING WIZARD — UNITS › PW-161 a number's unit reads in English, and in Amharic under Amharic

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  51 |     await expect(hit).toBeVisible();
  52 |     await hit.click();
> 53 |     await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
     |                                                       ^
```

Context: context file not found for `post-wizard-units-POSTING-WIZARD-UNITS-PW-161-a-number-s-unit-reads-in-English-and-in-Amharic-under-Amharic-mobile-360` — Playwright's name `post-wizard-units-POSTING--ff0d2-nd-in-Amharic-under-Amharic-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: PW-180: the invite's city was not filled in

expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('post-where-city')
Expected: "ad234c2d-c0a5-423f-9e0a-775a0c2e51b1"
Received: "fee86210-77fa-415f-a97f-890cd5656e47"
Timeout:  20000ms

Call log:
  - PW-180: the invite's city was not filled in with timeout 20000ms
  - waiting for getByTestId('post-where-city')
    20 × locator resolved to <select id="post-where-city" data-testid="post-where-city" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">…</select>
       - unexpected value "fee86210-77fa-415f-a97f-890cd5656e47"

--- further error 1 ---
Error: PW-180: the invite's city was not filled in

expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('post-where-city')
Expected: "ad234c2d-c0a5-423f-9e0a-775a0c2e51b1"
Received: "fee86210-77fa-415f-a97f-890cd5656e47"
Timeout:  20000ms

Call log:
  - PW-180: the invite's city was not filled in with timeout 20000ms
  - waiting for getByTestId('post-where-city')
    20 × locator resolved to <select id="post-where-city" data-testid="post-where-city" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">…</select>
       - unexpected value "fee86210-77fa-415f-a97f-890cd5656e47"


  301 |       page.getByTestId("post-where-city"),
  302 |       "PW-180: the invite's city was not filled in",
> 303 |     ).toHaveValue(invited.city.id, { timeout: 20_000 });
      |       ^
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-180-D119-a-new-post-from-an-invite-opens-the-place-step-on-the-invite-s-place-ahead-of-the-seller-s-last-post-mobile-360` — Playwright's name `post-wizard-where-POSTING--16906-d-of-the-seller-s-last-post-mobile-360`; this run carried 5 context file(s); of the same spec: none

## feed-route.spec.ts › FEED ROUTE › FR-6 the answer is public and carries no seller

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

@@ -1,7 +1,8 @@
  Array [
    "categoryId",
+   "coverPhotoId",
    "id",
    "locationId",
    "locationNameAm",
    "locationNameEn",
    "photosSoon",
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

@@ -1,7 +1,8 @@
  Array [
    "categoryId",
+   "coverPhotoId",
    "id",
    "locationId",
    "locationNameAm",
    "locationNameEn",
    "photosSoon",

  236 |     ].sort();
  237 |     expect(r.body.cards.length).toBeGreaterThan(0);
> 238 |     for (const card of r.body.cards) expect(Object.keys(card).sort()).toEqual(keys);
      |                                                                       ^
  239 |   });
```

Context: context file not found for `feed-route-FEED-ROUTE-FR-6-the-answer-is-public-and-carries-no-seller-desktop-1280` — Playwright's name `feed-route-FEED-ROUTE-FR-6-7591a-ublic-and-carries-no-seller-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-20 a draft begun on /post takes its own address, and a reload opens it again

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 120000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByTestId('post-back')
    - locator resolved to <button disabled type="button" data-testid="post-back" class="inline-flex min-h-11 grow items-center justify-center rounded-md px-4 text-sm font-medium transition-colors disabled:opacity-60 border border-input bg-secondary text-secondary-foreground hover:bg-secondary/80">Back</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    205 × waiting for element to be visible, enabled and stable
        - element is not enabled
      - retrying click action
        - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-20-a-draft-begun-on-post-takes-its-own-address-and-a-reload-opens-it-again-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-1cf21-and-a-reload-opens-it-again-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-21 a published ad's cover photo reaches the feed card, signed for a visitor without a session

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PP-21: the feed did not name the card's cover

expect(received).toBe(expected) // Object.is equality

Expected: "961e9c55-efbc-4f75-af26-6fc3a03ce3c3"
Received: "absent"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: PP-21: the feed did not name the card's cover

expect(received).toBe(expected) // Object.is equality

Expected: "961e9c55-efbc-4f75-af26-6fc3a03ce3c3"
Received: "absent"

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

  1002 |
  1003 |     // The feed's card names its cover.
> 1004 |     await expect
       |     ^
  1005 |       .poll(
  1006 |         async () => {
  1007 |           const response = await page.request.get(`/api/feed?category=${leaf.id}`);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:1004:5
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-21-a-published-ad-s-cover-photo-reaches-the-feed-card-signed-for-a-visitor-without-a-session-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-1b301-a-visitor-without-a-session-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-2 search-to-leaf chooses a category and creates the draft at once

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-2-search-to-leaf-chooses-a-category-and-creates-the-draft-at-once-desktop-1280` — Playwright's name `post-wizard-category-POSTI-6e4af-d-creates-the-draft-at-once-desktop-1280`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-62 a level follows pointer order, a guest follows the host's own children, and the home is the flagged pointer (DEC-080)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-62-a-level-follows-pointer-order-a-guest-follows-the-host-s-own-children-and-the-home-is-the-flagged-pointer-DEC-080-desktop-1280` — Playwright's name `post-wizard-category-POSTI-59e31-he-flagged-pointer-DEC-080--desktop-1280`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-4 a photo is prepared on the device, stored stripped, and removable

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-4-a-photo-is-prepared-on-the-device-stored-stripped-and-removable-desktop-1280` — Playwright's name `post-wizard-category-POSTI-3bd93-ored-stripped-and-removable-desktop-1280`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-141 Photos coming soon: the tick shows only with no photo, is saved, draws the ribbon, and goes when a photo is added (bundle 4 steps 14, 15)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-141-Photos-coming-soon-the-tick-shows-only-with-no-photo-is-saved-draws-the-ribbon-and-goes-when-a-photo-is-added-bundle-4-steps-14-15-desktop-1280` — Playwright's name `post-wizard-category-POSTI-5c6b1-added-bundle-4-steps-14-15--desktop-1280`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-54-the-wizard-walks-category-specifications-photos-details-and-resumes-at-the-first-unfinished-step-desktop-1280` — Playwright's name `post-wizard-category-POSTI-75ef6-t-the-first-unfinished-step-desktop-1280`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-8 an unreachable save keeps the answers, says so, and retries

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  835 |     await page.getByTestId("post-save-retry").click();
  836 |
> 837 |     await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                       ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-8-an-unreachable-save-keeps-the-answers-says-so-and-retries-desktop-1280` — Playwright's name `post-wizard-category-POSTI-a400a-answers-says-so-and-retries-desktop-1280`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-71 the category group wears the soft border until a leaf is chosen (D71)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-71-the-category-group-wears-the-soft-border-until-a-leaf-is-chosen-D71-desktop-1280` — Playwright's name `post-wizard-category-POSTI-8625e-until-a-leaf-is-chosen-D71--desktop-1280`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-29 the photos caption counts against the plan's cap

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-29-the-photos-caption-counts-against-the-plan-s-cap-desktop-1280` — Playwright's name `post-wizard-category-POSTI-b40c2-unts-against-the-plan-s-cap-desktop-1280`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  172 |     await hit.click();
  173 |     if (expectSaved) {
> 174 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-48-a-catch-all-leaf-can-be-chosen-and-its-listing-lands-in-review-desktop-1280` — Playwright's name `post-wizard-category-POSTI-0c481-its-listing-lands-in-review-desktop-1280`; this run carried 5 context file(s); of the same spec: `post-wizard-category-POSTI-c81ee-step-and-only-for-its-owner-mobile-360`

## post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-87 off the chosen path the step asks again, Keep it returns, a new leaf clears it

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-browse-crumb"][data-category=""]')
    - locator resolved to <button disabled type="button" data-category="" data-testid="post-browse-crumb" class="min-h-11 rounded-md border border-border px-3 py-1 text-xs text-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">All categories</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    92 × waiting for element to be visible, enabled and stable
       - element is not enabled
     - retrying click action
       - waiting 500ms
  - element was detached from the DOM, retrying


```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-87-off-the-chosen-path-the-step-asks-again-Keep-it-returns-a-new-leaf-clears-it-desktop-1280` — Playwright's name `post-wizard-finder-POSTING-3cb2f-eturns-a-new-leaf-clears-it-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-11-where-the-market-is-prefilled-from-the-edge-a-city-with-sub-cities-offers-all-of-it-and-a-second-place-is-refused-by-the-plan-desktop-1280` — Playwright's name `post-wizard-place-POSTING--47508-lace-is-refused-by-the-plan-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-desktop-1280` — Playwright's name `post-wizard-place-POSTING--17792-d-a-shown-channel-is-stored-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-112-who-a-new-post-opens-with-the-last-post-s-channels-stored-on-the-draft-unchanged-desktop-1280` — Playwright's name `post-wizard-place-POSTING--d2ba0-ored-on-the-draft-unchanged-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-desktop-1280` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-31 the market select waits for the prefill chain and never preselects

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-31-the-market-select-waits-for-the-prefill-chain-and-never-preselects-desktop-1280` — Playwright's name `post-wizard-place-POSTING--6888f--chain-and-never-preselects-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-20 where: the default place lists itself, is ticked, and a lone city box offers no Remove

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-20-where-the-default-place-lists-itself-is-ticked-and-a-lone-city-box-offers-no-Remove-desktop-1280` — Playwright's name `post-wizard-place-POSTING--5d9be-e-city-box-offers-no-Remove-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-33 a region alone never lists itself; its city does (W6 R2)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-33-a-region-alone-never-lists-itself-its-city-does-W6-R2-desktop-1280` — Playwright's name `post-wizard-place-POSTING--775f8-itself-its-city-does-W6-R2--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-80 a city is required: marked before Next, refused and scrolled to on Next, cleared by a city

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-80-a-city-is-required-marked-before-Next-refused-and-scrolled-to-on-Next-cleared-by-a-city-desktop-1280` — Playwright's name `post-wizard-place-POSTING--8f238-o-on-Next-cleared-by-a-city-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-81 a prefilled city counts as chosen: no mark, Next passes untouched

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-81-a-prefilled-city-counts-as-chosen-no-mark-Next-passes-untouched-desktop-1280` — Playwright's name `post-wizard-place-POSTING--40d61--mark-Next-passes-untouched-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-82 the add buttons follow the plan's own limits

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-82-the-add-buttons-follow-the-plan-s-own-limits-desktop-1280` — Playwright's name `post-wizard-place-POSTING--a546c-ollow-the-plan-s-own-limits-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-37 a tap on the map places a pin and the door stores it as exact

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-37-a-tap-on-the-map-places-a-pin-and-the-door-stores-it-as-exact-desktop-1280` — Playwright's name `post-wizard-place-POSTING--90a6a-the-door-stores-it-as-exact-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-38 a place search moves the pin and fills the street line

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-38-a-place-search-moves-the-pin-and-fills-the-street-line-desktop-1280` — Playwright's name `post-wizard-place-POSTING--c721f-n-and-fills-the-street-line-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-39 an approximate pin is stored as approx and drawn as an area, never a point

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-39-an-approximate-pin-is-stored-as-approx-and-drawn-as-an-area-never-a-point-desktop-1280` — Playwright's name `post-wizard-place-POSTING--7d413-wn-as-an-area-never-a-point-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-40 removing the pin clears all four columns

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-40-removing-the-pin-clears-all-four-columns-desktop-1280` — Playwright's name `post-wizard-place-POSTING--dcdc1-pin-clears-all-four-columns-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-160 Use my location stays pressed until the pin is moved by hand

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-160-Use-my-location-stays-pressed-until-the-pin-is-moved-by-hand-desktop-1280` — Playwright's name `post-wizard-place-POSTING--be1b3-il-the-pin-is-moved-by-hand-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-76-a-detail-the-model-pins-to-one-value-is-filled-and-hidden-and-still-reviewed-DEC-085-desktop-1280` — Playwright's name `post-wizard-place-POSTING--d27b1-and-still-reviewed-DEC-085--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-place.spec.ts › POSTING WIZARD › PW-78 a big model list shows its required mark once the brand is chosen (INC-336)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  191 |     await hit.click();
  192 |     if (expectSaved) {
> 193 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-78-a-big-model-list-shows-its-required-mark-once-the-brand-is-chosen-INC-336-desktop-1280` — Playwright's name `post-wizard-place-POSTING--e7684-he-brand-is-chosen-INC-336--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-10-pricing-currency-comes-before-the-amount-a-locked-period-shows-no-line-and-free-hides-the-amount-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-2bfeb-e-and-free-hides-the-amount-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-56-an-hourly-basis-fixes-the-period-to-the-hour-and-a-changed-basis-moves-it-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-6ea10-nd-a-changed-basis-moves-it-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-109 a quote basis forces contact, and a changed basis releases it (INC-375)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-109-a-quote-basis-forces-contact-and-a-changed-basis-releases-it-INC-375-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-9a05b--basis-releases-it-INC-375--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-108 an Other basis names the seller's written unit (INC-371)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-108-an-Other-basis-names-the-seller-s-written-unit-INC-371-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-df19a-ler-s-written-unit-INC-371--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-57 a per-quintal basis keeps the period once and reviews as a price per quintal

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-57-a-per-quintal-basis-keeps-the-period-once-and-reviews-as-a-price-per-quintal-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-1e8b2-iews-as-a-price-per-quintal-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-58 a commission outside 0.01–100 % is refused in words, and a valid one advances (INC-301)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-58-a-commission-outside-0-01-100-is-refused-in-words-and-a-valid-one-advances-INC-301-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-62e66-valid-one-advances-INC-301--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-63 the pricing basis is asked on the price step, refused there when empty, and still shapes the period (D62-2)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-63-the-pricing-basis-is-asked-on-the-price-step-refused-there-when-empty-and-still-shapes-the-period-D62-2-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-ccd8b-ll-shapes-the-period-D62-2--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-64 the negotiable toggle stores the flag, shows a badge on review, and a contact price clears it (DEC-081)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-64-the-negotiable-toggle-stores-the-flag-shows-a-badge-on-review-and-a-contact-price-clears-it-DEC-081-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-43ca0-ct-price-clears-it-DEC-081--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-65 the currency list opens home first and USD second, with symbols (D62-2)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-65-the-currency-list-opens-home-first-and-USD-second-with-symbols-D62-2-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-60322--second-with-symbols-D62-2--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-169 with a currency chosen, the list opens with it first and marked, and keeps it first under a search that misses it (Bundle 7 B2)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-169-with-a-currency-chosen-the-list-opens-with-it-first-and-marked-and-keeps-it-first-under-a-search-that-misses-it-Bundle-7-B2-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-82cc3-that-misses-it-Bundle-7-B2--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-66 a pre-D62-2 'negotiable' price type saves step 1 and reaches step 3 with no refusal (INC-309)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-66-a-pre-D62-2-negotiable-price-type-saves-step-1-and-reaches-step-3-with-no-refusal-INC-309-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-f687e--3-with-no-refusal-INC-309--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-67 a commission basis chosen on step 5 is stored on the draft before the percentage is typed (INC-312)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-67-a-commission-basis-chosen-on-step-5-is-stored-on-the-draft-before-the-percentage-is-typed-INC-312-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-82f73-ercentage-is-typed-INC-312--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-68 a Next refused on details does not pin the claim: Back then Next from price reopens details (INC-315)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-68-a-Next-refused-on-details-does-not-pin-the-claim-Back-then-Next-from-price-reopens-details-INC-315-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-9221d-ce-reopens-details-INC-315--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-135 at 1280 the step list opens a finished step with its answers kept; a step not reached is not a button (bundle 4 step 5)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-135-at-1280-the-step-list-opens-a-finished-step-with-its-answers-kept-a-step-not-reached-is-not-a-button-bundle-4-step-5-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-d0a6e-t-a-button-bundle-4-step-5--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-136 a product type that allows only some units narrows the unit list on the price page (bundle 4 step 9)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-136-a-product-type-that-allows-only-some-units-narrows-the-unit-list-on-the-price-page-bundle-4-step-9-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-e2f9a-price-page-bundle-4-step-9--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-137 Pieces per Pack shows with per pack and goes, with its value, on another unit; the size and terms lines read under the price (bundle 4 steps 9, 10)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-137-Pieces-per-Pack-shows-with-per-pack-and-goes-with-its-value-on-another-unit-the-size-and-terms-lines-read-under-the-price-bundle-4-steps-9-10-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-70be6--price-bundle-4-steps-9-10--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-138 a required unit left empty is refused on the price page's Next, not on the specifications page's (bundle 4 step 9)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-138-a-required-unit-left-empty-is-refused-on-the-price-page-s-Next-not-on-the-specifications-page-s-bundle-4-step-9-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-ec116-ons-page-s-bundle-4-step-9--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-139 a category with no unit still asks Volume on the specifications page (bundle 4 step 9)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-139-a-category-with-no-unit-still-asks-Volume-on-the-specifications-page-bundle-4-step-9-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-459c7-tions-page-bundle-4-step-9--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-140 the title page opens with a title written from the answers, and the seller's edit survives a changed answer (bundle 4 step 12)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-140-the-title-page-opens-with-a-title-written-from-the-answers-and-the-seller-s-edit-survives-a-changed-answer-bundle-4-step-12-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-a8714-ed-answer-bundle-4-step-12--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 (e) a basis emptied by a specification change after the title step leaves no refusal on specifications (INC-455)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-e-a-basis-emptied-by-a-specification-change-after-the-title-step-leaves-no-refusal-on-specifications-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-ca751--on-specifications-INC-455--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-17 the currency is preselected and searchable by name in one control

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  155 |     await hit.click();
  156 |     if (expectSaved) {
> 157 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-17-the-currency-is-preselected-and-searchable-by-name-in-one-control-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-118f5-able-by-name-in-one-control-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-26 a category change drops the details the new category never asks

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-26-a-category-change-drops-the-details-the-new-category-never-asks-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-cf6f2-the-new-category-never-asks-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-72 after a category reset, a currency prefill that lands late never claims a step the seller has not re-completed (INC-317)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-72-after-a-category-reset-a-currency-prefill-that-lands-late-never-claims-a-step-the-seller-has-not-re-completed-INC-317-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-6e167-s-not-re-completed-INC-317--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 a category change resets details, title, description and price, and Undo within ten seconds restores them (D59)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-61-a-category-change-resets-details-title-description-and-price-and-Undo-within-ten-seconds-restores-them-D59-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-e57e3--seconds-restores-them-D59--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-61 after ten seconds the Undo is gone and the reset stands (D59)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-61-after-ten-seconds-the-Undo-is-gone-and-the-reset-stands-D59-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-356d8-e-and-the-reset-stands-D59--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-59 a card-1 identity change hides only what hangs on it, and a card-2 change touches nothing else

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-59-a-card-1-identity-change-hides-only-what-hangs-on-it-and-a-card-2-change-touches-nothing-else-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-59cbe-change-touches-nothing-else-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-60 a non-identity fold owner change clears only its fold child; an identity change clears nothing it does not hold

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-60-a-non-identity-fold-owner-change-clears-only-its-fold-child-an-identity-change-clears-nothing-it-does-not-hold-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-b8bbb-rs-nothing-it-does-not-hold-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-32-model-dependent-details-reset-on-a-model-change-seller-only-details-survive-and-Undo-restores-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-b6b2b-s-survive-and-Undo-restores-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-79 clearing the title and tapping Next at once still registers the tap (INC-332)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-79-clearing-the-title-and-tapping-Next-at-once-still-registers-the-tap-INC-332-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-f73f2--registers-the-tap-INC-332--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-152 a two-pair condition shows its row only when both answers match

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-152-a-two-pair-condition-shows-its-row-only-when-both-answers-match-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-d0598-nly-when-both-answers-match-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-164 an identity change keeps every detail that does not depend on it, resets the ones that do, and Undo restores them

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-164-an-identity-change-keeps-every-detail-that-does-not-depend-on-it-resets-the-ones-that-do-and-Undo-restores-them-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-e6c71-t-do-and-Undo-restores-them-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-165 a parent's change never touches a detail that depends on another parent

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-165-a-parent-s-change-never-touches-a-detail-that-depends-on-another-parent-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-abfdc-t-depends-on-another-parent-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  143 |     await hit.click();
  144 |     if (expectSaved) {
> 145 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-167-a-seller-s-year-inside-the-new-model-s-bounds-is-kept-one-outside-is-cleared-with-the-Undo-offer-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-81aef-cleared-with-the-Undo-offer-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-5 the specification form is generated, its options load on the first tap, and an empty required detail is refused under it

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-5-the-specification-form-is-generated-its-options-load-on-the-first-tap-and-an-empty-required-detail-is-refused-under-it-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--44a2d--detail-is-refused-under-it-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-145 an over-limit options read says so under its control, and a second open loads the list

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-145-an-over-limit-options-read-says-so-under-its-control-and-a-second-open-loads-the-list-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--00e71--second-open-loads-the-list-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-6 the AI assist fills the title and description from the entered details, and both stay editable

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-6-the-AI-assist-fills-the-title-and-description-from-the-entered-details-and-both-stay-editable-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--ea063-ails-and-both-stay-editable-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-101 a phone number in a free-text answer is refused at its field

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-101-a-phone-number-in-a-free-text-answer-is-refused-at-its-field-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--e4738-wer-is-refused-at-its-field-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-93 a number outside its range is refused as it is typed

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-93-a-number-outside-its-range-is-refused-as-it-is-typed-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--9aa14-e-is-refused-as-it-is-typed-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-120 a phone number in an Other write-in is flagged as typed, single and multi

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-120-a-phone-number-in-an-Other-write-in-is-flagged-as-typed-single-and-multi-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--0cc37-d-as-typed-single-and-multi-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-106 an empty Other write-in is refused and focused on Next (INC-369)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-106-an-empty-Other-write-in-is-refused-and-focused-on-Next-INC-369-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--8b043-nd-focused-on-Next-INC-369--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-107 a multi-choice Other carries its write-in to the draft (INC-370)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-107-a-multi-choice-Other-carries-its-write-in-to-the-draft-INC-370-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--65408-te-in-to-the-draft-INC-370--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-69 a lazy model list shows its stored answer on re-entry with no tap (INC-320)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-69-a-lazy-model-list-shows-its-stored-answer-on-re-entry-with-no-tap-INC-320-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--6ecf9--entry-with-no-tap-INC-320--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-70 a strict refusal focuses the first refused field (D70)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-70-a-strict-refusal-focuses-the-first-refused-field-D70-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--ae94e-he-first-refused-field-D70--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, no-preference)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-77-the-first-refused-field-s-label-lands-below-the-header-D2-no-preference-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--ebaac-he-header-D2-no-preference--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-77 the first refused field's label lands below the header (D2, reduce)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-77-the-first-refused-field-s-label-lands-below-the-header-D2-reduce-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--77acf-below-the-header-D2-reduce--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-small-model-list-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--4c4ed-r-INC-329-small-model-list--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-big-model-list-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--c2c01-wer-INC-329-big-model-list--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-75 the required mark is uniform across steps (D72)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-75-the-required-mark-is-uniform-across-steps-D72-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--b850a-s-uniform-across-steps-D72--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-16-typing-is-saved-without-judgement-only-Next-asks-the-door-to-judge-the-step-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--98508--the-door-to-judge-the-step-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-18 specifications survive a step Back

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-18-specifications-survive-a-step-Back-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--96e94-cations-survive-a-step-Back-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-19 the seller's own phrase survives into the suggestion

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-19-the-seller-s-own-phrase-survives-into-the-suggestion-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--4f5a5-urvives-into-the-suggestion-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-25 an inherited year picker is bounded by the model chosen three levels down, and relative bounds resolve as the door does (INC-288)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-25-an-inherited-year-picker-is-bounded-by-the-model-chosen-three-levels-down-and-relative-bounds-resolve-as-the-door-does-INC-288-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--36116-e-as-the-door-does-INC-288--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-159 a list fact ticks its tick list once, and the seller's untick stays

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-159-a-list-fact-ticks-its-tick-list-once-and-the-seller-s-untick-stays-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--3d2b2-d-the-seller-s-untick-stays-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-153-a-settled-range-hides-its-number-and-the-review-and-buyer-sheet-show-the-range-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--26bb2--buyer-sheet-show-the-range-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-34 a colour detail offers stemmed swatches, and an unmapped list shows no tray

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-34-a-colour-detail-offers-stemmed-swatches-and-an-unmapped-list-shows-no-tray-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--7f28e-unmapped-list-shows-no-tray-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-45 a declared swatch renders one ink, a two-tone and a pattern tile

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-45-a-declared-swatch-renders-one-ink-a-two-tone-and-a-pattern-tile-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--bdd4a-two-tone-and-a-pattern-tile-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-35 a model's single allowed answer is stored, not rendered, and the review shows it (D44)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-35-a-model-s-single-allowed-answer-is-stored-not-rendered-and-the-review-shows-it-D44-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--ebdcf-nd-the-review-shows-it-D44--desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">እየተቀመጠ ነው…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">እየተቀመጠ ነው…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-42-Amharic-catalog-text-falls-back-field-by-field-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--2f428-t-falls-back-field-by-field-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-43 a fact prefills a sibling the same selection unhides

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-43-a-fact-prefills-a-sibling-the-same-selection-unhides-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--accdb--the-same-selection-unhides-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-154 {country} in a label and its help reads the market's country in English

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-154-country-in-a-label-and-its-help-reads-the-market-s-country-in-English-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--b356d-market-s-country-in-English-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-155 {country} reads the country in Amharic

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">እየተቀመጠ ነው…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">እየተቀመጠ ነው…</p>
      - unexpected value "saving"
    9 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
      - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-155-country-reads-the-country-in-Amharic-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--57e08-eads-the-country-in-Amharic-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-156 with no place, market or confirmed home, {country} reads the fallback words

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    4 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    10 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-156-with-no-place-market-or-confirmed-home-country-reads-the-fallback-words-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--f2ae2-ry-reads-the-fallback-words-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-157 a category pointer in help text asks, then moves the ad and keeps the answer

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-157-a-category-pointer-in-help-text-asks-then-moves-the-ad-and-keeps-the-answer-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--c6d44-the-ad-and-keeps-the-answer-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-units.spec.ts › POSTING WIZARD — UNITS › PW-161 a number's unit reads in English, and in Amharic under Amharic

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "idle"
Timeout:  10000ms

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    3 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"
    11 × locator resolved to <p data-state="idle" data-testid="post-save-state" class="text-xs text-muted-foreground"></p>
       - unexpected value "idle"


  51 |     await expect(hit).toBeVisible();
  52 |     await hit.click();
> 53 |     await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
     |                                                       ^
```

Context: context file not found for `post-wizard-units-POSTING-WIZARD-UNITS-PW-161-a-number-s-unit-reads-in-English-and-in-Amharic-under-Amharic-desktop-1280` — Playwright's name `post-wizard-units-POSTING--ff0d2-nd-in-Amharic-under-Amharic-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-180 D119: a new post from an invite opens the place step on the invite's place, ahead of the seller's last post

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: PW-180: the invite's city was not filled in

expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('post-where-city')
Expected: "02714f35-8469-4dd8-848a-7e447cc13e61"
Received: "2aa6bc63-4e88-4c2d-97d1-9df401e01ae0"
Timeout:  20000ms

Call log:
  - PW-180: the invite's city was not filled in with timeout 20000ms
  - waiting for getByTestId('post-where-city')
    19 × locator resolved to <select id="post-where-city" data-testid="post-where-city" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">…</select>
       - unexpected value "2aa6bc63-4e88-4c2d-97d1-9df401e01ae0"

--- further error 1 ---
Error: PW-180: the invite's city was not filled in

expect(locator).toHaveValue(expected) failed

Locator:  getByTestId('post-where-city')
Expected: "02714f35-8469-4dd8-848a-7e447cc13e61"
Received: "2aa6bc63-4e88-4c2d-97d1-9df401e01ae0"
Timeout:  20000ms

Call log:
  - PW-180: the invite's city was not filled in with timeout 20000ms
  - waiting for getByTestId('post-where-city')
    19 × locator resolved to <select id="post-where-city" data-testid="post-where-city" class="min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">…</select>
       - unexpected value "2aa6bc63-4e88-4c2d-97d1-9df401e01ae0"


  301 |       page.getByTestId("post-where-city"),
  302 |       "PW-180: the invite's city was not filled in",
> 303 |     ).toHaveValue(invited.city.id, { timeout: 20_000 });
      |       ^
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-180-D119-a-new-post-from-an-invite-opens-the-place-step-on-the-invite-s-place-ahead-of-the-seller-s-last-post-desktop-1280` — Playwright's name `post-wizard-where-POSTING--16906-d-of-the-seller-s-last-post-desktop-1280`; this run carried 5 context file(s); of the same spec: none

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

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:34088:25) at http://127.0.0.1:4173/assets/index-C1RH8bDy.js:34120:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6025:5)
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×6
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:34088:25) at http://127.0.0.1:4173/assets/index-C1RH8bDy.js:34120:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6025:5) ×9
```

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 3

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:34088:25) at http://127.0.0.1:4173/assets/index-C1RH8bDy.js:34120:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6025:5)
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
[client-error] console.error: [attr-options] read refused fb884aab-d772-4439-8944-8032ece4b636 429
[client-error] HTTP 429 GET /api/attributes/fb884aab-d772-4439-8944-8032ece4b636/options ({"ok":false,"reason":"rateLimited"})
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
[client-error] console.error: [attr-options] read refused 3fcecbd5-dc06-4541-9e46-bff8ff939e77 429
[client-error] HTTP 429 GET /api/attributes/3fcecbd5-dc06-4541-9e46-bff8ff939e77/options ({"ok":false,"reason":"rateLimited"})
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw ×2
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

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:34088:25) at http://127.0.0.1:4173/assets/index-C1RH8bDy.js:34120:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-C1RH8bDy.js:6025:5) ×5
[client-error] refused POST /api/listings/draft: ok=false (e2e_wri_5_12_g5f7ub_treq:required)
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×6
console.error: [client-error] gate fetch threw
```

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
[client-error] console.error: [attr-options] read refused 939ae24d-5e56-4bb8-a13e-9eabfae3d19e 429
[client-error] HTTP 429 GET /api/attributes/939ae24d-5e56-4bb8-a13e-9eabfae3d19e/options ({"ok":false,"reason":"rateLimited"})
[client-error] console.error: Failed to load resource: the server responded with a status of 429 (Too Many Requests)
[client-error] console.error: [attr-options] read refused 1d674d57-c2e7-4b97-81fb-bd95023388c1 429
[client-error] HTTP 429 GET /api/attributes/1d674d57-c2e7-4b97-81fb-bd95023388c1/options ({"ok":false,"reason":"rateLimited"})
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw
```
