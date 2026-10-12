# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38218977877 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38218977877
- Commit: `07c1e2b632863e63fc1a4b0340c69313680bc7d5`
- Attempt: 1
- Written (UTC): 2026-10-12T08:13:22.722Z
- Post-test warnings: 33
- Flaky (passed on retry, DEC-030, non-gating): 11

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › L4b location picker › LS-10 a saved area beats the deepest guess — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-console.spec.ts › C2 categories console › CT-43 the row's actions: Edit, a red Delete only when retired, the menu's verbs, a dialog that closes back to the table — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op — Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · admin-shell.spec.ts › Admin shell (U0) › A-8 regular user: /admin still redirects home — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-157 a category pointer in help text asks, then moves the ad and keeps the answer — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 4` · post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · admin-users.spec.ts › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · auth-signout.spec.ts › U0k session policy › SP-3 absolute: continuous activity does not save the session — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 7` · post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-87 off the chosen path the step asks again, Keep it returns, a new leaf clears it — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-157 a category pointer in help text asks, then moves the ad and keeps the answer — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 8` · post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### shell.spec.ts › L4b location picker › LS-10 a saved area beats the deepest guess

- Source: `smoke`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `shell-L4b-location-picker-LS-10-a-saved-area-beats-the-deepest-guess-desktop-1280`

### admin-categories-console.spec.ts › C2 categories console › CT-43 the row's actions: Edit, a red Delete only when retired, the menu's verbs, a dialog that closes back to the table

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
              - generic [ref=e328]: How it works
        - navigation "Help" [ref=e329]:
          - heading "Help" [level=2] [ref=e330]
          - list [ref=e331]:
            - listitem [ref=e332]:
              - generic [ref=e333]: Safety
            - listitem [ref=e334]:
              - generic [ref=e335]: Contact
        - navigation "Legal" [ref=e336]:
          - heading "Legal" [level=2] [ref=e337]
          - list [ref=e338]:
            - listitem [ref=e339]:
              - generic [ref=e340]: Terms
            - listitem [ref=e341]:
              - generic [ref=e342]: Privacy
      - paragraph [ref=e344]: © 2026 ethio.com — All rights reserved.
  - generic [ref=e346]:
    - text: Actions
    - tooltip "Actions" [ref=e347]
```
```

### admin-categories-lifecycle.spec.ts › CAT-IE categories import/export › CT-18 a real-export round trip is a no-op

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
    "adds": 0,
-   "changes": 0,
+   "changes": 15,
    "deletes": 0,
    "reactivations": 0,
    "refused": 0,
    "retires": 0,
  }
--- further error 1 ---
Error: CT-18 the round trip was not a no-op: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
    "adds": 0,
-   "changes": 0,
+   "changes": 15,
    "deletes": 0,
    "reactivations": 0,
    "refused": 0,
    "retires": 0,
  }

  968 |       { adds, changes, retires, reactivations, deletes, refused },
  969 |       `CT-18 the round trip was not a no-op: ${await counts.textContent()}`,
> 970 |     ).toEqual({ adds: 0, changes: 0, retires: 0, reactivations: 0, deletes: 0, refused: 0 });
```

Context:

```text
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import categories" [active] [ref=e2]:
    - heading "Import categories" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import categories
      - paragraph [ref=e6]: Choose the categories file you exported. Nothing is written until you preview it and confirm.
      - paragraph [ref=e7]: "Columns marked “(read-only)” are worked out for you: you can edit them in the file, but they are never applied."
      - status [ref=e8]: 0 added · 15 changed · 0 retired · 0 reactivated · 0 deleted · 138 unchanged · 0 refused
      - generic [ref=e9]:
        - button "Discard" [ref=e10] [cursor=pointer]
        - button "Confirm import" [ref=e11] [cursor=pointer]
    - button "Close" [ref=e12] [cursor=pointer]:
      - img [ref=e13]
      - generic [ref=e16]: Close
```
```

### admin-shell.spec.ts › Admin shell (U0) › A-8 regular user: /admin still redirects home

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-shell-Admin-shell-U0-A-8-regular-user-admin-still-redirects-home-mobile-360`

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-157 a category pointer in help text asks, then moves the ad and keeps the answer

- Source: `shard 4`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:reap] category e2e-post-4-1-trfwjw failed: update or delete on table "categories" violates foreign key constraint "listings_category_id_fkey" on table "listings"

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
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:89:46
--- further error 2 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-save-state')
Expected: "saved"
Received: "saving"

Call log:
  - Expect "toHaveAttribute" with timeout 10000ms
  - waiting for getByTestId('post-save-state')
    5 × locator resolved to <p data-state="saving" data-testid="post-save-state" class="text-xs text-muted-foreground">Saving…</p>
      - unexpected value "saving"


  151 |     await hit.click();
  152 |     if (expectSaved) {
> 153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
      |                                                         ^
  154 |       // AUTO-ADVANCE: the leaf IS the answer; D39 — specifications open next.
  155 |       await expect(page.getByTestId("post-step-3")).toBeVisible();
  156 |       await expect(page.getByTestId("post-category-chip-path")).toContainText(slug);
```

Context:

```text
          - listitem [ref=e206]:
            - generic [ref=e207]: About
          - listitem [ref=e208]:
            - generic [ref=e209]: How it works
      - navigation "Help" [ref=e210]:
        - heading "Help" [level=2] [ref=e211]
        - list [ref=e212]:
          - listitem [ref=e213]:
            - generic [ref=e214]: Safety
          - listitem [ref=e215]:
            - generic [ref=e216]: Contact
      - navigation "Legal" [ref=e217]:
        - heading "Legal" [level=2] [ref=e218]
        - list [ref=e219]:
          - listitem [ref=e220]:
            - generic [ref=e221]: Terms
          - listitem [ref=e222]:
            - generic [ref=e223]: Privacy
    - paragraph [ref=e225]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back

- Source: `shard 4`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: page.evaluate: TypeError: Cannot read properties of undefined (reading 'auth')
    at eval (eval at evaluate (:290:30), <anonymous>:6:22)
    at UtilityScript.evaluate (<anonymous>:292:16)
    at UtilityScript.<anonymous> (<anonymous>:1:44)
    at eval (eval at evaluate (:290:30), <anonymous>:6:22)
    at UtilityScript.evaluate (<anonymous>:292:16)
    at UtilityScript.<anonymous> (<anonymous>:1:44)
    at bearerOf (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:27:28)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:1008:25
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-173-a-draft-placed-in-another-market-opens-there-on-resume-and-after-Back-mobile-360`

### admin-users.spec.ts › U1 admin users › AU-10 edit: a duplicate alias is refused inline and nothing changes

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: page.reload: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - waiting for navigation until "load"


  441 |     );
  442 |
> 443 |     await page.reload();
      |                ^
  444 |     await waitForHydration(page);
  445 |     await expect(page.getByTestId("edit-seller-alias")).toHaveValue("", { timeout: 15000 });
  446 |   });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:443:16
```

Context: context file not found for `admin-users-U1-admin-users-AU-10-edit-a-duplicate-alias-is-refused-inline-and-nothing-changes-desktop-1280`

### auth-signout.spec.ts › U0k session policy › SP-3 absolute: continuous activity does not save the session

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `auth-signout-U0k-session-policy-SP-3-absolute-continuous-activity-does-not-save-the-session-desktop-1280`

### post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-87 off the chosen path the step asks again, Keep it returns, a new leaf clears it

- Source: `shard 7`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-3')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-3')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-3')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-3')


  227 |     await folder(b.parent.id).click();
  228 |     await leafRow(b.leaf.id).click();
> 229 |     await expect(page.getByTestId("post-step-3")).toBeVisible({ timeout: 20_000 });
      |                                                   ^
  230 |     await page.getByTestId("post-back").click();
  231 |     await expect(page.getByTestId("post-step-1")).toBeVisible();
  232 |     await expect(group, "PW-87: the new leaf left the step asking").toHaveAttribute(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:229:51
```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-87-off-the-chosen-path-the-step-asks-again-Keep-it-returns-a-new-leaf-clears-it-desktop-1280`

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-157 a category pointer in help text asks, then moves the ad and keeps the answer

- Source: `shard 8`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="post-category-hit"][data-category="464db825-5ed8-4d73-ad25-ca32f3e1cfb2"]')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="post-category-hit"][data-category="464db825-5ed8-4d73-ad25-ca32f3e1cfb2"]')


  148 |     await page.getByTestId("post-category-search").fill(slug);
  149 |     const hit = page.locator(`[data-testid="post-category-hit"][data-category="${categoryId}"]`);
> 150 |     await expect(hit).toBeVisible();
      |                       ^
  151 |     await hit.click();
  152 |     if (expectSaved) {
  153 |       await expect(page.getByTestId("post-save-state")).toHaveAttribute("data-state", "saved");
    at chooseBySearch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:150:23)
    at reachStep3 (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:211:5)
```

Context:

```text
          - listitem [ref=e261]:
            - generic [ref=e262]: About
          - listitem [ref=e263]:
            - generic [ref=e264]: How it works
      - navigation "Help" [ref=e265]:
        - heading "Help" [level=2] [ref=e266]
        - list [ref=e267]:
          - listitem [ref=e268]:
            - generic [ref=e269]: Safety
          - listitem [ref=e270]:
            - generic [ref=e271]: Contact
      - navigation "Legal" [ref=e272]:
        - heading "Legal" [level=2] [ref=e273]
        - list [ref=e274]:
          - listitem [ref=e275]:
            - generic [ref=e276]: Terms
          - listitem [ref=e277]:
            - generic [ref=e278]: Privacy
    - paragraph [ref=e280]: © 2026 ethio.com — All rights reserved.
```
```

- post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back · `desktop-1280` · source `shard 8` — body omitted: cap

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, shard 7, shard 8, changed · unavailable: none

110 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 3, shard 5, shard 7 |
| `listing not found` | 10 | shard 3, shard 4, shard 7, shard 8 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-kxa<n>d: e<n>e_par_<n>zbajv → e<n>e_chi_vg<n>rp` (quiet) | 1 | shard 5 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-zds<n>l: e<n>e_par_szp<n>td → e<n>e_chi_xn<n>a` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-kxa<n>d: e<n>e_par_<n>zbajv → e<n>e_chi_vg<n>rp ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-zds<n>l: e<n>e_par_szp<n>td → e<n>e_chi_xn<n>a ×1

Off the allowlist:

### listing not found

- Count: 10 · Sources: shard 3, shard 4, shard 7, shard 8

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
| smoke | 2026-10-12T07:41:05.467Z | 19.9 min |
| email | 2026-10-12T07:40:59.102Z | 0.2 min |
| shard 1 | 2026-10-12T07:41:01.426Z | 23.3 min |
| shard 2 | 2026-10-12T07:41:08.415Z | 27.9 min |
| shard 3 | 2026-10-12T07:41:06.781Z | 28.9 min |
| shard 4 | 2026-10-12T07:41:07.653Z | 31.9 min |
| shard 5 | 2026-10-12T07:41:06.835Z | 27.6 min |
| shard 6 | 2026-10-12T07:41:03.797Z | 24.3 min |
| shard 7 | 2026-10-12T07:40:59.693Z | 25.9 min |
| shard 8 | 2026-10-12T07:42:25.788Z | 27.8 min |
| changed | 2026-10-12T07:41:03.713Z | 8.7 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `shell.spec.ts` | 504 | 35.0 min | smoke, shard 4, shard 8, changed |
| `post-wizard-specs.spec.ts` | 78 | 33.7 min | shard 4, shard 8 |
| `admin-listings.spec.ts` | 54 | 25.1 min | shard 2, shard 5 |
| `post-wizard-bundle2.spec.ts` | 66 | 24.4 min | shard 3, shard 7 |
| `admin-screening.spec.ts` | 30 | 17.6 min | shard 2, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 50 | 17.6 min | shard 1, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 16.9 min | shard 4, shard 8 |
| `post-wizard-resets.spec.ts` | 34 | 16.8 min | shard 4, shard 8 |
| `post-wizard-category.spec.ts` | 46 | 15.9 min | shard 3, shard 7 |
| `post-wizard-place.spec.ts` | 38 | 13.8 min | shard 3, shard 7 |
| `post-wizard-pricing.spec.ts` | 50 | 12.7 min | shard 3, shard 7 |
| `admin-attributes-library.spec.ts` | 42 | 12.3 min | shard 1, shard 5 |
| `auth-signout.spec.ts` | 44 | 12.1 min | smoke, shard 2, shard 6 |
| `feed-screens.spec.ts` | 28 | 11.9 min | shard 3, shard 7 |
| `admin-categories-console.spec.ts` | 34 | 10.9 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 38 | 10.2 min | shard 2, shard 6 |
| `admin-translations-console.spec.ts` | 42 | 10.2 min | shard 2, shard 6 |
| `admin-users.spec.ts` | 26 | 10.1 min | shard 2, shard 6 |
| `admin-attributes-links.spec.ts` | 32 | 10.0 min | shard 1, shard 5 |
| `posting-routes.spec.ts` | 50 | 8.7 min | shard 4, shard 8 |
| `posting-routes-catalog.spec.ts` | 18 | 8.6 min | shard 4, shard 8 |
| `admin-attributes-import.spec.ts` | 40 | 8.4 min | shard 1, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 7.9 min | shard 3, shard 7 |
| `admin-roles.spec.ts` | 26 | 7.3 min | shard 2, shard 6 |
| `admin-attributes-editor.spec.ts` | 34 | 7.1 min | shard 1, shard 4 |
| `import-security.spec.ts` | 34 | 6.8 min | shard 3, shard 7 |
| `admin-attributes-safety.spec.ts` | 14 | 5.8 min | shard 1, shard 5 |
| `feed-index.spec.ts` | 28 | 5.7 min | shard 2, shard 6 |
| `viewing-place.spec.ts` | 22 | 5.7 min | shard 4, shard 8 |
| `admin-audit.spec.ts` | 12 | 4.5 min | shard 1, shard 5 |
| `admin-shell.spec.ts` | 10 | 4.5 min | shard 2, shard 6 |
| `posting-routes-dials.spec.ts` | 14 | 4.5 min | shard 4, shard 8 |
| `feed-route.spec.ts` | 16 | 4.0 min | shard 2, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 3.9 min | shard 3, shard 7 |
| `admin-countries.spec.ts` | 18 | 3.9 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 3.4 min | shard 2, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 3.2 min | shard 2, shard 6 |
| `admin-coverage.spec.ts` | 14 | 3.1 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 3.0 min | shard 3, shard 7 |
| `admin-categories-home.spec.ts` | 8 | 3.0 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.8 min | shard 4, shard 8 |
| `mfa-stepup.spec.ts` | 18 | 2.6 min | shard 3, shard 7 |
| `i18n-coverage.spec.ts` | 16 | 1.7 min | shard 3, shard 7, changed |
| `post-wizard-units.spec.ts` | 4 | 1.6 min | shard 4, shard 8 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 4, shard 8 |
| `post-wizard-recent.spec.ts` | 2 | 1.2 min | shard 4, shard 8 |
| `category-nav.spec.ts` | 20 | 1.1 min | shard 2, shard 6, changed |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 3, shard 7 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 3, shard 7 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 5 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 3, shard 7 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 4, shard 8 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 4, shard 8 |
| `settings.spec.ts` | 4 | 0.6 min | shard 4 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 4, shard 8 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 3, shard 7 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 3, shard 7 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 4, shard 8 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 3, shard 7 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 135.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 121.5 s |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | desktop-1280 | 109.9 s |
| `admin-users.spec.ts` › AU-10 edit: a duplicate alias is refused inline and nothing changes | desktop-1280 | 107.2 s |
| `post-wizard-specs.spec.ts` › PW-157 a category pointer in help text asks, then moves the ad and keeps the answer | mobile-360 | 105.4 s |
| `post-wizard-finder.spec.ts` › PW-87 off the chosen path the step asks again, Keep it returns, a new leaf clears it | desktop-1280 | 100.6 s |
| `post-wizard-specs.spec.ts` › PW-157 a category pointer in help text asks, then moves the ad and keeps the answer | desktop-1280 | 98.7 s |
| `post-wizard-place.spec.ts` › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan | desktop-1280 | 91.2 s |
| `post-wizard-category.spec.ts` › PW-181 D119: a folder in the address opens step 1 inside it, a leaf is chosen, an unknown one opens the top level | mobile-360 | 83.9 s |
| `admin-categories-console.spec.ts` › CT-43 the row's actions: Edit, a red Delete only when retired, the menu's verbs, a dialog that closes back to the table | mobile-360 | 77.0 s |
| `post-wizard-bundle2.spec.ts` › PW-146 a saved place with a street line but no pin carries its lines to a new draft (bundle 4 step 18, turn 6 item 5) | mobile-360 | 75.4 s |
| `auth-signout.spec.ts` › SP-3 absolute: continuous activity does not save the session | desktop-1280 | 75.2 s |
| `admin-shell.spec.ts` › A-8 regular user: /admin still redirects home | mobile-360 | 73.6 s |
| `shell.spec.ts` › LS-10 a saved area beats the deepest guess | desktop-1280 | 72.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-36 a created leaf gets its secondary parents and the undo removes both pointers | mobile-360 | 70.7 s |
