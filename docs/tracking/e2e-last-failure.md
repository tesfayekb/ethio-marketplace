# Last E2E failure (auto-generated — do not edit by hand)

- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/39000748434
- Commit: `a82fa2051ccbe32f30dab5e933ddbcf438128f67`
- Attempt: 1
- Written (UTC): 2026-10-17T05:06:32.267Z
- Passed: 1790 · Skipped: 126 · Failed: 16
- Gating failures: 16 · Quarantined (@global-state, INC-117, non-gating): 0
- Flaky (passed on retry, DEC-030, non-gating): 8
- Post-test errors (DEC-059, non-gating): smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6
- Sources without results: none
- Errors outside any test (INC-589): none

## Flake ledger (DEC-030)

These tests FAILED then PASSED on retry. Retries are evidence, not concealment:
a test flaky 3× in 7 days gets an INC and root-cause work.

- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away — Error: expect(locator).toBeVisible() failed
- FLAKY (passed on retry) · `mobile-360` · source `shard 1` · admin-screening.spec.ts › ADMIN SCREENING › SC-16 a reviewer without a fresh second factor cannot decide — Error: [e2e:pool] reaping e2e-pool-s1b-011@ethio-e2e.invalid (listing revisions) failed: <!DOCTYPE html>
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-7 Delete asks first; the deleted ad leaves My listings for good (call F) — SyntaxError: Unexpected token 'u', "upstream r"... is not valid JSON
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-5 The price applies at once; Price reduced only for a real drop on a price that stood (D173, D174, D177) — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `mobile-360` · source `shard 2` · post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-132 a non-Latin seller name shows the Latin line as the refusal — Error: [e2e:seller] confirming user_directory failed: <!DOCTYPE html>
- FLAKY (passed on retry) · `desktop-1280` · source `shard 4` · admin-shell.spec.ts › Admin shell (U0) › A-4 admin TAB from marketplace navigates to /admin (INC-071) — Error: [e2e:pool] reaping e2e-pool-s4b-000@ethio-e2e.invalid (rate limits) failed: <!DOCTYPE html>
- FLAKY (passed on retry) · `desktop-1280` · source `shard 5` · my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing — Test timeout of 60000ms exceeded.
- FLAKY (passed on retry) · `desktop-1280` · source `shard 6` · post-wizard-resets.spec.ts › POSTING WIZARD › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer — Error: expect(received).toBe(expected) // Object.is equality

## Flaky bodies (DEC-078)

### admin-countries.spec.ts › L2b countries console › CO-4 open and close: opening publishes the market's tree, closing takes it away

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('country-ET-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('country-ET-card')

[dialog-dump findRow(ET)] open dialogs: none
--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('data-table-cards').getByTestId('country-ET-card')
Expected: visible
Timeout: 20000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 20000ms
  - waiting for getByTestId('data-table-cards').getByTestId('country-ET-card')

[dialog-dump findRow(ET)] open dialogs: none

   at helpers/countries.ts:203

  201 |     await expect(row).toBeVisible({ timeout: 20000 });
  202 |   } catch (error) {
> 203 |     throw new Error(
      |           ^
  204 |       `${error instanceof Error ? error.message : String(error)}\n${await dialogDump(page, `findRow(${code})`)}`,
```

Context:

```text
          - listitem [ref=e383]:
            - generic [ref=e384]: About
          - listitem [ref=e385]:
            - generic [ref=e386]: How it works
      - navigation "Help" [ref=e387]:
        - heading "Help" [level=2] [ref=e388]
        - list [ref=e389]:
          - listitem [ref=e390]:
            - generic [ref=e391]: Safety
          - listitem [ref=e392]:
            - generic [ref=e393]: Contact
      - navigation "Legal" [ref=e394]:
        - heading "Legal" [level=2] [ref=e395]
        - list [ref=e396]:
          - listitem [ref=e397]:
            - generic [ref=e398]: Terms
          - listitem [ref=e399]:
            - generic [ref=e400]: Privacy
    - paragraph [ref=e402]: © 2026 ethio.com — All rights reserved.
```
```

### admin-screening.spec.ts › ADMIN SCREENING › SC-16 a reviewer without a fresh second factor cannot decide

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:pool] reaping e2e-pool-s1b-011@ethio-e2e.invalid (listing revisions) failed: <!DOCTYPE html>
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
            <div class="mt-3">2026-10-17 04:55:16 UTC</div>
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
Error: [e2e:pool] reaping e2e-pool-s1b-011@ethio-e2e.invalid (listing revisions) failed: <!DOCTYPE html>
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
Error: [e2e:reap] listings of seller 0e7f3cbf-8545-43a2-8321-196bcc1e44f1 failed: <!DOCTYPE html>
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

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-16-a-reviewer-without-a-fresh-second-factor-cannot-decide-mobile-360` — Playwright's name `admin-screening-ADMIN-SCRE-f4ca6-second-factor-cannot-decide-mobile-360`; this run carried 5 context file(s); of the same spec: `admin-screening-ADMIN-SCRE-6b6c5--with-no-role-cannot-decide-mobile-360`

### my-listings-ad.spec.ts › MY LISTINGS — one ad's page (bundle 16 turn 3) › MLA-7 Delete asks first; the deleted ad leaves My listings for good (call F)

- Source: `shard 2`
- Project: `mobile-360`

```text
SyntaxError: Unexpected token 'u', "upstream r"... is not valid JSON
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
    at asPerson (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:61:19)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-ad.spec.ts:678:15
```

Context: context file not found for `my-listings-ad-MY-LISTINGS-one-ad-s-page-bundle-16-turn-3-MLA-7-Delete-asks-first-the-deleted-ad-leaves-My-listings-for-good-call-F-mobile-360` — Playwright's name `my-listings-ad-MY-LISTINGS-c3506-y-listings-for-good-call-F--mobile-360`; this run carried 5 context file(s); of the same spec: none

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-5 The price applies at once; Price reduced only for a real drop on a price that stood (D173, D174, D177)

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:reap] location e9b1594d-d040-488e-8867-96fa047f6784 failed: update or delete on table "locations" violates foreign key constraint "listings_location_id_fkey" on table "listings"

   at helpers/locations.ts:277

  275 |     const deleted = await supabase.from("locations").delete().eq("id", id);
  276 |     if (deleted.error)
> 277 |       throw new Error(`[e2e:reap] location ${id} failed: ${deleted.error.message}`);
      |             ^
  278 |   }
  279 | }
  280 |
    at destroyLocation (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/locations.ts:277:13)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:205:43
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-5-The-price-applies-at-once-Price-reduced-only-for-a-real-drop-on-a-price-that-stood-D173-D174-D177-mobile-360` — Playwright's name `my-listings-doors-MY-LISTI-0574b--that-stood-D173-D174-D177--mobile-360`; this run carried 5 context file(s); of the same spec: none

### post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-132 a non-Latin seller name shows the Latin line as the refusal

- Source: `shard 2`
- Project: `mobile-360`

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
            <div class="mt-3">2026-10-17 04:55:16 UTC</div>
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

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-132-a-non-Latin-seller-name-shows-the-Latin-line-as-the-refusal-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-c7d96-e-Latin-line-as-the-refusal-mobile-360`; this run carried 5 context file(s); of the same spec: none

### admin-shell.spec.ts › Admin shell (U0) › A-4 admin TAB from marketplace navigates to /admin (INC-071)

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s4b-000@ethio-e2e.invalid (rate limits) failed: <!DOCTYPE html>
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
            <div class="mt-3">2026-10-17 04:55:16 UTC</div>
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
Error: [e2e:pool] reaping e2e-pool-s4b-000@ethio-e2e.invalid (rate limits) failed: <!DOCTYPE html>
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

Context: context file not found for `admin-shell-Admin-shell-U0-A-4-admin-TAB-from-marketplace-navigates-to-admin-INC-071-desktop-1280` — Playwright's name `admin-shell-Admin-shell-U0-63fbf-navigates-to-admin-INC-071--desktop-1280`; this run carried 5 context file(s); of the same spec: `admin-shell-Admin-shell-U0-7e4b8-n-page-breadcrumb-deep-link-desktop-1280`

### my-listings-doors.spec.ts › MY LISTINGS — the seller's doors (bundle 16 turn 1) › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: "not your listing"
Received: "listing not found"

  457 |     const yBefore = await snapshot(y.id);
  458 |
> 459 |     expect((await close(b, x.id)).error).toBe("not your listing");
      |                                          ^
  460 |     expect((await reserve(b, x.id, true)).error).toBe("not your listing");
  461 |     expect((await price(b, x.id, 90)).error).toBe("not your listing");
  462 |     expect((await b.rpc("listing_history", { p_listing_id: x.id })).error).toBe("not your listing");
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/my-listings-doors.spec.ts:459:42
```

Context: context file not found for `my-listings-doors-MY-LISTINGS-the-seller-s-doors-bundle-16-turn-1-ML-2-Nobody-else-moves-a-seller-s-ad-and-a-refused-call-writes-nothing-desktop-1280` — Playwright's name `my-listings-doors-MY-LISTI-13738-refused-call-writes-nothing-desktop-1280`; this run carried 5 context file(s); of the same spec: none

### post-wizard-resets.spec.ts › POSTING WIZARD › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 2018
Received: undefined

Call Log:
- Test timeout of 60000ms exceeded
--- further error 1 ---
Error: expect(received).toBe(expected) // Object.is equality

Expected: 2018
Received: undefined

Call Log:
- Test timeout of 60000ms exceeded

  1551 |     await choose(page, model, older);
  1552 |     await ruleControl(page, year).selectOption("2018");
> 1553 |     await expect.poll(async () => (await stored())[year], { timeout: 20_000 }).toBe(2018);
       |     ^
  1554 |
  1555 |     // 1 — 2018 lies inside the new floor: kept, nothing reset.
  1556 |     await choose(page, model, newer);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/post-wizard-resets.spec.ts:1553:5
```

Context: context file not found for `post-wizard-resets-POSTING-WIZARD-PW-167-a-seller-s-year-inside-the-new-model-s-bounds-is-kept-one-outside-is-cleared-with-the-Undo-offer-desktop-1280` — Playwright's name `post-wizard-resets-POSTING-81aef-cleared-with-the-Undo-offer-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## Errors outside any test (INC-589)

None: no results file lists one and no log's summary names one (8 of 8 results files read, 8 of 8 logs read).

## Server errors — census (DEC-083, non-gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

119 line(s), 40 message(s): 5 off the allowlist, 35 allowlisted.

| Message | Count | Sources |
| --- | --- | --- |
| `digest mismatch` (quiet) | 12 | shard 1, shard 2, shard 4, shard 5 |
| `listing not found` | 10 | shard 3, shard 6 |
| `too many previews` (quiet) | 10 | shard 2, shard 5 |
| `upstream returned an HTML error page (<n>)` | 6 | shard 3, shard 4, shard 5 |
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
| `catalog_find_refresh: canceling statement due to statement timeout` | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-mbqju<n>: e<n>e_par_<n>vmybf → e<n>e_chi_<n>u<n>k<n>` (quiet) | 1 | shard 1 |
| `commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vpmitg: e<n>e_par_yltjdb → e<n>e_chi_yinfzu` (quiet) | 1 | shard 4 |
| `rate limit upload:draft-week: upstream returned an HTML error page (<n>) \| <!--[if lt IE <n>]> <html class=<q> lang=<q>> <![endif]-->` | 1 | shard 2 |
| `register_listing_photo: upstream unavailable (<n>)` | 1 | shard 5 |

Quiet (allowlisted): digest mismatch ×12 · too many previews ×10 · categories badHeader ×4 · categories wrongFile ×4 · category-images: no GEMINI_API_KEY — fake mode ×4 · definitions badHeader ×4 · definitions wrongFile ×4 · export_failed permission denied ×4 · preview_failed permission denied ×4 · categories file too large ×2 · categories nulByte ×2 · categories unknownColumn ×2 · commit_failed step-up required: no verified factor ×2 · countries badHeader ×2 · countries nulByte ×2 · countries tooManyRows ×2 · countries unknownColumn ×2 · countries wrongFile ×2 · definitions nulByte ×2 · definitions tooManyRows ×2 · definitions unknownColumn ×2 · links unknownColumn ×2 · locations badHeader ×2 · locations file too large ×2 · locations nulByte ×2 · locations unknownColumn ×2 · locations wrongFile ×2 · strings badHeader ×2 · strings emptyFile ×2 · strings nulByte ×2 · strings tooManyRows ×2 · strings unknownColumn ×2 · strings wrongFile ×2 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-mbqju<n>: e<n>e_par_<n>vmybf → e<n>e_chi_<n>u<n>k<n> ×1 · commit_failed admin.attributes.error.parentAfterChild:e<n>e-cat-<n>-<n>-vpmitg: e<n>e_par_yltjdb → e<n>e_chi_yinfzu ×1

Off the allowlist:

### listing not found

- Count: 10 · Sources: shard 3, shard 6
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PW-21 a child detail shows only the chosen parent's options and clears on change ×2 · PW-56 an hourly basis fixes the period to the hour, and a changed basis moves it ×2 · no Settings item leaks into the category rail ×1 · PR-15 a save on a deleted draft is a refusal, never a 5xx or a null revision (IN ×1 · PR-3 a complete draft publishes to screening and never to active ×1 · PW-108 an Other basis names the seller's written unit (INC-371) ×1

```text
[WebServer] [ssr-error] /api/listings/draft listing not found
```

### upstream returned an HTML error page (<n>)

- Count: 6 · Sources: shard 3, shard 4, shard 5
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): A-4 admin TAB from marketplace navigates to /admin (INC-071) ×3 · SC-6 Preview as buyer draws the ad's category picture ×3 · PP-17 Move earlier and Move later put a photo at its place, and the first is the ×1 · PW-131 an imitating name is refused when the step is saved (retry #1) ×1 · SC-16 a reviewer without a fresh second factor cannot decide ×1 · SC-4 a person with no role cannot decide (retry #1) ×1

```text
[WebServer] [ssr-error] /api/locations upstream returned an HTML error page (520)
```

### catalog_find_refresh: canceling statement due to statement timeout

- Count: 1 · Sources: shard 1
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): CO-4 open and close: opening publishes the market's tree, closing takes it away ×1 · CT-19 a create and a rename commit through the doors and undo ×1

```text
[WebServer] [ssr-error] /api/admin/categories/import catalog_find_refresh: canceling statement due to statement timeout
```

### rate limit upload:draft-week: upstream returned an HTML error page (<n>) | <!--[if lt IE <n>]> <html class=<q> lang=<q>> <![endif]-->

- Count: 1 · Sources: shard 2
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-17 Move earlier and Move later put a photo at its place, and the first is the ×1 · PW-131 an imitating name is refused when the step is saved (retry #1) ×1

```text
[WebServer] [ssr-error] /api/upload/photo rate limit upload:draft-week: upstream returned an HTML error page (520) | <!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
```

### register_listing_photo: upstream unavailable (<n>)

- Count: 1 · Sources: shard 5
- Tests that finished next in the same log (the one running when the line was written is among them; INC-398): PP-17 Move earlier and Move later put a photo at its place, and the first is the ×1 · PW-132 a non-Latin seller name shows the Latin line as the refusal ×1

```text
[WebServer] [ssr-error] /api/upload/photo register_listing_photo: upstream unavailable (521)
```

## Accessibility (DEC-084, gating)

Logs read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

10 page×project check(s): serious=0 critical=0 — home mobile-360 serious=0 critical=0 · auth mobile-360 serious=0 critical=0 · wizard-1 mobile-360 serious=0 critical=0 · wizard-3 mobile-360 serious=0 critical=0 · wizard-5 mobile-360 serious=0 critical=0 · home desktop-1280 serious=0 critical=0 · auth desktop-1280 serious=0 critical=0 · wizard-1 desktop-1280 serious=0 critical=0 · wizard-3 desktop-1280 serious=0 critical=0 · wizard-5 desktop-1280 serious=0 critical=0

## Timing (DEC-087, non-gating)

Results read: smoke, email, shard 1, shard 2, shard 3, shard 4, shard 5, shard 6 · unavailable: none

| Source | Started (UTC) | Wall time |
| --- | --- | --- |
| smoke | 2026-10-17T04:24:49.195Z | 16.9 min |
| email | 2026-10-17T04:24:42.478Z | 0.3 min |
| shard 1 | 2026-10-17T04:24:42.191Z | 40.0 min |
| shard 2 | 2026-10-17T04:24:51.302Z | 41.4 min |
| shard 3 | 2026-10-17T04:24:42.834Z | 30.9 min |
| shard 4 | 2026-10-17T04:24:40.141Z | 36.4 min |
| shard 5 | 2026-10-17T04:24:52.742Z | 39.9 min |
| shard 6 | 2026-10-17T04:24:47.699Z | 38.4 min |

| Spec file | Tests | Summed duration | Ran in |
| --- | --- | --- | --- |
| `photo-pipeline.spec.ts` | 66 | 28.5 min | shard 2, shard 5 |
| `post-wizard-specs.spec.ts` | 82 | 25.6 min | shard 3, shard 6 |
| `shell.spec.ts` | 336 | 21.0 min | smoke, shard 3, shard 6 |
| `admin-listings.spec.ts` | 60 | 20.8 min | shard 1, shard 4 |
| `post-wizard-bundle2.spec.ts` | 68 | 20.7 min | shard 2, shard 5 |
| `my-listings-ad.spec.ts` | 36 | 18.3 min | shard 2, shard 5 |
| `admin-screening.spec.ts` | 52 | 17.8 min | shard 1, shard 4 |
| `my-listings-doors.spec.ts` | 28 | 16.8 min | shard 2, shard 5 |
| `post-wizard-pricing.spec.ts` | 52 | 16.8 min | shard 3, shard 6 |
| `admin-categories-lifecycle.spec.ts` | 52 | 15.2 min | shard 1, shard 4 |
| `post-wizard-place.spec.ts` | 38 | 14.4 min | shard 3, shard 6 |
| `post-wizard-resets.spec.ts` | 34 | 13.3 min | shard 3, shard 6 |
| `posting-routes.spec.ts` | 64 | 13.2 min | shard 3, shard 6 |
| `post-wizard-where.spec.ts` | 32 | 12.3 min | shard 3, shard 6 |
| `auth-signout.spec.ts` | 56 | 11.5 min | smoke, shard 2, shard 5 |
| `admin-attributes-library.spec.ts` | 42 | 10.6 min | shard 1, shard 4 |
| `feed-screens.spec.ts` | 30 | 9.9 min | shard 2, shard 5 |
| `admin-categories-console.spec.ts` | 34 | 9.9 min | shard 1, shard 4 |
| `admin-attributes-links.spec.ts` | 32 | 8.6 min | shard 1, shard 4 |
| `import-security.spec.ts` | 36 | 8.5 min | shard 2, shard 5 |
| `post-wizard-category.spec.ts` | 48 | 8.3 min | shard 2, shard 5 |
| `admin-attributes-editor.spec.ts` | 34 | 7.7 min | shard 1, shard 4 |
| `admin-locations.spec.ts` | 38 | 7.5 min | shard 1, shard 4 |
| `my-listings-page.spec.ts` | 14 | 7.2 min | shard 2, shard 5 |
| `admin-users.spec.ts` | 28 | 7.2 min | shard 1, shard 5 |
| `feed-index.spec.ts` | 30 | 7.1 min | shard 2, shard 5 |
| `viewing-place.spec.ts` | 22 | 7.0 min | shard 3, shard 6 |
| `admin-translations-console.spec.ts` | 44 | 6.7 min | shard 1, shard 4 |
| `admin-attributes-safety.spec.ts` | 18 | 6.7 min | shard 1, shard 4 |
| `admin-attributes-import.spec.ts` | 40 | 6.7 min | shard 1, shard 4 |
| `posting-routes-catalog.spec.ts` | 18 | 6.1 min | shard 3, shard 6 |
| `feed-route.spec.ts` | 22 | 5.9 min | shard 2, shard 5 |
| `admin-roles.spec.ts` | 26 | 5.7 min | shard 1, shard 4 |
| `admin-countries.spec.ts` | 18 | 5.1 min | shard 1, shard 4 |
| `admin-audit.spec.ts` | 14 | 3.5 min | shard 1, shard 4 |
| `posting-routes-dials.spec.ts` | 18 | 3.4 min | shard 3, shard 6 |
| `admin-shell.spec.ts` | 10 | 3.3 min | shard 1, shard 4 |
| `admin-categories-home.spec.ts` | 10 | 2.9 min | shard 1, shard 4 |
| `mfa-stepup.spec.ts` | 18 | 2.9 min | shard 2, shard 5 |
| `admin-translations-governance.spec.ts` | 8 | 2.8 min | shard 1, shard 5 |
| `admin-translations-data.spec.ts` | 8 | 2.5 min | shard 1, shard 4 |
| `post-wizard-removed.spec.ts` | 4 | 2.2 min | shard 3, shard 6 |
| `breadcrumbs.spec.ts` | 6 | 2.0 min | shard 2, shard 5 |
| `admin-coverage.spec.ts` | 16 | 2.0 min | shard 1, shard 4 |
| `post-wizard-details.spec.ts` | 8 | 1.9 min | shard 2, shard 5 |
| `post-wizard-finder.spec.ts` | 8 | 1.6 min | shard 3, shard 5 |
| `posting-routes-identity.spec.ts` | 4 | 1.4 min | shard 3, shard 6 |
| `category-image-routes.spec.ts` | 10 | 1.2 min | shard 2, shard 5 |
| `post-wizard-units.spec.ts` | 4 | 1.1 min | shard 3, shard 6 |
| `locations-tree.spec.ts` | 8 | 1.1 min | shard 2, shard 5 |
| `phone-frame.spec.ts` | 18 | 1.0 min | shard 2, shard 5 |
| `post-wizard-recent.spec.ts` | 2 | 0.9 min | shard 3, shard 6 |
| `admin-services.spec.ts` | 10 | 0.8 min | shard 1, shard 4 |
| `i18n-coverage.spec.ts` | 8 | 0.8 min | shard 2, shard 5 |
| `admin-categories-images.spec.ts` | 2 | 0.7 min | shard 1, shard 4 |
| `i18n-bundle.spec.ts` | 6 | 0.7 min | shard 2, shard 5 |
| `smoke-auth-i18n.spec.ts` | 4 | 0.7 min | smoke, shard 3, shard 6 |
| `a11y.spec.ts` | 4 | 0.6 min | smoke |
| `settings.spec.ts` | 4 | 0.5 min | shard 3 |
| `rbac.spec.ts` | 6 | 0.5 min | shard 3, shard 6 |
| `category-nav.spec.ts` | 10 | 0.4 min | shard 2, shard 5 |
| `primitives-law.spec.ts` | 24 | 0.4 min | shard 3, shard 6 |
| `layout.spec.ts` | 10 | 0.3 min | shard 2, shard 5 |
| `house-style.spec.ts` | 12 | 0.3 min | shard 2, shard 5 |
| `auth-reset.spec.ts` | 6 | 0.3 min | shard 2 |
| `auth-signin-errors.spec.ts` | 5 | 0.2 min | shard 2 |
| `shell-table-law.spec.ts` | 2 | 0.2 min | shard 3, shard 6 |
| `auth-callback.spec.ts` | 4 | 0.2 min | shard 2 |
| `auth-signup.spec.ts` | 3 | 0.1 min | email |
| `auth-google.spec.ts` | 2 | 0.0 min | shard 2 |
| `geo.spec.ts` | 10 | 0.0 min | shard 2, shard 5 |
| `ad-page-routes.spec.ts` | 4 | 0.0 min | shard 1, shard 4 |

15 slowest tests:

| Test | Project | Duration |
| --- | --- | --- |
| `photo-pipeline.spec.ts` › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover | mobile-360 | 120.5 s |
| `my-listings-doors.spec.ts` › ML-2 Nobody else moves a seller's ad, and a refused call writes nothing | desktop-1280 | 112.6 s |
| `admin-listings.spec.ts` › AL-30 Settings in All listings: the renew settings as stored, Cancel changes nothing, a day count outside 1 to 365 is refused before any call; no Settings without listings:enforce (D174 3, D175 2) | mobile-360 | 111.9 s |
| `admin-screening.spec.ts` › SC-4 a person with no role cannot decide | mobile-360 | 99.2 s |
| `shell.spec.ts` › /settings shows the Account context, and returning shows categories | desktop-1280 | 96.9 s |
| `my-listings-ad.spec.ts` › MLA-7 Delete asks first; the deleted ad leaves My listings for good (call F) | mobile-360 | 95.6 s |
| `posting-routes.spec.ts` › PR-3 a complete draft publishes to screening and never to active | desktop-1280 | 95.4 s |
| `viewing-place.spec.ts` › VP-8 this browser's newer pick wins and is saved on the account | mobile-360 | 92.4 s |
| `post-wizard-bundle2.spec.ts` › PW-131 an imitating name is refused when the step is saved | mobile-360 | 92.0 s |
| `my-listings-doors.spec.ts` › ML-5 The price applies at once; Price reduced only for a real drop on a price that stood (D173, D174, D177) | mobile-360 | 91.5 s |
| `post-wizard-bundle2.spec.ts` › PW-131 an imitating name is refused when the step is saved | desktop-1280 | 91.0 s |
| `post-wizard-resets.spec.ts` › PW-167 a seller's year inside the new model's bounds is kept; one outside is cleared, with the Undo offer | desktop-1280 | 87.6 s |
| `photo-pipeline.spec.ts` › PP-16 a photo dropped on the step is added like a picked one | desktop-1280 | 85.8 s |
| `admin-shell.spec.ts` › A-6 admin fixture: gated section nav, section page + breadcrumb, deep link | desktop-1280 | 83.3 s |
| `admin-screening.spec.ts` › SC-4 a person with no role cannot decide | desktop-1280 | 75.6 s |

## Post-test errors: smoke

smoke: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 5 (pool 2, fresh 3)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 3 user(s) owned by process 39000748434-smoke
```

## Post-test errors: email

email: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 2 (pool 0, fresh 2)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39000748434-email
```

## Post-test errors: shard 1

shard 1: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 14 (pool 4, fresh 10)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 18 user(s) owned by process 39000748434-1
```

## Post-test errors: shard 2

shard 2: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 33 (pool 4, fresh 29)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 38 user(s) owned by process 39000748434-2
```

## Post-test errors: shard 3

shard 3: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39000748434-3
```

## Post-test errors: shard 4

shard 4: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 11 (pool 4, fresh 7)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 8 user(s) owned by process 39000748434-4
```

## Post-test errors: shard 5

shard 5: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 31 (pool 4, fresh 27)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 41 user(s) owned by process 39000748434-5
```

## Post-test errors: shard 6

shard 6: every test's verdict stands — these lines were printed OUTSIDE any test (fixture teardown / process exit) and are non-gating.

```text
[e2e:teardown] accounts signed in this run: 8 (pool 4, fresh 4)
[e2e:teardown] transport retries this run: 0 (by method: none; by code: none; ran out: 0)
[e2e:teardown] deleted 4 user(s) owned by process 39000748434-6
```

## admin-listings.spec.ts › ADMIN LISTINGS — the console's doors › AL-30 Settings in All listings: the renew settings as stored, Cancel changes nothing, a day count outside 1 to 365 is refused before any call; no Settings without listings:enforce (D174 3, D175 2)

- Source: `shard 1`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: [e2e:al] scratch role failed: undefined

  293 |       .select("id")
  294 |       .single();
> 295 |     if (roleError || !role) throw new Error(`[e2e:al] scratch role failed: ${roleError?.message}`);
      |                                   ^
  296 |     roles.push(role.id as string);
  297 |     const { data: perms } = await supabase
  298 |       .from("permissions")
    at scratchHolder (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:295:35)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:2129:20
--- further error 2 ---
Error: [e2e:al] role_permissions reap failed: Could not query the database for the schema cache. Retrying.

  204 |     for (const roleId of roles.splice(0)) {
  205 |       const a = await supabase.from("role_permissions").delete().eq("role_id", roleId);
> 206 |       if (a.error) throw new Error(`[e2e:al] role_permissions reap failed: ${a.error.message}`);
      |                          ^
  207 |       const b = await supabase.from("user_roles").delete().eq("role_id", roleId);
  208 |       if (b.error) throw new Error(`[e2e:al] user_roles reap failed: ${b.error.message}`);
  209 |       const c = await supabase.from("roles").delete().eq("id", roleId);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-listings.spec.ts:206:26
```

Context:

```text
  - dialog "Renewing ads" [ref=e2]:
    - heading "Renewing ads" [level=2] [ref=e3]
    - generic [ref=e4]:
      - paragraph [ref=e5]: Renewing ads
      - generic [ref=e6]:
        - paragraph [ref=e7]: A seller renews an expired ad for a new run. These two settings apply to every renewal from now on.
        - generic [ref=e8]:
          - generic [ref=e9]: Sellers may renew an expired ad
          - switch "Sellers may renew an expired ad" [checked] [active] [ref=e10] [cursor=pointer]
        - generic [ref=e11]:
          - generic [ref=e12]: Days per renewal
          - textbox "Days per renewal" [ref=e13]: "30"
          - paragraph [ref=e14]: A whole number from 1 to 365.
        - generic [ref=e15]:
          - button "Cancel" [ref=e16] [cursor=pointer]
          - button "Save settings" [ref=e17] [cursor=pointer]
    - button "Close" [ref=e18] [cursor=pointer]:
      - img [ref=e19]
      - generic [ref=e22]: Close
```
```

## admin-screening.spec.ts › ADMIN SCREENING › SC-4 a person with no role cannot decide

- Source: `shard 1`
- Project: `mobile-360`

```text
Error: [e2e:reap] translations of dd5fb1a2-b5f8-46b4-970e-7b105ac1e533 failed: <!DOCTYPE html>
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
            <div class="mt-3">2026-10-17 04:54:49 UTC</div>
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
Error: [e2e:reap] translations of dd5fb1a2-b5f8-46b4-970e-7b105ac1e533 failed: <!DOCTYPE html>
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

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
--- further error 1 ---
Error: {"error":"server error"}

expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 500

  796 |     for (const name of ["meta.png", "meta.webp", "gps.jpg"] as const) {
  797 |       const uploaded = await uploadPhoto(page, { listingId, token, cover: { name } });
> 798 |       expect(uploaded.status, JSON.stringify(uploaded.payload)).toBe(200);
      |                                                                 ^
  799 |     }
  800 |     const rows = await photoRowsOf(listingId);
  801 |     expect(rows, "PP-17: three photos were uploaded").toHaveLength(3);
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:798:65
--- further error 2 ---
Test timeout of 60000ms exceeded while running "afterEach" hook.

  93 |   const objects: { userId: string; listingId: string }[] = [];
  94 |
> 95 |   test.afterEach(async ({ page }) => {
     |        ^
  96 |     // INC-323 / INC-398 — stop the page first: wait out a save in flight, then
  97 |     // blank it, so no autosave lands after the purge (about:blank alone left a
  98 |     // save already sent to land as "listing not found").
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:95:8
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-17-Move-earlier-and-Move-later-put-a-photo-at-its-place-and-the-first-is-the-cover-mobile-360` — Playwright's name `photo-pipeline-PHOTO-PIPEL-890a4--and-the-first-is-the-cover-mobile-360`; this run carried 5 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved

- Source: `shard 2`
- Project: `mobile-360`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-131-an-imitating-name-is-refused-when-the-step-is-saved-mobile-360` — Playwright's name `post-wizard-bundle2-POSTIN-8ff0e-used-when-the-step-is-saved-mobile-360`; this run carried 5 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-8 this browser's newer pick wins and is saved on the account

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: the ET tree never carried e2e-loc-3-0-ls-sub-qrjkx2 within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-3-0-ls-sub-qrjkx2"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-1-1-ls-region-1sbaju", "e2e-loc-2-1-ls-region-m8lwxv", "e2e-loc-3-0-ls-region-52qdgn", "e2e-loc-4-1-ls-region-0immop", "oromia", "sidama", …]

Call Log:
- Timeout 20000ms exceeded while waiting on the predicate
--- further error 1 ---
Error: the ET tree never carried e2e-loc-3-0-ls-sub-qrjkx2 within 20 s

expect(received).toContain(expected) // indexOf

Expected value: "e2e-loc-3-0-ls-sub-qrjkx2"
Received array: ["ethiopia", "addis-ababa", "amhara", "dire-dawa", "e2e-loc-1-1-ls-region-1sbaju", "e2e-loc-2-1-ls-region-m8lwxv", "e2e-loc-3-0-ls-region-52qdgn", "e2e-loc-4-1-ls-region-0immop", "oromia", "sidama", …]

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
--- further error 2 ---
Test timeout of 60000ms exceeded while running "afterEach" hook.

  212 |   const regions: string[] = [];
  213 |
> 214 |   test.afterEach(async () => {
      |        ^
  215 |     for (const id of users.splice(0)) {
  216 |       const cleared = await adminClient()
  217 |         .from("profiles")
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:214:8
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-8-this-browser-s-newer-pick-wins-and-is-saved-on-the-account-mobile-360` — Playwright's name `viewing-place-VIEWING-PLAC-1cc34-and-is-saved-on-the-account-mobile-360`; this run carried 5 context file(s); of the same spec: none

## viewing-place.spec.ts › VIEWING PLACE — the shell carries it (D106 part 2) › VP-9 the account's newer pick wins over this browser's older one

- Source: `shard 3`
- Project: `mobile-360`

```text
Error: [e2e:pool] creating pool account e2e-pool-s3b-000@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s3b-000@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at lease (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:232:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/viewing-place.spec.ts:369:18
```

Context: context file not found for `viewing-place-VIEWING-PLACE-the-shell-carries-it-D106-part-2-VP-9-the-account-s-newer-pick-wins-over-this-browser-s-older-one-mobile-360` — Playwright's name `viewing-place-VIEWING-PLAC-c9ba8-er-this-browser-s-older-one-mobile-360`; this run carried 5 context file(s); of the same spec: none

## admin-screening.spec.ts › ADMIN SCREENING › SC-4 a person with no role cannot decide

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s4b-010@ethio-e2e.invalid (profile) failed: <!DOCTYPE html>
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
                <span class="inline-block">Web server is returning an unknown error</span>
                <span class="code-label">Error code 520</span>
            </h1>
            <div>
                Visit <a href="https://www.cloudflare.com/5xx-error-landing?utm_source=errorcode_520&utm_campaign=jatpuhfdjfzctjipklmk.supabase.co" target="_blank" rel="noopener noreferrer">cloudflare.com</a> for more information.
            </div>
            <div class="mt-3">2026-10-17 04:54:46 UTC</div>
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
Error: [e2e:pool] reaping e2e-pool-s4b-010@ethio-e2e.invalid (profile) failed: <!DOCTYPE html>
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

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-4-a-person-with-no-role-cannot-decide-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-6b6c5--with-no-role-cannot-decide-desktop-1280`; this run carried 5 context file(s); of the same spec: `admin-screening-ADMIN-SCRE-6b6c5--with-no-role-cannot-decide-mobile-360`

## admin-screening.spec.ts › ADMIN SCREENING › SC-16 a reviewer without a fresh second factor cannot decide

- Source: `shard 4`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s4b-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s4b-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seedWaiting (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:201:20)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-screening.spec.ts:368:16
```

Context: context file not found for `admin-screening-ADMIN-SCREENING-SC-16-a-reviewer-without-a-fresh-second-factor-cannot-decide-desktop-1280` — Playwright's name `admin-screening-ADMIN-SCRE-f4ca6-second-factor-cannot-decide-desktop-1280`; this run carried 5 context file(s); of the same spec: `admin-screening-ADMIN-SCRE-6b6c5--with-no-role-cannot-decide-mobile-360`

## admin-shell.spec.ts › Admin shell (U0) › A-6 admin fixture: gated section nav, section page + breadcrumb, deep link

- Source: `shard 4`
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
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/admin-shell.spec.ts:101:5
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

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-16 a photo dropped on the step is added like a picked one

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-2')

--- further error 1 ---
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('post-step-2')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByTestId('post-step-2')


  751 |     const listingId = await draft(page, token, user.id);
  752 |     await gotoReady(page, `/post/${listingId}`);
> 753 |     await expect(page.getByTestId("post-step-2")).toBeVisible();
      |                                                   ^
  754 |
  755 |     const bytes = readFileSync(FIXTURE).toString("base64");
  756 |     const transfer = await page.evaluateHandle((data) => {
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:753:51
--- further error 2 ---
Test timeout of 60000ms exceeded while running "afterEach" hook.

  93 |   const objects: { userId: string; listingId: string }[] = [];
  94 |
> 95 |   test.afterEach(async ({ page }) => {
     |        ^
  96 |     // INC-323 / INC-398 — stop the page first: wait out a save in flight, then
  97 |     // blank it, so no autosave lands after the purge (about:blank alone left a
  98 |     // save already sent to land as "listing not found").
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:95:8
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-16-a-photo-dropped-on-the-step-is-added-like-a-picked-one-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-42cc2--is-added-like-a-picked-one-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## photo-pipeline.spec.ts › PHOTO PIPELINE › PP-17 Move earlier and Move later put a photo at its place, and the first is the cover

- Source: `shard 5`
- Project: `desktop-1280`

```text
Error: [e2e:pool] creating pool account e2e-pool-s5b-010@ethio-e2e.invalid failed: {} (lookup: {})
--- further error 1 ---
Error: [e2e:pool] creating pool account e2e-pool-s5b-010@ethio-e2e.invalid failed: {} (lookup: {})

   at helpers/users.ts:226

  224 |   });
  225 |   if (error || !data?.user?.id) {
> 226 |     throw new Error(
      |           ^
  227 |       `[e2e:pool] creating pool account ${email} failed: ${error?.message ?? "no user id"}` +
  228 |         (found.error ? ` (lookup: ${found.error.message})` : ""),
  229 |     );
    at ensurePoolAccount (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:226:11)
    at leaseUser (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/users.ts:389:14)
    at leaseSeller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/helpers/posting.ts:96:16)
    at seller (/home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:112:18)
    at /home/runner/work/ethio-marketplace/ethio-marketplace/e2e/photo-pipeline.spec.ts:794:29
```

Context: context file not found for `photo-pipeline-PHOTO-PIPELINE-PP-17-Move-earlier-and-Move-later-put-a-photo-at-its-place-and-the-first-is-the-cover-desktop-1280` — Playwright's name `photo-pipeline-PHOTO-PIPEL-890a4--and-the-first-is-the-cover-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## post-wizard-bundle2.spec.ts › POSTING WIZARD — bundle 2 place and contact › PW-131 an imitating name is refused when the step is saved

- Source: `shard 5`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `post-wizard-bundle2-POSTING-WIZARD-bundle-2-place-and-contact-PW-131-an-imitating-name-is-refused-when-the-step-is-saved-desktop-1280` — Playwright's name `post-wizard-bundle2-POSTIN-8ff0e-used-when-the-step-is-saved-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## posting-routes.spec.ts › POSTING ROUTES › PR-3 a complete draft publishes to screening and never to active

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-3-a-complete-draft-publishes-to-screening-and-never-to-active-desktop-1280` — Playwright's name `posting-routes-POSTING-ROU-8e3b4-reening-and-never-to-active-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## posting-routes.spec.ts › POSTING ROUTES › PR-4 identity: the alias is saved, and a second seller cannot take it

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:setup] POST /logout?scope=global failed (521): <!DOCTYPE html>
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
            <div class="mt-3">2026-10-17 04:55:16 UTC</div>
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
Error: [e2e:setup] POST /logout?scope=global failed (521): <!DOCTYPE html>
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

Context: context file not found for `posting-routes-POSTING-ROUTES-PR-4-identity-the-alias-is-saved-and-a-second-seller-cannot-take-it-desktop-1280` — Playwright's name `posting-routes-POSTING-ROU-1cc2f-econd-seller-cannot-take-it-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## shell.spec.ts › panel follows the route › /settings shows the Account context, and returning shows categories

- Source: `shard 6`
- Project: `desktop-1280`

```text
Test timeout of 60000ms exceeded.
```

Context: context file not found for `shell-panel-follows-the-route-settings-shows-the-Account-context-and-returning-shows-categories-desktop-1280` — Playwright's name `shell-panel-follows-the-ro-eb253--returning-shows-categories-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## shell.spec.ts › panel follows the route › admin panel is absent for a normal signed-in user

- Source: `shard 6`
- Project: `desktop-1280`

```text
Error: [e2e:pool] reaping e2e-pool-s6b-000@ethio-e2e.invalid (base role read) failed: <!DOCTYPE html>
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
            <div class="mt-3">2026-10-17 04:55:16 UTC</div>
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
Error: [e2e:pool] reaping e2e-pool-s6b-000@ethio-e2e.invalid (base role read) failed: <!DOCTYPE html>
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

Context: context file not found for `shell-panel-follows-the-route-admin-panel-is-absent-for-a-normal-signed-in-user-desktop-1280` — Playwright's name `shell-panel-follows-the-ro-ae646-for-a-normal-signed-in-user-desktop-1280`; this run carried 5 context file(s); of the same spec: none

## Server errors: shard 1

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-1-1-mbqju1: e2e_par_2vmybf → e2e_chi_7u2k24
[WebServer] [ssr-error] /api/admin/categories/import catalog_find_refresh: canceling statement due to statement timeout
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
```

## Client errors: shard 1

```text
[client-error] console.error: [client-error] gate fetch threw
[client-error] console.error: Failed to load resource: the server responded with a status of 400 ()
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] HTTP 400 POST /rest/v1/rpc/transition_listing ({"code":"P0001","details":null,"hint":null,"message":"not your listing"})
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
[client-error] console.error: Access to fetch at 'https://jatpuhfdjfzctjipklmk.supabase.co/rest/v1/rpc/get_active_impersonation' from origin 'http://127.0.0.1:4173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
[client-error] console.error: Failed to load resource: net::ERR_FAILED
console.error: [client-error] gate fetch threw
```

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
[WebServer] [ssr-error] /api/upload/photo rate limit upload:draft-week: upstream returned an HTML error page (520) | <!--[if lt IE 7]> <html class="no-js ie6 oldie" lang="en-US"> <![endif]-->
```

## Client errors: shard 2

No `[client-error]` lines in the `shard 2` log (or no log was uploaded).

## Server errors: shard 3

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
[WebServer] [ssr-error] /api/locations upstream returned an HTML error page (520)
```

## Client errors: shard 3

No `[client-error]` lines in the `shard 3` log (or no log was uploaded).

## Server errors: shard 4

```text
[WebServer] [ssr-error] /api/admin/attributes/import definitions badHeader
[WebServer] [ssr-error] /api/admin/attributes/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/attributes/import digest mismatch
[WebServer] [ssr-error] /api/admin/attributes/import definitions wrongFile
[WebServer] [ssr-error] category-images: no GEMINI_API_KEY — fake mode
[WebServer] [ssr-error] /api/admin/attributes/export export_failed permission denied ×2
[WebServer] [ssr-error] /api/admin/attributes/import commit_failed admin.attributes.error.parentAfterChild:e2e-cat-4-1-vpmitg: e2e_par_yltjdb → e2e_chi_yinfzu
[WebServer] [ssr-error] /api/admin/categories/import categories badHeader
[WebServer] [ssr-error] /api/admin/categories/import preview_failed permission denied
[WebServer] [ssr-error] /api/admin/categories/import digest mismatch
[WebServer] [ssr-error] /api/admin/categories/import commit_failed step-up required: no verified factor
[WebServer] [ssr-error] /api/admin/categories/import categories wrongFile
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (521)
[WebServer] [ssr-error] /api/locations upstream returned an HTML error page (520)
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (525)
[WebServer] [ssr-error] /api/i18n upstream returned an HTML error page (525)
```

## Client errors: shard 4

No `[client-error]` lines in the `shard 4` log (or no log was uploaded).

## Server errors: shard 5

```text
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
[WebServer] [ssr-error] /api/categories/tree upstream returned an HTML error page (521)
[WebServer] [ssr-error] /api/upload/photo register_listing_photo: upstream unavailable (521)
```

## Client errors: shard 5

No `[client-error]` lines in the `shard 5` log (or no log was uploaded).

## Server errors: shard 6

```text
[WebServer] [ssr-error] /api/listings/draft listing not found ×5
```

## Client errors: shard 6

No `[client-error]` lines in the `shard 6` log (or no log was uploaded).
