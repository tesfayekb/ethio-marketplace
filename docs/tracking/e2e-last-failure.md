# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39273303713
- Commit: `ab6f1744ee8d4266622738edf77eb0bf861d344c`
- Attempt: 1
- Written (UTC): 2026-10-19T16:03:06.125Z
- Passed: 2143 · Skipped: 155 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 8
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) — Error: [e2e:mlp] seeding failed: canceling statement due to statement timeout
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › mobile chrome › the bar's current item carries the pill, light then dark (C2h.3) — Error: expect(locator).toHaveCount(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · shell.spec.ts › mobile chrome › RM-1 a tap on the strip opens the menu; the row under the finger opens the category — Error: expect(received).toBeLessThanOrEqual(expected)
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-74 a merge is refused while a listing holds a source's answer, and merges when none does — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · legal-certify.spec.ts › Legal certification › LG-19 a photo added to a published ad needs the certification; a draft's photo does not — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · legal-doors.spec.ts › Legal doors › LG-7 admin_user_legal_history shows staff the person's acceptances and legal e-mails, newest first; refused for a plain user; the notice door is service-only — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · shell.spec.ts › rail scroll regions (U0f) › md+ rail: items scroll, header fixed — TimeoutError: page.waitForURL: Timeout 15000ms exceeded.

## Flaky bodies (DEC-078)

### my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:mlp] seeding failed: canceling statement due to statement timeout
--- further error 1 ---
Error: [e2e:mlp] seeding failed: canceling statement due to statement timeout

  218 |       .select("id")
  219 |       .single();
> 220 |     if (error || !data) throw new Error(`[e2e:mlp] seeding failed: ${error?.message ?? "no row"}`);
      |                               ^
  221 |     const id = data.id as string;
  222 |     listingIds.push(id);
  223 |     const located = await adminClient()
    at seed (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:220:31)
    at seedBoth (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:246:15)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:354:15
```

Context: context file not found for `my-listings-page-MY-LISTINGS-the-list-page-bundle-16-turn-2-MLP-2-The-My-listings-page-the-groups-with-their-counts-each-row-s-line-Continue-on-a-draft-D138-mobile-360` — Playwright's name `my-listings-page-MY-LISTIN-20138-e-Continue-on-a-draft-D138--mobile-360`; this run carried 10 context file(s); of the same spec: none

### shell.spec.ts › mobile chrome › the bar's current item carries the pill, light then dark (C2h.3)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('bottom-bar-account').getByTestId('bottom-bar-pill')
Expected: 1
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('bottom-bar-account').getByTestId('bottom-bar-pill')
    14 × locator resolved to 0 elements
       - unexpected value "0"

--- further error 1 ---
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('bottom-bar-account').getByTestId('bottom-bar-pill')
Expected: 1
Received: 0
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByTestId('bottom-bar-account').getByTestId('bottom-bar-pill')
    14 × locator resolved to 0 elements
       - unexpected value "0"


  965 |     const home = page.getByTestId("bottom-bar-home");
  966 |     const check = async () => {
> 967 |       await expect(account.getByTestId("bottom-bar-pill")).toHaveCount(1);
      |                                                            ^
  968 |       await expect(home.getByTestId("bottom-bar-pill")).toHaveCount(0);
  969 |       const weight = await account
```

Context:

```text
          - listitem [ref=e127]:
            - generic [ref=e128]: About
          - listitem [ref=e129]:
            - generic [ref=e130]: Contact
      - navigation "Help" [ref=e131]:
        - heading "Help" [level=2] [ref=e132]
        - list [ref=e133]:
          - listitem [ref=e134]:
            - generic [ref=e135]: Safety
      - navigation "Legal" [ref=e136]:
        - heading "Legal" [level=2] [ref=e137]
        - list [ref=e138]:
          - listitem [ref=e139]:
            - link "Terms" [ref=e140] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e141]:
            - link "Privacy" [ref=e142] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e144]: © 2026 ethio.com — All rights reserved.
```
```

### shell.spec.ts › mobile chrome › RM-1 a tap on the strip opens the menu; the row under the finger opens the category

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34

  1184 |     const menuBox = await menuRow.boundingBox();
  1185 |     if (!menuBox) throw new Error("Missing category menu row bounds");
> 1186 |     expect(Math.abs(menuBox.y - rowBox.y)).toBeLessThanOrEqual(1);
       |                                            ^
  1187 |     expect(Math.abs(menuBox.height - rowBox.height)).toBeLessThanOrEqual(1);
  1188 |     await page.mouse.click(tap.x, tap.y);
  1189 |     await expect(page).toHaveURL(new RegExp(`/c/${category.slug}$`));
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1186:44
```

Context:

```text
          - listitem [ref=e546]:
            - generic [ref=e547]: About
          - listitem [ref=e548]:
            - generic [ref=e549]: Contact
      - navigation "Help" [ref=e550]:
        - heading "Help" [level=2] [ref=e551]
        - list [ref=e552]:
          - listitem [ref=e553]:
            - generic [ref=e554]: Safety
      - navigation "Legal" [ref=e555]:
        - heading "Legal" [level=2] [ref=e556]
        - list [ref=e557]:
          - listitem [ref=e558]:
            - link "Terms" [ref=e559] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e560]:
            - link "Privacy" [ref=e561] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e563]: © 2026 ethio.com — All rights reserved.
```
```

### admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-74 a merge is refused while a listing holds a source's answer, and merges when none does

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 500 ()
[client-error] HTTP 500 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/admin_merge_attributes ({"code":"P0010","details":null,"hint":null,"message":"admin.attributes.error.mergeHasHolders:1"})
```

Context:

```text
          - generic [ref=e1123]:
            - checkbox "Size (womens_size) · 1" [ref=e1124] [cursor=pointer]
            - generic [ref=e1127]: Size (womens_size) · 1
          - generic [ref=e1128]:
            - checkbox "Year (year) · 1" [ref=e1129] [cursor=pointer]
            - generic [ref=e1132]: Year (year) · 1
          - generic [ref=e1133]:
            - checkbox "Year Built (year_built) · 1" [ref=e1134] [cursor=pointer]
            - generic [ref=e1137]: Year Built (year_built) · 1
          - generic [ref=e1138]:
            - checkbox "Zoning / Land Use (zoning) · 1" [ref=e1139] [cursor=pointer]
            - generic [ref=e1142]: Zoning / Land Use (zoning) · 1
      - status [ref=e1143]: 1 links move to e2e_keep_8goam4; 1 definitions removed.
      - generic [ref=e1144]:
        - button "Cancel" [ref=e1145] [cursor=pointer]
        - button "Merge" [disabled]
    - button "Close" [ref=e1146] [cursor=pointer]:
      - img [ref=e1147]
      - generic [ref=e1150]: Close
```
```

### admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-BE6xMbFe.js:83:25) at http://127.0.0.1:4173/assets/feed-BE6xMbFe.js:117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CV1qrABv.js:5125:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CV1qrABv.js:6030:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CV1qrABv.js:6021:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CV1qrABv.js:6029:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CV1qrABv.js:6021:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CV1qrABv.js:6029:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CV1qrABv.js:6021:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CV1qrABv.js:6029:5)
```

Context:

```text
            - listitem [ref=e529]:
              - generic [ref=e530]: About
            - listitem [ref=e531]:
              - generic [ref=e532]: Contact
        - navigation "Help" [ref=e533]:
          - heading "Help" [level=2] [ref=e534]
          - list [ref=e535]:
            - listitem [ref=e536]:
              - generic [ref=e537]: Safety
        - navigation "Legal" [ref=e538]:
          - heading "Legal" [level=2] [ref=e539]
          - list [ref=e540]:
            - listitem [ref=e541]:
              - link "Terms" [ref=e542] [cursor=pointer]:
                - /url: /terms
            - listitem [ref=e543]:
              - link "Privacy" [ref=e544] [cursor=pointer]:
                - /url: /privacy
      - paragraph [ref=e546]: © 2026 ethio.com — All rights reserved.
```
```

### legal-certify.spec.ts › Legal certification › LG-19 a photo added to a published ad needs the certification; a draft's photo does not

- Source: `shard 5`
- Project: `desktop-1280`

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
    - content-type: multipart/form-data; boundary=----WebKitFormBoundarydk55fPN0ER5T75rY
    - content-length: 214805


   at helpers/photos.ts:104

  102 |   if (options.token) headers["Authorization"] = `Bearer ${options.token}`;
  103 |   const small: { name: FixtureName; as?: string } = { name: "marker-13px.jpg" };
> 104 |   const response = await page.request.post("/api/upload/photo", {
      |                                       ^
  105 |     headers,
  106 |     multipart: {
  107 |       listingId: options.listingId,
```

Context:

```text
          - listitem [ref=e351]:
            - generic [ref=e352]: About
          - listitem [ref=e353]:
            - generic [ref=e354]: Contact
      - navigation "Help" [ref=e355]:
        - heading "Help" [level=2] [ref=e356]
        - list [ref=e357]:
          - listitem [ref=e358]:
            - generic [ref=e359]: Safety
      - navigation "Legal" [ref=e360]:
        - heading "Legal" [level=2] [ref=e361]
        - list [ref=e362]:
          - listitem [ref=e363]:
            - link "Terms" [ref=e364] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e365]:
            - link "Privacy" [ref=e366] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e368]: © 2026 ethio.com — All rights reserved.
```
```

### legal-doors.spec.ts › Legal doors › LG-7 admin_user_legal_history shows staff the person's acceptances and legal e-mails, newest first; refused for a plain user; the notice door is service-only

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `legal-doors-Legal-doors-LG-7-admin_user_legal_history-shows-staff-the-person-s-acceptances-and-legal-e-mails-newest-first-refused-for-a-plain-user-the-notice-door-is-service-only-desktop-1280` — Playwright's name `legal-doors-Legal-doors-LG-ddfc0-notice-door-is-service-only-desktop-1280`; this run carried 10 context file(s); of the same spec: none

### shell.spec.ts › rail scroll regions (U0f) › md+ rail: items scroll, header fixed

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

   at helpers/ui.ts:446

  444 |
  445 |   // 1. The route the auth screen navigates to on password success.
> 446 |   await page.waitForURL(/\/$/, { timeout: 15000 });
      |              ^
  447 |   // 2. Authoritative signed-in signal: the account menu trigger renders ONLY on
  448 |   //    the authenticated branch of app-header (stable testid, no hover/open
  449 |   //    prerequisite), unlike the signed-out "Sign in" link whose absence is
    at signIn (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:446:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1858:5
```

Context:

```text
          - listitem [ref=e148]:
            - generic [ref=e149]: About
          - listitem [ref=e150]:
            - generic [ref=e151]: Contact
      - navigation "Help" [ref=e152]:
        - heading "Help" [level=2] [ref=e153]
        - list [ref=e154]:
          - listitem [ref=e155]:
            - generic [ref=e156]: Safety
      - navigation "Legal" [ref=e157]:
        - heading "Legal" [level=2] [ref=e158]
        - list [ref=e159]:
          - listitem [ref=e160]:
            - link "Terms" [ref=e161] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e162]:
            - link "Privacy" [ref=e163] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e165]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

110 line(s), 36 message(s): 1 off the allowlist, 35 allowlisted.

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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>s<n>zb: e<n>e_par_scq<n>i → e<n>e_chi_o<n>plfn` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-d<n>lqal: e<n>e_par_u<n>u → e<n>e_chi_cls<n>o<n>` (quiet) | 1 | shard 1 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>s<n>zb: e<n>e_par_scq<n>i → e<n>e_chi_o<n>plfn ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-d<n>lqal: e<n>e_par_u<n>u → e<n>e_chi_cls<n>o<n> ×1

Off the allowlist:

### listing not found

- Count: 10 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-17 the currency is preselected and searchable by name in one control ×2 · PW-63 the pricing basis is asked on the price step, refused there when empty, an ×2 · an empty category shows the invitation alone, never the old box (D215) ×1 · location row is present on Marketplace and absent on Account ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1

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
| smoke | 2026-10-19T15:10:07.796Z | 24.7 min |
| email | 2026-10-19T15:10:13.596Z | 0.6 min |
| shard 1 | 2026-10-19T15:10:17.879Z | 51.2 min |
| shard 2 | 2026-10-19T15:10:03.224Z | 44.6 min |
| shard 3 | 2026-10-19T15:10:03.740Z | 39.5 min |
| shard 4 | 2026-10-19T15:10:09.072Z | 48.6 min |
| shard 5 | 2026-10-19T15:10:16.205Z | 51.9 min |
| shard 6 | 2026-10-19T15:10:03.550Z | 38.1 min |
| changed | 2026-10-19T15:10:09.241Z | 9.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 68 | 31.2 min | shard 1, shard 4 |
| `shell.spec.ts` | 424 | 29.5 min | smoke, shard 3, shard 6 |
| `post-wizard-specs.spec.ts` | 82 | 27.6 min | shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 23.4 min | shard 2, shard 5 |
| `legal-certify.spec.ts` | 48 | 21.0 min | shard 2, shard 5, changed |
| `admin-listings.spec.ts` | 62 | 18.4 min | shard 1, shard 4 |
| `posting-routes.spec.ts` | 80 | 17.9 min | shard 3, shard 6 |
| `post-wizard-pricing.spec.ts` | 52 | 17.9 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 16.5 min | shard 2, shard 5 |
| `post-wizard-bundle2.spec.ts` | 70 | 16.2 min | shard 2, shard 5 |
| `post-wizard-place.spec.ts` | 38 | 16.0 min | shard 3, shard 6 |
| `legal-doors.spec.ts` | 56 | 15.7 min | shard 2, shard 5, changed |
| `ad-page-doors.spec.ts` | 30 | 15.1 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 14.5 min | shard 2, shard 5 |
| `auth-signout.spec.ts` | 56 | 14.5 min | smoke, shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.2 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 36 | 14.1 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 13.7 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 13.6 min | shard 3, shard 6 |
| `admin-screening.spec.ts` | 52 | 13.3 min | shard 1, shard 4 |
| `admin-attributes-library.spec.ts` | 42 | 12.4 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 11.1 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 34 | 11.1 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 10.0 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 9.9 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 9.0 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 8.6 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.5 min | shard 2, shard 5 |
| `my-listings-page.spec.ts` | 16 | 8.5 min | shard 2, shard 5 |
| `admin-attributes-safety.spec.ts` | 18 | 8.3 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.1 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.2 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 7.1 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.5 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.3 min | shard 3, shard 6 |
| `posting-routes-catalog.spec.ts` | 18 | 6.0 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 14 | 5.9 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 4.0 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 3.9 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.4 min | shard 3, shard 6 |
| `legal-admin.spec.ts` | 16 | 3.2 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.9 min | shard 2, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 1, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 2.6 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 2.5 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 12 | 2.4 min | shard 1, shard 4 |
| `admin-coverage.spec.ts` | 16 | 2.4 min | shard 1, shard 4 |
| `breadcrumbs.spec.ts` | 6 | 2.3 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.2 min | shard 3, shard 6 |
| `legal-accept.spec.ts` | 8 | 2.2 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `account-saved.spec.ts` | 4 | 1.6 min | shard 1, shard 4 |
| `category-image-routes.spec.ts` | 10 | 1.6 min | shard 2, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.5 min | shard 3, shard 6 |
| `legal-history.spec.ts` | 6 | 1.4 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.2 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 14 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.1 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 1.0 min | shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.9 min | smoke |
| `smoke-auth-i18n.spec.ts` | 4 | 0.9 min | smoke, shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.9 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `admin-services.spec.ts` | 10 | 0.7 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.6 min | shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.5 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.2 min | email |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `legal-certify.spec.ts` › LG-19 a photo added to a published ad needs the certification; a draft's photo does not | desktop-1280 | 113.2 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | mobile-360 | 107.9 s |
| `admin-attributes-safety.spec.ts` › AT-74 a merge is refused while a listing holds a source's answer, and merges when none does | desktop-1280 | 97.7 s |
| `legal-doors.spec.ts` › LG-7 admin_user_legal_history shows staff the person's acceptances and legal e-mails, newest first; refused for a plain user; the notice door is service-only | desktop-1280 | 94.2 s |
| `admin-audit.spec.ts` › IMP-1 impersonation: super admin opens a read-only session and ends it | desktop-1280 | 90.6 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | desktop-1280 | 73.2 s |
| `my-listings-ad.spec.ts` › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit | mobile-360 | 70.1 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | mobile-360 | 59.7 s |
| `my-listings-doors.spec.ts` › ML-3 Reserved on and off, on a live ad only (D173) | mobile-360 | 59.7 s |
| `post-wizard-where.spec.ts` › PW-184 the location details refuse a phone number and keep a street note | desktop-1280 | 57.1 s |
| `post-wizard-specs.spec.ts` › PW-158 a pointer to a category that is gone draws nothing and no braces | desktop-1280 | 55.1 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | mobile-360 | 54.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 53.0 s |
| `admin-categories-home.spec.ts` › CT-41 the admin's own client cannot write the eight door tables; the doors still can | mobile-360 | 52.9 s |
| `admin-categories-console.spec.ts` › CT-32 a reactivate row carries its cell changes through commit and undo, and an empty root deletes and undoes | desktop-1280 | 52.1 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39273303713-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39273303713-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39273303713-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39273303713-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39273303713-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 4, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 39273303713-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39273303713-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39273303713-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39273303713-changed
```

## legal-certify.spec.ts › Legal certification › LG-21 the statement is certified once per ad: edits, renewals and photos ask again only for a new version

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"

  662 |     const changes = { title: `e2e once changed ${rand()}` };
  663 |     const bare = await me.rpc("edit_my_listing", { p_listing_id: a, p_changes: changes });
> 664 |     expect(bare.error).toContain("certificationRequired");
      |                        ^
  665 |     const certified = await me.rpc("edit_my_listing", {
  666 |       p_listing_id: a,
  667 |       p_changes: changes,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:664:24
```

Context:

```text
          - listitem [ref=e265]:
            - generic [ref=e266]: About
          - listitem [ref=e267]:
            - generic [ref=e268]: Contact
      - navigation "Help" [ref=e269]:
        - heading "Help" [level=2] [ref=e270]
        - list [ref=e271]:
          - listitem [ref=e272]:
            - generic [ref=e273]: Safety
      - navigation "Legal" [ref=e274]:
        - heading "Legal" [level=2] [ref=e275]
        - list [ref=e276]:
          - listitem [ref=e277]:
            - link "Terms" [ref=e278] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e279]:
            - link "Privacy" [ref=e280] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e282]: © 2026 ethio.com — All rights reserved.
```
```

## legal-certify.spec.ts › Legal certification › LG-21 the statement is certified once per ad: edits, renewals and photos ask again only for a new version

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"

  662 |     const changes = { title: `e2e once changed ${rand()}` };
  663 |     const bare = await me.rpc("edit_my_listing", { p_listing_id: a, p_changes: changes });
> 664 |     expect(bare.error).toContain("certificationRequired");
      |                        ^
  665 |     const certified = await me.rpc("edit_my_listing", {
  666 |       p_listing_id: a,
  667 |       p_changes: changes,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:664:24
```

Context:

```text
          - listitem [ref=e387]:
            - generic [ref=e388]: About
          - listitem [ref=e389]:
            - generic [ref=e390]: Contact
      - navigation "Help" [ref=e391]:
        - heading "Help" [level=2] [ref=e392]
        - list [ref=e393]:
          - listitem [ref=e394]:
            - generic [ref=e395]: Safety
      - navigation "Legal" [ref=e396]:
        - heading "Legal" [level=2] [ref=e397]
        - list [ref=e398]:
          - listitem [ref=e399]:
            - link "Terms" [ref=e400] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e401]:
            - link "Privacy" [ref=e402] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e404]: © 2026 ethio.com — All rights reserved.
```
```

## legal-certify.spec.ts › Legal certification › LG-21 the statement is certified once per ad: edits, renewals and photos ask again only for a new version

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"

  662 |     const changes = { title: `e2e once changed ${rand()}` };
  663 |     const bare = await me.rpc("edit_my_listing", { p_listing_id: a, p_changes: changes });
> 664 |     expect(bare.error).toContain("certificationRequired");
      |                        ^
  665 |     const certified = await me.rpc("edit_my_listing", {
  666 |       p_listing_id: a,
  667 |       p_changes: changes,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:664:24
```

Context:

```text
          - listitem [ref=e265]:
            - generic [ref=e266]: About
          - listitem [ref=e267]:
            - generic [ref=e268]: Contact
      - navigation "Help" [ref=e269]:
        - heading "Help" [level=2] [ref=e270]
        - list [ref=e271]:
          - listitem [ref=e272]:
            - generic [ref=e273]: Safety
      - navigation "Legal" [ref=e274]:
        - heading "Legal" [level=2] [ref=e275]
        - list [ref=e276]:
          - listitem [ref=e277]:
            - link "Terms" [ref=e278] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e279]:
            - link "Privacy" [ref=e280] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e282]: © 2026 ethio.com — All rights reserved.
```
```

## legal-certify.spec.ts › Legal certification › LG-21 the statement is certified once per ad: edits, renewals and photos ask again only for a new version

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "certificationRequired"
Received string:    "an ad in review is edited once its review is done"

  662 |     const changes = { title: `e2e once changed ${rand()}` };
  663 |     const bare = await me.rpc("edit_my_listing", { p_listing_id: a, p_changes: changes });
> 664 |     expect(bare.error).toContain("certificationRequired");
      |                        ^
  665 |     const certified = await me.rpc("edit_my_listing", {
  666 |       p_listing_id: a,
  667 |       p_changes: changes,
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:664:24
```

Context:

```text
          - listitem [ref=e387]:
            - generic [ref=e388]: About
          - listitem [ref=e389]:
            - generic [ref=e390]: Contact
      - navigation "Help" [ref=e391]:
        - heading "Help" [level=2] [ref=e392]
        - list [ref=e393]:
          - listitem [ref=e394]:
            - generic [ref=e395]: Safety
      - navigation "Legal" [ref=e396]:
        - heading "Legal" [level=2] [ref=e397]
        - list [ref=e398]:
          - listitem [ref=e399]:
            - link "Terms" [ref=e400] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e401]:
            - link "Privacy" [ref=e402] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e404]: © 2026 ethio.com — All rights reserved.
```
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

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

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

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
