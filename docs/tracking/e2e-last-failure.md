# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39031180605
- Commit: `915a7f0b20fb586f7367a9eeacc8dddc041f16d6`
- Attempt: 1
- Written (UTC): 2026-10-17T13:13:02.491Z
- Passed: 1846 · Skipped: 126 · Failed: 18
- Gating failures: 18 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 10
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-5 Edit keeps the seller's rules: a refusal is the seller's refusal, and nothing is written — Error: [e2e:pool] reaping e2e-pool-s1b-010@ethio-e2e.invalid (password) failed: {}
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-13 photo links: the owner and staff get them; another seller and no session do not — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes.spec.ts › POSTING ROUTES › D189 deactivated seller › PR-52 the assist peek answers the budget without spending, and refuses what is not the caller's (INC-669) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry — Error: the ET tree never carried e2e-loc-3-3-gs-city-n4gqto within 20 s
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-7 several ads at once from tablet width up; a phone acts one ad at a time (D182 2) — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-40 a removed question or option is let go once, then the same body is refused — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-5 Edit keeps the seller's rules: a refusal is the seller's refusal, and nothing is written

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s1b-010@ethio-e2e.invalid (password) failed: {}
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s1b-010@ethio-e2e.invalid (password) failed: {}

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:378:22)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:399:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:216:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:555:20
```

Context: context file not found for `admin-listings-ADMIN-LISTINGS-the-console-s-doors-AL-5-Edit-keeps-the-seller-s-rules-a-refusal-is-the-seller-s-refusal-and-nothing-is-written-mobile-360` — Playwright's name `admin-listings-ADMIN-LISTI-0f4cc-usal-and-nothing-is-written-mobile-360`; this run carried 12 context file(s); of the same spec: none

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-13 photo links: the owner and staff get them; another seller and no session do not

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-13-photo-links-the-owner-and-staff-get-them-another-seller-and-no-session-do-not-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-86e15-eller-and-no-session-do-not-mobile-360`; this run carried 12 context file(s); of the same spec: none

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: draft refused: {"ok":false,"refusals":[{"field":"door","reason":"doorError"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  157 |       { token, country: "ET" },
  158 |     );
> 159 |     expect(draft.payload["ok"], `draft refused: ${JSON.stringify(draft.payload)}`).toBe(true);
      |                                                                                    ^
  160 |     const listingId = String(draft.payload["listing_id"] ?? "");
  161 |     expect(listingId, "no draft id").not.toBe("");
  162 |     objects.push({ userId, listingId });
    at openDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:159:84)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:460:5
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-129-Next-waits-for-the-identity-read-instead-of-refusing-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-a0549-ty-read-instead-of-refusing-mobile-360`; this run carried 12 context file(s); of the same spec: none

### posting-routes.spec.ts › POSTING ROUTES › D189 deactivated seller › PR-52 the assist peek answers the budget without spending, and refuses what is not the caller's (INC-669)

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s3b-011@ethio-e2e.invalid (password) failed: {}

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:378:22)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:399:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes.spec.ts:1482:20
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

### shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: the ET tree never carried e2e-loc-3-3-gs-city-n4gqto within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-3-3-gs-city-n4gqto"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-2-0-ls-region-9vxsvm", "e2e-loc-2-0-ls-region-lqlwhg", "e2e-loc-3-3-ls-region-3celff", "e2e-loc-5-0-ls-region-l6h69k", "oromia", "sidama", …]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: the ET tree never carried e2e-loc-3-3-gs-city-n4gqto within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-3-3-gs-city-n4gqto"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-2-0-ls-region-9vxsvm", "e2e-loc-2-0-ls-region-lqlwhg", "e2e-loc-3-3-ls-region-3celff", "e2e-loc-5-0-ls-region-l6h69k", "oromia", "sidama", …]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate

   at helpers/locations.ts:482

  480 | export async function waitForTreeSlug(page: Page, countryCode: string, slug: string) {
  481 |   let seen: string[] = [];
> 482 |   await expect
      |   ^
  483 |     .poll(
  484 |       async () => {
  485 |         seen = await treeSlugs(page, countryCode);
    at waitForTreeSlug (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:482:3)
```

Context: context file not found for `shell-L4b-location-picker-LS-6-the-nearest-curated-metro-wins-by-geometry-mobile-360` — Playwright's name `shell-L4b-location-picker--83294-ated-metro-wins-by-geometry-mobile-360`; this run carried 12 context file(s); of the same spec: none

### smoke-auth-i18n.spec.ts › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `smoke-auth-i18n-smoke-sign-in-header-identity-Amharic-switch-360px-overflow-sign-out-private-identity-mobile-360` — Playwright's name `smoke-auth-i18n-smoke-sign-8cacc-w-sign-out-private-identity-mobile-360`; this run carried 12 context file(s); of the same spec: none

### admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: page.waitForURL: Test timeout of 60000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
============================================================

   at helpers/ui.ts:446

  444 |
  445 |   // 1. The route the auth screen navigates to on password success.
> 446 |   await page.waitForURL(/\/$/, { timeout: 15000 });
      |              ^
  447 |   // 2. Authoritative signed-in signal: the account menu trigger renders ONLY on
  448 |   //    the authenticated branch of app-header (stable testid, no hover/open
  449 |   //    prerequisite), unlike the signed-out "Sign in" link whose absence is
    at signIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:446:14)
    at switchUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:557:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:74:5
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:33480:25) at http://127.0.0.1:4173/assets/index-BI_UAzD6.js:33512:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6027:5)
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:33480:25) at http://127.0.0.1:4173/assets/index-BI_UAzD6.js:33512:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6027:5)
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

### my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-7 several ads at once from tablet width up; a phone acts one ad at a time (D182 2)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('my-listings-notice')
Expected: "Changed: 2."
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('my-listings-notice')

--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('my-listings-notice')
Expected: "Changed: 2."
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 15000ms
  - waiting for getByTestId('my-listings-notice')


  817 |     await page.getByTestId("data-table-selection").getByTestId("my-listings-bulk-delete").click();
  818 |     await page.getByTestId("my-listings-confirm-yes").click();
> 819 |     await expect(page.getByTestId("my-listings-notice")).toHaveText(done, { timeout: 15000 });
      |                                                          ^
  820 |     expect((await listingTruth(X))["deleted_at"], "[e2e:mlp] X deleted").not.toBeNull();
  821 |     expect((await listingTruth(Y))["deleted_at"], "[e2e:mlp] Y deleted").not.toBeNull();
  822 |     const s = await listingTruth(S);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:819:58
```

Context:

```text
          - listitem [ref=e215]:
            - generic [ref=e216]: About
          - listitem [ref=e217]:
            - generic [ref=e218]: How it works
      - navigation "Help" [ref=e219]:
        - heading "Help" [level=2] [ref=e220]
        - list [ref=e221]:
          - listitem [ref=e222]:
            - generic [ref=e223]: Safety
          - listitem [ref=e224]:
            - generic [ref=e225]: Contact
      - navigation "Legal" [ref=e226]:
        - heading "Legal" [level=2] [ref=e227]
        - list [ref=e228]:
          - listitem [ref=e229]:
            - generic [ref=e230]: Terms
          - listitem [ref=e231]:
            - generic [ref=e232]: Privacy
    - paragraph [ref=e234]: © 2026 ethio.com — All rights reserved.
```
```

### posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-40 a removed question or option is let go once, then the same body is refused

- Source: `shard 6`
- Project: `desktop-1280`

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
    at signInViaSession (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:503:19)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:45:5)
    at setup (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:55:22)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:212:35
```

Context: context file not found for `posting-routes-catalog-POSTING-ROUTES-catalogue-changes-PR-40-a-removed-question-or-option-is-let-go-once-then-the-same-body-is-refused-desktop-1280` — Playwright's name `posting-routes-catalog-POS-c18c5-en-the-same-body-is-refused-desktop-1280`; this run carried 12 context file(s); of the same spec: none

### posting-routes-dials.spec.ts › POSTING DOOR DIALS › PR-27 edit_listing counts against the revise dial

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: {"error":"upstream unavailable"}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: undefined

  90 |       { token, country: "ET" },
  91 |     );
> 92 |     expect(draft.payload["ok"], JSON.stringify(draft.payload)).toBe(true);
     |                                                                ^
  93 |     const listingId = String(draft.payload["listing_id"] ?? "");
  94 |     expect(listingId).not.toBe("");
  95 |     const lowered = await adminClient()
    at sellerWithDraft (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:92:64)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-dials.spec.ts:134:45
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

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

109 line(s), 38 message(s): 3 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 7 | shard 3, shard 6 |
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
| `auth upstream unavailable (<n>)` | 1 | shard 6 |
| `canceling statement due to statement timeout` | 1 | shard 2 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>rh<n>n<n>: e<n>e_par_zbycko → e<n>e_chi_i<n>fse` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-hk<n>lkq: e<n>e_par_ou<n>rg<n> → e<n>e_chi_wovmpd` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>rh<n>n<n>: e<n>e_par_zbycko → e<n>e_chi_i<n>fse ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-hk<n>lkq: e<n>e_par_ou<n>rg<n> → e<n>e_chi_wovmpd ×1

Off the allowlist:

### listing not found

- Count: 7 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PW-171 two chips, most used first; a tap selects that leaf; drafts only draw non ×1 · PW-33 a region alone never lists itself; its city does (W6 R2) ×1 · PW-50 the specifications show every row open in display order (D41) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### auth upstream unavailable (<n>)

- Count: 1 · Sources: shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-27 edit_listing counts against the revise dial ×1 · PR-40 a removed question or option is let go once, then the same body is refused ×1

```text
[WebServer] [ssr-error] /api/listings/draft auth upstream unavailable (504)
```

### canceling statement due to statement timeout

- Count: 1 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-13 photo links: the owner and staff get them; another seller and no session d ×1 · PW-129 Next waits for the identity read instead of refusing ×1

```text
[WebServer] [ssr-error] /api/listings/draft canceling statement due to statement timeout
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-17T12:26:45.598Z | 15.6 min |
| email | 2026-10-17T12:26:58.975Z | 0.3 min |
| shard 1 | 2026-10-17T12:26:47.604Z | 39.6 min |
| shard 2 | 2026-10-17T12:26:49.311Z | 39.5 min |
| shard 3 | 2026-10-17T12:26:50.442Z | 31.3 min |
| shard 4 | 2026-10-17T12:26:54.372Z | 45.8 min |
| shard 5 | 2026-10-17T12:26:56.897Z | 40.9 min |
| shard 6 | 2026-10-17T12:26:56.884Z | 39.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 27.9 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 24.2 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 19.1 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 19.0 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 18.6 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 17.5 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 15.3 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 28 | 15.1 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 64 | 15.0 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 14.0 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 13.5 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 13.3 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 12.9 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 12.4 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 12.1 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 11.4 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 10.7 min | smoke, shard 2, shard 5 |
| `my-listings-page.spec.ts` | 14 | 10.5 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 10.1 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 9.9 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 9.7 min | shard 1, shard 4 |
| `ad-page.spec.ts` | 24 | 8.9 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 8.8 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 8.6 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 8.6 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.1 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.8 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 7.6 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.5 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 6.9 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.5 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 6.3 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.3 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.1 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 5.5 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 4.3 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 14 | 4.2 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.7 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.6 min | shard 2, shard 5 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.3 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.9 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.9 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 1.8 min | smoke, shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 1.7 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.2 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.0 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `a11y.spec.ts` | 4 | 0.5 min | smoke |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.1 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 125.4 s |
| `my-listings-page.spec.ts` › MLP-7 several ads at once from tablet width up; a phone acts one ad at a time (D182 2) | desktop-1280 | 117.3 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 117.0 s |
| `photo-pipeline.spec.ts` › PP-13 photo links: the owner and staff get them; another seller and no session do not | mobile-360 | 116.9 s |
| `admin-countries.spec.ts` › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin | desktop-1280 | 113.8 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | desktop-1280 | 107.7 s |
| `posting-routes.spec.ts` › PR-52 the assist peek answers the budget without spending, and refuses what is not the caller's (INC-669) | mobile-360 | 106.6 s |
| `posting-routes-catalog.spec.ts` › PR-40 a removed question or option is let go once, then the same body is refused | desktop-1280 | 94.2 s |
| `posting-routes-dials.spec.ts` › PR-27 edit_listing counts against the revise dial | desktop-1280 | 93.4 s |
| `post-wizard-bundle2.spec.ts` › PW-129 Next waits for the identity read instead of refusing | mobile-360 | 88.6 s |
| `admin-locations.spec.ts` › LT-4 path rule: retiring a scratch region hides its active descendants from the public tree | mobile-360 | 84.3 s |
| `admin-listings.spec.ts` › AL-5 Edit keeps the seller's rules: a refusal is the seller's refusal, and nothing is written | mobile-360 | 81.1 s |
| `post-wizard-pricing.spec.ts` › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455) | mobile-360 | 77.8 s |
| `smoke-auth-i18n.spec.ts` › smoke: sign in, header identity, Amharic switch, 360px overflow, sign out @private-identity | mobile-360 | 76.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 73.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39031180605-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39031180605-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 39031180605-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39031180605-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39031180605-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 12 (pool 4, fresh 8)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 11 user(s) owned by process 39031180605-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39031180605-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39031180605-6
```

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-3 public_listing answers the public document of a live ad and nothing private

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 0,
    "views": 0,
  }
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 0,
    "views": 0,
  }

  246 |     });
  247 |     expect((doc["places"] as Row)["street_address"]).toBe("E2E street");
> 248 |     expect(doc["counts"]).toEqual({ views: 0, shares: 0 });
      |                           ^
  249 |     const path = (doc["category"] as Row)["path"] as Row[];
  250 |     expect(Array.isArray(path)).toBe(true);
  251 |     expect(path.length).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:248:27
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-3-public_listing-answers-the-public-document-of-a-live-ad-and-nothing-private-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-ac4b9-live-ad-and-nothing-private-mobile-360`; this run carried 12 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-6 views count once per address and never for the owner; shares count by channel

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 2,
    "views": 2,
  }
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 2,
    "views": 2,
  }

  370 |     const read = await anonymous.rpc("public_listing", { p_public_id: publicId });
  371 |     expect(read.error).toBeNull();
> 372 |     expect((read.data as Row)["counts"]).toEqual({ views: 2, shares: 2 });
      |                                          ^
  373 |
  374 |     const owner = await asPerson(seller);
  375 |     const counts = await owner.rpc("listing_counts", { p_listing_id: ad.id });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:372:42
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-6-views-count-once-per-address-and-never-for-the-owner-shares-count-by-channel-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-267c0-ner-shares-count-by-channel-mobile-360`; this run carried 12 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-22 a new account is held to five reveals its first day (D201 §6b)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 1

  Object {
-   "ok": false,
-   "reason": "rateLimited",
+   "ok": true,
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 1

  Object {
-   "ok": false,
-   "reason": "rateLimited",
+   "ok": true,
  }

  640 |     });
  641 |     expect(sixth.error).toBeNull();
> 642 |     expect(sixth.data).toMatchObject({ ok: false, reason: "rateLimited" });
      |                        ^
  643 |     const resetsAt = new Date(String((sixth.data as Row)["resets_at"])).getTime();
  644 |     const midnight = new Date();
  645 |     midnight.setUTCHours(24, 0, 0, 0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:642:24
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-22-a-new-account-is-held-to-five-reveals-its-first-day-D201-6b-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-6db67-als-its-first-day-D201-§6b--mobile-360`; this run carried 12 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
--- further error 1 ---
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []

  710 |     expect(page2.error).toBeNull();
  711 |     const cards2 = (page2.data as Row)["cards"] as Row[];
> 712 |     expect(cards2).toHaveLength(1);
      |                    ^
  713 |     expect(cards2[0]!["publicId"]).toBe(idA);
  714 |     expect((page2.data as Row)["next"]).toBeNull();
  715 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:712:20
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-24-Save-by-public-id-a-buyer-saves-once-and-the-count-says-so-the-owner-cannot-save-his-own-ad-unsave-a-sold-ad-within-its-30-days-can-be-saved-anything-not-public-cannot-my_saved_listings-lists-newest-first-and-greys-an-ad-that-left-the-public-D201-8-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-308d3-at-left-the-public-D201-§8--mobile-360`; this run carried 12 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "Could not find the function public.my_saved_listings(p_public_id) in the schema cache"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "Could not find the function public.my_saved_listings(p_public_id) in the schema cache"

  806 |     for (const fn of ["save_listing", "unsave_listing", "listing_saved", "my_saved_listings"]) {
  807 |       const answer = await anonymous.rpc(fn, { p_public_id: idA });
> 808 |       expect(answer.error).toContain("permission denied");
      |                            ^
  809 |     }
  810 |
  811 |     const dialed = await adminClient().from("rate_overrides").insert({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:808:28
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-25-no-client-reads-or-writes-saved_listings-the-save-dial-counts-new-rows-only-D201-8-mobile-360` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-6e5ba-unts-new-rows-only-D201-§8--mobile-360`; this run carried 12 context file(s); of the same spec: none

## admin-attributes-library.spec.ts › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-15 the inherited row's trailing cells: e2e-cat-exp-e38sfh / e2e-cat-exp-my53c6,e2e-cat-exp-my53c6,e2e_attr_z3oszg,true,true,,e2e-cat-exp-e38sfh,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-exp-e38sfh,,,,\d+$/
Received string:  "e2e-cat-exp-e38sfh / e2e-cat-exp-my53c6,e2e-cat-exp-my53c6,e2e_attr_z3oszg,true,true,,e2e-cat-exp-e38sfh,,,,0,"
--- further error 1 ---
Error: AT-15 the inherited row's trailing cells: e2e-cat-exp-e38sfh / e2e-cat-exp-my53c6,e2e-cat-exp-my53c6,e2e_attr_z3oszg,true,true,,e2e-cat-exp-e38sfh,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-exp-e38sfh,,,,\d+$/
Received string:  "e2e-cat-exp-e38sfh / e2e-cat-exp-my53c6,e2e-cat-exp-my53c6,e2e_attr_z3oszg,true,true,,e2e-cat-exp-e38sfh,,,,0,"

  1014 |        * R-GATE echoed the last two). Only the order carries a value here.
  1015 |        */
> 1016 |       expect(childRow!, `AT-15 the inherited row's trailing cells: ${childRow}`).toMatch(
       |                                                                                  ^
  1017 |         new RegExp(`,${parentSlug},,,,\\d+$`),
  1018 |       );
  1019 |       // The parent's own row names ITSELF as the origin.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1016:82
```

Context:

```text
          - listitem [ref=e1332]:
            - generic [ref=e1333]: About
          - listitem [ref=e1334]:
            - generic [ref=e1335]: How it works
      - navigation "Help" [ref=e1336]:
        - heading "Help" [level=2] [ref=e1337]
        - list [ref=e1338]:
          - listitem [ref=e1339]:
            - generic [ref=e1340]: Safety
          - listitem [ref=e1341]:
            - generic [ref=e1342]: Contact
      - navigation "Legal" [ref=e1343]:
        - heading "Legal" [level=2] [ref=e1344]
        - list [ref=e1345]:
          - listitem [ref=e1346]:
            - generic [ref=e1347]: Terms
          - listitem [ref=e1348]:
            - generic [ref=e1349]: Privacy
    - paragraph [ref=e1351]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: AT-18 the inherited row's trailing cells: e2e-cat-inh-vd9fxs / e2e-cat-inh-vd9fxs-child,e2e-cat-inh-vd9fxs-child,e2e_attr_3kky0q,true,true,1,e2e-cat-inh-vd9fxs,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-inh-vd9fxs,,,,\d+$/
Received string:  "e2e-cat-inh-vd9fxs / e2e-cat-inh-vd9fxs-child,e2e-cat-inh-vd9fxs-child,e2e_attr_3kky0q,true,true,1,e2e-cat-inh-vd9fxs,,,,0,"
--- further error 1 ---
Error: AT-18 the inherited row's trailing cells: e2e-cat-inh-vd9fxs / e2e-cat-inh-vd9fxs-child,e2e-cat-inh-vd9fxs-child,e2e_attr_3kky0q,true,true,1,e2e-cat-inh-vd9fxs,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-inh-vd9fxs,,,,\d+$/
Received string:  "e2e-cat-inh-vd9fxs / e2e-cat-inh-vd9fxs-child,e2e-cat-inh-vd9fxs-child,e2e_attr_3kky0q,true,true,1,e2e-cat-inh-vd9fxs,,,,0,"

  1236 |       // The origin is no longer the last cell: the FOUR per-link cells trail it
  1237 |       // (R-GATE added `visible_when` and `display_order`; only the order has a value).
> 1238 |       expect(childRow!, `AT-18 the inherited row's trailing cells: ${childRow}`).toMatch(
       |                                                                                  ^
  1239 |         new RegExp(`,${fixture.parentSlug},,,,\\d+$`),
  1240 |       );
  1241 |     } finally {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1238:82
```

Context:

```text
          - listitem [ref=e368]:
            - generic [ref=e369]: About
          - listitem [ref=e370]:
            - generic [ref=e371]: How it works
      - navigation "Help" [ref=e372]:
        - heading "Help" [level=2] [ref=e373]
        - list [ref=e374]:
          - listitem [ref=e375]:
            - generic [ref=e376]: Safety
          - listitem [ref=e377]:
            - generic [ref=e378]: Contact
      - navigation "Legal" [ref=e379]:
        - heading "Legal" [level=2] [ref=e380]
        - list [ref=e381]:
          - listitem [ref=e382]:
            - generic [ref=e383]: Terms
          - listitem [ref=e384]:
            - generic [ref=e385]: Privacy
    - paragraph [ref=e387]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toBeNull()

Received: "Could not find the function public.reveal_listing_contact without parameters in the schema cache"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "Could not find the function public.reveal_listing_contact without parameters in the schema cache"

  545 |     const pPublicId = (await listingTruth(p.id))["public_id"] as string;
  546 |     const reached = await buyer.rpc("reveal_listing_contact", { p_public_id: pPublicId });
> 547 |     expect(reached.error).toBeNull();
      |                           ^
  548 |     expect((reached.data as Row)["ok"]).toBe(true);
  549 |
  550 |     const sold = await me.rpc("mark_sold", { p_listing_id: p.id });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:547:27
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-4-Sold-from-live-and-from-closed-the-contact-closes-to-others-the-seller-s-choice-is-kept-relist-takes-a-sold-ad-only-D175-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-891cb--takes-a-sold-ad-only-D175--mobile-360`; this run carried 12 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')


  773 |         await page.getByTestId("post-back").click();
  774 |         try {
> 775 |           await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                         ^
  776 |         } catch (error) {
  777 |           const ui = await page.evaluate(() => {
  778 |             const next = document.querySelector('[data-testid="post-next"]');
    at toSpecs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:775:57)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-mobile-360` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--mobile-360`; this run carried 12 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-3 public_listing answers the public document of a live ad and nothing private

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 0,
    "views": 0,
  }
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 0,
    "views": 0,
  }

  246 |     });
  247 |     expect((doc["places"] as Row)["street_address"]).toBe("E2E street");
> 248 |     expect(doc["counts"]).toEqual({ views: 0, shares: 0 });
      |                           ^
  249 |     const path = (doc["category"] as Row)["path"] as Row[];
  250 |     expect(Array.isArray(path)).toBe(true);
  251 |     expect(path.length).toBeGreaterThan(0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:248:27
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-3-public_listing-answers-the-public-document-of-a-live-ad-and-nothing-private-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-ac4b9-live-ad-and-nothing-private-desktop-1280`; this run carried 12 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-6 views count once per address and never for the owner; shares count by channel

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 2,
    "views": 2,
  }
--- further error 1 ---
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 0
+ Received  + 1

  Object {
+   "saves": 0,
    "shares": 2,
    "views": 2,
  }

  370 |     const read = await anonymous.rpc("public_listing", { p_public_id: publicId });
  371 |     expect(read.error).toBeNull();
> 372 |     expect((read.data as Row)["counts"]).toEqual({ views: 2, shares: 2 });
      |                                          ^
  373 |
  374 |     const owner = await asPerson(seller);
  375 |     const counts = await owner.rpc("listing_counts", { p_listing_id: ad.id });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:372:42
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-6-views-count-once-per-address-and-never-for-the-owner-shares-count-by-channel-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-267c0-ner-shares-count-by-channel-desktop-1280`; this run carried 12 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-22 a new account is held to five reveals its first day (D201 §6b)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 1

  Object {
-   "ok": false,
-   "reason": "rateLimited",
+   "ok": true,
  }
--- further error 1 ---
Error: expect(received).toMatchObject(expected)

- Expected  - 2
+ Received  + 1

  Object {
-   "ok": false,
-   "reason": "rateLimited",
+   "ok": true,
  }

  640 |     });
  641 |     expect(sixth.error).toBeNull();
> 642 |     expect(sixth.data).toMatchObject({ ok: false, reason: "rateLimited" });
      |                        ^
  643 |     const resetsAt = new Date(String((sixth.data as Row)["resets_at"])).getTime();
  644 |     const midnight = new Date();
  645 |     midnight.setUTCHours(24, 0, 0, 0);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:642:24
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-22-a-new-account-is-held-to-five-reveals-its-first-day-D201-6b-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-6db67-als-its-first-day-D201-§6b--desktop-1280`; this run carried 12 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-24 Save by public id: a buyer saves once and the count says so; the owner cannot save his own ad; unsave; a sold ad within its 30 days can be saved; anything not public cannot; my_saved_listings lists newest first and greys an ad that left the public (D201 §8)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
--- further error 1 ---
Error: expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []

  710 |     expect(page2.error).toBeNull();
  711 |     const cards2 = (page2.data as Row)["cards"] as Row[];
> 712 |     expect(cards2).toHaveLength(1);
      |                    ^
  713 |     expect(cards2[0]!["publicId"]).toBe(idA);
  714 |     expect((page2.data as Row)["next"]).toBeNull();
  715 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:712:20
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-24-Save-by-public-id-a-buyer-saves-once-and-the-count-says-so-the-owner-cannot-save-his-own-ad-unsave-a-sold-ad-within-its-30-days-can-be-saved-anything-not-public-cannot-my_saved_listings-lists-newest-first-and-greys-an-ad-that-left-the-public-D201-8-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-308d3-at-left-the-public-D201-§8--desktop-1280`; this run carried 12 context file(s); of the same spec: none

## ad-page-doors.spec.ts › AD PAGE DOORS — M1 (bundle 19 turn 4) › AP-25 no client reads or writes saved_listings; the save dial counts new rows only (D201 §8)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "Could not find the function public.my_saved_listings(p_public_id) in the schema cache"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "permission denied"
Received string:    "Could not find the function public.my_saved_listings(p_public_id) in the schema cache"

  806 |     for (const fn of ["save_listing", "unsave_listing", "listing_saved", "my_saved_listings"]) {
  807 |       const answer = await anonymous.rpc(fn, { p_public_id: idA });
> 808 |       expect(answer.error).toContain("permission denied");
      |                            ^
  809 |     }
  810 |
  811 |     const dialed = await adminClient().from("rate_overrides").insert({
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/ad-page-doors.spec.ts:808:28
```

Context: context file not found for `ad-page-doors-AD-PAGE-DOORS-M1-bundle-19-turn-4-AP-25-no-client-reads-or-writes-saved_listings-the-save-dial-counts-new-rows-only-D201-8-desktop-1280` — Playwright's name `ad-page-doors-AD-PAGE-DOOR-6e5ba-unts-new-rows-only-D201-§8--desktop-1280`; this run carried 12 context file(s); of the same spec: none

## admin-attributes-library.spec.ts › C3 attributes console › AT-15 the export downloads both files with their exact columns, inheritance and formula safety

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-15 the inherited row's trailing cells: e2e-cat-exp-u6odlo / e2e-cat-exp-6znjk5,e2e-cat-exp-6znjk5,e2e_attr_d5glxj,true,true,,e2e-cat-exp-u6odlo,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-exp-u6odlo,,,,\d+$/
Received string:  "e2e-cat-exp-u6odlo / e2e-cat-exp-6znjk5,e2e-cat-exp-6znjk5,e2e_attr_d5glxj,true,true,,e2e-cat-exp-u6odlo,,,,0,"
--- further error 1 ---
Error: AT-15 the inherited row's trailing cells: e2e-cat-exp-u6odlo / e2e-cat-exp-6znjk5,e2e-cat-exp-6znjk5,e2e_attr_d5glxj,true,true,,e2e-cat-exp-u6odlo,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-exp-u6odlo,,,,\d+$/
Received string:  "e2e-cat-exp-u6odlo / e2e-cat-exp-6znjk5,e2e-cat-exp-6znjk5,e2e_attr_d5glxj,true,true,,e2e-cat-exp-u6odlo,,,,0,"

  1014 |        * R-GATE echoed the last two). Only the order carries a value here.
  1015 |        */
> 1016 |       expect(childRow!, `AT-15 the inherited row's trailing cells: ${childRow}`).toMatch(
       |                                                                                  ^
  1017 |         new RegExp(`,${parentSlug},,,,\\d+$`),
  1018 |       );
  1019 |       // The parent's own row names ITSELF as the origin.
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1016:82
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

## admin-attributes-library.spec.ts › C3 attributes console › AT-18 the scoped export carries the subtree only, with origin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: AT-18 the inherited row's trailing cells: e2e-cat-inh-t958jg / e2e-cat-inh-t958jg-child,e2e-cat-inh-t958jg-child,e2e_attr_a8g6le,true,true,1,e2e-cat-inh-t958jg,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-inh-t958jg,,,,\d+$/
Received string:  "e2e-cat-inh-t958jg / e2e-cat-inh-t958jg-child,e2e-cat-inh-t958jg-child,e2e_attr_a8g6le,true,true,1,e2e-cat-inh-t958jg,,,,0,"
--- further error 1 ---
Error: AT-18 the inherited row's trailing cells: e2e-cat-inh-t958jg / e2e-cat-inh-t958jg-child,e2e-cat-inh-t958jg-child,e2e_attr_a8g6le,true,true,1,e2e-cat-inh-t958jg,,,,0,

expect(received).toMatch(expected)

Expected pattern: /,e2e-cat-inh-t958jg,,,,\d+$/
Received string:  "e2e-cat-inh-t958jg / e2e-cat-inh-t958jg-child,e2e-cat-inh-t958jg-child,e2e_attr_a8g6le,true,true,1,e2e-cat-inh-t958jg,,,,0,"

  1236 |       // The origin is no longer the last cell: the FOUR per-link cells trail it
  1237 |       // (R-GATE added `visible_when` and `display_order`; only the order has a value).
> 1238 |       expect(childRow!, `AT-18 the inherited row's trailing cells: ${childRow}`).toMatch(
       |                                                                                  ^
  1239 |         new RegExp(`,${fixture.parentSlug},,,,\\d+$`),
  1240 |       );
  1241 |     } finally {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:1238:82
```

Context:

```text
          - listitem [ref=e393]:
            - generic [ref=e394]: About
          - listitem [ref=e395]:
            - generic [ref=e396]: How it works
      - navigation "Help" [ref=e397]:
        - heading "Help" [level=2] [ref=e398]
        - list [ref=e399]:
          - listitem [ref=e400]:
            - generic [ref=e401]: Safety
          - listitem [ref=e402]:
            - generic [ref=e403]: Contact
      - navigation "Legal" [ref=e404]:
        - heading "Legal" [level=2] [ref=e405]
        - list [ref=e406]:
          - listitem [ref=e407]:
            - generic [ref=e408]: Terms
          - listitem [ref=e409]:
            - generic [ref=e410]: Privacy
    - paragraph [ref=e412]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBeNull()

Received: "Could not find the function public.reveal_listing_contact without parameters in the schema cache"
--- further error 1 ---
Error: expect(received).toBeNull()

Received: "Could not find the function public.reveal_listing_contact without parameters in the schema cache"

  545 |     const pPublicId = (await listingTruth(p.id))["public_id"] as string;
  546 |     const reached = await buyer.rpc("reveal_listing_contact", { p_public_id: pPublicId });
> 547 |     expect(reached.error).toBeNull();
      |                           ^
  548 |     expect((reached.data as Row)["ok"]).toBe(true);
  549 |
  550 |     const sold = await me.rpc("mark_sold", { p_listing_id: p.id });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:547:27
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-4-Sold-from-live-and-from-closed-the-contact-closes-to-others-the-seller-s-choice-is-kept-relist-takes-a-sold-ad-only-D175-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-891cb--takes-a-sold-ad-only-D175--desktop-1280`; this run carried 12 context file(s); of the same spec: none

## post-wizard-pricing.spec.ts › POSTING WIZARD › PW-162 a refusal left on the price page never stands on specifications, and names the question (INC-455)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('post-step-2')


  773 |         await page.getByTestId("post-back").click();
  774 |         try {
> 775 |           await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                         ^
  776 |         } catch (error) {
  777 |           const ui = await page.evaluate(() => {
  778 |             const next = document.querySelector('[data-testid="post-next"]');
    at toSpecs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-pricing.spec.ts:775:57)
```

Context: context file not found for `post-wizard-pricing-POSTING-WIZARD-PW-162-a-refusal-left-on-the-price-page-never-stands-on-specifications-and-names-the-question-INC-455-desktop-1280` — Playwright's name `post-wizard-pricing-POSTIN-25b43-names-the-question-INC-455--desktop-1280`; this run carried 12 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-15-hk7lkq: e2e_par_ou0rg0 → e2e_chi_wovmpd
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
[WebServer] [ssr-error] /api/listings/draft canceling statement due to statement timeout
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×4
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-15-9rh5n4: e2e_par_zbycko → e2e_chi_i99fse
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:33480:25) at http://127.0.0.1:4173/assets/index-BI_UAzD6.js:33512:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:5123:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6028:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6027:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6019:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-BI_UAzD6.js:6027:5) ×2
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
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
[WebServer] [ssr-error] /api/listings/draft auth upstream unavailable (504)
[WebServer] [ssr-error] /api/listings/draft listing not found
```

## Client errors: shard 6

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED ×2
```
