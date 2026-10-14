# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 38557576048 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38557576048
- Commit: `79529b123331c8ec4f038f31bbff3ac22cdf72bb`
- Attempt: 1
- Written (UTC): 2026-10-14T12:10:24.725Z
- Post-test warnings: 24
- Flaky (passed on retry, DEC-030, non-gating): 8
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `smoke` · a11y.spec.ts › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y — Error: [e2e:pool] reaping e2e-pool-ssmokea-000@ethio-e2e.invalid (translator languages) failed: <html>
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-113 directions are saved, survive a pin move, and refuse a phone number — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-173 a draft placed in another market opens there, on resume and after Back — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-audit.spec.ts › U3 audit & security › IMP-5 server refusal: a caller who is not a super admin — Error: [e2e:pool] reaping e2e-pool-s4a-010@ethio-e2e.invalid (listing ids) failed: <html>
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036) — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### a11y.spec.ts › A11Y SMOKE (DEC-084, gating) › A11Y-2 wizard steps 1, 3 and 5 for a scratch seller @a11y

- Source: `smoke`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-ssmokea-000@ethio-e2e.invalid (translator languages) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-ssmokea-000@ethio-e2e.invalid (translator languages) failed: <html>
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
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:281:24)
```

Context: context file not found for `a11y-A11Y-SMOKE-DEC-084-gating-A11Y-2-wizard-steps-1-3-and-5-for-a-scratch-seller-a11y-mobile-360` — Playwright's name `a11y-A11Y-SMOKE-DEC-084-ga-d312d-5-for-a-scratch-seller-a11y-mobile-360`; this run carried 3 context file(s); of the same spec: none

### admin-countries.spec.ts › L2b countries console › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:34102:25) at http://127.0.0.1:4173/assets/index-DeJGKkl3.js:34134:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6025:5)
```

Context:

```text
          - listitem [ref=e270]:
            - generic [ref=e271]: About
          - listitem [ref=e272]:
            - generic [ref=e273]: How it works
      - navigation "Help" [ref=e274]:
        - heading "Help" [level=2] [ref=e275]
        - list [ref=e276]:
          - listitem [ref=e277]:
            - generic [ref=e278]: Safety
          - listitem [ref=e279]:
            - generic [ref=e280]: Contact
      - navigation "Legal" [ref=e281]:
        - heading "Legal" [level=2] [ref=e282]
        - list [ref=e283]:
          - listitem [ref=e284]:
            - generic [ref=e285]: Terms
          - listitem [ref=e286]:
            - generic [ref=e287]: Privacy
    - paragraph [ref=e289]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-113 directions are saved, survive a pin move, and refuse a phone number

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByTestId('post-where-pin-open')


  190 |
  191 |   async function savePinOnMap(page: Page, x: number, y: number) {
> 192 |     await page.getByTestId("post-where-pin-open").click();
      |                                                   ^
  193 |     const map = page.getByTestId("post-pin-map");
  194 |     await expect(map).toHaveAttribute("data-ready", "1", { timeout: 20_000 });
  195 |     await map.click({ position: { x, y } });
    at savePinOnMap (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:192:51)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:225:11
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-113-directions-are-saved-survive-a-pin-move-and-refuse-a-phone-number-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-fc528-e-and-refuse-a-phone-number-mobile-360`; this run carried 3 context file(s); of the same spec: none

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-28 a conditional detail appears only when its condition is met

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: step 1 created no draft

expect(received).not.toBe(expected) // Object.is equality

Expected: not ""

  212 |     const [draft] = await draftsOf(userId);
  213 |     const listingId = String(draft?.id ?? "");
> 214 |     expect(listingId, "step 1 created no draft").not.toBe("");
      |                                                      ^
  215 |     objects.push({ userId, listingId });
  216 |
  217 |     // D39 — the category lands on specifications directly; no photos leg.
    at reachStep3 (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:214:54)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:1414:23
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

- Source: `shard 3`
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

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-173-a-draft-placed-in-another-market-opens-there-on-resume-and-after-Back-mobile-360` — Playwright's name `post-wizard-where-POSTING--7bfec-re-on-resume-and-after-Back-mobile-360`; this run carried 3 context file(s); of the same spec: none

### admin-audit.spec.ts › U3 audit & security › IMP-5 server refusal: a caller who is not a super admin

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s4a-010@ethio-e2e.invalid (listing ids) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s4a-010@ethio-e2e.invalid (listing ids) failed: <html>
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
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:252:20)
```

Context: context file not found for `admin-audit-U3-audit-security-IMP-5-server-refusal-a-caller-who-is-not-a-super-admin-desktop-1280` — Playwright's name `admin-audit-U3-audit-secur-0b4d2-er-who-is-not-a-super-admin-desktop-1280`; this run carried 3 context file(s); of the same spec: none

### mfa-stepup.spec.ts › FIX-SCAN-1 step-up abort › MF-7b cancelling the prompt releases the caller and writes nothing

- Source: `shard 5`
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
    at switchUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:517:3)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:332:7
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:34102:25) at http://127.0.0.1:4173/assets/index-DeJGKkl3.js:34134:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DeJGKkl3.js:6025:5)
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

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"door","reason":"doorError"}]}

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

  158 |     const answer = await uploadPhoto(page, { listingId, token, cover: { name: "gps.jpg" } });
  159 |     expect(answer.status, JSON.stringify(answer.payload)).toBe(200);
> 160 |     expect(answer.payload["ok"], JSON.stringify(answer.payload)).toBe(true);
      |                                                                  ^
  161 |
  162 |     // DB truth (J4): the row, and the DEC-009 gate it carries.
  163 |     const rows = await photoRowsOf(listingId);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:160:66
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-1-a-JPEG-carrying-GPS-XMP-and-ICC-is-stored-as-image-data-only-REQ-036-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-e01d4-as-image-data-only-REQ-036--desktop-1280`; this run carried 3 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

107 line(s), 37 message(s): 2 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `listing not found` | 6 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>vszz<n>: e<n>e_par_e<n>coq → e<n>e_chi_pl<n>vi<n>` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-i<n>iugz: e<n>e_par_w<n>tmjl → e<n>e_chi_<n>y<n>cb<n>` (quiet) | 1 | shard 1 |
| `register_listing_photo: listing not found` | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>vszz<n>: e<n>e_par_e<n>coq → e<n>e_chi_pl<n>vi<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-i<n>iugz: e<n>e_par_w<n>tmjl → e<n>e_chi_<n>y<n>cb<n> ×1

Off the allowlist:

### listing not found

- Count: 6 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×2 · PW-145 an over-limit options read says so under its control, and a second open l ×1 · PW-17 the currency is preselected and searchable by name in one control ×1 · PW-177 a question removed while the form is open never blocks the next edits ×1 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### register_listing_photo: listing not found

- Count: 1 · Sources: shard 5
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): MF-7b cancelling the prompt releases the caller and writes nothing @private-iden ×1 · PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036) ×1

```text
[WebServer] [ssr-error] /api/upload/photo register_listing_photo: listing not found
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-14T11:36:22.094Z | 14.3 min |
| email | 2026-10-14T11:36:25.936Z | 0.2 min |
| shard 1 | 2026-10-14T11:36:30.133Z | 30.6 min |
| shard 2 | 2026-10-14T11:36:31.797Z | 32.9 min |
| shard 3 | 2026-10-14T11:36:32.518Z | 28.8 min |
| shard 4 | 2026-10-14T11:36:25.537Z | 30.7 min |
| shard 5 | 2026-10-14T11:37:09.644Z | 32.9 min |
| shard 6 | 2026-10-14T11:36:26.634Z | 23.0 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 62 | 24.8 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 80 | 22.9 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 19.5 min | shard 2, shard 5 |
| `shell.spec.ts` | 336 | 18.3 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 56 | 14.8 min | shard 1, shard 4 |
| `admin-categories-lifecycle.spec.ts` | 50 | 14.3 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 50 | 14.2 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 12.1 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 10.6 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 10.4 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 44 | 10.0 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 9.8 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.4 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 9.2 min | shard 2, shard 5 |
| `posting-routes.spec.ts` | 52 | 8.9 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 44 | 8.7 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 28 | 8.7 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 26 | 8.1 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 7.8 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 34 | 7.4 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 28 | 7.0 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 7.0 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 6.7 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 6.6 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.2 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.0 min | shard 3, shard 6 |
| `admin-attributes-safety.spec.ts` | 16 | 5.4 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 5.4 min | shard 3, shard 6 |
| `admin-roles.spec.ts` | 26 | 5.2 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 16 | 4.6 min | shard 2, shard 5 |
| `admin-countries.spec.ts` | 18 | 4.5 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 3.7 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 3.3 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `admin-translations-data.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `posting-routes-dials.spec.ts` | 14 | 2.3 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 2.0 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 1.9 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 1.8 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.7 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 1.7 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.7 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.6 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.1 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 2 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-where.spec.ts` › PW-173 a draft placed in another market opens there, on resume and after Back | mobile-360 | 115.2 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 95.4 s |
| `photo-pipeline.spec.ts` › PP-1 a JPEG carrying GPS, XMP and ICC is stored as image data only (REQ-036) | desktop-1280 | 88.5 s |
| `post-wizard-specs.spec.ts` › PW-28 a conditional detail appears only when its condition is met | mobile-360 | 87.5 s |
| `post-wizard-bundle2.spec.ts` › PW-113 directions are saved, survive a pin move, and refuse a phone number | mobile-360 | 84.0 s |
| `admin-countries.spec.ts` › CO-1 gating: a plain user is refused; the roster, its toolbar and the header's transfer group render for an admin | mobile-360 | 83.5 s |
| `posting-routes-identity.spec.ts` › PR-26 the imitation check is rate-gated before the model is asked | desktop-1280 | 78.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-36 a created leaf gets its secondary parents and the undo removes both pointers | desktop-1280 | 70.0 s |
| `admin-categories-lifecycle.spec.ts` › CT-19 a create and a rename commit through the doors and undo | mobile-360 | 65.7 s |
| `post-wizard-specs.spec.ts` › PW-158 a pointer to a category that is gone draws nothing and no braces | desktop-1280 | 63.5 s |
| `photo-pipeline.spec.ts` › PP-3 a PDF renamed .jpg is refused unsupportedFormat | mobile-360 | 63.3 s |
| `mfa-stepup.spec.ts` › MF-7b cancelling the prompt releases the caller and writes nothing | desktop-1280 | 58.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 53.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 51.7 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 48.5 s |
