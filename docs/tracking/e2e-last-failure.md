# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38576830362
- Commit: `e84f2a01d67127413ee86da863d4de4c4baa4701`
- Attempt: 1
- Written (UTC): 2026-10-14T14:42:12.569Z
- Passed: 1766 · Skipped: 126 · Failed: 5
- Gating failures: 5 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 8
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-5 profile round trip: units, currency and order are saved and read back — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-142 the pin, street and directions go when the city changes, not when the sub-city does (bundle 4 step 17, INC-393) — Error: Timeout 20000ms exceeded while waiting on the predicate
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · posting-routes-identity.spec.ts › POSTING ROUTES — IDENTITY GATE › PR-43 the owner's own client cannot write the profile; the identity route still can — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-15 a photo stored in an earlier visit can be made the cover, which moves it first, and removed — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-117 two sub-cities of one city both save and count as that one city — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-40 a removed question or option is let go once, then the same body is refused — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-39 recent categories are caller-only published leaves in count/date/id order — Test timeout of 60000ms exceeded while running "afterEach" hook.

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-5 profile round trip: units, currency and order are saved and read back

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('country-search')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('country-search')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('country-search')


   at helpers/countries.ts:147

  145 |  */
  146 | export async function awaitRoster(page: Page, code = "ET", needle = "eth") {
> 147 |   await expect(page.getByTestId("country-search")).toBeVisible({ timeout: 20000 });
      |                                                    ^
  148 |   await findRow(page, code, needle);
  149 | }
```

Context:

```text
          - listitem [ref=e1132]:
            - generic [ref=e1133]: About
          - listitem [ref=e1134]:
            - generic [ref=e1135]: How it works
      - navigation "Help" [ref=e1136]:
        - heading "Help" [level=2] [ref=e1137]
        - list [ref=e1138]:
          - listitem [ref=e1139]:
            - generic [ref=e1140]: Safety
          - listitem [ref=e1141]:
            - generic [ref=e1142]: Contact
      - navigation "Legal" [ref=e1143]:
        - heading "Legal" [level=2] [ref=e1144]
        - list [ref=e1145]:
          - listitem [ref=e1146]:
            - generic [ref=e1147]: Terms
          - listitem [ref=e1148]:
            - generic [ref=e1149]: Privacy
    - paragraph [ref=e1151]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-142 the pin, street and directions go when the city changes, not when the sub-city does (bundle 4 step 17, INC-393)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: Timeout 20000ms exceeded while waiting on the predicate

  1237 |       "PW-142: no line saying the pin went",
  1238 |     ).toBeVisible({ timeout: 20_000 });
> 1239 |     await expect
       |     ^
  1240 |       .poll(async () => (await pinOf(listingId)).lat, {
  1241 |         message: "PW-142: the pin stayed in the old city",
  1242 |         timeout: 20_000,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1239:5
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-142-the-pin-street-and-directions-go-when-the-city-changes-not-when-the-sub-city-does-bundle-4-step-17-INC-393-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-9e3bc-s-bundle-4-step-17-INC-393--mobile-360`; this run carried 10 context file(s); of the same spec: none

### posting-routes-identity.spec.ts › POSTING ROUTES — IDENTITY GATE › PR-43 the owner's own client cannot write the profile; the identity route still can

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:34102:25) at http://127.0.0.1:4173/assets/index-qnDaK6ax.js:34134:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5)
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

   at helpers/ui.ts:406

  404 |
  405 |   // 1. The route the auth screen navigates to on password success.
> 406 |   await page.waitForURL(/\/$/, { timeout: 15000 });
      |              ^
  407 |   // 2. Authoritative signed-in signal: the account menu trigger renders ONLY on
  408 |   //    the authenticated branch of app-header (stable testid, no hover/open
  409 |   //    prerequisite), unlike the signed-out "Sign in" link whose absence is
    at signIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:406:14)
    at switchUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:517:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-countries.spec.ts:73:5
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-qnDaK6ax.js:15424:27 at getResponse (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:15467:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:15424:9) at async client (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:17472:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:17403:20) at async userNext (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:17389:21)
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-qnDaK6ax.js:15424:27 at getResponse (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:15467:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:15424:9) at async client (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:17472:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:17403:20) at async userNext (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:17389:21)
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-qnDaK6ax.js:15424:27 at getResponse (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:15467:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:15424:9) at async client (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:17472:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:17403:20) at async userNext (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:17389:21)
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:34102:25) at http://127.0.0.1:4173/assets/index-qnDaK6ax.js:34134:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5)
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

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-15 a photo stored in an earlier visit can be made the cover, which moves it first, and removed

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:34102:25) at http://127.0.0.1:4173/assets/index-qnDaK6ax.js:34134:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5)
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-15-a-photo-stored-in-an-earlier-visit-can-be-made-the-cover-which-moves-it-first-and-removed-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-0fa8a--moves-it-first-and-removed-desktop-1280`; this run carried 10 context file(s); of the same spec: `photo-pipeline-PHOTO-PIPEL-86e15-eller-and-no-session-do-not-mobile-360-retry1`

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-117 two sub-cities of one city both save and count as that one city

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-117-two-sub-cities-of-one-city-both-save-and-count-as-that-one-city-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-e8918--and-count-as-that-one-city-desktop-1280`; this run carried 10 context file(s); of the same spec: none

### posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-40 a removed question or option is let go once, then the same body is refused

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(received).toBeNull()

Received: {"code": "PGRST116", "details": "The result contains 0 rows", "hint": null, "message": "Cannot coerce the result to a single JSON object"}

  72 |   async function attrs(id: string) {
  73 |     const answer = await adminClient().from("listings").select("attributes").eq("id", id).single();
> 74 |     expect(answer.error).toBeNull();
     |                          ^
  75 |     return answer.data!.attributes;
  76 |   }
  77 |   async function replaceAttrs(id: string, attributes: Record<string, unknown>) {
    at attrs (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:74:26)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:247:12
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:34102:25) at http://127.0.0.1:4173/assets/index-qnDaK6ax.js:34134:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5)
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

### posting-routes-catalog.spec.ts › POSTING ROUTES — catalogue changes › PR-39 recent categories are caller-only published leaves in count/date/id order

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded while running "afterEach" hook.
--- further error 1 ---
Test timeout of 60000ms exceeded while running "afterEach" hook.

  25 |   const definitions: string[] = [];
  26 |   const places: string[] = [];
> 27 |   test.afterEach(async () => {
     |        ^
  28 |     const leased = sellers.splice(0);
  29 |     for (const id of leased) await destroyListingsOf(id);
  30 |     // A saved seller place points at a scratch place: remove it first (J3).
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/posting-routes-catalog.spec.ts:27:8
```

Context:

```text
          - listitem [ref=e414]:
            - generic [ref=e415]: About
          - listitem [ref=e416]:
            - generic [ref=e417]: How it works
      - navigation "Help" [ref=e418]:
        - heading "Help" [level=2] [ref=e419]
        - list [ref=e420]:
          - listitem [ref=e421]:
            - generic [ref=e422]: Safety
          - listitem [ref=e423]:
            - generic [ref=e424]: Contact
      - navigation "Legal" [ref=e425]:
        - heading "Legal" [level=2] [ref=e426]
        - list [ref=e427]:
          - listitem [ref=e428]:
            - generic [ref=e429]: Terms
          - listitem [ref=e430]:
            - generic [ref=e431]: Privacy
    - paragraph [ref=e433]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

108 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 8 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-f<n>sro<n>: e<n>e_par_dmgad<n> → e<n>e_chi_<n>mrryv` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-nhrz<n>t: e<n>e_par_ydsywi → e<n>e_chi_xcacud` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-f<n>sro<n>: e<n>e_par_dmgad<n> → e<n>e_chi_<n>mrryv ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-nhrz<n>t: e<n>e_par_ydsywi → e<n>e_chi_xcacud ×1

Off the allowlist:

### listing not found

- Count: 8 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · location row is present on Marketplace and absent on Account ×1 · PR-39 recent categories are caller-only published leaves in count/date/id order ×1 · PR-41 the door refuses an answer the chosen options do not allow ×1 · PR-42 the door reads a padded answer as the value it stores ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1

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
| smoke | 2026-10-14T14:02:56.990Z | 15.7 min |
| email | 2026-10-14T14:02:59.496Z | 0.2 min |
| shard 1 | 2026-10-14T14:03:08.304Z | 37.7 min |
| shard 2 | 2026-10-14T14:03:03.236Z | 35.3 min |
| shard 3 | 2026-10-14T14:03:01.779Z | 31.8 min |
| shard 4 | 2026-10-14T14:03:05.704Z | 38.7 min |
| shard 5 | 2026-10-14T14:03:05.128Z | 34.0 min |
| shard 6 | 2026-10-14T14:03:08.574Z | 34.3 min |
| changed | 2026-10-14T14:03:03.265Z | 24.9 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `admin-listings.spec.ts` | 112 | 47.6 min | shard 1, shard 4, changed |
| `post-wizard-specs.spec.ts` | 80 | 30.5 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 62 | 28.7 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 88 | 28.7 min | shard 1, shard 4, changed |
| `post-wizard-bundle2.spec.ts` | 68 | 25.0 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 50 | 19.5 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 18.9 min | smoke, shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 50 | 18.8 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 13.8 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 12.6 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 12.5 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 12.4 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 52 | 10.5 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 28 | 10.3 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 10.2 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 10.0 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 44 | 9.5 min | smoke, shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 9.4 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 9.3 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 26 | 9.0 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.6 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 8.1 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.8 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 7.0 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 6.8 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 16 | 6.6 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 6.4 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.1 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.8 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 36 | 5.7 min | shard 2, shard 5, changed |
| `admin-audit.spec.ts` | 14 | 4.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.8 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 3.7 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 3.4 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 3.0 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 3.0 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 3.0 min | shard 3, shard 6 |
| `post-wizard-removed.spec.ts` | 4 | 2.9 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 2.8 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 2.1 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.3 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.0 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.7 min | smoke |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
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
| `posting-routes-catalog.spec.ts` › PR-39 recent categories are caller-only published leaves in count/date/id order | desktop-1280 | 129.7 s |
| `photo-pipeline.spec.ts` › PP-13 photo links: the owner and staff get them; another seller and no session do not | mobile-360 | 128.4 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 127.7 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 122.0 s |
| `photo-pipeline.spec.ts` › PP-15 a photo stored in an earlier visit can be made the cover, which moves it first, and removed | desktop-1280 | 117.0 s |
| `admin-listings.spec.ts` › AL-28 Edit lists the listing's photos; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D154 B4, D169) | desktop-1280 | 116.1 s |
| `posting-routes-catalog.spec.ts` › PR-40 a removed question or option is let go once, then the same body is refused | desktop-1280 | 114.8 s |
| `admin-countries.spec.ts` › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin | desktop-1280 | 103.7 s |
| `post-wizard-bundle2.spec.ts` › PW-117 two sub-cities of one city both save and count as that one city | desktop-1280 | 93.7 s |
| `post-wizard-bundle2.spec.ts` › PW-142 the pin, street and directions go when the city changes, not when the sub-city does (bundle 4 step 17, INC-393) | mobile-360 | 92.8 s |
| `admin-categories-lifecycle.spec.ts` › CT-30 an order edit lands as the file's sequence, a created row takes its place, a catch-all stays pinned, and undo restores it | mobile-360 | 84.1 s |
| `admin-listings.spec.ts` › AL-28 Edit lists the listing's photos; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D154 B4, D169) | mobile-360 | 78.4 s |
| `admin-screening.spec.ts` › SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129) | desktop-1280 | 77.1 s |
| `posting-routes-identity.spec.ts` › PR-43 the owner's own client cannot write the profile; the identity route still can | mobile-360 | 75.4 s |
| `admin-listings.spec.ts` › AL-2 All listings: the views, the filters and newest first | mobile-360 | 75.4 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38576830362-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38576830362-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38576830362-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 35 (pool 4, fresh 31)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 47 user(s) owned by process 38576830362-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 1 (by method: POST 1; by code: UND_ERR_SOCKET 1; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38576830362-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38576830362-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 30 (pool 4, fresh 26)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 40 user(s) owned by process 38576830362-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38576830362-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 26 (pool 4, fresh 22)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 37 user(s) owned by process 38576830362-changed
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 Edit lists the listing's photos; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D154 B4, D169)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('step-up-modal')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('step-up-modal')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('step-up-modal')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('step-up-modal')


  1937 |     await clearStepUpFreshness(page);
  1938 |     await dialog.getByTestId("listing-photo-remove-confirm").click();
> 1939 |     await expect(page.getByTestId("step-up-modal")).toBeVisible({ timeout: 20000 });
       |                                                     ^
  1940 |     await stepUpIfPrompted(page, secret, { typed: true });
  1941 |
  1942 |     await expect(page.getByTestId("listing-notice")).toHaveText(en["admin.listings.photos.done"], {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1939:53
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

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-13 photo links: the owner and staff get them; another seller and no session do not

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-13-photo-links-the-owner-and-staff-get-them-another-seller-and-no-session-do-not-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-86e15-eller-and-no-session-do-not-mobile-360`; this run carried 10 context file(s); of the same spec: `photo-pipeline-PHOTO-PIPEL-86e15-eller-and-no-session-do-not-mobile-360-retry1`

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 Edit lists the listing's photos; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D154 B4, D169)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('step-up-modal')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('step-up-modal')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('step-up-modal')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('step-up-modal')


  1937 |     await clearStepUpFreshness(page);
  1938 |     await dialog.getByTestId("listing-photo-remove-confirm").click();
> 1939 |     await expect(page.getByTestId("step-up-modal")).toBeVisible({ timeout: 20000 });
       |                                                     ^
  1940 |     await stepUpIfPrompted(page, secret, { typed: true });
  1941 |
  1942 |     await expect(page.getByTestId("listing-notice")).toHaveText(en["admin.listings.photos.done"], {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1939:53
```

Context:

```text
          - listitem [ref=e360]:
            - generic [ref=e361]: About
          - listitem [ref=e362]:
            - generic [ref=e363]: How it works
      - navigation "Help" [ref=e364]:
        - heading "Help" [level=2] [ref=e365]
        - list [ref=e366]:
          - listitem [ref=e367]:
            - generic [ref=e368]: Safety
          - listitem [ref=e369]:
            - generic [ref=e370]: Contact
      - navigation "Legal" [ref=e371]:
        - heading "Legal" [level=2] [ref=e372]
        - list [ref=e373]:
          - listitem [ref=e374]:
            - generic [ref=e375]: Terms
          - listitem [ref=e376]:
            - generic [ref=e377]: Privacy
    - paragraph [ref=e379]: © 2026 ethio.com — All rights reserved.
```
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 Edit lists the listing's photos; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D154 B4, D169)

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('step-up-modal')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('step-up-modal')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('step-up-modal')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('step-up-modal')


  1937 |     await clearStepUpFreshness(page);
  1938 |     await dialog.getByTestId("listing-photo-remove-confirm").click();
> 1939 |     await expect(page.getByTestId("step-up-modal")).toBeVisible({ timeout: 20000 });
       |                                                     ^
  1940 |     await stepUpIfPrompted(page, secret, { typed: true });
  1941 |
  1942 |     await expect(page.getByTestId("listing-notice")).toHaveText(en["admin.listings.photos.done"], {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1939:53
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

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-28 Edit lists the listing's photos; Remove takes one with a reason and a note, the code typed by keyboard, History says so and the seller is told (D154 B4, D169)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('step-up-modal')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('step-up-modal')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('step-up-modal')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('step-up-modal')


  1937 |     await clearStepUpFreshness(page);
  1938 |     await dialog.getByTestId("listing-photo-remove-confirm").click();
> 1939 |     await expect(page.getByTestId("step-up-modal")).toBeVisible({ timeout: 20000 });
       |                                                     ^
  1940 |     await stepUpIfPrompted(page, secret, { typed: true });
  1941 |
  1942 |     await expect(page.getByTestId("listing-notice")).toHaveText(en["admin.listings.photos.done"], {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:1939:53
```

Context:

```text
          - listitem [ref=e360]:
            - generic [ref=e361]: About
          - listitem [ref=e362]:
            - generic [ref=e363]: How it works
      - navigation "Help" [ref=e364]:
        - heading "Help" [level=2] [ref=e365]
        - list [ref=e366]:
          - listitem [ref=e367]:
            - generic [ref=e368]: Safety
          - listitem [ref=e369]:
            - generic [ref=e370]: Contact
      - navigation "Legal" [ref=e371]:
        - heading "Legal" [level=2] [ref=e372]
        - list [ref=e373]:
          - listitem [ref=e374]:
            - generic [ref=e375]: Terms
          - listitem [ref=e376]:
            - generic [ref=e377]: Privacy
    - paragraph [ref=e379]: © 2026 ethio.com — All rights reserved.
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
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-0-f7sro5: e2e_par_dmgad9 → e2e_chi_3mrryv
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

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:34102:25) at http://127.0.0.1:4173/assets/index-qnDaK6ax.js:34134:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5)
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:34102:25) at http://127.0.0.1:4173/assets/index-qnDaK6ax.js:34134:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5)
console.error: [client-error] gate fetch threw ×2
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-nhrz9t: e2e_par_ydsywi → e2e_chi_xcacud
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-qnDaK6ax.js:15424:27 at getResponse (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:15467:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:15424:9) at async client (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:17472:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:17403:20) at async userNext (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:17389:21) ×3
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:34102:25) at http://127.0.0.1:4173/assets/index-qnDaK6ax.js:34134:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-qnDaK6ax.js:6025:5)
console.error: [client-error] gate fetch threw
```

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
