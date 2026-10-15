# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38804796519
- Commit: `b685b03d0004f39099a1f47b55428a991c79c4cd`
- Attempt: 1
- Written (UTC): 2026-10-15T21:34:37.397Z
- Passed: 1762 · Skipped: 126 · Failed: 10
- Gating failures: 10 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 10
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-16 a photo dropped on the step is added like a picked one — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-179 a pin save never restates directions the step could not read — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-39 recent categories are caller-only published leaves in count/date/id order — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-73b a failed holders read shows its error, keeps the confirm disabled and removes nothing — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-7 several ads at once from tablet width up; a phone acts one ad at a time (D182 2) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · posting-routes.spec.ts › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · shell.spec.ts › panel-scoped chrome › location row is present on Marketplace and absent on Account — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "permission denied"

  334 |     const viewer = await asPerson(await scratchHolder([["listings", "view"]]));
  335 |     const byId = await viewer.rpc("admin_list_listings", { p_search: live.id });
> 336 |     expect(byId.error).toBeNull();
      |                        ^
  337 |     const rows = byId.data as Row[];
  338 |     expect(rows).toHaveLength(1);
  339 |     expect(rows[0]).toMatchObject({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:336:24
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-1-All-listings-listings-view-reads-every-listing-but-drafts-the-e-mail-only-with-profiles-view-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-51e2d-ail-only-with-profiles-view-mobile-360`; this run carried 17 context file(s); of the same spec: none

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-24-Edit-refuses-a-reviewer-listings-view-and-review-not-enforce-and-writes-nothing-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-071c7--enforce-and-writes-nothing-mobile-360`; this run carried 17 context file(s); of the same spec: none

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-16 a photo dropped on the step is added like a picked one

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-16-a-photo-dropped-on-the-step-is-added-like-a-picked-one-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-42cc2--is-added-like-a-picked-one-mobile-360`; this run carried 17 context file(s); of the same spec: none

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-179 a pin save never restates directions the step could not read

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: PW-179: the failed read was not shown

expect(locator).toBeVisible() failed

Locator: getByTestId('post-where-details-failed')
Expected: visible
Error: element(s) not found

Call log:
  - PW-179: the failed read was not shown with timeout 20000ms
  - waiting for getByTestId('post-where-details-failed')


  341 |       page.getByTestId("post-where-details-failed"),
  342 |       "PW-179: the failed read was not shown",
> 343 |     ).toBeVisible({ timeout: 20_000 });
      |       ^
  344 |     expect(refused, "PW-179: no read was refused").toBeGreaterThanOrEqual(1);
  345 |     failing = false;
  346 |
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: [pin] place text read failed: TypeError: Failed to fetch
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-179-a-pin-save-never-restates-directions-the-step-could-not-read-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-94e69-ons-the-step-could-not-read-mobile-360`; this run carried 17 context file(s); of the same spec: none

### posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-39 recent categories are caller-only published leaves in count/date/id order

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e242]:
            - generic [ref=e243]: About
          - listitem [ref=e244]:
            - generic [ref=e245]: How it works
      - navigation "Help" [ref=e246]:
        - heading "Help" [level=2] [ref=e247]
        - list [ref=e248]:
          - listitem [ref=e249]:
            - generic [ref=e250]: Safety
          - listitem [ref=e251]:
            - generic [ref=e252]: Contact
      - navigation "Legal" [ref=e253]:
        - heading "Legal" [level=2] [ref=e254]
        - list [ref=e255]:
          - listitem [ref=e256]:
            - generic [ref=e257]: Terms
          - listitem [ref=e258]:
            - generic [ref=e259]: Privacy
    - paragraph [ref=e261]: © 2026 ethio.com — All rights reserved.
```
```

### admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-73b a failed holders read shows its error, keeps the confirm disabled and removes nothing

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-remove-confirm')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-remove-confirm')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('attribute-remove-confirm')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('attribute-remove-confirm')


  265 |         .getByTestId(`attribute-actions-${held}-more-remove`)
  266 |         .click();
> 267 |       await expect(page.getByTestId("attribute-remove-confirm")).toBeVisible({ timeout: 20000 });
      |                                                                  ^
  268 |       await expect(page.getByTestId("attribute-dialog-error")).toHaveText(
  269 |         en["admin.attributes.links.error"],
  270 |         { timeout: 20000 },
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-safety.spec.ts:267:66
```

Context:

```text
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Remove from a category — e2e_held_d66pee" [ref=e2]:
    - heading "Remove from a category — e2e_held_d66pee" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Remove from a category — e2e_held_d66pee
      - paragraph [ref=e6]: The attribute stays in the library; only this category stops asking for it.
      - generic [ref=e7]:
        - generic [ref=e8]: Category
        - combobox "Category" [ref=e9]:
          - option "Choose a category" [selected]
          - option "e2e-cat-4-0-bqyoyv (e2e-cat-4-0-bqyoyv)"
      - generic [ref=e10]:
        - button "Cancel" [ref=e11] [cursor=pointer]
        - button "Remove from category" [ref=e12] [cursor=pointer]
    - button "Close" [active] [ref=e13] [cursor=pointer]:
      - img [ref=e14]
      - generic [ref=e17]: Close
```
```

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-24-Edit-refuses-a-reviewer-listings-view-and-review-not-enforce-and-writes-nothing-desktop-1280` — Playwright's name `admin-listings-ADMIN-LISTI-071c7--enforce-and-writes-nothing-desktop-1280`; this run carried 17 context file(s); of the same spec: none

### my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-7 several ads at once from tablet width up; a phone acts one ad at a time (D182 2)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('my-listings-notice')
Expected: "Changed: 2."
Received: "Changed: 1. Not changed: 1. This ad could not be found."

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('my-listings-notice')
    5 × locator resolved to <p role="alert" data-tone="error" data-testid="my-listings-notice" class="scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+1rem)] text-sm text-destructive">Changed: 1. Not changed: 1. This ad could not be …</p>
      - unexpected value "Changed: 1. Not changed: 1. This ad could not be found."


  803 |     await page.getByTestId("my-listings-confirm-yes").click();
  804 |     const done = en["myListings.bulk.done"].replace("{count}", "2");
> 805 |     await expect(page.getByTestId("my-listings-notice")).toHaveText(done, { timeout: 15000 });
      |                                                          ^
  806 |     expect((await listingTruth(X))["status"], "[e2e:mlp] X closed").toBe("closed");
  807 |     expect((await listingTruth(Y))["status"], "[e2e:mlp] Y closed").toBe("closed");
  808 |     await expect(page.getByTestId("my-listings-group-closed")).toHaveText(
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/my_listing ({"code":"P0001","details":null,"hint":null,"message":"not your listing"})
```

Context:

```text
          - listitem [ref=e210]:
            - generic [ref=e211]: About
          - listitem [ref=e212]:
            - generic [ref=e213]: How it works
      - navigation "Help" [ref=e214]:
        - heading "Help" [level=2] [ref=e215]
        - list [ref=e216]:
          - listitem [ref=e217]:
            - generic [ref=e218]: Safety
          - listitem [ref=e219]:
            - generic [ref=e220]: Contact
      - navigation "Legal" [ref=e221]:
        - heading "Legal" [level=2] [ref=e222]
        - list [ref=e223]:
          - listitem [ref=e224]:
            - generic [ref=e225]: Terms
          - listitem [ref=e226]:
            - generic [ref=e227]: Privacy
    - paragraph [ref=e229]: © 2026 ethio.com — All rights reserved.
```
```

### posting-routes.spec.ts › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: page.goto: Test ended.
Call log:
  - navigating to "http://127.0.0.1:4173/", waiting until "load"


   at helpers/ui.ts:160

  158 |
  159 | export async function gotoReady(page: Page, path: string) {
> 160 |   await page.goto(path);
      |              ^
  161 |   await assertSsrHealthy(page);
  162 |   await waitForHydration(page);
  163 |   await assertNoStringifiedLeak(page, `gotoReady(${path})`);
    at gotoReady (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:160:14)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:88:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:957:22
```

Context:

```text
          - listitem [ref=e333]:
            - generic [ref=e334]: About
          - listitem [ref=e335]:
            - generic [ref=e336]: How it works
      - navigation "Help" [ref=e337]:
        - heading "Help" [level=2] [ref=e338]
        - list [ref=e339]:
          - listitem [ref=e340]:
            - generic [ref=e341]: Safety
          - listitem [ref=e342]:
            - generic [ref=e343]: Contact
      - navigation "Legal" [ref=e344]:
        - heading "Legal" [level=2] [ref=e345]
        - list [ref=e346]:
          - listitem [ref=e347]:
            - generic [ref=e348]: Terms
          - listitem [ref=e349]:
            - generic [ref=e350]: Privacy
    - paragraph [ref=e352]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › panel-scoped chrome › location row is present on Marketplace and absent on Account

- Source: `shard 6`
- Project: `desktop-1280`

```text
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================
--- further error 1 ---
TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================

   at helpers/ui.ts:406

  404 |
  405 |   // 1. The route the auth screen navigates to on password success.
> 406 |   await page.waitForURL(/\/$/, { timeout: 15000 });
      |              ^
  407 |   // 2. Authoritative signed-in signal: the account menu trigger renders ONLY on
  408 |   //    the authenticated branch of app-header (stable testid, no hover/open
  409 |   //    prerequisite), unlike the signed-out "Sign in" link whose absence is
    at signIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:406:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1305:5
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

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

109 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 9 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-rf<n>g: e<n>e_par_ia<n>e<n>q → e<n>e_chi_h<n>n<n>oi` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-tf<n>ygz: e<n>e_par_<n>lu<n>e → e<n>e_chi_<n>rmsvz` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-rf<n>g: e<n>e_par_ia<n>e<n>q → e<n>e_chi_h<n>n<n>oi ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-tf<n>ygz: e<n>e_par_<n>lu<n>e → e<n>e_chi_<n>rmsvz ×1

Off the allowlist:

### listing not found

- Count: 9 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · location row is present on Marketplace and absent on Account ×1 · PW-104 a unit settled by the type is held by the price page's unit ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1 · PW-161 a number's unit reads in English, and in Amharic under Amharic ×1 · PW-17 the currency is preselected and searchable by name in one control ×1

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
| smoke | 2026-10-15T20:51:26.272Z | 19.4 min |
| email | 2026-10-15T20:51:21.865Z | 0.2 min |
| shard 1 | 2026-10-15T20:51:29.366Z | 42.8 min |
| shard 2 | 2026-10-15T20:51:27.492Z | 34.8 min |
| shard 3 | 2026-10-15T20:51:17.826Z | 33.4 min |
| shard 4 | 2026-10-15T20:51:29.650Z | 39.9 min |
| shard 5 | 2026-10-15T20:51:15.756Z | 38.7 min |
| shard 6 | 2026-10-15T20:51:27.428Z | 30.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 26.5 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 60 | 25.3 min | shard 1, shard 4 |
| `post-wizard-specs.spec.ts` | 80 | 22.8 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 21.6 min | smoke, shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 19.8 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.8 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 62 | 15.2 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 15.1 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 50 | 13.6 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 48 | 13.2 min | smoke, shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 12.1 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 11.8 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.5 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 30 | 11.5 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 11.3 min | shard 3, shard 6 |
| `my-listings-page.spec.ts` | 14 | 10.6 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 10.3 min | shard 3, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.9 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 9.5 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 8.9 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 8.7 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 8.5 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 8.3 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.2 min | shard 1, shard 5 |
| `admin-locations.spec.ts` | 38 | 8.1 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 7.9 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 7.3 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 6.4 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 3, shard 6 |
| `feed-index.spec.ts` | 30 | 6.2 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.2 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.1 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 4.5 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 4.3 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 4.2 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.7 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 16 | 3.3 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.1 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.1 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 2.0 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.7 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.5 min | shard 3, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 1.3 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.0 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 104.2 s |
| `admin-listings.spec.ts` › AL-1 All listings: listings:view reads every listing but drafts; the e-mail only with profiles:view | mobile-360 | 104.0 s |
| `admin-listings.spec.ts` › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing | mobile-360 | 102.6 s |
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | mobile-360 | 93.3 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 92.9 s |
| `my-listings-page.spec.ts` › MLP-7 several ads at once from tablet width up; a phone acts one ad at a time (D182 2) | desktop-1280 | 89.9 s |
| `admin-listings.spec.ts` › AL-24 Edit refuses a reviewer (listings:view and review, not enforce), and writes nothing | desktop-1280 | 89.8 s |
| `post-wizard-bundle2.spec.ts` › PW-179 a pin save never restates directions the step could not read | mobile-360 | 87.1 s |
| `photo-pipeline.spec.ts` › PP-16 a photo dropped on the step is added like a picked one | mobile-360 | 84.9 s |
| `posting-routes.spec.ts` › PR-21 step 7: private columns are owner-only, through my_listing_private | desktop-1280 | 82.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it | desktop-1280 | 79.5 s |
| `admin-users.spec.ts` › AU-3 detail: reason required, deactivate, audit row, reactivate | desktop-1280 | 72.8 s |
| `shell.spec.ts` › location row is present on Marketplace and absent on Account | desktop-1280 | 63.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 62.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-28 the import dialog reaches Applied and undoes | mobile-360 | 62.0 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38804796519-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38804796519-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 20 user(s) owned by process 38804796519-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 38804796519-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38804796519-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38804796519-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 38804796519-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38804796519-6
```

## auth-signout.spec.ts › D189 deactivated session › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189)

- Source: `smoke`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"


  415 |
  416 |       await page.reload();
> 417 |       await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      |                          ^
  418 |       await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
  419 |       await expect(page.getByTestId("account-menu")).toHaveCount(0);
  420 |       const stored = await page.evaluate(() =>
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:417:26
```

Context:

```text
          - listitem [ref=e263]:
            - generic [ref=e264]: About
          - listitem [ref=e265]:
            - generic [ref=e266]: How it works
      - navigation "Help" [ref=e267]:
        - heading "Help" [level=2] [ref=e268]
        - list [ref=e269]:
          - listitem [ref=e270]:
            - generic [ref=e271]: Safety
          - listitem [ref=e272]:
            - generic [ref=e273]: Contact
      - navigation "Legal" [ref=e274]:
        - heading "Legal" [level=2] [ref=e275]
        - list [ref=e276]:
          - listitem [ref=e277]:
            - generic [ref=e278]: Terms
          - listitem [ref=e279]:
            - generic [ref=e280]: Privacy
    - paragraph [ref=e282]: © 2026 ethio.com — All rights reserved.
```
```

## auth-signout.spec.ts › D189 deactivated session › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189)

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"


  415 |
  416 |       await page.reload();
> 417 |       await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      |                          ^
  418 |       await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
  419 |       await expect(page.getByTestId("account-menu")).toHaveCount(0);
  420 |       const stored = await page.evaluate(() =>
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:417:26
```

Context:

```text
          - listitem [ref=e264]:
            - generic [ref=e265]: About
          - listitem [ref=e266]:
            - generic [ref=e267]: How it works
      - navigation "Help" [ref=e268]:
        - heading "Help" [level=2] [ref=e269]
        - list [ref=e270]:
          - listitem [ref=e271]:
            - generic [ref=e272]: Safety
          - listitem [ref=e273]:
            - generic [ref=e274]: Contact
      - navigation "Legal" [ref=e275]:
        - heading "Legal" [level=2] [ref=e276]
        - list [ref=e277]:
          - listitem [ref=e278]:
            - generic [ref=e279]: Terms
          - listitem [ref=e280]:
            - generic [ref=e281]: Privacy
    - paragraph [ref=e283]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit inside the preview: the reviewer corrects a waiting ad's title and approves it (D188)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
Expected: "Corrected e2e-screen-1-0auscv"
Received: "e2e-screen-1-uua5e7"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
    14 × locator resolved to <h2 data-testid="listing-detail-title" class="text-lg font-semibold text-foreground">e2e-screen-1-uua5e7</h2>
       - unexpected value "e2e-screen-1-uua5e7"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
Expected: "Corrected e2e-screen-1-0auscv"
Received: "e2e-screen-1-uua5e7"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
    14 × locator resolved to <h2 data-testid="listing-detail-title" class="text-lg font-semibold text-foreground">e2e-screen-1-uua5e7</h2>
       - unexpected value "e2e-screen-1-uua5e7"


  1401 |     );
  1402 |     await expect(sheet.getByTestId("admin-screening-edit-panel")).toHaveCount(0);
> 1403 |     await expect(sheet.getByTestId("listing-detail-title")).toHaveText(corrected);
       |                                                             ^
  1404 |     expect(await titleOf(ad.id)).toEqual({ title: corrected, status: "screening" });
  1405 |
```

Context:

```text
          - heading "Description" [level=3] [ref=e314]
          - paragraph [ref=e315]: e2e scratch listing for the screening queue
        - generic [ref=e316]:
          - generic [ref=e317]:
            - heading "Seller" [level=3] [ref=e318]
            - paragraph [ref=e319]: eseller_quzeqnju
          - generic [ref=e320]:
            - heading "Contact the seller" [level=4] [ref=e321]
            - list [ref=e322]:
              - listitem [ref=e323]:
                - generic [ref=e324]: Messages on ethio.com
        - paragraph [ref=e327]: The map of this place opens with the listing.
      - generic [ref=e328]:
        - status [ref=e329]: "Saved. The seller is told what changed: Title."
        - button "Edit" [ref=e330] [cursor=pointer]
        - link "Open the ad's page" [ref=e331] [cursor=pointer]:
          - /url: /admin/listings/0a1c719d-08d4-40cb-accd-98dba82821b4
        - button "Approve" [ref=e332] [cursor=pointer]
        - button "Reject" [ref=e333] [cursor=pointer]
```
```

## admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"


  271 |     await page.goto("/");
  272 |     await waitForHydration(page);
> 273 |     await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      |                        ^
  274 |     await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
  275 |     await expect(page.getByTestId("account-menu")).toHaveCount(0);
  276 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:273:24
```

Context:

```text
          - listitem [ref=e200]:
            - generic [ref=e201]: About
          - listitem [ref=e202]:
            - generic [ref=e203]: How it works
      - navigation "Help" [ref=e204]:
        - heading "Help" [level=2] [ref=e205]
        - list [ref=e206]:
          - listitem [ref=e207]:
            - generic [ref=e208]: Safety
          - listitem [ref=e209]:
            - generic [ref=e210]: Contact
      - navigation "Legal" [ref=e211]:
        - heading "Legal" [level=2] [ref=e212]
        - list [ref=e213]:
          - listitem [ref=e214]:
            - generic [ref=e215]: Terms
          - listitem [ref=e216]:
            - generic [ref=e217]: Privacy
    - paragraph [ref=e219]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › D189 deactivated staff › AU-14 a deactivated staff account holds no permission: the staff door refuses it and has_permission answers false (D189)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AU-14: the admin role did not grant users:view

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: AU-14: the admin role did not grant users:view

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  616 |     const before = await admin.rpc("has_permission", pair);
  617 |     expect(before.error, "AU-14: has_permission could not be read").toBeNull();
> 618 |     expect(before.data, "AU-14: the admin role did not grant users:view").toBe(true);
      |                                                                           ^
  619 |
  620 |     await switchUser(page, staff.email, staff.password);
  621 |     const secret = await enrollAndStepUp(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:618:75
```

Context: context file not found for `admin-users-D189-deactivated-staff-AU-14-a-deactivated-staff-account-holds-no-permission-the-staff-door-refuses-it-and-has_permission-answers-false-D189-mobile-360` — Playwright's name `admin-users-D189-deactivat-6a5ce-mission-answers-false-D189--mobile-360`; this run carried 17 context file(s); of the same spec: none

## auth-signout.spec.ts › D189 deactivated session › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('auth-deactivated')
Expected: "Your account is deactivated and you have been signed out. Contact support if you think this is a mistake."
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('auth-deactivated')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('auth-deactivated')
Expected: "Your account is deactivated and you have been signed out. Contact support if you think this is a mistake."
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('auth-deactivated')


  416 |       await page.reload();
  417 |       await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
> 418 |       await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
      |                                                          ^
  419 |       await expect(page.getByTestId("account-menu")).toHaveCount(0);
  420 |       const stored = await page.evaluate(() =>
  421 |         Object.keys(localStorage).filter((k) => k.startsWith("sb-")),
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:418:58
```

Context:

```text
          - listitem [ref=e263]:
            - generic [ref=e264]: About
          - listitem [ref=e265]:
            - generic [ref=e266]: How it works
      - navigation "Help" [ref=e267]:
        - heading "Help" [level=2] [ref=e268]
        - list [ref=e269]:
          - listitem [ref=e270]:
            - generic [ref=e271]: Safety
          - listitem [ref=e272]:
            - generic [ref=e273]: Contact
      - navigation "Legal" [ref=e274]:
        - heading "Legal" [level=2] [ref=e275]
        - list [ref=e276]:
          - listitem [ref=e277]:
            - generic [ref=e278]: Terms
          - listitem [ref=e279]:
            - generic [ref=e280]: Privacy
    - paragraph [ref=e282]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit inside the preview: the reviewer corrects a waiting ad's title and approves it (D188)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
Expected: "Corrected e2e-screen-4-yeb6qk"
Received: "e2e-screen-4-yewyyw"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
    14 × locator resolved to <h2 data-testid="listing-detail-title" class="text-lg font-semibold text-foreground">e2e-screen-4-yewyyw</h2>
       - unexpected value "e2e-screen-4-yewyyw"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
Expected: "Corrected e2e-screen-4-yeb6qk"
Received: "e2e-screen-4-yewyyw"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('post-preview-sheet').getByTestId('listing-detail-title')
    14 × locator resolved to <h2 data-testid="listing-detail-title" class="text-lg font-semibold text-foreground">e2e-screen-4-yewyyw</h2>
       - unexpected value "e2e-screen-4-yewyyw"


  1401 |     );
  1402 |     await expect(sheet.getByTestId("admin-screening-edit-panel")).toHaveCount(0);
> 1403 |     await expect(sheet.getByTestId("listing-detail-title")).toHaveText(corrected);
       |                                                             ^
  1404 |     expect(await titleOf(ad.id)).toEqual({ title: corrected, status: "screening" });
  1405 |
```

Context:

```text
          - heading "Description" [level=3] [ref=e338]
          - paragraph [ref=e339]: e2e scratch listing for the screening queue
        - generic [ref=e340]:
          - generic [ref=e341]:
            - heading "Seller" [level=3] [ref=e342]
            - paragraph [ref=e343]: eseller_qqyqxkqq
          - generic [ref=e344]:
            - heading "Contact the seller" [level=4] [ref=e345]
            - list [ref=e346]:
              - listitem [ref=e347]:
                - generic [ref=e348]: Messages on ethio.com
        - paragraph [ref=e351]: The map of this place opens with the listing.
      - generic [ref=e352]:
        - status [ref=e353]: "Saved. The seller is told what changed: Title."
        - button "Edit" [ref=e354] [cursor=pointer]
        - link "Open the ad's page" [ref=e355] [cursor=pointer]:
          - /url: /admin/listings/2f64a97d-a179-4c58-95a2-3df90994d76a
        - button "Approve" [ref=e356] [cursor=pointer]
        - button "Reject" [ref=e357] [cursor=pointer]
```
```

## admin-users.spec.ts › U1 admin users › AU-3 detail: reason required, deactivate, audit row, reactivate

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/auth\?.*reason=deactivated/
Received string:  "http://127.0.0.1:4173/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/"


  271 |     await page.goto("/");
  272 |     await waitForHydration(page);
> 273 |     await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
      |                        ^
  274 |     await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
  275 |     await expect(page.getByTestId("account-menu")).toHaveCount(0);
  276 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:273:24
```

Context:

```text
          - listitem [ref=e264]:
            - generic [ref=e265]: About
          - listitem [ref=e266]:
            - generic [ref=e267]: How it works
      - navigation "Help" [ref=e268]:
        - heading "Help" [level=2] [ref=e269]
        - list [ref=e270]:
          - listitem [ref=e271]:
            - generic [ref=e272]: Safety
          - listitem [ref=e273]:
            - generic [ref=e274]: Contact
      - navigation "Legal" [ref=e275]:
        - heading "Legal" [level=2] [ref=e276]
        - list [ref=e277]:
          - listitem [ref=e278]:
            - generic [ref=e279]: Terms
          - listitem [ref=e280]:
            - generic [ref=e281]: Privacy
    - paragraph [ref=e283]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › D189 deactivated staff › AU-14 a deactivated staff account holds no permission: the staff door refuses it and has_permission answers false (D189)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: AU-14: the admin role did not grant users:view

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
--- further error 1 ---
Error: AU-14: the admin role did not grant users:view

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  616 |     const before = await admin.rpc("has_permission", pair);
  617 |     expect(before.error, "AU-14: has_permission could not be read").toBeNull();
> 618 |     expect(before.data, "AU-14: the admin role did not grant users:view").toBe(true);
      |                                                                           ^
  619 |
  620 |     await switchUser(page, staff.email, staff.password);
  621 |     const secret = await enrollAndStepUp(page);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-users.spec.ts:618:75
```

Context: context file not found for `admin-users-D189-deactivated-staff-AU-14-a-deactivated-staff-account-holds-no-permission-the-staff-door-refuses-it-and-has_permission-answers-false-D189-desktop-1280` — Playwright's name `admin-users-D189-deactivat-6a5ce-mission-answers-false-D189--desktop-1280`; this run carried 17 context file(s); of the same spec: none

## auth-signout.spec.ts › D189 deactivated session › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('auth-deactivated')
Expected: "Your account is deactivated and you have been signed out. Contact support if you think this is a mistake."
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('auth-deactivated')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('auth-deactivated')
Expected: "Your account is deactivated and you have been signed out. Contact support if you think this is a mistake."
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('auth-deactivated')


  416 |       await page.reload();
  417 |       await expect(page).toHaveURL(/\/auth\?.*reason=deactivated/, { timeout: 15000 });
> 418 |       await expect(page.getByTestId("auth-deactivated")).toHaveText(en["auth.deactivated"]);
      |                                                          ^
  419 |       await expect(page.getByTestId("account-menu")).toHaveCount(0);
  420 |       const stored = await page.evaluate(() =>
  421 |         Object.keys(localStorage).filter((k) => k.startsWith("sb-")),
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/auth-signout.spec.ts:418:58
```

Context:

```text
          - listitem [ref=e264]:
            - generic [ref=e265]: About
          - listitem [ref=e266]:
            - generic [ref=e267]: How it works
      - navigation "Help" [ref=e268]:
        - heading "Help" [level=2] [ref=e269]
        - list [ref=e270]:
          - listitem [ref=e271]:
            - generic [ref=e272]: Safety
          - listitem [ref=e273]:
            - generic [ref=e274]: Contact
      - navigation "Legal" [ref=e275]:
        - heading "Legal" [level=2] [ref=e276]
        - list [ref=e277]:
          - listitem [ref=e278]:
            - generic [ref=e279]: Terms
          - listitem [ref=e280]:
            - generic [ref=e281]: Privacy
    - paragraph [ref=e283]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:34181:25) at http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6025:5) ×2
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-rf452g: e2e_par_ia7e3q → e2e_chi_h2n0oi
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:34181:25) at http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6025:5) ×3
```

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
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×4
[client-error] console.error: [pin] place text read failed: TypeError: Failed to fetch
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-2-tf9ygz: e2e_par_6lu07e → e2e_chi_6rmsvz
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

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
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:34181:25) at http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-Cz-gHGfj.js:6025:5) ×2
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/my_listing ({"code":"P0001","details":null,"hint":null,"message":"not your listing"})
```
