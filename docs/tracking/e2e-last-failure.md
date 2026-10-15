# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/38815478012
- Commit: `880c14321d46db4ed7fbfce73abd843d19f8f86b`
- Attempt: 1
- Written (UTC): 2026-10-15T23:07:46.270Z
- Passed: 1758 · Skipped: 126 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 20
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry — Error: [e2e:l4b2] seeding region failed: canceling statement due to statement timeout
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-console.spec.ts › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-categories-home.spec.ts › Bundle 7 category doors › CT-38 a retired category with a child is not deleted until the child moves away — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-roles.spec.ts › U2 roles console › RP-5 delete guards: members block deletion; typed confirm deletes — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-9 Rented and Filled: a sold ad takes its category's word (call H) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-5 The price applies at once; Price reduced only for a real drop on a price that stood (D173, D174, D177) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · photo-pipeline.spec.ts › PHOTO PIPELINE › PP-26 a refused edit leaves the old photo as it was; a photo not on the listing is gone (D154 B2) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-119 another seller's visible phone is never carried — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-resets.spec.ts › POSTING WIZARD › PW-164 an identity change keeps every detail that does not depend on it, resets the ones that do, and Undo restores them — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) — Error: [e2e:inc271] the option lists never settled
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › U4h device language star › TR-37 the account carries onto a starless device, and never over a star — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-console.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-categories-home.spec.ts › Bundle 7 category doors › CT-41 the admin's own client cannot write the eight door tables; the doors still can — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-roles.spec.ts › U2 roles console › RP-9 delete confirm: the expected key renders adjacent and arms only on an exact match — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · feed-screens.spec.ts › FEED SCREENS › FS-13 each wider place is headed in its own name: the region, then the country (D127) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · import-security.spec.ts › IMPORT-GATE translations › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited — Error: IMPORT-GATE the preview rate limit never engaged
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-178 a late read of the place text never replaces a newer save — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · posting-routes.spec.ts › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private — Test timeout of 60000ms exceeded.

## Flaky bodies (DEC-078)

### shell.spec.ts › L4b location picker › LS-6 the nearest curated metro wins by geometry

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: [e2e:l4b2] seeding region failed: canceling statement due to statement timeout
--- further error 1 ---
Error: [e2e:l4b2] seeding region failed: canceling statement due to statement timeout

   at helpers/locations.ts:444

  442 |     .single();
  443 |   if (regionError || !region) {
> 444 |     throw new Error(`[e2e:l4b2] seeding region failed: ${regionError?.message ?? "no row"}`);
      |           ^
  445 |   }
  446 |
  447 |   const { data: city, error: cityError } = await supabase
    at seedGuessFixture (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:444:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:2455:21
```

Context: context file not found for `shell-L4b-location-picker-LS-6-the-nearest-curated-metro-wins-by-geometry-desktop-1280` — Playwright's name `shell-L4b-location-picker--83294-ated-metro-wins-by-geometry-desktop-1280`; this run carried 14 context file(s); of the same spec: none

### admin-categories-console.spec.ts › C2 categories console › CT-3 create + edit: a scratch category is born and renamed through step-up

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e339]:
            - generic [ref=e340]: About
          - listitem [ref=e341]:
            - generic [ref=e342]: How it works
      - navigation "Help" [ref=e343]:
        - heading "Help" [level=2] [ref=e344]
        - list [ref=e345]:
          - listitem [ref=e346]:
            - generic [ref=e347]: Safety
          - listitem [ref=e348]:
            - generic [ref=e349]: Contact
      - navigation "Legal" [ref=e350]:
        - heading "Legal" [level=2] [ref=e351]
        - list [ref=e352]:
          - listitem [ref=e353]:
            - generic [ref=e354]: Terms
          - listitem [ref=e355]:
            - generic [ref=e356]: Privacy
    - paragraph [ref=e358]: © 2026 ethio.com — All rights reserved.
```
```

### admin-categories-home.spec.ts › Bundle 7 category doors › CT-38 a retired category with a child is not deleted until the child moves away

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 504 ()
[client-error] HTTP 504 GET https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/user (upstream request timeout)
[client-error] console.error: `DialogContent` requires a `DialogTitle` for the component to be accessible for screen reader users. If you want to hide the `DialogTitle`, you can wrap it with our VisuallyHidden component. For more information, see https://radix-ui.com/primitives/docs/components/dialog
```

Context:

```text
      - generic:
        - button: Cancel
        - button: Delete permanently
    - button:
      - img
      - generic: Close
  - dialog [ref=e3]:
    - heading "Two-factor verification required" [level=2] [ref=e4]
    - generic [ref=e5]:
      - paragraph [ref=e6]: Two-factor verification required
      - paragraph [ref=e7]: This action requires two-factor verification. Enter the current code from your authenticator app.
      - generic [ref=e8]: Six-digit code
      - textbox "Six-digit code" [active] [ref=e9]:
        - /placeholder: "123456"
      - button "Verify and continue" [disabled]
      - button "Cancel" [ref=e10] [cursor=pointer]
    - button "Close" [ref=e11] [cursor=pointer]:
      - img [ref=e12]
      - generic [ref=e15]: Close
```
```

### admin-roles.spec.ts › U2 roles console › RP-5 delete guards: members block deletion; typed confirm deletes

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
          - listitem [ref=e615]:
            - generic [ref=e616]: About
          - listitem [ref=e617]:
            - generic [ref=e618]: How it works
      - navigation "Help" [ref=e619]:
        - heading "Help" [level=2] [ref=e620]
        - list [ref=e621]:
          - listitem [ref=e622]:
            - generic [ref=e623]: Safety
          - listitem [ref=e624]:
            - generic [ref=e625]: Contact
      - navigation "Legal" [ref=e626]:
        - heading "Legal" [level=2] [ref=e627]
        - list [ref=e628]:
          - listitem [ref=e629]:
            - generic [ref=e630]: Terms
          - listitem [ref=e631]:
            - generic [ref=e632]: Privacy
    - paragraph [ref=e634]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-9 Rented and Filled: a sold ad takes its category's word (call H)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `my-listings-ad-MY-LISTINGS-one-ad-s-page-bundle-16-turn-3-MLA-9-Rented-and-Filled-a-sold-ad-takes-its-category-s-word-call-H-mobile-360` — Playwright's name `my-listings-ad-MY-LISTINGS-a20b5-its-category-s-word-call-H--mobile-360`; this run carried 14 context file(s); of the same spec: none

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-5 The price applies at once; Price reduced only for a real drop on a price that stood (D173, D174, D177)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:ml] listing cb1d8c34-a4d1-4312-90ce-6701ce06641b not found

  172 |     .maybeSingle();
  173 |   if (error) throw new Error(`[e2e:ml] listing read failed: ${error.message}`);
> 174 |   if (!data) throw new Error(`[e2e:ml] listing ${listingId} not found`);
      |                    ^
  175 |   return data as unknown as Row;
  176 | }
  177 |
    at listingTruth (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:174:20)
    at snapshot (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:180:15)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:630:21
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-5-The-price-applies-at-once-Price-reduced-only-for-a-real-drop-on-a-price-that-stood-D173-D174-D177-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-0574b--that-stood-D173-D174-D177--mobile-360`; this run carried 14 context file(s); of the same spec: none

### photo-pipeline.spec.ts › PHOTO PIPELINE › PP-26 a refused edit leaves the old photo as it was; a photo not on the listing is gone (D154 B2)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: apiRequestContext.post: Target page, context or browser has been closed
Call log:
  - → POST http://127.0.0.1:4173/api/upload/photo
    - user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.7632.6 Safari/537.36
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Authorization: Bearer [redacted-jwt]
    - content-type: multipart/form-data; boundary=----WebKitFormBoundarylNDRSI6F1hcNHpQr
    - content-length: 50879


   at helpers/photos.ts:102

  100 |   if (options.token) headers["Authorization"] = `Bearer ${options.token}`;
  101 |   const small: { name: FixtureName; as?: string } = { name: "marker-13px.jpg" };
> 102 |   const response = await page.request.post("/api/upload/photo", {
      |                                       ^
  103 |     headers,
  104 |     multipart: {
  105 |       listingId: options.listingId,
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:34181:25) at http://127.0.0.1:4173/assets/index-DaI5BNJV.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6025:5)
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-26-a-refused-edit-leaves-the-old-photo-as-it-was-a-photo-not-on-the-listing-is-gone-D154-B2-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-2112b-he-listing-is-gone-D154-B2--mobile-360`; this run carried 14 context file(s); of the same spec: none

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-119 another seller's visible phone is never carried

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-119-another-seller-s-visible-phone-is-never-carried-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-efd4d-ible-phone-is-never-carried-mobile-360`; this run carried 14 context file(s); of the same spec: none

### post-wizard-resets.spec.ts › POSTING WIZARD › PW-164 an identity change keeps every detail that does not depend on it, resets the ones that do, and Undo restores them

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-164-an-identity-change-keeps-every-detail-that-does-not-depend-on-it-resets-the-ones-that-do-and-Undo-restores-them-mobile-360` — Playwright's name `post-wizard-resets-POSTING-e6c71-t-do-and-Undo-restores-them-mobile-360`; this run carried 14 context file(s); of the same spec: none

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:inc271] the option lists never settled

expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-specs')
Expected: "1"
Received: "0"
Timeout:  20000ms

Call log:
  - [e2e:inc271] the option lists never settled with timeout 20000ms
  - waiting for getByTestId('post-specs')
    24 × locator resolved to <div data-options="0" class="space-y-5" data-testid="post-specs">…</div>
       - unexpected value "0"

--- further error 1 ---
Error: [e2e:inc271] the option lists never settled

expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('post-specs')
Expected: "1"
Received: "0"
Timeout:  20000ms

Call log:
  - [e2e:inc271] the option lists never settled with timeout 20000ms
  - waiting for getByTestId('post-specs')
    24 × locator resolved to <div data-options="0" class="space-y-5" data-testid="post-specs">…</div>
       - unexpected value "0"


  177 |     const form = page.getByTestId("post-specs");
  178 |     if ((await form.count()) > 0) {
> 179 |       await expect(form, "[e2e:inc271] the option lists never settled").toHaveAttribute(
      |                                                                         ^
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-big-model-list-mobile-360` — Playwright's name `post-wizard-specs-POSTING--c2c01-wer-INC-329-big-model-list--mobile-360`; this run carried 14 context file(s); of the same spec: none

- shell.spec.ts › U4h device language star › TR-37 the account carries onto a starless device, and never over a star · `mobile-360` · source `shard 3` — body omitted: cap
- admin-categories-console.spec.ts › C2 categories console › CT-6 retirement: a retired category leaves the active tree and keeps its listings home · `desktop-1280` · source `shard 4` — body omitted: cap
- admin-categories-home.spec.ts › Bundle 7 category doors › CT-41 the admin's own client cannot write the eight door tables; the doors still can · `desktop-1280` · source `shard 4` — body omitted: cap
- admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found · `desktop-1280` · source `shard 4` — body omitted: cap
- admin-roles.spec.ts › U2 roles console › RP-9 delete confirm: the expected key renders adjacent and arms only on an exact match · `desktop-1280` · source `shard 4` — body omitted: cap
- feed-screens.spec.ts › FEED SCREENS › FS-13 each wider place is headed in its own name: the region, then the country (D127) · `desktop-1280` · source `shard 5` — body omitted: cap
- import-security.spec.ts › IMPORT-GATE translations › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited · `desktop-1280` · source `shard 5` — body omitted: cap
- post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-178 a late read of the place text never replaces a newer save · `desktop-1280` · source `shard 5` — body omitted: cap
- post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) · `desktop-1280` · source `shard 6` — body omitted: cap
- posting-routes.spec.ts › POSTING ROUTES › PR-21 step 7: private columns are owner-only, through my_listing_private · `desktop-1280` · source `shard 6` — body omitted: cap

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

114 line(s), 38 message(s): 3 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 10 | shard 3, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `auth upstream unavailable (<n>)` | 3 | shard 3 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-l<n>xr<n>a: e<n>e_par_oln<n>g<n> → e<n>e_chi_d<n>e<n>up` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-lbx<n>pu: e<n>e_par_qmygpv → e<n>e_chi_<n>sshu<n>` (quiet) | 1 | shard 4 |
| `register_listing_photo: listing not found` | 1 | shard 2 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-l<n>xr<n>a: e<n>e_par_oln<n>g<n> → e<n>e_chi_d<n>e<n>up ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-lbx<n>pu: e<n>e_par_qmygpv → e<n>e_chi_<n>sshu<n> ×1

Off the allowlist:

### listing not found

- Count: 10 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-174 a parent's move whose new option carries no fact leaves D on another pare ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · PR-27 edit_listing counts against the revise dial ×1 · PW-109 a quote basis forces contact, and a changed basis releases it (INC-375) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### auth upstream unavailable (<n>)

- Count: 3 · Sources: shard 3
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-164 an identity change keeps every detail that does not depend on it, resets  ×3 · PW-74 a step-3 round trip keeps every answer (INC-329, big model list) ×3

```text
[WebServer] [ssr-error] /api/attributes/b5870843-0e7f-49f5-b1f0-c4d3693fe8dd/options auth upstream unavailable (504)
```

### register_listing_photo: listing not found

- Count: 1 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-119 another seller's visible phone is never carried (retry #1) ×1 · PW-121 a phone number in the title or description is flagged at its field ×1

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
| smoke | 2026-10-15T22:20:34.765Z | 16.3 min |
| email | 2026-10-15T22:20:42.895Z | 0.3 min |
| shard 1 | 2026-10-15T22:20:31.966Z | 40.9 min |
| shard 2 | 2026-10-15T22:20:38.250Z | 36.2 min |
| shard 3 | 2026-10-15T22:20:37.129Z | 35.7 min |
| shard 4 | 2026-10-15T22:20:37.149Z | 38.3 min |
| shard 5 | 2026-10-15T22:20:42.812Z | 46.6 min |
| shard 6 | 2026-10-15T22:20:42.538Z | 35.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 28.6 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 80 | 27.6 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 24.1 min | shard 1, shard 4 |
| `shell.spec.ts` | 336 | 21.4 min | smoke, shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 68 | 20.5 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 50 | 18.1 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 62 | 15.6 min | shard 3, shard 6 |
| `my-listings-doors.spec.ts` | 28 | 15.3 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.9 min | shard 1, shard 4 |
| `post-wizard-resets.spec.ts` | 34 | 14.0 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 30 | 13.8 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 50 | 13.0 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 12.9 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 11.9 min | shard 3, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 11.4 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 11.3 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 48 | 10.5 min | smoke, shard 2, shard 5 |
| `feed-screens.spec.ts` | 30 | 10.0 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 9.1 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 9.1 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 32 | 8.5 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 8.1 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 8.0 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 7.9 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.9 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 7.8 min | shard 3, shard 6 |
| `admin-attributes-import.spec.ts` | 40 | 7.8 min | shard 1, shard 4 |
| `feed-index.spec.ts` | 30 | 7.6 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 7.4 min | shard 1, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.9 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 6.5 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 6.4 min | shard 1, shard 4 |
| `admin-translations-console.spec.ts` | 44 | 6.3 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 5.6 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 4.6 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 14 | 4.4 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 4.4 min | shard 1, shard 4 |
| `admin-translations-governance.spec.ts` | 8 | 2.6 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.5 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.4 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.2 min | shard 1, shard 4 |
| `admin-shell.spec.ts` | 10 | 1.9 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 3, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.3 min | shard 2, shard 5 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 8 | 0.6 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `import-security.spec.ts` › @private-identity IG-3 translations: a changed file cannot be committed and previews are rate limited | desktop-1280 | 113.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 109.1 s |
| `admin-listings.spec.ts` › AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found | desktop-1280 | 94.7 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, small model list) | desktop-1280 | 94.0 s |
| `admin-categories-console.spec.ts` › CT-6 retirement: a retired category leaves the active tree and keeps its listings home | desktop-1280 | 91.7 s |
| `my-listings-doors.spec.ts` › ML-5 The price applies at once; Price reduced only for a real drop on a price that stood (D173, D174, D177) | mobile-360 | 90.9 s |
| `posting-routes.spec.ts` › PR-21 step 7: private columns are owner-only, through my_listing_private | desktop-1280 | 90.1 s |
| `photo-pipeline.spec.ts` › PP-26 a refused edit leaves the old photo as it was; a photo not on the listing is gone (D154 B2) | mobile-360 | 87.6 s |
| `feed-screens.spec.ts` › FS-13 each wider place is headed in its own name: the region, then the country (D127) | desktop-1280 | 85.5 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | mobile-360 | 85.4 s |
| `admin-categories-home.spec.ts` › CT-41 the admin's own client cannot write the eight door tables; the doors still can | desktop-1280 | 84.8 s |
| `admin-categories-home.spec.ts` › CT-38 a retired category with a child is not deleted until the child moves away | mobile-360 | 84.1 s |
| `post-wizard-resets.spec.ts` › PW-164 an identity change keeps every detail that does not depend on it, resets the ones that do, and Undo restores them | mobile-360 | 83.0 s |
| `post-wizard-bundle2.spec.ts` › PW-178 a late read of the place text never replaces a newer save | desktop-1280 | 81.9 s |
| `admin-roles.spec.ts` › RP-5 delete guards: members block deletion; typed confirm deletes | mobile-360 | 81.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 38815478012-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38815478012-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 18 user(s) owned by process 38815478012-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 38815478012-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38815478012-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 38815478012-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 43 user(s) owned by process 38815478012-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 38815478012-6
```

## auth-signout.spec.ts › D189 deactivated session › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189)

- Source: `smoke`
- Project: `mobile-360`

```text
Error: SO-8: the session survived the sign-out

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "sb-jatpuhfdjfzctjipklmk-last-activity-at",
+   "sb-jatpuhfdjfzctjipklmk-session-started-at",
+   "sb-jatpuhfdjfzctjipklmk-session-ref",
+ ]
--- further error 1 ---
Error: SO-8: the session survived the sign-out

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "sb-jatpuhfdjfzctjipklmk-last-activity-at",
+   "sb-jatpuhfdjfzctjipklmk-session-started-at",
+   "sb-jatpuhfdjfzctjipklmk-session-ref",
+ ]

  421 |         Object.keys(localStorage).filter((k) => k.startsWith("sb-")),
  422 |       );
> 423 |       expect(stored, "SO-8: the session survived the sign-out").toEqual([]);
      |                                                                 ^
  424 |
  425 |       await page.goto("/auth");
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

## auth-signout.spec.ts › D189 deactivated session › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189)

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: SO-8: the session survived the sign-out

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "sb-jatpuhfdjfzctjipklmk-last-activity-at",
+   "sb-jatpuhfdjfzctjipklmk-session-started-at",
+   "sb-jatpuhfdjfzctjipklmk-session-ref",
+ ]
--- further error 1 ---
Error: SO-8: the session survived the sign-out

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "sb-jatpuhfdjfzctjipklmk-last-activity-at",
+   "sb-jatpuhfdjfzctjipklmk-session-started-at",
+   "sb-jatpuhfdjfzctjipklmk-session-ref",
+ ]

  421 |         Object.keys(localStorage).filter((k) => k.startsWith("sb-")),
  422 |       );
> 423 |       expect(stored, "SO-8: the session survived the sign-out").toEqual([]);
      |                                                                 ^
  424 |
  425 |       await page.goto("/auth");
```

Context:

```text
          - listitem [ref=e275]:
            - generic [ref=e276]: About
          - listitem [ref=e277]:
            - generic [ref=e278]: How it works
      - navigation "Help" [ref=e279]:
        - heading "Help" [level=2] [ref=e280]
        - list [ref=e281]:
          - listitem [ref=e282]:
            - generic [ref=e283]: Safety
          - listitem [ref=e284]:
            - generic [ref=e285]: Contact
      - navigation "Legal" [ref=e286]:
        - heading "Legal" [level=2] [ref=e287]
        - list [ref=e288]:
          - listitem [ref=e289]:
            - generic [ref=e290]: Terms
          - listitem [ref=e291]:
            - generic [ref=e292]: Privacy
    - paragraph [ref=e294]: © 2026 ethio.com — All rights reserved.
```
```

## auth-signout.spec.ts › D189 deactivated session › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189)

- Source: `shard 2`
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

## auth-signout.spec.ts › D189 deactivated session › SO-8 a deactivated account is signed out at its next auth event and told why on the sign-in page (D189)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: SO-8: the session survived the sign-out

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "sb-jatpuhfdjfzctjipklmk-last-activity-at",
+   "sb-jatpuhfdjfzctjipklmk-session-started-at",
+   "sb-jatpuhfdjfzctjipklmk-session-ref",
+ ]
--- further error 1 ---
Error: SO-8: the session survived the sign-out

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "sb-jatpuhfdjfzctjipklmk-last-activity-at",
+   "sb-jatpuhfdjfzctjipklmk-session-started-at",
+   "sb-jatpuhfdjfzctjipklmk-session-ref",
+ ]

  421 |         Object.keys(localStorage).filter((k) => k.startsWith("sb-")),
  422 |       );
> 423 |       expect(stored, "SO-8: the session survived the sign-out").toEqual([]);
      |                                                                 ^
  424 |
  425 |       await page.goto("/auth");
```

Context:

```text
          - listitem [ref=e275]:
            - generic [ref=e276]: About
          - listitem [ref=e277]:
            - generic [ref=e278]: How it works
      - navigation "Help" [ref=e279]:
        - heading "Help" [level=2] [ref=e280]
        - list [ref=e281]:
          - listitem [ref=e282]:
            - generic [ref=e283]: Safety
          - listitem [ref=e284]:
            - generic [ref=e285]: Contact
      - navigation "Legal" [ref=e286]:
        - heading "Legal" [level=2] [ref=e287]
        - list [ref=e288]:
          - listitem [ref=e289]:
            - generic [ref=e290]: Terms
          - listitem [ref=e291]:
            - generic [ref=e292]: Privacy
    - paragraph [ref=e294]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

No `[ssr-error]` lines in the `smoke` log (or no log was uploaded).

## Client errors: smoke

No `[client-error]` lines in the `smoke` log (or no log was uploaded).

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
[WebServer] [ssr-error] /api/upload/photo register_listing_photo: listing not found
```

## Client errors: shard 2

```text
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:34181:25) at http://127.0.0.1:4173/assets/index-DaI5BNJV.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6025:5)
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
[client-error] console.error: TypeError: Failed to fetch at http://127.0.0.1:4173/assets/index-DaI5BNJV.js:15424:27 at getResponse (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:15467:20) at serverFnFetcher (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:15424:9) at async client (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:17472:17) at async callNextMiddleware (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:17403:20) at async userNext (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:17389:21) ×3
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:34181:25) at http://127.0.0.1:4173/assets/index-DaI5BNJV.js:34213:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:5121:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6026:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6025:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6017:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DaI5BNJV.js:6025:5) ×2
```
