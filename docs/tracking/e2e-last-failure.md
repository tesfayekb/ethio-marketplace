# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39211965526
- Commit: `0c7d5c75ee9604037eb909b089e24b8626e815b7`
- Attempt: 1
- Written (UTC): 2026-10-19T08:05:02.927Z
- Passed: 2228 · Skipped: 216 · Failed: 47
- Gating failures: 47 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 9
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `desktop-1280` · source `smoke` · shell.spec.ts › top band law (bundle 21 turn 2) › TB-1 the corner and the band line up — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it — Error: [e2e:pool] reaping e2e-pool-s1a-010@ethio-e2e.invalid (listing revisions) failed: <!DOCTYPE html>
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-5 The price applies at once; Price reduced only for a real drop on a price that stood (D173, D174, D177) — Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: A user with this email address has already been registered (lookup: {})
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-attributes-library.spec.ts › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag — Error: [e2e:setup] POST /token?grant_type=password failed (503): upstream connect error or disconnect/reset before headers. retried and the latest reset reason: remote connection failure, transport failure reason: delayed connect error: 111
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · mfa-stepup.spec.ts › U1f step-up authentication › MF-1 enroll: QR + secret shown, a generated code activates the factor — Error: [e2e:users] admin.createUser failed for e2e+39211965526-5-12-2-jlpbzp@ethio-e2e.invalid: {}
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-units.spec.ts › POSTING WIZARD — UNITS › PW-161 a number's unit reads in English, and in Amharic under Amharic — Error: [e2e:c1b] seeding the spec set failed: <!DOCTYPE html>
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181) — Error: [e2e:pool] creating pool account e2e-pool-schangeda-010@ethio-e2e.invalid failed: {} (lookup: {})
- FLAKY (passed on retry) · `desktop-1280` · source `changed` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-130 a refused seller name offers three free names, claimed on save — Error: [e2e:seller] confirming user_directory failed: <!DOCTYPE html>
- FLAKY (passed on retry) · `mobile-360` · source `changed` · shell.spec.ts › FV-1 one device favourite leads every main list and survives reload — Error: expect(received).toBeLessThanOrEqual(expected)

## Flaky bodies (DEC-078)

### shell.spec.ts › top band law (bundle 21 turn 2) › TB-1 the corner and the band line up

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('app-rail').getByTestId('rail-scroll').getByTestId('rail-category-electronics')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('app-rail').getByTestId('rail-scroll').getByTestId('rail-category-electronics')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('app-rail').getByTestId('rail-scroll').getByTestId('rail-category-electronics')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('app-rail').getByTestId('rail-scroll').getByTestId('rail-category-electronics')


  3368 |         .getByTestId("rail-scroll")
  3369 |         .getByTestId("rail-category-electronics");
> 3370 |       await expect(row).toBeVisible();
       |                         ^
  3371 |       for (const folded of [false, true]) {
  3372 |         if (folded) await toggle.click();
  3373 |         await expect(page.locator("html")).toHaveAttribute(
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3370:25
--- client errors of this attempt (DEC-177) ---
[client-error] console.error: Failed to load resource: the server responded with a status of 503 ()
[client-error] HTTP 503 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_entity_bundle ({"code":"PGRST002","details":null,"hint":null,"message":"Could not query the database for the schema cache. Retrying."})
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] console.error: Failed to load resource: the server responded with a status of 503 ()
[client-error] HTTP 503 GET https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/languages?select=code,name_en,name_native,rtl,sort&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc ({"code":"PGRST002","details":null,"hint":null,"message":"Could not query the database for the schema cache. Retrying."})
[client-error] console.error: [client-error] gate fetch failed 503 {"code":"PGRST002","details":null,"hint":null,"message":"Could not query the database for the schema cache. Retrying."}
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] console.error: Failed to load resource: the server responded with a status of 503 ()
[client-error] HTTP 503 GET https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/languages?select=code,name_en,name_native,rtl,sort&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc ({"code":"PGRST002","details":null,"hint":null,"message":"Could not query the database for the schema cache. Retrying."})
[client-error] console.error: [client-error] gate fetch retry failed 503 {"code":"PGRST002","details":null,"hint":null,"message":"Could not query the database for the schema cache. Retrying."}
[client-error] console.error: Failed to load resource: the server responded with a status of 503 ()
[client-error] HTTP 503 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_ui_bundle ({"code":"PGRST002","details":null,"hint":null,"message":"Could not query the database for the schema cache. Retrying."})
```

Context:

```text
        - heading "Company" [level=2] [ref=e107]
        - list [ref=e108]:
          - listitem [ref=e109]:
            - generic [ref=e110]: About
          - listitem [ref=e111]:
            - generic [ref=e112]: Contact
      - navigation "Help" [ref=e113]:
        - heading "Help" [level=2] [ref=e114]
        - list [ref=e115]:
          - listitem [ref=e116]:
            - generic [ref=e117]: Safety
      - navigation "Legal" [ref=e118]:
        - heading "Legal" [level=2] [ref=e119]
        - list [ref=e120]:
          - listitem [ref=e121]:
            - generic [ref=e122]: Terms
          - listitem [ref=e123]:
            - generic [ref=e124]: Privacy
    - paragraph [ref=e126]: © 2026 ethio.com — All rights reserved.
```
```

### admin-audit.spec.ts › U3 audit & security › IMP-1 impersonation: super admin opens a read-only session and ends it

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s1a-010@ethio-e2e.invalid (listing revisions) failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 525: SSL handshake failed</title>
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
                <span class="inline-block">SSL handshake failed</span>
                <span class="code-label">Error code 525</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_525&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-19 07:33:22 UTC</div>
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
Error: [e2e:pool] reaping e2e-pool-s1a-010@ethio-e2e.invalid (listing revisions) failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 525: SSL handshake failed</title>
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
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-K3--KupY.js:83:25) at http://127.0.0.1:4173/assets/feed-K3--KupY.js:117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CO61j1TC.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5)
```

Context:

```text
        - heading "Company" [level=2] [ref=e248]
        - list [ref=e249]:
          - listitem [ref=e250]:
            - generic [ref=e251]: About
          - listitem [ref=e252]:
            - generic [ref=e253]: Contact
      - navigation "Help" [ref=e254]:
        - heading "Help" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Safety
      - navigation "Legal" [ref=e259]:
        - heading "Legal" [level=2] [ref=e260]
        - list [ref=e261]:
          - listitem [ref=e262]:
            - generic [ref=e263]: Terms
          - listitem [ref=e264]:
            - generic [ref=e265]: Privacy
    - paragraph [ref=e267]: © 2026 ethio.com — All rights reserved.
```
```

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-5 The price applies at once; Price reduced only for a real drop on a price that stood (D173, D174, D177)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: A user with this email address has already been registered (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-010@ethio-e2e.invalid failed: A user with this email address has already been registered (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:403:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:219:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:595:20
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-5-The-price-applies-at-once-Price-reduced-only-for-a-real-drop-on-a-price-that-stood-D173-D174-D177-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-0574b--that-stood-D173-D174-D177--mobile-360`; this run carried 21 context file(s); of the same spec: none

### admin-attributes-library.spec.ts › C3 attributes console › AT-4 card picker: two ranked attributes clear the amber flag

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (503): upstream connect error or disconnect/reset before headers. retried and the latest reset reason: remote connection failure, transport failure reason: delayed connect error: 111
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (503): upstream connect error or disconnect/reset before headers. retried and the latest reset reason: remote connection failure, transport failure reason: delayed connect error: 111

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at freshAal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:828:17)
    at useJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:947:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-library.spec.ts:178:24
```

Context: context file not found for `admin-attributes-library-C3-attributes-console-AT-4-card-picker-two-ranked-attributes-clear-the-amber-flag-desktop-1280` — Playwright's name `admin-attributes-library-C-8a032-ibutes-clear-the-amber-flag-desktop-1280`; this run carried 21 context file(s); of the same spec: `admin-attributes-library-C-88092-ratch-category-and-unlinked-desktop-1280`

### mfa-stepup.spec.ts › U1f step-up authentication › MF-1 enroll: QR + secret shown, a generated code activates the factor

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:users] admin.createUser failed for e2e+39211965526-5-12-2-jlpbzp@ethio-e2e.invalid: {}
--- further error 1 ---
Error: [e2e:users] admin.createUser failed for e2e+39211965526-5-12-2-jlpbzp@ethio-e2e.invalid: {}

   at helpers/users.ts:69

  67 |   });
  68 |   if (error || !data?.user?.id) {
> 69 |     throw new Error(
     |           ^
  70 |       `[e2e:users] admin.createUser failed for ${email}: ${error?.message ?? "no user id returned"}`,
  71 |     );
  72 |   }
    at createUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:69:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/mfa-stepup.spec.ts:110:21
```

Context: context file not found for `mfa-stepup-U1f-step-up-authentication-MF-1-enroll-QR-secret-shown-a-generated-code-activates-the-factor-desktop-1280` — Playwright's name `mfa-stepup-U1f-step-up-aut-adfd8-d-code-activates-the-factor-desktop-1280`; this run carried 21 context file(s); of the same spec: none

### post-wizard-units.spec.ts › POSTING WIZARD — UNITS › PW-161 a number's unit reads in English, and in Amharic under Amharic

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:c1b] seeding the spec set failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 525: SSL handshake failed</title>
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
                <span class="inline-block">SSL handshake failed</span>
                <span class="code-label">Error code 525</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_525&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-19 07:33:22 UTC</div>
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
Error: [e2e:c1b] seeding the spec set failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 525: SSL handshake failed</title>
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
--- further error 2 ---
Error: [e2e:reap] listings of seller 98a3f97f-2250-430b-9621-9b73c619cb2f failed: <!DOCTYPE html>
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

Context: context file not found for `post-wizard-units-POSTING-WIZARD-UNITS-PW-161-a-number-s-unit-reads-in-English-and-in-Amharic-under-Amharic-desktop-1280` — Playwright's name `post-wizard-units-POSTING--ff0d2-nd-in-Amharic-under-Amharic-desktop-1280`; this run carried 21 context file(s); of the same spec: none

### my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-5 my_listings: the search, the filters and the renew setting; the counts follow them (D181)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-schangeda-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-schangeda-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:403:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:170:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:512:21
```

Context: context file not found for `my-listings-page-MY-LISTINGS-the-list-page-bundle-16-turn-2-MLP-5-my_listings-the-search-the-filters-and-the-renew-setting-the-counts-follow-them-D181-desktop-1280` — Playwright's name `my-listings-page-MY-LISTIN-68d07-he-counts-follow-them-D181--desktop-1280`; this run carried 21 context file(s); of the same spec: none

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-130 a refused seller name offers three free names, claimed on save

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:seller] confirming user_directory failed: <!DOCTYPE html>
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
            <div class="mt-3">2026-10-19 07:33:22 UTC</div>
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
Error: [e2e:seller] confirming user_directory failed: <!DOCTYPE html>
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

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-130-a-refused-seller-name-offers-three-free-names-claimed-on-save-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-43a9f--free-names-claimed-on-save-desktop-1280`; this run carried 21 context file(s); of the same spec: none

### shell.spec.ts › FV-1 one device favourite leads every main list and survives reload

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34
--- further error 1 ---
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    34

  3808 |         const paintedBox = await strip.getByTestId(`strip-category-${mainSlug}`).boundingBox();
  3809 |         if (!menuBox || !paintedBox) throw new Error(`FV-1 missing ${mainSlug} bounds`);
> 3810 |         expect(Math.abs(menuBox.y - paintedBox.y)).toBeLessThanOrEqual(1);
       |                                                    ^
  3811 |       }
  3812 |       await page.getByTestId("rail-menu-close").click();
  3813 |     }
    at checkFavourite (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3810:52)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:3815:3
```

Context:

```text
        - heading "Company" [level=2] [ref=e494]
        - list [ref=e495]:
          - listitem [ref=e496]:
            - generic [ref=e497]: About
          - listitem [ref=e498]:
            - generic [ref=e499]: Contact
      - navigation "Help" [ref=e500]:
        - heading "Help" [level=2] [ref=e501]
        - list [ref=e502]:
          - listitem [ref=e503]:
            - generic [ref=e504]: Safety
      - navigation "Legal" [ref=e505]:
        - heading "Legal" [level=2] [ref=e506]
        - list [ref=e507]:
          - listitem [ref=e508]:
            - generic [ref=e509]: Terms
          - listitem [ref=e510]:
            - generic [ref=e511]: Privacy
    - paragraph [ref=e513]: © 2026 ethio.com — All rights reserved.
```
```

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (9 of 9 results files read, 9 of 9 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

124 line(s), 42 message(s): 7 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `Could not query the database for the schema cache. Retrying.` | 8 | smoke, shard 5 |
| `listing not found` | 8 | shard 3, shard 6 |
| `categories badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `categories wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `category-images: no GEMINI_API_KEY — fake mode` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions badHeader` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `definitions wrongFile` (quiet) | 4 | shard 1, shard 2, shard 4, shard 5 |
| `export_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `preview_failed permission denied` (quiet) | 4 | shard 1, shard 4 |
| `upstream returned an HTML error page (<n>)` | 3 | shard 4, shard 5 |
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
| `gate fetch failed <n>` | 2 | smoke |
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
| `auth upstream unavailable (<n>)` | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>pehxo: e<n>e_par_<n>tifrl → e<n>e_chi_<n>thzg` (quiet) | 1 | shard 4 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-f<n>ny<n>w: e<n>e_par_<n>ayh<n>u → e<n>e_chi_<n>h<n>f<n>` (quiet) | 1 | shard 1 |
| `residency: upstream returned an HTML error page (<n>)` | 1 | shard 6 |
| `submit_listing: upstream unavailable (<n>)` | 1 | shard 6 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-<n>pehxo: e<n>e_par_<n>tifrl → e<n>e_chi_<n>thzg ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-f<n>ny<n>w: e<n>e_par_<n>ayh<n>u → e<n>e_chi_<n>h<n>f<n> ×1

Off the allowlist:

### Could not query the database for the schema cache. Retrying.

- Count: 8 · Sources: smoke, shard 5
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): TB-1 the corner and the band line up ×7 · TB-1 the corner and the band line up (retry #1) ×7 · LR-4 the payload carries the eleven read fields and nothing else (retry #1) ×1 · MF-1 enroll: QR + secret shown, a generated code activates the factor @private-i ×1

```text
[WebServer] [ssr-error] /api/locations Could not query the database for the schema cache. Retrying.
```

### listing not found

- Count: 8 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×2 · PW-49 a prefill-only fact keeps its input while a settled one does not ×2 · /settings shows the Account context, and returning shows categories ×1 · PW-137 Pieces per Pack shows with per pack and goes, with its value, on another  ×1 · PW-17 the currency is preselected and searchable by name in one control ×1 · PW-177 a question removed while the form is open never blocks the next edits ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### upstream returned an HTML error page (<n>)

- Count: 3 · Sources: shard 4, shard 5
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AT-3 link manager: an attribute is linked to a scratch category and unlinked ×1 · AT-37 a delete after the file's own unlink is accepted and undone ×1 · LG-5 my_legal_status lists the version in force until accepted, again after a ma ×1 · LG-6 the settings doors: the seeded row for the super admin, refusals for every  ×1 · LR-3 a row disappears when an ancestor is retired, and the version moves ×1 · LR-4 the payload carries the eleven read fields and nothing else ×1

```text
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (520)
```

### gate fetch failed <n>

- Count: 2 · Sources: smoke
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): TB-1 the corner and the band line up ×2 · password visibility stays inside the full-width field ×1 · TB-1 the corner and the band line up (retry #1) ×1

```text
[WebServer] [ssr-error] /__root gate fetch failed 521
```

### auth upstream unavailable (<n>)

- Count: 1 · Sources: shard 4
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): AT-3 link manager: an attribute is linked to a scratch category and unlinked (re ×1 · AT-37 a delete after the file's own unlink is accepted and undone ×1

```text
[WebServer] [ssr-error] /api/admin/attributes/import auth upstream unavailable (521)
```

### residency: upstream returned an HTML error page (<n>)

- Count: 1 · Sources: shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-168 a chain: the brand changes, the model it no longer offers is cleared and  ×2

```text
[WebServer] [ssr-error] /api/listings/draft residency: upstream returned an HTML error page (520)
```

### submit_listing: upstream unavailable (<n>)

- Count: 1 · Sources: shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-168 a chain: the brand changes, the model it no longer offers is cleared and  ×2

```text
[WebServer] [ssr-error] /api/listings/draft submit_listing: upstream unavailable (521)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6, changed · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-19T07:12:40.848Z | 21.2 min |
| email | 2026-10-19T07:12:45.525Z | 0.2 min |
| shard 1 | 2026-10-19T07:12:44.233Z | 43.1 min |
| shard 2 | 2026-10-19T07:12:35.179Z | 41.1 min |
| shard 3 | 2026-10-19T07:12:47.286Z | 44.3 min |
| shard 4 | 2026-10-19T07:12:42.272Z | 52.0 min |
| shard 5 | 2026-10-19T07:12:41.991Z | 48.4 min |
| shard 6 | 2026-10-19T07:12:40.915Z | 42.6 min |
| changed | 2026-10-19T07:12:50.389Z | 31.3 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `post-wizard-bundle2.spec.ts` | 140 | 46.4 min | shard 2, shard 5, changed |
| `shell.spec.ts` | 636 | 41.0 min | smoke, shard 3, shard 6, changed |
| `post-wizard-specs.spec.ts` | 82 | 33.5 min | shard 3, shard 6 |
| `ad-page.spec.ts` | 68 | 29.5 min | shard 1, shard 4 |
| `photo-pipeline.spec.ts` | 66 | 25.6 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 21.7 min | shard 3, shard 6 |
| `admin-listings.spec.ts` | 62 | 19.9 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 32 | 19.6 min | shard 2, shard 5, changed |
| `posting-routes.spec.ts` | 80 | 18.5 min | shard 3, shard 6 |
| `post-wizard-place.spec.ts` | 38 | 18.4 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 18.2 min | shard 3, shard 6 |
| `my-listings-ad.spec.ts` | 36 | 15.6 min | shard 2, shard 5 |
| `my-listings-doors.spec.ts` | 28 | 15.2 min | shard 2, shard 5 |
| `feed-screens.spec.ts` | 36 | 14.7 min | shard 2, shard 5 |
| `post-wizard-where.spec.ts` | 32 | 13.4 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 13.1 min | shard 1, shard 4 |
| `admin-screening.spec.ts` | 52 | 13.1 min | shard 1, shard 4 |
| `ad-page-doors.spec.ts` | 30 | 13.0 min | shard 1, shard 4 |
| `auth-signout.spec.ts` | 56 | 12.8 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 12.6 min | shard 1, shard 4 |
| `legal-doors.spec.ts` | 32 | 12.0 min | shard 2, shard 5, changed |
| `admin-attributes-links.spec.ts` | 34 | 11.6 min | shard 1, shard 4 |
| `admin-categories-console.spec.ts` | 34 | 9.7 min | shard 1, shard 4 |
| `admin-attributes-editor.spec.ts` | 36 | 9.6 min | shard 1, shard 4 |
| `admin-users.spec.ts` | 28 | 9.0 min | shard 2, shard 5 |
| `admin-attributes-import.spec.ts` | 40 | 8.8 min | shard 1, shard 4 |
| `post-wizard-category.spec.ts` | 48 | 8.7 min | shard 2, shard 5 |
| `import-security.spec.ts` | 36 | 8.5 min | shard 2, shard 5 |
| `feed-index.spec.ts` | 30 | 8.4 min | shard 2, shard 5 |
| `posting-routes-catalog.spec.ts` | 18 | 7.5 min | shard 3, shard 6 |
| `admin-locations.spec.ts` | 38 | 7.5 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 7.2 min | shard 1, shard 4 |
| `feed-route.spec.ts` | 22 | 6.7 min | shard 2, shard 5 |
| `admin-translations-console.spec.ts` | 44 | 6.3 min | shard 1, shard 4 |
| `viewing-place.spec.ts` | 22 | 6.2 min | shard 3, shard 6 |
| `admin-audit.spec.ts` | 14 | 5.7 min | shard 1, shard 4 |
| `admin-roles.spec.ts` | 26 | 5.6 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 4.1 min | shard 3, shard 6 |
| `admin-countries.spec.ts` | 18 | 3.7 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 3.5 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.7 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `post-wizard-removed.spec.ts` | 4 | 2.7 min | shard 3, shard 6 |
| `admin-translations-data.spec.ts` | 8 | 2.7 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 2.4 min | shard 3, shard 6 |
| `post-wizard-details.spec.ts` | 8 | 2.4 min | shard 3, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.1 min | shard 1, shard 4 |
| `breadcrumbs.spec.ts` | 6 | 2.1 min | shard 2, shard 5 |
| `admin-shell.spec.ts` | 12 | 2.1 min | shard 1, shard 4 |
| `post-wizard-units.spec.ts` | 4 | 1.8 min | shard 3, shard 6 |
| `posting-routes-identity.spec.ts` | 4 | 1.6 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.6 min | shard 2, shard 5 |
| `category-image-routes.spec.ts` | 10 | 1.4 min | shard 2, shard 5 |
| `i18n-coverage.spec.ts` | 14 | 1.4 min | shard 2, shard 5 |
| `account-saved.spec.ts` | 4 | 1.4 min | shard 1, shard 4 |
| `post-wizard-recent.spec.ts` | 2 | 1.3 min | shard 3, shard 6 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.8 min | shard 1, shard 4 |
| `rbac.spec.ts` | 6 | 0.7 min | shard 3, shard 6 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `settings.spec.ts` | 4 | 0.7 min | shard 3 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `admin-services.spec.ts` | 10 | 0.6 min | shard 1, shard 4 |
| `category-nav.spec.ts` | 10 | 0.5 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-callback.spec.ts` | 4 | 0.1 min | shard 2 |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `my-listings-doors.spec.ts` › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175) | mobile-360 | 105.4 s |
| `post-wizard-specs.spec.ts` › PW-75 the required mark is uniform across steps (D72) | desktop-1280 | 105.1 s |
| `post-wizard-resets.spec.ts` › PW-165 a parent's change never touches a detail that depends on another parent | mobile-360 | 76.3 s |
| `post-wizard-bundle2.spec.ts` › PW-129 Next waits for the identity read instead of refusing | desktop-1280 | 74.3 s |
| `post-wizard-specs.spec.ts` › PW-74 a step-3 round trip keeps every answer (INC-329, big model list) | mobile-360 | 69.1 s |
| `my-listings-page.spec.ts` › MLP-2 The My listings page: the groups with their counts, each row's line, Continue on a draft (D138) | desktop-1280 | 67.2 s |
| `my-listings-page.spec.ts` › MLP-1 my_listings: the seller's own ads in six groups, newest change first, with their counts; nobody else's | desktop-1280 | 66.8 s |
| `admin-attributes-links.spec.ts` › AT-37 a delete after the file's own unlink is accepted and undone | desktop-1280 | 65.4 s |
| `admin-attributes-safety.spec.ts` › AT-73 Remove from a category names the listings that hold an answer, and removes | mobile-360 | 63.5 s |
| `photo-pipeline.spec.ts` › PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) | desktop-1280 | 63.2 s |
| `photo-pipeline.spec.ts` › PP-7 the eleventh photo is refused tooManyPhotos | desktop-1280 | 62.2 s |
| `admin-attributes-library.spec.ts` › AT-3 link manager: an attribute is linked to a scratch category and unlinked | desktop-1280 | 60.9 s |
| `my-listings-page.spec.ts` › MLP-3 My Listings opens its own page; signed out, the page asks to sign in | desktop-1280 | 60.4 s |
| `shell.spec.ts` › PN-1 an old own choice offers an unrelated same-market place, Keep and Switch | desktop-1280 | 59.4 s |
| `legal-doors.spec.ts` › LG-5 my_legal_status lists the version in force until accepted, again after a material version, and scopes country documents to the home country | desktop-1280 | 58.8 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39211965526-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39211965526-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 15 (pool 4, fresh 11)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 14 user(s) owned by process 39211965526-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 36 (pool 4, fresh 32)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 48 user(s) owned by process 39211965526-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39211965526-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 13 user(s) owned by process 39211965526-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39211965526-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39211965526-6
```

## Post-test errors: changed

changed: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 7 (pool 4, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39211965526-changed
```

## shell.spec.ts › mobile chrome › RL-1 the phone rail fills when its rows fit and scrolls when they do not, never overlapping

- Source: `smoke`
- Project: `mobile-360`

```text
Error: Admin strip: the rows do not fit yet the box does not scroll

expect(received).toBeGreaterThan(expected)

Expected: > 484
Received:   484
--- further error 1 ---
Error: Admin strip: the rows do not fit yet the box does not scroll

expect(received).toBeGreaterThan(expected)

Expected: > 484
Received:   484

  1082 |         metrics.scroll,
  1083 |         `${panel} ${variant}: the rows do not fit yet the box does not scroll`,
> 1084 |       ).toBeGreaterThan(metrics.client);
       |         ^
  1085 |       await box.evaluate((el) => {
  1086 |         el.scrollTop = el.scrollHeight;
  1087 |       });
    at checkVariant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1084:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1103:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: About
          - listitem [ref=e247]:
            - generic [ref=e248]: Contact
      - navigation "Help" [ref=e249]:
        - heading "Help" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Safety
      - navigation "Legal" [ref=e254]:
        - heading "Legal" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Terms
          - listitem [ref=e259]:
            - generic [ref=e260]: Privacy
    - paragraph [ref=e262]: © 2026 ethio.com — All rights reserved.
```
```

## shell.spec.ts › L4b location picker › PN-1 an old own choice offers an unrelated same-market place, Keep and Switch

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: [e2e:reap] location 108e2c47-97a7-4b06-ba44-025c2f0fe906 failed: <!DOCTYPE html>
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
            <div class="mt-3">2026-10-19 07:32:51 UTC</div>
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
Error: [e2e:reap] location 108e2c47-97a7-4b06-ba44-025c2f0fe906 failed: <!DOCTYPE html>
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

Context:

```text
        - heading "Company" [level=2] [ref=e360]
        - list [ref=e361]:
          - listitem [ref=e362]:
            - generic [ref=e363]: About
          - listitem [ref=e364]:
            - generic [ref=e365]: Contact
      - navigation "Help" [ref=e366]:
        - heading "Help" [level=2] [ref=e367]
        - list [ref=e368]:
          - listitem [ref=e369]:
            - generic [ref=e370]: Safety
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

## shell.spec.ts › L4b location picker › PN-2 recent own picks and the saved place's descendants show no notice

- Source: `smoke`
- Project: `desktop-1280`

```text
(no error message captured)
```

Context: context file not found for `shell-L4b-location-picker-PN-2-recent-own-picks-and-the-saved-place-s-descendants-show-no-notice-desktop-1280` — Playwright's name `shell-L4b-location-picker--5713b--descendants-show-no-notice-desktop-1280`; this run carried 21 context file(s); of the same spec: `shell-L4b-location-picker--13949-arket-place-Keep-and-Switch-desktop-1280`

## shell.spec.ts › in-place category menu (bundle 21 turn 5) › B21SC-2 SC-2 the persistent rail follows the URL and folds to main categories

- Source: `smoke`
- Project: `desktop-1280`

```text
Error: [e2e:reap] translations of e2e-cat-smoke-7-1wd15z-b failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 525: SSL handshake failed</title>
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
                <span class="inline-block">SSL handshake failed</span>
                <span class="code-label">Error code 525</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_525&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-19 07:33:22 UTC</div>
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
Error: [e2e:reap] translations of e2e-cat-smoke-7-1wd15z-b failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 525: SSL handshake failed</title>
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

Context:

```text
        - heading "Company" [level=2] [ref=e158]
        - list [ref=e159]:
          - listitem [ref=e160]:
            - generic [ref=e161]: About
          - listitem [ref=e162]:
            - generic [ref=e163]: Contact
      - navigation "Help" [ref=e164]:
        - heading "Help" [level=2] [ref=e165]
        - list [ref=e166]:
          - listitem [ref=e167]:
            - generic [ref=e168]: Safety
      - navigation "Legal" [ref=e169]:
        - heading "Legal" [level=2] [ref=e170]
        - list [ref=e171]:
          - listitem [ref=e172]:
            - generic [ref=e173]: Terms
          - listitem [ref=e174]:
            - generic [ref=e175]: Privacy
    - paragraph [ref=e177]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-73 Remove from a category names the listings that hold an answer, and removes

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - heading "Company" [level=2] [ref=e267]
        - list [ref=e268]:
          - listitem [ref=e269]:
            - generic [ref=e270]: About
          - listitem [ref=e271]:
            - generic [ref=e272]: Contact
      - navigation "Help" [ref=e273]:
        - heading "Help" [level=2] [ref=e274]
        - list [ref=e275]:
          - listitem [ref=e276]:
            - generic [ref=e277]: Safety
      - navigation "Legal" [ref=e278]:
        - heading "Legal" [level=2] [ref=e279]
        - list [ref=e280]:
          - listitem [ref=e281]:
            - generic [ref=e282]: Terms
          - listitem [ref=e283]:
            - generic [ref=e284]: Privacy
    - paragraph [ref=e286]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-73b a failed holders read shows its error, keeps the confirm disabled and removes nothing

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (521): <!DOCTYPE html>
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
            <div class="mt-3">2026-10-19 07:32:52 UTC</div>
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
Error: [e2e:setup] POST /token?grant_type=password failed (521): <!DOCTYPE html>
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

Context: context file not found for `admin-attributes-safety-Bundle-7-attribute-safety-AT-73b-a-failed-holders-read-shows-its-error-keeps-the-confirm-disabled-and-removes-nothing-mobile-360` — Playwright's name `admin-attributes-safety-Bu-97f5b-isabled-and-removes-nothing-mobile-360`; this run carried 21 context file(s); of the same spec: `admin-attributes-safety-Bu-af7e1--hold-an-answer-and-removes-mobile-360`, `admin-attributes-safety-Bu-f5af5-estion-and-a-removed-answer-mobile-360`

## admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-74 a merge is refused while a listing holds a source's answer, and merges when none does

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (503): upstream connect error or disconnect/reset before headers. retried and the latest reset reason: remote connection failure, transport failure reason: delayed connect error: 111
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (503): upstream connect error or disconnect/reset before headers. retried and the latest reset reason: remote connection failure, transport failure reason: delayed connect error: 111

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at freshAal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:828:17)
    at useJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:947:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-safety.spec.ts:285:24
```

Context: context file not found for `admin-attributes-safety-Bundle-7-attribute-safety-AT-74-a-merge-is-refused-while-a-listing-holds-a-source-s-answer-and-merges-when-none-does-mobile-360` — Playwright's name `admin-attributes-safety-Bu-3f558-r-and-merges-when-none-does-mobile-360`; this run carried 21 context file(s); of the same spec: `admin-attributes-safety-Bu-af7e1--hold-an-answer-and-removes-mobile-360`, `admin-attributes-safety-Bu-f5af5-estion-and-a-removed-answer-mobile-360`

## admin-attributes-safety.spec.ts › Bundle 7 attribute safety › AT-75 the import preview names the holders of an unlinked question and a removed answer

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:c2] reading e2e-cat-1-10-uiforj failed: <!DOCTYPE html>
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
            <div class="mt-3">2026-10-19 07:33:22 UTC</div>
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
Error: [e2e:c2] reading e2e-cat-1-10-uiforj failed: <!DOCTYPE html>
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

Context:

```text
        - heading "Company" [level=2] [ref=e268]
        - list [ref=e269]:
          - listitem [ref=e270]:
            - generic [ref=e271]: About
          - listitem [ref=e272]:
            - generic [ref=e273]: Contact
      - navigation "Help" [ref=e274]:
        - heading "Help" [level=2] [ref=e275]
        - list [ref=e276]:
          - listitem [ref=e277]:
            - generic [ref=e278]: Safety
      - navigation "Legal" [ref=e279]:
        - heading "Legal" [level=2] [ref=e280]
        - list [ref=e281]:
          - listitem [ref=e282]:
            - generic [ref=e283]: Terms
          - listitem [ref=e284]:
            - generic [ref=e285]: Privacy
    - paragraph [ref=e287]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › AS-2 filters: an action filter narrows the list

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:u3] role moderator not found: no row
--- further error 1 ---
Error: [e2e:u3] role moderator not found: no row

  47 |     .single();
  48 |   if (roleError || !role) {
> 49 |     throw new Error(`[e2e:u3] role ${roleName} not found: ${roleError?.message ?? "no row"}`);
     |           ^
  50 |   }
  51 |   const { error } = await supabase
  52 |     .from("user_roles")
    at grantRole (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:49:11)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:113:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e288]
        - list [ref=e289]:
          - listitem [ref=e290]:
            - generic [ref=e291]: About
          - listitem [ref=e292]:
            - generic [ref=e293]: Contact
      - navigation "Help" [ref=e294]:
        - heading "Help" [level=2] [ref=e295]
        - list [ref=e296]:
          - listitem [ref=e297]:
            - generic [ref=e298]: Safety
      - navigation "Legal" [ref=e299]:
        - heading "Legal" [level=2] [ref=e300]
        - list [ref=e301]:
          - listitem [ref=e302]:
            - generic [ref=e303]: Terms
          - listitem [ref=e304]:
            - generic [ref=e305]: Privacy
    - paragraph [ref=e307]: © 2026 ethio.com — All rights reserved.
```
```

## admin-audit.spec.ts › U3 audit & security › AS-3 the log on the agreed blocks: heading, toolbar, Filters with pills and dates, Columns, page size

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s1a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:403:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-audit.spec.ts:158:23
```

Context: context file not found for `admin-audit-U3-audit-security-AS-3-the-log-on-the-agreed-blocks-heading-toolbar-Filters-with-pills-and-dates-Columns-page-size-mobile-360` — Playwright's name `admin-audit-U3-audit-secur-fdf49-and-dates-Columns-page-size-mobile-360`; this run carried 21 context file(s); of the same spec: `admin-audit-U3-audit-secur-30650-ion-filter-narrows-the-list-mobile-360`, `admin-audit-U3-audit-secur-f218a-ad-only-session-and-ends-it-mobile-360`

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "legal",
+   "edit",
+   "publish",
+ ]
--- further error 1 ---
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "legal",
+   "edit",
+   "publish",
+ ]

  268 |     expect(labels.length, "matrix vocabulary: nothing rendered").toBeGreaterThan(0);
  269 |     const english = labels.filter((label) => !ALLOW.has(label) && LATIN_ONLY.test(label));
> 270 |     expect(english, "matrix vocabulary: raw English actions/resources rendered").toEqual([]);
      |                                                                                  ^
  271 |     assertAmharicChrome(labels, "roles permission matrix");
  272 |   });
```

Context:

```text
        - heading "ድርጅት" [level=2] [ref=e562]
        - list [ref=e563]:
          - listitem [ref=e564]:
            - generic [ref=e565]: ስለ እኛ
          - listitem [ref=e566]:
            - generic [ref=e567]: ያግኙን
      - navigation "እገዛ" [ref=e568]:
        - heading "እገዛ" [level=2] [ref=e569]
        - list [ref=e570]:
          - listitem [ref=e571]:
            - generic [ref=e572]: ደህንነት
      - navigation "ሕጋዊ" [ref=e573]:
        - heading "ሕጋዊ" [level=2] [ref=e574]
        - list [ref=e575]:
          - listitem [ref=e576]:
            - generic [ref=e577]: ውሎች
          - listitem [ref=e578]:
            - generic [ref=e579]: ግላዊነት
    - paragraph [ref=e581]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## legal-doors.spec.ts › Legal doors › LG-1 legal_in_force answers the highest published version whose time has come, global and per country, and never the change log

- Source: `shard 2`
- Project: `mobile-360`

```text
TypeError: Cannot read properties of null (reading 'version_id')
--- further error 1 ---
TypeError: Cannot read properties of null (reading 'version_id')

  232 |       const body = globalAnswer.data as Row;
  233 |       expect(
> 234 |         body["version_id"],
      |             ^
  235 |         "the version in force is the published one whose time has come",
  236 |       ).toBe(fixture.publishedId);
  237 |       expect(body["version"]).toBe(1);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:234:13
```

Context: context file not found for `legal-doors-Legal-doors-LG-1-legal_in_force-answers-the-highest-published-version-whose-time-has-come-global-and-per-country-and-never-the-change-log-mobile-360` — Playwright's name `legal-doors-Legal-doors-LG-bcc09-ry-and-never-the-change-log-mobile-360`; this run carried 21 context file(s); of the same spec: `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280-retry1`

## legal-doors.spec.ts › Legal doors › LG-5 my_legal_status lists the version in force until accepted, again after a material version, and scopes country documents to the home country

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected value: "52a3e371-e789-4df5-b3d5-514be5b3ae30"
Received array: []
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected value: "52a3e371-e789-4df5-b3d5-514be5b3ae30"
Received array: []

  549 |       expect(before.error).toBeNull();
  550 |       const beforeRows = before.data as Row[];
> 551 |       expect(beforeRows.map((r) => r["version_id"])).toContain(fixture.publishedId);
      |                                                      ^
  552 |
  553 |       await caller.rpc("accept_legal", {
  554 |         p_version_ids: [fixture.publishedId],
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:551:54
```

Context: context file not found for `legal-doors-Legal-doors-LG-5-my_legal_status-lists-the-version-in-force-until-accepted-again-after-a-material-version-and-scopes-country-documents-to-the-home-country-mobile-360` — Playwright's name `legal-doors-Legal-doors-LG-d3b38-cuments-to-the-home-country-mobile-360`; this run carried 21 context file(s); of the same spec: `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280-retry1`

## legal-doors.spec.ts › Legal doors › LG-6 the settings doors: the seeded row for the super admin, refusals for every lesser caller and every bad value; the row is never written

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "badValue"
Received string:    "new row for relation \"legal_settings\" violates check constraint \"legal_settings_notice_check\""
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "badValue"
Received string:    "new row for relation \"legal_settings\" violates check constraint \"legal_settings_notice_check\""

  656 |       p_settings: { notice_days: 400 },
  657 |     });
> 658 |     expect(badRange.error).toContain("badValue");
      |                            ^
  659 |     const badKey = await staff.rpc("admin_set_legal_settings", { p_settings: { bogus: 1 } });
  660 |     expect(badKey.error).toContain("badValue");
  661 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:658:28
```

Context:

```text
        - heading "Company" [level=2] [ref=e269]
        - list [ref=e270]:
          - listitem [ref=e271]:
            - generic [ref=e272]: About
          - listitem [ref=e273]:
            - generic [ref=e274]: Contact
      - navigation "Help" [ref=e275]:
        - heading "Help" [level=2] [ref=e276]
        - list [ref=e277]:
          - listitem [ref=e278]:
            - generic [ref=e279]: Safety
      - navigation "Legal" [ref=e280]:
        - heading "Legal" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - generic [ref=e284]: Terms
          - listitem [ref=e285]:
            - generic [ref=e286]: Privacy
    - paragraph [ref=e288]: © 2026 ethio.com — All rights reserved.
```
```

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-6 Renew an expired ad; a draft continues; an ad in review waits; another seller's ad and a signed-out visit

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s2a-000@ethio-e2e.invalid (rate limits) failed: <!DOCTYPE html>
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
            <div class="mt-3">2026-10-19 07:32:51 UTC</div>
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
Error: [e2e:pool] reaping e2e-pool-s2a-000@ethio-e2e.invalid (rate limits) failed: <!DOCTYPE html>
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

Context: context file not found for `my-listings-ad-MY-LISTINGS-one-ad-s-page-bundle-16-turn-3-MLA-6-Renew-an-expired-ad-a-draft-continues-an-ad-in-review-waits-another-seller-s-ad-and-a-signed-out-visit-mobile-360` — Playwright's name `my-listings-ad-MY-LISTINGS-9d729-s-ad-and-a-signed-out-visit-mobile-360`; this run carried 21 context file(s); of the same spec: none

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-7 Delete asks first; the deleted ad leaves My listings for good (call F)

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s2a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:403:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:210:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:677:20
```

Context: context file not found for `my-listings-ad-MY-LISTINGS-one-ad-s-page-bundle-16-turn-3-MLA-7-Delete-asks-first-the-deleted-ad-leaves-My-listings-for-good-call-F-mobile-360` — Playwright's name `my-listings-ad-MY-LISTINGS-c3506-y-listings-for-good-call-F--mobile-360`; this run carried 21 context file(s); of the same spec: none

## my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-8 A seller who also holds listings:enforce deletes his own ad as its owner; a deleted ad is never restored

- Source: `shard 2`
- Project: `mobile-360`

```text
Error: [e2e:l4b] seeding sub_city failed: no row
--- further error 1 ---
Error: [e2e:l4b] seeding sub_city failed: no row

   at helpers/locations.ts:370

  368 |       .single();
  369 |     if (error || !data) {
> 370 |       throw new Error(`[e2e:l4b] seeding ${level} failed: ${error?.message ?? "no row"}`);
      |             ^
  371 |     }
  372 |     return data;
  373 |   };
    at insert (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:370:13)
    at seedScratchChain (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:376:19)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:214:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:741:20
--- further error 2 ---
Error: [e2e:reap] listings of seller 83c7b696-4e88-433e-a761-4be94808c8d5 failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 525: SSL handshake failed</title>
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

Context: context file not found for `my-listings-ad-MY-LISTINGS-one-ad-s-page-bundle-16-turn-3-MLA-8-A-seller-who-also-holds-listings-enforce-deletes-his-own-ad-as-its-owner-a-deleted-ad-is-never-restored-mobile-360` — Playwright's name `my-listings-ad-MY-LISTINGS-01bda-eleted-ad-is-never-restored-mobile-360`; this run carried 21 context file(s); of the same spec: none

## my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-4 Sold from live and from closed: the contact closes to others, the seller's choice is kept; relist takes a sold ad only (D175)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:pool] reaping e2e-pool-s2a-011@ethio-e2e.invalid (profile) failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 520: Web server is returning an unknown error</title>
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

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-4-Sold-from-live-and-from-closed-the-contact-closes-to-others-the-seller-s-choice-is-kept-relist-takes-a-sold-ad-only-D175-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-891cb--takes-a-sold-ad-only-D175--mobile-360`; this run carried 21 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-165 a parent's change never touches a detail that depends on another parent

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:reap] reading the spec set failed: <!DOCTYPE html>
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
            <div class="mt-3">2026-10-19 07:32:51 UTC</div>
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
Error: [e2e:reap] reading the spec set failed: <!DOCTYPE html>
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

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-165-a-parent-s-change-never-touches-a-detail-that-depends-on-another-parent-mobile-360` — Playwright's name `post-wizard-resets-POSTING-abfdc-t-depends-on-another-parent-mobile-360`; this run carried 21 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-166 a prefill the seller left goes with the old choice; one the seller changed stays when it fits and is cleared when it does not

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s3a-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:403:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:114:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:1437:18
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-166-a-prefill-the-seller-left-goes-with-the-old-choice-one-the-seller-changed-stays-when-it-fits-and-is-cleared-when-it-does-not-mobile-360` — Playwright's name `post-wizard-resets-POSTING-aa207-is-cleared-when-it-does-not-mobile-360`; this run carried 21 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-74 a step-3 round trip keeps every answer (INC-329, big model list)

- Source: `shard 3`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:a2c] seeding the postable category failed: no row

   at helpers/posting.ts:214

  212 |     .single();
  213 |   if (error || !data) {
> 214 |     throw new Error(
      |           ^
  215 |       `[e2e:a2c] seeding the postable category failed: ${error?.message ?? "no row"}`,
  216 |     );
  217 |   }
    at seedPostableCategory (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:214:11)
    at leaf (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:130:17)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:850:24
--- further error 2 ---
Error: [e2e:reap] listings of seller fc3630ec-ad16-4040-83b7-aa78852f2fb2 failed: <!DOCTYPE html>
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

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-a-step-3-round-trip-keeps-every-answer-INC-329-big-model-list-mobile-360` — Playwright's name `post-wizard-specs-POSTING--c2c01-wer-INC-329-big-model-list--mobile-360`; this run carried 21 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-75 the required mark is uniform across steps (D72)

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s3a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s3a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:403:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:122:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:1103:18
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-75-the-required-mark-is-uniform-across-steps-D72-mobile-360` — Playwright's name `post-wizard-specs-POSTING--b850a-s-uniform-across-steps-D72--mobile-360`; this run carried 21 context file(s); of the same spec: none

## shell.spec.ts › mobile chrome › RL-1 the phone rail fills when its rows fit and scrolls when they do not, never overlapping

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: Admin strip: the rows do not fit yet the box does not scroll

expect(received).toBeGreaterThan(expected)

Expected: > 484
Received:   484
--- further error 1 ---
Error: Admin strip: the rows do not fit yet the box does not scroll

expect(received).toBeGreaterThan(expected)

Expected: > 484
Received:   484

  1082 |         metrics.scroll,
  1083 |         `${panel} ${variant}: the rows do not fit yet the box does not scroll`,
> 1084 |       ).toBeGreaterThan(metrics.client);
       |         ^
  1085 |       await box.evaluate((el) => {
  1086 |         el.scrollTop = el.scrollHeight;
  1087 |       });
    at checkVariant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1084:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1103:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: About
          - listitem [ref=e247]:
            - generic [ref=e248]: Contact
      - navigation "Help" [ref=e249]:
        - heading "Help" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Safety
      - navigation "Legal" [ref=e254]:
        - heading "Legal" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Terms
          - listitem [ref=e259]:
            - generic [ref=e260]: Privacy
    - paragraph [ref=e262]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-library.spec.ts › C3 attributes console › AT-3 link manager: an attribute is linked to a scratch category and unlinked

- Source: `shard 4`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context:

```text
        - heading "Company" [level=2] [ref=e147]
        - list [ref=e148]:
          - listitem [ref=e149]:
            - generic [ref=e150]: About
          - listitem [ref=e151]:
            - generic [ref=e152]: Contact
      - navigation "Help" [ref=e153]:
        - heading "Help" [level=2] [ref=e154]
        - list [ref=e155]:
          - listitem [ref=e156]:
            - generic [ref=e157]: Safety
      - navigation "Legal" [ref=e158]:
        - heading "Legal" [level=2] [ref=e159]
        - list [ref=e160]:
          - listitem [ref=e161]:
            - generic [ref=e162]: Terms
          - listitem [ref=e163]:
            - generic [ref=e164]: Privacy
    - paragraph [ref=e166]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-links.spec.ts › C3 attributes console › AT-37 a delete after the file's own unlink is accepted and undone

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:c2] reading e2e-cat-imp-c3u0ko failed: <!DOCTYPE html>
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
            <div class="mt-3">2026-10-19 07:32:51 UTC</div>
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
Error: [e2e:c2] reading e2e-cat-imp-c3u0ko failed: <!DOCTYPE html>
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

Context:

```text
        - heading "Company" [level=2] [ref=e1258]
        - list [ref=e1259]:
          - listitem [ref=e1260]:
            - generic [ref=e1261]: About
          - listitem [ref=e1262]:
            - generic [ref=e1263]: Contact
      - navigation "Help" [ref=e1264]:
        - heading "Help" [level=2] [ref=e1265]
        - list [ref=e1266]:
          - listitem [ref=e1267]:
            - generic [ref=e1268]: Safety
      - navigation "Legal" [ref=e1269]:
        - heading "Legal" [level=2] [ref=e1270]
        - list [ref=e1271]:
          - listitem [ref=e1272]:
            - generic [ref=e1273]: Terms
          - listitem [ref=e1274]:
            - generic [ref=e1275]: Privacy
    - paragraph [ref=e1277]: © 2026 ethio.com — All rights reserved.
```
```

## admin-attributes-links.spec.ts › C3 attributes console › AT-38 an inherited echo does not collide with a direct row

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /token?grant_type=password failed (503): upstream connect error or disconnect/reset before headers. retried and the latest reset reason: remote connection failure, transport failure reason: delayed connect error: 111
--- further error 1 ---
Error: [e2e:setup] POST /token?grant_type=password failed (503): upstream connect error or disconnect/reset before headers. retried and the latest reset reason: remote connection failure, transport failure reason: delayed connect error: 111

   at global-setup.ts:233

  231 |   const text = await response.text();
  232 |   if (!response.ok) {
> 233 |     throw new Error(`[e2e:setup] ${init.method} ${path} failed (${response.status}): ${text}`);
      |           ^
  234 |   }
  235 |   return text ? (JSON.parse(text) as Record<string, unknown>) : {};
  236 | }
    at authFetch (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/global-setup.ts:233:11)
    at freshAal2Session (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:828:17)
    at useJobSuperAdmin (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/ui.ts:947:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-attributes-links.spec.ts:447:5
```

Context: context file not found for `admin-attributes-links-C3-attributes-console-AT-38-an-inherited-echo-does-not-collide-with-a-direct-row-desktop-1280` — Playwright's name `admin-attributes-links-C3--90d10-t-collide-with-a-direct-row-desktop-1280`; this run carried 21 context file(s); of the same spec: `admin-attributes-links-C3--93fe8-link-is-accepted-and-undone-desktop-1280`, `admin-attributes-links-C3--90d10-t-collide-with-a-direct-row-desktop-1280-retry1`

## i18n-coverage.spec.ts › i18n chrome coverage (Amharic) › the roles permission matrix renders no raw English vocabulary

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "legal",
+   "edit",
+   "publish",
+ ]
--- further error 1 ---
Error: matrix vocabulary: raw English actions/resources rendered

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 5

- Array []
+ Array [
+   "legal",
+   "edit",
+   "publish",
+ ]

  268 |     expect(labels.length, "matrix vocabulary: nothing rendered").toBeGreaterThan(0);
  269 |     const english = labels.filter((label) => !ALLOW.has(label) && LATIN_ONLY.test(label));
> 270 |     expect(english, "matrix vocabulary: raw English actions/resources rendered").toEqual([]);
      |                                                                                  ^
  271 |     assertAmharicChrome(labels, "roles permission matrix");
  272 |   });
```

Context:

```text
        - heading "ድርጅት" [level=2] [ref=e608]
        - list [ref=e609]:
          - listitem [ref=e610]:
            - generic [ref=e611]: ስለ እኛ
          - listitem [ref=e612]:
            - generic [ref=e613]: ያግኙን
      - navigation "እገዛ" [ref=e614]:
        - heading "እገዛ" [level=2] [ref=e615]
        - list [ref=e616]:
          - listitem [ref=e617]:
            - generic [ref=e618]: ደህንነት
      - navigation "ሕጋዊ" [ref=e619]:
        - heading "ሕጋዊ" [level=2] [ref=e620]
        - list [ref=e621]:
          - listitem [ref=e622]:
            - generic [ref=e623]: ውሎች
          - listitem [ref=e624]:
            - generic [ref=e625]: ግላዊነት
    - paragraph [ref=e627]: © 2026 ethio.com — መብቱ በሙሉ የተጠበቀ ነው።
```
```

## legal-doors.spec.ts › Legal doors › LG-1 legal_in_force answers the highest published version whose time has come, global and per country, and never the change log

- Source: `shard 5`
- Project: `desktop-1280`

```text
TypeError: Cannot read properties of null (reading 'version_id')
--- further error 1 ---
TypeError: Cannot read properties of null (reading 'version_id')

  232 |       const body = globalAnswer.data as Row;
  233 |       expect(
> 234 |         body["version_id"],
      |             ^
  235 |         "the version in force is the published one whose time has come",
  236 |       ).toBe(fixture.publishedId);
  237 |       expect(body["version"]).toBe(1);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:234:13
```

Context: context file not found for `legal-doors-Legal-doors-LG-1-legal_in_force-answers-the-highest-published-version-whose-time-has-come-global-and-per-country-and-never-the-change-log-desktop-1280` — Playwright's name `legal-doors-Legal-doors-LG-bcc09-ry-and-never-the-change-log-desktop-1280`; this run carried 21 context file(s); of the same spec: `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280-retry1`

## legal-doors.spec.ts › Legal doors › LG-5 my_legal_status lists the version in force until accepted, again after a material version, and scopes country documents to the home country

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s5a-010@ethio-e2e.invalid (translator languages) failed: <!DOCTYPE html>
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
            <div class="mt-3">2026-10-19 07:32:52 UTC</div>
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
Error: [e2e:pool] reaping e2e-pool-s5a-010@ethio-e2e.invalid (translator languages) failed: <!DOCTYPE html>
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

Context: context file not found for `legal-doors-Legal-doors-LG-5-my_legal_status-lists-the-version-in-force-until-accepted-again-after-a-material-version-and-scopes-country-documents-to-the-home-country-desktop-1280` — Playwright's name `legal-doors-Legal-doors-LG-d3b38-cuments-to-the-home-country-desktop-1280`; this run carried 21 context file(s); of the same spec: `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280-retry1`

## legal-doors.spec.ts › Legal doors › LG-6 the settings doors: the seeded row for the super admin, refusals for every lesser caller and every bad value; the row is never written

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:403:14)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:611:19
```

Context:

```text
        - heading "Company" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: About
          - listitem [ref=e340]:
            - generic [ref=e341]: Contact
      - navigation "Help" [ref=e342]:
        - heading "Help" [level=2] [ref=e343]
        - list [ref=e344]:
          - listitem [ref=e345]:
            - generic [ref=e346]: Safety
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

## legal-doors.spec.ts › Legal doors › LG-7 admin_user_legal_history shows staff the person's acceptances and legal e-mails, newest first; refused for a plain user; the notice door is service-only

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s5a-011@ethio-e2e.invalid (listing ids) failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 525: SSL handshake failed</title>
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
                <span class="inline-block">SSL handshake failed</span>
                <span class="code-label">Error code 525</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_525&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-19 07:33:22 UTC</div>
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
Error: [e2e:pool] reaping e2e-pool-s5a-011@ethio-e2e.invalid (listing ids) failed: <!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
<!--[if IE 7]>    <html class="no-js ie7 oldie" lang="en-US"> <![endif]-->
<!--[if IE 8]>    <html class="no-js ie8 oldie" lang="en-US"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en-US"> <!--<![endif]-->
<head>

<title>supabase.co | 525: SSL handshake failed</title>
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

Context: context file not found for `legal-doors-Legal-doors-LG-7-admin_user_legal_history-shows-staff-the-person-s-acceptances-and-legal-e-mails-newest-first-refused-for-a-plain-user-the-notice-door-is-service-only-desktop-1280` — Playwright's name `legal-doors-Legal-doors-LG-ddfc0-notice-door-is-service-only-desktop-1280`; this run carried 21 context file(s); of the same spec: `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280-retry1`

## locations-tree.spec.ts › L1c · public per-country location tree › LR-3 a row disappears when an ancestor is retired, and the version moves

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502

  184 |       while (Date.now() < seededDeadline) {
  185 |         const response = await request.get("/api/locations/ET");
> 186 |         expect(response.status()).toBe(200);
      |                                   ^
  187 |         seen = (await response.json()) as TreePayload;
  188 |         if (seen.nodes.some((node) => node["slug"] === citySlug)) break;
  189 |         await new Promise((resolve) => setTimeout(resolve, 2_000));
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/locations-tree.spec.ts:186:35
```

Context: context file not found for `locations-tree-L1c-public-per-country-location-tree-LR-3-a-row-disappears-when-an-ancestor-is-retired-and-the-version-moves-desktop-1280` — Playwright's name `locations-tree-L1c-·-publi-f4e95-tired-and-the-version-moves-desktop-1280`; this run carried 21 context file(s); of the same spec: none

## locations-tree.spec.ts › L1c · public per-country location tree › LR-4 the payload carries the eleven read fields and nothing else

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 502

  246 |   test("LR-4 the payload carries the eleven read fields and nothing else", async ({ request }) => {
  247 |     const response = await request.get("/api/locations/ET");
> 248 |     expect(response.status()).toBe(200);
      |                               ^
  249 |     const body = (await response.json()) as TreePayload;
  250 |     expect(Object.keys(body).sort(), "the envelope").toEqual(["country", "nodes", "version"]);
  251 |     for (const node of body.nodes) {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/locations-tree.spec.ts:248:31
```

Context: context file not found for `locations-tree-L1c-public-per-country-location-tree-LR-4-the-payload-carries-the-eleven-read-fields-and-nothing-else-desktop-1280` — Playwright's name `locations-tree-L1c-·-publi-1471e-ead-fields-and-nothing-else-desktop-1280`; this run carried 21 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-168 a chain: the brand changes, the model it no longer offers is cleared and what it filled goes; the seller's own colour stays

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s6a-010@ethio-e2e.invalid (listings) failed: <!DOCTYPE html>
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
            <div class="mt-3">2026-10-19 07:32:51 UTC</div>
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
Error: [e2e:pool] reaping e2e-pool-s6a-010@ethio-e2e.invalid (listings) failed: <!DOCTYPE html>
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

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-168-a-chain-the-brand-changes-the-model-it-no-longer-offers-is-cleared-and-what-it-filled-goes-the-seller-s-own-colour-stays-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-7b26f-e-seller-s-own-colour-stays-desktop-1280`; this run carried 21 context file(s); of the same spec: none

## post-wizard-resets.spec.ts › POSTING WIZARD › PW-174 a parent's move whose new option carries no fact leaves D on another parent's fact, as a prefill (Bundle 7 D4)

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s6a-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:403:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:114:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:1671:18
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-174-a-parent-s-move-whose-new-option-carries-no-fact-leaves-D-on-another-parent-s-fact-as-a-prefill-Bundle-7-D4-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-df254-t-as-a-prefill-Bundle-7-D4--desktop-1280`; this run carried 21 context file(s); of the same spec: none

## post-wizard-specs.spec.ts › POSTING WIZARD › PW-75 the required mark is uniform across steps (D72)

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


  188 |   async function nextThroughPhotos(page: import("@playwright/test").Page) {
  189 |     await page.getByTestId("post-next").click();
> 190 |     await expect(page.getByTestId("post-step-2")).toBeVisible({ timeout: 20_000 });
      |                                                   ^
  191 |     await page.getByTestId("post-next").click();
  192 |   }
  193 |
    at nextThroughPhotos (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-specs.spec.ts:190:51)
```

Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-75-the-required-mark-is-uniform-across-steps-D72-desktop-1280` — Playwright's name `post-wizard-specs-POSTING--b850a-s-uniform-across-steps-D72--desktop-1280`; this run carried 21 context file(s); of the same spec: none

## legal-doors.spec.ts › Legal doors › LG-1 legal_in_force answers the highest published version whose time has come, global and per country, and never the change log

- Source: `changed`
- Project: `mobile-360`

```text
TypeError: Cannot read properties of null (reading 'version_id')
--- further error 1 ---
TypeError: Cannot read properties of null (reading 'version_id')

  232 |       const body = globalAnswer.data as Row;
  233 |       expect(
> 234 |         body["version_id"],
      |             ^
  235 |         "the version in force is the published one whose time has come",
  236 |       ).toBe(fixture.publishedId);
  237 |       expect(body["version"]).toBe(1);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:234:13
```

Context: context file not found for `legal-doors-Legal-doors-LG-1-legal_in_force-answers-the-highest-published-version-whose-time-has-come-global-and-per-country-and-never-the-change-log-mobile-360` — Playwright's name `legal-doors-Legal-doors-LG-bcc09-ry-and-never-the-change-log-mobile-360`; this run carried 21 context file(s); of the same spec: `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280-retry1`

## legal-doors.spec.ts › Legal doors › LG-5 my_legal_status lists the version in force until accepted, again after a material version, and scopes country documents to the home country

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected value: "9a9fe1ca-4953-4602-9708-6ccc44530599"
Received array: []
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected value: "9a9fe1ca-4953-4602-9708-6ccc44530599"
Received array: []

  549 |       expect(before.error).toBeNull();
  550 |       const beforeRows = before.data as Row[];
> 551 |       expect(beforeRows.map((r) => r["version_id"])).toContain(fixture.publishedId);
      |                                                      ^
  552 |
  553 |       await caller.rpc("accept_legal", {
  554 |         p_version_ids: [fixture.publishedId],
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:551:54
```

Context: context file not found for `legal-doors-Legal-doors-LG-5-my_legal_status-lists-the-version-in-force-until-accepted-again-after-a-material-version-and-scopes-country-documents-to-the-home-country-mobile-360` — Playwright's name `legal-doors-Legal-doors-LG-d3b38-cuments-to-the-home-country-mobile-360`; this run carried 21 context file(s); of the same spec: `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280-retry1`

## legal-doors.spec.ts › Legal doors › LG-6 the settings doors: the seeded row for the super admin, refusals for every lesser caller and every bad value; the row is never written

- Source: `changed`
- Project: `mobile-360`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "badValue"
Received string:    "new row for relation \"legal_settings\" violates check constraint \"legal_settings_notice_check\""
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "badValue"
Received string:    "new row for relation \"legal_settings\" violates check constraint \"legal_settings_notice_check\""

  656 |       p_settings: { notice_days: 400 },
  657 |     });
> 658 |     expect(badRange.error).toContain("badValue");
      |                            ^
  659 |     const badKey = await staff.rpc("admin_set_legal_settings", { p_settings: { bogus: 1 } });
  660 |     expect(badKey.error).toContain("badValue");
  661 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:658:28
```

Context:

```text
        - heading "Company" [level=2] [ref=e269]
        - list [ref=e270]:
          - listitem [ref=e271]:
            - generic [ref=e272]: About
          - listitem [ref=e273]:
            - generic [ref=e274]: Contact
      - navigation "Help" [ref=e275]:
        - heading "Help" [level=2] [ref=e276]
        - list [ref=e277]:
          - listitem [ref=e278]:
            - generic [ref=e279]: Safety
      - navigation "Legal" [ref=e280]:
        - heading "Legal" [level=2] [ref=e281]
        - list [ref=e282]:
          - listitem [ref=e283]:
            - generic [ref=e284]: Terms
          - listitem [ref=e285]:
            - generic [ref=e286]: Privacy
    - paragraph [ref=e288]: © 2026 ethio.com — All rights reserved.
```
```

## legal-doors.spec.ts › Legal doors › LG-1 legal_in_force answers the highest published version whose time has come, global and per country, and never the change log

- Source: `changed`
- Project: `desktop-1280`

```text
TypeError: Cannot read properties of null (reading 'version_id')
--- further error 1 ---
TypeError: Cannot read properties of null (reading 'version_id')

  232 |       const body = globalAnswer.data as Row;
  233 |       expect(
> 234 |         body["version_id"],
      |             ^
  235 |         "the version in force is the published one whose time has come",
  236 |       ).toBe(fixture.publishedId);
  237 |       expect(body["version"]).toBe(1);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:234:13
```

Context: context file not found for `legal-doors-Legal-doors-LG-1-legal_in_force-answers-the-highest-published-version-whose-time-has-come-global-and-per-country-and-never-the-change-log-desktop-1280` — Playwright's name `legal-doors-Legal-doors-LG-bcc09-ry-and-never-the-change-log-desktop-1280`; this run carried 21 context file(s); of the same spec: `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280-retry1`

## legal-doors.spec.ts › Legal doors › LG-5 my_legal_status lists the version in force until accepted, again after a material version, and scopes country documents to the home country

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected value: "fc077225-395e-42ce-9e10-b42f83fb460e"
Received array: []
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected value: "fc077225-395e-42ce-9e10-b42f83fb460e"
Received array: []

  549 |       expect(before.error).toBeNull();
  550 |       const beforeRows = before.data as Row[];
> 551 |       expect(beforeRows.map((r) => r["version_id"])).toContain(fixture.publishedId);
      |                                                      ^
  552 |
  553 |       await caller.rpc("accept_legal", {
  554 |         p_version_ids: [fixture.publishedId],
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:551:54
```

Context: context file not found for `legal-doors-Legal-doors-LG-5-my_legal_status-lists-the-version-in-force-until-accepted-again-after-a-material-version-and-scopes-country-documents-to-the-home-country-desktop-1280` — Playwright's name `legal-doors-Legal-doors-LG-d3b38-cuments-to-the-home-country-desktop-1280`; this run carried 21 context file(s); of the same spec: `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360-retry1`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-mobile-360`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280`, `legal-doors-Legal-doors-LG-49b93-ue-the-row-is-never-written-desktop-1280-retry1`

## legal-doors.spec.ts › Legal doors › LG-6 the settings doors: the seeded row for the super admin, refusals for every lesser caller and every bad value; the row is never written

- Source: `changed`
- Project: `desktop-1280`

```text
Error: expect(received).toContain(expected) // indexOf

Expected substring: "badValue"
Received string:    "new row for relation \"legal_settings\" violates check constraint \"legal_settings_notice_check\""
--- further error 1 ---
Error: expect(received).toContain(expected) // indexOf

Expected substring: "badValue"
Received string:    "new row for relation \"legal_settings\" violates check constraint \"legal_settings_notice_check\""

  656 |       p_settings: { notice_days: 400 },
  657 |     });
> 658 |     expect(badRange.error).toContain("badValue");
      |                            ^
  659 |     const badKey = await staff.rpc("admin_set_legal_settings", { p_settings: { bogus: 1 } });
  660 |     expect(badKey.error).toContain("badValue");
  661 |
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/legal-doors.spec.ts:658:28
```

Context:

```text
        - heading "Company" [level=2] [ref=e336]
        - list [ref=e337]:
          - listitem [ref=e338]:
            - generic [ref=e339]: About
          - listitem [ref=e340]:
            - generic [ref=e341]: Contact
      - navigation "Help" [ref=e342]:
        - heading "Help" [level=2] [ref=e343]
        - list [ref=e344]:
          - listitem [ref=e345]:
            - generic [ref=e346]: Safety
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

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-3 My Listings opens its own page; signed out, the page asks to sign in

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-schangeda-010@ethio-e2e.invalid (listing revisions) failed: <!DOCTYPE html>
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
            <div class="mt-3">2026-10-19 07:32:52 UTC</div>
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
Error: [e2e:pool] reaping e2e-pool-schangeda-010@ethio-e2e.invalid (listing revisions) failed: <!DOCTYPE html>
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

Context: context file not found for `my-listings-page-MY-LISTINGS-the-list-page-bundle-16-turn-2-MLP-3-My-Listings-opens-its-own-page-signed-out-the-page-asks-to-sign-in-desktop-1280` — Playwright's name `my-listings-page-MY-LISTIN-c1d11-ut-the-page-asks-to-sign-in-desktop-1280`; this run carried 21 context file(s); of the same spec: none

## my-listings-page.spec.ts › MY LISTINGS — the list page (bundle 16 turn 2) › MLP-4 The Account overview counts the six groups with the page's words and opens My listings (INC-469)

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-schangeda-010@ethio-e2e.invalid failed: A user with this email address has already been registered (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-schangeda-010@ethio-e2e.invalid failed: A user with this email address has already been registered (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:403:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at scratchSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:170:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-page.spec.ts:490:20
```

Context: context file not found for `my-listings-page-MY-LISTINGS-the-list-page-bundle-16-turn-2-MLP-4-The-Account-overview-counts-the-six-groups-with-the-page-s-words-and-opens-My-listings-INC-469-desktop-1280` — Playwright's name `my-listings-page-MY-LISTIN-b8e5e--opens-My-listings-INC-469--desktop-1280`; this run carried 21 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-129 Next waits for the identity read instead of refusing

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:reap] listings of e2e-post-changed-18-oq6d0t failed: <!DOCTYPE html>
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
            <div class="mt-3">2026-10-19 07:32:51 UTC</div>
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
Error: [e2e:reap] listings of e2e-post-changed-18-oq6d0t failed: <!DOCTYPE html>
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

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-129-Next-waits-for-the-identity-read-instead-of-refusing-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-a0549-ty-read-instead-of-refusing-desktop-1280`; this run carried 21 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-134 names typed during the identity read survive it and are saved

- Source: `changed`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-schangeda-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-schangeda-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:403:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at signedInSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:121:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-bundle2.spec.ts:483:18
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-134-names-typed-during-the-identity-read-survive-it-and-are-saved-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-7e730-ad-survive-it-and-are-saved-desktop-1280`; this run carried 21 context file(s); of the same spec: none

## shell.spec.ts › mobile chrome › RL-1 the phone rail fills when its rows fit and scrolls when they do not, never overlapping

- Source: `changed`
- Project: `mobile-360`

```text
Error: Admin strip: the rows do not fit yet the box does not scroll

expect(received).toBeGreaterThan(expected)

Expected: > 484
Received:   484
--- further error 1 ---
Error: Admin strip: the rows do not fit yet the box does not scroll

expect(received).toBeGreaterThan(expected)

Expected: > 484
Received:   484

  1082 |         metrics.scroll,
  1083 |         `${panel} ${variant}: the rows do not fit yet the box does not scroll`,
> 1084 |       ).toBeGreaterThan(metrics.client);
       |         ^
  1085 |       await box.evaluate((el) => {
  1086 |         el.scrollTop = el.scrollHeight;
  1087 |       });
    at checkVariant (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1084:9)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/shell.spec.ts:1103:5
```

Context:

```text
        - heading "Company" [level=2] [ref=e243]
        - list [ref=e244]:
          - listitem [ref=e245]:
            - generic [ref=e246]: About
          - listitem [ref=e247]:
            - generic [ref=e248]: Contact
      - navigation "Help" [ref=e249]:
        - heading "Help" [level=2] [ref=e250]
        - list [ref=e251]:
          - listitem [ref=e252]:
            - generic [ref=e253]: Safety
      - navigation "Legal" [ref=e254]:
        - heading "Legal" [level=2] [ref=e255]
        - list [ref=e256]:
          - listitem [ref=e257]:
            - generic [ref=e258]: Terms
          - listitem [ref=e259]:
            - generic [ref=e260]: Privacy
    - paragraph [ref=e262]: © 2026 ethio.com — All rights reserved.
```
```

## Server errors: smoke

```text
[WebServer] [ssr-error] /__root gate fetch failed 521
[WebServer] [ssr-error] /api/locations Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/i18n Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /__root gate fetch failed 503
[WebServer] [ssr-error] /api/categories/tree Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/locations Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/i18n Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/categories/tree Could not query the database for the schema cache. Retrying.
[WebServer] [ssr-error] /api/feed Could not query the database for the schema cache. Retrying.
```

## Client errors: smoke

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-K3--KupY.js:83:25) at http://127.0.0.1:4173/assets/feed-K3--KupY.js:117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CO61j1TC.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5)
[client-error] console.error: Failed to load resource: the server responded with a status of 503 ()
[client-error] HTTP 503 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_entity_bundle ({"code":"PGRST002","details":null,"hint":null,"message":"Could not query the database for the schema cache. Retrying."})
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] console.error: Failed to load resource: the server responded with a status of 503 ()
[client-error] HTTP 503 GET https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/languages?select=code,name_en,name_native,rtl,sort&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc ({"code":"PGRST002","details":null,"hint":null,"message":"Could not query the database for the schema cache. Retrying."})
[client-error] console.error: [client-error] gate fetch failed 503 {"code":"PGRST002","details":null,"hint":null,"message":"Could not query the database for the schema cache. Retrying."}
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway) ×3
[client-error] console.error: Failed to load resource: the server responded with a status of 503 ()
[client-error] HTTP 503 GET https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/languages?select=code,name_en,name_native,rtl,sort&or=(enabled_public.eq.true,is_base.eq.true)&order=sort.asc ({"code":"PGRST002","details":null,"hint":null,"message":"Could not query the database for the schema cache. Retrying."})
[client-error] console.error: [client-error] gate fetch retry failed 503 {"code":"PGRST002","details":null,"hint":null,"message":"Could not query the database for the schema cache. Retrying."}
[client-error] console.error: Failed to load resource: the server responded with a status of 503 ()
[client-error] HTTP 503 POST https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_ui_bundle ({"code":"PGRST002","details":null,"hint":null,"message":"Could not query the database for the schema cache. Retrying."})
console.error: [client-error] gate fetch threw
```

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-14-f4ny3w: e2e_par_3ayh8u → e2e_chi_5h8f67
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

```text
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/my_viewing_location' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_my_permissions' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-K3--KupY.js:83:25) at http://127.0.0.1:4173/assets/feed-K3--KupY.js:117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CO61j1TC.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5)
console.error: [client-error] gate fetch threw
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

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 3

```text
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_my_permissions' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/my_viewing_location' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/profiles?select=display_name%2Caccount_status&user_id=eq.a4c89a0c-d1d5-4161-aa07-8b41a08707e8' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_entity_bundle' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/my_viewing_location' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_my_permissions' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: [feed] first page failed TypeError: Failed to fetch at readPage (http://127.0.0.1:4173/assets/feed-K3--KupY.js:83:25) at http://127.0.0.1:4173/assets/feed-K3--KupY.js:117:3 at commitHookEffectListMount (http://127.0.0.1:4173/assets/index-CO61j1TC.js:5124:20) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6029:21) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5) at recursivelyTraversePassiveMountEffects (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6020:102) at commitPassiveMountOnFiber (http://127.0.0.1:4173/assets/index-CO61j1TC.js:6028:5)
```

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (520)
[WebServer] [ssr-error] /api/admin/attributes/import auth upstream unavailable (521)
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-8-7pehxo: e2e_par_8tifrl → e2e_chi_86thzg
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 4

```text
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_entity_bundle' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Failed to load resource: the server responded with a status of 502 (Bad Gateway)
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/my_viewing_location' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_my_permissions' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
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
[WebServer] [ssr-error] /api/locations upstream returned an HTML error page (520)
[WebServer] [ssr-error] /api/locations upstream returned an HTML error page (521)
[WebServer] [ssr-error] /api/locations Could not query the database for the schema cache. Retrying.
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
[WebServer] [ssr-error] /api/listings/draft residency: upstream returned an HTML error page (520)
[WebServer] [ssr-error] /api/listings/draft submit_listing: upstream unavailable (521)
[WebServer] [ssr-error] /api/listings/draft listing not found ×2
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).

## Server errors: changed

No `[ssr-error]` lines in the `changed` log (or no log was uploaded).

## Client errors: changed

No `[client-error]` lines in the `changed` log (or no log was uploaded).
