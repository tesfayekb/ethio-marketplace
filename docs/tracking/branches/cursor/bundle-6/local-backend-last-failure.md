# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45494230491
- Commit: `9ea47373664b36797b7ba65f0de9041b5ebf8669`
- Attempt: 1
- Repeat: 34 of 1490 tests repeated — specs directly changed 3/33, importers of a changed helper 0/80; budget 643 s; the time cap left 40 test runs
- Written (UTC): 2026-11-24T22:46:17.109Z
- Passed: 2647 · Skipped: 437 · Failed: 22
- Gating failures: 22 · STAGING-SINK (INC-1175, still gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 1
- Post-test errors (DEC-059, non-gating): smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16
- Sources without results: none
- Errors outside any test (INC-589): repeat (2)

## Gating failures

### admin-locations.spec.ts › L2a locations console › LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants

- Source: `shard 6`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-1-lt6a-us7fm5__e2e-loc-local-6-1-lt6c-3jqurt-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-1-lt6a-us7fm5__e2e-loc-local-6-1-lt6c-3jqurt-card')

[dialog-dump findRow(ethiopia/e2e-loc-local-6-1-lt6a-us7fm5/e2e-loc-local-6-1-lt6c-3jqurt)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-1-lt6a-us7fm5__e2e-loc-local-6-1-lt6c-3jqurt-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('location-ethiopia__e2e-loc-local-6-1-lt6a-us7fm5__e2e-loc-local-6-1-lt6c-3jqurt-card')

[dialog-dump findRow(ethiopia/e2e-loc-local-6-1-lt6a-us7fm5/e2e-loc-local-6-1-lt6c-3jqurt)] open dialogs: none

   at helpers/locations.ts:135

  133 |     await expect(row).toBeVisible({ timeout: 20000 });
  134 |   } catch (error) {
> 135 |     throw new Error(`${errorText(error)}\n${await dialogDump(page, `findRow(${key})`)}`);
      |           ^
  136 |   }
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

### admin-locations.spec.ts › L2a locations console › LT-6 step-up: an unproven factor cannot move a row; once proven the move carries the descendants

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-6-lt6a-bszw7a__e2e-loc-local-6-6-lt6c-au0ghc')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-6-lt6a-bszw7a__e2e-loc-local-6-6-lt6c-au0ghc')

[dialog-dump findRow(ethiopia/e2e-loc-local-6-6-lt6a-bszw7a/e2e-loc-local-6-6-lt6c-au0ghc)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-6-lt6a-bszw7a__e2e-loc-local-6-6-lt6c-au0ghc')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('location-ethiopia__e2e-loc-local-6-6-lt6a-bszw7a__e2e-loc-local-6-6-lt6c-au0ghc')

[dialog-dump findRow(ethiopia/e2e-loc-local-6-6-lt6a-bszw7a/e2e-loc-local-6-6-lt6c-au0ghc)] open dialogs: none

   at helpers/locations.ts:135

  133 |     await expect(row).toBeVisible({ timeout: 20000 });
  134 |   } catch (error) {
> 135 |     throw new Error(`${errorText(error)}\n${await dialogDump(page, `findRow(${key})`)}`);
      |           ^
  136 |   }
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: Contact
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - link "Terms" [ref=e321] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e322]:
            - link "Privacy" [ref=e323] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-local-7-0-ym6y5v-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-local-7-0-ym6y5v-card')

[dialog-dump findRow(e2e-cat-local-7-0-ym6y5v)] open dialogs: none
[roster-dump e2e-cat-local-7-0-ym6y5v] page: reading=0 roster=0 shown=0 · db: row active=true pointers=1
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-local-7-0-ym6y5v-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('category-row-e2e-cat-local-7-0-ym6y5v-card')

[dialog-dump findRow(e2e-cat-local-7-0-ym6y5v)] open dialogs: none
[roster-dump e2e-cat-local-7-0-ym6y5v] page: reading=0 roster=0 shown=0 · db: row active=true pointers=1

   at helpers/categories.ts:102

  100 |     await expect(row).toBeVisible({ timeout: 20000 });
  101 |   } catch (error) {
> 102 |     throw new Error(
      |           ^
```

Context:

```text
          - listitem [ref=e329]:
            - generic [ref=e330]: About
          - listitem [ref=e331]:
            - generic [ref=e332]: Contact
      - navigation "Help" [ref=e333]:
        - heading "Help" [level=2] [ref=e334]
        - list [ref=e335]:
          - listitem [ref=e336]:
            - generic [ref=e337]: Safety
      - navigation "Legal" [ref=e338]:
        - heading "Legal" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - link "Terms" [ref=e342] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e343]:
            - link "Privacy" [ref=e344] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e346]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-local-7-6-c0021n')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-local-7-6-c0021n')

[dialog-dump findRow(e2e-cat-local-7-6-c0021n)] open dialogs: none
[roster-dump e2e-cat-local-7-6-c0021n] page: reading=0 roster=0 shown=0 · db: row active=true pointers=1
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByRole('table').getByTestId('category-row-e2e-cat-local-7-6-c0021n')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByRole('table').getByTestId('category-row-e2e-cat-local-7-6-c0021n')

[dialog-dump findRow(e2e-cat-local-7-6-c0021n)] open dialogs: none
[roster-dump e2e-cat-local-7-6-c0021n] page: reading=0 roster=0 shown=0 · db: row active=true pointers=1

   at helpers/categories.ts:102

  100 |     await expect(row).toBeVisible({ timeout: 20000 });
  101 |   } catch (error) {
> 102 |     throw new Error(
      |           ^
```

Context:

```text
          - listitem [ref=e309]:
            - generic [ref=e310]: About
          - listitem [ref=e311]:
            - generic [ref=e312]: Contact
      - navigation "Help" [ref=e313]:
        - heading "Help" [level=2] [ref=e314]
        - list [ref=e315]:
          - listitem [ref=e316]:
            - generic [ref=e317]: Safety
      - navigation "Legal" [ref=e318]:
        - heading "Legal" [level=2] [ref=e319]
        - list [ref=e320]:
          - listitem [ref=e321]:
            - link "Terms" [ref=e322] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e323]:
            - link "Privacy" [ref=e324] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e326]: © 2026 ethio.com — All rights reserved.
```
```

### door-refusals.spec.ts › DRF-1 has_permission answers about the caller only: another account asking about a holder reads false

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: the holder reads the truth about itself

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: the holder reads the truth about itself

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  134 |   const own = await asHolder.rpc("has_permission", pair);
  135 |   expect(own.error).toBeNull();
> 136 |   expect(own.data, "the holder reads the truth about itself").toBe(true);
      |                                                               ^
  137 |
  138 |   const asOther = bearerClient((await passwordGrant(other.email, other.password)).access_token);
  139 |   const aboutHolder = await asOther.rpc("has_permission", pair);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/door-refusals.spec.ts:136:63
```

Context: context file not found for `door-refusals-DRF-1-has_permission-answers-about-the-caller-only-another-account-asking-about-a-holder-reads-false-mobile-360` — Playwright's name `door-refusals-DRF-1-has-pe-1e3af--about-a-holder-reads-false-mobile-360`; this run carried 41 context file(s); of the same spec: none

### door-refusals.spec.ts › DRF-1 has_permission answers about the caller only: another account asking about a holder reads false

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: the holder reads the truth about itself

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: the holder reads the truth about itself

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  134 |   const own = await asHolder.rpc("has_permission", pair);
  135 |   expect(own.error).toBeNull();
> 136 |   expect(own.data, "the holder reads the truth about itself").toBe(true);
      |                                                               ^
  137 |
  138 |   const asOther = bearerClient((await passwordGrant(other.email, other.password)).access_token);
  139 |   const aboutHolder = await asOther.rpc("has_permission", pair);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/door-refusals.spec.ts:136:63
```

Context: context file not found for `door-refusals-DRF-1-has_permission-answers-about-the-caller-only-another-account-asking-about-a-holder-reads-false-desktop-1280` — Playwright's name `door-refusals-DRF-1-has-pe-1e3af--about-a-holder-reads-false-desktop-1280`; this run carried 41 context file(s); of the same spec: none

### legal-admin.spec.ts › Admin Legal › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused

- Source: `shard 7`
- Project: `mobile-360`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: {"code": "P0009", "details": null, "hint": "Verify a second factor (TOTP) and retry this action.", "message": "step-up required"}
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: {"code": "P0009", "details": null, "hint": "Verify a second factor (TOTP) and retry this action.", "message": "step-up required"}

  844 |       await expect(rows.nth(i).getByTestId("rail-alert")).toHaveCount(1);
  845 |     await page.keyboard.press("Escape");
> 846 |     expect((await rpcAs(staff, "legal_review_overdue")).body).toBe(true);
      |                                                               ^
  847 |     await block.getByTestId("legal-review-mark").click();
  848 |     await page.getByTestId("legal-review-note").fill("LGA-17 read, no change");
  849 |     await page.getByTestId("legal-review-save").click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:846:63
```

Context:

```text
          - listitem [ref=e495]:
            - generic [ref=e496]: About
          - listitem [ref=e497]:
            - generic [ref=e498]: Contact
      - navigation "Help" [ref=e499]:
        - heading "Help" [level=2] [ref=e500]
        - list [ref=e501]:
          - listitem [ref=e502]:
            - generic [ref=e503]: Safety
      - navigation "Legal" [ref=e504]:
        - heading "Legal" [level=2] [ref=e505]
        - list [ref=e506]:
          - listitem [ref=e507]:
            - link "Terms" [ref=e508] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e509]:
            - link "Privacy" [ref=e510] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e512]: © 2026 ethio.com — All rights reserved.
```
```

### legal-admin.spec.ts › Admin Legal › LGA-17 an overdue review: the card says overdue and the admin menu's Legal entry carries the mark for its own reader; a review clears both; a person without legal:view is refused

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: {"code": "P0009", "details": null, "hint": "Verify a second factor (TOTP) and retry this action.", "message": "step-up required"}
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: {"code": "P0009", "details": null, "hint": "Verify a second factor (TOTP) and retry this action.", "message": "step-up required"}

  844 |       await expect(rows.nth(i).getByTestId("rail-alert")).toHaveCount(1);
  845 |     await page.keyboard.press("Escape");
> 846 |     expect((await rpcAs(staff, "legal_review_overdue")).body).toBe(true);
      |                                                               ^
  847 |     await block.getByTestId("legal-review-mark").click();
  848 |     await page.getByTestId("legal-review-note").fill("LGA-17 read, no change");
  849 |     await page.getByTestId("legal-review-save").click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-admin.spec.ts:846:63
```

Context:

```text
          - listitem [ref=e475]:
            - generic [ref=e476]: About
          - listitem [ref=e477]:
            - generic [ref=e478]: Contact
      - navigation "Help" [ref=e479]:
        - heading "Help" [level=2] [ref=e480]
        - list [ref=e481]:
          - listitem [ref=e482]:
            - generic [ref=e483]: Safety
      - navigation "Legal" [ref=e484]:
        - heading "Legal" [level=2] [ref=e485]
        - list [ref=e486]:
          - listitem [ref=e487]:
            - link "Terms" [ref=e488] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e489]:
            - link "Privacy" [ref=e490] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e492]: © 2026 ethio.com — All rights reserved.
```
```

### admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 9`
- Project: `mobile-360`

```text
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/[account id]"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/[account id]"

--- further error 1 ---
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/[account id]"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/[account id]"


  161 |     await expect(page.getByTestId("role-permissions")).toHaveCount(0);
  162 |     await expect(roleRow(page, "admin")).toHaveCount(0);
> 163 |     await expect(page).not.toHaveURL(/\/admin\/roles\//);
      |                            ^
  164 |   });
  165 |
  166 |   test("RP-2 create: a super admin creates a custom role through step-up", async ({ page }) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:163:28
```

Context:

```text
          - listitem [ref=e609]:
            - generic [ref=e610]: About
          - listitem [ref=e611]:
            - generic [ref=e612]: Contact
      - navigation "Help" [ref=e613]:
        - heading "Help" [level=2] [ref=e614]
        - list [ref=e615]:
          - listitem [ref=e616]:
            - generic [ref=e617]: Safety
      - navigation "Legal" [ref=e618]:
        - heading "Legal" [level=2] [ref=e619]
        - list [ref=e620]:
          - listitem [ref=e621]:
            - link "Terms" [ref=e622] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e623]:
            - link "Privacy" [ref=e624] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e626]: © 2026 ethio.com — All rights reserved.
```
```

### admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 9`
- Project: `desktop-1280`

```text
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/[account id]"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/[account id]"

--- further error 1 ---
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/roles\//
Received string: "http://127.0.0.1:4173/admin/roles/[account id]"
Timeout: 10000ms

Call log:
  - Expect "not toHaveURL" with timeout 10000ms
    14 × unexpected value "http://127.0.0.1:4173/admin/roles/[account id]"


  161 |     await expect(page.getByTestId("role-permissions")).toHaveCount(0);
  162 |     await expect(roleRow(page, "admin")).toHaveCount(0);
> 163 |     await expect(page).not.toHaveURL(/\/admin\/roles\//);
      |                            ^
  164 |   });
  165 |
  166 |   test("RP-2 create: a super admin creates a custom role through step-up", async ({ page }) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-roles.spec.ts:163:28
```

Context:

```text
          - listitem [ref=e614]:
            - generic [ref=e615]: About
          - listitem [ref=e616]:
            - generic [ref=e617]: Contact
      - navigation "Help" [ref=e618]:
        - heading "Help" [level=2] [ref=e619]
        - list [ref=e620]:
          - listitem [ref=e621]:
            - generic [ref=e622]: Safety
      - navigation "Legal" [ref=e623]:
        - heading "Legal" [level=2] [ref=e624]
        - list [ref=e625]:
          - listitem [ref=e626]:
            - link "Terms" [ref=e627] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e628]:
            - link "Privacy" [ref=e629] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e631]: © 2026 ethio.com — All rights reserved.
```
```

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone

- Source: `shard 10`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listing-row-[account id]-card')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('listing-row-[account id]-card')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listing-row-[account id]-card')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('listing-row-[account id]-card')


  2129 |     await page.getByTestId("listings-search").fill(ad.id);
  2130 |     const row = listingRow(page, ad.id);
> 2131 |     await expect(row).toBeVisible();
       |                       ^
  2132 |     await expect(row.getByTestId(`listing-row-${ad.id}-reports`)).toHaveText("Reports: 2");
  2133 |     await gotoReady(page, `/admin/listings/${ad.id}`);
  2134 |     const card = page.getByTestId("listing-reports");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2131:23
```

Context:

```text
          - listitem [ref=e189]:
            - generic [ref=e190]: About
          - listitem [ref=e191]:
            - generic [ref=e192]: Contact
      - navigation "Help" [ref=e193]:
        - heading "Help" [level=2] [ref=e194]
        - list [ref=e195]:
          - listitem [ref=e196]:
            - generic [ref=e197]: Safety
      - navigation "Legal" [ref=e198]:
        - heading "Legal" [level=2] [ref=e199]
        - list [ref=e200]:
          - listitem [ref=e201]:
            - link "Terms" [ref=e202] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e203]:
            - link "Privacy" [ref=e204] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e206]: © 2026 ethio.com — All rights reserved.
```
```

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-31 Reports: the open count on the row and the reasons on the listing's page for listings:review; nothing for listings:view alone

- Source: `shard 10`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listing-row-[account id]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('listing-row-[account id]')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('listing-row-[account id]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('listing-row-[account id]')


  2129 |     await page.getByTestId("listings-search").fill(ad.id);
  2130 |     const row = listingRow(page, ad.id);
> 2131 |     await expect(row).toBeVisible();
       |                       ^
  2132 |     await expect(row.getByTestId(`listing-row-${ad.id}-reports`)).toHaveText("Reports: 2");
  2133 |     await gotoReady(page, `/admin/listings/${ad.id}`);
  2134 |     const card = page.getByTestId("listing-reports");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2131:23
```

Context:

```text
          - listitem [ref=e223]:
            - generic [ref=e224]: About
          - listitem [ref=e225]:
            - generic [ref=e226]: Contact
      - navigation "Help" [ref=e227]:
        - heading "Help" [level=2] [ref=e228]
        - list [ref=e229]:
          - listitem [ref=e230]:
            - generic [ref=e231]: Safety
      - navigation "Legal" [ref=e232]:
        - heading "Legal" [level=2] [ref=e233]
        - list [ref=e234]:
          - listitem [ref=e235]:
            - link "Terms" [ref=e236] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e237]:
            - link "Privacy" [ref=e238] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e240]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-23 a commit without step-up is refused and writes nothing

- Source: `shard 15`
- Project: `mobile-360`

```text
Error: {"error":"forbidden"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 403
--- further error 1 ---
Error: {"error":"forbidden"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 403

  1912 |       const categories = file([line({ category_slug: slug, name_en: slug })]);
  1913 |       const preview = await importPost(page, token, { mode: "preview", categories });
> 1914 |       expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
       |                                                               ^
  1915 |
  1916 |       const commit = await importPost(page, token, {
  1917 |         mode: "commit",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-lifecycle.spec.ts:1914:63
```

Context:

```text
          - listitem [ref=e191]:
            - generic [ref=e192]: About
          - listitem [ref=e193]:
            - generic [ref=e194]: Contact
      - navigation "Help" [ref=e195]:
        - heading "Help" [level=2] [ref=e196]
        - list [ref=e197]:
          - listitem [ref=e198]:
            - generic [ref=e199]: Safety
      - navigation "Legal" [ref=e200]:
        - heading "Legal" [level=2] [ref=e201]
        - list [ref=e202]:
          - listitem [ref=e203]:
            - link "Terms" [ref=e204] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e205]:
            - link "Privacy" [ref=e206] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e208]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-23 a commit without step-up is refused and writes nothing

- Source: `shard 15`
- Project: `desktop-1280`

```text
Error: {"error":"forbidden"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 403
--- further error 1 ---
Error: {"error":"forbidden"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 403

  1912 |       const categories = file([line({ category_slug: slug, name_en: slug })]);
  1913 |       const preview = await importPost(page, token, { mode: "preview", categories });
> 1914 |       expect(preview.status, JSON.stringify(preview.payload)).toBe(200);
       |                                                               ^
  1915 |
  1916 |       const commit = await importPost(page, token, {
  1917 |         mode: "commit",
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-categories-lifecycle.spec.ts:1914:63
```

Context:

```text
          - listitem [ref=e215]:
            - generic [ref=e216]: About
          - listitem [ref=e217]:
            - generic [ref=e218]: Contact
      - navigation "Help" [ref=e219]:
        - heading "Help" [level=2] [ref=e220]
        - list [ref=e221]:
          - listitem [ref=e222]:
            - generic [ref=e223]: Safety
      - navigation "Legal" [ref=e224]:
        - heading "Legal" [level=2] [ref=e225]
        - list [ref=e226]:
          - listitem [ref=e227]:
            - link "Terms" [ref=e228] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e229]:
            - link "Privacy" [ref=e230] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e232]: © 2026 ethio.com — All rights reserved.
```
```

### mfa-stepup.spec.ts › U1f step-up authentication › MF-3 no factor: the modal explains and the RPC is never called

- Source: `shard 15`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('deactivate-reason')


  146 |
  147 |     await gotoReady(page, `/admin/users/${target.id}`);
> 148 |     await page.getByTestId("deactivate-reason").fill("MF-3 proof");
      |                                                 ^
  149 |     await page.getByTestId("deactivate-user").click();
  150 |
  151 |     await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:148:49
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

### mfa-stepup.spec.ts › U1f step-up authentication › MF-8 the gate's dialog is not in the page's first download; the first step-up fetches it and draws it on the top layer

- Source: `shard 15`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('deactivate-reason')


  178 |
  179 |     await gotoReady(page, `/admin/users/${target.id}`);
> 180 |     await page.getByTestId("deactivate-reason").fill("MF-8 proof");
      |                                                 ^
  181 |     expect(await asked()).toEqual({ preloaded: [], fetched: [] });
  182 |     await page.getByTestId("deactivate-user").click();
  183 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:180:49
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

### mfa-stepup.spec.ts › U1f step-up authentication › MF-3 no factor: the modal explains and the RPC is never called

- Source: `shard 15`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('deactivate-reason')


  146 |
  147 |     await gotoReady(page, `/admin/users/${target.id}`);
> 148 |     await page.getByTestId("deactivate-reason").fill("MF-3 proof");
      |                                                 ^
  149 |     await page.getByTestId("deactivate-user").click();
  150 |
  151 |     await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:148:49
```

Context:

```text
          - listitem [ref=e235]:
            - generic [ref=e236]: About
          - listitem [ref=e237]:
            - generic [ref=e238]: Contact
      - navigation "Help" [ref=e239]:
        - heading "Help" [level=2] [ref=e240]
        - list [ref=e241]:
          - listitem [ref=e242]:
            - generic [ref=e243]: Safety
      - navigation "Legal" [ref=e244]:
        - heading "Legal" [level=2] [ref=e245]
        - list [ref=e246]:
          - listitem [ref=e247]:
            - link "Terms" [ref=e248] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e249]:
            - link "Privacy" [ref=e250] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e252]: © 2026 ethio.com — All rights reserved.
```
```

### mfa-stepup.spec.ts › U1f step-up authentication › MF-8 the gate's dialog is not in the page's first download; the first step-up fetches it and draws it on the top layer

- Source: `shard 15`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('deactivate-reason')


  178 |
  179 |     await gotoReady(page, `/admin/users/${target.id}`);
> 180 |     await page.getByTestId("deactivate-reason").fill("MF-8 proof");
      |                                                 ^
  181 |     expect(await asked()).toEqual({ preloaded: [], fetched: [] });
  182 |     await page.getByTestId("deactivate-user").click();
  183 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:180:49
```

Context:

```text
          - listitem [ref=e235]:
            - generic [ref=e236]: About
          - listitem [ref=e237]:
            - generic [ref=e238]: Contact
      - navigation "Help" [ref=e239]:
        - heading "Help" [level=2] [ref=e240]
        - list [ref=e241]:
          - listitem [ref=e242]:
            - generic [ref=e243]: Safety
      - navigation "Legal" [ref=e244]:
        - heading "Legal" [level=2] [ref=e245]
        - list [ref=e246]:
          - listitem [ref=e247]:
            - link "Terms" [ref=e248] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e249]:
            - link "Privacy" [ref=e250] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e252]: © 2026 ethio.com — All rights reserved.
```
```

### mfa-stepup.spec.ts › U1f-4 step-up freshness › MF-6 unenrolling the only factor drops the stepped-up state

- Source: `shard 15`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('deactivate-reason')


  280 |
  281 |       await gotoReady(page, `/admin/users/${target.id}`);
> 282 |       await page.getByTestId("deactivate-reason").fill("MF-6 proof");
      |                                                   ^
  283 |       await page.getByTestId("deactivate-user").click();
  284 |
  285 |       await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:282:51
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

### mfa-stepup.spec.ts › U1f-4 step-up freshness › MF-6 unenrolling the only factor drops the stepped-up state

- Source: `shard 15`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('deactivate-reason')


  280 |
  281 |       await gotoReady(page, `/admin/users/${target.id}`);
> 282 |       await page.getByTestId("deactivate-reason").fill("MF-6 proof");
      |                                                   ^
  283 |       await page.getByTestId("deactivate-user").click();
  284 |
  285 |       await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:282:51
```

Context:

```text
          - listitem [ref=e235]:
            - generic [ref=e236]: About
          - listitem [ref=e237]:
            - generic [ref=e238]: Contact
      - navigation "Help" [ref=e239]:
        - heading "Help" [level=2] [ref=e240]
        - list [ref=e241]:
          - listitem [ref=e242]:
            - generic [ref=e243]: Safety
      - navigation "Legal" [ref=e244]:
        - heading "Legal" [level=2] [ref=e245]
        - list [ref=e246]:
          - listitem [ref=e247]:
            - link "Terms" [ref=e248] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e249]:
            - link "Privacy" [ref=e250] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e252]: © 2026 ethio.com — All rights reserved.
```
```

### mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7c a no-factor identity is released with the hint

- Source: `shard 15`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('edit-display-name')


  380 |       await switchUser(page, staff.email, staff.password);
  381 |       await gotoReady(page, `/admin/users/${target.id}`);
> 382 |       await page.getByTestId("edit-display-name").fill("MF-7c never written");
      |                                                   ^
  383 |       await page.getByTestId("edit-save").click();
  384 |
  385 |       await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:382:51
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

### mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7c a no-factor identity is released with the hint

- Source: `shard 15`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('edit-display-name')


  380 |       await switchUser(page, staff.email, staff.password);
  381 |       await gotoReady(page, `/admin/users/${target.id}`);
> 382 |       await page.getByTestId("edit-display-name").fill("MF-7c never written");
      |                                                   ^
  383 |       await page.getByTestId("edit-save").click();
  384 |
  385 |       await expect(page.getByTestId("step-up-no-factor")).toBeVisible({ timeout: 15000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:382:51
```

Context:

```text
          - listitem [ref=e235]:
            - generic [ref=e236]: About
          - listitem [ref=e237]:
            - generic [ref=e238]: Contact
      - navigation "Help" [ref=e239]:
        - heading "Help" [level=2] [ref=e240]
        - list [ref=e241]:
          - listitem [ref=e242]:
            - generic [ref=e243]: Safety
      - navigation "Legal" [ref=e244]:
        - heading "Legal" [level=2] [ref=e245]
        - list [ref=e246]:
          - listitem [ref=e247]:
            - link "Terms" [ref=e248] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e249]:
            - link "Privacy" [ref=e250] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e252]: © 2026 ethio.com — All rights reserved.
```
```

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `webkit-390` · source `webkit` · sage-ad-page.spec.ts › Sage ad page at 390, dark › SAP-1 each tier's ad page reads its tokens (390, dark) — Error: regular ad: the segment

## Flaky bodies (DEC-078)

### sage-ad-page.spec.ts › Sage ad page at 390, dark › SAP-1 each tier's ad page reads its tokens (390, dark)

- Source: `webkit`
- Project: `webkit-390`

```text
Error: regular ad: the segment

expect(received).toBe(expected) // Object.is equality

Expected: "oklch(0.273 0.024 164.199997)"
Received: "oklab(0.273 -0.023093 0.006535 / 0.124013)"
--- further error 1 ---
Error: regular ad: the segment

expect(received).toBe(expected) // Object.is equality

Expected: "oklch(0.273 0.024 164.199997)"
Received: "oklab(0.273 -0.023093 0.006535 / 0.124013)"

  283 |             await page.mouse.move(0, 0);
  284 |             await settled(page);
> 285 |             expect(await style(description, "background-color"), `${at}: the segment`).toBe(
      |                                                                                        ^
  286 |               await tokenStyle(
  287 |                 page,
  288 |                 mode,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/sage-ad-page.spec.ts:285:88
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
      - navigation "Legal" [ref=e337]:
        - heading "Legal" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - link "Terms" [ref=e341]:
              - /url: /terms
          - listitem [ref=e342]:
            - link "Privacy" [ref=e343]:
              - /url: /privacy
    - paragraph [ref=e345]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

Playwright fails a run whose every test passed when an error happens outside any test (global setup or teardown, a worker's own fixture). A source named here can have a red job while every one of its tests passed.

### repeat: 2 in the results file; the log's summary says 2

```text
Timed out waiting 763s for the test suite to run
(no place given)
```

```text
Timed out waiting 763s for the teardown for test suite to run
(no place given)
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

62 line(s), 27 message(s): 0 off the allowlist, 27 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `categories badHeader` (quiet) | 4 | shard 4, shard 15 |
| `categories wrongFile` (quiet) | 4 | shard 4, shard 15 |
| `definitions badHeader` (quiet) | 4 | shard 4, shard 8 |
| `definitions wrongFile` (quiet) | 4 | shard 4, shard 8 |
| `categories file too large` (quiet) | 2 | shard 4 |
| `categories nulByte` (quiet) | 2 | shard 4 |
| `categories unknownColumn` (quiet) | 2 | shard 4 |
| `countries badHeader` (quiet) | 2 | shard 4 |
| `countries nulByte` (quiet) | 2 | shard 4 |
| `countries tooManyRows` (quiet) | 2 | shard 4 |
| `countries unknownColumn` (quiet) | 2 | shard 4 |
| `countries wrongFile` (quiet) | 2 | shard 4 |
| `definitions nulByte` (quiet) | 2 | shard 4 |
| `definitions tooManyRows` (quiet) | 2 | shard 4 |
| `definitions unknownColumn` (quiet) | 2 | shard 4 |
| `links unknownColumn` (quiet) | 2 | shard 4 |
| `locations badHeader` (quiet) | 2 | shard 4 |
| `locations file too large` (quiet) | 2 | shard 4 |
| `locations nulByte` (quiet) | 2 | shard 4 |
| `locations unknownColumn` (quiet) | 2 | shard 4 |
| `locations wrongFile` (quiet) | 2 | shard 4 |
| `strings badHeader` (quiet) | 2 | shard 4 |
| `strings emptyFile` (quiet) | 2 | shard 4 |
| `strings nulByte` (quiet) | 2 | shard 4 |
| `strings tooManyRows` (quiet) | 2 | shard 4 |
| `strings unknownColumn` (quiet) | 2 | shard 4 |
| `strings wrongFile` (quiet) | 2 | shard 4 |

Quiet (allowlisted): categories badHeader ×4 · categories wrongFile ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2

Off the allowlist: none.

## Accessibility (DEC-084, gating)

Logs read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, webkit, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, shard 9, shard 10, shard 11, shard 12, shard 13, shard 14, shard 15, shard 16, repeat · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-11-24T22:19:51.168Z | 6.9 min |
| email | 2026-11-24T22:20:30.923Z | 0.3 min |
| webkit | 2026-11-24T22:20:51.209Z | 14.5 min |
| shard 1 | 2026-11-24T22:21:05.256Z | 7.0 min |
| shard 2 | 2026-11-24T22:20:35.524Z | 11.9 min |
| shard 3 | 2026-11-24T22:19:52.172Z | 7.2 min |
| shard 4 | 2026-11-24T22:20:32.898Z | 12.0 min |
| shard 5 | 2026-11-24T22:22:06.266Z | 9.1 min |
| shard 6 | 2026-11-24T22:20:06.864Z | 16.0 min |
| shard 7 | 2026-11-24T22:20:17.602Z | 20.3 min |
| shard 8 | 2026-11-24T22:20:33.728Z | 25.0 min |
| shard 9 | 2026-11-24T22:19:51.470Z | 11.3 min |
| shard 10 | 2026-11-24T22:24:32.426Z | 21.2 min |
| shard 11 | 2026-11-24T22:20:09.521Z | 5.8 min |
| shard 12 | 2026-11-24T22:22:22.362Z | 5.8 min |
| shard 13 | 2026-11-24T22:20:45.525Z | 12.9 min |
| shard 14 | 2026-11-24T22:20:12.173Z | 20.4 min |
| shard 15 | 2026-11-24T22:20:38.644Z | 23.9 min |
| shard 16 | 2026-11-24T22:20:39.123Z | 7.3 min |
| repeat | 2026-11-24T22:20:45.013Z | 12.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-attributes-editor.spec.ts` | 108 | 26.9 min | shard 14, repeat |
| `admin-listings.spec.ts` | 82 | 25.9 min | webkit, shard 10 |
| `admin-screening.spec.ts` | 64 | 21.3 min | webkit, shard 14 |
| `admin-categories-lifecycle.spec.ts` | 52 | 20.8 min | shard 15 |
| `admin-translations-console.spec.ts` | 46 | 19.2 min | smoke, shard 8 |
| `legal-admin.spec.ts` | 44 | 18.4 min | shard 7 |
| `mfa-stepup.spec.ts` | 28 | 18.4 min | webkit, shard 15 |
| `admin-attributes-import.spec.ts` | 40 | 17.6 min | shard 8 |
| `admin-attributes-library.spec.ts` | 42 | 16.9 min | shard 2 |
| `admin-locations.spec.ts` | 44 | 15.7 min | shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 15.7 min | shard 13 |
| `admin-monetisation.spec.ts` | 34 | 13.1 min | smoke, shard 10 |
| `admin-roles.spec.ts` | 28 | 12.2 min | shard 9 |
| `import-security.spec.ts` | 36 | 12.0 min | shard 4 |
| `shell.spec.ts` | 234 | 10.6 min | shard 1 |
| `legal-doors.spec.ts` | 34 | 9.8 min | smoke, shard 8 |
| `admin-categories-console.spec.ts` | 34 | 9.6 min | shard 7 |
| `admin-attributes-safety.spec.ts` | 18 | 7.0 min | shard 5 |
| `admin-countries.spec.ts` | 18 | 6.7 min | shard 6 |
| `dialogs.spec.ts` | 36 | 6.4 min | webkit, shard 10 |
| `admin-translations-governance.spec.ts` | 20 | 6.0 min | smoke, shard 16 |
| `photo-pipeline.spec.ts` | 74 | 5.6 min | webkit, shard 16 |
| `ad-page.spec.ts` | 104 | 5.5 min | webkit, shard 13 |
| `auth-signout.spec.ts` | 44 | 5.2 min | webkit, shard 9 |
| `post-wizard-bundle2.spec.ts` | 70 | 5.1 min | shard 3 |
| `feed-screens.spec.ts` | 40 | 4.9 min | webkit, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 4.3 min | shard 12 |
| `admin-guides.spec.ts` | 14 | 4.2 min | shard 3 |
| `post-wizard-place.spec.ts` | 40 | 4.2 min | shard 11 |
| `admin-users.spec.ts` | 28 | 4.2 min | shard 16 |
| `viewing-place.spec.ts` | 22 | 4.0 min | shard 15 |
| `post-wizard-where.spec.ts` | 32 | 3.8 min | shard 11 |
| `admin-translations-data.spec.ts` | 10 | 3.7 min | shard 5 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 4 |
| `my-listings-ad.spec.ts` | 38 | 3.3 min | shard 12 |
| `posting-routes.spec.ts` | 80 | 3.0 min | shard 2 |
| `post-wizard-pricing.spec.ts` | 52 | 2.7 min | shard 8 |
| `post-wizard-category.spec.ts` | 52 | 2.6 min | webkit, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 2.5 min | shard 3 |
| `choice-lists.spec.ts` | 96 | 2.4 min | shard 7 |
| `sage-ad-page.spec.ts` | 30 | 2.3 min | webkit, shard 11 |
| `sage-bands.spec.ts` | 76 | 2.3 min | shard 6 |
| `sage-tiers.spec.ts` | 52 | 2.2 min | webkit, shard 2 |
| `name-check-queue.spec.ts` | 8 | 2.0 min | smoke, shard 9 |
| `admin-services.spec.ts` | 10 | 1.8 min | shard 1 |
| `legal-certify.spec.ts` | 44 | 1.7 min | shard 14 |
| `admin-categories-images.spec.ts` | 6 | 1.5 min | smoke, webkit, shard 12 |
| `admin-audit.spec.ts` | 16 | 1.5 min | shard 9 |
| `admin-shell.spec.ts` | 12 | 1.4 min | shard 2 |
| `my-listings-page.spec.ts` | 24 | 1.2 min | webkit, shard 10 |
| `my-listings-promote.spec.ts` | 10 | 1.1 min | shard 11 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 12 |
| `press.spec.ts` | 22 | 1.0 min | shard 12 |
| `sage-shell.spec.ts` | 80 | 1.0 min | shard 16 |
| `i18n-sign-in-language.spec.ts` | 12 | 1.0 min | shard 15 |
| `breadcrumbs.spec.ts` | 6 | 1.0 min | shard 10 |
| `my-listings-levels.spec.ts` | 28 | 1.0 min | shard 4 |
| `user-guides.spec.ts` | 18 | 1.0 min | shard 13 |
| `one-line-slots-admin.spec.ts` | 10 | 0.9 min | shard 3 |
| `my-listings-doors.spec.ts` | 28 | 0.9 min | shard 3 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 13 |
| `sage-cards.spec.ts` | 40 | 0.8 min | webkit, shard 7 |
| `ad-page-doors.spec.ts` | 90 | 0.8 min | shard 14, repeat |
| `settings.spec.ts` | 16 | 0.8 min | shard 1 |
| `house-style.spec.ts` | 18 | 0.7 min | shard 11 |
| `primitives-law.spec.ts` | 24 | 0.7 min | shard 16 |
| `post-wizard-removed.spec.ts` | 4 | 0.6 min | shard 7 |
| `layout.spec.ts` | 18 | 0.6 min | webkit, shard 10 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | smoke, shard 5 |
| `legal-accept.spec.ts` | 12 | 0.5 min | shard 2 |
| `supabase-door.spec.ts` | 12 | 0.5 min | shard 13 |
| `posting-routes-catalog.spec.ts` | 18 | 0.5 min | shard 6 |
| `overlays.spec.ts` | 8 | 0.4 min | shard 15 |
| `post-wizard-finder.spec.ts` | 8 | 0.4 min | shard 6 |
| `post-wizard-details.spec.ts` | 8 | 0.4 min | shard 14 |
| `submenu.spec.ts` | 14 | 0.3 min | smoke, shard 15 |
| `one-line-slots.spec.ts` | 10 | 0.3 min | shard 8 |
| `auth-caller-gates.spec.ts` | 8 | 0.3 min | shard 5 |
| `page-head.spec.ts` | 4 | 0.3 min | shard 13 |
| `i18n-coverage.spec.ts` | 14 | 0.3 min | shard 4 |
| `legal-history.spec.ts` | 6 | 0.3 min | shard 16 |
| `shell-bands.spec.ts` | 16 | 0.3 min | smoke, shard 12 |
| `post-wizard-units.spec.ts` | 4 | 0.3 min | shard 3 |
| `posting-routes-dials.spec.ts` | 14 | 0.2 min | shard 9 |
| `legal-pages.spec.ts` | 10 | 0.2 min | shard 11 |
| `auth-signup.spec.ts` | 6 | 0.2 min | email |
| `a11y.spec.ts` | 4 | 0.2 min | smoke |
| `posting-routes-identity.spec.ts` | 4 | 0.2 min | shard 15 |
| `submenu-look.spec.ts` | 12 | 0.2 min | smoke, shard 2 |
| `shell-table-law.spec.ts` | 6 | 0.2 min | shard 2, repeat |
| `door-refusals.spec.ts` | 14 | 0.2 min | shard 7 |
| `feed-index.spec.ts` | 30 | 0.2 min | shard 6 |
| `category-nav.spec.ts` | 10 | 0.2 min | shard 5 |
| `rbac.spec.ts` | 6 | 0.2 min | shard 7 |
| `menu-rows.spec.ts` | 6 | 0.2 min | smoke, shard 14 |
| `auth-reset.spec.ts` | 6 | 0.1 min | shard 8 |
| `feed-route.spec.ts` | 22 | 0.1 min | shard 9 |
| `account-saved.spec.ts` | 4 | 0.1 min | shard 4 |
| `auth-signin-errors.spec.ts` | 5 | 0.1 min | shard 12 |
| `locale-format.spec.ts` | 2 | 0.1 min | shard 1 |
| `post-wizard-recent.spec.ts` | 2 | 0.1 min | shard 9 |
| `admin-ai-calls.spec.ts` | 2 | 0.1 min | shard 11 |
| `dark-cards.spec.ts` | 4 | 0.1 min | shard 10 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 3 |
| `smoke-auth-i18n.spec.ts` | 2 | 0.1 min | shard 8 |
| `category-image-routes.spec.ts` | 10 | 0.1 min | shard 5 |
| `submenu-touch.spec.ts` | 8 | 0.1 min | smoke, shard 13 |
| `overlay-shift.spec.ts` | 6 | 0.1 min | shard 6 |
| `on-demand-failure.spec.ts` | 2 | 0.1 min | shard 16 |
| `ad-page-layout.spec.ts` | 2 | 0.1 min | shard 10 |
| `i18n-layers.spec.ts` | 6 | 0.1 min | shard 14 |
| `fonts.spec.ts` | 2 | 0.1 min | shard 1 |
| `seller-name-hidden.spec.ts` | 2 | 0.1 min | shard 4 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 16 |
| `rail-first-paint.spec.ts` | 4 | 0.0 min | shard 14 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 11 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `mfa-stepup.spec.ts` › MF-3 no factor: the modal explains and the RPC is never called | mobile-360 | 120.9 s |
| `mfa-stepup.spec.ts` › MF-6 unenrolling the only factor drops the stepped-up state | desktop-1280 | 120.8 s |
| `mfa-stepup.spec.ts` › MF-3 no factor: the modal explains and the RPC is never called | desktop-1280 | 120.7 s |
| `mfa-stepup.spec.ts` › MF-6 unenrolling the only factor drops the stepped-up state | mobile-360 | 120.7 s |
| `mfa-stepup.spec.ts` › MF-7c a no-factor identity is released with the hint | desktop-1280 | 120.6 s |
| `mfa-stepup.spec.ts` › MF-8 the gate's dialog is not in the page's first download; the first step-up fetches it and draws it on the top layer | mobile-360 | 120.5 s |
| `mfa-stepup.spec.ts` › MF-8 the gate's dialog is not in the page's first download; the first step-up fetches it and draws it on the top layer | desktop-1280 | 120.5 s |
| `mfa-stepup.spec.ts` › MF-7c a no-factor identity is released with the hint | mobile-360 | 120.4 s |
| `admin-categories-console.spec.ts` › CT-7b browse paths: an unproven factor cannot move a pointer | mobile-360 | 61.0 s |
| `admin-categories-console.spec.ts` › CT-7b browse paths: an unproven factor cannot move a pointer | desktop-1280 | 61.0 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | desktop-1280 | 59.5 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | mobile-360 | 59.2 s |
| `legal-admin.spec.ts` › LGA-21 the in-force card shows View to every legal:view reader and Add translation only with legal:publish | mobile-360 | 59.2 s |
| `admin-listings.spec.ts` › AL-28 the photos card on the page; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D194, D154 B4) | desktop-1280 | 58.2 s |
| `admin-attributes-links.spec.ts` › AT-42 toggling Required keeps the card rank and never loses the link | mobile-360 | 54.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 1, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 2 user(s) owned by process 45494230491-localproof
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 1 (pool 0, fresh 1)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45494230491-local-email
```

## Post-test errors: webkit

webkit: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 2, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 45494230491-local-webkit
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45494230491-local-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 45494230491-local-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 3, fresh 5)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45494230491-local-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 25 user(s) owned by process 45494230491-local-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 15 user(s) owned by process 45494230491-local-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45494230491-local-6
```

## Post-test errors: shard 7

shard 7: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45494230491-local-7
```

## Post-test errors: shard 8

shard 8: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 45494230491-local-8
```

## Post-test errors: shard 9

shard 9: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 16 (pool 4, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 45494230491-local-9
```

## Post-test errors: shard 10

shard 10: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 13 (pool 4, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 9 user(s) owned by process 45494230491-local-10
```

## Post-test errors: shard 11

shard 11: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45494230491-local-11
```

## Post-test errors: shard 12

shard 12: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 3, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 5 user(s) owned by process 45494230491-local-12
```

## Post-test errors: shard 13

shard 13: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 45494230491-local-13
```

## Post-test errors: shard 14

shard 14: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 10 (pool 4, fresh 6)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 45494230491-local-14
```

## Post-test errors: shard 15

shard 15: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 42 (pool 2, fresh 40)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 65 user(s) owned by process 45494230491-local-15
```

## Post-test errors: shard 16

shard 16: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 23 user(s) owned by process 45494230491-local-16
```

## Server errors: shard 6

No `[ssr-error]` lines in the `shard 6` log (or no log was uploaded).

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_locations?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_locations?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_locations?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_locations?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_locations?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_locations?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_locations?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_locations?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_locations?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_locations?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
```

## Server errors: shard 7

No `[ssr-error]` lines in the `shard 7` log (or no log was uploaded).

## Client errors: shard 7

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_categories?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_categories?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_categories?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_categories?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_categories?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_categories?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_categories?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_categories?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_categories?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_categories?order=id.asc&limit=1000 ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
```

## Server errors: shard 9

No `[ssr-error]` lines in the `shard 9` log (or no log was uploaded).

## Client errors: shard 9

No `[client-error]` lines in the `shard 9` log (or no log was uploaded).

## Server errors: shard 10

No `[ssr-error]` lines in the `shard 10` log (or no log was uploaded).

## Client errors: shard 10

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_listings ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_listings ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_listings ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_listings ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_listings ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_listings ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_listings ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_listings ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_listings ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_listings ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
```

## Server errors: shard 15

```text
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 15

```text
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_get_user ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 () ×2
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_roles ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_user_activity ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"}) ×2
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_roles ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_get_user ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 () ×2
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_roles ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_user_activity ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_get_user ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 () ×2
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_user_activity ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_roles ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_get_user ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] console.error: Failed to load resource: the server responded with a status of 500 () ×2
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_list_roles ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
[client-error] HTTP 500 POST https://127.0.0.1:31321/rest/v1/rpc/admin_user_activity ({"code":"P0009","details":null,"hint":"Set up an authenticator app (TOTP) and retry this action.","message":"step-up required: no verified factor"})
```
