# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39359380374
- Commit: `522e0ed56130f420188df5a34f9ad772853ccad6`
- Attempt: 1
- Written (UTC): 2026-10-20T03:24:21.686Z
- Passed: 2154 · Skipped: 159 · Failed: 4
- Gating failures: 4 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 11
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-75 the import preview names the holders of an unlinked question and a removed answer — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-audit.spec.ts › U3 audit & security › IMP-2 dual-actor audit: start and end are both recorded — Error: expect(locator).toHaveText(expected) failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-screening.spec.ts › ADMIN SCREENING › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188) — Error: [e2e:sc] reading the listing failed: undefined
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · mfa-stepup.spec.ts › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI — Error: [e2e:users] admin.createUser failed for e2e+39359380374-2-1-20-ouhpcc@ethio-e2e.invalid: {}
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field — Error: [e2e:d41] the specifications form never answered
- FLAKY (passed on retry) · `mobile-360` · source `shard 3` · post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-97 the map credit is visible and uncovered on both plans — Error: [e2e:setup] POST /logout?scope=global failed (504): upstream request timeout
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts — Error: [e2e:pool] role super_admin not found: no row
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · legal-certify.spec.ts › Legal certification › LG-21 the statement is certified once per ad: edits, renewals and photos ask again only for a new version — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-resets.spec.ts › POSTING WIZARD › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer — Error: expect(locator).toHaveAttribute(expected) failed
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-specs.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step — Error: expect(locator).toHaveAttribute(expected) failed

## Flaky bodies (DEC-078)

### admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-75 the import preview names the holders of an unlinked question and a removed answer

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
                  - text: Privacy
        - generic:
          - paragraph: © 2026 ethio.com — All rights reserved.
  - dialog "Import attributes" [active] [ref=e2]:
    - heading "Import attributes" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Import attributes
      - paragraph [ref=e6]: Choose the two files you exported. Nothing is written until you confirm the preview.
      - paragraph [ref=e7]: "Columns marked “(read-only)” are worked out for you: you can edit them in the file, but they are never applied."
      - status [ref=e8]: 0 added · 2 changed · 1 unlinked · 0 deleted · 0 unchanged · 0 refused
      - list [ref=e9]:
        - listitem [ref=e10]: Row 2 — e2e_kept_x0nu57 · a2 — Held by 1 listings
        - listitem [ref=e11]: Row 2 — e2e_unlinked_ewxnhk — Held by 1 listings
      - generic [ref=e12]:
        - button "Discard" [ref=e13] [cursor=pointer]
        - button "Confirm import" [ref=e14] [cursor=pointer]
    - button "Close" [ref=e15] [cursor=pointer]:
      - img [ref=e16]
      - generic [ref=e19]: Close
```
```

### admin-audit.spec.ts › U3 audit & security › IMP-2 dual-actor audit: start and end are both recorded

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('mfa-status')
Expected: "Two-factor authentication is on"
Received: "Two-factor authentication is off"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('mfa-status')
    24 × locator resolved to <p data-testid="mfa-status" class="mt-3 text-sm font-medium text-foreground">Two-factor authentication is off</p>
       - unexpected value "Two-factor authentication is off"

mfa-error: no error shown
--- further error 1 ---
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('mfa-status')
Expected: "Two-factor authentication is on"
Received: "Two-factor authentication is off"
Timeout:  20000ms

Call log:
  - Expect "toHaveText" with timeout 20000ms
  - waiting for getByTestId('mfa-status')
    24 × locator resolved to <p data-testid="mfa-status" class="mt-3 text-sm font-medium text-foreground">Two-factor authentication is off</p>
       - unexpected value "Two-factor authentication is off"

mfa-error: no error shown

   at helpers/ui.ts:581

  579 |     const refusal = page.getByTestId("mfa-error");
  580 |     const message = (await refusal.isVisible()) ? await refusal.innerText() : "no error shown";
> 581 |     throw new Error(
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-tuccFqsp.js:83:25) at http://127.0.0.1:4173/assets/feed-tuccFqsp.js:117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-DS-LZzlc.js:5125:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DS-LZzlc.js:6030:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DS-LZzlc.js:6021:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DS-LZzlc.js:6029:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DS-LZzlc.js:6021:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DS-LZzlc.js:6029:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-DS-LZzlc.js:6021:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-DS-LZzlc.js:6029:5)
```

Context:

```text
          - listitem [ref=e247]:
            - generic [ref=e248]: About
          - listitem [ref=e249]:
            - generic [ref=e250]: Contact
      - navigation "Help" [ref=e251]:
        - heading "Help" [level=2] [ref=e252]
        - list [ref=e253]:
          - listitem [ref=e254]:
            - generic [ref=e255]: Safety
      - navigation "Legal" [ref=e256]:
        - heading "Legal" [level=2] [ref=e257]
        - list [ref=e258]:
          - listitem [ref=e259]:
            - link "Terms" [ref=e260] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e261]:
            - link "Privacy" [ref=e262] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e264]: © 2026 ethio.com — All rights reserved.
```
```

### admin-screening.spec.ts › ADMIN SCREENING › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188)

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:sc] reading the listing failed: undefined
--- further error 1 ---
Error: [e2e:sc] reading the listing failed: undefined

  1429 |         .eq("id", id)
  1430 |         .single();
> 1431 |       if (error || !data) throw new Error(`[e2e:sc] reading the listing failed: ${error?.message}`);
       |                                 ^
  1432 |       return data as { title: string; status: string };
  1433 |     };
  1434 |     const ad = await seedWaiting({ priced: true });
    at titleOf (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:1431:33)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:1489:12
--- further error 2 ---
Error: [e2e:reap] listings of seller aa6dabbc-51c6-4197-812e-3aff905abcc1 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 521: Web server is down</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
```

Context:

```text
          - listitem [ref=e279]:
            - generic [ref=e280]: About
          - listitem [ref=e281]:
            - generic [ref=e282]: Contact
      - navigation "Help" [ref=e283]:
        - heading "Help" [level=2] [ref=e284]
        - list [ref=e285]:
          - listitem [ref=e286]:
            - generic [ref=e287]: Safety
      - navigation "Legal" [ref=e288]:
        - heading "Legal" [level=2] [ref=e289]
        - list [ref=e290]:
          - listitem [ref=e291]:
            - link "Terms" [ref=e292] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e293]:
            - link "Privacy" [ref=e294] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e296]: © 2026 ethio.com — All rights reserved.
```
```

### mfa-stepup.spec.ts › U1f step-up authentication › MF-4 server: permission first, then step-up — the RPC refuses regardless of UI

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:users] admin.createUser failed for e2e+39359380374-2-1-20-ouhpcc@ethio-e2e.invalid: {}
--- further error 1 ---
Error: [e2e:users] admin.createUser failed for e2e+39359380374-2-1-20-ouhpcc@ethio-e2e.invalid: {}

   at helpers/users.ts:69

  67 |   });
  68 |   if (error || !data?.user?.id) {
> 69 |     throw new Error(
     |           ^
  70 |       `[e2e:users] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}`,
  71 |     );
  72 |   }
    at createUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:69:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:188:19
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] HTTP 400 POST /rest/v1/rpc/admin_set_account_status ({"code":"P0001","details":null,"hint":null,"message":"permission denied"})
```

Context:

```text
          - listitem [ref=e475]:
            - generic [ref=e476]: About
          - listitem [ref=e477]:
            - generic [ref=e478]: Contact
      - navigation "Help" [ref=e479]:
        - heading "Help" [level=2] [ref=e480]
        - list [ref=e481]:
          - listitem [ref=e482]:
            - generic [ref=e483]: Safety
      - navigation "Legal" [ref=e484]:
        - heading "Legal" [level=2] [ref=e485]
        - list [ref=e486]:
          - listitem [ref=e487]:
            - link "Terms" [ref=e488] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e489]:
            - link "Privacy" [ref=e490] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e492]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `my-listings-ad-MY-LISTINGS-one-ad-s-page-bundle-16-turn-3-MLA-1-my_listing-the-seller-s-own-ad-with-the-list-s-row-its-group-the-status-it-reopens-to-and-the-renew-setting-nobody-else-s-mobile-360` — Playwright's name `my-listings-ad-MY-LISTINGS-8dfb1-renew-setting-nobody-else-s-mobile-360`; this run carried 8 context file(s); of the same spec: none

### post-wizard-specs.spec.ts › POSTING WIZARD › PW-42 Amharic catalog text falls back field by field

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:d41] the specifications form never answered

expect(locator).toBeVisible() failed

Locator: getByTestId('post-specs').or(getByTestId('post-specs-none'))
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - [e2e:d41] the specifications form never answered with timeout 20000ms
  - waiting for getByTestId('post-specs').or(getByTestId('post-specs-none'))

--- further error 1 ---
Error: [e2e:d41] the specifications form never answered

expect(locator).toBeVisible() failed

Locator: getByTestId('post-specs').or(getByTestId('post-specs-none'))
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - [e2e:d41] the specifications form never answered with timeout 20000ms
  - waiting for getByTestId('post-specs').or(getByTestId('post-specs-none'))


  174 |       page.getByTestId("post-specs").or(page.getByTestId("post-specs-none")),
  175 |       "[e2e:d41] the specifications form never answered",
> 176 |     ).toBeVisible({ timeout: 20_000 });
      |       ^
  177 |     const form = page.getByTestId("post-specs");
  178 |     if ((await form.count()) > 0) {
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: [posting] schema read failed: TypeError: Failed to fetch
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-42-Amharic-catalog-text-falls-back-field-by-field-mobile-360` — Playwright's name `post-wizard-specs-POSTING--2f428-t-falls-back-field-by-field-mobile-360`; this run carried 8 context file(s); of the same spec: none

### post-wizard-where.spec.ts › POSTING WIZARD — where the ad is shown (W6b-1) › PW-97 the map credit is visible and uncovered on both plans

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /logout?scope=global failed (504): upstream request timeout
--- further error 1 ---
Error: [e2e:setup] POST /logout?scope=global failed (504): upstream request timeout

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at reapPoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:392:3)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:404:3)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at signedInSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:94:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-where.spec.ts:665:18
```

Context: context file not found for `post-wizard-where-POSTING-WIZARD-where-the-ad-is-shown-W6b-1-PW-97-the-map-credit-is-visible-and-uncovered-on-both-plans-mobile-360` — Playwright's name `post-wizard-where-POSTING--b3733-and-uncovered-on-both-plans-mobile-360`; this run carried 8 context file(s); of the same spec: none

### admin-translations-console.spec.ts › U4b translations console › TR-7b sync after a step-up prompt still reports its counts

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] role super_admin not found: no row
--- further error 1 ---
Error: [e2e:pool] role super_admin not found: no row

   at helpers/ui.ts:791

  789 |     .single();
  790 |   if (roleError || !role) {
> 791 |     throw new Error(`[e2e:pool] role super_admin not found: ${roleError?.message ?? "no row"}`);
      |           ^
  792 |   }
  793 |   const { error } = await supabase
  794 |     .from("user_roles")
    at mintPrivateSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:791:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-console.spec.ts:344:32
```

Context: context file not found for `admin-translations-console-U4b-translations-console-TR-7b-sync-after-a-step-up-prompt-still-reports-its-counts-desktop-1280` — Playwright's name `admin-translations-console-5e339-pt-still-reports-its-counts-desktop-1280`; this run carried 8 context file(s); of the same spec: none

### legal-certify.spec.ts › Legal certification › LG-21 the statement is certified once per ad: edits, renewals and photos ask again only for a new version

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: {"ok":false,"refusals":[{"field":"door","reason":"doorError"}]}

expect(received).toBe(expected) // Object.is equality

Expected: "screening"
Received: undefined

  640 |       { token, country: "ET" },
  641 |     );
> 642 |     expect(published.payload["status"], JSON.stringify(published.payload)).toBe("screening");
      |                                                                            ^
  643 |     expect((await certificationsOf(a)).map((row) => row["action"])).toEqual(["publish"]);
  644 |     await makeState(a, "active");
  645 |     const me = await asPerson(seller);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-certify.spec.ts:642:76
```

Context:

```text
          - listitem [ref=e558]:
            - generic [ref=e559]: About
          - listitem [ref=e560]:
            - generic [ref=e561]: Contact
      - navigation "Help" [ref=e562]:
        - heading "Help" [level=2] [ref=e563]
        - list [ref=e564]:
          - listitem [ref=e565]:
            - generic [ref=e566]: Safety
      - navigation "Legal" [ref=e567]:
        - heading "Legal" [level=2] [ref=e568]
        - list [ref=e569]:
          - listitem [ref=e570]:
            - link "Terms" [ref=e571] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e572]:
            - link "Privacy" [ref=e573] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e575]: © 2026 ethio.com — All rights reserved.
```
```

### post-wizard-resets.spec.ts › POSTING WIZARD › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r167_1792464895162_6208jy_model"]')
Expected: "ready"
Received: "loading"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r167_1792464895162_6208jy_model"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_r167_1792464895162_6208jy_model" id="post-attr-e2e_r167_1792464895162_6208jy_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "loading"

--- further error 1 ---
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('[data-testid="post-attr-control"][data-attr="e2e_r167_1792464895162_6208jy_model"]')
Expected: "ready"
Received: "loading"
Timeout:  20000ms

Call log:
  - Expect "toHaveAttribute" with timeout 20000ms
  - waiting for locator('[data-testid="post-attr-control"][data-attr="e2e_r167_1792464895162_6208jy_model"]')
    24 × locator resolved to <select data-locked="0" data-waiting="0" data-options="loading" data-testid="post-attr-control" data-attr="e2e_r167_1792464895162_6208jy_model" id="post-attr-e2e_r167_1792464895162_6208jy_model" class="min-h-11 w-full rounded-md border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input">…</select>
       - unexpected value "loading"


  1281 |     const picker = ruleControl(page, attrKey);
  1282 |     if ((await picker.getAttribute("data-options")) === "idle") await picker.focus();
> 1283 |     await expect(picker).toHaveAttribute("data-options", "ready", { timeout: 20_000 });
       |                          ^
  1284 |     await picker.selectOption(value);
  1285 |   }
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-167-a-seller-s-year-inside-the-new-model-s-bounds-is-kept-one-outside-is-cleared-with-the-Undo-offer-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-81aef-cleared-with-the-Undo-offer-desktop-1280`; this run carried 8 context file(s); of the same spec: none

- post-wizard-specs.spec.ts › POSTING WIZARD › PW-16 typing is saved without judgement; only Next asks the door to judge the step · `desktop-1280` · source `shard 6` — body omitted: cap

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

119 line(s), 38 message(s): 3 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `upstream returned an HTML error page (<n>)` | 10 | shard 1, shard 4, shard 5 |
| `listing not found` | 8 | shard 3, shard 5, shard 6 |
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
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-khuarr: e<n>e_par_j<n>zmpj → e<n>e_chi_<n>tln<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ww<n>yda: e<n>e_par_<n>j<n>j<n> → e<n>e_chi_<n>xojfg` (quiet) | 1 | shard 4 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-khuarr: e<n>e_par_j<n>zmpj → e<n>e_chi_<n>tln<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-ww<n>yda: e<n>e_par_<n>j<n>j<n> → e<n>e_chi_<n>xojfg ×1

Off the allowlist:

### upstream returned an HTML error page (<n>)

- Count: 10 · Sources: shard 1, shard 4, shard 5
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: ×6 · PW-54 the wizard walks category, specifications, photos, details and resumes at  ×4 · TR-24 the Data scope machine-translates one row and then every untranslated one ×4 · SC-15 a reviewer with no second factor opens the preview and Show number shows t ×2 · TR-24 the Data scope machine-translates one row and then every untranslated one  ×2 · TR-8 save then approve moves a string through the status machine ×2

```text
[WebServer] [ssr-error] /api/i18n upstream returned an HTML error page (520)
```

### listing not found

- Count: 8 · Sources: shard 3, shard 5, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): admin tables never overflow horizontally ×1 · LB-1 bands and bars lift without hard borders ×1 · LG-10 admin_legal_documents lists a scratch document with each version's publish ×1 · LG-21 the statement is certified once per ad: edits, renewals and photos ask aga ×1 · LY-6 at 360 the open currency list is above the sticky action bar ×1 · PW-139 a category with no unit still asks Volume on the specifications page (bun ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### auth upstream unavailable (<n>)

- Count: 1 · Sources: shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-16 typing is saved without judgement; only Next asks the door to judge the st ×1 · PW-167 a seller's year inside the new model's bounds is kept; one outside is cle ×1

```text
[WebServer] [ssr-error] /api/attributes/6e121333-ded5-48ff-98d0-8b5fc8e8848e/options auth upstream unavailable (504)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-20T02:32:48.328Z | 24.0 min |
| email | 2026-10-20T02:32:55.608Z | 0.3 min |
| shard 1 | 2026-10-20T02:32:46.743Z | 51.3 min |
| shard 2 | 2026-10-20T02:32:47.020Z | 46.3 min |
| shard 3 | 2026-10-20T02:32:53.979Z | 39.4 min |
| shard 4 | 2026-10-20T02:32:46.204Z | 50.7 min |
| shard 5 | 2026-10-20T02:32:48.511Z | 49.6 min |
| shard 6 | 2026-10-20T02:33:04.357Z | 46.2 min |
| changed | 2026-10-20T02:32:57.987Z | 19.2 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `ad-page.spec.ts` | 136 | 68.4 min | shard 1, shard 4, changed |
| `post-wizard-specs.spec.ts` | 82 | 31.5 min | shard 3, shard 6 |
| `shell.spec.ts` | 424 | 27.8 min | smoke, shard 3, shard 6 |
| `photo-pipeline.spec.ts` | 66 | 24.1 min | shard 2, shard 5 |
| `admin-listings.spec.ts` | 62 | 21.6 min | shard 1, shard 4 |
| `post-wizard-pricing.spec.ts` | 52 | 21.1 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 80 | 18.7 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 17.8 min | shard 3, shard 6 |
| `post-wizard-bundle2.spec.ts` | 70 | 17.6 min | shard 2, shard 5 |
| `post-wizard-resets.spec.ts` | 34 | 17.2 min | shard 3, shard 6 |
| `feed-screens.spec.ts` | 36 | 15.7 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 15.1 min | shard 1, shard 4 |
| `my-listings-ad.spec.ts` | 36 | 14.7 min | shard 2, shard 5 |
| `admin-categories-lifecycle.spec.ts` | 52 | 14.4 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 13.7 min | smoke, shard 2, shard 5 |
| `ad-page-doors.spec.ts` | 30 | 13.5 min | shard 1, shard 4 |
| `post-wizard-where.spec.ts` | 32 | 13.5 min | shard 3, shard 6 |
| `admin-attributes-library.spec.ts` | 42 | 12.2 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 11.7 min | shard 2, shard 5 |
| `admin-attributes-links.spec.ts` | 34 | 11.0 min | shard 1, shard 4 |
| `legal-certify.spec.ts` | 26 | 10.0 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 36 | 9.6 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.3 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 16 | 9.3 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 9.2 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 9.2 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 8.7 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.5 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.0 min | shard 2, shard 5 |
| `admin-locations.spec.ts` | 38 | 7.6 min | shard 1, shard 4 |
| `legal-doors.spec.ts` | 28 | 7.4 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 7.3 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 7.2 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.8 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 6.6 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 6.5 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 6.0 min | shard 1, shard 5 |
| `admin-roles.spec.ts` | 26 | 6.0 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 4.9 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 4.2 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 3.9 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `legal-admin.spec.ts` | 16 | 3.3 min | shard 2, shard 5 |
| `post-wizard-details.spec.ts` | 8 | 3.2 min | shard 3, shard 6 |
| `mfa-stepup.spec.ts` | 18 | 3.2 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.8 min | shard 3, shard 6 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.7 min | shard 3, shard 6 |
| `admin-coverage.spec.ts` | 16 | 2.3 min | shard 1, shard 4 |
| `legal-accept.spec.ts` | 8 | 2.2 min | shard 2, shard 5 |
| `breadcrumbs.spec.ts` | 6 | 2.2 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 12 | 2.1 min | shard 1, shard 4 |
| `posting-routes-identity.spec.ts` | 4 | 1.7 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.5 min | shard 2, shard 5 |
| `legal-history.spec.ts` | 6 | 1.4 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.4 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 1.3 min | shard 3, shard 6 |
| `post-wizard-units.spec.ts` | 4 | 1.3 min | shard 3, shard 6 |
| `i18n-coverage.spec.ts` | 14 | 1.2 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.2 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 1.0 min | smoke |
| `locations-tree.spec.ts` | 8 | 0.9 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.9 min | smoke, shard 3, shard 6 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `admin-services.spec.ts` | 10 | 0.8 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `settings.spec.ts` | 4 | 0.6 min | shard 3 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `legal-pages.spec.ts` | 6 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.2 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `admin-translations-data.spec.ts` › TR-24 the Data scope machine-translates one row and then every untranslated one | mobile-360 | 236.7 s |
| `post-wizard-resets.spec.ts` › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer | desktop-1280 | 94.7 s |
| `post-wizard-specs.spec.ts` › PW-16 typing is saved without judgement; only Next asks the door to judge the step | desktop-1280 | 92.6 s |
| `admin-screening.spec.ts` › SC-26 Edit from the preview, the title corrected, Reject from the Edit's Review: the confirm asks, the queue says Rejected, the ad is rejected (D188) | mobile-360 | 92.3 s |
| `my-listings-ad.spec.ts` › MLA-1 my_listing: the seller's own ad with the list's row, its group, the status it reopens to and the renew setting; nobody else's | mobile-360 | 92.3 s |
| `admin-screening.spec.ts` › SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129) | desktop-1280 | 82.6 s |
| `legal-certify.spec.ts` › LG-21 the statement is certified once per ad: edits, renewals and photos ask again only for a new version | desktop-1280 | 82.3 s |
| `post-wizard-specs.spec.ts` › PW-42 Amharic catalog text falls back field by field | mobile-360 | 82.2 s |
| `admin-attributes-safety.spec.ts` › AT-75 the import preview names the holders of an unlinked question and a removed answer | mobile-360 | 80.1 s |
| `post-wizard-where.spec.ts` › PW-97 the map credit is visible and uncovered on both plans | mobile-360 | 74.8 s |
| `admin-audit.spec.ts` › IMP-2 dual-actor audit: start and end are both recorded | mobile-360 | 70.8 s |
| `ad-page.spec.ts` › AP-40 an address never reveals: only the visitor's own tap does (D201 §14) | desktop-1280 | 66.6 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 65.9 s |
| `admin-categories-lifecycle.spec.ts` › CT-42 the undo of an import removes a created chain and its guest link, whatever order its rows were stored in | mobile-360 | 65.4 s |
| `admin-translations-console.spec.ts` › TR-7b sync after a step-up prompt still reports its counts | desktop-1280 | 64.9 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39359380374-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39359380374-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 4, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 39359380374-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 37 (pool 4, fresh 33)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 51 user(s) owned by process 39359380374-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39359380374-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 39359380374-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39359380374-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39359380374-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 6 (pool 4, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39359380374-changed
```

## admin-translations-data.spec.ts › U4b translations console › TR-24 the Data scope machine-translates one row and then every untranslated one

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-translations-data')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-translations-data')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('admin-translations-data')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('admin-translations-data')


  311 |       // PER-ROW — seed exists before navigating, and is asserted rendered (J7).
  312 |       await gotoReady(page, `/admin/translations/${fence}?scope=data`);
> 313 |       await expect(page.getByTestId("admin-translations-data")).toBeVisible({ timeout: 20000 });
      |                                                                 ^
  314 |       await page.getByTestId("data-search").fill(one.name);
  315 |       const row = entityRow(page, `location-${one.id}-name`);
  316 |       await expect(row).toBeVisible({ timeout: 20000 });
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-translations-data.spec.ts:313:65
```

Context:

```text
          - listitem [ref=e299]:
            - generic [ref=e300]: About
          - listitem [ref=e301]:
            - generic [ref=e302]: Contact
      - navigation "Help" [ref=e303]:
        - heading "Help" [level=2] [ref=e304]
        - list [ref=e305]:
          - listitem [ref=e306]:
            - generic [ref=e307]: Safety
      - navigation "Legal" [ref=e308]:
        - heading "Legal" [level=2] [ref=e309]
        - list [ref=e310]:
          - listitem [ref=e311]:
            - link "Terms" [ref=e312] [cursor=pointer]:
              - /url: /terms
          - listitem [ref=e313]:
            - link "Privacy" [ref=e314] [cursor=pointer]:
              - /url: /privacy
    - paragraph [ref=e316]: © 2026 ethio.com — All rights reserved.
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-15 a reviewer with no second factor opens the preview and Show number shows the number in its row, logged once (D129)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s4a-000@ethio-e2e.invalid (listing ids) failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 521: Web server is down</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Web server is down</span>
                <span class="code-label">Error code 521</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_521&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-20 03:20:24 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s4a-000@ethio-e2e.invalid (listing ids) failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 521: Web server is down</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-15-a-reviewer-with-no-second-factor-opens-the-preview-and-Show-number-shows-the-number-in-its-row-logged-once-D129-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-7c2dd-n-its-row-logged-once-D129--desktop-1280`; this run carried 8 context file(s); of the same spec: `admin-screening-ADMIN-SCRE-f00ec-ed-the-ad-is-rejected-D188--mobile-360`, `admin-screening-ADMIN-SCRE-7c2dd-n-its-row-logged-once-D129--desktop-1280-retry1`

## post-wizard-category.spec.ts › POSTING WIZARD › PW-54 the wizard walks category, specifications, photos, details and resumes at the first unfinished step

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: PW-54: draft_step 1 must open specifications

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-3')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-54: draft_step 1 must open specifications with timeout 20000ms
  - waiting for getByTestId('post-step-3')

--- further error 1 ---
Error: PW-54: draft_step 1 must open specifications

expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-3')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - PW-54: draft_step 1 must open specifications with timeout 20000ms
  - waiting for getByTestId('post-step-3')


  775 |     const opensAt = async (id: string, testId: string, why: string) => {
  776 |       await gotoReady(page, `/post/${id}`);
> 777 |       await expect(page.getByTestId(testId), why).toBeVisible({ timeout: 20_000 });
      |                                                   ^
  778 |     };
  779 |
--- further error 2 ---
Error: [e2e:reap] listings of seller 9dac02e1-cdf4-44a3-9550-873013dd59e0 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 521: Web server is down</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-54-the-wizard-walks-category-specifications-photos-details-and-resumes-at-the-first-unfinished-step-desktop-1280` — Playwright's name `post-wizard-category-POSTI-75ef6-t-the-first-unfinished-step-desktop-1280`; this run carried 8 context file(s); of the same spec: none

## post-wizard-category.spec.ts › POSTING WIZARD › PW-71 the category group wears the soft border until a leaf is chosen (D71)

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s5a-000@ethio-e2e.invalid (listing revisions) failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 521: Web server is down</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
                <span class="inline-block">Web server is down</span>
                <span class="code-label">Error code 521</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_521&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-20 03:20:49 UTC</div>
        </header>
        <div class="my-8 bg-gradient-gray">
            <div class="w-240 lg:w-full mx-auto">
                <div class="clearfix md:px-8">
                    <div id="cf-browser-status" class=" relative w-1/3 md:w-full py-15 md:p-0 md:py-8 md:text-left md:border-solid md:border-0 md:border-b md:border-gray-400 overflow-hidden float-left md:float-none text-center">
  <div class="relative mb-10 md:m-0">
    
    <span class="cf-icon-browser block md:hidden h-20 bg-center bg-no-repeat"></span>
    <span class="cf-icon-ok w-12 h-12 absolute left-1/2 md:left-auto md:right-0 md:top-0 -ml-6 -bottom-4"></span>
    
  </div>
  <span class="md:block w-full truncate">You</span>
  <h3 class="md:inline-block mt-3 md:mt-0 text-2xl text-gray-600 font-light leading-1.3">
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s5a-000@ethio-e2e.invalid (listing revisions) failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 521: Web server is down</title>
<meta charset="UTF-8" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta name="robots" content="noindex, nofollow" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="stylesheet" id="cf_styles-css" href="/cdn-cgi/styles/main.css" />
</head>
<body>
<div id="cf-wrapper">
    <div id="cf-error-details" class="p-0">
        <header class="mx-auto pt-10 lg:pt-6 lg:px-8 w-240 lg:w-full mb-8">
            <h1 class="inline-block sm:block sm:mb-2 font-light text-60 lg:text-4xl text-black-dark leading-tight mr-2">
```

Context: context file not found for `post-wizard-category-POSTING-WIZARD-PW-71-the-category-group-wears-the-soft-border-until-a-leaf-is-chosen-D71-desktop-1280` — Playwright's name `post-wizard-category-POSTI-8625e-until-a-leaf-is-chosen-D71--desktop-1280`; this run carried 8 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-3-khuarr: e2e_par_j4zmpj → e2e_chi_7tln26
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/i18n upstream returned an HTML error page (520) ×2
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (521)
[WebServer] [ssr-error] /api/feed upstream returned an HTML error page (521)
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (521)
[WebServer] [ssr-error] /api/feed upstream returned an HTML error page (521)
```

## Client errors: shard 1

```text
[client-error] console.error: Failed to load resource: the server responded with a status of 503 ()
[client-error] HTTP 503 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation ({"code":"PGRST002","details":null,"hint":null,"message":"Could not query the database for the schema cache. Retrying."})
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/my_legal_status' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/my_viewing_location' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_my_permissions' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: [client-error] legal gate read failed
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_my_permissions' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway) ×2
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-0-ww8yda: e2e_par_9j4j27 → e2e_chi_4xojfg
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (521)
[WebServer] [ssr-error] /api/feed upstream returned an HTML error page (521)
```

## Client errors: shard 4

```text
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_entity_bundle' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/token?grant_type=password' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
```

## Server errors: shard 5

```text
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
[WebServer] [ssr-error] /api/listings/publish listing not found
[WebServer] [ssr-error] /api/i18n upstream returned an HTML error page (520)
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (520)
```

## Client errors: shard 5

```text
[client-error] console.error: [client-error] gate fetch threw
console.error: [client-error] gate fetch threw
```
