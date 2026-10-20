# Last E2E failure (auto-generated — do not edit by hand)

last E2E run 39411681807 passed

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39411681807
- Commit: `78b96e259c820ab45786cb34a34d8b7b69da4792`
- Attempt: 1
- Written (UTC): 2026-10-20T12:03:49.627Z
- Post-test warnings: 27
- Flaky (passed on retry, DEC-030, non-gating): 5
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · feed-screens.spec.ts › FEED SCREENS › FS-11 signing out keeps the place this browser chose (INC-532) — Error: [e2e:pool] reaping e2e-pool-s2b-000@ethio-e2e.invalid (contact reveals) failed: <html>
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · legal-certify.spec.ts › Legal certification › LG-19 a photo added to a published ad needs the certification; a draft's photo does not — Error: [e2e:reap] reading category e2e-post-5-0-5c42ru failed: <html>
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed — Error: [e2e:pool] reaping e2e-pool-s5b-000@ethio-e2e.invalid (factors) failed: {}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-resets.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### feed-screens.spec.ts › FEED SCREENS › FS-11 signing out keeps the place this browser chose (INC-532)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s2b-000@ethio-e2e.invalid (contact reveals) failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s2b-000@ethio-e2e.invalid (contact reveals) failed: <html>
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
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:265:22)
```

Context: context file not found for `feed-screens-FEED-SCREENS-FS-11-signing-out-keeps-the-place-this-browser-chose-INC-532-mobile-360` — Playwright's name `feed-screens-FEED-SCREENS--bd96b-this-browser-chose-INC-532--mobile-360`; this run carried 1 context file(s); of the same spec: none

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-153 a settled range hides its number and the review and buyer sheet show the range

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_settle_1792495842602_7qngai_model"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_settle_1792495842602_7qngai_model" id="post-attr-e2e_settle_1792495842602_7qngai_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-destructive">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    113 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 503 (Service Unavailable)
[client-error] console.error: [attr-options] read refused 76292c9f-9bc4-4ef1-8593-7c4e021093f6 503
[client-error] HTTP 503 GET http://127.0.0.1:4173/api/attributes/76292c9f-9bc4-4ef1-8593-7c4e021093f6/options ((body unavailable))
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-153-a-settled-range-hides-its-number-and-the-review-and-buyer-sheet-show-the-range-mobile-360` — Playwright's name `post-wizard-specs-POSTING--26bb2--buyer-sheet-show-the-range-mobile-360`; this run carried 1 context file(s); of the same spec: none

### legal-certify.spec.ts › Legal certification › LG-19 a photo added to a published ad needs the certification; a draft's photo does not

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:reap] reading category e2e-post-5-0-5c42ru failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>

--- further error 1 ---
Error: [e2e:reap] reading category e2e-post-5-0-5c42ru failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>


   at helpers/posting.ts:227

  225 |  */
  226 | export function reapStep(label: string, error: { message: string } | null): void {
> 227 |   if (error) throw new Error(`[e2e:reap] ${label} failed: ${error.message}`);
      |                    ^
  228 | }
  229 |
  230 | export async function destroyPostableCategory(slug: string): Promise<void> {
    at reapStep (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:227:20)
    at destroyPostableCategory (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:237:3)
```

Context:

```text
          - listitem [ref=e332]:
            - generic [ref=e333]: About
          - listitem [ref=e334]:
            - generic [ref=e335]: Contact
      - navigation "Help" [ref=e336]:
        - heading "Help" [level=2] [ref=e337]
        - list [ref=e338]:
          - listitem [ref=e339]:
            - generic [ref=e340]: Safety
      - navigation "Legal" [ref=e341]:
        - heading "Legal" [level=2] [ref=e342]
        - list [ref=e343]:
          - listitem [ref=e344]:
            - link "Terms" [ref=e345] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e346]:
            - link "Privacy" [ref=e347] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e349]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-144 leaving the contact step makes one identity call, or none when nothing changed

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s5b-000@ethio-e2e.invalid (factors) failed: {}
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s5b-000@ethio-e2e.invalid (factors) failed: {}

   at helpers/users.ts:243

  241 |   const supabase = adminClient();
  242 |   const fail = (step: string, message: string) => {
> 243 |     throw new Error(`[e2e:pool] reaping ${email} (${step}) failed: ${message}`);
      |           ^
  244 |   };
  245 |
  246 |   // INC-377 counter census: rate_limits keyed by user id (upload, geocode,
    at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:243:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:369:22)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:404:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at signedInSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:121:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:1649:18
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-144-leaving-the-contact-step-makes-one-identity-call-or-none-when-nothing-changed-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-a2e7f-r-none-when-nothing-changed-desktop-1280`; this run carried 1 context file(s); of the same spec: none

### post-wizard-resets.spec.ts › POSTING WIZARD › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: locator.selectOption: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_shift_6_0_yn5ltt_model"]')
    - locator resolved to <select data-locked="0" data-waiting="0" data-options="failed" data-testid="post-attr-control" data-attr="e2e_shift_6_0_yn5ltt_model" id="post-attr-e2e_shift_6_0_yn5ltt_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    109 × waiting for element to be visible and enabled
        - did not find some options
      - retrying select option action
        - waiting 500ms
  - element was detached from the DOM, retrying


--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 503 (Service Unavailable)
[client-error] console.error: [attr-options] read refused cc26d843-8889-4a1d-8381-a9078fa54f16 503
[client-error] HTTP 503 GET http://127.0.0.1:4173/api/attributes/cc26d843-8889-4a1d-8381-a9078fa54f16/options ((body unavailable))
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-32-model-dependent-details-reset-on-a-model-change-seller-only-details-survive-and-Undo-restores-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-b6b2b-s-survive-and-Undo-restores-desktop-1280`; this run carried 1 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

115 line(s), 39 message(s): 4 off the allowlist, 35 allowlisted.

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
| `auth upstream unavailable (<n>)` | 2 | shard 3, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-nt<n>n<n>a: e<n>e_par_uecfpg → e<n>e_chi_<n>akldg` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-po<n>gps: e<n>e_par_<n>o<n>x<n>z → e<n>e_chi_jd<n>jib` (quiet) | 1 | shard 1 |
| `gate fetch failed <n>` | 1 | shard 3 |
| `upstream returned an HTML error page (<n>)` | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-nt<n>n<n>a: e<n>e_par_uecfpg → e<n>e_chi_<n>akldg ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-po<n>gps: e<n>e_par_<n>o<n>x<n>z → e<n>e_chi_jd<n>jib ×1

Off the allowlist:

### listing not found

- Count: 11 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-17 the currency is preselected and searchable by name in one control ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-50 the specifications show every row open in display order (D41) ×2 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### auth upstream unavailable (<n>)

- Count: 2 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-77 the first refused field's label lands below the header (D2, no-preference) ×1 · PW-77 the first refused field's label lands below the header (D2, reduce) ×1 · PW-89 thousand / million: the full amount is stored and shown ×1 · PW-90 two boxes, a red border per unfilled level, the plan in one line ×1

```text
[WebServer] [ssr-error] /api/attributes/76292c9f-9bc4-4ef1-8593-7c4e021093f6/options auth upstream unavailable (502)
```

### gate fetch failed <n>

- Count: 1 · Sources: shard 3
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-10 a pricing basis is the door's own refusal by name, at status 200 (DEC-079) ×1 · PR-43 the owner's own client cannot write the profile; the identity route still  ×1

```text
[WebServer] [ssr-error] /__root gate fetch failed 502
```

### upstream returned an HTML error page (<n>)

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AP-50 the seller card fills the right column ×1 · AT-72 unit_am imports as the last column and a file without it leaves it alone ×1

```text
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (502)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-20T11:13:09.744Z | 19.9 min |
| email | 2026-10-20T11:13:10.824Z | 0.2 min |
| shard 1 | 2026-10-20T11:13:21.539Z | 50.1 min |
| shard 2 | 2026-10-20T11:13:19.309Z | 46.4 min |
| shard 3 | 2026-10-20T11:13:09.195Z | 35.1 min |
| shard 4 | 2026-10-20T11:13:06.871Z | 41.9 min |
| shard 5 | 2026-10-20T11:13:10.522Z | 44.1 min |
| shard 6 | 2026-10-20T11:13:23.569Z | 38.0 min |
| changed | 2026-10-20T11:13:19.764Z | 0.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 68 | 26.6 min | shard 1, shard 4 |
| `shell.spec.ts` | 424 | 25.8 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 25.2 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 23.3 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 62 | 19.3 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 80 | 17.2 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 16.2 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 15.8 min | shard 2, shard 5 |
| `my-listings-ad.spec.ts` | 36 | 15.1 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 14.2 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 14.1 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 13.9 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.5 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 36 | 13.4 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 12.6 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 11.9 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 11.6 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 11.2 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 11.1 min | shard 3, shard 6 |
| `admin-attributes-links.spec.ts` | 34 | 9.9 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.9 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.4 min | shard 1, shard 4 |
| `legal-certify.spec.ts` | 26 | 9.3 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 8.6 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 16 | 8.3 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 8.0 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.9 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 7.8 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.8 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 7.6 min | shard 2, shard 5 |
| `legal-doors.spec.ts` | 32 | 7.4 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.7 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.4 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 3, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 6.2 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 6.2 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `legal-admin.spec.ts` | 28 | 5.5 min | shard 2, shard 5 |
| `admin-audit.spec.ts` | 14 | 4.3 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.9 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.4 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 2.5 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.4 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.3 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.3 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 12 | 2.1 min | shard 1, shard 4 |
| `post-wizard-finder.spec.ts` | 8 | 2.1 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.0 min | shard 2, shard 5 |
| `legal-accept.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.4 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `legal-history.spec.ts` | 6 | 1.3 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 0.9 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `a11y.spec.ts` | 4 | 0.8 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.6 min | shard 2, shard 5 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 4 | 0.1 min | shard 2, changed |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `post-wizard-resets.spec.ts` › PW-32 model-dependent details reset on a model change, seller-only details survive, and Undo restores | desktop-1280 | 91.0 s |
| `post-wizard-specs.spec.ts` › PW-153 a settled range hides its number and the review and buyer sheet show the range | mobile-360 | 89.2 s |
| `ad-page.spec.ts` › AP-32 similar ads: up to six of the same leaf and place, the ad itself never among them; none on a sold ad | mobile-360 | 60.8 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 58.5 s |
| `legal-certify.spec.ts` › LG-19 a photo added to a published ad needs the certification; a draft's photo does not | desktop-1280 | 57.6 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 53.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 52.7 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | mobile-360 | 51.7 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | mobile-360 | 50.6 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 50.1 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | desktop-1280 | 47.9 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 46.8 s |
| `post-wizard-resets.spec.ts` › PW-61 after ten seconds the Undo is gone and the reset stands (D59) | desktop-1280 | 46.6 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | mobile-360 | 45.9 s |
| `my-listings-doors.spec.ts` › ML-12 edit_my_listing refuses what a box may not change, an ad it may not edit and another seller's, and writes nothing | desktop-1280 | 45.5 s |
