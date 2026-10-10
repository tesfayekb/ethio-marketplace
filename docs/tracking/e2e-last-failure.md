# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38089961758
- Commit: `5958c36875c44b9b6cb6ce6336453a721d16fb60`
- Attempt: 1
- Written (UTC): 2026-10-10T22:32:43.178Z
- Passed: 1540 · Skipped: 126 · Failed: 19
- Gating failures: 19 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 9
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-117 two sub-cities of one city both save and count as that one city — Error: [e2e:session] password grant failed for e2e-pool-s2b-010@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-category.spec.ts › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review — Error: [e2e:session] password grant failed for e2e-pool-s2b-000@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-pricing.spec.ts › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages — Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes.spec.ts › POSTING ROUTES › PR-18 the draft route accepts a 5000-character description and refuses 5001 — Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › mobile chrome › the menu follows the active panel — Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › mobile chrome › the bottom bar, signed in — Error: [e2e:session] password grant failed for e2e+38089961758-3-2813-1-ilhuqh@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out — Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity — Error: expect(locator).toBeVisible() failed

## Flaky bodies (DEC-078)

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-117 two sub-cities of one city both save and count as that one city

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:session] password grant failed for e2e-pool-s2b-010@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:session] password grant failed for e2e-pool-s2b-010@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at helpers/session.ts:93

  91 |   const body = (await response.json()) as Record<string, unknown>;
  92 |   if (!response.ok || typeof body["access_token"] !== "string") {
> 93 |     throw new Error(
     |           ^
  94 |       `[e2e:session] password grant failed for ${email} (HTTP ${response.status}): ` +
  95 |         `${JSON.stringify(body).slice(0, 300)}`,
  96 |     );
    at passwordGrant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:93:11)
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:463:19)
    at signedInSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:124:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1307:18
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-117-two-sub-cities-of-one-city-both-save-and-count-as-that-one-city-mobile-360`

### post-wizard-category.spec.ts › POSTING WIZARD › PW-48 a catch-all leaf can be chosen and its listing lands in review

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:session] password grant failed for e2e-pool-s2b-000@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:session] password grant failed for e2e-pool-s2b-000@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at helpers/session.ts:93

  91 |   const body = (await response.json()) as Record<string, unknown>;
  92 |   if (!response.ok || typeof body["access_token"] !== "string") {
> 93 |     throw new Error(
     |           ^
  94 |       `[e2e:session] password grant failed for ${email} (HTTP ${response.status}): ` +
  95 |         `${JSON.stringify(body).slice(0, 300)}`,
  96 |     );
    at passwordGrant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:93:11)
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:463:19)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:146:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1519:18
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-48-a-catch-all-leaf-can-be-chosen-and-its-listing-lands-in-review-mobile-360`

### post-wizard-place.spec.ts › POSTING WIZARD › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-8')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-8')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-8')


  1638 |     await expect(page.getByTestId("post-step-7")).toBeVisible();
  1639 |     await page.getByTestId("post-next").click();
> 1640 |     await expect(page.getByTestId("post-step-8")).toBeVisible();
       |                                                   ^
  1641 |     const review = page.locator(
  1642 |       '[data-testid="post-review-section"][data-step="3"] [data-testid="post-review-value"]',
  1643 |     );
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:1640:51
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-76-a-detail-the-model-pins-to-one-value-is-filled-and-hidden-and-still-reviewed-DEC-085-mobile-360`

### post-wizard-pricing.spec.ts › POSTING WIZARD › PW-55 a commission basis asks a percentage, stores basis points, and reads it back in both languages

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:369:23)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:387:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:125:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:359:18
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-55-a-commission-basis-asks-a-percentage-stores-basis-points-and-reads-it-back-in-both-languages-mobile-360`

### posting-routes.spec.ts › POSTING ROUTES › PR-18 the draft route accepts a 5000-character description and refuses 5001

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:369:23)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:387:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:80:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:746:23
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-18-the-draft-route-accepts-a-5000-character-description-and-refuses-5001-mobile-360`

### shell.spec.ts › mobile chrome › the menu follows the active panel

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:369:23)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:387:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1037:18
```

Context: context file not found for `shell-mobile-chrome-the-menu-follows-the-active-panel-mobile-360`

### shell.spec.ts › mobile chrome › the bottom bar, signed in

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:session] password grant failed for e2e+38089961758-3-2813-1-ilhuqh@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:session] password grant failed for e2e+38089961758-3-2813-1-ilhuqh@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at helpers/session.ts:93

  91 |   const body = (await response.json()) as Record<string, unknown>;
  92 |   if (!response.ok || typeof body["access_token"] !== "string") {
> 93 |     throw new Error(
     |           ^
  94 |       `[e2e:session] password grant failed for ${email} (HTTP ${response.status}): ` +
  95 |         `${JSON.stringify(body).slice(0, 300)}`,
  96 |     );
    at passwordGrant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:93:11)
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:463:19)
    at poolSignIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:855:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1215:5
```

Context: context file not found for `shell-mobile-chrome-the-bottom-bar-signed-in-mobile-360`

### shell.spec.ts › U4h device language star › TR-27 a star set signed-out survives reload, sign-in and sign-out

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:369:23)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:387:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1975:18
```

Context:

```text
          - listitem [ref=e233]:
            - generic [ref=e234]: ስለ እኛ
          - listitem [ref=e235]:
            - generic [ref=e236]: እንዴት እንደሚሰራ
      - navigation "እገዛ" [ref=e237]:
        - heading "እገዛ" [level=2] [ref=e238]
        - list [ref=e239]:
          - listitem [ref=e240]:
            - generic [ref=e241]: ደህንነት
          - listitem [ref=e242]:
            - generic [ref=e243]: ያግኙን
      - navigation "ሕጋዊ" [ref=e244]:
        - heading "ሕጋዊ" [level=2] [ref=e245]
        - list [ref=e246]:
          - listitem [ref=e247]:
            - generic [ref=e248]: ውሎች
          - listitem [ref=e249]:
            - generic [ref=e250]: ግላዊነት
    - paragraph [ref=e252]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

### smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity

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


  54 |   // Anchored: excludes "Create an account" toggle and the disabled OAuth slots.
  55 |   await signInButton.click();
> 56 |   await expect(signedInMarker(page)).toBeVisible({ timeout: 15000 });
     |                                      ^
  57 |   await page.waitForFunction(
  58 |     () => Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("auth-token")),
  59 |     undefined,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/smoke-auth-i18n.spec.ts:56:38
```

Context:

```text
          - listitem [ref=e218]:
            - generic [ref=e219]: About
          - listitem [ref=e220]:
            - generic [ref=e221]: How it works
      - navigation "Help" [ref=e222]:
        - heading "Help" [level=2] [ref=e223]
        - list [ref=e224]:
          - listitem [ref=e225]:
            - generic [ref=e226]: Safety
          - listitem [ref=e227]:
            - generic [ref=e228]: Contact
      - navigation "Legal" [ref=e229]:
        - heading "Legal" [level=2] [ref=e230]
        - list [ref=e231]:
          - listitem [ref=e232]:
            - generic [ref=e233]: Terms
          - listitem [ref=e234]:
            - generic [ref=e235]: Privacy
    - paragraph [ref=e237]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

107 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 2, shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-epskng: e<n>e_par_<n>j<n>bo<n> → e<n>e_chi_swtbqg` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-su<n>zbz: e<n>e_par_<n>uvxx<n> → e<n>e_chi_hphcdg` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-epskng: e<n>e_par_<n>j<n>bo<n> → e<n>e_chi_swtbqg ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-su<n>zbz: e<n>e_par_<n>uvxx<n> → e<n>e_chi_hphcdg ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 2, shard 3, shard 5, shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-10T22:04:35.020Z | 14.4 min |
| email | 2026-10-10T22:04:40.709Z | 0.2 min |
| shard 1 | 2026-10-10T22:04:34.753Z | 25.7 min |
| shard 2 | 2026-10-10T22:04:35.824Z | 24.2 min |
| shard 3 | 2026-10-10T22:04:35.534Z | 23.0 min |
| shard 4 | 2026-10-10T22:04:47.165Z | 27.6 min |
| shard 5 | 2026-10-10T22:04:56.119Z | 26.6 min |
| shard 6 | 2026-10-10T22:04:42.398Z | 22.6 min |
| changed | 2026-10-10T22:04:41.691Z | 9.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-specs.spec.ts` | 78 | 22.1 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 18.7 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 64 | 17.6 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 36 | 14.4 min | shard 1, shard 4, changed |
| `admin-locations.spec.ts` | 76 | 13.7 min | shard 1, shard 4, changed |
| `post-wizard-resets.spec.ts` | 34 | 12.3 min | shard 3, shard 6 |
| `post-wizard-category.spec.ts` | 46 | 11.7 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 48 | 10.8 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 10.6 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 9.9 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 9.8 min | shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 40 | 9.7 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.2 min | smoke, shard 2, shard 5 |
| `posting-routes.spec.ts` | 50 | 8.8 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 28 | 8.7 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.0 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.5 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 32 | 7.4 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 30 | 7.2 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.0 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.5 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 30 | 6.4 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.1 min | shard 3, shard 6 |
| `import-security.spec.ts` | 34 | 6.0 min | shard 2, shard 5 |
| `photo-pipeline.spec.ts` | 20 | 5.9 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 38 | 5.4 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 24 | 4.8 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 14 | 4.7 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.7 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 24 | 4.2 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 14 | 3.2 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 28 | 3.1 min | shard 1, shard 4, changed |
| `admin-audit.spec.ts` | 10 | 2.8 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 8 | 2.6 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.6 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.1 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 1.9 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.8 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.7 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.5 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.4 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 1.0 min | smoke, shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.8 min | shard 3 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `category-nav.spec.ts` | 10 | 0.6 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.3 min | shard 3, shard 6 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 1 |
| `auth-signup.spec.ts` | 1 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-countries.spec.ts` › CO-9 the row's actions and the Columns button: Edit and the menu's market verbs, a hidden column remembered | desktop-1280 | 121.0 s |
| `admin-countries.spec.ts` › CO-9 the row's actions and the Columns button: Edit and the menu's market verbs, a hidden column remembered | mobile-360 | 120.7 s |
| `admin-countries.spec.ts` › CO-9 the row's actions and the Columns button: Edit and the menu's market verbs, a hidden column remembered | desktop-1280 | 120.7 s |
| `admin-countries.spec.ts` › CO-9 the row's actions and the Columns button: Edit and the menu's market verbs, a hidden column remembered | mobile-360 | 120.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 44.5 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 44.2 s |
| `shell.spec.ts` › menu: items scroll, menu fixed, identity pinned | mobile-360 | 43.7 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | desktop-1280 | 42.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 41.8 s |
| `post-wizard-removed.spec.ts` › PW-176 removed question, option and list entry never block the draft's later saves | desktop-1280 | 41.7 s |
| `post-wizard-place.spec.ts` › PW-76 a detail the model pins to one value is filled and hidden, and still reviewed (DEC-085) | mobile-360 | 40.8 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | mobile-360 | 40.4 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 39.8 s |
| `post-wizard-removed.spec.ts` › PW-177 a question removed while the form is open never blocks the next edits | desktop-1280 | 39.6 s |
| `post-wizard-where.spec.ts` › PW-84 a new post opens on the seller's own last post, never another seller's | mobile-360 | 38.2 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38089961758-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38089961758-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 17 (pool 5, fresh 12)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 19 user(s) owned by process 38089961758-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 36 user(s) owned by process 38089961758-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38089961758-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 6, fresh 9)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 17 user(s) owned by process 38089961758-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 28 (pool 4, fresh 24)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 31 user(s) owned by process 38089961758-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 9 (pool 5, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38089961758-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38089961758-changed
```

## admin-countries.spec.ts › L2b countries console › CO-9 the row's actions and the Columns button: Edit and the menu's market verbs, a hidden column remembered

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('data-table-cards').getByTestId('country-ET-actions').getByTestId('country-actions-ET-more')
    - locator resolved to <button type="button" id="radix-_r_7_" data-state="closed" aria-haspopup="menu" aria-expanded="false" aria-label="Actions — Ethiopia" data-testid="country-actions-ET-more" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]…>…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <html lang="en" dir="ltr" data-mode="light" data-app-ready="1" data-rail="expanded" data-input="keyboard">…</html> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <html lang="en" dir="ltr" data-mode="light" data-app-ready="1" data-rail="expanded" data-input="keyboard">…</html> intercepts pointer events
    - retrying click action
      - waiting 100ms
    110 × waiting for element to be visible, enabled and stable
```

Context:

```text
                - generic: About
              - listitem:
                - generic: How it works
          - navigation "Help":
            - heading "Help" [level=2]
            - list:
              - listitem:
                - generic: Safety
              - listitem:
                - generic: Contact
          - navigation "Legal":
            - heading "Legal" [level=2]
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
```
```

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-121 a phone number in the title or description is flagged at its field

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:session] password grant failed for e2e-pool-s2b-010@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:session] password grant failed for e2e-pool-s2b-010@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at helpers/session.ts:93

  91 |   const body = (await response.json()) as Record<string, unknown>;
  92 |   if (!response.ok || typeof body["access_token"] !== "string") {
> 93 |     throw new Error(
     |           ^
  94 |       `[e2e:session] password grant failed for ${email} (HTTP ${response.status}): ` +
  95 |         `${JSON.stringify(body).slice(0, 300)}`,
  96 |     );
    at passwordGrant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:93:11)
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:463:19)
    at signedInSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:124:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1422:18
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-121-a-phone-number-in-the-title-or-description-is-flagged-at-its-field-mobile-360`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-36 a category surfaced under a second root appears under it in the tree

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:session] password grant failed for e2e-pool-s2b-000@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:session] password grant failed for e2e-pool-s2b-000@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at helpers/session.ts:93

  91 |   const body = (await response.json()) as Record<string, unknown>;
  92 |   if (!response.ok || typeof body["access_token"] !== "string") {
> 93 |     throw new Error(
     |           ^
  94 |       `[e2e:session] password grant failed for ${email} (HTTP ${response.status}): ` +
  95 |         `${JSON.stringify(body).slice(0, 300)}`,
  96 |     );
    at passwordGrant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:93:11)
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:463:19)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:146:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-category.spec.ts:1267:5
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-36-a-category-surfaced-under-a-second-root-appears-under-it-in-the-tree-mobile-360`

## post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-102 a type that leaves only Other shows that question's text box, and the typed text saves

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:session] password grant failed for e2e-pool-s2b-000@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:session] password grant failed for e2e-pool-s2b-000@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at helpers/session.ts:93

  91 |   const body = (await response.json()) as Record<string, unknown>;
  92 |   if (!response.ok || typeof body["access_token"] !== "string") {
> 93 |     throw new Error(
     |           ^
  94 |       `[e2e:session] password grant failed for ${email} (HTTP ${response.status}): ` +
  95 |         `${JSON.stringify(body).slice(0, 300)}`,
  96 |     );
    at passwordGrant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:93:11)
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:463:19)
    at reachStep3 (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-details.spec.ts:66:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-details.spec.ts:96:32
```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-102-a-type-that-leaves-only-Other-shows-that-question-s-text-box-and-the-typed-text-saves-mobile-360`

## post-wizard-details.spec.ts › POSTING WIZARD — WRITE-IN DETAILS › PW-172 a held answer whose option is switched off prints its label, never offered (INC-466)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:369:23)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:387:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-details.spec.ts:239:18
```

Context: context file not found for `post-wizard-details-POSTING-WIZARD-WRITE-IN-DETAILS-PW-172-a-held-answer-whose-option-is-switched-off-prints-its-label-never-offered-INC-466-mobile-360`

## post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-85 an option label, an alias and an Amharic alias each find the leaf, and the choice prefills the option

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:session] password grant failed for e2e-pool-s2b-010@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:session] password grant failed for e2e-pool-s2b-010@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at helpers/session.ts:93

  91 |   const body = (await response.json()) as Record<string, unknown>;
  92 |   if (!response.ok || typeof body["access_token"] !== "string") {
> 93 |     throw new Error(
     |           ^
  94 |       `[e2e:session] password grant failed for ${email} (HTTP ${response.status}): ` +
  95 |         `${JSON.stringify(body).slice(0, 300)}`,
  96 |     );
    at passwordGrant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:93:11)
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:463:19)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:52:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:72:18
```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-85-an-option-label-an-alias-and-an-Amharic-alias-each-find-the-leaf-and-the-choice-prefills-the-option-mobile-360`

## post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-86 a failing finder leaves the name matches on screen, with the notice

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:session] password grant failed for e2e-pool-s2b-010@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:session] password grant failed for e2e-pool-s2b-010@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at helpers/session.ts:93

  91 |   const body = (await response.json()) as Record<string, unknown>;
  92 |   if (!response.ok || typeof body["access_token"] !== "string") {
> 93 |     throw new Error(
     |           ^
  94 |       `[e2e:session] password grant failed for ${email} (HTTP ${response.status}): ` +
  95 |         `${JSON.stringify(body).slice(0, 300)}`,
  96 |     );
    at passwordGrant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:93:11)
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:463:19)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:52:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:128:5
```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-86-a-failing-finder-leaves-the-name-matches-on-screen-with-the-notice-mobile-360`

## post-wizard-finder.spec.ts › POSTING WIZARD — the category finder (W7) › PW-105 the searching row shows while the finder is asked; no-hits only after its answer

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:session] password grant failed for e2e-pool-s2b-010@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:session] password grant failed for e2e-pool-s2b-010@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at helpers/session.ts:93

  91 |   const body = (await response.json()) as Record<string, unknown>;
  92 |   if (!response.ok || typeof body["access_token"] !== "string") {
> 93 |     throw new Error(
     |           ^
  94 |       `[e2e:session] password grant failed for ${email} (HTTP ${response.status}): ` +
  95 |         `${JSON.stringify(body).slice(0, 300)}`,
  96 |     );
    at passwordGrant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:93:11)
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:463:19)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:52:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-finder.spec.ts:152:5
```

Context: context file not found for `post-wizard-finder-POSTING-WIZARD-the-category-finder-W7-PW-105-the-searching-row-shows-while-the-finder-is-asked-no-hits-only-after-its-answer-mobile-360`

## post-wizard-place.spec.ts › POSTING WIZARD › PW-11 where: the market is prefilled from the edge, a city with sub-cities offers all of it, and a second place is refused by the plan

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:369:23)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:387:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:161:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:271:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-11-where-the-market-is-prefilled-from-the-edge-a-city-with-sub-cities-offers-all-of-it-and-a-second-place-is-refused-by-the-plan-mobile-360`

## post-wizard-place.spec.ts › POSTING WIZARD › PW-12 who: the alias is checked against the door, messages cannot be switched off, and a shown channel is stored

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:session] password grant failed for e2e-pool-s2b-000@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:session] password grant failed for e2e-pool-s2b-000@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at helpers/session.ts:93

  91 |   const body = (await response.json()) as Record<string, unknown>;
  92 |   if (!response.ok || typeof body["access_token"] !== "string") {
> 93 |     throw new Error(
     |           ^
  94 |       `[e2e:session] password grant failed for ${email} (HTTP ${response.status}): ` +
  95 |         `${JSON.stringify(body).slice(0, 300)}`,
  96 |     );
    at passwordGrant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:93:11)
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:463:19)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:164:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:452:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-12-who-the-alias-is-checked-against-the-door-messages-cannot-be-switched-off-and-a-shown-channel-is-stored-mobile-360`

## post-wizard-place.spec.ts › POSTING WIZARD › PW-112 who: a new post opens with the last post's channels, stored on the draft unchanged

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:session] password grant failed for e2e-pool-s2b-000@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:session] password grant failed for e2e-pool-s2b-000@ethio-e2e.invalid (HTTP 429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at helpers/session.ts:93

  91 |   const body = (await response.json()) as Record<string, unknown>;
  92 |   if (!response.ok || typeof body["access_token"] !== "string") {
> 93 |     throw new Error(
     |           ^
  94 |       `[e2e:session] password grant failed for ${email} (HTTP ${response.status}): ` +
  95 |         `${JSON.stringify(body).slice(0, 300)}`,
  96 |     );
    at passwordGrant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/session.ts:93:11)
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:463:19)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:164:5)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-place.spec.ts:540:18
```

Context: context file not found for `post-wizard-place-POSTING-WIZARD-PW-112-who-a-new-post-opens-with-the-last-post-s-channels-stored-on-the-draft-unchanged-mobile-360`

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-10 pricing: currency comes before the amount, a locked period shows no line, and free hides the amount

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:369:23)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:387:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:125:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:235:18
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-10-pricing-currency-comes-before-the-amount-a-locked-period-shows-no-line-and-free-hides-the-amount-mobile-360`

## posting-routes.spec.ts › POSTING ROUTES › PR-24 a seller is named before an ad is published (INC-423)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:369:23)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:387:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:80:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1123:20
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-24-a-seller-is-named-before-an-ad-is-published-INC-423-mobile-360`

## posting-routes.spec.ts › POSTING ROUTES › PR-25 a successful publish stamps the seller's statement (bundle 4 step 19)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (429): {"code":429,"error_code":"over_request_rate_limit","msg":"Request rate limit reached"}

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:369:23)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:387:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:80:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1168:19
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-25-a-successful-publish-stamps-the-seller-s-statement-bundle-4-step-19-mobile-360`

## settings.spec.ts › S-4: the password renders as its own method and cannot be removed alone

- Source: `shard 3`
- Project: `mobile-360`

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
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/settings.spec.ts:110:3
```

Context:

```text
          - listitem [ref=e253]:
            - generic [ref=e254]: About
          - listitem [ref=e255]:
            - generic [ref=e256]: How it works
      - navigation "Help" [ref=e257]:
        - heading "Help" [level=2] [ref=e258]
        - list [ref=e259]:
          - listitem [ref=e260]:
            - generic [ref=e261]: Safety
          - listitem [ref=e262]:
            - generic [ref=e263]: Contact
      - navigation "Legal" [ref=e264]:
        - heading "Legal" [level=2] [ref=e265]
        - list [ref=e266]:
          - listitem [ref=e267]:
            - generic [ref=e268]: Terms
          - listitem [ref=e269]:
            - generic [ref=e270]: Privacy
    - paragraph [ref=e272]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › rail scroll regions (U0f) › menu: items scroll, menu fixed, identity pinned

- Source: `shard 3`
- Project: `mobile-360`

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
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1482:5
```

Context:

```text
          - listitem [ref=e246]:
            - generic [ref=e247]: About
          - listitem [ref=e248]:
            - generic [ref=e249]: How it works
      - navigation "Help" [ref=e250]:
        - heading "Help" [level=2] [ref=e251]
        - list [ref=e252]:
          - listitem [ref=e253]:
            - generic [ref=e254]: Safety
          - listitem [ref=e255]:
            - generic [ref=e256]: Contact
      - navigation "Legal" [ref=e257]:
        - heading "Legal" [level=2] [ref=e258]
        - list [ref=e259]:
          - listitem [ref=e260]:
            - generic [ref=e261]: Terms
          - listitem [ref=e262]:
            - generic [ref=e263]: Privacy
    - paragraph [ref=e265]: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-9 the row's actions and the Columns button: Edit and the menu's market verbs, a hidden column remembered

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('table').getByTestId('country-ET-actions-cell').getByTestId('country-actions-ET-more')
    - locator resolved to <button type="button" id="radix-_r_j_" aria-haspopup="menu" aria-expanded="false" data-state="instant-open" aria-describedby="radix-_r_l_" aria-label="Actions — Ethiopia" data-testid="country-actions-ET-more" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:point…>…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <html lang="en" dir="ltr" data-mode="light" data-app-ready="1" data-rail="expanded" data-input="keyboard">…</html> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <html lang="en" dir="ltr" data-mode="light" data-app-ready="1" data-rail="expanded" data-input="keyboard">…</html> intercepts pointer events
    - retrying click action
      - waiting 100ms
    110 × waiting for element to be visible, enabled and stable
```

Context:

```text
                - generic: About
              - listitem:
                - generic: How it works
          - navigation "Help":
            - heading "Help" [level=2]
            - list:
              - listitem:
                - generic: Safety
              - listitem:
                - generic: Contact
          - navigation "Legal":
            - heading "Legal" [level=2]
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-9 the row's actions and the Columns button: Edit and the menu's market verbs, a hidden column remembered

- Source: `changed`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('data-table-cards').getByTestId('country-ET-actions').getByTestId('country-actions-ET-more')
    - locator resolved to <button type="button" id="radix-_r_7_" data-state="closed" aria-haspopup="menu" aria-expanded="false" aria-label="Actions — Ethiopia" data-testid="country-actions-ET-more" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]…>…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <html lang="en" dir="ltr" data-mode="light" data-app-ready="1" data-rail="expanded" data-input="keyboard">…</html> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <html lang="en" dir="ltr" data-mode="light" data-app-ready="1" data-rail="expanded" data-input="keyboard">…</html> intercepts pointer events
    - retrying click action
      - waiting 100ms
    110 × waiting for element to be visible, enabled and stable
```

Context:

```text
                - generic: About
              - listitem:
                - generic: How it works
          - navigation "Help":
            - heading "Help" [level=2]
            - list:
              - listitem:
                - generic: Safety
              - listitem:
                - generic: Contact
          - navigation "Legal":
            - heading "Legal" [level=2]
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
```
```

## admin-countries.spec.ts › L2b countries console › CO-9 the row's actions and the Columns button: Edit and the menu's market verbs, a hidden column remembered

- Source: `changed`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('table').getByTestId('country-ET-actions-cell').getByTestId('country-actions-ET-more')
    - locator resolved to <button type="button" id="radix-_r_j_" aria-haspopup="menu" aria-expanded="false" data-state="instant-open" aria-describedby="radix-_r_l_" aria-label="Actions — Ethiopia" data-testid="country-actions-ET-more" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:point…>…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <html lang="en" dir="ltr" data-mode="light" data-app-ready="1" data-rail="expanded" data-input="keyboard">…</html> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <html lang="en" dir="ltr" data-mode="light" data-app-ready="1" data-rail="expanded" data-input="keyboard">…</html> intercepts pointer events
    - retrying click action
      - waiting 100ms
    112 × waiting for element to be visible, enabled and stable
```

Context:

```text
                - generic: About
              - listitem:
                - generic: How it works
          - navigation "Help":
            - heading "Help" [level=2]
            - list:
              - listitem:
                - generic: Safety
              - listitem:
                - generic: Contact
          - navigation "Legal":
            - heading "Legal" [level=2]
            - list:
              - listitem:
                - generic: Terms
              - listitem:
                - generic: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-su0zbz: e2e_par_1uvxx8 → e2e_chi_hphcdg
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
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 429 () ×4
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-epskng: e2e_par_3j2bo7 → e2e_chi_swtbqg
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-BqdCXV6O.js:33543:25) at http://127.0.0.1:4173/assets/index-BqdCXV6O.js:33575:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-BqdCXV6O.js:5122:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BqdCXV6O.js:6027:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BqdCXV6O.js:6018:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BqdCXV6O.js:6026:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BqdCXV6O.js:6018:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BqdCXV6O.js:6026:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BqdCXV6O.js:6018:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BqdCXV6O.js:6026:5)
```
