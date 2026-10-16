# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38900769924
- Commit: `d6aa52ba05f1870844eb0385463f70d00a7e881d`
- Attempt: 1
- Written (UTC): 2026-10-16T13:43:46.024Z
- Passed: 1909 · Skipped: 126 · Failed: 53
- Gating failures: 53 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 8
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-82 a single-pick question made multi-pick: every ad's answer becomes a one-answer list in the same change; other questions and other changes are untouched (INC-632) — Error: [e2e:pool] reaping e2e-pool-s1b-000@ethio-e2e.invalid (rate limits) failed: <html>
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one — Error: sign-in form did not render on /auth
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · feed-screens.spec.ts › FEED SCREENS › FS-6 a failed read is shown, and Retry recovers — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · import-security.spec.ts › IMPORT-GATE attributes › IG-1 attributes: malformed, foreign, oversized and unreadable files are refused whole — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · import-security.spec.ts › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited — Error: sign-in form did not render on /auth
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing — Error: sign-in form did not render on /auth
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in — Error: expect(page).toHaveURL(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-82 a single-pick question made multi-pick: every ad's answer becomes a one-answer list in the same change; other questions and other changes are untouched (INC-632)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s1b-000@ethio-e2e.invalid (rate limits) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s1b-000@ethio-e2e.invalid (rate limits) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>


   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:261:21)
```

Context: context file not found for `admin-attributes-safety-Bundle-7-attribute-safety-AT-82-a-single-pick-question-made-multi-pick-every-ad-s-answer-becomes-a-one-answer-list-in-the-same-change-other-questions-and-other-changes-are-untouched-INC-632-mobile-360` — Playwright's name `admin-attributes-safety-Bu-405a3-nges-are-untouched-INC-632--mobile-360`; this run carried 90 context file(s); of the same spec: none

### admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e323]:
            - generic [ref=e324]: About
          - listitem [ref=e325]:
            - generic [ref=e326]: How it works
      - navigation "Help" [ref=e327]:
        - heading "Help" [level=2] [ref=e328]
        - list [ref=e329]:
          - listitem [ref=e330]:
            - generic [ref=e331]: Safety
          - listitem [ref=e332]:
            - generic [ref=e333]: Contact
      - navigation "Legal" [ref=e334]:
        - heading "Legal" [level=2] [ref=e335]
        - list [ref=e336]:
          - listitem [ref=e337]:
            - generic [ref=e338]: Terms
          - listitem [ref=e339]:
            - generic [ref=e340]: Privacy
    - paragraph [ref=e342]: © 2026 ethio.com — All rights reserved.
```
```

### feed-screens.spec.ts › FEED SCREENS › FS-6 a failed read is shown, and Retry recovers

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="listing-card"][data-listing="c0d51366-c8cc-45d9-8bb7-750beedb7fc7"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="listing-card"][data-listing="c0d51366-c8cc-45d9-8bb7-750beedb7fc7"]')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="listing-card"][data-listing="c0d51366-c8cc-45d9-8bb7-750beedb7fc7"]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('[data-testid="listing-card"][data-listing="c0d51366-c8cc-45d9-8bb7-750beedb7fc7"]')


  357 |     await expect(page.getByTestId("feed-error")).toBeVisible();
  358 |     await page.getByTestId("feed-retry").click();
> 359 |     await expect(page.locator(`[data-testid="listing-card"][data-listing="${id}"]`)).toBeVisible();
      |                                                                                      ^
  360 |     await expect(page.getByTestId("feed-error")).toHaveCount(0);
  361 |   });
  362 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/feed-screens.spec.ts:359:86
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/feed?category=d5d34fee-c74a-4a4f-b878-1dd4b8d731c6 ({"error":"internal error"})
```

Context:

```text
          - listitem [ref=e295]:
            - generic [ref=e296]: About
          - listitem [ref=e297]:
            - generic [ref=e298]: How it works
      - navigation "Help" [ref=e299]:
        - heading "Help" [level=2] [ref=e300]
        - list [ref=e301]:
          - listitem [ref=e302]:
            - generic [ref=e303]: Safety
          - listitem [ref=e304]:
            - generic [ref=e305]: Contact
      - navigation "Legal" [ref=e306]:
        - heading "Legal" [level=2] [ref=e307]
        - list [ref=e308]:
          - listitem [ref=e309]:
            - generic [ref=e310]: Terms
          - listitem [ref=e311]:
            - generic [ref=e312]: Privacy
    - paragraph [ref=e314]: © 2026 ethio.com — All rights reserved.
```
```

### import-security.spec.ts › IMPORT-GATE attributes › IG-1 attributes: malformed, foreign, oversized and unreadable files are refused whole

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


   at helpers/ui.ts:901

  899 |   await gotoReady(page, "/");
  900 |   await assertInjectedIdentity(page, session);
> 901 |   await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
      |                                      ^
  902 |   await waitForHydration(page);
  903 |   // READ-BACK from the client: the injected session really is AAL2.
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

### import-security.spec.ts › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
```

Context:

```text
          - listitem [ref=e341]:
            - generic [ref=e342]: About
          - listitem [ref=e343]:
            - generic [ref=e344]: How it works
      - navigation "Help" [ref=e345]:
        - heading "Help" [level=2] [ref=e346]
        - list [ref=e347]:
          - listitem [ref=e348]:
            - generic [ref=e349]: Safety
          - listitem [ref=e350]:
            - generic [ref=e351]: Contact
      - navigation "Legal" [ref=e352]:
        - heading "Legal" [level=2] [ref=e353]
        - list [ref=e354]:
          - listitem [ref=e355]:
            - generic [ref=e356]: Terms
          - listitem [ref=e357]:
            - generic [ref=e358]: Privacy
    - paragraph [ref=e360]: © 2026 ethio.com — All rights reserved.
```
```

### mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e303]:
            - generic [ref=e304]: About
          - listitem [ref=e305]:
            - generic [ref=e306]: How it works
      - navigation "Help" [ref=e307]:
        - heading "Help" [level=2] [ref=e308]
        - list [ref=e309]:
          - listitem [ref=e310]:
            - generic [ref=e311]: Safety
          - listitem [ref=e312]:
            - generic [ref=e313]: Contact
      - navigation "Legal" [ref=e314]:
        - heading "Legal" [level=2] [ref=e315]
        - list [ref=e316]:
          - listitem [ref=e317]:
            - generic [ref=e318]: Terms
          - listitem [ref=e319]:
            - generic [ref=e320]: Privacy
    - paragraph [ref=e322]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/account"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/account"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/account"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/account"


  483 |       await window.__ethioSupabase!.auth.signOut({ scope: "local" });
  484 |     });
> 485 |     await expect(page).toHaveURL(/\/$/, { timeout: 15000 });
      |                        ^
  486 |   });
  487 |
  488 |   test("MLP-4 The Account overview counts the six groups with the page's words and opens My listings (INC-469)", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:485:24
```

Context:

```text
          - listitem [ref=e151]:
            - generic [ref=e152]: About
          - listitem [ref=e153]:
            - generic [ref=e154]: How it works
      - navigation "Help" [ref=e155]:
        - heading "Help" [level=2] [ref=e156]
        - list [ref=e157]:
          - listitem [ref=e158]:
            - generic [ref=e159]: Safety
          - listitem [ref=e160]:
            - generic [ref=e161]: Contact
      - navigation "Legal" [ref=e162]:
        - heading "Legal" [level=2] [ref=e163]
        - list [ref=e164]:
          - listitem [ref=e165]:
            - generic [ref=e166]: Terms
          - listitem [ref=e167]:
            - generic [ref=e168]: Privacy
    - paragraph [ref=e170]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-place.spec.ts › POSTING WIZARD › PW-30 review and buyer preview render option labels, units, multi-values and booleans

- Source: `shard 6`
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


  745 |     await page.getByTestId("post-price-mode-free").click();
  746 |     await page.getByTestId("post-next").click();
> 747 |     await expect(page.getByTestId("post-step-5")).toBeVisible();
      |                                                   ^
  748 |     await page.getByTestId("post-title").fill("e2e labelled title");
  749 |     await page.getByTestId("post-description").fill("e2e labelled description");
  750 |     await page.getByTestId("post-next").click();
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:747:51
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-30-review-and-buyer-preview-render-option-labels-units-multi-values-and-booleans-desktop-1280` — Playwright's name `post-wizard-place-POSTING--6247a-s-multi-values-and-booleans-desktop-1280`; this run carried 90 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

101 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `listing not found` | 13 | shard 3, shard 6 |
| `digest mismatch` (quiet) | 6 | shard 1, shard 2, shard 4 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `too many previews` (quiet) | 3 | shard 2 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-nzjr<n>d: e<n>e_par_wsufsa → e<n>e_chi_mkxmv<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-s<n>eg<n>: e<n>e_par_bm<n>d → e<n>e_chi_rfcyq<n>` (quiet) | 1 | shard 1 |
| `gate fetch failed <n>` | 1 | smoke |

Quiet (allowlisted): digest mismatch ×6 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · too many previews ×3 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-nzjr<n>d: e<n>e_par_wsufsa → e<n>e_chi_mkxmv<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-s<n>eg<n>: e<n>e_par_bm<n>d → e<n>e_chi_rfcyq<n> ×1

Off the allowlist:

### listing not found

- Count: 13 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-104 a unit settled by the type is held by the price page's unit ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-45 a declared swatch renders one ink, a two-tone and a pattern tile ×2 · PW-50 the specifications show every row open in display order (D41) ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### gate fetch failed <n>

- Count: 1 · Sources: smoke
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): TR-27 a star set signed-out survives reload, sign-in and sign-out ×1 · TR-37 the account carries onto a starless device, and never over a star ×1

```text
[WebServer] [ssr-error] /__root gate fetch failed 502
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-16T12:53:59.544Z | 15.9 min |
| email | 2026-10-16T12:54:03.971Z | 0.3 min |
| shard 1 | 2026-10-16T12:54:07.309Z | 49.1 min |
| shard 2 | 2026-10-16T12:53:59.501Z | 35.6 min |
| shard 3 | 2026-10-16T12:54:11.665Z | 36.3 min |
| shard 4 | 2026-10-16T12:54:01.767Z | 40.9 min |
| shard 5 | 2026-10-16T12:54:04.412Z | 41.8 min |
| shard 6 | 2026-10-16T12:54:08.251Z | 37.3 min |
| changed | 2026-10-16T12:54:13.430Z | 41.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 120 | 55.2 min | shard 1, shard 4, changed |
| `admin-screening.spec.ts` | 104 | 44.1 min | shard 1, shard 4, changed |
| `post-wizard-specs.spec.ts` | 80 | 26.4 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 60 | 26.0 min | shard 2, shard 5, changed |
| `photo-pipeline.spec.ts` | 66 | 25.9 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 19.4 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 18.4 min | shard 3, shard 6 |
| `my-listings-page.spec.ts` | 28 | 17.6 min | shard 2, shard 5, changed |
| `post-wizard-place.spec.ts` | 38 | 17.5 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.3 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 78 | 16.7 min | smoke, shard 2, shard 5, changed |
| `admin-categories-lifecycle.spec.ts` | 52 | 15.7 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 14.2 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 62 | 14.2 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 13.2 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 12.9 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 12.6 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 11.7 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 30 | 10.2 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 10.1 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 10.0 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 9.3 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 9.0 min | shard 1, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.7 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.4 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 7.8 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.8 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 7.5 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 7.1 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 6.5 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.4 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 6.0 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 5.3 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 5.2 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 5.0 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 4.4 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.9 min | shard 3, shard 6 |
| `admin-categories-home.spec.ts` | 10 | 3.4 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 3.1 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 2.0 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 3, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.1 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.8 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | mobile-360 | 126.7 s |
| `feed-screens.spec.ts` › FS-1 a subcategory shows its own listings; its parent shows the whole branch | mobile-360 | 120.1 s |
| `admin-coverage.spec.ts` › CV-1 gating: a plain user is refused; the roster renders for a super admin | desktop-1280 | 94.3 s |
| `admin-listings.spec.ts` › AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision | mobile-360 | 88.6 s |
| `admin-listings.spec.ts` › AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision | desktop-1280 | 86.4 s |
| `admin-screening.spec.ts` › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188) | mobile-360 | 85.0 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | desktop-1280 | 85.0 s |
| `admin-listings.spec.ts` › AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision | desktop-1280 | 85.0 s |
| `admin-countries.spec.ts` › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin | mobile-360 | 85.0 s |
| `admin-listings.spec.ts` › AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision | mobile-360 | 84.5 s |
| `admin-screening.spec.ts` › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188) | desktop-1280 | 83.8 s |
| `admin-screening.spec.ts` › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188) | mobile-360 | 83.8 s |
| `my-listings-ad.spec.ts` › MLA-13 Edit opens the wizard's Review with no Edit on the Category; a price saved at once from the Price step; new words to review from the Title step; a refusal under its field (D194, D177) | mobile-360 | 83.2 s |
| `admin-listings.spec.ts` › AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit | mobile-360 | 82.9 s |
| `admin-categories-console.spec.ts` › CT-7b browse paths: an unproven factor cannot move a pointer | mobile-360 | 81.7 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38900769924-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38900769924-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 4, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 38900769924-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 38900769924-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38900769924-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38900769924-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 58 user(s) owned by process 38900769924-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38900769924-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38900769924-changed
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e256]:
            - generic [ref=e257]: About
          - listitem [ref=e258]:
            - generic [ref=e259]: How it works
      - navigation "Help" [ref=e260]:
        - heading "Help" [level=2] [ref=e261]
        - list [ref=e262]:
          - listitem [ref=e263]:
            - generic [ref=e264]: Safety
          - listitem [ref=e265]:
            - generic [ref=e266]: Contact
      - navigation "Legal" [ref=e267]:
        - heading "Legal" [level=2] [ref=e268]
        - list [ref=e269]:
          - listitem [ref=e270]:
            - generic [ref=e271]: Terms
          - listitem [ref=e272]:
            - generic [ref=e273]: Privacy
    - paragraph [ref=e275]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e289]:
            - generic [ref=e290]: About
          - listitem [ref=e291]:
            - generic [ref=e292]: How it works
      - navigation "Help" [ref=e293]:
        - heading "Help" [level=2] [ref=e294]
        - list [ref=e295]:
          - listitem [ref=e296]:
            - generic [ref=e297]: Safety
          - listitem [ref=e298]:
            - generic [ref=e299]: Contact
      - navigation "Legal" [ref=e300]:
        - heading "Legal" [level=2] [ref=e301]
        - list [ref=e302]:
          - listitem [ref=e303]:
            - generic [ref=e304]: Terms
          - listitem [ref=e305]:
            - generic [ref=e306]: Privacy
    - paragraph [ref=e308]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e257]:
            - generic [ref=e258]: About
          - listitem [ref=e259]:
            - generic [ref=e260]: How it works
      - navigation "Help" [ref=e261]:
        - heading "Help" [level=2] [ref=e262]
        - list [ref=e263]:
          - listitem [ref=e264]:
            - generic [ref=e265]: Safety
          - listitem [ref=e266]:
            - generic [ref=e267]: Contact
      - navigation "Legal" [ref=e268]:
        - heading "Legal" [level=2] [ref=e269]
        - list [ref=e270]:
          - listitem [ref=e271]:
            - generic [ref=e272]: Terms
          - listitem [ref=e273]:
            - generic [ref=e274]: Privacy
    - paragraph [ref=e276]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e367]:
            - generic [ref=e368]: About
          - listitem [ref=e369]:
            - generic [ref=e370]: How it works
      - navigation "Help" [ref=e371]:
        - heading "Help" [level=2] [ref=e372]
        - list [ref=e373]:
          - listitem [ref=e374]:
            - generic [ref=e375]: Safety
          - listitem [ref=e376]:
            - generic [ref=e377]: Contact
      - navigation "Legal" [ref=e378]:
        - heading "Legal" [level=2] [ref=e379]
        - list [ref=e380]:
          - listitem [ref=e381]:
            - generic [ref=e382]: Terms
          - listitem [ref=e383]:
            - generic [ref=e384]: Privacy
    - paragraph [ref=e386]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e357]:
            - generic [ref=e358]: About
          - listitem [ref=e359]:
            - generic [ref=e360]: How it works
      - navigation "Help" [ref=e361]:
        - heading "Help" [level=2] [ref=e362]
        - list [ref=e363]:
          - listitem [ref=e364]:
            - generic [ref=e365]: Safety
          - listitem [ref=e366]:
            - generic [ref=e367]: Contact
      - navigation "Legal" [ref=e368]:
        - heading "Legal" [level=2] [ref=e369]
        - list [ref=e370]:
          - listitem [ref=e371]:
            - generic [ref=e372]: Terms
          - listitem [ref=e373]:
            - generic [ref=e374]: Privacy
    - paragraph [ref=e376]: © 2026 ethio.com — All rights reserved.
```
```

## admin-coverage.spec.ts › L2b coverage console › CV-1 gating: a plain user is refused; the roster renders for a super admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e249]:
            - generic [ref=e250]: About
          - listitem [ref=e251]:
            - generic [ref=e252]: How it works
      - navigation "Help" [ref=e253]:
        - heading "Help" [level=2] [ref=e254]
        - list [ref=e255]:
          - listitem [ref=e256]:
            - generic [ref=e257]: Safety
          - listitem [ref=e258]:
            - generic [ref=e259]: Contact
      - navigation "Legal" [ref=e260]:
        - heading "Legal" [level=2] [ref=e261]
        - list [ref=e262]:
          - listitem [ref=e263]:
            - generic [ref=e264]: Terms
          - listitem [ref=e265]:
            - generic [ref=e266]: Privacy
    - paragraph [ref=e268]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Title, Price"
Received: "Edited: Title"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Title</p>
       - unexpected value "Edited: Title"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Title, Price"
Received: "Edited: Title"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Title</p>
       - unexpected value "Edited: Title"


  1460 |     await expect(page.getByTestId("listing-fact-price").locator("dd")).toHaveText("120 ETB");
  1461 |     const newest = page.getByTestId("listing-history-entry-0");
> 1462 |     await expect(newest.getByTestId("listing-history-what")).toHaveText(
       |                                                              ^
  1463 |       en["admin.listings.history.edited"].replace(
  1464 |         "{fields}",
```

Context:

```text
          - listitem [ref=e365]:
            - generic [ref=e366]: About
          - listitem [ref=e367]:
            - generic [ref=e368]: How it works
      - navigation "Help" [ref=e369]:
        - heading "Help" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Safety
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Terms
          - listitem [ref=e381]:
            - generic [ref=e382]: Privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-review')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-review')


  1553 |     // Do not change anything; go back.
  1554 |     await page.getByTestId("post-next").click();
> 1555 |     await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
       |                                                   ^
  1556 |     await expect(page.getByTestId("post-edit-notice")).toHaveAttribute("data-shown", "false");
  1557 |     expect((await revisionRows(live.id, "edit")).length).toBe(revisionCountBefore);
  1558 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1555:51
```

Context:

```text
          - listitem [ref=e344]:
            - generic [ref=e345]: About
          - listitem [ref=e346]:
            - generic [ref=e347]: How it works
      - navigation "Help" [ref=e348]:
        - heading "Help" [level=2] [ref=e349]
        - list [ref=e350]:
          - listitem [ref=e351]:
            - generic [ref=e352]: Safety
          - listitem [ref=e353]:
            - generic [ref=e354]: Contact
      - navigation "Legal" [ref=e355]:
        - heading "Legal" [level=2] [ref=e356]
        - list [ref=e357]:
          - listitem [ref=e358]:
            - generic [ref=e359]: Terms
          - listitem [ref=e360]:
            - generic [ref=e361]: Privacy
    - paragraph [ref=e363]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
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

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
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

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-edit-notice')
Expected: "true"
Received: "false"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for getByTestId('post-edit-notice')
    24 × locator resolved to <p role="status" aria-live="polite" data-shown="false" data-testid="post-edit-notice" class="text-sm text-foreground transition-opacity duration-500 opacity-0"></p>
       - unexpected value "false"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-edit-notice')
Expected: "true"
Received: "false"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for getByTestId('post-edit-notice')
    24 × locator resolved to <p role="status" aria-live="polite" data-shown="false" data-testid="post-edit-notice" class="text-sm text-foreground transition-opacity duration-500 opacity-0"></p>
       - unexpected value "false"


  1405 |     await stepUpIfPrompted(page, secret);
  1406 |     await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
> 1407 |     await expect(page.getByTestId("post-edit-notice")).toHaveAttribute("data-shown", "true", {
       |                                                        ^
  1408 |       timeout: 20000,
  1409 |     });
```

Context:

```text
          - listitem [ref=e386]:
            - generic [ref=e387]: About
          - listitem [ref=e388]:
            - generic [ref=e389]: How it works
      - navigation "Help" [ref=e390]:
        - heading "Help" [level=2] [ref=e391]
        - list [ref=e392]:
          - listitem [ref=e393]:
            - generic [ref=e394]: Safety
          - listitem [ref=e395]:
            - generic [ref=e396]: Contact
      - navigation "Legal" [ref=e397]:
        - heading "Legal" [level=2] [ref=e398]
        - list [ref=e399]:
          - listitem [ref=e400]:
            - generic [ref=e401]: Terms
          - listitem [ref=e402]:
            - generic [ref=e403]: Privacy
    - paragraph [ref=e405]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^="admin-screening-row-9e643ae8-bcfb-48ba-a135-28691c1c6290"]')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^="admin-screening-row-9e643ae8-bcfb-48ba-a135-28691c1c6290"]')
    14 × locator resolved to 6 elements
       - unexpected value "6"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^="admin-screening-row-9e643ae8-bcfb-48ba-a135-28691c1c6290"]')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^="admin-screening-row-9e643ae8-bcfb-48ba-a135-28691c1c6290"]')
    14 × locator resolved to 6 elements
       - unexpected value "6"


  1496 |       .poll(() => new URL(page.url()).search, { timeout: 20000 })
  1497 |       .not.toContain("decided");
> 1498 |     await expect(page.locator(`[data-testid^="admin-screening-row-${ad.id}"]`)).toHaveCount(0);
       |                                                                                 ^
  1499 |     expect(await titleOf(ad.id)).toEqual({ title: corrected, status: "rejected" });
  1500 |   });
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: How it works
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
          - listitem [ref=e317]:
            - generic [ref=e318]: Contact
      - navigation "Legal" [ref=e319]:
        - heading "Legal" [level=2] [ref=e320]
        - list [ref=e321]:
          - listitem [ref=e322]:
            - generic [ref=e323]: Terms
          - listitem [ref=e324]:
            - generic [ref=e325]: Privacy
    - paragraph [ref=e327]: © 2026 ethio.com — All rights reserved.
```
```

## admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
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

## admin-users.spec.ts › U1 admin users › AU-1 permission: moderator is refused, admin sees the list

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
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

## feed-screens.spec.ts › FEED SCREENS › FS-1 a subcategory shows its own listings; its parent shows the whole branch

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `feed-screens-FEED-SCREENS-FS-1-a-subcategory-shows-its-own-listings-its-parent-shows-the-whole-branch-mobile-360` — Playwright's name `feed-screens-FEED-SCREENS--5eede-rent-shows-the-whole-branch-mobile-360`; this run carried 90 context file(s); of the same spec: `feed-screens-FEED-SCREENS--79209-is-shown-and-Retry-recovers-mobile-360`

## import-security.spec.ts › IMPORT-GATE locations-countries › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e334]:
            - generic [ref=e335]: About
          - listitem [ref=e336]:
            - generic [ref=e337]: How it works
      - navigation "Help" [ref=e338]:
        - heading "Help" [level=2] [ref=e339]
        - list [ref=e340]:
          - listitem [ref=e341]:
            - generic [ref=e342]: Safety
          - listitem [ref=e343]:
            - generic [ref=e344]: Contact
      - navigation "Legal" [ref=e345]:
        - heading "Legal" [level=2] [ref=e346]
        - list [ref=e347]:
          - listitem [ref=e348]:
            - generic [ref=e349]: Terms
          - listitem [ref=e350]:
            - generic [ref=e351]: Privacy
    - paragraph [ref=e353]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e309]:
            - generic [ref=e310]: About
          - listitem [ref=e311]:
            - generic [ref=e312]: How it works
      - navigation "Help" [ref=e313]:
        - heading "Help" [level=2] [ref=e314]
        - list [ref=e315]:
          - listitem [ref=e316]:
            - generic [ref=e317]: Safety
          - listitem [ref=e318]:
            - generic [ref=e319]: Contact
      - navigation "Legal" [ref=e320]:
        - heading "Legal" [level=2] [ref=e321]
        - list [ref=e322]:
          - listitem [ref=e323]:
            - generic [ref=e324]: Terms
          - listitem [ref=e325]:
            - generic [ref=e326]: Privacy
    - paragraph [ref=e328]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
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

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-13 Edit opens the wizard's Review with no Edit on the Category; a price saved at once from the Price step; new words to review from the Title step; a refusal under its field (D194, D177)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
    14 × locator resolved to 1 element
       - unexpected value "1"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
    14 × locator resolved to 1 element
       - unexpected value "1"


  1032 |     await page.getByTestId("post-title").click();
  1033 |     await page.keyboard.type(`E2E corrected ${token()}`);
> 1034 |     await expect(refusal).toHaveCount(0);
       |                           ^
  1035 |   });
  1036 |
```

Context:

```text
          - listitem [ref=e231]:
            - generic [ref=e232]: About
          - listitem [ref=e233]:
            - generic [ref=e234]: How it works
      - navigation "Help" [ref=e235]:
        - heading "Help" [level=2] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - generic [ref=e239]: Safety
          - listitem [ref=e240]:
            - generic [ref=e241]: Contact
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Terms
          - listitem [ref=e247]:
            - generic [ref=e248]: Privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-1 gating: a plain user is refused; the library renders for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e303]:
            - generic [ref=e304]: About
          - listitem [ref=e305]:
            - generic [ref=e306]: How it works
      - navigation "Help" [ref=e307]:
        - heading "Help" [level=2] [ref=e308]
        - list [ref=e309]:
          - listitem [ref=e310]:
            - generic [ref=e311]: Safety
          - listitem [ref=e312]:
            - generic [ref=e313]: Contact
      - navigation "Legal" [ref=e314]:
        - heading "Legal" [level=2] [ref=e315]
        - list [ref=e316]:
          - listitem [ref=e317]:
            - generic [ref=e318]: Terms
          - listitem [ref=e319]:
            - generic [ref=e320]: Privacy
    - paragraph [ref=e322]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › AS-1 gating: a plain user is refused, a moderator reads the log

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e336]:
            - generic [ref=e337]: About
          - listitem [ref=e338]:
            - generic [ref=e339]: How it works
      - navigation "Help" [ref=e340]:
        - heading "Help" [level=2] [ref=e341]
        - list [ref=e342]:
          - listitem [ref=e343]:
            - generic [ref=e344]: Safety
          - listitem [ref=e345]:
            - generic [ref=e346]: Contact
      - navigation "Legal" [ref=e347]:
        - heading "Legal" [level=2] [ref=e348]
        - list [ref=e349]:
          - listitem [ref=e350]:
            - generic [ref=e351]: Terms
          - listitem [ref=e352]:
            - generic [ref=e353]: Privacy
    - paragraph [ref=e355]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-1 gating: a plain user is refused; the section renders for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e322]:
            - generic [ref=e323]: About
          - listitem [ref=e324]:
            - generic [ref=e325]: How it works
      - navigation "Help" [ref=e326]:
        - heading "Help" [level=2] [ref=e327]
        - list [ref=e328]:
          - listitem [ref=e329]:
            - generic [ref=e330]: Safety
          - listitem [ref=e331]:
            - generic [ref=e332]: Contact
      - navigation "Legal" [ref=e333]:
        - heading "Legal" [level=2] [ref=e334]
        - list [ref=e335]:
          - listitem [ref=e336]:
            - generic [ref=e337]: Terms
          - listitem [ref=e338]:
            - generic [ref=e339]: Privacy
    - paragraph [ref=e341]: © 2026 ethio.com — All rights reserved.
```
```

## admin-categories-console.spec.ts › C2 categories console › CT-7b browse paths: an unproven factor cannot move a pointer

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
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

## admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e403]:
            - generic [ref=e404]: About
          - listitem [ref=e405]:
            - generic [ref=e406]: How it works
      - navigation "Help" [ref=e407]:
        - heading "Help" [level=2] [ref=e408]
        - list [ref=e409]:
          - listitem [ref=e410]:
            - generic [ref=e411]: Safety
          - listitem [ref=e412]:
            - generic [ref=e413]: Contact
      - navigation "Legal" [ref=e414]:
        - heading "Legal" [level=2] [ref=e415]
        - list [ref=e416]:
          - listitem [ref=e417]:
            - generic [ref=e418]: Terms
          - listitem [ref=e419]:
            - generic [ref=e420]: Privacy
    - paragraph [ref=e422]: © 2026 ethio.com — All rights reserved.
```
```

## admin-coverage.spec.ts › L2b coverage console › CV-1 gating: a plain user is refused; the roster renders for a super admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('#auth-email')


   at helpers/ui.ts:69

  67 |
  68 |   for (let attempt = 1; attempt <= 5; attempt += 1) {
> 69 |     await input.fill("");
     |                 ^
  70 |     await input.fill(value);
  71 |
  72 |     try {
    at fillUntilStable (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:69:17)
    at signIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:397:3)
    at switchUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:517:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-coverage.spec.ts:128:5
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

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Title, Price"
Received: "Edited: Title"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Title</p>
       - unexpected value "Edited: Title"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Title, Price"
Received: "Edited: Title"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Title</p>
       - unexpected value "Edited: Title"


  1460 |     await expect(page.getByTestId("listing-fact-price").locator("dd")).toHaveText("120 ETB");
  1461 |     const newest = page.getByTestId("listing-history-entry-0");
> 1462 |     await expect(newest.getByTestId("listing-history-what")).toHaveText(
       |                                                              ^
  1463 |       en["admin.listings.history.edited"].replace(
  1464 |         "{fields}",
```

Context:

```text
          - listitem [ref=e389]:
            - generic [ref=e390]: About
          - listitem [ref=e391]:
            - generic [ref=e392]: How it works
      - navigation "Help" [ref=e393]:
        - heading "Help" [level=2] [ref=e394]
        - list [ref=e395]:
          - listitem [ref=e396]:
            - generic [ref=e397]: Safety
          - listitem [ref=e398]:
            - generic [ref=e399]: Contact
      - navigation "Legal" [ref=e400]:
        - heading "Legal" [level=2] [ref=e401]
        - list [ref=e402]:
          - listitem [ref=e403]:
            - generic [ref=e404]: Terms
          - listitem [ref=e405]:
            - generic [ref=e406]: Privacy
    - paragraph [ref=e408]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-review')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-review')


  1553 |     // Do not change anything; go back.
  1554 |     await page.getByTestId("post-next").click();
> 1555 |     await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
       |                                                   ^
  1556 |     await expect(page.getByTestId("post-edit-notice")).toHaveAttribute("data-shown", "false");
  1557 |     expect((await revisionRows(live.id, "edit")).length).toBe(revisionCountBefore);
  1558 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1555:51
```

Context:

```text
          - listitem [ref=e396]:
            - generic [ref=e397]: About
          - listitem [ref=e398]:
            - generic [ref=e399]: How it works
      - navigation "Help" [ref=e400]:
        - heading "Help" [level=2] [ref=e401]
        - list [ref=e402]:
          - listitem [ref=e403]:
            - generic [ref=e404]: Safety
          - listitem [ref=e405]:
            - generic [ref=e406]: Contact
      - navigation "Legal" [ref=e407]:
        - heading "Legal" [level=2] [ref=e408]
        - list [ref=e409]:
          - listitem [ref=e410]:
            - generic [ref=e411]: Terms
          - listitem [ref=e412]:
            - generic [ref=e413]: Privacy
    - paragraph [ref=e415]: © 2026 ethio.com — All rights reserved.
```
```

## admin-locations.spec.ts › L2a locations console › LT-1 gating: a plain user is refused; the roster, its toolbar and the header's actions render for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
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

## admin-roles.spec.ts › U2 roles console › RP-1 gating: moderator refused, admin sees the list, signed-out deep link redirects

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e373]:
            - generic [ref=e374]: About
          - listitem [ref=e375]:
            - generic [ref=e376]: How it works
      - navigation "Help" [ref=e377]:
        - heading "Help" [level=2] [ref=e378]
        - list [ref=e379]:
          - listitem [ref=e380]:
            - generic [ref=e381]: Safety
          - listitem [ref=e382]:
            - generic [ref=e383]: Contact
      - navigation "Legal" [ref=e384]:
        - heading "Legal" [level=2] [ref=e385]
        - list [ref=e386]:
          - listitem [ref=e387]:
            - generic [ref=e388]: Terms
          - listitem [ref=e389]:
            - generic [ref=e390]: Privacy
    - paragraph [ref=e392]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-edit-notice')
Expected: "true"
Received: "false"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for getByTestId('post-edit-notice')
    24 × locator resolved to <p role="status" aria-live="polite" data-shown="false" data-testid="post-edit-notice" class="text-sm text-foreground transition-opacity duration-500 opacity-0"></p>
       - unexpected value "false"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-edit-notice')
Expected: "true"
Received: "false"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for getByTestId('post-edit-notice')
    24 × locator resolved to <p role="status" aria-live="polite" data-shown="false" data-testid="post-edit-notice" class="text-sm text-foreground transition-opacity duration-500 opacity-0"></p>
       - unexpected value "false"


  1405 |     await stepUpIfPrompted(page, secret);
  1406 |     await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
> 1407 |     await expect(page.getByTestId("post-edit-notice")).toHaveAttribute("data-shown", "true", {
       |                                                        ^
  1408 |       timeout: 20000,
  1409 |     });
```

Context:

```text
          - listitem [ref=e422]:
            - generic [ref=e423]: About
          - listitem [ref=e424]:
            - generic [ref=e425]: How it works
      - navigation "Help" [ref=e426]:
        - heading "Help" [level=2] [ref=e427]
        - list [ref=e428]:
          - listitem [ref=e429]:
            - generic [ref=e430]: Safety
          - listitem [ref=e431]:
            - generic [ref=e432]: Contact
      - navigation "Legal" [ref=e433]:
        - heading "Legal" [level=2] [ref=e434]
        - list [ref=e435]:
          - listitem [ref=e436]:
            - generic [ref=e437]: Terms
          - listitem [ref=e438]:
            - generic [ref=e439]: Privacy
    - paragraph [ref=e441]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^="admin-screening-row-15cfd4fc-a1d9-4701-ba0f-2a127f9464c5"]')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^="admin-screening-row-15cfd4fc-a1d9-4701-ba0f-2a127f9464c5"]')
    14 × locator resolved to 6 elements
       - unexpected value "6"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^="admin-screening-row-15cfd4fc-a1d9-4701-ba0f-2a127f9464c5"]')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^="admin-screening-row-15cfd4fc-a1d9-4701-ba0f-2a127f9464c5"]')
    14 × locator resolved to 6 elements
       - unexpected value "6"


  1496 |       .poll(() => new URL(page.url()).search, { timeout: 20000 })
  1497 |       .not.toContain("decided");
> 1498 |     await expect(page.locator(`[data-testid^="admin-screening-row-${ad.id}"]`)).toHaveCount(0);
       |                                                                                 ^
  1499 |     expect(await titleOf(ad.id)).toEqual({ title: corrected, status: "rejected" });
  1500 |   });
```

Context:

```text
          - listitem [ref=e337]:
            - generic [ref=e338]: About
          - listitem [ref=e339]:
            - generic [ref=e340]: How it works
      - navigation "Help" [ref=e341]:
        - heading "Help" [level=2] [ref=e342]
        - list [ref=e343]:
          - listitem [ref=e344]:
            - generic [ref=e345]: Safety
          - listitem [ref=e346]:
            - generic [ref=e347]: Contact
      - navigation "Legal" [ref=e348]:
        - heading "Legal" [level=2] [ref=e349]
        - list [ref=e350]:
          - listitem [ref=e351]:
            - generic [ref=e352]: Terms
          - listitem [ref=e353]:
            - generic [ref=e354]: Privacy
    - paragraph [ref=e356]: © 2026 ethio.com — All rights reserved.
```
```

## admin-shell.spec.ts › Admin shell (U0) › A-5 the Categories group carries its sub-items, expands on a sub-route and gates each one

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e306]:
            - generic [ref=e307]: About
          - listitem [ref=e308]:
            - generic [ref=e309]: How it works
      - navigation "Help" [ref=e310]:
        - heading "Help" [level=2] [ref=e311]
        - list [ref=e312]:
          - listitem [ref=e313]:
            - generic [ref=e314]: Safety
          - listitem [ref=e315]:
            - generic [ref=e316]: Contact
      - navigation "Legal" [ref=e317]:
        - heading "Legal" [level=2] [ref=e318]
        - list [ref=e319]:
          - listitem [ref=e320]:
            - generic [ref=e321]: Terms
          - listitem [ref=e322]:
            - generic [ref=e323]: Privacy
    - paragraph [ref=e325]: © 2026 ethio.com — All rights reserved.
```
```

## admin-users.spec.ts › U1 admin users › AU-1 permission: moderator is refused, admin sees the list

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e280]:
            - generic [ref=e281]: About
          - listitem [ref=e282]:
            - generic [ref=e283]: How it works
      - navigation "Help" [ref=e284]:
        - heading "Help" [level=2] [ref=e285]
        - list [ref=e286]:
          - listitem [ref=e287]:
            - generic [ref=e288]: Safety
          - listitem [ref=e289]:
            - generic [ref=e290]: Contact
      - navigation "Legal" [ref=e291]:
        - heading "Legal" [level=2] [ref=e292]
        - list [ref=e293]:
          - listitem [ref=e294]:
            - generic [ref=e295]: Terms
          - listitem [ref=e296]:
            - generic [ref=e297]: Privacy
    - paragraph [ref=e299]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE attributes › @private-identity IG-3 attributes: a changed file cannot be committed and previews are rate limited

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e315]:
            - generic [ref=e316]: About
          - listitem [ref=e317]:
            - generic [ref=e318]: How it works
      - navigation "Help" [ref=e319]:
        - heading "Help" [level=2] [ref=e320]
        - list [ref=e321]:
          - listitem [ref=e322]:
            - generic [ref=e323]: Safety
          - listitem [ref=e324]:
            - generic [ref=e325]: Contact
      - navigation "Legal" [ref=e326]:
        - heading "Legal" [level=2] [ref=e327]
        - list [ref=e328]:
          - listitem [ref=e329]:
            - generic [ref=e330]: Terms
          - listitem [ref=e331]:
            - generic [ref=e332]: Privacy
    - paragraph [ref=e334]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE categories › @private-identity IG-3 categories: a changed file cannot be committed and previews are rate limited

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e348]:
            - generic [ref=e349]: About
          - listitem [ref=e350]:
            - generic [ref=e351]: How it works
      - navigation "Help" [ref=e352]:
        - heading "Help" [level=2] [ref=e353]
        - list [ref=e354]:
          - listitem [ref=e355]:
            - generic [ref=e356]: Safety
          - listitem [ref=e357]:
            - generic [ref=e358]: Contact
      - navigation "Legal" [ref=e359]:
        - heading "Legal" [level=2] [ref=e360]
        - list [ref=e361]:
          - listitem [ref=e362]:
            - generic [ref=e363]: Terms
          - listitem [ref=e364]:
            - generic [ref=e365]: Privacy
    - paragraph [ref=e367]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE translations › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e321]:
            - generic [ref=e322]: About
          - listitem [ref=e323]:
            - generic [ref=e324]: How it works
      - navigation "Help" [ref=e325]:
        - heading "Help" [level=2] [ref=e326]
        - list [ref=e327]:
          - listitem [ref=e328]:
            - generic [ref=e329]: Safety
          - listitem [ref=e330]:
            - generic [ref=e331]: Contact
      - navigation "Legal" [ref=e332]:
        - heading "Legal" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Terms
          - listitem [ref=e337]:
            - generic [ref=e338]: Privacy
    - paragraph [ref=e340]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE locations-countries › @private-identity IG-3 locations-countries: a changed file cannot be committed and previews are rate limited

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: email field is not editable

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 10000ms
Error: element(s) not found

Call log:
  - email field is not editable with timeout 10000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: email field is not editable

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 10000ms
Error: element(s) not found

Call log:
  - email field is not editable with timeout 10000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:66

  64 | /** Lifted verbatim from smoke-auth-i18n.spec.ts (P1-c hydration race fix). */
  65 | export async function fillUntilStable(input: Locator, value: string, fieldName: string) {
> 66 |   await expect(input, `${fieldName} field is not editable`).toBeEditable();
     |                                                             ^
```

Context:

```text
          - listitem [ref=e328]:
            - generic [ref=e329]: About
          - listitem [ref=e330]:
            - generic [ref=e331]: How it works
      - navigation "Help" [ref=e332]:
        - heading "Help" [level=2] [ref=e333]
        - list [ref=e334]:
          - listitem [ref=e335]:
            - generic [ref=e336]: Safety
          - listitem [ref=e337]:
            - generic [ref=e338]: Contact
      - navigation "Legal" [ref=e339]:
        - heading "Legal" [level=2] [ref=e340]
        - list [ref=e341]:
          - listitem [ref=e342]:
            - generic [ref=e343]: Terms
          - listitem [ref=e344]:
            - generic [ref=e345]: Privacy
    - paragraph [ref=e347]: © 2026 ethio.com — All rights reserved.
```
```

## import-security.spec.ts › IMPORT-GATE locations-locations › @private-identity IG-3 locations-locations: a changed file cannot be committed and previews are rate limited

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e364]:
            - generic [ref=e365]: About
          - listitem [ref=e366]:
            - generic [ref=e367]: How it works
      - navigation "Help" [ref=e368]:
        - heading "Help" [level=2] [ref=e369]
        - list [ref=e370]:
          - listitem [ref=e371]:
            - generic [ref=e372]: Safety
          - listitem [ref=e373]:
            - generic [ref=e374]: Contact
      - navigation "Legal" [ref=e375]:
        - heading "Legal" [level=2] [ref=e376]
        - list [ref=e377]:
          - listitem [ref=e378]:
            - generic [ref=e379]: Terms
          - listitem [ref=e380]:
            - generic [ref=e381]: Privacy
    - paragraph [ref=e383]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-2 gate: wrong code refused, correct code lets the action through

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e353]:
            - generic [ref=e354]: About
          - listitem [ref=e355]:
            - generic [ref=e356]: How it works
      - navigation "Help" [ref=e357]:
        - heading "Help" [level=2] [ref=e358]
        - list [ref=e359]:
          - listitem [ref=e360]:
            - generic [ref=e361]: Safety
          - listitem [ref=e362]:
            - generic [ref=e363]: Contact
      - navigation "Legal" [ref=e364]:
        - heading "Legal" [level=2] [ref=e365]
        - list [ref=e366]:
          - listitem [ref=e367]:
            - generic [ref=e368]: Terms
          - listitem [ref=e369]:
            - generic [ref=e370]: Privacy
    - paragraph [ref=e372]: © 2026 ethio.com — All rights reserved.
```
```

## mfa-stepup.spec.ts › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e325]:
            - generic [ref=e326]: About
          - listitem [ref=e327]:
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
```
```

## mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')

--- further error 1 ---
Error: sign-in form did not render on /auth

expect(locator).toBeEditable() failed

Locator: locator('#auth-email')
Expected: editable
Timeout: 15000ms
Error: element(s) not found

Call log:
  - sign-in form did not render on /auth with timeout 15000ms
  - waiting for locator('#auth-email')


   at helpers/ui.ts:395

  393 |   // INC-121 (c): the door must be OPEN before we type — a form still resolving
  394 |   // the signed-out branch is a wait, never a sleep (DEC-027).
> 395 |   await expect(emailInput, "sign-in form did not render on /auth").toBeEditable({ timeout: 15000 });
      |                                                                    ^
```

Context:

```text
          - listitem [ref=e337]:
            - generic [ref=e338]: About
          - listitem [ref=e339]:
            - generic [ref=e340]: How it works
      - navigation "Help" [ref=e341]:
        - heading "Help" [level=2] [ref=e342]
        - list [ref=e343]:
          - listitem [ref=e344]:
            - generic [ref=e345]: Safety
          - listitem [ref=e346]:
            - generic [ref=e347]: Contact
      - navigation "Legal" [ref=e348]:
        - heading "Legal" [level=2] [ref=e349]
        - list [ref=e350]:
          - listitem [ref=e351]:
            - generic [ref=e352]: Terms
          - listitem [ref=e353]:
            - generic [ref=e354]: Privacy
    - paragraph [ref=e356]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-13 Edit opens the wizard's Review with no Edit on the Category; a price saved at once from the Price step; new words to review from the Title step; a refusal under its field (D194, D177)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
    14 × locator resolved to 1 element
       - unexpected value "1"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
    14 × locator resolved to 1 element
       - unexpected value "1"


  1032 |     await page.getByTestId("post-title").click();
  1033 |     await page.keyboard.type(`E2E corrected ${token()}`);
> 1034 |     await expect(refusal).toHaveCount(0);
       |                           ^
  1035 |   });
  1036 |
```

Context:

```text
          - listitem [ref=e292]:
            - generic [ref=e293]: About
          - listitem [ref=e294]:
            - generic [ref=e295]: How it works
      - navigation "Help" [ref=e296]:
        - heading "Help" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - generic [ref=e300]: Safety
          - listitem [ref=e301]:
            - generic [ref=e302]: Contact
      - navigation "Legal" [ref=e303]:
        - heading "Legal" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Terms
          - listitem [ref=e308]:
            - generic [ref=e309]: Privacy
    - paragraph [ref=e311]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Title, Price"
Received: "Edited: Title"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Title</p>
       - unexpected value "Edited: Title"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Title, Price"
Received: "Edited: Title"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Title</p>
       - unexpected value "Edited: Title"


  1460 |     await expect(page.getByTestId("listing-fact-price").locator("dd")).toHaveText("120 ETB");
  1461 |     const newest = page.getByTestId("listing-history-entry-0");
> 1462 |     await expect(newest.getByTestId("listing-history-what")).toHaveText(
       |                                                              ^
  1463 |       en["admin.listings.history.edited"].replace(
  1464 |         "{fields}",
```

Context:

```text
          - listitem [ref=e365]:
            - generic [ref=e366]: About
          - listitem [ref=e367]:
            - generic [ref=e368]: How it works
      - navigation "Help" [ref=e369]:
        - heading "Help" [level=2] [ref=e370]
        - list [ref=e371]:
          - listitem [ref=e372]:
            - generic [ref=e373]: Safety
          - listitem [ref=e374]:
            - generic [ref=e375]: Contact
      - navigation "Legal" [ref=e376]:
        - heading "Legal" [level=2] [ref=e377]
        - list [ref=e378]:
          - listitem [ref=e379]:
            - generic [ref=e380]: Terms
          - listitem [ref=e381]:
            - generic [ref=e382]: Privacy
    - paragraph [ref=e384]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-review')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-review')


  1553 |     // Do not change anything; go back.
  1554 |     await page.getByTestId("post-next").click();
> 1555 |     await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
       |                                                   ^
  1556 |     await expect(page.getByTestId("post-edit-notice")).toHaveAttribute("data-shown", "false");
  1557 |     expect((await revisionRows(live.id, "edit")).length).toBe(revisionCountBefore);
  1558 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1555:51
```

Context:

```text
          - listitem [ref=e344]:
            - generic [ref=e345]: About
          - listitem [ref=e346]:
            - generic [ref=e347]: How it works
      - navigation "Help" [ref=e348]:
        - heading "Help" [level=2] [ref=e349]
        - list [ref=e350]:
          - listitem [ref=e351]:
            - generic [ref=e352]: Safety
          - listitem [ref=e353]:
            - generic [ref=e354]: Contact
      - navigation "Legal" [ref=e355]:
        - heading "Legal" [level=2] [ref=e356]
        - list [ref=e357]:
          - listitem [ref=e358]:
            - generic [ref=e359]: Terms
          - listitem [ref=e360]:
            - generic [ref=e361]: Privacy
    - paragraph [ref=e363]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-20 Edit on the listing's page: the title and the price with a reason and a note; the seller is told; a price prints with its unit

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Title, Price"
Received: "Edited: Title"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Title</p>
       - unexpected value "Edited: Title"

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
Expected: "Edited: Title, Price"
Received: "Edited: Title"
Timeout:  10000ms

Call log:
  - Expect "toHaveText" with timeout 10000ms
  - waiting for getByTestId('listing-history-entry-0').getByTestId('listing-history-what')
    14 × locator resolved to <p data-testid="listing-history-what" class="break-words text-sm text-foreground">Edited: Title</p>
       - unexpected value "Edited: Title"


  1460 |     await expect(page.getByTestId("listing-fact-price").locator("dd")).toHaveText("120 ETB");
  1461 |     const newest = page.getByTestId("listing-history-entry-0");
> 1462 |     await expect(newest.getByTestId("listing-history-what")).toHaveText(
       |                                                              ^
  1463 |       en["admin.listings.history.edited"].replace(
  1464 |         "{fields}",
```

Context:

```text
          - listitem [ref=e389]:
            - generic [ref=e390]: About
          - listitem [ref=e391]:
            - generic [ref=e392]: How it works
      - navigation "Help" [ref=e393]:
        - heading "Help" [level=2] [ref=e394]
        - list [ref=e395]:
          - listitem [ref=e396]:
            - generic [ref=e397]: Safety
          - listitem [ref=e398]:
            - generic [ref=e399]: Contact
      - navigation "Legal" [ref=e400]:
        - heading "Legal" [level=2] [ref=e401]
        - list [ref=e402]:
          - listitem [ref=e403]:
            - generic [ref=e404]: Terms
          - listitem [ref=e405]:
            - generic [ref=e406]: Privacy
    - paragraph [ref=e408]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-21 Edit: a refusal under its field and nothing written; Back returns to the Review; a step with nothing changed writes no revision

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-review')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-review')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-review')


  1553 |     // Do not change anything; go back.
  1554 |     await page.getByTestId("post-next").click();
> 1555 |     await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
       |                                                   ^
  1556 |     await expect(page.getByTestId("post-edit-notice")).toHaveAttribute("data-shown", "false");
  1557 |     expect((await revisionRows(live.id, "edit")).length).toBe(revisionCountBefore);
  1558 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1555:51
```

Context:

```text
          - listitem [ref=e396]:
            - generic [ref=e397]: About
          - listitem [ref=e398]:
            - generic [ref=e399]: How it works
      - navigation "Help" [ref=e400]:
        - heading "Help" [level=2] [ref=e401]
        - list [ref=e402]:
          - listitem [ref=e403]:
            - generic [ref=e404]: Safety
          - listitem [ref=e405]:
            - generic [ref=e406]: Contact
      - navigation "Legal" [ref=e407]:
        - heading "Legal" [level=2] [ref=e408]
        - list [ref=e409]:
          - listitem [ref=e410]:
            - generic [ref=e411]: Terms
          - listitem [ref=e412]:
            - generic [ref=e413]: Privacy
    - paragraph [ref=e415]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-edit-notice')
Expected: "true"
Received: "false"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for getByTestId('post-edit-notice')
    24 × locator resolved to <p role="status" aria-live="polite" data-shown="false" data-testid="post-edit-notice" class="text-sm text-foreground transition-opacity duration-500 opacity-0"></p>
       - unexpected value "false"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-edit-notice')
Expected: "true"
Received: "false"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for getByTestId('post-edit-notice')
    24 × locator resolved to <p role="status" aria-live="polite" data-shown="false" data-testid="post-edit-notice" class="text-sm text-foreground transition-opacity duration-500 opacity-0"></p>
       - unexpected value "false"


  1405 |     await stepUpIfPrompted(page, secret);
  1406 |     await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
> 1407 |     await expect(page.getByTestId("post-edit-notice")).toHaveAttribute("data-shown", "true", {
       |                                                        ^
  1408 |       timeout: 20000,
  1409 |     });
```

Context:

```text
          - listitem [ref=e386]:
            - generic [ref=e387]: About
          - listitem [ref=e388]:
            - generic [ref=e389]: How it works
      - navigation "Help" [ref=e390]:
        - heading "Help" [level=2] [ref=e391]
        - list [ref=e392]:
          - listitem [ref=e393]:
            - generic [ref=e394]: Safety
          - listitem [ref=e395]:
            - generic [ref=e396]: Contact
      - navigation "Legal" [ref=e397]:
        - heading "Legal" [level=2] [ref=e398]
        - list [ref=e399]:
          - listitem [ref=e400]:
            - generic [ref=e401]: Terms
          - listitem [ref=e402]:
            - generic [ref=e403]: Privacy
    - paragraph [ref=e405]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^="admin-screening-row-06f72e70-1728-4a16-b339-6bf798b0f699"]')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^="admin-screening-row-06f72e70-1728-4a16-b339-6bf798b0f699"]')
    14 × locator resolved to 6 elements
       - unexpected value "6"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^="admin-screening-row-06f72e70-1728-4a16-b339-6bf798b0f699"]')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^="admin-screening-row-06f72e70-1728-4a16-b339-6bf798b0f699"]')
    14 × locator resolved to 6 elements
       - unexpected value "6"


  1496 |       .poll(() => new URL(page.url()).search, { timeout: 20000 })
  1497 |       .not.toContain("decided");
> 1498 |     await expect(page.locator(`[data-testid^="admin-screening-row-${ad.id}"]`)).toHaveCount(0);
       |                                                                                 ^
  1499 |     expect(await titleOf(ad.id)).toEqual({ title: corrected, status: "rejected" });
  1500 |   });
```

Context:

```text
          - listitem [ref=e308]:
            - generic [ref=e309]: About
          - listitem [ref=e310]:
            - generic [ref=e311]: How it works
      - navigation "Help" [ref=e312]:
        - heading "Help" [level=2] [ref=e313]
        - list [ref=e314]:
          - listitem [ref=e315]:
            - generic [ref=e316]: Safety
          - listitem [ref=e317]:
            - generic [ref=e318]: Contact
      - navigation "Legal" [ref=e319]:
        - heading "Legal" [level=2] [ref=e320]
        - list [ref=e321]:
          - listitem [ref=e322]:
            - generic [ref=e323]: Terms
          - listitem [ref=e324]:
            - generic [ref=e325]: Privacy
    - paragraph [ref=e327]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-25 Edit from the preview opens the wizard; the reviewer corrects a waiting ad's title with a reason and approves it from the re-opened preview (D194, D188)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-edit-notice')
Expected: "true"
Received: "false"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for getByTestId('post-edit-notice')
    24 × locator resolved to <p role="status" aria-live="polite" data-shown="false" data-testid="post-edit-notice" class="text-sm text-foreground transition-opacity duration-500 opacity-0"></p>
       - unexpected value "false"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-edit-notice')
Expected: "true"
Received: "false"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for getByTestId('post-edit-notice')
    24 × locator resolved to <p role="status" aria-live="polite" data-shown="false" data-testid="post-edit-notice" class="text-sm text-foreground transition-opacity duration-500 opacity-0"></p>
       - unexpected value "false"


  1405 |     await stepUpIfPrompted(page, secret);
  1406 |     await expect(page.getByTestId("post-review")).toBeVisible({ timeout: 20000 });
> 1407 |     await expect(page.getByTestId("post-edit-notice")).toHaveAttribute("data-shown", "true", {
       |                                                        ^
  1408 |       timeout: 20000,
  1409 |     });
```

Context:

```text
          - listitem [ref=e422]:
            - generic [ref=e423]: About
          - listitem [ref=e424]:
            - generic [ref=e425]: How it works
      - navigation "Help" [ref=e426]:
        - heading "Help" [level=2] [ref=e427]
        - list [ref=e428]:
          - listitem [ref=e429]:
            - generic [ref=e430]: Safety
          - listitem [ref=e431]:
            - generic [ref=e432]: Contact
      - navigation "Legal" [ref=e433]:
        - heading "Legal" [level=2] [ref=e434]
        - list [ref=e435]:
          - listitem [ref=e436]:
            - generic [ref=e437]: Terms
          - listitem [ref=e438]:
            - generic [ref=e439]: Privacy
    - paragraph [ref=e441]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^="admin-screening-row-0478b1e8-522b-473b-9208-6e4086e15d67"]')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^="admin-screening-row-0478b1e8-522b-473b-9208-6e4086e15d67"]')
    14 × locator resolved to 6 elements
       - unexpected value "6"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid^="admin-screening-row-0478b1e8-522b-473b-9208-6e4086e15d67"]')
Expected: 0
Received: 6
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid^="admin-screening-row-0478b1e8-522b-473b-9208-6e4086e15d67"]')
    14 × locator resolved to 6 elements
       - unexpected value "6"


  1496 |       .poll(() => new URL(page.url()).search, { timeout: 20000 })
  1497 |       .not.toContain("decided");
> 1498 |     await expect(page.locator(`[data-testid^="admin-screening-row-${ad.id}"]`)).toHaveCount(0);
       |                                                                                 ^
  1499 |     expect(await titleOf(ad.id)).toEqual({ title: corrected, status: "rejected" });
  1500 |   });
```

Context:

```text
          - listitem [ref=e337]:
            - generic [ref=e338]: About
          - listitem [ref=e339]:
            - generic [ref=e340]: How it works
      - navigation "Help" [ref=e341]:
        - heading "Help" [level=2] [ref=e342]
        - list [ref=e343]:
          - listitem [ref=e344]:
            - generic [ref=e345]: Safety
          - listitem [ref=e346]:
            - generic [ref=e347]: Contact
      - navigation "Legal" [ref=e348]:
        - heading "Legal" [level=2] [ref=e349]
        - list [ref=e350]:
          - listitem [ref=e351]:
            - generic [ref=e352]: Terms
          - listitem [ref=e353]:
            - generic [ref=e354]: Privacy
    - paragraph [ref=e356]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-13 Edit opens the wizard's Review with no Edit on the Category; a price saved at once from the Price step; new words to review from the Title step; a refusal under its field (D194, D177)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
    14 × locator resolved to 1 element
       - unexpected value "1"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
    14 × locator resolved to 1 element
       - unexpected value "1"


  1032 |     await page.getByTestId("post-title").click();
  1033 |     await page.keyboard.type(`E2E corrected ${token()}`);
> 1034 |     await expect(refusal).toHaveCount(0);
       |                           ^
  1035 |   });
  1036 |
```

Context:

```text
          - listitem [ref=e231]:
            - generic [ref=e232]: About
          - listitem [ref=e233]:
            - generic [ref=e234]: How it works
      - navigation "Help" [ref=e235]:
        - heading "Help" [level=2] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - generic [ref=e239]: Safety
          - listitem [ref=e240]:
            - generic [ref=e241]: Contact
      - navigation "Legal" [ref=e242]:
        - heading "Legal" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: Terms
          - listitem [ref=e247]:
            - generic [ref=e248]: Privacy
    - paragraph [ref=e250]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-13 Edit opens the wizard's Review with no Edit on the Category; a price saved at once from the Price step; new words to review from the Title step; a refusal under its field (D194, D177)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
    14 × locator resolved to 1 element
       - unexpected value "1"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('[data-testid="post-field"][data-field="post-title"] [data-testid="post-field-refusal"]')
    14 × locator resolved to 1 element
       - unexpected value "1"


  1032 |     await page.getByTestId("post-title").click();
  1033 |     await page.keyboard.type(`E2E corrected ${token()}`);
> 1034 |     await expect(refusal).toHaveCount(0);
       |                           ^
  1035 |   });
  1036 |
```

Context:

```text
          - listitem [ref=e292]:
            - generic [ref=e293]: About
          - listitem [ref=e294]:
            - generic [ref=e295]: How it works
      - navigation "Help" [ref=e296]:
        - heading "Help" [level=2] [ref=e297]
        - list [ref=e298]:
          - listitem [ref=e299]:
            - generic [ref=e300]: Safety
          - listitem [ref=e301]:
            - generic [ref=e302]: Contact
      - navigation "Legal" [ref=e303]:
        - heading "Legal" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Terms
          - listitem [ref=e308]:
            - generic [ref=e309]: Privacy
    - paragraph [ref=e311]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/account"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/account"

--- further error 1 ---
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/$/
Received string:  "http://127.0.0.1:4173/account"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    19 × unexpected value "http://127.0.0.1:4173/account"


  483 |       await window.__ethioSupabase!.auth.signOut({ scope: "local" });
  484 |     });
> 485 |     await expect(page).toHaveURL(/\/$/, { timeout: 15000 });
      |                        ^
  486 |   });
  487 |
  488 |   test("MLP-4 The Account overview counts the six groups with the page's words and opens My listings (INC-469)", async ({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:485:24
```

Context:

```text
          - listitem [ref=e151]:
            - generic [ref=e152]: About
          - listitem [ref=e153]:
            - generic [ref=e154]: How it works
      - navigation "Help" [ref=e155]:
        - heading "Help" [level=2] [ref=e156]
        - list [ref=e157]:
          - listitem [ref=e158]:
            - generic [ref=e159]: Safety
          - listitem [ref=e160]:
            - generic [ref=e161]: Contact
      - navigation "Legal" [ref=e162]:
        - heading "Legal" [level=2] [ref=e163]
        - list [ref=e164]:
          - listitem [ref=e165]:
            - generic [ref=e166]: Terms
          - listitem [ref=e167]:
            - generic [ref=e168]: Privacy
    - paragraph [ref=e170]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-s55eg9: e2e_par_bm644d → e2e_chi_rfcyq0
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×6
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×3
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×2
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×2
[client-error] console.error: [price-unit-labels] read failed TypeError: Failed to fetch
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×2
console.error: [client-error] gate fetch threw ×2
```

## Server errors: shard 2

```text
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import too many previews
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
[WebServer] [ssr-error] /api/admin/translations/import strings wrongFile
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
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 2

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] HTTP 502 GET http://127.0.0.1:4173/api/feed?category=d5d34fee-c74a-4a4f-b878-1dd4b8d731c6 ({"error":"internal error"})
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×4
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-nzjr6d: e2e_par_wsufsa → e2e_chi_mkxmv7
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

```text
[client-error] console.error: [client-error] gate fetch threw ×2
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×12
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×2
console.error: [client-error] gate fetch threw ×2
```

## Server errors: shard 5

```text
[WebServer] [ssr-error] /api/admin/categories/import categories unknownColumn
[WebServer] [ssr-error] /api/admin/categories/import categories file too large
[WebServer] [ssr-error] /api/admin/categories/import categories nulByte
[WebServer] [ssr-error] /api/admin/translations/import strings badHeader
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
[WebServer] [ssr-error] /api/admin/locations/import locations badHeader
[WebServer] [ssr-error] /api/admin/locations/import locations wrongFile
[WebServer] [ssr-error] /api/admin/locations/import locations unknownColumn
[WebServer] [ssr-error] /api/admin/locations/import locations file too large
[WebServer] [ssr-error] /api/admin/locations/import locations nulByte
[WebServer] [ssr-error] /api/admin/attributes/import links unknownColumn
```

## Client errors: shard 5

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_account_status ({"code":"P0001","details":null,"hint":null,"message":"permission denied"})
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5)
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_account_status ({"code":"P0001","details":null,"hint":null,"message":"permission denied"})
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-CerWo79V.js:33476:25) at http://127.0.0.1:4173/assets/index-CerWo79V.js:33508:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CerWo79V.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CerWo79V.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CerWo79V.js:6027:5) ×3
console.error: [client-error] gate fetch threw ×2
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
